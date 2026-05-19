# Skill: article — CellViT (Hörst et al. 2024)

## Purpose
The standard reference for modern ViT-based nuclei segmentation + classification. Cite whenever SAM/DINOv2-pretrained ViT encoders meet HoVer-Net-style decoders.

## When to Use
- Modern ViT-based nuclei seg + classification baseline
- Need SAM / DINOv2 initialisation in a pathology cell task
- PanNuke leaderboard reference

## Do Not Use When
- Compute-constrained — HoVer-Net CNN is cheaper
- Need a fully pathology-pretrained encoder for features only — UNI / GigaPath / Virchow
- Need IHC / IF — H&E only

## Key Contributions
- Replaces HoVer-Net's CNN encoder with SAM-pretrained ViT (B / H).
- Preserves HoVer-Net's three-decoder head (NP / HV / NT).
- Two open-source variants: CellViT-256 (ViT-B) and CellViT-SAM-H (ViT-H).
- State of the art on PanNuke at release.

## How to Cite
> Hörst, F., Rempe, M., Heine, L., Seibold, C., Keyl, J., Baldini, G., Ugurel, S., Siveke, J., Grünwald, B., Egger, J., & Kleesiek, J. (2024). CellViT: Vision Transformers for precise cell segmentation and classification. *Medical Image Analysis* 94:103143. DOI: 10.1016/j.media.2024.103143

## Related Nodes
- proposes method: `cellvit`
- predecessor: `hover-net-2019`
- canonical dataset: `pannuke`

## Failure Modes
- Citing without specifying ViT variant (256 vs SAM-H) → comparison ambiguous.
- Comparing to HoVer-Net without controlling for SAM-pretraining advantage → mixes contributions.

## Validation Checklist
- [ ] Variant declared (CellViT-256 vs CellViT-SAM-H)
- [ ] SAM init confirmed
- [ ] PanNuke PQ reported per-class
- [ ] Comparison to HoVer-Net on the same fold reported
