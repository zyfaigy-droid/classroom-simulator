"""Map declared scene edges; dynamic state reachability is deliberately not claimed."""
from pathlib import Path
import json, collections

root=Path(__file__).resolve().parents[1]
import argparse
p=argparse.ArgumentParser();p.add_argument('--snapshots');args=p.parse_args()
result={}
fixtures=Path(args.snapshots).glob('*.snapshot.json') if args.snapshots else (root/'tests/fixtures').glob('*.golden.json')
for fixture in fixtures:
    data=json.loads(fixture.read_text(encoding='utf-8'));scenes=data['scenes']
    edges=[]; incoming=collections.Counter(); actions=collections.Counter()
    for key,scene in scenes.items():
        for choice in scene['choices']+data['accidentalWorkChoices'].get(key,[]):
            if choice.get('next'):
                edges.append({'from':key,'to':choice['next'],'label':choice['label']});incoming[choice['next']]+=1
            if choice.get('action'):actions[choice['action']]+=1
    result[fixture.name.removesuffix('.golden.json').removesuffix('.snapshot.json')]={
        'scenes':len(scenes),'declaredChoices':sum(len(s['choices']) for s in scenes.values()),
        'endings':[k for k,s in scenes.items() if s.get('ending')],
        'missingTargets':[e for e in edges if e['to'] not in scenes],
        'noLiteralIncoming':[k for k in scenes if not incoming[k]],
        'actions':dict(actions),'edges':edges,
        'note':'No literal incoming edge does not mean dead content: graduation/loan/global completion/forced endings add dynamic transitions.'}
print(json.dumps({k:{x:y for x,y in v.items() if x!='edges'} for k,v in result.items()},ensure_ascii=False,indent=2))
(root/'docs/audit/story-map.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
