# Skill: article — TransMIL (Shao et al. 2021)

## Purpose
The standard reference for Transformer-based MIL in pathology. Cite when patch-patch correlations are explicitly modelled.

## When to Use
- WSI classification where patch-patch correlations are likely informative
- Large bags where Nyström attention provides compute headroom
- Survival or multi-class subtyping needing long-range context

## Do Not Use When
- Small bag size — CLAM or ABMIL are simpler and adequate
- Need attention heatmaps as the primary output — CLAM is easier to visualise
- Compute-constrained inference

## Key Contributions
- Nyström self-attention for tractable Transformer MIL on bags of 10³+ instances.
- PPEG (Pyramid Position Encoding Generator) for 2-D spatial context.
- Demonstrated gains over ABMIL / CLAM / DSMIL on Camelyon16 + TCGA cohorts.

## How to Cite
> Shao, Z., Bian, H., Chen, Y., Wang, Y., Zhang, J., Ji, X., & Zhang, Y. (2021). TransMIL: Transformer based correlated multiple instance learning for whole slide image classification. *NeurIPS* 34:2136–2147.

## Related Nodes
- proposes method: `transmil`
- parent method: `weakly-supervised-mil`
- predecessors: `abmil-2018`, `clam-2021`
- dataset: `camelyon16`

## Failure Modes
- Citing TransMIL but using exact attention → invalid (Nyström is the contribution).
- Comparing TransMIL on tiny bags → exact attention may outperform.
- Dropping PPEG → reverts to ABMIL-equivalent.

## Validation Checklist
- [ ] Nyström attention enabled
- [ ] PPEG enabled and ablated
- [ ] Comparison to ABMIL / CLAM reported on the same backbone
- [ ] Backbone declared
