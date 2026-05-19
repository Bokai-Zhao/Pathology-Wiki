---
name: add-benchmark
description: Add a benchmark node to the Pathology-Wiki knowledge base. Use when the user provides a benchmark name (e.g. SpaPath-Bench, WSI-PFM Benchmark) or a benchmark paper and asks to add or document a benchmark. Defines goal, datasets, tasks, metrics, baselines, and the executable workflows for adding models / datasets / aggregating results. Produces all five mandatory artifacts per CLAUDE.md §2.
---

# Skill: add-benchmark

You are adding a benchmark node to the knowledge base.

## Source of truth — read first

**Read [`skills/objects/benchmark_builder/SKILL.md`](../../../skills/objects/benchmark_builder/SKILL.md)** for the workflow templates the per-object SKILL.md must contain.

Operational rules: [`CLAUDE.md`](../../../CLAUDE.md) §6 (benchmark schema), §11.5 (benchmark pipeline). Priority benchmarks listed in CLAUDE.md §7.

## High-level steps

1. **Define `benchmark_goal`** in one sentence.
2. **Identify** `datasets`, `tasks`, `metrics`, `baselines` (each baseline must reference a `model` or `method` node).
3. **Specify `pipeline`**: `inputs`, `steps`, `outputs`.
4. **Define `benchmark_type`** (e.g. `wsi_pfm`, `vlm_eval`, `multimodal_fusion`, `st_alignment`, `cell_level`).
5. **Write `knowledge/benchmarks/{id}.yaml`** matching `schemas/benchmark.schema.yaml`
6. **Append node + edges** to `knowledge/graph/{nodes,edges}.yaml`. Common edges: `benchmark --uses_dataset--> dataset`, `benchmark --evaluates_task--> task`, `benchmark --uses_metric--> metric`, `model --evaluates_task--> benchmark`
7. **Missing-reference check (CLAUDE.md §11.6)** — STOP and ASK for any cited dataset / model / method / metric that lacks a node
8. **Write `content/benchmarks/{id}.md`** with `{{ benchmark("id") }}`, `{{ local_graph("id") }}`, `{{ skill_card("id") }}`. Required sections: benchmark goal, datasets, tasks, metrics, baselines, pipeline, leaderboard if any
9. **Add to `mkdocs.yml`** nav under Benchmarks
10. **Write per-object SKILL.md** at `skills/benchmarks/{id}/SKILL.md` containing the four executable workflows (CLAUDE.md §12.2):
    - Add model workflow
    - Add dataset workflow
    - Run evaluation workflow
    - Aggregate results workflow
    - Generate report workflow
11. **Validate**: `validate_schema.py` → `build_graph.py` → `mkdocs build --strict`
12. **Write report** + **commit**

## Conventions

- IDs: name + scope in kebab-case (`spapath-bench`, `wsi-pfm-benchmark`, `pathology-vlm-benchmark`).
- Metric names follow `task_map.yaml` and standard conventions (auc, c-index, ari, nmi, hom, com, asw, pas, chaos).
- If a leaderboard exists, set `leaderboard.available: true` and store URL.

## Don't

- Don't accept "the union of these papers' tables" without an executable spec — require pipeline definition.
- Don't invent baselines — every baseline must link to an existing model/method node, or be marked `to_verify`.
- Don't fabricate metric definitions.

## Output checklist

- [ ] `knowledge/benchmarks/{id}.yaml`
- [ ] `nodes.yaml` + `edges.yaml` updated
- [ ] `content/benchmarks/{id}.md`
- [ ] `mkdocs.yml` nav updated
- [ ] `skills/benchmarks/{id}/SKILL.md` with all 4-5 workflow sections
- [ ] All baselines link to model/method nodes
- [ ] `reports/{date}-add-{id}.md`
- [ ] All three validators pass
- [ ] git commit references the report
