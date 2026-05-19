# Skill: article — PathChat (Lu et al. 2024)

## Purpose
First conversational pathology copilot. CONCH visual encoder + Llama-2 13B + ~456k pathology Q&A instruction-tuning. Cite when discussing instruction-tuned pathology MLLMs.

## When to Use
- Citing the first conversational pathology copilot
- Discussing instruction-tuned pathology MLLMs (vs zero-shot CONCH)
- Designing a pathology Q&A or report-generation pipeline
- Comparing pathology MLLMs

## Do Not Use When
- Need open instruction-tuning data — internal
- Need a non-generative VL model — cite CONCH directly
- Need slide-level reasoning — patch-level only

## Key Contributions
- First published conversational pathology copilot from a major research lab.
- CONCH visual encoder + Llama-2 13B + lightweight projector.
- ~456k pathology-specific instruction-response pairs for SFT.
- Outperforms LLaVA-Med and GPT-4V on multi-pathologist evaluation.

## How to Cite
> Lu, M. Y., Chen, B., Williamson, D. F. K., et al. (2024). A multimodal generative AI copilot for human pathology. *Nature* 634:466–473. DOI: 10.1038/s41586-024-07618-3

## Related Nodes
- visual encoder: `conch-2024`
- predecessor: `plip-2023` (`plip`), `clip-2021`
- parent method: `pathology-vlm`

## Failure Modes
- Citing PathChat as a zero-shot model — it's instruction-tuned generative.
- Treating Llama-2 13B base as fixed — newer LLM bases would change downstream behaviour.
- External prospective validation pending; in-the-wild behaviour beyond the published evaluation panel is unknown.

## Validation Checklist
- [ ] Visual encoder (CONCH) declared
- [ ] LLM base (Llama-2 13B) declared
- [ ] Instruction-tuning corpus size noted
- [ ] Internal-only validation acknowledged when citing clinical claims
