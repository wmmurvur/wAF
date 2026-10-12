// /features/: search and the district buttons filter the cards. The words typed and the district picked stay in the
// address (?q=…&d=…), so a filtered list can be shared. The hero's board plays the whole-farm stories (data/features.js)
// across the districts' cells while it is on screen; a cell clicked goes to its card. Cards come in as their district
// reaches the screen, and a district's emblem moves only while it is there.
import '../header.js';
import { stories } from '../../data/features.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const $ = id => document.getElementById('fh-' + id);
const q = $('q'), bar = document.querySelector('.fds');
const groups = [...document.querySelectorAll('.fhub .fd')];
let d = '';

function show() {
  const words = q.value.toLowerCase().split(/\s+/).filter(Boolean);
  let n = 0;
  for (const g of groups) {
    let m = 0;
    const inD = d === '' || g.dataset.d === d;
    for (const c of g.querySelectorAll('.fc')) {
      const hit = inD && words.every(w => c.dataset.q.includes(w));
      c.hidden = !hit;
      if (hit) m++;
    }
    g.hidden = m === 0;
    n += m;
  }
  $('n').textContent = `${n} shown`;
  $('none').hidden = n > 0;
  const u = new URL(location.href);
  q.value.trim() ? u.searchParams.set('q', q.value.trim()) : u.searchParams.delete('q');
  d !== '' ? u.searchParams.set('d', d) : u.searchParams.delete('d');
  try { history.replaceState(null, '', u); } catch { /* a page opened from disk may refuse it */ }
}
function pick(v) {
  d = v;
  for (const b of bar.querySelectorAll('button')) { const on = b.dataset.d === d; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }
  show();
}
q.addEventListener('input', show);
bar.addEventListener('click', e => { const b = e.target.closest('button'); if (b) pick(b.dataset.d === d && d !== '' ? '' : b.dataset.d); });
$('clear').addEventListener('click', () => { q.value = ''; pick(''); q.focus(); });

const p = new URLSearchParams(location.search);
if (p.get('q')) q.value = p.get('q');
if (p.has('d') && groups[+p.get('d')]) pick(p.get('d')); else if (p.get('q')) show();

/* ---------- cards in, emblems on ---------- */
const hub = document.querySelector('.fhub');
hub.classList.add('anim');
for (const g of groups) g.querySelectorAll('.fc').forEach((c, i) => c.style.setProperty('--i', Math.min(i, 12)));
const seenIO = new IntersectionObserver(es => es.forEach(e => {
  e.target.classList.toggle('vis', e.isIntersecting);
  if (e.isIntersecting) e.target.classList.add('in');
}), { rootMargin: '0px 0px -10% 0px' });
groups.forEach(g => seenIO.observe(g));

/* a cell on the board goes to its card, even when a filter hides it */
function goCard(id) {
  const c = document.getElementById('c-' + id); if (!c) return;
  if (c.hidden) { q.value = ''; pick(''); }
  c.closest('.fd').classList.add('in');
  c.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  c.classList.add('hl'); setTimeout(() => c.classList.remove('hl'), 2200);
}

/* ---------- the board: one story at a time, one step every few seconds, while on screen ---------- */
const board = document.getElementById('fh-board');
const cells = Object.fromEntries([...board.querySelectorAll('.cell')].map(c => [c.dataset.f, c]));
const svg = document.getElementById('fh-path'), dots = [...board.querySelectorAll('.dots button')];
const T = document.getElementById('fh-t'), X = document.getElementById('fh-x'), SN = document.getElementById('fh-sn');
let si = 0, k = 0, onScreen = false, timer = 0;
board.addEventListener('click', e => {
  const c = e.target.closest('.cell'); if (c) { e.preventDefault(); goCard(c.dataset.f); return; }
  const d = e.target.closest('.dots button'); if (d) { si = +d.dataset.s; k = 0; draw(); }
});
function centre(el) {
  const b = board.getBoundingClientRect(), r = el.getBoundingClientRect();
  return [r.left - b.left + r.width / 2, r.top - b.top + r.height / 2];
}
function draw() {
  const st = stories[si].steps;
  board.classList.add('story');
  for (const c of Object.values(cells)) c.classList.remove('lit', 'past');
  const pts = [];
  st.slice(0, k + 1).forEach((x, j) => { const c = cells[x.f]; if (!c) return; c.classList.add(j === k ? 'lit' : 'past'); pts.push(centre(c)); });
  const last = pts[pts.length - 1];
  svg.innerHTML = (pts.length > 1 ? `<polyline points="${pts.map(p => p.join(',')).join(' ')}"/>` : '') + (last ? `<circle cx="${last[0]}" cy="${last[1]}" r="3.5"/>` : '');
  SN.textContent = stories[si].n; T.textContent = st[k].t; X.textContent = st[k].x;
  dots.forEach((d, j) => d.classList.toggle('on', j === si));
}
function tick() {
  if (onScreen && !document.hidden) {
    const st = stories[si].steps;
    if (++k >= st.length) { k = 0; si = (si + 1) % stories.length; }
    draw();
  }
  timer = setTimeout(tick, 2600);
}
new IntersectionObserver(es => { onScreen = es[0].isIntersecting; }, { threshold: 0.4 }).observe(board);
addEventListener('resize', draw);
draw();
if (!reduce) timer = setTimeout(tick, 2600);
