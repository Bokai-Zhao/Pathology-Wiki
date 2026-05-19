# Skill: method — HoVer-Net

## Purpose
Canonical CNN for joint nuclei instance segmentation + classification on H&E. Three-decoder architecture with horizontal-vertical distance maps for instance separation.

## When to Use
- Nuclei instance segmentation + classification baseline on H&E
- Educational reference for the HV-decoder instance-separation trick
- Comparing modern ViT cell methods against the canonical CNN baseline

## Do Not Use When
- Need raw patch features for downstream MIL — use a PFM
- Need IHC / IF stains — HoVer-Net is H&E
- Need real-time WSI inference — modern lightweight alternatives may be faster

## Standard Workflow
1. Patch at 40× (256×256 conventional for HoVer-Net).
2. Forward through Pre-Act ResNet encoder + three decoders (NP / HV / NT).
3. Watershed post-processing: seeds from |∇HV| local minima, mask from NP.
4. Per-instance dominant class from NT.
5. Evaluate PQ on PanNuke (or AJI/Dice on CoNSeP/Kumar/CPM).

## Decision Rules
- Use the **community PyTorch port** (`vqdang/hover_net`) for production work; the TF original is older.
- Re-tune **loss weights** on ad-hoc cohorts — paper defaults may not transfer.
- Patch at **40×** — mitoses and small nuclei need the resolution.

## Related Nodes
- successor: `cellvit`
- canonical dataset: `pannuke`
- article: `hover-net-2019`

## Failure Modes
- Default loss weights on a new cohort → suboptimal balance between NP / HV / NT.
- Watershed at WSI scale → CPU-bound bottleneck; budget inference time.
- Comparing HoVer-Net numbers across non-PanNuke datasets without re-training → confounded.

## Validation Checklist
- [ ] Backbone (Pre-Act ResNet-50) declared
- [ ] Loss weights reported
- [ ] Watershed parameters reported
- [ ] PQ + per-class PQ on PanNuke reported
