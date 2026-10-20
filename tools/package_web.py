"""Copy only runtime assets. No repo history, test fixtures, reports or unrelated workspace files."""
import json, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def runtime_files():
    # Retain original material even when not currently referenced by the UI.
    manifest = json.loads((ROOT/'runtime-files.json').read_text(encoding='utf-8'))
    files = []
    for name in manifest:
        source = (ROOT/name).resolve()
        if not source.is_relative_to(ROOT) or not source.is_file():
            raise ValueError('Invalid runtime asset: '+name)
        files.append((name, source))
    return files

def package(destination):
    destination=Path(destination).resolve()
    if destination.exists():
        raise ValueError('Use a new output folder; existing packages are never overwritten')
    for name,source in runtime_files():
        target=destination/name;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,target)
    return destination

if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser();p.add_argument('destination');a=p.parse_args()
    print(package(a.destination))
