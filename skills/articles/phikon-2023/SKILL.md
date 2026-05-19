# Skill: article — Phikon (Filiot et al. 2023)

## Purpose
Owkin's iBOT-pretrained pathology PFM (ViT-B on ~6k TCGA WSIs). Open-weights pre-UNI baseline. iBOT recipe = DINO + masked image modelling.

## When to Use
- Need an open-weights pathology SSL baseline (alternative to CTransPath / Lunit-DINO)
- Citing the iBOT recipe in pathology pretraining
- Comparing pre-UNI pathology PFMs

## Do Not Use When
- Need state-of-the-art performance — UNI / Virchow / Prov-GigaPath outperform
- Need vision-language — CONCH / PLIP
- Need slide-level pretraining — Prov-GigaPath / TITAN

## Key Contributions
- First widely-cited iBOT-pretrained pathology PFM.
- Owkin-released open-weights checkpoint on Hugging Face.
- ~6k TCGA WSIs / ~43M H&E patches pretraining cohort.
- Phikon-v2 (2024) further scales the recipe to ~58k WSIs.

## How to Cite
> Filiot, A., Ghermi, R., Olivier, A., et al. (2023). Scaling self-supervised learning for histopathology with masked image modeling. *medRxiv* 2023.07.21.23292757. DOI: 10.1101/2023.07.21.23292757

## Related Nodes
- sibling open-weights SSL: `ctranspath-2022`, `lunit-dino-2022`
- successor (DINOv2): `uni-2024`
- parent method: `pathology-foundation-model`, `patch-level-ssl`

## Failure Modes
- Treating Phikon as state-of-the-art in 2024+ — Phikon-v2 and modern PFMs outperform.
- Comparing Phikon on slide-level tasks without specifying MIL aggregator on top.

## Validation Checklist
- [ ] iBOT vs DINO vs DINOv2 distinguished
- [ ] Backbone (ViT-B vs ViT-L variant) declared
- [ ] Pretraining cohort (TCGA only) declared
