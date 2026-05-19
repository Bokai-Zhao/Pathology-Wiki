# Skill: article — DSMIL (Li, Li, Eliceiri 2021)

## Purpose
Dual-stream MIL aggregator with SSL pretraining. Standard sibling baseline alongside ABMIL / CLAM / TransMIL on Camelyon16-type WSI benchmarks.

## When to Use
- Citing the dual-stream MIL formulation
- Establishing the precedent for SSL-pretrained patch encoders before MIL
- Comparing MIL aggregators

## Do Not Use When
- Need a simpler MIL baseline — ABMIL / CLAM are simpler
- Need explicit Transformer self-attention — TransMIL is the canonical reference
- Need open MIL toolkit ergonomics — CLAM repo is more polished

## Key Contributions
- Dual-stream MIL: critical-instance max-pooling + non-local attention against the critical instance.
- Explicit SimCLR pretraining of the patch encoder before MIL training (precedent for modern PFM-based pipelines).
- Demonstrated gains over ABMIL / mean-pool / max-pool / RNN-MIL on Camelyon16 and TCGA-NSCLC.

## How to Cite
> Li, B., Li, Y., & Eliceiri, K. W. (2021). Dual-stream multiple instance learning network for whole slide image classification with self-supervised contrastive learning. *CVPR 2021*. arXiv: 2011.08939.

## Related Nodes
- parent method: `weakly-supervised-mil`
- predecessor: `abmil-2018`
- siblings: `clam-2021`, `transmil-2021`
- canonical dataset: `camelyon16`

## Failure Modes
- Comparing DSMIL numbers without controlling the patch encoder (SimCLR pretraining contributes substantially).
- Citing DSMIL for diffuse-signal tasks — critical-instance max-pool can miss diffuse evidence.

## Validation Checklist
- [ ] Whether SimCLR pretraining is reproduced or skipped declared
- [ ] Patch encoder named explicitly
- [ ] Comparison to ABMIL / CLAM on the same backbone reported
