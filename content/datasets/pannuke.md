---
title: "PanNuke — Pan-Cancer Nuclei Segmentation and Classification"
description: "~7.9k H&E patches across 19 tissues with instance masks + 5-class nuclei labels; standard PQ benchmark."
tags: [dataset, nuclei, pan-cancer, h-and-e, instance-segmentation, classification]
---

# PanNuke — Pan-Cancer Nuclei Segmentation and Classification

{{ dataset("pannuke") }}

{{ local_graph("pannuke") }}

## What it contains

PanNuke is the standard public benchmark for **nuclei instance segmentation and 5-class classification** on H&E. The release contains:

- **~7,901 patches** at 256×256 pixels.
- **19 tissue types** (breast, colon, lung, prostate, stomach, kidney, ovary, bladder, pancreas, skin, thyroid, liver, cervix, bile duct, oesophagus, testis, uterus, head & neck, adrenal gland).
- **Instance masks** + per-instance **5-class labels**: neoplastic, inflammatory, connective, dead, epithelial.
- **Official 3-fold split** — use it for cross-method comparability.

## Modalities and scope

- **Modality**: H&E
- **Organs**: 19 tissues spanning common cancer sites
- **Disease**: pan-cancer
- **Species**: human
- **Specimen type**: 256×256 patches (pre-cropped — no WSI context)

## Tasks and metrics

| Task | Metric |
|------|--------|
| Nuclei instance segmentation | **PQ** (Panoptic Quality), DQ (detection), SQ (segmentation) |
| 5-class nuclei classification | Multi-class PQ per class |

PQ is the canonical metric. Per-class PQ is reported alongside binary PQ because class 4 (Dead) is rare and easily inflates / deflates the mean.

## Access

Hosted at `jgamper.github.io/PanNukeDataset`. No registration. **CC BY-NC-SA 4.0** — non-commercial, share-alike.

## Preprocessing

```python
import numpy as np
images = np.load("Fold_1/images/fold1/images.npy")    # (N, 256, 256, 3)
masks  = np.load("Fold_1/masks/fold1/masks.npy")      # (N, 256, 256, 6) one-hot per class + bg
```

Pipeline:

1. Load `.npy` arrays (images + masks) — no WSI reader needed; patches are already cut.
2. Convert per-class one-hot stacks → per-class integer instance maps.
3. Use the official **3-fold split** shipped with the release. Ad-hoc splits invalidate comparisons.
4. Strong colour augmentation across folds — stain varies across the 19 tissues.
5. Evaluate using the official `PanNuke-metrics` repo — PQ has tissue-edge cases that ad-hoc implementations get wrong.

## Why it matters

PanNuke is the **first benchmark to run for any nuclei-level model in pathology** — HoVer-Net, CellViT, StarDist, and follow-ups all report PanNuke PQ. Coverage across 19 tissues makes it a meaningful test for generalisation beyond a single organ.

## Known pitfalls

- **Patches are pre-cropped** — no tissue context beyond 256×256; methods relying on broader context cannot use it directly.
- **Class 4 (Dead)** is rare; mean PQ can hide poor performance on it. Always report per-class PQ.
- **Stain variance** across 19 tissues is large — naive training without colour augmentation underperforms.
- **Use the official 3-fold split**. Self-defined splits break cross-paper comparison.
- **Use the official PQ implementation** (`PanNuke-metrics` repo) — community reimplementations diverge on edge cases (empty patches, boundary tiles).

## How Claude should use this dataset

{{ skill_card("pannuke") }}

Treat PanNuke as the **nuclei companion to {{ node_link("glas") }}** (glands) and {{ node_link("midog") }} (mitoses). Together they cover the three classical cell/structure tasks in H&E pathology.

## Related nodes

- companion: {{ node_link("glas") }} (gland-level)
- companion: {{ node_link("midog") }} (mitotic figures specifically)
- method context: {{ node_link("pathology-foundation-model") }}
- challenge paper: `gamper-2020-pannuke` *(article node deferred — pending §11.6)*

## References

- Homepage: [jgamper.github.io/PanNukeDataset](https://jgamper.github.io/PanNukeDataset/)
- Metric repo: [TIA-Lab/PanNuke-metrics](https://github.com/TIA-Lab/PanNuke-metrics)
- Gamper et al., *arXiv* 2003.10778 (2020)
