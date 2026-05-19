# Skill: dataset — BACH

## Purpose
ICIAR 2018 breast-histology classification challenge — 400 microscopy ROIs + 10 WSIs in 4 morphology classes (normal / benign / in-situ / invasive). Small-data stress test for stain robustness and few-shot transfer.

## When to Use
- 4-class breast histology classification benchmarks
- Stain-robustness ablations (small dataset, large stain variance)
- Few-shot or transfer-learning ablations from pathology PFMs

## Do Not Use When
- Need many slides per class — too small (100 per class)
- Need slide-level metrics — Part B is only 10 WSIs
- Need molecular subtypes (ER / PR / HER2) — labels are morphological only

## Inputs Claude Needs
- Part A (microscopy classification) vs Part B (WSI pixel labels) — which one
- Stain normalisation choice (Macenko / Reinhard / Vahadane / none)

## Outputs
- Part A: 4-class label per image.
- Part B: pixel-level 4-class map per WSI.

## Download
- Challenge page: [iciar2018-challenge.grand-challenge.org](https://iciar2018-challenge.grand-challenge.org/)
- Requires grand-challenge.org registration
- License: CC BY-NC-ND 4.0

## Preprocessing
1. Part A: load TIFs at native 2040×1536, ~0.42 μm/px.
2. **Stain normalise** before training — reported numbers are stain-normalisation-sensitive.
3. Random 512×512 crops + standard rotation/flip augmentation.
4. Part B: read `.svs` via OpenSlide; sliding-window inference at the same magnification used in Part A.

## Label mapping
- Part A: 4 classes — normal / benign / in-situ carcinoma / invasive carcinoma.
- Part B: per-pixel class indices (same 4 classes).

## Splits
- Part A: official train / hidden test (challenge-held). Build a local val split.
- Part B: 10 WSIs — qualitative only.

## Evaluation
- Part A primary: accuracy. Also precision / recall per class.
- Part B: per-class Dice + per-class accuracy on the annotated regions.

## Standard Workflow
1. Stain normalise Part A images.
2. Fine-tune a pretrained backbone (UNI / CTransPath / ImageNet ViT) → 4-class head.
3. Heavy augmentation: rotation, flip, colour jitter, random 512×512 crop.
4. Track per-class accuracy — boundary classes (benign vs in-situ) often dominate error.
5. Part B: tile inference + class-wise Dice.

## Decision Rules
- Always declare the stain normaliser used.
- Never train from scratch — too small.
- Prefer SSL-pretrained backbones (UNI / CTransPath) over ImageNet supervised.

## Known pitfalls
- 100 images per class → severe overfitting risk; heavy aug + pretrained features mandatory.
- Stain variance dominates ablations — control it explicitly.
- Class boundaries follow specific consensus criteria — non-portable to non-BACH cohorts.
- Part B too small for slide-level metrics.

## Related Nodes
- tool: `openslide`
- method context: `pathology-foundation-model`
- companion: `camelyon16` (large breast benchmark)
- (deferred) article: `aresta-2019-bach`

## Failure Modes
- Reporting accuracy without per-class breakdown → masks boundary-class errors.
- Skipping stain normalisation → result depends on which scanner the test images came from.
- Treating Part B as a slide-level benchmark → too few slides for stable metrics.

## Validation Checklist
- [ ] Stain normaliser declared
- [ ] Per-class precision / recall reported
- [ ] Augmentation explicit (rotation, flip, colour jitter)
- [ ] Backbone (and pretraining corpus) named
- [ ] Part B used qualitatively, not for slide-AUC
