const assert=require('node:assert/strict'),path=require('node:path');const {model}=require('../tools/game-model.cjs');
for(const variant of ['story-classic.js','story-extended.js']){
 const game=model(path.resolve(__dirname,'..'),variant);game.fresh();
 game.diagnosticState({scene:'exam'});game.take(0);
 assert.equal(game.state().glare,1,'the visible dual-watch exam scene was not counted');
 game.fresh();game.diagnosticState({scene:'corridor',glare:5});game.take(0);
 assert.ok(game.state().achievements.includes('金表眩晕'),'observation achievement still needs more distinct events than the game provides');
 console.log('PASS '+variant+': exam watch observation and achievable observation achievement');
}
