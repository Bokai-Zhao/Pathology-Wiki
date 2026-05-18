# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

每节先给 Claude 读的英文规则，末尾用 `> 简：` 给一句中文注解，方便用户快速对齐。

---

## 0. Repository state — read first

This repository is at the **design / bootstrap stage**. The only files present are `claude.md` (lowercase, ~2500 lines, primarily Chinese — the long-form design spec) and `CLAUDE.md` (this file — the operational guide). There is **no source code, no `package.json`, no `pyproject.toml`, no scripts, no Docusaurus site, no `knowledge/` content yet**.

When the user asks to bootstrap the project skeleton, follow `claude.md` §11 step-by-step in the original order — it lists the MVP scaffolding tasks in dependency order.

`claude.md` is the design rationale. `CLAUDE.md` is the operational guide. When the two disagree, `claude.md` wins on intent; this file wins on procedure.

> **简**：仓库还是空的，只有两份说明文档。Claude 第一次动手时按 `claude.md` §11 的 10 步顺序搭骨架，不要自己改顺序。

---

## 1. Project identity

Pathology-Wiki is **not a blog and not an Awesome list**. It is an **agent-extensible knowledge base** for computational pathology, surfaced through a GitHub Pages website (Docusaurus). Every article, tool, dataset, method, model, and benchmark added to the project is converted into:

```
structured knowledge node  (machine-readable, source of truth)
+ central graph entries    (knowledge/graph/{nodes,edges}.yaml)
+ AlphaXiv-style MDX page  (human-readable)
+ Claude-readable SKILL.md (agent guidance)
+ generated site data      (website rendering)
```

The website is the human entry point. The structured layer under `knowledge/` is the **source of truth**. Claude maintains all of it.

The long-term goal is an **agent-ready research infrastructure** for pathology AI — covering WSI deep learning, pathology foundation models, vision-language models, multimodal fusion, spatial omics, clinical translation, and agentic workflows.

> **简**：本质是病理 AI 知识图谱，网站只是给人看的入口；结构化数据 (`knowledge/`) 才是 source of truth。

---

## 2. The Five-Artifact Rule (the most violated rule)

For every object added, Claude **must** generate all five of:

| # | Artifact | Path | Hand-maintained? |
|---|----------|------|------------------|
| 1 | Object YAML | `knowledge/{type}/{id}.yaml` | yes — schema-validated |
| 2 | Graph entries | `knowledge/graph/nodes.yaml` (append node) + `edges.yaml` (append edges) | yes |
| 3 | Blog page | `content/{type}/{id}.mdx` | yes |
| 4 | Skill doc | `skills/{category}/{id}/SKILL.md` | yes — see §12 for what this means |
| 5 | Site data | `src/data/*.json` | **no — always regenerated** by `build_site_data` |

Plus an **update report** at `reports/{YYYY-MM-DD}-{slug}.md` (see §15) summarising the change, and a git commit referencing it.

**Order matters.** Object YAML → graph node + edges → reverse-link sanity check (auto-derived from `edges.yaml`) → blog → SKILL.md → regenerate site data → write report → commit.

**Never** create a blog-only or SKILL-only object. If asked for "just a quick page", explain the rule and offer to do it correctly.

> **简**：每个对象必须同时有 YAML / 图谱条目 / MDX / SKILL.md / site data，外加一份报告。少一件即未完成。`src/data/*.json` 是脚本生成物，永远不要手改。

---

## 3. Planned repository structure

```text
Pathology-Wiki/
├── CLAUDE.md
├── claude.md                    # design spec (Chinese)
├── README.md
├── package.json                 # Docusaurus + Node-side scripts
├── docusaurus.config.ts
├── pyproject.toml               # Python-side scripts
│
├── knowledge/                   # SOURCE OF TRUTH (YAML, machine-readable)
│   ├── articles/{clinical,technical,reviews,benchmarks,datasets,tools,guidelines,perspectives}/
│   ├── methods/  models/  datasets/  tools/  benchmarks/
│   ├── tasks/  metrics/  modalities/  diseases/  organs/  biomarkers/
│   ├── skills/  workflows/  taxonomies/
│   └── graph/{nodes.yaml, edges.yaml, graph.json}    # graph.json is generated
│
├── content/                     # HUMAN-FACING (MDX, rendered by site)
│   ├── articles/{...}/  methods/  models/  datasets/  tools/  benchmarks/
│   └── maps/  workflows/
│
├── skills/                      # AGENT-FACING (SKILL.md per skill)
│   ├── sources/  articles/  objects/  graph/  writing/  benchmarks/
│
├── reports/{YYYY-MM-DD}-{slug}.md   # one update report per ingestion batch
├── schemas/                     # YAML schemas for validation
├── scripts/                     # Python (validate, graph, export) + Node (site data)
├── src/                         # Docusaurus site
│   ├── components/  data/(generated)  pages/
└── .github/workflows/deploy.yml
```

The three-way split — `knowledge/` (machine) vs `content/` (human) vs `skills/` (agent) — is the project's defining architecture. Do not collapse them.

> **简**：三层目录是死规则，不要合并。`knowledge/graph/` 是图谱 SOT，对象 YAML 里不写边。

---

## 4. Object types

Allowed `type:` values across `knowledge/` and the graph:

```
article  clinical_article  technical_article  review_article  benchmark_article
dataset_article  tool_article  guideline_article  perspective_article  preprint
method  model  dataset  benchmark  tool  repo
task  metric  modality  disease  organ  biomarker
skill  agent_workflow
```

Every object has stable ID, type, metadata, related-node hints, and Claude usage notes. Edges to other objects live in `knowledge/graph/edges.yaml`, **not** inline in the object YAML.

> **简**：对象类型固定一份清单。每个对象 YAML 不写出边，边统一写到中央 `edges.yaml`。

---

## 5. Article classification — read before ingesting any paper

**Articles must be classified before any field extraction runs.** Clinical and technical articles use *different* extraction field sets, and routing the wrong way wastes work and produces shallow nodes.

### 5.1 Article types

```
clinical_article         # disease, pathology criteria, biomarkers, clinical endpoints
technical_article        # algorithms, models, training, datasets, metrics, code
review_article           # domain summaries
benchmark_article        # benchmark releases
dataset_article          # dataset releases
tool_article             # tool releases
guideline_article        # consensus / guidelines
perspective_article      # opinion / outlook
preprint                 # status flag, can combine with above
```

An article has **one primary type** and **zero or more secondary types**:

```yaml
article_type:
  primary: technical_article
  secondary: [benchmark_article, dataset_article]
```

### 5.2 Classification signals

| Signal | → Type |
|--------|--------|
| Clinical diagnosis, pathology grading, molecular subtyping, biomarker prognosis, cohort design | `clinical_article` |
| Algorithm, model architecture, training scheme, dataset evaluation, code release | `technical_article` |
| Domain-wide summary | `review_article` |
| New dataset release | `dataset_article` |
| New benchmark / leaderboard | `benchmark_article` |
| New tool / library / repo paper | `tool_article` |
| Society guideline / consensus | `guideline_article` |
| Opinion / outlook | `perspective_article` |

### 5.3 Clinical vs technical extraction (different field sets)

**Clinical articles** populate `clinical_focus`:
```yaml
clinical_focus:
  clinical_problem:        diagnostic_criteria:    pathology_criteria:
  grading_system:          staging_system:         biomarkers:
  molecular_alterations:   clinical_endpoints:     treatment_context:
  cohort_design:           clinical_workflow:      clinical_need_for_ai:
  possible_ai_tasks:
```

Use clinical articles for: clinical motivation, AI task formulation, label semantics, biomarker rationale, endpoint design. **Do not** use them as primary sources for model architecture.

**Technical articles** populate `technical_focus`:
```yaml
technical_focus:
  method_family:           model_architecture:     training_strategy:
  supervision_type:        input_type:             output_type:
  datasets:                metrics:                baselines:
  implementation:          reproducibility:        limitations:
  reusable_components:
```

Use technical articles for: related work, method comparison, benchmark design, model taxonomy updates, repo/tool ingestion. **Do not** use them as primary sources for clinical diagnostic standards unless they explicitly cite them.

A paper can be both (e.g. a foundation-model paper proposing a benchmark on clinical biomarker prediction) — use secondary types and populate both focus blocks.

> **简**：临床和技术文章用不同的抽取字段集，分错就白干。判型先于抽取；混合论文两个 focus 块都写。

---

## 6. Schemas (summary; full YAML in `claude.md` §5)

Every object YAML must include the universal envelope:

```yaml
id:                      # kebab-case, stable, see §9 for versioning
type:                    # from §4
title / name:
links: { ... }           # doi, github, paper, project, dataset, etc.
related_methods: []      # hints; authoritative edges live in graph/edges.yaml
related_models: []
related_datasets: []
related_tools: []
related_benchmarks: []
related_articles: []
claude:
  use_when: []
  do_not_use_when: []
  update_level:          # see §10
  update_status:         # draft | stub_pending | complete | needs_review
  extraction_confidence: high | medium | low
```

Note: the `related_*` arrays in object YAML are **convenience hints** for human readers; the **authoritative** topology is `knowledge/graph/edges.yaml`. If the two diverge, `edges.yaml` wins. The `validate_schema` script should flag mismatches.

Type-specific blocks (full fields in `claude.md` §5.1–5.5):

- **article** → `article_type`, `clinical_focus` and/or `technical_focus`, `domains`, `modalities`, `organs`, `diseases`, `biomarkers`, `tasks`, `metrics`
- **tool** → `tool_type`, `supported_inputs/outputs`, `capabilities`, `agent_interface` (`callable`, `install_command`, `cli_available`, `python_api_available`, `docker_available`), `maturity`, `limitations`
- **dataset** → `modalities`, `organs`, `diseases`, `species`, `data_types`, `tasks`, `labels`, `access` (license, public, requires_registration, size), `preprocessing`
- **method** → `parent_methods`, `child_methods`, `predecessors`, `successors`, `stage` (one of the 8 taxonomy stages in §7), `core_idea`, `key_questions`, `representative_*`
- **benchmark** → `benchmark_goal`, `benchmark_type`, `datasets`, `models`, `methods`, `tasks`, `metrics`, `baselines`, `pipeline`, `leaderboard`, `add_model_workflow`, `add_dataset_workflow`

When `schemas/*.yaml` files are eventually written, they must match these shapes exactly. Do not invent new top-level fields without updating both the schema and `claude.md` §5.

> **简**：YAML 里 `related_*` 是给人读的提示；真正的边以 `edges.yaml` 为准。schema 全文查 `claude.md` §5。

---

## 7. Method taxonomy (the canonical map)

Every `method` node must position itself in this tree (sets `method.stage` and `parent_methods`):

```
A. Traditional Computational Pathology
   handcrafted morphology · nuclei seg · gland seg · cell graph · texture/color/shape · classical ML

B. Deep Learning for WSI
   CNN patch classification · weakly supervised MIL · ABMIL · CLAM · DSMIL · TransMIL
   graph-based WSI learning · survival/biomarker prediction

C. Pathology Foundation Models
   patch-level SSL · slide-level pretraining · multi-scale pretraining
   vision-only PFMs · vision-language PFMs · vision-omics PFMs · pathology-specific scaling

D. Pathology Vision-Language Models
   image-text contrastive · report alignment · histology captioning · pathology VQA
   retrieval-augmented reasoning · instruction-tuned pathology MLLM

E. Multimodal Pathology AI
   path+genomics · path+spatial transcriptomics · path+radiology · path+EHR · path+report · path+KG

F. Benchmark and Evaluation
   WSI-level PFM benchmark · spatial domain benchmark · cell-level benchmark
   pathology VLM benchmark · multimodal fusion benchmark

G. Clinical Translation
   diagnosis · grading · subtyping · biomarker prediction · prognosis · therapy response · workflow integration

H. Agentic Pathology AI
   paper reading · dataset curation · benchmark execution · repo analysis
   multimodal reasoning · clinical report · autonomous discovery
```

If a new method does not fit, do **not** silently force it. Use `taxonomy_updater` to add a new branch and record the change in the update report.

### Priority research tracks

When linking new objects, prefer edges to these in-house tracks:

```
SpaPath-Bench
WSI-level Pathology Foundation Model Benchmark
Multi-scale Pathology Foundation Models
Pathology-Radiology-Omics Fusion
Clinical Biomarker Prediction
Pathology Vision-Language Models
Agentic Pathology AI
```

> **简**：方法谱系是固定 8 大类。塞不进去时不要硬套，用 `taxonomy_updater` 加分支并写报告；优先连到 7 条主线。

---

## 8. Knowledge graph — central topology

### 8.1 Storage

Single source of truth lives at:

```
knowledge/graph/nodes.yaml     # one entry per object: { id, type, label, aliases?, taxonomy_path? }
knowledge/graph/edges.yaml     # one entry per edge:   { from, to, type, evidence?, confidence? }
knowledge/graph/graph.json     # GENERATED — never hand-edit
```

Object YAMLs (`knowledge/methods/clam.yaml`, etc.) hold **content**, not edges. Edges of any kind — `uses_dataset`, `extends`, `uses_version`, etc. — go into `edges.yaml` only. Adding an object means at minimum:

1. write `knowledge/{type}/{id}.yaml`
2. append a node entry to `knowledge/graph/nodes.yaml`
3. append edge entries to `knowledge/graph/edges.yaml`

### 8.2 Node types

Same as object types in §4 (every object is a graph node).

### 8.3 Edge types

```
proposes_method      releases_model      uses_dataset       evaluates_task
uses_metric          compares_with       implements         extends
belongs_to           related_to          has_code           has_dataset
used_by_benchmark    supports_skill      consumed_by_workflow  updates_taxonomy
uses_version         version_of          supersedes
```

`uses_version` / `version_of` / `supersedes` are reserved for §9 versioning. Do not invent new edge types without updating the schema and `claude.md` §10.

### 8.4 Reverse links — derived, not hand-written

With `edges.yaml` as SOT, **reverse links are computed at build time** by `build_graph` and rendered into `graph.json` (and into local-graph cards on each blog page). You never hand-write reverse links. If a YAML object's `related_*` hint disagrees with what `edges.yaml` implies, fix the hint.

### 8.5 No isolated nodes

Before finalising any new object, check connections to: methods, models, datasets, tools, benchmarks, diseases, organs, biomarkers, tasks, metrics, skills, workflows. Add edges where they apply. An object with zero edges in `edges.yaml` is a smell — list it under "Warnings → Orphan node" in the update report.

### 8.6 Local graph (per blog page)

Every blog page must include a local-graph card showing one-hop neighbours by default, two-hop optional, with node-type and edge-type filters. Use the `LocalGraph` component (to be built). Data comes from the generated `graph.json`.

> **简**：图谱中央化存储。对象 YAML 不写边；`nodes.yaml + edges.yaml` 是 SOT，反向链接由 `build_graph` 自动生成。新对象零出边即孤儿，要在报告里标 Warning。

---

## 9. Stable IDs and versioning

### 9.1 ID convention

- lowercase, kebab-case, ASCII only
- papers: `{model-or-method}-{year}` — `gigapath-2024`, `transmil-2021`, `clam-2021`
- datasets: short canonical name — `tcga-brca`, `cptac`, `dlpfc-spatial-transcriptomics`
- methods: descriptive — `pathology-foundation-model`, `spatial-domain-identification`, `weakly-supervised-mil`
- benchmarks: name + scope — `wsi-pfm-benchmark`, `spapath-bench`
- tools: project name — `openslide`, `tiatoolbox`, `clam` (paper) / `clam-repo` (repo)

IDs are join keys across `knowledge/`, `content/`, `skills/`, and the graph. Once published, do **not** rename — add an `aliases:` field on the node instead.

### 9.2 Versioning — different IDs joined by edges

Different versions of the same object **always get distinct IDs**, joined via graph edges:

| Scenario | ID-A | ID-B | Edge |
|----------|------|------|------|
| Foundation model v1 → v2 | `uni-2024` | `uni2-2024` | `uni2-2024 --supersedes--> uni-2024`, both `--version_of--> uni-foundation-model` (a parent method node) |
| Preprint → published | `gigapath-2024-preprint` | `gigapath-2024` | `gigapath-2024 --uses_version--> gigapath-2024-preprint` |
| Major refactor of a tool | `clam-repo-v1` | `clam-repo-v2` | `--supersedes-->` |

When both versions exist as nodes, prefer linking new objects to the **published / latest** version unless the citation is explicitly about an earlier one.

> **简**：UNI/UNI2、preprint/published、tool v1/v2 一律拆成不同 id，用 `uses_version` / `version_of` / `supersedes` 边连起来。引用默认指向最新版。

---

## 10. Update levels

Every YAML node tags downstream work required:

```yaml
claude:
  update_level: link_update
```

| Level | Trigger | Required work |
|-------|---------|---------------|
| `add_only` | peripheral / weakly connected | object YAML + minimal node + blog + SKILL.md |
| `link_update` | most articles, tools, datasets | + edges into existing nodes, + updated local-graph data |
| `taxonomy_update` | introduces new method / task / clinical category | + update `knowledge/taxonomies/*.yaml`, + new branch in §7 map |
| `skill_update` | new tool / dataset / benchmark / guideline / major method | + create or update existing skills / workflows |

Choose the **highest applicable level**. When in doubt, escalate.

> **简**：每个对象都要标 update_level；不确定时往高了报。

---

## 11. Ingestion pipelines and slash commands

Each pipeline is a fixed sequence; do not skip steps. Full pipelines in `claude.md` §7.

### 11.1 Add article

```
source_adapter → article_classifier → {clinical|technical|review|...}_extractor
→ article_yaml_generator → graph node+edges write → MISSING-REF CHECK (§11.6)
→ taxonomy_updater (if needed) → alphaxiv_blog_writer → article_skill_generator
→ build_site_data → write update report → git commit
```

### 11.2 Add tool

```
github_repo_adapter → tool_classifier → tool_yaml_generator
→ graph node+edges → MISSING-REF CHECK
→ tool_blog_writer → tool_skill_generator → build_site_data → report → commit
```

Tool YAML must specify `agent_interface.callable` (true/false) and how Claude invokes it (CLI / Python API / Docker).

### 11.3 Add dataset

```
dataset_page_adapter → dataset_classifier → dataset_yaml_generator
→ graph node+edges → MISSING-REF CHECK
→ dataset_blog_writer → dataset_skill_generator → build_site_data → report → commit
```

Dataset YAML must include access info (public / license / registration / size), preprocessing steps, file formats, and **known pitfalls**.

### 11.4 Add method

```
method_classifier → method_position_mapper → predecessor_successor_finder
→ method_yaml_generator → graph node+edges → MISSING-REF CHECK
→ method_blog_writer → method_skill_generator → taxonomy_updater
→ build_site_data → report → commit
```

Always set `parent_methods` / `child_methods` / `predecessors` / `successors` if known. A method with no parent and no children is a smell.

### 11.5 Add benchmark

```
define_goal → identify_datasets → identify_tasks → identify_models_methods
→ identify_metrics → define_io_format → define_add_model_workflow
→ define_add_dataset_workflow → define_aggregation_workflow
→ benchmark_yaml_generator → graph node+edges → MISSING-REF CHECK
→ benchmark_blog_writer → benchmark_skill_generator → build_site_data → report → commit
```

Benchmark skills must contain executable workflows: `add model`, `add dataset`, `run evaluation`, `aggregate results`, `generate report`.

### 11.6 Missing-reference policy — **always ask the user**

When the object being ingested cites another entity (dataset, method, tool, benchmark, model) that does **not yet have a node** in the graph, **stop and ask the user**:

> "<object> 引用了 `<missing-id>` (类型: <type>)，目前不存在节点。要：(a) 现在为它创建 stub 节点 [auto-stub]; (b) 标 to_verify 跳过这条边 [skip]; (c) 先去给 `<missing-id>` 建完整节点再回来 [pause]; (d) 我手动指定一个已有 id [redirect]?"

Default behaviour: **ask, do not auto-stub**. Record the user's choice in the update report ("Pending references" section) so it's auditable.

### 11.7 Slash commands

MVP convention — Claude recognises these phrases in user prompts and runs the matching pipeline:

```
/add_article  {url|doi|pdf|abstract}    → 11.1
/add_tool     {github_url}              → 11.2
/add_dataset  {dataset_url}             → 11.3
/add_method   {method_name}             → 11.4
/add_benchmark {name|url}               → 11.5
/update_knowledge_base {source_list}
/build_graph
/export_claude_context
```

Once the workflow stabilises, promote the high-frequency ones (`/add_article`, `/add_tool`, `/add_dataset`) to real Claude Code slash commands under `.claude/commands/*.md`. Until then, treat them as user-prompt conventions.

> **简**：5 条 ingestion 流水线步骤死。引用了不存在的节点必须停下问用户，**默认不自动建 stub**。Slash 命令现在是约定，未来高频的几个升级成真命令。

---

## 12. Skills system — documentation-first

Skills live under `skills/` and have seven categories (full list in `claude.md` §6):

```
1. sources/     — pubmed, doi, arxiv, biorxiv, medrxiv, journal_page, pdf, github_repo, dataset_page, manual_entry
2. articles/    — article ingestion per article type
3. objects/     — tool / dataset / method / model / benchmark builders
4. graph/       — graph_builder, local_graph_builder, taxonomy_updater
5. writing/     — alphaxiv_blog_writer, related_work_writer, clinical_background_writer, ...
6. benchmarks/  — benchmark-specific workflows (spapath_bench, wsi_pfm_benchmark, ...)
7. workflows/   — multi-skill agent workflows
```

### 12.1 Form: SKILL.md as documentation, not a registered Claude Code skill

For MVP, every "skill" is a plain `SKILL.md` file describing the skill's contract — Claude reads it as guidance, not as a registered slash-invokable skill. This avoids Claude Code skill-frontmatter friction while the schema is still evolving.

After the workflow stabilises and a skill is invoked frequently (likely candidates: `graph_builder`, `build_site_data`, `alphaxiv_blog_writer`, `article_ingestion`), **promote it to a registered skill** under `.claude/skills/` with proper frontmatter, so it can be invoked as `/<skill-name>`. Keep the source of truth at `skills/{category}/{id}/SKILL.md` and symlink or copy into `.claude/skills/`.

### 12.2 SKILL.md template

Every `SKILL.md` includes these sections:

```
# Skill: {Name}
## Purpose
## When to Use
## Do Not Use When
## Inputs
## Outputs
## Standard Workflow
## Decision Rules
## Related Nodes
## Related Skills
## Failure Modes
## Examples
## Validation Checklist
```

Tool skills add: Installation, Minimal usage, API/CLI availability, Troubleshooting.
Dataset skills add: Download, Preprocessing, Label mapping, Splits, Evaluation, Known pitfalls.
Benchmark skills add: Add model / Add dataset / Run evaluation / Aggregate results / Generate report workflows.

### 12.3 MVP skills (build these first, in this order)

```
sources/{pubmed_adapter, doi_adapter, arxiv_adapter, pdf_adapter, github_repo_adapter, dataset_page_adapter}
articles/{article_ingestion, clinical_article_ingestion, technical_article_ingestion}
objects/{tool_ingestion, dataset_ingestion, method_mapping, benchmark_builder}
graph/{graph_builder, local_graph_builder, taxonomy_updater}
writing/{alphaxiv_blog_writer}
```

> **简**：起步阶段 SKILL.md 只是给 Claude 读的文档。高频几个稳定后再升级成 `.claude/skills/` 真 skill。

---

## 13. AlphaXiv-style blog requirements (clean paper page; MVP no interactivity)

For MVP, "AlphaXiv-style" means a **clean paper page layout** — structured headings, an object card, a local-graph card, a skill card, body sections. **No** inline annotation, no LLM Q&A widget, no hover discussions. Those can be added later behind feature flags; do not block MVP on them.

Every `content/.../foo.mdx` page should follow this structure unless a clearly better one applies:

```
Title
Object Card                      # type, id, year, authors, links
Local Graph                      # one-hop neighbours
Skill Card                       # link to corresponding SKILL.md
Why it matters
Core idea
Inputs and outputs
Method / clinical background     # depends on object type
Datasets / tasks / tools / metrics
Main results or capabilities
Limitations
How Claude should use this object
Related nodes
References / links
```

Type-specific deltas:

- **Clinical article** → clinical background, pathology criteria, biomarkers, clinical endpoints, AI task translation, related datasets, related technical methods. License/usage of cited datasets is mentioned in natural language only — no structured compliance fields in MVP.
- **Technical article** → method pipeline, model architecture, training strategy, datasets, tasks, metrics, baselines, reproducibility, limitations.
- **Tool** → what it is / what problem it solves, installation, minimal usage, inputs/outputs, when to use, when not to use, common failure modes, related tools.
- **Dataset** → contents, modalities, organ/disease, labels, tasks, access (license mentioned in prose), preprocessing, used-by benchmarks, known pitfalls.

> **简**：MVP blog 只做"干净论文页"，不做 inline 注释或 LLM 问答；许可证只在正文中自然语言提及，不结构化。

---

## 14. Validation and build commands (planned, not yet implemented)

Two-runtime split:

**Python — data processing** (`scripts/*.py`, declared in `pyproject.toml`):

```bash
python scripts/validate_schema.py        # YAML conforms to schemas/, related_* hints match edges.yaml
python scripts/build_graph.py            # nodes.yaml + edges.yaml → graph.json (+ derived reverse links)
python scripts/export_claude_context.py  # → knowledge/agent_context.md
python scripts/check_orphans.py          # list nodes with 0 edges in edges.yaml
```

**Node — site data** (`scripts/*.ts` or `scripts/site/*.ts`, declared in `package.json`):

```bash
npm run build:data        # knowledge/ + graph.json → src/data/*.json
npm run build             # Docusaurus production build
npm run start             # Docusaurus dev server
```

Order during ingestion: Python validate → Python build_graph → Node build:data → Node build (or start). None of these exist yet; their contracts are in `claude.md` §8.7 (`graph_builder`) and §8.10 (`export_claude_context`). Until they exist, manually check that YAML follows §6 schemas and that `nodes.yaml` / `edges.yaml` are appended consistently.

> **简**：Python 处理数据和图谱，Node 处理网站；脚本现在还没写，先按 schema 手动维护。

---

## 15. Update report — file + commit

### 15.1 File location

After every ingestion or substantial change:

```
reports/{YYYY-MM-DD}-{slug}.md
```

`slug` is a short kebab-case description (e.g. `add-gigapath-2024`, `import-dlpfc-dataset`, `bulk-pfm-benchmark-articles`). Multiple reports per day are fine.

### 15.2 Format

```markdown
# {date} — {slug}

## Added Objects
## Updated Objects
## Added Graph Edges
## Updated Taxonomies
## Generated Skills
## Generated Blog Pages
## Pending References          # any user decisions deferred per §11.6
## Validation Results
## Warnings
## Next Suggested Actions
```

### 15.3 Warnings to surface explicitly

- missing DOI / arxiv id
- missing code / repo link
- missing dataset license or access info (mentioned in blog prose only — see §13)
- unclear article type (low classification confidence)
- uncertain benchmark linkage
- low extraction confidence (clinical or technical block)
- orphan node (zero edges in `edges.yaml`)
- new method / task / disease that may need taxonomy update
- version ambiguity (preprint vs published, v1 vs v2 not resolved)

### 15.4 Git commit

After writing the report, create a git commit. Commit message format:

```
{verb}: {slug}

- short bullet of biggest change
- pending: {n} unresolved references (see report)
```

Reference the report file in the commit body.

> **简**：每次 ingestion 都要在 `reports/` 留一份独立 md，并 git commit；commit message 引用报告。

---

## 16. Writing style

Concise, structured, research-oriented. **Prefer**: headings, short technical paragraphs, tables when comparison helps, explicit cross-links, method-taxonomy framing, clinical-task translation, benchmark relevance, named limitations.

**Avoid**: vague summaries, unsupported claims, isolated blog posts, overlong prose, missing graph links, missing skill files, hallucinated metadata.

> **简**：风格紧凑、结构化、技术口吻；不要写空洞总结、孤立博文，不要瞎编。

---

## 17. Completion criteria and missing-data convention

A task is complete only when:

1. Object YAML exists and matches §6 schemas
2. `nodes.yaml` has the new node entry
3. `edges.yaml` has all known edges
4. Human-facing MDX blog exists with the required sections
5. `SKILL.md` exists with the required sections
6. `build_graph` and `build_site_data` succeed (or, while scripts don't exist, schemas are manually checked)
7. `reports/{date}-{slug}.md` is written
8. Git commit references the report

If any data is unavailable, mark fields **literally** as `unknown`, `not_found`, or `to_verify`. **Never invent**: DOIs, author lists, dataset sizes, license terms, benchmark numbers, code URLs, training corpus details, clinical criteria. Surface gaps in the report's Warnings section.

> **简**：八条完成判据，少一条就没完工。缺数据就写 `unknown` / `not_found` / `to_verify`，绝不编造。

---

## 18. Bootstrap order

When the user says "init the skeleton" / "start MVP" / "搭骨架", run `claude.md` §11 in **the original 10-step order, complete pass**. Do not pick subsets, do not reorder. Each step's outputs feed the next.

Specifically (from `claude.md` §11):

1. Create `knowledge/` / `content/` / `skills/` / `schemas/` / `scripts/` / `src/data/` directory structure
2. Draft YAML schemas for article / tool / dataset / method / benchmark / skill / graph
3. Create scripts: `validate_schema.py`, `build_graph.py`, `build_site_data.py` (Node side may be `build_site_data.ts`), `export_claude_context.py`
4. Create initial taxonomies under `knowledge/taxonomies/`: `method_map.yaml`, `task_map.yaml`, `modality_map.yaml`, `clinical_map.yaml`, `multimodal_fusion_map.yaml`
5. Create initial skills (the MVP set in §12.3)
6. Create Docusaurus pages: Home / Articles / Methods / Tools / Datasets / Benchmarks / Skills / Graph
7. Create components: `LocalGraph`, `ArticleCard`, `SkillCard`, `ToolCard`, `DatasetCard`, `MethodCard`, `BenchmarkCard`
8. Add 3 sample objects: technical article `gigapath-2024`, tool `openslide`, dataset `dlpfc`
9. Each sample must produce all five artifacts (§2)
10. Ensure `npm run build` passes

> **简**：搭骨架严格按 `claude.md` §11 十步走，不挑步骤、不改顺序。

---

## 19. Source of truth

- **Design intent and full schemas / pipelines / examples** → `claude.md` (Chinese, ~2500 lines)
- **Operational rules and procedures** → this file (`CLAUDE.md`)
- **Per-object content** → `knowledge/{type}/{id}.yaml`
- **Cross-object topology** → `knowledge/graph/{nodes,edges}.yaml` (hand-maintained)
- **Generated artifacts** (regenerable, never hand-edited) → `knowledge/graph/graph.json`, `src/data/*.json`, `knowledge/agent_context.md`
- **Update history** → `reports/{date}-{slug}.md` + git log

If `CLAUDE.md` and `claude.md` ever conflict, read both, pick the rule that better serves the Five-Artifact Rule (§2) and "no isolated nodes" (§8.5), and update whichever file is wrong.

> **简**：四类 SOT 各有归宿；冲突时以"五件齐全 + 无孤儿节点"为标尺修正。
