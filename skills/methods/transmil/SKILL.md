# Skill: method — TransMIL

## Purpose
Transformer-based MIL aggregator with Nyström attention + PPEG positional encoding. Models patch-patch correlations at gigapixel scale.

## When to Use
- WSI classification where patch-patch correlations are likely informative (survival, subtyping with spatial cues)
- Large bags where Nyström attention provides compute headroom
- Tasks needing long-range context across distant patches

## Do Not Use When
- Small bag size — CLAM or ABMIL are simpler and adequate
- Need attention heatmaps as the primary output — CLAM's per-class branches are simpler to visualise
- Compute-constrained inference — Transformer adds parameters

## Standard Workflow
1. Extract patch features (frozen encoder).
2. Linear project to Transformer dim; prepend [CLS] token.
3. PPEG (multi-scale conv on the bag) → positional context.
4. Nyström self-attention Transformer layers (2 default).
5. [CLS] embedding → classifier.

## Decision Rules
- **Number of Transformer layers**: 2 default; 4 marginal gain at 2× compute.
- **Nyström rank**: paper default is fine; increase only on small bags where exact attention noticeably differs.
- **PPEG**: keep it — ablations show it's not redundant with random 2-D mixing.
- **Backbone**: never ResNet-50 ImageNet for new work — use UNI / GigaPath / CTransPath.

## Related Nodes
- parent: `weakly-supervised-mil`
- predecessor: `abmil`
- sibling: `clam`
- dataset: `camelyon16`
- article: `transmil-2021`

## Failure Modes
- Nyström rank too low on small bags → attention quality degrades.
- PPEG dropped → spatial signal lost; reverts to ABMIL-like behaviour.
- Compute OOM on extremely large bags → enable gradient checkpointing or sub-sample bags.

## Validation Checklist
- [ ] Comparison to ABMIL / CLAM reported on the same backbone
- [ ] PPEG ablation reported (or cited)
- [ ] [CLS] vs mean-of-tokens pooling choice declared
- [ ] Backbone declared
