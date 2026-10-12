// District IV, Recipes and triggers: one figure per feature, each a small rebuilt screen of the Tasks page with demo data.
// Elements carry data-from (scripts/district.js shows them by step); step(i) moves the rest. The rules are the
// extension's own (data/deep/automation.js cites them): the handoff's placeholders and its 1,500 characters, 25 step
// executions, for-each four at a time, the three missed-run rules, the 30 s heartbeat and the takeover about 90 s later,
// quiet hours deferring and not dropping, the storm guards 10 s, 60 s and 6 an hour, the trigger's scorecard, Gatekeeper's
// has-work rule and its four places, the plan's checks, two at once and one per agent, a point for every 30 minutes,
// a run marked failed on a bad exit and priced from its own transcript or not at all, the 200 MB output ceiling,
// the 40-minute retry and the six failures, rounds in one conversation, the switch's 1, 8 and 24 hours, and the
// forecast's 7 days with health's 80% and 50%. Agents, files, times and figures are demo data. Today is Mon Oct 12.

const $$ = (fv, s) => [...fv.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
const mins = m => m >= 60 ? `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m` : `${m} min`;

export default {
  /* IV·1 a chain of six steps of four kinds; what each is handed; a branch and a judge; your yes; a step run for each shot */
  flows(fv) {
    const S = [
      ['Pick the topic', 'agent', 'writer'],
      ['Write the script', 'agent', 'writer · a judge checks it'],
      ['Render the shots', 'media', 'fal.ai · for each shot'],
      ['Join the cut', 'tool', 'ffmpeg · no tokens'],
      ['Your approval', 'approval', 'no model is called'],
      ['The publishing package', 'agent', 'showrunner'],
    ];
    fv.innerHTML = `
      <div class="hd"><b>🔗 Weekly channel rhythm</b><span>Tasks → Plan → Workflows · demo</span></div>
      <ol class="ch">${S.map(([t, k, d], i) => `<li><span class="n">${i + 1}</span><b>${t}</b><code class="k ${k}">${k}</code><em>${d}</em></li>`).join('')}</ol>
      <div class="ho" data-from="1"><p class="lb">Step 2's prompt, and what fills it</p><pre>Write a 60-second script about {prev_json.title}.
Research notes: {prev_text}</pre>
        <dl><dt>{prev_output}</dt><dd>step 1's file, <code>01-topic.json</code></dd><dt>{prev_text}</dt><dd>its text, the first 1,500 characters</dd><dt>{prev_json.title}</dt><dd>"The lighthouse that walked inland"</dd><dt>{steps.topic.text}</dt><dd>any earlier step, by its name</dd></dl></div>
      <div class="br" data-from="2"><p><code>runIf</code> step 2 runs only if step 1's output has a <code>"title"</code> · <code>onFail</code> jump to step 1</p>
        <p><code>verify</code> haiku: "under 160 words, with a hook in the first line?" No, so it was sent back once, with the reason.</p>
        <p class="cap"><b>7</b> of 25 step executions used by this run</p></div>
      <div class="ap" data-from="3"><p class="ah"><b>⏸ Needs you · approval</b><span>step 5</span></p><p>The cut is 58 seconds, 6 shots. Send it on to the publishing package?</p>
        <p class="yn"><button type="button" data-a="1">Approve</button><button type="button" data-a="0">Reject</button><span aria-live="polite"></span></p></div>
      <div class="fo" data-from="4"><p class="lb">Step 3, once for each of 6 shots</p><div class="shots">${[1, 2, 3, 4, 5, 6].map(n => `<span>shot ${n}</span>`).join('')}</div><p class="fm">6 images → one handoff to step 4</p></div>`;
    const rows = $$(fv, '.ch li'), say = fv.querySelector('.yn span');
    $$(fv, '.yn button').forEach(b => b.addEventListener('click', () => {
      say.innerHTML = +b.dataset.a ? 'Approved: the cut goes on to step 6 unchanged.' : 'Rejected: step 5\'s failure rule applies, here <b>stop</b>.';
    }));
    const cells = $$(fv, '.shots span'), fm = fv.querySelector('.fm');
    let timers = [];
    const fan = () => {
      timers.forEach(clearTimeout); timers = [];
      const mark = (from, to, c) => cells.forEach((x, k) => { if (k >= from && k < to) { x.classList.remove('run', 'ok'); x.classList.add(c); } });
      cells.forEach(x => x.classList.remove('run', 'ok')); fm.classList.remove('ok');
      if (reduce) { mark(0, 6, 'ok'); fm.classList.add('ok'); return; }
      timers.push(setTimeout(() => mark(0, 4, 'run'), 300));
      timers.push(setTimeout(() => { mark(0, 4, 'ok'); mark(4, 6, 'run'); }, 1700));
      timers.push(setTimeout(() => { mark(4, 6, 'ok'); fm.classList.add('ok'); }, 3100));
    };
    const HL = [[], [0, 1], [0, 1], [4], [2]];
    return { step(i) { rows.forEach((r, k) => r.classList.toggle('hi', HL[i].includes(k))); if (i === 4) fan(); } };
  },

  /* IV·2 three kinds of schedule; a missed run and its rule; the service while VS Code is closed; quiet hours; other ways in */
  schedules(fv) {
    const R = [
      ['Morning plan', 'researcher', 'every day · 09:00', 'next tomorrow 09:00'],
      ['Weekly channel rhythm', 'showrunner', 'every week · Mon 07:00', 'on sonnet · next Mon Oct 19'],
      ['Back up the agent repo', 'archivist', 'every day · 19:00', 'next today 19:00'],
      ['Night digest', 'librarian', 'every day · 03:00', 'next tonight 03:00'],
      ['Send the invoice reminder', 'manager', 'once · Oct 31, 18:00', 'switches itself off after it runs'],
    ];
    fv.innerHTML = `
      <div class="hd"><b>⏰ Schedules</b><span>Tasks → Plan · demo</span></div>
      <ul class="sr">${R.map(([t, a, w, n], i) => `<li><b>${t}</b><span class="a">${a}</span><span class="w">${w}</span><em>${n}</em>${i === 3 ? '<i class="df" data-from="3">deferred · fires at 04:30, when quiet hours end</i>' : ''}</li>`).join('')}</ul>
      <div class="ms" data-from="1"><p class="lb">VS Code was shut all Sunday · Morning plan missed Sun 09:00</p>${seg('If the time is missed', 'miss', ['Skip it', 'Catch up', 'Ask me'])}<p class="mo"></p></div>
      <div class="hl" data-from="2"><p class="lb">This evening, with VS Code closed</p><ol>
        <li><span>18:20:00</span><p>VS Code closes. Its heartbeat, written every 30 seconds, stops.</p></li>
        <li><span>18:21:31</span><p>The headless service takes over, about 90 seconds later.</p></li>
        <li><span>19:00:00</span><p><code>claude -p</code> runs Back up the agent repo in archivist's folder, into the same archive.</p></li>
        <li><span>21:05:12</span><p>VS Code opens: <b>the service ran 1 task while you were away.</b></p></li></ol>
        <pre>service-runs.jsonl  {"at":"19:00","task":"Back up the agent repo","ok":true}</pre></div>
      <div class="ow" data-from="4"><p class="lb">Other ways in</p><p><span class="who">researcher</span> <code>schedules.add</code> "Morning plan" daily 09:00 <em>· shown to you as a notification</em></p>
        <p><code>schedules.edit</code> · <code>schedules.toggle</code> · <code>schedules.runNow</code></p>
        <pre>Export as Windows Scheduled Task…  →  morning-plan.cmd
schtasks /Create /TN "AgentFarm\\Morning plan" …   (copied for you)</pre></div>`;
    const mo = fv.querySelector('.mo');
    onSeg(fv.querySelector('.miss'), k => {
      mo.innerHTML = [
        'Sunday\'s run is gone; today\'s 09:00 runs as usual. <b>The default.</b> A run missed earlier the same day still fires late.',
        'It runs as soon as a window is up, at 08:12 today, and the notification says <b>caught up</b>. Today\'s own 09:00 runs too.',
        '<span class="toast">Morning plan missed Sun 09:00 <button type="button">Run now</button><button type="button">Skip this one</button></span>Dismiss it and the next window asks again.',
      ][k];
    })(0);
  },

  /* IV·3 a watch, a hook, a private address; what a firing does; the guards, the scorecard, and a storm of firings */
  triggers(fv) {
    fv.innerHTML = `
      <div class="hd"><b>⚡ Triggers</b><span>Tasks → Plan · demo</span></div>
      <div class="tc"><p class="th"><b>📁 New footage</b><code>watch</code><span>Studio\\inbox</span></p>
        <p class="drp"><button type="button" class="ghost2">Drop a file</button><span aria-live="polite">waiting for a file</span></p></div>
      <div class="tc" data-from="1"><p class="th"><b>🪝 Review when it ends</b><code>hook</code><span>only agent: developer</span></p>
        <p class="hk">${['stop', 'end', 'permission', 'compact', 'subagent'].map(e => `<span${e === 'end' ? ' class="on"' : ''}>${e}</span>`).join('')}</p></div>
      <div class="tc" data-from="2"><p class="th"><b>🌐 New order</b><code>webhook</code><span>manager</span></p>
        <pre>POST http://127.0.0.1:8377/trigger/q7Kf…2Lx
{"order": 1182, "item": "A3 print"}</pre>
        <p class="pl"><code>{payload}</code> in the prompt is that body. A wrong token gets a <b>404</b> and nothing else.</p></div>
      <div class="ac" data-from="3">${seg('What a firing does', 'act', ['Run a task', 'Dispatch', 'Start a workflow'], 2)}<p class="ao"></p></div>
      <div class="gd" data-from="4"><p class="gl"><span>10 s of quiet</span><span>60 s rest</span><span>6 an hour</span><span>fires only if the folder has files</span></p>
        <p class="sc"><code>fired 12× • 7d: 9✓/1✗ • start ~4s</code></p>${slider('bursts of files this hour', 1, 20, 1, 9)}</div>`;
    const dp = fv.querySelector('.drp button'), ev = fv.querySelector('.drp span');
    let last = 0, t1;
    dp.addEventListener('click', () => {
      const now = Date.now();
      if (now - last < 6000) { ev.innerHTML = 'Another file: it is <b>resting</b>, 60 seconds after the last firing. Counted, not run.'; return; }
      last = now; clearTimeout(t1);
      ev.innerHTML = '<b>interview-take-5.mp4</b> landed · waiting for 10 s of quiet…';
      t1 = setTimeout(() => { ev.innerHTML = 'Quiet: <b>fired</b>. Long to shorts started on the file.'; }, reduce ? 0 : 1500);
    });
    const ao = fv.querySelector('.ao');
    onSeg(fv.querySelector('.act'), k => {
      ao.innerHTML = [
        'Runs a task on the agent you picked, <b>editor</b>: "Cut a 30-second short from {path}".',
        'Hands it to whichever agent fits. Your pattern <code>\\.mp4$</code> matched first, so the classifier was not asked: <code>inbox job → editor [rule]</code>.',
        'Starts the workflow <b>Long to shorts</b>, with the file as its input.',
      ][k];
    })(2);
    onSlider(fv, n => {
      const f = Math.min(n, 6), s = n - f;
      return [String(n), `<b>${f}</b> fired${s ? `, <b>${s}</b> skipped: 6 an hour reached, each one counted on the row` : ''}. Files that land within 10 seconds of each other are one burst.`];
    });
  },

  /* IV·4 three firings through free checks and Jev; off, shadow and on; the four places it serves; how it steps aside */
  gatekeeper(fv) {
    const F = [
      { f: 'interview-take-4.mp4', e: 'created · 1.9 GB', h: [1, 1], j: 0.94 },
      { f: '~$interview.tmp', e: 'created · 162 bytes', h: [1, 0], j: null },
      { f: 'notes.md', e: 'changed · its diff is 3 spaces', h: [1, 1], j: 0.08 },
    ];
    fv.innerHTML = `
      <div class="hd"><b>🛡 Gatekeeper · New footage</b><span>a watch on Studio\\inbox · demo</span></div>
      ${seg('A firing', 'fire', F.map(x => x.f))}
      <p class="fe"></p>
      <div class="pp"><div class="stg"><p class="sn">1 · free checks <em>on this machine · $0</em></p><p class="hc"></p></div>
        <div class="stg" data-from="1"><p class="sn">2 · Jev <em>trigger.has-work · passes if work &gt; 0.5 · 3 s at most</em></p><p class="jv"></p></div>
        <p class="vd"></p></div>
      <div class="md" data-from="2"><p class="lb">On this trigger · out of the box it is off</p>${seg('Gatekeeper on this trigger', 'mode', ['Off', 'Shadow', 'On'], 2)}<p class="mo"></p></div>
      <ul class="cs" data-from="3">${[['dispatch', 'which agent a dispatched job goes to'], ['retry', 'how a cut-off task carries on'], ['trigger', 'whether a trigger fires'], ['workflow', 'where a workflow step goes']].map(([c, t]) => `<li><code>kapici.${c}</code><span>${t}</span><em>off</em></li>`).join('')}</ul>
      <ul class="fb" data-from="4"><li>No key for Jev, no rule, an error, or past 3,000 ms: <b>the trigger fires as it would have.</b> No other model is asked instead.</li>
        <li>The same question within 10 minutes gets the cached answer.</li><li>The input is masked; the audit keeps a hash and a length, never the text.</li>
        <li>As an MCP server: <code>kapici_eval</code> · <code>kapici_ask</code> · <code>kapici_rules</code>, registered only when you ask.</li></ul>`;
    const fe = fv.querySelector('.fe'), hc = fv.querySelector('.hc'), jv = fv.querySelector('.jv'), vd = fv.querySelector('.vd'), mo = fv.querySelector('.mo');
    let k = 0, m = 2;
    const draw = () => {
      const x = F[k];
      fe.innerHTML = `<code>${x.f}</code> ${x.e}`;
      hc.innerHTML = `<span class="${x.h[0] ? 'y' : 'n'}">the folder has files ${x.h[0] ? '✓' : '✗'}</span><span class="${x.h[1] ? 'y' : 'n'}">${x.h[1] ? 'not an Office lock file ✓' : 'an Office lock file (~$) ✗'}</span>`;
      jv.innerHTML = x.j === null ? '<span class="dim">not asked: a free check already said no</span>'
        : `reads ${k === 2 ? 'the git diff' : 'the first 64 KB'} · work <b class="${x.j > 0.5 ? 'y' : 'n'}">${x.j.toFixed(2)}</b>`;
      const no = x.j === null || x.j <= 0.5;
      vd.className = 'vd ' + (m < 2 || !no ? 'go' : 'stop');
      vd.innerHTML = m === 0 ? '→ <b>fires</b>: Gatekeeper is not asked.'
        : m === 1 ? `→ <b>fires</b>, as it did before; Gatekeeper's answer, "${no ? 'no work' : 'work'}", is written down beside it.`
          : no ? `→ <b>skipped</b>${x.j === null ? ': no model was called, $0' : `: no work (confidence ${(1 - x.j).toFixed(2)})`}. Counted on the trigger's row.`
            : '→ <b>fires</b>: Long to shorts starts on the footage.';
      mo.innerHTML = ['Out of the box. A trigger fires as if Gatekeeper were not there.',
        'The old path decides; Gatekeeper is asked afterwards. Farm Settings: <b>agreed 41 of 44</b> firings in 30 days.',
        'A confident "no work" skips the firing. Your call to turn on.'][m];
    };
    onSeg(fv.querySelector('.fire'), v => { k = v; draw(); });
    onSeg(fv.querySelector('.mode'), v => { m = v; draw(); });
    draw();
  },

  /* IV·5 a sentence in the command bar; the plan; the checks; plain words and Create; the Dispatcher for work with no agent */
  words(fv) {
    const W = [
      { s: 'tomorrow at 09:00 manager runs the filing batch', k: 'One-time job', p: [['agent', 'manager'], ['prompt', 'Run the filing batch'], ['when', 'Tue Oct 13, 09:00']],
        c: ['manager is one of your agents', '"tomorrow" is Tue Oct 13, worked out from today', 'one step, a time in the future'], say: 'Tomorrow, Tuesday Oct 13 at 09:00, manager runs: "Run the filing batch".' },
      { s: 'every day at 9 ask researcher for the morning briefing', k: 'Schedule', p: [['agent', 'researcher'], ['prompt', 'Write the morning briefing'], ['when', 'daily · 09:00'], ['if missed', 'skip it']],
        c: ['researcher is one of your agents', '"at 9" is 09:00', 'daily, a valid time'], say: 'Every day at 09:00, researcher writes the morning briefing. A missed day is skipped.' },
      { s: 'developer writes the tests, then reviewer checks them', k: 'Chain', p: [['step 1', 'developer · Write the tests'], ['step 2', 'reviewer · Check the tests, handed step 1\'s output']],
        c: ['developer and reviewer are your agents', 'two steps, in the order you said them', 'each step has a prompt'], say: 'developer writes the tests; then reviewer checks them, with developer\'s result in hand.' },
      { s: 'every Monday designer makes the thumbnails', bad: 1, raw: '{"kind":"schedule","agent":"designer","weekly":"Mon","prompt":"Make the thumbnails"}',
        err: 'There is no agent called "designer". Yours: developer, editor, manager, researcher, reviewer, showrunner, writer.' },
    ];
    fv.innerHTML = `
      <div class="hd"><b>🚀 Natural Language Command</b><span>Tasks · demo</span></div>
      ${seg('A sentence', 'pick', ['A job', 'A schedule', 'A chain', 'A slip'])}
      <p class="cb"><span>🚀</span><q></q></p>
      <div class="pn" data-from="1"><p class="lb">The plan a cheap model made</p><div class="po"></div></div>
      <ul class="ck" data-from="2"></ul>
      <div class="pv" data-from="3"><p class="ps"></p><p class="yn"><button type="button" class="ghost2" data-r="0">Create</button><button type="button" class="ghost2" data-r="1">Create &amp; Run</button><span aria-live="polite"></span></p></div>
      <div class="dsp" data-from="4"><p class="lb">Test Dispatcher… · work that names no agent</p>
        <p><q>new footage from the shoot, interview-take-5.mp4</q><span>→ <b>editor</b> · your rule <code>\\.mp4$</code></span></p>
        <p><q>a client wants a copy of invoice 1182</q><span>→ <b>manager</b> · the classifier: "handles orders and invoices", from its CLAUDE.md</span></p></div>`;
    const q = fv.querySelector('.cb q'), po = fv.querySelector('.po'), ck = fv.querySelector('.ck'), ps = fv.querySelector('.ps'), say = fv.querySelector('.yn span'), bs = $$(fv, '.yn button');
    onSeg(fv.querySelector('.pick'), k => {
      const w = W[k];
      q.textContent = w.s; say.textContent = '';
      po.innerHTML = w.bad ? `<pre>${w.raw}</pre>` : `<p class="kd">${w.k}</p><dl>${w.p.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>`;
      ck.innerHTML = w.bad ? `<li class="n">${w.err} The model's raw output is shown above; nothing was set up.</li>` : w.c.map(c => `<li class="y">${c}</li>`).join('');
      ps.innerHTML = w.bad ? 'Nothing to create. Say it again with an agent you have.' : w.say;
      bs.forEach(b => { b.disabled = !!w.bad; });
    })(0);
    bs.forEach(b => b.addEventListener('click', () => {
      say.textContent = +b.dataset.r ? 'Created, and the first run is queued. (Demo: nothing was set up.)' : 'Created. It is on the Plan tab. (Demo: nothing was set up.)';
    }));
  },

  /* IV·6 the two ceilings and five waiting runs; deferred with the reason; priority that grows; one agent's own list; the checks */
  queue(fv) {
    const T = [
      { a: 'editor', t: 'Thumbnails for Monday', p: 0, w: 95 },
      { a: 'writer', t: 'Script for Monday', p: 2, w: 40 },
      { a: 'editor', t: 'Cut the shorts', p: 2, w: 20 },
      { a: 'researcher', t: 'Morning briefing', p: 2, w: 10 },
      { a: 'scout', t: 'Free model radar', p: 1, w: 5 },
    ];
    fv.innerHTML = `
      <div class="hd"><b>Queue</b><span>Tasks → Runs · demo</span></div>
      <p class="slots"></p>
      <ol class="ql"></ol>
      <p class="ag" data-from="2"><b>Thumbnails for Monday</b> waited 95 minutes: priority 0, plus a point for every 30 minutes, makes 3. <b>Run Next</b> puts a waiting one first, marked ⬆ next.</p>
      <div class="aq" data-from="3"><p class="lb">editor's own list</p><ol><li>Thumbnails for Monday</li><li>Cut the shorts</li><li>Captions for the shorts</li></ol>${seg('When one ends', 'adv', ['Wait for my ▶', 'Auto-advance'])}<p class="avo"></p></div>
      <div class="cg" data-from="4"><p class="msg y"><b>Quota guard at 85%</b> acct-b's 5-hour window is at 88%, so Night digest, a schedule, waits. It starts in order when the window loosens.</p>
        <p class="msg p"><b>Parked</b> Tidy the notes: librarian's budget of $3 a day is spent, $3.04 today. The reason is written on the row.</p></div>
      ${slider('maxConcurrentTasks', 0, 5, 1, 2)}`;
    const ql = fv.querySelector('.ql'), slots = fv.querySelector('.slots');
    let n = 2, nx = -1, s = 0;
    const eff = x => x.p + Math.floor(x.w / 30);
    const draw = () => {
      const order = T.map((x, i) => ({ ...x, i })).sort((a, b) => (b.i === nx) - (a.i === nx) || eff(b) - eff(a) || b.w - a.w);
      const busy = new Set(); let run = 0;
      for (const x of order) {
        if ((n === 0 || run < n) && !busy.has(x.a)) { x.st = 'run'; busy.add(x.a); run++; }
        else x.st = busy.has(x.a) ? `deferred · ${x.a} already has one running` : `deferred · ${n} of ${n} running in the fleet`;
      }
      slots.innerHTML = `<span>fleet</span>${n ? Array.from({ length: n }, (_, k) => `<i class="${k < run ? 'f' : ''}"></i>`).join('') : '<em>no ceiling</em>'}<span>per agent</span><i class="f"></i><small>${run} running, ${order.length - run} waiting</small>`;
      ql.innerHTML = order.map(x => `<li class="${x.st === 'run' ? 'run' : 'df'}"><span class="pr">p${eff(x)}</span><b>${x.a}</b><span class="t">${x.t}${x.i === nx ? ' <em class="nx2">⬆ next</em>' : ''}</span><em class="st">${x.st === 'run' ? '▶ running' : x.st}</em>`
        + (x.st !== 'run' && s >= 2 && x.i !== nx ? `<button type="button" data-i="${x.i}">Run Next</button>` : '') + '</li>').join('');
      $$(fv, '.ql button').forEach(b => b.addEventListener('click', () => { nx = +b.dataset.i; draw(); }));
    };
    const avo = fv.querySelector('.avo');
    onSeg(fv.querySelector('.adv'), k => {
      avo.innerHTML = k ? 'When Thumbnails ends, <b>Cut the shorts starts by itself</b>, then Captions.' : 'When Thumbnails ends, Cut the shorts waits for your ▶. <b>The default.</b>';
    })(0);
    onSlider(fv, v => {
      n = v; draw();
      return [String(v), v ? `At most <b>${v}</b> at once across the fleet, and still one per agent: editor's second run waits whatever the ceiling.` : '<b>No ceiling</b> for the fleet. Only one per agent holds runs back.'];
    });
    return { step(i) { s = i; ql.classList.toggle('dfs', i === 1); draw(); } };
  },

  /* IV·7 runs and what each left: its output file, failed on a bad exit, its price, templates, the monthly history */
  record(fv) {
    const R = [
      { t: 'Cut the shorts', a: 'editor', at: '14:02', st: 'run', b: 'running · 4m', out: ['Reading interview-take-4.mp4 (1.9 GB)…', 'Found 6 moments worth a short.', 'Cutting short 1 of 6 with ffmpeg…', 'Cutting short 2 of 6…'] },
      { t: 'Morning briefing', a: 'researcher', at: '09:00', st: 'done', b: 'done • $0.12 • 3m ago', end: 'exit 0 · 6m 41s', out: ['Three things moved overnight.', '1. The sponsor replied about the November slot.', '2. Two comments ask for part two of the lighthouse story.', '3. A free model on OpenRouter scored well on short scripts.'] },
      { t: 'Render the thumbnails', a: 'editor', at: '13:20', st: 'fail', b: 'failed · exit 1', end: 'exit 1 · 2m 14s', out: ['Rendering thumbnail 1 of 4…', 'Error: font "Bebas Neue" not found on this machine.'] },
      { t: 'Free model radar', a: 'scout', at: '04:30', st: 'done', b: 'done • $0.04 • 10h ago', end: 'exit 0 · 2m 58s', out: ['Checked 41 free models.', 'One new: added to the list, not routed yet.'] },
      { t: 'Tidy the notes', a: 'librarian', at: '11:40', st: 'done', b: 'done • no price', np: 1, end: 'exit 0 · 1m 12s', out: ['Merged 3 notes about the sponsor.', 'Moved 12 old notes to the archive folder.'] },
    ];
    const TP = [['Daily plan', 'planner'], ['Weekly summary', null], ['Memory maintenance', 'librarian']];
    fv.innerHTML = `
      <div class="hd"><b>Runs</b><span>Tasks → Runs · today · demo</span></div>
      <div class="two2"><ul class="rl" role="listbox" aria-label="Runs"></ul><div class="ou"><p class="lb">Open Task Output</p><pre class="op" aria-live="polite"></pre></div></div>
      <p class="msg l cx" data-from="2"><b>Daily digest</b> tasks today <b>$0.16</b>. Tidy the notes has no price: you had a Console session open in librarian's folder while it ran, so its cost could not be told apart.</p>
      <div class="tpl" data-from="3"><p class="lb">Templates</p>${TP.map(([t, a], k) => `<p class="tr"><b>${t}</b><span>${a || 'any agent'}</span><button type="button" data-k="${k}" aria-label="New task from ${t}">▶</button></p>`).join('')}<p class="ask" hidden>Which agent? ${['writer', 'researcher', 'showrunner'].map(a => `<button type="button" data-a="${a}">${a}</button>`).join('')}</p></div>
      <div class="hi" data-from="4"><button type="button" class="ghost3 cl">Clear Finished Tasks</button><span class="hf">task-history/2026-10.jsonl · 214 rows</span>
        <p class="gg"><span>outputs</span><span class="bar"><i style="width:93%"></i></span><span>186 of 200 MB · the oldest outputs no task points to go first</span></p></div>`;
    const rl = fv.querySelector('.rl'), op = fv.querySelector('.op'), ask = fv.querySelector('.ask'), hf = fv.querySelector('.hf');
    let rows = R.map(x => ({ ...x })), sel = 0, made = 0, hist = 214;
    const show = () => {
      const x = rows[sel];
      if (!x) { op.textContent = ''; return; }
      op.innerHTML = `<b># ${x.t}</b>\nagent: ${x.a} · started ${x.at}\n\n${x.out.join('\n')}\n\n` + (x.st === 'run' ? '<i class="cur">still running ▍</i>' : x.st === 'q' ? '<i>queued, nothing written yet</i>' : `<i class="${x.st === 'fail' ? 'bd' : 'ok'}">— ${x.end}${x.st === 'fail' ? ' → failed' : ''}</i>`);
    };
    const draw = () => {
      rl.innerHTML = rows.map((x, k) => `<li role="option" aria-selected="${k === sel}" class="${x.st}${k === sel ? ' sel' : ''}" tabindex="0" data-k="${k}"><b>${x.t}</b><span>${x.a}</span><em>${x.b}</em></li>`).join('');
      $$(fv, '.rl li').forEach(li => { const go = () => { sel = +li.dataset.k; draw(); }; li.addEventListener('click', go); li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); });
      show();
    };
    const add = (t, a) => { made++; rows.unshift({ t, a, at: '14:14', st: 'q', b: 'queued · from a template', out: [] }); sel = 0; draw(); };
    $$(fv, '.tpl .tr button').forEach(b => b.addEventListener('click', () => {
      const [t, a] = TP[+b.dataset.k];
      if (a) { ask.hidden = true; add(t, a); } else { ask.hidden = false; ask.dataset.t = t; }
    }));
    $$(fv, '.ask button').forEach(b => b.addEventListener('click', () => { ask.hidden = true; add(ask.dataset.t, b.dataset.a); }));
    fv.querySelector('.cl').addEventListener('click', () => {
      const gone = rows.filter(x => x.st === 'done' || x.st === 'fail').length;
      if (!gone) return;
      rows = rows.filter(x => x.st !== 'done' && x.st !== 'fail'); hist += gone; sel = 0;
      hf.innerHTML = `task-history/2026-10.jsonl · <b>${hist} rows</b>, ${gone} just moved in`;
      draw();
    });
    draw();
    return { step(i) {
      if (rows.length !== R.length && i < 4) { rows = R.map(x => ({ ...x })); hist = 214; hf.textContent = 'task-history/2026-10.jsonl · 214 rows'; }
      const want = ['Cut the shorts', 'Render the thumbnails', 'Tidy the notes', null, null][i];
      if (want) sel = Math.max(0, rows.findIndex(x => x.t === want));
      rl.classList.toggle('px', i === 2);
      draw();
    } };
  },

  /* IV·8 a run walled at 03:00, then three ways to try again over the night; rounds of one task in one conversation */
  retries(fv) {
    const X = h => `${(h / 8 * 100).toFixed(2)}%`;
    const M = [
      { m: [[3 + 40 / 60, 0], [4 + 20 / 60, 0], [5, 0], [5 + 40 / 60, 0], [6 + 20 / 60, 0], [7, 0], [7 + 40 / 60, 1]], t: 'Six more failures. It gets through at <b>07:40</b>, half an hour after the window reset.' },
      { m: [[7 + 10 / 60, 1]], t: 'One wait, until <b>07:10</b>, the reset the plan published. Then one run, which passes.' },
      { m: [[3 + 1 / 60, 1, 'acct-c']], t: 'It carries on at <b>03:01</b> on acct-c, at 4% of its window. Never on acct-a, which refused; never from an empty pool; never for a failure that was not a limit.' },
    ];
    fv.innerHTML = `
      <div class="hd"><b>Runs · Thesis, chapter 3 · sources</b><span>researcher · acct-a · demo</span></div>
      <p class="rn">A schedule at 03:00, unattended. At 03:00 acct-a hits its usage limit; its window resets at 07:10. A retry keeps everything the run had: agent, account, route and prompt.</p>
      <div class="nt"><div class="ax">${[0, 2, 4, 6, 8].map(h => `<span style="left:${X(h)}">${String(h).padStart(2, '0')}:00</span>`).join('')}</div>
        <u class="wl" style="left:${X(3)}"><em>✗ limit</em></u><u class="rs" style="left:${X(7 + 10 / 60)}" data-from="1"><em>reset</em></u><div class="mk"></div></div>
      <div class="w3" data-from="1">${seg('How it tries again', 'how', ['Every 40 minutes', 'At the reset', 'Another account'])}<p class="wo"></p></div>
      <div class="rd" data-from="4"><p class="lb">One task, four rounds, one conversation</p>
        <ol class="rr"><li class="d"><b>R1</b><span>Read the 14 sources, list the claims</span></li><li class="wt"><i>wait 30 min</i></li><li class="on"><b>R2</b><span>Check each claim against its source</span></li><li><b>R3</b><span>Rewrite section 3.2</span></li><li><b>R4</b><span>Write what changed</span></li></ol>
        <p class="rb"><code class="bd">R2/4</code> each round <code>--resume</code>s the same session · the wait is a queue row, <code>Thesis, chapter 3 · R2</code>, not before 04:10 · a retry stays inside its round</p></div>`;
    const mk = fv.querySelector('.mk'), wo = fv.querySelector('.wo');
    let cur = 0;
    const set = onSeg(fv.querySelector('.how'), k => {
      cur = k;
      mk.innerHTML = M[k].m.map(([h, ok, a]) => `<i class="${ok ? 'y' : 'n'}" style="left:${X(h)}">${ok ? '✓' : '✗'}${a ? `<small>${a}</small>` : ''}</i>`).join('');
      wo.innerHTML = M[k].t;
    });
    set(0); mk.innerHTML = '';
    return { step(i) { if (i === 0) { mk.innerHTML = ''; wo.innerHTML = ''; } else set(i <= 3 ? i - 1 : cur); } };
  },

  /* IV·9 the strip: pause all, for a while, quiet hours over a night; what a button you press still does; who obeys */
  mainswitch(fv) {
    const X = h => `${((h - 18 + (h < 18 ? 24 : 0)) / 14 * 100).toFixed(2)}%`;
    fv.innerHTML = `
      <div class="hd"><b>Automation</b><span>the strip on the Tasks page · demo · now 14:14</span></div>
      <div class="strip"><span class="st"></span><button type="button" class="ghost2 pa"></button>
        <span class="tp" data-from="1">${['1h', '8h', '24h'].map(h => `<button type="button" class="ghost2" data-h="${parseInt(h)}">${h}</button>`).join('')}</span>
        <span class="qh" data-from="2">🌙 quiet 23:30–04:30</span></div>
      <p class="why" aria-live="polite"></p>
      <div class="tl" data-from="2"><div class="qb" style="left:${X(23.5)};width:${(5 / 14 * 100).toFixed(2)}%"></div>
        <div class="ax">${[18, 0, 4.5, 8].map(h => `<span style="left:${X(h)}">${h === 4.5 ? '04:30' : String(h).padStart(2, '0') + ':00'}</span>`).join('')}</div>
        <i class="ev hold" style="left:${X(1.2)}">⚡ 01:12 a file lands · nothing wakes</i>
        <i class="ev was" style="left:${X(3)}">⏰ 03:00</i><i class="ev df" style="left:${X(4.5)}">⏰ deferred · runs 04:30</i></div>
      <ul class="rnw" data-from="3"><li><b>▶ Run now</b> in quiet hours <em class="y">runs</em><span>pressing a button is not an unattended wake</span></li>
        <li><b>▶ Run now</b> while paused <em class="n">does not run</em><span>the main switch stops even this; Resume all first</span></li></ul>
      <div class="ob" data-from="4"><p class="lb">Everything listens to it</p><p class="who">${['⏰ schedules', '⚡ triggers', '🔗 workflows', '🌙 the night shift'].map(t => `<span>${t}</span>`).join('')}</p>
        <pre>automations.status   → {"paused": false, "quiet": "23:30–04:30", "fired": 41, "skipped": 7}
automations.pause    minutes=480 reason="moving to the new laptop"
automations.bulk     set=off kind=trigger</pre></div>`;
    const st = fv.querySelector('.st'), pa = fv.querySelector('.pa'), why = fv.querySelector('.why');
    let paused = 0;
    const draw = (msg = '') => {
      st.textContent = paused ? '⏸ paused' : '▶ running';
      st.classList.toggle('off', !!paused);
      pa.textContent = paused ? '▶ Resume all' : '⏸ Pause all';
      why.innerHTML = msg || (paused ? '' : '5 schedules, 3 triggers and 2 workflows are live.');
    };
    pa.addEventListener('click', () => { paused = !paused; draw(paused ? 'Every automation stopped. Reason: <b>"moving to the new laptop"</b>, so a pause you forget still explains itself.' : ''); });
    $$(fv, '.tp button').forEach(b => b.addEventListener('click', () => {
      const h = +b.dataset.h; paused = 1;
      draw(`Paused until <b>${h === 24 ? 'tomorrow 14:14' : h === 8 ? '22:14' : '15:14'}</b>. It lifts by itself; nothing to undo.`);
    }));
    draw();
  },

  /* IV·10 the week ahead, each run with its usual time and success; what runs and waits; a health card; two warnings */
  forecast(fv) {
    const J = [
      { t: 'Free model radar', a: 'explorer', at: '04:30', m: 3, s: 93, on: () => 1 },
      { t: 'Back up the agent repo', a: 'archivist', at: '19:00', m: 1, s: 100, on: () => 1 },
      { t: 'Morning plan', a: 'researcher', at: '09:00', m: 4, s: 96, on: () => 1 },
      { t: 'Weekly channel rhythm', a: 'showrunner', at: 'Mon 07:00', m: 9, s: 100, on: d => d.getDay() === 1 },
      { t: 'Send the invoice reminder', a: 'manager', at: 'Oct 31, 18:00', m: 0, s: null, on: d => d.getMonth() === 9 && d.getDate() === 31 },
    ];
    fv.innerHTML = `
      <div class="hd"><b>Task Forecast</b><span>from Tue Oct 13 · demo</span></div>
      <p class="tot" data-from="2"></p>
      <div class="gr"></div>
      <div class="wt" data-from="2"><p><b>▶ Running</b>Cut the shorts · editor · 6 min in</p><p><b>⏳ Waiting</b>Thumbnails for Monday · editor · deferred: editor already has one running</p></div>
      <div class="hc" data-from="3"><p class="lb">Task health · explorer · 30 days</p><p class="hb"><b>93%</b><span>28 runs · 26 ✓ · 2 ✗ · 0 cancelled</span><span>median 3 min · retried 2 · sent back by a check 1</span><span>from: schedule 28 · you 0 · trigger 0 · workflow 0</span></p><div class="bar"><i></i></div></div>
      <div class="ins" data-from="4"><p class="msg p"><b>scout</b> passed 4 of its 9 runs in 30 days, 44%.</p><p class="msg p"><b>Price check</b> failed on every recent run: the chain is broken. Look at the output before it spends more.</p>
        <p class="fam">"Price check 2026-10-10" and "Price check 2026-10-11 (retry 2)" count as one family.</p></div>
      ${slider('forecastDays', 1, 21, 1, 7)}`;
    const gr = fv.querySelector('.gr'), tot = fv.querySelector('.tot');
    onSlider(fv, n => {
      const D = Array.from({ length: n }, (_, k) => new Date(2026, 9, 13 + k));
      let runs = 0, time = 0;
      const cols = `minmax(0,1fr) repeat(${n},minmax(0,${n > 10 ? 12 : 22}px))`;
      gr.style.gridTemplateColumns = cols;
      gr.innerHTML = '<span></span>' + D.map(d => `<span class="dy">${'SMTWTFS'[d.getDay()]}<br>${d.getDate()}</span>`).join('')
        + J.map(j => `<span class="jn"><b>${j.t}</b><small>${j.a} · ${j.at}</small><small class="ms" data-from="1">${j.s === null ? 'no history yet' : `median ${j.m} min · ${j.s}% of 30 days`}</small></span>`
          + D.map(d => { const r = j.on(d); if (r) { runs++; time += j.m; } return `<i class="${r ? 'r' : ''}"></i>`; }).join('')).join('');
      tot.innerHTML = `<b>${runs}</b> scheduled runs · about <b>${mins(time)}</b> of agent time · no dollar forecast: a task's cost lives in its session`;
      const cur = +fv.dataset.s || 0;
      $$(fv, '.gr [data-from]').forEach(el => el.classList.toggle('in', cur >= +el.dataset.from));
      return [String(n), `Lists ${n === 1 ? 'tomorrow' : `the next <b>${n}</b> days`}. ${n >= 19 ? 'The invoice reminder, once on Oct 31, is in range.' : 'The invoice reminder, once on Oct 31, is further off.'}`];
    });
    const hb = fv.querySelector('.hc .bar i');
    return { step(i) { hb.style.width = i >= 3 ? '93%' : '0'; } };
  },
};
