# Skill: technical_article_ingestion

## Purpose
Extract technical-focus fields from an article that primarily proposes or evaluates an algorithm, model, training scheme, dataset, or benchmark.

## When to Use
- `article_classifier` returns `technical_article` as primary
- Paper releases a model, foundation model, VLM, MIL aggregator, training recipe, benchmark, or library

## Do Not Use When
- Paper is purely clinical (use `clinical_article_ingestion`)
- Paper is a domain review without new method (use `review_article_ingestion`)

## Inputs
- Source-adapter output
- Article id

## Outputs
- `knowledge/articles/technical/{id}.yaml` populated with `technical_focus`
- Companion `model` / `tool` / `dataset` / `benchmark` nodes if the article releases one
- Edges: `proposes_method`, `releases_model`, `uses_dataset`, `evaluates_task`, `uses_metric`, `compares_with`, `has_code`

## Standard Workflow
1. Identify primary contribution: method / model / training scheme / dataset / benchmark / pipeline.
2. Extract `technical_focus`:
   - `method_family`, `model_architecture`, `training_strategy`, `supervision_type`
   - `input_type`, `output_type`
   - `datasets`, `metrics`, `baselines`
   - `implementation`, `reproducibility`, `limitations`, `reusable_components`
3. **If paper releases a model**: create a `model` node (`knowledge/models/{id}.yaml`) with `released_in_article: {article_id}` and edge `article --releases_model--> model`.
4. **If paper releases a dataset**: create a `dataset` node, set `dataset_article` as secondary type on the article.
5. **If paper releases a benchmark**: create a `benchmark` node, set `benchmark_article` as secondary type.
6. Position in `method_map.yaml`; if a new method emerges, route via `taxonomy_updater`.
7. Apply missing-reference policy (CLAUDE.md §11.6) for any cited dataset/method/model that lacks a node.

## Decision Rules
- `method_family` keys should match `method_map.yaml` enums (e.g. `pathology_foundation_model`, `weakly_supervised_mil`).
- `metrics` should match `task_map.yaml` / standard names (auc, c-index, ari, nmi, etc.). Unrecognised metric → mark and propose taxonomy update.
- `reproducibility` rates the paper, not your faith: `excellent` only if checkpoints + code + train data are all open.

## Related Nodes
- skills: `article_ingestion`, `tool_ingestion`, `dataset_ingestion`, `method_mapping`, `model_card_builder`, `benchmark_builder`
- taxonomies: `method_map.yaml`, `task_map.yaml`, `modality_map.yaml`

## Related Skills
- `clinical_article_ingestion` for clinical contributions in the same paper
- `alphaxiv_blog_writer`

## Failure Modes
- Embedding dimension / parameter count not stated → mark `to_verify`.
- Pretraining corpus described qualitatively only → store qualitative description in `training_strategy`, mark numeric fields `unknown`.
- Open-weights status ambiguous → set `weights_access: gated` and explain in tool/model `claude.do_not_use_when`.

## Examples
- UNI paper: model = ViT-L/16 + DINOv2 SSL, pretrain on Mass-100K, releases `uni` model → emits article + model nodes.
- TransMIL paper: proposes a new MIL aggregator → method node + article node.

## Validation Checklist
- [ ] `article_type.primary == technical_article`
- [ ] `technical_focus.method_family` non-empty and matches taxonomy
- [ ] If a model is released, a `model` node exists and `releases_model` edge is in `edges.yaml`
- [ ] If code is open, `links.code` is set
- [ ] No fabricated benchmark numbers
