# Skill: dataset — PANDA

## Purpose
The standard public benchmark for prostate Gleason / ISUP grading on H&E biopsy WSIs.

## When to Use
- Evaluating any PFM / MIL / weakly supervised method on Gleason / ISUP grading
- Cross-institution generalisation studies (Radboudumc vs Karolinska)
- Slide-level classification benchmarks needing realistic label noise

## Do Not Use When
- Need radical-prostatectomy slides — PANDA is biopsy-only
- Need pixel-perfect tumor masks — annotations are partial / noisy
- Need patient outcome / survival labels — not available

## Inputs Claude Needs
- Whether the user wants combined evaluation or per-source breakdown
- Patch size / magnification preference (default 256×256 at 20×)

## Outputs
- ISUP grade (0–5), Gleason primary/secondary patterns, tumor masks (subset)

## Download
- Kaggle competition: `prostate-cancer-grade-assessment`
- Requires Kaggle account + acceptance of competition rules
- Test set held by Kaggle — for offline evaluation, build a local val split from training

## Preprocessing
1. Read TIFFs with **OpenSlide** (or pyvips).
2. Tissue mask at low magnification.
3. Patch at 20× (or 10× for compute-bound runs); 256×256 is conventional.
4. **Harmonise across centres**: Radboud and Karolinska annotated under different protocols. Always evaluate per-source as well as pooled.

## Label mapping
- `isup-grade`: ordinal, 0 (benign) to 5 (high-grade carcinoma).
- Quadratic-weighted kappa is the original challenge metric — sensitive to ordinal label distance; calibrate accordingly.
- Class imbalance: ISUP 0 dominates; consider stratified sampling or weighted loss.

## Splits
- Official training set (~10.6K slides, *to verify*) is publicly available; the test set is held by Kaggle.
- Build a local val split per centre for offline studies.
- Community-cleaned subsets exist for the Karolinska label-noise problem.

## Evaluation
- Primary metric: **quadratic-weighted kappa** (ordinal).
- Secondary: balanced accuracy, AUC (per-grade one-vs-rest).
- **Always report per-source numbers** alongside pooled.

## Standard Workflow
1. Load slides via OpenSlide; mask tissue.
2. Patch and run a backbone (UNI / GigaPath / CTransPath) → patch features.
3. Aggregate with ABMIL / CLAM / TransMIL → ISUP grade prediction.
4. Evaluate quadratic-weighted kappa and balanced accuracy, per-centre and pooled.

## Decision Rules
- Default backbone: UNI (vision-only PFM); compare against CTransPath baseline.
- Default aggregator: ABMIL or CLAM for grading on biopsy cores.
- Always include a per-source breakdown — pooled metrics hide cross-centre drift.

## Known pitfalls
- Label noise (Karolinska subset) — use cleaned variants when available.
- Class imbalance toward grade 0.
- Test set inaccessible offline — never compare to Kaggle leaderboard numbers without a submission.
- Biopsy distribution shift vs surgical-resection cohorts (e.g. TCGA-PRAD).

## Related Nodes
- tool: `openslide`
- methods: `weakly-supervised-mil`, `pathology-foundation-model`, `clam`, `abmil` *(method nodes pending)*
- (deferred) article: `bulten-2022-panda`

## Failure Modes
- Reporting only pooled kappa → masks per-centre weakness.
- Using level !=0 without checking `mpp-x` → silent magnification mismatch.
- Comparing to leaderboard without submitting → invalid.

## Validation Checklist
- [ ] WSI reader handles TIFFs (OpenSlide loads sample slide)
- [ ] Tissue mask stage drops background reliably
- [ ] Per-source eval reported alongside pooled
- [ ] Quadratic-weighted kappa computed correctly (use sklearn `cohen_kappa_score(weights="quadratic")`)
