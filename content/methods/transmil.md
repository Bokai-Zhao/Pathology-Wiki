---
title: "TransMIL — Transformer-based Correlated MIL"
description: "Nyström self-attention + PPEG positional encoding for WSI MIL; models instance-instance correlations at gigapixel scale."
tags: [method, mil, transformer, attention, wsi]
---

# TransMIL — Transformer-based Correlated Multiple Instance Learning

{{ method("transmil") }}

{{ local_graph("transmil") }}

## Why it matters

{{ node_link("abmil") }} and {{ node_link("clam") }} treat patches as **independent instances** — the attention score for one patch does not depend on what the others contain. In pathology, that assumption breaks: tumour regions are spatially contiguous, immune infiltration is contextual, gland architecture only makes sense across multiple patches. TransMIL fixes this with **Transformer self-attention**, which lets every patch attend to every other patch. To make this tractable on bags of thousands of patches it uses:

- **Nyström attention approximation** — drops attention cost from O(N²) to O(N).
- **Pyramid Position Encoding Generator (PPEG)** — re-injects 2-D spatial context into the otherwise permutation-invariant Transformer sequence via multi-scale convolutions on the bag.

## Core idea

```
patches → linear proj → [CLS] + sequence
   → PPEG (spatial conv)
   → Nyström-attention Transformer layers
   → take [CLS] embedding → classifier
```

The Transformer captures distant-patch correlations that attention pooling cannot. PPEG restores enough spatial signal that the model can reason about tissue architecture.

## Key questions

- **Nyström vs exact attention**: Nyström is an approximation; on small bags, exact attention can outperform.
- **Number of Transformer layers / heads**: original paper uses 2 layers; deeper helps marginally and costs compute.
- **Does PPEG matter?** Ablations in the paper show it does — random 2-D mixing alone underperforms.
- **Backbone interaction**: as with other MIL methods, the patch encoder choice (ImageNet vs CTransPath vs UNI) dominates accuracy gains.

## Representative article

- {{ node_link("transmil-2021") }} — Shao et al., *NeurIPS* 2021.

## Limitations

- **Approximate attention** — Nyström adds variance; exact attention on small bags can do better.
- **Parameter cost** — adds Transformer parameters vs ABMIL/CLAM; compute-bound deployment may prefer simpler aggregators.
- **Less interpretable** than CLAM's per-class attention branches — visualising "what the Transformer attends to" is non-trivial.

## How Claude should use this method

{{ skill_card("transmil") }}

Reach for TransMIL when **instance-instance correlations matter** (survival, complex subtyping, spatial architectural cues). For most binary slide-level classification, {{ node_link("clam") }} is simpler and adequate.

## Related nodes

- parent: {{ node_link("weakly-supervised-mil") }}
- predecessor: {{ node_link("abmil") }}
- sibling: {{ node_link("clam") }}
- dataset: {{ node_link("camelyon16") }}
- article: {{ node_link("transmil-2021") }}
