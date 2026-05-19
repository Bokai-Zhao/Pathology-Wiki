---
title: "HoVer-Net: Simultaneous Nuclei Segmentation and Classification (Graham et al. 2019)"
description: "Three-decoder CNN with horizontal-vertical distance maps for joint nuclei instance segmentation and classification."
tags: [article, technical-article, segmentation, nuclei, h-and-e, cnn]
---

# HoVer-Net: Simultaneous Segmentation and Classification of Nuclei in Multi-Tissue Histology Images

{{ article("hover-net-2019") }}

{{ local_graph("hover-net-2019") }}

## Why it matters

Touching nuclei break naive connected-components instance segmentation. HoVer-Net introduces a **single-stage CNN with three decoders** that solves nuclei instance segmentation + classification in one forward pass, using a horizontal-vertical (HV) distance-map decoder to drive watershed-style separation of touching nuclei.

The **HV-decoder template** has been reused by {{ node_link("cellvit") }} and many other follow-ups; HoVer-Net remains the canonical CNN baseline for cell-level H&E analysis.

## Core idea

Three decoder branches share a Pre-Act ResNet encoder:

1. **NP decoder** — nuclear pixel mask (binary foreground vs background).
2. **HV decoder** — per-pixel signed distance from the nucleus centre in x and y.
3. **NT decoder** — per-nucleus class label (when annotations are available).

Post-processing:

```
seeds = local minima of |∇HV|
mask  = NP > threshold
instances = watershed(mask, seeds)
class[i] = mode(NT[instances == i])
```

## Inputs and outputs

- **Input**: H&E patch, typically 256×256 at 40×.
- **Output**: per-pixel instance ID + per-nucleus class label.

## Datasets / tasks / metrics

- **CoNSeP** (introduced in this paper), Kumar, CPM, {{ node_link("pannuke") }}.
- Tasks: nuclei instance segmentation, nuclei classification (4–6 classes depending on dataset).
- Metrics: PQ, Dice, AJI, F1.

## Method

- Encoder: Pre-Act ResNet-50.
- Three decoder branches with task-specific upsampling.
- Loss: combination of cross-entropy (NP, NT) + MSE (HV) + Dice (NP) with carefully tuned weights.
- Watershed post-processing on the HV gradient.

## Main results

HoVer-Net outperforms Mask R-CNN, Micro-Net, and DCAN on CoNSeP / Kumar / CPM at release. Remains a strong PanNuke baseline today (modern ViT-based methods like {{ node_link("cellvit") }} surpass it but cite it as the reference).

## Limitations

- **Multi-task loss balancing** is sensitive — paper provides ratios, ad-hoc cohorts need re-tuning.
- **Watershed post-processing** is the inference bottleneck at WSI scale.
- **CNN backbone** is dated; {{ node_link("cellvit") }} addresses this.
- **H&E only** — IHC / multiplex IF need re-training.

## How Claude should use this article

{{ skill_card("hover-net-2019") }}

Cite as the **canonical joint nuclei seg + classification architecture**. Use HoVer-Net as the CNN baseline against which any new ViT-based or graph-based method is compared.

## Related nodes

- proposes method: {{ node_link("hover-net") }}
- successor: {{ node_link("cellvit-2024") }} ({{ node_link("cellvit") }})
- canonical dataset: {{ node_link("pannuke") }}

## References

- DOI: [10.1016/j.media.2019.101563](https://doi.org/10.1016/j.media.2019.101563)
- Code: [github.com/vqdang/hover_net](https://github.com/vqdang/hover_net)
