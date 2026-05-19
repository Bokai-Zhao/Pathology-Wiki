---
title: "病理基础模型 (Pathology Foundation Model)"
description: "病理基础模型的总括方法节点（纯视觉、视觉-语言、视觉-组学）。"
tags: [method, pathology-foundation-model, ssl, dinov2, vit]
---

# 病理基础模型 (Pathology Foundation Model)

{{ method("pathology-foundation-model") }}

{{ local_graph("pathology-foundation-model") }}

## 为什么重要

病理基础模型（PFM, Pathology Foundation Models）相当于计算病理中的现代版 ImageNet 预训练 —— 通过自监督或对比目标，在数百万张病理图像块/切片（或图像+文本/组学）上训练大型编码器，再以冻结特征或轻量化任务头的形式迁移到众多下游任务。

## 核心思路

在海量病理语料上预训练一个大型编码器，然后在众多下游任务上评估其通用性。其假设是：预训练的规模（数据、参数、放大倍率）会转化为临床上的实用价值。

## 子分支

- **纯视觉 PFM** —— UNI、GigaPath、Virchow、H-Optimus、CTransPath、Phikon
- **视觉-语言 PFM** —— CONCH、MUSK、PLIP
- **视觉-组学 PFM** —— 将病理与 bulk / 空间组学配对
- **切片级预训练 (slide-level pretraining)** —— GigaPath / Prov-GigaPath
- **多尺度预训练 (multi-scale pretraining)** —— 显式的跨放大倍率预训练目标

## 关键问题

- 块级 vs 切片级的预训练目标？
- 纯视觉 vs 视觉-语言 vs 视觉-组学？
- 规模如何转化为临床实用价值？
- 哪种评测套件能够刻画通用性、又不会过拟合到 TCGA 式分布？

## 代表模型

- {{ node_link("uni") }} —— 纯视觉，ViT-L/16，DINOv2

*（随着更多模型节点的加入，会持续补充代表模型链接。）*

## Claude 应该如何使用这个方法

{{ skill_card("pathology-foundation-model") }}

## 相关节点

- article: {{ node_link("uni-2024") }}
- model: {{ node_link("uni") }}
