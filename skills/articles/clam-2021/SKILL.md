# Skill: article — CLAM (Lu et al. 2021)

## Purpose
The standard reference for modern weakly-supervised MIL in pathology. Cite whenever a pipeline uses the mahmoodlab/CLAM toolkit or CLAM aggregator.

## When to Use
- Building any modern WSI multi-class slide-level baseline
- Need an open-source, well-maintained MIL toolkit
- Data-limited settings where instance clustering helps
- Reproducing 2021–2025 PFM evaluation results

## Do Not Use When
- Need explicit instance-instance correlation modelling — TransMIL / DSMIL
- Need slide-level pretraining of the encoder — GigaPath
- Need pixel-level supervision — fully-supervised segmentation

## Key Contributions
- Per-class attention branches (CLAM-MB) for multi-class slide-level prediction.
- Instance-level clustering loss for attention regularisation + data efficiency.
- Open-source end-to-end WSI pipeline at `mahmoodlab/CLAM`.

## How to Cite
> Lu, M. Y., Williamson, D. F. K., Chen, T. Y., Chen, R. J., Barbieri, M., & Mahmood, F. (2021). Data-efficient and weakly supervised computational pathology on whole-slide images. *Nature Biomedical Engineering* 5(6):555–570. DOI: 10.1038/s41551-020-00682-w

## Related Nodes
- proposes method: `clam`
- parent method: `weakly-supervised-mil`
- predecessor: `abmil-2018`
- sibling: `transmil-2021`
- datasets: `camelyon16`, `panda`
- repo: `mahmoodlab/CLAM` (tool node deferred)

## Failure Modes
- Citing CLAM but using ImageNet ResNet-50 features for new work → criticism warranted, use UNI / GigaPath.
- Comparing CLAM-SB on multi-class tasks → use CLAM-MB.
- Treating instance loss as always beneficial → ablate it.

## Validation Checklist
- [ ] CLAM-SB vs CLAM-MB choice declared
- [ ] Backbone declared (ImageNet vs PFM)
- [ ] Instance-loss weight reported
- [ ] Per-class accuracy reported for multi-class tasks
