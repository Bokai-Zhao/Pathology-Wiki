---
title: "UNI（模型卡）"
description: "纯视觉病理基础模型 —— ViT-L/16，DINOv2，Mass-100K。"
tags: [model, foundation-model, vision-only-pfm, vit-l, dinov2]
---

# UNI

{{ model("uni") }}

{{ local_graph("uni") }}

## 为什么重要

UNI 是经典的纯视觉病理基础模型：在 Mass-100K 上使用 DINOv2 预训练的 ViT-L/16。对于希望获得强冻结基线、又不想自行设计骨干网络的 WSI 级新研究，它是默认的 H&E 块 (patch) 编码器。

## 核心思想

ViT-L/16 在约 100M H&E patch 上使用 DINOv2 自监督预训练，这些 patch 来源于覆盖 20 种组织类型的约 100k 张 WSI。冻结后的特征可迁移到下游的 slide 级 MIL、patch 分类和检索任务。

## 输入与输出

- **输入**：H&E patch（224×224 或 256×256，约 0.5 μm/px）。
- **输出**：1024 维 patch 嵌入 *（需对照已发布的 checkpoint 核对）。*

## 能力

- 在多样组织类型上具有出色的冻结特征性能。
- 在病理流水线中可作为 ImageNet 预训练 ViT 或 CTransPath 的即插即用替代。
- 是 H&E 上 ABMIL / CLAM / TransMIL 等 slide 聚合方法的标准骨干。

## 如何加载

```python
# Hugging Face — gated; request access first.
from huggingface_hub import login
login()

import timm
import torch

model = timm.create_model(
    "hf_hub:MahmoodLab/UNI",
    pretrained=True,
    init_values=1e-5,
    dynamic_img_size=True,
)
model.eval()
```

*请对照 [UNI README](https://github.com/mahmoodlab/UNI) 核对确切的加载方式 —— 上面的写法仅供参考。*

## 何时使用

- 任何需要强纯视觉基线的新 WSI 级基准。
- 在结构化基准中对比病理 PFM。
- 需要固定 patch 特征的 slide 聚合研究。

## **不**适用的场景

- VLM 任务（图文检索、字幕生成、VQA）—— 改用 **CONCH** 或 **MUSK**。
- slide 级预训练目标 —— 改用 **GigaPath / Prov-GigaPath**。
- 需要完全开放权重、不允许 gating 的流水线 —— 退回 **CTransPath** 或开源 ViT 替代品。

## 局限

- 预训练数据为内部数据 —— 无法从头重训。
- 权重通过 Hugging Face 访问申请，存在 gating。
- 仅限 H&E；训练分布外的染色变化可能导致性能下降。

## 版本

- **UNI2** 已作为后继版本发布；其节点加入后，应使用 `uni2 --supersedes--> uni` 进行链接。版本约定见 CLAUDE.md §9.2。

## Claude 应该如何使用这个模型

{{ skill_card("uni") }}

## 相关节点

- article: {{ node_link("uni-2024") }}
- method: {{ node_link("pathology-foundation-model") }}
