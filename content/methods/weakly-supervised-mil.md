---
title: "Weakly-Supervised MIL (WSI)"
description: "Bag-of-patches MIL: train a slide-level classifier from slide-level labels alone. Parent of ABMIL / CLAM / TransMIL."
tags: [method, mil, weakly-supervised, wsi]
---

# Weakly-Supervised Multiple Instance Learning (WSI)

{{ method("weakly-supervised-mil") }}

{{ local_graph("weakly-supervised-mil") }}

## Why it matters

Slide-level labels are cheap (extracted from clinical reports). Patch-level labels are expensive (pathologist time at >1 GPx scale per slide). Weakly-supervised MIL closes that gap: treat each WSI as a **bag** of patch instances, supervise only at bag level, and let the aggregator learn which patches drive the prediction. WSI MIL is the dominant paradigm for any slide-level classification task in pathology — and the immediate precursor of pathology foundation models, most of which still use a MIL aggregator on top of frozen PFM features.

## Core idea

A typical pipeline:

1. **Tile** the WSI into thousands of fixed-size patches at a chosen magnification.
2. **Encode** each patch with a backbone (ImageNet ViT, CTransPath, UNI, GigaPath, Virchow).
3. **Aggregate** patch features into a single bag-level vector. Aggregator choices:
   - mean / max pool (parametric-free)
   - learned attention ({{ node_link("abmil") }})
   - per-class attention with instance clustering ({{ node_link("clam") }})
   - Transformer self-attention ({{ node_link("transmil") }})
   - graph neural networks (cell / tissue graphs)
4. **Classify** the bag vector.
5. **Visualise** the attention map for free localisation.

## Key questions

- How to aggregate thousands of patches into one slide prediction?
- How to make attention spatially interpretable for clinician-facing heatmaps?
- How to scale beyond memory: gradient checkpointing, foreground sampling, hierarchical aggregation?
- How to handle weak / noisy slide labels (report mining)?
- When to fine-tune the encoder end-to-end vs use frozen PFM features?

## Tasks

- Tumour detection ({{ node_link("camelyon16") }})
- Slide-level subtype classification (TCGA-NSCLC, TCGA-RCC)
- Grading ({{ node_link("panda") }})
- Survival prediction
- Biomarker / mutation prediction from H&E

## Representative articles

- {{ node_link("abmil-2018") }} — the foundational attention aggregator
- {{ node_link("clam-2021") }} — the de-facto modern open-source MIL toolkit
- {{ node_link("transmil-2021") }} — Transformer aggregation with correlation modelling
- {{ node_link("campanella-2019") }} — clinical-grade scale demonstration (~44k MSKCC slides)

## Limitations

- **Bag-of-patches loses fine spatial structure** unless explicit position encoding (TransMIL) or graphs are used.
- **Long-tail aggregators**: most attention is on a few patches, the rest are essentially ignored.
- **Backbone quality dominates**: ImageNet ResNet-50 features are now substantially weaker than UNI / GigaPath; aggregator gains are smaller than backbone gains.
- **Heatmaps are correlative, not causal** — clinical interpretation requires care.

## How Claude should use this method

{{ skill_card("weakly-supervised-mil") }}

When the user asks "what aggregator should I use on top of UNI for slide-level classification?", default to **CLAM** for ergonomics and reliability, **TransMIL** if instance-instance correlations matter, **ABMIL** for the simplest baseline.

## Related nodes

- child methods: {{ node_link("abmil") }}, {{ node_link("clam") }}, {{ node_link("transmil") }}
- successor: {{ node_link("pathology-foundation-model") }}
- datasets: {{ node_link("camelyon16") }}, {{ node_link("panda") }}
