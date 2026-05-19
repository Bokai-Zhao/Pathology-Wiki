# Skill: article — DT-MIL (Li et al. MICCAI 2021)

## Purpose
Sparse deformable-attention MIL aggregator. DETR-style sparse keys instead of full self-attention. Sibling to TransMIL in the Transformer-MIL family.

## When to Use
- Citing the deformable-attention MIL formulation
- Comparing sparse-attention MIL variants

## Do Not Use When
- Need open MIL toolkit ergonomics — CLAM repo is more polished
- Need a simpler MIL baseline — ABMIL / CLAM
- Need exhaustive Transformer attention — TransMIL

## Key Contributions
- Deformable-attention MIL aggregator (DETR-style sparse keys per query).
- Lower compute than TransMIL's Nyström-approximated full attention.
- Sibling reference in the Transformer-MIL family.

## How to Cite
> Li, H., Yang, C., Zhu, X., & Zhang, L. (2021). DT-MIL: Deformable transformer for multi-instance learning on histopathological image. *MICCAI 2021*.

## Related Nodes
- parent method: `weakly-supervised-mil`
- predecessor: `abmil-2018`
- siblings: `transmil-2021`, `dsmil-2021`, `dtfd-mil-2022`
- canonical dataset: `camelyon16`

## Failure Modes
- Citing DT-MIL when actual implementation is TransMIL — distinct attention mechanisms.
- Comparing DT-MIL numbers without controlling the patch encoder.

## Validation Checklist
- [ ] Deformable vs Nyström attention distinguished
- [ ] Patch encoder declared
- [ ] Comparison to TransMIL on matched setup reported
