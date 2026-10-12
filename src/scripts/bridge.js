// Just ask: a chat with an agent that drives the farm over the bridge. Five asks, each played as the agent would do it:
// read the catalogue (farm.ops), call the ops one shell command at a time, answer in a sentence. Every call raises the
// extension's notification, "Agent Farm bridge: <op> — ok", and the farm beside the chat changes. When the section
// first comes into view the asks play one after another until the visitor picks one. The ops and their arguments are
// the extension's own (_REF/bridge.md, extension.ts, contentRecipes.ts, agentpack.ts); ids, names and outputs are demo data.
// The counts in the farm.ops view are the extension's op names per namespace, counted in its source (Oct 2026).
import { vis, reduce, on, emit } from './state.js';
import { facts } from '../data/facts.js';

const $ = id => document.getElementById('bg-' + id);
const log = $('log'), asks = $('asks'), dview = $('view'), dt = $('dt'), toasts = $('toasts');
const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
let run = 0, user = false;
async function hold(ms, id) { await sleep(ms); while (!vis['s-bridge'] || document.hidden) await new Promise(r => setTimeout(r, 400)); return id === run; }

/* ---------- the farm beside the chat ---------- */
const PLAN0 = () => ({
  Schedules: [['⏰', 'Free model radar', 'explorer · every day 04:30'], ['⏰', 'Back up the agent repo', 'archivist · every day 05:00']],
  Workflows: [['🔗', 'Long to shorts', '5 steps · a trigger starts it'], ['🔗', 'Edit a video in parts', '8 steps']],
});
let desk = { plan: PLAN0() };
const VIEWS = {
  weekly: () => ['Tasks · Plan', `${Object.entries(desk.plan).map(([g, rows]) => `<p class="dg">${g.toUpperCase()} ${rows.length}</p>${rows.map(([i, t, w, nw]) => `<div class="dr${nw ? ' nw' : ''}"><b>${i} ${t}</b><span>${w}</span></div>`).join('')}`).join('')}`],
  resume: () => ['Sessions', desk.found ? `<div class="dc nw"><b>Storm shots keep losing the beam</b><span>🤖 showrunner · Claude · 6 turns · 2h ago · $0.84</span><span class="mono">id 7c41e2a0 · transcript found by the bridge</span></div>${desk.read ? '<div class="dc"><b>Read: turns 4 to 6</b><span>4 · It passed. What exactly changed?</span><span>5 · Write that line into the recipe\'s scene step.</span><span>6 · Queue scene 5.</span></div>' : ''}` : '<p class="dim">Looking it up…</p>'],
  route: () => ['Engines · Providers', `<div class="dr"><b>Kimi K2</b><span>kimi · KIMI_KEY · tested</span></div><div class="dr"><b>OpenRouter free</b><span>openrouter · OPENROUTER_FREE · tested 9h ago</span></div>${desk.route ? '<div class="dr nw"><b>OpenRouter free 2</b><span>openrouter · OPENROUTER_FREE · available · never tested</span></div>' : ''}${desk.notice ? '<p class="dn">🔔 Notices · A key name was bound: <b>OPENROUTER_FREE</b> → a route at openrouter.ai</p>' : ''}`],
  pack: () => ['Your desktop', desk.pack ? `<div class="dc nw"><b>📦 showrunner.agentpack</b><span>one file, for another machine or another person</span></div><ul class="pk"><li class="y">its rules and duties</li><li class="y">its tools and skills</li><li class="y">3 workflows, 1 schedule, 1 trigger: they arrive switched off</li><li class="n">its memory: the agent starts fresh</li><li class="n">secrets: only their names travel</li></ul>` : '<p class="dim">Packing…</p>'],
  ops: () => ['farm.ops', `<p class="dim">${facts.bridgeOps} operations in ${facts.namespaces} areas. A few of them:</p><div class="ns">${[['projects', 59], ['sessions', 30], ['a2a', 26], ['workflows', 21], ['alerts', 21], ['queue', 20], ['console', 19], ['accounts', 19], ['tasks', 18], ['missions', 17], ['studio', 15], ['memory', 14], ['wiki', 13], ['agents', 13], ['providers', 11], ['sentry', 11], ['kapici', 10], ['remote', 10], ['baton', 9], ['schedules', 7], ['triggers', 6], ['telegram', 6]].map(([n, c]) => `<span>${n}<i>${c}</i></span>`).join('')}<span class="more">and more</span></div>`],
};
let view = 'weekly';
function drawDesk() { const [t, h] = VIEWS[view](); dt.textContent = t; dview.innerHTML = h; }
function toast(op) {
  const t = document.createElement('p'); t.className = 'toast'; t.innerHTML = `<i>ⓘ</i> Agent Farm bridge: ${esc(op)} — ok`;
  toasts.append(t); while (toasts.children.length > 3) toasts.firstChild.remove();
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 600); }, reduce ? 4000 : 6500);
}

/* ---------- the asks ---------- */
const S = {
  weekly: [
    { u: 'Make a weekly video for the channel, every Monday at 7. It\'s the lighthouse history channel.' },
    { a: 'Setting it up. First, what the farm can do today.' },
    { c: 'farm.ops', o: `{"ok":true,"result":[{"op":"agents.list",…}, … ${facts.bridgeOps} ops]}` },
    { c: 'workflows.recipes', o: '{"ok":true,"result":[{"id":"long-to-shorts",…},{"id":"weekly-rhythm","describe":"the week\'s idea from the calendar, a script, the shots rendered and joined, your approval, then the publishing package",…}, … 6 recipes]}' },
    { c: 'workflows.addRecipe recipe=weekly-rhythm', o: '{"ok":true,"result":{"id":"wf_k3x9","title":"Weekly channel rhythm","steps":6,"inputs":["channel*","calendar","shots"]}}', fx: () => { desk.plan.Workflows.unshift(['🔗', 'Weekly channel rhythm', '6 steps · added just now', 1]); } },
    { f: 'weekly.json', j: '{ "agent": "showrunner", "title": "Weekly channel rhythm",\n  "kind": "weekly", "dow": 1, "hour": 7, "minute": 0, "missed": "ask",\n  "prompt": "Run the workflow \\"Weekly channel rhythm\\" (workflows.run) with channel = lighthouse history, for curious adults." }' },
    { c: 'schedules.add @weekly.json', o: '{"ok":true,"result":{"id":"sch_7f2c","title":"Weekly channel rhythm","next":"Mon 07:00"}}', fx: () => { desk.plan.Schedules.unshift(['⏰', 'Weekly channel rhythm', 'showrunner · every week Mon 07:00 · added just now', 1]); } },
    { a: 'Done. The recipe is now the workflow "Weekly channel rhythm", and a schedule starts it every Monday at 07:00 on me. Each week\'s video waits for your approval before anything is published. If a Monday is missed, you will be asked.' },
  ],
  resume: [
    { u: 'Pick up where session 7c41e2a0 left off.' },
    { a: 'I\'ll ask the farm for it rather than search the disk; each engine keeps its transcripts in its own place.' },
    { c: 'sessions.find q=7c41e2a0', o: '{"ok":true,"result":[{"id":"7c41e2a0-…","title":"Storm shots keep losing the beam","agent":"showrunner","engine":"claude","turns":6,"file":"…/7c41e2a0-….jsonl"}]}', fx: () => { desk.found = 1; } },
    { c: 'sessions.read session=7c41e2a0 roles=user,assistant from=4', o: '{"ok":true,"result":{"turns":[{"turn":4,"user":"It passed. What exactly changed?","assistant":"The judge failed the first take because the beam was missing…"},{"turn":5,…},{"turn":6,"user":"Queue scene 5."}],"next":null}}', fx: () => { desk.read = 1; } },
    { a: 'It stopped with scene 5 queued. Turn 4 found the line that fixed the storm shot ("one rotating beam, visible through rain") and turn 5 wrote it into the recipe. I\'ll check scene 5\'s take first, then carry the same line into scene 6.' },
  ],
  route: [
    { u: 'OpenRouter has a new free model today. Add it as a route.' },
    { a: 'A route needs a key. I can see the names of your keys, never what is behind them.' },
    { c: 'secrets.list', o: '{"ok":true,"result":[{"name":"OPENROUTER_FREE","scope":"all agents","boundTo":["or-free"]},{"name":"KIMI_KEY",…},{"name":"FAL_KEY",…}, … 6 names]}' },
    { f: 'route.json', j: '{ "id": "or-free-2", "label": "OpenRouter free 2", "providerId": "openrouter",\n  "baseUrl": "https://openrouter.ai/api", "authKind": "api-key",\n  "engines": ["claude", "opencode"], "tiers": { "sonnet": "todays-model:free" },\n  "secretRef": "OPENROUTER_FREE" }' },
    { c: 'providers.add @route.json', o: '{"ok":true,"result":{"id":"or-free-2","rev":"r1","engines":["claude","opencode"]}}', fx: () => { desk.route = 1; desk.notice = 1; } },
    { a: 'Added "OpenRouter free 2", signing in with the key name you already keep; I never saw the key. It is available and never tested. A test spends one real turn, so it waits for you: Engines, Test route.' },
  ],
  pack: [
    { u: 'Pack the showrunner. I\'ll set it up on my laptop.' },
    { c: 'agents.pack.export agent=showrunner file=~/Desktop/showrunner.agentpack', o: '{"ok":true,"result":{"file":"~/Desktop/showrunner.agentpack","workflows":3,"schedules":1,"triggers":1,"warnings":["memory/ is never exported — the agent starts with a fresh memory on import.","Secrets are never exported. {secret:NAME} references keep working once the target machine stores the same secret names.","Webhook trigger tokens are regenerated on import; triggers and schedules arrive disabled."]}}', fx: () => { desk.pack = 1; } },
    { a: 'Packed: my rules, duties and tools, three workflows, the schedule and the trigger, in showrunner.agentpack on your desktop. My memory and your keys stay here. On the laptop: import it, store FAL_KEY there, then switch the schedule and the trigger on. They arrive off.' },
  ],
  ops: [
    { u: 'What can you do in the farm?' },
    { c: 'farm.ops', o: `{"ok":true,"result":[{"op":"a2a.notes.post",…},{"op":"accounts.list",…}, … ${facts.bridgeOps} ops]}` },
    { a: `Nearly anything you can click: ${facts.bridgeOps} operations. Tasks, schedules, triggers and workflows; missions and the queue; sessions, transcripts and search; the wiki; projects and their backlogs; routes, accounts and Gatekeeper; notices and your phone. I read the list fresh each time, so new abilities show up by themselves. Two things I won't do: see a key's value, or start paid work you did not ask for.` },
  ],
};
function line(it) {
  const el = document.createElement('div');
  if (it.u) { el.className = 'mu'; el.innerHTML = `<em>you</em>${esc(it.u)}`; }
  else if (it.a) { el.className = 'ma'; el.innerHTML = `<em>showrunner</em><span></span>`; }
  else if (it.f) { el.className = 'mf'; el.innerHTML = `<em>Write · ${esc(it.f)}</em><pre>${esc(it.j)}</pre>`; }
  else { el.className = 'mc'; el.innerHTML = `<em>Bash</em><code>$ node "$AF" <b></b></code><pre class="o"></pre>`; }
  log.append(el); log.scrollTop = log.scrollHeight;
  return el;
}
async function play(id) {
  const me = ++run;
  view = id; desk = { plan: PLAN0() }; drawDesk();
  log.innerHTML = '';
  for (const b of asks.querySelectorAll('[data-ask]')) b.classList.toggle('on', b.dataset.ask === id);
  emit('showing', { weekly: 'bridge', resume: 'shared', route: 'bridge', pack: 'move', ops: 'ops' }[id]);
  for (const it of S[id]) {
    if (!await hold(it.u ? 300 : 700, me)) return;
    const el = line(it);
    if (it.a) { const sp = el.querySelector('span'); for (const w of it.a.split(' ')) { if (me !== run) return; sp.textContent += (sp.textContent ? ' ' : '') + w; log.scrollTop = log.scrollHeight; await sleep(26); } }
    if (it.c) {
      const b = el.querySelector('b'); for (const ch of it.c) { if (me !== run) return; b.textContent += ch; await sleep(12); }
      if (!await hold(650, me)) return;
      el.querySelector('.o').textContent = it.o; log.scrollTop = log.scrollHeight;
      toast(it.c.split(' ')[0]);
      if (it.fx) { it.fx(); drawDesk(); }
    }
  }
  return true;
}
asks.addEventListener('click', e => { const b = e.target.closest('[data-ask]'); if (b) { user = true; play(b.dataset.ask); } });

/* the chapter VIII tiles */
on('feature', id => { const a = { bridge: 'weekly', ops: 'ops', mcp: 'ops', move: 'pack', shared: 'resume' }[id]; if (a) { user = true; play(a); } });

/* first sight: the asks, one after another, until the visitor picks one */
drawDesk();
let started = false;
const io = new IntersectionObserver(async es => {
  if (started || !es.some(e => e.isIntersecting)) return;
  started = true; io.disconnect();
  if (reduce) { for (const it of S.weekly) { const el = line(it); if (it.a) el.querySelector('span').textContent = it.a; if (it.c) { el.querySelector('b').textContent = it.c; el.querySelector('.o').textContent = it.o; if (it.fx) it.fx(); } } drawDesk(); return; }
  for (const id of ['weekly', 'resume', 'route', 'pack']) {
    if (user) return;
    const done = await play(id);
    if (!done || user) return;
    await sleep(5500);
  }
}, { threshold: 0.3 });
io.observe($('chat'));
