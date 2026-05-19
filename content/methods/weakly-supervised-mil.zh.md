---
title: "弱监督 MIL (WSI)"
description: "块袋式 MIL：仅用切片级标签训练切片级分类器。ABMIL / CLAM / TransMIL 的父方法。"
tags: [method, mil, weakly-supervised, wsi]
---

# 弱监督多示例学习 (Weakly-Supervised Multiple Instance Learning, WSI)

{{ method("weakly-supervised-mil") }}

{{ local_graph("weakly-supervised-mil") }}

## 为什么重要

切片级标签很便宜（可从临床报告中抽取），而块级标签很昂贵（每张切片需要病理学家在 >1 GPx 尺度上耗费大量时间）。弱监督 MIL 弥合了这一鸿沟：把每张 WSI 视为一个由块（patch）实例组成的**袋（bag）**，只在袋级别提供监督，由聚合器自行学习哪些块驱动了最终预测。在病理学中，WSI MIL 是所有切片级分类任务的主导范式 —— 也是病理基础模型的直接前身，绝大多数 PFM 至今仍在冻结特征之上叠一个 MIL 聚合器。

## 核心思路

典型流水线：

1. **切块（Tile）**：在指定放大倍率下把 WSI 切成数千个固定大小的块。
2. **编码（Encode）**：用一个 backbone（ImageNet ViT、CTransPath、UNI、GigaPath、Virchow）对每个块编码。
3. **聚合（Aggregate）**：把所有块特征聚合成一个袋级向量。聚合器可选：
   - 均值/最大池化（无参数）
   - 学习式注意力 ({{ node_link("abmil") }})
   - 带实例聚类的逐类注意力 ({{ node_link("clam") }})
   - Transformer 自注意力 ({{ node_link("transmil") }})
   - 图神经网络（细胞图 / 组织图）
4. **分类（Classify）**：在袋向量上做分类。
5. **可视化（Visualise）**：免费获得注意力图作为定位结果。

## 关键问题

- 如何把成千上万个块聚合成一个切片级预测？
- 如何让注意力在空间上可解释，以便面向临床医生生成热力图？
- 如何突破显存上限：梯度检查点、前景采样、分层聚合？
- 如何处理弱/嘈杂的切片标签（报告挖掘）？
- 何时端到端微调编码器，何时使用冻结的 PFM 特征？

## 任务

- 肿瘤检测 ({{ node_link("camelyon16") }})
- 切片级亚型分类（TCGA-NSCLC、TCGA-RCC）
- 分级 ({{ node_link("panda") }})
- 生存预测
- 从 H&E 预测生物标志物 / 突变

## 代表论文

- {{ node_link("abmil-2018") }} —— 奠基性的注意力聚合器
- {{ node_link("clam-2021") }} —— 事实上的现代开源 MIL 工具包
- {{ node_link("transmil-2021") }} —— 带相关性建模的 Transformer 聚合
- {{ node_link("campanella-2019") }} —— 临床级规模的示范（约 4.4 万张 MSKCC 切片）

## 局限

- **块袋式表示会丢失精细空间结构**，除非显式引入位置编码（TransMIL）或图结构。
- **长尾聚合器**：注意力往往集中在少数块上，其余几乎被忽略。
- **backbone 质量起主导作用**：ImageNet ResNet-50 的特征如今已显著弱于 UNI / GigaPath；聚合器带来的提升远小于 backbone 升级带来的提升。
- **热力图只是相关而非因果** —— 临床解读需谨慎。

## Claude 应该如何使用这个方法

{{ skill_card("weakly-supervised-mil") }}

当用户问"在 UNI 上做切片级分类时该选哪个聚合器？"时，默认推荐 **CLAM**（人体工学好、可靠），如果实例-实例相关性重要则选 **TransMIL**，要最简基线就用 **ABMIL**。

## 相关节点

- child methods: {{ node_link("abmil") }}, {{ node_link("clam") }}, {{ node_link("transmil") }}
- successor: {{ node_link("pathology-foundation-model") }}
- datasets: {{ node_link("camelyon16") }}, {{ node_link("panda") }}
