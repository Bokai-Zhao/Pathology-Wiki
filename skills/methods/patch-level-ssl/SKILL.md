# Skill: method — Patch-Level SSL (Pathology)

## Purpose
Pretrain a patch encoder on millions of unlabelled pathology patches using SSL (contrastive / DINO / MIM). Frozen features feed downstream MIL aggregators.

## When to Use
- Discussing pathology SSL pretraining recipes (CTransPath, Phikon, Lunit-DINO, UNI, Virchow, H-Optimus, PathDINO)
- Comparing patch-level encoders for downstream MIL
- Positioning a new patch SSL method in the PFM landscape

## Do Not Use When
- User wants slide-level pretraining (GigaPath) — different sub-branch
- User wants vision-language alignment (CONCH / MUSK / PLIP) — different sub-branch

## Standard Workflow
1. Curate millions of H&E patches from multi-cohort WSIs (tissue-masked, deduplicated).
2. Pretrain a ViT / Swin / similar encoder with chosen SSL objective.
3. Validate frozen features on a downstream patch-classification probe.
4. Release the encoder; downstream pipelines freeze it and add MIL on top.

## Decision Rules
- **Objective**: DINOv2 is the current default for the strongest encoders (UNI, Virchow, H-Optimus). Contrastive (MoCo v3 / SRCL) is the lighter alternative (CTransPath).
- **Scale**: more pretraining data + bigger models help; 100k+ WSIs is the modern threshold.
- **Open vs gated weights**: gating matters in practice — CTransPath is the open default, UNI / GigaPath are gated.

## Related Nodes
- parent: `pathology-foundation-model`
- representative articles: `uni-2024`, `ctranspath-2022`
- representative models: `uni`, `ctranspath`

## Failure Modes
- Pretraining on a single cohort (TCGA only) → poor non-TCGA stain generalisation.
- Comparing encoders without controlling downstream pipeline → confounds encoder gains with MIL changes.
- Citing a checkpoint without specifying which variant (UNI vs UNI2).

## Validation Checklist
- [ ] Objective declared (DINOv2 / iBOT / SRCL / MoCo v3 / ...)
- [ ] Pretraining cohort declared (TCGA-only vs multi-cohort)
- [ ] Backbone size declared (ViT-T / S / B / L / H)
- [ ] Embedding dim declared
- [ ] Downstream evaluation uses frozen features (else confound with fine-tuning)
