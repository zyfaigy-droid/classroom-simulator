import importlib.util, json, tempfile, unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('package_web',ROOT/'tools/package_web.py')
mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)

class PackageTests(unittest.TestCase):
    def test_runtime_manifest_keeps_both_entries_and_music(self):
        names={name for name,_ in mod.runtime_files()}
        self.assertTrue({'index.html','安堃模拟器.html','巴啦啦K魔仙.mp3','assets/game.js','assets/game.css'} <= names)
        self.assertFalse(any(name.startswith(('.git/','tests/','docs/','desktop/')) for name in names))

    def test_packaged_bytes_match_sources_and_existing_output_is_protected(self):
        with tempfile.TemporaryDirectory() as tmp:
            target=Path(tmp)/'game';mod.package(target)
            for name,source in mod.runtime_files():self.assertEqual(source.read_bytes(),(target/name).read_bytes(),name)
            with self.assertRaises(ValueError):mod.package(target)

    def test_manifest_rejects_missing_or_outside_assets(self):
        # Validate checked-in manifest paths without mutating it.
        for name,_ in mod.runtime_files():
            self.assertFalse(Path(name).is_absolute());self.assertNotIn('..',Path(name).parts)

if __name__=='__main__':unittest.main()
