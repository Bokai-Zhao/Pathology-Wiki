---
title: "PLIP —— 病理语言-图像预训练"
description: "在约 200k 来自医学 Twitter（OpenPath）的病理图文对上微调的 CLIP ViT-B/32。首个被广泛引用的病理 VL 模型。"
tags: [model, vision-language, foundation-model, clip, pathology]
---

# PLIP —— 病理语言-图像预训练

{{ model("plip") }}

{{ local_graph("plip") }}

## 为什么重要

PLIP 是**首个开放权重的病理视觉-语言基础模型**。Huang 等人通过在从医学 Twitter 抓取的约 200k 张病理图文对（OpenPath 语料）上微调 {{ node_link("clip-2021") }}，证明了领域特定的 VL 预训练能解锁零样本 H&E 分类与图文检索，其水平是 CLIP-ImageNet 难以企及的。

PLIP 如今已显得稍旧 —— 在大多数下游基准上，CONCH 和 QuiltNet 都优于它 —— 但它仍是标准的**开放权重病理 VL 基线**，也是被引用最多的病理 VL 参考。

## 架构

- **图像编码器**：CLIP ViT-B/32（用 OpenAI CLIP 初始化后微调）。
- **文本编码器**：CLIP text Transformer。
- **输出**：512 维共享嵌入 *（需对照仓库核对）*。
- **参数量**：约 150M（图像 + 文本合计）*（待核对）*。

## 预训练

- **目标**：InfoNCE（与 CLIP 相同）。
- **数据**：OpenPath —— 约 200k 张病理图文对，从医学 Twitter 挖掘，按病理相关 hashtag 与临床医生帖子筛选。

## 能力

- 通过文本提示进行**零样本病理图像分类**。
- 在病理语料上进行**图文检索**。
- **patch + 文本联合嵌入**，可用于检索增强的流水线。

## 局限

- **Twitter 字幕含噪声** —— 临床保真度参差不齐。
- **ViT-B/32 骨干**按现代 PFM 标准偏小。
- **常见所见偏倚** —— 罕见病在 Twitter 帖子中被低估。
- **仅限 patch 级** —— slide 级零样本需要 MI-Zero 或 CONCH-MIL。
- **伦理 / 知情同意问题** —— Twitter 挖掘数据；CONCH 和 QuiltNet 改用教科书来源。

## Claude 应该如何使用这个模型

{{ skill_card("plip") }}

在以下情形优先选择 PLIP：

- 开放权重与可复现性是关键。
- 需要一个零样本基线用于 H&E 分类任务。
- 用户要求首个被广泛引用的病理 VL 参考。

若可获取且追求 SOTA 性能，请优先使用 CONCH。

## 相关节点

- belongs to: {{ node_link("pathology-vlm") }}
- extends: {{ node_link("clip-2021") }}
- article: {{ node_link("plip-2023") }}

## 参考

- DOI: [10.1038/s41591-023-02504-3](https://doi.org/10.1038/s41591-023-02504-3)
- Code: [github.com/PathologyFoundation/plip](https://github.com/PathologyFoundation/plip)
- Hugging Face: [vinid/plip](https://huggingface.co/vinid/plip)
