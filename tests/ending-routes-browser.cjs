// Reachability proof: normal UI clicks from a fresh context, no state injection.
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');const {pathToFileURL}=require('node:url');const {chromium}=require('playwright');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const pageURL=entry=>process.env.AUDIT_URL?new URL(entry,process.env.AUDIT_URL.replace(/\/?$/,'/')).href:pathToFileURL(path.join(root,entry)).href;
const output={method:'Real browser, fresh origins and UI clicks only. State is read for assertions, never overwritten.',entries:{},failed:[],complete:false};
async function clickRoute(page,route){
 for(const step of route){
  assert.equal(await page.evaluate(()=>state.scene),step.scene,'route prefix diverged');
  if(step.type==='loan')await page.locator('#loanBtn').click();
  else await page.getByRole('button',{name:step.label,exact:true}).click();
  assert.equal(await page.evaluate(()=>state.scene),step.next,'route transition diverged: '+step.label);
 }
}
(async()=>{
 let browser;
 try{
  const routes=JSON.parse(fs.readFileSync(path.join(root,'docs/audit/ending-routes.json'),'utf8'));
  const stories={'index.html':'story-classic.js','安堃模拟器.html':'story-extended.js'};
  assert.deepEqual(Object.keys(routes.entries).sort(),Object.keys(stories).sort(),'route entries must cover both production pages');
  for(const [entry,file] of Object.entries(stories)){
   // Inspect declarations only; this VM never supplies state to the browser.
   const context=vm.createContext({});
   vm.runInContext(fs.readFileSync(path.join(root,'assets',file),'utf8'),context,{timeout:1000});
   const endings=JSON.parse(vm.runInContext('JSON.stringify(Object.keys(scenes).filter(id=>id.startsWith("final")&&scenes[id].ending).sort())',context,{timeout:1000}));
   assert.deepEqual(Object.keys(routes.entries[entry].endings).sort(),endings,entry+': routes must cover every production final ending');
  }
  browser=await chromium.launch({channel:'msedge',headless:true});
  for(const [entry,data] of Object.entries(routes.entries)){
   const results={endings:{},globalCompletion:null,loan:null};output.entries[entry]=results;
   for(const [id,item] of Object.entries(data.endings)){
    const route=item.noLoan.path?item.noLoan:item.withLoan?.path?item.withLoan:null;
    if(!route){output.failed.push(entry+': missing route '+id);continue;}
    const context=await browser.newContext(),page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pageURL(entry));await clickRoute(page,route.path);
    const state=await page.evaluate(()=>({scene:state.scene,mind:state.mind,money:state.money,dignity:state.dignity,loanUsed:state.loanUsed}));
    assert.equal(state.scene,id);assert.equal(errors.length,0);if(item.noLoan.path)assert.equal(state.loanUsed,false);
    results.endings[id]={title:item.title,steps:route.path.length,noLoan:!state.loanUsed,state,passed:true};await context.close();
   }
   const gc=await browser.newContext(),gp=await gc.newPage();await gp.goto(pageURL(entry));
   for(const id of data.globalCompletionRequired){
    await clickRoute(gp,data.endings[id].noLoan.path||data.endings[id].withLoan.path);
    await gp.locator('#resetBtn').click();
   }
   await gp.getByRole('button',{name:'全局通关：查看学长寄语',exact:true}).click();
   assert.equal(await gp.evaluate(()=>state.scene),'seniorBlessing');results.globalCompletion={required:data.globalCompletionRequired,passed:true};await gc.close();
   if(data.loanRescue.path){
    const lc=await browser.newContext(),lp=await lc.newPage();await lp.goto(pageURL(entry));await clickRoute(lp,data.loanRescue.path);
    await lp.getByRole('button',{name:data.loanRescue.blockedChoice,exact:true}).click();
    assert.equal(await lp.evaluate(()=>state.scene),'studentLoan');assert.equal(await lp.evaluate(()=>state.money),0);
    await lp.getByRole('button',{name:'申请 300 元助学贷款',exact:true}).click();assert.equal(await lp.evaluate(()=>state.money),300);
    await lp.getByRole('button',{name:'收下贷款，回到刚才的事',exact:true}).click();assert.equal(await lp.evaluate(()=>state.scene),data.loanRescue.finalState.scene);
    assert.equal(await lp.locator('#loanBtn').isEnabled(),false);
    await lp.getByRole('button',{name:data.loanRescue.blockedChoice,exact:true}).click();
    assert.notEqual(await lp.evaluate(()=>state.scene),'studentLoan');
    assert.ok(await lp.evaluate(()=>state.money>0&&!scenes[state.scene].ending),'loan failed to preserve a playable route');
    results.loan={steps:data.loanRescue.path.length,source:data.loanRescue.finalState.scene,blockedChoice:data.loanRescue.blockedChoice,state:await lp.evaluate(()=>({scene:state.scene,money:state.money,loanUsed:state.loanUsed})),passed:true};await lc.close();
   }else output.failed.push(entry+': no loan rescue witness');
   console.log(entry,JSON.stringify({endings:Object.keys(results.endings).length,globalCompletion:results.globalCompletion.passed,loan:results.loan}));
  }
  if(output.failed.length)throw new Error(output.failed.join('\n'));
  output.complete=true;
 }catch(error){
  output.complete=false;
  output.failed.push(error.stack||String(error));
  throw error;
 }finally{
  try{if(browser)await browser.close();}catch(error){
   output.complete=false;output.failed.push(error.stack||String(error));console.error(error);process.exitCode=1;
  }finally{fs.writeFileSync(path.join(root,'docs/audit/ending-browser.json'),JSON.stringify(output,null,2));}
 }
})().catch(e=>{console.error(e);process.exitCode=1;});
