# Skill: method — ABMIL (Attention-Based MIL)

## Purpose
Default attention-MIL aggregator. Permutation-invariant learned attention pooling over instance embeddings; the foundational pathology MIL aggregator.

## When to Use
- First baseline for any WSI binary or multi-class slide-level task
- Need interpretable attention heatmap as a byproduct
- Educational reference for the simplest learned MIL aggregator

## Do Not Use When
- Need instance-instance correlation modelling — use TransMIL / DSMIL
- Need per-class attention branches — use CLAM-MB
- Need spatial layout — pair with positional encoding (TransMIL)

## Standard Workflow
1. Extract patch features (frozen encoder).
2. Apply 2-layer MLP attention head → scalar weight per patch.
3. Softmax over patches → bag embedding = weighted sum.
4. Classifier on bag embedding.
5. Cross-entropy training; backprop through entire pipeline (or freeze encoder).

## Decision Rules
- **Vanilla vs gated**: gated often improves calibration on harder bags.
- **Encoder frozen vs end-to-end**: frozen + PFM backbone is the modern default; end-to-end is rarely worth the compute.
- **Attention temperature**: tune via dev set; affects heatmap sparsity.

## Related Nodes
- parent: `weakly-supervised-mil`
- successors: `clam`, `transmil`, `dsmil` (pending), `dtfd-mil` (pending)
- canonical dataset: `camelyon16`
- article: `abmil-2018`

## Failure Modes
- Attention collapses (one patch ~ 1.0, rest ~ 0) → check temperature / regularisation.
- Loss explodes with end-to-end training → use frozen backbone or gradient clipping.

## Validation Checklist
- [ ] Attention weights sum to ~1 per bag (after softmax)
- [ ] Top-attended patches inspected qualitatively — should be tumour/region of interest
- [ ] Bag-AUC reported on Camelyon16 (or equivalent)
- [ ] Comparison to mean/max pooling reported in ablation
