const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const asset = (name) => path.join(__dirname, '..', 'assets', name);
// Missing implementation remains a behavioral failure during the initial red run.
const source = fs.existsSync(asset('analytics.js')) ? fs.readFileSync(asset('analytics.js'), 'utf8') : '';
const websiteId = '94db1cb1-74f4-4a40-ad6c-962362670409';

function page(options = {}) {
  const scripts = [], listeners = [], calls = [];
  const choices = { contains: (button) => button.inChoices };
  const document = {
    getElementById: (id) => id === 'choices' ? choices : null,
    addEventListener: (name, handler, capture) => listeners.push({ name, handler, capture }),
    createElement: (tagName) => ({ tagName, attributes: {}, setAttribute(name, value) { this.attributes[name] = value; } }),
    head: { appendChild(script) { if (options.appendFails) throw new Error('blocked'); scripts.push(script); } }
  };
  const location = new URL(options.url || 'https://zyfaigy-droid.github.io/classroom-simulator/');
  const context = vm.createContext({ document, location, navigator: { webdriver: !!options.webdriver }, URLSearchParams, Promise });
  context.window = context;
  context.ANKUN_ANALYTICS = { websiteId: options.websiteId === undefined ? websiteId : options.websiteId };
  // Same global lexical binding as the classic game script; never expose or change production state APIs.
  vm.runInContext('let state = {scene: "start"};', context);
  vm.runInContext(source, context, { filename: 'analytics.js' });
  function click(label = '正式进入游戏', scene = 'start', inChoices = true) {
    vm.runInContext('state.scene = ' + JSON.stringify(scene), context);
    const button = { textContent: label, inChoices };
    const target = { closest: (selector) => selector === 'button' ? button : null };
    for (const entry of listeners) if (entry.name === 'click') entry.handler({ target });
  }
  function load(track = (...args) => { calls.push(args); return Promise.resolve(); }) {
    context.umami = { track };
    scripts[0].onload();
  }
  return { scripts, listeners, calls, click, load, context };
}

async function main() {
  let tested = 0;
  async function test(name, run) { await run(); tested++; console.log('PASS ' + name); }
  await test('online play starts one lazy tracker and sends pageview plus game_start', async () => {
    const game = page();
    assert.equal(game.scripts.length, 0, 'opening the page must not contact analytics');
    game.click();
    assert.equal(game.scripts.length, 1, 'starting a real game must load the tracker');
    assert.ok(game.listeners.some((entry) => entry.capture === true), 'observe start before the game advances the scene');
    const tracker = game.scripts[0];
    assert.equal(tracker.src, 'https://cloud.umami.is/script.js');
    assert.equal(tracker.attributes['data-website-id'], websiteId);
    assert.equal(tracker.attributes['data-auto-track'], 'false');
    assert.equal(tracker.attributes['data-exclude-search'], 'true');
    assert.equal(tracker.attributes['data-exclude-hash'], 'true');
    game.load();
    assert.deepEqual(game.calls, [[], ['game_start']]);
    game.click(); game.click('正式进入游戏', 'firstClass');
    assert.equal(game.scripts.length, 1);
    assert.deepEqual(game.calls, [[], ['game_start']], 'restart during the same page must not double-count');
  });
  await test('only the start-scene choice counts as play', async () => {
    const game = page();
    game.click('重新开局'); game.click('正式进入游戏', 'corridor'); game.click('正式进入游戏', 'start', false);
    assert.equal(game.scripts.length, 0);
    game.click(); assert.equal(game.scripts.length, 1);
  });
  await test('empty or invalid website IDs never send requests', async () => {
    for (const id of ['', null, 'not-a-uuid', websiteId + '" src="https://example.org']) {
      const game = page({ websiteId: id }); game.click();
      assert.equal(game.scripts.length, 0);
    }
  });
  await test('checked-in configuration contains only a public website ID or stays disabled', async () => {
    const source = fs.readFileSync(asset('analytics-config.js'), 'utf8');
    const context = vm.createContext({}); context.window = context;
    vm.runInContext(source, context);
    assert.deepEqual(Object.keys(context.ANKUN_ANALYTICS), ['websiteId']);
    assert.match(context.ANKUN_ANALYTICS.websiteId, /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})?$/i);
  });
  await test('file, local, other domains, other projects, automation and opt-out stay offline', async () => {
    const excluded = [
      { url: 'file:///E:/game/index.html' }, { url: 'http://localhost:8000/classroom-simulator/' },
      { url: 'http://zyfaigy-droid.github.io/classroom-simulator/' },
      { url: 'https://example.com/classroom-simulator/' }, { url: 'https://zyfaigy-droid.github.io/other/' },
      { url: 'https://zyfaigy-droid.github.io/classroom-simulator-evil/' }, { webdriver: true },
      { url: 'https://zyfaigy-droid.github.io/classroom-simulator/?analytics=off' }
    ];
    for (const options of excluded) {
      const game = page(options); game.click(); assert.equal(game.scripts.length, 0, JSON.stringify(options));
    }
  });
  await test('Chinese and explicit HTML entry paths are supported', async () => {
    for (const name of ['index.html', encodeURIComponent('安堃模拟器.html')]) {
      const game = page({ url: 'https://zyfaigy-droid.github.io/classroom-simulator/' + name });
      game.click(); assert.equal(game.scripts.length, 1);
    }
  });
  await test('slow load does not count early or interrupt the game', async () => {
    const game = page(); game.click(); game.click();
    assert.deepEqual(game.calls, []); assert.equal(game.scripts.length, 1);
    assert.equal(vm.runInContext('state.scene', game.context), 'start');
    vm.runInContext('state.scene = "firstClass";', game.context);
    game.load(); assert.deepEqual(game.calls, [[], ['game_start']]);
    assert.equal(vm.runInContext('state.scene', game.context), 'firstClass');
  });
  await test('script and provider failures are harmless and do not retry on every click', async () => {
    const blocked = page({ appendFails: true }); assert.doesNotThrow(() => blocked.click());
    const missing = page(); missing.click(); assert.doesNotThrow(() => missing.scripts[0].onerror());
    assert.doesNotThrow(() => missing.scripts[0].onload()); missing.click(); assert.equal(missing.scripts.length, 1);
    const failed = page(); failed.click(); let attempts = 0;
    assert.doesNotThrow(() => failed.load(() => { attempts++; throw new Error('provider failure'); }));
    assert.equal(attempts, 2, 'one failed metric should not suppress the other');
    const rejected = page(); rejected.click(); rejected.load(() => Promise.reject(new Error('network unavailable')));
    await new Promise((resolve) => setImmediate(resolve));
  });
  console.log(tested + ' analytics checks passed; no external network used.');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
