# Skill: article — HoVer-Net (Graham et al. 2019)

## Purpose
The canonical reference for joint nuclei instance segmentation + classification on H&E. Cite whenever HV-decoder or three-branch nuclei architectures appear.

## When to Use
- Citing the canonical joint nuclei seg + classification architecture
- Establishing a CNN baseline for any new cell-level method
- Demonstrating the HV-decoder template for instance separation

## Do Not Use When
- Need ViT-based features — cite CellViT instead
- Need general PFM patch features — cite UNI / GigaPath / CTransPath
- Need IHC / IF — outside the H&E training scope

## Key Contributions
- Three-decoder CNN (NP + HV + NT) for joint nuclei seg + classification in one pass.
- Horizontal-vertical (HV) distance-map decoder driving watershed instance separation.
- CoNSeP dataset (introduced by this paper) — multi-tissue colon cohort.

## How to Cite
> Graham, S., Vu, Q. D., Raza, S. E. A., Azam, A., Tsang, Y. W., Kwak, J. T., & Rajpoot, N. (2019). Hover-Net: Simultaneous segmentation and classification of nuclei in multi-tissue histology images. *Medical Image Analysis* 58:101563. DOI: 10.1016/j.media.2019.101563

## Related Nodes
- proposes method: `hover-net`
- successor article: `cellvit-2024`
- canonical dataset: `pannuke`

## Failure Modes
- Citing HoVer-Net for tasks the paper doesn't cover (slide-level classification, biomarker prediction) → mis-attribution.
- Comparing HoVer-Net numbers without controlling the dataset / fold.

## Validation Checklist
- [ ] Cited as the source of the HV-decoder trick
- [ ] Dataset and fold declared when reporting HoVer-Net numbers
- [ ] Backbone (Pre-Act ResNet-50) declared
