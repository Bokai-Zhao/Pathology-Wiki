---
title: "MI-Zero — Visual-Language Pretrained MIL Zero-Shot Transfer for Histopathology (Lu et al. CVPR 2023)"
description: "Lift patch-level pathology VL zero-shot to slide-level via top-k pooling over patch VL similarity scores. No slide-level training."
tags: [article, technical-article, vision-language, mil, zero-shot, wsi]
---

# Visual Language Pretrained Multiple Instance Zero-Shot Transfer for Histopathology Images

{{ article("mi-zero-2023") }}

{{ local_graph("mi-zero-2023") }}

## Why it matters

{{ node_link("plip-2023") }} and other patch-level pathology VLMs perform zero-shot classification on **patches**, but most clinically meaningful pathology tasks are **slide-level**. MI-Zero is the first widely-cited method that bridges patch-VL → slide-level zero-shot, without any slide-level training. The key insight: aggregate patch-level VL similarity scores against a text prompt over the slide's patches using simple pooling — **top-k**, **weighted top-k**, or identity — producing a slide-level zero-shot prediction.

MI-Zero enabled the modern slide-level zero-shot WSI pipeline and is the seed paper for CONCH-MIL and other slide-level VL methods.

## Core idea

```
for each patch p in slide S:
    score(p, class_k) = <image_enc(p), text_enc(prompt_k)>
slide_score(class_k) = top_k_pool({score(p, class_k) for p in S})
prediction(S) = argmax_k slide_score(class_k)
```

Three pooling functions explored: **top-k mean**, **weighted top-k**, **identity** (mean over all patches). Top-k mean is the default — it captures the strongest patch-level VL evidence per class while ignoring the long tail of weak signals.

## Inputs and outputs

- **Input**: WSI patch bag + text prompts (one per class).
- **Output**: slide-level zero-shot class probability (no slide-level training).

## Datasets / tasks / metrics

- TCGA-NSCLC subtyping.
- TCGA-RCC subtyping.
- TCGA-BRCA subtyping.
- Metrics: zero-shot accuracy, AUC, balanced accuracy.

## Method

- Patch-level VL encoder: any pathology VLM (the authors use a contemporaneous Mahmood-Lab model; PLIP can be substituted).
- Patch-level similarity score against each candidate text prompt.
- Aggregation across the slide's patches via top-k pooling.
- No training at slide level.

## Main results

MI-Zero achieves competitive zero-shot performance on TCGA-NSCLC, TCGA-RCC, TCGA-BRCA — closing the gap to fully-supervised MIL on the easier tasks. The aggregation choice (top-k pooling, k ≈ 25 in the paper) matters more than alternative complicated schemes.

## Limitations

- **Zero-shot lags supervised** on most tasks — useful for label-poor regimes.
- **Prompt-sensitive** — small prompt changes shift accuracy noticeably.
- **Patch encoder quality dominates** — the choice of pathology VLM upstream matters more than the aggregation details.
- **Top-k aggregation is coarse** — under-weights diffuse signal across many low-attention patches; misses subtle patterns.

## How Claude should use this article

{{ skill_card("mi-zero-2023") }}

Cite MI-Zero as the **first slide-level pathology VL zero-shot method**. When the user asks "how do I do zero-shot WSI classification without slide labels?", this is the canonical answer.

## Related nodes

- extends: {{ node_link("pathology-vlm") }}
- related: {{ node_link("weakly-supervised-mil") }} (borrows MIL-style aggregation)
- related: {{ node_link("plip-2023") }} (canonical underlying patch VL encoder)
- foundation: {{ node_link("clip-2021") }}

## References

- DOI: [10.1109/CVPR52729.2023.01893](https://doi.org/10.1109/CVPR52729.2023.01893)
- arXiv: [2306.07831](https://arxiv.org/abs/2306.07831)
- *CVPR 2023* pp 19764–19775
- Code: [github.com/mahmoodlab/MI-Zero](https://github.com/mahmoodlab/MI-Zero)
