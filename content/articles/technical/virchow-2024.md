---
title: "Virchow — A Foundation Model for Clinical-Grade Pathology and Rare Cancer Detection (Vorontsov et al. 2024)"
description: "Largest published pathology PFM at release: ViT-H/14, DINOv2, ~1.5M WSIs / ~2B patches from MSKCC."
tags: [article, technical-article, foundation-model, vit-h, dinov2, rare-cancer]
---

# A Foundation Model for Clinical-Grade Computational Pathology and Rare Cancers Detection

{{ article("virchow-2024") }}

{{ local_graph("virchow-2024") }}

## Why it matters

Virchow tests the **PFM scaling hypothesis** at pathology scale: take {{ node_link("uni-2024") }}'s recipe (DINOv2, ViT, multi-cohort H&E pretraining), push the model from ViT-L (~307M params) to **ViT-H/14 (~632M params)**, push the data from ~100k WSIs to **~1.5M WSIs / ~2B patches** (MSKCC-internal Virchow cohort), and report the resulting downstream gains. The paper's framing emphasises **rare-cancer detection** — the regime where pretraining-data scale dominates downstream performance.

At release, Virchow is the **largest published pathology PFM by both parameter count and pretraining data**.

## Core idea

- **Encoder**: ViT-H/14, ~632M parameters.
- **Pretraining**: DINOv2 on the MSKCC Virchow cohort (~1.5M WSIs, ~2B 224×224 patches).
- **Headline evaluation**: 17 tissue / cancer types + 7 rare-cancer detection tasks; gains are largest on the rarest classes.

## Inputs and outputs

- **Input**: H&E patch, 224×224.
- **Output**: 1280-dim patch embedding *(to verify against repo)*.

## Datasets / tasks / metrics

- **Pretraining**: MSKCC Virchow cohort (internal).
- **Downstream**: 17 tissue / cancer types + 7 rare-cancer tasks.
- Metrics: AUC, balanced accuracy, top-k accuracy.

## Method

- ViT-H/14 backbone with DINOv2 pretraining recipe (self-distillation + iBOT + KoLeo regulariser).
- Large-scale GPU pretraining; ablations on data scale and backbone size.

## Main results

Virchow matches or beats {{ node_link("uni") }}, {{ node_link("ctranspath") }}, Phikon, and {{ node_link("gigapath-2024") }}'s patch encoder on the majority of patch-level and slide-level downstream tasks. Rare-cancer regimes show the largest gains, validating the scale framing.

## Limitations

- **Pretraining cohort is MSKCC-internal** — open replication blocked.
- **ViT-H is large** — inference costs higher than ViT-L (UNI) or Swin-T (CTransPath).
- **Gated weights** via Paige.AI on Hugging Face — open workflows should fall back to {{ node_link("ctranspath") }}.
- **Patch-level only** — slide-level downstream needs MIL aggregation.

## How Claude should use this article

{{ skill_card("virchow-2024") }}

Cite Virchow as the **largest published pathology PFM at release** and as the **rare-cancer-focused** member of the 2024 PFM cohort. When the user asks about PFM scaling, this is the canonical data point.

## Related nodes

- sibling PFMs: {{ node_link("uni-2024") }}, {{ node_link("gigapath-2024") }}, {{ node_link("chief-2024") }}
- predecessor: {{ node_link("ctranspath-2022") }}
- parent method: {{ node_link("pathology-foundation-model") }}, {{ node_link("patch-level-ssl") }}

## References

- DOI: [10.1038/s41591-024-03141-0](https://doi.org/10.1038/s41591-024-03141-0)
- Weights: [huggingface.co/paige-ai/Virchow](https://huggingface.co/paige-ai/Virchow)
- *Nature Medicine* 30:2924–2935 (October 2024)
