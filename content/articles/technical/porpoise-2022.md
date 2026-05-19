---
title: "PORPOISE — Pan-Cancer Integrative Histology-Genomic Analysis (Chen et al. 2022)"
description: "Mahmood Lab pan-cancer multimodal survival framework: CLAM-style MIL + RNA-seq/mutation/CNV fusion + Cox head."
tags: [article, technical-article, multimodal, survival, pan-cancer, histology-genomics]
---

# Pan-Cancer Integrative Histology-Genomic Analysis via Multimodal Deep Learning

{{ article("porpoise-2022") }}

{{ local_graph("porpoise-2022") }}

## Why it matters

PORPOISE is the **most-cited pre-PFM-era multimodal pathology AI paper**. Where {{ node_link("clam-2021") }} treats survival prediction as histology-only and earlier multimodal methods used hand-crafted feature concatenation, PORPOISE builds a unified **end-to-end pan-cancer framework** that jointly learns from H&E + bulk RNA-seq + somatic mutations + copy-number-variation across **14 cancer types and ~5,720 TCGA patients**, producing a single prognosis predictor that generalises across cancers.

The framework also enables **interpretable prognosis** by attributing risk to specific morphological / molecular features — making it directly applicable as a clinical decision support tool.

## Core idea

```
H&E patch bag ─→ CLAM-style MIL ─→ histology embedding ─┐
                                                          │
RNA-seq vector ──────────────────→ MLP ─────────────────→ multimodal fusion ─→ Cox head ─→ hazard
                                                          │
mutation/CNV ────────────────────→ MLP ─────────────────→
```

Trained end-to-end with the Cox proportional-hazards loss on 14 cancer types simultaneously.

## Inputs and outputs

- **Input**: WSI bag + bulk RNA-seq + mutation vector + CNV vector.
- **Output**: continuous hazard score → risk-stratified Kaplan-Meier curves.

## Clinical framing

| Aspect | Detail |
|--------|--------|
| Clinical problem | Pan-cancer prognosis stratification from H&E + bulk molecular data |
| Cohort | TCGA — 14 cancer types, ~5,720 patients with paired modalities |
| Endpoint | Overall survival + disease-free survival |
| Need for AI | Cheap H&E + expensive molecular profiling integrated into one model |

## Datasets / tasks / metrics

- **Cohort**: TCGA, 14 cancer types, ~5,720 patients.
- **Tasks**: survival prediction, prognosis stratification, multimodal fusion.
- **Metrics**: C-index, hazard ratio, Kaplan-Meier separation.

## Method

- **MIL**: {{ node_link("clam") }}-style attention MIL on patch features.
- **Multimodal fusion**: MLP on each genomic modality, then unified fusion network.
- **Loss**: Cox proportional-hazards.
- **Pan-cancer training**: single model across 14 cancers.

## Main results

PORPOISE outperforms histology-only ({{ node_link("clam-2021") }}-style), genomics-only Cox baselines, and early-fusion MLPs across most of the 14 cancer types. Particularly strong on cancers where H&E and molecular data carry complementary information.

## Limitations

- **Requires paired multimodal data** — limits cohorts to TCGA-class.
- **TCGA-only training** — generalisation to non-TCGA institutional cohorts is paper-extension territory.
- **Cox proportional-hazards assumption** may not hold for all cancer types.

## How Claude should use this article

{{ skill_card("porpoise-2022") }}

Cite PORPOISE as the **canonical pre-PFM multimodal pathology AI baseline** for histology-genomics survival prediction. The immediate successor to {{ node_link("mcat-2021") }} and the standard reference for pan-cancer multimodal prognosis.

## Related nodes

- predecessor: {{ node_link("mcat-2021") }}
- patch encoder: {{ node_link("clam") }} ({{ node_link("clam-2021") }})
- sibling transcriptomics-guided slide PFM: {{ node_link("tangle-2024") }}
- parent method: {{ node_link("weakly-supervised-mil") }}

## References

- DOI: [10.1016/j.ccell.2022.07.004](https://doi.org/10.1016/j.ccell.2022.07.004)
- Code: [github.com/mahmoodlab/PORPOISE](https://github.com/mahmoodlab/PORPOISE)
- *Cancer Cell* 40:865–878.e6 (August 2022)
