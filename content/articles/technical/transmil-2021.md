---
title: "TransMIL — Transformer-based Correlated MIL (Shao et al. 2021)"
description: "Nyström self-attention + PPEG positional encoding for WSI MIL; models patch-patch correlations at gigapixel scale."
tags: [article, technical-article, mil, transformer, wsi]
---

# TransMIL — Transformer based Correlated Multiple Instance Learning for Whole Slide Image Classification

{{ article("transmil-2021") }}

{{ local_graph("transmil-2021") }}

## Why it matters

{{ node_link("abmil") }} and {{ node_link("clam") }} score each patch in isolation — the MIL assumption is *permutation-invariant pooling*. But tumour tissue is spatially organised: lesions are contiguous, immune infiltration is contextual, gland architecture only makes sense across multiple patches. TransMIL is the first widely adopted MIL variant that **explicitly models instance-instance correlations** at gigapixel scale via Transformer self-attention.

## Core idea

```
patches → linear proj → [CLS] + sequence
   → PPEG (multi-scale spatial conv)
   → Nyström-attention Transformer layers
   → [CLS] embedding → classifier
```

Two key ingredients:

1. **Nyström self-attention** — drops attention cost from O(N²) to O(N), making bags of thousands of patches tractable.
2. **PPEG (Pyramid Position Encoding Generator)** — re-injects 2-D spatial context via multi-scale convolutions on the bag, restoring spatial signal lost in the otherwise permutation-invariant Transformer sequence.

## Inputs and outputs

- **Input**: bag of patch features per WSI (from any encoder).
- **Output**: slide-level class probability.

## Datasets / tasks / metrics

- {{ node_link("camelyon16") }} — breast lymph-node metastasis (binary).
- **TCGA-NSCLC** — non-small cell lung cancer subtyping.
- **TCGA-RCC** — renal cell carcinoma subtyping.
- Metrics: AUC, accuracy, F1.

## Method

- Default ResNet-50 ImageNet features (paper); modern practice swaps for UNI / GigaPath features.
- 2-layer Nyström Transformer encoder.
- PPEG between Transformer layers.
- [CLS] token pooling for slide-level prediction.
- Standard cross-entropy training; Adam optimiser.

## Main results

TransMIL outperforms ABMIL, CLAM, DSMIL, and MIL-RNN on all three benchmarks. Ablations show PPEG positional encoding provides meaningful improvement over random 2-D mixing, validating the need for explicit spatial signal.

## Limitations

- **Approximate attention** — Nyström introduces variance; exact attention on small bags can outperform.
- **Parameter cost** — adds Transformer parameters vs ABMIL/CLAM.
- **Less interpretable** than CLAM's per-class attention branches — visualising "what the Transformer attends to" requires extra work.
- **Default backbone** (ResNet-50) is dated.

## How Claude should use this article

{{ skill_card("transmil-2021") }}

Reach for TransMIL when **instance-instance correlations are likely informative**: survival prediction, complex subtyping, spatial architectural cues. Cite alongside {{ node_link("clam-2021") }} and {{ node_link("abmil-2018") }} as the standard MIL benchmark triple.

## Related nodes

- proposes method: {{ node_link("transmil") }}
- parent method: {{ node_link("weakly-supervised-mil") }}
- predecessors: {{ node_link("abmil-2018") }}, {{ node_link("clam-2021") }}
- dataset: {{ node_link("camelyon16") }}

## References

- arXiv: [2106.00908](https://arxiv.org/abs/2106.00908)
- NeurIPS 2021 proceedings page
- Code: [github.com/szc19990412/TransMIL](https://github.com/szc19990412/TransMIL)
