---
title: "TCGA —— 癌症基因组图谱"
description: "约 3 万张 WSI，覆盖 33 种癌症、~1.1 万患者，配套 RNA-seq、突变、CNV、甲基化与临床记录。最大的公开多组学癌症队列。"
tags: [dataset, multi-omics, pan-cancer, h-and-e, rna-seq, public, foundational]
---

# TCGA —— The Cancer Genome Atlas（癌症基因组图谱）

{{ dataset("tcga") }}

{{ local_graph("tcga") }}

## 为什么重要

TCGA 是**最重要的公开多组学癌症队列**。2018 年以后几乎所有病理 AI 论文都用到 TCGA，要么：

- **作预训练数据** —— {{ node_link("ctranspath-2022") }}、{{ node_link("phikon-2023") }}、{{ node_link("lunit-dino-2022") }}、{{ node_link("gigapath-2024") }} 的块编码器都在 TCGA H&E 块上预训练。
- **作下游评估** —— {{ node_link("clam-2021") }}、{{ node_link("transmil-2021") }}、{{ node_link("dsmil-2021") }}、{{ node_link("dtfd-mil-2022") }} 都在 TCGA-RCC / TCGA-NSCLC / TCGA-BRCA 上评测。
- **作多模态研究** —— {{ node_link("mcat-2021") }}、{{ node_link("porpoise-2022") }}、{{ node_link("tangle-2024") }} 用的是配对的 WSI + RNA-seq + 突变数据。

TCGA 也是**跨队列泛化研究的默认训练队列**，外部机构数据通常作为 held-out 测试。

## 包含什么

- **约 30,000 张 WSI**，覆盖 **33 个癌种**（具体数字 *待核实*）。
- **约 11,000 名患者**有 WSI 覆盖（*待核实*）。
- 大部分患者还配有**bulk RNA-seq、全外显子 / 全基因组测序、拷贝数变异（CNV）、DNA 甲基化、临床记录**。
- 两类切片：**诊断 FFPE**（`-DX-*.svs`）与**冷冻切片**（`-TS-*.svs`）。多数病理 AI 基准只用 FFPE。

## 模态与范围

- **模态**：H&E + bulk 多组学（RNA-seq、DNA 突变、CNV、甲基化）+ 临床记录。
- **器官**：pan-cancer —— 乳腺、肺、结肠、前列腺、肾、肝、胃、胰腺、膀胱、皮肤、甲状腺、子宫、卵巢、宫颈、脑、头颈等。
- **疾病**：33 个癌症 cohort（TCGA-BRCA / TCGA-LUAD / TCGA-LUSC / TCGA-COAD / TCGA-PRAD / TCGA-KIRC / TCGA-LIHC / ... / TCGA-LAML / TCGA-DLBC）。
- **物种**：人。
- **样本类型**：手术切除（多数 cohort）+ 冷冻切片。

## 任务与指标

| 任务 | 指标 |
|------|------|
| 亚型分类（按 cohort） | AUC、balanced accuracy |
| 突变预测（H&E → 突变状态） | AUC |
| 生物标志物 / mRNA 表达预测 | AUC、Pearson |
| 生存 / 预后预测 | C-index、Kaplan-Meier 分离 |
| 肿瘤 vs 正常（按 cohort） | AUC |
| MSI 预测 | AUC |
| Pan-cancer 基础模型预训练 | 下游任务 AUC 套件 |

## 获取方式

托管在 **NIH Genomic Data Commons (GDC)**：<https://portal.gdc.cancer.gov/>。WSI 和大多数基因组数据是公开的；部分临床字段和患者级标识符需要通过 NIH eRA Commons 申请 **dbGaP 受控访问**。

批量下载用官方 **`gdc-client`** CLI。

## 预处理

```bash
# 批量下载某 cohort 的 FFPE 诊断切片
gdc-client download -m manifest_TCGA_BRCA_DX.txt
```

标准流程：

1. **过滤为 FFPE**（`-DX-*.svs`）—— 冷冻切片噪声较大。
2. 用 {{ node_link("openslide") }} 读取（Aperio `.svs` 格式）。
3. **组织分割 + 块提取**，常用 {{ node_link("clam") }} 工具箱（自带 TCGA 专用脚本）。
4. **染色归一化**（Macenko / Vahadane）—— TCGA 跨多家扫描仪与多家中心。
5. **TCGA barcode（case-uuid）匹配**对齐 WSI ↔ RNA-seq ↔ 临床数据。
6. **患者级训练 / 测试切分** —— 同一患者常有多张切片；切片级切分会泄漏。

## 本 wiki 中引用 TCGA 的论文

- 预训练：{{ node_link("ctranspath-2022") }}、{{ node_link("phikon-2023") }}、{{ node_link("lunit-dino-2022") }}。
- MIL 评估：{{ node_link("clam-2021") }}、{{ node_link("transmil-2021") }}、{{ node_link("dsmil-2021") }}、{{ node_link("dtfd-mil-2022") }}。
- 多模态：{{ node_link("mcat-2021") }}、{{ node_link("porpoise-2022") }}、{{ node_link("tangle-2024") }}。
- 现代 PFM 下游：{{ node_link("gigapath-2024") }}、{{ node_link("virchow-2024") }}、{{ node_link("chief-2024") }}、{{ node_link("titan-2025") }}。

## 常见坑

- **多 cohort、多扫描仪** —— 颜色与分辨率漂移很大，染色归一化必要。
- **冷冻 vs FFPE** —— `-TS-*.svs` 比 `-DX-*.svs` 噪。
- **小 cohort 易过拟合** —— 罕见癌种 cohort 患者数很少（CHOL 不足 60），需要跨癌种预训练。
- **受控访问字段** —— 部分临床字段需 dbGaP 批准。
- **同患者多切片泄漏** —— 切分必须以患者为粒度。
- **晚期 / 学术中心偏置** —— 跨中心泛化是已知弱点。
- **右删失生存标签** —— 必须用 Cox / KM 感知指标，不要硬套分类指标。
- **WSI 与 RNA-seq 不完全重叠** —— 用 case-uuid 做规范连接。

## Claude 应该如何使用这个数据集

{{ skill_card("tcga") }}

TCGA 是**任何病理 AI 实验部分的默认队列**。需要病理 + 基因组数据 / pan-cancer 亚型 / 跨癌种基础模型 → TCGA。前列腺活检 Gleason 分级 → {{ node_link("panda") }}。乳腺转移检测 → {{ node_link("camelyon16") }}。

## 相关节点

- 工具：{{ node_link("openslide") }}
- 工具箱：{{ node_link("clam") }}（自带 TCGA 预处理脚本）
- 同类公开数据集：{{ node_link("camelyon16") }}、{{ node_link("panda") }}、{{ node_link("pannuke") }}、{{ node_link("midog") }}

## 参考

- 入口：[GDC 数据门户](https://portal.gdc.cancer.gov/)
- 项目主页：[cancer.gov/ccg/research/genome-sequencing/tcga](https://www.cancer.gov/ccg/research/genome-sequencing/tcga)
- Pan-Cancer 旗舰论文：Weinstein 等，*Nature Genetics* 45:1113–1120（2013）
