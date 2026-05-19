# Skill: article — CHIEF (Wang et al. 2024)

## Purpose
Clinical-grade-validated pathology foundation model. 19 cohorts, 32 cancer types, 60k WSIs, 24 hospitals. Cite for cross-cohort generalisation and clinical breadth.

## When to Use
- Citing a clinical-grade-validated pathology PFM
- Comparing PFMs on rare-cancer or multi-cohort generalisation
- Discussing clinical-text-aligned pretraining

## Do Not Use When
- Need open pretraining data — partly internal
- Need a slide-level pretrained encoder — Prov-GigaPath
- Need a vision-language model — CONCH / MUSK

## Key Contributions
- Multi-cohort clinical-grade PFM evaluated across 19 independent cohorts.
- Hybrid contrastive + clinical-text-aligned pretraining objective.
- Strong cross-hospital generalisation; explicit rare-cancer focus.

## How to Cite
> Wang, X., Zhao, J., Marostica, E., et al. (2024). A pathology foundation model for cancer diagnosis and prognosis prediction. *Nature* 634:970–978. DOI: 10.1038/s41586-024-07894-z

## Related Nodes
- sibling PFMs: `gigapath-2024`, `virchow-2024`, `uni-2024`
- predecessor: `ctranspath-2022`

## Failure Modes
- Citing CHIEF for slide-level pretraining — it's patch-level (Prov-GigaPath is the slide-level reference).
- Treating the public checkpoint as text-aligned — the released variant is image-only.

## Validation Checklist
- [ ] Image-only vs text-aligned variant declared
- [ ] Cohort breakdown reported when claiming cross-hospital generalisation
