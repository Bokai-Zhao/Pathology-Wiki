# Skill: article — PORPOISE (Chen et al. 2022)

## Purpose
Most-cited pre-PFM-era multimodal pathology AI paper. Pan-cancer histology-genomics survival framework: CLAM-style MIL + RNA-seq/mutation/CNV fusion + Cox head across 14 TCGA cancers.

## When to Use
- Multimodal histology-genomics survival prediction
- Pan-cancer prognosis stratification
- Citing the most-used multimodal pathology AI baseline

## Do Not Use When
- Have no matched genomics — H&E-only PFMs (UNI / Virchow / Prov-GigaPath) are the alternative
- Need a slide-level PFM — PORPOISE is patch-level MIL

## Key Contributions
- Pan-cancer multimodal survival framework: 14 cancers, ~5,720 TCGA patients.
- CLAM-style MIL + multimodal fusion + Cox proportional-hazards head.
- Interpretable prognosis: risk attribution to morphological + molecular features.

## How to Cite
> Chen, R. J., Lu, M. Y., Williamson, D. F. K., et al. (2022). Pan-cancer integrative histology-genomic analysis via multimodal deep learning. *Cancer Cell* 40:865–878.e6. DOI: 10.1016/j.ccell.2022.07.004

## Related Nodes
- predecessor: `mcat-2021`
- patch encoder: `clam` (`clam-2021`)
- sibling transcriptomics-guided slide PFM: `tangle-2024`
- parent method: `weakly-supervised-mil`

## Failure Modes
- Citing PORPOISE without acknowledging it requires paired multimodal data.
- Comparing pan-cancer training against per-cancer specialised models without controlling for that.

## Validation Checklist
- [ ] Pan-cancer vs per-cancer training declared
- [ ] Modalities used (RNA-seq / mutations / CNV) declared
- [ ] C-index reported per-cancer in addition to pooled
