# 2026-05-19 — bootstrap skeleton

Initial scaffolding pass following `claude.md` §11 (10-step bootstrap order) with three sample objects requested by the user: **UNI** (model + paper), **OpenSlide** (tool), **PANDA** (dataset).

## Added Objects

### Articles (technical)
- `uni-2024` — *Towards a General-Purpose Foundation Model for Computational Pathology* (Chen et al., Nature Medicine 2024)

### Models
- `uni` — UNI ViT-L/16, DINOv2 SSL, Mass-100K pretrain

### Tools
- `openslide` — WSI I/O library (C + Python bindings, LGPL-2.1)

### Datasets
- `panda` — Prostate cANcer graDe Assessment Challenge (Radboudumc + Karolinska, ~10.6K H&E biopsy WSIs)

### Methods
- `pathology-foundation-model` — umbrella method node for vision-only / vision-language / vision-omics PFMs

## Updated Objects
None (this is the initial pass).

## Added Graph Edges
4 edges in `knowledge/graph/edges.yaml`:

| from | type | to | confidence |
|------|------|-----|-----------|
| uni-2024 | releases_model | uni | high |
| uni-2024 | proposes_method | pathology-foundation-model | high |
| uni | belongs_to | pathology-foundation-model | high |
| panda | related_to | openslide | medium |

`build_graph.py` reports: 5 nodes, 4 edges, 0 dangling, 0 orphans.

## Updated Taxonomies
- Created all five initial taxonomy files: `method_map.yaml`, `task_map.yaml`, `modality_map.yaml`, `clinical_map.yaml`, `multimodal_fusion_map.yaml`.
- No new taxonomy leaves added beyond what was already in claude.md §4 / §10.

## Generated Skills

10 MVP skill docs under `skills/`:

- `articles/article_ingestion`
- `articles/clinical_article_ingestion`
- `articles/technical_article_ingestion`
- `objects/tool_ingestion`
- `objects/dataset_ingestion`
- `objects/method_mapping`
- `objects/benchmark_builder`
- `objects/skill_generator`
- `graph/graph_builder`
- `graph/taxonomy_updater`
- `writing/alphaxiv_blog_writer`

Plus per-object SKILL.md cards for the four sample objects + the method:

- `articles/uni-2024/SKILL.md`
- `models/uni/SKILL.md`
- `tools/openslide/SKILL.md`
- `datasets/panda/SKILL.md`
- `methods/pathology-foundation-model/SKILL.md`

All are documentation-form (CLAUDE.md §12.1). Promotion to `.claude/skills/` is deferred until usage frequency justifies it.

## Generated Blog Pages

5 MDX pages under `content/`:

- `content/articles/technical/uni-2024.mdx`
- `content/models/uni.mdx`
- `content/tools/openslide.mdx`
- `content/datasets/panda.mdx`
- `content/methods/pathology-foundation-model.mdx`

Each uses the AlphaXiv-style "clean paper page" layout (CLAUDE.md §13). LocalGraph + per-type Card components are embedded.

## Validation Results

- `python scripts/python/validate_schema.py` → **OK: all schemas pass** (5 object YAMLs + nodes.yaml + edges.yaml).
- `python scripts/python/build_graph.py` → wrote `knowledge/graph/graph.json`, 5 nodes, 4 edges, 0 dropped.
- `python scripts/python/check_orphans.py` → **no orphan nodes**.
- `python scripts/python/export_claude_context.py` → wrote `knowledge/agent_context.md`.

Node-side build:
- `npm install` → 1297 packages installed in 4 min, exit 0.
- `npm run build:data` → wrote `src/data/{articles,methods,models,datasets,tools,benchmarks,skills,graph,index}.json`. Counts: article 1, method 1, model 1, dataset 1, tool 1, benchmark 0.
- `npm run build` → **succeeded** for both `en` and `zh-Hans` locales. Static site at `build/` (~2.5 MB). Routes generated for index, articles, methods, models, datasets, tools, benchmarks, graph, skills, tags.

## Pending References (CLAUDE.md §11.6 — your decision required)

Each of these is referenced by an object's `related_*` hint or in the blog text but has **no node** in `knowledge/graph/nodes.yaml`. Per the locked policy "always ask the user", I did **not** auto-stub them. Choose for each:
(a) create stub node now with `update_status: stub_pending`,
(b) skip — leave hint dangling, no edge,
(c) pause and let you ingest the full node first,
(d) redirect to an existing id you already have in mind.

| Missing id | Type | Referenced by | Notes |
|------------|------|---------------|-------|
| `mass-100k` | dataset | uni-2024, uni | UNI's internal pretraining corpus; not redistributable |
| `bulten-2022-panda` | clinical_article / technical_article | panda | Bulten et al., Nature Medicine 2022 — the PANDA challenge paper |
| `patch-level-ssl` | method | uni-2024, uni | sub-method under pathology-foundation-model |
| `vision-only-pfm` | method | uni-2024, uni | sub-method under pathology-foundation-model |
| `weakly-supervised-mil` | method | panda, openslide | core MIL method |
| `cnn-patch-classification` | method | openslide | predecessor of MIL |
| `clam` | method | panda | CLAM aggregator |
| `abmil` | method | panda | ABMIL aggregator |
| `ctranspath` | model | uni's `prefer_over` | predecessor PFM |
| `wsi-pfm-benchmark` | benchmark | panda's used_by_benchmark | mentioned in MDX |
| `uni2-2024` / `uni2` | article + model | uni's "see also" | UNI successor |
| `gigapath`, `virchow`, `h-optimus`, `conch`, `musk` | model | uni's MDX "compare against" | other PFMs |

## Warnings

- **Metadata confidence on UNI / PANDA**: a number of fields are explicitly marked `to_verify` (DOI for PANDA paper, n_patients, file_size, exact UNI release date / weights license / parameter count). These need a verification pass against the primary sources before promotion to `update_status: complete`.
- **Mass-100K not redistributable** — UNI cannot be reproduced from scratch; this is a known limitation captured in the article and model YAML.
- **Gated weights on UNI** — Hugging Face access request required; documented in `claude.use_when` / `do_not_use_when`.
- **PANDA license** — Kaggle competition rules; non-commercial. MVP keeps this in blog prose only (no structured `compliance` block — CLAUDE.md §13).
- **PANDA cross-source noise** — Karolinska label noise documented in `known_pitfalls`. Always evaluate per-source.

## Next Suggested Actions

1. **Triage Pending References table above** — fastest win is approving stub creation for the most-referenced ids (`patch-level-ssl`, `vision-only-pfm`, `clam`, `abmil`, `weakly-supervised-mil`).
2. **Verify the `to_verify` metadata** on `uni-2024`, `uni`, and `panda` — primarily DOIs, exact slide counts, and license terms.
3. **Add the second sample object family** when ready: a clinical article (e.g. WHO 2021 CNS or an IDH-mutation paper) + a benchmark (e.g. SpaPath-Bench) to exercise the rest of the pipelines.
4. **Decide on Hugging Face access flow** for UNI — should the `claude.do_not_use_when` mention what to do when access is denied?
5. **Promote `graph_builder` and `validate_schema` workflows** to actual scripts users invoke (currently raw Python; could wrap as `pwiki-validate` console script via `pyproject.toml`).
6. After `npm install` completes (running in background as of report write time), verify `npm run build:data` and `npm run build` both succeed; fix any TypeScript / MDX errors that surface.

## Files Created (count)

```
schemas/                 8 files
scripts/python/          5 files (incl. _paths.py, __init__.py)
scripts/node/            1 file
knowledge/taxonomies/    5 files
knowledge/articles/      1 file (uni-2024)
knowledge/models/        1 file (uni)
knowledge/tools/         1 file (openslide)
knowledge/datasets/      1 file (panda)
knowledge/methods/       1 file (pathology-foundation-model)
knowledge/graph/         2 files (nodes.yaml, edges.yaml) + graph.json (generated)
skills/                 16 files (10 MVP + 5 per-object + 1 method)
content/                 5 MDX pages
src/components/          8 components
src/pages/               5 pages (index, skills, graph, methods, benchmarks)
src/css/                 1 file
project root             7 files (pyproject.toml, package.json, tsconfig.json,
                                  docusaurus.config.ts, sidebars.ts,
                                  README.md, .gitignore)
.github/workflows/       1 file (deploy.yml)
reports/                 1 file (this file)
```

Total: ~75 files for the bootstrap.
