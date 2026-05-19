---
name: add-tool
description: Add a software library or repository (a "tool") to the Pathology-Wiki knowledge base. Use when the user provides a GitHub URL, package name, or docs URL and asks to add, ingest, or document a tool. Captures install method, capabilities, agent-callability, license, and links to methods / datasets / benchmarks. Produces all five mandatory artifacts per CLAUDE.md §2.
---

# Skill: add-tool

You are ingesting a software library or repository into the knowledge base.

## Source of truth — read first

**Read [`skills/objects/tool_ingestion/SKILL.md`](../../../skills/objects/tool_ingestion/SKILL.md)** for classification rules, capability extraction, maturity rating, and validation checklist.

Operational rules: [`CLAUDE.md`](../../../CLAUDE.md) §6 (tool schema), §11.2 (tool pipeline), §11.6 (missing-reference policy).

## High-level steps

1. **Resolve source** — read the GitHub README, documentation, package metadata, examples → `{name, language, license, install_command, last_commit, examples}`
2. **Classify** `tool_type` ∈ {wsi_io, segmentation, mil_framework, ssl_pretrain, vlm_inference, st_analysis, ...}
3. **Extract** `supported_inputs`, `supported_outputs`, `capabilities` (verbs not adjectives), `agent_interface` (callable, install_command, cli_available, python_api_available, docker_available), `maturity` (repo_status, documentation, reproducibility, maintenance_level)
4. **Write `knowledge/tools/{id}.yaml`** matching `schemas/tool.schema.yaml`
5. **Append node + edges** to `knowledge/graph/{nodes,edges}.yaml`. Common edges: `tool --has_code--> repo` (if separate), `tool --implements--> method`, `tool --consumed_by_workflow--> workflow`
6. **Missing-reference check (CLAUDE.md §11.6)** — STOP and ASK for any cited method / dataset / benchmark that lacks a node
7. **Write `content/tools/{id}.md`** with `{{ tool("id") }}`, `{{ local_graph("id") }}`, `{{ skill_card("id") }}`. Required sections: what it is, what problem it solves, installation, minimal usage, inputs/outputs, when to use, when not to use, common failure modes, related tools
8. **Add to `mkdocs.yml`** nav under Tools
9. **Write per-object SKILL.md** at `skills/tools/{id}/SKILL.md` covering Installation, Minimal usage, API/CLI availability, Troubleshooting (CLAUDE.md §12.2)
10. **Validate**: `validate_schema.py` → `build_graph.py` → `mkdocs build --strict`
11. **Write report** at `reports/{date}-add-{id}.md`
12. **Commit** referencing the report

## Conventions

- License is captured **verbatim** from the repo. If absent, `license: unknown` and surface a Warning in the report.
- IDs: project name in kebab-case (e.g. `openslide`, `tiatoolbox`, `clam-repo`).
- If a tool is the canonical implementation of a paper, set `implements: [{method_id}]` and `related_articles: [{article_id}]`.

## Don't

- Don't claim `agent_interface.callable: true` unless Claude can invoke it deterministically given inputs.
- Don't pretend a dormant repo is active — be honest in `maturity.repo_status`.
- Don't auto-stub missing methods/benchmarks — ask user.

## Output checklist

- [ ] `knowledge/tools/{id}.yaml`
- [ ] `nodes.yaml` + `edges.yaml` updated
- [ ] `content/tools/{id}.md`
- [ ] `mkdocs.yml` nav updated
- [ ] `skills/tools/{id}/SKILL.md`
- [ ] `reports/{date}-add-{id}.md`
- [ ] All three validators pass
- [ ] git commit references the report
