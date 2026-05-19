# Skill: article — Lunit-DINO (Kang et al. 2022)

## Purpose
Benchmarks 4 SSL recipes on pathology data and releases the Lunit-DINO ViT-S/16 checkpoint (TCGA + TULIP). Established DINO as the canonical pretraining recipe for pathology PFMs.

## When to Use
- Citing the precedent for DINO pathology pretraining
- Open-weights compute-cheap SSL baseline (alternative to CTransPath / Phikon)
- Comparing pre-DINOv2 vs DINOv2 pathology recipes

## Do Not Use When
- Need state-of-the-art performance — UNI / Virchow / Prov-GigaPath outperform
- Need Swin backbone — CTransPath is the alternative
- Need vision-language — CONCH / PLIP

## Key Contributions
- First systematic SSL benchmark on pathology data.
- DINO / SwAV / MoCo v2 / Barlow Twins compared head-to-head with matched compute.
- Released Lunit-DINO ViT-S/16 checkpoint pretrained on TCGA + TULIP.
- Established DINO as the canonical pretraining recipe for pathology — UNI / Virchow / Prov-GigaPath all use DINOv2.

## How to Cite
> Kang, M., Song, H., Park, S., Yoo, D., & Pereira, S. (2022). Benchmarking self-supervised learning on diverse pathology datasets. arXiv:2212.04690. *CVPR 2023*.

## Related Nodes
- sibling open-weights SSL: `ctranspath-2022`, `phikon-2023`
- successor (DINOv2): `uni-2024`, `virchow-2024`, `gigapath-2024`
- parent method: `pathology-foundation-model`, `patch-level-ssl`

## Failure Modes
- Treating Lunit-DINO as state-of-the-art in 2024+ — modern PFMs outperform.
- Comparing Lunit-DINO numbers across non-matched compute or backbones.

## Validation Checklist
- [ ] Backbone (ViT-S/16) declared
- [ ] Compared to Phikon / CTransPath on the same downstream tasks
- [ ] DINO recipe specified (vs DINOv2 successors)
