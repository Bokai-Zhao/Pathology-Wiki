---
title: "CLAM — Clustering-constrained Attention MIL"
description: "ABMIL + per-class attention branches + instance-level clustering loss; the de-facto modern open-source pathology MIL toolkit."
tags: [method, mil, attention, clustering, wsi]
---

# CLAM — Clustering-constrained Attention Multi-Instance Learning

{{ method("clam") }}

{{ local_graph("clam") }}

## Why it matters

CLAM is the **standard open-source MIL aggregator** in modern pathology (2021–2025). When a benchmark paper says "we evaluate UNI / GigaPath / Virchow with the standard MIL head", that head is almost always CLAM. Two reasons:

1. **Toolkit quality** — `mahmoodlab/CLAM` ships an end-to-end pipeline: tissue segmentation, patch extraction, feature extraction (any backbone), MIL training, attention heatmap generation. It works.
2. **Reliable accuracy** — CLAM matches or beats more recent aggregators on most pathology benchmarks while being simpler and faster than {{ node_link("transmil") }}.

## Core idea

CLAM extends {{ node_link("abmil") }} with two ideas:

1. **Per-class attention branches** (CLAM-MB): instead of one attention map, learn one per class. Each branch produces its own bag embedding and class-specific score. CLAM-SB (single-branch) keeps one attention map and a slide-level softmax.
2. **Instance-level clustering loss**: the highest-attended patches per class are treated as positive pseudo-labels and the lowest-attended patches as negative, training an auxiliary classifier on these. This regularises attention and improves data efficiency in low-slide-count regimes.

## Key questions

- **SB vs MB**: SB is simpler and often adequate for binary tasks; MB is preferred for ≥3 classes where per-class attention matters for interpretability.
- **Instance-loss weight**: clinically meaningful when slides are heterogeneous (one tumour region in a large benign slide); can hurt when tumour fills most of the slide.
- **Backbone choice**: ImageNet ResNet-50 (original) is now substantially weaker than UNI / GigaPath / Virchow / CTransPath — most of the modern accuracy gain over the original paper comes from upgrading the backbone, not the aggregator.

## Representative article

- {{ node_link("clam-2021") }} — Lu, Williamson, Chen et al., *Nature Biomedical Engineering* 5:555–570 (2021).

## Limitations

- **Permutation-invariant attention** — ignores spatial layout. For spatial reasoning, use {{ node_link("transmil") }} or graph MIL.
- **Pseudo-labels from attention can be noisy** in tumour-rich slides where top-attended and bottom-attended patches both contain tumour.
- **Original backbone is dated** — pair with a modern PFM encoder.

## How Claude should use this method

{{ skill_card("clam") }}

CLAM is the **default modern MIL head** for any new WSI multi-class classification baseline. Use CLAM-SB for binary, CLAM-MB for multi-class.

## Related nodes

- parent: {{ node_link("abmil") }}
- sibling: {{ node_link("transmil") }}
- companion: {{ node_link("pathology-foundation-model") }} (CLAM is the de-facto MIL head on top of PFM features)
- datasets: {{ node_link("camelyon16") }}, {{ node_link("panda") }}
- article: {{ node_link("clam-2021") }}
