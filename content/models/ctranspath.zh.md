---
title: "CTransPath —— Swin-T 病理 SSL 编码器"
description: "在 TCGA+PAIP 上用 SRCL（MoCo v3 变体）预训练的 Swin Transformer Tiny。UNI 之前的开源病理 SSL 基线。"
tags: [model, foundation-model, ssl, swin, pathology]
---

# CTransPath —— Swin-T 病理 SSL 编码器

{{ model("ctranspath") }}

{{ local_graph("ctranspath") }}

## 为什么重要

在 {{ node_link("uni") }}、GigaPath、Virchow 之前，**CTransPath 是最强的开源病理 SSL checkpoint**。它由腾讯 AI Lab 于 2022 年发布，把 TCGA 量级病理数据上的 transformer 预训练带入了开源工具链，在 2023–2024 年间是众多 WSI MIL 流水线事实上的 patch 编码器。

如今它仍然有用，作为：

- **开放权重、低算力的基线**，当 UNI 的 gating 权重不可用或算力紧张时。
- **UNI 之前的前驱**，在记录病理 PFM 演化时进行引用。

## 架构

- **骨干**：Swin Transformer Tiny（约 28M 参数，为 SSL 做了修改）。
- **输入**：H&E patch，224×224。
- **输出**：768 维 patch 嵌入 *（需对照仓库核对）*。

## 预训练

- **目标**：SRCL —— Semantically-Relevant Contrastive Learning，一种 MoCo v3 变体，通过从学习的 memory bank 中抽取语义相关的正样本，对标准对比对进行增强。
- **数据**：来自 TCGA + PAIP 的约 32k 张 WSI，约 15M 张 H&E patch。

## 能力

- H&E patch 编码（纯视觉），用于下游的分类 / MIL / 检索。
- 在任意病理流水线中可作为 ImageNet 预训练 CNN 的即插即用替代。
- 开放权重 —— 没有 gating，便于复现。

## 局限

- **骨干较小**（约 28M 参数），不及现代 PFM（UNI ViT-L 约 307M，Virchow ViT-H 约 632M）。
- **预训练队列有限**（TCGA + PAIP）—— 染色多样性不如 100k+ WSI 量级的 PFM。
- **嵌入维度 768**，相比 UNI 的 1024 —— 下游有少量表征代价。
- **没有视觉-语言对齐**。

## Claude 应该如何使用这个模型

{{ skill_card("ctranspath") }}

在以下情形优先选择 CTransPath：

- 开放权重很重要，而 gated PFM（UNI、Virchow）不可用。
- 算力预算紧张，可以接受更小的骨干。
- 在对比表中需要记录 UNI 之前的基线。

需要最强 H&E 编码器时，选择 {{ node_link("uni") }}。

## 相关节点

- belongs to: {{ node_link("patch-level-ssl") }}, {{ node_link("pathology-foundation-model") }}
- successor (stronger PFM): {{ node_link("uni") }}
- article: {{ node_link("ctranspath-2022") }}

## 参考

- DOI: [10.1016/j.media.2022.102559](https://doi.org/10.1016/j.media.2022.102559)
- Code: [github.com/Xiyue-Wang/TransPath](https://github.com/Xiyue-Wang/TransPath)
