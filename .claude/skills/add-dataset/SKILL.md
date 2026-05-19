---
name: add-dataset
description: Add a public dataset to the Pathology-Wiki knowledge base. Use when the user provides a dataset homepage / Kaggle / Zenodo / Hugging Face URL or release paper and asks to add a dataset. Captures access info, modalities, organs/diseases, labels, tasks, preprocessing, and known pitfalls. Produces all five mandatory artifacts per CLAUDE.md §2.
---

# Skill: add-dataset

You are ingesting a dataset into the knowledge base.

## Source of truth — read first

**Read [`skills/objects/dataset_ingestion/SKILL.md`](../../../skills/objects/dataset_ingestion/SKILL.md)** for full extraction logic and validation checklist.

Operational rules: [`CLAUDE.md`](../../../CLAUDE.md) §6 (dataset schema), §11.3 (dataset pipeline), §11.6 (missing-reference policy).

## High-level steps

1. **Resolve source** — read the dataset homepage / paper / Kaggle competition / institutional release → `{name, full_name, source_institutions, modalities, organs, diseases, scale, labels, tasks, access}`
2. **Determine access**: public/gated, license (verbatim), `requires_registration`, `download_difficulty` ∈ {easy, medium, hard, gated, unknown}
3. **Extract preprocessing**: required steps, recommended tools, coordinate system, file formats
4. **List known pitfalls** — datasets always have some (label noise, distribution shift, missing magnification metadata, etc.). Surface them honestly.
5. **Write `knowledge/datasets/{id}.yaml`** matching `schemas/dataset.schema.yaml`
6. **Append node + edges** to `knowledge/graph/{nodes,edges}.yaml`. Common edges: `dataset --belongs_to--> organ`, `dataset --belongs_to--> disease`, `dataset --used_by_benchmark--> benchmark`, `dataset --related_to--> tool`
7. **Missing-reference check (CLAUDE.md §11.6)** — STOP and ASK for any cited tool / benchmark / article that lacks a node
8. **Write `content/datasets/{id}.md`** with `{{ dataset("id") }}`, `{{ local_graph("id") }}`, `{{ skill_card("id") }}`. Required sections: what it contains, modalities, organs/diseases, labels, tasks, access, preprocessing, used-by benchmarks, known pitfalls
9. **Add to `mkdocs.yml`** nav under Datasets
10. **Write per-object SKILL.md** at `skills/datasets/{id}/SKILL.md` covering Download, Preprocessing, Label mapping, Splits, Evaluation, Known pitfalls (CLAUDE.md §12.2)
11. **Validate**: `validate_schema.py` → `build_graph.py` → `mkdocs build --strict`
12. **Write report** at `reports/{date}-add-{id}.md`
13. **Commit** referencing the report

## Conventions

- IDs: short canonical name in kebab-case (`tcga-brca`, `panda`, `dlpfc-spatial-transcriptomics`).
- License is captured **verbatim** in `access.license`. Compliance language stays in blog prose (no structured `compliance` block per CLAUDE.md §13).
- Numeric scale fields (`n_slides`, `n_patients`, `n_centers`) accept `unknown`/`not_found`/`to_verify` if you can't confirm.

## Don't

- Don't merge multi-source datasets into one set of stats — list per-source when known (e.g. PANDA has Radboud + Karolinska).
- Don't quote leaderboard numbers without the test-set caveat.
- Don't auto-stub missing benchmarks — ask user.

## Output checklist

- [ ] `knowledge/datasets/{id}.yaml`
- [ ] `nodes.yaml` + `edges.yaml` updated
- [ ] `content/datasets/{id}.md`
- [ ] `mkdocs.yml` nav updated
- [ ] `skills/datasets/{id}/SKILL.md`
- [ ] `known_pitfalls` non-empty
- [ ] `reports/{date}-add-{id}.md`
- [ ] All three validators pass
- [ ] git commit references the report
