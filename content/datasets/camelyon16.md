---
title: "Camelyon16 — Breast Cancer Lymph-Node Metastasis Detection"
description: "400 H&E sentinel-lymph-node WSIs from two centres with slide-level + lesion-level annotations."
tags: [dataset, breast-cancer, lymph-node-metastasis, h-and-e, wsi, mil]
---

# Camelyon16 — Cancer Metastases in Lymph Nodes 2016

{{ dataset("camelyon16") }}

{{ local_graph("camelyon16") }}

## What it contains

Camelyon16 is the founding public benchmark for **breast cancer metastasis detection in sentinel lymph nodes** on H&E WSIs. The release contains **400 whole-slide images** (270 training + 130 test) contributed by **Radboud University Medical Center** and **Utrecht University Medical Center**.

Each slide is labelled at three granularities:

- **Slide-level**: negative / isolated tumor cells (ITC) / micrometastasis / macrometastasis.
- **Lesion-level**: exhaustive polygons around contiguous tumor regions on positive slides (XML/JSON).
- **Pixel-level**: derived tumor masks from the lesion polygons.

## Modalities and scope

- **Modality**: H&E
- **Organ**: lymph node (sentinel) — breast-cancer specimen
- **Disease**: breast cancer with regional metastasis
- **Species**: human
- **Specimen type**: sentinel lymph node sections

## Tasks and metrics

| Task | Metric |
|------|--------|
| Slide-level tumor presence | AUC |
| Lesion-level detection | **FROC** (free-response ROC) — the headline challenge metric |
| Pixel segmentation | Dice (secondary) |

FROC measures sensitivity at fixed false-positive-per-image counts and is the standard against which weakly supervised MIL pipelines are reported.

## Access

Hosted via the grand-challenge platform (`camelyon17.grand-challenge.org/Data/` is the canonical data page for both editions). Registration required. Released under CC0 — the data are public-domain dedicated, but redistribution should still cite the JAMA 2017 challenge paper.

The full release is ~750 GB *(to verify)*; budget time for Aspera / S3 download.

## Preprocessing

```python
import openslide
slide = openslide.OpenSlide("/data/camelyon16/training/tumor/tumor_001.tif")
print(slide.level_dimensions, slide.properties.get("openslide.mpp-x"))
```

Standard pipeline:

1. Read `.tif` via {{ node_link("openslide") }} — handles Aperio / Hamamatsu vendor blocks.
2. Tissue mask at level 4-6 (downsample) → keep only foreground patches.
3. Patch at 20× or 40× (challenge slides have 40× level); 256×256 conventional for MIL.
4. Build positive/negative patch labels from the XML tumor polygons.

## Why it matters

Camelyon16 is the **seed dataset for the entire weakly-supervised MIL literature in pathology** — ABMIL, CLAM, TransMIL, DSMIL, DTFD-MIL all report Camelyon16 numbers. Any new WSI classification method without a Camelyon16 number is treated with suspicion.

## Known pitfalls

- **Two-centre, two-scanner** drift — Pannoramic 250 Flash (Radboud) vs Aperio (Utrecht). Stain and resolution differ.
- **Lesion vs slide metrics tell different stories** — high AUC with low FROC means the model is voting correctly but localising poorly.
- **ITC may be under-annotated** — exhaustive polygons cover the main contiguous lesion only.
- **Camelyon17 is a different challenge** (patient-level pN staging on 1000 slides from 5 centres) — do not conflate.

## How Claude should use this dataset

{{ skill_card("camelyon16") }}

Camelyon16 is the **first benchmark to run** when proposing a new WSI classification / MIL method. Always pair slide-AUC with lesion-FROC.

## Related nodes

- tool: {{ node_link("openslide") }}
- method context: {{ node_link("pathology-foundation-model") }}
- companion benchmark: {{ node_link("panda") }} (grading complement)
- challenge paper: `bejnordi-2017-camelyon16` *(article node deferred — pending §11.6)*

## References

- Challenge homepage: [camelyon16.grand-challenge.org](https://camelyon16.grand-challenge.org/)
- Data download (joint with Camelyon17): [camelyon17.grand-challenge.org/Data/](https://camelyon17.grand-challenge.org/Data/)
- Bejnordi et al., *JAMA* 2017 (DOI to verify)
