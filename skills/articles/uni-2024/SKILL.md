# Skill: article — UNI (uni-2024)

## Purpose
Provide Claude with the rules for citing and using the UNI paper.

## When to Cite
- Any benchmark / comparison involving pathology foundation models on H&E
- Any discussion of self-supervised learning (DINOv2) for pathology
- Justifying choice of ViT-L/16 patch encoder for WSI pipelines

## Do Not Cite When
- Discussing slide-level pretraining objectives (cite GigaPath instead)
- Discussing pathology vision-language models (cite CONCH / MUSK instead)
- The user wants a fully open-pretraining-data foundation model

## Inputs Claude Needs
- Downstream task type (classification / MIL / retrieval)
- Whether the user accepts gated weights (Hugging Face request)

## Outputs Expected
- Reference: Chen et al., "Towards a General-Purpose Foundation Model for Computational Pathology", *Nature Medicine* 2024.
- Recommendation: cite alongside CTransPath, GigaPath, Virchow, H-Optimus, CONCH when comparing PFMs.

## Standard Workflow
1. If the user is choosing a backbone: recommend UNI as a default vision-only baseline and discuss UNI2 as the successor.
2. If the user is writing related work: pair with CTransPath (predecessor) and GigaPath / Virchow (contemporaries).
3. If the user is reproducing the paper: warn that Mass-100K is internal — reproduction from scratch is not possible.

## Decision Rules
- Default benchmark backbone for new H&E-only WSI experiments → UNI (frozen features) + an MIL aggregator.
- Frozen features beat fine-tuning in most low-data tasks reported by the paper; cite this when justifying frozen-feature design.
- When UNI2 is added, **switch the default citation** from `uni-2024` to the UNI2 paper for new PFM comparisons.

## Related Nodes
- model: `uni`
- method: `pathology-foundation-model`, `patch-level-ssl`
- (deferred) datasets: `mass-100k`

## Failure Modes
- Quoting specific UNI metrics from memory → don't; refer the user to the paper.
- Conflating UNI with UNI2 → check `claude.md` history; UNI2 has different scale/capabilities.

## Examples
- "Which encoder should I use for grading on TCGA-BRCA?" → recommend UNI features + CLAM/TransMIL aggregator; mention GigaPath if slide-level pretraining is desired.
- "Cite a pathology PFM" → use Chen et al. 2024 (UNI) as the canonical vision-only PFM reference.

## Validation Checklist
- [ ] Did I clarify UNI is **vision-only**, not VLM?
- [ ] Did I mention UNI2 if the user is choosing a long-term backbone?
- [ ] Did I avoid quoting unverified metrics?
