---
title: "TCGA — The Cancer Genome Atlas"
description: "~30k WSIs across 33 cancer types, ~11k patients, paired with bulk RNA-seq, mutations, CNV, methylation, and clinical records. The largest public multi-omics cancer cohort."
tags: [dataset, multi-omics, pan-cancer, h-and-e, rna-seq, public, foundational]
---

# TCGA — The Cancer Genome Atlas

{{ dataset("tcga") }}

{{ local_graph("tcga") }}

## Why it matters

TCGA is **the** foundational public multi-omics cancer cohort. Almost every pathology AI paper from 2018 onward uses TCGA either:

- **For pretraining** — {{ node_link("ctranspath-2022") }}, {{ node_link("phikon-2023") }}, {{ node_link("lunit-dino-2022") }}, and {{ node_link("gigapath-2024") }}'s patch encoder all train on TCGA H&E patches.
- **For downstream evaluation** — {{ node_link("clam-2021") }}, {{ node_link("transmil-2021") }}, {{ node_link("dsmil-2021") }}, {{ node_link("dtfd-mil-2022") }} all benchmark on TCGA-RCC / TCGA-NSCLC / TCGA-BRCA.
- **For multimodal studies** — {{ node_link("mcat-2021") }}, {{ node_link("porpoise-2022") }}, {{ node_link("tangle-2024") }} use paired WSI + RNA-seq + mutations.

TCGA is also the **default training cohort** in cross-cohort generalisation studies, with non-TCGA institutional data held out for testing.

## What it contains

- **~30,000 WSIs** across **33 cancer types** *(to verify exact counts)*.
- **~11,000 patients** with WSI coverage *(to verify)*.
- Paired **bulk RNA-seq, whole-exome / whole-genome sequencing, copy-number arrays, DNA methylation arrays, and structured clinical records** for most patients.
- Two slide types: **diagnostic FFPE** (`-DX-*.svs`) and **frozen sections** (`-TS-*.svs`). Most pathology AI benchmarks filter to FFPE.

## Modalities and scope

- **Modality**: H&E + bulk omics (RNA-seq, DNA mutations, CNV, methylation) + clinical records.
- **Organs**: pan-cancer — breast, lung, colon, prostate, kidney, liver, stomach, pancreas, bladder, skin, thyroid, uterus, ovary, cervix, brain, head & neck, etc.
- **Diseases**: 33 cancer-type cohorts (TCGA-BRCA, TCGA-LUAD, TCGA-LUSC, TCGA-COAD, TCGA-PRAD, TCGA-KIRC, TCGA-LIHC, ... TCGA-LAML, TCGA-DLBC).
- **Species**: human.
- **Specimen types**: surgical resection (most cohorts) + frozen sections.

## Tasks and metrics

| Task | Metric |
|------|--------|
| Subtype classification (per cohort) | AUC, balanced accuracy |
| Mutation prediction (H&E → mutation status) | AUC |
| Biomarker / mRNA expression prediction | AUC, Pearson |
| Survival / prognosis prediction | C-index, Kaplan-Meier separation |
| Tumor vs normal (per cohort) | AUC |
| MSI prediction | AUC |
| Pan-cancer foundation-model pretraining | downstream-task AUC suite |

## Access

Hosted at the **NIH Genomic Data Commons (GDC)** at <https://portal.gdc.cancer.gov/>. WSIs and most genomic data are open-access; some clinical fields and patient-level identifiers require **dbGaP controlled-access approval** via NIH eRA Commons.

Bulk download is via the official **`gdc-client`** CLI.

## Preprocessing

```bash
# Bulk-download FFPE diagnostic slides for one cohort
gdc-client download -m manifest_TCGA_BRCA_DX.txt
```

Standard pipeline:

1. **Filter to FFPE** (`-DX-*.svs`) — frozen sections are noisier.
2. **Read** with {{ node_link("openslide") }} (Aperio `.svs` format).
3. **Tissue segmentation + patch extraction** via the {{ node_link("clam") }} toolkit (TCGA-specific scripts shipped).
4. **Stain normalisation** (Macenko / Vahadane) — TCGA spans many scanners and labs.
5. **Match TCGA barcodes** (case-uuid) for multi-modal alignment of WSI ↔ RNA-seq ↔ clinical.
6. **Patient-level train/test splits** — same patient often has multiple slides; slide-level splits leak.

## Used by articles in this wiki

- Pretraining: {{ node_link("ctranspath-2022") }}, {{ node_link("phikon-2023") }}, {{ node_link("lunit-dino-2022") }}.
- MIL evaluation: {{ node_link("clam-2021") }}, {{ node_link("transmil-2021") }}, {{ node_link("dsmil-2021") }}, {{ node_link("dtfd-mil-2022") }}.
- Multimodal: {{ node_link("mcat-2021") }}, {{ node_link("porpoise-2022") }}, {{ node_link("tangle-2024") }}.
- Modern PFM downstream: {{ node_link("gigapath-2024") }}, {{ node_link("virchow-2024") }}, {{ node_link("chief-2024") }}, {{ node_link("titan-2025") }}.

## Known pitfalls

- **Multi-cohort, multi-scanner** — colour and resolution drift across cohorts is large; stain normalisation matters.
- **Frozen vs FFPE** — `-TS-*.svs` are diagnostically noisier than `-DX-*.svs`; most benchmarks filter.
- **Small per-cohort sizes** for rare cancers (e.g. CHOL n<60) — overfitting is easy; cross-cohort pretraining helps.
- **Controlled-access fields** (clinical metadata, patient IDs) require dbGaP approval — many MIL papers use only WSI + de-identified labels.
- **Same-patient multi-slide leakage** — splits MUST be patient-level, never slide-level.
- **Late-stage / academic-centre skew** — non-TCGA cohort generalisation is a known weak spot; cross-cohort eval matters.
- **Right-censored outcome labels** — survival modelling must use Cox / Kaplan-Meier-aware metrics, not classification metrics.
- **Imperfect WSI ↔ RNA-seq overlap** — case-uuid matching is the canonical join.

## How Claude should use this dataset

{{ skill_card("tcga") }}

TCGA is the **default canonical cohort** for any pathology AI experimental section. When the user asks "where do I get pathology + genomics data?", or "what's the standard cohort for pan-cancer subtyping?", the answer is TCGA. For biopsy-level prostate Gleason grading, prefer {{ node_link("panda") }}; for breast metastasis detection, {{ node_link("camelyon16") }}.

## Related nodes

- tool: {{ node_link("openslide") }}
- toolkit: {{ node_link("clam") }} (TCGA-specific preprocessing scripts)
- companion datasets: {{ node_link("camelyon16") }}, {{ node_link("panda") }}, {{ node_link("pannuke") }}, {{ node_link("midog") }}

## References

- Portal: [GDC Data Portal](https://portal.gdc.cancer.gov/)
- Project page: [cancer.gov/ccg/research/genome-sequencing/tcga](https://www.cancer.gov/ccg/research/genome-sequencing/tcga)
- Pan-Cancer flagship paper: Weinstein et al., *Nature Genetics* 45:1113–1120 (2013)
