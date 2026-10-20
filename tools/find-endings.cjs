const fs=require('node:fs');const path=require('node:path');const {model}=require('./game-model.cjs');
const root=path.resolve(__dirname,'..');const out=path.resolve(process.argv[2]||path.join(root,'docs/audit/ending-routes.json'));
const width=Number(process.env.SEARCH_WIDTH||120),depthLimit=Number(process.env.SEARCH_DEPTH||80);
const radarCandidate=['正式进入游戏','观察晃表发光的规律','把它命名为“表盘雷达”','记录成绩评价和补课暗示','认真听，并记下原话','当场交钱','进入补课','抬头看他晃表','进入猥琐事件','记录温度和饭卡扣费','沉默','把这段事压进心里，继续上课','私下统计他的鞋和表','提前离场','整理监考费和补课费材料','先稳住，等更多材料','课堂考试线','小声吐槽：又在搜题了','假装自己是课桌'];
function playLabels(game,target,labels){
 game.fresh();const route=[];
 for(const label of labels){const scene=game.state().scene,option=game.options().find(x=>x.label===label);if(!option)return null;game.take(option.index);route.push({scene,type:'choice',label,index:option.index,next:game.state().scene});}
 return game.state().scene===target?{raw:game.snapshot(),path:route,finalState:game.state(),method:'manually guided candidate, actual engine transitions'}:null;
}
function signature(x){const s=x.state;return JSON.stringify({...s,day:Math.min(s.day,10),items:[...s.items].sort(),visitedScenes:[...s.visitedScenes].sort(),corridorVisited:[...s.corridorVisited].sort(),achievements:[],glare:Math.min(s.glare,10),scolded:Math.min(s.scolded,10),evidence:Math.min(s.evidence,6),rebuttals:Math.min(s.rebuttals,3),paidTimes:Math.min(s.paidTimes,4),corridorHelmet:Math.min(s.corridorHelmet,3),skippedQuestions:Math.min(s.skippedQuestions,3),listenedRoast:Math.min(s.listenedRoast,3)});}
function distances(meta,target){
 const reverse={};const goals=target==='finalGood'?['finalGood']:Object.keys(meta.scenes).filter(id=>meta.scenes[id].choices.some(c=>c.action==='graduate'));
 for(const [id,s] of Object.entries(meta.scenes))for(const c of [...s.choices,...(meta.accidentalWorkChoices[id]||[])])if(c.next)(reverse[c.next]||=[]).push(id);
 const d=Object.fromEntries(goals.map(k=>[k,0])),q=[...goals];while(q.length){const id=q.shift();for(const p of reverse[id]||[])if(d[p]===undefined){d[p]=d[id]+1;q.push(p);}}return d;
}
function score(s,target,d,grade){
 const has=re=>s.items.some(x=>re.test(x)),count=re=>s.items.filter(x=>re.test(x)).length;
 const distance=d[s.scene]===undefined?12:d[s.scene];let n=-distance*24;
 if(target==='loanRescue')return -s.money*.7+Math.min(s.mind,70)*.9+Math.min(s.dignity,65)*.8+(s.loanUsed?-1000:0);
 if(grade===target)n+=70;
 if(s.mind===0&&target!=='finalBadMind')n-=300;
 if(s.dignity===0&&target!=='finalBadDignity')n-=300;
 if(target==='finalGood')return n+s.mind*.4+s.dignity*.4;
 if(target==='finalBadMind')return -s.mind*3+Math.min(s.day,8)*8+s.dignity*.05;
 if(target==='finalBadDignity')return -s.dignity*3+Math.min(s.day,8)*8+s.mind*.05;
 if(target==='finalBadMoney')return n-s.money*.3+(s.loanUsed?90:0)+s.mind*.3+s.dignity*.2;
 if(target==='finalEarth')n+=Math.min(s.mind,75)*.8+Math.min(s.dignity,75)*.5+Math.min(s.money,200)*.2-Math.max(0,s.rebuttals-1)*22;
 if(target==='finalShake')n+=Math.min(s.paidTimes,4)*27-Math.max(0,s.rebuttals-1)*50+Math.min(s.money,200)*.2+Math.min(s.mind,65)*.5-Math.max(0,s.dignity-55);
 if(target==='finalCharm')n+=Math.min(s.rebuttals,3)*25+Math.min(s.dignity,70)*.8+Math.min(s.mind,60)*.5;
 if(target==='finalDayday')n+=has(/期末材料包|联合反馈|举报flag|录音证据/)?110:Math.min(s.evidence,6)*10+count(/记录|证据|录音|截图|材料|反馈/)*5;
 if(target==='finalMirror')n+=Math.min(s.paidTimes,3)*30+Math.min(s.glare,5)*17+Math.min(s.scolded,3)*10+Math.min(s.rebuttals,3)*17-Math.abs(s.dignity-40)*1.2+Math.min(s.mind,60)*.6;
 if(target==='finalThroat')n+=Math.min(count(/粉盔|电瓶车|骚粉|安K拳|推拉扯|稳龙|梓豪|医务室|他龙/),3)*38+Math.min(s.scolded,4)*18+Math.min(s.corridorHelmet,3)*7-Math.max(0,s.rebuttals-2)*90-Math.max(0,s.paidTimes-1)*40+Math.min(s.mind,55)*.8;
 if(target==='finalWeird')n=(s.items.includes('表盘雷达')?150:0)+Math.min(count(/记录|线索/),3)*30+Math.min(s.glare,5)*22+(s.glare>=5?120:0)+s.dignity*1.1+Math.min(s.mind,50)*.5+Math.min(s.day,10)*4;
 if(['finalEarth','finalShake','finalCharm','finalMirror','finalThroat'].includes(target)&&has(/期末材料包|联合反馈|举报flag|录音证据/))n-=120;
 return n;
}
function find(game,meta,target,allowLoan){
 game.fresh();const first=game.snapshot();let beam=[{raw:first,path:[]}];const seen=new Set([signature(JSON.parse(first))]);const d=distances(meta,target);let expanded=0,best=null;
 for(let depth=0;depth<depthLimit;depth++){
  const pool=[];
  for(const node of beam){
   game.restore(node.raw);const state=game.state();
   if(target==='loanRescue'&&state.money===0&&!state.loanUsed&&state.mind>10&&state.dignity>20&&!meta.scenes[state.scene].ending){
    const blocked=game.options().find(o=>meta.scenes[state.scene].choices.some(c=>c.label===o.label&&(c.effects?.money||0)<0&&c.effects.money>-300));
    if(blocked)return {...node,expanded,depth,finalState:state,blockedChoice:blocked.label};
   }
   if(state.scene===target)return {...node,expanded,depth,finalState:state};
   if(meta.endingAchievementNames[state.scene]||state.scene==='seniorBlessing')continue;
   const options=game.options().map(x=>({...x,type:'choice'}));if(allowLoan&&game.loanAvailable())options.push({type:'loan',label:'申请助学贷款'});
   for(const option of options){
    if(option.type==='choice'&&(/打开原|重新开局|再玩一次/.test(option.label)))continue;
    if(!allowLoan&&option.label.includes('申请')&&option.label.includes('助学贷款'))continue;
    game.restore(node.raw);if(option.type==='loan')game.loan();else game.take(option.index);expanded++;
    const raw=game.snapshot(),x=JSON.parse(raw),s=x.state;
    const route=[...node.path,{scene:state.scene,type:option.type,label:option.label,index:option.index,next:s.scene}];
    if(s.scene===target)return {raw,path:route,expanded,depth:depth+1,finalState:s};
    if(meta.endingAchievementNames[s.scene]||s.scene==='seniorBlessing')continue;
    const key=signature(x);if(seen.has(key))continue;seen.add(key);
    const grade=game.grade();const candidate={raw,path:route,score:score(s,target,d,grade)};pool.push(candidate);
    if(!best||candidate.score>best.score)best={...candidate,state:s};
   }
  }
  pool.sort((a,b)=>b.score-a.score);
  // Keep several independent routes per scene and score region, rather than one numerical extreme.
  const perScene=new Map();beam=[];
  for(const n of pool){const s=JSON.parse(n.raw).state;const key=s.scene+'|'+Math.floor(s.money/100)+'|'+Math.min(s.rebuttals,3)+'|'+s.loanUsed;const count=perScene.get(key)||0;if(count>=12)continue;perScene.set(key,count+1);beam.push(n);if(beam.length>=width)break;}
  if(!beam.length)break;
 }
 return {found:false,expanded,depthLimit,width,best};
}
const result={method:'Bounded beam search over actual production game functions; success requires browser replay. Not-found is not proof of impossibility.',width,depthLimit,entries:{}};
for(const [entry,variant] of [['index.html','story-classic.js'],['安堃模拟器.html','story-extended.js']]){
 const game=model(root,variant),meta=game.metadata();const records={};
 for(const target of Object.keys(meta.endingAchievementNames)){
  const guided=target==='finalWeird'?playLabels(game,target,radarCandidate):null;
  const without=guided||find(game,meta,target,false);const withLoan=without.path?null:find(game,meta,target,true);
  records[target]={title:meta.scenes[target].title,noLoan:without,withLoan};
  console.log(entry,target,'noLoan='+!!without.path,'withLoan='+!!withLoan?.path,'steps='+(without.path||withLoan?.path||[]).length);
 }
 const loanRescue=find(game,meta,'loanRescue',false);
 console.log(entry,'loan-rescue-prefix='+!!loanRescue.path,'steps='+(loanRescue.path||[]).length);
 result.entries[entry]={endings:records,globalCompletionRequired:meta.globalCompletionEndingIds,loanRescue};
 fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(result,null,2));
}
console.log('Saved '+out);
