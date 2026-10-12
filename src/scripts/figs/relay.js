// District I, Never stops: one figure per feature, each a small rebuilt screen or a moving diagram with demo data.
// Elements carry data-from / data-to (scripts/district.js shows them by step); step(i) moves the rest. The numbers are
// the extension's defaults (data/deep/relay.js cites them); names, ids and texts are demo data, the same farm as the
// landing (chain chn_7f3a, leg 92, acct-a to acct-d).
import { ACCT } from '../state.js';

const A = Object.fromEntries(ACCT.map(a => [a.n, a.c]));
const slider = (key, min, max, step, val, unit = '%') =>
  `<label class="sl"><code>${key}</code><input type="range" min="${min}" max="${max}" step="${step}" value="${val}"><output>${val}${unit}</output></label><p class="slo"></p>`;
function onSlide(fv, fn) {
  const r = fv.querySelector('.sl input'), o = fv.querySelector('.sl output'), p = fv.querySelector('.slo');
  const go = () => { const t = fn(+r.value); o.textContent = t[0]; p.innerHTML = t[1]; };
  r.addEventListener('input', go); go();
}

export default {
  /* I·1 the context lines, the baton and a fresh leg */
  relay(fv) {
    fv.innerHTML = `
      <div class="sess">
        <div class="hd"><b>⑂ 92</b><span>session 3efb20bf · acct-c · Claude Code</span></div>
        <div class="ctxr"><div class="bar ctx"><i></i><u class="cv" style="left:35%"><em>converge 35%</em></u><u class="ho"><em>hand over</em></u></div><span class="pct">ctx <b>26</b>%</span></div>
        <p class="msg y" data-from="1">CONTEXT CONVERGE · start nothing new, finish the step in flight.</p>
        <p class="msg l" data-from="1">CONTEXT HANDOVER · stop, commit, write the handover note, end the run.</p>
        <div class="baton" data-from="2"><code>baton.pass</code><q>Parts 7 and 8 of the export are done and committed (a41c9e2). Next is part 9, the CSV writer: its date column still fails across a DST change.</q></div>
      </div>
      <p class="flow" data-from="3">↓ leg 92 has ended. A fresh session opens; the old one is never resumed.</p>
      <div class="sess new" data-from="3">
        <div class="hd"><b>⑂ 93</b><span>session 8b2d07c1 · acct-c · ctx 4%</span></div>
        <ol class="given"><li><b>BATON RELAY DIRECTIVE</b> chain chn_7f3a, leg 93</li><li>the relay's rules</li><li>your standing rule</li><li>leg 92's words</li></ol>
      </div>
      <p class="fs" data-from="4"><b>Failsafe</b> Leg 94 ended without passing, but left a note a minute ago and two commits: emergency leg 95 starts with them.</p>
      ${slider('agentFarm.contextHandoverPct', 10, 90, 5, 40)}`;
    const fill = fv.querySelector('.ctx i'), pct = fv.querySelector('.pct b'), ho = fv.querySelector('.ho'), cv = fv.querySelector('.cv');
    let line = 40, s = 0;
    const draw = () => { const v = s === 0 ? Math.min(33, line - 2) : line + 1; fill.style.width = v + '%'; pct.textContent = v; };
    onSlide(fv, v => {
      line = v; ho.style.left = v + '%'; cv.hidden = v <= 35; draw();
      const legs = Math.ceil(2.4 / (v / 100));
      return [v + '%', `Illustration: a job that needs 2.4M tokens of context runs as <b>${legs} legs</b> on a 1M window, none of them past ${v}%. Lower means more legs and fresher contexts.`];
    });
    return { step(i) { s = i; draw(); } };
  },

  /* I·2 the account's window, the quota line, staying, @emptiest and the ceiling */
  quota(fv) {
    const ROWS = ['acct-a', 'acct-b', 'acct-c', 'acct-d'];
    const H = [[22, 6, 71, 48], [22, 6, 90, 48], [22, 6, 52, 48], [22, 6, 90, 48], [22, 6, 90, 48]];
    const W = [61, 38, 44, 96];
    fv.innerHTML = `
      <div class="hd"><b>Accounts</b><span>five-hour window · week</span></div>
      <div class="accs">${ROWS.map((n, k) => `<div class="ar" style="--ac:${A[n]}"><b>${n}</b><div class="bar"><i></i><u class="ce"></u><u class="ho"></u></div><em class="hv"></em><div class="bar w"><i style="width:${W[k]}%"></i></div><em>wk ${W[k]}%</em><small></small></div>`).join('')}</div>
      <p class="msg p" data-from="1" data-to="1">QUOTA HANDOVER · acct-c is at 90% of its window: stop, commit, write the note, end the run.</p>
      <p class="msg l" data-from="2" data-to="2">A context handover at 52%: under 70%, so leg 93 stays on acct-c and its window is used up first.</p>
      <p class="msg c" data-from="3" data-to="3">A quota handover: leg 93 goes by the chain's rule, <b>@emptiest</b>, to acct-b (6%).</p>
      <p class="msg dim" data-from="4">Passed over by every start without you: acct-c (5h past 70%) and acct-d (week past 95%).</p>
      ${slider('agentFarm.quotaHandoverPct', 50, 100, 5, 90)}`;
    const rows = [...fv.querySelectorAll('.ar')];
    let line = 90, s = 0;
    const draw = () => {
      const ceil = Math.min(70, line);
      rows.forEach((r, k) => {
        const h = k === 2 && s % 2 === 1 ? line : H[s][k];
        r.querySelector('i').style.width = h + '%';
        r.querySelector('.hv').textContent = `5h ${h}%`;
        r.querySelector('.ce').style.left = ceil + '%';
        r.querySelector('.ho').style.left = line + '%';
        const tag = s === 3 && k === 1 ? '● leg 93 opens here' : s === 4 && (k === 2 || k === 3) ? 'passed over' : k === 2 && s < 3 ? '● leg 92' : '';
        r.querySelector('small').textContent = tag;
        r.classList.toggle('off', s === 4 && (k === 2 || k === 3));
        r.classList.toggle('pick', (s === 3 && k === 1) || (k === 2 && s < 3));
      });
    };
    onSlide(fv, v => { line = v; draw(); return [v + '%', `The leg on acct-c hands over at <b>${v}%</b> of its window. The ceiling is ${Math.min(70, v)}%: no ceiling can sit above the line.`]; });
    return { step(i) { s = i; draw(); } };
  },

  /* I·3 the account picker, your own rule, rules in rules, a launch refused */
  policies(fv) {
    fv.innerHTML = `
      <div class="pick">
        <div class="hd"><b>Account</b><span>for chain chn_7f3a</span></div>
        <ul class="opts">
          <li data-o="0"><b>@emptiest</b><span>most of its five-hour window left</span><em>→ acct-b</em></li>
          <li><b>@pool</b><span>the next with room in the sentry pool</span></li>
          <li><b>@standing</b><span>this agent's own sign-in</span></li>
          <li><b>@round-robin</b><span>the usable sign-ins in turn</span></li>
          <li data-o="1" data-from="1"><b>@Night</b><span>yours</span><em>spare, then @emptiest ≤ 80%</em></li>
          <li class="acs">${ACCT.map(a => `<span style="color:${a.c}">${a.n}</span>`).join('')}</li>
        </ul>
      </div>
      <div class="rule" data-from="1"><p class="rh">@Night</p><ol><li>the account <b>spare</b></li><li><b>@emptiest</b>, with its own ceiling of 80%</li></ol></div>
      <div class="nest" data-from="2"><span>@Weekend</span><i>→</i><span>@Night</span><i>→</i><span>@Late</span><i>→</i><span>@emptiest</span><i>→</i><span class="x">a fifth: refused as a loop</span></div>
      <div class="refuse" data-from="3"><b>Launch refused</b> @Night can choose nothing: spare is signed out and no account is under 80%. acct-b is back at 02:15.</div>`;
    const opts = [...fv.querySelectorAll('.opts li[data-o]')];
    return { step(i) { opts.forEach(o => o.classList.toggle('on', +o.dataset.o === (i === 0 ? 0 : 1))); } };
  },

  /* I·4 every account full: the leg parks until the first reset plus three minutes, and wakes by itself */
  park(fv) {
    const R = { 'acct-a': ['02:15', 97], 'acct-b': ['03:40', 93], 'acct-c': ['04:05', 100], 'acct-d': ['05:30', 91] };
    fv.innerHTML = `
      <div class="hd"><b>Chain chn_7f3a</b><span>night · <span class="clk">01:12</span></span></div>
      <div class="accs">${Object.entries(R).map(([n, [t, h]]) => `<div class="ar full" style="--ac:${A[n]}"><b>${n}</b><div class="bar"><i style="width:${h}%"></i></div><em>5h ${h}%</em><small>resets ${t}</small></div>`).join('')}</div>
      <div class="tl"><div class="ax"><span style="left:0">00:00</span><span style="left:25%">01:00</span><span style="left:50%">02:00</span><span style="left:75%">03:00</span><span style="left:100%">04:00</span></div>
        <u class="now"></u><u class="rs" style="left:56.25%"><em>reset 02:15</em></u><div class="lg"><b>⑂ 96</b> <span>parked until 02:18</span></div></div>
      <div class="notice" data-from="1"><b>🔔 Notices</b> Chain chn_7f3a: leg 96 is parked until 02:18, when acct-a's window resets (+3 min).</div>
      <p class="sbar" data-from="1"><span>⑂ 96</span><span>◷ 02:18</span></p>
      <p class="msg l" data-from="2">02:18 · leg 96 starts on acct-a, from leg 95's handover note.</p>
      <div class="btns" data-from="3"><button type="button" tabindex="-1">Start it now</button><button type="button" tabindex="-1">Stop the chain</button></div>`;
    const clk = fv.querySelector('.clk'), now = fv.querySelector('.now'), lg = fv.querySelector('.lg'), a = fv.querySelector('.accs .ar');
    return { step(i) {
      const woke = i >= 2;
      clk.textContent = woke ? '02:18' : '01:12'; now.style.left = (woke ? 57.5 : 30) + '%';
      lg.classList.toggle('run', woke); lg.querySelector('span').textContent = woke ? 'running on acct-a' : 'parked until 02:18';
      a.classList.toggle('full', !woke); a.querySelector('i').style.width = woke ? '3%' : '97%'; a.querySelector('em').textContent = woke ? '5h 3%' : '5h 97%';
    } };
  },

  /* I·5 an agent restarts Agent Farm and carries on in the same session */
  ouroboros(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Ouroboros</b><span>Agent Farm <span class="vv">3.930.0</span></span></div>
      <pre class="cmd">$ node af.js farm.restartExtensionHost resume=true</pre>
      <p class="msg dim">Refused if this window restarted less than 20 seconds ago.</p>
      <div class="busy" data-from="1"><span class="ses"><i></i>⑂ 92 · working</span><span class="ses"><i></i>review · working</span><b>armed</b><em>fires when the last of them is done</em></div>
      <div class="build" data-from="2"><span>3.930.0</span><i>→</i><span class="nw">3.931.0</span><em>a newer build is on disk, so the restart becomes a window reload</em></div>
      <div class="card" data-from="3"><p class="ch">Console · session 3efb20bf</p><p>Agent Farm restarted on 3.931.0 and took this session up where it left off.</p><small>same conversation, same id · nudged after a 30-second grace</small></div>
      <p class="msg l" data-from="4">Background run 41 was cut off by the restart: picked up again (1 of 3 at most).</p>`;
    const vv = fv.querySelector('.vv'), ses = fv.querySelectorAll('.busy .ses');
    return { step(i) { vv.textContent = i >= 2 ? '3.931.0' : '3.930.0'; vv.classList.toggle('nw', i >= 2); ses.forEach(x => x.classList.toggle('done', i >= 2)); } };
  },

  /* I·6 a sentry campaign in rounds, with a leader that wakes only when it must; the mode is yours to switch */
  sentry(fv) {
    const RD = [['acct-a', 'ok'], ['acct-b', 'ok'], ['acct-c', 'no note'], ['acct-a', 'ok'], ['acct-b', 'failed'], ['acct-c', 'empty'], ['acct-a', 'empty'], ['acct-b', 'empty']];
    const off = st => st !== 'ok';
    fv.innerHTML = `
      <div class="hd"><b>Sentry</b><span>campaign · orbit-app backlog</span></div>
      <div class="modes" role="group" aria-label="The leader's mode"><button type="button" data-m="0">Mechanical</button><button type="button" data-m="1" class="on">Hybrid</button><button type="button" data-m="2">Intelligent</button></div>
      <ol class="rounds">${RD.map(([a, st], k) => `<li class="${st.replace(' ', '')}" style="--ac:${A[a]}" ${k >= 5 ? 'data-from="4"' : ''}><b>R${k + 1}</b><span>${a}</span><em>${st === 'ok' ? '✓ note' : st}</em><i class="ld" title="the leader woke">◆</i></li>`).join('')}</ol>
      <p class="mc"></p>
      <p class="msg c" data-from="2">R4 · the leader (haiku) answers: take B-17 next, on acct-b. The note says the parser is half done.</p>
      <div class="leash" data-from="3"><div><span>today</span><div class="bar"><i style="width:31%"></i></div><em>$0.62 / $2</em></div><div><span>one turn</span><div class="bar"><i style="width:16%"></i></div><em>$0.04 / $0.25</em></div><div><span>one turn</span><div class="bar"><i style="width:8%"></i></div><em>9 s / 120 s</em></div></div>
      <p class="msg p" data-from="4">R6, R7 and R8 produced nothing: three empty rounds in a row, and the campaign switches itself off.</p>`;
    const lis = [...fv.querySelectorAll('.rounds li')], btn = [...fv.querySelectorAll('.modes button')], mc = fv.querySelector('.mc');
    const mode = m => {
      btn.forEach(b => b.classList.toggle('on', +b.dataset.m === m));
      let n = 0;
      lis.forEach((li, k) => { const w = m === 2 || (m === 1 && (off(RD[k][1]) && !(k === 5))); li.classList.toggle('lead', w); if (w) n++; });
      mc.innerHTML = [`Mechanical: every next prompt comes from a template. <b>0 leader turns, $0.00.</b>`, `Hybrid: routine rounds stay free; the leader wakes when something is off. <b>${n} leader turns, $${(n * 0.04).toFixed(2)}.</b>`, `Intelligent: the leader wakes every round. <b>${n} leader turns, $${(n * 0.04).toFixed(2)}.</b>`][m];
    };
    btn.forEach(b => b.addEventListener('click', () => mode(+b.dataset.m)));
    mode(1);
    return {};
  },

  /* I·7 the leg ceiling (a setting you can slide), the barren-chain brake, your own brakes, a spend cap, the record */
  brakes(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Chain chn_7f3a</b><span>legs and brakes</span></div>
      <ol class="legs"></ol>
      <div class="barren" data-from="1"><p class="lb">Another chain</p><ol class="legs b">${['e19d0b2', '7a3c5f1', '0be4d93', 'c4e1a7f', 'c4e1a7f'].map((c, k) => `<li class="${k > 2 ? 'same' : ''}"><b>${k + 1}</b><code>${c}</code></li>`).join('')}<li class="stop">■ stopped</li></ol><small>Legs 4 and 5 ended on the same commit: the chain stops instead of burning quota on nothing.</small></div>
      <div class="btns" data-from="2"><button type="button" tabindex="-1">⊣ Make this the last leg</button><button type="button" tabindex="-1">■ Stop the chain</button></div>
      <div class="cap" data-from="3"><span>workflow weekly-video</span><div class="bar"><i style="width:95.5%"></i></div><em>$3.82 / $4.00</em><small>The cap is spent: step 6 does not start, and the run says so. No run goes past 25 steps.</small></div>
      <pre class="log" data-from="4">baton chn_7f3a · stopped · barren: legs 4 and 5 ended on c4e1a7f · kept, never deleted</pre>
      ${slider('agentFarm.batonMaxHops', 0, 12, 1, 6, '')}`;
    const legs = fv.querySelector('.legs');
    onSlide(fv, v => {
      const n = v || 9;
      legs.innerHTML = Array.from({ length: n }, (_, k) => `<li class="${v && k === n - 1 ? 'last' : ''}"><b>${k + 1}</b></li>`).join('') + (v ? '<li class="end">⊣ note, no successor</li>' : '<li class="end">… no ceiling</li>');
      return [v ? String(v) : '0 = none', v ? `Leg ${v} writes a handover note and opens nothing. The run that started the chain is leg 1.` : 'No ceiling: the chain runs until the work is done. The barren-chain brake and your stop still hold.'];
    });
    return {};
  },
};
