---
title: "Camelyon16 —— 乳腺癌淋巴结转移检测"
description: "400 张来自两家机构的 H&E 前哨淋巴结 WSI，附 slide 级 + 病灶级标注。"
tags: [dataset, breast-cancer, lymph-node-metastasis, h-and-e, wsi, mil]
---

# Camelyon16 —— Cancer Metastases in Lymph Nodes 2016

{{ dataset("camelyon16") }}

{{ local_graph("camelyon16") }}

## 包含什么

Camelyon16 是 H&E WSI 上**前哨淋巴结乳腺癌转移检测**的奠基性公开基准。该版本包含 **400 张全切片图像**（270 训练 + 130 测试），由 **Radboud University Medical Center** 与 **Utrecht University Medical Center** 贡献。

每张切片在三种粒度上标注：

- **slide 级**：阴性 / 孤立肿瘤细胞 (ITC) / 微转移 / 大转移。
- **病灶级**：阳性切片上对相连肿瘤区域的穷尽多边形（XML/JSON）。
- **像素级**：由病灶多边形派生的肿瘤掩膜。

## 模态与范围

- **模态**：H&E
- **器官**：淋巴结（前哨淋巴结）—— 乳腺癌标本
- **疾病**：乳腺癌伴区域转移
- **物种**：人
- **样本类型**：前哨淋巴结切片

## 任务与指标

| 任务 | 指标 |
|------|------|
| Slide 级肿瘤存在性 | AUC |
| 病灶级检测 | **FROC**（free-response ROC）—— Challenge 头部指标 |
| 像素分割 | Dice（次要） |

FROC 在固定的每图假阳性数下测量灵敏度，是弱监督 MIL 流水线的标准报告指标。

## 获取方式

通过 grand-challenge 平台发布（`camelyon17.grand-challenge.org/Data/` 是两届的统一数据页面）。需要注册。基于 CC0 发布 —— 数据已进入公共领域，但二次分发仍应引用 JAMA 2017 Challenge 论文。

完整发布约 750 GB *（待核对）*；请预留 Aspera / S3 下载时间。

## 预处理

```python
import openslide
slide = openslide.OpenSlide("/data/camelyon16/training/tumor/tumor_001.tif")
print(slide.level_dimensions, slide.properties.get("openslide.mpp-x"))
```

标准流程：

1. 通过 {{ node_link("openslide") }} 读取 `.tif` —— 处理 Aperio / Hamamatsu 厂商块。
2. 在 level 4-6（降采样）做组织掩膜 → 仅保留前景 patch。
3. 在 20× 或 40× 切 patch（Challenge 切片为 40× 层级）；MIL 常用 256×256。
4. 从 XML 肿瘤多边形构建正/负 patch 标签。

## 为什么重要

Camelyon16 是**整个病理弱监督 MIL 文献的种子数据集** —— ABMIL、CLAM、TransMIL、DSMIL、DTFD-MIL 都报告 Camelyon16 数字。任何新的 WSI 分类方法若没有 Camelyon16 数字，都会被审稿人质疑。

## 常见坑

- **两中心、两扫描仪**漂移 —— Pannoramic 250 Flash（Radboud）vs Aperio（Utrecht）。染色与分辨率不同。
- **病灶指标与 slide 指标讲的是不同故事** —— 高 AUC 与低 FROC 意味着模型投票正确但定位不准。
- **ITC 可能标注不足** —— 穷尽多边形仅覆盖主要相连病灶。
- **Camelyon17 是另一个 Challenge**（5 家机构 1000 张切片上的患者级 pN 分期）—— 不要混淆。

## Claude 应该如何使用这个数据集

{{ skill_card("camelyon16") }}

提出新 WSI 分类 / MIL 方法时，Camelyon16 是**第一个要跑的基准**。slide-AUC 必须搭配病灶级 FROC 一并报告。

## 相关节点

- tool: {{ node_link("openslide") }}
- method context: {{ node_link("pathology-foundation-model") }}
- companion benchmark: {{ node_link("panda") }}（分级互补）
- challenge paper: `bejnordi-2017-camelyon16` *（文章节点暂缓 —— 待 §11.6）*

## 参考

- Challenge homepage: [camelyon16.grand-challenge.org](https://camelyon16.grand-challenge.org/)
- Data download (joint with Camelyon17): [camelyon17.grand-challenge.org/Data/](https://camelyon17.grand-challenge.org/Data/)
- Bejnordi et al., *JAMA* 2017 (DOI to verify)
