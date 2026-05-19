---
title: "TANGLE — Transcriptomics-Guided Slide Representation Learning (Jaume et al. 2024)"
description: "Mahmood Lab slide-level PFM pretrained with CLIP-style contrastive alignment between WSIs and bulk RNA-seq."
tags: [article, technical-article, foundation-model, slide-level, multimodal, transcriptomics]
---

# Transcriptomics-Guided Slide Representation Learning in Computational Pathology

{{ article("tangle-2024") }}

{{ local_graph("tangle-2024") }}

## Why it matters

Multimodal slide-level pathology PFMs split into two camps based on the auxiliary modality used for pretraining:

- **Report-guided** ({{ node_link("titan-2025") }}, {{ node_link("prism-2024") }}) — slide ↔ pathology report
- **Transcriptomics-guided** (TANGLE) — slide ↔ bulk RNA-seq

TANGLE is the first widely-cited transcriptomics-guided slide PFM. Its CLIP-style contrastive alignment between WSI patches and RNA-seq vectors yields slide embeddings that are particularly strong on **biomarker / mutation / survival** downstream tasks where molecular truth matters.

## Core idea

```
H&E slide ─→ patch encoder ─→ slide-level Transformer ─→ slide embedding
                                                              ↕
                                                      contrastive (CLIP-style)
                                                              ↕
bulk RNA-seq ─→ MLP ─────────────────────────────────→ rna-seq embedding
```

Pretraining: each (WSI, RNA-seq) pair from a TCGA cohort becomes a positive example; pairs across patients are negatives.

At inference: only the WSI is needed — the RNA-seq encoder is discarded. The slide embedding captures latent transcriptomic context without seeing molecular data at test time.

## Inputs and outputs

- **Input** (pretraining): paired WSI + bulk RNA-seq.
- **Input** (inference): WSI only.
- **Output**: slide embedding (transcriptomics-guided).

## Datasets / tasks / metrics

- **Pretraining**: TCGA cohorts with paired H&E + RNA-seq.
- **Downstream**: biomarker prediction, mutation inference, survival, subtype classification.
- Metrics: AUC, C-index, balanced accuracy.

## Method

- **Patch encoder**: pathology PFM patch features (CONCH/UNI-style).
- **Slide encoder**: slide-level Transformer.
- **RNA-seq encoder**: MLP.
- **Loss**: CLIP-style InfoNCE between slide and RNA-seq embeddings.

## Main results

TANGLE produces slide embeddings that match or exceed UNI / GigaPath patch-feature baselines on biomarker / mutation / survival prediction, even without using RNA-seq at inference time. Establishes the precedent for **molecular-supervised slide pretraining**.

## Limitations

- **Pretraining requires paired RNA-seq + WSI** — limits scale to TCGA-class cohorts.
- **Slide-level only** — patch-level downstream needs an MIL aggregator on PFM features.
- **Bulk RNA-seq** averages over the whole specimen — single-cell or spatial transcriptomics could enable finer-grained alignment.

## How Claude should use this article

{{ skill_card("tangle-2024") }}

Cite TANGLE when **molecular-supervised slide pretraining** is the topic, or when comparing report-guided vs transcriptomics-guided multimodal slide PFMs. For report-guided, cite {{ node_link("titan-2025") }} / {{ node_link("prism-2024") }}.

## Related nodes

- sibling multimodal slide PFMs: {{ node_link("titan-2025") }}, {{ node_link("prism-2024") }}, {{ node_link("madeleine-2024") }}
- predecessor: {{ node_link("uni-2024") }}, {{ node_link("gigapath-2024") }}
- parent method: {{ node_link("pathology-foundation-model") }}

## References

- arXiv: [2405.11618](https://arxiv.org/abs/2405.11618)
- Code: [github.com/mahmoodlab/TANGLE](https://github.com/mahmoodlab/TANGLE)
- *CVPR 2024*
