// Shared demo state. Every section shows the same farm: one relay chain, one set of accounts, one running version.
// The relay hero (relay.js) is the only writer of leg, context and quota; other sections read the state and listen for events.
// All data here is demo data shaped like the real app; nothing is fetched.
import { project, family, live, queue, captures, nextCode } from '../data/backlog.js';

const hex = n => Array.from({ length: n }, () => '0123456789abcdef'[(Math.random() * 16) | 0]).join('');

export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
export { hex };

/* Four accounts of one engine. h = five-hour window %, w = weekly %; colours mark the account in the relay views. */
export const ACCT = [
  { n: 'acct-a', c: '#a8f035', h: 22, w: 61, left: '2d 6h' },
  { n: 'acct-b', c: '#71e3ed', h: 6, w: 38, left: '1d 7h' },
  { n: 'acct-c', c: '#e4e07f', h: 71, w: 44, left: '2h 39m' },
  { n: 'acct-d', c: '#8f6cc8', h: 48, w: 72, left: '2h 59m' },
];

/* leg: the live relay leg; ctx: its context in %; acc: index of the standing account; sid: the live session id. */
export const S = {
  leg: 92, ctx: 26, acc: 2, sid: '3efb20bf', ver: '3.931.0', boot: '7c2e91f4',
  phase: 'work', busy: false, passes: 0, cost: 41.2, tok: 1.8, longest: 6,
};

/* The project's backlog queue, front first (data/backlog.js). BQ[0] is the item the live leg is working.
   The relay hero closes the front item (closeTop); the Backlog section files new items at the back (file). */
export const BQ = [{ ...live, part: family.c }, ...queue.map(q => ({ ...q }))];
export const BL = { open: project.open, done: project.done, left: 1, cap: 0 };
const codes = { ...nextCode };
const legsFor = it => (it.s === 'S' || it.s === 'XS' ? 1 : 2);
/* the next thought to file: the capture text, and the item it becomes once filed under its area */
export function nextCapture() {
  const c = captures[BL.cap++ % captures.length];
  return { ...c, c: `${c.a}-${codes[c.a]++}`, by: c.who === 'agent' ? 'AI' : undefined };
}
export function file(it) { BQ.push(it); BL.open++; emit('filed', it); }
/* the live leg ends: one leg less on the front item; at zero it is closed and the next item comes up */
export function legDone() {
  const it = BQ[0];
  if (--BL.left > 0) return null;
  BQ.shift(); BL.open--; BL.done++;
  for (const q of BQ) if (q.wait === it.c) delete q.wait;
  if (BQ.length < 8) { const n = nextCapture(); BQ.push(n); BL.open++; }
  BL.left = legsFor(BQ[0]);
  return it;
}

/* tiny event bus: pass, rotate, ver, reloading, item (an item closed), filed (an item queued) */
const subs = {};
export function on(ev, fn) { (subs[ev] = subs[ev] || []).push(fn); }
export function emit(ev, data) {
  for (const fn of subs[ev] || []) { try { fn(data); } catch (err) { console.error(err); } }
}

/* the account the next leg would move to: the emptiest five-hour window, other than `except` */
export function emptiest(except) {
  return ACCT.map((a, k) => ({ a, k })).filter(x => x.k !== except).sort((p, q) => p.a.h - q.a.h)[0].k;
}

/* Ouroboros (the agent rebuilds and reloads Agent Farm) is shown by two sections; one shared cooldown keeps it rare. */
let lastOuro = -1e9;
export function canOuro() { return !S.busy && S.phase === 'work' && performance.now() - lastOuro > 40000; }
export function startOuro() { lastOuro = performance.now(); S.busy = true; }
export function nextVer() { const p = S.ver.split('.').map(Number); return `${p[0]}.${p[1] + 1}.0`; }
export function finishOuro(ver) { S.ver = ver; S.boot = hex(8); S.busy = false; emit('ver', ver); }

/* which sections are on screen; sections pause their drawing when they are not */
export const vis = {};
const io = new IntersectionObserver(es => es.forEach(e => { vis[e.target.id] = e.isIntersecting; }));
document.querySelectorAll('section[id^="s-"]').forEach(s => io.observe(s));

/* the longest wait grows by a minute every minute */
setInterval(() => { S.longest++; emit('minute'); }, 60000);
