// District VI, Never forgets: one figure per feature, each a small rebuilt screen with demo data. Elements carry
// data-from (scripts/district.js shows them by step); step(i) moves the rest. The rules are the extension's own
// (data/deep/memory.js cites them): every engine in one Sessions table, 🧑 and 🤖, the sort that rebuilds the top rows,
// an id or its 8 characters, the right-click; a session folded to its turns, the Show filter, Replay's 5-second cap
// and 1×–8×, Export MD's two questions, the Turns page; marking that writes nothing, turn ranges, one compile run with
// its strip, one concept to a page with its sources and a dated supersede, claims that return, Lint that only reports;
// _RAW_, its RAW badge, _RAW_/_DONE_; facts in the vault and methods with the agents, one character per tick, a write
// refused, ${vault}; the shared grammar, results to the exact message, Meaning's boundary, Find session ID; recall
// counts, a file born with its index line, contradictions, a distill diff, the Memory Graph; extraClaudeDirs and ⇄;
// the fleet report, cache efficiency, autoReport's file names, task outputs and ⛔.
// Agents, sessions, pages, files and figures are demo data. Today is Mon Oct 12.

const $$ = (fv, s) => [...fv.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ENG = { Claude: '', Codex: 'x', Antigravity: 'a', OpenCode: 'o', Gemini: 'g' };
const eng = e => `<span class="eng ${ENG[e]}">${e}</span>`;

/* two or more buttons, one pressed */
const seg = (label, cls, opts, on = 0) =>
  `<div class="seg ${cls}" role="group" aria-label="${label}">${opts.map((o, k) => `<button type="button" aria-pressed="${k === on}"${k === on ? ' class="on"' : ''}>${o}</button>`).join('')}</div>`;
function onSeg(el, fn) {
  const bs = [...el.querySelectorAll('button')];
  const set = k => { bs.forEach((b, j) => { b.classList.toggle('on', j === k); b.setAttribute('aria-pressed', String(j === k)); }); fn(k); };
  bs.forEach((b, k) => b.addEventListener('click', () => set(k)));
  return set;
}

export default {
  /* VI·1 one table for every engine: who started it, a sort that rebuilds the top, an id found, the right-click */
  sessions(fv) {
    const R = [
      ['🤖', 'showrunner', 'Claude', 'Storm shots keep losing the beam', '2h', 6, '61k', 0.84, 1],
      ['🧑', 'editor', 'Codex', 'Retake scene 4 with the critique', '2d', 5, '212k', 0.31, 0],
      ['🧑', 'researcher', 'Gemini', 'How does a Fresnel lens throw light so far?', '4d', 14, '388k', 0, 0],
      ['🤖', 'archivist', 'Claude', 'Back up the agent repo', '21h', 1, '9k', 0.04, 0],
      ['🧑', 'developer', 'Antigravity', 'Citation export breaks on umlauts', '3d', 26, '540k', 0, 0],
      ['🧑', 'developer', 'OpenCode', 'Tidy the bibliography script', '3d', 3, '41k', 0, 0],
      ['🤖', 'manager', 'Claude', 'Mission: weekly channel rhythm', '6d', 7, '120k', 0.62, 0],
    ];
    const W = { '2h': 2, '21h': 21, '2d': 48, '3d': 72, '4d': 96, '6d': 144 };
    fv.innerHTML = `
      <div class="hd"><b>Sessions</b><span>1,499 sessions on this machine · demo</span></div>
      <div class="ctl" data-from="1">${seg('Started by', 'by', ['🧑 You', 'All'], 1)}<span class="sb" data-from="2">Sort by ${seg('Sort', 'srt', ['Recent', 'Cost', 'Turns'])}</span></div>
      <div class="tb"></div>
      <p class="cn" aria-live="polite"></p>
      <div class="fd" data-from="3"><input aria-label="Session id or its first 8 characters" value="b93f0d17"><button type="button" class="gh fi">🔑 Find session ID…</button><span class="fr" aria-live="polite"></span></div>
      <div class="mn" data-from="4"><p class="lb">Right-click · Retake scene 4 with the critique</p><p class="mi"><button type="button" data-a="rn">✎ Rename…</button><button type="button" data-a="pn">📌 Pin</button><button type="button" data-a="lb">🏷 Label…</button><button type="button" data-a="pj">📁 File to project…</button><button type="button" data-a="rs">⏵ Resume in Console</button></p><p class="mo" aria-live="polite">The same menu acts on every row you selected.</p></div>`;
    let by = 1, srt = 0, pin = false, name = '', open = -1;
    const tb = fv.querySelector('.tb'), cn = fv.querySelector('.cn');
    const draw = () => {
      let rows = R.map((r, k) => ({ r, k })).filter(({ r }) => by || r[0] === '🧑');
      rows.sort((a, b) => srt === 1 ? b.r[7] - a.r[7] : srt === 2 ? b.r[5] - a.r[5] : W[a.r[4]] - W[b.r[4]]);
      if (pin) rows.sort((a, b) => (b.k === 1) - (a.k === 1));
      tb.innerHTML = `<p class="th"><span>By</span><span>Agent</span><span>Engine</span><span>Title</span><span>When</span><span>Turns</span><span>Cost</span></p>` + rows.map(({ r, k }) => `
        <p class="sr${k === 1 ? ' me' : ''}${open === k ? ' op' : ''}" data-k="${k}"><span>${r[0]}</span><span class="ag">${r[8] ? '<i class="dot" title="active now"></i>' : ''}${r[1]}</span><span>${eng(r[2])}</span><span class="tt"><button type="button" class="fo" aria-label="Unfold its turns">${open === k ? '▾' : '▸'}</button>${k === 1 && pin ? '★ ' : ''}${k === 1 && name ? name : r[3]}</span><span>${r[4]}</span><span class="n">${r[5]}</span><span class="n${r[7] ? '' : ' z'}">$${r[7].toFixed(2)}</span></p>
        ${open === k ? `<p class="tf">${Array.from({ length: Math.min(r[5], 3) }, (_, t) => `<span>Turn ${t + 1}/${r[5]} · ${[18, 41, 9][t]}k tok · $${(r[7] / 3).toFixed(2)}</span>`).join('')}</p>` : ''}`).join('');
      cn.textContent = `${rows.length}/1,499 sessions · ${by ? 'everyone' : 'yours'} · ${['newest first', 'most expensive first', 'longest first'][srt]}`;
      $$(fv, '.sr .fo').forEach(b => b.addEventListener('click', () => { const k = +b.closest('.sr').dataset.k; open = open === k ? -1 : k; draw(); }));
    };
    onSeg(fv.querySelector('.by'), k => { by = k; draw(); });
    onSeg(fv.querySelector('.srt'), k => { srt = k; draw(); });
    const fr = fv.querySelector('.fr'), fin = fv.querySelector('.fd input');
    fv.querySelector('.fi').addEventListener('click', () => {
      const q = fin.value.trim().toLowerCase();
      fr.innerHTML = q.length >= 4 && 'b93f0d17'.startsWith(q.slice(0, 8)) ? `<b>b93f0d17</b> · editor · ${eng('Codex')} · opened` : q.length < 4 ? 'Give at least 4 characters.' : 'No session starts with that.';
    });
    const mo = fv.querySelector('.mo');
    $$(fv, '.mi button').forEach(b => b.addEventListener('click', () => {
      const a = b.dataset.a;
      if (a === 'rn') { name = name ? '' : 'My retake notes'; mo.textContent = name ? 'Renamed. The transcript file is untouched; an empty name brings the old title back.' : 'Name cleared: the title comes from the conversation again.'; }
      if (a === 'pn') { pin = !pin; b.textContent = pin ? '📌 Unpin' : '📌 Pin'; mo.textContent = pin ? 'On your shelf: listed first, whatever the row limit.' : 'Off the shelf.'; }
      if (a === 'lb') mo.textContent = 'Labels: retake, lighting.';
      if (a === 'pj') mo.textContent = 'Filed to the project The last keeper.';
      if (a === 'rs') mo.textContent = 'Resumed in the Console on Codex, the engine it ran on, never handed to another.';
      draw();
    }));
    draw();
    return { step(i) { if (i === 2 && open < 0) { open = 0; draw(); } } };
  },

  /* VI·2 a session folded to its turns, the Show filter, Replay, Export MD's question, the Turns page */
  turns(fv) {
    const T = [
      ['Scene 4 failed the vision check again. Read me the judge\'s note.', '162k · $0.05', 'opus'],
      ['Compare the failed take with what the step asked for.', '475k · $0.14', 'opus'],
      ['Make it again with the critique in the prompt.', '410k · $0.21', 'sonnet'],
      ['It passed. What exactly changed?', '581k · $0.17', 'sonnet'],
    ];
    const M = [['u', '🧑', 'It passed. What exactly changed?'], ['a', '🤖', 'Comparing the two prompts and the judge\'s notes.'], ['t', '⌘', 'Read takes/scene4-v2.json'], ['r', '↩', '{ "verdict": "pass", "beam": "visible 100%" }'], ['t', '⌘', 'Bash ffprobe takes/scene4-v2.mp4'], ['e', '⚠', 'ffprobe: not found'], ['a', '🤖', 'One line changed: "one rotating beam, visible through rain".']];
    const SH = { All: 'uatre', Dialog: 'ua', '🧑 User': 'u', '🤖 Agent': 'a', '🔧 Tool calls': 't', '📄 Results': 'r', '⚠ Errors': 'e' };
    fv.innerHTML = `
      <div class="hd"><b>Storm shots keep losing the beam</b>${eng('Claude')}<span>🤖 showrunner · 7c41e2a0 · demo</span></div>
      <ol class="bands">${T.map(([p, m, md], k) => `<li data-k="${k}"><button type="button" class="bn" title="Turn started · 12 Oct 2026, 14:${String(10 + k * 4).padStart(2, '0')}"><i>▸</i><b>Turn ${k + 1}/6</b><span>${p}</span><em>${m} · ${md}</em></button></li>`).join('')}</ol>
      <div class="sw" data-from="1">${seg('Show', 'shw', Object.keys(SH), 1)}</div>
      <ol class="ms"></ol>
      <div class="rp" data-from="2"><button type="button" class="gh pl">▶ Replay</button>${seg('Speed', 'spd', ['1×', '2×', '4×', '8×'])}<button type="button" class="gh ne">⚠ next error</button><button type="button" class="gh np">💬 next prompt</button><span class="pos" aria-live="polite"></span></div>
      <div class="ex" data-from="3"><p class="lb">⬇ Export MD · what to include?</p>${seg('Export', 'exs', ['Current view', 'Everything'])}<p class="fn"></p></div>
      <div class="tp" data-from="4"><p class="lb">Turns · every turn in the farm</p>${seg('Sort', 'tsr', ['Recent', 'Cost', 'Errors'])}<div class="tr2"></div><p class="to" aria-live="polite"></p></div>`;
    let openK = -1, show = 'Dialog', pos = -1, timer = 0, speed = 1;
    const ms = fv.querySelector('.ms');
    const drawM = () => {
      const kinds = SH[show];
      ms.innerHTML = openK === 3 ? M.map((m, k) => kinds.includes(m[0]) ? `<li class="${m[0]}${k === pos ? ' cur' : ''}"><b>${m[1]}</b>${m[2]}</li>` : '').join('') || '<li class="z">Nothing of that kind in this turn.</li>' : `<li class="z">${openK < 0 ? 'Folded: the session opens as this list of turns. Open turn 4.' : `Turn ${openK + 1} open. Turn 4 has the answer.`}</li>`;
    };
    const drawB = () => { $$(fv, '.bands li').forEach(li => { const on = +li.dataset.k === openK; li.classList.toggle('op', on); li.querySelector('i').textContent = on ? '▾' : '▸'; }); drawM(); };
    $$(fv, '.bn').forEach(b => b.addEventListener('click', () => { const k = +b.parentNode.dataset.k; openK = openK === k ? -1 : k; drawB(); }));
    onSeg(fv.querySelector('.shw'), k => { show = Object.keys(SH)[k]; pos = -1; drawM(); });
    const posEl = fv.querySelector('.pos');
    const stop = () => { clearInterval(timer); timer = 0; fv.querySelector('.pl').textContent = '▶ Replay'; };
    const go = p => { openK = 3; pos = Math.min(p, M.length - 1); drawB(); posEl.textContent = `step ${pos + 1}/${M.length} · gaps capped at 5 s · ${speed}×`; };
    fv.querySelector('.pl').addEventListener('click', () => {
      if (timer) return stop();
      const p0 = pos; fv.querySelectorAll('.shw button')[0].click(); go(p0 < 0 || p0 >= M.length - 1 ? 0 : p0 + 1);
      fv.querySelector('.pl').textContent = '⏸ Pause';
      timer = setInterval(() => { if (pos >= M.length - 1) return stop(); go(pos + 1); }, reduce ? 300 : 1400 / speed);
    });
    onSeg(fv.querySelector('.spd'), k => { speed = [1, 2, 4, 8][k]; if (timer) { stop(); fv.querySelector('.pl').click(); } });
    fv.querySelector('.ne').addEventListener('click', () => { stop(); fv.querySelectorAll('.shw button')[0].click(); go(M.findIndex(m => m[0] === 'e')); });
    fv.querySelector('.np').addEventListener('click', () => { stop(); fv.querySelectorAll('.shw button')[0].click(); go(0); });
    const fn = fv.querySelector('.fn');
    onSeg(fv.querySelector('.exs'), k => { fn.innerHTML = k ? '<code>session-7c41e2a0-2026-10-12_143522.md</code> · the whole transcript, filters ignored' : `<code>session-7c41e2a0-2026-10-12_143522.md</code> · what you see: ${show}, folded turns left out, 1/6 turns ticked`; })(0);
    const TT = [['showrunner', 'Claude', 'It passed. What exactly changed?', '4/6', 0.17, 0, '2h'], ['editor', 'Codex', 'Retake scene 4 with the critique', '2/5', 0.09, 1, '2d'], ['developer', 'OpenCode', 'Why does the bibliography sort Ö last?', '1/3', 0, 2, '3d'], ['researcher', 'Gemini', 'Is 1.2 m the right focal length?', '9/14', 0, 0, '4d']];
    const tr2 = fv.querySelector('.tr2'), to = fv.querySelector('.to');
    const drawT = s => {
      const rows = [...TT].sort((a, b) => s === 1 ? b[4] - a[4] : s === 2 ? b[5] - a[5] : 0);
      tr2.innerHTML = rows.map(r => `<button type="button" class="trw"><span>${r[0]}</span>${eng(r[1])}<span class="p">${r[2]}</span><em>${r[3]}</em><em>${r[5] ? `⚠ ${r[5]}` : ''}</em><em>$${r[4].toFixed(2)}</em></button>`).join('');
      $$(fv, '.trw').forEach((b, k) => b.addEventListener('click', () => { to.innerHTML = `Opens <b>${rows[k][0]}</b>'s session at turn ${rows[k][3].split('/')[0]}.`; }));
    };
    onSeg(fv.querySelector('.tsr'), drawT)(0);
    drawB();
    return { step(i) { stop(); if (i >= 1 && openK !== 3) { openK = 3; drawB(); } if (i === 0) { openK = -1; pos = -1; drawB(); } } };
  },

  /* VI·3 a mark that writes nothing, a turn range, one compile run with its strip, the page it writes, nothing locked */
  wiki(fv) {
    const TOP = ['Film', 'Lighting', 'Judges'];
    fv.innerHTML = `
      <div class="hd"><b>📚 Wiki</b><span>vault · 00_AGENT_AREA/00_WIKI · demo</span></div>
      <div class="mk"><p class="tl"><button type="button" class="bk" aria-label="Add to wiki candidates">🔖</button><b>Turn 4/6</b><span>It passed. What exactly changed?</span></p>
        <div class="pop"><p><span>Turns</span><input aria-label="Turn range" value="4"></p><p class="tp">${TOP.map((t, k) => `<button type="button" class="${k < 2 ? 'on' : ''}" aria-pressed="${k < 2}">${t}</button>`).join('')}<button type="button" class="nw">+ Start category</button></p><p class="mr" aria-live="polite"></p></div></div>
      <div class="ts" data-from="1"><p class="lb">Turn scope · 7c41e2a0</p><p class="tz">${[1, 2, 3, 4, 5, 6].map(n => `<button type="button" data-n="${n}" class="${n === 4 ? 'on' : ''}">${n}</button>`).join('')}<button type="button" class="gh wh">Whole session</button></p><p class="tn">1 hello, 6 the commit: left out unless you take them.</p></div>
      <div class="cs" data-from="2"><p class="btn2"><button type="button" class="gh c1">📚 Compile Selected (2)</button><button type="button" class="gh c2">⚡ Compile All Pending (3)</button></p><p class="st" aria-live="polite"></p></div>
      <div class="pg" data-from="3"><p class="ph">00_WIKI / Film / <b>Storm_Scenes.md</b></p><h4>Storm scenes</h4><p>A storm shot keeps its light only if the prompt names it: "one rotating beam, visible through rain".<sup>1</sup></p><p class="sp"><b>2026-10-12</b> replaces "keep storms short" from 2026-09-30.<sup>2</sup></p><p class="fnt"><sup>1</sup> 7c41e2a0, turn 4 · <sup>2</sup> b93f0d17, turn 2</p></div>
      <ul class="po" data-from="4"><li class="ok"><span>✅ compiled</span><p>7c41e2a0 · turn 4<em>→ Film / Storm_Scenes</em></p></li><li class="cr"><span>⏳ waiting</span><p>4e02aa19 · turns 3-7<em>the run claiming it crashed; its claim was dropped</em></p></li><li><span>⏳ waiting</span><p><span>📄 lens-answer.md <i>RAW</i></span><em>in the next compile</em></p></li></ul>
      <p class="lt" data-from="4"><button type="button" class="gh li">🩺 Lint</button><span class="lo" aria-live="polite"></span></p>`;
    const mr = fv.querySelector('.mr'), inp = fv.querySelector('.pop input');
    const say = () => { const tops = $$(fv, '.tp button.on').map(b => b.textContent); mr.innerHTML = tops.length ? `Marked turn${/[-]/.test(inp.value) ? 's' : ''} ${inp.value || 'all'} under ${tops.join(', ')}. <b>No file was written.</b>` : 'A mark needs a topic.'; };
    fv.querySelector('.bk').addEventListener('click', () => { fv.querySelector('.bk').classList.add('lit'); say(); });
    $$(fv, '.tp button:not(.nw)').forEach(b => b.addEventListener('click', () => { const on = !b.classList.contains('on'); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); say(); }));
    fv.querySelector('.nw').addEventListener('click', e => { const b = document.createElement('button'); b.type = 'button'; b.className = 'on'; b.textContent = 'Weather'; e.target.before(b); say(); });
    inp.addEventListener('input', say);
    const tz = fv.querySelector('.tz');
    $$(fv, '.tz button[data-n]').forEach(b => b.addEventListener('click', () => {
      b.classList.toggle('on');
      const on = $$(fv, '.tz button.on').map(x => +x.dataset.n);
      inp.value = !on.length ? '' : on.length === 1 ? String(on[0]) : `${on[0]}-${on[on.length - 1]}`; say();
    }));
    fv.querySelector('.wh').addEventListener('click', () => { $$(tz, 'button[data-n]').forEach(x => x.classList.add('on')); inp.value = ''; say(); });
    const st = fv.querySelector('.st'); let tt = 0;
    const run = n => {
      clearTimeout(tt);
      st.innerHTML = `<span class="cf">librarian · ${eng('Claude')} sonnet · effort medium</span> <button type="button" class="gh go">Run</button>`;
      fv.querySelector('.go').addEventListener('click', () => {
        st.innerHTML = `Running: reads ${n} marks, <code>-WIKI-ANAYASA-.md</code>, <code>index.md</code> and 14 pages…`;
        tt = setTimeout(() => { st.innerHTML = 'Done: <b>Film / Storm_Scenes</b> updated, 1 page new. The run said so itself; only now do its marks read compiled.'; }, reduce ? 0 : 1600);
      });
    };
    fv.querySelector('.c1').addEventListener('click', () => run(2));
    fv.querySelector('.c2').addEventListener('click', () => run(3));
    const lo = fv.querySelector('.lo');
    fv.querySelector('.li').addEventListener('click', () => { lo.textContent = '2 orphan pages · 1 broken [[link]] · 0 unindexed. Reported; nothing repaired.'; });
    return { step(i) { if (i === 0 || i === 1) { fv.querySelector('.bk').classList.add('lit'); say(); } if (i === 2 && !st.textContent) run(2); } };
  },

  /* VI·4 the drop box: a file saved, a candidate under its own name, compiled and cited, moved to _DONE_, nothing lost */
  dropbox(fv) {
    fv.innerHTML = `
      <div class="hd"><b>📥 _RAW_</b><span>00_AGENT_AREA/00_WIKI/_RAW_ · demo</span></div>
      <div class="fs"><p class="fh">_RAW_/ <em class="ct"></em></p><ul class="fl"></ul><p class="ad"><button type="button" class="gh sv">Save a browser chat here</button></p></div>
      <ul class="pool" data-from="1"></ul>
      <p class="msg dim cite" data-from="2">Film / Storm_Scenes.md<br>- [2026-10-12] External source: [[_RAW_/_DONE_/lens-answer]]</p>
      <div class="dn" data-from="3"><p class="fh">_RAW_/_DONE_/</p><ul class="dl"></ul></div>
      <ul class="rl" data-from="4"><li><b>🚫 dropped by you</b> stays dropped: the next scan never brings it back</li><li><b>a file deleted</b> takes its row with it only if nobody tagged it</li><li><b>_RAW_ gone</b> <button type="button" class="gh rm">Delete the folder</button><span class="rr" aria-live="polite"></span></li></ul>`;
    const F = ['lens-answer.md', 'chatgpt-export-fog.json'];
    let files = [F[0]], done = [], st = 0;
    const fl = fv.querySelector('.fl'), dl = fv.querySelector('.dl'), pool = fv.querySelector('.pool'), ct = fv.querySelector('.ct');
    const draw = () => {
      fl.innerHTML = files.map(f => `<li>📄 ${f}</li>`).join('') || '<li class="z">empty: a to-do list with nothing to do</li>';
      ct.textContent = `· ${files.length} waiting`;
      dl.innerHTML = done.map(f => `<li>📄 ${f} <i>DONE</i></li>`).join('') || '<li class="z">nothing compiled yet</li>';
      pool.innerHTML = `<li><span>💬</span>7c41e2a0 · turn 4<em>${st >= 2 ? '✅ compiled' : '⏳ waiting'}</em></li>` + [...files.map(f => [f, 0]), ...done.map(f => [f, 1])].map(([f, d]) => `<li><span>📄</span>${f} <i>RAW</i>${d ? ' <i>DONE</i>' : ''}<em>${d ? '✅ compiled' : '⏳ waiting'}</em></li>`).join('');
    };
    fv.querySelector('.sv').addEventListener('click', () => { const f = F.find(x => !files.includes(x) && !done.includes(x)) || `note-${files.length + done.length + 1}.md`; files.push(f); draw(); });
    const rr = fv.querySelector('.rr');
    fv.querySelector('.rm').addEventListener('click', () => { rr.textContent = 'Gone… and made again on the next look, empty. The pool keeps its rows.'; });
    draw();
    return { step(i) {
      st = i;
      if (i >= 3 && files.includes(F[0])) { files = files.filter(f => f !== F[0]); done = [F[0], ...done]; }
      if (i < 3 && done.includes(F[0])) { done = done.filter(f => f !== F[0]); files = [F[0], ...files]; }
      draw();
    } };
  },

  /* VI·5 the vault: you curate and agents write, facts and methods, a rule on both sides, plain Markdown, ${vault} */
  obsidian(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Vault · Obsidian</b><span>D:/vault · demo</span></div>
      <div class="pg"><p class="ph">00_WIKI / Lighting / <b>Fresnel_Lenses.md</b> <em>written by librarian · 3 sources</em></p><p class="bd">A Fresnel lens throws a lighthouse beam about <span class="ed">20 nautical miles</span> with a fraction of a solid lens's glass. See [[Storm_Scenes]].</p><p class="fx"><button type="button" class="gh cr">Correct it</button><span class="cx" aria-live="polite"></span></p></div>
      <div class="two" data-from="1"><div><p class="lb">Facts · in the vault</p><ul><li>01_PROJECTS/Thesis/Plan.md</li><li>01_PROJECTS/Thesis/Backlog.md</li><li>Decisions.md</li><li>Preferences.md</li></ul></div><div><p class="lb">Methods · with the agents</p><ul><li>researcher/CLAUDE.md</li><li>_REF/wiki.md</li><li>_REF/backlog.md</li></ul><p class="pt">"The plan is at 01_PROJECTS/Thesis/Plan.md." A pointer, not a copy.</p></div></div>
      <div class="rule" data-from="2"><p class="lb">A rule you set</p><p class="rq">"Dates as YYYY-MM-DD, everywhere."</p><ul class="rw"><li>researcher/CLAUDE.md</li><li>_REF/style.md</li><li>Vault README.md</li></ul><p><button type="button" class="gh rn">Rename category Film → Media</button><span class="ro" aria-live="polite"></span></p></div>
      <div class="md" data-from="3"><p class="lb">Plan.md, one tick</p><p class="df"><span class="o">- [ ] Draft chapter 2 📅 2026-10-20</span><span class="n">- [x] Draft chapter 2 📅 2026-10-20</span></p><p class="msg y">Backlog.md was saved in Obsidian at 14:02:11, after it was read. The write is refused; nothing is lost.</p></div>
      <div class="vs" data-from="4"><p class="kv"><code>autoReportFolder</code> <code>\${vault}/03_REPORTS</code></p>${seg('This machine', 'mch', ['Has a vault', 'Has none'])}<p class="vr" aria-live="polite"></p><p class="op">Open pages in ${seg('Open with', 'opn', ['Editor', 'Preview', 'Obsidian', 'Your app'], 2)}</p></div>`;
    const cx = fv.querySelector('.cx'), ed = fv.querySelector('.ed');
    fv.querySelector('.cr').addEventListener('click', () => { ed.textContent = '20 nautical miles on a clear night'; ed.classList.add('you'); cx.textContent = 'Your edit. The next compile keeps it and adds to it.'; });
    const ro = fv.querySelector('.ro');
    fv.querySelector('.rn').addEventListener('click', () => { ro.textContent = 'Folder, titles and tags moved together; the human documents that name it updated too.'; });
    const vr = fv.querySelector('.vr');
    onSeg(fv.querySelector('.mch'), k => { vr.innerHTML = k ? '<b>skipped</b>: <code>${vault}</code> has nothing behind it, so no folder is guessed.' : '→ <code>D:/vault/03_REPORTS</code>'; })(0);
    onSeg(fv.querySelector('.opn'), () => {});
    $$(fv, '.rw li').forEach(li => li.classList.add('pend'));
    return { step(i) { $$(fv, '.rw li').forEach((li, k) => { li.classList.toggle('pend', i < 2); li.style.transitionDelay = i >= 2 ? `${k * 250}ms` : '0ms'; }); } };
  },

  /* VI·6 every engine, one grammar, the exact message, Meaning and its boundary, the id */
  search(fv) {
    const S = { a: ['7c41e2a0', 'Claude', 'Storm shots keep losing the beam'], b: ['b93f0d17', 'Codex', 'Retake scene 4 with the critique'], c: ['e1a2c3d4', 'Gemini', 'How does a Fresnel lens throw light so far?'], d: ['a0c9e771', 'Claude', 'Night shots for the trailer'], e: ['f3b8a210', 'Antigravity', 'Citation export breaks on umlauts'], f: ['9d1e44c0', 'OpenCode', 'Tidy the bibliography script'] };
    const Q = {
      'beam -rain': [37, 5, 'beam, and no rain', [['a', 'Turn 2', 'The beam drops out after frame 40.'], ['b', 'Turn 2', 'Keep the beam in frame for the whole shot.'], ['c', 'Turn 9', 'The beam of a first-order lens reaches…']]],
      '"rotating beam"': [9, 3, 'that phrase, whole words', [['a', 'Turn 4', 'One line changed: "one rotating beam, visible through rain".'], ['b', 'Turn 3', 'Prompt: one rotating beam, slow, from the left.']]],
      '(lens OR fresnel) angle': [14, 4, 'angle, with lens or fresnel', [['c', 'Turn 9', 'The angle a first-order lens throws…'], ['c', 'Turn 11', 'A Fresnel lens keeps the angle with far less glass.'], ['d', 'Turn 3', 'Which lens angle reads as far away on a phone?']]],
      'refact*': [61, 22, 'refactor, refactored, refactoring…', [['e', 'Turn 5', 'Refactored the parser into two passes.'], ['f', 'Turn 2', 'Refactoring the sort so Ö files under O.']]],
    };
    fv.innerHTML = `
      <div class="hd"><b>⌕ Search</b><span>1,499 sessions · demo</span></div>
      <p class="qb"><input aria-label="Query" value="beam -rain" readonly>${seg('Mode', 'mod', ['Text', 'Regex', 'Meaning'])}</p>
      <p class="cb">${['🧑 You', '🤖 Agent', '📤 Delegator', '📥 Handler', '🔧 Tools', '📄 Results', '📝 Memory'].map((c, k) => `<button type="button" class="${k < 2 || k === 6 ? 'on' : ''}" aria-pressed="${k < 2 || k === 6}">${c}</button>`).join('')}</p>
      <p class="gq" data-from="1">${Object.keys(Q).map((q, k) => `<button type="button" class="gh${k ? '' : ' on'}" data-q="${q.replace(/"/g, '&quot;')}">${q.replace(/</g, '&lt;')}</button>`).join('')}</p>
      <div class="rs" data-from="2"></div>
      <p class="ct2" data-from="2"></p>
      <div class="mm" data-from="3"><p class="lb">Meaning · Claude Code index</p><p class="mq">"where did we keep the light visible in bad weather?" <button type="button" class="gh ms">Search</button></p><ol class="ml"></ol><p class="mb">212 sessions on other engines are outside this index. Runs only on Search: a query may be a paid call.</p></div>
      <div class="id" data-from="4"><input aria-label="Session id" value="b93f"><button type="button" class="gh fid">Find session ID…</button><span class="ir" aria-live="polite"></span></div>`;
    const qi = fv.querySelector('.qb input'), rs = fv.querySelector('.rs'), ct = fv.querySelector('.ct2');
    const draw = q => {
      const [m, n, what, hits] = Q[q], by = {};
      hits.forEach(([k, t, x]) => (by[k] = by[k] || []).push([t, x]));
      rs.innerHTML = Object.entries(by).map(([k, h]) => `<div class="sg"><p class="sgh">${eng(S[k][1])}<b>${S[k][2]}</b><em>${S[k][0]}</em></p>${h.map(([tn, x]) => `<button type="button" class="hit"><span>${tn}</span>${x}</button>`).join('')}</div>`).join('');
      ct.innerHTML = `<b>${what}</b> · ${m} matches · 12 shown · ${n} sessions matched · 1,499 scanned`;
      $$(fv, '.hit').forEach(b => b.addEventListener('click', () => { $$(fv, '.hit').forEach(x => x.classList.toggle('sel', x === b)); ct.innerHTML = `Opens <b>${b.closest('.sg').querySelector('em').textContent}</b> at ${b.querySelector('span').textContent.toLowerCase()}, that message framed for a moment.`; }));
    };
    $$(fv, '.gq button').forEach(b => b.addEventListener('click', () => { $$(fv, '.gq button').forEach(x => x.classList.toggle('on', x === b)); qi.value = b.dataset.q; draw(b.dataset.q); }));
    $$(fv, '.cb button').forEach(b => b.addEventListener('click', () => { const on = !b.classList.contains('on'); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); }));
    const ml = fv.querySelector('.ml');
    const meaning = () => { ml.innerHTML = [['86%', '7c41e2a0', 'turn 4', '"one rotating beam, visible through rain"'], ['74%', '4e02aa19', 'turn 2', '"fog swallows the lantern after two seconds"'], ['61%', 'a0c9e771', 'turn 7', '"night shots need a practical light in frame"']].map(([p, id, t, x]) => `<li><b>${p}</b><span>${id} · ${t}</span>${x}</li>`).join(''); };
    fv.querySelector('.ms').addEventListener('click', meaning);
    onSeg(fv.querySelector('.mod'), k => { if (k === 2) { ml.innerHTML = '<li class="z">Meaning waits for Search.</li>'; } });
    const ir = fv.querySelector('.ir'), iin = fv.querySelector('.id input');
    fv.querySelector('.fid').addEventListener('click', () => { const v = iin.value.trim().toLowerCase(); ir.innerHTML = v && 'b93f0d17'.startsWith(v) ? `<b>b93f0d17</b> · editor · ${eng('Codex')} · opened` : 'No session starts with that.'; });
    draw('beam -rain');
    return { step(i) { if (i === 3 && !ml.innerHTML) meaning(); } };
  },

  /* VI·7 an agent's memory: recall counts, a file born with its index line, contradictions, a distill diff, the graph */
  recall(fv) {
    const A = {
      showrunner: [['storm-rules', 'feedback', 5, '2h'], ['channel-rhythm', 'project', 3, '1d'], ['judge-notes', 'reference', 2, '3d'], ['old-intro-style', 'feedback', 0, ''], ['sponsor-slots', 'project', 1, '6d']],
      editor: [['cut-rules', 'feedback', 7, '4h'], ['lighting-rules', 'reference', 4, '1d'], ['export-presets', 'reference', 0, '']],
    };
    fv.innerHTML = `
      <div class="hd"><b>Memory</b><span>memory/*.md · demo</span></div>
      ${seg('Agent', 'agn', Object.keys(A))}
      <p class="sm"></p>
      <ul class="fs"></ul>
      <div class="nw" data-from="1"><p class="nf"><input aria-label="New memory file name" value="beam-prompt-line"><button type="button" class="gh add">+ New memory file</button><button type="button" class="gh fix">Fix Memory Index</button></p><pre class="ix"></pre></div>
      <div class="cd" data-from="2"><p class="lb">Contradictions · showrunner</p><p><b>storm-rules.md</b> "Storm shots render at 24 fps."</p><p><b>channel-rhythm.md</b> "Every short renders at 30 fps."</p><p class="ad">Advice, not an edit: check before you change either.</p></div>
      <div class="ds" data-from="3"><p class="lb">Distill old-intro-style.md · ~2.4k tok</p><p class="df"><span class="o">- Intros run 8 seconds.</span><span class="o">- Intros run eight seconds, never more.</span><span class="n">+ Intros run 8 seconds, never more.</span><span class="n">+ ## Archive candidate: the 2025 logo sting</span></p><p><button type="button" class="gh ap">Apply</button><span class="ao" aria-live="polite"></span></p></div>
      <div class="gr" data-from="4"><svg viewBox="0 0 480 130" role="img" aria-label="Memory graph of showrunner"><g class="ed"><line x1="90" y1="70" x2="220" y2="48"/><line x1="220" y1="48" x2="330" y2="80"/><line x1="220" y1="48" x2="180" y2="104"/><line x1="220" y1="48" x2="290" y2="20"/><line x1="330" y1="80" x2="430" y2="40" class="bk"/></g>
        <circle cx="90" cy="70" r="8" class="rc"/><circle cx="220" cy="48" r="13" class="rc"/><circle cx="330" cy="80" r="9" class="rc"/><circle cx="290" cy="20" r="6" class="rc"/><circle cx="180" cy="104" r="7" class="nr ni"/><circle cx="430" cy="40" r="6" class="br"/><circle cx="44" cy="112" r="6" class="nr"/>
        <text x="220" y="76" class="h">hub</text><text x="430" y="62" class="b">?</text><text x="44" y="96" class="i">island</text></svg>
        <p class="lg2"><span class="rc">recalled</span><span class="ni">not in the index</span><span class="br">broken link</span></p>
        <p class="af"><input aria-label="Ask fleet memory" value="what fps do we render at?"><button type="button" class="gh ask">Ask Fleet Memory</button></p><ol class="aa"></ol></div>`;
    let ag = 'showrunner', idx = ['storm-rules', 'channel-rhythm', 'judge-notes', 'sponsor-slots'];
    const fs = fv.querySelector('.fs'), sm = fv.querySelector('.sm'), ix = fv.querySelector('.ix');
    const draw = () => {
      const F = A[ag], rec = F.filter(f => f[2]).length;
      sm.innerHTML = `<b>${F.length} files</b> · ~${(F.length * 1.2).toFixed(1)}k tok · <b>${rec} recalled</b> (30d)`;
      fs.innerHTML = F.map(([n, t, c, w]) => `<li class="${c ? 'rc' : 'zz'}"><b>${n}.md</b><em>${t}</em><span>${c ? `recalled ×${c}, last ${w}` : 'not recalled (30d)'}</span>${ag === 'showrunner' && !idx.includes(n) ? '<i>⚠ orphan</i>' : ''}</li>`).join('');
      ix.textContent = ag === 'showrunner' ? '# MEMORY.md\n' + idx.map(n => `- [${n}](${n}.md) — ${A.showrunner.concat(added).find(f => f[0] === n)?.[1] || 'project'}`).join('\n') : '# MEMORY.md\n- [cut-rules](cut-rules.md) — feedback\n- [lighting-rules](lighting-rules.md) — reference\n- [export-presets](export-presets.md) — reference';
    };
    const added = [];
    onSeg(fv.querySelector('.agn'), k => { ag = Object.keys(A)[k]; draw(); });
    const nin = fv.querySelector('.nf input');
    fv.querySelector('.add').addEventListener('click', () => {
      const n = nin.value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
      if (!n || A.showrunner.some(f => f[0] === n)) return;
      const f = [n, 'project', 0, '']; A.showrunner.push(f); added.push(f); idx.push(n);
      fv.querySelectorAll('.agn button')[0].click(); nin.value = '';
    });
    fv.querySelector('.fix').addEventListener('click', () => { if (!idx.includes('old-intro-style')) idx.push('old-intro-style'); fv.querySelectorAll('.agn button')[0].click(); });
    const ao = fv.querySelector('.ao');
    fv.querySelector('.ap').addEventListener('click', () => { ao.textContent = 'Written. old-intro-style.md.afbak kept beside it.'; });
    const aa = fv.querySelector('.aa');
    fv.querySelector('.ask').addEventListener('click', () => { aa.innerHTML = '<li><b>88%</b> showrunner · storm-rules.md</li><li><b>81%</b> showrunner · channel-rhythm.md</li><li><b>52%</b> editor · export-presets.md</li>'; });
    draw();
    return { step(i) { if (i === 4 && !aa.innerHTML) fv.querySelector('.ask').click(); } };
  },

  /* VI·8 another machine's sessions: mirrored, named, badged, matched by folder, never written */
  machines(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Other machines</b><span>desktop · demo</span></div>
      <div class="mc"><div class="mb2 me"><b>desktop</b><span>this machine · the farm</span></div><p class="sy"><i></i><span>Syncthing · one way</span></p><div class="mb2"><b>laptop</b><span>~/.claude</span></div></div>
      <pre class="cf" data-from="1">"agentFarm.extraClaudeDirs": [
  { "name": "laptop", "dir": "D:/sync/laptop/.claude" }
]</pre>
      <ul class="sl2" data-from="2"><li><span>editor</span>Retake scene 4 with the critique<em>$0.31</em></li><li class="lp"><span>editor</span><i>⇄ laptop</i>Rough cut on the train<em>$0.22</em></li><li><span>showrunner</span>Storm shots keep losing the beam<em>$0.84</em></li><li class="lp"><span>researcher</span><i>⇄ laptop</i>Lens sources for chapter 2<em>$0.00</em></li></ul>
      <p class="tot" data-from="2">Today <b>$4.12</b>, of which the laptop <b>$1.30</b> · scorecard and search cover both</p>
      <ul class="mt" data-from="3"><li><code>D:/agents/editor</code><span>→ editor</span></li><li><code>~/agents/editor</code> on the laptop<span>→ editor, the same layout</span></li><li><code>~/scratch/lens-test</code><span>→ Other projects (laptop)</span></li></ul>
      <div class="ro2" data-from="4"><p>Writes to the laptop's folder: <b>none</b></p>${seg('The sync', 'syn', ['Running', 'Stopped'])}<p class="wn" aria-live="polite"></p></div>`;
    const wn = fv.querySelector('.wn');
    onSeg(fv.querySelector('.syn'), k => { wn.className = 'wn' + (k ? ' on' : ''); wn.textContent = k ? 'At startup: no projects folder in D:/sync/laptop/.claude. Is the sync still running?' : 'laptop · 214 sessions · last change 3 minutes ago'; fv.querySelector('.sy').classList.toggle('off', !!k); })(0);
  },

  /* VI·9 the fleet report: a scorecard, cache efficiency, on its own, the task outputs, into the vault */
  reports(fv) {
    const AG = [['showrunner', 41, 18.4, 2, 94, '6.1k', 5], ['editor', 23, 6.9, 4, 88, '4.0k', 3], ['researcher', 17, 0, 1, 41, '7.9k', 2], ['archivist', 30, 1.2, 0, 97, '2.2k', 1]];
    fv.innerHTML = `
      <div class="hd"><b>AgentFarm-Report</b><span>Markdown · demo</span></div>
      <div class="rp2">${seg('Period', 'per', ['7 days', '30 days', '90 days'])}<p class="tt2"></p>
        <table class="at"><thead><tr><th>Agent</th><th>Sessions</th><th>Cost</th><th>Err %</th><th>Cache</th><th>Ctx load</th><th>Memory</th></tr></thead><tbody></tbody></table></div>
      <div class="ce" data-from="1"><p class="lb">Cache efficiency</p>${AG.map(([a, , , , c]) => `<p class="cr"><span>${a}</span><span class="bar"><i style="width:${c}%"></i></span><em>${c}%</em></p>`).join('')}<p class="cn2">researcher at 41%: short sessions that rewrite the same context. Could they be one?</p></div>
      <div class="au" data-from="2"><p class="lb"><code>agentFarm.autoReport</code></p>${seg('autoReport', 'aut', ['off', 'daily', 'weekly'], 2)}<p class="an" aria-live="polite"></p></div>
      <div class="to" data-from="3"><p class="lb">## Task outputs</p><p><b>✓ morning-brief</b> researcher · 2m · "Two new free models, one retired."</p><p><b>✓ backup</b> archivist · 1m · "Pushed 14 files."</p><p class="fl"><b>⛔ thumbnail-pass</b> editor · 4m · "ffmpeg: no such filter: drawtext"</p></div>
      <div class="vt" data-from="4"><p class="fh">03_REPORTS/</p><ul class="vl"></ul></div>`;
    const tb = fv.querySelector('.at tbody'), tt = fv.querySelector('.tt2');
    onSeg(fv.querySelector('.per'), k => {
      const m = [1, 4.1, 11.8][k];
      tt.innerHTML = `<b>${Math.round(111 * m)} sessions</b> · $${(26.5 * m).toFixed(2)} · ${(48 * m).toFixed(0)}M tokens · 3 health findings`;
      tb.innerHTML = AG.map(([a, s, c, e, ca, cl, me]) => `<tr><td>${a}</td><td>${Math.round(s * m)}</td><td>$${(c * m).toFixed(2)}</td><td>${e}</td><td>${ca}%</td><td>${cl}</td><td>${me}</td></tr>`).join('');
    })(0);
    const an = fv.querySelector('.an'), vl = fv.querySelector('.vl');
    const FILES = { 0: [], 1: ['AgentFarm-Report-2026-10-11.md', 'AgentFarm-Report-2026-10-12.md'], 2: ['AgentFarm-Report-2026-W41.md', 'AgentFarm-Report-2026-W42.md'] };
    onSeg(fv.querySelector('.aut'), k => {
      an.innerHTML = k ? `Next: <code>${FILES[k][1]}</code>, checked every hour while VS Code is open; the first open of the day writes it.` : 'Off: reports only when you export one.';
      vl.innerHTML = [...FILES[k], 'TaskOutputs-2026-10-12.md'].map((f, j, all) => `<li class="${j === all.length - 2 && k ? 'new' : ''}">📄 ${f}</li>`).join('');
    })(2);
  },
};
