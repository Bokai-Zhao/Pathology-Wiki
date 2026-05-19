---
title: "CellViT —— ViT 细胞分割与分类"
description: "SAM 预训练的 Vision Transformer 编码器 + HoVer-Net 三解码器头。"
tags: [method, segmentation, nuclei, vit, sam, h-and-e]
---

# CellViT —— 用于精细细胞分割与分类的 Vision Transformer (Vision Transformers for Precise Cell Segmentation and Classification)

{{ method("cellvit") }}

{{ local_graph("cellvit") }}

## 为什么重要

{{ node_link("hover-net") }} 使用的 CNN 编码器（Pre-Act ResNet）如今已明显弱于 SAM 或 DINOv2 预训练的 ViT。CellViT 保留了 HoVer-Net 巧妙的 **HV 解码器实例分离**技巧（它至今依然奏效），**只把编码器升级**为 SAM 预训练的 ViT-B 或 ViT-H。更丰富的编码器特征显著改善了 PanNuke 上的细胞核分割与分类，同时保留了 HoVer-Net 可解释的解码器结构。

## 核心思路

```
H&E patch → SAM-pretrained ViT-B / ViT-H encoder
   ↓
   → NP decoder  (nuclear pixel mask)
   → HV decoder  (horizontal-vertical distance maps)
   → NT decoder  (nuclear type)
post-processing: same watershed-style instance separation as HoVer-Net
```

主要贡献在于**编码器替换 + 将 ViT 输出仔细适配**到 HoVer-Net 的三个解码器头。

## 输入与输出

- **输入**：H&E 块（CellViT-256 输入 256×256；CellViT-SAM-H 输入 1024×1024）。
- **输出**：逐像素实例 ID + 逐核类别标签。

## 数据集 / 任务 / 指标

- {{ node_link("pannuke") }} —— 主要基准。
- 指标：PQ、Dice、F1。

## 局限

- **模型更大** —— 训练与推理都比 HoVer-Net 慢。
- **强依赖 SAM 预训练** —— 若没有 SAM 权重可用，CellViT 相对 HoVer-Net 的优势就会消失。
- **主要评测仅在 PanNuke 上** —— 跨数据集泛化的验证不如 HoVer-Net 原文那样充分。
- **WSI 尺度推理** 需要切块，且比 CNN 基线更慢。

## Claude 应该如何使用这个方法

{{ skill_card("cellvit") }}

CellViT 是任何核分割 + 分类工作的**现代 ViT 基线**。请与 {{ node_link("hover-net") }} 一同引用，以呈现 CNN 与 ViT 的对比。

## 相关节点

- predecessor: {{ node_link("hover-net") }}
- canonical dataset: {{ node_link("pannuke") }}
- article: {{ node_link("cellvit-2024") }}
