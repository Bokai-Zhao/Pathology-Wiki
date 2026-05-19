---
title: Home
description: An agent-extensible knowledge base for computational pathology.
hide:
  - navigation
---

# Pathology-Wiki

> An agent-extensible knowledge base for computational pathology — every paper, model, dataset, tool, and benchmark is a structured node, a paper-style page, and a Claude-readable skill, connected as a graph.

## Browse the wiki

<div class="grid cards" markdown>

- :material-file-document-outline: **Articles**

    Pathology AI papers, classified as clinical or technical with full extraction fields.

    [UNI (2024)](articles/technical/uni-2024.md){ .md-button }

- :material-cube-outline: **Models**

    Pretrained pathology models — foundation models, VLMs, MIL aggregators.

    [UNI](models/uni.md){ .md-button }

- :material-tools: **Tools**

    Libraries for WSI I/O, segmentation, MIL, SSL pretraining, ST analysis.

    [OpenSlide](tools/openslide.md){ .md-button }

- :material-database-outline: **Datasets**

    Public datasets with access info, preprocessing notes, and known pitfalls.

    [PANDA](datasets/panda.md){ .md-button }

- :material-graph-outline: **Methods**

    Method taxonomy positioned in the canonical 8-branch pathology-AI map.

    [Pathology Foundation Model](methods/pathology-foundation-model.md){ .md-button }

- :material-graph: **Knowledge graph**

    Cross-links between every object in the wiki.

    [View graph](graph.md){ .md-button }

</div>

## Method taxonomy at a glance

```text
A. Traditional Computational Pathology
B. Deep Learning for WSI
C. Pathology Foundation Models           ← UNI lives here
D. Pathology Vision-Language Models
E. Multimodal Pathology AI
F. Benchmark and Evaluation
G. Clinical Translation
H. Agentic Pathology AI
```

Every method node positions itself in this map. Sub-branches and representative models are listed under each method's page.

## Stats

```
{% set s = graph_summary() %}
nodes: {{ s.n_nodes }}
edges: {{ s.n_edges }}
```

## What this is

Pathology-Wiki is **not a blog**. It is a structured layer where every object has three views:

| View | Audience | Form |
|------|----------|------|
| YAML node | machine | source of truth, schema-validated |
| Page (this site) | researcher | AlphaXiv-style entry per object |
| SKILL.md | agents | usage rules for tools that act on the wiki |

Edges between objects live in a central graph, and every page renders its 1-hop neighbours.
