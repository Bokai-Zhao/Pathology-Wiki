---
title: "BACH — BreAst Cancer Histology Images Grand Challenge"
description: "ICIAR 2018 challenge dataset: 400 microscopy ROIs + 10 WSIs labelled normal / benign / in-situ / invasive."
tags: [dataset, breast-cancer, h-and-e, microscopy, segmentation, classification]
---

# BACH — BreAst Cancer Histology Images Grand Challenge (ICIAR 2018)

{{ dataset("bach") }}

{{ local_graph("bach") }}

## What it contains

BACH is the ICIAR 2018 challenge dataset for **four-class breast histology classification** on H&E. Two parts:

- **Part A**: 400 microscopy images (2040×1536, ~0.42 μm/px), 100 per class — `normal`, `benign`, `in-situ carcinoma`, `invasive carcinoma`.
- **Part B**: 10 H&E WSIs (`.svs`) with pixel-level 4-class annotations for WSI-level inference evaluation.

## Modalities and scope

- **Modality**: H&E
- **Organ**: breast
- **Disease**: breast cancer (full spectrum: normal → invasive)
- **Species**: human
- **Specimen type**: microscopy images (Part A) and whole-slide images (Part B)

## Tasks and metrics

| Part | Task | Metric |
|------|------|--------|
| A | 4-class image classification | Accuracy (primary), precision, recall |
| B | Pixel-level 4-class WSI labelling | Per-class Dice / accuracy |

## Access

Hosted at `iciar2018-challenge.grand-challenge.org`. Requires registration. Released under **CC BY-NC-ND 4.0** — non-commercial, no derivatives, attribution required.

## Preprocessing

Part A images come at native 2040×1536 pixels. Common pipeline:

1. Load TIFs at native resolution.
2. **Stain normalisation** (Macenko / Reinhard / Vahadane) — staining varies significantly between batches; reported BACH numbers swing with the normalisation choice.
3. Random 512×512 crops at training time + standard rotation / flip augmentation.
4. Part B WSIs: read `.svs` via {{ node_link("openslide") }}, sliding-window inference at the patch resolution chosen for Part A.

## Why it matters

BACH gives a **clean 4-class breast classification task with morphology-only labels** (no molecular subtypes), making it a popular stress-test for stain robustness and few-shot transfer from pathology PFMs. The dataset is small enough to be used as a transfer-learning benchmark even on a single GPU.

## Known pitfalls

- **Only 100 images per class** — heavy augmentation / SSL pretraining is mandatory; from-scratch CNNs overfit immediately.
- **Stain variance** dominates reported variance between methods. Always declare which stain normaliser (if any) was used.
- **Class boundaries** (benign vs in-situ vs invasive) follow specific consensus criteria — labels are not directly portable to other breast cohorts.
- **Part B has only 10 WSIs** — use it for qualitative localisation maps, not slide-level metrics.

## How Claude should use this dataset

{{ skill_card("bach") }}

Treat BACH as the **small-data complement to Camelyon16** — Camelyon16 stresses scale, BACH stresses stain robustness and few-shot transfer. Frequently cited together when validating pathology foundation models on breast tissue.

## Related nodes

- tool: {{ node_link("openslide") }}
- method context: {{ node_link("pathology-foundation-model") }}
- companion: {{ node_link("camelyon16") }} (large breast benchmark)
- challenge paper: `aresta-2019-bach` *(article node deferred — pending §11.6)*

## References

- Challenge homepage: [iciar2018-challenge.grand-challenge.org](https://iciar2018-challenge.grand-challenge.org/)
- Aresta et al., *Medical Image Analysis* 56 (2019) 122–139 (DOI to verify)
