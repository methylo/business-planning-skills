#!/usr/bin/env python3
import sys
import zipfile
from pathlib import Path

path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("/tmp/business-planning-skills-pitch-test.pptx")
if not path.is_file():
    raise SystemExit(f"Missing PPTX: {path}")
with zipfile.ZipFile(path) as archive:
    broken = archive.testzip()
    if broken is not None:
        raise SystemExit(f"Broken PPTX member: {broken}")
    slides = [
        name for name in archive.namelist()
        if name.startswith("ppt/slides/slide") and name.endswith(".xml")
    ]
if len(slides) != 17:
    raise SystemExit(f"Expected 17 slides, found {len(slides)}")
print(f"PPTX_VALID slides={len(slides)} file={path}")
