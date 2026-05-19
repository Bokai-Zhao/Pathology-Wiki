---
title: "MIDOG — Mitosis Domain Generalization Challenge"
description: "Multi-scanner, multi-tumour mitotic-figure detection benchmark on H&E."
tags: [dataset, mitosis, h-and-e, domain-generalization, detection]
---

# MIDOG — MItosis DOmain Generalization Challenge

{{ dataset("midog") }}

{{ local_graph("midog") }}

## What it contains

MIDOG is the canonical **multi-domain mitosis-detection benchmark** on H&E. The release combines high-power-field (HPF) annotations across multiple scanners, institutions, and tumour types:

- **Human breast cancer**
- **Canine cutaneous mast cell tumour** (the original 2021 cohort)
- **Melanoma** (human and canine)
- **Neuroendocrine tumour**
- **Lymphoma**

Annotations are mitotic-figure **centre points** + class label (true mitosis vs hard-negative "lookalike"). Editions: MIDOG 2021, 2022, 2025 — each adds new tumour cohorts; cite the edition explicitly.

## Modalities and scope

- **Modality**: H&E
- **Organs**: breast, skin, lung, lymph node, soft tissue *(varies by edition)*
- **Disease**: cancers with mitotic-count-driven grading
- **Species**: human + canine (cross-species design is intentional)
- **Specimen type**: WSIs cropped to annotated HPFs

## Tasks and metrics

| Task | Metric |
|------|--------|
| Mitotic figure detection | **F1** at fixed IoU / centre-distance tolerance (primary), precision, recall |
| Mitosis vs lookalike classification | AP |

## Access

Distributed at `imig.science/midog`. Requires registration. **CC BY 4.0** for training data; test data held by the organisers for ongoing evaluation submissions.

## Preprocessing

```python
import openslide, json
slide = openslide.OpenSlide("/data/midog/001.tif")
ann = json.load(open("/data/midog/midog2022_annotations.json"))
```

Pipeline:

1. Read `.tif` via {{ node_link("openslide") }}.
2. **Only score detections inside the provided HPF regions** — annotations are exhaustive only there. Outside HPFs the "ground truth" is undefined; counting false positives outside inflates error unfairly.
3. Patch at **40×** (~0.25 μm/px) — mitotic figures are only ~10–20 pixels wide.
4. Mine **hard-negative lookalikes** from the released annotations — they are the major source of false positives.

## Why it matters

MIDOG is explicitly built to **break single-domain models**: training on one scanner + tumour type and testing on others produces sharp degradation, which is the point. It is the standard benchmark for **domain generalisation** in pathology and for **prognostic mitotic-count workflows** (mitoses per area is a routine grading input in clinical pathology).

## Known pitfalls

- **Annotations are HPF-region-bounded** — running detection outside those regions inflates false positives.
- **Cross-scanner / cross-tumour drift is the point** — naive single-domain training collapses; reviewers expect explicit domain-generalisation or domain-adaptation reporting.
- **Mitotic figures are tiny** (~10–20 px at 40×) — ImageNet-style downsizing destroys them.
- **Ordinal mitotic counts** (per ROI) feed prognostic grading systems — calibrate count thresholds against pathologist consensus before clinical claims.
- **Edition matters** — 2021 was canine-only-ish, 2022 added cohorts, 2025 again — always cite the edition.

## How Claude should use this dataset

{{ skill_card("midog") }}

MIDOG is the **only benchmark to use when evaluating mitotic-count workflows or pathology domain generalisation**. Pair with {{ node_link("pannuke") }} when the broader question is "general nuclei + specific mitoses".

## Related nodes

- tool: {{ node_link("openslide") }}
- companion: {{ node_link("pannuke") }} (nuclei broadly)
- challenge paper: `aubreville-2023-midog` *(article node deferred — pending §11.6)*

## References

- Homepage: [imig.science/midog](https://imig.science/midog/)
- Data page: [imig.science/midog/the-dataset/](https://imig.science/midog/the-dataset/)
- Aubreville et al., *Medical Image Analysis* 84 (2023) 102699 (DOI to verify)
