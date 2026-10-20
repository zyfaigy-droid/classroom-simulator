// Real-browser regression runner. Each context has isolated, disposable saves.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { pathToFileURL } = require('node:url');
const { createHash } = require('node:crypto');
const { chromium } = require('playwright');
const root = path.resolve(process.argv[2]);
const out = path.resolve(process.argv[3]);
const mode = process.argv[4] || 'baseline';
const remote = process.env.AUDIT_URL;
const channel = process.env.AUDIT_CHANNEL || 'msedge';
fs.mkdirSync(out,{recursive:true});
const result = {mode,channel,remote:remote || null,checks:[],pages:[],errors:[],requests:[]};
const check = (name, pass, detail) => result.checks.push({name,pass:!!pass,detail});
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.mp3':'audio/mpeg','.json':'application/json'};
const server=http.createServer((req,res)=>{
  let rel; try {rel=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch {res.writeHead(400).end();return;}
  const target=path.resolve(root,'.'+(rel.endsWith('/')?rel+'index.html':rel));
  if(!target.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(target,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',types[path.extname(target)]||'application/octet-stream');res.end(data);});
});
async function main(){
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base=remote || `http://127.0.0.1:${server.address().port}/`;
  const browser=await chromium.launch({channel:channel==='chromium'?undefined:channel,headless:true,timeout:30000,
    proxy:process.env.AUDIT_PROXY?{server:process.env.AUDIT_PROXY}:undefined});
  result.browser=browser.version();
  try {
  const manifestPath=path.join(root,'runtime-files.json');
  if(fs.existsSync(manifestPath)){
    const assetContext=await browser.newContext();
    for(const name of JSON.parse(fs.readFileSync(manifestPath,'utf8'))){
      const response=await assetContext.request.get(base+name.split('/').map(encodeURIComponent).join('/'),{timeout:remote?120000:30000});
      check('runtime asset available '+name,response.status()===200,response.status());
      const body=await response.body();
      const normalized=b=>/\.(html|css|js|txt)$/.test(name)?Buffer.from(b.toString('utf8').replace(/\r\n/g,'\n')):b;
      const hash=b=>createHash('sha256').update(normalized(b)).digest('hex');
      check('runtime bytes match '+name,hash(body)===hash(fs.readFileSync(path.join(root,name))));
    }
    await assetContext.close();
  }
  for(const entry of ['index.html','安堃模拟器.html']){
    const context=await browser.newContext({viewport:{width:1366,height:900}});
    const page=await context.newPage();
    const errs=[], bad=[], cancelled=[];
    page.on('pageerror',e=>errs.push(e.message));
    page.on('response',r=>{if(r.status()>=400)bad.push({url:r.url(),status:r.status()});});
    page.on('requestfailed',r=>{const record={url:r.url(),failure:r.failure()?.errorText}; (record.failure==='net::ERR_ABORTED'?cancelled:bad).push(record);});
    await page.goto(base+encodeURIComponent(entry));
    await page.waitForFunction(()=>typeof scenes==='object');
    if(mode!=='baseline') check(entry+' audio is deferred until requested',await page.evaluate(()=>bgm.preload==='none'&&!performance.getEntriesByType('resource').some(r=>r.name.endsWith('.mp3'))));
    const expectedPath=path.join(process.env.AUDIT_GOLDEN || path.join(root,'tests/fixtures'),entry+'.golden.json');
    const original=mode==='baseline'?null:JSON.parse(fs.readFileSync(expectedPath));
    const baselineItems=original?[...new Set(Object.values(original.scenes).flatMap(s=>s.choices.map(c=>c.item).filter(Boolean)))]:null;
    const snapshot=await page.evaluate(baselineItems=>{
      const grading=[]; let seed=8821;
      const rand=n=>{seed=(seed*1664525+1013904223)>>>0;return seed%n;};
      const allItems=baselineItems || [...new Set(Object.values(scenes).flatMap(s=>s.choices.map(c=>c.item).filter(Boolean)))];
      for(let i=0;i<2000;i++){
        state=JSON.parse(JSON.stringify(initialState));
        for(const key of ['mind','dignity'])state[key]=rand(101);
        state.money=rand(601);
        for(const key of ['paidTimes','scolded','evidence','rebuttals','glare','corridorHelmet'])state[key]=rand(12);
        state.items=allItems.filter(()=>rand(8)===0);
        grading.push(graduationEnding());
      }
      state=JSON.parse(JSON.stringify(initialState)); permanentAchievements=[]; permanentEndings=[]; localStorage.clear();render('start');
      return {scenes,initialState,workItems,workFilesByItem,workLibrary,accidentalWorkChoices,
        endingAchievementNames,globalCompletionEndingIds,completionAchievementNames,
        letter:renderSeniorLetter(),grading};
    },baselineItems);
    const golden=path.join(out,entry+'.golden.json');
    if(mode==='baseline') fs.writeFileSync(golden,JSON.stringify(snapshot,null,2));
    else {
      const expected=original;
      const contentPatch=path.join(root,'tests/fixtures/content-update.json');
      if(fs.existsSync(contentPatch)) Object.assign(expected.scenes,JSON.parse(fs.readFileSync(contentPatch))[entry]);
      const canonical=value=>Array.isArray(value)?value.map(canonical):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])])):value;
      check(entry+' authorized narrative delta only; rules and 2000 graduation samples unchanged',JSON.stringify(canonical(snapshot))===JSON.stringify(canonical(expected)));
    }
    fs.writeFileSync(path.join(out,entry+'.snapshot.json'),JSON.stringify(snapshot,null,2));
    const ids=Object.keys(snapshot.scenes);
    const targets=ids.flatMap(id=>snapshot.scenes[id].choices.filter(c=>c.next&&!snapshot.scenes[c.next]).map(c=>id+' -> '+c.next));
    check(entry+' all declared scene links valid',targets.length===0,targets);
    if(snapshot.scenes.headUpRule){
      await page.evaluate(()=>{state=JSON.parse(JSON.stringify(initialState));render('start');});
      await page.locator('#choices button').last().click();await page.locator('#choices button').first().click();
      for(const [scene,reply] of [['headUpRule','headUpReply'],['distanceRule','distanceReply'],['romanceRule','romanceReply']]){
        check(entry+' short-rule route '+scene,await page.evaluate(()=>state.scene)===scene);
        await page.locator('#choices button').nth(2).click();
        check(entry+' counterattack payoff '+reply,await page.evaluate(()=>state.scene)===reply);
        await page.locator('#choices button').first().click();
      }
      check(entry+' rule chain returns to original story',await page.evaluate(()=>state.scene)==='afterFirstExam');
    }
    const renderTimes=[]; let clicks=0;
    for(const id of ids){
      const dt=await page.evaluate(id=>{state=JSON.parse(JSON.stringify(initialState)); const t=performance.now();render(id);return performance.now()-t;},id);
      renderTimes.push(dt);
      check(entry+' render '+id,await page.locator('#sceneTitle').textContent()===snapshot.scenes[id].title);
      const labels=await page.locator('#choices button').allTextContents();
      for(let i=0;i<labels.length;i++){
        await page.evaluate(id=>{state=JSON.parse(JSON.stringify(initialState));render(id);},id);
        await page.locator('#choices button').nth(i).evaluate(el=>el.click()); clicks++;
        check(entry+' choice '+id+':'+i,await page.evaluate(()=>!!scenes[state.scene] && !!document.getElementById('story').textContent));
        await page.evaluate(()=>closeReader());
      }
    }
    // Random journeys use real displayed choices, exercising revisits and changing state.
    const visits=await page.evaluate(()=>{
      let seed=91; const visited=new Set();
      for(let run=0;run<150;run++){
        reset();
        for(let step=0;step<80;step++){
          visited.add(state.scene);if(scenes[state.scene].ending)break;
          const buttons=[...document.querySelectorAll('#choices button')];
          seed=(seed*1664525+1013904223)>>>0;
          buttons[seed%buttons.length].click();closeReader();
        }
      }
      return [...visited];
    });
    for(const file of Object.keys(snapshot.workLibrary)){
      await page.evaluate(file=>openReader(file),file);
      check(entry+' reader '+file,await page.locator('#readerBackdrop').getAttribute('aria-hidden')==='false');
      for(const img of await page.locator('#readerBody img').all()) check(entry+' reader image '+file,await img.evaluate(async el=>{try{await el.decode();return el.naturalWidth>0;}catch{return false;}}));
      await page.locator('#readerClose').click();
    }
    await page.evaluate(()=>{reset();state.money=80;updateStats();});
    await page.locator('#loanBtn').click();
    check(entry+' loan once',await page.evaluate(()=>state.money===380&&state.loanUsed));
    await page.evaluate(()=>{recordEnding('finalEarth');});
    await page.reload();
    check(entry+' achievement reload',await page.evaluate(()=>permanentEndings.includes('finalEarth')));
    await page.evaluate(()=>localStorage.setItem(progressStorageKey,JSON.stringify({achievements:completionAchievementNames.map(n=>n==='结局：天道轮回'?'结局：天天好招':n),endings:[]})));
    await page.reload();
    check(entry+' legacy v1 alias and valid strings preserved',await page.evaluate(()=>permanentAchievements.includes('结局：天天好招')&&hasGlobalCompletion()));
    await page.evaluate(()=>recordEnding('finalEarth'));
    await page.locator('#resetBtn').click();
    check(entry+' reset preserves endings',await page.evaluate(()=>permanentEndings.includes('finalEarth')));
    page.once('dialog',d=>d.dismiss());await page.locator('#clearSaveBtn').click();
    check(entry+' clear cancel preserves',await page.evaluate(()=>permanentEndings.includes('finalEarth')));
    page.once('dialog',d=>d.accept());await page.locator('#clearSaveBtn').click();
    check(entry+' clear confirm',await page.evaluate(()=>permanentEndings.length===0&&state.scene==='start'));
    await page.locator('#musicBtn').click();
    const music=await page.evaluate(async()=>{const el=document.getElementById('bgm');try{await el.play();return {ok:!el.paused,src:el.currentSrc};}catch(e){return {ok:false,error:e.message};}});
    check(entry+' music decodes and plays',music.ok,music);
    await page.locator('#musicBtn').click();
    check(entry+' music pauses',await page.evaluate(()=>bgm.paused));
    await page.evaluate(()=>localStorage.setItem(progressStorageKey,JSON.stringify({achievements:[null,{},'安全测试'],endings:[null,{}]})));
    await page.reload();
    check(entry+' corrupted save types sanitized',await page.evaluate(()=>permanentAchievements.every(x=>typeof x==='string')&&permanentEndings.every(x=>typeof x==='string')));
    for(const saved of ['null','{invalid','{"achievements":"bad","endings":42}']){
      await page.evaluate(saved=>localStorage.setItem(progressStorageKey,saved),saved);await page.reload();
      check(entry+' malformed save '+saved,await page.evaluate(()=>state.scene==='start'&&permanentAchievements.length===0&&permanentEndings.length===0));
    }
    for(const [w,h] of [[1920,1080],[1280,720],[768,1024],[360,800],[320,568],[800,360]]){
      await page.setViewportSize({width:w,height:h});
      await page.evaluate(()=>{localStorage.clear();permanentAchievements=[];permanentEndings=[];reset();});
      check(entry+` no horizontal overflow ${w}x${h}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      await page.evaluate(()=>openReader(Object.keys(workLibrary)[0]));
      const box=await page.locator('#readerClose').boundingBox();
      check(entry+` reader close visible ${w}x${h}`,box&&box.y>=0&&box.y+box.height<=h,box);
      check(entry+` reader body contained ${w}x${h}`,await page.evaluate(()=>{const el=document.getElementById('readerBody'),b=el.getBoundingClientRect();return b.bottom<=innerHeight&&b.top>=0&&el.clientHeight>0;}));
      await page.keyboard.press('Escape');
      check(entry+` reader Escape ${w}x${h}`,await page.locator('#readerBackdrop').getAttribute('aria-hidden')==='true');
      await page.evaluate(()=>closeReader());
    }
    await page.setViewportSize({width:1366,height:900});await page.screenshot({path:path.join(out,entry+'.desktop.png'),fullPage:true});
    await page.setViewportSize({width:360,height:800});await page.screenshot({path:path.join(out,entry+'.mobile.png'),fullPage:true});
    const timing=await page.evaluate(()=>({navigation:performance.getEntriesByType('navigation')[0].toJSON(),resources:performance.getEntriesByType('resource').map(r=>({name:r.name,bytes:r.transferSize,duration:r.duration}))}));
    check(entry+' no JavaScript errors',errs.length===0,errs);
    check(entry+' no missing resources',bad.length===0,bad);
    result.pages.push({entry,scenes:ids.length,choicesClicked:clicks,randomJourneyScenes:visits.length,randomJourneyUnvisited:ids.filter(x=>!visits.includes(x)),renderMaxMs:Math.max(...renderTimes),renderMedianMs:renderTimes.sort((a,b)=>a-b)[Math.floor(renderTimes.length/2)],timing});
    result.errors.push(...errs);result.requests.push(...bad);
    (result.cancelledRequests ||= []).push(...cancelled);
    await context.close();
    if(!remote){
      const c=await browser.newContext();const p=await c.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));
      await p.goto(pathToFileURL(path.join(root,entry)).href);
      check(entry+' file protocol initial scene',await p.locator('#sceneTitle').textContent()===snapshot.scenes.start.title);
      await p.locator('#choices button').last().click();
      check(entry+' file protocol navigation',await p.locator('#sceneTitle').textContent()===snapshot.scenes.firstClass.title);
      check(entry+' file protocol JS errors',e.length===0,e);await c.close();
    }
    const c=await browser.newContext();await c.addInitScript(()=>{window.structuredClone=undefined;});
    const p=await c.newPage();const e=[];p.on('pageerror',x=>e.push(x.message));await p.goto(base+encodeURIComponent(entry));
    check(entry+' older browser clone fallback',e.length===0&&await p.locator('#sceneTitle').textContent()===snapshot.scenes.start.title,e);await c.close();
    const denied=await browser.newContext();await denied.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Disabled','SecurityError');}});});
    const dp=await denied.newPage();const de=[];dp.on('pageerror',x=>de.push(x.message));await dp.goto(base+encodeURIComponent(entry));await dp.locator('#choices button').last().click();
    check(entry+' storage denied still playable',de.length===0,de);await denied.close();
    const mobile=await browser.newContext({viewport:{width:393,height:851},isMobile:true,hasTouch:true,deviceScaleFactor:2,userAgent:'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'});
    const mp=await mobile.newPage();await mp.goto(base+encodeURIComponent(entry));await mp.locator('#choices button').last().tap();
    check(entry+' Android touch emulation navigation',await mp.locator('#sceneTitle').textContent()===snapshot.scenes.firstClass.title);await mobile.close();
  }
  } finally {await browser.close();server.close();}
  result.failed=result.checks.filter(x=>!x.pass);result.passed=result.checks.length-result.failed.length;
  fs.writeFileSync(path.join(out,'browser-'+channel+'.json'),JSON.stringify(result,null,2));
  console.log(JSON.stringify({passed:result.passed,failed:result.failed,pages:result.pages.map(({timing,...p})=>p)},null,2));
  if(mode!=='baseline'&&result.failed.length)process.exitCode=1;
}
main().catch(e=>{console.error(e);server.close();process.exitCode=1;});
