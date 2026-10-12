// Relay hero: boot log, rolling leg counter, relay track, context / quota / console instruments, self-update glitch.
// This script runs the relay simulation for the whole page (see state.js).
import { ACCT, S, BQ, reduce, wait, hex, emit, emptiest, vis, canOuro, startOuro, nextVer, finishOuro, legDone } from './state.js';

const $ = id => document.getElementById('r-' + id);
const pick = a => a[(Math.random() * a.length) | 0];
/* the backlog item the live leg is working (state.js BQ) */
const item = () => `${BQ[0].c} ${BQ[0].t}`;
const note = () => (0.9 + Math.random() * 0.9).toFixed(1);

/* ---------- odometer ---------- */
function odo(n) {
  const el = $('odo'), s = String(n);
  if (el.children.length !== s.length) {
    el.innerHTML = [...s].map(() => '<span class="dg"><span class="col">' + [...'0123456789'].map(d => `<span>${d}</span>`).join('') + '</span></span>').join('');
    void el.offsetWidth;
  }
  [...s].forEach((d, i) => { el.children[i].firstChild.style.transform = `translateY(${-d * 10}%)`; });
  $('counter').setAttribute('aria-label', `Leg ${n} of one relay chain`);
}

/* ---------- relay track ---------- */
const trk = $('trk'), rail = $('rail');
const cards = [];
let cur = 0;
const mins = () => 30 + ((Math.random() * 22) | 0);
function fillCard(el, leg, kind, d) {
  el.className = 'lg ' + kind;
  const marks = '<u style="left:35%"></u><u style="left:40%"></u>';
  if (kind === 'next') {
    el.style.removeProperty('--ac');
    el.innerHTML = `<div class="lh"><b>⑂ ${leg}</b><span>queued</span></div><div class="lm">fresh session</div><div class="lm">waits for the baton</div><div class="lb">${marks}</div>`;
    return;
  }
  el.style.setProperty('--ac', ACCT[d.acc].c);
  if (kind === 'live') {
    el.innerHTML = `<div class="lh"><b>⑂ ${leg}</b><span class="why">● live</span></div><div class="lm"><code>${d.sid}</code> · ${ACCT[d.acc].n}</div><div class="lm">working · ${item()}</div><div class="lb"><i data-r="b" style="width:${S.ctx}%"></i>${marks}</div>`;
    return;
  }
  el.innerHTML = `<div class="lh"><b>⑂ ${leg}</b><span class="why${d.why === 'q' ? ' q' : ''}">${d.why === 'q' ? '5H 90%' : '40% ✓'}</span></div><div class="lm"><code>${d.commit}</code> · ${ACCT[d.acc].n}</div><div class="lm">${d.min}m · note ${d.note}k</div><div class="lb"><i style="width:${d.ctx}%"></i>${marks}</div>`;
}
function card(leg, kind, d) { const el = document.createElement('div'); fillCard(el, leg, kind, d); return el; }
const anchor = () => (innerWidth < 620 ? 0.58 : 0.62);
function layout(anim) {
  if (!cards.length) return;
  const pitch = cards[0].offsetWidth + parseFloat(getComputedStyle(trk).columnGap || '30');
  const x = rail.clientWidth * anchor() - (cur + 0.5) * pitch;
  trk.style.transition = anim && !reduce ? 'transform 1s cubic-bezier(.2,.85,.2,1)' : 'none';
  trk.style.transform = `translateX(${x}px)`;
}
(function initTrack() {
  const accSeq = [0, 0, 1, 1, 1, 3, 3, 3, 2, 2, 2, 2];
  for (let k = 0; k < 12; k++) {
    cards.push(card(S.leg - 12 + k, 'done', { acc: accSeq[k], commit: hex(7), min: mins(), note: note(), ctx: k === 7 ? 31 : 40, why: k === 7 ? 'q' : 'c' }));
  }
  cards.push(card(S.leg, 'live', { acc: S.acc, sid: S.sid }));
  cards.push(card(S.leg + 1, 'next'));
  cards.forEach(c => trk.appendChild(c));
  cur = 12;
  layout(false);
})();
addEventListener('resize', () => layout(false));

/* ---------- quota panel ---------- */
function accDraw() {
  const nx = emptiest(S.acc);
  $('qAccs').innerHTML = ACCT.map((a, k) => `<div class="acc" style="--ac:${a.c}"><span class="nm">${a.n}</span><span class="tr"><i style="width:${a.h}%;background:${a.h >= 75 ? 'var(--pink)' : 'var(--cyan)'}"></i><u></u></span><span>${Math.round(a.h)}%</span><span class="pl ${k === S.acc ? 'st' : k === nx ? 'nx' : ''}">${k === S.acc ? '● standing' : k === nx ? 'next' : 'ready'}</span></div>`).join('');
}

/* ---------- console ---------- */
const LAB = { agent: 'AGENT', you: 'YOU', tool: 'TOOL', farm: 'FARM' };
function line(kind, html) {
  const L = $('lines'), d = document.createElement('div');
  d.className = 'ln ' + kind;
  d.innerHTML = `<span>${LAB[kind]}</span><span>${html}</span>`;
  L.appendChild(d);
  while (L.children.length > 8) L.firstChild.remove();
}
const TOOLS = ['Read src/export/timelineExport.ts', 'Edit src/export/rows.ts <b>✓</b>', 'Bash npm run compile <b>✓</b>', 'Grep "handoverNote" src/',
  'Bash npm test -- export <b>✓ 214 passed</b>', 'Edit media/console.js <b>✓</b>', 'Read Backlog.md', 'Bash git diff --stat'];
function strip() { $('cstrip').innerHTML = `session ${S.sid} · ctx ${(S.ctx * 10).toFixed(1)}k / 1.0M · ${Math.round(S.ctx)}% · <b>⑂ ${S.leg}</b> · ${ACCT[S.acc].n} · bootId ${S.boot}`; }

/* ---------- instruments ---------- */
function setState(t, cls) { const e = $('iState'); e.textContent = t; e.className = 'state' + (cls ? ' ' + cls : ''); }
function inst() {
  $('iCtx').textContent = S.ctx.toFixed(1);
  $('iTok').textContent = `${Math.round(S.ctx * 10)}k of 1.0M tokens`;
  $('gFill').style.width = S.ctx + '%';
  $('gauge').classList.toggle('conv', S.ctx >= 35);
  $('iLeg').textContent = '⑂ ' + S.leg;
  const live = cards[cur], b = live.querySelector('[data-r="b"]');
  if (b) b.style.width = S.ctx + '%';
  live.classList.toggle('conv', S.ctx >= 35);
  strip();
}

/* ---------- baton pass ---------- */
async function pass(why) {
  S.phase = 'pass';
  const A = ACCT[S.acc], commit = hex(7), n = note();
  setState('baton.pass', 'pass');
  line('farm', why === 'q' ? `QUOTA HANDOVER · ${A.n} at 90% of its 5-hour window` : 'CONTEXT HANDOVER · 40% · stop, commit, write the handover note');
  await wait(650);
  const it = BQ[0];
  line('tool', `git commit -m "${it.c}: ${it.t}" <b>✓ ${commit}</b>`);
  await wait(650);
  const closed = legDone();
  if (closed) { line('tool', `projects.backlog.check ${closed.c} <b>✓ closed</b>`); await wait(650); }
  line('tool', `baton.pass note=${n}k tokens <b>✓</b>`);
  /* fly the baton from the live card to the queued one */
  const rr = rail.getBoundingClientRect(), a = cards[cur].getBoundingClientRect(), q = cards[cur + 1].getBoundingClientRect();
  if (!reduce && vis['s-relay']) {
    await $('baton').animate([
      { opacity: 0, transform: `translateX(${a.right - rr.left - 30}px) scale(.6)` },
      { opacity: 1, transform: `translateX(${a.right - rr.left + 6}px) scale(1.15)`, offset: 0.25 },
      { opacity: 1, transform: `translateX(${q.left - rr.left + 4}px) scale(1)`, offset: 0.85 },
      { opacity: 0, transform: `translateX(${q.left - rr.left + 20}px) scale(.5)` },
    ], { duration: 900, easing: 'cubic-bezier(.5,0,.2,1)' }).finished;
  }
  /* close the leg, open the next one */
  const prevAcc = S.acc, from = S.leg;
  fillCard(cards[cur], S.leg, 'done', { acc: prevAcc, commit, min: mins(), note: n, ctx: Math.min(40, S.ctx), why });
  const next = why === 'q' || A.h >= 70 ? emptiest(prevAcc) : prevAcc;
  S.acc = next; S.leg++; S.passes++; S.sid = hex(8); S.ctx = 3.1;
  fillCard(cards[cur + 1], S.leg, 'live', { acc: S.acc, sid: S.sid });
  const qd = card(S.leg + 1, 'next'); cards.push(qd); trk.appendChild(qd);
  cur++; layout(true); odo(S.leg); accDraw();
  $('qState').textContent = next !== prevAcc ? `→ ${ACCT[next].n}` : '@emptiest';
  $('qState').className = 'state' + (next !== prevAcc ? ' q' : '');
  line('farm', `fresh session ${S.sid} · ⑂ ${S.leg} on ${ACCT[S.acc].n}${next !== prevAcc ? ' (@emptiest)' : ''}`);
  emit('pass', { from, to: S.leg, commit, note: n, why, acc: prevAcc, next });
  if (closed) emit('item', { closed, next: BQ[0], leg: from });
  if (next !== prevAcc) emit('rotate', { from: prevAcc, to: next, why });
  if (cards.length > 18) setTimeout(() => { cards.shift().remove(); cur--; layout(false); }, 1100);
  await wait(1100);
  line('agent', closed ? `${closed.c} is closed. Next in the backlog: ${item()}.` : `Handover note from ⑂ ${S.leg - 1} read. Picking up ${item()}.`);
  setState('working');
  S.phase = 'work';
  if (S.passes % 3 === 0) setTimeout(ouroboros, 2600);
}

/* ---------- Ouroboros: the agent updates Agent Farm and wakes in the same seat ---------- */
async function ouroboros() {
  if (!vis['s-relay'] || !canOuro()) return;
  startOuro();
  const from = S.ver, to = nextVer();
  line('agent', 'The fix is in. Packaging a new build to test it live.');
  await wait(900); line('tool', 'npm run package <b>✓</b>');
  await wait(900); line('tool', `code --install-extension agent-farm-${to}.vsix <b>✓</b>`);
  await wait(900); line('tool', 'af farm.restartExtensionHost resume=true');
  await wait(500);
  $('rbTx').textContent = `agent-farm ${from} → ${to}`;
  emit('reloading');
  if (!reduce) document.body.classList.add('af-glitch');
  await wait(1500);
  document.body.classList.remove('af-glitch');
  finishOuro(to);
  strip();
  line('you', 'Agent Farm restarted the extension host and took this session up again in the same seat — same conversation, same id.');
  const cs = $('cSeat'); cs.textContent = 'same seat · same id'; cs.className = 'state pass';
  await wait(1200);
  line('agent', `${to} is running (new bootId ${S.boot}). Same seat. Continuing ⑂ ${S.leg}.`);
  await wait(1600); cs.textContent = 'same seat'; cs.className = 'state';
}

/* ---------- simulation ---------- */
let toolT = 0;
function tick(dt) {
  for (const a of ACCT) if (a !== ACCT[S.acc]) a.h = Math.max(0, a.h - dt * 0.35);
  if (S.phase !== 'work' || S.busy) return;
  const conv = S.ctx >= 35;
  S.ctx += dt * (conv ? 1.05 : 2.3);
  S.cost += dt * 0.02; S.tok += dt * 0.004;
  const A = ACCT[S.acc]; A.h = Math.min(100, A.h + dt * 0.5);
  if (conv && $('iState').textContent === 'working') { setState('converging', 'conv'); line('farm', 'CONTEXT CONVERGE · 35% · start nothing new, finish the step in flight'); }
  toolT += dt;
  if (toolT > (conv ? 1.6 : 2.2)) { toolT = 0; line('tool', pick(TOOLS)); }
  if (A.h >= 90) { S.ctx = Math.min(S.ctx, 39.9); pass('q'); }
  else if (S.ctx >= 40) { S.ctx = 40; pass('c'); }
}
let last = 0, acc = 0;
function loop(t) {
  const dt = Math.min(0.05, (t - last) / 1000 || 0); last = t;
  tick(dt);
  if (vis['s-relay']) inst();
  acc += dt; if (acc > 0.6) { acc = 0; if (vis['s-relay']) accDraw(); }
  requestAnimationFrame(loop);
}

/* ---------- boot ---------- */
const BOOT = [
  `<span class="ok">agent-farm ${S.ver}</span>  <span class="k">bootId ${S.boot} · 0 runtime dependencies</span>`,
  `<span class="k">engines </span> claude-code <span class="ok">✓</span>  codex <span class="ok">✓</span>  antigravity <span class="ok">✓</span>  opencode <span class="ok">✓</span>  gemini <span class="k">not installed</span>`,
  `<span class="k">accounts</span> 4 signed in · next leg rule <span class="y">@emptiest</span>`,
  `<span class="k">live    </span> listening on 127.0.0.1:8377 <span class="k">(this machine only)</span>`,
  `<span class="k">relay   </span> chain chn_7f3a · <span class="ok">⑂ ${S.leg}</span> resumed · ctx ${S.ctx}% · handover at 40%`,
];
function run() { requestAnimationFrame(t => { last = t; loop(t); }); }
function start() {
  odo(S.leg); accDraw(); strip(); inst();
  line('farm', `fresh session ${S.sid} · ⑂ ${S.leg} on ${ACCT[S.acc].n}`);
  line('agent', `Handover note from ⑂ ${S.leg - 1} read. Picking up ${item()}, the last part of ${BQ[0].part}.`);
  line('tool', 'Edit src/export/timelineExport.ts <b>✓</b>');
  line('tool', 'Bash npm test -- export <b>✓ 214 passed</b>');
  const boot = $('boot');
  /* the boot log plays once per visit, and only when the page opens at the top */
  let seen = false;
  try { seen = sessionStorage.getItem('af-boot') === '1'; sessionStorage.setItem('af-boot', '1'); } catch { /* storage blocked: play it */ }
  if (reduce || seen || scrollY > 40) { boot.remove(); if (!reduce) { run(); setTimeout(ouroboros, 4000); } return; }
  const pre = $('bootTx');
  let i = 0;
  const step = () => {
    pre.innerHTML = BOOT.slice(0, i).join('\n') + '\n<span class="cur"></span>';
    if (i++ < BOOT.length) setTimeout(step, 210);
    else setTimeout(() => { boot.classList.add('out'); setTimeout(() => boot.remove(), 800); setTimeout(ouroboros, 2600); run(); }, 380);
  };
  boot.addEventListener('click', () => { i = BOOT.length; });
  step();
}
start();
