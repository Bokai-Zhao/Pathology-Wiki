---
title: "Awesome-AI4DigitalPathology — curated reference list"
description: "Community-curated index of ~447 papers, datasets, and tools for AI in digital / computational pathology, organised across 16 sub-topics."
tags: [tool, reference, awesome-list, pathology, index]
---

# Awesome-AI4DigitalPathology

{{ tool("awesome-ai4digitalpathology") }}

{{ local_graph("awesome-ai4digitalpathology") }}

## What it is

A curated, regularly-updated **awesome-list** maintained at <https://github.com/lingxitong/Awesome-AI4DigitalPathology>. Each entry is a markdown bullet pointing to a paper / model / dataset / tool, annotated with venue, code link, and (where available) model weights link.

Pathology-Wiki uses this list as a **discovery and queue source**: rather than ingesting every entry up-front, we mine it incrementally, prioritising entries that fill structural gaps in the wiki's graph.

## Coverage

16 sub-topics, ~447 in-scope entries:

| Section | ~Count | Maps to Pathology-Wiki |
|--------|-------:|------------------------|
| Surveys, Reviews, Perspectives | 16 | `review_article` |
| Digital Slide Scanners and File Formats | 4 | `tool` |
| Datasets and Benchmarks | 54 | `dataset` |
| Multiple Instance Learning | 45 | `method` / `technical_article` |
| Federated Learning in Computational Pathology | 15 | `technical_article` |
| Patch-Level Foundation Models | 34 | `model` / `technical_article` |
| Slide-Level Foundation Models and Slide Encoders | 19 | `model` / `technical_article` |
| Cytology and Cervical Cytology | 35 | `clinical_article` |
| Computational Pathology with Multi-Omics | 41 | `technical_article` (E branch) |
| Generative Models | 31 | `technical_article` |
| Vision-Language Models and Pathology Agents | 76 | `model` / `technical_article` (D branch) |
| Dense Prediction (segmentation) | 19 | `technical_article` |
| Clinical Tasks and Applications | 25 | `clinical_article` |
| Image Registration and Spatial Alignment | 16 | `technical_article` |
| Resources, Toolkits, Open-Source Projects | 17 | `tool` |
| Future Trends and Hot Topics | n/a | (out of scope) |

## How Pathology-Wiki uses it

The list is **not** mirrored verbatim — that would create thousands of stub nodes with no value. Instead:

1. We periodically snapshot the README (last snapshot: 2026-05-19).
2. Parse and categorise every entry against the 8-branch method map (CLAUDE.md §7).
3. Cross-match against existing wiki nodes — entries already covered are tagged "in wiki".
4. Score remaining entries by priority (foundational PFMs / VLMs > MIL variants > niche cytology / registration).
5. Run `/add-article` (or batch ingestions) on the highest-priority items.

The current categorised, priority-tagged queue is the long companion report at [`reports/2026-05-19-awesome-list-queue.md`](https://github.com/Bokai-Zhao/Pathology-Wiki/blob/main/reports/2026-05-19-awesome-list-queue.md), and a condensed version is embedded in the [`SKILL.md`]({{ skill_card("awesome-ai4digitalpathology") }}) for this node.

## Entries already in the wiki (cross-matched on first snapshot)

The first snapshot found **18 entries** already ingested:

- Datasets: {{ node_link("camelyon16") }}, {{ node_link("panda") }}, {{ node_link("bach") }}, {{ node_link("glas") }}, {{ node_link("pannuke") }}, {{ node_link("midog") }}.
- MIL: {{ node_link("abmil") }} ({{ node_link("abmil-2018") }}), {{ node_link("clam") }} ({{ node_link("clam-2021") }}), {{ node_link("transmil") }} ({{ node_link("transmil-2021") }}).
- Cell / tissue: {{ node_link("hover-net") }} ({{ node_link("hover-net-2019") }}), {{ node_link("cellvit") }} ({{ node_link("cellvit-2024") }}).
- PFM / SSL: {{ node_link("uni") }} ({{ node_link("uni-2024") }}), {{ node_link("ctranspath") }} ({{ node_link("ctranspath-2022") }}).
- VLM: {{ node_link("plip") }} ({{ node_link("plip-2023") }}), {{ node_link("mi-zero-2023") }}.
- Tool: {{ node_link("openslide") }}.
- Survey: {{ node_link("bahadir-2024") }}.

## Limitations

- Per-entry detail is shallow — extraction of datasets / metrics / methods requires reading the underlying paper.
- Some entries (Future Trends, generic agentic-pathology speculation) are not actionable Pathology-Wiki nodes.
- Snapshot drift — the upstream README is updated independently. Re-snapshot every 1–2 months if active ingestion is happening.

## How Claude should use this resource

{{ skill_card("awesome-ai4digitalpathology") }}

When the user asks "what's a recent X for pathology?" or "find more papers on Y", **browse the matching section** of this index rather than guessing. When ingesting, **always run `/add-article` per paper** so the YAML / SKILL / report layer stays consistent — never bulk-stub from this list.

## References

- Repository: [lingxitong/Awesome-AI4DigitalPathology](https://github.com/lingxitong/Awesome-AI4DigitalPathology)
- README: [`README.md`](https://github.com/lingxitong/Awesome-AI4DigitalPathology/blob/main/README.md)
- Queue report: [`reports/2026-05-19-awesome-list-queue.md`](https://github.com/Bokai-Zhao/Pathology-Wiki/blob/main/reports/2026-05-19-awesome-list-queue.md)
