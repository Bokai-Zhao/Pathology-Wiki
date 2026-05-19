# Skill: article — Virchow (Vorontsov et al. 2024)

## Purpose
Largest published patch-level pathology PFM at release: ViT-H/14, DINOv2, ~1.5M MSKCC WSIs. Cite for PFM scaling claims and rare-cancer detection.

## When to Use
- Need the strongest published patch-level pathology PFM (rare-cancer regimes especially)
- Comparing PFM scale effects (Virchow ViT-H vs UNI ViT-L vs Phikon ViT-B)
- Citing the MSKCC-led PFM cohort

## Do Not Use When
- Compute-constrained downstream — UNI / CTransPath are smaller
- Need open weights without gating — use CTransPath / Phikon
- Need slide-level pretraining — Prov-GigaPath

## Key Contributions
- ViT-H/14, ~632M params — the largest published pathology PFM at release.
- ~1.5M WSIs / ~2B patches — the largest published pathology pretraining cohort.
- Particular emphasis on rare-cancer detection (17 tissue / cancer types + 7 rare-cancer tasks).
- Validates PFM scaling at pathology scale.

## How to Cite
> Vorontsov, E., Bozkurt, A., Casson, A., et al. (2024). A foundation model for clinical-grade computational pathology and rare cancers detection. *Nature Medicine* 30:2924–2935. DOI: 10.1038/s41591-024-03141-0

## Related Nodes
- sibling PFMs: `uni-2024`, `gigapath-2024`, `chief-2024`
- predecessor: `ctranspath-2022`

## Failure Modes
- Treating Virchow as state-of-the-art on every task — slide-level pretrained models (Prov-GigaPath) win on slide-level tasks.
- Comparing to UNI without controlling MIL aggregator on top.

## Validation Checklist
- [ ] Backbone size declared (ViT-H/14 vs ViT-L/16 vs ViT-B/16)
- [ ] Pretraining cohort size declared
- [ ] Rare-cancer subset numbers reported separately if claiming rare-cancer wins
