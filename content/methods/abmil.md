---
title: "ABMIL — Attention-Based Multiple Instance Learning"
description: "Permutation-invariant learned-attention pooling for MIL bags. Foundational aggregator for pathology MIL."
tags: [method, mil, attention, wsi]
---

# ABMIL — Attention-Based Multiple Instance Learning

{{ method("abmil") }}

{{ local_graph("abmil") }}

## Why it matters

Before ABMIL, MIL pooling was dominated by **mean** and **max** — both fixed and uninformative. ABMIL introduced a **learned scalar attention weight per instance**, parameterised by a small two-layer MLP. The bag embedding becomes the attention-weighted sum of instance embeddings:

```
α_k = softmax(w^T tanh(V h_k))
bag_emb = Σ_k α_k * h_k
```

This is **permutation-invariant** (still satisfies the MIL assumption) but **trainable** (the model can up-weight informative patches). The attention weights are **interpretable** — they yield free heatmap-style localisation of which patches drove the slide-level prediction. Every modern MIL variant ({{ node_link("clam") }}, {{ node_link("transmil") }}, DSMIL, DTFD-MIL) descends from ABMIL.

## Core idea

- Two-layer MLP over instance embeddings produces a scalar weight per instance.
- **Vanilla** vs **gated** attention: gated multiplies the attention pre-activation by a separate sigmoid gate, which can improve calibration on harder bags.
- Bag embedding = attention-weighted sum.
- Classifier on top of the bag embedding.

## Key questions

- Sigmoid vs softmax attention?
- Gated attention vs vanilla — gain depends on bag size and class boundary.
- Attention temperature / scaling — affects heatmap sparsity.
- Single-head vs multi-head for multi-class bags? (Multi-head leads to {{ node_link("clam") }}-MB.)

## Representative article

- {{ node_link("abmil-2018") }} — Ilse, Tomczak, Welling, ICML 2018.

## Limitations

- **Permutation-invariant** — ignores patch positions in the slide. Spatial structure must come from elsewhere.
- **No instance-instance interaction** — each instance is scored in isolation. {{ node_link("transmil") }} addresses this.
- **Single-class attention** — multi-class extensions (CLAM-MB) need per-class branches.

## How Claude should use this method

{{ skill_card("abmil") }}

ABMIL is the **default first baseline** for any new WSI slide-level classification task. If a method paper does not include an ABMIL number, it is suspicious. Pair with {{ node_link("camelyon16") }} for a sanity check.

## Related nodes

- parent: {{ node_link("weakly-supervised-mil") }}
- successors: {{ node_link("clam") }}, {{ node_link("transmil") }}
- canonical dataset: {{ node_link("camelyon16") }}
- article: {{ node_link("abmil-2018") }}
