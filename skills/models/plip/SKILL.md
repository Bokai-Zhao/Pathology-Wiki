# Skill: model — PLIP

## Purpose
CLIP ViT-B/32 fine-tuned on ~200k pathology image-caption pairs from medical Twitter (OpenPath). The first widely-cited open-weights pathology VL model.

## When to Use
- Zero-shot pathology classification via text prompts
- Image-text retrieval on H&E corpora
- Comparing pathology VLMs (cite alongside CONCH / QuiltNet / MUSK)
- Open-weights baseline when CONCH is gated / unavailable

## Do Not Use When
- Need state-of-the-art VL performance — CONCH typically outperforms
- Need slide-level zero-shot — use MI-Zero on top of PLIP, or CONCH-MIL
- Need clinical-grade text fidelity — Twitter captions are noisy

## Installation
```bash
pip install transformers
# or use the official repo
git clone https://github.com/PathologyFoundation/plip
```

## Minimal usage
```python
from transformers import CLIPModel, CLIPProcessor
model = CLIPModel.from_pretrained("vinid/plip")
proc  = CLIPProcessor.from_pretrained("vinid/plip")
inputs = proc(text=["a photo of invasive ductal carcinoma", "a photo of normal breast tissue"],
              images=patch_pil, return_tensors="pt", padding=True)
out = model(**inputs)
probs = out.logits_per_image.softmax(dim=-1)
```

## Standard Workflow
1. Encode candidate class labels as text prompts (use template ensembles).
2. Encode the patch via PLIP image encoder.
3. Compute cosine similarity → softmax → class probability.
4. For slide-level: aggregate via MI-Zero top-k pooling.

## Decision Rules
- **Use prompt ensembles** — single-prompt zero-shot is high-variance.
- **Default backbone**: ViT-B/32 — small, fast.
- **For SOTA tasks**, switch to CONCH; for openness, stick with PLIP.

## Related Nodes
- belongs to: `pathology-vlm`
- extends: `clip-2021`
- article: `plip-2023`

## Failure Modes
- Single-prompt zero-shot → wide accuracy swings.
- Treating patch-level zero-shot as slide-level → mis-attribution.
- Forgetting Twitter caption noise → over-trust on rare conditions.

## Troubleshooting Notes
- Weight loading issues — use Hugging Face `vinid/plip` (canonical).
- Tokenizer differences from OpenAI CLIP — use the bundled processor.

## Validation Checklist
- [ ] Prompt template / ensemble documented
- [ ] Comparison to CLIP-ImageNet zero-shot reported
- [ ] Patch vs slide-level evaluation distinguished
- [ ] Embedding dim matches (512 for ViT-B/32)
