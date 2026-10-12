// Fleet: a control-room wall of six Agent Farm pages (Live Timeline, Console, Accounts, Dashboard, Now, Chains).
// Layouts follow screenshots 032/035, 004, 075, 010/011, 023 and the Chains panel; data is demo data from state.js.
import { ACCT, S, reduce, on, emptiest, vis } from './state.js';

const $ = id => document.getElementById('f-' + id);
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const C = { lime: css('--lime'), pink: css('--pink'), cyan: css('--cyan'), violet: css('--violet'), yellow: css('--yellow'), red: css('--red'), claude: css('--claude') };

/* ---------- focus cycle ---------- */
const CAP = [
  ['CH-01', 'Every agent on one timeline.', 'Tool runs, prompts, permission waits and compactions, per session, live from the hooks.'],
  ['CH-02', 'The Console: every session in one column.', 'Who is working, whose turn it is, which leg of which chain, how full the context is.'],
  ['CH-03', 'The quota shield.', 'Four accounts, 5-hour and weekly windows. At 90% the next leg moves to the emptiest one.'],
  ['CH-04', 'Cost and quota at a glance.', 'API-equivalent cost per agent and model, the 5-hour window and the week, priced from your own transcripts.'],
  ['CH-05', 'The farm on your phone.', 'Now, Web and Devices: answer a waiting agent or start a session from the phone.'],
  ['CH-06', 'Chains that run day and night.', 'Each leg hands over at 40% context with a commit and a handover note, and the chain works down your backlog item by item. When every account is full, it parks and wakes itself.'],
];
const root = document.getElementById('s-fleet');
const mons = [...root.querySelectorAll('.mon')], dots = $('dots');
CAP.forEach((c, i) => {
  const b = document.createElement('button');
  b.type = 'button'; b.setAttribute('aria-label', 'Focus ' + c[0]); b.onclick = () => focus(i, true);
  dots.appendChild(b);
});
let cur = 0, hold = 0;
function focus(i, user) {
  cur = i; if (user) hold = 2;
  mons.forEach((m, k) => m.classList.toggle('on', k === i));
  [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i));
  $('dkCh').textContent = CAP[i][0]; $('dkT').textContent = CAP[i][1]; $('dkS').textContent = CAP[i][2];
}
mons.forEach((m, i) => m.addEventListener('click', () => focus(i, true)));
focus(0);
if (!reduce) setInterval(() => { if (!vis['s-fleet']) return; if (hold > 0) { hold--; return; } focus((cur + 1) % mons.length); }, 5200);

/* ---------- canvases ---------- */
function fitCanvas(cv, hFrac) {
  const p = cv.parentElement, w = p.clientWidth, h = p.clientHeight * hFrac, d = devicePixelRatio || 1;
  cv.width = w * d; cv.height = h * d; cv.style.height = h + 'px';
  const g = cv.getContext('2d'); g.setTransform(d, 0, 0, d, 0, 0);
  return { g, w, h };
}
let TL, BARS;
function sizeAll() { TL = fitCanvas($('tl'), 0.84); BARS = fitCanvas($('bars'), 0.34); }

/* Live Timeline lanes; colours follow the real legend (tool run, prompt, permission wait, compaction, waiting on its own work) */
const lanes = ['developer #1', 'developer #2', 'developer #3', 'developer #4', 'genel', 'reviewer'].map((n, i) => ({ n, ev: [], wait: null, rate: [1.5, 0.45, 0.35, 0.55, 0.6, 0.8][i] }));
let T = 0;
function laneTick(dt) {
  lanes.forEach((l, i) => {
    if (Math.random() < dt * l.rate) l.ev.push({ t: T, k: 'tool', w: 0.2 + Math.random() * 0.8 });
    if (Math.random() < dt * 0.05 * l.rate) l.ev.push({ t: T, k: 'prompt' });
    if (i === 0 && !l.wait && Math.random() < dt * 0.04) l.wait = { t: T, end: T + 6 + Math.random() * 6 };
    if (l.wait && T > l.wait.end) { l.ev.push({ t: l.wait.t, k: 'waitbar', w: l.wait.end - l.wait.t }); l.wait = null; }
    if (i === 3 && Math.random() < dt * 0.02) l.ev.push({ t: T, k: 'perm' });
    if (Math.random() < dt * 0.006) l.ev.push({ t: T, k: 'compact' });
    l.ev = l.ev.filter(e => T - e.t < 70);
  });
}
function laneDraw() {
  const { g, w, h } = TL; g.clearRect(0, 0, w, h);
  const L = w * 0.2, rowH = h / (lanes.length + 0.6), span = 60, x = t => L + (1 - (T - t) / span) * (w - L - 8);
  g.font = `${Math.max(9, w * 0.018)}px "Segoe UI", system-ui, sans-serif`;
  for (let m = Math.ceil((T - span) / 10) * 10; m <= T; m += 10) { g.fillStyle = 'rgba(255,255,255,.05)'; g.fillRect(x(m), 0, 1, h); }
  lanes.forEach((l, i) => {
    const y = rowH * (i + 0.5) + 4;
    g.fillStyle = C.claude; g.beginPath(); g.arc(w * 0.025, y, w * 0.006, 0, 7); g.fill();
    g.fillStyle = '#d9d9ce'; g.fillText(l.n, w * 0.04, y + 4);
    g.fillStyle = 'rgba(255,255,255,.04)'; g.fillRect(L, y - rowH * 0.22, w - L - 8, rowH * 0.44);
    if (l.wait) { g.fillStyle = C.violet; g.fillRect(x(l.wait.t), y - rowH * 0.14, x(T) - x(l.wait.t), rowH * 0.28); }
    for (const e of l.ev) {
      const px = x(e.t);
      if (e.k === 'tool') { g.fillStyle = C.lime; g.fillRect(px, y - rowH * 0.16, Math.max(1.5, e.w * w * 0.004), rowH * 0.32); }
      else if (e.k === 'waitbar') { g.fillStyle = C.violet; g.fillRect(px, y - rowH * 0.14, (e.w / span) * (w - L - 8), rowH * 0.28); }
      else if (e.k === 'prompt') { g.fillStyle = C.cyan; g.beginPath(); g.arc(px, y, rowH * 0.13, 0, 7); g.fill(); }
      else if (e.k === 'perm') { g.fillStyle = C.pink; g.fillRect(px - 1, y - rowH * 0.3, 2.5, rowH * 0.6); }
      else if (e.k === 'compact') { g.fillStyle = C.violet; g.save(); g.translate(px, y); g.rotate(Math.PI / 4); g.fillRect(-rowH * 0.1, -rowH * 0.1, rowH * 0.2, rowH * 0.2); g.restore(); }
    }
  });
  g.fillStyle = C.red; g.fillRect(x(T) - 1, 0, 2, h);
}
/* stacked daily cost bars (screenshot 011) */
const days = Array.from({ length: 14 }, () => [Math.random() * 0.6 + 0.3, Math.random() * 0.25, Math.random() * 0.15]);
function barsDraw() {
  const { g, w, h } = BARS; g.clearRect(0, 0, w, h);
  const pad = w * 0.04, bw = (w - pad * 2) / days.length, cols = [C.lime, C.yellow, C.cyan];
  days.forEach((d, i) => {
    let y = h - 4;
    d.forEach((v, k) => { const hh = v * (h * 0.85); g.fillStyle = cols[k]; g.globalAlpha = k ? 0.8 : 1; g.fillRect(pad + i * bw + bw * 0.15, y - hh, bw * 0.7, hh); y -= hh; });
    g.globalAlpha = 1;
  });
}

/* ---------- accounts (shared with the relay hero) ---------- */
function accDraw() {
  const nx = emptiest(S.acc);
  $('accs').innerHTML = ACCT.map((a, k) => `<div class="acc"><div class="h"><b>${a.n}</b><span class="pro">pro · ● ready</span><span class="tg">full</span>${k === S.acc ? '<span class="pl st">● standing</span>' : k === nx ? '<span class="pl nx">next</span>' : '<span class="pl">Use this one</span>'}</div>
  <div class="br"><span>5H</span><span class="pc" style="color:${a.h > 75 ? C.pink : '#cfcfc4'}">${Math.round(a.h)}%</span><span class="tr"><i style="width:${a.h}%;background:${a.h > 75 ? C.pink : C.cyan}"></i></span><span>${a.left} left</span></div>
  <div class="br"><span>WK</span><span class="pc">${Math.round(a.w)}%</span><span class="tr"><i style="width:${a.w}%;background:${a.w > 75 ? C.yellow : C.cyan}"></i></span><span></span></div></div>`).join('');
  $('nAcc').innerHTML = ACCT.map(a => `<div style="display:grid;grid-template-columns:9cqw 1fr 5cqw;gap:.8cqw;align-items:center;font-size:1.5cqw;color:#9a9a8f"><span>${a.n}</span><span style="height:.8cqw;background:#3a3b33;position:relative"><i style="position:absolute;inset:0 auto 0 0;width:${a.h}%;background:${a.h > 75 ? C.pink : C.cyan}"></i></span><span>${Math.round(a.h)}%</span></div>`).join('');
}
const hhmm = () => new Date().toTimeString().slice(0, 5);
const ALOG = ['<b>02:15</b> acct-a window reset · back in rotation', '<b>11:58</b> leg 91 started on acct-c (@emptiest)'];
function logDraw() { $('alog').innerHTML = ALOG.slice(-3).map(l => `<span>${l}</span>`).join(''); }
on('rotate', r => { ALOG.push(`<b>${hhmm()}</b> ${ACCT[r.from].n} ${r.why === 'q' ? 'at 90%' : 'past the 70% wall'} · moved to ${ACCT[r.to].n}`); logDraw(); });

/* ---------- chains ---------- */
const chains = [{ id: 'chn_7f3a', state: 'run', what: 'timeline export' }, { id: 'chn_2c91', leg: 34, state: 'park', what: 'pricing table', until: '02:15' }, { id: 'chn_b04e', leg: 18, state: 'done', what: 'docs sweep' }];
function chainDraw() {
  $('chains').innerHTML = chains.map(c => {
    const n = c.id === 'chn_7f3a' ? S.leg : c.leg;
    const st = c.state === 'run' ? '<span class="st run">▶ running</span>' : c.state === 'park' ? `<span class="st park">⏳ parked until ${c.until}</span>` : '<span class="st done">■ done</span>';
    const steps = [n - 4, n - 3, n - 2, n - 1, n].map((k, i) => `<span class="s ${i < 4 ? 'd' : c.state === 'run' ? 'r' : c.state === 'done' ? 'd' : 'o'}">⑂ ${k}</span>`).join('<i>›</i>')
      + (c.state === 'run' ? '<i>›</i><span class="s o">○ ' + (n + 1) + '</span>' : '');
    return `<div class="ch"><div class="h"><b>${c.id}</b><span style="color:#9a9a8f">${c.what}</span><span style="margin-left:auto">${st}</span></div><div class="steps">${steps}</div></div>`;
  }).join('');
}
let hand = { from: S.leg - 1, to: S.leg, commit: '9c41e2a', note: '1.2' };
function handDraw() {
  $('hand').innerHTML = `<b>Last handover · ⑂ ${hand.from} → ⑂ ${hand.to}</b><span>reason</span><span>${hand.why === 'q' ? 'its account reached 90% of the 5-hour window' : 'context at 40% · converge started at 35%'}</span><span>commit</span><span><code>${hand.commit}</code> pushed before the pass</span><span>note</span><span>${hand.note}k tokens · the next leg starts clean</span>`;
}
on('pass', p => { hand = p; chainDraw(); handDraw(); });

/* ---------- live figures ---------- */
const FEED = ['developer: Edit src/export/rows.ts', 'developer: Bash npm run compile', 'reviewer: Read src/core/baton.ts', 'developer: Bash git commit -m "export: rows"', 'manager: Read Backlog.md', 'developer: Edit media/console.js', 'genel: notify Weekly radar is ready'];
$('feed').innerHTML = FEED.concat(FEED).map(f => `<span><b>✓</b> ${f}</span>`).join('');
let aa = 42;
function ui() {
  const a = ACCT[S.acc];
  $('cLeg').textContent = '⑂ ' + S.leg; $('sbLeg').textContent = '⑂ ' + S.leg;
  $('cCtx').textContent = Math.round(S.ctx * 10) + 'k'; $('cTok').textContent = S.tok.toFixed(1) + 'M';
  $('cStrip').textContent = `session ${S.sid} · ctx ${(S.ctx * 10).toFixed(1)}k / 1.0M · ${Math.round(S.ctx)}% · ⑂ ${S.leg} · ~$${(S.tok * 2.7).toFixed(2)}`;
  $('cLong').textContent = `longest ${S.longest}m`;
  $('dCost').textContent = '$' + Math.round(S.cost); $('nCost').textContent = '$' + S.cost.toFixed(2); $('sbCost').textContent = '$' + S.cost.toFixed(2);
  $('dSes').textContent = 1499 + S.passes;
  $('pu1').style.width = a.h + '%'; $('pu1t').textContent = Math.round(a.h) + '%';
  $('sbQ').textContent = `◷ 2h 40m · ${Math.round(a.h)}% / wk ${Math.round(a.w)}%`;
  $('sbVer').textContent = 'Agent Farm ' + S.ver;
  aa = aa > 1 ? aa - 0.5 : 42; $('nAA').textContent = '0:' + String(Math.ceil(aa)).padStart(2, '0');
}

sizeAll(); accDraw(); chainDraw(); logDraw(); handDraw();
for (let i = 0; i < 1200; i++) { T += 0.05; laneTick(0.05); }
laneDraw(); barsDraw(); ui();
addEventListener('resize', () => { sizeAll(); laneDraw(); barsDraw(); });
if (!reduce) {
  let last = performance.now(), acc = 0;
  const loop = t => {
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    T += dt; laneTick(dt);
    if (vis['s-fleet']) {
      laneDraw(); acc += dt;
      if (acc > 0.5) { acc = 0; ui(); accDraw(); $('tlClock').textContent = new Date().toTimeString().slice(0, 5); }
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
