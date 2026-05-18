# Skill: method_mapping

## Purpose
Add or update a `method` node with parents, children, predecessors, successors, and stage in the canonical method map.

## When to Use
- A new technical article introduces a method that doesn't yet have a node
- An existing method node needs better positioning (parent/child/predecessor) after new evidence
- The user asks `/add_method {name}`

## Do Not Use When
- The "method" is just a re-implementation of an existing one (no new method node; link via `implements` from a tool/repo)
- Method has zero adoption and one paper — wait until a second paper cites it

## Inputs
- Method name and a representative article (or set)
- Optional: predecessor/successor hints

## Outputs
- `knowledge/methods/{id}.yaml`
- `content/methods/{id}.mdx`
- `skills/methods/{id}/SKILL.md`
- Graph node + edges: `method --belongs_to--> taxonomy_branch` (via `parent_methods`), `method --extends--> predecessor`, `successor --extends--> method`

## Standard Workflow
1. Determine `stage` (one of 8 from `method_map.yaml`).
2. Find `parent_methods` (1–2 levels up in the tree).
3. Identify `predecessors` and `successors` (chronological and conceptual).
4. State `core_idea` in 1–3 sentences.
5. List `representative_articles`, `representative_models`, `representative_tools`, `representative_datasets`, `related_benchmarks`.
6. Define `key_questions` and `comparison_axes` for the writing skill.
7. If a new branch is needed, route via `taxonomy_updater`.

## Decision Rules
- `parent_methods` should always include at least one canonical taxonomy branch id.
- `successors` populated only when published; speculative successors go in claude.do_not_use_when as comments.
- A method with no parent and no children is a smell — investigate before saving.

## Related Nodes
- skills: `taxonomy_updater`, `alphaxiv_blog_writer`, `method_comparison_writer`
- taxonomies: `method_map.yaml`

## Failure Modes
- Method spans two stages (e.g. multi-scale PFM bridging foundation models and VLMs) → list both stages in `stage:`.
- Conflicting precedence claims across papers → record both in `predecessors` with evidence note in edges.

## Examples
- `weakly-supervised-mil` → stage: deep_wsi_learning; parent: deep_wsi_learning; successors: [abmil, clam, transmil].
- `pathology-foundation-model` → stage: pathology_foundation_model; representative_models: [uni, gigapath, virchow, h-optimus, ctranspath, conch].

## Validation Checklist
- [ ] `stage` matches an enum in `method.schema.yaml`
- [ ] `parent_methods` non-empty
- [ ] `core_idea` is concrete (no vague "a deep learning approach for ...")
- [ ] At least one `representative_articles` entry
