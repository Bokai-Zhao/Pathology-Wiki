---
title: "HoVer-Net — Joint Nuclei Seg + Classification"
description: "Three-decoder CNN with horizontal-vertical distance maps for nuclei instance separation."
tags: [method, segmentation, nuclei, cnn, h-and-e]
---

# HoVer-Net — Joint Nuclei Instance Segmentation and Classification

{{ method("hover-net") }}

{{ local_graph("hover-net") }}

## Why it matters

Before HoVer-Net, nuclei instance segmentation on H&E required either heavy multi-stage pipelines or struggled with **touching nuclei** — adjacent cells in dense tissue collapse into a single connected component. HoVer-Net solves this in one forward pass with three decoder branches whose outputs jointly determine instance masks and class labels. The **horizontal-vertical (HV) distance map** trick has since been adopted by {{ node_link("cellvit") }} and many follow-ups, making HoVer-Net the canonical reference architecture for cell-level H&E analysis.

## Core idea

```
H&E patch → CNN encoder (Pre-Act ResNet)
   ↓
   → NP decoder  (nuclear pixel mask — binary)
   → HV decoder  (per-pixel distance to nearest nucleus centre in x and y)
   → NT decoder  (nuclear type — per-nucleus class)
post-processing:
   - watershed-style instance separation using HV gradient + NP mask
   - assign each instance the dominant class from NT
```

The HV gradient acts as a learned instance-separation signal: where two touching nuclei meet, the HV map shows a sharp sign change in both x and y, which the watershed exploits.

## Inputs and outputs

- **Input**: H&E patch (typically 256×256 at 40×).
- **Output**: per-pixel instance ID + per-nucleus class label.

## Datasets / tasks / metrics

- {{ node_link("pannuke") }} — modern pan-cancer 5-class benchmark.
- CoNSeP, Kumar, CPM — older datasets used in the original paper.
- Metrics: **PQ** (Panoptic Quality), Dice, AJI, F1.

## Limitations

- **Multi-task loss balancing** is sensitive — the paper provides ratios but ad-hoc cohorts need re-tuning.
- **Watershed post-processing** is the main inference bottleneck at WSI scale.
- **CNN backbone is dated** — {{ node_link("cellvit") }} replaces it with a SAM-pretrained ViT.
- **H&E only** — IHC / IF need re-training.

## How Claude should use this method

{{ skill_card("hover-net") }}

HoVer-Net is the **canonical CNN baseline** for any nuclei seg + classification work. Pair with {{ node_link("cellvit") }} (modern ViT successor) when reporting benchmarks.

## Related nodes

- successor: {{ node_link("cellvit") }}
- canonical dataset: {{ node_link("pannuke") }}
- article: {{ node_link("hover-net-2019") }}
