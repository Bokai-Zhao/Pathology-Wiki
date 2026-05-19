---
title: "CTransPath — Swin-T Pathology SSL Encoder"
description: "Swin Transformer Tiny pretrained on TCGA+PAIP with SRCL (a MoCo v3 variant). The pre-UNI open-source pathology SSL baseline."
tags: [model, foundation-model, ssl, swin, pathology]
---

# CTransPath — Swin-T Pathology SSL Encoder

{{ model("ctranspath") }}

{{ local_graph("ctranspath") }}

## Why it matters

Before {{ node_link("uni") }}, GigaPath, and Virchow, **CTransPath was the strongest open-source pathology SSL checkpoint**. Released by Tencent AI Lab in 2022, it brought transformer pretraining on TCGA-scale pathology data into the open-source toolchain and was the de-facto patch encoder for many WSI MIL pipelines through 2023–2024.

Today it remains useful as:

- The **open-weights compute-cheap baseline** when UNI's gated weights are unavailable or compute is tight.
- The **pre-UNI predecessor** to cite when documenting the evolution of pathology PFMs.

## Architecture

- **Backbone**: Swin Transformer Tiny (~28M parameters, modified for SSL).
- **Input**: H&E patches at 224×224.
- **Output**: 768-dim patch embeddings *(verify against the repo)*.

## Pretraining

- **Objective**: SRCL — Semantically-Relevant Contrastive Learning, a MoCo v3 variant that augments standard contrastive pairs with semantically-related positives drawn from a learned memory bank.
- **Data**: ~32k WSIs from TCGA + PAIP, ~15M H&E patches.

## Capabilities

- H&E patch encoding (vision only) for downstream classification / MIL / retrieval.
- Drop-in replacement for ImageNet-pretrained CNNs in any pathology pipeline.
- Open weights — no gating, easy reproduction.

## Limitations

- **Smaller backbone** (~28M params) than modern PFMs (UNI ViT-L ~307M, Virchow ViT-H ~632M).
- **Limited pretraining cohort** (TCGA + PAIP) — less stain diversity than 100k+ WSI PFMs.
- **Embedding dim 768** vs UNI's 1024 — small representation cost downstream.
- **No vision-language alignment**.

## How Claude should use this model

{{ skill_card("ctranspath") }}

Pick CTransPath when:

- Open weights matter and gated PFMs (UNI, Virchow) are off-limits.
- Compute budget is tight and a smaller backbone is acceptable.
- Documenting the pre-UNI baseline for a comparison table.

Pick {{ node_link("uni") }} when the strongest possible H&E encoder is needed.

## Related nodes

- belongs to: {{ node_link("patch-level-ssl") }}, {{ node_link("pathology-foundation-model") }}
- successor (stronger PFM): {{ node_link("uni") }}
- article: {{ node_link("ctranspath-2022") }}

## References

- DOI: [10.1016/j.media.2022.102559](https://doi.org/10.1016/j.media.2022.102559)
- Code: [github.com/Xiyue-Wang/TransPath](https://github.com/Xiyue-Wang/TransPath)
