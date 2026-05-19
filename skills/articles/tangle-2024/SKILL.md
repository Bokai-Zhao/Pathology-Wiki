# Skill: article — TANGLE (Jaume et al. 2024)

## Purpose
Transcriptomics-guided slide-level PFM. CLIP-style contrastive alignment between WSI and bulk RNA-seq. Sibling to report-guided multimodal slide PFMs (TITAN, PRISM).

## When to Use
- Need transcriptomics-guided slide-level pretraining
- Biomarker / mutation / survival prediction from H&E with RNA-seq guidance
- Multimodal pathology AI discussions

## Do Not Use When
- Have no paired RNA-seq cohort — TANGLE's pretraining cannot be reproduced from H&E alone
- Need patch-level encoder — UNI / Virchow
- Need report-guided multimodal — TITAN / PRISM

## Key Contributions
- First widely-cited transcriptomics-guided slide-level PFM.
- CLIP-style cross-modal contrastive alignment between slide and bulk RNA-seq.
- At inference time only the WSI is needed — RNA-seq encoder discarded.

## How to Cite
> Jaume, G., Oldenburg, L., Vaidya, A., et al. (2024). Transcriptomics-guided slide representation learning in computational pathology. *CVPR 2024*. arXiv:2405.11618.

## Related Nodes
- sibling multimodal slide PFMs: `titan-2025`, `prism-2024`, `madeleine-2024`
- predecessor: `uni-2024`, `gigapath-2024`
- parent method: `pathology-foundation-model`

## Failure Modes
- Treating TANGLE as a generic H&E PFM — its strength is biomarker / mutation / survival prediction, not pan-task.
- Forgetting that pretraining requires paired cohorts (TCGA-class).

## Validation Checklist
- [ ] Pretraining cohort with paired RNA-seq declared
- [ ] Inference-time inputs (slide-only) clarified
- [ ] Comparison to vision-only PFMs on biomarker tasks reported
