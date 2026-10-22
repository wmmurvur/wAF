// Console: the real Agent Farm Console rebuilt (screenshots 004, 035) as an exploded view that assembles on scroll.
// Its working session is the live relay leg from state.js; its own Ouroboros plays when the section is on screen.
import { ACCT, S, BQ, reduce, wait, on, vis, canOuro, startOuro, nextVer, finishOuro } from './state.js';
import { appVer, vtag } from '../data/site.js';

const $ = id => document.getElementById('c-' + id);
const flat = () => matchMedia('(max-width: 900px)').matches;

/* transcript: the developer building Agent Farm's own video pipeline (item M-101). The lines are the owner's real
   session of 21 Oct 2026, translated to English; each brings the tool it ran. They are typed in turn while the window
   is on screen, and after the test run the agent packs a new build, installs it and comes back in the same seat. */
const WORK = [
  ['Handover rule read: keep working until the 5-hour window reaches 90%. While the suite runs, drafting part 3 (editCompose.ts: pip, side_by_side, logo, intro_outro).', '<b>✎ Edit</b> src/core/pipeline/editCompose.ts'],
  ['While waiting, writing the closing records as files: decision notice, work log, item trace, handover load.', '<b>✎ Write</b> _REF/m101/handover-load.md'],
  ['Updating the Bridge op descriptions (tools.recipes / tools.run) so they explain the built-in recipes.', '<b>✎ Edit</b> src/bridge/ops.meta.json'],
  ['The hook is right; writing the script to a file and running it.', '<b>⚡ Bash</b> node .af/tmp/hook-check.mjs'],
  ['Updating the guide summaries (ops.meta.json, studio.md).', '<b>✎ Edit</b> docs/guide/studio.md'],
  ['Copying the tests into the repo and adapting them to the new API (durationSec, untimed per segment).', '<b>✎ Edit</b> test/pipeline/editCompose.test.ts'],
  ['Compiling and running the new and affected tests.', '<b>⚡ Bash</b> npm run compile && npm test -- test/pipeline', true],
  ['Hum band dropped 16.9 dB; the threshold is 20 dB. To measure the notch\'s real depth, trying other Q values and the equalizer alternative straight on the wav.', '<b>⚡ Bash</b> ffmpeg -i hum.wav -af equalizer=f=50:t=q:w=8:g=-30 eq.wav'],
  ['8/0. Matching the word "notch" in the header comment to the measured method, then starting the full suite.', '<b>⚡ Bash</b> npm test -- --full'],
  ['While the suite runs, reading the handover rule (_REF/handover.md); quota is nearing the handover line.', '<b>◷ Read</b> _REF/handover.md'],
];
/* shown at first: the six lines before the test run */
const FIRST = 6;
const tx = $('tx');
function addLine(kind, text, typed) {
  const d = document.createElement('div');
  d.className = 'ln ' + (kind === 'you' ? 'you' : kind === 'sys' ? 'sys' : '');
  d.innerHTML = `<span class="who">${kind === 'you' ? 'YOU' : kind === 'sys' ? 'FARM' : 'AGENT'}</span><span class="txt"></span>`;
  tx.appendChild(d);
  while (tx.children.length > 6) tx.firstChild.remove();
  const t = d.querySelector('.txt');
  if (!typed || reduce || !vis['s-console']) { t.textContent = text; return Promise.resolve(); }
  return new Promise(res => {
    let i = 0; const cur = document.createElement('i'); cur.className = 'caret';
    (function step() { i += 2 + ((Math.random() * 3) | 0); t.textContent = text.slice(0, i); t.appendChild(cur); if (i < text.length) setTimeout(step, 22); else { cur.remove(); res(); } })();
  });
}
WORK.slice(0, FIRST).forEach(([t]) => addLine('agent', t, false));
let wi = FIRST;
$('tool').innerHTML = WORK[FIRST - 1][1];

/* live feed in the sidebar */
const FEED = ['✓ developer: Edit src/core/pipeline/editCompose.ts', '✓ youtuber: Pipeline: voice-over for episode 12', '✓ scholar: Bash Rscript models/ch3.R', '✓ analyst: Bash python screen.py --watchlist', '◷ writer: notify Chapter 7 draft is ready', '✓ editor: Bash ffmpeg cut take-4 → short-2', '✓ developer: Bash npm run compile', '✓ manager: Read Backlog.md'];
const feed = $('feed'); let fi = 0;
function feedTick() {
  const f = FEED[fi++ % FEED.length], d = document.createElement('div');
  d.className = 'row'; d.innerHTML = `<span class="ok">${f.slice(0, 1)}</span>${f.slice(2)}`;
  feed.prepend(d); while (feed.children.length > 7) feed.lastChild.remove();
}
for (let i = 0; i < 7; i++) feedTick();

/* figures from the shared state */
function ui() {
  const a = ACCT[S.acc], k = (S.ctx * 10).toFixed(1);
  $('strip').innerHTML = `<u>session ${S.sid}</u> · ctx ${k}k / 1.0M · ${Math.round(S.ctx)}% · <span class="leg">⑂ ${S.leg}</span> · ~$${(S.tok * 2.7).toFixed(2)} (${S.tok.toFixed(1)}M tokens) this session · 1 turn · 1 running`;
  $('cSid').textContent = `(#${S.sid})`; $('cAcct').textContent = a.n; $('selAcct').textContent = a.n + ' ▾';
  $('cCtx').textContent = k + 'k'; $('cTok').textContent = S.tok.toFixed(1) + 'M tk';
  $('cLeg').textContent = '⑂ ' + S.leg; $('cTitle').title = `chn_7f3a · relay leg ${S.leg} · ${BQ[0].c} ${BQ[0].t}`;
  $('sbLeg').textContent = '⑂ ' + S.leg; $('r1').textContent = '⑂ ' + S.leg;
  $('r2').textContent = Math.round(S.ctx) + '%'; $('r3').textContent = Math.round(a.h) + '%';
  $('longest').textContent = 'longest ' + S.longest + 'm'; $('t2').textContent = S.longest + 'm'; $('t3').textContent = Math.max(1, S.longest - 1) + 'm'; $('r4k').textContent = `· longest ${S.longest}m`;
  $('sbQ').textContent = `◷ 2h 40m · ${Math.round(a.h)}% / wk ${Math.round(a.w)}%`; $('sbCost').textContent = '$' + S.cost.toFixed(2);
  $('sbVer').textContent = 'Agent Farm ' + vtag(S.ver);
}
ui();
on('pass', p => { addLine('sys', `⑂ ${p.from} → ⑂ ${p.to} · ${p.why === 'q' ? 'quota handover at 90%' : 'handed over at 40%'} · committed ${p.commit}`, true); ui(); });
on('ver', ui);

/* Ouroboros: the agent ships a build, the window reloads, the session comes back in its seat */
const TOOLS = ['npm run package', 'code --install-extension dist/vsix/agent-farm-NEXT.vsix', 'af farm.restartExtensionHost resume=true'];
async function ouroboros() {
  startOuro();
  const next = nextVer();
  for (const t of TOOLS) { $('tool').innerHTML = `<b>⚡ Bash</b> ${t.replace('NEXT', next)}`; await wait(1300); }
  $('rlVer').textContent = vtag(next); $('reload').classList.add('on'); await wait(2500);
  finishOuro(next); ui(); $('reload').classList.remove('on');
  await addLine('you', 'Agent Farm restarted the extension host and took this session up again in the same seat — same conversation, same id.', true);
  await wait(500);
  await addLine('agent', `${next} is running. Same seat, same conversation. Trying the new recipes live.`, true);
}

/* the next line of work, typed, with the tool it ran; after the test run comes a new build of Agent Farm */
async function work() {
  const [t, tool, build] = WORK[wi++ % WORK.length];
  $('tool').innerHTML = tool;
  await addLine('agent', t, true);
  if (build && canOuro()) { await wait(1800); await ouroboros(); }
}

/* scroll-driven assembly */
const deck = $('deckEl'), stage = $('deck'), sticky = $('sticky'), win = $('win');
let prog = 0;
function fit() {
  const w = sticky.clientWidth, h = innerHeight;
  if (flat()) { deck.style.setProperty('--s', Math.min(1, (w - 32) / 1200)); $('capBar').style.width = '100%'; $('capText').textContent = 'The real Console, rebuilt · demo data'; return; }
  deck.style.setProperty('--s', Math.min((w - 80) / 1200, (h - 120) / 690, 1.05).toFixed(3));
}
function onScroll() {
  if (flat()) return;
  const r = stage.getBoundingClientRect(), total = stage.offsetHeight - innerHeight;
  prog = Math.min(1, Math.max(0, -r.top / total));
  const e = 1 - Math.pow(1 - prog, 3);
  deck.style.setProperty('--tilt', (52 * (1 - e)).toFixed(2) + 'deg');
  deck.style.setProperty('--rz', (-8 * (1 - e)).toFixed(2) + 'deg');
  deck.style.setProperty('--ty', (60 * (1 - e)).toFixed(1) + 'px');
  deck.querySelectorAll('.pin').forEach(p => {
    const z0 = +p.dataset.z || (p.dataset.z = getComputedStyle(p).getPropertyValue('--z'));
    p.style.setProperty('--z', Math.max(14, z0 * (1 - e * 0.92)).toFixed(1));
  });
  deck.style.setProperty('--o', Math.max(0, Math.min(1, 1 - (prog - 0.72) / 0.22)).toFixed(2));
  $('capBar').style.width = prog * 100 + '%';
  $('capText').textContent = prog < 0.5 ? 'Exploded view · the real Console, rebuilt' : prog < 0.95 ? 'Assembling · same layout, demo data' : 'Assembled · this is the screen you work in';
}
/* place each pin on the element it explains (layout offsets ignore the 3D transform) */
function rel(el) { let x = 0, y = 0; while (el && el !== win) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return [x, y]; }
function placePins() {
  deck.querySelectorAll('.pin').forEach(p => {
    const a = $(p.dataset.a); if (!a) return;
    const [x, y] = rel(a);
    p.style.left = x + a.offsetWidth * (+p.dataset.ax || 0.5) + 'px';
    p.style.top = y + a.offsetHeight * (+p.dataset.ay || 0.5) + 'px';
  });
}
placePins(); document.fonts?.ready.then(placePins);
addEventListener('resize', () => { fit(); placePins(); onScroll(); });
addEventListener('scroll', onScroll, { passive: true });
fit(); onScroll();

/* light or dark, as VS Code is set: a curtain (a copy of the window in the other dress, wiped across) turns one into the
   other. Nobody goes looking for a theme switch, so until someone uses it the window shows it by itself: once it is
   assembled and in view it turns light, a note by the switch says so, and a few seconds later it turns dark again.
   The switch lights up with it, so the eye finds where the change came from. A click ends the show for good. */
const thmBox = document.getElementById('c-thm'), thm = [...thmBox.querySelectorAll('button')];
let dress = 'dark', picked = false, busy = false, queued = null;
function wear(t) {
  if (busy) { queued = t; return; }
  if (t === dress) return;
  dress = t;
  thm.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.t === t)));
  if (reduce) { win.classList.toggle('light', t === 'light'); return; }
  busy = true;
  const c = win.cloneNode(true);
  c.removeAttribute('id'); c.querySelectorAll('[id]').forEach(e => e.removeAttribute('id'));
  c.classList.toggle('light', t === 'light'); c.classList.add('cur'); c.setAttribute('aria-hidden', 'true');
  const seam = document.createElement('i'); seam.className = 'seam';
  win.after(c, seam);
  setTimeout(() => {
    win.classList.toggle('light', t === 'light'); c.remove(); seam.remove(); busy = false;
    if (queued) { const q = queued; queued = null; wear(q); }
  }, 980);
}
thm.forEach(b => b.addEventListener('click', () => { picked = true; thmBox.classList.remove('hint'); wear(b.dataset.t); }));
if (!reduce) {
  let settled = 0, gap = 0, show = false;
  const inView = () => { const r = win.getBoundingClientRect(); return r.top > -r.height * 0.25 && r.bottom < innerHeight + r.height * 0.25; };
  setInterval(() => {
    if (picked || busy || show) return;
    if (!vis['s-console'] || !(flat() ? inView() : prog > 0.7)) { settled = 0; return; }
    if (gap > 0) { gap--; return; }
    if (++settled < 2) return;
    settled = 0; show = true;
    const lb = thm.find(b => b.dataset.t === 'light'); thmBox.style.setProperty('--tipx', lb.offsetLeft + lb.offsetWidth / 2 - 7 + 'px');
    wear('light'); thmBox.classList.add('hint');
    setTimeout(() => {
      show = false; gap = 20;
      if (picked) return;
      thmBox.classList.remove('hint'); wear('dark');
    }, 5400);
  }, 500);
}

/* the session list: more sessions than the column holds, each a different kind of work. Once the window is assembled
   and on screen, it steps down one card at a time, holds at the end and goes back to the top; the thumb follows. */
const lst = $('lst'), list = $('list'), sb = $('sb');
let row = 0;
function showRow(i) {
  const cards = [...lst.children], max = Math.max(0, lst.scrollHeight - list.clientHeight);
  const y = Math.min(max, cards[i] ? cards[i].offsetTop : 0);
  lst.style.transform = `translateY(${-y}px)`;
  sb.style.height = (list.clientHeight / lst.scrollHeight * 100).toFixed(1) + '%';
  sb.style.top = (y / lst.scrollHeight * 100).toFixed(1) + '%';
  return y >= max;
}
showRow(0); document.fonts?.ready.then(() => showRow(row));
addEventListener('resize', () => showRow(row));
if (!reduce) {
  let t = 0, end = false;
  setInterval(() => {
    if (!vis['s-console']) return;
    if (!flat() && prog < 0.75) { if (row) { row = 0; end = showRow(0); } t = 0; return; }
    if (++t < (end ? 5 : 3)) return;
    t = 0;
    if (end) { row = 0; end = showRow(0); return; }
    end = showRow(++row);
  }, 1000);
}

if (reduce) {
  deck.style.setProperty('--tilt', '0deg'); deck.style.setProperty('--rz', '0deg');
} else {
  let sec = 0, clock = 12 * 3600 + 9 * 60 + 41;
  setInterval(() => {
    sec++; clock++;
    if (!vis['s-console']) return;
    $('rclock').textContent = [Math.floor(clock / 3600) % 24, Math.floor(clock / 60) % 60, clock % 60].map(n => String(n).padStart(2, '0')).join(':');
    ui(); if (sec % 3 === 0) feedTick();
  }, 1000);
  /* the session works on, a line at a time, once the window is mostly assembled and on screen */
  (async function loop() {
    for (;;) {
      await wait(4800);
      if (vis['s-console'] && (flat() || prog > 0.55) && !S.busy) await work();
    }
  })();
}
