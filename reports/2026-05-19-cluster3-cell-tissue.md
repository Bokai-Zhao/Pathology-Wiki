# 2026-05-19 — cluster3-cell-tissue (pre-build for bahadir-2024)

Five-artifact ingestion of 3 cell/tissue baselines (HoVer-Net, CellViT, CTransPath) plus 3 supporting method/model nodes. Resolves the PFM SSL ↔ MIL ↔ PanNuke connectivity gap and gives the upcoming Bahadir review pre-existing nodes for nuclei segmentation, cell classification, and pre-UNI SSL pretraining.

## Added Objects

**Methods (3):**

| id | type | parent |
|----|------|--------|
| `patch-level-ssl` | method | pathology-foundation-model |
| `hover-net` | method | — (deep_wsi_learning / nuclei seg) |
| `cellvit` | method | extends hover-net |

**Model (1):**

| id | type | source |
|----|------|--------|
| `ctranspath` | model | released by ctranspath-2022 |

**Articles (3):**

| id | type | source |
|----|------|--------|
| `hover-net-2019` | technical_article | Graham et al. Med Image Anal 58:101563 (DOI 10.1016/j.media.2019.101563) |
| `cellvit-2024` | technical_article | Hörst et al. Med Image Anal 94:103143 (DOI 10.1016/j.media.2024.103143) |
| `ctranspath-2022` | technical_article | Wang et al. Med Image Anal 81:102559 (DOI 10.1016/j.media.2022.102559) |

Each object includes:
- YAML in `knowledge/{methods,models,articles/technical}/{id}.yaml`
- Markdown page in `content/{methods,models,articles/technical}/{id}.md`
- `skills/{methods,models,articles}/{id}/SKILL.md`
- `mkdocs.yml` nav entry under **Articles / Technical**, **Models**, or **Methods**

## Updated Objects

- `knowledge/graph/nodes.yaml` — appended 7 new node entries
- `knowledge/graph/edges.yaml` — appended 16 new edges
- `mkdocs.yml` — Articles / Models / Methods nav extended

## Added Graph Edges

16 new edges:

**Method hierarchy (2):**
- `patch-level-ssl --belongs_to--> pathology-foundation-model`
- `cellvit --extends--> hover-net`

**Articles propose methods / release models (5):**
- `hover-net-2019 --proposes_method--> hover-net`
- `cellvit-2024 --proposes_method--> cellvit`
- `cellvit-2024 --extends--> hover-net-2019`
- `ctranspath-2022 --releases_model--> ctranspath`
- `ctranspath-2022 --proposes_method--> patch-level-ssl`

**Articles use datasets (2):**
- `hover-net-2019 --uses_dataset--> pannuke`
- `cellvit-2024 --uses_dataset--> pannuke`

**Model + PFM relations (2):**
- `ctranspath --belongs_to--> pathology-foundation-model`
- `ctranspath --belongs_to--> patch-level-ssl`

**UNI + CTransPath now bridged (2):**
- `uni --belongs_to--> patch-level-ssl` (resolves the existing patch-level-ssl hint warning on uni)
- `ctranspath --related_to--> uni` (pre-UNI baseline → successor)

**PanNuke ↔ baselines (2):**
- `pannuke --related_to--> hover-net`
- `pannuke --related_to--> cellvit`

**Article lineage (1):**
- `hover-net-2019 --related_to--> cellvit-2024`

## Updated Taxonomies

- The Pathology Foundation Models / Patch-Level SSL sub-branch now has a concrete method node (`patch-level-ssl`) that future PFM models (UNI, GigaPath, Virchow, H-Optimus, Phikon, Lunit-DINO) will link to via `belongs_to`.
- The Deep Learning for WSI / Nuclei Segmentation sub-branch now has two concrete method nodes (`hover-net`, `cellvit`).

If we ingest more PFMs or more cell methods, formalise both sub-branches in `knowledge/taxonomies/method_map.yaml`.

## Generated Skills

7 SKILL.md files — 3 method SKILLs + 1 model SKILL + 3 article SKILLs. All follow the §12.2 template; model SKILL adds Installation / Minimal usage / Standard workflow / Troubleshooting per §12.2 dataset-skill extension pattern.

## Generated Blog Pages

7 Markdown pages: 3 method pages, 1 model page, 3 article pages. Cross-link densely within the cluster and back to {{cluster 1 datasets}} (pannuke) and {{cluster 2 MIL}} (clam, weakly-supervised-mil).

## Pending References

| missing id | type | first cited in | proposed disposition |
|------------|------|----------------|----------------------|
| `tcga` | dataset | ctranspath.yaml related_datasets | future /add-dataset pass (TCGA is a meta-dataset; complex to model — defer until we have a TCGA strategy) |
| `paip` | dataset | ctranspath.yaml related_datasets | future /add-dataset pass |
| `consep`, `kumar`, `cpm` | dataset | hover-net-2019.yaml technical_focus.datasets | only kept as descriptive labels in technical_focus.datasets; not promoted to nodes (small legacy datasets; PanNuke is the modern canonical) |
| `vision-only-pfm` | method | uni hints | still deferred — sub-branch of patch-level-ssl, can be added when needed |
| `mass-100k` | dataset | uni hints | UNI pretraining cohort is internal; deferred indefinitely |
| `cnn-patch-classification` | method | openslide.yaml hints | will land in a future cluster |

User-decision boundary: the TCGA / PAIP nodes are explicit deferrals — we ingest them only when we hit a paper whose primary contribution depends on TCGA-specific labelling. For CTransPath-2022 it's enough to mention them in prose.

## Validation Results

```
$ python scripts/python/validate_schema.py
validating 25 object YAMLs ...
OK: all schemas pass

hint cross-check warnings: 7 unresolved hints (TCGA / PAIP for CTransPath;
vision-only-pfm / mass-100k for UNI; cnn-patch-classification for openslide)

$ python scripts/python/build_graph.py
wrote knowledge/graph/graph.json: 25 nodes, 48 edges

$ python scripts/python/check_orphans.py
OK: no orphan nodes

$ mkdocs build --strict
Documentation built in 28.35 seconds   (no warnings)
```

## Warnings

- **Hörst CellViT preprint year** is 2023, published 2024 — used the **published** id `cellvit-2024` with `cellvit-2023-preprint` in aliases.
- **CTransPath embedding_dim** marked `to_verify` (commonly reported as 768 for Swin-T; verify against repo).
- **CTransPath weights_license** marked `unknown` (verify in repo before redistribution).
- **TCGA + PAIP** referenced in CTransPath YAML as descriptive `pretraining_data` labels and as `related_datasets` hints — these are flagged as unresolved hints; not blocking, no user decision needed this round.
- **HoVer-Net legacy datasets (CoNSeP, Kumar, CPM)** stay in `technical_focus.datasets` as labels (not promoted to graph nodes). Conscious choice — PanNuke is the modern canonical.

## Next Suggested Actions

1. **Cluster 4** (next): `clip-2021`, `plip-2023`, `mi-zero-2023` — vision-language pathology branch. Extends the method map into the D branch.
2. After cluster 4: resume `bahadir-2024` with dense edges into all 4 clusters (16 new pre-built nodes + the 5 originally bootstrapped).
3. Future passes: TCGA, PAIP, CoNSeP datasets; DSMIL, DTFD-MIL, SETMIL MIL variants; GigaPath, Virchow, H-Optimus PFMs; CONCH / MUSK VLMs.
