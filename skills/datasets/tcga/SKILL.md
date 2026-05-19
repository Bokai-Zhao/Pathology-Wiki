# Skill: dataset — TCGA

## Purpose
The largest public multi-omics cancer cohort: ~30k WSIs, 33 cancer types, ~11k patients, paired with RNA-seq / mutations / CNV / methylation / clinical records. Default training cohort for almost every pathology AI paper.

## When to Use
- Pretraining a pathology foundation model (CTransPath / UNI / Virchow / Phikon / Prov-GigaPath all use it)
- Evaluating WSI MIL / PFM methods on standard pan-cancer or per-cancer subtyping
- Multimodal histology-genomics studies (paired WSI + RNA-seq + mutations)
- Pan-cancer survival prediction (PORPOISE / TANGLE / MCAT setups)
- Cross-cohort generalisation studies (TCGA as training, non-TCGA as test)

## Do Not Use When
- Need biopsy-level pathology — TCGA is mostly surgical resections + frozen sections (use `panda` for prostate biopsies)
- Need real-time clinical-grade test data — TCGA is retrospective and decade-old
- Need patient-level controlled-access fields — dbGaP approval required and slow
- Need scanner / cohort consistency — TCGA spans many scanners and labs by design
- Need diversity beyond academic-medical-centre cases — TCGA skews late-stage and academic-centre

## Inputs Claude Needs
- Which cohort (BRCA / LUAD / LUSC / RCC / NSCLC / pan-cancer / ...)
- Whether FFPE only or FFPE + frozen
- Whether WSI-only or multimodal (need paired RNA-seq?)
- Patient-level vs slide-level evaluation requirement

## Outputs
- WSI files (`.svs`), bulk RNA-seq counts, mutation VCFs, CNV calls, methylation betas, clinical records.

## Download
- Portal: <https://portal.gdc.cancer.gov/>
- Bulk: `gdc-client download -m {manifest}.txt`
- Requires: NIH eRA Commons account for controlled-access; open-access for WSIs and most genomics

## Preprocessing
1. **Filter to FFPE** (`-DX-*.svs`) — frozen sections (`-TS-*.svs`) are noisier.
2. Read `.svs` via OpenSlide.
3. Tissue segmentation + patch extraction — use the CLAM toolkit's TCGA scripts.
4. Stain normalise (Macenko / Vahadane) across cohorts.
5. Match TCGA barcodes (case-uuid) for WSI ↔ RNA-seq ↔ clinical alignment.
6. **Patient-level train/test splits** — never slide-level.

## Label mapping
- Cancer-type code (TCGA-BRCA, TCGA-LUAD, etc.) — 33 cohorts.
- Molecular subtype, mutation status, mRNA expression, copy-number state, methylation beta.
- Clinical outcome: OS (overall survival), DFS (disease-free), PFS (progression-free) — right-censored.

## Splits
- No official train/test splits — every paper makes its own. Standard practice:
  - Patient-level k-fold within a cohort.
  - Cross-cohort: TCGA cohort as training, non-TCGA institutional cohort as held-out test.
- Stratify by molecular subtype / cancer stage when class imbalance is large.

## Evaluation
- Subtype classification: AUC, balanced accuracy, top-k accuracy.
- Mutation / biomarker prediction: AUC.
- Survival: **C-index** (concordance), Kaplan-Meier curve separation, log-rank test.
- Always report cross-cohort numbers if claiming generalisation.

## Standard Workflow
1. Decide cohort(s) and modality scope.
2. Bulk-download via `gdc-client`.
3. Filter / preprocess (FFPE, tissue mask, patch).
4. Patient-level train/test split.
5. Train MIL aggregator (CLAM / TransMIL / DSMIL) on PFM patch features (UNI / Virchow / GigaPath).
6. Evaluate with task-appropriate metric.

## Decision Rules
- **For pretraining**: TCGA is fine but consider larger cohorts (Prov-Path, MSKCC Virchow) if available.
- **For evaluation**: pair TCGA with at least one non-TCGA cohort to claim generalisation.
- **Modality**: only require RNA-seq / mutations when the task needs them — many MIL papers use WSI alone.

## Related Nodes
- tool: `openslide`, `clam`
- companion datasets: `camelyon16`, `panda`, `pannuke`, `midog`
- pretraining articles: `ctranspath-2022`, `phikon-2023`, `lunit-dino-2022`
- multimodal articles: `mcat-2021`, `porpoise-2022`, `tangle-2024`
- evaluation articles: `clam-2021`, `transmil-2021`, `dsmil-2021`, `dtfd-mil-2022`

## Failure Modes
- Slide-level (not patient-level) splits → leakage; reported AUC is invalid.
- Mixing FFPE and frozen sections without controlling for it → noise inflation.
- Comparing per-cohort numbers across papers without controlling for split / patch encoder → confounded.
- Treating right-censored survival as classification → systematic bias.
- Forgetting cross-cohort evaluation when claiming generalisation.

## Validation Checklist
- [ ] Patient-level (not slide-level) train/test split confirmed
- [ ] FFPE vs frozen sections declared
- [ ] Patch encoder declared (PFM family + version)
- [ ] Stain normalisation declared (or its absence justified)
- [ ] Cross-cohort generalisation reported (or limitation acknowledged)
- [ ] Survival uses C-index + Kaplan-Meier (not classification AUC)
