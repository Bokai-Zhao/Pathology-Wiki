---
title: "CellViT: Vision Transformers for Precise Cell Segmentation and Classification (Hörst et al. 2024)"
description: "SAM-pretrained ViT encoder + HoVer-Net three-decoder head. Modern ViT baseline for nuclei tasks on H&E."
tags: [article, technical-article, segmentation, nuclei, vit, sam, h-and-e]
---

# CellViT — Vision Transformers for Precise Cell Segmentation and Classification

{{ article("cellvit-2024") }}

{{ local_graph("cellvit-2024") }}

## Why it matters

{{ node_link("hover-net-2019") }} solved the touching-nuclei instance-separation problem in 2019 with its HV-decoder trick. By 2023 the **CNN encoder** was the weakest link: a SAM- or DINOv2-pretrained ViT delivers richer, less stain-sensitive features with minimal architectural change. CellViT realises this swap: **keep HoVer-Net's three-decoder head, replace the encoder with a SAM-pretrained ViT**, and gain substantial PanNuke improvements at the cost of model size.

## Core idea

```
H&E patch → SAM-pretrained ViT-B (or ViT-H) encoder
   ↓
   → NP decoder      (nuclear pixel mask)
   → HV decoder      (horizontal-vertical distance maps)
   → NT decoder      (nuclear type)
post-processing: same watershed-style instance separation as HoVer-Net
```

Two released variants:

- **CellViT-256** — SAM-pretrained ViT-B, 256×256 input.
- **CellViT-SAM-H** — SAM-pretrained ViT-H, 1024×1024 input (more accurate, slower).

## Inputs and outputs

- **Input**: H&E patch (256×256 or 1024×1024 depending on variant).
- **Output**: per-pixel instance ID + per-nucleus class label.

## Datasets / tasks / metrics

- Primary benchmark: {{ node_link("pannuke") }}.
- Metrics: PQ, Dice, F1.

## Method

- Encoder: SAM-pretrained ViT (B or H).
- Three decoder branches adapted from HoVer-Net's NP / HV / NT structure.
- Joint multi-task training; cross-entropy + Dice + MSE losses.

## Main results

CellViT outperforms HoVer-Net, StarDist, and Hover-Mask-CNN on PanNuke binary and multi-class PQ. The ViT-H variant is state of the art at release.

## Limitations

- **Larger model** than HoVer-Net — slower training and inference.
- **Depends heavily on SAM weights** — without them, advantage over HoVer-Net shrinks.
- **PanNuke-only** primary evaluation — multi-dataset generalisation less extensively shown than HoVer-Net's original claim.
- **WSI-scale inference** requires tiling and is slower than the CNN baseline.

## How Claude should use this article

{{ skill_card("cellvit-2024") }}

Cite as the **modern ViT-based baseline** for nuclei seg + classification. Pair with {{ node_link("hover-net-2019") }} for the CNN-vs-ViT comparison.

## Related nodes

- proposes method: {{ node_link("cellvit") }}
- predecessor: {{ node_link("hover-net-2019") }} ({{ node_link("hover-net") }})
- canonical dataset: {{ node_link("pannuke") }}

## References

- DOI: [10.1016/j.media.2024.103143](https://doi.org/10.1016/j.media.2024.103143)
- arXiv preprint: [2306.15350](https://arxiv.org/abs/2306.15350)
- Code: [github.com/TIO-IKIM/CellViT](https://github.com/TIO-IKIM/CellViT)
