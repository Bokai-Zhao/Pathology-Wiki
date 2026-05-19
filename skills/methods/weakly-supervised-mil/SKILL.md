# Skill: method — Weakly-Supervised MIL (WSI)

## Purpose
Umbrella method for weakly-supervised multiple instance learning on WSIs. Train a slide-level classifier from slide-level labels alone.

## When to Use
- Slide-level classification with only slide-level labels (no per-patch supervision)
- Building a new WSI classification baseline
- Combining with a PFM backbone for downstream PFM evaluation

## Do Not Use When
- Need pixel- or patch-level supervision — use fully-supervised segmentation/detection
- Need real-time inference — MIL bags are large
- Need pre-PFM frozen-feature simplicity — direct CNN features may suffice for very limited tasks

## Standard Workflow
1. **Tile** the WSI at chosen magnification (typically 20× / 256×256).
2. **Tissue mask** to drop background patches.
3. **Encode** each patch with a backbone (ImageNet ViT / CTransPath / UNI / GigaPath / Virchow).
4. **Aggregate** features into a bag-level vector (ABMIL / CLAM / TransMIL / DSMIL / DTFD-MIL / graph MIL).
5. **Classify** the bag vector with cross-entropy or task-specific loss.
6. **Visualise** attention as a heatmap for free localisation.

## Decision Rules
- **Default aggregator**: CLAM (well-maintained, strong baseline).
- **Multi-class with class-specific attention**: CLAM-MB.
- **When instance-instance correlations matter**: TransMIL.
- **Backbone choice dominates accuracy**: prefer a pathology PFM (UNI / GigaPath) over ImageNet.
- **Magnification**: 20× default for grading / subtyping; 40× when small structures (mitoses) matter.

## Related Nodes
- child methods: `abmil`, `clam`, `transmil`, `dsmil` (pending), `dtfd-mil` (pending)
- predecessor: `cnn-patch-classification` (pending)
- successor: `pathology-foundation-model`
- datasets: `camelyon16`, `panda`
- canonical articles: `abmil-2018`, `clam-2021`, `transmil-2021`, `campanella-2019`

## Failure Modes
- Reporting slide AUC without lesion-level metrics (FROC) → masks localisation failure.
- Comparing aggregators without controlling the patch encoder.
- Not balancing class distribution → top-attended patches all from majority class.

## Validation Checklist
- [ ] Tissue mask drops > 60% of slide area
- [ ] Patch encoder declared (ImageNet vs PFM)
- [ ] Aggregator declared (ABMIL vs CLAM-SB vs CLAM-MB vs TransMIL vs …)
- [ ] Slide-level and (where applicable) lesion-level metrics reported
- [ ] Per-class accuracy reported for multi-class tasks
