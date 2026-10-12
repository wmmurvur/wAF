// Studio: the Studio page of one demo production, "The last keeper", and the film it makes (scripts/film.js).
// When the section first comes into view the production carries on by itself: the storm is shot, a vision model fails
// the first take and it is made again with the critique, the last two scenes are made, then Triage waits for the
// visitor to keep or drop (after a while the demo decides: it keeps what passed). Assemble shows the sequence and the
// player beside the page plays it. Once the visitor clicks a tab or a chapter III tile, the demo stops switching tabs.
// The page's copy is the extension's own (media/studio.js); scene names, times and costs are demo data.
import { vis, reduce, on, emit } from './state.js';
import { SCENES, DUR, frame, still } from './film.js';

const $ = id => document.getElementById('st-' + id);
const view = $('view'), card = $('card'), tabsEl = $('tabs'), hint = $('hint');
const HINT = Object.fromEntries([...tabsEl.children].map(b => [b.dataset.tab, b.title]));
const VID = 'fal-ai/kling-video/v2/master/text-to-video', IMG = 'fal-ai/flux/schnell';
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function hold(ms) { await sleep(ms); while (!vis['s-studio'] || document.hidden) await sleep(400); }
const usd = v => '$' + v.toFixed(2);

/* ---------- the production ---------- */
const sc = SCENES.map((s, i) => ({ i, id: s.id, t: s.t, st: 'draft', qa: '', ok: true }));
const A = [];
let n = 0, mins = 22 * 60 + 4;
const clock = () => { mins += 3 + (n % 4); return `${String((mins / 60 | 0) % 24).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`; };
function add(i, kind, o = {}) {
  const a = { n: ++n, i, kind, model: kind === 'vid' ? VID : IMG, cost: kind === 'vid' ? 0.5 : 0.003, at: clock(), v: 'unjudged', stage: 'raw', qa: '', why: '', o: {}, ...o };
  A.push(a); return a;
}
/* scenes 1 to 3 are already made and kept */
add(0, 'img', { v: 'kept', stage: 'final' });
[0, 1, 2].forEach(i => { add(i, 'vid', { v: 'kept', stage: 'final', qa: 'PASS' }); sc[i].st = 'approved'; sc[i].qa = 'Vision QA · PASS'; });
const BASE = 0.12; /* the script and shot-list steps before the first frame */
const spent = () => BASE + A.reduce((s, a) => s + a.cost, 0);

/* the clip each scene gives the sequence: a kept video first, else any video that is not dropped, else a still */
function clipOf(i) {
  const as = A.filter(a => a.i === i && a.v !== 'dropped');
  return as.find(a => a.kind === 'vid' && a.v === 'kept') || as.filter(a => a.kind === 'vid').sort((p, q) => (q.qa === 'PASS') - (p.qa === 'PASS'))[0] || as.find(a => a.kind === 'img');
}
const sequence = () => sc.map(s => ({ s, a: clipOf(s.i) })).filter(x => x.a);
function status(s) {
  const as = A.filter(a => a.i === s.i && a.v !== 'dropped');
  if (s.st === 'generating') return;
  s.st = as.some(a => a.v === 'kept' && a.kind === 'vid') ? 'approved' : as.some(a => a.v === 'unjudged') ? 'review' : 'draft';
}

/* ---------- thumbnails: each scene drawn once, kept as an image ---------- */
const TH = {};
const thumb = a => { const k = a.i + (a.o.beam === false ? 'x' : ''); return TH[k] || (TH[k] = still(a.i, 200, a.o).toDataURL('image/jpeg', 0.82)); };

/* ---------- views ---------- */
const nm = i => `${SCENES[i].id} · ${SCENES[i].t}`;
const tc = sec => `00:00:${String(sec).padStart(2, '0')}:00`;
const NEXT = { draft: '＋ Generate', review: '👁 Triage', approved: '🎬 In sequence' };
function pipeline() {
  const ok = sc.filter(s => s.st === 'approved').length, none = sc.filter(s => !A.some(a => a.i === s.i)).length, unj = A.filter(a => a.v === 'unjudged').length;
  const sum = [none && `${none} scene(s) with nothing made yet`, unj && `${unj} asset(s) nobody has judged`].filter(Boolean).join(' · ') || 'Every scene has a kept shot.';
  return `<div class="prog" aria-hidden="true"><i style="width:${ok / sc.length * 100}%"></i></div><p class="sum">${sum}</p>
    <div class="rows">${sc.map(s => {
      const as = A.filter(a => a.i === s.i), u = as.filter(a => a.v === 'unjudged').length;
      return `<div class="row ${s.st}"><span class="sid">${s.id}</span>
        <div class="mid"><b>${s.t}</b><span class="cn">${as.filter(a => a.kind === 'img').length} img · ${as.filter(a => a.kind === 'vid').length} vid · 0 aud${u ? ` · <em>${u} unjudged</em>` : ''}</span>${s.qa ? `<span class="qa ${s.ok ? 'ok' : 'bad'}">${s.qa}</span>` : ''}</div>
        <div class="ths">${as.filter(a => a.v !== 'dropped').slice(-3).map(a => `<img src="${thumb(a)}" alt="">`).join('')}${s.st === 'generating' ? '<span class="gen" aria-label="generating"></span>' : ''}</div>
        <span class="badge ${s.st}">${s.st}</span>
        ${NEXT[s.st] ? `<button type="button" class="nx" data-act="${s.st}" data-i="${s.i}">${NEXT[s.st]}</button>` : '<span class="nx ph">⟳</span>'}</div>`;
    }).join('')}</div>
    <div class="pfoot"><button type="button" class="b" data-act="recipes">＋ Generate</button><span class="b">Edit manifest</span><span class="b">＋ New production</span></div>`;
}
function acard(a) {
  const v = a.v === 'kept' ? '✓ kept' : a.v === 'dropped' ? '✗ dropped' : 'unjudged';
  const rec = a.qa === 'PASS' ? '<i class="ok">✓</i><i>A0.9</i>' : a.qa === 'FAIL' ? '<i class="bad">✗ failed</i><i>A0.2</i>' : '';
  return `<article class="ac ${a.v}"><div class="pv"><img src="${thumb(a)}" alt=""><span class="k">${a.kind === 'vid' ? '▶ 0:05' : 'image'}</span></div>
    <b class="tt">${nm(a.i)}</b><span class="ln">${a.model} · ${a.at} · ~$${a.cost < 0.01 ? a.cost.toFixed(3) : a.cost.toFixed(2)} · <u>${SCENES[a.i].id}</u></span>
    <span class="vd ${a.v}">${v}</span><span class="rec"><i>${a.stage}</i>${rec}</span>
    <div class="btns">${['Open file', 'Re-run', 'Vary…', 'Feedback…', 'Scene…'].map(b => `<button type="button" data-form="${b}" data-n="${a.n}">${b}</button>`).join('')}</div></article>`;
}
function assets() {
  return `<div class="flt" aria-hidden="true"><span class="db">DB studio</span><span class="sel">Stages: 5/5 ▾</span><span class="sel">all kinds ▾</span><span class="sel">passed + failed ▾</span><span class="sel">all scenes ▾</span></div>
    <p class="shown">${A.length}/${A.length} shown</p><div class="grid">${A.slice().reverse().map(acard).join('')}</div>`;
}
function triage() {
  const T = A.filter(a => a.v === 'unjudged');
  if (!T.length) return '<p class="empty">Nothing waits for you. Everything made so far is kept or dropped.</p>';
  return `<p class="sum">${T.length} asset(s) nobody has judged yet. Keep what goes in the film; a dropped asset is never exported.</p>
    <div class="tlist">${T.map(a => `<div class="tr"><img src="${thumb(a)}" alt=""><div class="ti"><b>${nm(a.i)}</b><span>${a.model} · ${a.at}</span>
      <span class="qa ${a.qa === 'PASS' ? 'ok' : 'bad'}">Vision QA · ${a.qa}${a.why ? `: ${a.why}` : ''}</span></div>
      <div class="tb"><button type="button" class="keep" data-keep="${a.n}">✓ Keep</button><button type="button" class="drop" data-drop="${a.n}">✗ Drop</button><button type="button" data-form="Scene…" data-n="${a.n}">Scene…</button></div></div>`).join('')}</div>`;
}
function assemble() {
  const q = sequence(), secs = q.length * DUR;
  return `<div class="ah"><div><b>Sequence — The last keeper</b><span>${q.length} clip(s) · 00:${String(secs).padStart(2, '0')} · 1920×1080</span></div><button type="button" class="exp" data-act="export">Export XML + EDL →</button></div>
    <div class="tl"><div class="ruler">${Array.from({ length: sc.length + 1 }, (_, k) => `<span style="left:${k / sc.length * 100}%">00:${String(k * DUR).padStart(2, '0')}</span>`).join('')}</div>
      <div class="trk"><span class="tn">V1</span><div class="clips">${q.map(({ s, a }) => `<div class="clip${a.v === 'kept' ? '' : ' un'}" style="width:${100 / sc.length}%"><img src="${thumb(a)}" alt=""><span>${s.id}</span></div>`).join('')}</div></div>
      <i class="ph" id="st-ph"></i></div>
    <p class="note">One clip per scene in the order of the production: a kept video first, else any video, else a still. Dropped assets never go in. In Premiere: File → Import.</p>
    <pre class="edl" aria-label="The EDL the export writes"><b>the-last-keeper.edl</b>\nTITLE: The last keeper\nFCM: NON-DROP FRAME\n${q.slice(0, 3).map(({ s, a }, k) => `\n${String(k + 1).padStart(3, '0')}  AX       V     C        00:00:00:00 00:00:05:00 ${tc(k * DUR)} ${tc((k + 1) * DUR)}\n* FROM CLIP NAME: ${s.id}-take-${a.n}.mp4\n* SCENE: ${s.t}`).join('\n')}${q.length > 3 ? `\n\n… ${q.length - 3} more` : ''}</pre>`;
}
const INBOX = [['harbour-at-night.jpg', 'image\\source', 1], ['keeper-voice-take-2.wav', 'audio\\raw', 1], ['IMG_0412.MOV', 'not sure: asked, not guessed', 0]];
function sources() {
  const today = A.filter(a => a.n > 4).reduce((s, a) => s + a.cost, 0);
  return `<div class="srcg">
    <div class="box"><h4>Who generates</h4><p><i class="dot on"></i>fal.ai · key in the vault</p><p><i class="dot"></i>Replicate · no key</p><p class="dim">Any fal model id works. Costs come from your pricing rules.</p></div>
    <div class="box"><h4>What is watched</h4><p class="mono">media_keeper\\all_in</p><ul class="inb">${INBOX.map(([f, to, ok]) => `<li class="${ok ? 'ok' : 'ask'}"><span>${f}</span><em>→ ${to}</em></li>`).join('')}</ul><p class="askn">all_in: 1 file(s) need your call</p></div>
    <div class="box"><h4>What it costs</h4><div class="costs"><span><b>${usd(today)}</b>Today</span><span><b>${usd(spent())}</b>Last 30 days</span><span><b>$41.70</b>All time</span></div><p class="dim">Budget · Pricing rules</p></div>
    <div class="box"><h4>Brand kit</h4><p>Night blues, one warm light, no faces. Subtitles at the bottom, centred.</p><p class="dim">Edit kit · Keep as preset…</p></div></div>`;
}
const VIEWS = { pipeline, assets, triage, assemble, sources };

/* ---------- cards: the forms the page opens above a tab ---------- */
const RECIPES = [
  ['Edit a video in parts', 'content', 'split a video into parts, edit each with Gemini Omni Flash from one brief, judge them, join them over the original sound'],
  ['Long to shorts', 'content', 'transcribe a long video, let the editor pick its best moments, cut each into a subtitled vertical short in one local pass'],
  ['Weekly channel rhythm', 'content', 'the week\'s idea from the calendar, a script, the shots rendered and joined, your approval, then the publishing package'],
  ['Text → Image', 'quick', 'the agent writes the image prompt, Flux renders it'],
  ['Text → Image → Video', 'quick', 'content factory: prompt → image → short video'],
  ['Audio → Text (Whisper)', 'quick', 'transcribe the audio file, the agent summarizes it'],
];
const BRIEF = 'Today: six media made, three agents active. Spending, three dollars eighteen. Tasks: one running, none queued. Finished today: twelve, one error. No health findings.';
const CAL = [['Sun 12', 'The storm, cut down', 'published'], ['Mon 13', 'The last keeper · teaser', 'ready'], ['Wed 15', 'Keeper, part two', 'producing'], ['Fri 17', 'Questions from the rock', 'planned']];
const FORMS = {
  'Vary…': ['Run it again, changed', '<label>Input<textarea rows="3">{"prompt": "a lighthouse in a storm, beam sweeping through rain, night blues", "duration": "5"}</textarea></label>', 'Run the variation'],
  'Feedback…': ['Run it again, with a critique', '<label>What was wrong / what should change<input value="the beam should sweep left to right, slower"></label>', 'Run it with the critique'],
  'Scene…': ['Assign this asset', `<label>Scene<select>${SCENES.map(s => `<option>${s.id} · ${s.t}</option>`).join('')}</select></label>`, 'Save the assignment'],
};
let cardKind = '';
function openCard(kind, a) {
  cardKind = kind; card.hidden = false; let h;
  if (kind === 'recipes') h = `<div class="chd"><b>Install a recipe</b><span>a whole workflow in one pick</span><button type="button" class="x" data-act="close" aria-label="Close">✕</button></div>
    <ul class="rcp">${RECIPES.map(([t, k, d]) => `<li><div><b>${t}</b><span class="kd">${k}</span><p>${d}</p></div><button type="button" data-install="${t}">Install</button></li>`).join('')}</ul>`;
  else if (kind === 'calendar') h = `<div class="chd"><b>Content calendar</b><span>notes in your vault</span><button type="button" class="x" data-act="close" aria-label="Close">✕</button></div>
    <ul class="cal">${CAL.map(([d, t, s]) => `<li><span class="d">${d}</span><b>${t}</b><span class="cs ${s}">${s}</span></li>`).join('')}</ul>
    <div class="ask" id="st-pub"><p>Publish "The last keeper · teaser" to YouTube?</p><button type="button" class="go" data-act="publish">Publish</button><button type="button" data-act="close">Not now</button></div>`;
  else if (kind === 'briefing') h = `<div class="chd"><b>Spoken briefing</b><span>the daily digest, read aloud</span><button type="button" class="x" data-act="close" aria-label="Close">✕</button></div>
    <p class="brief">"${BRIEF}"</p><div class="ask"><button type="button" class="go" data-act="speak">▶ Speak it</button><p>Read by this computer, for free. Name a voice model instead and it saves an mp3.</p></div>`;
  else if (kind === 'export') h = `<div class="chd"><b>Export a sequence</b><button type="button" class="x" data-act="close" aria-label="Close">✕</button></div>
    <div class="frm"><label>Frame rate<span class="seg"><b>30</b><span>25</span><span>24</span><span>60</span></span></label><label>Clip length (s)<input value="5" size="3"></label><button type="button" class="go" data-act="exported">Choose where to save it</button></div>`;
  else if (FORMS[kind]) { const [t, body, go] = FORMS[kind]; h = `<div class="chd"><b>${t}</b><span>${nm(a.i)}</span><button type="button" class="x" data-act="close" aria-label="Close">✕</button></div><div class="frm">${body}<button type="button" class="go" data-act="done">${go}</button></div>`; }
  else { cardKind = ''; card.hidden = true; return; }
  card.innerHTML = h;
  emit('showing', { recipes: 'crecipes', calendar: 'calendar', briefing: 'briefing', export: 'premiere' }[kind] || SHOW[tab]);
}
function note(msg) { card.hidden = false; cardKind = 'note'; card.innerHTML = `<p class="msg">${msg}</p>`; setTimeout(() => { if (cardKind === 'note') { card.hidden = true; cardKind = ''; } }, 5200); }

/* ---------- tabs ---------- */
const SHOW = { pipeline: 'studio', assets: 'studio', triage: 'judge', assemble: 'premiere', sources: 'inbox' };
let tab = 'pipeline', user = false;
function counts() {
  const set = (k, v) => { tabsEl.querySelector(`[data-cnt="${k}"]`).textContent = v || ''; };
  set('assets', A.length); set('triage', A.filter(a => a.v === 'unjudged').length);
}
function render() {
  const keep = view.scrollTop;
  view.innerHTML = VIEWS[tab]();
  view.scrollTop = keep;
  counts();
  const ok = sc.filter(s => s.st === 'approved').length;
  $('sub').textContent = `The last keeper · ${ok}/${sc.length} scenes approved · ${usd(spent())} in 30 days`;
  reel();
}
function setTab(t) {
  if (t !== tab) view.scrollTop = 0;
  tab = t;
  for (const b of tabsEl.children) { const on = b.dataset.tab === t; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); }
  hint.textContent = HINT[t];
  if (cardKind && cardKind !== 'note') { card.hidden = true; cardKind = ''; }
  render(); emit('showing', SHOW[t]);
}
tabsEl.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { user = true; setTab(b.dataset.tab); } });

/* ---------- making a shot ---------- */
async function generate(i, o = {}) {
  const s = sc[i]; s.st = 'generating'; s.qa = `Kling · 5 s · ~$0.50 · started ${clock()}`; s.ok = true; render();
  await hold(2600);
  if (o.fail) {
    add(i, 'vid', { o: { beam: false }, qa: 'FAIL', why: 'no beam in frame, the lantern is dark' });
    s.qa = 'Vision QA · FAIL: no beam in frame, the lantern is dark. Made again with the critique.'; s.ok = false; render();
    await hold(2800);
  }
  add(i, 'vid', { qa: 'PASS', stage: 'semi' });
  s.st = ''; status(s); s.qa = o.fail ? 'Vision QA · PASS on the second take' : 'Vision QA · PASS'; s.ok = true; render();
}
function decide(a, keep) {
  a.v = keep ? 'kept' : 'dropped'; if (keep) a.stage = 'final';
  const s = sc[a.i]; status(s);
  if (s.st === 'approved') { s.qa = 'Kept · in the sequence'; s.ok = true; }
  if (s.st === 'draft') { s.qa = 'Dropped · nothing left for this scene'; s.ok = false; }
  render();
}

view.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  const byN = k => A.find(a => a.n === +k);
  if (t.dataset.keep) { user = true; decide(byN(t.dataset.keep), true); return; }
  if (t.dataset.drop) { user = true; decide(byN(t.dataset.drop), false); return; }
  if (t.dataset.form) { const a = byN(t.dataset.n); if (t.dataset.form === 'Open file') note(`Opens ${SCENES[a.i].id}-take-${a.n}.mp4 in VS Code.`); else if (t.dataset.form === 'Re-run') note('Re-run: the same model and the same input, straight away. (Demo: nothing leaves this page.)'); else openCard(t.dataset.form, a); return; }
  const act = t.dataset.act;
  if (act === 'draft') { user = true; generate(+t.dataset.i); }
  else if (act === 'review') { user = true; setTab('triage'); }
  else if (act === 'approved') { user = true; setTab('assemble'); }
  else if (act === 'recipes') openCard('recipes');
  else if (act === 'export') openCard('export');
});
card.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  const act = t.dataset.act;
  if (t.dataset.install) note(`Installed as a workflow: ${t.dataset.install}. Its roles go to the showrunner until you bind them. (Demo)`);
  else if (act === 'close') { card.hidden = true; cardKind = ''; if ('speechSynthesis' in window) speechSynthesis.cancel(); }
  else if (act === 'exported') note(`${sequence().length} clip(s) exported → the-last-keeper.xml (+ .edl). In Premiere: File → Import. (Demo: nothing is saved.)`);
  else if (act === 'done') note('A new take would start now, with what you wrote. (Demo: nothing leaves this page.)');
  else if (act === 'publish') note('Handed to your own upload flow through its webhook; the calendar note now says published. (Demo: nothing is sent.)');
  else if (act === 'speak') {
    if (!('speechSynthesis' in window)) { note('This browser has no voice to read with.'); return; }
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(BRIEF); u.lang = 'en-GB'; u.rate = 1; speechSynthesis.speak(u);
  }
});

/* the chapter III tiles */
const FEAT = { studio: ['pipeline'], crecipes: ['pipeline', 'recipes'], judge: ['triage'], premiere: ['assemble'], inbox: ['sources'], calendar: ['pipeline', 'calendar'], briefing: ['pipeline', 'briefing'] };
on('feature', id => { const f = FEAT[id]; if (!f) return; user = true; setTab(f[0]); if (f[1]) openCard(f[1]); });

/* ---------- the player and the reel ---------- */
const cv = $('film'), ctx = cv.getContext('2d'), pp = $('pp');
let W = 0, H = 0, pt = 0, playing = !reduce, last = 0, lastDraw = 0, dirty = true, cur = -1;
function size() { const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); W = cv.width = Math.round(Math.min(1280, r.width * d)); H = cv.height = Math.round(W * 9 / 16); dirty = true; }
addEventListener('resize', size);
function reel() {
  const q = sequence();
  sc.forEach(s => {
    const a = clipOf(s.i), th = document.querySelector(`#s-studio [data-th="${s.i}"]`), ss = document.querySelector(`#s-studio [data-ss="${s.i}"]`);
    const src = a ? thumb(a) : '';
    if (th.dataset.src !== src) { th.dataset.src = src; th.innerHTML = src ? `<img src="${src}" alt="">` : ''; }
    ss.textContent = s.st; ss.className = 'ss ' + s.st;
    th.closest('li').classList.toggle('out', !q.some(x => x.s === s));
  });
  dirty = true;
}
function loop(ts) {
  requestAnimationFrame(loop);
  if (!vis['s-studio'] || document.hidden || !W) { last = 0; return; }
  const q = sequence(); if (!q.length) return;
  const total = q.length * DUR, dt = last ? Math.min(0.1, (ts - last) / 1000) : 0; last = ts;
  if (playing) pt = (pt + dt) % total; else if (pt >= total) pt = 0;
  if (!playing && !dirty) return;
  if (playing && ts - lastDraw < 33) return;
  lastDraw = ts; dirty = false;
  const k = Math.min(q.length - 1, Math.floor(pt / DUR)), { s, a } = q[k];
  frame(ctx, W, H, s.i, playing ? pt - k * DUR : 2.6, a.o);
  const f = x => `00:${String(Math.floor(x)).padStart(2, '0')}`;
  $('tc').textContent = `${f(pt)} / ${f(total)}`;
  if (cur !== s.i) { cur = s.i; document.querySelectorAll('#st-reel li').forEach((li, j) => li.classList.toggle('on', j === s.i)); }
  const ph = $('ph'); if (ph) ph.style.left = `calc(40px + (100% - 50px) * ${(pt / (DUR * sc.length)).toFixed(4)})`;
}
function play(on) { playing = on; pp.textContent = on ? '❚❚' : '▶'; pp.setAttribute('aria-label', on ? 'Pause' : 'Play'); pp.classList.toggle('playing', on); dirty = true; }
pp.addEventListener('click', () => play(!playing));
$('reel').addEventListener('click', e => {
  const b = e.target.closest('button[data-i]'); if (!b) return;
  const q = sequence(), k = q.findIndex(x => x.s.i === +b.dataset.i);
  if (k < 0) { user = true; setTab('pipeline'); return; }
  pt = k * DUR + 0.01; dirty = true;
});

/* ---------- the demo run ---------- */
async function run() {
  await hold(1400);
  await generate(3, { fail: true });
  await hold(900); await generate(4);
  await hold(700); await generate(5);
  await hold(1400);
  if (!user) setTab('triage');
  const t0 = performance.now();
  while (A.some(a => a.v === 'unjudged') && performance.now() - t0 < 9000) await hold(400);
  for (const a of A.filter(x => x.v === 'unjudged')) { decide(a, a.qa === 'PASS'); await hold(650); }
  await hold(1000);
  if (!user) setTab('assemble');
}

/* start on first sight: draw the thumbnails then, not at page load */
let started = false;
const io = new IntersectionObserver(es => {
  if (started || !es.some(e => e.isIntersecting)) return;
  started = true; io.disconnect();
  size(); render(); play(!reduce); requestAnimationFrame(loop);
  if (!reduce) run();
}, { rootMargin: '200px 0px' });
io.observe(document.getElementById('s-studio'));
