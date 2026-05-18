下面是一版完整整理，可直接作为你 **Pathology-Wiki 项目的 Claude 开发指南**。核心目标是把你的 GitHub Pages 网站做成：

> **一个由 Claude 持续构造和维护的病理 AI 领域知识图谱网站。**
> 每篇文章、每个工具、每个数据集、每个 benchmark、每个方法都会同时生成：
> **结构化知识节点 + AlphaXiv-style blog + local graph + Claude 可用 skill + 全局知识库更新。**

---

# 1. 项目总目标

你的项目不是普通博客，也不是 Awesome List，而是一个：

```text
Agent-extensible Pathology AI Knowledge Base
+ GitHub Pages Human Interface
+ Claude Skill Library
+ Domain Knowledge Graph
```

也就是：

```text
Pathology-Wiki/
├── 给人看：GitHub Pages 网站
├── 给 Claude 读：YAML / JSON / Markdown 知识库
├── 给 Agent 用：skills / workflows / scripts
└── 给图谱用：nodes / edges / graph.json
```

网站只是人类入口，真正的核心是 Claude 可读取、可更新、可扩展的结构化知识底座。

---

# 2. 核心设计原则

## Principle 1：先知识库，后网页

不要让 Claude 直接写一篇孤立的 blog。
任何新对象都必须先进入结构化知识库。

```text
Article / Tool / Dataset / Method / Benchmark
        ↓
Structured YAML Node
        ↓
Graph Edges
        ↓
AlphaXiv-style Blog
        ↓
Claude Skill
        ↓
Website Rendering
```

---

## Principle 2：每个对象必须有双视图

每个对象都应该有：

```text
Human View
├── AlphaXiv-style blog
├── local graph
├── object card
├── related nodes
└── readable explanation

Claude View
├── YAML node
├── SKILL.md
├── inputs / outputs
├── usage rules
├── related workflows
└── graph edges
```

---

## Principle 3：文章分为临床文章和技术文章

文章不能只按 paper 处理，而要分类型。

```text
Article Types
├── clinical_article       # 临床文章
├── technical_article      # 技术文章
├── review_article         # 综述
├── benchmark_article      # benchmark 文章
├── dataset_article        # 数据集文章
├── tool_article           # 工具文章
├── guideline_article      # 指南 / 共识
├── perspective_article    # 观点 / 展望
└── preprint               # 预印本
```

临床文章用于抽取：

```text
疾病背景
病理标准
诊断标准
分型分级
biomarker
临床终点
治疗背景
队列设计
AI 任务转化
```

技术文章用于抽取：

```text
方法
模型
训练范式
数据集
工具
benchmark
评估指标
代码复现
实验设计
局限性
```

---

## Principle 4：所有对象都是 graph node

所有对象都进入统一知识图谱。

```text
Node Types
├── article
├── clinical_article
├── technical_article
├── paper
├── method
├── model
├── dataset
├── benchmark
├── tool
├── repo
├── task
├── metric
├── modality
├── disease
├── organ
├── biomarker
├── skill
└── agent_workflow
```

常用边类型：

```text
Edge Types
├── proposes_method
├── releases_model
├── uses_dataset
├── evaluates_task
├── uses_metric
├── compares_with
├── implements
├── extends
├── belongs_to
├── related_to
├── has_code
├── has_dataset
├── used_by_benchmark
├── supports_skill
├── consumed_by_workflow
└── updates_taxonomy
```

---

# 3. 推荐仓库结构

建议你的 GitHub 仓库重构成下面的结构。

```text
Pathology-Wiki/
├── CLAUDE.md
├── README.md
├── package.json
├── docusaurus.config.ts
├── sidebars.ts
├── pyproject.toml
│
├── knowledge/
│   ├── articles/
│   │   ├── clinical/
│   │   ├── technical/
│   │   ├── reviews/
│   │   ├── benchmarks/
│   │   ├── datasets/
│   │   ├── tools/
│   │   ├── guidelines/
│   │   └── perspectives/
│   │
│   ├── methods/
│   ├── models/
│   ├── datasets/
│   ├── tools/
│   ├── benchmarks/
│   ├── tasks/
│   ├── metrics/
│   ├── modalities/
│   ├── diseases/
│   ├── organs/
│   ├── biomarkers/
│   ├── skills/
│   ├── workflows/
│   ├── taxonomies/
│   └── graph/
│       ├── nodes.yaml
│       ├── edges.yaml
│       └── graph.json
│
├── content/
│   ├── articles/
│   │   ├── clinical/
│   │   ├── technical/
│   │   ├── reviews/
│   │   ├── benchmarks/
│   │   ├── datasets/
│   │   ├── tools/
│   │   ├── guidelines/
│   │   └── perspectives/
│   │
│   ├── methods/
│   ├── models/
│   ├── datasets/
│   ├── tools/
│   ├── benchmarks/
│   ├── maps/
│   └── workflows/
│
├── skills/
│   ├── sources/
│   │   ├── pubmed_adapter/
│   │   ├── doi_adapter/
│   │   ├── arxiv_adapter/
│   │   ├── biorxiv_adapter/
│   │   ├── medrxiv_adapter/
│   │   ├── journal_page_adapter/
│   │   ├── pdf_adapter/
│   │   ├── github_repo_adapter/
│   │   ├── dataset_page_adapter/
│   │   └── manual_entry_adapter/
│   │
│   ├── articles/
│   │   ├── article_ingestion/
│   │   ├── clinical_article_ingestion/
│   │   ├── technical_article_ingestion/
│   │   ├── review_article_ingestion/
│   │   ├── benchmark_article_ingestion/
│   │   ├── dataset_article_ingestion/
│   │   ├── tool_article_ingestion/
│   │   └── guideline_article_ingestion/
│   │
│   ├── objects/
│   │   ├── tool_ingestion/
│   │   ├── dataset_ingestion/
│   │   ├── method_mapping/
│   │   ├── model_card_builder/
│   │   ├── benchmark_builder/
│   │   └── workflow_builder/
│   │
│   ├── graph/
│   │   ├── graph_builder/
│   │   ├── local_graph_builder/
│   │   └── taxonomy_updater/
│   │
│   ├── writing/
│   │   ├── alphaxiv_blog_writer/
│   │   ├── related_work_writer/
│   │   ├── clinical_background_writer/
│   │   ├── method_comparison_writer/
│   │   └── benchmark_report_writer/
│   │
│   └── benchmarks/
│       ├── spapath_bench/
│       ├── wsi_pfm_benchmark/
│       ├── pathology_vlm_benchmark/
│       └── multimodal_fusion_benchmark/
│
├── src/
│   ├── components/
│   │   ├── LocalGraph/
│   │   ├── GlobalGraph/
│   │   ├── ArticleCard/
│   │   ├── ArticleTypeBadge/
│   │   ├── SkillCard/
│   │   ├── ToolCard/
│   │   ├── DatasetCard/
│   │   ├── MethodCard/
│   │   ├── ModelCard/
│   │   ├── BenchmarkCard/
│   │   ├── RelatedNodeList/
│   │   └── KnowledgeUpdateLog/
│   │
│   ├── data/
│   │   ├── articles.json
│   │   ├── methods.json
│   │   ├── models.json
│   │   ├── datasets.json
│   │   ├── tools.json
│   │   ├── benchmarks.json
│   │   ├── skills.json
│   │   └── graph.json
│   │
│   └── pages/
│       ├── index.tsx
│       ├── graph.tsx
│       ├── articles.tsx
│       ├── methods.tsx
│       ├── models.tsx
│       ├── tools.tsx
│       ├── datasets.tsx
│       ├── benchmarks.tsx
│       └── skills.tsx
│
├── scripts/
│   ├── validate_schema.py
│   ├── build_graph.py
│   ├── build_site_data.py
│   ├── export_claude_context.py
│   ├── add_article.py
│   ├── add_tool.py
│   ├── add_dataset.py
│   ├── add_method.py
│   ├── add_benchmark.py
│   ├── update_reverse_links.py
│   └── generate_update_report.py
│
├── schemas/
│   ├── article.schema.yaml
│   ├── clinical_article.schema.yaml
│   ├── technical_article.schema.yaml
│   ├── tool.schema.yaml
│   ├── dataset.schema.yaml
│   ├── method.schema.yaml
│   ├── model.schema.yaml
│   ├── benchmark.schema.yaml
│   ├── skill.schema.yaml
│   └── graph.schema.yaml
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

# 4. 方法主地图

你的网站和知识库应围绕一张方法演化图组织。

```text
Pathology AI Method Map
├── A. Traditional Computational Pathology
│   ├── handcrafted morphology features
│   ├── nuclei segmentation
│   ├── gland segmentation
│   ├── cell graph
│   ├── texture / color / shape features
│   └── classical machine learning
│
├── B. Deep Learning for WSI
│   ├── CNN patch classification
│   ├── weakly supervised MIL
│   ├── ABMIL
│   ├── CLAM
│   ├── DSMIL
│   ├── TransMIL
│   ├── graph-based WSI learning
│   └── survival / biomarker prediction
│
├── C. Pathology Foundation Models
│   ├── patch-level SSL
│   ├── slide-level pretraining
│   ├── multi-scale pretraining
│   ├── vision-only PFMs
│   ├── vision-language PFMs
│   ├── vision-omics PFMs
│   └── pathology-specific scaling
│
├── D. Pathology Vision-Language Models
│   ├── image-text contrastive learning
│   ├── pathology report alignment
│   ├── histology captioning
│   ├── pathology VQA
│   ├── retrieval-augmented pathology reasoning
│   └── instruction-tuned pathology MLLM
│
├── E. Multimodal Pathology AI
│   ├── pathology + genomics
│   ├── pathology + spatial transcriptomics
│   ├── pathology + radiology
│   ├── pathology + EHR
│   ├── pathology + report
│   └── pathology + knowledge graph
│
├── F. Benchmark and Evaluation
│   ├── WSI-level PFM benchmark
│   ├── spatial domain benchmark
│   ├── cell-level benchmark
│   ├── pathology VLM benchmark
│   └── multimodal fusion benchmark
│
├── G. Clinical Translation
│   ├── diagnosis
│   ├── grading
│   ├── subtyping
│   ├── biomarker prediction
│   ├── prognosis prediction
│   ├── therapy response
│   └── clinical workflow integration
│
└── H. Agentic Pathology AI
    ├── paper reading agent
    ├── dataset curation agent
    ├── benchmark execution agent
    ├── repo analysis agent
    ├── multimodal reasoning agent
    ├── clinical report agent
    └── autonomous discovery agent
```

---

# 5. 关键对象 schema

## 5.1 Article Schema

```yaml
id:
type: article

article_type:
  primary:
  secondary: []

title:
authors: []
year:
venue:
publication_status:
  - published

links:
  doi:
  pubmed:
  arxiv:
  biorxiv:
  medrxiv:
  journal:
  pdf:
  code:
  project:
  dataset:

abstract:
keywords: []

domains: []
modalities: []
organs: []
diseases: []
biomarkers: []
tasks: []
metrics: []

related_methods: []
related_models: []
related_datasets: []
related_tools: []
related_benchmarks: []
related_articles: []

clinical_focus:
  clinical_problem:
  diagnostic_criteria: []
  pathology_criteria: []
  grading_system: []
  staging_system: []
  biomarkers: []
  molecular_alterations: []
  clinical_endpoints: []
  treatment_context: []
  cohort_design:
  clinical_workflow:
  clinical_need_for_ai:
  possible_ai_tasks: []

technical_focus:
  method_family: []
  model_architecture: []
  training_strategy: []
  supervision_type: []
  input_type: []
  output_type: []
  datasets: []
  metrics: []
  baselines: []
  implementation:
  reproducibility:
  limitations: []
  reusable_components: []

graph:
  node_type: article
  edge_priority:
  local_graph_include:
    - methods
    - models
    - datasets
    - tools
    - benchmarks
    - tasks

claude:
  summary:
  use_when: []
  do_not_use_when: []
  extraction_confidence:
  update_level:
  update_status:
```

---

## 5.2 Tool Schema

```yaml
id:
type: tool
name:
tool_type: []

links:
  github:
  docs:
  paper:
  project:
  pypi:
  conda:

supported_inputs: []
supported_outputs: []

capabilities: []
related_methods: []
related_tasks: []
related_datasets: []
related_benchmarks: []
related_articles: []

agent_interface:
  callable:
  install_command:
  example_usage:
  cli_available:
  python_api_available:
  docker_available:

maturity:
  repo_status:
  documentation:
  reproducibility:
  maintenance_level:

limitations: []

claude:
  use_when: []
  prefer_over: []
  avoid_when: []
  troubleshooting_notes: []
```

---

## 5.3 Dataset Schema

```yaml
id:
type: dataset
name:

links:
  homepage:
  download:
  paper:
  license:

modalities: []
organs: []
diseases: []
species: []
data_types: []

tasks: []
labels: []
metrics: []

access:
  public:
  license:
  download_difficulty:
  requires_registration:
  size:

preprocessing:
  required_steps: []
  recommended_tools: []
  coordinate_system:
  file_formats: []

used_by_articles: []
used_by_benchmarks: []
related_methods: []
related_tools: []

claude:
  use_when: []
  preprocessing_notes: []
  known_pitfalls: []
```

---

## 5.4 Method Schema

```yaml
id:
type: method
name:

parent_methods: []
child_methods: []
predecessors: []
successors: []

stage:
  - traditional_cpath
  - deep_wsi_learning
  - pathology_foundation_model
  - pathology_vlm
  - multimodal_pathology_ai
  - agentic_pathology_ai

core_idea:
key_questions: []

representative_articles: []
representative_models: []
representative_tools: []
representative_datasets: []
related_benchmarks: []

tasks: []
modalities: []

claude:
  use_when: []
  writing_template:
  comparison_axes: []
  migration_opportunities: []
```

---

## 5.5 Benchmark Schema

```yaml
id:
type: benchmark
name:

benchmark_goal:
benchmark_type:

datasets: []
models: []
methods: []
tasks: []
metrics: []
baselines: []

pipeline:
  inputs: []
  steps: []
  outputs: []

leaderboard:
  available:
  url:
  result_format:

related_articles: []
related_tools: []
related_skills: []

claude:
  use_when: []
  add_model_workflow:
  add_dataset_workflow:
  summarize_result_workflow:
```

---

# 6. Skills 体系总览

你需要的 skills 分为 7 大类。

```text
Skills
├── 1. Source Adapter Skills
├── 2. Article Ingestion Skills
├── 3. Object Ingestion Skills
├── 4. Graph and Taxonomy Skills
├── 5. Writing Skills
├── 6. Benchmark Skills
└── 7. Agent Workflow Skills
```

---

# 7. Skills Pipeline

## 7.1 添加文章的完整 pipeline

```text
Input: DOI / PubMed / arXiv / PDF / journal URL / pasted abstract
        ↓
source_adapter
        ↓
article_classifier
        ↓
clinical_or_technical_extractor
        ↓
article_yaml_generator
        ↓
alphaxiv_blog_writer
        ↓
article_skill_generator
        ↓
graph_builder
        ↓
reverse_link_updater
        ↓
taxonomy_updater
        ↓
site_data_builder
        ↓
knowledge_update_report
```

最终产物：

```text
knowledge/articles/{category}/{article_id}.yaml
content/articles/{category}/{article_id}.mdx
skills/articles/{category}/{article_id}/SKILL.md
knowledge/graph/edges.yaml
src/data/*.json
update_report.md
```

---

## 7.2 添加工具的完整 pipeline

```text
Input: GitHub repo URL / docs URL / package name
        ↓
github_repo_adapter
        ↓
tool_classifier
        ↓
tool_yaml_generator
        ↓
tool_blog_writer
        ↓
tool_skill_generator
        ↓
capability_graph_builder
        ↓
related_method_updater
        ↓
related_benchmark_updater
        ↓
site_data_builder
```

最终产物：

```text
knowledge/tools/{tool_id}.yaml
content/tools/{tool_id}.mdx
skills/tools/{tool_id}/SKILL.md
knowledge/graph/edges.yaml
```

---

## 7.3 添加数据集的完整 pipeline

```text
Input: dataset page / paper / benchmark documentation
        ↓
dataset_page_adapter
        ↓
dataset_classifier
        ↓
dataset_yaml_generator
        ↓
dataset_blog_writer
        ↓
dataset_skill_generator
        ↓
benchmark_linker
        ↓
task_disease_modality_linker
        ↓
graph_builder
        ↓
site_data_builder
```

最终产物：

```text
knowledge/datasets/{dataset_id}.yaml
content/datasets/{dataset_id}.mdx
skills/datasets/{dataset_id}/SKILL.md
knowledge/graph/edges.yaml
```

---

## 7.4 添加方法的完整 pipeline

```text
Input: method name / article set / manually specified concept
        ↓
method_classifier
        ↓
method_position_mapper
        ↓
predecessor_successor_finder
        ↓
method_yaml_generator
        ↓
method_blog_writer
        ↓
method_skill_generator
        ↓
method_graph_builder
        ↓
taxonomy_updater
```

最终产物：

```text
knowledge/methods/{method_id}.yaml
content/methods/{method_id}.mdx
skills/methods/{method_id}/SKILL.md
knowledge/taxonomies/method_map.yaml
```

---

# 8. 每个核心 Skill 的职责

## 8.1 `source_adapter`

负责从不同来源抽取基础信息。

支持来源：

```text
PubMed
DOI
arXiv
bioRxiv
medRxiv
journal page
PDF
GitHub repo
dataset page
benchmark page
manual entry
```

输出：

```yaml
source_type:
title:
authors:
year:
venue:
abstract:
links:
raw_text:
metadata_confidence:
```

---

## 8.2 `article_classifier`

判断文章类型。

输出：

```yaml
article_type:
  primary: clinical_article
  secondary:
    - guideline_article
confidence:
reason:
```

分类规则：

```text
临床诊疗、病理标准、分型、biomarker、队列预后 → clinical_article
算法、模型、训练、数据集、指标、代码 → technical_article
领域总结 → review_article
数据集发布 → dataset_article
benchmark 发布 → benchmark_article
工具发布 → tool_article
指南 / 共识 → guideline_article
观点 / 评论 → perspective_article
```

---

## 8.3 `clinical_article_ingestion`

用于临床文章。

抽取：

```text
疾病
器官
病理类型
诊断标准
分型分级
biomarker
分子改变
临床终点
治疗背景
AI 任务转化
相关 dataset
相关 benchmark
```

典型用途：

```text
写 clinical motivation
定义 AI 任务
解释 label 含义
为 biomarker prediction 找临床依据
为 dataset/benchmark 设计 endpoint
```

---

## 8.4 `technical_article_ingestion`

用于技术文章。

抽取：

```text
方法类别
模型结构
训练范式
输入输出
数据集
任务
指标
baseline
代码链接
复现难度
可复用组件
局限性
```

典型用途：

```text
写 related work
做方法比较
设计 benchmark
添加 model baseline
更新方法谱系
生成 repo/tool skill
```

---

## 8.5 `alphaxiv_blog_writer`

为每个对象生成面向人类的 blog。

页面结构：

```text
Title
Object Card
Local Graph
Skill Card
Why it matters
Core idea
Inputs / outputs
Method or clinical background
Datasets / tasks / tools
Limitations
How Claude should use it
Related nodes
```

---

## 8.6 `skill_generator`

为每个对象生成 Claude 可用的 `SKILL.md`。

每个 skill 必须包含：

```text
Purpose
When to use
Inputs
Outputs
Standard workflow
Decision rules
Related nodes
Failure modes
Examples
Do not use when
```

---

## 8.7 `graph_builder`

维护全局知识图谱。

负责：

```text
读取所有 YAML
生成 nodes
生成 edges
去重
检查 orphan nodes
生成 graph.json
生成 local graph 数据
```

---

## 8.8 `taxonomy_updater`

当新文章引入新方法、新任务、新病种、新 benchmark 时，更新 taxonomy。

更新对象：

```text
knowledge/taxonomies/method_map.yaml
knowledge/taxonomies/task_map.yaml
knowledge/taxonomies/modality_map.yaml
knowledge/taxonomies/clinical_map.yaml
knowledge/taxonomies/multimodal_fusion_map.yaml
```

---

## 8.9 `knowledge_updater`

添加新对象后，负责更新已有节点的反向链接。

例如新文章使用 TCGA：

```text
article → uses_dataset → TCGA
TCGA → used_by_article → article
```

---

## 8.10 `export_claude_context`

导出 Claude 快速读取的全局上下文。

输出：

```text
knowledge/agent_context.md
```

内容包括：

```text
项目简介
当前方法地图
核心 benchmark
已有 tools
已有 datasets
已有 skills
最新更新
Claude 操作规则
```

---

# 9. 最小 MVP

第一版建议只实现这些。

## 对象类型

```text
article
tool
dataset
method
benchmark
```

## 初始 skills

```text
source_adapter
article_ingestion
clinical_article_ingestion
technical_article_ingestion
tool_ingestion
dataset_ingestion
method_mapping
benchmark_builder
graph_builder
alphaxiv_blog_writer
skill_generator
knowledge_updater
```

## 初始内容

### Methods

```text
MIL
ABMIL
CLAM
TransMIL
Pathology Foundation Model
Pathology VLM
Multimodal Fusion
Spatial Domain Identification
Agentic Pathology AI
```

### Articles

```text
CLAM
TransMIL
HIPT
CTransPath
UNI
GigaPath
Virchow
H-Optimus
CONCH
PLIP
MUSK
Phikon
WHO CNS tumor classification
IDH mutation clinical article
```

### Tools

```text
OpenSlide
pyvips
TIAToolbox
CLAM repo
UNI repo
CONCH repo
GigaPath repo
STAGATE
SpaGCN
GraphST
```

### Datasets

```text
TCGA
CPTAC
DLPFC
10x Visium
EBRAINS
IPD-Brain
```

### Benchmarks

```text
SpaPath-Bench
WSI-level PFM Benchmark
Pathology VLM Benchmark
Multimodal Fusion Benchmark
```

---

# 10. 完整 CLAUDE.md

下面这份可以直接放到仓库根目录。

````md
# CLAUDE.md

## Project Identity

This repository is **Pathology-Wiki**, an agent-extensible knowledge base and GitHub Pages website for computational pathology, pathology foundation models, multimodal fusion, spatial omics, clinical translation, benchmarks, datasets, tools, and agentic pathology AI.

The website is the human-facing interface.  
The structured knowledge layer under `knowledge/` is the source of truth.  
Claude should maintain this project as a structured research knowledge base, not as a normal blog.

## Core Goal

For every article, tool, dataset, method, model, benchmark, or workflow added to this repository, Claude must generate:

1. A structured YAML node under `knowledge/`
2. A human-facing AlphaXiv-style blog page under `content/`
3. A Claude-facing `SKILL.md` under `skills/`
4. Graph nodes and edges under `knowledge/graph/`
5. Reverse links in related nodes when relevant
6. Updated site data under `src/data/`
7. A knowledge update report

Do not add isolated prose-only pages.

---

## Repository Structure

The repository should follow this structure:

```text
Pathology-Wiki/
├── knowledge/
│   ├── articles/
│   ├── methods/
│   ├── models/
│   ├── datasets/
│   ├── tools/
│   ├── benchmarks/
│   ├── tasks/
│   ├── metrics/
│   ├── modalities/
│   ├── diseases/
│   ├── organs/
│   ├── biomarkers/
│   ├── skills/
│   ├── workflows/
│   ├── taxonomies/
│   └── graph/
│
├── content/
│   ├── articles/
│   ├── methods/
│   ├── models/
│   ├── datasets/
│   ├── tools/
│   ├── benchmarks/
│   ├── maps/
│   └── workflows/
│
├── skills/
│   ├── sources/
│   ├── articles/
│   ├── objects/
│   ├── graph/
│   ├── writing/
│   └── benchmarks/
│
├── schemas/
├── scripts/
├── src/
└── .github/workflows/
````

---

## Fundamental Rules

### Rule 1: Structured Node First

Never create a blog page before creating the corresponding structured YAML node.

Correct workflow:

```text
YAML node → graph edges → AlphaXiv-style blog → Claude skill → site data
```

Incorrect workflow:

```text
Blog only
```

### Rule 2: Every Object Must Be Agent-Readable

Every object must be understandable by Claude and future agents.

An object is valid only if it includes:

* stable ID
* object type
* metadata
* related nodes
* graph edges
* Claude usage notes
* skill or skill card

### Rule 3: Every Object Must Be Human-Readable

Every object should also have a human-facing blog page.

The blog page should explain:

* what the object is
* why it matters
* how it connects to pathology AI
* related methods / models / datasets / tools / benchmarks
* how Claude should use it
* local graph

### Rule 4: No Isolated Nodes

When adding a new object, always link it to existing nodes if possible.

Check and update:

* related methods
* related models
* related datasets
* related tools
* related benchmarks
* related diseases
* related organs
* related biomarkers
* related tasks
* related metrics
* related skills
* related workflows

### Rule 5: Use Stable IDs

Use lowercase kebab-case IDs.

Examples:

```text
gigapath-2024
uni-2024
tcga-brca
dlpfc-spatial-transcriptomics
pathology-foundation-model
spatial-domain-identification
wsi-pfm-benchmark
```

---

## Supported Object Types

Claude may create and maintain the following object types:

```text
article
clinical_article
technical_article
review_article
benchmark_article
dataset_article
tool_article
guideline_article
perspective_article
method
model
dataset
benchmark
tool
repo
task
metric
modality
disease
organ
biomarker
skill
agent_workflow
```

---

## Article Types

All articles must be classified before ingestion.

Primary article types:

```text
clinical_article
technical_article
review_article
benchmark_article
dataset_article
tool_article
guideline_article
perspective_article
preprint
```

Articles may have one primary type and multiple secondary types.

Example:

```yaml
article_type:
  primary: technical_article
  secondary:
    - benchmark_article
    - dataset_article
```

---

## Clinical Article Definition

A clinical article is an article that primarily defines or discusses:

* disease background
* pathology criteria
* diagnostic criteria
* grading or staging
* molecular classification
* biomarkers
* prognosis
* treatment response
* clinical endpoints
* cohort design
* clinical workflow
* clinical need

Clinical articles should be used to support:

* clinical motivation
* AI task formulation
* biomarker label definition
* disease-specific benchmark design
* clinical endpoint selection
* discussion of clinical relevance

Clinical articles should not be used as primary sources for model architecture or algorithm implementation.

### Clinical Article Extraction Fields

For clinical articles, extract:

```yaml
clinical_focus:
  clinical_problem:
  diagnostic_criteria:
  pathology_criteria:
  grading_system:
  staging_system:
  biomarkers:
  molecular_alterations:
  clinical_endpoints:
  treatment_context:
  cohort_design:
  clinical_workflow:
  clinical_need_for_ai:
  possible_ai_tasks:
```

---

## Technical Article Definition

A technical article is an article that primarily proposes or evaluates:

* algorithms
* models
* foundation models
* VLMs
* agent workflows
* training strategies
* datasets
* benchmarks
* tools
* software pipelines
* evaluation metrics
* reproducibility protocols

Technical articles should be used to support:

* related work writing
* method comparison
* benchmark design
* model taxonomy update
* repo/tool ingestion
* experimental pipeline design
* code reproduction

Technical articles should not be used as primary sources for clinical diagnostic standards unless they explicitly cite or define them.

### Technical Article Extraction Fields

For technical articles, extract:

```yaml
technical_focus:
  method_family:
  model_architecture:
  training_strategy:
  supervision_type:
  input_type:
  output_type:
  datasets:
  metrics:
  baselines:
  implementation:
  reproducibility:
  limitations:
  reusable_components:
```

---

## Main Method Taxonomy

Use the following top-level method map:

```text
Traditional Computational Pathology
→ Deep Learning for WSI
→ Pathology Foundation Models
→ Pathology Vision-Language Models
→ Multimodal Pathology AI
→ Spatial Omics and Histology
→ Benchmark and Evaluation
→ Clinical Translation
→ Agentic Pathology AI
```

More detailed taxonomy:

```text
Traditional Computational Pathology
├── handcrafted morphology features
├── nuclei segmentation
├── gland segmentation
├── cell graph models
├── texture / color / shape features
└── classical machine learning

Deep Learning for WSI
├── CNN patch classification
├── weakly supervised MIL
├── ABMIL
├── CLAM
├── DSMIL
├── TransMIL
├── graph-based WSI learning
└── survival / biomarker prediction

Pathology Foundation Models
├── patch-level SSL
├── slide-level pretraining
├── multi-scale pretraining
├── vision-only PFMs
├── vision-language PFMs
├── vision-omics PFMs
└── pathology-specific scaling

Pathology Vision-Language Models
├── image-text contrastive learning
├── pathology report alignment
├── histology captioning
├── pathology VQA
├── retrieval-augmented pathology reasoning
└── instruction-tuned pathology MLLM

Multimodal Pathology AI
├── pathology + genomics
├── pathology + spatial transcriptomics
├── pathology + radiology
├── pathology + EHR
├── pathology + report
└── pathology + knowledge graph

Benchmark and Evaluation
├── WSI-level PFM benchmark
├── spatial domain benchmark
├── cell-level benchmark
├── pathology VLM benchmark
└── multimodal fusion benchmark

Clinical Translation
├── diagnosis
├── grading
├── subtyping
├── biomarker prediction
├── prognosis prediction
├── therapy response
└── clinical workflow integration

Agentic Pathology AI
├── paper reading agent
├── dataset curation agent
├── benchmark execution agent
├── repo analysis agent
├── multimodal reasoning agent
├── clinical report agent
└── autonomous discovery agent
```

---

## My Research Tracks

Prioritize links to these research tracks:

```text
SpaPath-Bench
WSI-level Pathology Foundation Model Benchmark
Multi-scale Pathology Foundation Models
Pathology-Radiology-Omics Fusion
Clinical Biomarker Prediction
Pathology Vision-Language Models
Agentic Pathology AI
```

When adding a new object, check whether it relates to any of these tracks.

---

## Graph Policy

Every object must be represented in the knowledge graph.

### Node Types

Allowed graph node types:

```text
article
clinical_article
technical_article
method
model
dataset
benchmark
tool
repo
task
metric
modality
disease
organ
biomarker
skill
agent_workflow
```

### Edge Types

Allowed graph edge types:

```text
proposes_method
releases_model
uses_dataset
evaluates_task
uses_metric
compares_with
implements
extends
belongs_to
related_to
has_code
has_dataset
used_by_benchmark
supports_skill
consumed_by_workflow
updates_taxonomy
```

### Local Graph Requirement

Each article, method, tool, dataset, model, and benchmark page must include a local graph.

The local graph should include:

* one-hop neighbors by default
* optional two-hop neighbors
* node type filters
* edge type filters
* clickable nodes
* related skills

---

## Required Output for Every Article

For every article added, Claude must generate:

```text
knowledge/articles/{category}/{article_id}.yaml
content/articles/{category}/{article_id}.mdx
skills/articles/{category}/{article_id}/SKILL.md
knowledge/graph/edges.yaml update
related node updates
knowledge update report
```

Do not add an article without all required outputs unless the user explicitly requests a partial draft.

---

## Required Output for Every Tool

For every tool or GitHub repository added, Claude must generate:

```text
knowledge/tools/{tool_id}.yaml
content/tools/{tool_id}.mdx
skills/tools/{tool_id}/SKILL.md
graph edges
related method/task/benchmark updates
```

Tool entries must include:

* GitHub URL
* documentation URL if available
* installation command
* supported inputs
* supported outputs
* capabilities
* Python API availability
* CLI availability
* Docker availability
* related methods
* related datasets
* related benchmarks
* failure modes
* Claude usage rules

---

## Required Output for Every Dataset

For every dataset added, Claude must generate:

```text
knowledge/datasets/{dataset_id}.yaml
content/datasets/{dataset_id}.mdx
skills/datasets/{dataset_id}/SKILL.md
graph edges
related benchmark/task/disease/modality updates
```

Dataset entries must include:

* modality
* organ
* disease
* species
* labels
* tasks
* metrics
* access URL
* license
* download difficulty
* preprocessing steps
* related tools
* related benchmarks
* known pitfalls

---

## Required Output for Every Method

For every method added, Claude must generate:

```text
knowledge/methods/{method_id}.yaml
content/methods/{method_id}.mdx
skills/methods/{method_id}/SKILL.md
taxonomy update
graph edges
```

Method entries must include:

* parent methods
* child methods
* predecessors
* successors
* core idea
* representative articles
* representative models
* representative tools
* representative datasets
* related benchmarks
* use cases
* comparison axes

---

## Required Output for Every Benchmark

For every benchmark added, Claude must generate:

```text
knowledge/benchmarks/{benchmark_id}.yaml
content/benchmarks/{benchmark_id}.mdx
skills/benchmarks/{benchmark_id}/SKILL.md
benchmark workflow files when needed
graph edges
```

Benchmark entries must include:

* benchmark goal
* datasets
* models
* methods
* tasks
* metrics
* baselines
* pipeline
* result format
* add-model workflow
* add-dataset workflow
* result summarization workflow

---

## Source Adapter Skills

Claude should use source adapter skills to parse heterogeneous sources.

Supported source adapters:

```text
pubmed_adapter
doi_adapter
arxiv_adapter
biorxiv_adapter
medrxiv_adapter
journal_page_adapter
pdf_adapter
github_repo_adapter
dataset_page_adapter
benchmark_page_adapter
manual_entry_adapter
```

Each adapter should output:

```yaml
source_type:
title:
authors:
year:
venue:
abstract:
links:
raw_text:
metadata_confidence:
```

If source metadata is incomplete, mark missing fields clearly rather than hallucinating.

---

## Article Ingestion Pipeline

When adding an article, Claude must follow this pipeline:

```text
1. Parse source using the appropriate source adapter.
2. Extract metadata.
3. Classify article type.
4. Apply type-specific extraction:
   - clinical article extraction
   - technical article extraction
   - review extraction
   - benchmark extraction
   - dataset extraction
   - tool extraction
5. Generate structured YAML.
6. Link article to methods, models, datasets, tools, benchmarks, diseases, organs, biomarkers, tasks, and metrics.
7. Generate AlphaXiv-style blog page.
8. Generate article-specific SKILL.md.
9. Add graph nodes and edges.
10. Update reverse links in related nodes.
11. Update taxonomy if needed.
12. Run schema validation.
13. Rebuild graph and site data.
14. Generate update report.
```

---

## Tool Ingestion Pipeline

When adding a GitHub repository or tool, Claude must follow this pipeline:

```text
1. Parse GitHub README, documentation, package metadata, and examples.
2. Determine tool category.
3. Extract capabilities.
4. Identify supported inputs and outputs.
5. Identify install method.
6. Determine whether the tool is agent-callable.
7. Create tool YAML.
8. Create AlphaXiv-style tool blog.
9. Create tool SKILL.md.
10. Link tool to methods, tasks, datasets, benchmarks, and articles.
11. Update graph.
12. Run validation.
```

---

## Dataset Ingestion Pipeline

When adding a dataset, Claude must follow this pipeline:

```text
1. Parse dataset page, paper, or documentation.
2. Extract modality, organ, disease, labels, tasks, and access information.
3. Determine download difficulty and license.
4. Extract preprocessing requirements.
5. Link dataset to articles, tools, methods, tasks, and benchmarks.
6. Create dataset YAML.
7. Create dataset blog.
8. Create dataset SKILL.md.
9. Update graph.
10. Run validation.
```

---

## Method Mapping Pipeline

When adding or updating a method, Claude must follow this pipeline:

```text
1. Identify method family.
2. Position method in the method taxonomy.
3. Identify predecessors and successors.
4. Link representative articles, models, tools, datasets, and benchmarks.
5. Define core questions and comparison axes.
6. Create or update method YAML.
7. Create or update method blog.
8. Create or update method SKILL.md.
9. Update taxonomy.
10. Update graph.
```

---

## Benchmark Pipeline

When adding or updating a benchmark, Claude must follow this pipeline:

```text
1. Define benchmark goal.
2. Identify datasets.
3. Identify tasks.
4. Identify models and methods.
5. Identify metrics.
6. Define input/output format.
7. Define add-model workflow.
8. Define add-dataset workflow.
9. Define result aggregation workflow.
10. Create benchmark YAML.
11. Create benchmark blog.
12. Create benchmark SKILL.md.
13. Update graph.
```

---

## AlphaXiv-style Blog Requirements

Every human-facing page should follow this structure unless a better structure is required:

```text
Title
Object Card
Local Graph
Skill Card
Why it matters
Core idea
Inputs and outputs
Method / clinical background
Datasets / tasks / tools / metrics
Main results or capabilities
Limitations
How Claude should use this object
Related nodes
References or links
```

For clinical articles, include:

```text
Clinical background
Pathology criteria
Biomarkers
Clinical endpoints
AI task translation
Related datasets
Related technical methods
```

For technical articles, include:

```text
Method pipeline
Model architecture
Training strategy
Datasets
Tasks
Metrics
Baselines
Reproducibility
Limitations
```

For tools, include:

```text
What it is
What problem it solves
Installation
Minimal usage
Inputs and outputs
When to use
When not to use
Common failure modes
Related tools
```

For datasets, include:

```text
What it contains
Modalities
Organs/diseases
Labels
Tasks
Access
Preprocessing
Used by benchmarks
Known pitfalls
```

---

## Skill.md Requirements

Every generated skill must include:

```text
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

Tool skills must additionally include:

```text
Installation
Minimal usage
API / CLI availability
Troubleshooting
```

Dataset skills must additionally include:

```text
Download
Preprocessing
Label mapping
Splits
Evaluation
Known pitfalls
```

Benchmark skills must additionally include:

```text
Add model workflow
Add dataset workflow
Run evaluation workflow
Aggregate results workflow
Generate report workflow
```

---

## Knowledge Update Levels

When adding an object, Claude must assign an update level.

```text
Level 1: add_only
- Add new object only.
- Use for peripheral or weakly connected entries.

Level 2: link_update
- Add object and update related nodes.
- Use for most articles, tools, and datasets.

Level 3: taxonomy_update
- Add object and update method/task/clinical taxonomy.
- Use when a paper introduces a new method, task, benchmark, or clinical category.

Level 4: skill_update
- Add object and update existing skills or workflows.
- Use for new tools, datasets, benchmarks, guidelines, or major methods.
```

Record this in YAML:

```yaml
claude:
  update_level: link_update
```

---

## Reverse Link Policy

When Claude adds an edge from A to B, it should update B when reverse links are maintained.

Example:

```text
article:gigapath-2024 uses_dataset dataset:tcga
```

Then update:

```yaml
knowledge/datasets/tcga.yaml
used_by_articles:
  - gigapath-2024
```

Do this for:

* article ↔ method
* article ↔ dataset
* article ↔ tool
* article ↔ benchmark
* article ↔ model
* dataset ↔ benchmark
* tool ↔ workflow
* skill ↔ workflow

---

## Validation Policy

After creating or updating objects, Claude should run or prepare the following validation steps:

```bash
python scripts/validate_schema.py
python scripts/build_graph.py
python scripts/build_site_data.py
python scripts/export_claude_context.py
```

If validation fails, fix schema or link errors before finalizing.

If scripts are not implemented yet, create TODOs and ensure files follow the intended schema.

---

## GitHub Pages and Site Data

The site should be built from structured knowledge.

Site data should be generated into:

```text
src/data/articles.json
src/data/methods.json
src/data/models.json
src/data/datasets.json
src/data/tools.json
src/data/benchmarks.json
src/data/skills.json
src/data/graph.json
```

The website should support:

* article list
* method map
* model list
* dataset list
* tool list
* benchmark list
* skill list
* global graph
* local graph for each object
* filters by type, modality, task, disease, organ, method, model, dataset, benchmark, and skill

---

## Update Report Requirement

After every substantial update, Claude must generate a concise update report.

Use this format:

```md
# Knowledge Base Update Report

## Added Objects

## Updated Objects

## Added Graph Edges

## Updated Taxonomies

## Generated Skills

## Generated Blog Pages

## Validation Results

## Warnings

## Next Suggested Actions
```

Warnings should include:

* missing DOI
* missing code
* missing dataset license
* unclear article type
* uncertain benchmark linkage
* low extraction confidence

---

## Standard Commands

Users may ask Claude to perform commands like:

```text
/add_article {url_or_pdf_or_doi}
/add_tool {github_url}
/add_dataset {dataset_url}
/add_method {method_name}
/add_benchmark {benchmark_name_or_url}
/update_knowledge_base {source_list}
/build_graph
/export_claude_context
```

Claude should interpret these commands according to the relevant pipeline.

---

## Initial Skills to Implement

Claude should help implement the following skills first:

```text
skills/sources/pubmed_adapter
skills/sources/doi_adapter
skills/sources/arxiv_adapter
skills/sources/pdf_adapter
skills/sources/github_repo_adapter
skills/sources/dataset_page_adapter

skills/articles/article_ingestion
skills/articles/clinical_article_ingestion
skills/articles/technical_article_ingestion
skills/articles/review_article_ingestion
skills/articles/benchmark_article_ingestion
skills/articles/dataset_article_ingestion
skills/articles/tool_article_ingestion
skills/articles/guideline_article_ingestion

skills/objects/tool_ingestion
skills/objects/dataset_ingestion
skills/objects/method_mapping
skills/objects/model_card_builder
skills/objects/benchmark_builder

skills/graph/graph_builder
skills/graph/local_graph_builder
skills/graph/taxonomy_updater

skills/writing/alphaxiv_blog_writer
skills/writing/related_work_writer
skills/writing/clinical_background_writer
skills/writing/method_comparison_writer
skills/writing/benchmark_report_writer

skills/benchmarks/spapath_bench
skills/benchmarks/wsi_pfm_benchmark
skills/benchmarks/pathology_vlm_benchmark
skills/benchmarks/multimodal_fusion_benchmark
```

---

## Benchmark-Specific Priorities

### SpaPath-Bench

Use this benchmark skill for:

* pathology foundation model spatial organization evaluation
* spatial domain identification
* H&E-ST alignment
* spot-level histology embedding evaluation
* PCA vs SDI backbone comparison
* STAGATE / SpaGCN / GraphST / SEDR comparisons

Core entities:

```text
DLPFC
10x Visium
UNI
GigaPath
Virchow
H-Optimus
CONCH
PLIP
MUSK
DINOv3
STAGATE
SpaGCN
CCST
SEDR
SpaceFlow
GraphST
ARI
NMI
HOM
COM
PAS
CHAOS
ASW
```

### WSI-level PFM Benchmark

Use this benchmark skill for:

* WSI-level clinical prediction
* PFM vs natural image pretraining
* ABMIL / mean pooling evaluation
* diagnosis / prognosis / grading / biomarker prediction
* repeated cross-validation
* statistical rank-based comparison

### Pathology VLM Benchmark

Use this benchmark skill for:

* image-text retrieval
* histology captioning
* pathology VQA
* report grounding
* vision-language pathology model comparison

### Multimodal Fusion Benchmark

Use this benchmark skill for:

* pathology + genomics
* pathology + radiology
* pathology + EHR
* pathology + spatial transcriptomics
* survival and biomarker prediction
* early / intermediate / late fusion
* cross-attention / co-attention / contrastive alignment

---

## Preferred Writing Style

Use concise, structured, research-oriented writing.

Prefer:

* headings
* short technical paragraphs
* tables when useful
* explicit links between concepts
* method-taxonomy framing
* clinical-task translation
* benchmark relevance
* limitations

Avoid:

* vague summaries
* unsupported claims
* isolated blog posts
* overlong prose
* missing graph links
* missing skill files

---

## Completion Criteria

A task is complete only when the following are done:

```text
1. Structured YAML exists and passes schema expectation.
2. Human-facing MDX blog exists.
3. Claude-facing SKILL.md exists.
4. Graph edges are added.
5. Related nodes are updated when relevant.
6. Site data can be rebuilt.
7. Update report is generated.
```

If some information is unavailable, mark it explicitly as:

```yaml
unknown
not_found
to_verify
```

Do not hallucinate missing details.

---

## Final Project Definition

Pathology-Wiki is a GitHub Pages website and Claude-maintained knowledge system where every clinical article, technical article, tool, dataset, method, model, and benchmark is converted into:

```text
structured knowledge node
+ AlphaXiv-style human blog
+ local graph
+ Claude skill
+ agent workflow connection
```

The long-term goal is to build an agent-ready research infrastructure for computational pathology, pathology foundation models, multimodal medical AI, spatial omics, and clinical translation.

````

---

# 11. 建议你下一步让 Claude Code 做的第一批任务

可以直接把下面这段交给 Claude Code：

```text
请根据根目录 CLAUDE.md 初始化 Pathology-Wiki 项目的工程骨架。

第一阶段只实现 MVP：

1. 创建 knowledge / content / skills / schemas / scripts / src/data 的目录结构。
2. 创建 article、tool、dataset、method、benchmark、skill、graph 的 YAML schema 草案。
3. 创建 scripts:
   - validate_schema.py
   - build_graph.py
   - build_site_data.py
   - export_claude_context.py
4. 创建初始 taxonomy:
   - method_map.yaml
   - task_map.yaml
   - modality_map.yaml
   - clinical_map.yaml
   - multimodal_fusion_map.yaml
5. 创建初始 skills:
   - article_ingestion
   - clinical_article_ingestion
   - technical_article_ingestion
   - tool_ingestion
   - dataset_ingestion
   - method_mapping
   - benchmark_builder
   - graph_builder
   - alphaxiv_blog_writer
   - skill_generator
6. 创建 Docusaurus 页面:
   - Home
   - Articles
   - Methods
   - Tools
   - Datasets
   - Benchmarks
   - Skills
   - Graph
7. 创建 LocalGraph、ArticleCard、SkillCard、ToolCard、DatasetCard、MethodCard、BenchmarkCard 组件的初始版本。
8. 添加 3 个样例对象:
   - technical article: GigaPath
   - tool: OpenSlide
   - dataset: DLPFC
9. 每个样例对象必须包含:
   - knowledge YAML
   - content MDX
   - SKILL.md
   - graph edges
10. 确保 npm run build 可以通过。
````

---

# 12. 最终总结

你的需求可以浓缩成一句话：

> **Pathology-Wiki 是一个 GitHub Pages 展示、Claude 构造和维护的病理 AI 知识图谱系统。它把临床文章、技术文章、工具、数据集、benchmark、方法和模型全部转化为结构化知识节点、AlphaXiv-style blog、local graph 和 Claude 可复用 skill，从而形成可持续扩展的 agent-ready 领域知识库。**
