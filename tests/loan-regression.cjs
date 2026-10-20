const assert=require('node:assert/strict');const path=require('node:path');
const {model}=require('../tools/game-model.cjs');
for(const variant of ['story-classic.js','story-extended.js']){
 const game=model(path.resolve(__dirname,'..'),variant);game.fresh();
 game.diagnosticState({scene:'fee',money:0});
 game.take(game.options().find(x=>x.label==='当场交钱').index);
 assert.equal(game.state().scene,'studentLoan');assert.equal(game.state().money,0);
 game.loan();
 assert.equal(game.state().money,300);assert.equal(game.state().loanUsed,true);
 const returnOption=game.options().find(x=>x.label.includes('回到'));
 assert.ok(returnOption);game.take(returnOption.index);
 assert.equal(game.state().scene,'fee','loan return loops into itself');
 assert.equal(game.loanAvailable(),false);
 game.fresh();game.diagnosticState({scene:'fee',money:0});game.take(game.options().find(x=>x.label==='当场交钱').index);
 assert.ok(game.options().some(x=>x.label.includes('申请')),'pending loan page has no apply option');
 const decline=game.options().find(x=>x.label.includes('暂不'));
 assert.ok(decline);game.take(decline.index);assert.equal(game.state().scene,'corridor');assert.equal(game.state().money,0);assert.equal(game.state().loanUsed,false);
 console.log('PASS '+variant+': pending loan, return target, one use, decline exit');
}
