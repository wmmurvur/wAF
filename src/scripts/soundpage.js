// The Sound page under Never waits (screenshots 060 and Mz4): Events, Sessions, Voice.
// Events: which events ring, which tone each plays (▶ plays the extension's own file) and whether Say who follows it.
// Sessions: a session sounds Like all, Always or Silent, with its own tone, voice and Read aloud.
// Voice: the Say who sentence ({agent}, {event}, {session} filled in as speech.ts does) and an answer read aloud, whole
// or a selection, with code said by its size ("a 3-line code block", speechPhrases.ts). The browser's own speech reads
// it, and only with a voice that runs on this device (localService), so no text leaves the page. Nothing speaks or
// plays without a click. On first sight the page shows its three views once, until the visitor picks one.
import { vis, reduce, on, emit } from './state.js';
import { play } from './sound.js';

const $ = id => document.getElementById('w-' + id);
const panel = $('sp'), seg = $('spseg');
const views = [...panel.querySelectorAll('.spv')];
const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
let user = false;

function view(v) {
  for (const b of seg.querySelectorAll('[data-st]')) { const on = b.dataset.st === v; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }
  for (const el of views) el.hidden = el.dataset.v !== v;
  emit('showing', v === 'voice' ? 'voice' : 'sound');
}
seg.addEventListener('click', e => { const b = e.target.closest('[data-st]'); if (b) { user = true; stop(); view(b.dataset.st); } });

/* ---------- speech: the browser's, with a voice on this device only ---------- */
const synth = window.speechSynthesis;
let voices = [];
const loadVoices = () => { voices = synth ? synth.getVoices().filter(v => v.localService) : []; };
if (synth) { loadVoices(); synth.addEventListener?.('voiceschanged', loadVoices); }
const voiceFor = lang => voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang)) || null;
/* rate: the app's −10 … 10 scale, 0 the voice's own normal */
function speak(text, rate, hooks = {}) {
  const v = voiceFor('en');
  if (!synth || !v) return false;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = v; u.lang = v.lang; u.rate = Math.max(0.3, 1 + rate * 0.07);
  if (hooks.word) u.onboundary = e => { if (e.name === 'word' || e.name === undefined) hooks.word(e.charIndex); };
  u.onend = u.onerror = () => hooks.end && hooks.end();
  synth.speak(u);
  return true;
}
function stop() { if (synth) synth.cancel(); }
const NOVOICE = 'This browser has no voice that runs on this device, so the demo stays quiet rather than send the text out. In the app your system\'s own voice reads it.';

/* ---------- Events ---------- */
const evt = panel.querySelector('.evt');
const rings = () => evt.querySelectorAll('.rg:checked').length;
evt.addEventListener('change', e => { if (e.target.classList.contains('rg')) $('spn').textContent = rings(); });
function announcement(word, who) {
  return $('swt').value.split('{agent}').join(who).split('{event}').join(word).split('{session}').join('')
    .replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').replace(/([,;:])\s*(?=[,.;:!?])/g, '').trim();
}
evt.addEventListener('click', async e => {
  const b = e.target.closest('.pl'); if (!b) return;
  user = true;
  const r = b.closest('.er');
  r.classList.add('play');
  await play(r.querySelector('.tn').value);
  setTimeout(() => {
    r.classList.remove('play');
    if (r.querySelector('.sw').checked && $('swon').checked) speak(announcement(r.dataset.word, r.dataset.who), +$('swrate').value);
  }, 1300);
});
$('tvol').addEventListener('input', e => { $('tvoln').textContent = e.target.value; });
/* Also sent to: the chips point at the phone beside the page */
panel.querySelector('.chs').addEventListener('click', e => { const b = e.target.closest('[data-to]'); if (b) { user = true; emit('device', b.dataset.to); document.getElementById('w-phone').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); } });

/* ---------- Sessions ---------- */
const stbl = panel.querySelector('.stbl');
function sessions() {
  let diff = 0;
  for (const r of stbl.querySelectorAll('.sr[data-i]')) {
    const v = r.querySelector('.ss').value, i = +r.dataset.i;
    if (v !== 'like-all' || i === 2) diff++;
    r.dataset.s = v;
    r.querySelector('.st').textContent = v === 'silent' ? '—' : i === 2 ? 'Marimba' : "all's";
    r.querySelector('.sw').textContent = v === 'silent' ? '—' : i === 2 ? 'its own' : "all's";
  }
  $('sdiff').textContent = `3 live · ${diff} sound different`;
}
stbl.addEventListener('change', () => { user = true; sessions(); });
sessions();

/* ---------- Voice ---------- */
const swt = $('swt');
const said = () => { $('sws').textContent = `"${announcement('asking you', 'developer')}"`; };
swt.addEventListener('input', said);
for (const t of panel.querySelectorAll('.tok')) t.addEventListener('click', () => { const k = '{' + t.textContent.replace('+', '').trim() + '}'; swt.value = (swt.value + (swt.value.trim() ? ' ' : '') + k).slice(0, 160); said(); });
$('swh').addEventListener('click', () => { user = true; if (!speak(announcement('asking you', 'developer'), +$('swrate').value)) $('sws').textContent = NOVOICE; });

/* the answer: two paragraphs and a 3-line code block; what is spoken is built with the offsets of every word */
const ANS = [
  { p: 'Done. The exporter now streams rows in batches of 64k instead of loading the whole transcript, so the writer stays small:' },
  { code: 'for await (const batch of rows(file, 65536)) {\n  await out.write(toCsv(batch));\n}' },
  { p: 'A million rows export in 41 seconds and memory stays flat. Next in the backlog: U-12, rows past 10k.' },
];
const ab = $('ab');
let spoken = '', marks = [];
(function build() {
  let html = '';
  for (const part of ANS) {
    if (part.code) {
      const n = part.code.split('\n').length, say = `a ${n}-line code block`;
      marks.push([spoken.length, 'c' + marks.length]);
      html += `<pre data-m="c${marks.length - 1}">${esc(part.code)}</pre>`;
      spoken += say + '. ';
      continue;
    }
    html += '<p>' + part.p.split(' ').map(w => { const id = 'w' + marks.length; marks.push([spoken.length, id]); spoken += w + ' '; return `<span data-m="${id}">${esc(w)}</span>`; }).join(' ') + '</p>';
  }
  ab.innerHTML = html;
})();
function mark(ci) {
  let id = null;
  for (const [at, m] of marks) { if (at <= ci) id = m; else break; }
  for (const el of ab.querySelectorAll('.now')) el.classList.remove('now');
  if (id) ab.querySelector(`[data-m="${id}"]`)?.classList.add('now');
}
function reading(on) { $('ans').classList.toggle('reading', on); if (!on) for (const el of ab.querySelectorAll('.now')) el.classList.remove('now'); }
$('rd').addEventListener('click', () => {
  user = true;
  if ($('ans').classList.contains('reading')) { stop(); reading(false); return; }
  reading(true);
  if (!speak(spoken, +$('rdrate').value, { word: mark, end: () => reading(false) })) { reading(false); $('af').textContent = NOVOICE; }
});
$('rs').addEventListener('click', () => {
  user = true;
  const sel = window.getSelection(), t = sel && sel.rangeCount && ab.contains(sel.anchorNode) ? sel.toString().trim() : '';
  if (!t) { $('af').textContent = 'Select a few words of the answer first, then press Read selection. In the app this works on any text: a page, a transcript or the editor.'; return; }
  reading(true);
  /* a selection that takes in the code says its size, like the whole reading does */
  const text = t.replace(/for await[\s\S]*?\n\}/, 'a 3-line code block.');
  if (!speak(text, +$('rdrate').value, { end: () => reading(false) })) { reading(false); $('af').textContent = NOVOICE; }
});

/* leaving the section stops a reading */
setInterval(() => { if (!vis['s-waits'] && synth && synth.speaking) { stop(); reading(false); } }, 1000);

/* ---------- the chapter VIII tiles, and the first sight ---------- */
on('feature', id => {
  if (id === 'sound') { user = true; view('events'); }
  else if (id === 'voice') { user = true; view('voice'); }
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function seen(ms) { await sleep(ms); while (!vis['s-waits'] || document.hidden) await sleep(400); return !user; }
const io = new IntersectionObserver(async es => {
  if (!es.some(e => e.isIntersecting)) return;
  io.disconnect();
  if (reduce) return;
  /* the Question card row rings once (silently unless the page's sound is on), then Sessions, then Voice */
  const row = evt.querySelector('[data-id="pulse"]');
  if (!await seen(1500)) return;
  row.classList.add('play'); setTimeout(() => row.classList.remove('play'), 1600);
  if (!await seen(6500)) return;
  view('sessions');
  if (!await seen(7000)) return;
  view('voice');
}, { threshold: 0.35 });
io.observe(panel);
