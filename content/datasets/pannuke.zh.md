---
title: "PanNuke —— 泛癌细胞核分割与分类"
description: "约 7.9k H&E patch，覆盖 19 种组织，附实例掩膜 + 5 类细胞核标签；标准 PQ 基准。"
tags: [dataset, nuclei, pan-cancer, h-and-e, instance-segmentation, classification]
---

# PanNuke —— Pan-Cancer Nuclei Segmentation and Classification

{{ dataset("pannuke") }}

{{ local_graph("pannuke") }}

## 包含什么

PanNuke 是 H&E 上**细胞核 (nuclei) 实例分割与 5 类分类**的标准公开基准。该版本包含：

- **约 7,901 张 patch**，尺寸 256×256。
- **19 种组织类型**（乳腺、结肠、肺、前列腺、胃、肾、卵巢、膀胱、胰腺、皮肤、甲状腺、肝、宫颈、胆管、食管、睾丸、子宫、头颈、肾上腺）。
- **实例掩膜** + 每实例 **5 类标签**：neoplastic、inflammatory、connective、dead、epithelial。
- **官方 3 折切分** —— 用于跨方法可比性。

## 模态与范围

- **模态**：H&E
- **器官**：19 种组织，覆盖常见癌症部位
- **疾病**：泛癌
- **物种**：人
- **样本类型**：256×256 patch（已预裁，无 WSI 上下文）

## 任务与指标

| 任务 | 指标 |
|------|------|
| 细胞核实例分割 | **PQ**（Panoptic Quality）、DQ（检测）、SQ（分割） |
| 5 类细胞核分类 | 各类多类 PQ |

PQ 是经典指标。各类 PQ 与二值 PQ 一并报告，因为第 4 类 (Dead) 罕见，容易抬高或拉低均值。

## 获取方式

托管于 `jgamper.github.io/PanNukeDataset`。无需注册。**CC BY-NC-SA 4.0** —— 非商业、相同方式共享。

## 预处理

```python
import numpy as np
images = np.load("Fold_1/images/fold1/images.npy")    # (N, 256, 256, 3)
masks  = np.load("Fold_1/masks/fold1/masks.npy")      # (N, 256, 256, 6) one-hot per class + bg
```

流程：

1. 加载 `.npy` 数组（图像 + 掩膜）—— 无需 WSI 读取器；patch 已切好。
2. 将各类 one-hot 堆叠 → 各类整型实例图。
3. 使用版本自带的官方 **3 折切分**。临时切分会使比较失效。
4. 跨折进行强颜色增强 —— 19 种组织的染色差异较大。
5. 用官方 `PanNuke-metrics` 仓库评估 —— PQ 有边界情况，临时实现容易出错。

## 为什么重要

PanNuke 是病理中**任何细胞核级模型的第一站基准** —— HoVer-Net、CellViT、StarDist 及后续工作都报告 PanNuke PQ。覆盖 19 种组织使它成为对单器官之外泛化能力的有意义测试。

## 常见坑

- **patch 已预裁** —— 256×256 之外没有组织上下文；依赖更广上下文的方法无法直接使用。
- **第 4 类 (Dead)** 罕见；均值 PQ 会掩盖在它上的差表现。务必报告各类 PQ。
- 19 种组织间**染色方差**较大 —— 不做颜色增强的朴素训练性能不佳。
- **使用官方 3 折切分**。自定义切分会破坏跨论文比较。
- **使用官方 PQ 实现**（`PanNuke-metrics` 仓库）—— 社区重实现在边界情况（空 patch、边界 tile）上有分歧。

## Claude 应该如何使用这个数据集

{{ skill_card("pannuke") }}

把 PanNuke 视为 **{{ node_link("glas") }}（腺体）与 {{ node_link("midog") }}（有丝分裂）的细胞核伴随基准**。三者合起来覆盖 H&E 病理中三大经典细胞 / 结构任务。

## 相关节点

- companion: {{ node_link("glas") }}（腺体级）
- companion: {{ node_link("midog") }}（专门针对有丝分裂相）
- method context: {{ node_link("pathology-foundation-model") }}
- challenge paper: `gamper-2020-pannuke` *（文章节点暂缓 —— 待 §11.6）*

## 参考

- Homepage: [jgamper.github.io/PanNukeDataset](https://jgamper.github.io/PanNukeDataset/)
- Metric repo: [TIA-Lab/PanNuke-metrics](https://github.com/TIA-Lab/PanNuke-metrics)
- Gamper et al., *arXiv* 2003.10778 (2020)
