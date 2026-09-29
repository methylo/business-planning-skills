#!/usr/bin/env python3
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]
PACKAGES = ROOT / "packages"
SKILLS = [
    "bizplan-research",
    "bizplan-livinglab",
    "bizplan-kstartup",
    "bizplan-kstartup-pitch",
]
EXCLUDED_PARTS = {"node_modules", "__pycache__"}
EXCLUDED_SUFFIXES = {".pptx", ".pyc"}


def include(path: Path) -> bool:
    rel = path.relative_to(ROOT)
    return not (EXCLUDED_PARTS & set(rel.parts)) and path.suffix not in EXCLUDED_SUFFIXES


def build(name: str) -> Path:
    source = ROOT / name
    target = PACKAGES / f"{name}.skill"
    temp = target.with_suffix(".tmp")
    files = sorted(p for p in source.rglob("*") if p.is_file() and include(p))
    with zipfile.ZipFile(temp, "w", zipfile.ZIP_DEFLATED) as archive:
        for path in files:
            arcname = str(Path(name) / path.relative_to(source))
            info = zipfile.ZipInfo(arcname, date_time=(1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes())
    with zipfile.ZipFile(temp) as archive:
        if archive.testzip() is not None:
            raise RuntimeError(f"Broken package: {name}")
        if f"{name}/SKILL.md" not in archive.namelist():
            raise RuntimeError(f"Missing SKILL.md: {name}")
    temp.replace(target)
    return target


if __name__ == "__main__":
    PACKAGES.mkdir(exist_ok=True)
    for skill in SKILLS:
        print(build(skill).relative_to(ROOT))
