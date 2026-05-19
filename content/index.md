---
title: Home
description: An agent-extensible knowledge base for computational pathology.
hide:
  - navigation
  - toc
---

{% set c = node_counts() %}

<div class="pwiki-hero" markdown>
<span class="pwiki-hero-tag">Pathology · AI · Knowledge Graph</span>
# Pathology-Wiki

An agent-extensible knowledge base for computational pathology — every paper, method, dataset, model, tool, and benchmark is a structured node, an AlphaXiv-style page, and a Claude-readable skill, connected as a graph.
</div>

<div class="pwiki-stats" markdown>

<div class="pwiki-stat" data-kind="node" markdown>
<div class="pwiki-stat-num">{{ c['_total_nodes'] }}</div>
<div class="pwiki-stat-label">Nodes</div>
</div>

<div class="pwiki-stat" data-kind="edge" markdown>
<div class="pwiki-stat-num">{{ c['_total_edges'] }}</div>
<div class="pwiki-stat-label">Edges</div>
</div>

<div class="pwiki-stat" data-kind="article" markdown>
<div class="pwiki-stat-num">{{ c.get('article', 0) }}</div>
<div class="pwiki-stat-label">Articles</div>
</div>

<div class="pwiki-stat" data-kind="method" markdown>
<div class="pwiki-stat-num">{{ c.get('method', 0) }}</div>
<div class="pwiki-stat-label">Methods</div>
</div>

<div class="pwiki-stat" data-kind="dataset" markdown>
<div class="pwiki-stat-num">{{ c.get('dataset', 0) }}</div>
<div class="pwiki-stat-label">Datasets</div>
</div>

<div class="pwiki-stat" data-kind="model" markdown>
<div class="pwiki-stat-num">{{ c.get('model', 0) }}</div>
<div class="pwiki-stat-label">Models</div>
</div>

<div class="pwiki-stat" data-kind="tool" markdown>
<div class="pwiki-stat-num">{{ c.get('tool', 0) }}</div>
<div class="pwiki-stat-label">Tools</div>
</div>

</div>

## Browse {: .pwiki-section-title }

<div class="pwiki-entries" markdown>

<a class="pwiki-entry" data-kind="article" href="articles/reviews/bahadir-2024/" markdown>
<div class="pwiki-entry-count">{{ c.get('article', 0) }}</div>
<div class="pwiki-entry-kind">Articles</div>
<div class="pwiki-entry-title">Reviews · Technical · Clinical</div>
<p class="pwiki-entry-desc">Pathology AI papers — classified as clinical, technical, review, benchmark, dataset, or guideline — with type-specific extraction fields.</p>
</a>

<a class="pwiki-entry" data-kind="method" href="methods/pathology-foundation-model/" markdown>
<div class="pwiki-entry-count">{{ c.get('method', 0) }}</div>
<div class="pwiki-entry-kind">Methods</div>
<div class="pwiki-entry-title">8-branch method taxonomy</div>
<p class="pwiki-entry-desc">Every method positioned in the canonical 8-branch pathology-AI map — from traditional CPath to agentic pathology AI.</p>
</a>

<a class="pwiki-entry" data-kind="dataset" href="datasets/camelyon16/" markdown>
<div class="pwiki-entry-count">{{ c.get('dataset', 0) }}</div>
<div class="pwiki-entry-kind">Datasets</div>
<div class="pwiki-entry-title">Public WSI benchmarks</div>
<p class="pwiki-entry-desc">Public pathology datasets with access info, preprocessing notes, splits, metrics, and known pitfalls.</p>
</a>

<a class="pwiki-entry" data-kind="model" href="models/uni/" markdown>
<div class="pwiki-entry-count">{{ c.get('model', 0) }}</div>
<div class="pwiki-entry-kind">Models</div>
<div class="pwiki-entry-title">Pretrained pathology models</div>
<p class="pwiki-entry-desc">Foundation models, VLMs, MIL aggregators — architecture, pretraining cohort, weights access, capabilities, limitations.</p>
</a>

<a class="pwiki-entry" data-kind="tool" href="tools/openslide/" markdown>
<div class="pwiki-entry-count">{{ c.get('tool', 0) }}</div>
<div class="pwiki-entry-kind">Tools</div>
<div class="pwiki-entry-title">Libraries &amp; agents</div>
<p class="pwiki-entry-desc">WSI I/O, segmentation, MIL, SSL pretraining, ST analysis. Each tool is annotated with how Claude can call it.</p>
</a>

<a class="pwiki-entry" data-kind="graph" href="graph/" markdown>
<div class="pwiki-entry-count">{{ c['_total_edges'] }}</div>
<div class="pwiki-entry-kind">Knowledge graph</div>
<div class="pwiki-entry-title">Cross-links between objects</div>
<p class="pwiki-entry-desc">Every paper page renders its 1-hop neighbours as an interactive force-directed graph (drag, zoom, click to jump).</p>
</a>

</div>

## Method taxonomy {: .pwiki-section-title }

The canonical 8-branch map every `method` node positions itself in:

```text
A. Traditional Computational Pathology
B. Deep Learning for WSI                  ← weakly-supervised MIL lives here
C. Pathology Foundation Models            ← UNI / CTransPath / patch-level SSL
D. Pathology Vision-Language Models       ← CLIP → PLIP → MI-Zero
E. Multimodal Pathology AI
F. Benchmark and Evaluation
G. Clinical Translation
H. Agentic Pathology AI
```

## Three views, one object {: .pwiki-section-title }

Pathology-Wiki is **not a blog**. Every object has three coordinated views:

| View | Audience | Form |
|------|----------|------|
| YAML node | machine | source of truth, schema-validated |
| Page (this site) | researcher | AlphaXiv-style entry per object |
| `SKILL.md` | agents | usage rules for tools that act on the wiki |

Edges between objects live in a central graph (`knowledge/graph/edges.yaml`), and every page renders its 1-hop neighbours as an interactive Cytoscape graph — drag, zoom, click a node to jump.
