// Console: the real Agent Farm Console rebuilt (screenshots 004, 035) as an exploded view that assembles on scroll.
// Its working session is the live relay leg from state.js; its own Ouroboros plays when the section is on screen.
import { ACCT, S, BQ, reduce, wait, on, vis, canOuro, startOuro, nextVer, finishOuro } from './state.js';

const $ = id => document.getElementById('c-' + id);
const flat = () => matchMedia('(max-width: 900px)').matches;

/* transcript: real lines from screenshot 004, translated to English, with the real restart notice verbatim */
const SCRIPT = [
  ['agent', 'Handing over: reading quota, both boards and the delivery rule, then loading 3.931.0.'],
  ['agent', 'Window reloaded. Checking that the new build is the one actually running.'],
  ['you', 'Agent Farm restarted the extension host and took this session up again in the same seat — same conversation, same id. You were mid-turn when it went down, so the one answer you were writing was lost on the way; nothing before it is missing.'],
  ['agent', 'Back in the same seat after the reload. extensions.json says 3.931.0; checking the running build.'],
  ['agent', '3.931.0 is running (new bootId, pending false, no twin sessions). Running the live test for the export next.'],
  ['agent', 'The export file was 0 bytes at 03:04; the previous leg said otherwise. Reading the core module from the top.'],
];
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
SCRIPT.forEach(([k, t]) => addLine(k, t, false));

/* live feed in the sidebar */
const FEED = ['✓ developer: Edit src/export/rows.ts', '✓ developer: Bash npm run compile', '✓ developer: Read test/test_export.js', '✓ developer: Edit media/console.js', '◷ developer: notify Now the core fix', '✓ manager: Read Backlog.md', '✓ developer: Bash git commit -m "export: rows"'];
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
  $('cLeg').textContent = '⑂ ' + S.leg; $('cTitle').textContent = `chn_7f3a · relay leg ${S.leg} · ${BQ[0].c} ${BQ[0].t}`;
  $('sbLeg').textContent = '⑂ ' + S.leg; $('r1').textContent = '⑂ ' + S.leg;
  $('r2').textContent = Math.round(S.ctx) + '%'; $('r3').textContent = Math.round(a.h) + '%';
  $('longest').textContent = 'longest ' + S.longest + 'm'; $('t2').textContent = S.longest + 'm'; $('t3').textContent = Math.max(1, S.longest - 1) + 'm'; $('r4k').textContent = `· longest ${S.longest}m`;
  $('sbQ').textContent = `◷ 2h 40m · ${Math.round(a.h)}% / wk ${Math.round(a.w)}%`; $('sbCost').textContent = '$' + S.cost.toFixed(2);
  $('sbVer').textContent = 'Agent Farm ' + S.ver;
}
ui();
on('pass', p => { addLine('sys', `⑂ ${p.from} → ⑂ ${p.to} · ${p.why === 'q' ? 'quota handover at 90%' : 'handed over at 40%'} · committed ${p.commit}`, true); ui(); });
on('ver', ui);

/* Ouroboros: the agent ships a build, the window reloads, the session comes back in its seat */
const TOOLS = ['npm run test -- test/test_export.js', 'npm run package', 'code --install-extension dist/vsix/agent-farm-NEXT.vsix', 'af farm.restartExtensionHost resume=true'];
async function ouroboros() {
  startOuro();
  const next = nextVer();
  for (const t of TOOLS) { $('tool').innerHTML = `<b>⚡ Bash</b> ${t.replace('NEXT', next)}`; await wait(1300); }
  $('rlVer').textContent = next; $('reload').classList.add('on'); await wait(2500);
  finishOuro(next); ui(); $('reload').classList.remove('on');
  await addLine('you', 'Agent Farm restarted the extension host and took this session up again in the same seat — same conversation, same id.', true);
  await wait(500);
  await addLine('agent', `${next} is running. Same seat, same conversation. Continuing the live test.`, true);
  $('tool').innerHTML = '<b>⚡ Bash</b> npm run test -- test/test_export.js';
}

/* scroll-driven assembly */
const deck = $('deckEl'), stage = $('deck'), sticky = $('sticky'), win = $('win');
let prog = 0;
function fit() {
  const w = sticky.clientWidth, h = innerHeight;
  if (flat()) { deck.style.setProperty('--s', Math.min(1, (w - 32) / 1200)); return; }
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
  /* the Ouroboros plays once the window is mostly assembled and on screen */
  (async function loop() {
    for (;;) {
      await wait(1500);
      if (vis['s-console'] && (flat() || prog > 0.55) && canOuro()) await ouroboros();
    }
  })();
}
