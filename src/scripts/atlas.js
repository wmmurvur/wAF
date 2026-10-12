// The whole farm: tiles on one map, a desk that reads out the focused tile, and stories that light a path across
// districts. A story plays by itself while the section is on screen; clicking a tile stops it, clicking a story plays it.
// Some tile figures are live: they follow the relay chain, the accounts and the backlog the rest of the page runs on,
// here and on the same tiles in the chapter openers below.
import { S, ACCT, BL, reduce, on, vis } from './state.js';
import { districts, features, stories } from '../data/features.js';

const $ = id => document.getElementById('a-' + id);
const map = $('map'), svg = $('lines'), trail = $('trail'), chips = [...$('stories').children];
const F = Object.fromEntries(features.map(f => [f.id, f]));
const tiles = Object.fromEntries([...map.querySelectorAll('.tile')].map(t => [t.dataset.f, t]));
const NS = 'http://www.w3.org/2000/svg';
const sleep = ms => new Promise(r => setTimeout(r, ms));
/* waits, then keeps waiting while the section is off screen or the tab is hidden */
async function hold(ms) { await sleep(ms); while (!vis['s-atlas'] || document.hidden) await sleep(400); }

/* ---------- live figures ---------- */
const sig = (id, v) => { for (const e of document.querySelectorAll(`[data-sig="${id}"]`)) if (e.textContent !== v) e.textContent = v; };
function live() {
  const a = ACCT[S.acc];
  sig('relay', `⑂ ${S.leg}`);
  sig('quota', `${a.n} ${Math.round(a.h)}%`);
  sig('ouroboros', S.ver);
  sig('backlog', `${BL.open} open`);
  sig('track', `${BL.done} closed`);
  sig('sessions', (1499 + S.passes).toLocaleString('en-US'));
}
live();
['pass', 'rotate', 'ver', 'item', 'filed'].forEach(e => on(e, live));
setInterval(live, 1000);

/* ---------- desk ---------- */
function desk(code, title, sub, at, next) {
  $('code').textContent = code; $('t').textContent = title; $('s').textContent = sub;
  const go = $('go');
  go.hidden = !at; if (at) go.href = '#' + at;
  $('next').hidden = !next;
}

/* ---------- board state ---------- */
let token = 0, cur = -1, step = -1;
function clear() {
  map.classList.remove('story');
  for (const t of Object.values(tiles)) t.classList.remove('lit', 'past', 'on');
  svg.replaceChildren(); trail.replaceChildren();
  chips.forEach(c => { c.classList.remove('on'); c.style.removeProperty('--p'); });
}

/* a tile clicked: stop any story and read the tile out; it leads to the section that shows it, else to its chapter */
function focus(id) {
  token++; cur = -1; clear();
  const f = F[id], d = districts[f.d], t = tiles[id];
  t.classList.add('on');
  const at = [f.at, 'ch-' + d.id].find(x => x && document.getElementById(x));
  desk(t.dataset.code, f.n + '.', `${f.s} · ${d.r} ${d.n}`, at, false);
}
for (const [id, t] of Object.entries(tiles)) t.addEventListener('click', () => focus(id));

/* the line between two tiles, from edge to edge; tiles in one column bow out to the right */
function link(a, b, last) {
  const m = map.getBoundingClientRect(), r1 = a.getBoundingClientRect(), r2 = b.getBoundingClientRect();
  const y1 = r1.top + r1.height / 2 - m.top, y2 = r2.top + r2.height / 2 - m.top;
  let x1, x2, c1, c2;
  if (Math.abs(r1.left - r2.left) < 20) {
    x1 = r1.right - m.left; x2 = r2.right - m.left;
    const bow = Math.min(60, 18 + Math.abs(y2 - y1) / 6);
    c1 = x1 + bow; c2 = x2 + bow;
  } else if (r2.left > r1.left) {
    x1 = r1.right - m.left; x2 = r2.left - m.left;
    const dx = Math.max(30, (x2 - x1) / 2); c1 = x1 + dx; c2 = x2 - dx;
  } else {
    x1 = r1.left - m.left; x2 = r2.right - m.left;
    const dx = Math.max(30, (x1 - x2) / 2); c1 = x1 - dx; c2 = x2 + dx;
  }
  const d = `M${x1} ${y1} C${c1} ${y1},${c2} ${y2},${x2} ${y2}`;
  for (const k of ['halo', last ? 'flow' : '']) { /* a dark halo first, so the line reads where it crosses text */
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d); if (k) p.classList.add(k);
    svg.appendChild(p);
  }
  const c = document.createElementNS(NS, 'circle');
  c.setAttribute('cx', x2); c.setAttribute('cy', y2); c.setAttribute('r', last ? 4 : 3);
  svg.appendChild(c);
}

/* show step k of story i: earlier tiles stay lit as a trail, the line follows the path */
function show(i, k) {
  const s = stories[i], st = s.steps, at = st[k];
  map.classList.add('story');
  for (const t of Object.values(tiles)) t.classList.remove('lit', 'past', 'on');
  st.forEach((x, j) => { if (j < k) tiles[x.f].classList.add('past'); });
  tiles[at.f].classList.remove('past'); tiles[at.f].classList.add('lit');
  svg.replaceChildren();
  for (let j = 1; j <= k; j++) link(tiles[st[j - 1].f], tiles[st[j].f], j === k);
  chips.forEach((c, n) => { c.classList.toggle('on', n === i); c.style.setProperty('--p', n === i ? (k + 1) / st.length : 0); });
  trail.replaceChildren(...st.slice(0, k + 1).map((x, j) => { const li = document.createElement('li'); li.textContent = F[x.f].n; if (j === k) li.className = 'now'; return li; }));
  const f = F[at.f], d = districts[f.d];
  desk(at.t, at.x, `${s.n} · step ${k + 1} of ${st.length} · ${f.n} (${d.r})`, null, true);
}

async function play(i) {
  const my = ++token; cur = i; clear();
  const n = stories[i].steps.length;
  for (step = 0; step < n; step++) {
    show(i, step);
    if (reduce) return; /* reduced motion: Next steps through by hand */
    await hold(step === n - 1 ? 4600 : 3000);
    if (my !== token) return;
  }
  play((i + 1) % stories.length);
}
chips.forEach((c, i) => c.addEventListener('click', () => play(i)));

/* Next: a step by hand; the story stops playing by itself until a story is picked again */
$('next').addEventListener('click', () => {
  if (cur < 0) return;
  token++;
  step++;
  if (step >= stories[cur].steps.length) { cur = (cur + 1) % stories.length; step = 0; }
  show(cur, step);
});

/* lines follow the layout */
let raf = 0;
addEventListener('resize', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { if (cur >= 0 && step >= 0 && map.classList.contains('story')) show(cur, Math.min(step, stories[cur].steps.length - 1)); }); });

/* the first story starts when the board first comes into view */
if (!reduce) (async () => { await hold(900); if (cur < 0 && !map.querySelector('.tile.on')) play(0); })();
