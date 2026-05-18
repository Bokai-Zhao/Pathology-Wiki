# Skill: tool_ingestion

## Purpose
Add a tool / library / repo to the knowledge base. Captures install method, capabilities, agent-callability, and related entities.

## When to Use
- `/add_tool {github_url}` or "add OpenSlide / TIAToolbox / X repo"
- A `technical_article` released code and we want a separate tool node

## Do Not Use When
- The repo is a paper artefact already covered by `releases_model` (then create a `model` node, not a tool, unless the repo is itself a usable library)
- Tool is a private/internal script with no documentation

## Inputs
- GitHub URL (preferred), docs URL, package name, paper id

## Outputs
- `knowledge/tools/{id}.yaml`
- `content/tools/{id}.mdx`
- `skills/tools/{id}/SKILL.md` (the tool's usage card for Claude)
- Graph node + edges: `tool --has_code--> repo`, `tool --implements--> method`, `tool --consumed_by_workflow--> workflow`

## Standard Workflow
1. Run `github_repo_adapter` → README, license, language, install command, examples, last commit date.
2. Classify `tool_type` (wsi_io, segmentation, mil_framework, ssl_pretrain, vlm_inference, st_analysis, ...).
3. Extract `supported_inputs`, `supported_outputs`, `capabilities`.
4. Determine `agent_interface`:
   - CLI? Python API? Docker?
   - `callable: true` if Claude can invoke it deterministically given inputs.
5. Rate `maturity` honestly.
6. Link to methods, datasets, benchmarks, articles.
7. Apply missing-reference policy for cited entities without nodes.
8. Generate MDX + tool SKILL.md.

## Decision Rules
- License must be captured verbatim from the repo. If absent, `license: unknown` and surface a Warning.
- `capabilities` are verbs ("read SVS WSIs", "extract patches"), not adjectives.
- If a tool is the canonical implementation of a paper, set `implements: [{method_id}]` and `related_articles: [{article_id}]`.

## Related Nodes
- skills: `github_repo_adapter`, `method_mapping`, `alphaxiv_blog_writer`
- objects: `tool` schema in `schemas/tool.schema.yaml`

## Related Skills
- `dataset_ingestion` (when a tool ships with sample data)
- `benchmark_builder` (when a tool is the standard benchmark runner)

## Failure Modes
- Repo last touched years ago → mark `repo_status: dormant`; do not pretend it's active.
- Multiple language bindings → `language: [C, Python]`. Don't drop the C side.
- Documentation is example-only → `documentation: partial`.

## Examples
- OpenSlide → `tool_type: [wsi_io]`, `language: [C, Python]`, `cli_available: false` for the C lib but `python_api_available: true` for openslide-python.
- CLAM → `tool_type: [mil_framework]`, `implements: [clam]`, `python_api_available: true`.

## Validation Checklist
- [ ] YAML matches `tool.schema.yaml`
- [ ] `agent_interface` filled
- [ ] License recorded
- [ ] At least one outgoing edge (`has_code` to a repo node OR `implements` to a method)
- [ ] MDX has installation + minimal usage sections
