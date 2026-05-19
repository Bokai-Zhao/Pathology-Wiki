---
title: "病理视觉-语言模型"
description: "通过 CLIP 风格的对比预训练将病理图像特征与文本对齐；支持零样本分类、检索、图像描述。"
tags: [method, vision-language, pathology, foundation-model]
---

# 病理视觉-语言模型 (Pathology Vision-Language Models)

{{ method("pathology-vlm") }}

{{ local_graph("pathology-vlm") }}

## 为什么重要

大多数病理分类流水线都需要**按任务用带标签切片做微调**。病理 VL 模型用一个**文本编码器**替代了任务专属分类头：候选类别名变成文本提示，模型选择与图像嵌入最接近的文本。类别集可以在推理时改变而无需重新训练 —— 对于需要大量细粒度标签的诊断流水线来说，这是灵活性上的质变。

病理 VL 模型还支持：

- **图文检索** —— 为病例回顾查找相似的组织学图像 + 相似的报告。
- **组织学图像描述（histology captioning）** —— 为图像块生成自然语言描述。
- **病理 VQA** —— 关于图像的自然语言问答。
- **检索增强推理** —— 把检索到的相似病例喂给下游 MLLM。

现代的病理 MLLM（PathChat、MUSK、PathGen）都建立在 VL 基础之上；没有它，MLLM 无法把语言锚定到病理图像语义。

## 核心思路

```
H&E patch                pathology text (caption / report / textbook)
   ↓                                  ↓
image encoder                    text encoder
   ↓                                  ↓
projection → joint embedding space ← projection
   ↓
contrastive InfoNCE loss: matched pairs close, mismatched far
```

训练完成后，**零样本分类**为：

```
prob(class | image) ∝ exp(<image_emb, text_emb(prompt(class))>)
```

## 子方法家族

| 子分支 | 示例 |
|--------|------|
| 图文对比（CLIP 风格） | PLIP、CONCH、QuiltNet、MUSK |
| 报告对齐 | 许多近期的生物医学 VL 模型 |
| 组织学图像描述 | ARCH、PathGen-LLaVA |
| 病理 VQA | PathChat、PathVQA、Quilt-LLaVA |
| 检索增强推理 | RAG-PathChat 风格流水线 |
| 切片级 VL（在 VL 特征上做 MIL） | {{ node_link("mi-zero-2023") }}、CONCH-MIL |

## 关键问题

- 文本来自哪里 —— 图像描述、临床报告、Twitter、教科书？
- 图文对比（CLIP）vs 生成式描述 vs 指令微调的 MLLM？
- 零样本精度与冻结特征线性探测相比如何？
- 如何把块级 VL 对齐扩展到切片级（MI-Zero、CONCH-MIL）？
- 怎样的文本词表能充分覆盖诊断病理？

## 代表论文

- {{ node_link("clip-2021") }} —— 奠基性的双编码器对比配方。
- {{ node_link("plip-2023") }} —— 首个被广泛引用的病理 VL，源自 Twitter 挖掘的 OpenPath。
- {{ node_link("mi-zero-2023") }} —— 通过 top-k 聚合，把块级 VL 扩展到切片级零样本。

## 局限

- **文本监督质量参差不齐** —— Twitter 描述噪声大；临床报告是金标准但难以大规模获取。
- **提示工程仍然重要** —— 微小的 prompt 变化会显著改变零样本精度。
- **零样本相对监督学习仍有差距**，对大多数任务而言，零样本在标签匮乏场景下有用，但并不总是 SOTA。
- **早期 VL 模型仅块级** —— 切片级需要额外聚合（MI-Zero）或切片级预训练（CONCH-MIL）。

## Claude 应该如何使用这个方法

{{ skill_card("pathology-vlm") }}

当用户问"如何做零样本病理分类？"时，若可获取请默认推荐 **CONCH**，开放权重基线用 **PLIP**，切片级提升用 **MI-Zero**。

## 相关节点

- predecessor: {{ node_link("patch-level-ssl") }}（架构起源）
- representative articles: {{ node_link("clip-2021") }}, {{ node_link("plip-2023") }}, {{ node_link("mi-zero-2023") }}
- representative model: {{ node_link("plip") }}
