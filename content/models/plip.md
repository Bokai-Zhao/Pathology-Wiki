---
title: "PLIP — Pathology Language–Image Pretraining"
description: "CLIP ViT-B/32 fine-tuned on ~200k pathology image-caption pairs from medical Twitter (OpenPath). The first widely-cited pathology VL model."
tags: [model, vision-language, foundation-model, clip, pathology]
---

# PLIP — Pathology Language–Image Pretraining

{{ model("plip") }}

{{ local_graph("plip") }}

## Why it matters

PLIP was the **first pathology vision-language foundation model with open weights**. By fine-tuning {{ node_link("clip-2021") }} on ~200k pathology image-caption pairs scraped from medical Twitter (the OpenPath corpus), Huang et al. demonstrated that domain-specific VL pretraining unlocks zero-shot H&E classification and image-text retrieval at a level CLIP-ImageNet cannot match.

PLIP is now somewhat dated — CONCH and QuiltNet outperform it on most downstream benchmarks — but it remains the standard **open-weights pathology VL baseline** and the most-cited pathology VL reference.

## Architecture

- **Image encoder**: CLIP ViT-B/32 (initialised from OpenAI CLIP, fine-tuned).
- **Text encoder**: CLIP text Transformer.
- **Output**: 512-dim shared embedding *(to verify against repo)*.
- **Parameter count**: ~150M (combined image + text) *(to verify)*.

## Pretraining

- **Objective**: InfoNCE (same as CLIP).
- **Data**: OpenPath — ~200k pathology image-caption pairs mined from medical Twitter, curated for pathology-related hashtags and clinician posts.

## Capabilities

- **Zero-shot pathology image classification** via text prompts.
- **Image-text retrieval** over pathology corpora.
- **Patch + text joint embedding** usable in retrieval-augmented pipelines.

## Limitations

- **Twitter captions are noisy** — clinical fidelity varies.
- **ViT-B/32 backbone** is small by modern PFM standards.
- **Common-finding bias** — rare conditions are under-represented in Twitter posts.
- **Patch-level only** — slide-level zero-shot needs MI-Zero or CONCH-MIL.
- **Ethical / consent concerns** — Twitter-mined data; CONCH and QuiltNet use textbook sources instead.

## How Claude should use this model

{{ skill_card("plip") }}

Pick PLIP when:

- Open weights and reproducibility matter.
- A zero-shot baseline is needed for an H&E classification task.
- The user asks for the first widely-cited pathology VL reference.

Prefer CONCH when access is available and SOTA performance matters.

## Related nodes

- belongs to: {{ node_link("pathology-vlm") }}
- extends: {{ node_link("clip-2021") }}
- article: {{ node_link("plip-2023") }}

## References

- DOI: [10.1038/s41591-023-02504-3](https://doi.org/10.1038/s41591-023-02504-3)
- Code: [github.com/PathologyFoundation/plip](https://github.com/PathologyFoundation/plip)
- Hugging Face: [vinid/plip](https://huggingface.co/vinid/plip)
