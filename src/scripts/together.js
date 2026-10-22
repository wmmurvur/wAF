// Together: one mission played round by round. The lead plans, tasks fly out to the team (lime),
// results come back (cyan), and after the last round the verdict says done · partial. The live row of the
// Missions table follows the same rounds, tasks and tokens. Plays only while the section is on screen.
import { reduce, wait, vis } from './state.js';

const $ = id => document.getElementById('t-' + id);
const NS = 'http://www.w3.org/2000/svg';

/* three rounds of a demo mission; each sends tasks to part of the team */
const ROUNDS = [
  { dev: 'write the CSV writer', tst: 'run test_export' },
  { dev: 'add JSON lines', rev: 'read the diff', wri: 'draft the docs' },
  { rev: 'check both formats', tst: 'run the live test' },
];
const MAX = 8;

const row = $('row'), cell = c => row.querySelector('.' + c);
let tasks = 0, tok = 0;

function setNode(id, cls, text) {
  const n = $('n-' + id);
  n.classList.remove('work', 'back'); if (cls) n.classList.add(cls);
  n.querySelector('.s').textContent = text;
}
function setRow(r, status) {
  cell('rd').textContent = `R${r}/${MAX}`; cell('tk').textContent = tasks;
  cell('to').textContent = tok.toFixed(1) + 'k'; cell('co').textContent = `$${(tok * 0.0015).toFixed(2)} (mixed)`;
  if (status) cell('st').innerHTML = status;
  row.classList.remove('flash'); void row.offsetWidth; row.classList.add('flash');
}
const RUNNING = '<span class="pill run">running</span>';

/* a dot travelling along a wire, forwards or back */
function fly(id, back) {
  const path = $('w-' + id), len = path.getTotalLength(), dot = document.createElementNS(NS, 'circle');
  dot.setAttribute('r', '4.5'); dot.setAttribute('fill', back ? '#71e3ed' : '#a8f035'); dot.style.color = back ? '#71e3ed' : '#a8f035';
  $('dots').appendChild(dot);
  path.classList.add(back ? 'back' : 'on');
  return new Promise(res => {
    const t0 = performance.now(), dur = 1000;
    (function f(t) {
      const k = Math.min(1, (t - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const p = path.getPointAtLength(len * (back ? 1 - e : e));
      dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y);
      if (k < 1) requestAnimationFrame(f); else { dot.remove(); path.classList.remove('on', 'back'); res(); }
    })(t0);
  });
}

/* wait until the section is on screen before the next step */
async function seen(ms) { await wait(ms); while (!vis['s-together']) await wait(400); }

function reset() {
  tasks = 0; tok = 0;
  ['dev', 'rev', 'tst', 'wri'].forEach(id => setNode(id, '', 'idle'));
  $('verdict').classList.remove('on');
  setRow(1, RUNNING);
}

async function mission() {
  reset();
  for (let r = 1; r <= ROUNDS.length; r++) {
    const R = ROUNDS[r - 1], ids = Object.keys(R);
    $('round').textContent = `ROUND ${r} / ${MAX}`; $('phase').textContent = 'planning';
    $('lead').classList.add('think'); $('ls').textContent = `planning round ${r}`;
    setRow(r);
    await seen(1500);
    $('lead').classList.remove('think');
    $('phase').textContent = 'delegating'; $('ls').textContent = `sent ${ids.length} tasks`;
    await Promise.all(ids.map(id => fly(id)));
    tasks += ids.length; tok += 60 + ids.length * 22 + Math.random() * 18;
    ids.forEach(id => setNode(id, 'work', '→ ' + R[id]));
    setRow(r);
    $('phase').textContent = 'team working'; $('ls').textContent = `waiting on ${ids.length}`;
    await seen(2400);
    ids.forEach(id => setNode(id, 'back', '✓ returned'));
    await Promise.all(ids.map(id => fly(id, true)));
    tok += 25 + Math.random() * 10; setRow(r);
    $('phase').textContent = 'reading results'; $('ls').textContent = 'reading results';
    $('lead').classList.add('think');
    await seen(1300);
    $('lead').classList.remove('think');
    ids.forEach(id => setNode(id, '', 'idle'));
  }
  $('phase').textContent = 'verdict'; $('ls').textContent = 'verdict: partial';
  setRow(ROUNDS.length, '<span class="pill ok">done</span> <span class="pill part">partial</span>');
  $('verdict').classList.add('on');
  await seen(7000);
}

if (reduce) {
  /* a still frame: the mission after its last round */
  tasks = 7; tok = 412.6;
  $('round').textContent = `ROUND 3 / ${MAX}`; $('phase').textContent = 'verdict'; $('ls').textContent = 'verdict: partial';
  setRow(3, '<span class="pill ok">done</span> <span class="pill part">partial</span>');
  $('verdict').classList.add('on');
} else {
  (async () => { await seen(300); for (;;) await mission(); })();
}
