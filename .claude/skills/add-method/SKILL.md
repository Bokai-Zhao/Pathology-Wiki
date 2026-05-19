---
name: add-method
description: Add a method node to the Pathology-Wiki knowledge base, positioning it in the canonical 8-branch method map. Use when the user provides a method name plus a representative paper (or set of papers) and asks to add, document, or position a method. Produces all five mandatory artifacts per CLAUDE.md §2.
---

# Skill: add-method

You are adding a method node to the knowledge base.

## Source of truth — read first

**Read [`skills/objects/method_mapping/SKILL.md`](../../../skills/objects/method_mapping/SKILL.md)** for taxonomy positioning and predecessor/successor logic.

Operational rules: [`CLAUDE.md`](../../../CLAUDE.md) §6 (method schema), §7 (canonical method taxonomy), §11.4 (method pipeline). Taxonomy file: [`knowledge/taxonomies/method_map.yaml`](../../../knowledge/taxonomies/method_map.yaml).

## High-level steps

1. **Determine `stage`** — one of the 8 top-level branches (`traditional_cpath`, `deep_wsi_learning`, `pathology_foundation_model`, `pathology_vlm`, `multimodal_pathology_ai`, `benchmark_evaluation`, `clinical_translation`, `agentic_pathology_ai`). If the method spans two stages, list both.
2. **Find `parent_methods`** — 1–2 levels up in the tree. Always at least one.
3. **Identify predecessors and successors** (chronological + conceptual). Speculative successors → don't include.
4. **Write `core_idea`** in 1–3 concrete sentences (no vague "a deep-learning approach for ...").
5. **List representative articles, models, tools, datasets, related benchmarks**.
6. **Write `knowledge/methods/{id}.yaml`** matching `schemas/method.schema.yaml`
7. **Append node + edges** to `knowledge/graph/{nodes,edges}.yaml`. Common edges: `method --belongs_to--> parent_method`, `successor --extends--> method`, `article --proposes_method--> method`, `model --version_of--> method`
8. **If a new branch is needed** (rare — 8 stages are stable), discuss with user before adding to taxonomy.
9. **Update taxonomy** — if a new leaf is justified, edit `knowledge/taxonomies/method_map.yaml` and emit `article --updates_taxonomy--> method` edge.
10. **Missing-reference check (CLAUDE.md §11.6)** — STOP and ASK for any representative article / model / tool that lacks a node
11. **Write `content/methods/{id}.md`** with `{{ method("id") }}`, `{{ local_graph("id") }}`, `{{ skill_card("id") }}`. Required sections: why it matters, core idea, sub-branches if umbrella, key questions, representative models, comparison axes
12. **Add to `mkdocs.yml`** nav under Methods
13. **Write per-object SKILL.md** at `skills/methods/{id}/SKILL.md` covering When to use, Comparison axes
14. **Validate**: `validate_schema.py` → `build_graph.py` → `mkdocs build --strict`
15. **Write report** + **commit**

## Conventions

- IDs: descriptive kebab-case (`pathology-foundation-model`, `weakly-supervised-mil`, `spatial-domain-identification`).
- A method with no parent and no children is a smell — investigate before saving.
- Update level escalates to `taxonomy_update` if a new leaf is added; to `add_only` if it's a peripheral entry.

## Don't

- Don't silently add a new top-level stage — discuss with user.
- Don't position a method into a stage just because it uses similar architecture; position by **objective** (PFM vs VLM vs Multimodal).
- Don't claim predecessors that aren't cited.

## Output checklist

- [ ] `knowledge/methods/{id}.yaml`
- [ ] `nodes.yaml` + `edges.yaml` updated
- [ ] `content/methods/{id}.md`
- [ ] `mkdocs.yml` nav updated
- [ ] `skills/methods/{id}/SKILL.md`
- [ ] `parent_methods` non-empty
- [ ] At least one `representative_articles` entry
- [ ] `reports/{date}-add-{id}.md`
- [ ] All three validators pass
- [ ] git commit references the report
