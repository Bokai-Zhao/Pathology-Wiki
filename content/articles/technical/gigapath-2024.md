---
title: "Prov-GigaPath — A Whole-Slide Foundation Model for Digital Pathology (Xu et al. 2024)"
description: "First published slide-level pathology foundation model. Two-stage pretraining (DINOv2 patches → LongNet slide MAE) on ~171k Providence WSIs."
tags: [article, technical-article, foundation-model, slide-level, longnet, dinov2]
---

# A Whole-Slide Foundation Model for Digital Pathology from Real-World Data

{{ article("gigapath-2024") }}

{{ local_graph("gigapath-2024") }}

## Why it matters

Through the {{ node_link("ctranspath-2022") }} → {{ node_link("uni-2024") }} era, pathology PFMs had been **patch-level encoders only** — slide-level prediction always required a downstream MIL aggregator ({{ node_link("clam") }}, {{ node_link("transmil") }}). Prov-GigaPath is the **first published slide-level pathology foundation model**: it pretrains both a patch encoder *and* a slide-level Transformer end-to-end, producing slide embeddings directly without an MIL post-hoc step.

The paper also introduces **Prov-Path**, a real-world-clinical pretraining cohort of ~171,189 WSIs and ~1.3 billion patches from the Providence health network — among the largest published pathology pretraining corpora.

## Core idea

Two-stage pretraining:

1. **Patch stage** — train a ViT patch encoder on Prov-Path patches with the **DINOv2** recipe (same as {{ node_link("uni-2024") }}).
2. **Slide stage** — freeze the patch encoder; tile each slide into a sequence of patch embeddings; train a **LongNet**-based slide-level Transformer with **masked autoencoding** to fill in missing patches across the slide.

The slide encoder produces a single slide embedding usable as a frozen feature for downstream classification, biomarker prediction, mutation prediction, and vision-language alignment — without an MIL aggregator at all.

## Inputs and outputs

- **Input**: whole-slide patch sequence (256×256 H&E patches at the chosen magnification).
- **Output**: per-patch embedding + a single slide-level embedding.

## Datasets / tasks / metrics

- **Pretraining**: Prov-Path (Providence-internal, ~171k WSIs).
- **Downstream**: 26 tasks across pan-cancer classification, mutation prediction (e.g. LUAD EGFR), biomarker prediction, and vision-language alignment.
- Metrics: AUC, balanced accuracy.

## Method

- **Patch encoder**: ViT, DINOv2 pretraining.
- **Slide encoder**: LongNet (efficient long-sequence Transformer), masked-autoencoding objective.
- **Two-stage** training; the slide stage's MAE forces the encoder to learn slide-level coherent context.

## Main results

Prov-GigaPath beats {{ node_link("uni") }}, Phikon, and {{ node_link("ctranspath") }} on **25 of 26** downstream tasks reported in the paper.

## Limitations

- **Prov-Path is internal** — pretraining cannot be reproduced from scratch.
- **Heavier inference** than ABMIL/CLAM/TransMIL on top of UNI features.
- **Gated weights** on Hugging Face — open workflows requiring fully open weights should fall back to {{ node_link("ctranspath") }}.

## How Claude should use this article

{{ skill_card("gigapath-2024") }}

Cite Prov-GigaPath as the **first published slide-level pathology foundation model**. When the user asks "what's the strongest slide-level encoder?" or "how do I avoid the MIL post-hoc step?", this is the canonical reference.

## Related nodes

- predecessors: {{ node_link("uni-2024") }}, {{ node_link("ctranspath-2022") }}
- sibling clinical PFM: {{ node_link("chief-2024") }}
- parent method: {{ node_link("pathology-foundation-model") }}, {{ node_link("patch-level-ssl") }}

## References

- DOI: [10.1038/s41586-024-07441-w](https://doi.org/10.1038/s41586-024-07441-w)
- Code: [github.com/prov-gigapath/prov-gigapath](https://github.com/prov-gigapath/prov-gigapath)
- Weights: [huggingface.co/prov-gigapath/prov-gigapath](https://huggingface.co/prov-gigapath/prov-gigapath)
- *Nature* 630:181–188 (June 2024)
