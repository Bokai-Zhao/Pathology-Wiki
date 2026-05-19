---
title: "GlaS — Gland Segmentation in Colon Histology Challenge"
description: "MICCAI 2015 challenge: 165 H&E ROIs from 16 WSIs with gland instance masks; benchmark for instance segmentation."
tags: [dataset, colon, gland-segmentation, h-and-e, instance-segmentation]
---

# GlaS — Gland Segmentation in Colon Histology (MICCAI 2015)

{{ dataset("glas") }}

{{ local_graph("glas") }}

## What it contains

GlaS is the **canonical small benchmark for colon gland instance segmentation** on H&E. The release contains:

- **165 ROI images** (cropped from 16 source WSIs) at ~0.62 μm/px.
- **One instance mask per gland**, encoded as colour-coded BMPs (one colour per instance).
- **Histology grade** per image: benign or malignant.
- Splits: **85 training**, **80 test** — split further into **Test A** (60, easier) and **Test B** (20, harder).

## Modalities and scope

- **Modality**: H&E
- **Organ**: colon
- **Disease**: colorectal cancer (benign and malignant)
- **Species**: human
- **Specimen type**: ROI crops from WSIs

## Tasks and metrics

| Task | Metric |
|------|--------|
| Gland instance segmentation | **F1 detection**, **Object-Dice**, **Object-Hausdorff** |
| Benign vs malignant classification | Per-class accuracy |

The three official metrics each test a different property: F1 measures detection, Object-Dice measures pixel agreement per-instance, Object-Hausdorff measures boundary fidelity (shape).

## Access

Distributed via the Tissue Image Analytics Centre at Warwick: `warwick.ac.uk/fac/cross_fac/tia/data/glascontest/`. No registration needed for the data itself; research-use citation expected.

## Preprocessing

```python
from PIL import Image
import numpy as np
img = np.array(Image.open("train_1.bmp"))
mask = np.array(Image.open("train_1_anno.bmp"))   # colour-coded instances
```

Common pipeline:

1. Load BMP/TIF images at native resolution.
2. **Preserve colour mode** when reading masks — converting to grayscale collapses instances.
3. Convert colour-coded masks to integer label maps (one int per instance).
4. Random crop / flip / rotate; gland shapes are scale-variant — colour-jitter alone is insufficient.

## Why it matters

Despite its small size, GlaS remains the **first stop for any new gland or instance segmentation method** in pathology. The Test A / Test B split forces methods to report performance under increased difficulty, exposing brittle models.

## Known pitfalls

- **Very small** (165 images) — heavy augmentation mandatory; without it, deep models overfit immediately.
- **Two test splits** — *always* report Test A *and* Test B separately. Aggregated numbers hide the Test B drop.
- **Metric implementations** differ between reimplementations. The original Matlab reference and the more recent community Python ports are not bit-identical; cite the implementation used.
- **Colour-coded BMP masks** are easy to corrupt — loading in `L` (grayscale) mode collapses all instances into one.
- **Single-centre source** — generalisation to other colon cohorts is unproven.

## How Claude should use this dataset

{{ skill_card("glas") }}

GlaS is the smallest, fastest sanity-check for any new gland-segmentation idea. Combine with {{ node_link("pannuke") }} (nuclei) when validating multi-task histology segmentation models.

## Related nodes

- companion: {{ node_link("pannuke") }} (cell-level analogue)
- challenge paper: `sirinukunwattana-2017-glas` *(article node deferred — pending §11.6)*

## References

- Homepage: [warwick.ac.uk/.../glascontest](https://warwick.ac.uk/fac/cross_fac/tia/data/glascontest/)
- Sirinukunwattana et al., *Medical Image Analysis* 35 (2017) 489–502 (DOI to verify)
