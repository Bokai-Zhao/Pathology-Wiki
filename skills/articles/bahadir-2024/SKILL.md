# Skill: article — Bahadir et al. 2024 (AI in Histopathology — Nat Rev Electr Eng)

## Purpose
Broad orientation review of deep learning in histopathology (~206 refs). Cite as a single background reference for any thesis intro, grant background, or related-work section.

## When to Use
- Need a single broad reference for AI-in-histopathology background
- Surveying classical → modern pipelines in computational pathology
- Looking for entry-level positioning of MIL / PFM / VLM in a unified narrative
- Thesis intro / grant proposal background section

## Do Not Use When
- Need 2024+ developments (CONCH / GigaPath / Virchow / H-Optimus / PathChat) — coverage cutoff ~mid-2023
- Need deep clinical regulatory / deployment guidance
- Need a primary source — review, not novel methodology
- Need depth on multimodal path+omics+radiology — coverage is light
- Need quantitative leaderboard comparisons

## Key Contributions
- Surveys the WSI deep-learning pipeline end-to-end: preprocessing → representation → aggregation → task heads → clinical integration.
- Coherent treatment of CNN / MIL / transformer / GNN / SSL / VL strands of pathology AI.
- Useful single reference index for ~206 important pathology AI papers up to mid-2023.
- Author list bridges EE/ML (Bahadir, Sabuncu — Cornell ECE) and clinical pathology (Liechty, Pisapia — Weill Cornell).

## How to Cite
> Bahadir, C. D., Omar, M., Rosenthal, J., Marchionni, L., Liechty, B., Pisapia, D. J., & Sabuncu, M. R. (2024). Artificial intelligence applications in histopathology. *Nature Reviews Electrical Engineering* 1(2):93–108. DOI: 10.1038/s44287-023-00012-7

## Related Nodes
- methods discussed: `pathology-foundation-model`, `patch-level-ssl`, `pathology-vlm`, `weakly-supervised-mil`, `abmil`, `clam`, `transmil`, `hover-net`, `cellvit`
- models discussed: `uni`, `ctranspath`, `plip`
- datasets surveyed: `camelyon16`, `panda`, `bach`, `glas`, `pannuke`, `midog`
- tools surveyed: `openslide`
- canonical primary-source articles for each topic: `abmil-2018`, `clam-2021`, `transmil-2021`, `campanella-2019`, `hover-net-2019`, `cellvit-2024`, `ctranspath-2022`, `clip-2021`, `plip-2023`, `mi-zero-2023`, `uni-2024`

## Failure Modes
- Citing Bahadir 2024 instead of the primary methodology paper → mis-attribution. For specific method claims, cite the primary source.
- Forgetting the ~mid-2023 cutoff and using it to discuss 2024+ developments.
- Treating the review as a benchmark — it is descriptive, not comparative.

## Validation Checklist
- [ ] Cited as a survey, not a primary source
- [ ] Primary-source papers cited alongside for any specific method claim
- [ ] Cutoff date acknowledged when discussing recent (2024+) work
- [ ] Linked to per-paper Pathology-Wiki nodes for deeper treatment
