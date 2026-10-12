// Backlog: the Projects page, Backlog tab, running on the page's one queue (state.js BQ).
// The relay hero closes the front item when its leg finishes it ('item'); this section shows that, and between closes it
// files new work: a person types a thought into the capture box, or an agent files something it noticed (#byAI).
// Rows and chips are re-rendered from the queue and slid into place, so every move reads as the queue changing.
// Chapter II: the project list shows the same page for a documentary, a thesis and a campaign, and the Track tab shows how
// items were worked (data/backlog.js). On first sight a short tour visits them once, then the live queue carries on; a click
// anywhere in the panel ends the tour. The live queue only moves on screen while orbit-app's Backlog tab is showing.
import { S, BQ, BL, ACCT, on, emit, vis, reduce, nextCapture, file } from './state.js';
import { project, AREAS, projects, tracks } from '../data/backlog.js';

const $ = id => document.getElementById('b-' + id);
const TAKE = 5, ROWS = 6;
const esc = t => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));
/* waits, then keeps waiting while the section is off screen or the tab is hidden */
async function hold(ms) { await sleep(ms); while (!vis['s-backlog'] || document.hidden || !live()) await sleep(400); }

let cur = 'orbit', tab = 'backlog', user = false, open = null;
const live = () => cur === 'orbit' && tab === 'backlog';

const rowsEl = $('rows'), chipsEl = $('chips');
let extra = null; /* a row shown under the queue: a capture in the inbox, or an item just filed at the back */
let closing = null; /* the front item while it is shown closed, before the queue moves up */

function meta(it) {
  return `<span class="meta"><em class="k ${it.k}">#${it.k}</em>${it.by ? `<span class="by">#by${it.by}</span>` : ''}<span class="sz">${it.s}</span>`
    + `${it.part ? `<span class="par">↳ ${it.part}</span>` : ''}${it.wait ? `<span class="wt" title="waits on ${it.wait}">⛔ ${it.wait}</span>` : ''}</span>`;
}
function row(it, i, st) {
  const who = st === 'doing' ? `● ⑂ ${S.leg} on it · ${ACCT[S.acc].n} · ctx <span class="cx">${Math.round(S.ctx)}</span>%`
    : st === 'done' ? `✓ closed by ⑂ ${closing.leg}` : '';
  return `<li class="row ${st}" data-c="${it.c}"><span class="no${i >= 0 && i < TAKE ? ' take' : ''}">${i >= 0 ? i + 1 : ''}</span><i class="cb"></i>`
    + `<code class="${it.part ? 'part' : ''}">${it.c}</code><span class="t">${esc(it.t)}</span>${meta(it)}${who ? `<span class="who">${who}</span>` : ''}</li>`;
}
function extraRow() {
  if (!extra) return '';
  const it = extra.it;
  if (extra.inbox) return `<li class="row inbox" data-c="inbox"><span class="no">📥</span><i class="cb"></i><code>—</code><span class="t">${esc(it.t)}</span><span class="meta">inbox · not filed yet</span></li>`;
  return `<li class="row filed${extra.gone ? ' gone' : ''}" data-c="${it.c}"><span class="no">${BQ.indexOf(it) + 1}</span><i class="cb"></i><code>${it.c}</code><span class="t">${esc(it.t)}</span>${meta(it)}`
    + `<span class="who">${it.by === 'AI' ? `filed by the agent on ⑂ ${S.leg}, a proposal` : 'filed · queued at the back'}</span></li>`;
}
function render() {
  if (!live()) return;
  /* the item just closed stays on top, unnumbered, until the queue moves up under it */
  rowsEl.innerHTML = (closing ? row(closing.it, -1, 'done') : '')
    + BQ.slice(0, closing ? ROWS - 1 : ROWS).map((it, i) => row(it, i, i === 0 ? 'doing' : '')).join('') + extraRow();
  chipsEl.innerHTML = BQ.map((it, i) => `<span class="chip${i < TAKE ? ' take' : ''}" data-c="${it.c}"><i>${i + 1}</i><code>${it.c}</code><small>${it.part ? '↳ ' : ''}${it.s}</small></span>${i === TAKE - 1 ? '<span class="cut" data-c="cut">┊</span>' : ''}`).join('');
  $('q').textContent = BQ.length;
  $('open').textContent = BL.open; $('done').textContent = BL.done;
}
/* re-render, sliding every row and chip from where it was (first, last, invert, play) */
function move(fn) {
  if (!live()) { fn(); return; }
  const at = el => [...el.children].map(c => [c.dataset.c, c.getBoundingClientRect()]);
  const before = new Map([...at(rowsEl), ...at(chipsEl)]);
  fn(); render();
  if (reduce) return;
  for (const c of [...rowsEl.children, ...chipsEl.children]) {
    const b = before.get(c.dataset.c), a = c.getBoundingClientRect();
    if (!b) { c.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'ease-out' }); continue; }
    const dx = b.left - a.left, dy = b.top - a.top;
    if (dx || dy) c.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 560, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }
}
/* ---------- chapter II: other projects, and the Track tab ---------- */
const P = Object.fromEntries(projects.map(p => [p.id, p]));
const blv = $('blv'), trv = $('trv'), plist = $('plist'), tabs = $('tabs');

/* another project's backlog: the same page, its own areas, queue and rows, still (only orbit-app's queue is live here) */
function still(p) {
  $('areas').innerHTML = `<span class="on">all areas</span>${p.areas.map(([a, n]) => `<span>${a} ${n}</span>`).join('')}`;
  rowsEl.innerHTML = p.rows.map((it, i) => `<li class="row${i === 0 ? ' doing' : ''}" data-c="${it.c}"><span class="no${i < TAKE ? ' take' : ''}">${i + 1}</span><i class="cb"></i><code>${it.c}</code><span class="t">${esc(it.t)}</span>${meta(it)}`
    + `${i === 0 ? `<span class="who">● ${p.who.split(' · ')[0]} on it · ${p.who.split(' · ')[1]}</span>` : ''}</li>`).join('');
  const chips = [...p.rows.map(r => [r.c, r.s]), ...p.more];
  chipsEl.innerHTML = chips.map(([c, sz], i) => `<span class="chip${i < TAKE ? ' take' : ''}"><i>${i + 1}</i><code>${c}</code><small>${sz}</small></span>${i === TAKE - 1 ? '<span class="cut">┊</span>' : ''}`).join('');
  $('q').textContent = p.queued; $('open').textContent = p.open; $('done').textContent = p.done;
}

/* Projects → Track: the figures, the three buttons, the four views, and the items worked last first.
   An item opens to every event recorded against its code: when, which session and turn, who, and the note. */
const EV = { touched: 'touch', opened: 'open', done: 'done' };
function evRow(e, unc) {
  const [at, sid, turn, who, ev, note] = e;
  return `<li><span class="when">${at}</span><span class="sid">${sid}</span><span class="tn">#${turn}</span><span class="wh">${who}</span><span class="ev ${EV[ev]}">${ev}</span>${unc ? `<span class="unc" title="two of your sessions were live">${unc}?</span>` : ''}<p>${esc(note)}</p></li>`;
}
function track(stage) {
  const T = tracks[cur];
  const items = T.items.map(it => {
    const last = it.ev[it.ev.length - 1], on = open === it.c;
    const evs = on ? it.ev.slice(0, stage ?? it.ev.length) : [], earlier = it.n[0] - new Set(it.ev.map(e => e[1])).size;
    return `<li class="ti ${it.st}${on ? ' open' : ''}" data-c="${it.c}" role="button" tabindex="0" aria-expanded="${on}">`
      + `<div class="t1"><code>${it.c}</code><span class="stc ${it.st}">${it.st}</span><em class="k ${it.k}">${it.k}</em>${it.by ? `<span class="by">by${it.by}</span>` : ''}`
      + `<span class="sp">⊞ ${it.n[0]} · ~ ${it.n[1]} · ${it.n[2]}</span><span class="tt">${esc(it.t)}</span><span class="sz">${it.s} · ${it.n[1]}t</span></div>`
      + (on ? `<ol class="tev">${earlier > 0 ? `<li class="ear">+ ${earlier} earlier session${earlier > 1 ? 's' : ''}</li>` : ''}${evs.map(e => evRow(e, it.unc)).join('')}</ol>${it.next && (stage ?? 9) >= it.ev.length ? `<p class="tnx">→ ${esc(it.next)}</p>` : ''}`
        : `<div class="t2"><span class="sid">${last[1]}</span><span class="tn">#${last[2]}</span><span>${last[0]}</span><span>${last[3].split(' · ')[0]}</span><span class="ev ${EV[last[4]]}">${last[4]}</span>${it.unc ? `<span class="unc">${it.unc}?</span>` : ''}</div>`)
      + '</li>';
  }).join('');
  trv.innerHTML = `<div class="tstat">${T.stats.map(([n, l]) => `<span><b>${n}</b> ${l}</span>`).join('')}<span class="u${T.unc ? '' : ' z'}"><b>${T.unc}</b> uncertain</span><span class="file">Backloglog.md · 90_Archive/_tracks/backlog-track.jsonl</span></div>`
    + `<div class="tbtn" aria-hidden="true"><span>✎ Record</span><span>⚕ Reconstruct</span><span>↻ Rebuild the log</span></div>`
    + `<div class="tviews" aria-hidden="true"><span class="on">● Items</span><span>≡ Timeline</span><span>▤ Sessions</span><span>⁝ Gaps</span><span class="srt">last worked ▾</span><span class="cnt">${T.items.length} of ${T.stats[0][0]} tracked</span></div>`
    + `<ol class="titems">${items}</ol>`;
}

function show(p, t) {
  if (p) cur = p; if (t) tab = t;
  const pr = P[cur];
  for (const b of plist.querySelectorAll('button')) { const on = b.dataset.p === cur; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }
  for (const b of tabs.querySelectorAll('button')) { const on = b.dataset.tab === tab; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }
  $('name').textContent = pr.name;
  $('meta').textContent = cur === 'orbit' ? `${project.sessions} sessions · the relay chain is on it` : `${pr.sessions} sessions`;
  $('desc').textContent = pr.desc;
  blv.hidden = tab !== 'backlog'; trv.hidden = tab !== 'track';
  if (tab === 'track') track();
  else if (cur === 'orbit') { $('areas').innerHTML = `<span class="on">all areas</span>${AREAS.map(([a, n]) => `<span>${a} ${n}</span>`).join('')}`; render(); }
  else still(pr);
  emit('showing', tab === 'track' ? 'track' : cur === 'orbit' ? 'backlog' : 'kinds');
}

$('panel').addEventListener('click', e => {
  const pb = e.target.closest('[data-p]'), tb = e.target.closest('[data-tab]'), ti = e.target.closest('.ti');
  if (pb || tb || ti) user = true;
  if (pb) { open = null; show(pb.dataset.p); }
  else if (tb) show(null, tb.dataset.tab);
  else if (ti) { open = open === ti.dataset.c ? null : ti.dataset.c; track(); }
});
trv.addEventListener('keydown', e => { const ti = e.target.closest('.ti'); if (ti && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); ti.click(); } });

/* the chapter II tiles */
on('feature', id => {
  if (id === 'kinds') { user = true; open = null; show('keeper', 'backlog'); }
  else if (id === 'track') { user = true; open = 'U-12'; show('orbit', 'track'); }
  else if (id === 'backlog') { user = true; show('orbit', 'backlog'); }
});

/* the tour, once: three other kinds of project, then how U-12 was fought over three months, then back to the live queue */
async function seen(ms) { await sleep(ms); while (!vis['s-backlog'] || document.hidden) await sleep(400); return !user; }
async function tour() {
  for (const [p, ms] of [['keeper', 4200], ['thesis', 3600], ['spring', 3200]]) { if (user) return; show(p, 'backlog'); if (!await seen(ms)) return; }
  if (user) return;
  open = 'U-12'; cur = 'orbit'; tab = 'track'; show(); track(0);
  const n = tracks.orbit.items[0].ev.length;
  for (let k = 1; k <= n; k++) { if (!await seen(1500)) return; track(k); }
  if (!await seen(5200)) return;
  open = null; show('orbit', 'backlog');
}

render();

/* the live context figure on the item being worked */
setInterval(() => { if (vis['s-backlog']) { const cx = rowsEl.querySelector('.doing .cx'); if (cx) cx.textContent = Math.round(S.ctx); } }, 500);
on('pass', () => { if (!closing) render(); });

/* the relay leg finished the front item: show it closed, then move the queue up */
on('item', async p => {
  if (!vis['s-backlog'] || reduce) { closing = null; render(); return; }
  closing = { it: p.closed, leg: p.leg };
  render();
  await sleep(1500);
  move(() => { closing = null; });
});

/* capture and file, while the section is on screen */
const ta = $('ta'), typed = $('typed'), add = $('add');
async function capture() {
  while (BQ.length >= 16) await hold(1000); /* the demo files no faster than the chain closes */
  const it = nextCapture();
  if (it.who === 'you') {
    ta.classList.add('typing');
    for (let i = 1; i <= it.t.length; i++) { typed.textContent = it.t.slice(0, i); await hold(28 + Math.random() * 40); }
    await hold(500);
    add.classList.add('hit'); await sleep(260); add.classList.remove('hit');
    typed.textContent = ''; ta.classList.remove('typing');
    move(() => { extra = { it, inbox: true }; });
    await hold(1700);
  }
  /* filed: it gets its code and goes to the back of the queue */
  move(() => { file(it); extra = { it }; });
  await hold(2600);
  extra.gone = true; render();
  await sleep(450);
  move(() => { extra = null; });
}
async function loop() {
  await hold(1200);
  await capture(); await hold(1400);
  if (!user) await tour();
  for (;;) { await capture(); await hold(1800); }
}
if (!reduce) loop();
