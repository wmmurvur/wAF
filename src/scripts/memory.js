// Never forgets: five pages of the extension (Sessions, one session, Search, the Wiki cockpit, the Memory Graph) and the
// vault beside them. When the section first comes into view the demo keeps turn 4 of a session for the wiki, a compile
// run writes the page "Storm Scenes" from it and from a second session, and the graph grows a node. The visitor can do
// every step by hand. Copy follows the extension (media/sessionsTable.js, sessionViewer.js, afWiki.js, search.js,
// wiki.js, memgraph.js; _REF/wiki.md for the page template); sessions, notes, costs and pages are demo data.
import { vis, reduce, on, emit } from './state.js';

const $ = id => document.getElementById('me-' + id);
const view = $('view'), tabsEl = $('tabs'), keepEl = $('keep'), treeEl = $('tree'), noteEl = $('note'), graphEl = $('graph'), crumb = $('crumb');
const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
async function hold(ms) { await sleep(ms); while (!vis['s-memory'] || document.hidden) await new Promise(r => setTimeout(r, 400)); }
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const ENG = { Claude: '', Codex: 'x', Gemini: 'g', Antigravity: 'a', OpenCode: 'o' };
const eng = e => `<i class="eng ${ENG[e]}">${e}</i>`;

/* ---------- sessions (demo rows) ---------- */
const ROWS = [
  { by: '🤖', ag: 'showrunner', e: 'Claude', pr: 'The last keeper', t: 'Storm shots keep losing the beam', w: '2h ago', d: '18m', n: 6, tk: '2.1M', c: '$0.84', id: '7c41e2a0' },
  { by: '🧑', ag: 'editor', e: 'Codex', pr: 'The last keeper', t: 'Retake scene 4 with the judge\'s critique', w: '2d ago', d: '9m', n: 5, tk: '880k', c: '$0.31', id: 'b93f0d17' },
  { by: '🤖', ch: '⑂ 3', ag: 'developer', e: 'Claude', pr: 'Thesis tools', t: 'Chain chn_7f3a · leg 3 of 4', w: '5h ago', d: '142m', n: 2, tk: '57.1M', c: '$38.60' },
  { by: '🧑', ag: 'researcher', e: 'Gemini', pr: 'Thesis', t: 'How does a Fresnel lens throw light that far?', w: '4d ago', d: '31m', n: 14, tk: '4.4M', c: '$0.000' },
  { by: '🤖🌙', ag: 'archivist', e: 'Claude', pr: '—', t: 'Back up the agent repo', w: '21h ago', d: '1m', n: 1, tk: '42k', c: '$0.04' },
  { by: '🧑', ag: 'assistant', e: 'Claude', rt: 'Kimi K2', pr: '—', t: 'Which free models answer today?', w: '22h ago', d: '3m', n: 4, tk: '310k', c: '$0.000' },
  { by: '🎯', ag: 'manager', e: 'Claude', pr: 'Studio', t: 'Mission: weekly channel rhythm', w: '6d ago', d: '9m', n: 7, tk: '1.2M', c: '$0.62' },
  { by: '🧑', ag: 'developer', e: 'Antigravity', pr: 'Thesis tools', t: 'Citation export breaks on umlauts', w: '3d ago', d: '13m', n: 26, tk: '15.4M', c: '$0.000' },
  { by: '🧑', ag: 'developer', e: 'OpenCode', rt: 'local · 127.0.0.1', pr: 'Thesis tools', t: 'Tidy the bibliography script', w: '3d ago', d: '6m', n: 3, tk: '96k', c: '$0.000' },
];
function sessionsView() {
  return `<div class="ph"><h3>Sessions</h3><span>1,499 sessions on this machine</span></div>
    <p class="lede">Every conversation this machine has recorded — yours and the farm's own runs. Sort by any figure, filter by agent, project, dates and ranges, fold a row open for its turns.</p>
    <div class="ctl"><span>Sort by <b>Recent</b></span><span>Show <b>200</b></span><span>Engines: <b>all ▾</b></span><span>Filters (1)</span></div>
    <p class="cnt">9/1,499 sessions · 🧑 you · 🤖 automation · 🎯 a mission · 🌙 headless · ⑂ a leg of a chain</p>
    <div class="stab"><div class="th"><span>By</span><span>Agent</span><span>Engine · Route</span><span>Title</span><span>When</span><span>Turns</span><span>Tokens</span><span>Cost</span></div>
    ${ROWS.map((r, i) => `<div class="sr${r.id === '7c41e2a0' ? ' go' : ''}${pick === i ? ' pick' : ''}"${r.id === '7c41e2a0' ? ' data-open="1" role="button" tabindex="0" title="Open this session"' : ''}>
      <span class="by">${r.by}${r.ch ? `<em>${r.ch}</em>` : ''}</span><span class="ag">${r.ag}</span>
      <span class="er">${eng(r.e)}${r.rt ? `<i class="rt">${r.rt}</i>` : ''}</span>
      <span class="tt"><i>${r.pr}</i>${esc(r.t)}</span><span>${r.w}</span><span class="nm">${r.n}</span><span class="nm">${r.tk}</span><span class="nm${r.c === '$0.000' ? ' z' : ''}">${r.c}</span></div>`).join('')}</div>
    <p class="foot">A free model's zero is a real zero. The cost is worked out from your own transcripts and your pricing rules, never from a bill.</p>`;
}

/* ---------- one session ---------- */
const TURNS = [
  ['Scene 4 failed the vision check again. Read me the judge\'s note.', '9s · 1 step · 162k tok · $0.05'],
  ['Compare the failed take with what the step asked for.', '22s · 3 steps · 475k tok · $0.14'],
  ['Make it again with the critique in the prompt.', '47s · 7 steps · 410k tok · $0.21'],
  ['It passed. What exactly changed?', '23s · 3 steps · 581k tok · $0.17'],
  ['Write that line into the recipe\'s scene step.', '16s · 2 steps · 260k tok · $0.12'],
  ['Queue scene 5.', '9s · 1 step · 180k tok · $0.15'],
];
const ANSWER = 'The judge failed the first take because the beam was missing and the lantern was dark. The retake added one line to the prompt, "one rotating beam, visible through rain", and the beam stayed in frame for the whole shot. Same model, same length: that line was the difference.';
let open4 = true, show = 'all';
function sessionView() {
  const on4 = mark && mark.turn;
  return `<div class="sv"><div class="ph"><h3>Storm shots keep losing the beam</h3>${eng('Claude')}</div>
    <p class="sub">🤖 showrunner · 7c41e2a0 · started by the recipe's scene step · mode: auto</p>
    <div class="acts"><button type="button" class="kb${mark && !mark.turn ? ' on' : ''}" data-keep="0">🔖 Wiki</button><span>⏵ Resume</span><span>✎ Rename</span><span>⌨ Terminal</span><span>▶ Replay</span><span>⬇ Export MD</span><span>Open raw JSONL</span></div>
    <div class="kpis"><div><b>Cost</b><strong>$0.84</strong><em>your pricing rules, not an invoice</em></div><div><b>Tokens</b><strong>2.1M</strong><em>in 0.4k · out 21k · cacheR 1.9M · cacheW 160k</em></div><div><b>Context now</b><strong>61.2k</strong><em>last request (prompt+cache+output)</em></div><div><b>Span</b><strong>18m</strong><em>Oct 11, 01:14 → 01:32</em></div><div><b>Activity</b><strong>23</strong><em>tool calls · 0 errors</em></div></div>
    <div class="show"><span>Show:</span>${['All', 'Dialog', '🧑 User', '🤖 Agent', '🔧 Tool calls', 'Results', '⚠ Errors'].map(s => `<button type="button" data-show="${s}" class="${show === s ? 'on' : ''}">${s}</button>`).join('')}</div>
    <ol class="turns">${TURNS.map(([p, m], i) => `<li class="tb${i === 3 ? ' t4' : ''}${i === 3 && open4 ? ' open' : ''}">
      <div class="bd"><button type="button" class="fold" data-fold="${i}" aria-label="Fold or unfold turn ${i + 1}">${i === 3 && open4 ? '▾' : '▸'}</button><b>Turn ${i + 1}/6</b><span class="p">${esc(p)}</span><span class="m">${m}</span><button type="button" class="kb${on4 && on4 === i + 1 ? ' on' : ''}" data-keep="${i + 1}" title="${on4 === i + 1 ? 'Kept for the wiki — Turn 4' : 'Keep this turn for the wiki'}">🔖</button></div>
      ${i === 3 && open4 ? `<div class="msgs">${show === '🔧 Tool calls' || show === 'Results' ? '<p class="tl">🔧 Read · steps/s04/qa.json<br>🔧 Read · steps/s04/take-2.json<br>🔧 Bash · diff take-1.prompt take-2.prompt</p>' : show === '⚠ Errors' ? '<p class="tl">No errors in this turn.</p>' : `${show === '🤖 Agent' ? '' : `<p class="u"><em>🧑 USER · 01:29</em>${esc(p)}</p>`}${show === '🧑 User' ? '' : `<p class="a"><em>🤖 CLAUDE · 01:29</em>${esc(ANSWER)}</p>`}`}</div>` : ''}</li>`).join('')}</ol></div>`;
}

/* ---------- search ---------- */
const HITS = [
  { r: 'agent', s: 'Storm shots keep losing the beam', ag: 'showrunner', e: 'Claude', w: '2h ago', x: 'the first take failed because the beam was missing and the lantern was dark' },
  { r: 'you', s: 'Retake scene 4 with the judge\'s critique', ag: 'editor', e: 'Codex', w: '2d ago', x: 'the beam should sweep left to right, slower' },
  { r: 'tool', s: 'Retake scene 4 with the judge\'s critique', ag: 'editor', e: 'Codex', w: '2d ago', x: 'Vision QA · FAIL: no beam in frame, the lantern is dark' },
  { r: 'agent', s: 'How does a Fresnel lens throw light that far?', ag: 'researcher', e: 'Gemini', w: '4d ago', x: 'the rings bend the light into one flat beam, so less of it is lost' },
  { r: 'you', s: 'Tidy the bibliography script', ag: 'developer', e: 'OpenCode', w: '3d ago', x: 'cite the beam-angle table as Table 3, not as a figure' },
];
let q = 'beam', smode = 'Text';
function searchView() {
  const k = q.trim().toLowerCase();
  const hits = smode === 'Meaning' ? HITS.filter(h => h.e === 'Claude') : HITS.filter(h => k && (h.x + ' ' + h.s).toLowerCase().includes(k));
  const mk = t => { const s = esc(t); if (!k || smode === 'Meaning') return s; const i = s.toLowerCase().indexOf(esc(k)); return i < 0 ? s : s.slice(0, i) + '<mark>' + s.slice(i, i + esc(k).length) + '</mark>' + s.slice(i + esc(k).length); };
  return `<div class="ph"><h3>Search</h3><span>Find the exact conversation, action or session across the fleet.</span></div>
    <form class="sq" id="me-sq"><input id="me-q" value="${esc(q)}" aria-label="Search every transcript" placeholder="${smode === 'Meaning' ? 'Describe the idea or discussion…' : 'Words, phrase, path, error or session id…'}"><span class="seg">${['Text', 'Regex', 'Meaning'].map(m => `<button type="button" data-mode="${m}" class="${smode === m ? 'on' : ''}">${m}</button>`).join('')}</span></form>
    <p class="cnt">${smode === 'Meaning' ? '<b>Meaning:</b> indexed main-session conversation only. Claude Code transcripts only — the index is built from their line format.' : `${hits.length} hit(s) · ${new Set(hits.map(h => h.s)).size} session(s) · reads every engine: Claude Code, Codex, Gemini, Antigravity, OpenCode`}</p>
    <ul class="hits">${hits.map(h => `<li><span class="rl">${h.r}</span><div><b>${esc(h.s)}</b><span class="hm">${h.ag} · ${eng(h.e)} · ${h.w}</span><p>…${mk(h.x)}…</p></div></li>`).join('') || '<li class="none">Nothing in the demo transcripts. In the app every transcript of every engine is read.</li>'}</ul>`;
}

/* ---------- the wiki cockpit ---------- */
const POOL = [
  { id: 'm2', st: 'pending', src: 'editor · #b93f0d17', sc: 'Turns 2–5', top: ['Film'], said: 'Retake scene 4 with the judge\'s critique', mk: '2d ago · you', pages: [] },
  { id: 'm3', st: 'pending', raw: 1, src: '📄 _RAW_ · chatgpt-lighthouse-keepers.md', sc: 'External file', top: [], said: 'Saved from a browser chat: who kept the lights, and how they lived', mk: '1d ago · drop box', pages: [] },
  { id: 'm4', st: 'compiled', src: 'researcher · #e20c5b71', sc: 'Whole session', top: ['Research'], said: 'How does a Fresnel lens throw light that far?', mk: '4d ago · you', pages: ['Research/Fresnel_Lens'] },
  { id: 'm5', st: 'compiled', src: 'assistant · #4af1093c', sc: 'Turn 3', top: ['Farm'], said: 'Which free models answer today?', mk: '6d ago · agent', pages: ['Farm/Free_Model_Routes'] },
];
const STATE = { pending: ['⏳', 'waiting'], compiling: ['⚙', 'compiling'], compiled: ['✅', 'compiled'], untriaged: ['🌱', 'needs a topic'] };
const stateOf = c => c.compiling ? 'compiling' : c.st === 'pending' && !c.top.length ? 'untriaged' : c.st;
const ticked = new Set();
let mark = null, ask = false, compiling = false, compiled = false, hlRow = '';
const compilable = () => POOL.filter(c => c.st === 'pending' && !c.compiling && c.top.length);
function wikiView() {
  const n = s => POOL.filter(c => c.st === s).length;
  const ids = [...ticked].filter(id => compilable().some(c => c.id === id));
  return `<div class="ph"><h3>Wiki</h3><span>${POOL.length} mark(s) · ${n('pending')} waiting${compiling ? ' · 2 compiling' : ''} · ${n('compiled')} compiled · ${pages().length} wiki page(s) · writer: archivist</span></div>
    <p class="vs">📚 wiki <b>~/vault/00_WIKI</b> · wiki law · index.md · log.md · <span class="raw${hlRow === 'm3' ? ' hl' : ''}">📄 _RAW_ — the drop box</span> · _REF/wiki.md</p>
    <div class="wbar"><span class="seg"><b>All ${POOL.length}</b><span>⏳ Waiting ${n('pending')}</span><span>✅ Compiled ${n('compiled')}</span><span>🚫 Dropped 0</span></span><span class="fl">📄 Files 1</span></div>
    <div class="wact"><button type="button" data-w="sel" ${ids.length && !compiling ? '' : 'disabled'}>📚 Compile Selected${ids.length ? ` (${ids.length})` : ''}</button><button type="button" class="sec" data-w="all" ${compilable().length && !compiling ? '' : 'disabled'}>⚡ Compile All Pending${compilable().length ? ` (${compilable().length})` : ''}</button></div>
    ${ask ? `<div class="ask"><span>📚 Compile ${ids.length || compilable().length} selected mark(s)</span><span class="m">runs as</span><b>archivist</b><b>Claude</b><span class="m">model: default</span><span class="m">effort: default</span><span class="sp"></span><button type="button" data-w="go">▶ Start</button><button type="button" class="sec" data-w="x">Cancel</button></div>` : ''}
    <div class="wtab"><div class="th"><span></span><span>State</span><span>Source</span><span>Topics</span><span>What was said</span><span>Pages</span></div>
    ${POOL.map(c => { const s = stateOf(c), [ic, lb] = STATE[s]; const can = s === 'pending'; return `<div class="wr ${s}${c.fresh ? ' fresh' : ''}${hlRow === c.id ? ' hl' : ''}">
      <span><input type="checkbox" data-tick="${c.id}" aria-label="Select this mark" ${ticked.has(c.id) ? 'checked' : ''} ${can ? '' : 'disabled'}></span>
      <span class="st">${ic} ${lb}</span><span class="src">${esc(c.src)}<em>${c.sc}</em></span>
      <span class="tp">${c.top.length ? c.top.map(t => `<i>${t}</i>`).join('') : `<button type="button" class="seed" data-seed="${c.id}">pick a category…</button>`}</span>
      <span class="sd">${esc(c.said)}${c.note ? `<em>${esc(c.note)}</em>` : ''}<small>${c.mk}</small></span>
      <span class="pg">${c.compiling ? '<i class="run">⚙ running</i>' : c.pages.length ? c.pages.map(p => `<button type="button" data-page="${p}">${p.replace('/', ' / ')}</button>`).join('') : '—'}</span></div>`; }).join('')}</div>
    <p class="foot">${hlRow === 'm3' ? 'A .md or .txt saved from a browser chat and dropped into _RAW_ becomes a mark by itself. It waits for a topic, because nothing guesses one: pick one and it can be compiled.' : 'Pressing Compile starts one run; it writes nothing by itself. A mark closes only when the run reports the pages it wrote.'}</p>`;
}

/* ---------- the memory graph (an agent's own memory/*.md notes) ---------- */
const AGENTS = {
  showrunner: { files: ['user_profile', 'feedback_tone', 'project_last_keeper', 'reference_video_models', 'feedback_retake', 'project_channel', 'reference_premiere', 'feedback_subtitles', 'project_calendar', 'reference_vault', 'feedback_short_length', 'project_trailer'], links: [[0, 1], [2, 4], [2, 3], [2, 6], [4, 3], [5, 7], [5, 10], [5, 8], [8, 9], [0, 9], [2, 5], [7, 10], [1, 7], [6, 9]], recalled: [0, 1, 2, 3, 4, 5, 7, 8, 10], noIndex: [11] },
  editor: { files: ['user_profile', 'feedback_cuts', 'reference_ffmpeg', 'project_shorts', 'feedback_captions', 'reference_whisper', 'project_last_keeper', 'feedback_pacing'], links: [[0, 1], [1, 7], [3, 2], [3, 5], [3, 4], [6, 1], [4, 5]], recalled: [0, 1, 2, 3, 5], noIndex: [] },
  researcher: { files: ['user_profile', 'reference_archives', 'project_thesis', 'feedback_sources', 'reference_optics', 'project_keepers', 'feedback_quotes'], links: [[2, 1], [2, 3], [2, 4], [5, 1], [5, 4], [3, 6]], recalled: [0, 2, 3, 4], noIndex: [6] },
};
let agent = 'showrunner';
function graphView() {
  const A = AGENTS[agent], N = A.files.length, W = 900, H = 400, cx = W / 2, cy = H / 2, rx = W / 2 - 200, ry = H / 2 - 50;
  const deg = A.files.map((_, i) => A.links.filter(l => l[1] === i).length);
  const pos = A.files.map((_, i) => { const a = (i / N) * Math.PI * 2 - Math.PI / 2; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
  const linked = new Set(A.links.flat()), islands = A.files.filter((_, i) => !linked.has(i));
  const edges = A.links.map(([a, b]) => { const [x1, y1] = pos[a], [x2, y2] = pos[b], mx = (x1 + x2) / 2 + (cx - (x1 + x2) / 2) * 0.25, my = (y1 + y2) / 2 + (cy - (y1 + y2) / 2) * 0.25; return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`; }).join('');
  const dots = A.files.map((f, i) => { const [x, y] = pos[i], r = 6 + deg[i] * 2.2, an = x > cx + 5 ? 'start' : x < cx - 5 ? 'end' : 'middle'; const lx = x + (an === 'start' ? r + 5 : an === 'end' ? -r - 5 : 0), ly = an === 'middle' ? (y < cy ? y - r - 6 : y + r + 15) : y + 4;
    return `<g class="${A.recalled.includes(i) ? 'rc' : ''}${A.noIndex.includes(i) ? ' ni' : ''}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"><title>${f}.md · links: ${deg[i]} in · ${A.recalled.includes(i) ? 'recalled in the last 30 days' : 'not recalled in 30 days'}</title></circle><text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${an}">${f}</text></g>`; }).join('');
  const hubs = A.files.map((f, i) => [f, deg[i]]).filter(h => h[1]).sort((a, b) => b[1] - a[1]).slice(0, 3);
  return `<div class="ph"><h3>Memory Graph</h3><span>[[wikilink]] structure of each agent's memory — hubs, islands, broken targets · recall coloring from real transcripts (30d)</span></div>
    <div class="seg ags">${Object.keys(AGENTS).map(a => `<button type="button" data-agent="${a}" class="${a === agent ? 'on' : ''}">${a}</button>`).join('')}</div>
    <div class="chips"><i>${N} records</i><i class="b">${A.links.length} links</i>${islands.length ? `<i class="w">${islands.length} islands</i>` : ''}${A.noIndex.length ? `<i class="w">${A.noIndex.length} not in index</i>` : ''}<span class="tbx"><span>+ New memory</span><span>Repair index${A.noIndex.length ? ` (${A.noIndex.length})` : ''}</span><span>Shared</span><span>Distil…</span><span>Ask the fleet</span></span></div>
    <div class="mg"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Memory graph of ${agent}">${edges}${dots}</svg>
      <p class="lg"><span><i class="g"></i>recalled (30d)</span><span><i></i>not recalled</span><span><i class="y"></i>not in index</span><span><i class="l"></i>[[wikilink]]</span><span>node size = links in</span></p></div>
    <p class="foot"><b>Hubs</b> — the most linked-to notes: ${hubs.map(([f, d]) => `${f} (${d} in)`).join(' · ')}.${islands.length ? ` <b>Islands</b> — no links in or out: ${islands.join(', ')}.` : ''}</p>`;
}

/* ---------- the panel ---------- */
let tab = 'sessions', pick = -1, user = false;
const SHOW = { sessions: 'sessions', session: 'turns', search: 'search', wiki: 'wiki', graph: 'search' };
function render() {
  const top = view.scrollTop;
  view.innerHTML = { sessions: sessionsView, session: sessionView, search: searchView, wiki: wikiView, graph: graphView }[tab]();
  view.scrollTop = top;
  POOL.forEach(c => { c.fresh = false; });
}
function setTab(t) {
  if (t !== tab) view.scrollTop = 0;
  tab = t;
  for (const b of tabsEl.querySelectorAll('[data-tab]')) { const o = b.dataset.tab === t; b.classList.toggle('on', o); b.setAttribute('aria-selected', o); }
  if (t !== 'session') closeKeep();
  render(); emit('showing', SHOW[t]);
}
tabsEl.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { user = true; hlRow = ''; setTab(b.dataset.tab); } });

view.addEventListener('click', e => {
  const t = e.target;
  const row = t.closest('[data-open]'); if (row) { user = true; setTab('session'); return; }
  const f = t.closest('[data-fold]'); if (f) { user = true; if (+f.dataset.fold === 3) { open4 = !open4; render(); } return; }
  const sh = t.closest('[data-show]'); if (sh) { user = true; show = sh.dataset.show; open4 = true; render(); return; }
  const k = t.closest('[data-keep]'); if (k) { user = true; openKeep(+k.dataset.keep); return; }
  const m = t.closest('[data-mode]'); if (m) { user = true; smode = m.dataset.mode; render(); return; }
  const a = t.closest('[data-agent]'); if (a) { user = true; agent = a.dataset.agent; render(); return; }
  const s = t.closest('[data-seed]'); if (s) { user = true; const c = POOL.find(x => x.id === s.dataset.seed); c.top = ['Research']; c.note = 'what their days were like'; hlRow = ''; render(); return; }
  const p = t.closest('[data-page]'); if (p) { user = true; openPage(p.dataset.page); return; }
  const w = t.closest('[data-w]'); if (w && !w.disabled) { user = true; wiki(w.dataset.w); }
});
view.addEventListener('change', e => { const c = e.target.closest('[data-tick]'); if (c) { user = true; c.checked ? ticked.add(c.dataset.tick) : ticked.delete(c.dataset.tick); render(); } });
view.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-open]')) { e.preventDefault(); user = true; setTab('session'); } });
view.addEventListener('submit', e => { e.preventDefault(); });
view.addEventListener('input', e => { if (e.target.id === 'me-q') { user = true; q = e.target.value; const c = e.target.selectionStart; render(); const i = $('q'); i.focus(); i.setSelectionRange(c, c); } });

/* ---------- keep for the wiki ---------- */
const TOPICS = ['Film', 'Studio', 'Research', 'Farm'];
let kp = null;
function keepHtml() {
  if (kp.done) return `<div class="kh"><b>Keep for the wiki</b></div><p class="done">✓ ${kp.done} · ${compilable().length} waiting to be compiled</p>`;
  const turn = kp.scope === 'turn';
  return `<div class="kh"><b>Keep for the wiki</b><button type="button" class="x" data-k="x" aria-label="Close, nothing is saved">✕</button></div>
    <div class="ksc">${kp.turn ? `<button type="button" data-k="turn" class="${turn ? 'on' : ''}"><b>This turn (${kp.turn})</b><em>Turn ${kp.turn} of 6</em></button>` : ''}<button type="button" data-k="all" class="${kp.scope === 'all' ? 'on' : ''}"><b>Whole session</b><em>Whole session (6 turns)</em></button><button type="button" data-k="range" class="${kp.scope === 'range' ? 'on' : ''}"><b>Range</b><em>Pick a span: the first turn, then the last.</em></button></div>
    ${kp.turn && turn ? `<p class="kl">${esc(TURNS[kp.turn - 1][0])}</p>` : ''}
    <p class="kq">what is it about?</p>
    <div class="kt">${TOPICS.map(t => `<button type="button" data-kt="${t}" class="${kp.top.includes(t) ? 'on' : ''}">${t}</button>`).join('')}<span class="kn">+ a new one</span></div>
    <input id="me-kn" value="${esc(kp.note)}" placeholder="why it is worth keeping (optional)" aria-label="Why it is worth keeping">
    <div class="kf"><span>Nothing is written to the vault — it lands in the candidate pool.</span><button type="button" data-k="go" ${kp.top.length ? '' : 'disabled'}>Keep it</button></div>`;
}
function drawKeep() { keepEl.innerHTML = keepHtml(); }
function openKeep(turn) {
  kp = { turn, scope: turn ? 'turn' : 'all', top: mark ? [...mark.top] : [], note: mark ? mark.note : '' };
  keepEl.hidden = false; drawKeep();
}
function closeKeep() { kp = null; keepEl.hidden = true; }
function keepIt() {
  const sc = kp.scope === 'turn' ? `Turn ${kp.turn}` : kp.scope === 'all' ? 'Whole session' : 'Turns 3–4';
  const said = kp.scope === 'turn' ? TURNS[kp.turn - 1][0] : 'Storm shots keep losing the beam';
  let m = POOL.find(c => c.id === 'm1');
  if (!m) { m = { id: 'm1', st: 'pending', src: 'showrunner · #7c41e2a0', mk: 'just now · you', pages: [], fresh: true }; POOL.unshift(m); ticked.add('m1'); ticked.add('m2'); }
  Object.assign(m, { sc, said, top: [...kp.top], note: kp.note });
  mark = { turn: kp.scope === 'turn' ? kp.turn : 0, top: [...kp.top], note: kp.note };
  kp.done = `Kept — ${sc.toLowerCase()}, filed under ${kp.top.join(' · ')}`;
  drawKeep(); render();
  setTimeout(() => { if (kp && kp.done) closeKeep(); }, reduce ? 1200 : 2200);
}
keepEl.addEventListener('click', e => {
  if (!kp || kp.done) return;
  user = true;
  const t = e.target.closest('[data-kt]');
  if (t) { const v = t.dataset.kt; kp.top = kp.top.includes(v) ? kp.top.filter(x => x !== v) : [...kp.top, v]; drawKeep(); return; }
  const k = e.target.closest('[data-k]'); if (!k) return;
  const a = k.dataset.k;
  if (a === 'x') closeKeep();
  else if (a === 'go') keepIt();
  else { kp.scope = a; drawKeep(); }
});
keepEl.addEventListener('input', e => { if (e.target.id === 'me-kn' && kp) kp.note = e.target.value; });

/* ---------- compile ---------- */
async function wiki(a) {
  if (a === 'sel' || a === 'all') { if (a === 'all') compilable().forEach(c => ticked.add(c.id)); ask = true; render(); return; }
  if (a === 'x') { ask = false; render(); return; }
  if (a !== 'go' || compiling) return;
  ask = false; compiling = true;
  const run = compilable().filter(c => ticked.has(c.id));
  run.forEach(c => { c.compiling = true; });
  render();
  await sleep(3200);
  // _REF/wiki.md: a concept gets its own page once two sessions speak of it; one session alone is filed as a source
  // on the page it belongs to. The storm turn and the retake session are two, so they make "Storm Scenes".
  const storm = run.filter(c => c.id === 'm1' || c.id === 'm2'), raw = run.find(c => c.id === 'm3');
  let wrote = '';
  if (storm.length === 2) {
    const cat = (run.find(c => c.id === 'm1').top[0]) || 'Film';
    wrote = `${cat}/Storm_Scenes`;
    P[wrote] = [`${cat.toLowerCase()}, storm-scenes`, ...STORM];
    addLog('Storm Scenes'); compiled = wrote;
  } else if (storm.length) {
    wrote = 'Film/Retake_With_Critique';
    P[wrote][4].push(storm[0].id === 'm1' ? '[2026-10-11] Session: `7c41e2a0` (Turn 4)' : '[2026-10-09] Session: `b93f0d17` (Turns 2–5)');
    addLog('Retake With Critique');
  }
  storm.forEach(c => { c.pages = [wrote]; });
  if (raw) { P['Research/Lighthouse_Keepers'][4].push('[2026-10-11] External source: [[_RAW_/_DONE_/chatgpt-lighthouse-keepers.md]]'); raw.pages = ['Research/Lighthouse_Keepers']; addLog('Lighthouse Keepers'); }
  run.forEach(c => { c.compiling = false; c.st = 'compiled'; ticked.delete(c.id); });
  compiling = false;
  if (tab === 'wiki') render();
  await openPage(wrote || 'Research/Lighthouse_Keepers', true);
}

/* ---------- the vault ---------- */
const P = {
  'Film/The_Last_Keeper': ['film, the-last-keeper', 'The Last Keeper', 'A six-scene short about the last lighthouse keeper, made in the Studio.', 'Scenes are made by a video model and checked by the [[Vision_Judge]] against each step\'s criteria. Research for it lives in [[Lighthouse_Keepers]].', ['[2026-10-04] Session: `61d0a9e2` (Turns 1–3)']],
  'Film/Retake_With_Critique': ['film, retake', 'Retake With Critique', 'A take that fails the vision check is made again with the judge\'s note added to its prompt.', 'The critique is the judge\'s own words; nothing else in the step changes. See [[Vision_Judge]]. Used for every scene of [[The_Last_Keeper]].', ['[2026-10-06] Session: `3f9b21c8` (Turn 5)']],
  'Studio/Vision_Judge': ['studio, vision-judge', 'Vision Judge', 'A vision model checks every shot of a step that has criteria, and answers PASS or FAIL with a note.', 'A FAIL is made again with the note: [[Retake_With_Critique]]. Shots that pass wait in Triage for a person to keep or drop.', ['[2026-10-02] Session: `2be81f47` (Turn 6)']],
  'Studio/Long_To_Shorts': ['studio, recipes', 'Long To Shorts', 'A ready-made recipe: one long video in, subtitled vertical shorts out.', 'Its steps: extract the sound, transcript, pick the moments, cut the shorts, final check. Subtitles: [[Vertical_Subtitles]]. Started by a watch trigger behind the [[Gatekeeper]].', ['[2026-09-28] Session: `0d7c3e15` (Turns 2–4)']],
  'Studio/Vertical_Subtitles': ['studio, subtitles', 'Vertical Subtitles', 'Burned-in subtitles for 9:16 shorts sit in the lower third, two lines at most.', 'Set in the cut step of [[Long_To_Shorts]].', ['[2026-09-29] Session: `a41f6b02` (Turn 2)']],
  'Research/Fresnel_Lens': ['research, optics', 'Fresnel Lens', 'Rings of glass that bend a lamp\'s light into one flat beam, so little of it is lost.', 'Why a keeper\'s small flame could be seen far out at sea; see [[Lighthouse_Keepers]].', ['[2026-10-07] Session: `e20c5b71` (whole session)']],
  'Research/Lighthouse_Keepers': ['research, history', 'Lighthouse Keepers', 'The people who kept the lights burning, and how their nights went.', 'The lamp, the logbook and the watch; background for [[The_Last_Keeper]]. The optics: [[Fresnel_Lens]].', ['[2026-10-03] Session: `9e04b7c3` (Turns 1–4)']],
  'Farm/Session_Limits': ['farm, limits', 'Session Limits', 'A run stopped by a session limit waits and tries again by itself.', 'Free routes are a way round a full account: [[Free_Model_Routes]].', ['[2026-09-30] Session: `5f2a8c90` (Turn 1)']],
  'Farm/Free_Model_Routes': ['farm, routes', 'Free Model Routes', 'Which free models answer today, checked every morning and added as routes.', 'A route only serves Claude Code and OpenCode. When accounts are full: [[Session_Limits]].', ['[2026-10-05] Session: `4af1093c` (Turn 3)']],
  'Farm/Gatekeeper': ['farm, gatekeeper', 'Gatekeeper', 'Before a trigger wakes anyone, a model that only decides says whether there is real work.', 'It guards the watch trigger of [[Long_To_Shorts]].', ['[2026-10-06] Session: `c03e7d51` (Turns 2–3)']],
};
const STORM = ['Storm Scenes', 'A storm shot passes the vision check only when the lamp\'s beam is in frame; say so in the prompt.', 'The [[Vision_Judge]] failed scene 4 of [[The_Last_Keeper]] because the beam was missing and the lantern dark. The retake added one line, "one rotating beam, visible through rain", and passed; same model, same length. The method is [[Retake_With_Critique]].', ['[2026-10-11] Session: `7c41e2a0` (Turn 4)', '[2026-10-09] Session: `b93f0d17` (Turns 2–5)']];
const REPORT = 'Reports/AgentFarm-Report-2026-W41';
const LOG = ['## [2026-10-03] compile | Lighthouse Keepers', '## [2026-10-07] compile | Fresnel Lens'];
function addLog(t) { LOG.push(`## [2026-10-11] compile | ${t}`); }
const pages = () => Object.keys(P);
let cur = 'Film/Retake_With_Critique', vmode = 'page', fresh = '', opened = { '00_WIKI': 1, Film: 1, Studio: 1, Research: 0, Farm: 0, _RAW_: 0, Reports: 0 };
const link = s => esc(s).replace(/\[\[([^\]]+)\]\]/g, (_, n) => { const k = pages().find(p => p.endsWith('/' + n)); return k ? `<button type="button" class="wl" data-go="${k}">${n}</button>` : `<span class="wl dead">${n}</span>`; });
function noteHtml(k, lines = Infinity) {
  if (k === REPORT) return `<pre class="fm">---\ngenerated: 2026-10-12 06:00\n---</pre><h4>Agent Farm — Fleet Report (2026-10-12)</h4><p>Period: last <b>7 days</b> · generated by Agent Farm · costs are worked out from your own transcripts.</p><h5>Fleet totals</h5><p>Sessions: <b>212</b> · Cost: <b>$61.40</b> · Tokens: <b>1.08B</b></p><h5>Agent comparison</h5><table><tr><th>Agent</th><th>Sessions</th><th>Cost</th><th>Err %</th></tr><tr><td>developer</td><td>64</td><td>$41.30</td><td>2.1</td></tr><tr><td>showrunner</td><td>38</td><td>$9.85</td><td>0.8</td></tr><tr><td>researcher</td><td>29</td><td>$0.00</td><td>0.0</td></tr><tr><td>editor</td><td>22</td><td>$6.10</td><td>1.4</td></tr></table><h5>Health findings</h5><p>- No findings — healthy fleet. 🌿</p>`;
  if (k === '00_WIKI/log') return `<h4>log</h4>${LOG.map(l => `<p class="lg">${esc(l)}</p>`).join('')}`;
  if (k === '00_WIKI/index') return `<h4>index</h4>${['Film', 'Studio', 'Research', 'Farm'].map(c => `<h5>${c}</h5>${pages().filter(p => p.startsWith(c + '/')).map(p => `<p>- ${link(`[[${p.split('/')[1]}]]`)} — ${esc(P[p][2])}</p>`).join('')}`).join('')}`;
  if (k.startsWith('_RAW_/')) return `<h4>chatgpt-lighthouse-keepers</h4><p class="dim">Saved from a browser chat and dropped into _RAW_. It became a mark in the Wiki pool by itself and waits for a topic.</p>`;
  const [tags, title, sum, det, src] = P[k];
  const parts = [`<pre class="fm">---\ntags: [${tags}]\nupdated: ${src[0].slice(1, 11)}\n---</pre>`, `<h4>${title}</h4>`, `<p><b>Summary:</b> ${esc(sum)}</p>`, '<h5>Details</h5>', `<p>${link(det)}</p>`, '<h5>Sources</h5>', ...src.map(s => `<p class="src">- ${esc(s).replace(/`([^`]+)`/g, '<code>$1</code>')}</p>`)];
  return parts.slice(0, lines).join('');
}
function treeHtml() {
  const f = (name, kids, depth) => `<button type="button" class="fd" data-fd="${name}" style="--d:${depth}">${opened[name] ? '▾' : '▸'} ${name}</button>${opened[name] ? kids : ''}`;
  const file = (k, label, depth) => `<button type="button" class="fi${cur === k ? ' on' : ''}${fresh === k ? ' new' : ''}" data-go="${k}" style="--d:${depth}">${label}</button>`;
  const cat = c => f(c, pages().filter(p => p.startsWith(c + '/')).map(p => file(p, p.split('/')[1], 2)).join(''), 1);
  return f('00_WIKI', ['Film', 'Studio', 'Research', 'Farm'].map(cat).join('') + file('00_WIKI/index', 'index', 1) + file('00_WIKI/log', 'log', 1), 0)
    + f('_RAW_', POOL.find(c => c.id === 'm3').st === 'compiled' ? '<span class="fi" style="--d:1">_DONE_ · chatgpt-lighthouse-keepers</span>' : file('_RAW_/chatgpt-lighthouse-keepers', 'chatgpt-lighthouse-keepers', 1), 0)
    + f('Reports', file(REPORT, 'AgentFarm-Report-2026-W41', 1), 0);
}
function drawVault() {
  treeEl.innerHTML = treeHtml();
  crumb.textContent = cur.startsWith('Reports/') || cur.startsWith('_RAW_/') ? cur.replace('/', ' / ') : cur.startsWith('00_WIKI/') ? cur.replace('/', ' / ') : `00_WIKI / ${cur.replace('/', ' / ')}`;
  noteEl.innerHTML = noteHtml(cur);
  graphEl.innerHTML = vmode === 'graph' ? wikiGraph() : '';
  noteEl.hidden = vmode !== 'page'; graphEl.hidden = vmode !== 'graph'; crumb.hidden = vmode !== 'page';
  for (const b of document.querySelectorAll('#me-vault [data-v]')) { const o = b.dataset.v === vmode; b.classList.toggle('on', o); b.setAttribute('aria-checked', o); }
}
async function openPage(k, write) {
  cur = k; vmode = 'page';
  const c = k.split('/')[0]; if (c in opened) opened[c] = 1; if (P[k]) opened['00_WIKI'] = 1;
  if (k === REPORT) opened.Reports = 1;
  emit('showing', k === REPORT ? 'reports' : 'obsidian');
  if (!write || reduce) { if (write) fresh = k; drawVault(); return; }
  fresh = k; drawVault();
  for (let n = 1; n <= 9; n++) { if (cur !== k) return; noteEl.innerHTML = noteHtml(k, n) + '<span class="caret"></span>'; await sleep(420); }
  noteEl.innerHTML = noteHtml(k);
}
treeEl.addEventListener('click', e => {
  const d = e.target.closest('[data-fd]'); if (d) { user = true; opened[d.dataset.fd] ^= 1; drawVault(); return; }
  const g = e.target.closest('[data-go]'); if (g) { user = true; openPage(g.dataset.go); }
});
noteEl.addEventListener('click', e => { const g = e.target.closest('[data-go]'); if (g) { user = true; openPage(g.dataset.go); } });
document.querySelector('#me-vault .vseg').addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) { user = true; vmode = b.dataset.v; drawVault(); emit('showing', 'obsidian'); } });

/* the vault's graph, as Obsidian draws it: one dot a page, a line a [[link]] */
const GP = { Session_Limits: [300, 36], Free_Model_Routes: [350, 100], Fresnel_Lens: [70, 60], Retake_With_Critique: [215, 110], The_Last_Keeper: [120, 190], Vision_Judge: [330, 200], Storm_Scenes: [225, 262], Lighthouse_Keepers: [70, 300], Long_To_Shorts: [300, 330], Gatekeeper: [170, 395], Vertical_Subtitles: [350, 405] };
const gp = k => GP[k.split('/')[1]];
const CC = { Film: 'f', Studio: 's', Research: 'r', Farm: 'm' };
function wikiGraph() {
  const ks = pages(), E = [];
  for (const k of ks) for (const m of P[k][3].matchAll(/\[\[([^\]]+)\]\]/g)) { const t = ks.find(p => p.endsWith('/' + m[1])); if (t && !E.some(e => e.includes(k) && e.includes(t))) E.push([k, t]); }
  const deg = k => E.filter(e => e.includes(k)).length;
  return `<svg viewBox="0 0 420 440" role="img" aria-label="Graph of the wiki pages">${E.map(([a, b]) => `<line class="${a === fresh || b === fresh ? 'nw' : ''}" x1="${gp(a)[0]}" y1="${gp(a)[1]}" x2="${gp(b)[0]}" y2="${gp(b)[1]}"/>`).join('')}
    ${ks.map(k => { const [x, y] = gp(k), r = 5 + deg(k) * 1.6; return `<g class="gn ${CC[k.split('/')[0]]}${k === fresh ? ' nw' : ''}${k === cur ? ' cur' : ''}" data-go="${k}" role="button" tabindex="0" aria-label="${k.split('/')[1].replace(/_/g, ' ')}"><circle cx="${x}" cy="${y}" r="${r}"/><text x="${x}" y="${y + r + 13}">${k.split('/')[1].replace(/_/g, ' ')}</text></g>`; }).join('')}</svg>
    <p class="gl"><span class="f">Film</span><span class="s">Studio</span><span class="r">Research</span><span class="m">Farm</span><em>${ks.length} pages · ${E.length} links</em></p>`;
}
graphEl.addEventListener('click', e => { const g = e.target.closest('[data-go]'); if (g) { user = true; openPage(g.dataset.go); } });

/* the chapter VI tiles */
on('feature', id => {
  const f = {
    sessions: () => setTab('sessions'),
    turns: () => { open4 = true; setTab('session'); },
    wiki: () => { hlRow = ''; setTab('wiki'); },
    dropbox: () => { hlRow = 'm3'; setTab('wiki'); opened._RAW_ = 1; drawVault(); },
    search: () => setTab('search'),
    obsidian: () => { vmode = 'page'; openPage(compiled || 'Film/Retake_With_Critique'); },
    reports: () => openPage(REPORT),
  }[id];
  if (f) { user = true; f(); }
});

/* first sight: keep a turn, compile it, watch the page and the graph */
setTab('sessions'); drawVault();
let started = false;
const io = new IntersectionObserver(async es => {
  if (started || !es.some(e => e.isIntersecting)) return;
  started = true; io.disconnect();
  if (reduce) return;
  const go = async ms => { await hold(ms); return !user; };
  if (!await go(1400)) return;
  pick = 0; render();
  if (!await go(900)) return;
  pick = -1; setTab('session');
  if (!await go(1200)) return;
  const t4 = view.querySelector('.t4'); if (t4) view.scrollTop = t4.offsetTop - 60;
  if (!await go(700)) return;
  openKeep(4);
  if (!await go(1000)) return;
  kp.top = ['Film']; drawKeep();
  for (const ch of 'the one prompt line that fixed the storm retake') { if (user || !kp) return; kp.note += ch; const i = $('kn'); if (i) i.value = kp.note; await sleep(30); }
  if (!await go(600)) return;
  keepIt();
  if (!await go(2600)) return;
  setTab('wiki');
  if (!await go(1300)) return;
  ask = true; render();
  if (!await go(1500)) return;
  await wiki('go');
  if (!await go(4200)) return;
  vmode = 'graph'; drawVault();
}, { threshold: 0.25 });
io.observe($('panel'));
