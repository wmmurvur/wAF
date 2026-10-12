// Measured, not claimed: the plan of every account follows the accounts the relay hero runs on; the live leg's steps
// arrive one by one and are counted by kind, with what they cost; budgets fill with that cost; the judge's ladder
// replays a check. Everything moves only while the section is on screen. Demo data; the rules are the extension's
// (quotaDowngradePercent 70 → haiku, budgets warn at 80%, the judge ladder escalates a FAIL once).
import { ACCT, S, vis, on, wait, reduce, emit } from './state.js';

const $ = id => document.getElementById('m-' + id);
const DOWN = 70;

/* ---------- plan ---------- */
const accEl = $('acc');
accEl.innerHTML = ACCT.map(a => `<div class="ar" style="--ac:${a.c}"><b>${a.n}</b><span class="br"><i data-h></i></span><em data-hv></em><span class="br w"><i data-w></i></span><em data-wv></em><small data-l></small></div>`).join('');
const rows = [...accEl.children];
function plan() {
  ACCT.forEach((a, k) => {
    const r = rows[k];
    r.querySelector('[data-h]').style.width = a.h + '%';
    r.querySelector('[data-w]').style.width = a.w + '%';
    r.querySelector('[data-hv]').textContent = `5h ${Math.round(a.h)}%`;
    r.querySelector('[data-wv]').textContent = `wk ${Math.round(a.w)}%`;
    r.querySelector('[data-l]').textContent = k === S.acc ? '● live leg' : `resets ${a.left}`;
    r.classList.toggle('hot', a.h >= DOWN);
  });
  const hot = ACCT.filter(a => a.h >= DOWN).map(a => a.n);
  $('dg').innerHTML = hot.length
    ? `<b>${hot.join(', ')}</b> ${hot.length > 1 ? 'are' : 'is'} past ${DOWN}% of the window: automatic jobs there run on <b>haiku</b>. Sessions you opened stay as they are.`
    : `Every window is under ${DOWN}%: automatic jobs run on the model they asked for.`;
  const A = ACCT[S.acc];
  $('sbar').innerHTML = `<span>◷ ${A.n}</span><span>5h ${Math.round(A.h)}%</span><span>resets ${A.left}</span><span>wk ${Math.round(A.w)}%</span>`;
}

/* ---------- where it went ---------- */
const KIND = [ // weight of the kind in a turn, and what one step of it adds to the bill and to the raw and weighted tokens
  { p: 18, usd: 0.021, raw: 9e3, wt: 6e3 },   // thinking
  { p: 10, usd: 0.012, raw: 5e3, wt: 3.5e3 }, // reply
  { p: 24, usd: 0, raw: 0, wt: 0 },           // local tool
  { p: 24, usd: 0.006, raw: 60e3, wt: 5e3 },  // tool result: mostly cache reads, cheap but heavy
  { p: 4, usd: 0, raw: 0, wt: 0 },            // MCP tool
  { p: 2, usd: 0, raw: 0, wt: 0 },            // web
  { p: 3, usd: 0.05, raw: 80e3, wt: 12e3 },   // sub-agent
  { p: 9, usd: 0, raw: 0, wt: 0 },            // harness
  { p: 6, usd: 0, raw: 0, wt: 0 },            // local only
];
const GLYPH = ['◈', '▸', '⌘', '↩', '⇄', '⌗', '⑂', '⚙', '·'];
const kli = [...document.querySelectorAll('#s-meter .kinds li')];
const strip = $('strip');
let L;
function fresh() { L = { usd: 0, raw: 0, wt: 0, api: 0, steps: 0, n: KIND.map(() => 0) }; strip.textContent = ''; }
function pick() { let r = Math.random() * 100; for (let k = 0; k < KIND.length; k++) if ((r -= KIND[k].p) < 0) return k; return 2; }
const M = n => (n / 1e6).toFixed(2) + 'M';
function spend() {
  $('usd').textContent = '$' + L.usd.toFixed(2);
  $('tok').textContent = `${M(L.raw)} raw · ⚖ ${M(L.wt)}`;
  $('api').textContent = `${L.api}api·${L.steps}steps`;
  kli.forEach((li, k) => { li.querySelector('b').textContent = L.n[k]; });
}
function step() {
  const k = pick(), K = KIND[k];
  L.n[k]++; L.steps++; L.usd += K.usd; L.raw += K.raw; L.wt += K.wt;
  if (k === 0 || k === 1 || L.steps % 4 === 0) L.api++;
  const c = document.createElement('i'); c.textContent = GLYPH[k]; c.className = 'k' + k;
  strip.appendChild(c); while (strip.children.length > 64) strip.firstChild.remove();
  BUD[0].v += K.usd;
  spend();
}
/* the builder's daily budget takes the live leg's cost (budgets are drawn below) */
const BUD = [{ n: 'builder', cap: 25, v: 14.2 }, { n: 'showrunner', cap: 10, v: 8.3 }, { n: 'researcher', cap: 5, v: 2.1 }];
fresh();
for (let i = 0; i < 40; i++) step();
on('pass', () => { fresh(); spend(); });
for (const li of kli) li.addEventListener('click', () => {
  kli.forEach(x => x.classList.toggle('on', x === li));
  $('ksel').textContent = `${GLYPH[li.dataset.k]} ${li.querySelector('span').textContent}: ${li.title}.`;
  emit('showing', 'steps');
});

/* budgets: a daily budget per agent; a warning at 80%, an error and one notification a day past it (BUD is above) */
function budgets() {
  $('bud').innerHTML = `<p class="lb">Budgets · today</p>` + BUD.map(b => {
    const p = b.v / b.cap * 100, st = p >= 100 ? 'over' : p >= 80 ? 'warn' : '';
    const say = st === 'over' ? '⛔ over: notified once today' : st === 'warn' ? '⚠ 80%: in Insights' : '';
    return `<div class="br2 ${st}"><b>${b.n}</b><span class="bar"><i style="width:${Math.min(100, p)}%"></i><u></u></span><em>$${b.v.toFixed(2)} / $${b.cap}</em><small>${say}</small></div>`;
  }).join('');
}

/* ---------- the judge's ladder ---------- */
const CASES = [
  { what: 'shot-3.png', crit: 'the beam is visible through the rain', r: [['haiku', 'FAIL', 'no beam found', '$0.004'], ['sonnet', 'PASS', 'beam visible, upper left', '$0.03']], v: 'Overturned: the upper rung says PASS, so <b>no retry is paid</b>. A retry of this shot would have cost $0.42.' },
  { what: 'chapter-3.md', crit: 'every claim has a source', r: [['haiku', 'PASS', '14 claims, 14 sources', '$0.004']], v: 'Passed on the first rung for <b>$0.004</b>. Nothing climbed.' },
  { what: 'shot-5.png', crit: 'the keeper is in frame', r: [['haiku', 'FAIL', 'no figure found', '$0.004'], ['sonnet', 'FAIL', 'cut off at the left edge', '$0.03']], v: 'Both rungs say FAIL: the step runs again <b>with the critique</b>. The next check starts at the bottom again.' },
];
let ci = 0, judging = false;
async function judge() {
  if (judging) return; judging = true;
  const c = CASES[ci++ % CASES.length];
  $('what').textContent = c.what; $('crit').textContent = `“${c.crit}”`; $('vd').innerHTML = ''; $('rungs').innerHTML = '';
  for (const [m, v, why, usd] of c.r) {
    const li = document.createElement('li'); li.innerHTML = `<b>${m}</b><span>judging…</span>`; $('rungs').appendChild(li);
    await wait(900);
    li.className = v === 'PASS' ? 'ok' : 'no';
    li.innerHTML = `<b>${m}</b><span><em>${v}</em> ${why}</span><small>${usd}</small>`;
    await wait(500);
  }
  $('vd').innerHTML = c.v;
  emit('showing', 'ladder');
  judging = false;
}
$('again').addEventListener('click', judge);

/* ---------- run while on screen ---------- */
let started = false, t = 0;
plan(); spend(); budgets();
setInterval(() => {
  if (!vis['s-meter'] || document.hidden) return;
  if (!started) { started = true; judge(); }
  plan();
  if (!reduce && ++t % 2 === 0) { step(); budgets(); }
}, 500);
