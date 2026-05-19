---
title: "CPTAC — Clinical Proteomic Tumor Analysis Consortium"
description: "NIH/NCI proteomics-focused sister cohort to TCGA. ~4.5k FFPE WSIs, ~2k patients across 10 cancer cohorts, paired with mass-spec proteomics + RNA-seq + mutations + clinical."
tags: [dataset, multi-omics, proteomics, pan-cancer, h-and-e, public]
---

# CPTAC — Clinical Proteomic Tumor Analysis Consortium

{{ dataset("cptac") }}

{{ local_graph("cptac") }}

## Why it matters

If {{ node_link("tcga") }} is the canonical pretraining + evaluation cohort, **CPTAC is the canonical external validation cohort**. Most modern pathology PFMs ({{ node_link("gigapath-2024") }}, {{ node_link("chief-2024") }}, {{ node_link("virchow-2024") }}, {{ node_link("uni-2024") }}, {{ node_link("conch-2024") }}) report CPTAC numbers alongside TCGA to demonstrate cross-cohort generalisation.

CPTAC is also the **only large public cohort with paired H&E + bulk mass-spec proteomics**, making it the canonical resource for *protein-expression-prediction-from-histology* research — a task TCGA cannot directly support.

## What it contains

- **~4,500 FFPE diagnostic WSIs** *(to verify exact count — varies per snapshot)*.
- **~2,000 patients** with WSI coverage *(to verify)*.
- **10 cancer cohorts**: CPTAC-LUAD, CPTAC-LSCC, CPTAC-CCRCC, CPTAC-PDA, CPTAC-UCEC, CPTAC-GBM, CPTAC-HNSCC, CPTAC-COAD, CPTAC-BRCA, CPTAC-OV (cohort list grows over phases).
- Paired **mass-spectrometry proteomics** (bulk + sometimes phosphoproteomics), **bulk RNA-seq**, **whole-exome sequencing**, **CNV**, and **structured clinical records**.

## Modalities and scope

- **Modality**: H&E + bulk proteomics + phosphoproteomics (subset) + RNA-seq + mutations + CNV + clinical records.
- **Organs**: lung, kidney, pancreas, uterus, brain, head & neck, colon, breast, ovary, etc.
- **Diseases**: 10 cancer-type cohorts spanning common and select rare cancers.
- **Species**: human.
- **Specimen type**: surgical resection FFPE diagnostic slides.

## Tasks and metrics

| Task | Metric |
|------|--------|
| Subtype classification (per cohort) | AUC, balanced accuracy |
| Mutation prediction (H&E → mutation status) | AUC |
| **Protein expression prediction** (H&E → bulk proteomics) | Pearson correlation |
| Phosphoprotein expression prediction (subset) | Pearson, Spearman |
| Survival / prognosis | C-index |
| External validation of TCGA-trained models | Cohort-shift Δ-AUC |

## Access

Hosted at the **NIH Proteomic Data Commons (PDC)**: <https://pdc.cancer.gov/pdc/>. WSIs and most omics data are open-access; some clinical fields require **dbGaP controlled-access approval** via NIH eRA Commons.

Each cohort has a per-cohort access page on the PDC. Download via the PDC API or web-portal manifests.

## Preprocessing

```bash
# Per-cohort manifest from PDC (web portal or API)
# Then download with the GDC/PDC client (analogous to gdc-client for TCGA)
```

Standard pipeline:

1. Identify cohort manifest on the PDC web portal.
2. Download WSIs (FFPE diagnostic `.svs`, Aperio).
3. Read with {{ node_link("openslide") }}.
4. Tissue segmentation + patch extraction via the {{ node_link("clam") }} toolkit (the same scripts used for TCGA work for CPTAC's barcoded WSIs).
5. **Stain normalise** (Macenko / Vahadane) — CPTAC spans multiple scanners and labs like TCGA.
6. **Match CPTAC case-id** to align WSI ↔ proteomics ↔ RNA-seq ↔ clinical.
7. **Patient-level train/test splits** — same patient may have multiple slides.

## Used by articles in this wiki

- Modern PFM downstream: {{ node_link("gigapath-2024") }}, {{ node_link("chief-2024") }}, {{ node_link("virchow-2024") }}, {{ node_link("uni-2024") }}, {{ node_link("conch-2024") }}.

CPTAC has fewer per-cohort patients than TCGA, so most papers use it for **external validation** of TCGA-trained models rather than as the primary training cohort.

## Known pitfalls

- **Small per-cohort sizes** — typically n<200 patients per cohort with full proteomics + WSI; cross-cohort pretraining helps.
- **Multi-cohort, multi-scanner** drift like TCGA — colour and resolution differ across cohorts.
- **Sparse modality coverage** — some cases have proteomics but no WSI, or vice versa; case-id matching MUST verify modality availability.
- **Patient-level splits** required (one patient → multiple slides possible).
- **Phase II / III / IV cohorts** have different acquisition protocols — pooling without harmonisation produces noise.
- **Continuous proteomics labels** (mass-spec abundances) — need binning / thresholding for classification tasks.
- **Don't use CPTAC for both training and test on the same paper** — that defeats its role as the canonical *external* validation cohort.

## How Claude should use this dataset

{{ skill_card("cptac") }}

CPTAC is the **canonical external validation cohort for TCGA-trained models** and the only large public cohort with paired H&E + proteomics. When the user asks "how do I validate a TCGA-trained model on a held-out cohort?" or "where do I get pathology + bulk proteomics?", CPTAC is the answer.

## Related nodes

- sister cohort: {{ node_link("tcga") }}
- tool: {{ node_link("openslide") }}
- toolkit: {{ node_link("clam") }}
- companion datasets: {{ node_link("camelyon16") }}, {{ node_link("panda") }}, {{ node_link("pannuke") }}, {{ node_link("midog") }}

## References

- PDC portal: [pdc.cancer.gov/pdc/](https://pdc.cancer.gov/pdc/)
- Programme page: [proteomics.cancer.gov/programs/cptac](https://proteomics.cancer.gov/programs/cptac)
- Founding paper: Ellis et al., *Cancer Cell* (2013)
