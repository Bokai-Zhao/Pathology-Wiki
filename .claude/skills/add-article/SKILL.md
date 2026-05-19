---
name: add-article
description: Add a research paper to the Pathology-Wiki knowledge base. Use when the user provides a DOI, arXiv id, PubMed id, journal URL, PDF path, or pasted abstract and asks to ingest, cite, add, extract, or save the paper. Produces all five mandatory artifacts (object YAML, graph entries, Markdown page, SKILL.md, update report) per CLAUDE.md §2.
---

# Skill: add-article

You are ingesting a paper into the Pathology-Wiki knowledge base.

## Source of truth — read this first

**Read [`skills/articles/article_ingestion/SKILL.md`](../../../skills/articles/article_ingestion/SKILL.md)** for the canonical pipeline (source-adapter selection, classifier rules, clinical-vs-technical extraction routing, validation checklist).

For type-specific extraction, also read whichever applies:

- [`skills/articles/clinical_article_ingestion/SKILL.md`](../../../skills/articles/clinical_article_ingestion/SKILL.md)
- [`skills/articles/technical_article_ingestion/SKILL.md`](../../../skills/articles/technical_article_ingestion/SKILL.md)

The umbrella ops rules are in [`CLAUDE.md`](../../../CLAUDE.md) §2 (Five-Artifact Rule), §5 (article classification), §6 (schemas), §11.1 (article pipeline), §11.6 (missing-reference policy).

## High-level steps

1. **Resolve source** via the matching adapter → `{title, authors, year, venue, abstract, links, raw_text}`
2. **Classify** the article: primary type ∈ {clinical, technical, review, benchmark, dataset, tool, guideline, perspective} + optional secondary types
3. **Extract** type-specific fields (`clinical_focus` and/or `technical_focus`) — never invent missing data; mark as `unknown` / `not_found` / `to_verify`
4. **Write `knowledge/articles/{category}/{id}.yaml`** matching `schemas/article.schema.yaml`
5. **Append node + edges** to `knowledge/graph/nodes.yaml` and `edges.yaml`
6. **Missing-reference check (CLAUDE.md §11.6)** — for any cited entity (dataset, method, model, tool, benchmark) that lacks a node, **STOP and ASK THE USER**:
   > "<paper> cites `<missing-id>` (type: <type>), no node exists. Choose: (a) auto-stub now, (b) skip — mark to_verify, (c) pause to ingest the cited entity first, (d) redirect to an existing id."
7. **Write `content/articles/{category}/{id}.md`** using Jinja macros (`{{ article("id") }}`, `{{ local_graph("id") }}`, `{{ skill_card("id") }}`, `{{ node_link("id") }}`) — see CLAUDE.md §13 for the page template
8. **Add the new page to `nav:` in `mkdocs.yml`** under the matching category
9. **Write per-object SKILL.md** at `skills/articles/{id}/SKILL.md` (the article's "How Claude should cite this" card)
10. **Validate**: `python scripts/python/validate_schema.py` → fix errors, address hint warnings; `python scripts/python/build_graph.py` → confirm 0 dropped edges; `mkdocs build --strict` → confirm zero warnings
11. **Write update report** at `reports/{YYYY-MM-DD}-add-{id}.md` per CLAUDE.md §15
12. **Commit** with `git -c user.name="Bokai-Zhao" -c user.email="zhaobokai2023@ia.ac.cn" commit ...`; reference the report path in the commit body

## Conventions

- IDs: kebab-case ASCII, year suffix on papers (`gigapath-2024`, `clam-2021`, `transmil-2021`)
- Different versions / preprint→published / model v1→v2: distinct ids joined by `uses_version` / `version_of` / `supersedes` edges (CLAUDE.md §9.2)
- Update level on YAML: `add_only` / `link_update` / `taxonomy_update` / `skill_update` — escalate when in doubt
- All `related_*` arrays in object YAML are **hints for humans only**; the authoritative graph is `edges.yaml`

## Don't

- Don't write `content/...md` before the YAML exists.
- Don't write edges inside object YAML — they go to `edges.yaml`.
- Don't auto-stub missing references — ask the user every time.
- Don't invent DOIs, author lists, venues, dataset sizes, license terms, or benchmark numbers.
- Don't skip the report or the validation pass.

## Output checklist

- [ ] `knowledge/articles/{category}/{id}.yaml`
- [ ] `nodes.yaml` + `edges.yaml` updated
- [ ] `content/articles/{category}/{id}.md`
- [ ] `mkdocs.yml` nav updated
- [ ] `skills/articles/{id}/SKILL.md`
- [ ] `reports/{date}-add-{id}.md`
- [ ] `validate_schema.py` passes
- [ ] `build_graph.py` reports zero dropped edges
- [ ] `mkdocs build --strict` passes
- [ ] git commit references the report
