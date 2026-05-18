# Skill: article_ingestion

## Purpose
Top-level dispatcher for adding any article to the knowledge base. Classifies the article, then hands off to the type-specific extractor.

## When to Use
- User invokes `/add_article {url|doi|pdf|abstract}`
- User pastes a paper/abstract and asks to add it
- Bulk import of a paper list

## Do Not Use When
- The user wants only a tool, dataset, method, or benchmark (use those skills directly)
- The article is already in `knowledge/articles/` (use update flow instead)

## Inputs
- One of: DOI, PubMed ID, arXiv ID, bioRxiv URL, journal URL, PDF path, pasted abstract+metadata
- Optional: user-asserted article type (override classifier)

## Outputs
- `knowledge/articles/{category}/{id}.yaml`
- Appended entries in `knowledge/graph/{nodes,edges}.yaml`
- `content/articles/{category}/{id}.mdx`
- `skills/articles/{id}/SKILL.md` (the article's own usage card)
- `reports/{YYYY-MM-DD}-add-{id}.md`

## Standard Workflow
1. Resolve source via the matching `sources/*_adapter` skill → raw metadata dict.
2. Run `article_classifier` → primary + secondary types.
3. Branch:
   - clinical-leaning → `clinical_article_ingestion`
   - technical-leaning → `technical_article_ingestion`
   - review/benchmark/dataset/tool/guideline/perspective → call `review/benchmark/dataset/tool/guideline_article_ingestion` (build later)
4. Write object YAML matching `schemas/article.schema.yaml`.
5. Append node + edges to `knowledge/graph/`.
6. **Missing-reference check (CLAUDE.md §11.6)** — for each cited object that has no node, ask the user.
7. Generate AlphaXiv-style MDX via `alphaxiv_blog_writer`.
8. Generate the article-specific SKILL.md via `skill_generator`.
9. Run `validate_schema.py`, `build_graph.py`, `build_site_data` (or surface to user if scripts not yet executable).
10. Write update report.

## Decision Rules
- If multiple article types apply, set `primary` = the one matching the article's main contribution; everything else goes to `secondary`.
- If author list is missing, mark `authors: not_found`. Never fabricate authors.
- `update_level` defaults to `link_update`; escalate to `taxonomy_update` if a new method/task/disease appears.

## Related Nodes
- skills: `clinical_article_ingestion`, `technical_article_ingestion`, `alphaxiv_blog_writer`, `graph_builder`
- objects: `article_classifier`, `source_adapter`

## Related Skills
- All `sources/*_adapter` skills
- `taxonomy_updater`

## Failure Modes
- Source paywalled and no abstract recovered → record what we have, mark `abstract: not_found`, surface in report Warnings.
- Classifier confidence low → ask user for primary type rather than guessing.
- Cited dataset/method has no node yet → §11.6 ask user (default behavior).

## Examples
- `/add_article 10.1038/s41591-024-02857-3` → UNI paper (technical_article).
- "Add the new PANDA challenge paper" → uses dataset_page_adapter + article + dataset twin ingestion.

## Validation Checklist
- [ ] YAML matches `article.schema.yaml`
- [ ] `nodes.yaml` updated (article node + any new entity nodes)
- [ ] `edges.yaml` updated (proposes_method / releases_model / uses_dataset / etc.)
- [ ] MDX renders the required AlphaXiv sections
- [ ] Article SKILL.md exists
- [ ] Report under `reports/` references the change
