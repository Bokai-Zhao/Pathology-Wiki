# Skill: article — MADELEINE (Jaume et al. 2024)

## Purpose
First widely-cited multistain slide-level pathology PFM. Cross-stain contrastive pretraining (H&E + IHC + special stains) yields stain-invariant slide embeddings.

## When to Use
- Need stain-invariant slide-level representations
- Multistain (H&E + IHC) downstream tasks
- Discussing cross-stain pretraining strategies

## Do Not Use When
- Have only H&E — overhead of cross-stain training is wasted
- Need patch-level encoder — UNI / Virchow
- Need open weights — gated

## Key Contributions
- First widely-cited multistain slide-level PFM.
- Cross-stain contrastive objective on paired specimens.
- CONCH-style patch encoder + slide-level Transformer.

## How to Cite
> Jaume, G., Vaidya, A., Zhang, A., et al. (2024). Multistain pretraining for slide representation learning in pathology. *ECCV 2024*. DOI: 10.1007/978-3-031-73414-4_2

## Related Nodes
- patch encoder: `conch-2024`, `uni`
- sibling slide PFMs: `gigapath-2024`, `titan-2025`, `prism-2024`
- parent method: `pathology-foundation-model`, `patch-level-ssl`

## Failure Modes
- Comparing MADELEINE on H&E-only tasks — its multi-stain advantage doesn't apply.
- Treating stain modalities as interchangeable — they capture different biology.

## Validation Checklist
- [ ] Stain modalities used in evaluation declared
- [ ] Comparison to H&E-only PFMs noted (MADELEINE's advantage is multistain)
