---
title: "BACH —— BreAst Cancer Histology Images Grand Challenge"
description: "ICIAR 2018 Challenge 数据集：400 张显微 ROI + 10 张 WSI，按 normal / benign / in-situ / invasive 四类标注。"
tags: [dataset, breast-cancer, h-and-e, microscopy, segmentation, classification]
---

# BACH —— BreAst Cancer Histology Images Grand Challenge (ICIAR 2018)

{{ dataset("bach") }}

{{ local_graph("bach") }}

## 包含什么

BACH 是 ICIAR 2018 Challenge 数据集，用于 H&E 上的**四类乳腺组织学分类**。分两部分：

- **Part A**：400 张显微图像（2040×1536，约 0.42 μm/px），每类 100 张 —— `normal`、`benign`、`in-situ carcinoma`、`invasive carcinoma`。
- **Part B**：10 张 H&E WSI（`.svs`），附像素级 4 类标注，用于 WSI 级推断评估。

## 模态与范围

- **模态**：H&E
- **器官**：乳腺
- **疾病**：乳腺癌（全谱：正常 → 浸润）
- **物种**：人
- **样本类型**：显微图像（Part A）与全切片图像（Part B）

## 任务与指标

| Part | 任务 | 指标 |
|------|------|------|
| A | 4 类图像分类 | Accuracy（主要）、precision、recall |
| B | 像素级 4 类 WSI 标注 | 各类 Dice / accuracy |

## 获取方式

托管于 `iciar2018-challenge.grand-challenge.org`。需要注册。基于 **CC BY-NC-ND 4.0** 发布 —— 非商业、不允许衍生作品、需署名。

## 预处理

Part A 图像为原生 2040×1536 像素。常见流程：

1. 以原生分辨率加载 TIF。
2. **染色归一化**（Macenko / Reinhard / Vahadane）—— 染色在不同批次间差异显著；BACH 上报告的数字随归一化选择剧烈波动。
3. 训练时随机 512×512 裁剪，配合标准旋转 / 翻转增强。
4. Part B 的 WSI：通过 {{ node_link("openslide") }} 读取 `.svs`，按 Part A 选定的 patch 分辨率做滑窗推断。

## 为什么重要

BACH 提供了一个**仅基于形态学标签的干净 4 类乳腺分类任务**（没有分子亚型），是检验染色鲁棒性和病理 PFM 少样本迁移的常用压力测试。数据集足够小，即便在单 GPU 上也可作为迁移学习基准。

## 常见坑

- **每类只有 100 张** —— 必须重度数据增强 / SSL 预训练；从零开始训练的 CNN 会立刻过拟合。
- **染色方差**主导方法间的报告方差。务必声明所用的染色归一化器（若有）。
- **类别边界**（benign vs in-situ vs invasive）遵循特定共识标准 —— 标签不可直接迁移到其他乳腺队列。
- **Part B 仅 10 张 WSI** —— 用于定性的定位图，而非 slide 级指标。

## Claude 应该如何使用这个数据集

{{ skill_card("bach") }}

把 BACH 看作 **Camelyon16 的小数据互补** —— Camelyon16 压力测试规模，BACH 压力测试染色鲁棒性与少样本迁移。在病理基础模型在乳腺组织上的验证中常被同时引用。

## 相关节点

- tool: {{ node_link("openslide") }}
- method context: {{ node_link("pathology-foundation-model") }}
- companion: {{ node_link("camelyon16") }}（大型乳腺基准）
- challenge paper: `aresta-2019-bach` *（文章节点暂缓 —— 待 §11.6）*

## 参考

- Challenge homepage: [iciar2018-challenge.grand-challenge.org](https://iciar2018-challenge.grand-challenge.org/)
- Aresta et al., *Medical Image Analysis* 56 (2019) 122–139 (DOI to verify)
