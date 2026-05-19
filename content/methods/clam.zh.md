---
title: "CLAM —— 聚类约束注意力 MIL"
description: "ABMIL + 逐类注意力分支 + 实例级聚类损失；事实上的现代开源病理 MIL 工具包。"
tags: [method, mil, attention, clustering, wsi]
---

# CLAM —— 聚类约束注意力多示例学习 (Clustering-constrained Attention Multi-Instance Learning)

{{ method("clam") }}

{{ local_graph("clam") }}

## 为什么重要

CLAM 是现代病理（2021–2025）中**标准的开源 MIL 聚合器**。当一篇基准论文说"我们用标准 MIL 头评估 UNI / GigaPath / Virchow"时，这个 MIL 头几乎总是 CLAM。原因有二：

1. **工具包质量** —— `mahmoodlab/CLAM` 提供端到端流水线：组织分割、块抽取、特征抽取（任意 backbone）、MIL 训练、注意力热力图生成。能用。
2. **可靠的精度** —— 在大多数病理基准上，CLAM 与更新近的聚合器持平或更优，同时比 {{ node_link("transmil") }} 更简单更快。

## 核心思路

CLAM 在 {{ node_link("abmil") }} 的基础上加入两个想法：

1. **逐类注意力分支**（CLAM-MB）：不是学一张注意力图，而是为每个类别学一张。每个分支生成自己的袋嵌入和类别专属分数。CLAM-SB（单分支）则保持单一注意力图加切片级 softmax。
2. **实例级聚类损失**：把每类中注意力最高的块当作正伪标签、注意力最低的块当作负伪标签，训练一个辅助分类器。这能正则化注意力，并在切片数较少时改善数据效率。

## 关键问题

- **SB vs MB**：SB 简单，在二分类任务上往往够用；当类别数 ≥3 且需要逐类注意力做可解释性时，MB 更合适。
- **实例损失权重**：当切片异质性强（一大片良性切片中只有一处肿瘤区域）时具临床意义；当肿瘤占据大部分切片时反而可能拖累。
- **backbone 选择**：原版的 ImageNet ResNet-50 已显著弱于 UNI / GigaPath / Virchow / CTransPath —— 相对原论文的现代精度提升大多来自 backbone 升级，而非聚合器本身。

## 代表论文

- {{ node_link("clam-2021") }} —— Lu、Williamson、Chen 等，*Nature Biomedical Engineering* 5:555–570 (2021)。

## 局限

- **排列不变的注意力** —— 忽略空间布局。要做空间推理，请用 {{ node_link("transmil") }} 或图 MIL。
- **来自注意力的伪标签可能很嘈杂**：在肿瘤密集的切片中，注意力最高和最低的块都可能含有肿瘤。
- **原版 backbone 已过时** —— 请搭配现代 PFM 编码器使用。

## Claude 应该如何使用这个方法

{{ skill_card("clam") }}

CLAM 是任何新 WSI 多类分类基线的**默认现代 MIL 头**。二分类用 CLAM-SB，多分类用 CLAM-MB。

## 相关节点

- parent: {{ node_link("abmil") }}
- sibling: {{ node_link("transmil") }}
- companion: {{ node_link("pathology-foundation-model") }}（CLAM 是 PFM 特征之上事实上的 MIL 头）
- datasets: {{ node_link("camelyon16") }}, {{ node_link("panda") }}
- article: {{ node_link("clam-2021") }}
