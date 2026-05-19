# Skill: article — ABMIL (Ilse, Tomczak, Welling 2018)

## Purpose
The origin paper for attention-based MIL aggregation. Cite as the foundational reference whenever attention-MIL appears in a pathology paper.

## When to Use
- Citing the origin of attention-based MIL
- Establishing the simplest learned-attention baseline in a method paper
- Teaching MIL aggregation fundamentals

## Do Not Use When
- Need spatial / sequence modelling — cite TransMIL
- Need class-specific attention — cite CLAM-MB
- Need explicit instance-instance correlations — cite DSMIL or TransMIL

## Key Contributions
- Permutation-invariant learned attention pooling for MIL.
- Vanilla vs gated attention variants.
- Free interpretability: attention weights = patch importance heatmap.

## How to Cite
> Ilse, M., Tomczak, J. M., & Welling, M. (2018). Attention-based deep multiple instance learning. *ICML* 80:2127–2136.

## Related Nodes
- proposes method: `abmil`
- parent method: `weakly-supervised-mil`
- direct successors: `clam-2021`, `transmil-2021`
- canonical eval dataset: `camelyon16`

## Failure Modes
- Citing ABMIL when the actual aggregator used is CLAM-MB → mis-attribution.
- Comparing modern PFM-pipeline numbers to original ABMIL ImageNet-feature numbers → invalid (encoder difference dominates).

## Validation Checklist
- [ ] Cited alongside the actual aggregator used (CLAM / TransMIL / etc.)
- [ ] Backbone declared explicitly when reporting ABMIL numbers
- [ ] Heatmap usage cited as ABMIL's contribution, not the downstream method's
