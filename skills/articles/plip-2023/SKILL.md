# Skill: article — PLIP (Huang et al. 2023)

## Purpose
The first widely-cited pathology vision-language foundation model paper. Releases the OpenPath corpus + open weights. Cite as the canonical pathology VL reference.

## When to Use
- Citing the first pathology VL foundation model
- Open-weights pathology VL baseline (when CONCH is unavailable)
- Discussing image-text contrastive pretraining on pathology data
- OpenPath as a reference image-caption corpus

## Do Not Use When
- Need state-of-the-art pathology VL — cite CONCH / QuiltNet / MUSK
- Need slide-level zero-shot — cite MI-Zero
- Need clinical-grade text fidelity — Twitter captions are noisy

## Key Contributions
- CLIP ViT-B/32 fine-tuned on ~200k pathology image-caption pairs from medical Twitter.
- Released the OpenPath dataset (first large-scale pathology image-caption corpus).
- Demonstrated zero-shot pathology classification + image-text retrieval beating CLIP-ImageNet.

## How to Cite
> Huang, Z., Bianchi, F., Yuksekgonul, M., Montine, T. J., & Zou, J. (2023). A visual–language foundation model for pathology image analysis using medical Twitter. *Nature Medicine* 29:2307–2316. DOI: 10.1038/s41591-023-02504-3

## Related Nodes
- proposes method: `pathology-vlm`
- releases model: `plip`
- extends: `clip-2021`
- downstream method: `mi-zero-2023`

## Failure Modes
- Citing PLIP without acknowledging CONCH / QuiltNet successors → out-of-date framing.
- Mis-citing OpenPath license / ethical context.
- Treating Twitter captions as clinical-grade ground truth.

## Validation Checklist
- [ ] Cited as the first widely-used pathology VL model
- [ ] OpenPath corpus mentioned where relevant
- [ ] Successor VLMs (CONCH / QuiltNet) acknowledged if state-of-the-art is the goal
