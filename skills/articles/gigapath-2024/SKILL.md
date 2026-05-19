# Skill: article — Prov-GigaPath (Xu et al. 2024)

## Purpose
First published slide-level pathology foundation model. Cite when discussing slide-level pretraining or two-stage patch-then-slide PFM recipes.

## When to Use
- Designing or comparing slide-level pretraining recipes
- Choosing a strong slide-level encoder for downstream WSI tasks
- Citing the precedent for two-stage patch-then-slide pretraining

## Do Not Use When
- Need open pretraining data — Prov-Path is internal
- Need a lightweight encoder — LongNet adds compute
- Need a vision-language model — cite CONCH / MUSK / PLIP

## Key Contributions
- First whole-slide pathology foundation model (vs patch-only PFMs).
- Prov-Path pretraining cohort: ~171k WSIs / ~1.3B patches from Providence health network.
- Two-stage pretraining: DINOv2 patch encoder → LongNet slide-level Transformer with masked autoencoding.
- Beats UNI / Phikon / CTransPath on 25/26 downstream tasks.

## How to Cite
> Xu, H., Usuyama, N., Bagga, J., et al. (2024). A whole-slide foundation model for digital pathology from real-world data. *Nature* 630:181–188. DOI: 10.1038/s41586-024-07441-w

## Related Nodes
- predecessors: `uni-2024`, `ctranspath-2022`
- sibling clinical PFM: `chief-2024`
- parent method: `pathology-foundation-model`, `patch-level-ssl`

## Failure Modes
- Comparing to UNI without specifying which slide-level aggregator UNI used → confounded.
- Treating Prov-Path as a public benchmark — it's internal.

## Validation Checklist
- [ ] Whether the user wants patch-level or slide-level encoder declared
- [ ] Comparison to UNI / Virchow uses comparable downstream protocols
- [ ] Backbone (ViT for patch, LongNet for slide) declared
