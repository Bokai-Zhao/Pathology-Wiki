# Skill: article — CLIP (Radford et al. 2021)

## Purpose
Architectural foundation of every modern pathology vision-language model. Cite when introducing image-text contrastive learning in any pathology context.

## When to Use
- Introducing image-text contrastive learning in any pathology paper
- Establishing the architectural precedent for PLIP / CONCH / QuiltNet
- Discussing zero-shot classification frameworks

## Do Not Use When
- Need pathology-specific VL — cite PLIP / CONCH / QuiltNet / MUSK
- Need report-grade clinical text alignment — CLIP's web text is not enough
- Need slide-level zero-shot — cite MI-Zero

## Key Contributions
- Dual-encoder (image + text) trained with InfoNCE on 400M (image, caption) web pairs.
- Zero-shot image classification via text prompts.
- Strong transfer across many downstream tasks via frozen features or full fine-tuning.

## How to Cite
> Radford, A., Kim, J. W., Hallacy, C., Ramesh, A., Goh, G., Agarwal, S., Sastry, G., Askell, A., Mishkin, P., Clark, J., Krueger, G., & Sutskever, I. (2021). Learning transferable visual models from natural language supervision. *ICML* 139:8748–8763.

## Related Nodes
- related method: `pathology-vlm`
- pathology fine-tune: `plip-2023`, `plip`
- slide-level zero-shot extension: `mi-zero-2023`

## Failure Modes
- Applying CLIP-ImageNet directly to pathology without fine-tuning → poor performance.
- Forgetting prompt-engineering sensitivity → high zero-shot variance.
- Mis-attributing pathology VL contributions to CLIP rather than PLIP / CONCH.

## Validation Checklist
- [ ] Cited as the architectural precedent (not the pathology-specific model)
- [ ] Clarified whether the work uses CLIP-ImageNet or a pathology fine-tune
- [ ] Backbone variant declared (ViT-B/32 vs ViT-L/14 vs ResNet)
