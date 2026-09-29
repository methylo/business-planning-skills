import hashlib
import json
import re
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILLS = [
    "bizplan-research",
    "bizplan-livinglab",
    "bizplan-kstartup",
    "bizplan-kstartup-pitch",
]
VERSION = "1.2.0"


class RepositoryContractTests(unittest.TestCase):
    def frontmatter(self, name):
        text = (ROOT / name / "SKILL.md").read_text(encoding="utf-8")
        match = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.S)
        self.assertIsNotNone(match, name)
        block = match.group(1)
        fm = {}
        for key in ("name", "version", "author", "license"):
            item = re.search(rf"(?m)^{key}:\s*(.+)$", block)
            fm[key] = item.group(1).strip().strip('"\'') if item else None
        return fm, text

    def test_frontmatter_is_consistent(self):
        for name in SKILLS:
            fm, _ = self.frontmatter(name)
            self.assertEqual(fm["name"], name)
            self.assertEqual(str(fm["version"]), VERSION)
            self.assertEqual(fm["author"], "홍순성 (methylo)")
            self.assertEqual(fm["license"], "All Rights Reserved")

    def test_packages_have_deterministic_metadata(self):
        for name in SKILLS:
            package = ROOT / "packages" / f"{name}.skill"
            with zipfile.ZipFile(package) as archive:
                for info in archive.infolist():
                    self.assertEqual(info.date_time, (1980, 1, 1, 0, 0, 0), info.filename)
                    self.assertEqual((info.external_attr >> 16) & 0o777, 0o644, info.filename)

    def test_required_kstartup_references_exist(self):
        required = {
            "template.md",
            "style-guide.md",
            "evaluation-criteria.md",
            "tables.md",
            "input-contract.md",
        }
        actual = {p.name for p in (ROOT / "bizplan-kstartup" / "references").glob("*")}
        self.assertTrue(required <= actual, required - actual)

    def test_pipeline_contract_fields_are_consumed_downstream(self):
        _, text = self.frontmatter("bizplan-kstartup")
        for field in (
            "cross_validation",
            "critical_slots_missing_A",
            "fulfillment_report",
            "missing_slots",
            "5종 카드",
        ):
            self.assertIn(field, text)

    def test_kstartup_declares_pitch_output_contract(self):
        contract = ROOT / "bizplan-kstartup" / "references" / "pitch-output-contract.md"
        self.assertTrue(contract.is_file())
        text = contract.read_text(encoding="utf-8")
        for field in ("meta", "problem", "solution", "market", "team", "closing"):
            self.assertIn(field, text)
        consumer = (ROOT / "bizplan-kstartup-pitch" / "references" / "pitch-input-schema.md").read_text(encoding="utf-8")
        for field in ("meta", "problem", "solution", "market", "team", "closing"):
            self.assertIn(field, consumer)
        self.assertIn("career", text)
        self.assertIn("career", consumer)
        self.assertNotIn("experience", text)

    def test_pitch_builder_assets_exist(self):
        for rel in (
            "package.json",
            "scripts/build-pitch.js",
            "examples/pitch-input.example.json",
            "references/pitch-input-schema.md",
        ):
            self.assertTrue((ROOT / "bizplan-kstartup-pitch" / rel).exists(), rel)

    def test_pitch_uses_supported_ellipse_shape(self):
        text = (ROOT / "bizplan-kstartup-pitch" / "references" / "template.js").read_text(encoding="utf-8")
        self.assertNotIn("ShapeType.oval", text)
        self.assertIn("ShapeType.ellipse", text)

    def test_public_sources_exclude_private_vault_paths_and_exact_sample_address(self):
        forbidden_path_digests = {
            8: "78ccb0c7881e10ab2237d094116d87d1938a372e7f4ef9378b74ad3be4d098d6",
            9: "ba7519e5351f3637791a94350919efccbb7b73c862e926f6dbf8c1f83c637098",
        }
        forbidden_address_digest = "723685d34fbedeb9a327d4f0fb790b1594f2d5ac18e87293aef7371d260947ce"
        for path in ROOT.rglob("*"):
            if not path.is_file() or ".git" in path.parts or "node_modules" in path.parts or path.suffix == ".skill":
                continue
            text = path.read_text(encoding="utf-8", errors="ignore")
            for line in text.splitlines():
                for length, forbidden_digest in forbidden_path_digests.items():
                    for start in range(0, max(0, len(line) - length + 1)):
                        fragment = line[start:start + length]
                        digest = hashlib.sha256(fragment.encode("utf-8")).hexdigest()
                        self.assertNotEqual(forbidden_digest, digest, str(path.relative_to(ROOT)))
                compact = re.sub(r"\s+", "", line)
                for start in range(0, max(0, len(compact) - 8 + 1)):
                    fragment = compact[start:start + 8]
                    digest = hashlib.sha256(fragment.encode("utf-8")).hexdigest()
                    self.assertNotEqual(forbidden_address_digest, digest, str(path.relative_to(ROOT)))

    def test_livinglab_sample_budget_is_arithmetically_consistent(self):
        data = json.loads((ROOT / "bizplan-livinglab" / "examples" / "budget-example.json").read_text(encoding="utf-8"))
        self.assertEqual(sum(item["amount"] for item in data["items"]), data["total"])
        instructor = next(item for item in data["items"] if item["category"] == "강사비")
        self.assertEqual(sum(x["unit_price"] * x["quantity"] for x in instructor["formula"]), instructor["amount"])

    def test_packages_have_one_top_level_skill_folder_and_match_source(self):
        for name in SKILLS:
            package = ROOT / "packages" / f"{name}.skill"
            with zipfile.ZipFile(package) as archive:
                self.assertIsNone(archive.testzip())
                members = [n for n in archive.namelist() if not n.endswith("/")]
                self.assertTrue(all(Path(n).parts[0] == name for n in members), package.name)
                self.assertIn(f"{name}/SKILL.md", members)
                for member in members:
                    rel = Path(*Path(member).parts[1:])
                    self.assertEqual(archive.read(member), (ROOT / name / rel).read_bytes(), member)


if __name__ == "__main__":
    unittest.main()
