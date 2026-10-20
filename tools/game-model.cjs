// Uses unmodified production scripts; lightweight DOM is only for route discovery.
// Discovered routes must be replayed in a real browser before claiming reachability.
const fs=require('node:fs');const path=require('node:path');const vm=require('node:vm');
function model(root,variant){
 const nodes=new Map();let document;
 class Node{
  constructor(){this.children=[];this.style={};this.listeners={};this.attributes={};this.isConnected=true;this.paused=true;this.classes=new Set();this.classList={add:(...x)=>x.forEach(y=>this.classes.add(y)),remove:(...x)=>x.forEach(y=>this.classes.delete(y)),contains:x=>this.classes.has(x),toggle:(x,on)=>on?this.classes.add(x):this.classes.delete(x)};}
  set innerHTML(x){this.children=[];this.html=x;}get innerHTML(){return this.html;}
  appendChild(x){this.children.push(x);}addEventListener(k,fn){this.listeners[k]=fn;}
  setAttribute(k,v){this.attributes[k]=v;}focus(){document.activeElement=this;}
  play(){this.paused=false;return Promise.resolve();}pause(){this.paused=true;}
 }
 document={activeElement:new Node(),getElementById:id=>{if(!nodes.has(id))nodes.set(id,new Node());return nodes.get(id);},createElement:()=>new Node(),querySelector:()=>document.getElementById('panel'),addEventListener(){}};
 const saved=new Map();const ctx=vm.createContext({document,window:{confirm:()=>true},console:{warn(){}},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)}});
 vm.runInContext(fs.readFileSync(path.join(root,'assets',variant),'utf8'),ctx);
 vm.runInContext(fs.readFileSync(path.join(root,'assets/game.js'),'utf8'),ctx);
 vm.runInContext(`globalThis.api={
  fresh(){permanentAchievements=[];permanentEndings=[];state=createInitialState();render('start');},
  snapshot(){return JSON.stringify({state,permanentAchievements,permanentEndings});},
  restore(raw){const x=JSON.parse(raw);state=x.state;permanentAchievements=x.permanentAchievements;permanentEndings=x.permanentEndings;render(state.scene);},
  metadata(){return JSON.parse(JSON.stringify({scenes,accidentalWorkChoices,endingAchievementNames,globalCompletionEndingIds}));},
  state(){return JSON.parse(JSON.stringify(state));},
  grade(){return graduationEnding();},
  loanAvailable(){return state.money<=100&&!state.loanUsed&&!scenes[state.scene]?.ending;},
  loan(){applyLoan();},
  diagnosticState(values){Object.assign(state,values);render(state.scene);}
 };`,ctx);
 ctx.api.options=()=>nodes.get('choices').children.map((b,i)=>({label:b.textContent,index:i}));
 ctx.api.take=index=>nodes.get('choices').children[index].listeners.click();
 return ctx.api;
}
module.exports={model};
