# Skill: taxonomy_updater

## Purpose
Update `knowledge/taxonomies/*.yaml` when a new object introduces a method / task / disease / fusion-pair / clinical category not yet covered.

## When to Use
- A new technical article proposes a method that doesn't fit any leaf in `method_map.yaml`
- A new dataset uses a label / grading system absent from `clinical_map.yaml`
- A new benchmark covers a metric not in `task_map.yaml`
- An object's `claude.update_level == taxonomy_update`

## Do Not Use When
- The new term is a synonym of an existing leaf — add to `aliases` on the existing node instead
- The term is too narrow to deserve a leaf (one paper only) — wait for a second citation

## Inputs
- Proposed term (id + label)
- Parent branch in the relevant taxonomy
- Evidence: 1–3 articles that justify the new branch

## Outputs
- Patched taxonomy YAML
- Edge `article --updates_taxonomy--> taxonomy_node` in `edges.yaml`
- A note in the update report under `## Updated Taxonomies`

## Standard Workflow
1. Identify which taxonomy file to edit:
   - method → `method_map.yaml`
   - task → `task_map.yaml`
   - modality → `modality_map.yaml`
   - clinical (organ/disease/biomarker/grading/endpoint) → `clinical_map.yaml`
   - fusion strategy or pair → `multimodal_fusion_map.yaml`
2. Add the new id under the right parent branch.
3. If a new top-level branch is needed (rare), discuss with user first — the 8 method-map branches are stable.
4. For methods, also update `method.schema.yaml` `stage` enum if necessary.
5. Append `updates_taxonomy` edge from the triggering article(s).

## Decision Rules
- Prefer narrowest correct parent. If unsure, place under `pathology_foundation_model` for vision PFMs; under `pathology_vlm` for VLMs; under `multimodal_pathology_ai` for cross-modal fusion.
- A new id is kebab-case and reads as the branch label (e.g. `multi-scale-pretraining`, not `multi_scale_pretrain`).
- When two names compete (e.g. `slide-level-pretraining` vs `wsi-level-pretraining`), pick one and add the other as alias on the resulting node.

## Related Nodes
- skills: `method_mapping`, `graph_builder`
- taxonomies: all five `knowledge/taxonomies/*.yaml`

## Failure Modes
- Taxonomy bloat → reject leaves with single-paper support unless the user asks for a stub.
- Conflicting parents (a method cited as both PFM and VLM) → list both stages on the method node, but the taxonomy entry lives under one canonical branch.

## Examples
- Adding `slide-level-pretraining` (new leaf under `pathology_foundation_model`) when GigaPath / Prov-GigaPath introduces it.
- Adding `isup-grade` to `grading_systems` after PANDA dataset ingestion.

## Validation Checklist
- [ ] New id is kebab-case
- [ ] Placed under correct parent branch
- [ ] If method, `method.schema.yaml` enum updated (only if a new top-level stage was added)
- [ ] `updates_taxonomy` edge present
- [ ] Update report lists the change
