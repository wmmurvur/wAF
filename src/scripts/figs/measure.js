// District IX, Measured, not claimed: one figure per feature, each a small rebuilt screen with demo data. Elements carry
// data-from (scripts/district.js shows them by step); step(i) moves the rest. The rules, thresholds and defaults are the
// extension's own (data/deep/measure.js cites them): the status bar's 80 and 95, the card's 75 and 90, the beat of 60 s
// and 5 min, the nine kinds and their weights, the budget's 80%, the anomaly's median + 3.5σ and 2×, the $1 floor, the
// 2× week, the judge ladder's climb, the 30-minute break. Names and figures are demo data from the site's one farm:
// accounts acct-a to acct-d, agents builder, showrunner, researcher, editor, scout and librarian.
import { ACCT } from '../state.js';

const $$ = (fv, s) => [...fv.querySelectorAll(s)];
const usd = v => '$' + v.toFixed(2);
const K = n => n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : (n / 1e3).toFixed(1) + 'K';

/* two or three buttons, one pressed */
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

/* the nine kinds of step (Blueprint, What Work Costs) */
const KINDS = [
  ['◈', 'thinking', 'billed as output, the dearest token there is'],
  ['▸', 'reply', 'the model writing: output'],
  ['⌘', 'local tool', 'runs on this machine, free to run; its result is paid on the next call'],
  ['↩', 'tool result', 'free to make, and what makes the next call bigger'],
  ['⇄', 'MCP tool', 'a request to an MCP server, no model tokens'],
  ['⌗', 'web', 'out to the internet; the page comes back into context'],
  ['⑂', 'sub-agent', 'its own conversation, on this session\'s budget'],
  ['⚙', 'harness', 'inside the CLI: no model, no network'],
  ['·', 'local only', 'never reached a model'],
];

export default {
  /* IX·1 the status bar, the Dashboard card, the beat, every account, and what is shown when nothing can be known */
  planuse(fv) {
    const CODEX = { n: 'codex-1', c: '#9ad', h: 34, w: 52, left: 'from its session file' };
    const rows = [...ACCT, CODEX];
    fv.innerHTML = `
      <div class="hd"><b>Plan usage</b><span>the status bar and the Dashboard · demo</span></div>
      <div class="sbw"><p class="sbar"><span class="pu">◷ <b></b></span><span>🤖 3 active • $41.20 today</span></p>
        <p class="tip">Worst limit on the plan decides the colour: yellow at 80%, red at 95%. <b>Check now</b></p></div>
      <div class="card" data-from="1"><p class="ch"><b>Plan usage</b><span>Max · checked 40 s ago</span><i>⟳</i></p>
        <div class="lim"><span>Current session (5h)</span><div class="bar"><i class="c5"></i></div><em class="v5"></em><small>Resets 21:40 · in 3h 49m</small></div>
        <div class="lim"><span>Current week (all models)</span><div class="bar"><i class="cw" style="width:41%"></i></div><em>41%</em><small>Resets Thu 09:00 · in 2d 6h</small></div>
        <div class="lim"><span>Current week (Sonnet only)</span><div class="bar"><i style="width:12%"></i></div><em>12%</em><small>Resets Thu 09:00 · in 2d 6h</small></div>
        <p class="cf">live · every 60 s while an agent works</p></div>
      <div class="beat" data-from="2"><p class="lb">When it is read · the last 30 minutes</p>
        <div class="tl"><span class="z idle" style="left:0;width:33%">idle · 5 min</span><span class="z act" style="left:33%;width:34%">working · 60 s</span><span class="z idle" style="left:67%;width:33%">idle again</span>
          ${[0, 16.7, 33.3, ...Array.from({ length: 10 }, (_, k) => 36.7 + k * 3.33), 70, 86.7].map((x, k) => `<i style="left:${x}%"${k === 13 ? ' class="edge"' : ''}></i>`).join('')}</div>
        <p class="bn">The turn that ends pulls the next read forward. The bar, the card and an agent's <code>usage.plan</code> share one reading: one request per beat.</p></div>
      <div class="accs" data-from="3">${rows.map(a => `<div class="ar" style="--ac:${a.c}"><b>${a.n}</b><div class="bar"><i style="width:${a.h}%"></i></div><em>5h ${a.h}%</em><div class="bar w"><i style="width:${a.w}%"></i></div><em>wk ${a.w}%</em><small>${a.n === 'codex-1' ? a.left : 'resets ' + a.left}</small></div>`).join('')}
        <p class="agy"><b>Antigravity</b> read by <code>agy -p /usage</code>, on a beat of its own, only while Antigravity works.</p></div>
      <ul class="know" data-from="4">
        <li><b>no indicator</b><span>An API key, Bedrock or Vertex: no plan, so no percentage, rather than "unknown" forever.</span></li>
        <li><b>usage ?</b><span>The sign-in expired: start a Claude Code session to refresh it. Agent Farm never writes to it.</span></li>
        <li><b>backing off</b><span>The endpoint said slow down: next automatic read in 6 min. ⟳ still reads, because you pressed it.</span></li></ul>
      ${slider('demo: the 5h window', 0, 100, 1, 86)}`;
    const pu = fv.querySelector('.pu'), b5 = fv.querySelector('.c5'), v5 = fv.querySelector('.v5');
    onSlider(fv, v => {
      pu.querySelector('b').textContent = `3h 49m - ${v}% / wk 41%`;
      pu.className = 'pu' + (v >= 95 ? ' red' : v >= 80 ? ' yel' : '');
      b5.style.width = v + '%'; v5.textContent = v + '%';
      b5.className = 'c5' + (v >= 90 ? ' red' : v >= 75 ? ' yel' : '');
      return [v + '%', v >= 95 ? 'Past <b>95%</b>: the status bar is red.' : v >= 80 ? 'Past <b>80%</b>: the status bar is yellow. The card has its own marks, 75% and 90%.' : 'Under 80%: the status bar stays plain.'];
    });
  },

  /* IX·2 one turn: its steps by kind, the pair 26api·99steps, what each call spent, raw against weighted, the cache by TTL */
  steps(fv) {
    // the turn's rows, in order: 64 of them, drawn from a fixed pattern so the figure is the same on every visit
    const P = '7012323012323230123401232323501236323012823270123230124232350123';
    const rows = P.split('').map(Number);
    const n = KINDS.map((_, k) => rows.filter(r => r === k).length);
    // the turn's tokens (demo): input, output, cache read, one-hour cache write; weights against one Sonnet input token
    const T = [['input', 3e3, 1, 3], ['output', 45e3, 5, 15], ['cache read', 1.5e6, 0.1, 0.3], ['cache write 1h', 50e3, 2, 6]];
    const raw = T.reduce((s, t) => s + t[1], 0), wt = T.reduce((s, t) => s + t[1] * t[2], 0), cost = T.reduce((s, t) => s + t[1] * t[3] / 1e6, 0);
    fv.innerHTML = `
      <div class="hd"><b>One turn</b><span>session cb489864 · sonnet · demo</span></div>
      <p class="lb">The turn's last 64 rows, by kind</p>
      <div class="strip" aria-hidden="true">${rows.map(k => `<i class="k${k}">${KINDS[k][0]}</i>`).join('')}</div>
      <div class="kl" role="group" aria-label="The nine kinds of step">${KINDS.map(([g, t], k) => `<button type="button" data-k="${k}" aria-pressed="false"><i>${g}</i><span>${t}</span><b>${n[k]}</b></button>`).join('')}</div>
      <p class="ksel" aria-live="polite">Pick a kind: what it is, and what it costs.</p>
      <div class="pair" data-from="1"><code>26api·99steps</code><span>26 round trips carried 99 steps: <b>31</b> reasoning · <b>52</b> tool calls · <b>16</b> replies. A tool result is the answer coming back, not a step.</span></div>
      <ol class="calls" data-from="2">
        <li><i class="k0">◈</i><span>thinking · 9 s</span><em>call 14 · ${K(61.2e3)} raw · ⚖ ${K(9.8e3)}</em></li>
        <li><i class="k2">⌘</i><span>Read src/invoice.ts</span><em class="ride">rode on call 14</em></li>
        <li><i class="k3">↩</i><span>212 lines</span><em class="ride">rode on call 14</em></li>
        <li><i class="k1">▸</i><span>The date is parsed twice…</span><em>call 15 · ${K(64.9e3)} raw · ⚖ ${K(11.4e3)}</em></li></ol>
      <div class="wt" data-from="3">${seg('Which figure', 'unit', ['Raw', '⚖ Weighted'])}
        <div class="stack">${T.map((t, k) => `<i class="t${k}" title="${t[0]}"></i>`).join('')}</div>
        <ul class="tk">${T.map((t, k) => `<li class="t${k}"><span>${t[0]}</span><b></b></li>`).join('')}</ul>
        <p class="tot"></p></div>
      <p class="ttl msg c" data-from="4">Cache written this turn: <b>${K(50e3)} for one hour</b> at 2× an input token, <b>0 for five minutes</b> at 1.25×. A line that gives no split is charged at the one-hour rate.</p>`;
    const bs = $$(fv, '.kl button'), chips = $$(fv, '.strip i'), ks = fv.querySelector('.ksel');
    bs.forEach((b, k) => b.addEventListener('click', () => {
      const on = !b.classList.contains('on');
      bs.forEach((x, j) => { x.classList.toggle('on', on && j === k); x.setAttribute('aria-pressed', String(on && j === k)); });
      chips.forEach(c => c.classList.toggle('dim', on && !c.classList.contains('k' + k)));
      ks.innerHTML = on ? `<b>${KINDS[k][0]} ${KINDS[k][1]}</b>: ${KINDS[k][2]}. ${n[k]} in this turn.` : 'Pick a kind: what it is, and what it costs.';
    }));
    const st = $$(fv, '.stack i'), tk = $$(fv, '.tk b'), tot = fv.querySelector('.tot');
    onSeg(fv.querySelector('.unit'), w => {
      const v = T.map(t => w ? t[1] * t[2] : t[1]), all = v.reduce((a, b) => a + b, 0);
      st.forEach((el, k) => { el.style.width = (v[k] / all * 100) + '%'; });
      tk.forEach((el, k) => { el.textContent = `${K(v[k])} · ${Math.round(v[k] / all * 100)}%`; });
      tot.innerHTML = w ? `<b>⚖ ${K(wt)}</b> the way the plan counts it: cache reads weigh a tenth, output five. <b>${usd(cost)}</b> at the rate card.`
        : `<b>${K(raw)} raw</b>, ${Math.round(T[2][1] / raw * 100)}% of it cache reads, the cheapest thing in it. Raw ÷ ⚖ = <b>${(raw / wt).toFixed(2)}×</b>.`;
    })(0);
  },

  /* IX·3 a budget per agent and for the fleet; the warning and the brake; a run's cap; a mission's two ceilings; media */
  budgets(fv) {
    const B = [['builder', 25], ['showrunner', 10, 6.4], ['researcher', 0, 3.1]];
    fv.innerHTML = `
      <div class="hd"><b>Budgets · today</b><span>API-equivalent value · demo</span></div>
      <pre class="js">"agentFarm.budgets": { "builder": 25, "showrunner": 10, "researcher": 0, "*": 50 }</pre>
      <div class="bud">${B.map(([nm, cap, v]) => `<div class="br" data-n="${nm}"><b>${nm}</b><div class="bar"><i${v !== undefined && cap ? ` style="width:${v / cap * 100}%"` : ''}></i><u style="left:80%"></u></div><em>${cap ? (v !== undefined ? `${usd(v)} / $${cap}` : '') : `${usd(v)} · no cap`}</em></div>`).join('')}
        <div class="br fl"><b>* fleet</b><div class="bar"><i></i><u style="left:80%"></u></div><em></em></div></div>
      <p class="msg st l" data-from="1" aria-live="polite"></p>
      <div class="run" data-from="2"><p class="lb">Run trailer-cut · hard cap $2.00, from the workflow</p>
        <ol>${[['script', 0.21], ['shots · media', 0.88], ['check · haiku', 0.01], ['shots again · media', 0.97]].map(([t, v]) => `<li><span>${t}</span><em>${usd(v)}</em></li>`).join('')}<li class="no"><span>assemble</span><em>not started</em></li></ol>
        <p class="end">Stopped: spent <b>$2.07</b> of the <b>$2.00</b> cap, from the workflow. No further step starts.</p></div>
      <div class="mis" data-from="3"><p class="lb">Mission "launch week" · whichever runs out first</p>
        <div class="mr"><span>maxCostUSD</span><div class="bar"><i style="width:28%"></i></div><em>$1.40 / $5</em></div>
        <div class="mr hot"><span>maxTokens</span><div class="bar"><i style="width:96%"></i></div><em>1.92M / 2M</em></div>
        <p class="mn">A team on a plan never moves the dollars; the tokens stop it.</p></div>
      <div class="med" data-from="4"><div class="mr"><span>Media · 30 days</span><div class="bar"><i style="width:100%"></i></div><em>$41.20 / $40</em></div>
        <p class="mn">⚠ once this month: the estimated media cost passed <code>mediaBudgetMonthUSD</code>.</p>
        <div class="un"><code>budgetsUnlimited</code>${seg('Suspend every daily budget', 'unl', ['off', 'on'])}</div></div>
      ${slider('demo: builder today', 0, 30, 0.1, 21)}`;
    const bars = $$(fv, '.bud .br'), st = fv.querySelector('.st');
    let spent = 21, unl = 0;
    const draw = () => {
      const b = bars[0], p = spent / 25 * 100, fleet = spent + 6.4 + 3.1, fp = fleet / 50 * 100;
      b.querySelector('i').style.width = (unl ? 0 : Math.min(100, p)) + '%';
      b.querySelector('em').textContent = unl ? `${usd(spent)} · suspended` : `${usd(spent)} / $25`;
      const s = unl ? '' : p >= 100 ? 'over' : p >= 80 ? 'warn' : '', fs = unl ? '' : fp >= 100 ? 'over' : fp >= 80 ? 'warn' : '';
      bars.forEach(x => x.classList.toggle('off', !!unl));
      for (const [el, c] of [[b, s], [bars[3], fs]]) { el.classList.toggle('over', c === 'over'); el.classList.toggle('warn', c === 'warn'); }
      const f = bars[3]; f.querySelector('i').style.width = (unl ? 0 : Math.min(100, fp)) + '%';
      f.querySelector('em').textContent = unl ? `${usd(fleet)} · suspended` : `${usd(fleet)} / $50`;
      st.classList.toggle('p', s === 'over'); st.classList.toggle('y', s === 'warn'); st.classList.toggle('l', !s);
      st.innerHTML = unl ? '<b>Suspended.</b> No agent has a cap and nothing warns or blocks; the figures stay in settings for when you turn it back.'
        : s === 'over' ? `<b>⛔ builder is over its $25 budget.</b> One notification today. Its next launch is parked: daily budget reached.`
        : s === 'warn' ? `<b>⚠ builder is at ${Math.round(p)}% of its $25 budget.</b> A warning in Insights; it still runs.`
        : `<b>builder</b> is at ${Math.round(p)}% of its budget. Nothing to say yet.`;
    };
    onSeg(fv.querySelector('.unl'), k => { unl = k; draw(); });
    onSlider(fv, v => { spent = v; draw(); return [usd(v), unl ? 'Suspended: the slider moves the spend, nothing reacts.' : 'Drag past <b>$20</b> (80%) for the warning, past <b>$25</b> for the brake.']; });
  },

  /* IX·4 the window fills: automatic jobs go cheaper, then wait; a job naming an account waits at its handover line */
  downgrade(fv) {
    const J = [
      { n: 'nightly-digest', s: 'schedule', m: 'opus' },
      { n: 'trailer-cut', s: 'trigger', m: 'sonnet' },
      { n: 'acct-c backlog', s: 'names acct-c', m: 'sonnet', acc: 1 },
      { n: 'your session', s: 'opened by you', m: 'opus', you: 1 },
    ];
    fv.innerHTML = `
      <div class="hd"><b>The five-hour window</b><span>guard 85% · downgrade 70% set for this demo</span></div>
      <div class="win"><div class="bar"><i></i><u class="dg" data-from="2" style="left:70%"><em>70<span> cheaper</span></em></u><u class="gd" style="left:85%"><em>85<span> wait</span></em></u><u class="ho" data-from="1" style="left:90%"><em>90<span> line</span></em></u></div></div>
      <ul class="jobs">${J.map(j => `<li${j.acc ? ' data-from="1"' : ''}><b>${j.n}</b><span class="src">${j.s}</span><span class="mdl"></span><em></em></li>`).join('')}</ul>
      <pre class="hdr" data-from="3"></pre>
      <div class="pol" data-from="4"><p class="lb">agentFarm.modelPolicy · first match wins</p><pre class="js">[{ "source": "trigger", "model": "haiku" }]</pre>
        <p><b>trailer-cut</b> came from a trigger: haiku, whatever the window. <b>weekly-report</b> names opus on its own schedule: opus, because the automation's own model beats the rule.</p></div>
      ${slider('demo: the window', 0, 100, 1, 82)}`;
    const li = $$(fv, '.jobs li'), hdr = fv.querySelector('.hdr'), bar = fv.querySelector('.win .bar i');
    let shown = 0, w = 82;
    const draw = () => {
      bar.style.width = w + '%';
      bar.className = w >= 85 ? 'red' : w >= 70 ? 'yel' : '';
      J.forEach((j, k) => {
        let m = j.m, say = 'as asked';
        if (j.you) say = 'left alone';
        else if (j.acc && w >= 90 && shown >= 1) { m = '—'; say = `held: quota handover line (${w}% of acct-c's 5h window, at or past 90%)`; }
        else if (w >= 85) { m = '—'; say = 'deferred: starts when the window loosens'; }
        else if (w >= 70) { m = 'haiku'; say = `downgraded from ${j.m}`; }
        li[k].querySelector('.mdl').textContent = m;
        li[k].querySelector('em').textContent = say;
        li[k].classList.toggle('wait', m === '—'); li[k].classList.toggle('down', m !== '—' && m !== j.m);
      });
      hdr.textContent = '── nightly-digest · the top of its output ──\n' + (w >= 85 ? '(none yet: it is waiting)' : w >= 70 ? `Model policy: quota window ${w}% ≥ 70% — downgraded…` : 'opus, as asked');
    };
    onSlider(fv, v => { w = v; draw(); return [v + '%', v >= 85 ? 'Past the guard: the farm\'s own jobs wait. Yours runs.' : v >= 70 ? 'Past the downgrade line: the farm\'s own jobs run on haiku. Yours is left alone.' : 'Under both lines: every job runs on the model it asked for.']; });
    return { step(i) { shown = i; draw(); } };
  },

  /* IX·5 fourteen days and today: the median, the spread, the line, the $1 floor, the week, the heavy hitters */
  anomaly(fv) {
    const D = [1.24, 1.76, 1.42, 2.10, 1.86, 1.60, 1.94, 1.32, 1.82, 2.24, 1.70, 1.56, 1.90, 1.78];
    const med = a => { const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
    const M = med(D), MAD = med(D.map(x => Math.abs(x - M))), SD = 1.4826 * MAD, LINE = Math.max(M + 3.5 * SD, 2 * M), TOP = 10;
    const y = v => Math.min(100, v / TOP * 100);
    fv.innerHTML = `
      <div class="hd"><b>researcher · cost per day</b><span>last 14 days and today · demo</span></div>
      <div class="ch"><div class="cols">${D.map(v => `<i style="height:${y(v)}%"></i>`).join('')}<i class="today"></i>
        <u class="md" style="bottom:${y(M)}%"><em>median ${usd(M)}</em></u>
        <u class="ln" data-from="1" style="bottom:${y(LINE)}%"><em>flag line ${usd(LINE)}</em></u>
        <u class="fl" data-from="2" style="bottom:${y(1)}%"><em>$1 floor</em></u></div>
        <p class="ax"><span>14 days ago</span><span>today</span></p></div>
      <p class="msg vd" data-from="1" aria-live="polite"></p>
      <p class="msg dim" data-from="2"><b>librarian</b> spent $0.40 today, 8× its $0.05 median. Under the $1 floor: noise, not flagged.</p>
      <div class="wk" data-from="3"><div class="mr"><span>last week</span><div class="bar"><i style="width:25%"></i></div><em>$6</em></div><div class="mr hot"><span>this week</span><div class="bar"><i style="width:100%"></i></div><em>$24</em></div>
        <p class="mn">⚠ Weekly cost trend: $24 this week vs $6 last week (4.0x)</p></div>
      <div class="hh" data-from="4"><p class="lb">Heavy hitters · last 7 days</p><ol>
        <li><code>a3f9c2e1</code><span>builder · relay leg 88</span><em>23% of tokens</em></li>
        <li><code>7c41e2a0</code><span>showrunner</span><em>16%</em></li>
        <li><code>e09b44d7</code><span>researcher · today</span><em>12%</em></li></ol><p class="mn">3 sessions of 61 ate half the tokens.</p></div>
      ${slider('demo: researcher today', 0, 10, 0.05, 7.45)}`;
    const t = fv.querySelector('.today'), vd = fv.querySelector('.vd');
    onSlider(fv, v => {
      const x = v / M, flag = v >= 1 && v > LINE;
      t.style.height = y(v) + '%'; t.classList.toggle('hot', flag);
      vd.classList.toggle('p', flag); vd.classList.toggle('l', !flag);
      vd.innerHTML = flag ? `<b>⚠ researcher is at ${x.toFixed(1)}× its normal today.</b> Past median + 3.5σ and at least twice the median. No model was asked.`
        : v < 1 ? '<b>Under $1:</b> not judged.' : `<b>Within its usual:</b> ${x.toFixed(1)}× the median, under the line.`;
      return [usd(v), `Median <b>${usd(M)}</b>, spread σ ≈ <b>${usd(SD)}</b> (1.4826 × the median deviation). The line is the higher of median + 3.5σ and 2× the median.`];
    });
  },

  /* IX·6 what a figure is: from the transcript at your rates, rates dated, real zeros and no made-up prices, a blank, time worked */
  honest(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Sessions · today</b><span>what each figure is, and is not · demo</span></div>
      <table class="hs"><tbody>
        <tr><td>Claude Code</td><td>sonnet</td><td class="fg">$1.43</td><td>from its transcript, at your rate card</td></tr>
        <tr data-from="2"><td>OpenCode</td><td>a free model</td><td class="fg">$0.00</td><td>OpenCode's own figure: a real zero</td></tr>
        <tr data-from="2"><td>Codex</td><td>ChatGPT plan</td><td class="fg">412K tok</td><td>no price: the plan states none, so none is made up</td></tr>
        <tr data-from="2" class="w"><td>Claude Code</td><td>a model with no rate</td><td class="fg">$0.00 ⚠</td><td>named in the Dashboard's warning: no price rule</td></tr>
        <tr data-from="3" class="b"><td>Task</td><td>nightly-digest</td><td class="fg">—</td><td>two sessions could be it: no number is chosen</td></tr>
      </tbody></table>
      <div class="rate" data-from="1"><p class="lb">sonnet · output · USD per million</p>
        <ol class="rl"><li><b>$15</b><span>since 2026-05-01</span></li></ol>
        <button type="button" class="ghost2">Change it to $18</button><p class="rn"></p></div>
      <div class="dur" data-from="4"><p class="lb">Session cb489864 · picked up again the next morning</p><p class="dv"><b></b><span></span></p><p class="rt"></p></div>
      ${slider('agentFarm.sessionBreakMin', 0, 120, 5, 30)}`;
    const rl = fv.querySelector('.rl'), rn = fv.querySelector('.rn'), btn = fv.querySelector('.ghost2');
    btn.addEventListener('click', () => {
      if (btn.disabled) return; btn.disabled = true;
      rl.insertAdjacentHTML('beforeend', '<li class="nw"><b>$18</b><span>from 2026-10-12, on</span></li>');
      rn.innerHTML = 'This morning\'s <b>$1.43</b> stays $1.43: each message keeps the rate it ran at.';
    });
    // the session: 32 minutes of turns, short pauses of 3, 5, 4 and 6 minutes, and two long ones, 45 minutes and a night
    const TURNS = 32, SHORT = [3, 5, 4, 6], LONG = [45, 1453], ALL = TURNS + [...SHORT, ...LONG].reduce((a, b) => a + b, 0);
    const span = m => m >= 120 ? (m / 60).toFixed(1) + ' h' : m + 'm';
    const dv = fv.querySelector('.dv'), rt = fv.querySelector('.rt');
    onSlider(fv, v => {
      const act = v === 0 ? ALL : TURNS + [...SHORT, ...LONG].filter(g => g <= v).reduce((a, b) => a + b, 0);
      dv.querySelector('b').textContent = span(act);
      dv.querySelector('span').textContent = act < ALL ? `⋯${span(ALL)}` : '';
      rt.innerHTML = `<b>${usd(1.43 / (act / 60))}</b> an hour of ${act < ALL ? 'work' : 'clock, a night included'}.`;
      return [v ? v + 'm' : '0', v ? `Pauses longer than <b>${v} min</b> between turns are not work.` : '<b>0 = count everything</b>, the night included.'];
    });
  },

  /* IX·7 a check climbs the ladder only on a FAIL; an upper PASS overturns it; a hopeless retry is not bought */
  ladder(fv) {
    const C = [
      { b: 'Overturned', what: 'shot-3.png', crit: 'the beam is visible through the rain', r: [['haiku', 'FAIL', 'no beam found', '$0.0021'], ['sonnet', 'PASS', 'beam visible, upper left', '$0.0094']],
        out: 'Escalated: haiku said FAIL (no beam found) → sonnet says PASS — overturned, no retry paid' },
      { b: 'Upheld', what: 'shot-5.png', crit: 'the keeper is in frame', r: [['haiku', 'FAIL', 'cut off at the left edge', '$0.0021'], ['sonnet', 'FAIL', 'cut off at the left edge', '$0.0094']],
        out: 'Escalated: haiku said FAIL → sonnet says FAIL — upheld; the step runs again with the critique' },
      { b: 'First rung', what: 'chapter-3.md', crit: 'every claim has a source', r: [['haiku', 'PASS', '14 claims, 14 sources', '$0.0021']],
        out: 'PASS on the first rung. Nothing climbed.' },
    ];
    fv.innerHTML = `
      <div class="hd"><b>A step's check</b><span>judgeLadder haiku,sonnet · demo</span></div>
      ${seg('Pick a check', 'case', C.map(c => c.b))}
      <div class="chk"><p class="lb">Check</p><b class="what"></b><span class="crit"></span></div>
      <ol class="rungs"><li class="r0"></li><li class="r1" data-from="1"></li></ol>
      <pre class="out" data-from="1"></pre>
      <p class="msg y" data-from="2"><b>Attempt 2: FAIL, the same defect as attempt 1.</b> No progress, so the retries left are held back and the run's supervisor is woken to replan.</p>
      <div class="cmp" data-from="3"><div class="ba"><span class="b4"><em>before</em></span><i>→</i><span class="af"><em>after</em></span></div><p>“Did only what was asked change?” The colour bars were in the source, so they are not a change. <b>A check with no verdict is never a pass.</b></p></div>
      <p class="eco msg l" data-from="4"><b>economy</b> 3 climbs · 2 overturned · 1 stopped · 1 replan · ~$0.84 saved<br><span>A lean check on haiku: measured $0.0021, against $0.0245 before.</span></p>`;
    const r0 = fv.querySelector('.r0'), r1 = fv.querySelector('.r1'), out = fv.querySelector('.out');
    const rung = (el, r) => { el.className = el.className.replace(/ ?(ok|no|na)/g, '') + (r ? (r[1] === 'PASS' ? ' ok' : ' no') : ' na'); el.innerHTML = r ? `<b>${r[0]}</b><span><em>${r[1]}</em> ${r[2]}</span><small>${r[3]}</small>` : '<b>sonnet</b><span>not asked: the first rung passed</span>'; };
    let mine = false;
    const pick = onSeg(fv.querySelector('.case'), k => {
      const c = C[k];
      fv.querySelector('.what').textContent = c.what; fv.querySelector('.crit').textContent = `“${c.crit}”`;
      rung(r0, c.r[0]); rung(r1, c.r[1]); out.textContent = c.out;
    });
    fv.querySelector('.case').addEventListener('click', () => { mine = true; });
    pick(0);
    return { step(i) { if (!mine) pick(i === 2 ? 1 : 0); } };
  },

  /* IX·8 an agent's regression set: its cases, a run, what changed against the last run, A against B, and between runs */
  evals(fv) {
    const CS = [
      ['Summarise chapter 3 in five lines', 'five lines; every name is from the chapter', 'from a ⭐ 2 session', '✅', '✅', ''],
      ['Fix the date format in invoice.ts', 'tests pass; no other file changed', 'from a check that FAILed', '✅', '⛔', 'regressed'],
      ['Draft the trailer voice-over', 'under 60 words; ends on the title', 'written by hand', '⛔', '✅', 'fixed'],
      ['List open items for the handover', 'every open item, none closed', 'from a ⭐ 1 session', '✅', '⛔', 'regressed'],
      ['Rename the export folder', 'one commit; the old name is gone', 'written by hand', '', '✅', 'new'],
    ];
    fv.innerHTML = `
      <div class="hd"><b>Evals · editor</b><span>regression set · 14 cases · demo</span></div>
      <table class="cs"><thead><tr><th>Case</th><th class="r" data-from="2">run 7</th><th class="r" data-from="2">run 8</th><th data-from="2"></th></tr></thead><tbody>
        ${CS.map(c => `<tr><td><b>${c[0]}</b><small>expect: ${c[1]} · ${c[2]}</small></td><td class="r" data-from="2">${c[3] || '—'}</td><td class="r" data-from="2">${c[4]}</td><td data-from="2"><em class="${c[5]}">${c[5] === 'regressed' ? '⛔ regressed' : c[5] === 'fixed' ? '✅ fixed' : c[5] === 'new' ? '🆕 new' : ''}</em></td></tr>`).join('')}
      </tbody></table>
      <div class="ask" data-from="1"><p><b>Run 14 cases?</b> 14 calls to editor on haiku, and 14 judge calls.</p><button type="button" class="ghost2">Run</button><span class="prog" aria-live="polite"></span></div>
      <p class="msg p sm" data-from="2"><b>12/14 passed, 2 regressed:</b> the date format, and the handover list.</p>
      <div class="ab" data-from="3"><p class="lb">A against B · 5 prompts · answers shown in random order</p>
        <p><span class="a">A</span> the instructions as they are</p><p><span class="b">B</span> + “Write dates as YYYY-MM-DD.”</p>
        <p class="res"><b>B 4 · A 0 · equal 1.</b> Apply B, with a backup, into the version history?</p></div>
      <div class="btw" data-from="4"><div class="mr"><span>Quality · 14 days</span><div class="bar"><i style="width:76%"></i></div><em>3.8 / 5</em></div>
        <p class="mn"><b>Pulse</b> PASS · “I am editor: I fix and tighten what the writer drafts.”</p>
        <p class="mn"><b>Instructions v4</b> 18 sessions · quality 4.0 ▲0.6 · $1.95 a day</p></div>`;
    const btn = fv.querySelector('.ask button'), prog = fv.querySelector('.prog');
    btn.addEventListener('click', async () => {
      if (btn.disabled) return; btn.disabled = true;
      for (let k = 1; k <= 14; k++) { prog.textContent = `case ${k} / 14 · ${usd(k * 0.0063)}`; await new Promise(r => setTimeout(r, 120)); }
      prog.textContent = 'done · 14 / 14 · $0.09'; btn.disabled = false;
    });
  },

  /* IX·9 the findings: one list, a way to close each, whether the fix held, a rule from corrections, and Living */
  insights(fv) {
    const R = [
      ['x', '⛔', 'builder is over its $25 budget today', 'budget', ''],
      ['w', '⚠', 'researcher is at 4.2× its normal today', 'cost-anomaly', '↻4'],
      ['w', '⚠', 'editor\'s quality fell 0.9 this week', 'quality', ''],
      ['w', '⚠', 'Bash(*): everything runs without asking · scout', 'permissions', '⚠back'],
      ['i', 'ℹ', 'trigger "inbox-watch" never fired', 'trigger', ''],
    ];
    const LV = [['ok', 'Notices', 'none older than a day'], ['w', 'Questions', '1 open for 26 h'], ['ok', 'Queue', 'oldest item 2 h'], ['ok', 'Automations', '9 on, all fired this week'],
      ['x', 'Duties', '[daily] journal has nothing behind it'], ['ok', 'Spend', '$9.80 of $50'], ['w', 'Your check', 'diary/{today}.md is missing']];
    const score = Math.round(LV.reduce((s, [k]) => s + (k === 'ok' ? 1 : k === 'w' ? 0.5 : 0), 0) / LV.length * 100);
    fv.innerHTML = `
      <div class="hd"><b>Insights</b><span>the fleet's findings · demo</span></div>
      <ul class="ins">${R.map(([c, g, t, cat, led], k) => `<li class="${c}" data-k="${k}"><i>${g}</i><span class="t">${t}<small>${cat}</small></span>${led ? `<em class="led" data-from="2">${led}</em>` : ''}
        <span class="acts" data-from="1"><button type="button">🛠 Fix</button><button type="button">🚀 Delegate</button><button type="button">✕ Dismiss</button></span></li>`).join('')}</ul>
      <p class="said" aria-live="polite" data-from="1">Pick an action on a finding.</p>
      <p class="msg y" data-from="2"><b>⚠back</b> 3× (came back) · first seen 12d ago · your fix did not hold: back after 2d</p>
      <div class="sug" data-from="3"><p><b>💡 editor</b> “Write dates as YYYY-MM-DD.” <small>from 6 corrections in 14 days</small></p><span><button type="button" class="ghost2">Apply to CLAUDE.md</button></span><p class="sa" aria-live="polite"></p></div>
      <div class="liv" data-from="4"><p class="lb">Living · is the system alive today? <b>${score}%</b></p><ul>${LV.map(([k, n, t]) => `<li class="${k}"><b>${n}</b><span>${t}</span></li>`).join('')}</ul></div>`;
    const said = fv.querySelector('.said'), hid = { n: 0 };
    const AG = ['builder', 'researcher', 'editor', 'scout', 'a pick of yours'];
    $$(fv, '.ins li').forEach(li => {
      const k = +li.dataset.k, [fix, del, dis] = li.querySelectorAll('.acts button');
      fix.addEventListener('click', () => { said.innerHTML = k === 3 ? '<b>Fix:</b> opens scout\'s settings.json at the rule, to tighten it.' : '<b>Fix</b> is offered where a mechanical fix exists: a memory index, a key to the vault, a pulse to re-run. Here, the click opens the evidence.'; });
      del.addEventListener('click', () => { said.innerHTML = `<b>Delegated to ${AG[k]}</b> as a task: read first, find the root cause, fix what is safe, report what is not.`; });
      dis.addEventListener('click', () => { li.hidden = true; hid.n++; said.innerHTML = `<b>${hid.n} dismissed insight${hid.n > 1 ? 's' : ''} hidden.</b> For a day, a week or for good; restore them from the list.`; });
    });
    const ap = fv.querySelector('.sug button'), sa = fv.querySelector('.sa');
    ap.addEventListener('click', () => { ap.disabled = true; sa.innerHTML = 'Added under <code>## Learned rules (Agent Farm)</code> in editor\'s CLAUDE.md.'; });
  },
};
