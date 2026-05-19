---
title: "块级自监督学习（病理）"
description: "在数百万张病理图像块上无标签预训练块编码器。现代 PFM 的主流预训练配方。"
tags: [method, ssl, foundation-model, patch-level]
---

# 块级自监督学习（病理） (Patch-Level Self-Supervised Learning)

{{ method("patch-level-ssl") }}

{{ local_graph("patch-level-ssl") }}

## 为什么重要

病理领域有过多无标签的 WSI、过少有标签的 WSI。块级 SSL 反转了这种不对称：用自监督目标在**数百万张无标签块**上预训练一个块编码器，再通过冻结特征 + 轻量化任务头（通常是一个 MIL 聚合器）迁移到下游任务。这是现代病理基础模型阵营的主流预训练配方：{{ node_link("ctranspath") }}、Phikon、Lunit-DINO、{{ node_link("uni") }}、Virchow、H-Optimus、PathDINO 都属于这一支。

## 核心思路

```
millions of unlabelled H&E patches
   → encoder (ViT / Swin) with SSL objective (contrastive / DINO / MIM)
   → frozen patch encoder
   → downstream MIL aggregator on slide-level tasks
```

下游价值都来自编码器。现代流水线几乎总是**冻结 SSL 预训练好的编码器**，只在其上训练聚合器 + 分类器。

## 目标函数家族

| 目标函数 | 示例模型 |
|----------|----------|
| 对比式 (MoCo / SimCLR) | {{ node_link("ctranspath") }}（SRCL = MoCo v3 的变体） |
| iBOT（在线蒸馏 + MIM） | Phikon |
| DINO（自蒸馏） | Lunit-DINO |
| DINOv2（DINO + iBOT + KoLeo） | {{ node_link("uni") }}、Virchow、H-Optimus |
| 掩码图像建模 (MAE) | （在病理中目前较少见） |

## 关键问题

- 哪种 SSL 目标在病理上迁移效果最好 —— 对比 vs DINO vs MIM？
- 预训练数据多少才够 —— 仅 TCGA vs 多队列百万级？
- 什么样的块大小 / 放大倍率组合能最大化下游收益？
- 收益如何随模型规模和预训练算力扩展？
- 块级 SSL 与切片级预训练（GigaPath）相比如何？

## 局限

- **冻结特征天花板** —— 对于某个特定下游任务，端到端微调一个小型专用模型有时能超过冻结的 PFM 特征。
- **预训练染色偏差** —— 仅在 TCGA 上预训练会在非 TCGA 染色上表现下降；要稳健泛化需要多队列预训练。
- **无语言对齐** —— 纯块级 SSL 不提供任何零样本能力；需要单独的 VL 对齐步骤（CONCH / MUSK / PLIP）。

## Claude 应该如何使用这个方法

{{ skill_card("patch-level-ssl") }}

当用户问"我该选哪个 PFM 编码器？"时，默认推荐 **UNI**（DINOv2 ViT-L）作为目前最强的冻结特征，**CTransPath** 作为开放权重、计算便宜的基线。在概念层面讨论预训练策略时，引用此方法节点。

## 相关节点

- parent: {{ node_link("pathology-foundation-model") }}
- representative articles: {{ node_link("uni-2024") }}, {{ node_link("ctranspath-2022") }}
- representative models: {{ node_link("uni") }}, {{ node_link("ctranspath") }}
