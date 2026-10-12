// Any brain: the Engines page (engines, providers and routes, accounts) and the Secrets page, with a switchboard beside
// them. When the section first comes into view the demo buys one test turn on Claude Code, then adds a route from the
// Kimi template, saves it and tests it; the switchboard lights the new line. The visitor can do each step by hand. Copy
// follows the extension (media/engines.js, afRouteForm.js, afAccounts.js, afPolicies.js, secrets.js;
// src/core/providerCatalog.ts for the templates); accounts, keys, numbers and model names are demo data.
import { vis, reduce, on, emit } from './state.js';

const $ = id => document.getElementById('br-' + id);
const view = $('view'), tabsEl = $('tabs'), jumpEl = $('jump'), sw = $('sw'), launch = $('launch');
const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
async function hold(ms) { await sleep(ms); while (!vis['s-brains'] || document.hidden) await new Promise(r => setTimeout(r, 400)); }
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/* ---------- engines ---------- */
const ENGINES = [
  { id: 'claude', l: 'Claude Code', cmd: 'claude', b: 'on a plan', bill: 'A Claude Pro or Max plan, signed in once in the browser. An API key is the alternative, not the normal route.', key: 'Add key' },
  { id: 'codex', l: 'Codex', cmd: 'codex', b: 'on a plan', bill: 'A ChatGPT Plus, Pro, Team or Business plan, signed in once in the browser — exactly like Claude Code. An API key is the alternative.', key: 'Add key' },
  { id: 'gemini', l: 'Gemini', cmd: 'gemini', b: 'on a key', bill: 'A Google account sign-in or an API key. The CLI states no per-turn price, so a dollar figure beside a Gemini session is derived from your pricing rules, never quoted.', key: 'Replace key' },
  { id: 'agy', l: 'Antigravity', cmd: 'agy', b: 'on a plan', bill: 'A Google account signed into the Antigravity app — the CLI borrows that sign-in. There is no API key for this engine and nothing to keep in the vault.' },
  { id: 'opencode', l: 'OpenCode', cmd: 'opencode', b: 'no sign-in needed', bill: 'Its own connected provider needs no sign-in at all: free models, zero credentials, real turns. Signing in, or a provider key, adds the paid models beside them.' },
];
const verdict = {}; // id → 'testing' | {ok, s}
function enginesView() {
  return `<div class="ph"><h3>Engines</h3><span>5 of 5 can run right now · 3 on a subscription</span></div>
    <p class="lede">Which agent CLI this machine can actually run, and how each one is paid for. <b>A plan sign-in lives in the CLI's own credentials file and never passes through Agent Farm</b>; a key is kept in the OS keychain. Everything above a card's verdict line was read off disk — <b>only ⚡ Test proves a call gets through</b>, and it costs one real turn.</p>
    ${ENGINES.map(e => { const v = verdict[e.id]; return `<div class="ec${v === 'testing' ? ' busy' : ''}" data-e="${e.id}">
      <div class="eh"><b>${e.l}</b><i class="bd">${e.b}</i><span class="sp"></span>${e.id === 'opencode' ? '<span class="sb">Add paid providers</span>' : '<span class="sb">Sign in with a plan</span>'}<button type="button" data-test="${e.id}" ${v === 'testing' ? 'disabled' : ''} title="Run ONE real turn with its smallest model and a four-word prompt. It costs a turn of your plan or key.">⚡ Test</button>${e.key ? `<span class="sb">${e.key}</span>` : ''}</div>
      <p class="bl">${e.bill}</p>
      <p class="v ${v === 'testing' ? 't' : v ? (v.ok ? 'ok' : 'held') : 'n'}">${v === 'testing' ? `⟳ calling ${e.cmd}… one real turn, smallest model. Prompt: <code>Reply with exactly: OK</code>` : v ? v.s : 'Not tested in this window. The reading above is what is on disk — a call is the only thing that proves it works.'}</p></div>`; }).join('')}`;
}
async function test(id) {
  if (verdict[id] === 'testing') return;
  verdict[id] = 'testing'; render();
  await sleep(1700);
  verdict[id] = { ok: true, s: `✓ Answered · just now · took ${{ claude: '3.1', codex: '4.6', gemini: '2.2', agy: '5.3', opencode: '1.8' }[id]}s · it said OK` };
  render(); board();
}

/* ---------- providers and routes ---------- */
const TEMPLATES = {
  kimi: { id: 'kimi-k2', l: 'Kimi K2', p: 'kimi', url: 'https://api.moonshot.ai/anthropic', key: 'KIMI_KEY', tier: 'kimi-k2', note: 'Kimi (Moonshot, Anthropic-compatible)' },
  minimax: { id: 'minimax', l: 'MiniMax', p: 'minimax', url: 'https://api.minimax.io/anthropic', key: 'MINIMAX_KEY', tier: 'minimax-m2', note: 'MiniMax (Anthropic-compatible)' },
};
const ROUTES = [
  { id: 'or-free', l: 'OpenRouter free', p: 'openrouter', url: 'https://openrouter.ai/api', key: 'OPENROUTER_FREE', tier: 'a free model of the day', rev: 'r4', radar: true, cc: 'tested · 9h ago', oc: 'tested · 9h ago' },
  { id: 'local', l: 'On this machine', p: 'local', url: 'http://127.0.0.1:8080', key: 'LOCAL_KEY', tier: 'local-coder-14b', rev: 'r1', cc: '', oc: 'tested · 2d ago', serves: ['oc'] },
];
let form = null, hlRadar = false, hlHealth = false;
function routeCard(r) {
  const chip = s => s ? `<i class="ok">${s}</i>` : '<i class="nt">never tested</i>';
  return `<div class="rc${r.fresh ? ' fresh' : ''}${r.radar && hlRadar ? ' hl' : ''}"><div class="rh"><b>${r.l}</b><code>${r.id}</code><i class="ks">${r.key} · ••••</i><em>${r.rev}</em><span class="sp"></span><span class="sb">Edit</span><span class="sb">Change key</span><span class="sb">Copy</span></div>
    <p class="rl">${r.p} · ${r.url} · ${r.p === 'local' ? 'API key' : 'API key'} · opus → ${r.tier}, sonnet → ${r.tier}, haiku → ${r.tier}</p>
    ${r.radar ? '<p class="rd">Added over the bridge by the schedule <b>Free model radar</b> (explorer, every day 04:30) after it found the model answering.</p>' : ''}
    <p class="sv">Serves ${(r.serves || ['cc', 'oc']).map(k => `<span>${k === 'cc' ? 'Claude Code' : 'OpenCode'} ${chip(r[k])}<button type="button" data-rtest="${r.id}:${k}" ${r.busy === k ? 'disabled' : ''}>${r.busy === k ? '⟳ testing…' : 'Test route'}</button></span>`).join('')}</p></div>`;
}
function formHtml() {
  const f = form, v = k => esc(f.shown[k] ?? '');
  return `<div class="rf"><div class="rfh"><b>New route</b><span>From a template: </span>${Object.keys(TEMPLATES).map(k => `<button type="button" data-tpl="${k}" class="${f.tpl === k ? 'on' : ''}">${TEMPLATES[k].l.split(' ')[0]}</button>`).join('')}<button type="button" class="x" data-rf="x" aria-label="Cancel">✕</button></div>
    <p class="sv2">Serves <span>✓ Claude Code</span><span>✓ OpenCode</span></p>
    <div class="g4"><label>Id<input readonly value="${v('id')}"></label><label>Label<input readonly value="${v('l')}"></label><label>Provider <em>required</em><input readonly value="${v('p')}"></label><label>Key sent as<input readonly value="${f.shown.p ? 'API key' : ''}"></label></div>
    <label class="full">Endpoint <em>https, or http on this machine (localhost / 127.0.0.1)</em><input readonly value="${v('url')}"></label>
    <p class="tiers"><b>Tiers</b> Claude Code runs the tier a session asks for; OpenCode offers each model as its own choice</p>
    <div class="g4">${['opus', 'sonnet', 'haiku', 'fable'].map(t => `<label>${t}<input readonly value="${t === 'fable' ? '' : v('tier')}"></label>`).join('')}</div>
    <div class="g4"><label>Context<input readonly placeholder="tokens"></label><label>Output<input readonly placeholder="tokens"></label><label class="w2">Sign in with<input readonly value="${v('key')}"></label></div>
    <p class="nok">No credential is on this page in either direction: the key is a name in your keychain, typed outside the page.</p>
    <div class="rfb"><button type="button" data-rf="save" ${f.full ? '' : 'disabled'}>Save route</button><button type="button" class="sec" data-rf="x">Cancel</button></div></div>`;
}
function healthHtml() {
  const row = (l, id, a, t, n) => `<div class="hr"><b>${l}</b><code>${id}</code><i class="cf">configured</i><i class="${a ? 'av' : 'na'}">${a ? 'available' : 'not available'}</i>${t ? `<i class="ok">${t}</i>` : '<i class="nt">never tested</i>'}<em>${n} model${n === 1 ? '' : 's'}</em></div>`;
  return `<div class="hl0${hlHealth ? ' hl' : ''}" id="br-health"><h4>Route health</h4><p class="lede">What is readable for free about each route, and what a real turn has proved. <b>Available and never tested is the ordinary state</b> — the free check is everything that can be known without spending anything, and a turn is only ever bought by pressing for it.</p>
    <p class="hg">Claude Code</p>${row('Anthropic (first-party)', 'anthropic', 1, 'tested · 2d ago', 3)}${ROUTES.filter(r => (r.serves || ['cc']).includes('cc')).map(r => row(r.l, r.id, 1, r.cc, 1)).join('')}
    <p class="hg">OpenCode</p>${row('opencode · its own providers', 'opencode', 1, 'tested · 1d ago', 7)}${ROUTES.map(r => row(r.l, r.id, 1, r.oc, 1)).join('')}</div>`;
}
function routesView() {
  return `<div class="ph"><h3>Providers</h3><span>${ROUTES.length} routes · 4 templates</span><span class="sp"></span><button type="button" class="add" data-rf="new" ${form ? 'disabled' : ''}>+ Add route</button></div>
    <p class="lede">Which engine is the authority for which piece of provider data — and the routes Agent Farm holds itself. <b>Two groups, never one list:</b> OpenCode's own providers are its engine's. A route is Agent Farm's: one address, one key and its models, given to Claude Code and lent to OpenCode when a session starts, never written into OpenCode's files.</p>
    <div class="own"><span></span><b>catalog</b><b>credential</b><b>config</b><b>selection</b>${[['claude', 'af', 'af', 'af', 'af'], ['opencode · its own providers', 'oc', 'oc', 'oc', 'af'], ['opencode · Agent Farm routes', 'af', 'af', 'af', 'af']].map(([e, ...c]) => `<span>${e}</span>${c.map(x => `<i class="o${x}">${x === 'af' ? 'Agent Farm' : 'opencode'}</i>`).join('')}`).join('')}</div>
    ${form ? formHtml() : ''}
    ${ROUTES.map(routeCard).join('')}
    ${healthHtml()}`;
}
async function rtest(id, k) {
  const r = ROUTES.find(x => x.id === id); if (!r || r.busy) return;
  r.busy = k; render();
  await sleep(1900);
  r.busy = ''; r[k] = 'tested · just now'; render(); board();
}
async function fill(tpl, typing) {
  const t = TEMPLATES[tpl];
  form = { tpl, shown: {}, full: false }; render();
  for (const k of ['id', 'l', 'p', 'url', 'tier', 'key']) {
    if (!form || form.tpl !== tpl) return;
    if (typing && !reduce) { form.shown[k] = ''; for (const ch of t[k]) { form.shown[k] += ch; render(); await sleep(14); } } else form.shown[k] = t[k];
  }
  if (form && form.tpl === tpl) { form.full = true; render(); }
}
function save() {
  const t = TEMPLATES[form.tpl]; form = null;
  if (!ROUTES.some(r => r.id === t.id)) ROUTES.unshift({ ...t, rev: 'r1', cc: '', oc: '', fresh: true, add: true });
  render(); board();
}

/* ---------- accounts ---------- */
const ACC = [
  { n: 'work', pl: 'max', st: 'ready', h5: 78, wk: 23, h5l: '1h 27m left', wkl: '6d 7h left', today: '$41.20 · 13 runs', used: 'last used 7s ago · developer', tag: 'standing' },
  { n: 'night', pl: 'pro', st: 'ready', h5: 0, wk: 54, h5l: '4h 17m left', wkl: '3d left', today: '$9.66 · 2 runs', used: 'last used 36m ago · developer', tag: 'next' },
  { n: 'studio', pl: 'pro', st: 'ready', h5: 12, wk: 79, h5l: '3h 02m left', wkl: '1d 1h left', today: '$12.10 · 4 runs', used: 'last used 1h ago · showrunner' },
  { n: 'spare', pl: 'pro', st: 'ready', h5: 0, wk: 84, h5l: 'no reset time', wkl: '2d left', today: '$3.05 · 1 run', used: 'active 8h ago' },
];
function accountsView() {
  const bar = (p, c) => `<span class="bar"><i style="width:${p}%;background:${c}"></i></span>`;
  return `<div class="ph"><h3>Accounts</h3><span>Claude Code 4 · Codex 1</span></div>
    <p class="lede">More than one sign-in of the same engine, without signing in and out. <b>An account is a config directory, not a copied credential:</b> starting a session with one points the engine at that directory, so the session you are talking to is never touched and two accounts can run at once. <b>No credential is on this page in either direction.</b></p>
    <div class="cap"><span>Claude Code ▾</span><span class="in">what to call it</span><span class="sb">Capture this sign-in</span></div>
    ${ACC.map(a => `<div class="ac${a.tag === 'standing' ? ' cur' : ''}"><div class="ah"><b>${a.n}</b><i class="pl">${a.pl}</i><i class="rd">● ${a.st}</i>${a.tag ? `<i class="tg ${a.tag}">${a.tag}</i>` : ''}<span class="sp"></span><span class="sb">Use this one</span><span class="sb">Disable</span><span class="sb">Sign out</span></div>
      <p class="q"><span>5H</span><b>${a.h5}%</b>${bar(a.h5, a.h5 > 70 ? '#e4c76a' : '#71e3ed')}<em>${a.h5l}</em></p><p class="q"><span>WK</span><b>${a.wk}%</b>${bar(a.wk, a.wk > 70 ? '#e4c76a' : '#71e3ed')}<em>${a.wkl}</em></p>
      <p class="ad">today ${a.today} · ${a.used}</p></div>`).join('')}
    <p class="cdx"><b>Codex</b> 1 account · <b>codex-work</b> · ● ready · standing · usage window — not read yet: Codex records one while it works. <span>No second sign-in on Gemini, OpenCode, Antigravity — each was found to do something else instead.</span></p>
    <div class="pol"><h4>Account policies</h4><p class="lede">A rule chooses the sign-in <b>at the moment a session starts</b>, against the figures of that moment. <b>A rule that can choose nothing refuses the launch and says why</b> — it never falls through to the main sign-in.</p>
    <div class="pt"><b>Built-in rule</b><b>Claude Code</b><b>Codex</b>${[['@emptiest', '→ night', '→ codex-work'], ['@pool', 'nothing right now', 'nothing right now'], ['@standing', '→ work', '→ codex-work'], ['@round-robin', '→ studio', '→ codex-work']].map(([r, a, b]) => `<span>${r}</span><i class="${a.startsWith('→') ? 'to' : 'no'}">${a}</i><i class="${b.startsWith('→') ? 'to' : 'no'}">${b}</i>`).join('')}</div></div>`;
}

/* ---------- secrets ---------- */
const SECRETS = [
  ['FAL_KEY', 'the video and image models of the Studio', ['all agents', '⚙ Agent Farm']],
  ['KIMI_KEY', '', ['developer', 'assistant', '🔗 Kimi K2']],
  ['OPENROUTER_FREE', '', ['all agents', '🔗 OpenRouter free']],
  ['LOCAL_KEY', 'the model on this machine', ['developer', '🔗 On this machine']],
  ['TELEGRAM_BOT_TOKEN', '', ['all agents', '⚙ Agent Farm']],
  ['DEPLOY_TOKEN', '', ['farm only']],
];
function secretsView() {
  return `<div class="ph"><h3>🔑 Secrets</h3><span>6 secrets in the OS keychain · 2 agent-scoped · 1 farm-only · 7 agents in the farm</span></div>
    <p class="lede si">Values live in the <b>OS keychain</b> (VS Code SecretStorage) — never in settings files or git. Each is injected into an agent's tasks as an <b>environment variable</b> and is available in prompts as <code>{secret:NAME}</code>. <b>Scope</b> is the usage authorization: <i class="all">all agents</i> by default, or restrict a secret to specific agents, or make it <i class="fo">farm only</i> when Agent Farm uses it itself and no agent should. The value itself is never shown here.</p>
    <div class="tools"><span class="in">filter secrets…</span><span class="add">+ Add secret</span></div>
    <div class="stb"><div class="th"><span>Name</span><span>Value</span><span>Description</span><span>Used by (scope)</span></div>
    ${SECRETS.map(([n, d, s]) => `<div class="tr"><code>${n}</code><span class="dots">•••••••• <em>edit</em></span><span class="ds">${d || '—'}</span><span class="sc">${s.map(x => `<i class="${x === 'all agents' ? 'all' : x === 'farm only' ? 'fo' : x.startsWith('⚙') ? 'af' : x.startsWith('🔗') ? 'rt' : ''}">${x}</i>`).join('')}</span></div>`).join('')}</div>
    <p class="foot">A key's value never crosses the bridge either: an agent can ask for the names, never for what is behind them.</p>`;
}

/* ---------- the panel ---------- */
let tab = 'engines', user = false;
const SHOW = { engines: 'engines', routes: 'routes', accounts: 'accounts', secrets: 'vault' };
function render() {
  const top = view.scrollTop;
  view.innerHTML = { engines: enginesView, routes: routesView, accounts: accountsView, secrets: secretsView }[tab]();
  view.scrollTop = top;
  ROUTES.forEach(r => { r.fresh = false; });
}
function setTab(t) {
  if (t !== tab) view.scrollTop = 0;
  tab = t;
  for (const b of tabsEl.querySelectorAll('[data-tab]')) { const o = (b.dataset.tab === 'secrets') === (t === 'secrets'); b.classList.toggle('on', o); b.setAttribute('aria-selected', o); }
  jumpEl.hidden = t === 'secrets';
  for (const b of jumpEl.querySelectorAll('[data-tab]')) { const o = b.dataset.tab === t; b.classList.toggle('on', o); b.setAttribute('aria-selected', o); }
  render(); emit('showing', SHOW[t]);
}
for (const el of [tabsEl, jumpEl]) el.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { user = true; hlRadar = hlHealth = false; setTab(b.dataset.tab); } });
view.addEventListener('click', e => {
  const t = e.target;
  const ts = t.closest('[data-test]'); if (ts) { user = true; test(ts.dataset.test); return; }
  const rt = t.closest('[data-rtest]'); if (rt) { user = true; const [id, k] = rt.dataset.rtest.split(':'); rtest(id, k); return; }
  const tp = t.closest('[data-tpl]'); if (tp) { user = true; fill(tp.dataset.tpl, false); return; }
  const rf = t.closest('[data-rf]'); if (rf && !rf.disabled) { user = true; const a = rf.dataset.rf; if (a === 'new') fill('kimi', false); else if (a === 'save') save(); else { form = null; render(); } }
});

/* ---------- the switchboard ---------- */
const BRAINS = [
  { k: 'anth', l: 'Claude models', s: 'your plan', from: ['claude'] },
  { k: 'gpt', l: 'GPT models', s: 'your plan', from: ['codex'] },
  { k: 'goog', l: 'Gemini models', s: 'a key, or the app\'s sign-in', from: ['gemini', 'agy'] },
  { k: 'ocfree', l: 'OpenCode\'s free models', s: 'no sign-in', from: ['opencode'] },
];
let pickEng = 'claude', pickBrain = 'anth';
function board() {
  const routes = ROUTES.map(r => ({ k: r.id, l: r.l, s: r.p === 'local' ? 'an address on this machine' : `route · ${r.p}`, from: (r.serves || ['cc', 'oc']).map(x => x === 'cc' ? 'claude' : 'opencode'), r }));
  const W = 460, ey = i => 50 + i * 64, nb = BRAINS.length, by = i => 46 + i * 46, ry = i => 46 + nb * 46 + 38 + i * 46;
  const eY = Object.fromEntries(ENGINES.map((e, i) => [e.id, ey(i)]));
  const all = [...BRAINS.map((b, i) => ({ ...b, y: by(i) })), ...routes.map((b, i) => ({ ...b, y: ry(i), route: 1 }))];
  const H = Math.max(ey(4) + 40, ry(routes.length - 1) + 50);
  const tested = b => b.route ? (b.from.includes('claude') ? b.r.cc || b.r.oc : b.r.oc) : true;
  const lines = all.flatMap(b => b.from.map(e => { const y1 = eY[e], y2 = b.y, on = pickEng === e && pickBrain === b.k; return `<path class="${b.route ? 'rt' : ''}${tested(b) ? '' : ' un'}${on ? ' on' : ''}${b.r && b.r.add ? ' nw' : ''}" d="M150 ${y1} C 215 ${y1}, 235 ${y2}, 298 ${y2}"/>`; })).join('');
  const eng = ENGINES.map(e => { const v = verdict[e.id]; return `<g class="en${pickEng === e.id ? ' on' : ''}" data-eng="${e.id}" role="button" tabindex="0"><rect x="10" y="${eY[e.id] - 20}" width="140" height="40" rx="3"/><text x="22" y="${eY[e.id] - 3}" class="t1">${e.l}</text><text x="22" y="${eY[e.id] + 12}" class="t2">${v && v !== 'testing' ? '✓ tested' : e.b}</text></g>`; }).join('');
  const brs = all.map(b => `<g class="br${b.route ? ' rt' : ''}${pickBrain === b.k ? ' on' : ''}${b.r && b.r.add ? ' nw' : ''}" data-brain="${b.k}" role="button" tabindex="0"><rect x="298" y="${b.y - 18}" width="152" height="36" rx="3"/><text x="308" y="${b.y - 3}" class="t1">${esc(b.l)}</text><text x="308" y="${b.y + 11}" class="t2">${esc(b.s)}</text></g>`).join('');
  sw.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Engines on the left, the brains each can run on the right">
    <text x="10" y="16" class="hd">ENGINES</text><text x="298" y="16" class="hd">BRAINS</text>
    <rect class="rz" x="290" y="${ry(0) - 26}" width="166" height="${routes.length * 46 + 36}" rx="4"/><text x="298" y="${ry(0) - 32}" class="hd">ROUTES</text><text x="373" y="${ry(routes.length - 1) + 30}" class="t2" text-anchor="middle">for Claude Code, OpenCode</text>
    ${lines}${eng}${brs}</svg>`;
  const b = all.find(x => x.k === pickBrain), e = ENGINES.find(x => x.id === pickEng);
  launch.innerHTML = b && b.from.includes(pickEng)
    ? `A session started now: <b>${e.l}</b> → <b>${esc(b.l)}</b>${b.route ? ` · ${pickEng === 'claude' ? `tier <b>sonnet</b> → ` : 'model '}<code>${b.r.tier}</code> · key <code>${b.r.key}</code> from the keychain, never shown` : ` · ${esc(b.s)}`}.`
    : `<b>${e.l}</b> cannot run <b>${esc(b.l)}</b>${b.route ? ': a route serves Claude Code and OpenCode only' : ''}. Pick a line that exists.`;
}
sw.addEventListener('click', e => {
  const en = e.target.closest('[data-eng]'), br = e.target.closest('[data-brain]');
  if (en) { user = true; pickEng = en.dataset.eng; const first = [...BRAINS, ...ROUTES.map(r => ({ k: r.id, from: (r.serves || ['cc', 'oc']).map(x => x === 'cc' ? 'claude' : 'opencode') }))].find(b => b.from.includes(pickEng)); if (first) pickBrain = first.k; board(); }
  if (br) { user = true; pickBrain = br.dataset.brain; const b = [...BRAINS, ...ROUTES.map(r => ({ k: r.id, from: (r.serves || ['cc', 'oc']).map(x => x === 'cc' ? 'claude' : 'opencode') }))].find(x => x.k === pickBrain); if (b && !b.from.includes(pickEng)) pickEng = b.from[0]; board(); }
});
sw.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-eng],[data-brain]')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); } });

/* the chapter VII tiles */
on('feature', id => {
  const f = {
    engines: () => setTab('engines'),
    routes: () => { setTab('routes'); if (!form) fill('kimi', false); },
    radar: () => { hlRadar = true; setTab('routes'); pickEng = 'claude'; pickBrain = 'or-free'; board(); },
    health: () => { hlHealth = true; setTab('routes'); const h = $('health'); if (h) view.scrollTop = h.offsetTop - 20; },
    accounts: () => setTab('accounts'),
    policies: () => { setTab('accounts'); const p = view.querySelector('.pol'); if (p) view.scrollTop = p.offsetTop - 20; emit('showing', 'policies'); },
    vault: () => setTab('secrets'),
  }[id];
  if (f) { user = true; f(); }
});

/* first sight: one test turn, then a route from a template, saved and tested */
setTab('engines'); board();
let started = false;
const io = new IntersectionObserver(async es => {
  if (started || !es.some(e => e.isIntersecting)) return;
  started = true; io.disconnect();
  if (reduce) return;
  const go = async ms => { await hold(ms); return !user; };
  if (!await go(1200)) return;
  await test('claude');
  if (!await go(1600)) return;
  setTab('routes');
  if (!await go(1200)) return;
  await fill('kimi', true);
  if (!await go(900)) return;
  save(); pickEng = 'claude'; pickBrain = 'kimi-k2'; board();
  if (!await go(1500)) return;
  await rtest('kimi-k2', 'cc');
}, { threshold: 0.25 });
io.observe($('panel'));
