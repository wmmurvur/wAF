// Recipes and triggers: the Tasks page (Plan and Runs) and one watch trigger drawn as a flow. When the section first
// comes into view three files land in the watched folder one after another: real footage wakes the recipe, a lock file
// and a whitespace-only edit wake nobody. The visitor can drop the files again and switch the trigger check between
// Off, Shadow and On (Off is the extension's default). The chapter IV tiles open the part of the page that shows them.
// Copy follows the extension (media/tasksPage.js, settings → Gatekeeper); names, times and costs are demo data.
import { vis, reduce, on, emit } from './state.js';

const $ = id => document.getElementById('au-' + id);
const view = $('view'), tabsEl = $('tabs'), flow = $('flow');
const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
async function hold(ms) { await sleep(ms); while (!vis['s-auto'] || document.hidden) await new Promise(r => setTimeout(r, 400)); }

/* ---------- the plan and the runs (demo rows) ---------- */
const PLAN = [
  ['Schedules', [
    { t: 'Free model radar', ag: 'explorer', when: 'every day 04:30 · next tomorrow 04:30', eng: 'Antigravity', guard: '', cost: '—', last: '22h ago', n: '4 run(s)', on: 1 },
    { t: 'Back up the agent repo', ag: 'archivist', when: 'every day 05:00 · next tomorrow 05:00', eng: 'Claude', guard: 'folder changed', cost: '$0.04', last: '21h ago', n: '7 run(s)', on: 1 },
    { t: 'Weekly channel rhythm', ag: 'showrunner', when: 'every week Mon 07:00 · starts the recipe', eng: 'Claude', guard: '', cost: '$0.62', last: '6d ago', n: '3 run(s)', on: 1 },
    { t: 'Year-end invoice sweep', ag: 'manager', when: 'once · Dec 31, 18:00 · if missed: ask me', eng: 'Codex', guard: '', cost: '—', last: 'never', n: '', on: 0 },
  ]],
  ['Triggers', [
    { t: 'New footage → Long to shorts', ag: 'workflow', when: 'on change · Studio\\inbox', eng: '', guard: '🛡 Gatekeeper', cost: '$0.10', last: 'just now', n: '', on: 1, id: 'trig' },
    { t: 'New order (webhook)', ag: 'manager', when: 'POST 127.0.0.1:8377/trigger/…', eng: 'Claude', guard: '', cost: '—', last: 'never', n: '', on: 0 },
  ]],
  ['Workflows', [
    { t: 'Long to shorts', ag: '', when: 'when you run it (or a trigger does) · 5 steps', wf: 1 },
    { t: 'Weekly channel rhythm', ag: '', when: 'when you run it (or a trigger does) · 6 steps', wf: 1 },
    { t: 'Edit a video in parts', ag: '', when: 'when you run it (or a trigger does) · 8 steps', wf: 1 },
  ]],
];
const RUNS = [
  { t: 'Back up the agent repo', st: 'done', by: 'schedule', eng: 'Claude', took: '1m', cost: '$0.04', when: '21h ago' },
  { t: 'Free model radar', st: 'done', by: 'schedule', eng: 'Antigravity', took: '3m', cost: '—', when: '22h ago' },
  { t: 'Thesis, chapter 3 · sources', st: 'parked', by: 'you', eng: 'Claude', took: '—', cost: '$0.31', when: 'session limit · tries again 03:52 (2 of 6)' },
  { t: 'Baton — leg 2 of chain chn_7f3a', st: 'done', by: 'you', eng: 'Claude', took: '14m', cost: '$0.05', when: '23h ago' },
];
const ENG = { Claude: '', Codex: 'x', Antigravity: 'a', OpenCode: 'o' };
let skipped = 0, tab = 'plan', card = '';
const cardHtml = {
  flows: () => `<div class="ac"><div class="ach"><b>Edit workflow</b><span>A workflow is a chain: each step is handed the previous one's output. A step is not always an agent — it can call an API, render an asset, drive a browser, or stop and ask you.</span><button type="button" class="x" data-act="close" aria-label="Close">✕</button></div>
    <p class="nm">Name <b>Long to shorts</b></p>
    <ol class="es">${[['Extract the sound', 'tool', 'extractAudio · {input.video}'], ['Transcript', 'media', 'fal-ai/whisper · {steps.audio.json.outputs.0}'], ['Pick the moments', 'agent', 'role editor · returns JSON · checked before it is used'], ['Cut the shorts', 'tool', 'short · for each {steps.pick.json.clips} · 9:16 · subtitles burned in'], ['Final check', 'checkpoint', 'proceed, ask the user or stop']].map(([t, k, d], i) => `<li><span>${i + 1}.</span><b>${t}</b><code>${k}</code><em>${d}</em></li>`).join('')}</ol>
    <p class="dim">Each step runs after the one above and is handed its output: {prev_output}, {prev_text}, {steps.id.json.x}, {input.name}.</p></div>`,
  schedules: () => `<div class="ac"><div class="ach"><b>⏰ Schedule</b><span>a clock starts it, again and again</span><button type="button" class="x" data-act="close" aria-label="Close">✕</button></div>
    <div class="kv"><span>How often</span><b>daily · <u>weekly</u> · once</b><span>Time of day</span><b>07:00 · Monday</b><span>If the time is missed</span><b><u>skip it</u> — that occurrence is lost · run it at the first opportunity · ask me, with Run / Skip</b></div></div>`,
  forecast: () => `<div class="ac"><div class="ach"><b>Forecast · next 7 days</b><span>from the same tasks over the last 30 days</span><button type="button" class="x" data-act="close" aria-label="Close">✕</button></div>
    <div class="fc">${[['every day 04:30', 'Free model radar', '3m', '93%'], ['every day 05:00', 'Back up the agent repo', '1m', '100%'], ['Mon 07:00', 'Weekly channel rhythm', '9m', '100%']].map(([w, t, m, p]) => `<span>${w}</span><b>${t}</b><span>median ${m}</span><span class="ok">${p} success</span>`).join('')}</div>
    <p class="dim">15 scheduled runs · about 1h 10m busy</p></div>`,
  queue: () => `<div class="ac"><div class="ach"><b>Queue and limits</b><span>five launch slots by default</span><button type="button" class="x" data-act="close" aria-label="Close">✕</button></div>
    <p class="dim">A run that finds every slot taken waits its turn, and gains a point of priority for every 30 minutes it waits. Pause all, or pause for 1, 8 or 24 hours; quiet hours defer a run, they never drop it.</p></div>`,
};

function planView() {
  return `<p class="lede">A <b>plan</b> is anything that defines work: ⏰ a <b>schedule</b> runs at a set time, ⚡ a <b>trigger</b> runs when something happens, 🔗 a <b>workflow</b> chains several agents and 📋 a <b>template</b> is a saved prompt. The first two run on their own; the last two run when launched. Every one of them produces <b>tasks</b> — see the Runs tab.</p>
    ${cardHtml[card]?.() || ''}
    <div class="ptab"><div class="th"><span>What runs</span><span>Agent</span><span>Guard</span><span>Last run</span><span>On</span></div>
    ${PLAN.map(([g, rows]) => `<div class="grp" data-g="${g}">${g.toUpperCase()} ${rows.length}</div>${rows.map(r => `<div class="pr${r.id === 'trig' ? ' trig' : ''}">
      <div class="w"><b>${r.wf ? '🔗' : g === 'Triggers' ? '⚡' : '⏰'} ${r.t}</b><span>${r.when}</span></div>
      <span class="ag">${r.ag || '—'}${r.eng ? `<i class="eng ${ENG[r.eng]}">${r.eng}</i>` : ''}</span>
      <span class="gd">${r.guard ? `<i>${r.guard}</i>` : r.wf ? '' : '<i class="no">no guard</i>'}${r.id === 'trig' && skipped ? `<i class="sk">🛡 skipped ${skipped}</i>` : ''}</span>
      <span class="ls">${r.wf ? 'never' : r.last}${r.n ? `<em>${r.n}</em>` : ''}</span>
      <span class="sw">${r.wf ? '<em>manual</em>' : `<i class="tg${r.on ? ' on' : ''}"></i>`}</span></div>`).join('')}`).join('')}</div>`;
}
function runsView() {
  return `<p class="lede">A <b>task</b> is one execution. It is started by a schedule, a trigger or a workflow step — or by you. Nothing here can be edited; it has already happened.</p>
    <form class="words" id="au-words"><input id="au-wordsIn" aria-label="Tell the farm what to do, in words" placeholder='Tell the farm what to do, in words — e.g. "run the filing batch on manager now"'><button type="submit">Go</button></form>
    <div class="prev" id="au-prev" hidden></div>
    <div class="rtab"><div class="th"><span>Task</span><span>Status</span><span>Started by</span><span>Engine</span><span>Took</span><span>Cost</span><span>When</span></div>
    ${RUNS.map(r => `<div class="rr${r.fresh ? ' fresh' : ''}${r.st === 'parked' && card === 'retries' ? ' hl' : ''}"><b>${r.t}</b><span><i class="st ${r.st}">${r.st}</i></span><span>${r.by}</span><span><i class="eng ${ENG[r.eng]}">${r.eng}</i></span><span>${r.took}</span><span>${r.cost}</span><span class="wh">${r.when}</span></div>`).join('')}</div>`;
}
function render() { view.innerHTML = tab === 'plan' ? planView() : runsView(); if (tab === 'runs') RUNS.forEach(r => { r.fresh = false; }); } // a new row flashes once
function setTab(t) {
  tab = t;
  for (const b of tabsEl.querySelectorAll('[data-tab]')) { const o = b.dataset.tab === t; b.classList.toggle('on', o); b.setAttribute('aria-selected', o); }
  render();
}
tabsEl.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { user = true; card = ''; setTab(b.dataset.tab); emit('showing', b.dataset.tab === 'plan' ? 'schedules' : 'words'); } });
view.addEventListener('click', e => { if (e.target.closest('[data-act="close"]')) { card = ''; render(); } });

/* say it in words: a cheap model turns the sentence into a plan and shows it before anything runs */
const SAY = 'every Monday at 7, run the weekly channel rhythm on showrunner';
async function type(text) {
  const inp = $('wordsIn'); if (!inp) return;
  inp.value = '';
  for (const ch of text) { inp.value += ch; await sleep(28); }
}
function preview(own) {
  const p = $('prev'); if (!p) return; // the visitor moved to the Plan tab while it was typing
  p.hidden = false;
  p.innerHTML = own
    ? '<p>In the app a cheap model reads your sentence and shows the task, schedule or workflow it would set up. This demo only knows its own example.</p>'
    : '<p class="pv">📅 Schedule: "Weekly channel rhythm"<br>Agent: showrunner<br>When: weekly — Monday 07:00</p><div class="pb"><button type="button" data-say="run">Create &amp; Run</button><button type="button" data-say="create">Create</button><button type="button" data-say="x">Cancel</button></div>';
}
view.addEventListener('submit', e => { e.preventDefault(); const v = $('wordsIn').value.trim(); if (!v) { type(SAY).then(() => preview(false)); } else preview(v !== SAY); });
view.addEventListener('click', e => {
  const b = e.target.closest('[data-say]'); if (!b) return;
  const p = $('prev');
  if (b.dataset.say === 'x') { p.hidden = true; return; }
  p.innerHTML = `<p>${b.dataset.say === 'run' ? 'Created, and the first run is queued.' : 'Created. It first runs on Monday at 07:00.'} It is on the Plan tab now. (Demo: nothing was set up.)</p>`;
});

/* ---------- the flow ---------- */
const FILES = [['interview-take-4.mp4', 1, ''], ['~$interview.tmp', 0, 'a lock file'], ['notes.md', 0, 'a whitespace-only edit']];
let mode = 'on', busy = false, user = false, saved = 2, ok = 19, cost = 2.31, runs = 61, clockM = 3 * 60 + 12;
const gate = $('gate'), vd = $('vd'), log = $('log'), steps = [...$('steps').children], files = $('files');
const say = t => { log.textContent = t; };
const clock = () => { clockM += 1; return `${String(clockM / 60 | 0).padStart(2, '0')}:${String(clockM % 60).padStart(2, '0')}`; };
function pulse(id) { const w = $(id); w.classList.remove('go'); void w.offsetWidth; w.classList.add('go'); }
function setMode(m) {
  mode = m;
  for (const b of $('mode').querySelectorAll('button')) { const o = b.dataset.m === m; b.classList.toggle('on', o); b.setAttribute('aria-checked', o); }
  gate.classList.toggle('off', m === 'off'); gate.classList.toggle('shadow', m === 'shadow');
  say({ off: 'Off, the default: Gatekeeper is never asked, so every firing wakes the recipe.', shadow: 'Shadow: the usual path decides and the trigger fires. Gatekeeper is asked afterwards and only its answer is logged, with whether it agreed.', on: 'On: a confident "no work" wakes nobody. Unsure, or no answer in 3 s, and the trigger fires as usual.' }[m]);
}
$('mode').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { user = true; setMode(b.dataset.m); } });

async function recipe(name) {
  pulse('w2'); $('wf').classList.add('live');
  $('run').textContent = 1;
  for (const s of steps) { s.classList.remove('done', 'now'); }
  for (const s of steps) { s.classList.add('now'); await hold(950); s.classList.remove('now'); s.classList.add('done'); }
  $('wf').classList.remove('live'); $('run').textContent = 0;
  ok++; cost += 0.1; runs++;
  $('ok').textContent = ok; $('cost').textContent = '$' + cost.toFixed(2); $('nruns').textContent = runs;
  RUNS.unshift({ t: `Long to shorts · ${name}`, st: 'done', by: 'trigger', eng: 'Claude', took: '6m', cost: '$0.10', when: 'just now', fresh: true });
  if (RUNS.length > 7) RUNS.splice(RUNS.findLastIndex(r => r.st !== 'parked'), 1); // the parked run stays: it is the retries example
  if (tab === 'runs') render();
}
async function drop(k) {
  if (busy) return; busy = true;
  const [name, work, why] = FILES[k];
  flow.querySelectorAll('.drops button').forEach(b => b.disabled = true);
  for (const s of steps) s.classList.remove('done', 'now');
  const chip = document.createElement('span'); chip.className = 'fl'; chip.innerHTML = `<b>${name}</b><em>${clock()}</em>`;
  files.prepend(chip); while (files.children.length > 3) files.lastChild.remove();
  gate.classList.remove('yes', 'no'); vd.textContent = 'Waiting for a firing.';
  say(`${name} lands in the folder. The watch trigger fires.`);
  await hold(1000); pulse('w1');
  if (mode === 'off') {
    vd.textContent = 'Off: not asked.'; await hold(700);
    chip.classList.add('woke'); say(`Off: nobody asks whether ${name} is real work. The recipe wakes.`);
    await recipe(name);
  } else {
    gate.classList.add('ask'); vd.textContent = 'Asking Jev…'; await hold(1100); gate.classList.remove('ask');
    vd.innerHTML = work ? 'Real work <i>confidence 0.97</i>' : `No work: ${why} <i>confidence 0.99</i>`;
    gate.classList.add(work ? 'yes' : 'no');
    if (mode === 'shadow') {
      chip.classList.add('woke');
      say(work ? 'Shadow: the trigger fired as usual; Gatekeeper agreed, and that is logged.' : 'Shadow: the trigger fired as usual. Gatekeeper would have said no work, and that is logged, so you can see what On would save.');
      await recipe(name);
    } else if (work) {
      chip.classList.add('woke'); say('Real work. The recipe wakes, with the file as its video input.');
      await recipe(name);
    } else {
      chip.classList.add('kept'); saved++; skipped++; $('saved').textContent = saved;
      say(`Nobody woken, nothing spent but Jev's look: $0.042 a million tokens read. 🛡 saved ${saved}. The audit line keeps a hash of the input, never the input.`);
      if (tab === 'plan') render();
    }
  }
  flow.querySelectorAll('.drops button').forEach(b => b.disabled = false);
  busy = false;
}
flow.querySelector('.drops').addEventListener('click', e => { const b = e.target.closest('button[data-file]'); if (b) { user = true; drop(+b.dataset.file); } });

/* the chapter IV tiles */
on('feature', id => {
  const f = {
    flows: () => { card = 'flows'; setTab('plan'); },
    schedules: () => { card = 'schedules'; setTab('plan'); },
    triggers: () => { setMode(mode === 'off' ? 'on' : mode); drop(0); },
    gatekeeper: () => { setMode('on'); drop(1); },
    words: () => { card = ''; setTab('runs'); type(SAY).then(() => preview(false)); },
    queue: () => { card = 'queue'; setTab('plan'); $('strip').classList.add('hl'); setTimeout(() => $('strip').classList.remove('hl'), 2400); },
    retries: () => { card = 'retries'; setTab('runs'); const r = view.querySelector('.rr.hl'); if (r) view.scrollTop += r.getBoundingClientRect().top - view.getBoundingClientRect().top - 120; },
    forecast: () => { card = 'forecast'; setTab('plan'); },
  }[id];
  if (f) { user = true; f(); }
});

/* first sight: the three files, one after another */
setTab('plan');
let started = false;
const io = new IntersectionObserver(async es => {
  if (started || !es.some(e => e.isIntersecting)) return;
  started = true; io.disconnect();
  if (reduce) return;
  await hold(1200);
  for (const k of [0, 1, 2]) { if (user) return; await drop(k); await hold(2600); }
}, { threshold: 0.25 });
io.observe(flow);
