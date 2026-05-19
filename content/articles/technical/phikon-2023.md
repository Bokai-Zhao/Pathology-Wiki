---
title: "Phikon — Scaling SSL for Histopathology with Masked Image Modeling (Filiot et al. 2023)"
description: "Owkin's iBOT-pretrained pathology PFM (ViT-B on ~6k TCGA WSIs). Open-weights pre-UNI baseline."
tags: [article, technical-article, foundation-model, ibot, masked-image-modeling, owkin, phikon]
---

# Scaling Self-Supervised Learning for Histopathology with Masked Image Modeling

{{ article("phikon-2023") }}

{{ local_graph("phikon-2023") }}

## Why it matters

Phikon is **Owkin's pathology foundation model**, and one of the strongest open-weights pre-{{ node_link("uni-2024") }} pathology SSL checkpoints. It pretrains a ViT with **iBOT** — a recipe that combines **DINO self-distillation** with **masked image modelling (MIM)** — on ~6,000 TCGA WSIs (~43M H&E patches). Released openly on Hugging Face, Phikon was widely adopted as an open baseline alongside {{ node_link("ctranspath") }} through 2023–2024.

Phikon-v2 (2024) further scales the recipe to ~58k WSIs.

## Core idea

iBOT pretraining = DINO + MIM:

```
patch → student encoder → student features
     ↘ teacher encoder → teacher features (EMA of student)
                            ↑
                     DINO self-distillation
                            +
                  masked image modelling on patches
```

The combination forces the encoder to learn both global semantics (DINO) and local structure (MIM), producing patch features that transfer well to pathology downstream tasks.

## Inputs and outputs

- **Input**: H&E patch, 224×224.
- **Output**: ViT-B/16 patch embedding (768-dim *to verify*).

## Datasets / tasks / metrics

- **Pretraining**: ~6k TCGA WSIs / ~43M H&E patches.
- **Downstream**: patch classification, slide-level classification (via MIL aggregation), subtype classification across multiple cancer types.
- **Metrics**: AUC, accuracy, balanced accuracy.

## Method

- **Backbone**: ViT-B/16 (later ViT-L/16).
- **Recipe**: iBOT (DINO + MIM).
- **Cohort**: TCGA H&E (publicly accessible).

## Main results

Phikon outperforms {{ node_link("ctranspath") }}, {{ node_link("lunit-dino-2022") }}, and ImageNet-pretrained baselines on multiple pathology downstream tasks at release. UNI / Virchow / Prov-GigaPath later surpass it via DINOv2 and larger pretraining cohorts.

## Limitations

- **Pretraining cohort smaller** than UNI / Virchow / Prov-GigaPath.
- **Pre-DINOv2** — Phikon-v2 (2024) and modern PFMs use DINOv2 and outperform on most tasks.
- **ViT-B backbone** — UNI uses ViT-L for stronger downstream features.

## How Claude should use this article

{{ skill_card("phikon-2023") }}

Cite Phikon as **Owkin's open-weights pathology SSL checkpoint** and as the **iBOT precedent** for pathology pretraining. Sibling reference to {{ node_link("ctranspath-2022") }} and {{ node_link("lunit-dino-2022") }} in the pre-UNI PFM cohort.

## Related nodes

- sibling open-weights SSL: {{ node_link("ctranspath-2022") }}, {{ node_link("lunit-dino-2022") }}
- successor (DINOv2): {{ node_link("uni-2024") }}
- parent method: {{ node_link("pathology-foundation-model") }}, {{ node_link("patch-level-ssl") }}

## References

- DOI: [10.1101/2023.07.21.23292757](https://doi.org/10.1101/2023.07.21.23292757) (medRxiv preprint)
- Weights: [huggingface.co/owkin/phikon](https://huggingface.co/owkin/phikon)
- Code: [github.com/owkin/HistoSSLscaling](https://github.com/owkin/HistoSSLscaling)
