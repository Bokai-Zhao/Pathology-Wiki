---
title: "CPTAC —— 临床蛋白质组肿瘤分析联盟"
description: "NIH/NCI 以蛋白质组学为核心的 TCGA 姐妹队列。约 4.5k 张 FFPE WSI、~2k 患者、10 个癌种，配套质谱蛋白质组学 + RNA-seq + 突变 + 临床数据。"
tags: [dataset, multi-omics, proteomics, pan-cancer, h-and-e, public]
---

# CPTAC —— Clinical Proteomic Tumor Analysis Consortium（临床蛋白质组肿瘤分析联盟）

{{ dataset("cptac") }}

{{ local_graph("cptac") }}

## 为什么重要

{{ node_link("tcga") }} 是规范的预训练 + 评估队列；**CPTAC 则是规范的外部验证队列**。现代病理 PFM（{{ node_link("gigapath-2024") }}、{{ node_link("chief-2024") }}、{{ node_link("virchow-2024") }}、{{ node_link("uni-2024") }}、{{ node_link("conch-2024") }}）通常会同时报告 TCGA 和 CPTAC 上的下游性能,以证明跨队列泛化。

CPTAC 还是**唯一规模较大的、配对 H&E + bulk 质谱蛋白质组学的公开队列**,使它成为 *从组织学预测蛋白表达* 这一独特任务的规范资源 —— 这是 TCGA 不直接支持的。

## 包含什么

- **约 4,500 张 FFPE 诊断 WSI**（精确数字 *待核实*，按快照变化）。
- **约 2,000 位患者**有 WSI 覆盖（*待核实*）。
- **10 个癌种 cohort**：CPTAC-LUAD（肺腺癌）、CPTAC-LSCC（肺鳞癌）、CPTAC-CCRCC（透明细胞肾癌）、CPTAC-PDA（胰腺导管腺癌）、CPTAC-UCEC（子宫内膜癌）、CPTAC-GBM（多形性胶质母细胞瘤）、CPTAC-HNSCC（头颈鳞癌）、CPTAC-COAD（结肠癌）、CPTAC-BRCA（乳腺癌）、CPTAC-OV（卵巢癌）—— cohort 列表会随着 phase 推进而扩展。
- 同时配有**质谱蛋白质组学**（bulk + 部分 cohort 配磷酸化蛋白质组）、**bulk RNA-seq**、**全外显子测序**、**CNV**、**结构化临床记录**。

## 模态与范围

- **模态**：H&E + bulk 蛋白质组 + 磷酸化蛋白质组（部分） + RNA-seq + 突变 + CNV + 临床。
- **器官**：肺、肾、胰、子宫、脑、头颈、结肠、乳腺、卵巢等。
- **疾病**：10 个癌种 cohort，覆盖常见癌种与若干罕见癌种。
- **物种**：人。
- **样本类型**：手术切除 FFPE 诊断切片。

## 任务与指标

| 任务 | 指标 |
|------|------|
| 亚型分类（按 cohort） | AUC、balanced accuracy |
| 突变预测（H&E → 突变状态） | AUC |
| **蛋白表达预测**（H&E → bulk 蛋白质组） | Pearson 相关 |
| 磷酸化蛋白表达预测（部分 cohort） | Pearson、Spearman |
| 生存 / 预后 | C-index |
| TCGA 训练模型的外部验证 | 跨 cohort Δ-AUC |

## 获取方式

托管在 **NIH Proteomic Data Commons (PDC)**：<https://pdc.cancer.gov/pdc/>。WSI 和大多数组学数据是公开的；部分临床字段需要通过 NIH eRA Commons 申请 **dbGaP 受控访问**。

每个 cohort 在 PDC 上都有专用访问页面。通过 PDC API 或网页端 manifest 下载。

## 预处理

```bash
# 在 PDC 网页端或 API 上拿到 cohort manifest
# 用 PDC/GDC client 下载（与 TCGA 的 gdc-client 类似）
```

标准流程：

1. 在 PDC 网页查询并导出 cohort manifest。
2. 下载 WSI（FFPE 诊断 `.svs`，Aperio 格式）。
3. 用 {{ node_link("openslide") }} 读取。
4. 组织分割 + 块提取，常用 {{ node_link("clam") }} 工具箱（处理 TCGA 的脚本对 CPTAC barcode 同样适用）。
5. **染色归一化**（Macenko / Vahadane）—— CPTAC 也跨多家扫描仪和实验室。
6. **CPTAC case-id 匹配**对齐 WSI ↔ 蛋白质组 ↔ RNA-seq ↔ 临床。
7. **患者级训练 / 测试切分** —— 同一患者可能有多张切片。

## 本 wiki 中引用 CPTAC 的论文

- 现代 PFM 下游：{{ node_link("gigapath-2024") }}、{{ node_link("chief-2024") }}、{{ node_link("virchow-2024") }}、{{ node_link("uni-2024") }}、{{ node_link("conch-2024") }}。

CPTAC 每个 cohort 患者数比 TCGA 少，所以多数论文把 CPTAC 用作**TCGA 训练模型的外部验证**而非主训练队列。

## 常见坑

- **每 cohort 规模较小** —— 一般每个 cohort 配齐 proteomics + WSI 的患者数 < 200,跨 cohort 预训练能缓解。
- **多 cohort、多扫描仪**漂移与 TCGA 类似 —— 颜色与分辨率差异较大。
- **模态覆盖不齐** —— 部分病例有蛋白质组但无 WSI 或反之，case-id 匹配必须先核对模态可用性。
- **患者级切分**必要（一个患者可能多张切片）。
- **phase II / III / IV cohort** 采集协议不同 —— 不做协调地汇总会引入噪声。
- **连续蛋白质组学标签**（质谱丰度）—— 用作分类任务前需 binning / 阈值化。
- **不要在同一篇论文中既用 CPTAC 训练又用 CPTAC 测试** —— 这破坏了它作为规范*外部*验证队列的作用。

## Claude 应该如何使用这个数据集

{{ skill_card("cptac") }}

CPTAC 是 **TCGA 训练模型的规范外部验证队列**,也是唯一规模较大的、配对 H&E + 蛋白质组学的公开队列。当用户问"怎么在外部 cohort 上验证 TCGA 训练的模型"或"哪里有病理 + bulk 蛋白质组"时，答案就是 CPTAC。

## 相关节点

- 姐妹队列：{{ node_link("tcga") }}
- 工具：{{ node_link("openslide") }}
- 工具箱：{{ node_link("clam") }}
- 同类公开数据集：{{ node_link("camelyon16") }}、{{ node_link("panda") }}、{{ node_link("pannuke") }}、{{ node_link("midog") }}

## 参考

- PDC 入口：[pdc.cancer.gov/pdc/](https://pdc.cancer.gov/pdc/)
- 项目页：[proteomics.cancer.gov/programs/cptac](https://proteomics.cancer.gov/programs/cptac)
- 创始论文：Ellis 等，*Cancer Cell*（2013）
