# Skill: article — MCAT (Chen et al. ICCV 2021)

## Purpose
Cross-modal co-attention Transformer fusion for histology-genomics survival prediction. Predecessor of PORPOISE in Mahmood Lab's multimodal pathology line.

## When to Use
- Multimodal histology-genomics survival prediction
- Cross-modal Transformer fusion in pathology
- Comparing multimodal pathology AI baselines

## Do Not Use When
- Have no matched genomics — H&E-only PFMs are the alternative
- Need a slide-level PFM — MCAT is patch-level MIL

## Key Contributions
- Co-attention Transformer fusion of WSI patch features with bulk genomics.
- Cross-modal attention between histology and genomics branches.
- Cox proportional-hazards head for survival.
- Predecessor of PORPOISE in Mahmood Lab.

## How to Cite
> Chen, R. J., Lu, M. Y., Weng, W.-H., et al. (2021). Multimodal co-attention transformer for survival prediction in gigapixel whole slide images. *ICCV 2021*.

## Related Nodes
- successor: `porpoise-2022`
- patch encoder: `clam` (`clam-2021`)
- sibling transcriptomics-guided pretraining: `tangle-2024`
- parent method: `weakly-supervised-mil`

## Failure Modes
- Citing MCAT for non-survival tasks — its primary task is survival.
- Comparing MCAT numbers without controlling for patch encoder.

## Validation Checklist
- [ ] Genomics modalities used (RNA-seq / mutation / CNV) declared
- [ ] Cox loss declared
- [ ] Comparison to histology-only / genomics-only baselines reported
