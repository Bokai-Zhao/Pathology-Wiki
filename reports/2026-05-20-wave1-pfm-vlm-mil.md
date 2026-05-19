# 2026-05-20 — wave1-pfm-vlm-mil (Awesome-AI4DigitalPathology batch)

First-wave ingestion of 6 high-priority papers from the Awesome-AI4DigitalPathology curated index. Filling the most-flagged gaps in the existing graph: 2024-era slide-level + clinical-grade PFMs, the modern pathology VL model, the first conversational pathology copilot, and the dual-stream MIL aggregator that completes the canonical MIL benchmark suite.

**Background**: Yesterday (2026-05-19) we ingested the awesome-list itself as a `tool` node and produced the master queue (`reports/2026-05-19-awesome-list-queue.md`). Today's wave 1 was originally planned as 35 parallel-agent ingestions but the daily API spend cap was hit; this report covers the focused 6-paper subset that the main agent ingested directly.

## Added Objects

| id | type | source |
|----|------|--------|
| `gigapath-2024` | technical_article | Xu et al. *Nature* 630:181–188 (DOI 10.1038/s41586-024-07441-w) — Prov-GigaPath |
| `chief-2024` | technical_article (+ secondary `clinical_article`) | Wang et al. *Nature* 634:970–978 (DOI 10.1038/s41586-024-07894-z) — CHIEF |
| `virchow-2024` | technical_article | Vorontsov et al. *Nat Med* 30:2924–2935 (DOI 10.1038/s41591-024-03141-0) — Virchow |
| `conch-2024` | technical_article (+ secondary `dataset_article`) | Lu et al. *Nat Med* 30:863–874 (DOI 10.1038/s41591-024-02856-4) — CONCH |
| `pathchat-2024` | technical_article (+ secondary `clinical_article`) | Lu et al. *Nature* 634:466–473 (DOI 10.1038/s41586-024-07618-3) — PathChat |
| `dsmil-2021` | technical_article | Li, Li, Eliceiri *CVPR 2021* (arXiv:2011.08939) — DSMIL |

Each object includes:
- YAML in `knowledge/articles/technical/{id}.yaml`
- Markdown page in `content/articles/technical/{id}.md` (EN only — ZH falls back via mkdocs-static-i18n's `fallback_to_default: true`; ZH translations deferred to a future translation pass)
- `skills/articles/{id}/SKILL.md`
- `mkdocs.yml` nav entry under **Articles / Technical**

## Updated Objects

- `knowledge/graph/nodes.yaml` — appended 6 new node entries (Wave 1 cluster).
- `knowledge/graph/edges.yaml` — appended 33 new edges.
- `mkdocs.yml` — 6 new nav lines.

## Added Graph Edges (33)

**Method-hierarchy (12):**
- `gigapath-2024 → pathology-foundation-model` (belongs_to)
- `gigapath-2024 → patch-level-ssl` (belongs_to, stage-1 patch encoder)
- `chief-2024 → pathology-foundation-model` (belongs_to)
- `chief-2024 → patch-level-ssl` (belongs_to)
- `virchow-2024 → pathology-foundation-model` (belongs_to)
- `virchow-2024 → patch-level-ssl` (belongs_to)
- `conch-2024 → pathology-vlm` (belongs_to)
- `conch-2024 → pathology-foundation-model` (belongs_to, secondary)
- `pathchat-2024 → pathology-vlm` (belongs_to)
- `dsmil-2021 → weakly-supervised-mil` (proposes_method)

**Lineage / supersedes (6):**
- `chief-2024 → ctranspath-2022` (extends)
- `conch-2024 → plip-2023` (extends + supersedes)
- `conch-2024 → clip-2021` (extends)
- `pathchat-2024 → conch-2024` (extends, CONCH is the visual encoder)
- `dsmil-2021 → abmil-2018` (extends)

**Cross-comparisons (8):**
- `gigapath-2024 → uni-2024` (compares_with)
- `gigapath-2024 → ctranspath-2022` (compares_with)
- `chief-2024 → uni-2024` (compares_with)
- `virchow-2024 → uni-2024` (compares_with)
- `virchow-2024 → gigapath-2024` (compares_with)
- `dsmil-2021 → clam-2021` (compares_with)
- `dsmil-2021 → transmil-2021` (compares_with)
- `pathchat-2024 → plip-2023` (related_to)

**Datasets (1):**
- `dsmil-2021 → camelyon16` (uses_dataset)

**Awesome-list cross-refs (6):** `awesome-ai4digitalpathology → {gigapath/chief/virchow/conch/pathchat/dsmil}-{year}` (related_to).

**Other (2):** `panda → dsmil-2021` (related_to, MIL aggregator), `bahadir-2024 → gigapath-2024` (related_to, post-cutoff successor).

## Updated Taxonomies

The Pathology Foundation Models / Slide-Level PFM sub-branch is now anchored by `gigapath-2024`. The Pathology VLM branch has its modern default (`conch-2024`) and its first instruction-tuned MLLM (`pathchat-2024`). The weakly-supervised-MIL sub-branch gains its dual-stream variant (`dsmil-2021`) — completing the canonical ABMIL / CLAM / TransMIL / DSMIL benchmark cohort.

If we ingest more slide-level PFMs (PRISM, PANTHER, MADELEINE, TANGLE, THREADS, TITAN, CPath-Omni — all on the queue), formalise a `slide-level-pretraining` method node (currently a deferred hint).

## Generated Skills

6 SKILL.md files following the §12.2 template — Purpose, When to Use, Do Not Use When, Key Contributions, How to Cite, Related Nodes, Failure Modes, Validation Checklist.

## Generated Blog Pages

6 EN Markdown pages with full AlphaXiv structure (Why it matters, Core idea, Inputs and outputs, Datasets / tasks / metrics, Method, Main results, Limitations, How Claude should use, Related nodes, References). Cross-linked densely to existing nodes (uni, ctranspath, plip, clam, transmil, abmil, camelyon16, etc.).

**No `.zh.md` files** — mkdocs-static-i18n's `fallback_to_default: true` means the Chinese site shows the English page until a `.zh.md` is added. Translation pass deferred (will batch with the other 33 Wave 1 papers when those come in).

## Pending References

| missing id | type | first cited in | proposed disposition |
|------------|------|----------------|----------------------|
| `slide-level-pretraining` | method | gigapath-2024 hints | promote to a method node when 2nd slide-level PFM lands (PRISM / TITAN / etc.) |
| `prov-path` | dataset | gigapath-2024 description | internal Providence cohort, descriptive label only |
| `mskcc-virchow-cohort` | dataset | virchow-2024 description | internal, descriptive label only |
| `pathchat-instruction-456k` | dataset | pathchat-2024 description | internal Mahmood Lab corpus, descriptive label only |
| `conch-1-17m` | dataset | conch-2024 description | partly internal, defer until full release status confirmed |
| `tcga-nsclc` | dataset | dsmil-2021 description | descriptive label; defer pending TCGA ingestion |

Plus the persistent deferred-since-cluster1-3 hints (`tcga`, `paip`, `openpath`, `vision-only-pfm`, `mass-100k`, `cnn-patch-classification`). The TCGA / PAIP queue items in the Wave-1 plan from yesterday are still open — agents that were supposed to ingest them hit the spend cap.

## Validation Results

```
$ python scripts/python/validate_schema.py
validating 38 object YAMLs ...
OK: all schemas pass
hint cross-check warnings: 10 unresolved hints (all pre-existing or
slide-level-pretraining placeholder; none blocking)

$ python scripts/python/build_graph.py
wrote knowledge/graph/graph.json: 38 nodes, 129 edges

$ python scripts/python/check_orphans.py
OK: no orphan nodes

$ mkdocs build --strict
Documentation built in 60.40 seconds  (no warnings; both en + zh locales built;
zh pages for the 6 new articles fall back to en — expected)
```

## Warnings

- **6 new pages have no `.zh.md`**. `mkdocs-static-i18n` falls back to English under `/zh/` for those; users will see English content. Schedule a translation batch.
- **`gigapath-2024 → slide-level-pretraining` hint** is intentionally deferred — promoting `slide-level-pretraining` from a string hint to a real method node will happen once we have a second slide-level PFM in the wiki to anchor the sub-branch.
- **CONCH v1.5** is mentioned in `conch-2024.yaml` as a `reusable_components` entry, *not* a separate node. If the user wants a per-checkpoint comparison node, can be added later.
- **Internal datasets** (Prov-Path, MSKCC Virchow cohort, PathChat instruction corpus, CONCH-1.17M) are listed in `technical_focus.datasets` as descriptive labels — they don't and won't become public dataset nodes.
- **Some CHIEF and Virchow numerics** (exact pretraining cohort counts, exact downstream AUCs) are paraphrased from the abstract; precise numbers from the paper body would require reading the PDFs and were not extracted.
- **Earlier 5-agent dispatch failed** (API spend cap reached) — the other 29 Wave-1 papers (TCGA, CPTAC, PAIP, the other 8 patch PFMs, the other 8 slide PFMs, the other 5 VLMs, MIL variants DT-MIL/DTFD-MIL/WiKG, multimodal MCAT/PORPOISE) remain in the queue at `reports/2026-05-19-awesome-list-queue.md` for future incremental ingestion.

## Pre-existing project status

- Graph: **38 nodes / 129 edges** (was 32 / 96).
- New nodes today: 6.
- New edges today: 33.

## Next Suggested Actions

1. **Translation pass** — produce `.zh.md` for the 6 new English-only pages (single agent, one batch).
2. **Resume the Wave-1 queue** in smaller, sequential batches (3-5 papers at a time, tomorrow when daily spend resets):
   - PFM-patch tier 2: Phikon, Lunit-DINO, H-Optimus-0.
   - PFM-slide tier 2: PRISM, PANTHER, TITAN.
   - VLM tier 2: MUSK, Quilt-LLaVA, PathGen.
   - MIL tier 2: DTFD-MIL, DT-MIL, WiKG.
   - Dataset tier: TCGA, CPTAC, PAIP (will resolve long-standing hint warnings).
3. **Promote `slide-level-pretraining`** to a method node once the second slide-level PFM lands.
4. **Update the awesome-list SKILL.md queue** to mark the 6 ingested entries as ✓.
