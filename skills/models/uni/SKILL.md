# Skill: model — UNI

## Purpose
Tell Claude when to recommend UNI as a backbone, how to load it, and where it fails.

## When to Use
- Default vision-only PFM backbone for H&E classification / MIL / retrieval
- Strong baseline in any new pathology PFM benchmark
- Frozen-feature pipelines on biopsy / surgical resection slides

## Do Not Use When
- VLM tasks (image-text retrieval, captioning, VQA) → use CONCH or MUSK
- Slide-level pretraining objective needed → use GigaPath / Prov-GigaPath
- User cannot accept gated Hugging Face weights → use CTransPath or open ViT
- IHC / IF inputs — UNI is H&E-only

## Inputs
- H&E patches, 224×224 or 256×256, ~0.5 μm/px
- Pretrained UNI ViT-L/16 weights (Hugging Face, gated)

## Outputs
- 1024-d patch embeddings (verify against the released checkpoint)

## Installation / loading
```python
# Gated — request access on Hugging Face first
from huggingface_hub import login; login()

import timm
model = timm.create_model(
    "hf_hub:MahmoodLab/UNI",
    pretrained=True,
    init_values=1e-5,
    dynamic_img_size=True,
)
model.eval()
```

Verify against the [UNI README](https://github.com/mahmoodlab/UNI).

## Standard Workflow
1. Tile WSIs (OpenSlide / pyvips) at 20× to 224 or 256 px patches.
2. Run UNI in eval mode → patch embeddings.
3. Aggregate with ABMIL / CLAM / TransMIL for slide-level prediction, or use directly for retrieval.
4. Compare against CTransPath / GigaPath / Virchow / H-Optimus / CONCH baselines.

## Decision Rules
- Frozen features beat fine-tuning in most low-data tasks per the paper — start frozen, only fine-tune with strong evidence.
- If a benchmark requires multi-resolution (e.g. WSI + zoom-out), pair UNI with a slide-level pretraining model rather than relying on UNI alone.
- For non-H&E modalities, do not use UNI — switch encoders.

## Related Nodes
- article: `uni-2024`
- method: `pathology-foundation-model`, `patch-level-ssl`
- predecessors: `ctranspath` (when ingested), `phikon`, `lunit-dino`

## Failure Modes
- Using UNI on IHC produces brittle embeddings — silently bad.
- Not normalising patches to UNI's expected colour/intensity distribution — degrades retrieval.
- Forgetting Hugging Face access request → 403 at download time.

## Validation Checklist
- [ ] Modality is H&E
- [ ] Patches at 224 / 256 px, 20× (~0.5 μm/px)
- [ ] User has accepted UNI's HF licence
- [ ] Considered UNI2 if the project will run >6 months
