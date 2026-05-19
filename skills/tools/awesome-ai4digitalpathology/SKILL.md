# Skill: tool — Awesome-AI4DigitalPathology

## Purpose
Community-curated reference index of ~447 AI-for-digital-pathology entries across 16 sub-topics. Pathology-Wiki uses it as a discovery / queue source for `/add-article` ingestion.

## When to Use
- User asks "what's a recent X for pathology?" — browse the matching section.
- Building a Pathology-Wiki ingestion queue across a sub-area.
- Cross-checking that a candidate paper has community traction.
- Surveying what's new in any of: PFMs, VLMs, MIL, datasets, generative pathology, etc.

## Do Not Use When
- Need primary-source detail on a specific paper — read the paper itself.
- Need licence / install / runtime usage of a tool — this is an index, not a runnable tool.
- Need exhaustive coverage — community lists are curated, not complete.

## Standard Workflow
1. Browse the upstream README at <https://github.com/lingxitong/Awesome-AI4DigitalPathology/blob/main/README.md>.
2. Identify entries that fill structural gaps in Pathology-Wiki (consult the queue below + the master report).
3. Run `/add-article {url|doi|arxiv}` per paper — never bulk-stub from this list.
4. Update the queue (this file + `reports/2026-05-19-awesome-list-queue.md`) when an entry is ingested or de-prioritised.

## Decision Rules
- **Priority order**: foundational PFMs (slide-level + patch-level) → VLMs → MIL variants → datasets → multimodal → segmentation → cytology / registration → niche.
- **Skip** entries whose primary contribution is a one-off clinical application without methodological novelty (already well-represented).
- **Skip** entries from "Future Trends" — speculation, not actionable nodes.
- **Re-snapshot** the upstream README every 1–2 months if active ingestion is happening.

## Pending Queue (Wave 1 — highest priority)

The following 39 entries are tagged for the next ingestion waves. After Wave 1 is complete, mark each entry as ✓ in this list.

### Slide-Level Foundation Models (9)
- Prov-GigaPath — <https://www.nature.com/articles/s41586-024-07441-w>
- CHIEF — <https://www.nature.com/articles/s41586-024-07894-z>
- PANTHER — <https://arxiv.org/abs/2405.11643>
- TANGLE — <https://arxiv.org/abs/2405.11618>
- PRISM — <https://arxiv.org/abs/2405.10254>
- CPath-Omni — <https://openaccess.thecvf.com/content/CVPR2025/html/Sun_CPath-Omni_A_Unified_Multimodal_Foundation_Model_for_Patch_and_Whole_CVPR_2025_paper.html>
- MADELEINE — <https://link.springer.com/chapter/10.1007/978-3-031-73414-4_2>
- TITAN — <https://www.nature.com/articles/s41591-025-03982-3>
- THREADS — <https://arxiv.org/abs/2501.16652>

### Patch-Level Foundation Models (9)
- Lunit-DINO — <https://arxiv.org/abs/2212.04690>
- Phikon — <https://arxiv.org/abs/2309.16864>
- Virchow — <https://www.nature.com/articles/s41591-024-03141-0>
- Virchow2 — <https://arxiv.org/abs/2408.00738>
- Phikon-v2 — <https://arxiv.org/abs/2409.09173>
- H-Optimus-0 — <https://huggingface.co/bioptimus/H-optimus-0>
- H-Optimus-1 — <https://huggingface.co/bioptimus/H-optimus-1>
- BEPH — <https://www.nature.com/articles/s41467-025-57587-y>
- MUSK — <https://www.nature.com/articles/s41586-024-08437-2> (overlaps VLM)

### Vision-Language Models / Pathology Agents (9)
- CONCH — <https://www.nature.com/articles/s41591-024-02856-4>
- CONCH v1.5 — <https://huggingface.co/MahmoodLab/conchv1_5>
- PathChat — <https://www.nature.com/articles/s41586-024-07618-3>
- Quilt-LLaVA — <https://openaccess.thecvf.com/content/CVPR2024/html/Seyfioglu_Quilt-LLaVA_Visual_Instruction_Tuning_by_Extracting_Localized_Narratives_from_Open-Source_CVPR_2024_paper.html>
- PathAsst / PathCLIP — <https://ojs.aaai.org/index.php/AAAI/article/view/28308>
- WSI-VQA — <https://arxiv.org/abs/2407.05603>
- PathGen-1.6M — <https://openreview.net/forum?id=rFpZnn11gj>
- PathGen-CLIP — same paper as PathGen-1.6M
- PathGen-LLaVA — same paper as PathGen-1.6M

### MIL Variants (4)
- DSMIL — <https://arxiv.org/abs/2011.08939>
- DT-MIL — <https://link.springer.com/chapter/10.1007/978-3-030-87240-3_34>
- DTFD-MIL — <https://openaccess.thecvf.com/content/CVPR2022/html/Zhang_DTFD-MIL_Double-Tier_Feature_Distillation_Multiple_Instance_Learning_for_Histopathology_Whole_CVPR_2022_paper.html>
- WiKG — <https://arxiv.org/abs/2403.07719>

### Multimodal (2)
- MCAT — <https://link.springer.com/chapter/10.1007/978-3-030-87240-3_30>
- PORPOISE — <https://doi.org/10.1016/j.ccell.2022.07.004>

### Datasets / Toolkits (5)
- TCGA — <https://portal.gdc.cancer.gov/>
- CPTAC — <https://proteomics.cancer.gov/programs/cptac>
- TCGA-TIL Maps — <https://www.cell.com/cell-reports/fulltext/S2211-1247(18)30447-9>
- PAIP — <https://www.sciencedirect.com/science/article/pii/S1361841520301341>
- TCGA Processing Pipeline for MIL — <https://github.com/liupei101/Pipeline-Processing-TCGA-Slides>

## Pending Queue (Pending High — for later waves)

The full categorised queue lives at [`reports/2026-05-19-awesome-list-queue.md`](https://github.com/Bokai-Zhao/Pathology-Wiki/blob/main/reports/2026-05-19-awesome-list-queue.md). It contains:

- **Pending high (~80 entries)** — score 2: PFM / VLM / MIL variants beyond Wave 1, plus all surveys.
- **Pending medium (~140 entries)** — score 1: datasets, segmentation methods, generative models, toolkits.
- **Pending low (~190 entries)** — score 0: niche cytology, registration, federated learning specifics, and clinical-application papers.

Rather than re-list them here, query the report directly when picking the next ingestion target.

## Inputs Claude Needs
- The user's intent: "find me a recent X" vs "ingest paper X" vs "list everything in section Y".
- For ingestion: a specific URL or DOI from the queue.

## Outputs
- A pointer (URL + name) to the relevant entry/entries.
- For ingestion calls, the standard `/add-article` five-artifact pipeline output.

## Related Nodes
- review article on the field: `bahadir-2024`
- exemplar nodes already covered by the list: `uni`, `ctranspath`, `plip`, `clam`, `hover-net`, `cellvit`, `camelyon16`, `panda`, `pannuke`
- companion queue report: `reports/2026-05-19-awesome-list-queue.md`

## Failure Modes
- Bulk-stubbing many entries from this list — violates the "no orphan nodes" rule and the five-artifact rule. Run `/add-article` per item.
- Citing entries without reading the underlying paper — annotations are short blurbs, not authoritative.
- Treating the list as exhaustive — many recent niche papers are not yet indexed.
- Forgetting to re-snapshot — the upstream README updates independently; if active ingestion is ongoing, refresh the queue every 1–2 months.

## Validation Checklist
- [ ] User's discovery intent confirmed before bulk action
- [ ] Each ingested item went through `/add-article` (not a bare stub)
- [ ] Queue updated (this file or report) when items are ingested
- [ ] Snapshot date noted when re-mining
