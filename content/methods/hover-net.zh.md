---
title: "HoVer-Net —— 细胞核联合分割与分类"
description: "三解码器 CNN，使用水平-垂直距离图实现核实例分离。"
tags: [method, segmentation, nuclei, cnn, h-and-e]
---

# HoVer-Net —— 细胞核实例分割与分类联合模型 (Joint Nuclei Instance Segmentation and Classification)

{{ method("hover-net") }}

{{ local_graph("hover-net") }}

## 为什么重要

在 HoVer-Net 之前，H&E 上的细胞核实例分割要么需要繁重的多阶段流水线，要么难以处理**接触核（touching nuclei）** —— 致密组织中相邻细胞会合并成同一连通域。HoVer-Net 在一次前向传播中用三个解码器分支解决了这一问题，三者输出共同决定实例掩膜与类别标签。其**水平-垂直距离图（horizontal-vertical, HV）** 技巧此后被 {{ node_link("cellvit") }} 及众多后续工作沿用，使 HoVer-Net 成为 H&E 细胞级分析的经典参考架构。

## 核心思路

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

HV 梯度充当学得的实例分离信号：两个接触核交界处，HV 图在 x 和 y 方向都会出现剧烈的符号变化，分水岭算法利用这一信号完成实例分离。

## 输入与输出

- **输入**：H&E 块（通常是 40× 下的 256×256）。
- **输出**：逐像素实例 ID + 逐核类别标签。

## 数据集 / 任务 / 指标

- {{ node_link("pannuke") }} —— 现代泛癌种 5 类基准。
- CoNSeP、Kumar、CPM —— 原论文使用的较早数据集。
- 指标：**PQ**（Panoptic Quality）、Dice、AJI、F1。

## 局限

- **多任务损失平衡敏感** —— 论文给出了比例，但临场组合的队列仍需重新调参。
- **分水岭后处理**是 WSI 尺度推理的主要瓶颈。
- **CNN backbone 已过时** —— {{ node_link("cellvit") }} 将其替换为 SAM 预训练的 ViT。
- **仅限 H&E** —— IHC / IF 需要重新训练。

## Claude 应该如何使用这个方法

{{ skill_card("hover-net") }}

HoVer-Net 是任何核分割 + 分类工作的**经典 CNN 基线**。报告基准时请与 {{ node_link("cellvit") }}（现代 ViT 后继者）一同引用。

## 相关节点

- successor: {{ node_link("cellvit") }}
- canonical dataset: {{ node_link("pannuke") }}
- article: {{ node_link("hover-net-2019") }}
