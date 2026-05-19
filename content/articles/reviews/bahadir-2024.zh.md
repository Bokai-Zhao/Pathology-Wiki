---
title: "组织病理学中的 AI 应用 —— Bahadir 等人 2024 (Nat Rev Electr Eng)"
description: "面向组织病理学深度学习的广泛综述（约 206 篇参考文献），覆盖 WSI 预处理、MIL、基础模型、视觉-语言模型、分割与临床转化。"
tags: [article, review-article, survey, ai-in-histopathology, foundation-model, mil, vlm]
---

# 组织病理学中的人工智能应用

{{ article("bahadir-2024") }}

{{ local_graph("bahadir-2024") }}

## 为什么重要

Bahadir 等人是一篇**面向组织病理学的深度学习工具箱的广泛综述**，从开发底层技术的电气工程与机器学习社区视角写成。作者团队既有计算端（Bahadir、Sabuncu —— Cornell ECE），也有临床端（Liechty、Pisapia —— Weill Cornell 病理科），让综述具有一种有用的务实风格。

凭借约 206 篇参考文献，它覆盖了现代病理 AI 栈的大部分内容：

- **WSI 采集与预处理** —— 切片格式、组织掩膜、染色归一化。
- **深度学习架构** —— CNN、ViT、图神经网络、Transformer MIL。
- **弱监督 MIL** —— {{ node_link("abmil") }}、{{ node_link("clam") }}、{{ node_link("transmil") }}、DSMIL、DTFD-MIL，以及 {{ node_link("campanella-2019") }} 的临床级规模演示。
- **病理基础模型** —— 块级 SSL（{{ node_link("ctranspath") }}、{{ node_link("uni") }} 时代）以及仅视觉的 PFM 群组。
- **视觉-语言预训练** —— {{ node_link("clip-2021") }} 架构、{{ node_link("plip-2023") }} 作为病理微调、{{ node_link("mi-zero-2023") }} 用于切片级零样本。
- **分割** —— 用于细胞核的 {{ node_link("hover-net") }}、作为 ViT 继任者的 {{ node_link("cellvit") }}、{{ node_link("glas") }} 上的腺体分割、多分辨率方法。
- **分类、生物标志物预测、生存** —— 仅 H&E 的突变预测、生物标志物推断、生存建模。
- **有丝分裂检测** —— 包括多域 {{ node_link("midog") }} 基准。
- **生成模型** —— 用于合成的扩散模型、基于 GAN 的染色归一化。
- **图像配准** —— ANHIR、Learn2Reg 挑战。
- **临床转化** —— 工作流集成、计算机辅助分诊、可解释性。

可作为学位论文引言或基金背景章节的单一广泛参考。截止时间约为 2023 年中，因此最新的 VLM（CONCH、QuiltNet、MUSK）、切片级 PFM（GigaPath、Virchow、H-Optimus）以及指令微调的病理 MLLM（PathChat）**均未涵盖**。

## 范围

综述围绕组织病理学的**深度学习流水线**组织：

1. **输入** —— WSI 格式、组织掩膜、块（patch）提取、染色归一化。
2. **表征** —— 块编码器（ImageNet、病理 SSL、基础模型、视觉-语言）。
3. **聚合** —— 从均值 / 最大池化到 ABMIL / CLAM / TransMIL / 图 MIL 的 MIL 聚合器。
4. **任务头** —— 分类、分割、检测、生存回归。
5. **下游应用** —— 生物标志物预测、分子改变推断、预后分层。
6. **临床集成** —— 工作流、可解释性、监管考量（轻量覆盖）。

它不试图做元分析，也不对方法进行定量排名 —— 这是一篇面向新手的**入门导览综述**，也是面向资深从业者的参考索引。

## 覆盖映射（Pathology-Wiki 关联）

| 综述章节 | 综述涉及的 Pathology-Wiki 节点 |
|----------------|-------------------------------------------|
| WSI 预处理 | {{ node_link("openslide") }} |
| WSI 公开数据集 | {{ node_link("camelyon16") }}、{{ node_link("panda") }}、{{ node_link("bach") }}、{{ node_link("glas") }}、{{ node_link("pannuke") }}、{{ node_link("midog") }} |
| 弱监督 MIL | {{ node_link("weakly-supervised-mil") }}、{{ node_link("abmil") }}（{{ node_link("abmil-2018") }}）、{{ node_link("clam") }}（{{ node_link("clam-2021") }}）、{{ node_link("transmil") }}（{{ node_link("transmil-2021") }}）、{{ node_link("campanella-2019") }} |
| 细胞核分割 | {{ node_link("hover-net") }}（{{ node_link("hover-net-2019") }}）、{{ node_link("cellvit") }}（{{ node_link("cellvit-2024") }}） |
| 块级 SSL / PFM | {{ node_link("patch-level-ssl") }}、{{ node_link("pathology-foundation-model") }}、{{ node_link("ctranspath") }}（{{ node_link("ctranspath-2022") }}）、{{ node_link("uni") }}（{{ node_link("uni-2024") }}） |
| 视觉-语言 | {{ node_link("pathology-vlm") }}、{{ node_link("clip-2021") }}、{{ node_link("plip-2023") }}（{{ node_link("plip") }}）、{{ node_link("mi-zero-2023") }} |

Bahadir 等人对这些子主题的覆盖**广而不深** —— 对任何具体方法，请链接到上面对应的逐论文节点，获取规范化的处理。

## 值得注意的视角

- **作者 Liechty** 自引了一项关于从 H&E 预测胶质瘤 IDH 突变的工作（Liechty 等人，*Sci Rep* 2022）—— 综述将其作为临床转化范例。
- **Campanella 2019 的临床级规模演示**被反复引用，作为弱监督 MIL 的规模先例。
- **病理基础模型**被定位为 CTransPath 之后的自然下一步，综述发表于 UNI / GigaPath / Virchow 浪潮之前（截止约 2023 年中，解释了 FM 章节相对当前 2026 标准的相对单薄）。
- **病理视觉-语言**被定位为新兴方向；PLIP 和 MI-Zero 作为范例被点出，但相关章节相对简短。

## 局限（综述自身）

- **覆盖截止约 2023 年中** —— 未涵盖 CONCH、QuiltNet、MUSK、GigaPath、Virchow、H-Optimus、PathChat、PathGen、agentic pathology 工作流。
- **多模态（病理 + 组学 + 影像）**处理相对简短 —— MCAT 与 Vanguri 被引用，但更广的多模态栈未被深入综述。
- **临床转化深度**不均 —— 在深度学习工作流方面更深入，而在监管 / FDA / CE 部署考量上则不然。
- **没有排行榜**或逐任务对比表 —— 若需定量对比，请直接链接到逐论文节点。
- **Agentic pathology AI 不在范围**（这一分支对该截止时间过于新近）。

## Claude 应该如何使用这篇论文

{{ skill_card("bahadir-2024") }}

将 Bahadir 2024 用作 AI-in-histopathology 背景章节（学位论文引言、基金背景、相关工作段落）的**单一广泛参考**。对综述中讨论的任何具体方法，**链接到对应的逐论文 Pathology-Wiki 节点**，以获得规范化的一手处理。

## 相关节点

- methods：{{ node_link("pathology-foundation-model") }}、{{ node_link("patch-level-ssl") }}、{{ node_link("pathology-vlm") }}、{{ node_link("weakly-supervised-mil") }}、{{ node_link("abmil") }}、{{ node_link("clam") }}、{{ node_link("transmil") }}、{{ node_link("hover-net") }}、{{ node_link("cellvit") }}
- models：{{ node_link("uni") }}、{{ node_link("ctranspath") }}、{{ node_link("plip") }}
- datasets：{{ node_link("camelyon16") }}、{{ node_link("bach") }}、{{ node_link("glas") }}、{{ node_link("pannuke") }}、{{ node_link("midog") }}、{{ node_link("panda") }}
- tools：{{ node_link("openslide") }}
- 被综述的论文：{{ node_link("abmil-2018") }}、{{ node_link("clam-2021") }}、{{ node_link("transmil-2021") }}、{{ node_link("campanella-2019") }}、{{ node_link("hover-net-2019") }}、{{ node_link("cellvit-2024") }}、{{ node_link("ctranspath-2022") }}、{{ node_link("clip-2021") }}、{{ node_link("plip-2023") }}、{{ node_link("mi-zero-2023") }}、{{ node_link("uni-2024") }}

## 参考文献

- DOI：[10.1038/s44287-023-00012-7](https://doi.org/10.1038/s44287-023-00012-7)
- *Nature Reviews Electrical Engineering* 1(2):93–108 (2024)
