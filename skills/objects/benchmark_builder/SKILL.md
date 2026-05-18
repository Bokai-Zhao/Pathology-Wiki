# Skill: benchmark_builder

## Purpose
Define a benchmark's goal, datasets, tasks, metrics, baselines, and the workflows for adding models / datasets / aggregating results.

## When to Use
- A new benchmark is being introduced (paper or in-house)
- An existing benchmark needs new add-model / aggregation workflows

## Inputs
- Benchmark name and goal
- Datasets, tasks, metrics, baseline list

## Outputs
- `knowledge/benchmarks/{id}.yaml`
- `content/benchmarks/{id}.mdx`
- `skills/benchmarks/{id}/SKILL.md` containing:
  - `Add model workflow`
  - `Add dataset workflow`
  - `Run evaluation workflow`
  - `Aggregate results workflow`
  - `Generate report workflow`
- Graph edges: `benchmark --uses_dataset--> dataset`, `benchmark --evaluates_task--> task`, `benchmark --uses_metric--> metric`

## Standard Workflow
1. Define `benchmark_goal` in one sentence.
2. List `datasets`, `tasks`, `metrics`, `baselines`.
3. Specify `pipeline.inputs / steps / outputs`.
4. Author the four workflow sections in the SKILL.md.
5. Link representative articles and tools.
6. Apply missing-reference policy for cited datasets/tools/baselines.

## Decision Rules
- Each baseline must reference a `model` or `method` node — or be marked `to_verify`.
- Metric naming follows `task_map.yaml` and standard conventions (auc, c-index, ari, nmi, hom, com, asw, pas, chaos).
- If a leaderboard exists, set `leaderboard.available: true` and store URL.

## Related Nodes
- skills: `dataset_ingestion`, `method_mapping`, `model_card_builder`, `alphaxiv_blog_writer`
- taxonomies: `task_map.yaml`

## Failure Modes
- Benchmark is "the union of these papers' tables" with no executable spec → require pipeline definition before saving.
- Metrics undefined in source → ask user; do not invent.

## Examples
- SpaPath-Bench → datasets: [dlpfc, ...], tasks: [spatial-domain-identification, h-e-st-alignment], metrics: [ari, nmi, hom, com, pas, chaos, asw], baselines: [stagate, spagcn, graphst, sedr, ccst, spaceflow].
- WSI-PFM-Benchmark → datasets: [tcga-brca, panda, ...], tasks: [grading, biomarker-prediction], metrics: [auc, c-index].

## Validation Checklist
- [ ] YAML matches `benchmark.schema.yaml`
- [ ] `pipeline` populated
- [ ] All four workflows present in SKILL.md
- [ ] All baselines link to model/method nodes
