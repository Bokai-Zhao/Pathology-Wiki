---
title: "CTransPath —— 面向组织病理学的基于 Transformer 的无监督对比学习（Wang 等人 2022）"
description: "Swin-T 在约 32k TCGA+PAIP WSI 上用 SRCL（MoCo v3 变体）预训练。UNI 之前的开源病理 SSL 基线。"
tags: [article, technical-article, ssl, foundation-model, swin, h-and-e]
---

# 面向组织病理图像分类的基于 Transformer 的无监督对比学习

{{ article("ctranspath-2022") }}

{{ local_graph("ctranspath-2022") }}

## 为什么重要

在 2022–2023 年约 18 个月间，CTransPath 是**最强的开源病理 SSL 检查点**，也是众多 WSI MIL 流水线的规范块编码器。它首次广泛地论证了：在 TCGA 规模病理数据上、用精心设计的对比目标预训练的 Transformer 骨干，可以打败 ImageNet 预训练 CNN 与早期病理 SSL 配方（SimCLR-pathology、MoCo-v3-ImageNet）。

到 2024 年，CTransPath 已被更大的基础模型（{{ node_link("uni") }}、GigaPath、Virchow）取代，但它仍是标准的**开源权重、低算力基线**，也是 PFM 对比表中 UNI 之前的参考。

## 核心思路

- **骨干**：Swin Transformer Tiny（约 28M 参数），针对 SSL 做了改造。
- **目标**：SRCL —— Semantically-Relevant Contrastive Learning。MoCo v3 变体，在标准对比对的基础上，额外加入从学习记忆库中抽取的**语义相关正样本**，鼓励编码器跨切片对视觉相似的块进行聚类。
- **预训练数据**：约 32k WSI（TCGA + PAIP），约 1500 万张 224×224 的 H&E 块。

## 输入与输出

- **输入**：H&E 块，224×224。
- **输出**：768 维块嵌入。

## 数据集 / 任务 / 指标

- 论文中的下游评估覆盖块分类、MIL 切片级分类与多个病理基准上的检索。
- 指标：AUC、准确率、top-k 准确率。

## 方法

- Swin-T 编码器 + 投影头。
- MoCo v3 风格的动量编码器 + 记忆库。
- SRCL 增强：使用特征相似度从记忆库中抽取语义正样本。
- 标准对比 InfoNCE 损失 + SRCL 正样本项。

## 主要结果

在多个下游病理任务上，CTransPath 优于 ImageNet 预训练的 ResNet-50 / ViT、SimCLR-pathology 与 MoCo v3。代码 + 权重的释出推动了广泛采用：CTransPath 在 2022–2023 年成为病理 MIL 流水线事实上的开源块编码器。

## 局限

- **骨干较小**（约 28M），对比现代 PFM（UNI ViT-L 约 307M、Virchow ViT-H 约 632M）。
- **预训练队列有限**（TCGA + PAIP）—— 染色多样性不及 10 万+ WSI 的 PFM。
- **嵌入维度 768** vs UNI 的 1024 —— 下游有小幅表征代价。
- **无视觉-语言对齐** —— 纯块级 SSL。

## Claude 应该如何使用这篇论文

{{ skill_card("ctranspath-2022") }}

将 CTransPath 作为任何 PFM 对比中的 **UNI 之前的开源病理 SSL 基线**进行引用。使用 {{ node_link("ctranspath") }} model 节点用于下游流水线集成。

## 相关节点

- releases model：{{ node_link("ctranspath") }}
- proposes method：{{ node_link("patch-level-ssl") }}
- 相关论文（后继）：{{ node_link("uni-2024") }}

## 参考文献

- DOI：[10.1016/j.media.2022.102559](https://doi.org/10.1016/j.media.2022.102559)
- 代码：[github.com/Xiyue-Wang/TransPath](https://github.com/Xiyue-Wang/TransPath)
