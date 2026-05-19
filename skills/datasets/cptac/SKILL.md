# Skill: dataset — CPTAC

## Purpose
NIH/NCI proteomics-focused sister cohort to TCGA. ~4.5k FFPE WSIs, ~2k patients, 10 cancer cohorts. The canonical external validation cohort for TCGA-trained pathology models, and the only large public cohort with paired H&E + bulk mass-spec proteomics.

## When to Use
- External validation of a TCGA-trained pathology model
- Protein expression prediction from H&E (CPTAC has bulk proteomics that TCGA lacks)
- Phosphoproteomics-aware pathology AI
- Pan-cancer multimodal studies needing proteomics + WSI
- Cross-cohort generalisation studies pairing TCGA + CPTAC

## Do Not Use When
- Need a large per-cancer cohort — TCGA is much larger per cohort
- Need biopsy-level pathology — CPTAC is surgical resection (use `panda` for biopsies)
- Need fully open clinical fields — some require dbGaP approval
- Need real-time clinical-grade test data — CPTAC is retrospective
- Want to use CPTAC for both training and testing on the same paper — defeats its role as external validation

## Inputs Claude Needs
- Which cohort (CPTAC-LUAD / LSCC / CCRCC / PDA / UCEC / GBM / HNSCC / COAD / BRCA / OV)
- Whether multimodal (proteomics, RNA-seq, mutations) or WSI-only
- Whether external validation (TCGA → CPTAC) or primary training

## Outputs
- WSI files (`.svs`), bulk proteomics + phosphoproteomics, RNA-seq counts, mutation VCFs, CNV calls, clinical records.

## Download
- Portal: <https://pdc.cancer.gov/pdc/>
- Per-cohort manifests via PDC web portal or API
- Requires NIH eRA Commons account for some controlled-access; open-access for WSIs and most omics

## Preprocessing
1. Identify per-cohort manifest on the PDC.
2. Download WSIs (FFPE diagnostic `.svs`, Aperio).
3. Read via OpenSlide.
4. Tissue segmentation + patch extraction — CLAM toolkit's TCGA scripts work directly on CPTAC.
5. Stain normalise (Macenko / Vahadane) across cohorts.
6. Match CPTAC case-id for WSI ↔ proteomics ↔ RNA-seq ↔ clinical alignment.
7. Patient-level train/test splits — never slide-level.

## Label mapping
- Cancer-type code (CPTAC-LUAD / LSCC / CCRCC / ...).
- Mutation status, mRNA expression, **protein abundance (bulk proteomics)**, phosphoprotein abundance.
- Clinical outcome: OS / DFS / PFS — right-censored.

## Splits
- No official train/test splits — most papers use the entire CPTAC cohort as a held-out test set for TCGA-trained models.
- For CPTAC-only training: patient-level k-fold within a cohort.

## Evaluation
- External validation: report Δ-AUC between TCGA training and CPTAC test.
- Subtype / mutation: AUC.
- Protein expression: Pearson correlation.
- Survival: C-index.

## Standard Workflow
1. Train pathology model on TCGA cohort A.
2. Evaluate held-out on CPTAC cohort A (matched cancer type) without retraining.
3. Report cohort-shift Δ.
4. For protein-from-histology: train H&E → proteomics regressor on CPTAC; evaluate held-out within CPTAC.

## Decision Rules
- **Default role**: external validation (TCGA → CPTAC), not primary training.
- **For protein prediction**: CPTAC is the only large public option.
- **Cohort selection**: match TCGA cohort by cancer type — CPTAC's CCRCC validates against TCGA-KIRC, etc.
- **Modality coverage**: verify per-case before assuming multimodal availability.

## Related Nodes
- sister cohort: `tcga`
- tool: `openslide`, `clam`
- companion datasets: `camelyon16`, `panda`, `pannuke`, `midog`
- evaluation articles: `gigapath-2024`, `chief-2024`, `virchow-2024`, `uni-2024`, `conch-2024`

## Failure Modes
- Slide-level (not patient-level) splits → leakage.
- Phase II / III / IV pooling without harmonisation → noise.
- Continuous proteomics treated as classification labels → invalid.
- Using CPTAC for both train and test → external-validation purpose lost.
- Forgetting to verify modality availability per case-id.

## Validation Checklist
- [ ] Patient-level (not slide-level) train/test split confirmed
- [ ] FFPE diagnostic slides only (no frozen mix)
- [ ] Patch encoder declared (PFM family + version)
- [ ] Stain normalisation declared
- [ ] External validation framing made explicit (TCGA → CPTAC) when claiming generalisation
- [ ] Continuous proteomics → binned thresholds documented if used as classification
