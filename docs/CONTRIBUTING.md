# Contributing

Developer reference for working on the repository itself (adding new objects,
running validators, building the site). For the operational rules Claude
follows, see [`CLAUDE.md`](../CLAUDE.md). For the original design rationale,
see [`claude.md`](../claude.md).

---

## Layout cheat sheet

| Layer | Where | What |
|-------|-------|------|
| Source of truth | `knowledge/{type}/{id}.yaml` | object content |
| Graph SOT | `knowledge/graph/{nodes,edges}.yaml` | topology |
| Human view | `content/{type}/{id}.md` | rendered by MkDocs |
| Agent guidance | `skills/{category}/{id}/SKILL.md` | usage rules |
| Generated | `knowledge/graph/graph.json`, `site/` | never hand-edit |
| Reports | `reports/{YYYY-MM-DD}-{slug}.md` | per-ingestion log |

The three-way split (`knowledge/` machine, `content/` human, `skills/` agent)
is intentional. Don't collapse them.

---

## Toolchain

**Single Python toolchain** — Python ≥ 3.10.

```bash
# install everything (data deps + site deps)
pip install -e .[site]

# or directly
pip install pyyaml jsonschema networkx click \
            mkdocs mkdocs-material mkdocs-macros-plugin pymdown-extensions
```

No Node, no npm, no webpack.

---

## Build pipeline

```bash
# data layer
python scripts/python/validate_schema.py        # schemas + cross-checks
python scripts/python/build_graph.py            # nodes + edges → graph.json
python scripts/python/check_orphans.py          # zero-edge nodes
python scripts/python/export_claude_context.py  # → knowledge/agent_context.md

# site
mkdocs serve              # http://127.0.0.1:8000 — hot reload
mkdocs build              # production → site/
mkdocs build --strict     # also fail on link / nav warnings
mkdocs gh-deploy --force  # build + push to gh-pages (CI does this)
```

CI runs all of the above on every push to `main` (under 60 s typical) — see
`.github/workflows/deploy.yml`.

---

## Adding objects

In a Claude Code session, use the registered slash skills:

```
/add-article   {url|doi|pdf}
/add-tool      {github_url}
/add-dataset   {url}
/add-method    {name}
/add-benchmark {name}
```

These live under `.claude/skills/<name>/SKILL.md` (project-scoped, committed
to the repo). Each is a thin wrapper that points back to the canonical
documentation at `skills/{category}/{id}/SKILL.md`. Full step lists in
[`CLAUDE.md` §11](../CLAUDE.md#11-ingestion-pipelines-and-slash-commands)
and the design version in `claude.md` §7.

---

## Manual flow (no Claude)

When editing YAML by hand, the order is:

1. Add the object YAML under `knowledge/{type}/{id}.yaml`.
2. Append a node entry to `knowledge/graph/nodes.yaml`.
3. Append edges to `knowledge/graph/edges.yaml`.
4. Write the Markdown page under `content/{type}/{id}.md`. Use Jinja macros
   (e.g. `{{ tool("id") }}`, `{{ local_graph("id") }}`) — see CLAUDE.md §13.
5. Write the per-object SKILL doc at `skills/{category}/{id}/SKILL.md`.
6. Run `validate_schema.py` and fix any errors / hint warnings.
7. Run `build_graph.py` and `mkdocs build --strict`.
8. Add a report file `reports/{YYYY-MM-DD}-{slug}.md`.
9. Add the new page to the `nav:` block in `mkdocs.yml`.
10. Commit; reference the report in the commit message.

If you reference an entity that has no node yet, **stop and ask** what to do
(CLAUDE.md §11.6). Default policy: do not auto-stub.

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

## Adding a new macro

1. Edit `macros.py` — define a function inside `define_env(env)` decorated
   with `@env.macro`.
2. Use `_find_object("type", id)` to read the YAML.
3. Use `_card_html(...)` for visual consistency.
4. For object-page links, use `link_for(id)` (depth-aware relative URL).
5. Document the new macro in CLAUDE.md §13.
6. `mkdocs build --strict` to verify.

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
