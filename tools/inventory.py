"""Read-only inventory. Unknown references are candidates, never deletion instructions."""
import argparse, collections, hashlib, json, os, re
from pathlib import Path

CATEGORIES = {'HTML': {'.html','.htm'}, 'CSS': {'.css'}, 'JS': {'.js','.mjs','.cjs'},
 '图片': {'.png','.jpg','.jpeg','.gif','.webp','.svg','.ico','.avif'},
 '音频': {'.mp3','.wav','.ogg','.m4a','.flac','.mid'}, '视频': {'.mp4','.webm','.mov'},
 '字体': {'.woff','.woff2','.ttf','.otf'}, 'JSON': {'.json'}}

def scan(root, excluded=(), excluded_files=()):
    root = Path(root).resolve()
    files, errors, texts = [], [], {}
    for parent, dirs, names in os.walk(root, onerror=lambda e: errors.append(str(e))):
        dirs[:] = sorted(d for d in dirs if d != '.git' and d not in excluded)
        for name in sorted(names):
            p = Path(parent)/name
            try:
                data = p.read_bytes()
                rel = p.relative_to(root).as_posix()
                if rel in excluded_files: continue
                category = next((k for k,v in CATEGORIES.items() if p.suffix.lower() in v), '其他资源')
                entry = dict(path=rel, bytes=len(data), category=category, sha256=hashlib.sha256(data).hexdigest())
                if p.suffix.lower() in {'.png','.jpg','.jpeg','.webp','.gif','.ico'}:
                    try:
                        from PIL import Image
                        with Image.open(p) as im: entry['image'] = dict(width=im.width,height=im.height,mode=im.mode)
                    except Exception as e: entry['imageError'] = str(e)
                files.append(entry)
                if p.suffix.lower() in {'.html','.css','.js','.mjs','.json','.ps1','.bat','.md','.txt'}:
                    texts[rel] = data.decode('utf-8-sig', errors='replace')
            except OSError as e: errors.append(str(e))
    grouped = collections.defaultdict(list)
    for f in files: grouped[f['sha256']].append(f)
    summary = {k: {'count':0,'bytes':0} for k in [*CATEGORIES,'其他资源']}
    for f in files:
        summary[f['category']]['count'] += 1
        summary[f['category']]['bytes'] += f['bytes']
    refs = []
    for f in files:
        if f['category'] not in {'图片','音频','视频','字体','其他资源'}: continue
        basename = Path(f['path']).name
        sources = [p for p,t in texts.items() if p != f['path'] and basename in t]
        refs.append({'path':f['path'], 'textReferences':sources, 'status':'referenced-by-name' if sources else 'manual-review-only'})
    links = []
    for name, txt in texts.items():
        if not name.endswith(('.html','.css','.js')): continue
        pattern = r'''(?:src|href)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^\s)'";]+)'''
        for m in re.finditer(pattern,txt):
            ref = next(x for x in m.groups() if x is not None)
            if ref.startswith(('data:','#','http:','https:','mailto:','javascript:')): continue
            from urllib.parse import unquote
            target = (root/Path(name).parent/unquote(ref.split('?')[0].split('#')[0]))
            links.append({'source':name,'target':ref,'exists':target.exists()})
    return dict(root=str(root),files=files,summary=summary,totalBytes=sum(f['bytes'] for f in files),
        exclusions=['.git',*excluded,*excluded_files], duplicateGroups=[g for g in grouped.values() if len(g)>1],references=refs,staticLinks=links,
        hardcodedPaths=[{'path':n,'line':i+1} for n,t in texts.items() for i,line in enumerate(t.splitlines()) if re.search(r'[A-Za-z]:[\\/]|file:///',line)],errors=errors)

if __name__ == '__main__':
    parser=argparse.ArgumentParser(); parser.add_argument('root'); parser.add_argument('--output');parser.add_argument('--exclude',action='append',default=[]);parser.add_argument('--exclude-file',action='append',default=[])
    args=parser.parse_args(); result=scan(args.root,args.exclude,args.exclude_file)
    serialized=json.dumps(result,ensure_ascii=False,indent=2)
    if args.output:
        p=Path(args.output); p.parent.mkdir(parents=True,exist_ok=True); p.write_text(serialized,encoding='utf-8')
        print(json.dumps({k:result[k] for k in ('root','summary','totalBytes','errors')},ensure_ascii=False))
    else: print(serialized)
