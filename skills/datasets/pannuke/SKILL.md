# Skill: dataset — PanNuke

## Purpose
Standard public benchmark for **nuclei instance segmentation and 5-class classification** on H&E patches across 19 tissue types. PQ is the canonical metric.

## When to Use
- Evaluating a new nuclei segmentation or instance method
- Multi-class nuclei classification across cancer types
- Stress-testing tissue-domain generalisation on H&E

## Do Not Use When
- Need IHC / multiplex IF stains — H&E only
- Need tissue-level context beyond 256×256 — patches are pre-cropped
- Need cell-state labels (e.g. mitoses specifically) — use MIDOG

## Inputs Claude Needs
- Which fold of the 3-fold split is being used as held-out (default: rotate through all three)
- Whether per-class PQ is needed in addition to binary PQ

## Outputs
- Per-patch instance map (integer label per pixel) + per-instance 5-class label.

## Download
- Homepage: [jgamper.github.io/PanNukeDataset](https://jgamper.github.io/PanNukeDataset/)
- No registration
- License: CC BY-NC-SA 4.0

## Preprocessing
1. Load `.npy` arrays (images + masks).
2. Per-class one-hot masks → per-class integer instance maps.
3. **Use the official 3-fold split** — ad-hoc splits invalidate comparisons.
4. Heavy colour augmentation across the 19 tissues.

## Label mapping
- 5 nuclei classes: neoplastic, inflammatory, connective, dead, epithelial.
- Background = class 0.
- Tissue type per patch is metadata, not model input (useful for stratification).

## Splits
- Official 3-fold: `Fold_1`, `Fold_2`, `Fold_3`.
- Cross-fold: typically train on 2 folds, validate on 1, rotate.

## Evaluation
- **PQ** (Panoptic Quality) — primary.
- **DQ** (detection) and **SQ** (segmentation) — components.
- **Per-class PQ** — mandatory because class 4 (Dead) is rare and easily hides poor performance.
- Use the official `PanNuke-metrics` repo.

## Standard Workflow
1. Encoder-decoder (HoVer-Net / CellViT / StarDist) with horizontal-vertical or distance-map heads for instance separation.
2. Train on 2 folds, validate on the held-out fold.
3. Evaluate binary PQ + 5-class PQ + per-class PQ with the official metric repo.
4. Rotate across folds; report mean ± std.

## Decision Rules
- Use the official 3-fold split.
- Use the official metric repo (not ad-hoc PQ).
- Report per-class PQ — never only mean.
- Heavy colour augmentation given the 19-tissue stain variance.

## Known pitfalls
- 256×256 pre-cropped — no broader context.
- Class 4 (Dead) is rare; mean PQ hides it.
- Stain variance across 19 tissues is large.
- Ad-hoc splits and ad-hoc PQ implementations break comparability.

## Related Nodes
- companion: `glas` (gland-level)
- companion: `midog` (mitoses specifically)
- method context: `pathology-foundation-model`
- (deferred) article: `gamper-2020-pannuke`

## Failure Modes
- Custom splits → numbers incomparable.
- Reimplemented PQ → off-by-edge-case errors.
- Reporting mean PQ only → masks rare-class failure.

## Validation Checklist
- [ ] Official 3-fold split used
- [ ] Official PanNuke-metrics repo used
- [ ] Per-class PQ reported
- [ ] Colour augmentation explicit
- [ ] Cross-fold rotation reported (mean ± std)
