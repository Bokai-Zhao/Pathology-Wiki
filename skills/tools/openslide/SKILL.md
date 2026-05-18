# Skill: tool — OpenSlide

## Purpose
Standard reader for vendor-format whole-slide images.

## When to Use
- Reading SVS / NDPI / VMS / SCN / MRXS / BIF / tiled TIFF WSIs from raw files
- Extracting patches at arbitrary (x, y, level)
- Reading slide metadata: `mpp-x`, `mpp-y`, `level_dimensions`, vendor properties
- First step of nearly every WSI pipeline

## Do Not Use When
- Slide is a tiled TIFF and **pyvips** is faster for the workload
- GPU-decoded reads required → use **cuCIM**
- WSI is **DICOM** → use pydicom or a DICOM-aware reader

## Inputs
- A vendor WSI file path (and any required sibling files for MRXS bundles)

## Outputs
- PIL.Image RGBA tiles, thumbnails, label/macro associated images, property dict

## Installation
```bash
# Linux
sudo apt-get install libopenslide-dev
pip install openslide-python
# macOS
brew install openslide && pip install openslide-python
```
The Python package alone is **insufficient** — the C library must be installed first.

## Minimal usage
```python
import openslide
slide = openslide.OpenSlide("slide.svs")
print(slide.level_dimensions, slide.properties.get("openslide.mpp-x"))
img = slide.read_region((0, 0), level=0, size=(512, 512))   # PIL RGBA
```

## API / CLI availability
- Python API: yes (`openslide-python`)
- CLI: no
- Docker: depends on image — bundle `libopenslide` in the base image

## Troubleshooting
- `OpenSlideUnsupportedFormatError` on `.svs` → file is generic TIFF without pyramid; reopen with `tifffile`.
- MRXS read fails → ensure all sibling INI / folder files are present alongside the `.mrxs`.
- macOS Apple Silicon dyld error → set `DYLD_LIBRARY_PATH` to include Homebrew's lib path.
- Wrong colour after `read_region` → result is RGBA; convert before feeding ImageNet-normalised models.

## Standard Workflow
1. Open slide → inspect `level_dimensions` and `mpp-x` to pick magnification.
2. Generate a tissue mask at low magnification.
3. Sample patch coordinates inside tissue regions.
4. `read_region` at chosen level for each patch.

## Related Nodes
- dataset: `panda` (TIFF readable by OpenSlide)
- methods: `cnn-patch-classification`, `weakly-supervised-mil`

## Failure Modes
- Forgetting that `read_region` returns RGBA, not RGB → channel mismatch downstream.
- Using a non-zero level without rechecking actual mpp → silent magnification mismatch.
- Splitting MRXS bundles → unreadable.

## Validation Checklist
- [ ] System library installed
- [ ] Python binding installed and importable
- [ ] Slide opens and `mpp-x` is non-null
- [ ] Tile reads round-trip to PIL.Image without colour swap
