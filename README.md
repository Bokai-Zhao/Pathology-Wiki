# Pathology-Wiki

> **An agent-extensible knowledge base for computational pathology.** Every paper, model, dataset, tool, and benchmark becomes a structured node, a paper-style page, and a Claude-readable skill — connected as a graph, maintained by Claude Code.

> 一个由 Claude 持续构造和维护的病理 AI 领域知识图谱网站。每个对象都同时是结构化数据、人类可读博文、和 agent 可调用 skill。

---

## What this is (and isn't)

Pathology-Wiki is **not a blog** and **not an awesome list**. It is a structured knowledge layer whose:

- **Source of truth** is YAML under `knowledge/`
- **Human surface** is a Docusaurus site rendered from MDX under `content/`
- **Agent surface** is documentation-form `SKILL.md` files under `skills/`
- **Topology** lives centrally in `knowledge/graph/{nodes,edges}.yaml`
- **Maintainer** is Claude Code, following the rules in [`CLAUDE.md`](./CLAUDE.md)

The original design rationale (Chinese, ~2500 lines) is in [`claude.md`](./claude.md).

---

## The Five-Artifact Rule

Every object added to the repo produces all five of these — never just one, never just a blog post.

```mermaid
flowchart LR
    Y["1. Object YAML<br/>knowledge/{type}/{id}.yaml"]
    G["2. Graph entry<br/>nodes.yaml + edges.yaml"]
    M["3. Blog page<br/>content/{type}/{id}.mdx"]
    S["4. Skill doc<br/>skills/{cat}/{id}/SKILL.md"]
    D["5. Site data (generated)<br/>src/data/*.json"]
    Y --> G --> M --> S --> D
```

Plus a per-ingestion report at `reports/{YYYY-MM-DD}-{slug}.md` and a git commit referencing it. Order matters; see [CLAUDE.md §2](./CLAUDE.md#2-the-five-artifact-rule-the-most-violated-rule).

---

## What's in the repo today

The bootstrap pass landed three sample objects and one anchor method:

| id | type | what it is | files |
|----|------|------------|-------|
| `uni-2024` | technical_article | UNI paper (Chen et al., *Nature Medicine* 2024) | [yaml](./knowledge/articles/technical/uni-2024.yaml) · [mdx](./content/articles/technical/uni-2024.mdx) · [skill](./skills/articles/uni-2024/SKILL.md) |
| `uni` | model | UNI ViT-L/16, DINOv2 SSL, Mass-100K | [yaml](./knowledge/models/uni.yaml) · [mdx](./content/models/uni.mdx) · [skill](./skills/models/uni/SKILL.md) |
| `openslide` | tool | The de-facto WSI I/O library | [yaml](./knowledge/tools/openslide.yaml) · [mdx](./content/tools/openslide.mdx) · [skill](./skills/tools/openslide/SKILL.md) |
| `panda` | dataset | PANDA prostate-grading challenge (Radboudumc + Karolinska) | [yaml](./knowledge/datasets/panda.yaml) · [mdx](./content/datasets/panda.mdx) · [skill](./skills/datasets/panda/SKILL.md) |
| `pathology-foundation-model` | method | Umbrella node for vision-only / VL / vision-omics PFMs | [yaml](./knowledge/methods/pathology-foundation-model.yaml) · [mdx](./content/methods/pathology-foundation-model.mdx) · [skill](./skills/methods/pathology-foundation-model/SKILL.md) |

**Graph state**: 5 nodes, 4 edges, 0 orphans, 0 dangling. See [the bootstrap report](./reports/2026-05-19-bootstrap-skeleton.md) for the full picture, including 12 pending references awaiting triage (per the [missing-reference policy](./CLAUDE.md#116-missing-reference-policy--always-ask-the-user)).

---

## Method taxonomy

The canonical 8-branch map. Every `method` node positions itself here.

```text
A. Traditional Computational Pathology
B. Deep Learning for WSI
C. Pathology Foundation Models           ← uni
D. Pathology Vision-Language Models
E. Multimodal Pathology AI
F. Benchmark and Evaluation
G. Clinical Translation
H. Agentic Pathology AI
```

Full sub-branch list under [`knowledge/taxonomies/method_map.yaml`](./knowledge/taxonomies/method_map.yaml). Priority research tracks (SpaPath-Bench, WSI-PFM Benchmark, Pathology-Radiology-Omics Fusion, Pathology VLMs, Agentic Pathology AI) are listed in [CLAUDE.md §7](./CLAUDE.md#priority-research-tracks).

---

## Adding new objects

In a Claude Code session, use slash conventions — Claude follows the matching pipeline:

```
/add_article  {url | doi | pdf | abstract}
/add_tool     {github_url}
/add_dataset  {url}
/add_method   {name}
/add_benchmark {name | url}
```

Each pipeline classifies, extracts, links, validates, and writes all five artifacts. When an object cites another that doesn't have a node yet, Claude **stops and asks** rather than auto-stubbing. See the full step lists in [CLAUDE.md §11](./CLAUDE.md#11-ingestion-pipelines-and-slash-commands).

For non-Claude contributors, [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) describes the manual flow.

---

## Quick start

```bash
# Python — data layer (validation, graph build, context export)
pip install -e .
python scripts/python/validate_schema.py
python scripts/python/build_graph.py

# Node — Docusaurus site
npm install
npm run build:data
npm run build      # production → build/
npm run start      # dev server (HMR)
```

Or `npm run all` chains everything end-to-end. Site builds for both `en` and `zh-Hans` locales.

---

## Repo map

```text
Pathology-Wiki/
├── CLAUDE.md              ← operational rules for Claude (English + 中文注解)
├── claude.md              ← original design spec (Chinese, ~2500 lines)
├── README.md              ← you are here
├── knowledge/             ← source of truth: YAML
│   ├── articles/{clinical,technical,...}/
│   ├── methods/  models/  datasets/  tools/  benchmarks/
│   ├── taxonomies/        ← method, task, modality, clinical, multimodal_fusion
│   └── graph/             ← nodes.yaml + edges.yaml + graph.json (generated)
├── content/               ← human view: MDX (one page per object)
├── skills/                ← agent view: SKILL.md docs
│   ├── articles/  objects/  graph/  writing/  benchmarks/
├── schemas/               ← YAML schemas (validated by validate_schema.py)
├── scripts/
│   ├── python/            ← validate_schema, build_graph, check_orphans, export_claude_context
│   └── node/              ← build_site_data
├── src/                   ← Docusaurus components & pages
├── reports/               ← per-ingestion update logs
└── docs/CONTRIBUTING.md   ← manual workflow for human contributors
```

---

## Roadmap

- **Triage 12 pending references** flagged in [`reports/2026-05-19-bootstrap-skeleton.md`](./reports/2026-05-19-bootstrap-skeleton.md) (e.g. `clam`, `abmil`, `weakly-supervised-mil`, `uni2`, `gigapath`, `wsi-pfm-benchmark`).
- **Real graph viz** — replace the text-form `LocalGraph` component with cytoscape / d3.
- **Promote high-frequency skills** (`graph_builder`, `article_ingestion`) from documentation-form to registered Claude Code skills under `.claude/skills/`.
- **More benchmarks** — fully model SpaPath-Bench and WSI-PFM Benchmark with executable workflows.
- **Verify metadata** marked `to_verify` on UNI / PANDA against primary sources.

---

## Building blocks

- [Docusaurus 3](https://docusaurus.io/) for the static site
- [DINOv2](https://github.com/facebookresearch/dinov2) recipe behind UNI / many PFMs
- [OpenSlide](https://openslide.org/) for WSI I/O
- [Claude Code](https://claude.com/claude-code) (Opus 4.7) as the maintainer agent

---

## Acknowledgements

Bootstrap commits were authored with [Claude Code](https://claude.com/claude-code) (Opus 4.7). The maintainer agent follows [`CLAUDE.md`](./CLAUDE.md) and updates a [report](./reports/) on every substantial change.

---

> **简**：这是一个由 Claude Code 维护的病理 AI 知识库 + GitHub Pages 站点。你想看人类视图就读 `content/`，想看图谱就读 `knowledge/graph/`，想让 Claude 加新对象就在会话里说 `/add_article {url}`。运维规则全在 `CLAUDE.md`，设计原文在 `claude.md`。
