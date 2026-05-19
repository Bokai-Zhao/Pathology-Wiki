# 2026-05-19 — cluster2-mil (pre-build for bahadir-2024)

Five-artifact ingestion of the 4 canonical weakly-supervised MIL papers + 4 method nodes (1 parent + 3 variants) that anchor the WSI MIL branch of the Pathology-Wiki method map.

## Added Objects

**Methods (4):**

| id | type | parent |
|----|------|--------|
| `weakly-supervised-mil` | method | — (parent of the cluster) |
| `abmil` | method | weakly-supervised-mil |
| `clam` | method | abmil |
| `transmil` | method | weakly-supervised-mil |

**Articles (4):**

| id | type | source |
|----|------|--------|
| `abmil-2018` | technical_article | Ilse, Tomczak, Welling — ICML 2018 (arXiv:1802.04712) |
| `clam-2021` | technical_article | Lu et al. — Nat Biomed Eng 5:555–570 (DOI 10.1038/s41551-020-00682-w) |
| `transmil-2021` | technical_article | Shao et al. — NeurIPS 2021 (arXiv:2106.00908) |
| `campanella-2019` | technical_article + secondary clinical_article | Campanella et al. — Nat Med 25:1301–1309 (DOI 10.1038/s41591-019-0508-1) |

Each object includes:
- YAML in `knowledge/{methods,articles/technical}/{id}.yaml`
- Markdown page in `content/{methods,articles/technical}/{id}.md`
- `skills/{methods,articles}/{id}/SKILL.md`
- `mkdocs.yml` nav entry

## Updated Objects

- `knowledge/graph/nodes.yaml` — appended 8 node entries (4 methods + 4 articles)
- `knowledge/graph/edges.yaml` — appended 21 new edges
- `mkdocs.yml` — added Articles/Technical entries + Methods nav entries

## Added Graph Edges

21 new edges:

**Method hierarchy (5):**

- `abmil --belongs_to--> weakly-supervised-mil`
- `clam --extends--> abmil`
- `clam --belongs_to--> weakly-supervised-mil`
- `transmil --belongs_to--> weakly-supervised-mil`
- `transmil --extends--> abmil`

**Articles propose methods (4):**

- `abmil-2018 --proposes_method--> abmil`
- `clam-2021 --proposes_method--> clam`
- `transmil-2021 --proposes_method--> transmil`
- `campanella-2019 --proposes_method--> weakly-supervised-mil` (scale-level demonstration of the parent paradigm)

**Article lineage (3):**

- `clam-2021 --extends--> abmil-2018`
- `transmil-2021 --extends--> abmil-2018`
- `transmil-2021 --compares_with--> clam-2021`

**Articles use datasets (4):**

- `abmil-2018 --uses_dataset--> camelyon16`
- `clam-2021 --uses_dataset--> camelyon16`
- `transmil-2021 --uses_dataset--> camelyon16`
- `campanella-2019 --related_to--> camelyon16` (informs Camelyon-style benchmarks; MSKCC cohorts internal)

**Method ↔ PFM bridges (2):**

- `clam --related_to--> pathology-foundation-model`
- `weakly-supervised-mil --related_to--> pathology-foundation-model`

**PANDA hints resolved (3):**

- `panda --related_to--> clam`
- `panda --related_to--> abmil`
- `panda --related_to--> weakly-supervised-mil`

## Updated Taxonomies

The Deep Learning for WSI / Weakly-Supervised MIL branch is now populated with concrete child method nodes. Future MIL variants (DSMIL, DTFD-MIL, SETMIL, graph MIL) can hang off `weakly-supervised-mil` directly.

If we add more MIL variants, formalise the sub-branches (Attention-based MIL / Transformer MIL / Graph MIL) into `knowledge/taxonomies/method_map.yaml`.

## Generated Skills

8 SKILL.md files — 4 method SKILLs + 4 article SKILLs. All follow the §12.2 template.

## Generated Blog Pages

8 Markdown pages — 4 method pages + 4 article pages. All use Jinja macros. Cross-link densely within the cluster and to cluster 1 datasets (camelyon16, panda).

## Pending References

| missing id | type | first cited in | proposed disposition |
|------------|------|----------------|----------------------|
| `cnn-patch-classification` | method | predecessor hints | candidate cluster 3 or 5 |
| `dsmil` | method | sibling mentions in TransMIL ablations | future MIL pass |
| `dtfd-mil` | method | sibling mentions | future MIL pass |
| `setmil` | method | sibling mentions | future MIL pass |
| `clam-repo` | tool | CLAM toolkit reference | future /add-tool pass |
| `mskcc-prostate-internal` etc. | dataset | Campanella 2019 internal cohorts | won't be added — internal data, listed in technical_focus.datasets as descriptive only |

No user decisions deferred this round — sibling references can stay as hints in `related_*` arrays without needing immediate stubs (the warnings are surfaced but not blocking).

## Validation Results

```
$ python scripts/python/validate_schema.py
validating 18 object YAMLs ...
OK: all schemas pass

hint cross-check warnings: 7 unresolved hints (patch-level-ssl /
vision-only-pfm / mass-100k from UNI cluster — pre-existing;
cnn-patch-classification from openslide — will land later)

$ python scripts/python/build_graph.py
wrote knowledge/graph/graph.json: 18 nodes, 32 edges

$ python scripts/python/check_orphans.py
OK: no orphan nodes

$ mkdocs build --strict
Documentation built in 23.18 seconds   (no warnings)
```

## Warnings

- **TransMIL DOI** marked `to_verify` — NeurIPS proceedings papers have no Crossref DOI; cite the arXiv id (2106.00908) and the proceedings URL instead.
- **ABMIL DOI** marked `to_verify` — ICML 2018 proceedings (Ilse 2018a) likewise have no Crossref DOI; use arXiv id (1802.04712).
- **Campanella 2019** internal MSKCC cohorts are referenced in `technical_focus.datasets` as descriptive labels (`mskcc-prostate-internal`, `mskcc-bcc-internal`, `mskcc-breast-axillary-internal`) and intentionally do not become dataset nodes (they're not redistributable).
- **Method `clam` references the toolkit** but no `clam-repo` tool node exists yet — defer to future `/add-tool github.com/mahmoodlab/CLAM`.

## Next Suggested Actions

1. **Cluster 3** (next): `hover-net-2019`, `cellvit-2023`, `ctranspath-2022` — cell/tissue baselines. HoVer-Net + CellViT will gain `uses_dataset --> pannuke` edges, completing the segmentation half.
2. Cluster 4: `clip-2021`, `plip-2023`, `mi-zero-2023` — VLM / vision-language pathology branch.
3. Then `bahadir-2024` ingestion can land with dense edges into clusters 1–4 instead of orphan stubs.
