---
title: "TransMIL —— 基于 Transformer 的相关性 MIL（Shao 等人 2021）"
description: "Nyström 自注意力 + PPEG 位置编码用于 WSI MIL；在 gigapixel 规模上建模块-块相关性。"
tags: [article, technical-article, mil, transformer, wsi]
---

# TransMIL —— 面向全切片图像分类的基于 Transformer 的相关性多实例学习

{{ article("transmil-2021") }}

{{ local_graph("transmil-2021") }}

## 为什么重要

{{ node_link("abmil") }} 与 {{ node_link("clam") }} 对每个块独立打分 —— MIL 假设即*排列不变池化*。但肿瘤组织在空间上是有组织的：病变是连续的、免疫浸润是上下文相关的、腺体结构只有跨越多个块才有意义。TransMIL 是首个被广泛采用的、通过 Transformer 自注意力**显式建模实例-实例相关性**的 MIL 变体，并能在 gigapixel 规模上运行。

## 核心思路

```
patches → linear proj → [CLS] + sequence
   → PPEG (multi-scale spatial conv)
   → Nyström-attention Transformer layers
   → [CLS] embedding → classifier
```

两个关键要素：

1. **Nyström 自注意力** —— 将注意力代价从 O(N²) 降到 O(N)，使数千块的袋变得可行。
2. **PPEG（金字塔位置编码生成器）** —— 通过对袋施加多尺度卷积重新注入 2D 空间上下文，恢复原本在排列不变的 Transformer 序列中丢失的空间信号。

## 输入与输出

- **输入**：每张 WSI 的块特征袋（来自任意编码器）。
- **输出**：切片级类概率。

## 数据集 / 任务 / 指标

- {{ node_link("camelyon16") }} —— 乳腺淋巴结转移（二分类）。
- **TCGA-NSCLC** —— 非小细胞肺癌亚型分类。
- **TCGA-RCC** —— 肾细胞癌亚型分类。
- 指标：AUC、准确率、F1。

## 方法

- 默认 ResNet-50 ImageNet 特征（论文）；现代实践换为 UNI / GigaPath 特征。
- 两层 Nyström Transformer 编码器。
- Transformer 层之间插入 PPEG。
- [CLS] token 池化用于切片级预测。
- 标准交叉熵训练；Adam 优化器。

## 主要结果

在全部三项基准上，TransMIL 优于 ABMIL、CLAM、DSMIL 与 MIL-RNN。消融实验显示 PPEG 位置编码相对随机 2D 混合带来显著提升，验证了显式空间信号的必要性。

## 局限

- **近似注意力** —— Nyström 引入方差；在小袋上精确注意力可能更优。
- **参数代价** —— 相比 ABMIL/CLAM 多了 Transformer 参数。
- **可解释性弱于** CLAM 的逐类注意力分支 —— 可视化 "Transformer 关注什么" 需要额外工作。
- **默认骨干**（ResNet-50）已过时。

## Claude 应该如何使用这篇论文

{{ skill_card("transmil-2021") }}

当**实例-实例相关性可能提供信息**时选用 TransMIL：生存预测、复杂亚型分类、空间结构线索。与 {{ node_link("clam-2021") }} 与 {{ node_link("abmil-2018") }} 一并作为标准 MIL 基准三件套引用。

## 相关节点

- proposes method：{{ node_link("transmil") }}
- 父方法：{{ node_link("weakly-supervised-mil") }}
- 前驱：{{ node_link("abmil-2018") }}、{{ node_link("clam-2021") }}
- 数据集：{{ node_link("camelyon16") }}

## 参考文献

- arXiv：[2106.00908](https://arxiv.org/abs/2106.00908)
- NeurIPS 2021 proceedings page
- 代码：[github.com/szc19990412/TransMIL](https://github.com/szc19990412/TransMIL)
