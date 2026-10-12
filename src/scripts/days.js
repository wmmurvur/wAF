// Days: one chain drawn across three days and four nights, and the backlog items it worked through.
// A seeded simulation of the real relay rules, so it draws the same every visit:
// hand over at 40% context or at 90% of the 5-hour window; the weekly line at 98% takes an account out;
// the next leg goes to the emptiest account under the 70% wall; with none left the chain parks until the first reset.
// Legs take backlog items in queue order (data/backlog.js): when an item's last leg ends, the next leg opens the next item.
import { ACCT, reduce } from './state.js';
import { parts } from '../data/backlog.js';

const $ = id => document.getElementById('d-' + id);
/* starts on a Wednesday at 21:00 (day 0 is Wednesday); NIGHT is when the strip shades a row */
const LEGS = 92, W = 300, K = 0.016, START = 21 * 60, UPDATES = [23, 51, 77];
const DAYS = ['WED', 'THU', 'FRI', 'SAT', 'SUN'], NIGHT = [21 * 60, 7 * 60];

function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }
const D = (() => {
  const R = rng(20261011);
  const acc = ACCT.map(a => ({ u: 0, ws: null, w: a.w }));
  const touch = (k, t) => { const A = acc[k]; if (A.ws !== null && t - A.ws >= W) { A.u = 0; A.ws = null; } return A; };
  let t = START, a = 0, quota = 0;
  const legs = [], parks = [], ups = [];
  for (let i = 1; i <= LEGS; i++) {
    const A = touch(a, t); if (A.ws === null) A.ws = t;
    const want = 48 + R() * 30, rate = 0.7 + R() * 0.6, to5 = (90 - A.u) / rate, toW = (98 - A.w) / (rate * K);
    const q = Math.min(to5, toW) < want ? (toW < to5 ? 'wk' : '5h') : '';
    const d = Math.max(6, q ? Math.min(to5, toW) : want);
    A.u += d * rate; A.w += d * rate * K;
    legs.push({ i, s: t, e: t + d, a, q }); if (q) quota++;
    t += d + 0.8;
    if (UPDATES.includes(i)) { ups.push({ t, i }); t += 2.5; }
    if (i === LEGS) break; /* the last leg is the live one */
    if (q || A.u >= 70) {
      const c = acc.map((x, k) => ({ k, x: touch(k, t) })).filter(o => o.x.u < 70 && o.x.w < 97.9).sort((p, r) => p.x.u - r.x.u);
      if (c.length) a = c[0].k;
      else {
        const r = acc.map((x, k) => ({ k, at: x.ws === null ? t : x.ws + W, w: x.w })).filter(o => o.w < 97.9).sort((p, s) => p.at - s.at)[0];
        parks.push({ s: t, e: r.at }); t = r.at + 0.8; a = r.k; touch(a, t);
      }
    }
  }
  /* each part of the family owns a run of legs; the last part is still open on the live leg */
  let n = 0;
  const items = parts.map((p, k) => {
    const first = legs[n], last = legs[n + p.legs - 1];
    for (let j = 0; j < p.legs; j++) legs[n + j].it = k;
    n += p.legs;
    return { ...p, k, t0: first.s, t1: last.e, from: first.i, to: last.i, open: k === parts.length - 1 };
  });
  return { legs, parks, ups, quota, items, end: legs[legs.length - 1].e };
})();

const fmt = m => { m = ((m % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(Math.floor(m % 60)).padStart(2, '0'); };
const day = m => DAYS[Math.floor(m / 1440)];
/* nights the chain ran through (any part of 21:00–07:00), and daytimes it covered whole (07:00–21:00) */
const span0 = START, span1 = D.end;
let nights = 0, days = 0;
for (let d = -1; d * 1440 < span1; d++) {
  const ns = d * 1440 + NIGHT[0], ne = (d + 1) * 1440 + NIGHT[1];
  if (ns < span1 && ne > span0) nights++;
  const ds = (d + 1) * 1440 + NIGHT[1], de = (d + 1) * 1440 + NIGHT[0];
  if (ds >= span0 && de <= span1) days++;
}
const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];
$('title').innerHTML = `Ninety-two legs. <em>${WORDS[days]} days, ${WORDS[nights].toLowerCase()} nights.</em> Straight off the backlog.`;
$('parks').textContent = D.parks.length;
$('quota').textContent = D.quota;
$('updates').textContent = D.ups.length;
$('legend').innerHTML = ACCT.map(a => `<span><i style="background:${a.c}"></i>${a.n}</span>`).join('')
  + '<span><i class="nt"></i>night, 21:00 – 07:00</span><span><i style="background:#ec0f74;width:3px"></i>quota handover</span><span><i class="pk"></i>parked until reset</span><span><i class="up"></i>self-update, same seat</span>';

const cv = $('canvas');
const rowsEl = [...$('items').children];
let G = null, prog = reduce ? 1 : 0;
function geo() {
  const w = cv.parentElement.clientWidth - 28, mob = w < 560;
  const rows = Math.ceil(D.end / 1440), lab = mob ? 34 : 50, top = 22, il = mob ? 7 : 15, rh = mob ? 22 : 30, gap = mob ? 12 : 14;
  const h = top + rows * (il + 2 + rh + gap), dpr = devicePixelRatio || 1;
  cv.width = w * dpr; cv.height = h * dpr; cv.style.height = h + 'px';
  const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
  G = { g, w, h, rows, lab, top, il, rh, gap, mob, X: m => lab + (m / 1440) * (w - lab - 4) };
}
function hatch(g) {
  const p = document.createElement('canvas'); p.width = p.height = 6;
  const c = p.getContext('2d'); c.strokeStyle = '#6c6d63'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(0, 6); c.lineTo(6, 0); c.stroke();
  return g.createPattern(p, 'repeat');
}
/* calls fn(day, from, to) for each day a span touches */
function span(s, e, fn) {
  for (let d = Math.floor(s / 1440); d * 1440 < e; d++) {
    const a = Math.max(s, d * 1440) - d * 1440, b = Math.min(e, (d + 1) * 1440) - d * 1440;
    if (b > a) fn(d, a, b);
  }
}
function draw() {
  if (!G) return;
  const { g, w, h, rows, lab, top, il, rh, gap, mob, X } = G;
  g.clearRect(0, 0, w, h);
  const cut = START + prog * (D.end - START), Y = d => top + d * (il + 2 + rh + gap), L0 = d => Y(d) + il + 2;
  const small = `${mob ? 9.5 : 11}px "Geist Mono Variable", ui-monospace, monospace`;
  g.font = small;
  /* night bands, drawn under everything, with a marker on the hour axis */
  for (let d = 0; d < rows; d++) {
    for (const [a, b] of [[0, NIGHT[1]], [NIGHT[0], 1440]]) { g.fillStyle = 'rgba(90,110,210,.13)'; g.fillRect(X(a), Y(d) - 3, X(b) - X(a), il + 2 + rh + 6); }
  }
  for (const [a, b] of [[0, NIGHT[1]], [NIGHT[0], 1440]]) { g.fillStyle = 'rgba(132,150,240,.55)'; g.fillRect(X(a), 15, X(b) - X(a), 2); }
  for (let hr = 0; hr <= 24; hr += mob ? 6 : 3) {
    const x = X(hr * 60);
    g.fillStyle = 'rgba(255,255,255,.06)'; g.fillRect(x, top - 4, 1, h - top);
    g.fillStyle = '#6c6d63'; g.textAlign = hr === 24 ? 'right' : hr === 0 ? 'left' : 'center'; g.fillText(String(hr).padStart(2, '0'), x, 11);
  }
  g.textAlign = 'left';
  for (let d = 0; d < rows; d++) {
    g.fillStyle = '#8f8f84'; g.fillText(DAYS[d], 0, L0(d) + rh / 2 + 4);
    g.fillStyle = '#16170f'; g.fillRect(X(0), L0(d), X(1440) - X(0), rh);
  }
  /* backlog items: one band per item over the legs that worked it */
  for (const it of D.items) {
    if (it.t0 > cut) break;
    span(it.t0, Math.min(it.t1, cut), (d, a, b) => {
      const x = X(a), wd = Math.max(1, X(b) - X(a) - 1.5);
      g.fillStyle = it.open ? 'rgba(168,240,53,.22)' : it.k % 2 ? '#34352c' : '#292a22'; g.fillRect(x, Y(d), wd, il);
      if (it.open) { g.fillStyle = '#a8f035'; g.fillRect(x, Y(d) + il - 2, wd, 2); }
      if (!mob && wd > 40) { g.fillStyle = it.open ? '#e8fbc9' : '#cfd0c4'; g.font = `10px "Geist Mono Variable", ui-monospace, monospace`; g.fillText(it.c, x + 5, Y(d) + 11); g.font = small; }
    });
  }
  const pat = hatch(g);
  let n = 0;
  for (const p of D.parks) {
    if (p.s > cut) break;
    span(p.s, Math.min(p.e, cut), (d, a, b) => {
      g.fillStyle = pat; g.fillRect(X(a), L0(d), X(b) - X(a), rh);
      g.strokeStyle = '#4b4c44'; g.strokeRect(X(a) + 0.5, L0(d) + 0.5, X(b) - X(a) - 1, rh - 1);
    });
  }
  for (const L of D.legs) {
    if (L.s > cut) break;
    n = L.i;
    span(L.s, Math.min(L.e, cut), (d, a, b) => {
      const x = X(a), wd = Math.max(1, X(b) - X(a) - 1.2);
      g.fillStyle = ACCT[L.a].c; g.fillRect(x, L0(d), wd, rh);
      if (L.q) { g.fillStyle = L.q === 'wk' ? '#ffffff' : '#ec0f74'; g.fillRect(x + wd - 2, L0(d), 2, rh); }
      if (wd > (mob ? 14 : 20) && b - a > 20) { g.fillStyle = '#10140a'; g.textAlign = 'center'; g.fillText(String(L.i), x + wd / 2, L0(d) + rh / 2 + 4); g.textAlign = 'left'; }
    });
  }
  /* night over the legs too: the chain does not stop when the day does */
  for (let d = 0; d < rows; d++) for (const [a, b] of [[0, NIGHT[1]], [NIGHT[0], 1440]]) { g.fillStyle = 'rgba(16,22,70,.24)'; g.fillRect(X(a), L0(d), X(b) - X(a), rh); }
  for (const u of D.ups) {
    if (u.t > cut) break;
    const d = Math.floor(u.t / 1440), x = X(u.t - d * 1440), y = L0(d) - 1;
    g.fillStyle = '#ec0f74'; g.beginPath(); g.moveTo(x - 5, y - 8); g.lineTo(x + 5, y - 8); g.lineTo(x, y); g.fill();
  }
  if (prog >= 1) {
    const d = Math.floor(D.end / 1440), x = X(D.end - d * 1440);
    g.fillStyle = '#e0245e'; g.fillRect(x, L0(d) - 6, 2, rh + 12);
    g.fillStyle = '#a8f035'; g.fillText(mob ? `⑂ ${LEGS} live` : `⑂ ${LEGS} · live now · ${day(D.end)} ${fmt(D.end)}`, x + 8, L0(d) + rh / 2 + 4);
  }
  $('legs').textContent = n;
  $('hours').textContent = Math.round((Math.min(cut, D.end) - START) / 60) + 'h';
  list(cut);
}
/* the backlog beside the strip: open, being worked, or closed, as the strip reaches it */
function list(cut) {
  let closed = 0;
  D.items.forEach((it, k) => {
    const st = it.t0 > cut ? '' : it.t1 <= cut && !it.open ? 'done' : 'doing';
    if (st === 'done') closed++;
    const li = rowsEl[k];
    if (li.dataset.st !== st) { li.dataset.st = st; li.className = st; }
  });
  $('items-n').textContent = closed;
  $('done').textContent = `${closed} / ${D.items.length} closed`;
}
function play() {
  const t0 = performance.now();
  const f = t => { prog = Math.min(1, (t - t0) / 6000); draw(); if (prog < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}
geo(); draw();
addEventListener('resize', () => { geo(); draw(); });
document.fonts?.ready.then(draw);
if (!reduce) new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); play(); } }, { threshold: 0.35 }).observe($('strip'));

/* hover a block to read it */
const tip = $('tip');
cv.addEventListener('pointermove', e => {
  if (!G || prog < 1) return;
  const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, { top, il, rh, gap, lab, w } = G;
  const rowH = il + 2 + rh + gap, d = Math.floor((y - top) / rowH), off = y - top - d * rowH;
  if (d < 0 || off > il + 2 + rh || x < lab) { tip.style.opacity = 0; return; }
  const m = d * 1440 + ((x - lab) / (w - lab - 4)) * 1440;
  let t = '';
  if (off < il + 1) {
    const it = D.items.find(i => m >= i.t0 && m <= i.t1);
    if (it) t = `${it.c} · ${it.t} · ${it.s} · legs ${it.from}–${it.to} · ${it.open ? 'open, on the live leg' : 'closed'}`;
  } else {
    const L = D.legs.find(l => m >= l.s && m <= l.e), P = D.parks.find(p => m >= p.s && m <= p.e);
    if (L) t = `⑂ ${L.i} · ${parts[L.it].c} · ${ACCT[L.a].n} · ${Math.round(L.e - L.s)}m · ${day(L.s)} ${fmt(L.s)}–${fmt(L.e)}${L.q === 'wk' ? ' · weekly line, 98%' : L.q ? ' · quota handover, 5H 90%' : ' · handed over at 40%'}`;
    else if (P) t = `parked ${Math.round(P.e - P.s)}m · woke at the ${fmt(P.e)} reset`;
  }
  if (!t) { tip.style.opacity = 0; return; }
  tip.textContent = t; tip.style.opacity = 1;
  const tw = tip.offsetWidth, px = Math.min(Math.max(14, x + 14 - tw / 2), cv.parentElement.clientWidth - tw - 8);
  tip.style.left = px + 'px'; tip.style.top = y - 20 + 'px';
});
cv.addEventListener('pointerleave', () => { tip.style.opacity = 0; });

