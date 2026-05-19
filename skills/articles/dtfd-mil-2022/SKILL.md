# Skill: article — DTFD-MIL (Zhang et al. CVPR 2022)

## Purpose
Pseudo-bag construction + double-tier feature distillation MIL. Particularly strong in low-slide-count regimes. Standard sibling reference to ABMIL / CLAM / TransMIL / DSMIL.

## When to Use
- Citing the pseudo-bag MIL formulation
- Low-slide-count regimes where pseudo-bag augmentation helps
- Comparing MIL aggregators

## Do Not Use When
- Need a simpler MIL baseline — ABMIL / CLAM
- Need explicit Transformer self-attention — TransMIL
- Compute-constrained — double-tier adds overhead

## Key Contributions
- Pseudo-bag construction: split each WSI into multiple smaller pseudo-bags.
- Double-tier MIL: inner aggregator on pseudo-bags + outer aggregator on pseudo-bag embeddings.
- Feature-distillation loss aligning inner and outer features.
- Strong on low-slide-count tasks where ABMIL / CLAM struggle.

## How to Cite
> Zhang, H., Meng, Y., Zhao, Y., et al. (2022). DTFD-MIL: Double-tier feature distillation multiple instance learning for histopathology whole slide image classification. *CVPR 2022* pp 18780–18790. DOI: 10.1109/CVPR52688.2022.01824

## Related Nodes
- parent method: `weakly-supervised-mil`
- predecessor: `abmil-2018`
- siblings: `clam-2021`, `transmil-2021`, `dsmil-2021`
- canonical dataset: `camelyon16`

## Failure Modes
- Pseudo-bag count tuned on the test set — must be on a held-out val split.
- Comparing DTFD-MIL on full-data regimes — its advantage is low-data.

## Validation Checklist
- [ ] Pseudo-bag count declared
- [ ] Comparison to ABMIL / CLAM / TransMIL / DSMIL on the same backbone
- [ ] Low-slide-count regime explicitly tested if claiming the regime advantage
