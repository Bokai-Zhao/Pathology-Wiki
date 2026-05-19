---
title: "CellViT：面向精确细胞分割与分类的 Vision Transformer（Hörst 等人 2024）"
description: "SAM 预训练的 ViT 编码器 + HoVer-Net 三解码器头。H&E 上细胞核任务的现代 ViT 基线。"
tags: [article, technical-article, segmentation, nuclei, vit, sam, h-and-e]
---

# CellViT —— 面向精确细胞分割与分类的 Vision Transformer

{{ article("cellvit-2024") }}

{{ local_graph("cellvit-2024") }}

## 为什么重要

{{ node_link("hover-net-2019") }} 在 2019 年通过 HV 解码器技巧解决了接触细胞核实例分离问题。到 2023 年，**CNN 编码器**成为最薄弱的一环：SAM 或 DINOv2 预训练的 ViT 在最小架构变动下提供了更丰富、对染色更不敏感的特征。CellViT 实现了这一替换：**保留 HoVer-Net 的三解码器头，将编码器替换为 SAM 预训练的 ViT**，在 PanNuke 上取得显著提升，代价是模型规模。

## 核心思路

```
H&E patch → SAM-pretrained ViT-B (or ViT-H) encoder
   ↓
   → NP decoder      (nuclear pixel mask)
   → HV decoder      (horizontal-vertical distance maps)
   → NT decoder      (nuclear type)
post-processing: same watershed-style instance separation as HoVer-Net
```

发布的两种变体：

- **CellViT-256** —— SAM 预训练的 ViT-B，256×256 输入。
- **CellViT-SAM-H** —— SAM 预训练的 ViT-H，1024×1024 输入（更准但更慢）。

## 输入与输出

- **输入**：H&E 块（依变体不同为 256×256 或 1024×1024）。
- **输出**：每像素实例 ID + 每细胞核类别标签。

## 数据集 / 任务 / 指标

- 主要基准：{{ node_link("pannuke") }}。
- 指标：PQ、Dice、F1。

## 方法

- 编码器：SAM 预训练的 ViT（B 或 H）。
- 沿用 HoVer-Net 的 NP / HV / NT 结构改造的三解码器分支。
- 联合多任务训练；交叉熵 + Dice + MSE 损失。

## 主要结果

CellViT 在 PanNuke 二分类与多分类 PQ 上优于 HoVer-Net、StarDist 与 Hover-Mask-CNN。ViT-H 变体在发布时为 SOTA。

## 局限

- **模型更大**于 HoVer-Net —— 训练与推理更慢。
- **严重依赖 SAM 权重** —— 若没有 SAM 权重，相对于 HoVer-Net 的优势会缩小。
- **主要仅在 PanNuke 上评估** —— 多数据集泛化展示不如 HoVer-Net 原作充分。
- **WSI 规模推理**需要切片化，比 CNN 基线慢。

## Claude 应该如何使用这篇论文

{{ skill_card("cellvit-2024") }}

作为细胞核分割 + 分类的**现代 ViT 基线**进行引用。与 {{ node_link("hover-net-2019") }} 配对用于 CNN vs ViT 的对比。

## 相关节点

- proposes method：{{ node_link("cellvit") }}
- 前驱：{{ node_link("hover-net-2019") }}（{{ node_link("hover-net") }}）
- 规范数据集：{{ node_link("pannuke") }}

## 参考文献

- DOI：[10.1016/j.media.2024.103143](https://doi.org/10.1016/j.media.2024.103143)
- arXiv preprint：[2306.15350](https://arxiv.org/abs/2306.15350)
- 代码：[github.com/TIO-IKIM/CellViT](https://github.com/TIO-IKIM/CellViT)
