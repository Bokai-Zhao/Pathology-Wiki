# Skill: method — Pathology Foundation Model

## Purpose
Umbrella method for any large pretrained pathology encoder. Use this node to position a new model / paper / benchmark in the PFM space.

## When to Use
- Discussing pretraining strategies for WSI encoders
- Framing a benchmark around foundation models vs natural-image baselines
- Positioning a new model in the PFM space

## Do Not Use When
- The user wants the **specific architecture / pretraining recipe** — link directly to the model node (e.g. `uni`)
- The discussion is about MIL aggregation, not feature pretraining — link to the relevant aggregator method instead

## Standard Workflow
1. Decide which sub-branch the new model belongs to: vision-only, vision-language, vision-omics, slide-level, multi-scale.
2. Add edges: `model --version_of--> pathology-foundation-model` (if a versioning chain exists), `model --belongs_to--> pathology-foundation-model`.
3. Compare against existing PFM models in `representative_models`.

## Decision Rules
- For benchmark design: pair at least one vision-only PFM (e.g. UNI), one slide-level PFM (e.g. GigaPath), and one vision-language PFM (e.g. CONCH) when scope allows.
- A new "PFM" with <50K WSIs of pretraining is borderline — record as `to_verify` until corroborated by independent eval.

## Related Nodes
- patch-level-ssl, slide-level-pretraining, multi-scale-pretraining
- vision-only-pfm, vision-language-pfm, vision-omics-pfm
- representative models: uni (more to be added)

## Failure Modes
- Treating "PFM" as a single category — distinguish vision-only from VLM clearly.
- Quoting headline numbers from one paper as universal truth — always cite the specific model.

## Validation Checklist
- [ ] New PFM model placed in the correct sub-branch
- [ ] At least one comparison axis defined vs existing PFMs
- [ ] Pretraining scale stated (or marked unknown)
