---
title: "PANDA —— Prostate cANcer graDe Assessment Challenge"
description: "约 10.6K 张来自两家机构（Radboudumc、Karolinska）的 H&E 前列腺活检 WSI，标注 ISUP 分级。"
tags: [dataset, prostate-cancer, gleason, isup, h-and-e, kaggle]
---

# PANDA —— Prostate cANcer graDe Assessment

{{ dataset("panda") }}

{{ local_graph("panda") }}

## 包含什么

PANDA 是用于前列腺 Gleason / ISUP 分级（H&E 活检）的最大公开数据集。它打包了 **约 10,616 张 WSI** *（待核对）*，由 **两家机构** 贡献：

- **Radboud University Medical Center (Radboudumc)**，荷兰
- **Karolinska Institute**，瑞典

每张切片都是前列腺**穿刺活检 (needle biopsy) 芯**，以高分辨率扫描得到（多分辨率 TIFF，可用 OpenSlide / pyvips 读取）。标签包含 ISUP 分级组 (0–5)、Gleason 主/次模式，以及部分切片上的像素级肿瘤标注。

## 模态与范围

- **模态**：H&E
- **器官**：前列腺
- **疾病**：前列腺腺癌
- **物种**：人
- **样本类型**：穿刺活检（非根治性前列腺切除）

## 标签与任务

- `isup-grade` —— 有序 0–5
- `gleason-primary`、`gleason-secondary` —— Gleason 模式对
- `tumor-mask` —— 部分像素级标注（子集）

标准任务：

- **分级 (Grading)** —— ISUP 分级组分类（原 Challenge 任务）。
- **亚型分类** —— Gleason 模式。
- **肿瘤区域分割** —— 在带标注子集上。

原 Challenge 指标：**Quadratic-weighted kappa**。

## 获取方式

数据托管于 **Kaggle**（`prostate-cancer-grade-assessment`）。需要 Kaggle 账号并接受比赛规则。测试集由 Kaggle 保留 —— 对于离线评估，应从训练集中构建本地验证切分。

许可条款来源于 Kaggle 比赛规则；任何二次分发前，请通过[规则页面](https://www.kaggle.com/competitions/prostate-cancer-grade-assessment/rules)核对当前文本。

## 预处理

```python
import openslide
slide = openslide.OpenSlide("/path/to/0005f7aaab2800f6170c399693a96917.tiff")
print(slide.level_dimensions, slide.properties.get("openslide.mpp-x"))
```

推荐流程：

1. 用 **OpenSlide** 或 **pyvips** 读取 TIFF WSI。
2. 组织掩膜，去掉背景。
3. 在 20×（或在算力受限时 10×）进行 patch 切分；256×256 patch 是常见选择。
4. **跨两家机构对齐** —— Radboud 与 Karolinska 在不同协议下进行标注。务必同时按来源分别评估和合并评估。

## 被使用的基准

- WSI-PFM 基准 *（节点尚未 ingest —— 待 §11.6 用户决策）*

## 常见坑

- 两家机构、不同标注协议 → 跨来源泛化非平凡；报告各机构分项指标。
- Karolinska 子集存在已知标签噪声；社区有清洗变体。
- 朝 ISUP grade 0（良性）严重类别不平衡。
- 测试集离线不可获取 —— 在没有 Kaggle 提交的情况下与排行榜数字比较是无效的。
- 活检标本（非全器官切除）—— 分布不同于 TCGA-PRAD。

## Claude 应该如何使用这个数据集

{{ skill_card("panda") }}

## 相关节点

- tool: {{ node_link("openslide") }} —— 经典读取器。
- methods: weakly-supervised-mil, pathology-foundation-model, clam, abmil *（方法节点待补 —— §11.6）*。

## 参考

- Kaggle: [prostate-cancer-grade-assessment](https://www.kaggle.com/competitions/prostate-cancer-grade-assessment)
- Paper: Bulten et al., *Nature Medicine* 2022 *（文章节点暂缓 —— 待 §11.6）*
