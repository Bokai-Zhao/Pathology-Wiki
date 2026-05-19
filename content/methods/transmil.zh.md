---
title: "TransMIL —— 基于 Transformer 的相关性 MIL"
description: "为 WSI MIL 设计的 Nyström 自注意力 + PPEG 位置编码；在十亿像素尺度上建模实例-实例相关性。"
tags: [method, mil, transformer, attention, wsi]
---

# TransMIL —— 基于 Transformer 的相关性多示例学习 (Transformer-based Correlated Multiple Instance Learning)

{{ method("transmil") }}

{{ local_graph("transmil") }}

## 为什么重要

{{ node_link("abmil") }} 和 {{ node_link("clam") }} 把块当作**独立实例**处理 —— 一个块的注意力分数不依赖于其它块的内容。在病理中，这个假设并不成立：肿瘤区域在空间上是连续的，免疫浸润依赖上下文，腺体结构只有跨多个块才有意义。TransMIL 用 **Transformer 自注意力** 修正这一点，让每个块都能关注到其它所有块。为了在数千块的袋上保持可行，它使用：

- **Nyström 注意力近似** —— 把注意力代价从 O(N²) 降到 O(N)。
- **金字塔位置编码生成器（PPEG, Pyramid Position Encoding Generator）** —— 通过对袋做多尺度卷积，重新把 2D 空间上下文注入本来排列不变的 Transformer 序列。

## 核心思路

```
patches → linear proj → [CLS] + sequence
   → PPEG (spatial conv)
   → Nyström-attention Transformer layers
   → take [CLS] embedding → classifier
```

Transformer 能捕捉注意力池化抓不到的远距离块相关性。PPEG 则恢复了足够的空间信号，使模型能够推理组织结构。

## 关键问题

- **Nyström 与精确注意力**：Nyström 只是近似；在小袋上，精确注意力可能更优。
- **Transformer 层数 / 头数**：原论文用 2 层；更深仅带来边际收益但计算更贵。
- **PPEG 是否重要？** 论文的消融显示有效 —— 单纯随机的 2D 混合表现较差。
- **与 backbone 的交互**：和其它 MIL 方法一样，块编码器的选择（ImageNet vs CTransPath vs UNI）主导了精度提升。

## 代表论文

- {{ node_link("transmil-2021") }} —— Shao 等，*NeurIPS* 2021。

## 局限

- **近似注意力** —— Nyström 会引入方差；小袋上精确注意力可能更好。
- **参数代价** —— 相比 ABMIL/CLAM，引入了额外的 Transformer 参数；计算受限的部署可能更偏好简单聚合器。
- **可解释性弱于 CLAM 的逐类注意力分支** —— 可视化"Transformer 在关注什么"并非易事。

## Claude 应该如何使用这个方法

{{ skill_card("transmil") }}

当**实例-实例相关性重要**时（生存预测、复杂亚型、空间结构线索）使用 TransMIL。对于大多数二分类切片级分类任务，{{ node_link("clam") }} 更简单且足够好。

## 相关节点

- parent: {{ node_link("weakly-supervised-mil") }}
- predecessor: {{ node_link("abmil") }}
- sibling: {{ node_link("clam") }}
- dataset: {{ node_link("camelyon16") }}
- article: {{ node_link("transmil-2021") }}
