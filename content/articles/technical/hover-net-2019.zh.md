---
title: "HoVer-Net：细胞核同步分割与分类（Graham 等人 2019）"
description: "三解码器 CNN，配以水平-垂直距离图，实现联合细胞核实例分割与分类。"
tags: [article, technical-article, segmentation, nuclei, h-and-e, cnn]
---

# HoVer-Net：多组织组织学图像中细胞核的同步分割与分类

{{ article("hover-net-2019") }}

{{ local_graph("hover-net-2019") }}

## 为什么重要

相互接触的细胞核会破坏朴素连通分量实例分割。HoVer-Net 引入了**带三个解码器的单阶段 CNN**，在一次前向传播中同时解决细胞核实例分割 + 分类，使用水平-垂直（HV）距离图解码器驱动 watershed 风格的接触细胞核分离。

**HV 解码器模板**已被 {{ node_link("cellvit") }} 与众多后续工作复用；HoVer-Net 仍是细胞级 H&E 分析的规范 CNN 基线。

## 核心思路

三个解码器分支共享一个 Pre-Act ResNet 编码器：

1. **NP 解码器** —— 核像素掩膜（前景 vs 背景的二分类）。
2. **HV 解码器** —— 每像素相对于细胞核中心在 x、y 方向上的有符号距离。
3. **NT 解码器** —— 每细胞核类别标签（在有标注时）。

后处理：

```
seeds = local minima of |∇HV|
mask  = NP > threshold
instances = watershed(mask, seeds)
class[i] = mode(NT[instances == i])
```

## 输入与输出

- **输入**：H&E 块，通常在 40× 下 256×256。
- **输出**：每像素实例 ID + 每细胞核类别标签。

## 数据集 / 任务 / 指标

- **CoNSeP**（本论文引入）、Kumar、CPM、{{ node_link("pannuke") }}。
- 任务：细胞核实例分割、细胞核分类（依数据集不同为 4–6 类）。
- 指标：PQ、Dice、AJI、F1。

## 方法

- 编码器：Pre-Act ResNet-50。
- 三个解码器分支，各有任务专属上采样。
- 损失：交叉熵（NP、NT）+ MSE（HV）+ Dice（NP）的组合，权重经精心调优。
- 在 HV 梯度上做 watershed 后处理。

## 主要结果

发表当时，HoVer-Net 在 CoNSeP / Kumar / CPM 上优于 Mask R-CNN、Micro-Net 与 DCAN。今天仍是 PanNuke 上的强基线（现代基于 ViT 的方法如 {{ node_link("cellvit") }} 已超越它，但仍引用它作为参考）。

## 局限

- **多任务损失权重**调优敏感 —— 论文给出比率，特别队列需要重新调优。
- **Watershed 后处理**在 WSI 规模下是推理瓶颈。
- **CNN 骨干**已过时；{{ node_link("cellvit") }} 解决了这一点。
- **仅 H&E** —— IHC / 多重 IF 需要重新训练。

## Claude 应该如何使用这篇论文

{{ skill_card("hover-net-2019") }}

作为**细胞核联合分割 + 分类的规范架构**进行引用。将 HoVer-Net 作为 CNN 基线，与任何新的基于 ViT 或基于图的方法进行比较。

## 相关节点

- proposes method：{{ node_link("hover-net") }}
- 后继：{{ node_link("cellvit-2024") }}（{{ node_link("cellvit") }}）
- 规范数据集：{{ node_link("pannuke") }}

## 参考文献

- DOI：[10.1016/j.media.2019.101563](https://doi.org/10.1016/j.media.2019.101563)
- 代码：[github.com/vqdang/hover_net](https://github.com/vqdang/hover_net)
