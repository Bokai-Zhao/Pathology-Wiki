---
title: "MADELEINE — Multistain Pretraining for Slide Representation Learning (Jaume et al. 2024)"
description: "Mahmood Lab slide-level PFM with cross-stain contrastive pretraining (H&E + IHC + special stains)."
tags: [article, technical-article, foundation-model, slide-level, multistain, ihc]
---

# Multistain Pretraining for Slide Representation Learning in Pathology

{{ article("madeleine-2024") }}

{{ local_graph("madeleine-2024") }}

## Why it matters

{{ node_link("uni-2024") }}, {{ node_link("virchow-2024") }}, {{ node_link("gigapath-2024") }}, and {{ node_link("conch-2024") }} are all **H&E-only** at the patch / slide level. Real pathology workflows use **multiple stains**: H&E for morphology, IHC for protein expression, special stains (PAS, Trichrome, etc.) for specific tissue features. MADELEINE is the first widely-cited slide-level pathology PFM designed to **pretrain across stains jointly**, producing stain-invariant slide representations useful for multi-stain biomarker prediction and cross-stain retrieval.

## Core idea

For each pathology specimen with multiple stains scanned:

```
H&E slide ─┐
IHC slide ─┼→ shared patch encoder (CONCH-style) → slide-level Transformer
spec stain ─┘                                                ↓
                                          stain-paired contrastive loss
                                          (slides of same specimen attract,
                                           slides of different specimens repel)
```

The cross-stain contrastive objective forces the slide representation to abstract over the stain modality — same biology, different visual signal — yielding stain-invariant slide embeddings.

## Inputs and outputs

- **Input**: WSI of any supported stain (H&E / IHC / special).
- **Output**: stain-invariant slide embedding.

## Datasets / tasks / metrics

- **Pretraining**: Mahmood-Lab-internal multistain cohort with paired H&E / IHC / special-stain slides per specimen.
- **Downstream**: subtype classification, biomarker prediction (mIHC), multi-stain retrieval, stain-invariant classification.
- Metrics: AUC, balanced accuracy.

## Method

- **Patch encoder**: CONCH-style ViT.
- **Slide encoder**: slide-level Transformer.
- **Training**: cross-stain contrastive alignment (slide pairs from the same specimen are positives).

## Main results

MADELEINE outperforms {{ node_link("uni") }} / {{ node_link("conch-2024") }} / {{ node_link("gigapath-2024") }} on multi-stain downstream tasks where stain modality varies between training and test. Roughly matches them on H&E-only downstream tasks.

## Limitations

- **Cross-stain pretraining requires multi-stain registration / pairing** — limits the cohorts that can be used.
- **Gated weights** via Mahmood Lab on Hugging Face.
- **Slide-level only** — patch-level downstream tasks should still use UNI / Virchow.

## How Claude should use this article

{{ skill_card("madeleine-2024") }}

Cite MADELEINE for **multi-stain pathology workflows** — mIHC, multistain biomarker prediction, stain-invariant retrieval. For H&E-only tasks, the H&E PFMs (UNI / Virchow / Prov-GigaPath) are simpler.

## Related nodes

- patch encoder: {{ node_link("conch-2024") }}, {{ node_link("uni") }}
- sibling slide PFMs: {{ node_link("gigapath-2024") }}, {{ node_link("titan-2025") }}, {{ node_link("prism-2024") }}
- parent method: {{ node_link("pathology-foundation-model") }}, {{ node_link("patch-level-ssl") }}

## References

- DOI: [10.1007/978-3-031-73414-4_2](https://doi.org/10.1007/978-3-031-73414-4_2)
- Weights: [huggingface.co/MahmoodLab/madeleine](https://huggingface.co/MahmoodLab/madeleine)
- *ECCV 2024* / Springer LNCS
