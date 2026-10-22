// Never waits: a question card that answers itself when its countdown runs out, a tool permission that never does,
// and the Now page on a phone that mirrors both. Auto-answer covers questions only; permissions wait for a person.
// The countdown is shortened for the demo (12 seconds). The phone switches between the app and a Telegram chat; the chat
// shows the same two asks as the bot's cards (src/core/telegramDigest.ts) and a tap on a card's button answers them.
// The Sound page under the grid is scripts/soundpage.js.
import { ACCT, S, reduce, on, vis, emit } from './state.js';
import { play, sound } from './sound.js';

const $ = id => document.getElementById('w-' + id);
const SECS = 12, RING = 97.4;

/* questions an agent asks mid-task; the first option is the recommended one */
const QUESTIONS = [
  { q: 'Which export format should the timeline use?', o: ['CSV', 'JSON lines', 'Both'], done: 'The exporter streams rows now, 64k at a time. Before I wire the button I need the format.' },
  { q: 'The old export writer is still imported in two places. Remove it, or keep a shim?', o: ['Remove it', 'Keep a shim'], done: 'Two files still import the old writer: export/legacy.ts and test_export.js.' },
  { q: 'What should the new row limit setting be called?', o: ['<code>timelineExportMaxRows</code>', '<code>exportRowCap</code>'], done: 'The row cap is a setting now, read once per export. It needs a name.' },
];
const PERMS = ['git push origin main', 'rm -rf dist/vsix'];

const card = $('q'), perm = $('perm');
let qi = 0, qAt = Date.now(), left = SECS, answered = false, permOpen = true, permSince = Math.max(1, S.longest - 2), pi = 0, tick = 0, reminders = 0;

/* sound events light their chip for a moment, and play the extension's tone when the sound is switched on */
const TONE = { card: 'pulse', ask: 'knock', done: 'crystal', quota: 'ticks' };
function ring(ev) {
  const s = $('sound').querySelector(`[data-ev="${ev}"]`);
  if (!s) return;
  if (sound.on && vis['s-waits']) play(TONE[ev]);
  if (reduce) return;
  s.classList.add('on'); setTimeout(() => s.classList.remove('on'), 1800);
}
const snd = $('snd');
snd.addEventListener('click', () => sound.set(!sound.on));
sound.watch(v => { snd.setAttribute('aria-pressed', v); snd.textContent = v ? 'Sound on' : 'Sound off'; if (v) play('pulse'); });

function showQuestion(quiet) {
  const Q = QUESTIONS[qi % QUESTIONS.length];
  answered = false; left = SECS; qAt = Date.now();
  card.classList.remove('done');
  $('qq').innerHTML = Q.q;
  $('opts').innerHTML = Q.o.map((t, i) => `<button type="button" data-i="${i}">${t}${i === 0 ? '<em>Recommended</em>' : ''}</button>`).join('');
  $('qf').textContent = 'Nobody at the desk? When the ring runs out, the recommended option goes in.';
  clock();
  phone();
  if (!quiet) ring('card');
}

function answer(i, auto) {
  if (answered) return;
  answered = true;
  const Q = QUESTIONS[qi % QUESTIONS.length], btns = $('opts').querySelectorAll('button');
  btns.forEach((b, k) => { b.disabled = true; b.classList.toggle('pick', k === i); });
  card.classList.add('done');
  $('qf').innerHTML = (auto ? `No answer in ${SECS}s, so the recommended option went in: <b>${Q.o[i]}</b>.` : `Answered: <b>${Q.o[i]}</b>.`) + ' developer carries on.';
  phone();
  setTimeout(() => ring('done'), 2600);
  setTimeout(() => { qi++; showQuestion(); }, reduce ? 6000 : 7000);
}

function clock() {
  $('cd').textContent = '0:' + String(Math.max(0, left)).padStart(2, '0');
  $('ring').style.strokeDashoffset = (RING * (1 - Math.max(0, left) / SECS)).toFixed(1);
}

function decide(allow, from = 'your phone') {
  if (!permOpen) return;
  permOpen = false;
  perm.dataset.d = allow ? 'allow' : 'deny';
  perm.classList.add('ok');
  $('since').textContent = allow ? 'allowed' : 'denied';
  $('pf').textContent = allow ? `Allowed from ${from}. reviewer goes ahead.` : `Denied from ${from}. reviewer is told no and finds another way.`;
  phone();
  setTimeout(() => {
    pi++; permOpen = true; permSince = 0; reminders = 0;
    perm.classList.remove('ok');
    $('pq').innerHTML = `Run <code>${PERMS[pi % PERMS.length]}</code>?`;
    $('pf').textContent = 'A tool permission is never answered for you. It waits, rings, and reaches your phone.';
    since(); phone(); ring('ask');
  }, 9000);
}
function since() { if (permOpen) $('since').textContent = permSince ? `waiting ${permSince}m` : 'just now'; }

/* the phone: the Now page with what waits, what runs and what it costs */
function phone() {
  const Q = QUESTIONS[qi % QUESTIONS.length], items = [];
  if (!answered) items.push(`<div class="pw"><div class="t"><b>developer</b><span class="eng">Claude</span><span>0:${String(Math.max(0, left)).padStart(2, '0')}</span></div><p>${Q.q}</p><div class="bt"><button type="button" class="y" data-a="q">${Q.o[0].replace(/<[^>]+>/g, '')}</button><button type="button" data-a="open">Open</button></div></div>`);
  if (permOpen) items.push(`<div class="pw p"><div class="t"><b>reviewer</b><span class="eng x">Codex</span><span>${permSince ? permSince + 'm' : 'now'}</span></div><p>Run ${PERMS[pi % PERMS.length]}?</p><div class="bt"><button type="button" class="y" data-a="allow">Allow</button><button type="button" data-a="deny">Deny</button></div></div>`);
  $('pwl').innerHTML = items.length ? items.join('') : '<span class="none">Nothing is waiting for you.</span>';
  $('pw').textContent = items.length;
  $('psub').textContent = `${items.length} waiting · 3 running · $${S.cost.toFixed(2)} today`;
  chat();
}

/* ---------- Telegram: a chat bound to developer, with the bot's turn cards ---------- */
const RULE = '──────────', strip = t => t.replace(/<[^>]+>/g, '');
const hm = ms => new Date(ms).toTimeString().slice(0, 5);
const tgl = $('tgl'), sentAt = Date.now() - 95000;
function tcard(c) {
  const kb = c.kb.map(row => `<div class="kr">${row.map(([t, a]) => `<button type="button" data-a="${a}">${t}</button>`).join('')}</div>`).join('');
  return `<div class="bi card"><pre>${[c.head, RULE, '📝 DONE\n' + c.done, RULE, c.status, RULE, c.fig].join('\n')}</pre><time>${hm(c.at)}</time></div>${kb ? `<div class="kb">${kb}</div>` : ''}`;
}
function chat() {
  const Q = QUESTIONS[qi % QUESTIONS.length], cmd = PERMS[pi % PERMS.length], gest = [['⏸ Cancel', 'x'], ['📄 Diff', 'x'], ['📊 Status', 'x']];
  const rev = {
    head: '🤖 reviewer · 📁 orbit-app · 🎯 review X-51 before it ships · Turn 6', at: Date.now() - permSince * 60000,
    done: 'Review done: two nits fixed, and every test passes.',
    status: permOpen ? `❓ WAITING ON YOU\nPermission: Bash\n${cmd}` : perm.dataset.d === 'deny' ? `❓ WAITING ON YOU\nPermission refused: ${cmd}` : '❓ STATUS\nStill working.',
    fig: '⏱ 48s · 61k tok', kb: permOpen ? [[['✅ Allow', 'allow'], ['🚫 Deny', 'deny']], gest] : [gest],
  };
  const dev = {
    head: '🤖 developer · 📁 orbit-app · 🎯 X-52 clean up the old writer · Turn 14', at: qAt,
    done: Q.done,
    status: answered ? '❓ STATUS\nStill working.' : `❓ WAITING ON YOU\n${strip(Q.q)}\n${Q.o.map(o => '   · ' + strip(o)).join('\n')}\n⏳ Auto-answer at ${hm(qAt + SECS * 1000)} — then "${strip(Q.o[0])}" is chosen for you.`,
    fig: '⏱ 3m 41s · 412k tok', kb: answered ? [gest] : [...Q.o.map((o, i) => [[strip(o), 'q' + i]]), gest],
  };
  tgl.innerHTML = tcard(rev)
    + `<div class="bo">also put the account each leg ran on in the export<time>${hm(sentAt)} ✓✓</time></div>`
    + `<div class="bi">⏸ developer is working (turn 14). Queued — it goes in when this turn ends.<time>${hm(sentAt + 2000)}</time></div>`
    + tcard(dev);
  tgl.scrollTop = tgl.scrollHeight;
}
tgl.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  devUser = true;
  const a = b.dataset.a;
  if (a[0] === 'q') answer(+a.slice(1), false);
  else if (a === 'allow' || a === 'deny') decide(a === 'allow', 'Telegram');
  else { b.classList.add('hit'); setTimeout(() => b.classList.remove('hit'), 500); }
});

/* the phone app or Telegram; on first sight the phone shows Telegram once, until the visitor picks */
const CAP = {
  app: 'The farm on your phone, in three tabs: Now, Web and Devices.',
  tg: 'A Telegram chat bound to an agent: a card when a turn ends or asks, answered with a tap. A message sent mid-turn waits for the turn to end. Remote work stops at a daily budget shared with the phone app.',
};
let dev = 'app', devUser = false;
function setDev(d) {
  dev = d;
  for (const b of $('dev').querySelectorAll('button')) { const on = b.dataset.dev === d; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }
  $('app').hidden = d !== 'app'; $('tg').hidden = d !== 'tg';
  $('cap').textContent = CAP[d];
  if (d === 'tg') chat();
  emit('showing', d === 'tg' ? 'telegram' : 'phone');
}
$('dev').addEventListener('click', e => { const b = e.target.closest('[data-dev]'); if (b) { devUser = true; setDev(b.dataset.dev); } });
on('device', d => { devUser = true; setDev(d); });
(async () => {
  const wait = async ms => { await new Promise(r => setTimeout(r, ms)); while (!vis['s-waits'] || document.hidden) await new Promise(r => setTimeout(r, 400)); return !devUser; };
  while (!vis['s-waits']) await new Promise(r => setTimeout(r, 500));
  if (reduce || !await wait(9000)) return;
  setDev('tg');
  if (!await wait(16000)) return;
  setDev('app');
})();
function money() {
  $('pc').textContent = '$' + S.cost.toFixed(2);
  $('pacc').innerHTML = ACCT.map(a => `<div class="acc"><span>${a.n}</span><u><i style="width:${Math.round(a.h)}%;background:${a.c}"></i></u><span>${Math.round(a.h)}%</span></div>`).join('');
}

$('opts').addEventListener('click', e => { const b = e.target.closest('button'); if (b) answer(+b.dataset.i, false); });
$('pwl').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.a === 'q') answer(0, false);
  else if (b.dataset.a === 'open') card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  else decide(b.dataset.a === 'allow');
});

/* the chapter VIII tiles for the phone and Telegram; Sound and Read aloud are soundpage.js's */
on('feature', id => {
  if (id === 'phone') { devUser = true; setDev('app'); }
  else if (id === 'telegram') { devUser = true; setDev('tg'); }
});

on('pass', p => { if (p.why === 'q') ring('quota'); money(); });
on('minute', () => { if (permOpen) { permSince++; since(); phone(); } });

showQuestion(true); since(); money();

/* the countdown only runs while the section is on screen */
setInterval(() => {
  if (!vis['s-waits']) return;
  tick++;
  if (!answered && !reduce) {
    left--; clock();
    if (left <= 0) answer(0, true);
    else { const t = $('pwl').querySelector('.pw:not(.p) .t span:last-child'); if (t) t.textContent = $('cd').textContent; }
  }
  if (tick % 4 === 0) { money(); $('psub').textContent = $('psub').textContent.replace(/\$[\d.]+/, '$' + S.cost.toFixed(2)); }
  /* the reminder rings twice, as the app's default does (every 3 minutes there, every 30 seconds here) */
  if (permOpen && tick % 30 === 0 && reminders < 2) { reminders++; ring('ask'); }
}, 1000);
