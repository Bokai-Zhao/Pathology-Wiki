# Skill: skill_generator

## Purpose
Generate the `SKILL.md` for an object (article, tool, dataset, method, model, benchmark) so future Claude sessions know how to use it.

## When to Use
- Final step of every object ingestion pipeline before `build_site_data`
- When an existing SKILL.md is stale (object meaning changed)

## Inputs
- The freshly written object YAML
- One-hop neighbours from `graph.json.reverse_index`

## Outputs
- `skills/{category}/{id}/SKILL.md`

Where `{category}` is one of:
- `articles/` for clinical/technical/review/... articles
- `tools/` for tools
- `datasets/` for datasets
- `methods/` for methods
- `models/` for models
- `benchmarks/` for benchmarks

## Standard Workflow
1. Pick the matching template (see below).
2. Fill required sections from YAML + one-hop neighbours.
3. Add type-specific extra sections (Tool / Dataset / Benchmark — see CLAUDE.md §12.2).
4. If this skill is high-frequency (called >10 times), recommend promoting it to a registered Claude Code skill under `.claude/skills/`.

## Templates

### Article SKILL.md
```
# Skill: article — {title-short}
## Purpose
## When to Cite
## Do Not Cite When
## Inputs Claude Needs
## Outputs Expected
## Standard Workflow (citing this article)
## Decision Rules
## Related Nodes
## Failure Modes
## Examples
## Validation Checklist
```

### Tool SKILL.md (extra sections)
```
## Installation
## Minimal usage
## API / CLI availability
## Troubleshooting
```

### Dataset SKILL.md (extra sections)
```
## Download
## Preprocessing
## Label mapping
## Splits
## Evaluation
## Known pitfalls
```

### Benchmark SKILL.md (extra sections)
```
## Add model workflow
## Add dataset workflow
## Run evaluation workflow
## Aggregate results workflow
## Generate report workflow
```

### Method / Model SKILL.md
Use the universal template; emphasise "When to use" + "Comparison axes" for methods, "When to choose this model" + "Compute requirements" for models.

## Decision Rules
- Every SKILL.md must have a `Validation Checklist` section.
- Avoid duplicating the object's blog content. The blog explains; the skill instructs.
- "When to Use" should be concrete: list trigger conditions, not vague themes.

## Failure Modes
- Object has no clear use case → `Purpose` becomes vague. Sharpen by asking the user what tasks Claude should defer to this object.
- Object overlaps with another (e.g. UNI vs UNI2) → in `Do Not Use When`, point at the other id.

## Validation Checklist
- [ ] All required sections present
- [ ] At least one related skill / object listed
- [ ] No copy-paste from blog
- [ ] Failure modes are object-specific, not generic
