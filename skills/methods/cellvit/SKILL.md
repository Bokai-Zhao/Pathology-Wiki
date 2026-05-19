# Skill: method — CellViT

## Purpose
Modern ViT-based nuclei instance segmentation + classification. Keeps HoVer-Net's three-decoder head; replaces the encoder with a SAM-pretrained ViT.

## When to Use
- Modern ViT-based nuclei seg + classification baseline
- Need SAM / DINOv2 initialisation in a pathology cell task
- PanNuke leaderboard reference

## Do Not Use When
- Compute-constrained — HoVer-Net CNN is cheaper
- Need a fully pathology-pretrained encoder for **features only** — UNI / GigaPath / Virchow (not for cell seg specifically)
- Need IHC / IF — H&E only

## Standard Workflow
1. Load SAM-pretrained ViT-B or ViT-H weights.
2. Attach NP / HV / NT decoders.
3. Fine-tune on PanNuke (or target cohort) with multi-task loss.
4. Watershed post-processing (same as HoVer-Net).
5. Evaluate PQ + per-class PQ on PanNuke.

## Decision Rules
- **ViT-B (CellViT-256) vs ViT-H (CellViT-SAM-H)**: ViT-H is more accurate but slower; pick by compute budget.
- **Tile size**: CellViT-SAM-H uses 1024×1024 — adjust patch extraction accordingly.
- **Skip SAM init** at your own risk; advantage over HoVer-Net shrinks without it.

## Related Nodes
- predecessor: `hover-net`
- canonical dataset: `pannuke`
- article: `cellvit-2024`

## Failure Modes
- Loading weights without SAM checkpoint → advantage lost.
- Comparing CellViT-256 to CellViT-SAM-H as if interchangeable.
- WSI-scale inference without tiling → memory blow-up.

## Validation Checklist
- [ ] Variant declared (CellViT-256 vs CellViT-SAM-H)
- [ ] SAM weights confirmed loaded
- [ ] PanNuke PQ reported (mean + per-class)
- [ ] Comparison to HoVer-Net on the same fold reported
