# Skill: article — Campanella et al. 2019

## Purpose
The clinical-grade scale precedent for weakly-supervised MIL in pathology. Cite when arguing that slide-level labels suffice for clinical-grade accuracy.

## When to Use
- Citing the clinical-grade-scale precedent for weakly-supervised MIL
- Discussing triage workflows / computer-assisted pathology deployment
- Motivating use of slide-level diagnostic-report labels at scale

## Do Not Use When
- Need specific aggregator details — cite ABMIL / CLAM / TransMIL instead
- Need reproducible training data — MSKCC cohorts are internal
- Need biomarker / molecular prediction — paper is tumor-presence only

## Key Contributions
- ~44k MSKCC WSIs across prostate / BCC / breast axillary, slide-level labels only.
- Achieves AUC > 0.98 on tumour-presence detection across three organ systems.
- Defines a computer-assisted triage workflow that could safely exclude 65–75% of confirmed-negative slides.

## How to Cite
> Campanella, G., Hanna, M. G., Geneslaw, L., Miraflor, A., Werneck Krauss Silva, V., Busam, K. J., Brogi, E., Reuter, V. E., Klimstra, D. S., & Fuchs, T. J. (2019). Clinical-grade computational pathology using weakly supervised deep learning on whole slide images. *Nature Medicine* 25(8):1301–1309. DOI: 10.1038/s41591-019-0508-1

## Related Nodes
- parent method: `weakly-supervised-mil`
- predecessor: `abmil-2018`
- successors: `clam-2021`, `transmil-2021`
- context dataset: `camelyon16`

## Failure Modes
- Citing as a method paper — it's primarily a scale + clinical-workflow paper.
- Treating internal MSKCC cohorts as a reproducible benchmark.
- Using AUC alone to claim clinical-grade — triage operating point and per-organ analysis matter.

## Validation Checklist
- [ ] Cited for scale / clinical framing, not specific aggregator innovation
- [ ] Triage workflow context preserved (positive review + sampled negatives)
- [ ] Acknowledged MSKCC cohorts are internal and not redistributable
