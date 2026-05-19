---
title: "OpenSlide —— WSI I/O 库"
description: "C 库 + Python 绑定，用于读取多种格式的全切片图像。"
tags: [tool, wsi-io, openslide, h-and-e]
---

# OpenSlide

{{ tool("openslide") }}

{{ local_graph("openslide") }}

## 它是什么

OpenSlide 是计算病理学中事实标准的 WSI I/O 库。它提供 C 库与 Python 绑定（`openslide-python`），通过统一的 tile 读取 API，读取来自多家厂商格式的 WSI —— Aperio SVS、Hamamatsu NDPI/VMS、Leica SCN、MIRAX、Philips TIFF、Ventana BIF、通用 tiled TIFF。

## 它解决什么问题

不同厂商的格式在 tile 大小、压缩、金字塔布局和元数据约定上各异。OpenSlide 将这些差异隐藏在统一 API 之后：打开一张切片，查询各层级尺寸，按任意 (x, y, level) 读取一个区域，而无需加载整个文件。

## 安装

```bash
# 1. Install the OpenSlide system library (Linux)
sudo apt-get install libopenslide-dev   # or: brew install openslide   (macOS)

# 2. Install Python bindings
pip install openslide-python
```

在大多数系统上，仅 `pip install openslide-python` **不够** —— 必须先安装底层 C 库。在 macOS Apple Silicon 上，需将 `DYLD_LIBRARY_PATH` 设置为覆盖 Homebrew 的 lib 路径。

## 最小用例

```python
import openslide

slide = openslide.OpenSlide("slide.svs")
print(slide.level_dimensions)             # ((W0, H0), (W1, H1), ...)
print(slide.properties.get("openslide.mpp-x"))   # microns per pixel

region = slide.read_region((x, y), level=0, size=(256, 256))   # PIL.Image RGBA
```

## 输入与输出

- **输入**：SVS、NDPI、VMS、VMU、SCN、MRXS、BIF、tiled TIFF……
- **输出**：RGBA tile（PIL.Image）、缩略图、关联图像（标签、宏观）、属性字典（mpp-x/y、各级降采样、厂商属性）。

## 何时使用

- 从原始文件读取厂商格式的 WSI。
- 按任意 (x, y, level) 抽取 patch。
- 读取 slide 级元数据（mpp、各级尺寸、厂商属性）。

## **不**适用的场景

- 切片已经是 tiled TIFF，且 `pyvips` 在该工作负载下更快。
- 需要 GPU 解码读取 → 改用 **cuCIM**。
- WSI 为 **DICOM** → 改用 **pydicom** 或支持 DICOM 的读取器。

## 常见失败模式

- `OpenSlideUnsupportedFormatError`，尽管扩展名是 `.svs` → 文件其实是无金字塔的通用 TIFF；改用 `tifffile` 打开。
- MRXS 包：需要 `.mrxs` 文件**加上**所有同级文件夹/INI 文件。切勿拆分。
- macOS Apple Silicon：缺少 `libopenslide` dyld → 确保 Homebrew 的 lib 路径在 `DYLD_LIBRARY_PATH` 中。

## 相关工具

- **pyvips** —— 替代读取器，处理 tiled TIFF 时通常更快；通过 libvips 支持相同格式范围。
- **cuCIM** —— GPU 加速的 WSI I/O，适用于兼容的 NVIDIA 技术栈。
- **TIAToolbox** —— 在 OpenSlide 之上封装更高级的流水线（预处理、MIL）。

## Claude 应该如何使用这个工具

{{ skill_card("openslide") }}

## 相关节点

- dataset: {{ node_link("panda") }} —— OpenSlide 可读取的 H&E TIFF。
