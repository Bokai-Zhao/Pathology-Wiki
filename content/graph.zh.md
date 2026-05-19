---
title: 知识图谱
description: wiki 中每个对象之间的交叉链接。
---

# 知识图谱

source of truth：`knowledge/graph/edges.yaml`（以及 `nodes.yaml`）。下方的 JSON 在每次构建时由 `scripts/python/build_graph.py` 自动重新生成。

```
{% set s = graph_summary() %}
nodes: {{ s.n_nodes }}
edges: {{ s.n_edges }}
```

真正的交互式图谱可视化（cytoscape / d3）会在后续迭代中加入。目前本页以表格形式列出节点与边。

## 节点

| id | 类型 | 标签 |
|----|------|-------|
| [`uni-2024`](articles/technical/uni-2024.md) | technical_article | UNI（Towards a General-Purpose Foundation Model for Computational Pathology） |
| [`uni`](models/uni.md) | model | UNI（ViT-L/16，DINOv2） |
| [`openslide`](tools/openslide.md) | tool | OpenSlide（WSI I/O） |
| [`panda`](datasets/panda.md) | dataset | PANDA —— Prostate cANcer graDe Assessment |
| [`pathology-foundation-model`](methods/pathology-foundation-model.md) | method | 病理基础模型（Pathology Foundation Model） |

## 边

| from | type | to |
|------|------|----|
| `uni-2024` | `releases_model` | `uni` |
| `uni-2024` | `proposes_method` | `pathology-foundation-model` |
| `uni` | `belongs_to` | `pathology-foundation-model` |
| `panda` | `related_to` | `openslide` |
