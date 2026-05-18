# Skill: clinical_article_ingestion

## Purpose
Extract clinical-focus fields from an article that primarily defines clinical pathology / diagnostic criteria / biomarkers / cohort design.

## When to Use
- `article_classifier` returns `clinical_article` as primary
- Paper covers: disease background, pathology criteria, grading/staging, molecular classification, biomarker prognosis, cohort outcomes, treatment response, clinical workflow

## Do Not Use When
- Paper is primarily an algorithm/model release (use `technical_article_ingestion`)
- Paper is a society guideline (use `guideline_article_ingestion`)
- Paper introduces a clinical AI method (still technical; even if motivation is clinical)

## Inputs
- Source-adapter output: title, authors, year, venue, abstract, full text if available
- Article id (kebab-case, year-suffixed)

## Outputs
- `knowledge/articles/clinical/{id}.yaml` populated with the `clinical_focus` block
- Edges: `article --uses_metric--> clinical_endpoint`, `article --evaluates_task--> clinical_task` (if any), `article --belongs_to--> disease`, `article --belongs_to--> organ`

## Standard Workflow
1. Identify disease + organ + cohort.
2. Extract `clinical_focus` fields:
   - `clinical_problem`
   - `diagnostic_criteria`, `pathology_criteria`
   - `grading_system`, `staging_system`
   - `biomarkers`, `molecular_alterations`
   - `clinical_endpoints`, `treatment_context`
   - `cohort_design`, `clinical_workflow`
   - `clinical_need_for_ai`, `possible_ai_tasks`
3. Cross-link to taxonomies: organs, diseases, biomarkers, grading_systems.
4. Tag `clinical_focus` items that are *novel* in this paper — these may trigger `taxonomy_updater`.

## Decision Rules
- `possible_ai_tasks` should be derivable from `clinical_problem` + `clinical_endpoints`. If the paper does not mention AI, list plausible AI tasks based on the labels/endpoints it defines.
- If the paper has both clinical and technical contributions, populate both focus blocks (article is multi-typed).
- Diagnostic criteria not stated → `not_found`. Do not paraphrase from outside knowledge.

## Related Nodes
- skills: `article_ingestion`, `taxonomy_updater`, `clinical_background_writer`
- taxonomies: `clinical_map.yaml`

## Related Skills
- `technical_article_ingestion` (for hybrid papers)
- `dataset_ingestion` (when the paper releases a clinical cohort)

## Failure Modes
- Cohort size / inclusion criteria buried in supplementary → mark `cohort_design: to_verify`, flag in report.
- Biomarkers named with non-standard abbreviations → resolve against `clinical_map.yaml`; if unmapped, propose taxonomy update.
- Missing molecular subtypes definition → do not invent; mark `molecular_alterations: not_found`.

## Examples
- WHO 2021 CNS tumor classification paper → `clinical_article` with `grading_system: who-cns-2021`, possible_ai_tasks include molecular-subtype-prediction.
- A TCGA cohort paper on breast cancer Ki67 → biomarkers: [`ki67`], clinical_endpoints: [`disease-free-survival`].

## Validation Checklist
- [ ] `article_type.primary == clinical_article`
- [ ] At least 5 `clinical_focus` fields populated (or marked `not_found`)
- [ ] At least one organ + one disease in `organs` / `diseases`
- [ ] `possible_ai_tasks` non-empty (if any AI translation is plausible)
- [ ] No fabricated biomarker names
