---
title: "Lunit-DINO — Benchmarking SSL on Diverse Pathology Datasets (Kang et al. 2022)"
description: "Benchmarks DINO/SwAV/MoCo/BarlowTwins on pathology data; releases the Lunit-DINO ViT-S/16 checkpoint."
tags: [article, technical-article, foundation-model, ssl, dino, benchmark, lunit]
---

# Benchmarking Self-Supervised Learning on Diverse Pathology Datasets

{{ article("lunit-dino-2022") }}

{{ local_graph("lunit-dino-2022") }}

## Why it matters

In the pre-{{ node_link("uni-2024") }} era, the question "**which SSL recipe transfers best to pathology?**" was open. Lunit-DINO is the first systematic benchmark — comparing **DINO / SwAV / MoCo v2 / Barlow Twins / supervised ImageNet** on patch-level pathology classification across multiple H&E datasets — and shows DINO transfers best. The paper releases the **Lunit-DINO ViT-S/16 checkpoint** (TCGA + Lunit-internal TULIP cohort), which served alongside {{ node_link("ctranspath") }} as one of the strongest open-weights pathology SSL baselines through 2023.

Lunit-DINO is foundational for the modern PFM cohort: UNI / Virchow / Prov-GigaPath all use **DINOv2** (DINO's successor), validating Lunit's recipe choice at scale.

## Core idea

- Standardised pretraining setup: ViT-S/16 backbone, identical compute budget across recipes.
- Pretrain on TCGA + TULIP H&E patches.
- Evaluate frozen-feature linear probe + k-NN on multiple downstream pathology tasks.
- Compare DINO / SwAV / MoCo v2 / Barlow Twins / ImageNet supervised.

DINO consistently wins, motivating its choice for follow-up larger-scale pathology PFMs.

## Inputs and outputs

- **Input**: H&E patch, 224×224.
- **Output**: ViT-S/16 patch embedding.

## Datasets / tasks / metrics

- **Pretraining**: TCGA + TULIP (Lunit-internal).
- **Downstream**: multiple H&E patch classification benchmarks across tissue types.
- **Metrics**: linear probe accuracy, k-NN accuracy, top-k accuracy.

## Method

- ViT-S/16 backbone (later also ViT-B/16 in extended ablations).
- 4 SSL recipes compared head-to-head with matched compute.
- DINO pathology checkpoint released for downstream use.

## Main results

DINO outperforms SwAV / MoCo v2 / Barlow Twins on pathology downstream tasks with the same backbone and compute budget. The released Lunit-DINO ViT-S/16 checkpoint is widely used as an open-weights baseline.

## Limitations

- **Pre-DINOv2** — modern PFMs (UNI / Virchow / Prov-GigaPath) use DINOv2 and outperform Lunit-DINO.
- **ViT-S/16 backbone** is small by modern PFM standards.
- **Pretraining cohort** smaller than 100k+-WSI modern PFMs.

## How Claude should use this article

{{ skill_card("lunit-dino-2022") }}

Cite Lunit-DINO as the **precedent for DINO pathology pretraining** and as an **open-weights compute-cheap SSL baseline**. When discussing pre-DINOv2 pathology recipes, this is the canonical reference.

## Related nodes

- sibling open-weights SSL: {{ node_link("ctranspath-2022") }}, {{ node_link("phikon-2023") }}
- successor (DINOv2): {{ node_link("uni-2024") }}, {{ node_link("virchow-2024") }}, {{ node_link("gigapath-2024") }}
- parent method: {{ node_link("pathology-foundation-model") }}, {{ node_link("patch-level-ssl") }}

## References

- arXiv: [2212.04690](https://arxiv.org/abs/2212.04690)
- Code: [github.com/lunit-io/benchmark-ssl-pathology](https://github.com/lunit-io/benchmark-ssl-pathology)
- Weights: [huggingface.co/lunit/dino-vits16-pretrained](https://huggingface.co/lunit/dino-vits16-pretrained)
- *CVPR 2023* (arXiv preprint December 2022)
