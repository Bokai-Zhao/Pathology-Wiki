---
title: "GlaS —— 结肠组织腺体分割 Challenge"
description: "MICCAI 2015 Challenge：从 16 张 WSI 中裁出的 165 张 H&E ROI，附腺体实例掩膜；实例分割基准。"
tags: [dataset, colon, gland-segmentation, h-and-e, instance-segmentation]
---

# GlaS —— Gland Segmentation in Colon Histology (MICCAI 2015)

{{ dataset("glas") }}

{{ local_graph("glas") }}

## 包含什么

GlaS 是 H&E 上结肠**腺体 (gland) 实例分割的经典小型基准**。该版本包含：

- **165 张 ROI 图像**（从 16 张源 WSI 裁出），约 0.62 μm/px。
- **每个腺体一份实例掩膜**，以颜色编码 BMP 存储（每个实例一种颜色）。
- 每张图像的**组织学分级**：良性或恶性。
- 切分：**85 训练**、**80 测试** —— 测试集再细分为 **Test A**（60，较易）与 **Test B**（20，较难）。

## 模态与范围

- **模态**：H&E
- **器官**：结肠
- **疾病**：结直肠癌（良性与恶性）
- **物种**：人
- **样本类型**：从 WSI 裁出的 ROI

## 任务与指标

| 任务 | 指标 |
|------|------|
| 腺体实例分割 | **F1 检测**、**Object-Dice**、**Object-Hausdorff** |
| 良性 vs 恶性分类 | 各类 accuracy |

三种官方指标分别测试不同属性：F1 衡量检测，Object-Dice 衡量每实例的像素一致性，Object-Hausdorff 衡量边界保真度（形状）。

## 获取方式

通过 Warwick 大学 Tissue Image Analytics Centre 发布：`warwick.ac.uk/fac/cross_fac/tia/data/glascontest/`。数据本身无需注册；研究使用应进行引用。

## 预处理

```python
from PIL import Image
import numpy as np
img = np.array(Image.open("train_1.bmp"))
mask = np.array(Image.open("train_1_anno.bmp"))   # colour-coded instances
```

常见流程：

1. 以原生分辨率加载 BMP/TIF 图像。
2. 读取掩膜时**保持颜色模式** —— 转灰度会合并实例。
3. 将颜色编码掩膜转为整型标签图（每实例一个整数）。
4. 随机裁剪 / 翻转 / 旋转；腺体形状是尺度敏感的 —— 仅靠 colour-jitter 不够。

## 为什么重要

尽管规模很小，GlaS 仍是病理中**任何新的腺体或实例分割方法的第一站**。Test A / Test B 切分迫使方法在难度上升时分别报告性能，从而暴露脆弱模型。

## 常见坑

- **非常小**（165 张）—— 必须重度数据增强；否则深度模型会立刻过拟合。
- **两个测试切分** —— **务必**分别报告 Test A 与 Test B。聚合数字会隐藏 Test B 的下降。
- **指标实现**在不同重实现间存在差异。原始 Matlab 参考与较新的社区 Python 移植不是 bit-identical 的；引用所用实现。
- **颜色编码 BMP 掩膜**容易损坏 —— 以 `L`（灰度）模式加载会把所有实例合为一个。
- **单中心来源** —— 对其他结肠队列的泛化未经证实。

## Claude 应该如何使用这个数据集

{{ skill_card("glas") }}

GlaS 是任何新腺体分割想法上最小、最快的 sanity-check。在验证多任务组织学分割模型时，与 {{ node_link("pannuke") }}（细胞核）组合使用。

## 相关节点

- companion: {{ node_link("pannuke") }}（细胞级类比）
- challenge paper: `sirinukunwattana-2017-glas` *（文章节点暂缓 —— 待 §11.6）*

## 参考

- Homepage: [warwick.ac.uk/.../glascontest](https://warwick.ac.uk/fac/cross_fac/tia/data/glascontest/)
- Sirinukunwattana et al., *Medical Image Analysis* 35 (2017) 489–502 (DOI to verify)
