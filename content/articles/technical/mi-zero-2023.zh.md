---
title: "MI-Zero —— 面向组织病理的视觉-语言预训练 MIL 零样本迁移（Lu 等人 CVPR 2023）"
description: "通过对块级 VL 相似度分数做 top-k 池化，将块级病理 VL 零样本提升到切片级。无切片级训练。"
tags: [article, technical-article, vision-language, mil, zero-shot, wsi]
---

# 面向组织病理图像的视觉语言预训练多实例零样本迁移

{{ article("mi-zero-2023") }}

{{ local_graph("mi-zero-2023") }}

## 为什么重要

{{ node_link("plip-2023") }} 与其他块级病理 VLM 在**块**上进行零样本分类，但大多数临床上有意义的病理任务都是**切片级**。MI-Zero 是首个被广泛引用的、将块 VL → 切片级零样本桥接起来的方法，且无需任何切片级训练。关键洞见是：将文本提示与切片各块的块级 VL 相似度分数通过简单池化（**top-k**、**加权 top-k** 或恒等）聚合 —— 产生一个切片级零样本预测。

MI-Zero 启用了现代切片级零样本 WSI 流水线，是 CONCH-MIL 与其他切片级 VL 方法的种子论文。

## 核心思路

```
for each patch p in slide S:
    score(p, class_k) = <image_enc(p), text_enc(prompt_k)>
slide_score(class_k) = top_k_pool({score(p, class_k) for p in S})
prediction(S) = argmax_k slide_score(class_k)
```

探索了三种池化函数：**top-k 均值**、**加权 top-k**、**恒等**（在全部块上取均值）。top-k 均值为默认 —— 它捕获了每类最强的块级 VL 证据，同时忽略弱信号的长尾。

## 输入与输出

- **输入**：WSI 块袋 + 文本提示（每类一条）。
- **输出**：切片级零样本类概率（无切片级训练）。

## 数据集 / 任务 / 指标

- TCGA-NSCLC 亚型分类。
- TCGA-RCC 亚型分类。
- TCGA-BRCA 亚型分类。
- 指标：零样本准确率、AUC、平衡准确率。

## 方法

- 块级 VL 编码器：任意病理 VLM（作者使用一个同期的 Mahmood-Lab 模型；可用 PLIP 替代）。
- 块级相对每个候选文本提示的相似度分数。
- 通过 top-k 池化在切片各块上聚合。
- 切片级无训练。

## 主要结果

MI-Zero 在 TCGA-NSCLC、TCGA-RCC、TCGA-BRCA 上取得具有竞争力的零样本表现 —— 在较易任务上缩小了与完全监督 MIL 的差距。聚合方式的选择（论文中 top-k 池化，k ≈ 25）比其他复杂方案更重要。

## 局限

- **零样本落后于有监督**于大多数任务 —— 适用于标签稀缺场景。
- **对提示敏感** —— 小的提示变动会显著改变准确率。
- **块编码器质量起主导作用** —— 上游病理 VLM 的选择比聚合细节更重要。
- **Top-k 聚合较粗** —— 对许多低注意力块的弥散信号低估，错过细微模式。

## Claude 应该如何使用这篇论文

{{ skill_card("mi-zero-2023") }}

将 MI-Zero 作为**首个切片级病理 VL 零样本方法**进行引用。当用户问 "在没有切片标签的情况下如何做零样本 WSI 分类？"，这就是规范答案。

## 相关节点

- extends：{{ node_link("pathology-vlm") }}
- related：{{ node_link("weakly-supervised-mil") }}（借用了 MIL 风格的聚合）
- related：{{ node_link("plip-2023") }}（规范的底层块 VL 编码器）
- foundation：{{ node_link("clip-2021") }}

## 参考文献

- DOI：[10.1109/CVPR52729.2023.01893](https://doi.org/10.1109/CVPR52729.2023.01893)
- arXiv：[2306.07831](https://arxiv.org/abs/2306.07831)
- *CVPR 2023* pp 19764–19775
- 代码：[github.com/mahmoodlab/MI-Zero](https://github.com/mahmoodlab/MI-Zero)
