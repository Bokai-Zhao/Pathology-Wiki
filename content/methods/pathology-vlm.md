---
title: "Pathology Vision-Language Models"
description: "Align pathology image features with text via CLIP-style contrastive pretraining; enables zero-shot classification, retrieval, captioning."
tags: [method, vision-language, pathology, foundation-model]
---

# Pathology Vision-Language Models

{{ method("pathology-vlm") }}

{{ local_graph("pathology-vlm") }}

## Why it matters

Most pathology classification pipelines require **per-task fine-tuning** with labelled slides. Pathology VL models replace the per-task classifier head with a **text encoder**: candidate class names become text prompts, the model picks the closest text to the image embedding. The class set can change at inference time without retraining — a step-change in flexibility for diagnostic pipelines that need many fine-grained labels.

Pathology VL models also enable:

- **Image-text retrieval** — find similar histology + similar reports for case review.
- **Histology captioning** — generate natural-language descriptions of patches.
- **Pathology VQA** — natural-language questions about images.
- **Retrieval-augmented reasoning** — feed retrieved similar cases into a downstream MLLM.

Modern pathology MLLMs (PathChat, MUSK, PathGen) all build on a VL foundation; without it, an MLLM cannot ground its language in pathology image semantics.

## Core idea

```
H&E patch                pathology text (caption / report / textbook)
   ↓                                  ↓
image encoder                    text encoder
   ↓                                  ↓
projection → joint embedding space ← projection
   ↓
contrastive InfoNCE loss: matched pairs close, mismatched far
```

After training, **zero-shot classification** is:

```
prob(class | image) ∝ exp(<image_emb, text_emb(prompt(class))>)
```

## Family of sub-approaches

| Sub-branch | Examples |
|------------|----------|
| Image-text contrastive (CLIP-style) | PLIP, CONCH, QuiltNet, MUSK |
| Report alignment | many recent biomedical VL models |
| Histology captioning | ARCH, PathGen-LLaVA |
| Pathology VQA | PathChat, PathVQA, Quilt-LLaVA |
| Retrieval-augmented reasoning | RAG-PathChat-style pipelines |
| Slide-level VL (MIL on VL features) | {{ node_link("mi-zero-2023") }}, CONCH-MIL |

## Key questions

- Where does the text come from — captions, reports, Twitter, textbooks?
- Image-text contrastive (CLIP) vs generative captioning vs instruction-tuned MLLM?
- How does zero-shot accuracy compare against frozen-feature linear probing?
- How to extend patch-level VL alignment to slide-level (MI-Zero, CONCH-MIL)?
- What text vocabulary covers diagnostic pathology adequately?

## Representative articles

- {{ node_link("clip-2021") }} — the foundational dual-encoder contrastive recipe.
- {{ node_link("plip-2023") }} — first widely-cited pathology VL, from Twitter-mined OpenPath.
- {{ node_link("mi-zero-2023") }} — patch-VL extended to slide-level zero-shot via top-k aggregation.

## Limitations

- **Text supervision quality varies** — Twitter captions are noisy; clinical reports are gold but hard to obtain at scale.
- **Prompt engineering** still matters — small prompt changes shift zero-shot accuracy.
- **Zero-shot lags supervised** for most tasks; useful in label-poor regimes but not always SOTA.
- **Patch-level only** in early VL models — slide-level needs additional aggregation (MI-Zero) or slide-level pretraining (CONCH-MIL).

## How Claude should use this method

{{ skill_card("pathology-vlm") }}

When the user asks "how do I do zero-shot pathology classification?", default to **CONCH** if access is available, **PLIP** as the open-weights baseline, and **MI-Zero** for slide-level lift.

## Related nodes

- predecessor: {{ node_link("patch-level-ssl") }} (architectural origin)
- representative articles: {{ node_link("clip-2021") }}, {{ node_link("plip-2023") }}, {{ node_link("mi-zero-2023") }}
- representative model: {{ node_link("plip") }}
