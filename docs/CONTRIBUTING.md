# Contributing

This is the developer reference for working on the repository itself
(adding new objects, running validators, building the site). For the
operational rules Claude Code follows, see [`CLAUDE.md`](../CLAUDE.md).
For the original design rationale, see [`claude.md`](../claude.md).

---

## Layout cheat sheet

| Layer | Where | What |
|-------|-------|------|
| Source of truth | `knowledge/{type}/{id}.yaml` | object content |
| Graph SOT | `knowledge/graph/{nodes,edges}.yaml` | topology |
| Human view | `content/{type}/{id}.mdx` | AlphaXiv-style pages |
| Agent guidance | `skills/{category}/{id}/SKILL.md` | usage rules |
| Generated | `src/data/*.json`, `knowledge/graph/graph.json` | never hand-edit |
| Reports | `reports/{YYYY-MM-DD}-{slug}.md` | per-ingestion log |

The three-way split (`knowledge/` machine, `content/` human, `skills/` agent)
is intentional. Don't collapse them.

---

## Toolchain

- **Python ≥ 3.10** for data scripts (validation, graph build, context export).
- **Node ≥ 18** for Docusaurus + the site-data builder.

```bash
# Python side
pip install -e .

# Node side
npm install
```

---

## Build pipeline

```bash
python scripts/python/validate_schema.py        # schemas + cross-checks
python scripts/python/build_graph.py            # nodes + edges → graph.json
python scripts/python/check_orphans.py          # zero-edge nodes
python scripts/python/export_claude_context.py  # → knowledge/agent_context.md
npm run build:data                              # site JSON bundles
npm run build                                   # Docusaurus production
npm run start                                   # Docusaurus dev (HMR)
```

`npm run all` chains Python validation → graph build → site data → Docusaurus build.

---

## Adding objects

In a Claude Code session, use the slash conventions:

```
/add_article  {url|doi|pdf}
/add_tool     {github_url}
/add_dataset  {url}
/add_method   {name}
/add_benchmark {name}
```

These are MVP conventions (CLAUDE.md §11.7). High-frequency ones will
be promoted to registered Claude Code commands under `.claude/commands/`.

Each command runs the matching pipeline; full step lists in
[`CLAUDE.md` §11](../CLAUDE.md#11-ingestion-pipelines-and-slash-commands)
and the design version in `claude.md` §7.

---

## When manually editing YAML

1. Add the object YAML under `knowledge/{type}/{id}.yaml`.
2. Append a node entry to `knowledge/graph/nodes.yaml`.
3. Append edges to `knowledge/graph/edges.yaml`.
4. Write the MDX page under `content/{type}/{id}.mdx`.
5. Write the per-object SKILL doc at `skills/{category}/{id}/SKILL.md`.
6. Run `validate_schema.py` and fix any errors / hint warnings.
7. Run `build_graph.py` and `npm run build:data`.
8. Add a report file `reports/{YYYY-MM-DD}-{slug}.md`.
9. Commit; reference the report in the commit message.

If you reference an entity that has no node yet, **stop and ask
the user** what to do (CLAUDE.md §11.6). Default policy: do not
auto-stub.

---

## Schemas

YAML schemas live under `schemas/`:

- `_common.schema.yaml` — shared fragments (links, claude block, marker types)
- `article.schema.yaml`, `tool.schema.yaml`, `dataset.schema.yaml`,
  `method.schema.yaml`, `model.schema.yaml`, `benchmark.schema.yaml`,
  `skill.schema.yaml`, `graph.schema.yaml`

Adding a new field means updating both the relevant schema and the
documentation in `CLAUDE.md` §6.

---

## Missing-data convention

When a value can't be confirmed from primary sources, write it
literally as one of:

- `unknown`
- `not_found`
- `to_verify`

Do **not** invent DOIs, author lists, dataset sizes, license terms,
benchmark numbers, code URLs, training corpus details, or clinical
criteria. Surface gaps in the report's "Warnings" section.
