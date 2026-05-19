# Skill: method — CLAM

## Purpose
De-facto modern open-source weakly-supervised MIL aggregator. Per-class attention branches + instance-level clustering loss.

## When to Use
- Any modern WSI multi-class slide-level classification on top of a PFM
- Need reliable, well-maintained open-source MIL toolkit
- Data-limited settings where instance clustering helps
- Reproducing 2021–2025 PFM evaluation results

## Do Not Use When
- Need explicit instance-instance correlation modelling — TransMIL / DSMIL
- Need slide-level pretraining of the encoder — GigaPath
- Need pixel-level supervision — fully-supervised segmentation

## Standard Workflow
1. Patch the slide at 20× (256×256 conventional).
2. Tissue segmentation (provided in `mahmoodlab/CLAM` toolkit).
3. Feature extraction with chosen backbone (default ResNet-50; modern choice UNI / GigaPath).
4. Train CLAM-SB (binary) or CLAM-MB (multi-class).
5. Track validation AUC; tune attention temperature and instance-loss weight.
6. Generate attention heatmaps per class for qualitative validation.

## Decision Rules
- **Binary task** → CLAM-SB.
- **Multi-class ≥3** → CLAM-MB.
- **Instance-loss weight**: start at the paper default (0.7); reduce to 0 if heatmaps degrade on tumour-rich slides.
- **Backbone**: never ResNet-50 ImageNet for new work — use UNI / GigaPath / Virchow.

## Related Nodes
- parent: `abmil`
- parent meta-method: `weakly-supervised-mil`
- sibling: `transmil`
- canonical datasets: `camelyon16`, `panda`
- article: `clam-2021`

## Failure Modes
- Pseudo-labels become trivially noisy in tumour-rich slides → drop instance loss.
- CLAM-MB attention collapses to a single class → check class balance and learning rate.
- Slow training with CLAM-MB on many classes → use feature precomputation (the toolkit supports it).

## Validation Checklist
- [ ] Tissue segmentation visually inspected on a sample of slides
- [ ] Per-class AUC reported (not just macro-average)
- [ ] Heatmaps inspected — top-attended patches in tumour regions
- [ ] Instance-loss ablation reported
- [ ] Backbone declared
