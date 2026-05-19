---
title: "CellViT — ViT Cell Segmentation + Classification"
description: "SAM-pretrained Vision Transformer encoder + HoVer-Net three-decoder head."
tags: [method, segmentation, nuclei, vit, sam, h-and-e]
---

# CellViT — Vision Transformers for Precise Cell Segmentation and Classification

{{ method("cellvit") }}

{{ local_graph("cellvit") }}

## Why it matters

{{ node_link("hover-net") }} uses a CNN encoder (Pre-Act ResNet) that's now substantially weaker than a SAM- or DINOv2-pretrained ViT. CellViT keeps HoVer-Net's clever **HV-decoder instance-separation** trick — which still works — and **upgrades only the encoder** to a SAM-pretrained ViT-B or ViT-H. The richer encoder features substantially improve PanNuke nuclei segmentation and classification while preserving HoVer-Net's interpretable decoder structure.

## Core idea

```
H&E patch → SAM-pretrained ViT-B / ViT-H encoder
   ↓
   → NP decoder  (nuclear pixel mask)
   → HV decoder  (horizontal-vertical distance maps)
   → NT decoder  (nuclear type)
post-processing: same watershed-style instance separation as HoVer-Net
```

The contribution is the **encoder swap + careful adaptation** of the ViT output to the three HoVer-Net decoder heads.

## Inputs and outputs

- **Input**: H&E patch (CellViT-256 takes 256×256; CellViT-SAM-H takes 1024×1024).
- **Output**: per-pixel instance ID + per-nucleus class label.

## Datasets / tasks / metrics

- {{ node_link("pannuke") }} — primary benchmark.
- Metrics: PQ, Dice, F1.

## Limitations

- **Larger model** than HoVer-Net — slower training and inference.
- **Heavy reliance on SAM pretraining** — when SAM weights are unavailable, CellViT loses its advantage over HoVer-Net.
- **PanNuke-only** primary evaluation — multi-dataset generalisation less extensively validated than HoVer-Net's original claim.
- **Inference at WSI scale** requires tiling and is slower than the CNN baseline.

## How Claude should use this method

{{ skill_card("cellvit") }}

CellViT is the **modern ViT-based baseline** for any nuclei seg + classification work. Cite alongside {{ node_link("hover-net") }} for the CNN-vs-ViT comparison.

## Related nodes

- predecessor: {{ node_link("hover-net") }}
- canonical dataset: {{ node_link("pannuke") }}
- article: {{ node_link("cellvit-2024") }}
