---
title: "MIDOG —— 有丝分裂域泛化 Challenge"
description: "H&E 上多扫描仪、多肿瘤的有丝分裂相检测基准。"
tags: [dataset, mitosis, h-and-e, domain-generalization, detection]
---

# MIDOG —— MItosis DOmain Generalization Challenge

{{ dataset("midog") }}

{{ local_graph("midog") }}

## 包含什么

MIDOG 是 H&E 上经典的**多域有丝分裂检测基准**。该版本汇集了来自多种扫描仪、机构与肿瘤类型的高倍视野 (HPF) 标注：

- **人乳腺癌**
- **犬皮肤肥大细胞瘤**（2021 年原始队列）
- **黑色素瘤**（人和犬）
- **神经内分泌肿瘤**
- **淋巴瘤**

标注是有丝分裂相**中心点** + 类别标签（真有丝分裂 vs 难负样本 "lookalike"）。各届：MIDOG 2021、2022、2025 —— 每届都加入新的肿瘤队列；引用时请明确届数。

## 模态与范围

- **模态**：H&E
- **器官**：乳腺、皮肤、肺、淋巴结、软组织 *（随届数变化）*
- **疾病**：由有丝分裂计数驱动分级的癌种
- **物种**：人 + 犬（跨物种设计是刻意为之）
- **样本类型**：裁剪到标注 HPF 的 WSI

## 任务与指标

| 任务 | 指标 |
|------|------|
| 有丝分裂相检测 | 在固定 IoU / 中心距容差下的 **F1**（主要）、precision、recall |
| 有丝分裂 vs lookalike 分类 | AP |

## 获取方式

通过 `imig.science/midog` 发布。需要注册。训练数据基于 **CC BY 4.0**；测试数据由主办方保留，用于持续评估提交。

## 预处理

```python
import openslide, json
slide = openslide.OpenSlide("/data/midog/001.tif")
ann = json.load(open("/data/midog/midog2022_annotations.json"))
```

流程：

1. 通过 {{ node_link("openslide") }} 读取 `.tif`。
2. **只在提供的 HPF 区域内对检测打分** —— 仅这些区域内的标注是穷尽的。HPF 之外"真值"未定义；在 HPF 外计入假阳性会不公平地放大错误。
3. 在 **40×**（约 0.25 μm/px）切 patch —— 有丝分裂相只有约 10–20 像素宽。
4. 从发布的标注中挖掘**难负样本 lookalike** —— 它们是假阳性的主要来源。

## 为什么重要

MIDOG 被刻意设计来**击穿单域模型**：在一种扫描仪 + 肿瘤类型上训练，在其它上测试，会出现明显性能下降，这正是要点。它是病理**域泛化**与**预后有丝分裂计数工作流**的标准基准（每单位面积的有丝分裂数是临床病理中常规的分级输入）。

## 常见坑

- **标注以 HPF 区域为界** —— 在这些区域外运行检测会放大假阳性。
- **跨扫描仪 / 跨肿瘤漂移即设计意图** —— 朴素单域训练会崩溃；审稿人期望明确的域泛化或域适应报告。
- **有丝分裂相非常小**（40× 下约 10–20 px）—— ImageNet 风格的下采样会使其消失。
- **每 ROI 的有序有丝分裂计数**输入预后分级系统 —— 在做出临床论断前，按病理医师共识校准计数阈值。
- **届数很关键** —— 2021 年基本是犬源，2022 加入新队列，2025 再加 —— 务必引用届数。

## Claude 应该如何使用这个数据集

{{ skill_card("midog") }}

MIDOG 是**评估有丝分裂计数工作流或病理域泛化时唯一可用的基准**。当更广问题是"通用细胞核 + 特定有丝分裂"时，与 {{ node_link("pannuke") }} 搭配使用。

## 相关节点

- tool: {{ node_link("openslide") }}
- companion: {{ node_link("pannuke") }}（广义细胞核）
- challenge paper: `aubreville-2023-midog` *（文章节点暂缓 —— 待 §11.6）*

## 参考

- Homepage: [imig.science/midog](https://imig.science/midog/)
- Data page: [imig.science/midog/the-dataset/](https://imig.science/midog/the-dataset/)
- Aubreville et al., *Medical Image Analysis* 84 (2023) 102699 (DOI to verify)
