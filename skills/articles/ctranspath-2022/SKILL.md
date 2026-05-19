# Skill: article — CTransPath (Wang et al. 2022)

## Purpose
The pre-UNI open-source pathology SSL reference. Cite whenever a pipeline uses CTransPath features or when documenting the evolution of pathology PFMs.

## When to Use
- Need an open-weights pathology SSL baseline (no gating)
- Compute-budget-constrained training (small backbone)
- Comparing PFMs — cite CTransPath as the pre-UNI predecessor
- Documenting the evolution of pathology SSL recipes

## Do Not Use When
- Need the strongest possible H&E encoder — UNI / GigaPath / Virchow outperform
- Need slide-level pretraining — GigaPath
- Need VL capabilities — CONCH / PLIP

## Key Contributions
- Swin Transformer Tiny pretrained on ~32k TCGA+PAIP WSIs (~15M patches).
- SRCL (Semantically-Relevant Contrastive Learning): MoCo v3 + semantic positives from memory bank.
- Open-source weights and code → wide adoption as the de-facto open patch encoder in 2022–2023.

## How to Cite
> Wang, X., Yang, S., Zhang, J., Wang, M., Zhang, J., Yang, W., Huang, J., & Han, X. (2022). Transformer-based unsupervised contrastive learning for histopathological image classification. *Medical Image Analysis* 81:102559. DOI: 10.1016/j.media.2022.102559

## Related Nodes
- releases model: `ctranspath`
- proposes method: `patch-level-ssl`
- successor article (stronger PFM): `uni-2024`

## Failure Modes
- Treating CTransPath as state of the art in 2024+ — UNI / GigaPath / Virchow outperform.
- Comparing CTransPath numbers to UNI numbers across different MIL aggregators → confounded.
- Forgetting that CTransPath was the open baseline before mass-PFM era.

## Validation Checklist
- [ ] Cited as the pre-UNI open-source pathology SSL reference
- [ ] Backbone (Swin-T) declared
- [ ] Embedding dim (768) declared
- [ ] Pretraining cohort (TCGA + PAIP) declared
