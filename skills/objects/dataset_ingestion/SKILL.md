# Skill: dataset_ingestion

## Purpose
Add a dataset to the knowledge base with access info, preprocessing, label semantics, and benchmark linkage.

## When to Use
- `/add_dataset {url}` or "add TCGA / PANDA / DLPFC"
- A `dataset_article` is being ingested (creates twin dataset node)

## Do Not Use When
- The "dataset" is a single-paper internal cohort with no public access path (record as a cohort note in the article instead)
- The resource is primarily a benchmark (use `benchmark_builder`)

## Inputs
- Dataset homepage / Kaggle / Zenodo / Hugging Face / paper / institutional release page

## Outputs
- `knowledge/datasets/{id}.yaml`
- `content/datasets/{id}.mdx`
- `skills/datasets/{id}/SKILL.md`
- Graph node + edges: `dataset --has_code--> tool`, `dataset --used_by_benchmark--> benchmark`, `dataset --belongs_to--> organ/disease`

## Standard Workflow
1. Run `dataset_page_adapter` → name, source institution(s), modalities, organs, diseases, scale, labels, access info.
2. Determine `access`: public/gated, license, registration required, download difficulty.
3. Extract `preprocessing.required_steps` and `recommended_tools`.
4. Capture `labels` precisely with `grading_system` reference if applicable.
5. Note `known_pitfalls` (label noise, slide format quirks, missing magnification metadata, distribution shift).
6. Link to articles that release/use it (`used_by_articles`), benchmarks that score it.
7. Apply missing-reference policy for related tools / benchmarks.

## Decision Rules
- License is captured verbatim in `access.license`. Compliance language for MVP is in the blog prose only — no structured `compliance` block (CLAUDE.md §13).
- Slide count vs patient count vs patch count: record what is published, mark others `unknown`.
- If tasks cover multiple labels (e.g. PANDA: ISUP grade + Gleason patterns), list them all.

## Related Nodes
- skills: `dataset_page_adapter`, `alphaxiv_blog_writer`, `benchmark_builder`
- taxonomies: `clinical_map.yaml`, `modality_map.yaml`

## Related Skills
- `tool_ingestion` (for the recommended preprocessing tool)
- `clinical_article_ingestion` (for the clinical motivation paper)

## Failure Modes
- Two source institutions disagreeing on label conventions (e.g. Radboud vs Karolinska in PANDA) → record both, document the harmonisation if known.
- `n_slides` vs `n_patients` mixed in source docs → record what's stated, mark uncertain.
- License changes over time (Kaggle TOS updates) → record the version we observed.

## Examples
- PANDA → modality h-and-e, organ prostate, disease prostate-cancer, labels [isup-grade, gleason-pattern], grading_system [isup-grade, gleason], access via Kaggle.
- DLPFC (10x Visium) → modality 10x-visium, organ brain, tasks spatial-domain-identification.

## Validation Checklist
- [ ] YAML matches `dataset.schema.yaml`
- [ ] `access.license` and `access.access_url` set (or `unknown`)
- [ ] `tasks` and `labels` non-empty
- [ ] `known_pitfalls` non-empty (datasets always have some)
- [ ] At least one organ + disease tag
