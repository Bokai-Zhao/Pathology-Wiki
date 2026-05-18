# Skill: alphaxiv_blog_writer

## Purpose
Generate the human-facing MDX page for an object. MVP target = "clean paper page" layout (CLAUDE.md §13). No inline annotation, no LLM Q&A widget, no hover discussions.

## When to Use
- Always called as the last-but-two step of an ingestion pipeline (right before `*_skill_generator` and `build_site_data`)

## Inputs
- The freshly written object YAML (or a draft dict)
- The relevant subset of `graph.json.reverse_index` for the object's id (one-hop neighbours)

## Outputs
- `content/{type}/{category?}/{id}.mdx`

## Standard Workflow
1. Choose the page template based on `type`:
   - article → AlphaXiv paper template
   - tool → Tool README-card template
   - dataset → Dataset card template
   - method → Method card template
   - model → Model card template
   - benchmark → Benchmark card template
2. Fill the universal sections: Title, Object Card, Local Graph, Skill Card, Why it matters, Core idea, Inputs/outputs, Related nodes, References.
3. Fill type-specific deltas (CLAUDE.md §13).
4. Embed the `<LocalGraph nodeId="{id}" hops={1} />` component for graph rendering.
5. Embed the `<SkillCard id="{skill_id}" />` link to the corresponding SKILL.md.
6. Avoid restating the YAML verbatim — paraphrase, structure, and add context.

## Decision Rules
- Length: technical articles 600–1500 words, datasets 300–700, tools 400–800.
- Headings: H2 for major sections, H3 for sub-sections; never deeper than H4.
- License/compliance: mention in natural language only — no structured field block (MVP, §13).
- Tables when comparing alternatives (e.g. UNI vs UNI2 vs CTransPath vs Virchow vs CONCH).
- Code snippets only when they aid usage; never speculative pseudocode.

## Frontmatter template
```yaml
---
id: {id}
title: "{Title}"
slug: /{type}/{id}
type: {type}
tags: [...]
description: "One-line for site search and OG card."
sidebar_position: {n}
---
```

## Body template
```mdx
import LocalGraph from '@site/src/components/LocalGraph';
import {Type}Card from '@site/src/components/{Type}Card';
import SkillCard from '@site/src/components/SkillCard';

# {Title}

<{Type}Card id="{id}" />

<LocalGraph nodeId="{id}" hops={1} />

## Why it matters

## Core idea

## Inputs and outputs

## Method / clinical background

## Datasets / tasks / metrics

## Main results or capabilities

## Limitations

## How Claude should use this object

<SkillCard id="{skill_id}" />

## Related nodes

## References
```

## Failure Modes
- Empty section because YAML field is `not_found` → render the heading with a small "No information recorded yet." placeholder, do not invent content.
- Excessive verbosity copied from abstract → trim to 2–4 sentences per section.

## Validation Checklist
- [ ] All required H2 sections present
- [ ] LocalGraph component embedded
- [ ] No fabricated metrics or quotes
- [ ] Frontmatter matches Docusaurus expectations (slug, title, sidebar_position)
