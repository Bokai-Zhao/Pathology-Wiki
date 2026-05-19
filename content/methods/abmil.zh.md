---
title: "ABMIL —— 基于注意力的多示例学习"
description: "为 MIL 袋设计的、排列不变的学习式注意力池化。病理 MIL 的奠基聚合器。"
tags: [method, mil, attention, wsi]
---

# ABMIL —— 基于注意力的多示例学习 (Attention-Based Multiple Instance Learning)

{{ method("abmil") }}

{{ local_graph("abmil") }}

## 为什么重要

在 ABMIL 之前，MIL 池化基本由**均值**和**最大值**主导 —— 二者都固定且缺乏信息量。ABMIL 引入了**每个实例的可学习标量注意力权重**，由一个小型两层 MLP 参数化。袋嵌入变为各实例嵌入的注意力加权和：

```
α_k = softmax(w^T tanh(V h_k))
bag_emb = Σ_k α_k * h_k
```

它依然**排列不变**（仍满足 MIL 假设），但是**可训练**的（模型可上调有信息量的块的权重）。注意力权重还**可解释** —— 它们天然提供热力图式的定位，指明是哪些块驱动了切片级预测。所有现代 MIL 变体（{{ node_link("clam") }}、{{ node_link("transmil") }}、DSMIL、DTFD-MIL）都源自 ABMIL。

## 核心思路

- 在实例嵌入上叠一个两层 MLP，输出每个实例的标量权重。
- **vanilla** 与 **gated** 注意力：gated 版本在注意力的预激活上再乘一个独立的 sigmoid 门，可改善较难袋上的校准。
- 袋嵌入 = 注意力加权和。
- 在袋嵌入上叠分类器。

## 关键问题

- sigmoid 还是 softmax 注意力？
- gated 还是 vanilla —— 收益取决于袋大小和类别边界。
- 注意力温度 / 缩放 —— 影响热力图的稀疏度。
- 多类袋上用单头还是多头？（多头会自然导出 {{ node_link("clam") }}-MB。）

## 代表论文

- {{ node_link("abmil-2018") }} —— Ilse、Tomczak、Welling，ICML 2018。

## 局限

- **排列不变** —— 忽略切片内块的位置。空间结构必须靠别的方式引入。
- **没有实例-实例交互** —— 每个实例独立打分。{{ node_link("transmil") }} 解决了这一点。
- **单类注意力** —— 多类扩展（CLAM-MB）需要逐类分支。

## Claude 应该如何使用这个方法

{{ skill_card("abmil") }}

ABMIL 是任何新 WSI 切片级分类任务的**首选基线**。如果一篇方法论文没有给出 ABMIL 数字，那很可疑。可配合 {{ node_link("camelyon16") }} 做合理性检查。

## 相关节点

- parent: {{ node_link("weakly-supervised-mil") }}
- successors: {{ node_link("clam") }}, {{ node_link("transmil") }}
- canonical dataset: {{ node_link("camelyon16") }}
- article: {{ node_link("abmil-2018") }}
