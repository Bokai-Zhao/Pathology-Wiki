---
title: "ABMIL — Attention-based Deep Multiple Instance Learning (Ilse et al. 2018)"
description: "Foundational learned-attention pooling for MIL. Standard first baseline for any pathology WSI slide-level classification."
tags: [article, technical-article, mil, attention, wsi, h-and-e]
---

# ABMIL — Attention-based Deep Multiple Instance Learning

{{ article("abmil-2018") }}

{{ local_graph("abmil-2018") }}

## Why it matters

Before this paper, MIL pooling was dominated by fixed mean / max operators. ABMIL introduced **learned scalar attention weights per instance**, parameterised by a small two-layer MLP. The bag embedding becomes the attention-weighted sum of instance embeddings — permutation-invariant (preserving the MIL assumption) but trainable, and **interpretable**: attention weights yield free heatmap-style localisation of which patches drove the bag-level decision.

ABMIL seeded the modern WSI MIL literature in pathology. {{ node_link("clam") }}, {{ node_link("transmil") }}, DSMIL, DTFD-MIL, SETMIL all descend from it.

## Core idea

```python
# pseudo-code: ABMIL attention head
H = encoder(instances)               # (N, D)
A = softmax(w.T @ tanh(V @ H.T))     # (1, N)
bag = (A @ H).squeeze()              # (D,)
y_hat = classifier(bag)
```

Two variants:

- **Vanilla attention** — single non-linearity (tanh).
- **Gated attention** — multiplies pre-softmax score by a separate sigmoid gate, often better-calibrated on harder bags.

## Inputs and outputs

- **Input**: bag of instance embeddings (`N × D`), typically patch features from a CNN encoder.
- **Output**: bag-level label + attention vector (`N × 1`) usable as a heatmap.

## Datasets / tasks / metrics

- **MNIST bags** — synthetic MIL benchmark.
- **Breast cancer histology** — patch-level bags for slide-level positive/negative.
- **Colon cancer histology** — same.
- {{ node_link("camelyon16") }} is the standard pathology reuse benchmark for ABMIL today.
- Metrics: AUC, accuracy.

## Method

- Two-layer MLP attention head (configurable hidden dim).
- Permutation-invariant pooling — the order of patches doesn't matter.
- End-to-end trainable; backprop flows through both encoder and attention head.
- **No instance-instance interaction** — each patch is scored in isolation (the key limitation addressed by {{ node_link("transmil") }} / DSMIL).

## Main results

ABMIL outperforms mean- and max-pooling MIL, MI-Net, and MI-SVM on the synthetic MIL benchmarks and on the histology bags reported in the paper. The bigger contribution is the **template** — pathology MIL has used this attention head template ever since.

## Limitations

- **Permutation-invariant** — ignores patch positions in the slide.
- **No instance-instance interaction** — TransMIL/DSMIL add this later.
- **Single-class attention** — multi-class extensions (CLAM-MB) need per-class branches.

## How Claude should use this article

{{ skill_card("abmil-2018") }}

Cite ABMIL as the **origin of attention-based MIL** in any pathology paper involving slide-level classification. Use it as the simplest learned-attention baseline in benchmarks.

## Related nodes

- proposes method: {{ node_link("abmil") }}
- parent method: {{ node_link("weakly-supervised-mil") }}
- canonical eval dataset: {{ node_link("camelyon16") }}
- direct successors: {{ node_link("clam-2021") }}, {{ node_link("transmil-2021") }}

## References

- arXiv: [1802.04712](https://arxiv.org/abs/1802.04712)
- ICML 2018 proceedings: [proceedings.mlr.press/v80/ilse18a.html](https://proceedings.mlr.press/v80/ilse18a.html)
- Code: [github.com/AMLab-Amsterdam/AttentionDeepMIL](https://github.com/AMLab-Amsterdam/AttentionDeepMIL)
