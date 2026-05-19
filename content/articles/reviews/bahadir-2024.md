---
title: "AI Applications in Histopathology — Bahadir et al. 2024 (Nat Rev Electr Eng)"
description: "Broad review (~206 refs) of deep learning in histopathology: WSI preprocessing, MIL, foundation models, vision-language, segmentation, clinical translation."
tags: [article, review-article, survey, ai-in-histopathology, foundation-model, mil, vlm]
---

# Artificial Intelligence Applications in Histopathology

{{ article("bahadir-2024") }}

{{ local_graph("bahadir-2024") }}

## Why it matters

Bahadir et al. is a **broad survey of the deep-learning toolkit applied to histopathology**, written from the perspective of the electrical-engineering and machine-learning community developing the underlying techniques. The author list spans computational (Bahadir, Sabuncu — Cornell ECE) and clinical (Liechty, Pisapia — Weill Cornell pathology) ends of the pipeline, giving the review a useful pragmatic flavour.

With ~206 references, it covers most of the modern pathology AI stack:

- **WSI acquisition and preprocessing** — slide formats, tissue masking, stain normalisation.
- **Deep-learning architectures** — CNNs, ViTs, graph neural networks, transformer MIL.
- **Weakly-supervised MIL** — {{ node_link("abmil") }}, {{ node_link("clam") }}, {{ node_link("transmil") }}, DSMIL, DTFD-MIL, and the {{ node_link("campanella-2019") }} clinical-grade scale demonstration.
- **Pathology foundation models** — patch-level SSL ({{ node_link("ctranspath") }}, {{ node_link("uni") }}-era) and the vision-only PFM cohort.
- **Vision-language pretraining** — {{ node_link("clip-2021") }} architecture, {{ node_link("plip-2023") }} as the pathology fine-tune, {{ node_link("mi-zero-2023") }} for slide-level zero-shot.
- **Segmentation** — {{ node_link("hover-net") }} for nuclei, {{ node_link("cellvit") }} as the ViT successor, gland segmentation on {{ node_link("glas") }}, multi-resolution methods.
- **Classification, biomarker prediction, survival** — H&E-only mutation prediction, biomarker inference, survival modelling.
- **Mitosis detection** — including the multi-domain {{ node_link("midog") }} benchmark.
- **Generative models** — diffusion for synthesis, GAN-based stain normalisation.
- **Image registration** — ANHIR, Learn2Reg challenges.
- **Clinical translation** — workflow integration, computer-assisted triage, interpretability.

A useful single reference for a thesis introduction or a grant background section. The cutoff is ~mid-2023, so the very latest VLMs (CONCH, QuiltNet, MUSK), slide-level PFMs (GigaPath, Virchow, H-Optimus), and instruction-tuned pathology MLLMs (PathChat) are **not covered**.

## Scope

The review is organised around the **deep-learning pipeline** for histopathology:

1. **Input** — WSI formats, tissue masking, patch extraction, stain normalisation.
2. **Representation** — patch encoders (ImageNet, pathology SSL, foundation models, vision-language).
3. **Aggregation** — MIL aggregators from mean / max pooling through ABMIL / CLAM / TransMIL / graph MIL.
4. **Task heads** — classification, segmentation, detection, regression for survival.
5. **Downstream applications** — biomarker prediction, molecular alteration inference, prognosis stratification.
6. **Clinical integration** — workflow, interpretability, regulatory considerations (lightly covered).

It does not attempt to be a meta-analysis or to rank methods quantitatively — it is an **orientation review** for newcomers and a reference index for experienced practitioners.

## Coverage map (Pathology-Wiki linkage)

| Survey section | Pathology-Wiki nodes the review draws on |
|----------------|-------------------------------------------|
| WSI preprocessing | {{ node_link("openslide") }} |
| WSI public datasets | {{ node_link("camelyon16") }}, {{ node_link("panda") }}, {{ node_link("bach") }}, {{ node_link("glas") }}, {{ node_link("pannuke") }}, {{ node_link("midog") }} |
| Weakly-supervised MIL | {{ node_link("weakly-supervised-mil") }}, {{ node_link("abmil") }} ({{ node_link("abmil-2018") }}), {{ node_link("clam") }} ({{ node_link("clam-2021") }}), {{ node_link("transmil") }} ({{ node_link("transmil-2021") }}), {{ node_link("campanella-2019") }} |
| Nuclei segmentation | {{ node_link("hover-net") }} ({{ node_link("hover-net-2019") }}), {{ node_link("cellvit") }} ({{ node_link("cellvit-2024") }}) |
| Patch-level SSL / PFMs | {{ node_link("patch-level-ssl") }}, {{ node_link("pathology-foundation-model") }}, {{ node_link("ctranspath") }} ({{ node_link("ctranspath-2022") }}), {{ node_link("uni") }} ({{ node_link("uni-2024") }}) |
| Vision-language | {{ node_link("pathology-vlm") }}, {{ node_link("clip-2021") }}, {{ node_link("plip-2023") }} ({{ node_link("plip") }}), {{ node_link("mi-zero-2023") }} |

Bahadir et al.'s coverage of these subtopics is **broad but not deep** — for any specific method, link to the per-paper node above for the canonical treatment.

## Notable framings

- **Author Liechty** has a self-cited contribution on IDH mutation prediction from H&E in gliomas (Liechty et al. *Sci Rep* 2022) — the review uses this as a clinical-translation exemplar.
- **The Campanella 2019 clinical-grade demonstration** is repeatedly cited as the scale precedent for weakly-supervised MIL.
- **Pathology foundation models** are framed as the natural next step after CTransPath, with the review predating the UNI / GigaPath / Virchow wave (cutoff ~mid-2023 explains the relative thinness of the FM section relative to current-2026 standards).
- **Vision-language pathology** is positioned as an emerging direction; PLIP and MI-Zero are highlighted as exemplars but the section is comparatively brief.

## Limitations (of the review itself)

- **Coverage cutoff ~mid-2023** — does not cover CONCH, QuiltNet, MUSK, GigaPath, Virchow, H-Optimus, PathChat, PathGen, agentic pathology workflows.
- **Multimodal (path + omics + radiology)** is treated relatively briefly — MCAT and Vanguri are cited but the broader multimodal stack is not surveyed in depth.
- **Clinical translation depth** is uneven — deeper on deep-learning workflow than on regulatory / FDA / CE deployment considerations.
- **No leaderboard** or per-task comparison tables — for quantitative comparison, link directly to the per-paper nodes.
- **Agentic pathology AI is out of scope** (this branch is too recent for the cutoff).

## How Claude should use this article

{{ skill_card("bahadir-2024") }}

Use Bahadir 2024 as a **single broad reference** for AI-in-histopathology background sections (thesis intro, grant background, related-work paragraph). For any specific method discussed in the review, **link to the per-paper Pathology-Wiki node** for the canonical primary-source treatment.

## Related nodes

- methods: {{ node_link("pathology-foundation-model") }}, {{ node_link("patch-level-ssl") }}, {{ node_link("pathology-vlm") }}, {{ node_link("weakly-supervised-mil") }}, {{ node_link("abmil") }}, {{ node_link("clam") }}, {{ node_link("transmil") }}, {{ node_link("hover-net") }}, {{ node_link("cellvit") }}
- models: {{ node_link("uni") }}, {{ node_link("ctranspath") }}, {{ node_link("plip") }}
- datasets: {{ node_link("camelyon16") }}, {{ node_link("bach") }}, {{ node_link("glas") }}, {{ node_link("pannuke") }}, {{ node_link("midog") }}, {{ node_link("panda") }}
- tools: {{ node_link("openslide") }}
- articles surveyed: {{ node_link("abmil-2018") }}, {{ node_link("clam-2021") }}, {{ node_link("transmil-2021") }}, {{ node_link("campanella-2019") }}, {{ node_link("hover-net-2019") }}, {{ node_link("cellvit-2024") }}, {{ node_link("ctranspath-2022") }}, {{ node_link("clip-2021") }}, {{ node_link("plip-2023") }}, {{ node_link("mi-zero-2023") }}, {{ node_link("uni-2024") }}

## References

- DOI: [10.1038/s44287-023-00012-7](https://doi.org/10.1038/s44287-023-00012-7)
- *Nature Reviews Electrical Engineering* 1(2):93–108 (2024)
