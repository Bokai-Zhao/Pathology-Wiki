# Skill: dataset — Camelyon16

## Purpose
The seed public benchmark for breast-cancer lymph-node metastasis detection on H&E WSIs (400 slides, two centres). Anchors most weakly-supervised MIL papers.

## When to Use
- Validating a new WSI binary classification / MIL pipeline
- Comparing weakly-supervised vs fully-supervised tumor detection
- Cross-scanner generalisation studies on H&E

## Do Not Use When
- Patient-level pN staging is the target — use Camelyon17 instead
- Labels needed are not "tumor present in slide" (no molecular subtypes here)
- Need multi-cancer diversity — this is breast lymph-node only

## Inputs Claude Needs
- Whether the user wants slide-level AUC, lesion-level FROC, or both (default: both)
- Patch size and magnification preference (default 256×256 at 20×)

## Outputs
- Slide-level label (negative / ITC / micro / macro), lesion polygons, derived pixel masks.

## Download
- Joint Camelyon16+17 data page: [camelyon17.grand-challenge.org/Data/](https://camelyon17.grand-challenge.org/Data/)
- Requires grand-challenge.org account
- ~750 GB raw — plan Aspera / S3 throughput

## Preprocessing
1. Read `.tif` via OpenSlide.
2. Tissue mask at downsample level.
3. Patch at 20× (or 40×) — 256×256 conventional.
4. Build positive/negative patch labels from the XML tumor polygons.
5. For MIL: bag = slide; instance = patch.

## Label mapping
- Slide-level: negative / itc / micro / macro.
- Lesion polygons → pixel masks per slide.
- For binary slide classification, ITC is often grouped with micro (verify per-paper).

## Splits
- Official: 270 training + 130 test, all slides released.
- Build a held-out val split from training (preserve centre balance).

## Evaluation
- **Slide AUC** for binary tumor presence.
- **Lesion-level FROC** at fixed FPs/image — the headline challenge metric. Requires lesion-level coordinates (not just slide votes).
- Always report per-centre (Radboud vs Utrecht) breakdown.

## Standard Workflow
1. Load slides via OpenSlide, mask tissue, patch at 20×.
2. Run a patch encoder (UNI / CTransPath / ImageNet ViT) → patch features.
3. Aggregate with ABMIL / CLAM / TransMIL → slide score.
4. For FROC, derive lesion coordinates via attention heatmaps or per-patch probability post-processing.
5. Evaluate slide AUC + lesion FROC, per-centre and pooled.

## Decision Rules
- Default backbone: UNI (or CTransPath for a fully-open baseline).
- Default aggregator: CLAM-SB / ABMIL.
- Always pair slide AUC with lesion FROC.

## Known pitfalls
- Slide AUC alone can hide poor localisation — FROC catches it.
- ITC annotations may be incomplete on some slides.
- Stain / scanner drift between Radboud and Utrecht.
- Camelyon17 vs Camelyon16 are different challenges; do not conflate test sets.

## Related Nodes
- tool: `openslide`
- method context: `pathology-foundation-model`, `weakly-supervised-mil` *(method node pending)*
- companion: `panda` (grading complement)
- (deferred) article: `bejnordi-2017-camelyon16`

## Failure Modes
- Reporting only slide AUC → masks localisation failure.
- Loading XML annotations at wrong magnification → coordinate misalignment.
- Mixing Camelyon17 slides into the test set → invalid comparison.

## Validation Checklist
- [ ] WSI reader handles `.tif` Aperio + Hamamatsu vendor metadata
- [ ] Tissue mask drops background reliably
- [ ] Lesion polygons converted to pixel masks at level-0 resolution
- [ ] Slide AUC and lesion FROC both computed
- [ ] Per-centre numbers reported
