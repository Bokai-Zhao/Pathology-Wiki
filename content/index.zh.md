---
title: 首页
description: 一个面向 Agent 可扩展的计算病理学知识库。
hide:
  - navigation
  - toc
---

{% set c = node_counts() %}

<div class="pwiki-hero" markdown>
<span class="pwiki-hero-tag">病理 · AI · 知识图谱</span>
# Pathology-Wiki

面向 Agent 可扩展的计算病理学知识库 —— 每一篇论文、每一种方法、每一个数据集、模型、工具和基准都被建模为结构化节点、AlphaXiv 风格的页面与 Claude 可读的技能文档，并以图谱形式相互连接。
</div>

<div class="pwiki-stats" markdown>

<div class="pwiki-stat" data-kind="node" markdown>
<div class="pwiki-stat-num">{{ c['_total_nodes'] }}</div>
<div class="pwiki-stat-label">节点</div>
</div>

<div class="pwiki-stat" data-kind="edge" markdown>
<div class="pwiki-stat-num">{{ c['_total_edges'] }}</div>
<div class="pwiki-stat-label">边</div>
</div>

<div class="pwiki-stat" data-kind="article" markdown>
<div class="pwiki-stat-num">{{ c.get('article', 0) }}</div>
<div class="pwiki-stat-label">论文</div>
</div>

<div class="pwiki-stat" data-kind="method" markdown>
<div class="pwiki-stat-num">{{ c.get('method', 0) }}</div>
<div class="pwiki-stat-label">方法</div>
</div>

<div class="pwiki-stat" data-kind="dataset" markdown>
<div class="pwiki-stat-num">{{ c.get('dataset', 0) }}</div>
<div class="pwiki-stat-label">数据集</div>
</div>

<div class="pwiki-stat" data-kind="model" markdown>
<div class="pwiki-stat-num">{{ c.get('model', 0) }}</div>
<div class="pwiki-stat-label">模型</div>
</div>

<div class="pwiki-stat" data-kind="tool" markdown>
<div class="pwiki-stat-num">{{ c.get('tool', 0) }}</div>
<div class="pwiki-stat-label">工具</div>
</div>

</div>

## 浏览 {: .pwiki-section-title }

<div class="pwiki-entries" markdown>

<a class="pwiki-entry" data-kind="article" href="articles/reviews/bahadir-2024/" markdown>
<div class="pwiki-entry-count">{{ c.get('article', 0) }}</div>
<div class="pwiki-entry-kind">论文</div>
<div class="pwiki-entry-title">综述 · 技术 · 临床</div>
<p class="pwiki-entry-desc">病理 AI 论文 —— 按临床、技术、综述、基准、数据集、指南分类抽取，字段集随类型而异。</p>
</a>

<a class="pwiki-entry" data-kind="method" href="methods/pathology-foundation-model/" markdown>
<div class="pwiki-entry-count">{{ c.get('method', 0) }}</div>
<div class="pwiki-entry-kind">方法</div>
<div class="pwiki-entry-title">八分支方法谱系</div>
<p class="pwiki-entry-desc">每种方法都被定位在统一的 8 大分支病理 AI 谱系图中 —— 从传统计算病理到 Agentic Pathology AI。</p>
</a>

<a class="pwiki-entry" data-kind="dataset" href="datasets/camelyon16/" markdown>
<div class="pwiki-entry-count">{{ c.get('dataset', 0) }}</div>
<div class="pwiki-entry-kind">数据集</div>
<div class="pwiki-entry-title">公开 WSI 基准</div>
<p class="pwiki-entry-desc">公开病理数据集,附获取方式、预处理笔记、切分方案、指标与常见坑。</p>
</a>

<a class="pwiki-entry" data-kind="model" href="models/uni/" markdown>
<div class="pwiki-entry-count">{{ c.get('model', 0) }}</div>
<div class="pwiki-entry-kind">模型</div>
<div class="pwiki-entry-title">病理预训练模型</div>
<p class="pwiki-entry-desc">基础模型、视觉-语言模型、MIL 聚合器 —— 架构、预训练队列、权重获取、能力与局限。</p>
</a>

<a class="pwiki-entry" data-kind="tool" href="tools/openslide/" markdown>
<div class="pwiki-entry-count">{{ c.get('tool', 0) }}</div>
<div class="pwiki-entry-kind">工具</div>
<div class="pwiki-entry-title">库与 Agent</div>
<p class="pwiki-entry-desc">WSI I/O、分割、MIL、SSL 预训练、空间转录组分析。每个工具都标注 Claude 该如何调用。</p>
</a>

<a class="pwiki-entry" data-kind="graph" href="graph/" markdown>
<div class="pwiki-entry-count">{{ c['_total_edges'] }}</div>
<div class="pwiki-entry-kind">知识图谱</div>
<div class="pwiki-entry-title">对象之间的交叉链接</div>
<p class="pwiki-entry-desc">每个论文页都以交互力导向图渲染其 1-hop 邻居 —— 可拖、可缩放、点击节点跳转。</p>
</a>

</div>

## 方法谱系 {: .pwiki-section-title }

每个 `method` 节点都要定位到这张统一的 8 分支方法图：

```text
A. 传统计算病理 (Traditional Computational Pathology)
B. WSI 深度学习                              ← 弱监督 MIL 在此
C. 病理基础模型                              ← UNI / CTransPath / 块级 SSL
D. 病理视觉-语言模型                          ← CLIP → PLIP → MI-Zero
E. 多模态病理 AI
F. 基准与评估
G. 临床转化
H. Agentic Pathology AI
```

## 一个对象,三种视图 {: .pwiki-section-title }

Pathology-Wiki **不是一个博客**。每个对象都有三种并行的视图:

| 视图 | 受众 | 形式 |
|------|------|------|
| YAML 节点 | 机器 | source of truth, schema 校验 |
| 页面（本站） | 研究者 | 每个对象一份 AlphaXiv 风格条目 |
| `SKILL.md` | Agent | 给操作 wiki 的工具的使用规则 |

对象之间的边集中存放在中央图谱（`knowledge/graph/edges.yaml`）中,每个页面都以交互式 Cytoscape 图渲染其 1-hop 邻居 —— 可拖、可缩放、点击节点即可跳转。
