# Skill: dataset — MIDOG

## Purpose
Canonical multi-domain **mitotic-figure detection** benchmark on H&E. Multiple scanners, institutions, tumour types, and species (human + canine). Purpose-built for domain generalisation.

## When to Use
- Mitosis detection / counting on H&E
- Domain generalisation / scanner robustness ablations
- Prognostic mitotic-count workflow validation

## Do Not Use When
- Need general nuclei classes other than mitoses — use PanNuke
- Need IHC / Ki67-based proliferation — MIDOG is H&E mitosis only
- Need fully-annotated WSIs — only HPF regions are exhaustively annotated

## Inputs Claude Needs
- Which edition is being used (2021 / 2022 / 2025)
- Whether the user wants raw detection F1 or downstream mitotic-count integration

## Outputs
- Per-detection centre coordinate + class (mitosis vs lookalike) + confidence.

## Download
- Homepage: [imig.science/midog](https://imig.science/midog/)
- Data page: [imig.science/midog/the-dataset/](https://imig.science/midog/the-dataset/)
- Requires registration
- License: CC BY 4.0 (training); test held by organisers

## Preprocessing
1. Read `.tif` via OpenSlide.
2. **Restrict detection scoring to the provided HPF bounding boxes** — outside HPFs the ground truth is undefined.
3. Patch at **40×** (~0.25 μm/px) — mitoses are ~10–20 px wide.
4. Mine hard-negative lookalikes from the released annotations.

## Label mapping
- Centre coordinate + bounding box per mitotic figure.
- Class: true mitosis vs lookalike (atypical / hard negative).

## Splits
- Per-edition splits as released by organisers.
- Test set held by organisers for ongoing leaderboard evaluation; build a local val split from training cohorts.

## Evaluation
- **F1** at fixed centre-distance tolerance (primary).
- Precision, recall, AP.
- **Per-tumour-type, per-scanner breakdowns** are expected — domain generalisation is the explicit purpose.

## Standard Workflow
1. Pretrain on ImageNet / SSL backbone (RetinaNet / FCOS / YOLOv8 typical).
2. Train on multi-domain cohorts; include hard-negative mining from lookalikes.
3. Evaluate on held-out domains (different scanner, different tumour type, different species) — *cross-domain* metrics are the headline number.
4. For downstream mitotic-count workflows: aggregate detections per ROI → count → grade threshold.

## Decision Rules
- Always evaluate **cross-domain** (held-out scanner / tumour type) — naive in-domain numbers are misleading.
- Score detections only within HPF regions.
- Cite the MIDOG edition explicitly (2021 / 2022 / 2025 — tumour mix differs).
- Calibrate count thresholds against pathologist consensus before any prognostic claim.

## Known pitfalls
- Scoring outside HPF regions inflates false positives.
- Naive single-domain training collapses across scanners.
- Mitoses are tiny (~10–20 px) — naive downsizing destroys them.
- Edition matters; do not pool across editions without explicit re-evaluation.
- Test set is held — don't compare to leaderboard numbers without submitting.

## Related Nodes
- tool: `openslide`
- companion: `pannuke` (nuclei broadly)
- (deferred) article: `aubreville-2023-midog`

## Failure Modes
- Counting detections outside HPF → false-positive inflation.
- Single-domain training without cross-domain eval → unstated generalisation gap.
- Edition mixing without re-evaluation → invalid comparison.

## Validation Checklist
- [ ] Detections scored only within HPF regions
- [ ] Cross-domain (held-out scanner / tumour) numbers reported
- [ ] 40× magnification used
- [ ] Edition cited explicitly
- [ ] Hard-negative lookalikes mined into training
