# 2026-05-19 — cluster1-datasets (pre-build for bahadir-2024)

Five-artifact ingestion of 5 foundational WSI public datasets cited heavily by Bahadir et al. 2024 (`bahadir-2024`, deferred). Done as Cluster 1 of a 4-cluster batch so that Bahadir's incoming edges land on real nodes instead of stubs.

## Added Objects

| id | type | source |
|----|------|--------|
| `camelyon16` | dataset | Bejnordi et al. JAMA 2017 challenge (DOI to verify) |
| `bach` | dataset | Aresta et al. Med Image Anal 2019 (ICIAR 2018 challenge) |
| `glas` | dataset | Sirinukunwattana et al. Med Image Anal 2017 (MICCAI 2015 challenge) |
| `pannuke` | dataset | Gamper et al. arXiv 2003.10778 (2020) |
| `midog` | dataset | Aubreville et al. Med Image Anal 84:102699 (2023) |

Each object includes:
- `knowledge/datasets/{id}.yaml` (schema-valid)
- `content/datasets/{id}.md` (AlphaXiv-style page with `{{ dataset(id) }}`, `{{ local_graph(id) }}`, `{{ skill_card(id) }}`)
- `skills/datasets/{id}/SKILL.md` (full SKILL template incl. Download, Preprocessing, Splits, Evaluation, Known pitfalls)
- `mkdocs.yml` nav entry under **Datasets**

## Updated Objects

None — this is a pure addition pass.

## Added Graph Edges

`knowledge/graph/edges.yaml` gained 6 edges:

| from | type | to | confidence |
|------|------|----|-----------|
| `camelyon16` | `related_to` | `openslide` | high |
| `bach` | `related_to` | `openslide` | medium |
| `midog` | `related_to` | `openslide` | high |
| `pathology-foundation-model` | `related_to` | `camelyon16` | high |
| `pathology-foundation-model` | `related_to` | `pannuke` | medium |
| `panda` | `related_to` | `camelyon16` | medium |
| `glas` | `related_to` | `pannuke` | high |

All datasets now have ≥ 1 edge — no orphan nodes.

## Updated Taxonomies

None this cluster. The `Datasets` taxonomy path is implicit in node `taxonomy_path` fields (`Datasets / WSI Classification`, `Datasets / Breast Histology`, `Datasets / Segmentation`, `Datasets / Nuclei`, `Datasets / Mitosis Detection`). If we add many more datasets, formalise these into `knowledge/taxonomies/dataset_taxonomy.yaml`.

## Generated Skills

5 dataset-specific SKILL.md files (see Added Objects table). All follow the SKILL template from CLAUDE.md §12.2, plus the dataset-specific Download / Preprocessing / Splits / Evaluation / Known pitfalls additions.

## Generated Blog Pages

5 Markdown pages under `content/datasets/`. All use Jinja macros; no React / JSX. All link back to {{ node_link("openslide") }} where relevant.

## Pending References

Deferred per CLAUDE.md §11.6 — surfaced here so the user can decide later:

| missing id | type | first cited in | proposed disposition |
|------------|------|----------------|----------------------|
| `bejnordi-2017-camelyon16` | technical_article | `camelyon16.yaml` | will be created when /add-article is run on the JAMA 2017 challenge paper |
| `aresta-2019-bach` | technical_article | `bach.yaml` | likewise |
| `sirinukunwattana-2017-glas` | technical_article | `glas.yaml` | likewise |
| `gamper-2020-pannuke` | technical_article | `pannuke.yaml` | likewise |
| `aubreville-2023-midog` | technical_article | `midog.yaml` | likewise |
| `weakly-supervised-mil` | method | hints | will land in cluster 2 (ABMIL / CLAM / TransMIL / Campanella 2019) |
| `clam` (method node) | method | `panda` hints | cluster 2 |
| `abmil` (method node) | method | `panda` hints | cluster 2 |

All datasets currently have only release-paper article references deferred. The graph topology around them (tools, methods, companion datasets) is in place.

## Validation Results

```
$ python scripts/python/validate_schema.py
validating 10 object YAMLs ...
OK: all schemas pass

hint cross-check warnings: 12 unresolved hints (all flagged above as
expected — will resolve as clusters 2 / 3 / 4 land)

$ python scripts/python/build_graph.py
wrote knowledge/graph/graph.json: 10 nodes, 11 edges

$ python scripts/python/check_orphans.py
OK: no orphan nodes

$ mkdocs build --strict
Documentation built in 6.86 seconds   (no warnings)
```

## Warnings

- **Metadata confidence: medium** for all five datasets. Slide counts, file sizes, n_centers, and exact license URLs are marked `to_verify` in YAML. They should be cross-checked against the release paper or challenge page when the corresponding article nodes are ingested.
- **Article nodes missing** for all five release papers (see Pending References). The dataset pages cite the papers in prose but cannot link to internal nodes yet.
- **No `weakly-supervised-mil` parent method node** — Cluster 2 will introduce it via the ABMIL / CLAM / TransMIL / Campanella 2019 ingestion.
- All datasets have `claude.update_status: complete` based on the dataset itself, even though linkages will continue to grow.

## Next Suggested Actions

1. Cluster 2: `abmil-2018`, `clam-2021`, `transmil-2021`, `campanella-2019` — the four canonical weakly-supervised MIL papers. Each will become both an article node and (where applicable) a method node, allowing `panda`, `camelyon16` etc. to gain proper `evaluated_by` / `used_by_articles` edges.
2. Cluster 3: `hover-net-2019`, `cellvit-2023`, `ctranspath-2022` — pair with `pannuke` (HoVer-Net, CellViT) and the PFM track (CTransPath).
3. Cluster 4: `clip-2021`, `plip-2023`, `mi-zero-2023` — extends the method map into the D branch (vision-language PFMs).
4. Then resume `bahadir-2024` with dense edges into all of the above.
