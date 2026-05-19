# 2026-05-19 — cluster4-vlm (pre-build for bahadir-2024)

Five-artifact ingestion of the 3 canonical pathology vision-language papers (CLIP, PLIP, MI-Zero) plus the parent method node `pathology-vlm` and the PLIP model. Completes the four-cluster pre-build for bahadir-2024.

## Added Objects

**Method (1):**

| id | type | parent |
|----|------|--------|
| `pathology-vlm` | method | — (D branch parent; related_to patch-level-ssl) |

**Model (1):**

| id | type | source |
|----|------|--------|
| `plip` | model | released by plip-2023 |

**Articles (3):**

| id | type | source |
|----|------|--------|
| `clip-2021` | technical_article | Radford et al. ICML 2021 (arXiv 2103.00020) |
| `plip-2023` | technical_article + secondary dataset_article | Huang et al. Nat Med 29:2307-2316 (DOI 10.1038/s41591-023-02504-3) |
| `mi-zero-2023` | technical_article | Lu et al. CVPR 2023 pp 19764-19775 (DOI 10.1109/CVPR52729.2023.01893) |

Each object includes:
- YAML in `knowledge/{methods,models,articles/technical}/{id}.yaml`
- Markdown page in `content/{methods,models,articles/technical}/{id}.md`
- `skills/{methods,models,articles}/{id}/SKILL.md`
- `mkdocs.yml` nav entry under **Articles / Technical**, **Models**, or **Methods**

## Updated Objects

- `knowledge/graph/nodes.yaml` — appended 5 new node entries
- `knowledge/graph/edges.yaml` — appended 11 new edges
- `mkdocs.yml` — nav extended

## Added Graph Edges

11 new edges:

**Method hierarchy (1):**
- `pathology-vlm --related_to--> patch-level-ssl` (architectural origin)

**Articles propose methods / release models (5):**
- `clip-2021 --related_to--> pathology-vlm` (architectural precedent)
- `plip-2023 --proposes_method--> pathology-vlm`
- `plip-2023 --releases_model--> plip`
- `plip-2023 --extends--> clip-2021`
- `mi-zero-2023 --extends--> pathology-vlm` (slide-level lift)
- `mi-zero-2023 --related_to--> weakly-supervised-mil` (borrows MIL aggregation)
- `mi-zero-2023 --related_to--> plip-2023`

**Model relations (2):**
- `plip --belongs_to--> pathology-vlm`
- `plip --extends--> clip-2021`

**Cross-cluster (1):**
- `plip-2023 --uses_dataset--> pannuke`

## Updated Taxonomies

- The Pathology Vision-Language Models / Pathology VLMs branch (D in the method map) now has a concrete parent method node + a representative model + 3 anchoring articles.
- Future VL ingestion (CONCH, QuiltNet, MUSK, PathChat) hangs off `pathology-vlm` via `belongs_to`.

If we ingest more VL models, formalise the D-branch sub-nodes (Image-Text Contrastive / Report Alignment / Histology Captioning / Pathology VQA / Retrieval-Augmented Reasoning / Slide-Level VL) into `knowledge/taxonomies/method_map.yaml`.

## Generated Skills

5 SKILL.md files — 1 method + 1 model + 3 articles. All follow the §12.2 template; PLIP model SKILL adds Installation / Minimal usage / Troubleshooting per the model-skill extension pattern.

## Generated Blog Pages

5 Markdown pages with dense cross-links into clusters 1–3 (pannuke → PLIP eval; weakly-supervised-mil → MI-Zero borrowing; patch-level-ssl → pathology-vlm architectural origin).

## Pending References

| missing id | type | first cited in | proposed disposition |
|------------|------|----------------|----------------------|
| `openpath` | dataset | plip-2023 + plip | future /add-dataset pass (Twitter-mined image-caption corpus — open on HF; would be a small but meaningful dataset node) |
| `kather-crc` | dataset | plip-2023 descriptive | descriptive label only |
| `tcga-nsclc`, `tcga-rcc`, `tcga-brca` | dataset | mi-zero-2023 descriptive | descriptive labels; defer until we model TCGA cohorts as datasets |

The OpenPath corpus is a strong candidate for a future independent /add-dataset call — it's the most influential pathology image-caption corpus and has clean access through Hugging Face.

## Validation Results

```
$ python scripts/python/validate_schema.py
validating 30 object YAMLs ...
OK: all schemas pass

hint cross-check warnings: 9 unresolved hints (TCGA / PAIP / OpenPath /
mass-100k / vision-only-pfm / cnn-patch-classification — all known
deferrals)

$ python scripts/python/build_graph.py
wrote knowledge/graph/graph.json: 30 nodes, 59 edges

$ python scripts/python/check_orphans.py
OK: no orphan nodes

$ mkdocs build --strict
Documentation built in 38.40 seconds   (no warnings)
```

## Warnings

- **CLIP DOI** is arXiv-only (10.48550/arXiv.2103.00020); ICML proceedings has no separate DOI.
- **MI-Zero DOI** is the IEEE-CVPR DOI (10.1109/CVPR52729.2023.01893); also has arXiv 2306.07831.
- **PLIP backbone & embedding dim** marked `to_verify` — confirm against Hugging Face model card before downstream use.
- **OpenPath** referenced but not promoted to a graph node yet — a strong candidate for the next /add-dataset call.
- **PLIP-2023 secondary type** is `dataset_article` because the paper releases the OpenPath corpus alongside the model.

## Pre-build summary across all 4 clusters

| | Cluster 1 | Cluster 2 | Cluster 3 | Cluster 4 | **Total** |
|--|-----------|-----------|-----------|-----------|-----------|
| New nodes | 5 | 8 | 7 | 5 | **25** |
| New edges | 7 | 21 | 16 | 11 | **55** |
| New articles | 0 | 4 | 3 | 3 | **10** |
| New methods | 0 | 4 | 3 | 1 | **8** |
| New models | 0 | 0 | 1 | 1 | **2** |
| New datasets | 5 | 0 | 0 | 0 | **5** |
| Reports | 1 | 1 | 1 | 1 | **4** |
| Commits | 1 | 1 | 1 | 1 | **4** |

Combined with the bootstrap 5 nodes (uni-2024, uni, openslide, panda, pathology-foundation-model), the graph now has **30 nodes, 59 edges, zero orphans**.

## Next Suggested Actions

1. **Resume `bahadir-2024` ingestion** — write the YAML, append the node + edges to all 4 clusters, write the MD page + SKILL.md, validate, and commit.
2. After bahadir-2024 is in: the graph will have a `review_article` node with the richest local-graph fan-out in the project so far (likely 15+ outgoing edges into clusters 1–4).
3. Future deferred work: OpenPath, TCGA/PAIP/CoNSeP/Kumar/CPM datasets; CONCH / QuiltNet / MUSK VLMs; GigaPath / Virchow / H-Optimus PFMs; DSMIL / DTFD-MIL / SETMIL MIL variants.
