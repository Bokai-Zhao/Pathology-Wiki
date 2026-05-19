# 2026-05-20 — wave1-batch-b (Awesome-AI4DigitalPathology continued)

Second wave from the Awesome-AI4DigitalPathology queue. Ten more papers full-five-artifact ingested directly in the main agent (the user opted against a one-page catalog dump and prefers ongoing per-paper "全五件" ingestion across multiple sessions).

After this batch, **16 of the 39 Wave-1 high-priority papers** are now in the wiki (6 from batch A on 2026-05-19 + 10 from batch B today). 23 high-priority + ~330 lower-priority remain in `reports/2026-05-19-awesome-list-queue.md`.

## Added Objects (10)

| id | type | source |
|----|------|--------|
| `titan-2025` | technical_article | Ding et al. *Nat Med* 31:3749–3761 (DOI 10.1038/s41591-025-03982-3) — first multimodal whole-slide PFM |
| `prism-2024` | technical_article | Shaikovski et al. arXiv:2405.10254 (Paige.AI) — multimodal generative slide PFM |
| `madeleine-2024` | technical_article | Jaume et al. *ECCV 2024* (DOI 10.1007/978-3-031-73414-4_2) — multistain slide PFM |
| `tangle-2024` | technical_article | Jaume et al. *CVPR 2024* (arXiv:2405.11618) — transcriptomics-guided slide PFM |
| `porpoise-2022` | technical_article + clinical | Chen et al. *Cancer Cell* 40:865–878 (DOI 10.1016/j.ccell.2022.07.004) — pan-cancer multimodal survival |
| `dtfd-mil-2022` | technical_article | Zhang et al. *CVPR 2022* (DOI 10.1109/CVPR52688.2022.01824) — pseudo-bag MIL |
| `lunit-dino-2022` | technical_article + benchmark | Kang et al. arXiv:2212.04690 (CVPR 2023) — pathology SSL benchmark |
| `phikon-2023` | technical_article | Filiot et al. *medRxiv* 2023.07.21.23292757 — Owkin iBOT pathology PFM |
| `dt-mil-2021` | technical_article | Li et al. *MICCAI 2021* — deformable Transformer MIL |
| `mcat-2021` | technical_article | Chen et al. *ICCV 2021* — multimodal co-attention transformer |

Each gets:
- YAML in `knowledge/articles/technical/{id}.yaml`
- Markdown page in `content/articles/technical/{id}.md` (EN; ZH falls back via mkdocs-static-i18n)
- `skills/articles/{id}/SKILL.md`
- `mkdocs.yml` nav entry
- Graph node + edges

## Updated Objects

- `nodes.yaml`: appended 10 new nodes
- `edges.yaml`: appended 52 new edges
- `mkdocs.yml`: 10 new nav lines

## Added Graph Edges (52)

**Method hierarchy (16):** All 10 papers `belongs_to` `pathology-foundation-model` / `weakly-supervised-mil` / `pathology-vlm` (where applicable) + `patch-level-ssl` for SSL-pretrained ones.

**Lineage / extends (10):**
- `titan-2025 → conch-2024` (extends, CONCH-style patch encoder)
- `prism-2024 → virchow-2024` (extends, Virchow patch encoder reused)
- `madeleine-2024 → conch-2024` (extends)
- `porpoise-2022 → clam-2021` (extends, MIL pipeline)
- `porpoise-2022 → mcat-2021` (extends, immediate predecessor)
- `dtfd-mil-2022 → abmil-2018` (extends)
- `dt-mil-2021 → abmil-2018` (extends)
- `mcat-2021 → clam-2021` (extends)
- `phikon-2023 → uni-2024` (related_to — UNI supersedes)
- `lunit-dino-2022 → uni-2024` (related_to — UNI scales DINO recipe)

**Cross-comparisons (16):** Most papers `compares_with` peers in the same family (e.g. titan↔gigapath/virchow/chief, prism↔titan, dtfd-mil↔clam/transmil/dsmil, lunit-dino↔ctranspath, phikon↔ctranspath/lunit-dino, dt-mil↔transmil, tangle↔titan/madeleine).

**Datasets (4):** dtfd-mil-2022, dt-mil-2021 → camelyon16; awesome-list cross-references.

**Awesome-list cross-refs (10):** `awesome-ai4digitalpathology → {each-of-10}` (related_to).

**Other (2):** `panda → dtfd-mil-2022` (related_to MIL aggregator).

## Graph state

| | Before today | After Wave 1 batch A | After Wave 1 batch B |
|--|--------------|---------------------|---------------------|
| Nodes | 32 | 38 | **48** |
| Edges | 96 | 129 | **181** |

48 nodes / 181 edges total. No orphans. Strict build clean both locales.

## Pending References

| missing id | type | first cited in | proposed disposition |
|------------|------|----------------|----------------------|
| `tcga` | dataset | tangle-2024, mcat-2021, porpoise-2022, phikon-2023 (all reference TCGA cohorts) | Long-overdue ingestion. **Strong candidate for next wave.** |
| `tulip` | dataset | lunit-dino-2022 | Lunit-internal — descriptive label only |
| `multimodal-pathology-ai` | method | porpoise-2022, mcat-2021 hints | promote to method node when 3rd multimodal paper lands (could happen with Vanguri or HACT-Net later) |
| `slide-level-pretraining` | method | titan/prism/madeleine/tangle hints | promote now since 7+ slide-level PFMs in the wiki |

## Validation Results

```
$ python scripts/python/validate_schema.py
validating 48 object YAMLs ...
OK: all schemas pass

$ python scripts/python/build_graph.py
wrote knowledge/graph/graph.json: 48 nodes, 181 edges

$ python scripts/python/check_orphans.py
OK: no orphan nodes

$ mkdocs build --strict
Documentation built in 57.01 seconds  (no warnings; both en + zh)
```

## Warnings

- **DOIs marked `to_verify`** for DT-MIL (Springer LNCS chapter not resolved by Crossref direct lookup) and MCAT (IEEE-CVF ICCV 2021 proceedings DOI ambiguous). Both papers are well-known; using their canonical names + author attributions plus arXiv-only URLs where applicable.
- **Phikon abstract** paraphrased from medRxiv; details on iBOT recipe + cohort scale taken from the paper / model card.
- **TITAN / PRISM / MADELEINE** evaluation cohorts are partly internal to Mahmood Lab / Paige.AI; reproducibility caveats noted in each YAML.
- **All 10 new pages have no `.zh.md`** — Chinese fallback to English is acceptable per i18n config.
- **Internal-cohort dataset labels** (mahmood-titan-internal-cohort, mskcc-prism-internal, mahmood-multistain-internal) are kept as descriptive `technical_focus.datasets` strings, not promoted to graph nodes.

## Next Suggested Actions

1. **Promote `slide-level-pretraining` to a method node** — 7 slide-level PFMs now exist (gigapath, chief, prism, titan, madeleine, tangle + the patch-level ones extending to slide).
2. **Ingest TCGA + CPTAC + PAIP** as dataset nodes — this would resolve a half-dozen long-standing hint warnings.
3. **Translation pass** — 16 new English-only pages from batches A+B; queue with the next ZH batch when convenient.
4. **Continue Wave 1**: H-Optimus-0/1, Virchow2, Phikon-v2, BEPH, MUSK, CPath-Omni, THREADS, Quilt-LLaVA, PathAsst/PathCLIP, WSI-VQA, PathGen, WiKG. Next session.
