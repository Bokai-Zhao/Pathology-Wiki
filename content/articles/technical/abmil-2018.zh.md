---
title: "ABMIL —— 基于注意力的深度多实例学习（Ilse 等人 2018）"
description: "面向 MIL 的奠基性可学习注意力池化。任何病理 WSI 切片级分类的标准首选基线。"
tags: [article, technical-article, mil, attention, wsi, h-and-e]
---

# ABMIL —— 基于注意力的深度多实例学习

{{ article("abmil-2018") }}

{{ local_graph("abmil-2018") }}

## 为什么重要

在这篇论文之前，MIL 池化由固定的均值 / 最大算子主导。ABMIL 引入了**每实例可学习的标量注意力权重**，由一个小型两层 MLP 参数化。袋嵌入变为实例嵌入的注意力加权和 —— 排列不变（保留 MIL 假设）但可训练，且**可解释**：注意力权重免费提供热图式定位，告诉你哪些块驱动了袋级决策。

ABMIL 播下了现代病理 WSI MIL 文献的种子。{{ node_link("clam") }}、{{ node_link("transmil") }}、DSMIL、DTFD-MIL、SETMIL 都源自它。

## 核心思路

```python
# pseudo-code: ABMIL attention head
H = encoder(instances)               # (N, D)
A = softmax(w.T @ tanh(V @ H.T))     # (1, N)
bag = (A @ H).squeeze()              # (D,)
y_hat = classifier(bag)
```

两种变体：

- **Vanilla attention** —— 单一非线性（tanh）。
- **Gated attention** —— 将 pre-softmax 分数乘以一个独立的 sigmoid 门控，在更难的袋上通常更好校准。

## 输入与输出

- **输入**：每袋实例嵌入（`N × D`），通常是来自 CNN 编码器的块特征。
- **输出**：袋级标签 + 注意力向量（`N × 1`），可用作热图。

## 数据集 / 任务 / 指标

- **MNIST bags** —— 合成 MIL 基准。
- **乳腺癌组织病理** —— 切片级阳性 / 阴性的块级袋。
- **结肠癌组织病理** —— 同上。
- {{ node_link("camelyon16") }} 是当今 ABMIL 的标准病理复用基准。
- 指标：AUC、准确率。

## 方法

- 两层 MLP 注意力头（隐层维度可配置）。
- 排列不变池化 —— 块的顺序不影响结果。
- 端到端可训练；梯度同时回传到编码器与注意力头。
- **无实例-实例交互** —— 每个块独立打分（这是 {{ node_link("transmil") }} / DSMIL 后续要解决的关键局限）。

## 主要结果

在合成 MIL 基准与论文给出的组织病理袋上，ABMIL 优于均值 / 最大池化 MIL、MI-Net 与 MI-SVM。更大的贡献是**模板** —— 病理 MIL 此后一直在使用这种注意力头模板。

## 局限

- **排列不变** —— 忽略切片内的块位置。
- **无实例-实例交互** —— TransMIL/DSMIL 后续补上这一点。
- **单类注意力** —— 多类扩展（CLAM-MB）需要逐类分支。

## Claude 应该如何使用这篇论文

{{ skill_card("abmil-2018") }}

在任何涉及切片级分类的病理论文中，将 ABMIL 作为**注意力 MIL 的起源**进行引用。在基准中将其作为最简单的可学习注意力基线。

## 相关节点

- proposes method：{{ node_link("abmil") }}
- 父方法：{{ node_link("weakly-supervised-mil") }}
- 规范评估数据集：{{ node_link("camelyon16") }}
- 直接后继：{{ node_link("clam-2021") }}、{{ node_link("transmil-2021") }}

## 参考文献

- arXiv：[1802.04712](https://arxiv.org/abs/1802.04712)
- ICML 2018 proceedings：[proceedings.mlr.press/v80/ilse18a.html](https://proceedings.mlr.press/v80/ilse18a.html)
- 代码：[github.com/AMLab-Amsterdam/AttentionDeepMIL](https://github.com/AMLab-Amsterdam/AttentionDeepMIL)
