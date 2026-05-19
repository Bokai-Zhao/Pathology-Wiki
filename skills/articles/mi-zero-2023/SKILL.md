# Skill: article — MI-Zero (Lu et al. CVPR 2023)

## Purpose
The canonical reference for slide-level zero-shot pathology VL via top-k aggregation. Cite when slide-level zero-shot WSI classification is the topic.

## When to Use
- Zero-shot WSI classification needed (no slide-level labels)
- Label-poor regime where supervision is expensive
- Demonstrating that a pathology VL model can extend from patch to slide
- Comparing zero-shot vs supervised MIL on the same backbone

## Do Not Use When
- Slide-level labels are abundant — fully-supervised MIL outperforms
- Need fine-grained spatial localisation — top-k aggregation is coarse
- Need bag-level pretraining — use CONCH-MIL / slide-level VL methods

## Key Contributions
- Top-k pooling of patch-level VL similarity scores → slide-level zero-shot.
- Three aggregation variants (top-k, weighted top-k, identity).
- Demonstrated competitive zero-shot on TCGA-NSCLC / RCC / BRCA.

## How to Cite
> Lu, M. Y., Chen, B., Zhang, A., Williamson, D. F. K., Chen, R. J., Ding, T., Le, L. P., Chuang, Y.-S., & Mahmood, F. (2023). Visual language pretrained multiple instance zero-shot transfer for histopathology images. *CVPR 2023* pp 19764–19775. DOI: 10.1109/CVPR52729.2023.01893

## Related Nodes
- extends: `pathology-vlm`
- related: `weakly-supervised-mil` (borrows MIL aggregation)
- related: `plip-2023` (underlying patch VL encoder)
- foundation: `clip-2021`

## Failure Modes
- Treating top-k k as a fixed hyperparameter — sweep on a dev set.
- Forgetting that the patch encoder choice dominates → aggregation details matter less than backbone.
- Comparing zero-shot to supervised MIL without controlling backbone → confounded.

## Validation Checklist
- [ ] Patch encoder declared
- [ ] Aggregation variant + top-k value declared
- [ ] Comparison to PLIP / CONCH patch-level zero-shot reported
- [ ] Comparison to fully-supervised MIL reported (where slide labels exist)
