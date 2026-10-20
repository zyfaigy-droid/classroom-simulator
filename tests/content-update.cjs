const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
for(const [entry,file] of [['index.html','story-classic.js'],['安堃模拟器.html','story-extended.js']]){
 const ctx=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(root,'assets',file),'utf8'),ctx);
 const scenes=JSON.parse(vm.runInContext('JSON.stringify(scenes)',ctx));
 for(const key of ['headUpRule','distanceRule','romanceRule']){
  assert.ok(scenes[key],`${entry}: missing independent scene ${key}`);
  assert.ok(scenes[key].text.length<=120,`${entry}: ${key} too verbose`);
  assert.equal(scenes[key].choices.length,3);
  assert.ok(scenes[key].choices.some(c=>c.next.endsWith('Reply')),`${key}: missing reply payoff`);
 }
 assert.equal(scenes.firstClass.choices[0].next,'headUpRule');
 assert.ok(scenes.math.text.length<=120,'derivative scene remains too verbose');
 assert.ok(!scenes.hairCheck.text.includes('一米')&&!scenes.hairCheck.text.includes('乱伦'),'hair scene still bundles rules');
 const baseline=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures',entry+'.golden.json'),'utf8'));
 const allowed=new Set(['firstClass','math','mathIgnoreResult','mathWhisperResult','solve','hairCheck','corridor']);
 for(const [key,scene] of Object.entries(baseline.scenes)){
  assert.ok(scenes[key],`original scene removed: ${key}`);
  if(!allowed.has(key))assert.deepEqual(scenes[key],scene,`unrequested story change: ${key}`);
 }
 for(const [key,scene] of Object.entries(scenes))for(const c of scene.choices)if(c.next)assert.ok(scenes[c.next],`broken next ${key} -> ${c.next}`);
 console.log(`PASS ${entry}: separate short events, payoffs, preserved unrelated story and links`);
}
