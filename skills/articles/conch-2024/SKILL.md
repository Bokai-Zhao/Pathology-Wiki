# Skill: article — CONCH (Lu et al. 2024)

## Purpose
Modern default pathology vision-language foundation model. ViT-B/16 + text Transformer, CoCa-style dual objective on textbook/paper image-caption pairs. Successor to PLIP.

## When to Use
- Need state-of-the-art pathology VL foundation model
- Zero-shot pathology classification with state-of-the-art accuracy
- Image-text / text-image retrieval on pathology corpora
- Comparing pathology VL models

## Do Not Use When
- Need open weights without gating — fall back to PLIP
- Need a clinical conversational model — cite PathChat instead
- Need slide-level zero-shot — extend with MI-Zero / CONCH-MIL

## Key Contributions
- High-quality CONCH-1.17M corpus (textbook + paper image-caption pairs) replaces noisy Twitter captions.
- CoCa-style dual contrastive + captioning objective.
- 14 downstream tasks across zero-shot classification, retrieval, segmentation, cross-modal subtyping.
- State of the art over PLIP / BiomedCLIP / CLIP-ImageNet on all reported tasks.

## How to Cite
> Lu, M. Y., Chen, B., Williamson, D. F. K., et al. (2024). A visual-language foundation model for computational pathology. *Nature Medicine* 30:863–874. DOI: 10.1038/s41591-024-02856-4

## Related Nodes
- predecessor: `plip-2023` (`plip` model)
- foundation: `clip-2021`
- slide-level extension: `mi-zero-2023`
- successor MLLM: `pathchat-2024`
- parent method: `pathology-vlm`

## Failure Modes
- Citing CONCH but not specifying CoCa vs CLIP-only architecture.
- Forgetting CONCH v1.5 — a later checkpoint with stronger downstream metrics.

## Validation Checklist
- [ ] CoCa-style dual objective declared
- [ ] Backbone (ViT-B/16) declared
- [ ] Comparison to PLIP reported
- [ ] CONCH version (v1 vs v1.5) declared
