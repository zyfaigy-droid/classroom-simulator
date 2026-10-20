const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:800,height:360}});
  await page.goto(pathToFileURL(path.resolve(process.argv[2]||'index.html')).href);
  await page.evaluate(()=>openReader('《感动城郊年度人物》.txt'));
  await page.keyboard.press('Tab');
  if(!await page.locator('#readerBody').evaluate(e=>e===document.activeElement))throw new Error('Tab cannot focus reader body');
  await page.keyboard.press('PageDown');
  await page.waitForFunction(()=>document.getElementById('readerBody').scrollTop>0);
  await page.keyboard.press('Tab');
  if(!await page.locator('#readerClose').evaluate(e=>e===document.activeElement))throw new Error('Tab escaped dialog');
  await page.keyboard.press('Escape');
  if(await page.locator('#readerBackdrop').getAttribute('aria-hidden')!=='true')throw new Error('Escape failed');
  console.log('PASS: Tab into long text, PageDown scroll, Tab wrap, Escape');
 }finally{await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
