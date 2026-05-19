# Skill: dataset — GlaS

## Purpose
Canonical small benchmark for **colon gland instance segmentation** on H&E. 165 images, 3 official metrics, 2 test splits (A easier, B harder).

## When to Use
- Evaluating a new gland or instance segmentation method
- Demonstrating that a backbone transfers to morphometric tasks
- Ablating augmentation / shape-aware losses (Object-Hausdorff is shape-sensitive)

## Do Not Use When
- Need WSI-level evaluation — GlaS is image-level (ROI crops)
- Need many tissue types — colon only
- Need cell-level (not gland-level) — use PanNuke instead

## Inputs Claude Needs
- Whether to evaluate on Test A, Test B, or both (default: both, reported separately)
- Whether the official Matlab or community Python metric implementation is used

## Outputs
- Per-image gland instance map (integer label per pixel, one int per instance).

## Download
- Homepage: [warwick.ac.uk/.../glascontest](https://warwick.ac.uk/fac/cross_fac/tia/data/glascontest/)
- No registration required
- License: research use only — cite the challenge paper

## Preprocessing
1. Load BMP/TIF at native resolution (~0.62 μm/px).
2. **Preserve colour mode** when loading masks — grayscale collapses instances.
3. Convert colour-coded masks → integer label maps.
4. Random crop / flip / rotate; gland scale is variable — multi-scale augmentation helps.

## Label mapping
- One colour per gland instance in the annotation BMP.
- Per-image grade: benign / malignant.

## Splits
- 85 training images.
- 80 test images = **Test A** (60, easier) + **Test B** (20, harder).
- Always report Test A and Test B separately.

## Evaluation
- **F1 detection** (gland-level true / false / missed at fixed IoU).
- **Object-Dice** (per-instance pixel agreement).
- **Object-Hausdorff** (boundary fidelity).

## Standard Workflow
1. Train a U-Net / HoVer-Net-style encoder-decoder with the 85-image train set.
2. Heavy augmentation (rotation, flip, colour jitter, random crop, elastic deformation).
3. Predict instance masks via watershed / connected components / direct instance head.
4. Evaluate all three metrics on Test A and Test B separately.

## Decision Rules
- Prefer SSL-pretrained or PFM-initialised encoders — from-scratch overfits.
- Multi-scale augmentation is essential — glands vary by ~5× in size.
- Cite the metric implementation; don't rely on others' Python ports without checking.

## Known pitfalls
- 165 images is very small — overfitting trivial without augmentation.
- Loading masks in `L` mode collapses all instances into one.
- Object-Hausdorff Python ports differ from the official Matlab — cite which.
- Test B is much harder than Test A — pooled numbers hide that.
- Single-source — no cross-cohort generalisation claim is possible.

## Related Nodes
- companion: `pannuke` (cell-level analogue)
- (deferred) article: `sirinukunwattana-2017-glas`

## Failure Modes
- Reporting only Test A → overstates performance.
- Reporting only F1 → misses shape failure (Object-Hausdorff catches it).
- Treating masks as grayscale → loses instance structure.

## Validation Checklist
- [ ] Test A and Test B reported separately
- [ ] All three metrics (F1, Object-Dice, Object-Hausdorff) reported
- [ ] Metric implementation cited
- [ ] Augmentation explicit
- [ ] Masks loaded in colour mode
