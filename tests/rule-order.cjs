const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true});
 try{
 for(const entry of ['index.html','安堃模拟器.html']){
  const page=await b.newPage();await page.goto(pathToFileURL(path.resolve(__dirname,'..',entry)).href);
  for(const [source,target] of [['distanceRule','romanceRule'],['headUpRule','distanceRule'],['romanceRule','afterFirstExam']]){
   await page.evaluate(({source,target})=>{state=JSON.parse(JSON.stringify(initialState));state.visitedScenes=[target];render(source);},{source,target});
   assert.equal(await page.locator('#choices button').count(),3,`${entry}: ${source} loses ordinary choices when ${target} already visited`);
   const old=await page.evaluate(()=>({mind:state.mind,dignity:state.dignity}));
   await page.locator('#choices button').first().click();
   assert.equal(await page.evaluate(()=>state.scene),'corridor');
   assert.ok(await page.evaluate(old=>state.mind!==old.mind||state.dignity!==old.dignity,old),'ordinary choice effects missing');
   assert.equal(await page.locator(`#choices button`).filter({hasText:source==='headUpRule'?'又有人被要求抬头':source==='distanceRule'?'检查男女一米距离':'班会突然讲起早恋'}).count(),0,'visited event can be repeated for rewards');
  }
  await page.close();console.log('PASS '+entry+': reverse-order choices, safe return and no replay entry');
 }
 }finally{await b.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
