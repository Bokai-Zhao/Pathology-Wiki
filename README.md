# Pathology-Wiki

An agent-extensible knowledge base for computational pathology.

- **For Claude / agents** → start with `CLAUDE.md` (operational guide)
- **For human contributors** → read `claude.md` (design rationale, Chinese)
- **For users browsing the site** → see the Docusaurus pages under `content/`

## Quick reference

| Layer | Where | What |
|-------|-------|------|
| Source of truth | `knowledge/{type}/{id}.yaml` | object content |
| Graph SOT | `knowledge/graph/{nodes,edges}.yaml` | topology |
| Human view | `content/{type}/{id}.mdx` | AlphaXiv-style blogs |
| Agent guidance | `skills/{category}/{id}/SKILL.md` | usage rules |
| Generated | `src/data/*.json`, `knowledge/graph/graph.json` | never hand-edit |
| Reports | `reports/{YYYY-MM-DD}-{slug}.md` | per-ingestion log |

## Build pipeline

```bash
# Python — data layer
pip install -e .
python scripts/python/validate_schema.py
python scripts/python/build_graph.py
python scripts/python/check_orphans.py
python scripts/python/export_claude_context.py

# Node — site layer
npm install
npm run build:data
npm run build      # production
npm run start      # dev
```

Or `npm run all` to chain Python validation → graph build → site data → Docusaurus build.

## Adding objects

In a Claude Code session:

```
/add_article {url|doi|pdf}
/add_tool {github_url}
/add_dataset {url}
/add_method {name}
/add_benchmark {name}
```

These are MVP conventions. High-frequency ones will be promoted to registered Claude Code slash commands under `.claude/commands/`. See CLAUDE.md §11.7.
