// Actual DOM integration using a local copy at the production origin and a mock tracker.
// No request reaches Umami and no test player is added to the real dashboard.
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const base='https://zyfaigy-droid.github.io/classroom-simulator/';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png'};
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  for(const entry of ['index.html','安堃模拟器.html']){
   const context=await browser.newContext();
   await context.addInitScript(()=>Object.defineProperty(navigator,'webdriver',{get:()=>false}));
   let trackerRequests=0;const errors=[];
   await context.route(base+'**',async route=>{
    const name=decodeURIComponent(new URL(route.request().url()).pathname.slice('/classroom-simulator/'.length))||'index.html';
    if(name==='assets/analytics-config.js')return route.fulfill({contentType:types['.js'],body:'window.ANKUN_ANALYTICS={websiteId:"94db1cb1-74f4-4a40-ad6c-962362670409"};'});
    const file=path.resolve(root,name);assert.ok(file.startsWith(root+path.sep));
    return route.fulfill({contentType:types[path.extname(file)]||'application/octet-stream',body:fs.readFileSync(file)});
   });
   await context.route('https://cloud.umami.is/**',route=>{
    trackerRequests++;
    return route.fulfill({contentType:types['.js'],body:'window.analyticsCalls=[];window.umami={track:function(name){window.analyticsCalls.push(name||"pageview");return Promise.resolve();}};'});
   });
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+encodeURIComponent(entry));assert.equal(trackerRequests,0);
   await page.getByRole('button',{name:'正式进入游戏',exact:true}).click();
   await page.waitForFunction(()=>window.analyticsCalls?.length===2);
   assert.equal(await page.evaluate(()=>state.scene),'firstClass');
   assert.deepEqual(await page.evaluate(()=>window.analyticsCalls),['pageview','game_start']);
   await page.locator('#resetBtn').click();
   await page.getByRole('button',{name:'正式进入游戏',exact:true}).click();
   assert.equal(trackerRequests,1);assert.deepEqual(await page.evaluate(()=>window.analyticsCalls),['pageview','game_start']);assert.deepEqual(errors,[]);
   await context.close();console.log('PASS '+entry+': normal game navigation and private start-only tracker integration');
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
