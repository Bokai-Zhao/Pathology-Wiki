# Skill: method — Pathology Vision-Language Models

## Purpose
Umbrella method for pathology vision-language models. Aligns image features with text via contrastive (CLIP-style) or generative pretraining; enables zero-shot classification, retrieval, captioning, and VQA.

## When to Use
- Discussing zero-shot pathology classification on H&E
- Comparing pathology VLMs (PLIP / CONCH / QuiltNet / MUSK)
- Positioning a new pathology VL method in the D branch of the method map
- Designing a pathology retrieval / captioning / VQA pipeline

## Do Not Use When
- User wants vision-only PFM features for MIL — link to `patch-level-ssl` instead
- User wants slide-level pretraining (GigaPath) — different sub-branch

## Standard Workflow
1. Choose pretrained VL model (CONCH / PLIP / QuiltNet / MUSK).
2. Design text prompts per class — use template ensembling for stability.
3. For patch-level zero-shot: encode patches + prompts, dot-product, softmax over classes.
4. For slide-level zero-shot: apply MI-Zero-style top-k aggregation over patch VL scores.
5. For retrieval: precompute image and text embeddings; query via nearest neighbour.

## Decision Rules
- **Default zero-shot VL**: CONCH if accessible, PLIP for open weights.
- **Slide-level zero-shot**: MI-Zero (with top-k aggregation).
- **Captioning / VQA**: PathChat, MUSK, Quilt-LLaVA for instruction-tuned MLLMs.
- **Prompt engineering**: matters substantially — use ensembles of prompts.

## Related Nodes
- predecessor: `patch-level-ssl`
- representative articles: `clip-2021`, `plip-2023`, `mi-zero-2023`
- representative model: `plip`

## Failure Modes
- Single-prompt zero-shot → high variance; use prompt ensembles.
- Patch-only evaluation on slide-level tasks → undercounts slide context; use MI-Zero.
- Comparing across pathology VLMs without controlling backbone scale or pretraining corpus.

## Validation Checklist
- [ ] VL model and pretraining corpus declared
- [ ] Text prompts shown (or template documented)
- [ ] Patch vs slide-level evaluation distinguished
- [ ] Comparison to non-VL baselines reported
