---
title: "Patch-Level Self-Supervised Learning (Pathology)"
description: "Pretrain a patch encoder on millions of pathology patches without labels. The dominant pretraining recipe for modern PFMs."
tags: [method, ssl, foundation-model, patch-level]
---

# Patch-Level Self-Supervised Learning (Pathology)

{{ method("patch-level-ssl") }}

{{ local_graph("patch-level-ssl") }}

## Why it matters

Pathology has too many unlabelled WSIs and too few labelled ones. Patch-level SSL inverts that asymmetry: pretrain a patch encoder on **millions of unlabelled patches** with a self-supervised objective, then transfer to downstream tasks via frozen features + lightweight heads (typically a MIL aggregator). This is the dominant pretraining recipe for the modern pathology foundation-model cohort: {{ node_link("ctranspath") }}, Phikon, Lunit-DINO, {{ node_link("uni") }}, Virchow, H-Optimus, PathDINO all sit here.

## Core idea

```
millions of unlabelled H&E patches
   → encoder (ViT / Swin) with SSL objective (contrastive / DINO / MIM)
   → frozen patch encoder
   → downstream MIL aggregator on slide-level tasks
```

The downstream value comes from the encoder. Modern pipelines almost always **freeze the SSL-pretrained encoder** and train only the aggregator + classifier on top.

## Family of objectives

| Objective | Example models |
|-----------|----------------|
| Contrastive (MoCo / SimCLR) | {{ node_link("ctranspath") }} (SRCL = MoCo v3 variant) |
| iBOT (online distillation + MIM) | Phikon |
| DINO (self-distillation) | Lunit-DINO |
| DINOv2 (DINO + iBOT + KoLeo) | {{ node_link("uni") }}, Virchow, H-Optimus |
| Masked Image Modelling (MAE) | (less common in pathology so far) |

## Key questions

- Which SSL objective transfers best to pathology — contrastive vs DINO vs MIM?
- How much pretraining data is enough — TCGA-only vs multi-cohort millions?
- What patch size / magnification mix maximises downstream utility?
- How do gains scale with model size and pretraining compute?
- How does patch-level SSL compare against slide-level pretraining (GigaPath)?

## Limitations

- **Frozen-feature ceiling** — for a given downstream task, end-to-end fine-tuning of a small specialist model can sometimes outperform frozen PFM features.
- **Pretraining stain bias** — TCGA-only pretraining underperforms on non-TCGA stains; multi-cohort pretraining is needed for robust generalisation.
- **No language alignment** — pure patch-level SSL gives no zero-shot capability; need a separate VL alignment step (CONCH / MUSK / PLIP).

## How Claude should use this method

{{ skill_card("patch-level-ssl") }}

When the user asks "which PFM encoder should I use?", default to **UNI** (DINOv2 ViT-L) for the strongest current frozen features, **CTransPath** for an open-weights compute-cheap baseline. Cite this method node when discussing pretraining strategies in the abstract.

## Related nodes

- parent: {{ node_link("pathology-foundation-model") }}
- representative articles: {{ node_link("uni-2024") }}, {{ node_link("ctranspath-2022") }}
- representative models: {{ node_link("uni") }}, {{ node_link("ctranspath") }}
