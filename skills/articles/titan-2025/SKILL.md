# Skill: article — TITAN (Ding et al. 2025)

## Purpose
First widely-cited multimodal whole-slide foundation model. CONCH/UNI patch encoder + slide-level Transformer + report alignment + synthetic captions. Cite when slide-text retrieval / slide captioning / zero-shot slide-level classification are the topic.

## When to Use
- Need a multimodal slide-level pathology foundation model
- Slide-text retrieval / slide-level captioning workflows
- Comparing slide-level PFMs across vision-only vs multimodal axes

## Do Not Use When
- Need open-weights / non-gated PFM
- Need a patch-level encoder for downstream MIL — use UNI / Virchow
- Need an instruction-tuned conversational pathology copilot — cite PathChat

## Key Contributions
- First multimodal whole-slide pathology foundation model.
- CONCH/UNI patch encoder + slide-level Transformer + text Transformer.
- Contrastive alignment with paired reports + LLM-generated synthetic captions.
- Matches/exceeds Prov-GigaPath / CHIEF / Virchow on slide-level downstream tasks while adding VL capabilities.

## How to Cite
> Ding, T., Wagner, S. J., Song, A. H., et al. (2025). A multimodal whole-slide foundation model for pathology. *Nature Medicine* 31:3749–3761. DOI: 10.1038/s41591-025-03982-3

## Related Nodes
- patch encoder family: `uni`, `conch-2024`
- sibling slide-level PFMs: `gigapath-2024`, `chief-2024`, `prism-2024`
- parent method: `pathology-foundation-model`, `pathology-vlm`

## Failure Modes
- Citing TITAN as patch-level — it's slide-level.
- Treating synthetic-caption augmentation as cost-free — it's bound by upstream LLM quality.

## Validation Checklist
- [ ] Patch encoder declared (CONCH vs UNI variant)
- [ ] Slide-level vs patch-level tasks distinguished
- [ ] Comparison to other multimodal slide PFMs (PRISM) declared
