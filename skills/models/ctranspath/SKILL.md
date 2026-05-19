# Skill: model — CTransPath

## Purpose
Swin-T pathology SSL checkpoint, pretrained on TCGA+PAIP with SRCL (a MoCo v3 variant). The pre-UNI open-source pathology SSL baseline.

## When to Use
- Need an open-weights pathology SSL baseline (no gating)
- Compute-budget-constrained downstream training (smaller backbone)
- Comparing PFMs — cite CTransPath as the pre-UNI baseline

## Do Not Use When
- Need the strongest possible H&E encoder — UNI / GigaPath / Virchow outperform
- Need slide-level pretraining — GigaPath
- Need vision-language capabilities — CONCH / MUSK / PLIP

## Installation
```bash
git clone https://github.com/Xiyue-Wang/TransPath
# follow repo instructions for weight download
```

## Minimal usage
```python
import torch
from transpath import ctranspath  # via the official repo
model = ctranspath()
model.load_state_dict(torch.load("ctranspath.pth"))
model.eval()
emb = model(patch_224)            # (B, 768)
```

## Standard Workflow (downstream)
1. Extract H&E patches at 224×224 (the pretraining resolution).
2. Forward through frozen CTransPath → 768-dim embeddings.
3. Feed embeddings into an MIL aggregator (ABMIL / CLAM / TransMIL).
4. Train MIL head; encoder stays frozen.

## Decision Rules
- **Default freeze the encoder** — fine-tuning gives marginal gain at large compute cost.
- **Patch resolution**: stick to 224×224 to match pretraining.
- **Stain normalisation**: optional; CTransPath was pretrained without strict normalisation but downstream gains often need it for non-TCGA stains.

## Related Nodes
- belongs to: `patch-level-ssl`, `pathology-foundation-model`
- article: `ctranspath-2022`
- successor (stronger PFM): `uni`

## Failure Modes
- Using non-224 input → distribution shift from pretraining.
- Fine-tuning end-to-end on tiny downstream cohorts → overfits, often worse than frozen.
- Comparing CTransPath frozen features to UNI fine-tuned — mismatched protocols.

## Troubleshooting Notes
- Weight loading mismatch — check the modified Swin-T variant in the repo (not standard Swin-T).
- Embedding dim is 768 (verify against repo) — downstream MLP must match.

## Validation Checklist
- [ ] Patch resolution = 224×224
- [ ] Encoder frozen (or fine-tuning explicitly justified)
- [ ] Comparison to ImageNet-pretrained backbone reported
- [ ] Embedding dim correct in downstream MLP
