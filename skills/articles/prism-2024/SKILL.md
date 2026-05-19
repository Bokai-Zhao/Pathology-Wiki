# Skill: article — PRISM (Shaikovski et al. 2024)

## Purpose
Paige.AI's multimodal generative slide-level PFM. Virchow patch encoder + slide-level Transformer + generative text decoder. Sister to TITAN with explicit slide-level report generation.

## When to Use
- Need a multimodal slide-level PFM with generative captioning
- Slide-level report generation pipelines
- Comparing multimodal slide-level PFMs (TITAN vs PRISM)

## Do Not Use When
- Need open-weights / non-gated PFM
- Need an instruction-tuned conversational copilot — PathChat
- Need patch-level encoder — Virchow / UNI

## Key Contributions
- Paige.AI multimodal slide-level PFM building on Virchow.
- Adds generative text decoder for slide-level report generation.
- Contrastive alignment + generative captioning loss.

## How to Cite
> Shaikovski, G., Casson, A., Severson, K., et al. (2024). PRISM: A multi-modal generative foundation model for slide-level histopathology. arXiv:2405.10254.

## Related Nodes
- patch encoder: `virchow-2024`
- sibling: `titan-2025`
- predecessor: `gigapath-2024`
- parent method: `pathology-foundation-model`, `pathology-vlm`

## Failure Modes
- Citing PRISM as text-only — it's multimodal slide-level.
- Treating generative caption quality as ground truth — pathology reports vary by institution.

## Validation Checklist
- [ ] Generative vs contrastive task distinguished
- [ ] Patch encoder (Virchow) declared
- [ ] Comparison to TITAN noted
