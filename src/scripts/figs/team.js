// District V, Works as a team: one figure per feature, each a small rebuilt screen with demo data. Elements carry
// data-from (scripts/district.js shows them by step); step(i) moves the rest. The rules are the extension's own
// (data/deep/team.js cites them): a lead that cannot write, one writer per folder, the five caps and the finish-only
// round, each round's Approve; sessions.find and sessions.read with their 8-character prefix, five roles, 50 steps a page
// and 4,000 characters; notes and tasks on the A2A board, the 2-hour grace, the 30-minute lease and the third handoff
// refused; a directive as the first key; the Console's colours, ↯ and Hold, live settings and a refusal in the CLI's
// words; the 300-second countdown, Stop timer, destructive words and permissions that never run on a clock; Notices'
// four levels and 24 hours, the answer routed back as work, Ctrl+Alt+A; the Timeline's marks, its four alert boxes and
// the 240-second stall; worktrees, up to six prompts, a plan first, Merge, Open and Discard, and the sweep.
// Agents, goals, ids, times and figures are demo data. Today is Mon Oct 12.

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
/* a slider under the figure: label, range, its value and a line of what it means */
const slider = (label, min, max, step, v) =>
  `<label class="sl"><code>${label}</code><input type="range" min="${min}" max="${max}" step="${step}" value="${v}"><output></output></label><p class="slo"></p>`;
function onSlider(fv, fn) {
  const r = fv.querySelector('.sl input'), o = fv.querySelector('.sl output'), p = fv.querySelector('.slo');
  const go = () => { const [a, b] = fn(+r.value); o.textContent = a; p.innerHTML = b; };
  r.addEventListener('input', go); go();
}

export default {
  /* V·1 a goal, a lead and a team on four engines; rounds; writers in turn; the five caps; a verdict and each round's yes */
  missions(fv) {
    const TEAM = [['manager', 'lead', 'Claude', 'opus · plans only'], ['developer', 'coder', 'Claude', 'sonnet'], ['reviewer', 'reviewer', 'Codex', 'gpt-5-codex'], ['tester', 'tester', 'Antigravity', 'gemini'], ['writer', 'docs', 'OpenCode', 'kimi-k2']];
    const CAPS = [['cost', 0.62, 2, v => `$${v.toFixed(2)}`], ['rounds', 3, 8, v => v], ['tasks', 7, 12, v => v], ['minutes', 41, 90, v => v], ['at once', 2, 3, v => v]];
    fv.innerHTML = `
      <div class="hd"><b>Mission</b><span>Timeline export, end to end · classic · demo</span></div>
      <p class="goal"><span>Goal</span>Export the timeline as CSV and JSON lines, tested on Windows and macOS, with a page of docs.</p>
      <ul class="tm">${TEAM.map(([a, r, e, m], k) => `<li${k ? '' : ' class="ld"'}><b>${a}</b><em>${r}</em>${eng(e)}<span>${m}</span></li>`).join('')}</ul>
      <ol class="rds" data-from="1"><li><b>R1</b><span>delegate</span><p>developer: add the CSV export with its tests · reviewer: read the export module <i>read-only</i></p><em class="ok">2 done · $0.21</em></li>
        <li><b>R2</b><span>delegate</span><p>tester: run the tests on Windows · writer: a page of docs</p><em class="part">1 done, 1 failed</em></li>
        <li><b>R3</b><span>ask you</span><p>"The Windows runner has no PowerShell 7. Skip Windows, or wait for it?"</p><em>answered: skip</em></li></ol>
      <div class="wv" data-from="2"><p class="lb">Round 4 · wave 1 of 2 · working folder timeline/</p>
        <p class="w on"><b>developer</b><span>✎ writes</span><i></i></p><p class="w on"><b>reviewer</b><span>👁 read-only</span><i></i></p><p class="w on"><b>tester</b><span>👁 read-only</span><i></i></p><p class="w hold"><b>writer</b><span>✎ waits: developer is writing in this folder</span><i></i></p></div>
      <div class="cp" data-from="3">${CAPS.map(([n, v, m, f]) => `<p><span>${n}</span><span class="bar"><i style="width:${v / m * 100}%"></i></span><em data-v="${v}" data-m="${m}">${f(v)} / ${f(m)}</em></p>`).join('')}
        ${seg('Caps', 'cps', ['Within its caps', 'Rounds spent'])}<p class="fo" aria-live="polite"></p></div>
      <div class="vd" data-from="4"><p class="vh"><b>Verdict</b><span class="pill part">partial</span></p><p class="vs">CSV and JSON lines export and pass their tests on macOS. Windows was skipped at your word, so the mission says partial, not success.</p>
        ${seg('Approval', 'apm', ['Each round', 'Auto'])}<p class="ap" aria-live="polite"></p></div>`;
    const fo = fv.querySelector('.fo'), rows = $$(fv, '.cp > p:not(.fo)');
    onSeg(fv.querySelector('.cps'), k => {
      const r = rows[1], i = r.querySelector('i'), em = r.querySelector('em');
      i.style.width = k ? '100%' : '37.5%'; em.textContent = k ? '8 / 8' : '3 / 8'; r.classList.toggle('full', !!k);
      fo.innerHTML = k ? '<b>Finish-only round.</b> The lead may not hand out work now: it closes with an honest verdict.' : 'All five within their caps. Time waiting for your answer is not counted.';
    })(0);
    const ap = fv.querySelector('.ap');
    const draw = (k, msg) => {
      ap.innerHTML = msg || (k ? 'No gates. The rounds run one after another; the five caps still hold.'
        : '<span class="nd">Needs You</span> Round 4 wants to run 2 tasks. <button type="button" data-a="1">Approve</button><button type="button" data-a="0">Reject</button>');
      $$(fv, '.ap button').forEach(b => b.addEventListener('click', () => draw(0, +b.dataset.a ? 'Approved: round 4 runs.' : 'Rejected. The reason goes back to the lead, which plans round 4 again.')));
    };
    onSeg(fv.querySelector('.apm'), k => draw(k))(0);
    return { step(i) { $$(fv, '.tm li').forEach((li, k) => li.classList.toggle('hl', i === 0 || (i === 2 && k > 0))); } };
  },

  /* V·2 one agent finds and reads another's session, written by another engine, in the same five words */
  shared(fv) {
    const RAW = {
      'Claude Code': ['user', 'assistant', 'tool_use', 'tool_result', 'system'],
      Console: ['prompt', 'agent', 'call', 'result', 'system'],
      OpenCode: ['human · a SQLite row', 'model · a SQLite row', 'a tool part', 'its result part', 'system'],
    };
    const NORM = ['user', 'assistant', 'tool', 'toolResult', 'system'];
    fv.innerHTML = `
      <div class="hd"><b>reviewer</b>${eng('Codex')}<span>reads developer's session · demo</span></div>
      <pre class="c0">$ node af.js sessions.find q=3efb20bf
{"file": "…/projects/timeline/3efb20bf….jsonl", "engine": "claude",
 "agent": "developer", "cwd": "D:/agents/developer"}</pre>
      <pre class="c1" data-from="1"><span class="cm">$ node af.js sessions.read id=3efb</span>
<span class="bd">refused: 2 sessions start with 3efb: 3efb20bf (developer), 3efb9a04 (writer)</span>
<span class="cm">$ node af.js sessions.read id=3efb20bf</span>
{"matched": 214, "returned": 50, "next": 50, "steps": [ … ]}</pre>
      <div class="nm" data-from="2"><p class="lb">Written by</p>${seg('Who wrote it', 'src', Object.keys(RAW))}
        <div class="cols"><div><p class="lb">in its own words</p><ol class="raw"></ol></div><div><p class="lb">what the agent reads</p><ol class="nrm">${NORM.map(n => `<li>${n}</li>`).join('')}</ol></div></div></div>
      <pre class="c3" data-from="3"><span class="cm">$ node af.js sessions.read id=3efb20bf from=-10 turn=6 maxChars=4000</span>
{"matched": 31, "returned": 10, "clipped": 1, "steps": [
  {"turn": 6, "role": "toolResult", "text": "PASS test_export.js (14) …", "clipped": 2840} … ]}</pre>
      <p class="msg y gd" data-from="4"><b>Stopped by a hook</b> rg 3efb20bf ~/.claude<br>"3efb20bf" is a session id, and Agent Farm data is asked of the bridge, never hunted for on disk. Run af.js sessions.find q=3efb20bf instead.</p>`;
    const raw = fv.querySelector('.raw');
    onSeg(fv.querySelector('.src'), k => { raw.innerHTML = Object.values(RAW)[k].map(r => `<li>${r}</li>`).join(''); })(0);
  },

  /* V·3 the A2A board: a note, a task for a role, a lease kept by heartbeats, a result note, and the third handoff refused */
  notes(fv) {
    fv.innerHTML = `
      <div class="hd"><b>🤖 A2A</b><span>Notes · Tasks · project timeline · demo</span></div>
      <div class="nt"><p class="k">note · warning</p><p class="t">The staging database is locked until 15:00 for the migration.</p><p class="m">from developer · for role tester · read by <b>tester ✓</b>, reviewer —</p></div>
      <div class="tk" data-from="1"><p class="k">task · queued</p><p class="t">Make test_export pass on Windows</p><p class="m">for role tester · needs shell, write_tools · project timeline only</p>
        <p class="cl"><button type="button" class="gh tw">writer takes it</button><span class="rf" aria-live="polite"></span></p></div>
      <div class="ls" data-from="2"><p class="lb">Lease · tester</p><p class="lr"><span class="bar"><i></i></span><em class="lt"></em><button type="button" class="gh hb">♥ heartbeat</button></p><p class="pg">progress: path separators fixed, 12 of 14 tests pass</p></div>
      <p class="msg l rs" data-from="3"><b>Result note</b> to developer: done · "Windows needs \\\\?\\ for long paths; test_export passes." Nothing went to Notices.</p>
      <div class="ho" data-from="4"><p class="lb">Handoffs of "Port the export to Gemini's format"</p><ol class="hl"></ol><p class="hb2"><button type="button" class="gh hn">Hand it on</button><button type="button" class="gh hr">Reset</button></p></div>`;
    const rf = fv.querySelector('.rf');
    fv.querySelector('.tw').addEventListener('click', () => { rf.innerHTML = 'refused: <b>reserved for its target role</b>, opens 16:20 (2 h after it was posted)'; });
    let left = 30, lt = fv.querySelector('.lt'), li = fv.querySelector('.ls .bar i'), timer = 0;
    const drawL = () => { li.style.width = `${left / 30 * 100}%`; li.style.background = left > 15 ? 'var(--lime)' : left > 5 ? 'var(--yellow)' : 'var(--pink)'; lt.textContent = left > 0 ? `${left} min left` : 'lapsed: back in the queue'; };
    fv.querySelector('.hb').addEventListener('click', () => { left = 30; drawL(); });
    const HOPS = ['tester → developer', 'developer → writer', 'writer → reviewer'];
    let n = 0;
    const hl = fv.querySelector('.hl'), hn = fv.querySelector('.hn');
    const drawH = () => {
      hl.innerHTML = HOPS.slice(0, n).map((h, k) => `<li class="${k === 2 ? 'bk' : ''}">${k === 2 ? `<s>${h}</s> <b>refused · blocked</b>, waiting for you to route it` : h}</li>`).join('') || '<li class="z">none yet</li>';
      hn.disabled = n >= 3;
    };
    hn.addEventListener('click', () => { n++; drawH(); });
    fv.querySelector('.hr').addEventListener('click', () => { n = 0; drawH(); });
    drawL(); drawH();
    return { step(i) {
      clearInterval(timer);
      if (i === 2 && !reduce) { left = 30; drawL(); timer = setInterval(() => { left = Math.max(0, left - 3); drawL(); if (!left) clearInterval(timer); }, 900); }
      if (i === 4 && !n) { n = 3; drawH(); }
    } };
  },

  /* V·4 a directive on a task: its kind and colour, its rank, first in every answer, on a running task, in workflows */
  steer(fv) {
    const K = [
      ['steer', 'Use the existing date helper, not a new one.', 'amber'],
      ['veto', 'Do not touch the public API of export.ts.', 'red'],
      ['constraint', 'Only files under src/export/.', 'blue'],
    ];
    fv.innerHTML = `
      <div class="hd"><b>⚡ A2A Tasks</b><span>open · project timeline · demo</span></div>
      <div class="tr"><p><b>Make test_export pass on Windows</b><span>tester · running · lease 22 min</span></p><span class="bd"></span></div>
      <div class="fm"><p class="lb">+ Supervisor directive</p>${seg('Kind', 'knd', ['Steer', 'Veto', 'Constraint'])}<p class="tx"></p></div>
      <ol class="rk" data-from="1"><li class="me">👤 your directive</li><li>the constitution</li><li>the agent's system prompt</li><li>the task's own instructions</li></ol>
      <pre class="js" data-from="2"></pre>
      <div class="rn" data-from="3"><p class="ev"><span>14:02 claimed</span><span>14:10 ♥</span><span class="now">14:14 directive set</span><span class="dl">14:18 ♥ delivered</span></p>
        <p class="btns2"><button type="button" class="gh">↪ Re-route</button><button type="button" class="gh">⚡ Run now</button><span>opens a Console session for the agent you name</span></p></div>
      <p class="msg c gn" data-from="4"><b>Guide next decision</b> "Prefer finishing partial over a fourth round." Lands at round 4's plan, not inside the task already running.</p>`;
    const bd = fv.querySelector('.tr .bd'), tx = fv.querySelector('.tx'), js = fv.querySelector('.js');
    onSeg(fv.querySelector('.knd'), k => {
      const [kind, text, col] = K[k];
      bd.className = 'bd ' + col; bd.textContent = `👤 ${kind}`;
      tx.textContent = `"${text}"`;
      js.textContent = `a2a.tasks.heartbeat id=t-19 progress="12 of 14 pass"\n{"supervisor": {"directive": "${kind}", "text": "${text}"},\n "ok": true, "lease": "renewed, 30 min", …}`;
    })(0);
  },

  /* V·5 five engines as one card, the colours, steering a turn or holding a message, settings live, interrupt */
  console(fv) {
    const C = [
      ['developer', 'Claude', 'th', 'thinking', 'Reading export.ts to see where the header row is written.'],
      ['tester', 'Antigravity', 'tl', 'tool', '⚡ Bash npm run test -- test_export.js'],
      ['reviewer', 'Codex', 'as', 'asking you', 'Should the JSON lines include the empty turns?'],
      ['writer', 'OpenCode', 'dn', 'done', 'Docs page written: docs/export.md, 112 lines.'],
      ['researcher', 'Gemini', 'er', 'stuck', 'No output for 4 minutes after "fetching the spec".'],
    ];
    fv.innerHTML = `
      <div class="hd"><b>💬 Console</b><span>5 sessions · 1 asking you · demo</span></div>
      <div class="cds">${C.map(([a, e, c, s, t]) => `<div class="cd ${c}"><p><b>${a}</b>${eng(e)}<em>${s}</em></p><p class="t">${t}</p></div>`).join('')}</div>
      <p class="lg" data-from="1"><span class="th">thinking</span><span class="tl">a tool or a test</span><span class="as">asking you</span><span class="dn">done</span><span class="er">stuck</span></p>
      <div class="cv" data-from="2"><div class="log"><p>developer: Writing the header row once, before the loop.</p></div>
        <div class="hq"></div>
        <div class="cmp"><input aria-label="Message to developer" value="No, keep the header on every file the export splits into."><button type="button" class="gh snd">Send ↯</button><button type="button" class="gh hld">⏸ Hold</button></div></div>
      <div class="ct" data-from="3"><label>model <select class="mdl"><option>sonnet</option><option selected>opus</option></select></label><label>effort <select><option>high</option><option selected>xhigh</option></select></label>
        <label>permissions <select class="pm"><option>default</option><option selected>acceptEdits</option><option>plan</option><option>bypassPermissions</option></select></label><p class="cr" aria-live="polite"></p></div>
      <p class="ir" data-from="4"><button type="button" class="gh int">⎋ Interrupt</button><span class="io">Reopens with opus · xhigh · acceptEdits, as it closed.</span></p>`;
    const log = fv.querySelector('.log'), hq = fv.querySelector('.hq'), inp = fv.querySelector('.cmp input');
    const say = (cls, t) => { const p = document.createElement('p'); p.className = cls; p.textContent = t; log.append(p); log.scrollTop = log.scrollHeight; };
    fv.querySelector('.snd').addEventListener('click', () => { if (inp.value.trim()) { say('you', '↯ ' + inp.value.trim()); inp.value = ''; } });
    const held = [];
    const drawQ = () => {
      hq.innerHTML = held.map((t, k) => `<p><span>⏸ ${t}</span><button type="button" data-a="e" data-k="${k}" aria-label="Edit">✎</button><button type="button" data-a="s" data-k="${k}" aria-label="Say it now">⏩</button><button type="button" data-a="d" data-k="${k}" aria-label="Drop">⨯</button></p>`).join('');
      $$(fv, '.hq button').forEach(b => b.addEventListener('click', () => {
        const k = +b.dataset.k, [t] = held.splice(k, 1);
        if (b.dataset.a === 'e') inp.value = t; if (b.dataset.a === 's') say('you', '↯ ' + t);
        drawQ();
      }));
    };
    fv.querySelector('.hld').addEventListener('click', () => { if (inp.value.trim()) { held.push(inp.value.trim()); inp.value = ''; drawQ(); } });
    const cr = fv.querySelector('.cr');
    fv.querySelector('.mdl').addEventListener('change', e => { cr.textContent = `model → ${e.target.value}, from the next step of this session.`; cr.className = 'cr'; });
    fv.querySelector('.pm').addEventListener('change', e => {
      const v = e.target.value;
      cr.textContent = v === 'bypassPermissions' ? 'The CLI said no: this session was not started with the flag that allows bypassPermissions. Still acceptEdits.' : `The CLI accepted: ${v}.`;
      cr.className = 'cr' + (v === 'bypassPermissions' ? ' no' : '');
      if (v === 'bypassPermissions') e.target.value = 'acceptEdits';
    });
    const io = fv.querySelector('.io');
    fv.querySelector('.int').addEventListener('click', () => { io.innerHTML = '<b>Turn stopped.</b> The session and its context stay; type to go on.'; });
    return { step(i) { $$(fv, '.cd').forEach((c, k) => c.classList.toggle('dim', i === 2 && k !== 0)); } };
  },

  /* V·6 a question's countdown, Stop timer and half-made picks, a destructive word, a permission, Needs You */
  question(fv) {
    fv.innerHTML = `
      <div class="hd"><b>developer</b>${eng('Claude')}<span>asking you · demo</span></div>
      <div class="qc"><p class="qq">1 · Which export format should the timeline use?</p><p class="op" data-q="0"><button type="button" data-o="0">CSV <i>Recommended</i></button><button type="button" data-o="1">JSON lines</button><button type="button" data-o="2">Both</button></p>
        <p class="qq" data-from="1">2 · Where should the files go?</p><p class="op" data-q="1" data-from="1"><button type="button" data-o="0">exports/ <i>Recommended</i></button><button type="button" data-o="1">Desktop</button></p>
        <p class="cdn"><span class="tm"></span><button type="button" class="gh stp">Stop timer</button><button type="button" class="gh ff">Let it run out</button></p><p class="res" aria-live="polite"></p></div>
      <p class="msg p ds" data-from="2"><b>Delete the old exports folder before writing?</b><br>⏸ No timer: "delete" is on the list. It waits in Needs You.</p>
      <div class="pc" data-from="3"><p><b>Bash</b> <code>npm run package</code></p><p class="btns3"><button type="button" class="gh">Allow once</button><button type="button" class="gh">Allow npm:* for this session</button><button type="button" class="gh">Deny…</button></p><p class="pn">Never on a clock, and never from an agent.</p></div>
      <ol class="ny" data-from="4"><li><b>🛡️</b><span>reviewer waits for a permission: <code>git push</code></span><em>6m</em></li><li><b>❓</b><span>developer: "Delete the old exports folder?" No timer: "delete"</span><em>2m</em></li><li><b>🎯</b><span>Mission "Timeline export": the lead asks you</span><em>1m</em></li><li><b>⏳</b><span>researcher stalled, silent 4 min</span><em>now</em></li></ol>`;
    let t = 271, run = true, timer = 0, picks = [null, null];
    const tm = fv.querySelector('.tm'), res = fv.querySelector('.res');
    const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    const drawT = () => { tm.innerHTML = run ? `⏳ ${fmt(t)} left, then <b>CSV</b> is chosen for you` : '⏸ Timer stopped. It waits for you.'; };
    const expire = () => {
      run = false; clearInterval(timer);
      const out = picks.map((p, q) => p === null ? `${q + 1} → ${['CSV', 'exports/'][q]} <em>(recommended)</em>` : `${q + 1} → ${[['CSV', 'JSON lines', 'Both'], ['exports/', 'Desktop']][q][p]} <em>(your pick)</em>`);
      tm.innerHTML = '⏱ Time ran out.'; res.innerHTML = `Sent: ${out.join(' · ')}. The agent is told the timer answered.`;
    };
    $$(fv, '.op button').forEach(b => b.addEventListener('click', () => {
      const q = +b.parentNode.dataset.q; picks[q] = +b.dataset.o;
      $$(b.parentNode, 'button').forEach(x => x.classList.toggle('on', x === b));
      res.textContent = 'Kept. The clock still runs; your picks go when it ends.';
    }));
    fv.querySelector('.stp').addEventListener('click', () => { run = false; clearInterval(timer); drawT(); });
    fv.querySelector('.ff').addEventListener('click', () => { if (run) expire(); });
    const start = () => { clearInterval(timer); t = 271; run = true; res.textContent = ''; drawT(); if (!reduce) timer = setInterval(() => { t -= 1; if (t <= 0) expire(); else drawT(); }, 1000); };
    start();
    return { step(i) { if (i <= 1 && !run) { picks = [null, null]; $$(fv, '.op button').forEach(x => x.classList.remove('on')); start(); } } };
  },

  /* V·7 Notices: a row per thing, four levels and the stale bell, a question answered, the answer as work, your own capture */
  notices(fv) {
    const N = [
      [4, '❓', 'question', 'showrunner', 'The sponsor offers the November slot or December. Which one?', 'q'],
      [3, '⚠', 'warning', 'archivist', 'The backup repo is 92% of its quota.', ''],
      [2, '📄', 'report', 'researcher', 'Weekly model radar: 2 new free models, 1 retired.', ''],
      [1, '·', 'update', 'writer', 'Docs page for the export is written.', ''],
    ];
    fv.innerHTML = `
      <div class="hd"><b>🔔 Notices</b><span>📥 Queue · 🤖 A2A Notes · ⚡ A2A Tasks · demo</span></div>
      <ul class="nb">${N.map(([l, i, t, a, x, c]) => `<li class="l${l} ${c}"><span class="lv">L${l}</span><b>${i} ${t}</b><span class="a">${a}</span><p>${x}</p></li>`).join('')}</ul>
      <p class="sb" data-from="1"><span>🔔 ⚠ 26h: "The sponsor offers the November slot…" unanswered</span></p>
      <div class="an" data-from="2"><input aria-label="Your answer" value="November. Ask them for the 14th."><button type="button" class="gh ans">Answer</button><button type="button" class="gh dcl">Close unanswered</button></div>
      <div class="qi" data-from="3"><p class="lb">📥 Queue</p><div class="qr"></div></div>
      <div class="cap" data-from="4"><p class="lb">Ctrl+Alt+A</p><p class="ci"><input aria-label="A fix for an agent" value="The export button tooltip says CSV only."><button type="button" class="gh add">Add</button></p><ol class="pl"></ol></div>`;
    const qr = fv.querySelector('.qr'), inp = fv.querySelector('.an input');
    const route = (txt, how) => { qr.innerHTML = `<p class="qx"><b>❓ Question: sponsor slot · from showrunner</b><span>${how}: "${txt}" · routed back to showrunner</span><button type="button" class="gh og">▸ Original</button></p><p class="org" hidden>L4 question, the whole notice, its sections and its report, as it was.</p>`;
      fv.querySelector('.og').addEventListener('click', () => { const o = fv.querySelector('.org'); o.hidden = !o.hidden; }); };
    fv.querySelector('.ans').addEventListener('click', () => { route(inp.value, 'answered'); fv.querySelector('.nb .q').classList.add('done'); });
    fv.querySelector('.dcl').addEventListener('click', () => { qr.innerHTML = '<p class="qx"><span>Closed unanswered: the agent sees it was declined, and nothing is queued.</span></p>'; fv.querySelector('.nb .q').classList.add('done'); });
    route('November. Ask them for the 14th.', 'answered');
    const q4 = fv.querySelector('.nb .q'); let acted = false;
    $$(fv, '.an button').forEach(b => b.addEventListener('click', () => { acted = true; }));
    const ST = ['captured', 'grouped', 'delegated', 'done'];
    const items = [['Rename "Run Next" to "Run next" in the docs', 2]];
    const pl = fv.querySelector('.pl'), cin = fv.querySelector('.ci input');
    const drawP = () => { pl.innerHTML = items.map(([t, s]) => `<li><span>${t}</span>${ST.map((x, k) => `<i class="${k === s ? 'on' : k < s ? 'past' : ''}">${x}</i>`).join('')}</li>`).join(''); };
    fv.querySelector('.add').addEventListener('click', () => {
      if (!cin.value.trim()) return; const it = [cin.value.trim(), 0]; items.unshift(it); cin.value = ''; drawP();
      if (!reduce) [1, 2].forEach(s => setTimeout(() => { it[1] = s; drawP(); }, s * 1100));
    });
    drawP();
    return { step(i) { if (!acted) q4.classList.toggle('done', i >= 3); } };
  },

  /* V·8 the Live Timeline: lanes, its marks, a click to the moment, the four alert boxes and a stall */
  timeline(fv) {
    const L = [
      { n: 'developer #1', ev: [['b', 3, 18], ['p', 2], ['r', 24], ['b', 30, 46], ['r', 52], ['b', 58, 80]] },
      { n: 'developer #2', ev: [['p', 10], ['b', 12, 30], ['w', 34], ['b', 40, 52]] },
      { n: 'reviewer', ev: [['p', 6], ['b', 8, 14], ['r', 16], ['c', 44], ['b', 48, 70]] },
      { n: 'tester', ev: [['p', 4], ['b', 6, 38], ['s', 40], ['x', 46]] },
    ];
    const TIP = { p: 'your prompt', r: 'the model\'s reply', w: 'a permission wait', c: 'a compaction', s: 'a subagent done' };
    fv.innerHTML = `
      <div class="hd"><b>Live Timeline</b><span>14:00 – 14:20 · demo</span></div>
      <div class="ln">${L.map((l, k) => `<div class="lr" data-k="${k}"><span class="nm">${l.n}</span><span class="ab" data-from="3">${['♪', '◎', '▣', '▭'].map((a, j) => `<button type="button" aria-pressed="${j === 0 && k < 2}" class="${j === 0 && k < 2 ? 'on' : ''}" aria-label="${['sound', 'focus', 'dialog', 'toast'][j]}">${a}</button>`).join('')}</span><span class="tr">${l.ev.map(([t, a, b], j) => t === 'b' ? `<i class="b" style="left:${a}%;width:${b - a}%" data-t="⚡ Bash, ${(b - a) * 12} s"></i>` : t === 'x' ? '' : `<button type="button" class="m ${t}" style="left:${a}%" data-t="${TIP[t]}, 14:${String(Math.round(a / 5)).padStart(2, '0')}" aria-label="${TIP[t]}"></button>`).join('')}${k === 3 ? '<em class="st" data-from="4">stalled · silent 4 min</em>' : ''}</span></div>`).join('')}</div>
      <p class="key" data-from="1"><span><i class="b"></i>a tool run</span><span><i class="m p"></i>your prompt</span><span><i class="m r"></i>a reply</span><span><i class="m w"></i>permission wait</span><span><i class="m c"></i>compaction</span><span><i class="m s"></i>subagent done</span></p>
      <p class="jt" data-from="2" aria-live="polite">Click a mark.</p>
      <p class="tst" data-from="3"><button type="button" class="gh tb">⏱ Test in 3 seconds</button><span class="tr2"></span></p>
      <p class="msg y ny" data-from="4"><b>Needs You</b> ⏳ tester stalled: no word for 4 minutes after a subagent finished.</p>`;
    const jt = fv.querySelector('.jt');
    $$(fv, '.tr .m').forEach(b => b.addEventListener('click', () => {
      $$(fv, '.tr .m').forEach(x => x.classList.toggle('sel', x === b));
      const lane = b.closest('.lr').querySelector('.nm').textContent;
      jt.innerHTML = `<b>${lane}</b> · ${b.dataset.t}: the session opens at that message, framed for a moment.`;
    }));
    $$(fv, '.ab button').forEach(b => b.addEventListener('click', () => { const on = !b.classList.contains('on'); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); }));
    const tr2 = fv.querySelector('.tr2'); let tt = 0;
    fv.querySelector('.tb').addEventListener('click', () => {
      clearTimeout(tt); tr2.textContent = 'Switch to another window… 3';
      let n = 3; const tick = () => { n--; if (n > 0) { tr2.textContent = `Switch to another window… ${n}`; tt = setTimeout(tick, 1000); } else { const on = $$(fv, '.lr[data-k="0"] .ab button.on').map(b => b.getAttribute('aria-label')); tr2.textContent = on.length ? `developer #1: ${on.join(', ')} ok` : 'Nothing selected on developer #1.'; } };
      tt = setTimeout(tick, reduce ? 0 : 1000);
    });
    return { step(i) { fv.querySelector('.lr[data-k="3"]').classList.toggle('stl', i === 4); if (i === 2) fv.querySelector('.lr[data-k="0"] .m.r').click(); } };
  },

  /* V·9 parallel worktrees: a plan first, a branch each, commit when done, merge, open or discard, and the sweep */
  worktrees(fv) {
    const P = ['add the CSV export', 'add the JSON lines export', 'rewrite the export tests', 'speed up the timeline query'];
    fv.innerHTML = `
      <div class="hd"><b>Run Parallel Worktrees</b><span>developer · D:/agents/developer is a git repo · demo</span></div>
      <pre class="pl">$ node af.js parallel.run agent=developer prompts=@4.json
{"dryRun": true, "gitRepo": true, "branches": [${P.map((_, k) => `"af/wt${k + 1}-1012"`).join(', ')}],
 "atOnce": <b class="ao"></b>, "dropped": []}</pre>
      <ul class="tre" data-from="1"><li>D:/agents/developer <em>main · untouched</em></li>${P.map((p, k) => `<li class="w">.af-worktrees-developer/wt${k + 1} <em>af/wt${k + 1}-1012 · ${p}</em></li>`).join('')}</ul>
      <p class="msg dim cm" data-from="2">⑂ cards on the board · each prompt ends: <b>"When the work is done, commit the changes with a meaningful message."</b></p>
      <ol class="wr" data-from="3"></ol>
      <p class="msg l sw" data-from="4"><b>Swept at 09:01</b> af/wt2-1009 merged, removed · af/wt4-1009 has 2 commits of its own and its folder is gone: listed to merge or discard.</p>
      ${slider('maxConcurrentPerAgent', 1, 4, 1, 1)}`;
    const R = [['wt1', 'add the CSV export', 3, '+182 −12', 0], ['wt2', 'add the JSON lines export', 2, '+96 −4', 0], ['wt3', 'rewrite the export tests', 4, '+240 −188', 1], ['wt4', 'speed up the timeline query', 1, '+18 −9', 0]];
    const wr = fv.querySelector('.wr'), st = {};
    const drawR = () => {
      wr.innerHTML = R.map(([w, p, c, d, u]) => `<li class="${st[w] || ''}"><b>⑂ ${w}</b><span>${p}</span><em>${c} commits · ${d}${u ? ' · uncommitted changes' : ''}</em><span class="ac">${st[w] === 'mg' ? 'merged --no-ff, worktree removed' : st[w] === 'dc' ? 'discarded: worktree and branch deleted' : st[w] === 'ask' ? 'Delete the worktree and its branch? <button type="button" data-a="y" data-w="' + w + '">Yes</button><button type="button" data-a="n" data-w="' + w + '">No</button>' : `<button type="button" data-a="m" data-w="${w}">Merge</button><button type="button" data-a="o" data-w="${w}">Open</button><button type="button" data-a="d" data-w="${w}">Discard</button>`}</span></li>`).join('');
      $$(fv, '.wr button').forEach(b => b.addEventListener('click', () => {
        const w = b.dataset.w, a = b.dataset.a;
        st[w] = a === 'm' ? 'mg' : a === 'd' ? 'ask' : a === 'y' ? 'dc' : a === 'o' ? 'op' : '';
        drawR(); if (a === 'o') { const s = fv.querySelector(`.wr li.op .ac`); if (s) s.insertAdjacentHTML('afterbegin', '<i>opened in a new window · </i>'); }
      }));
    };
    drawR();
    const ao = fv.querySelector('.ao');
    onSlider(fv, v => { ao.textContent = v; return [String(v), v === 1 ? 'One at a time: the four run in turn, each in its own worktree.' : `<b>${v}</b> at once, the other ${4 - v} wait; still one worktree each.`]; });
  },
};
