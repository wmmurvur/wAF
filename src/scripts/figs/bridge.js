// District VIII, Just ask: one figure per feature, each a small rebuilt screen with demo data. Elements carry data-from
// (scripts/district.js shows them by step); step(i) moves the rest. The rules are the extension's own (data/deep/bridge.js
// cites them): the manual's three local ops, the notification per call, the start card and its three settings, the parity
// manifest and its exemptions, the effects of an op, the launcher and the files of a call, the 20 s timeout, Gatekeeper's
// three MCP tools, the Agents tree and DUTIES.md with its cadences, the Toolbox's tabs and its probe, the matrix's cells,
// the phone's pairing, wake-up and web page, Telegram's buttons and four gates, the order of the tones, the 500 ms and the
// six, the voice per language, what a pack leaves behind. Names, files and figures are demo data. The tones are the
// extension's own files (scripts/sound.js), and play only when a button is pressed; a voice line uses the browser's own.
import { play } from '../sound.js';

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
/* a pairing code's look: three corner squares and a seeded field (a picture, not a working code) */
function qr(seed) {
  const N = 21, on = [];
  let x = seed;
  const rnd = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
  const fin = (r, c) => [[0, 0], [0, N - 7], [N - 7, 0]].some(([a, b]) => r >= a && r < a + 7 && c >= b && c < b + 7);
  const ring = (r, c) => [[0, 0], [0, N - 7], [N - 7, 0]].some(([a, b]) => { const i = r - a, j = c - b; return i >= 0 && i < 7 && j >= 0 && j < 7 && (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)); });
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (fin(r, c) ? ring(r, c) : rnd() > 0.52) on.push(`M${c} ${r}h1v1h-1z`);
  return `<svg viewBox="-1 -1 23 23" aria-hidden="true"><rect x="-1" y="-1" width="23" height="23" fill="#f1f1e7"/><path d="${on.join('')}" fill="#11120d"/></svg>`;
}
function say(text, lang) {
  try { const u = new SpeechSynthesisUtterance(text); u.lang = lang; speechSynthesis.cancel(); speechSynthesis.speak(u); return true; } catch { return false; }
}

export default {
  /* VIII·1 a sentence in a chat; the agent looks up how, calls twice, each call a notification; what every session is told */
  bridge(fv) {
    fv.innerHTML = `
      <div class="hd"><b>showrunner</b><span>Claude Code · in the Console · demo</span></div>
      <p class="you">Make a weekly video for the channel, every Monday at 7.</p>
      <div class="tc" data-from="1"><p class="cl">$ node "$HOME/.agentfarm/af.js" find weekly video every monday</p>
        <p class="rs">playbook <b>content-recipe</b> · ops <code>workflows.addRecipe</code> <code>schedules.add</code></p>
        <p class="cl">$ node "$HOME/.agentfarm/af.js" help schedules.add</p>
        <p class="rs"><code>schedules.add</code> {title, agent, kind: daily | weekly | once, dow, hour, prompt, missed, …} · <i>write</i></p>
        <p class="lc">answered here, from the manual: no notification, no window needed</p></div>
      <div class="tc" data-from="2"><p class="cl">$ node "$HOME/.agentfarm/af.js" workflows.addRecipe id=weekly-rhythm</p>
        <p class="rs ok">{"ok": true, "result": {"workflow": "Weekly channel rhythm", "steps": 6}}</p>
        <p class="cl">$ node "$HOME/.agentfarm/af.js" schedules.add @args.json</p>
        <p class="rs ok">{"ok": true, "result": {"title": "Weekly channel rhythm", "kind": "weekly", "dow": 1, "hour": 7}}</p></div>
      <div class="nt" data-from="3"><p><b>Agent Farm bridge:</b> workflows.addRecipe — ok</p><p><b>Agent Farm bridge:</b> schedules.add — ok</p></div>
      <p class="ag" data-from="3">Done. <b>Weekly channel rhythm</b> runs every Monday at 07:00, first on Mon Oct 19. You will find it on the Plan tab.</p>
      <div class="sc" data-from="4"><p class="lb">What a session is told when it starts</p>${seg('Start card', 'card', ['card', 'line', 'off'])}<pre class="cd"></pre><p class="how">Claude Code and Codex: through their start hook. Gemini, Antigravity, OpenCode: in front of the first prompt.</p></div>`;
    const cd = fv.querySelector('.cd');
    onSeg(fv.querySelector('.card'), k => {
      cd.textContent = [
        '# Agent Farm · start card (abridged, ~300 tokens)\nReach the farm from the shell; it is not an MCP tool:\n  node "$HOME/.agentfarm/af.js" <op> [key=value | @args.json]\nFind before you act:  farm.find q="…" · farm.ops op=<name>\nYour own situation:   farm.brief',
        'Agent Farm bridge: run node "$HOME/.agentfarm/af.js" <op> from the shell.',
        '(nothing: the session starts without a word about the farm)',
      ][k];
    })(0);
  },

  /* VIII·2 a button and its op; the build's check; what is exempt; finding one; what an op does and whether it asks */
  ops(fv) {
    const A = [['projects', 59], ['sessions', 31], ['a2a', 26], ['workflows', 22], ['queue', 20], ['tasks', 19], ['missions', 19], ['accounts', 19]];
    const F = [
      ['farm.ops', 'tasks · 19 ops: list add get cancel rerun runNext delete clearFinished …\nschedules · list add edit delete toggle runNow\ntriggers · list add edit delete toggle fire\n… 75 areas, 579 ops'],
      ['farm.ops op=tasks.add', 'tasks.add {agent, title, prompt, …}\neffect: run · starts a task on an agent, or queues it\nexample: af.js tasks.add agent=developer title="Fix X-53" prompt="…"'],
      ['farm.ops op=task.add', '{"ok": false, "error": "unknown op task.add"}\nclosest: tasks.add · tasks.get · templates.add\nor search: farm.find q="add a task"'],
    ];
    fv.innerHTML = `
      <div class="hd"><b>farm.ops</b><span>579 operations · demo</span></div>
      <ul class="map">${[['▶ Run now', 'on a schedule', 'schedules.runNow'], ['⏸ Pause all', 'Automation strip', 'automations.pause'], ['Export Agent Pack…', 'right-click an agent', 'agents.pack.export'], ['Approve', 'a mission\'s question', 'missions.approve']].map(([b, w, o]) => `<li><span class="btn">${b}</span><em>${w}</em><i>=</i><code>${o}</code></li>`).join('')}</ul>
      <div class="areas" aria-hidden="true">${A.map(([n, v]) => `<p><span>${n}</span><i style="width:${(v / 59 * 100).toFixed(0)}%"></i><b>${v}</b></p>`).join('')}<small>the largest areas, of about 75</small></div>
      <pre class="pt" data-from="1">parity.manifest.json  "gapBudget": 0
<span class="bad">✗ test_parity: the button "Retry with edited prompt…" has no op and no exemption</span>
  → give it an op, or a named exemption, or the build stays red</pre>
      <div class="ex" data-from="2"><p class="lb">Off the bridge on purpose</p><p class="ch">${['navigation', 'visual', 'file-picker', 'secrets', 'human-only'].map(x => `<span>${x}</span>`).join('')}</p>
        <ul><li class="y"><code>console.answer</code> an agent may answer a question</li><li class="n">granting a tool permission: no op, it is yours</li><li class="n">Stop timer on a question: no op, only your click</li><li class="n">a secret's value: names and bindings only</li></ul></div>
      <div class="fd" data-from="3">${seg('Ask the catalog', 'ask', F.map(f => f[0]))}<pre class="fo"></pre></div>
      <ul class="ef" data-from="4">${[['tasks.list', 'read', ''], ['schedules.add', 'write', ''], ['tasks.add', 'run', ''], ['tasks.delete', 'destructive', 'and its contract says so'], ['manual.install', 'write', 'plans first: confirm=true to do it']].map(([o, e, c]) => `<li><code>${o}</code><span class="e ${e}">${e}</span><em>${c}</em></li>`).join('')}</ul>`;
    const fo = fv.querySelector('.fo');
    onSeg(fv.querySelector('.ask'), k => { fo.textContent = F[k][1]; fo.classList.toggle('err', k === 2); })(0);
  },

  /* VIII·3 the same line from any engine; the launcher; a call as three files; arguments that survive a shell; MCP */
  mcp(fv) {
    const E = [['Claude Code', '$'], ['Codex', '$'], ['Gemini', '$'], ['PowerShell script', 'PS>']];
    fv.innerHTML = `
      <div class="hd"><b>af.js</b><span>the bridge, one shell command · demo</span></div>
      ${seg('Who runs it', 'who', E.map(e => e[0]))}
      <pre class="ln"></pre>
      <div class="lp" data-from="1"><p><code>~/.agentfarm/af.js</code><span>a launcher, written at every start</span></p><p class="ar2">↓ forwards to</p><p><code>%APPDATA%\\Code\\User\\globalStorage\\muvusoft.agent-farm\\bridge\\af.js</code><span>Windows · the macOS and Linux paths differ, the line does not</span></p></div>
      <div class="fs" data-from="2"><p class="lb">One call, as files in the bridge folder</p><ol class="fl">${['7f3a.request.json', '7f3a.pending.json', '7f3a.response.json'].map(f => `<li>${f}</li>`).join('')}</ol>
        <p class="wd"><span class="r">window 1 · runs the farm</span><span>window 2 · follows, answers nothing</span></p><p class="to">A call waits 20 s. Timed out with a pending note: <b>still running</b>. Without one: <b>nothing ran</b>.</p></div>
      <pre class="ag" data-from="3">af.js notices.list handled=false limit=5       <span class="c"># no quotes to escape, in any shell</span>
af.js notices.post @args.json                 <span class="c"># long text from a file</span>
af.js farm.ops full=true --out catalog.json
<span class="ok">ok farm.ops -> D:\\work\\catalog.json (184213 bytes, utf8)</span></pre>
      <div class="kp" data-from="4"><p class="lb">Gatekeeper as an MCP server · added only when you ask</p><pre>~/.claude.json  "mcpServers": { "kapici": { "command": "node", "args": ["…/kapici/server.js"] } }</pre>
        <p class="tl">${['kapici_eval', 'kapici_ask', 'kapici_rules'].map(t => `<code>${t}</code>`).join('')}<span>no key inside: each one is a bridge call</span></p></div>`;
    const ln = fv.querySelector('.ln');
    onSeg(fv.querySelector('.who'), k => { ln.innerHTML = `<span class="p">${E[k][1]}</span> node "$HOME/.agentfarm/af.js" tasks.add agent=editor title="Cut the shorts"\n<span class="ok">{"ok": true, "result": {"id": "t-4c1e", "status": "queued"}}</span>`; })(0);
    const fl = $$(fv, '.fl li');
    let timers = [];
    return {
      step(i) {
        timers.forEach(clearTimeout); timers = [];
        fl.forEach(li => li.classList.remove('on', 'gone'));
        if (i < 2) return;
        if (reduce || i > 2) { fl[0].classList.add('gone'); fl[1].classList.add('gone'); fl[2].classList.add('on'); return; }
        timers.push(setTimeout(() => fl[0].classList.add('on'), 200));
        timers.push(setTimeout(() => { fl[0].classList.add('gone'); fl[1].classList.add('on'); }, 1200));
        timers.push(setTimeout(() => { fl[1].classList.add('gone'); fl[2].classList.add('on'); }, 2400));
      },
    };
  },

  /* VIII·4 an agent's folder in the tree; its DUTIES.md; a duty turned into a trigger; the Toolbox; a real MCP probe */
  agents(fv) {
    const T = [
      ['Skills', '2 user · 3 agent', [['brand-kit', 'agent', 'used 27× in 30 days'], ['ffmpeg-recipes', 'agent', 'used 14×'], ['pdf', 'user', 'never used']]],
      ['Subagents', '1 agent', [['shot-checker', 'agent', 'model haiku']]],
      ['Commands', '4 user', [['git:cleanup', 'user', 'a : nests it into folders']]],
      ['MCP', '1 user · 1 agent', [['airtable', 'user', 'stdio · enabled'], ['playwright', 'agent', 'stdio · off for this agent']]],
      ['Hooks', '9 user', [['Stop', 'user', 'curl … 127.0.0.1:8377 · remove one, keep the rest']]],
      ['Plugins', '3', [['superpowers', 'marketplace', 'enabled · enabledPlugins']]],
    ];
    fv.innerHTML = `
      <div class="hd"><b>▾ showrunner</b><span>the Agents tree · demo</span></div>
      <ul class="tree">${[['Identity', 'CLAUDE.md · 2.1K tokens'], ['Duties', '2 · <b class="w">👁 3 waiting</b> · read 2h ago'], ['Memory', '6 files · 4 recalled in 30 days'], ['Tools', '3 scripts'], ['MCP', '2 · used 41× in 30 days'], ['Skills', '4 · 1 never used'], ['Permissions', 'acceptEdits · 12 rules'], ['Sessions', 'the last 15']].map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('')}</ul>
      <pre class="du" data-from="1"><span class="h">## Inbox triage [every-turn]</span>
- **Watch:** Studio\\inbox
- **Do:** name each file, move it to its stage folder
<span class="h">## Weekly memory upkeep [weekly]</span>
- **Do:** merge what repeats in memory/, drop what is stale</pre>
      <p class="tr" data-from="2"><b>⚡ Inbox triage</b> from a duty · watch <code>Studio\\inbox</code> · 10 s quiet · 60 s rest · 6 an hour · runs while showrunner is idle</p>
      <div class="tb" data-from="3"><p class="lb">Toolbox · user scope and every agent's</p>${seg('Toolbox tab', 'tab', T.map(t => t[0]))}<ul class="tt"></ul></div>
      <div class="pb" data-from="4"><p class="ph"><b>airtable</b><span>stdio · user scope</span><button type="button" class="ghost2">Probe</button></p><ul class="pt" aria-live="polite"><li class="dim">not probed yet</li></ul></div>`;
    const tt = fv.querySelector('.tt');
    onSeg(fv.querySelector('.tab'), k => {
      tt.innerHTML = `<li class="ct">${T[k][1]}</li>` + T[k][2].map(([n, s, d]) => `<li><b>${n}</b><span class="s">${s}</span><em>${d}</em></li>`).join('');
    })(0);
    const pb = fv.querySelector('.pb button'), pt = fv.querySelector('.pb .pt');
    const probe = () => {
      pt.innerHTML = [['airtable_instances', ''], ['airtable_search', 'collection, q'], ['airtable_get', 'id'], ['airtable_media_scan_folder', 'folder'], ['airtable_media_save', 'record']]
        .map(([t, a]) => `<li><code>${t}</code><span>(${a})</span></li>`).join('') + '<li class="dim">5 of 10 tools shown · connected, initialize → tools/list · kept until you probe again</li>';
    };
    pb.addEventListener('click', probe);
    return { step(i) { if (i === 4 && pt.querySelector('.dim') && !pt.querySelector('code')) probe(); } };
  },

  /* VIII·5 the matrix: who has what, used or idle, ＋ with a picker, memory that drifted, duties and tasks */
  matrix(fv) {
    const AG = ['builder', 'showrunner', 'researcher', 'editor', 'scout'];
    const M = {
      Skills: [['pdf', [12, 'i', 3, '+', 'i']], ['brand-kit', ['+', 27, '+', 9, '+']], ['ffmpeg-recipes', ['+', 14, '+', 31, '+']], ['web-research', [2, '+', 44, '+', 18]], ['old-slides', ['i', 'i', '+', 'x', '+'], 1]],
      MCP: [['airtable', ['+', 41, 6, 22, '+']], ['playwright', [8, '+', 19, '+', 26]], ['github', [33, '+', '+', '+', '+']], ['kapici', ['i', 'i', '+', '+', 'i'], 1]],
      Memory: [['brand.md', ['+', 4, '+', '2r', '+']], ['channel-voice.md', ['+', 7, 1, '+', '+']], ['sources.md', ['+', '+', 12, '+', '3r']]],
      Duties: [['Inbox triage', ['+', 'turn', '+', 'daily', '+']], ['Weekly memory upkeep', ['weekly', 'weekly', 'weekly', 'p', 'weekly']], ['Model radar', ['+', '+', '+', '+', 'daily']]],
      Tasks: [['Weekly channel rhythm', ['+', '3✓', '+', '+', '+']], ['Free model radar', ['+', '+', '+', '+', '26✓/2✗']], ['Price check', ['+', '+', '+', '+', '5✗'], 1]],
    };
    const K = Object.keys(M);
    fv.innerHTML = `
      <div class="hd"><b>Capability Matrix</b><span>5 agents · demo</span></div>
      ${seg('Matrix', 'mx', K)}
      <p class="sm"></p>
      <div class="gw"><table class="g"><thead><tr><th></th>${AG.map(a => `<th scope="col">${a}</th>`).join('')}</tr></thead><tbody></tbody></table></div>
      <div class="pk" hidden><p><b>Copy brand-kit to builder</b> from:</p><label><input type="radio" name="pkv" checked> variant A · showrunner · newest, Oct 9 · used 27×</label><label><input type="radio" name="pkv"> variant B · editor · Sep 30 · used 9×</label><p class="btn2"><button type="button" class="ghost2 go">Copy</button></p></div>
      <p class="lg"><span><b class="u">12</b> used in 30 days</span><span><b>✓</b> installed, unused</span><span><b>⏻</b> off</span><span><b>＋</b> not installed</span><span><b class="yd">●</b> nobody used it</span><span><b class="rg">◯</b> drifted</span></p>`;
    const tb = fv.querySelector('tbody'), sm = fv.querySelector('.sm'), pk = fv.querySelector('.pk');
    let cur = 0, copied = false;
    const cell = (v, k) => {
      if (v === '+') return `<td><button type="button" class="pl" data-k="${k}" aria-label="Copy to this agent">＋</button></td>`;
      if (v === 'i') return '<td class="i">✓</td>';
      if (v === 'x') return '<td class="x">⏻</td>';
      if (v === 'p') return '<td class="x">⏸</td>';
      if (typeof v === 'number') return `<td class="u" style="--a:${Math.min(1, 0.25 + v / 45).toFixed(2)}">${v}</td>`;
      if (/r$/.test(v)) return `<td class="u r" style="--a:.4">${parseInt(v)}</td>`;
      if (/✗/.test(v)) return `<td class="t ${/✓/.test(v) ? 'mix' : 'bad'}">${v}</td>`;
      if (/✓/.test(v)) return `<td class="t ok">${v}</td>`;
      return `<td class="cad">${v}</td>`;
    };
    const draw = k => {
      cur = k; pk.hidden = true;
      const rows = M[K[k]];
      tb.innerHTML = rows.map(([n, cs, dot], r) => `<tr><th scope="row">${dot ? '<b class="yd">●</b> ' : ''}${n}</th>${cs.map((v, c) => cell(K[k] === 'Skills' && r === 1 && c === 0 && copied ? 0 : v, `${r}-${c}`)).join('')}</tr>`).join('');
      sm.innerHTML = K[k] === 'Memory' ? 'Same-named memory files, with how often each agent read its own copy. <b>An orange ring:</b> that copy has drifted from the newest.'
        : K[k] === 'Duties' ? 'Each duty\'s cadence per agent: turn, start, daily, weekly, manual. ⏸ is paused.'
          : K[k] === 'Tasks' ? 'The 30 busiest task families: green all passed, an orange ring mixed, red all failed.'
            : `${rows.length} ${K[k] === 'MCP' ? 'servers' : 'skills'} · <b>${rows.filter(x => x[1].some(v => typeof v === 'number')).length} used</b> in 30 days · ${rows.filter(x => !x[1].some(v => typeof v === 'number')).length} unused`;
      $$(fv, '.g .pl').forEach(b => b.addEventListener('click', () => { pk.hidden = false; }));
    };
    const set = onSeg(fv.querySelector('.mx'), draw);
    fv.querySelector('.go').addEventListener('click', () => { copied = true; draw(0); set(0); sm.innerHTML += ' · <b>brand-kit copied to builder</b>: it starts at 0, honestly.'; });
    set(0);
    const S = [0, 1, 0, 2, 3];
    return { step(i) { set(S[i]); if (i === 2 && !copied) pk.hidden = false; } };
  },

  /* VIII·6 the phone: pair by a QR code; Now; answer in a drawer; woken by a push that says nothing; the web page */
  phone(fv) {
    const SCR = [
      `<p class="st">Agent Farm</p><p class="big">Scan the code on your desk</p><div class="cam"></div><p class="sm">pairing…</p>`,
      `<p class="st">● Now</p><p class="sm">2 waiting · 3 running · $41.20 today</p><div class="bx"><b>Waiting for you 2</b><span>reviewer · a question</span><span>developer · Bash: npm publish</span></div><div class="bx"><b>Running 3</b><span>developer · working</span><span>editor · working</span><span>researcher · idle</span></div>`,
      `<p class="st">● Now</p><div class="bx dimmed"><b>Waiting for you 2</b></div><div class="dr"><p class="q">reviewer asks: Keep the old CSV header for one release?</p><button type="button">Keep it (Recommended)</button><button type="button">Drop it</button><p class="aw" aria-live="polite"></p></div>`,
      `<p class="st">● Away</p><p class="big">VS Code closed</p><p class="sm">since 18:20 · last snapshot 4 min old</p><div class="bx"><b>While you were out</b><span>reviewer asked a question</span></div><button type="button" class="wide">Start VS Code</button>`,
      `<p class="st">agentfarm · web</p><p class="sm">read only · refreshes every 20 s</p><div class="bx"><b>Needs you 2</b><span>reviewer · a question</span></div><div class="bx"><b>Spend today</b><span>$41.20 · showrunner $12.10</span></div><div class="bx"><b>Notices</b><span>3 new</span></div>`,
    ];
    fv.innerHTML = `
      <div class="hd"><b>📱 Mobile</b><span>Now · Web · Devices · demo</span></div>
      <div class="two"><div class="ph"><div class="scr"></div></div>
        <div class="desk">
          <div class="pr"><div class="qr">${qr(7)}</div><p><b>Pair a phone</b><span>code good for <b class="ttl">10:00</b></span><span>the certificate's SHA-256 is in the code</span><span>port 7443 · on this machine</span></p></div>
          <ul class="dv" data-from="2"><li><b>Pixel 8</b><span>manage · paired Oct 3</span><button type="button" class="ghost2 rv">Revoke</button></li></ul>
          <pre class="push" data-from="3">push via Google:  { "wake": true, "farm": "f-7c2e" }
then the phone asks your machine: farm.away</pre>
          <div class="wb" data-from="4">${seg('Web page bound to', 'bind', ['This machine', 'My network'])}<div class="wo"></div></div>
        </div></div>`;
    const scr = fv.querySelector('.scr'), ttl = fv.querySelector('.ttl'), wo = fv.querySelector('.wo');
    let tick;
    const draw = i => {
      scr.innerHTML = SCR[i];
      if (i === 2) $$(scr, '.dr button').forEach(b => b.addEventListener('click', () => {
        scr.querySelector('.aw').innerHTML = `Answered <b>${b.textContent.replace(' (Recommended)', '')}</b> from Pixel 8. The desk kept its focus.`;
      }));
      if (i === 3) scr.querySelector('.wide').addEventListener('click', e => { e.target.textContent = 'Starting VS Code…'; e.target.disabled = true; });
    };
    fv.querySelector('.rv').addEventListener('click', e => { e.target.closest('li').classList.add('gone'); e.target.textContent = 'Revoked'; e.target.disabled = true; });
    onSeg(fv.querySelector('.bind'), k => {
      wo.innerHTML = k ? `<div class="qr s">${qr(19)}</div><p><code>http://192.168.1.20:8378/?t=…</code><span>scan it on any device you allow</span></p>`
        : '<p class="amb">Bound to this machine only — select LAN for phone access</p>';
    })(0);
    return {
      step(i) {
        draw(i); clearInterval(tick);
        if (i === 0 && !reduce) { let s = 600; tick = setInterval(() => { s--; ttl.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; if (s <= 590) clearInterval(tick); }, 1000); }
      },
    };
  },

  /* VIII·7 Telegram: connect; a card per turn; one tap; four gates on what you type; /new from the chat */
  telegram(fv) {
    const MSG = [
      { t: 'also add a test for 0 rows', g: [1, 1, 1, 0], r: 'A turn is running, so it waits: <b>queued, 1 of 10</b>. It goes in when the turn ends.' },
      { t: 'rm -rf dist and rebuild', g: [1, 1, 0, 1], r: 'This looks risky: <code>rm -rf</code>. <span class="tb"><button type="button">Send anyway</button><button type="button">Drop it</button></span>' },
      { t: 'one more pass on the docs', g: [1, 0, 1, 1], r: 'Today\'s Telegram budget is spent: <b>$1.00 of $1.00</b>. Nothing was started.' },
    ];
    fv.innerHTML = `
      <div class="hd"><b>💬 Agent Farm</b><span>bot · bound to developer · demo</span></div>
      <p class="cn">Connect Telegram… <b>token checked with Telegram ✓</b> kept in the secret vault · outbound only, no port opened · <b>1 chat</b> allowed</p>
      <div class="cdc" data-from="1"><p class="ch">developer · turn 14 ended · Claude · 18.2K tokens · $0.41</p><p class="w">“The export is fixed: the 10k cap lived in the writer. 212 tests pass. Shall I open the PR?”</p><p class="wt">waiting on: your answer</p>
        <p class="kb" data-from="2"><button type="button" data-a="Open the PR">Open the PR</button><button type="button" data-a="Not yet">Not yet</button><button type="button" data-a="diff">📄 Diff</button></p><pre class="df" hidden></pre><p class="an" aria-live="polite"></p></div>
      <div class="cdc perm" data-from="2"><p class="ch">developer asks to run · Bash</p><p class="w"><code>npm publish --tag beta</code></p><p class="kb"><button type="button" data-p="1">Allow</button><button type="button" data-p="0">Deny</button></p><p class="an" aria-live="polite"></p></div>
      <div class="gt" data-from="3">${seg('You type', 'msg', MSG.map(m => m.t))}<ol class="gs">${['session alive', 'budget left today', 'not a risky command', 'no turn running'].map(g => `<li>${g}</li>`).join('')}</ol><p class="go"></p></div>
      <div class="nw" data-from="4"><p class="me">/new researcher find three sources on the 1953 storm</p><p class="bt">Started <b>researcher #2</b> in the Console on your desk · Claude · sonnet · project The last keeper, as last time · this chat now follows it</p></div>`;
    const c1 = fv.querySelector('.cdc'), df = c1.querySelector('.df');
    $$(c1, '.kb button').forEach(b => b.addEventListener('click', () => {
      if (b.dataset.a === 'diff') { df.hidden = !df.hidden; df.textContent = ' M src/export/rows.ts     | 14 +++---\n M test/test_export.js     | 31 ++++++\n 2 files changed, 38 insertions(+), 7 deletions(-)'; return; }
      c1.querySelector('.an').innerHTML = `You: <b>${b.dataset.a}</b> · sent to developer`;
    }));
    const c2 = fv.querySelector('.perm');
    $$(c2, '.kb button').forEach(b => b.addEventListener('click', () => { c2.querySelector('.an').innerHTML = +b.dataset.p ? 'Allowed once, by you.' : 'Denied. developer is told.'; }));
    const gs = $$(fv, '.gs li'), go = fv.querySelector('.go');
    onSeg(fv.querySelector('.msg'), k => {
      gs.forEach((li, j) => { li.className = MSG[k].g[j] ? 'y' : 'n'; });
      go.innerHTML = MSG[k].r;
    })(0);
  },

  /* VIII·8 sound: a tone per event; the chain that picks it; eight finishing at once, in order; quiet; a second ring */
  sound(fv) {
    const EV = [['question', 'Intercom knock', 'knock'], ['error', 'Bell, urgent', 'bell'], ['stalled', 'Deep sonar', 'sonar'], ['ended', 'Marimba', 'marimba'], ['turn-ready', 'Crystal', 'crystal']];
    const Q = [['reviewer', 0], ['developer', 4], ['editor', 4], ['tester', 2], ['scout', 4], ['researcher', 3], ['builder', 1], ['librarian', 4]];
    fv.innerHTML = `
      <div class="hd"><b>Sound</b><span>alert tones · demo · press ▶ to hear one</span></div>
      <ul class="ev">${EV.map(([e, t, id]) => `<li><span class="e">${e}</span><b>${t}</b><button type="button" data-t="${id}" aria-label="Play ${t}">▶</button></li>`).join('')}</ul>
      <div class="ch" data-from="1"><p class="lb">Which tone rings for developer #2</p><ol>${[['this session', 'Marimba'], ['agent developer', 'Pop'], ['your settings', '—'], ['default', 'Crystal']].map(([a, b], k) => `<li data-k="${k}"><span>${a}</span><b>${b}</b></li>`).join('')}</ol>${seg('This session\'s tone', 'own', ['Its own tone', 'Cleared'])}<p class="fn">A task's <b>Sound on finish</b>: Default · a tone · Silent</p></div>
      <div class="qq" data-from="2"><p class="lb">Eight finish at once</p><ol class="qu"></ol><p class="qn"></p></div>
      <p class="qt" data-from="3"><button type="button" class="mute" aria-pressed="false">🔊</button><span>status bar</span><b>🌙 quiet 23:00–08:00</b><span>wraps midnight</span><b>reviewer #1 muted</b><span>one conversation</span></p>
      <p class="ng" data-from="4">⏰ Nudge after <b>3</b> min, <b>2</b> × <b>Intercom knock</b> · <em>2 waiting</em></p>`;
    $$(fv, '.ev button').forEach(b => b.addEventListener('click', () => { play(b.dataset.t); b.closest('li').classList.remove('hit'); void b.offsetWidth; b.closest('li').classList.add('hit'); }));
    const lis = $$(fv, '.ch li');
    onSeg(fv.querySelector('.own'), k => { lis.forEach((li, j) => li.classList.toggle('win', j === (k ? 1 : 0))); lis[0].querySelector('b').textContent = k ? '—' : 'Marimba'; })(0);
    const qu = fv.querySelector('.qu'), qn = fv.querySelector('.qn'), mute = fv.querySelector('.mute');
    mute.addEventListener('click', () => { const m = mute.getAttribute('aria-pressed') !== 'true'; mute.setAttribute('aria-pressed', String(m)); mute.textContent = m ? '🔇' : '🔊'; });
    let timers = [];
    const order = () => {
      timers.forEach(clearTimeout); timers = [];
      const s = Q.map((q, i) => ({ a: q[0], u: q[1], i })).sort((a, b) => a.u - b.u || a.i - b.i);
      const keep = s.slice(0, 6), drop = s.slice(6);
      qu.innerHTML = keep.map(x => `<li><b>${EV[x.u][0]}</b><span>${x.a}</span></li>`).join('');
      qn.innerHTML = `Half a second between them, counted from the end of each. <b>${drop.length} dropped</b>, the least urgent: ${drop.map(x => `${EV[x.u][0]} (${x.a})`).join(', ')}.`;
      const li = $$(qu, 'li');
      if (reduce) { li.forEach(x => x.classList.add('on')); return; }
      li.forEach((x, k) => timers.push(setTimeout(() => x.classList.add('on'), 250 + k * 450)));
    };
    return { step(i) { if (i === 2) order(); else if (i > 2 && !qu.children.length) order(); } };
  },

  /* VIII·9 voice: which agent, after the tone; one session read aloud; code left out, each in its language; a selection; the briefing */
  voice(fv) {
    const L = [
      { k: 'English', lang: 'en-US', v: 'Microsoft Zira · en-US', md: 'Fixed. The cap lived in the writer:\n```ts\nconst MAX = 10_000;\n```\nI removed it. 212 tests pass.', read: 'Fixed. The cap lived in the writer. I removed it. 212 tests pass.' },
      { k: 'Deutsch', lang: 'de-DE', v: 'Microsoft Katja · de-DE', md: 'Behoben. Die Grenze saß im Writer:\n```ts\nconst MAX = 10_000;\n```\nIch habe sie entfernt. 212 Tests laufen durch.', read: 'Behoben. Die Grenze saß im Writer. Ich habe sie entfernt. 212 Tests laufen durch.' },
    ];
    fv.innerHTML = `
      <div class="hd"><b>Read aloud</b><span>Sound page › Voice · demo</span></div>
      <p class="an"><span class="tn">♪ Intercom knock</span><span class="ar3">then</span><q>reviewer is asking you</q><button type="button" class="ghost2 sp" data-t="reviewer is asking you" data-l="en-US">▶ Hear it</button></p>
      <p class="off">this computer's own speech · no network · out of the box only for a question</p>
      <div class="rs" data-from="1"><p class="mn">right-click developer #1 › <b>🔊 Read this session aloud ✓</b></p><p class="rd"><span class="w1">developer: “Fixed. The cap lived in the writer.</span> <span class="cut">I removed it…”</span></p><p class="nw">reviewer's newer answer cuts it short: one reader per window.</p></div>
      <div class="lg" data-from="2">${seg('Answer language', 'lang', L.map(l => l.k))}<div class="two"><pre class="md"></pre><p class="rd2"></p></div><p class="vo"></p></div>
      <p class="sel" data-from="3"><span>In any editor:</span> <mark>Quiet hours wrap past midnight.</mark> <span class="mn">› Read aloud</span><button type="button" class="ghost2 sp" data-t="Quiet hours wrap past midnight." data-l="en-US">▶</button></p>
      <div class="br" data-from="4"><p><b>Daily briefing</b></p><p><span class="o">this computer</span> free, now</p><p><span class="o">a voice model on fal.ai</span> <code>D:/Sync/briefings/2026-10-12.mp3</code>, on your phone by morning</p></div>`;
    const md = fv.querySelector('.md'), rd2 = fv.querySelector('.rd2'), vo = fv.querySelector('.vo');
    let li = 0;
    onSeg(fv.querySelector('.lang'), k => {
      li = k; md.textContent = L[k].md;
      rd2.innerHTML = `<b>what is read</b>${L[k].read}<button type="button" class="ghost2 sp2">▶ Hear it</button>`;
      vo.innerHTML = `read by <b>${L[k].v}</b>, a voice that speaks it`;
      rd2.querySelector('.sp2').addEventListener('click', () => say(L[li].read, L[li].lang));
    })(0);
    $$(fv, '.sp').forEach(b => b.addEventListener('click', () => say(b.dataset.t, b.dataset.l)));
  },

  /* VIII·10 an agent in one file; what stays behind; unpacked with its automations off; a gallery; the other engines */
  move(fv) {
    fv.innerHTML = `
      <div class="hd"><b>showrunner.agentpack</b><span>Export Agent Pack… · demo</span></div>
      <ul class="kit">${['CLAUDE.md', 'DUTIES.md', 'tools/ · 3 scripts', '.claude/settings.local.json', '.mcp.json', 'workflows: Weekly channel rhythm, Long to shorts', 'triggers: New footage', 'schedules: Weekly channel rhythm', 'templates: Thumbnail brief'].map(f => `<li>${f}</li>`).join('')}</ul>
      <ul class="out" data-from="1"><li><b>memory/</b> 6 files · never packed</li><li><b>.env</b> looks like a credential · skipped, with a warning</li><li><b>webhook token</b> removed</li><li class="kp"><b>{secret:FAL_KEY}</b> kept as a name, to work where a secret of that name exists</li></ul>
      <div class="im" data-from="2"><p class="lb">Import Agent Pack… · D:/agents · showrunner-laptop</p><ul><li>memory/MEMORY.md <em>fresh</em></li><li>workflow steps <em>bound to showrunner-laptop</em></li>${['New footage', 'Weekly channel rhythm'].map(t => `<li class="sw"><span>${t}</span><button type="button" class="tg" aria-pressed="false">off</button></li>`).join('')}</ul><p class="sm">Automations arrive off. Look them over, then switch them on.</p></div>
      <div class="gl" data-from="3"><p class="lb">Browse Agent Pack Gallery… · packGalleryRepos</p><p class="src"><code>https://github.com/muvu-team/agentpacks.git</code><code>D:/team/packs</code></p><ul>${[['editor-shorts', '4 workflows'], ['researcher', '2 duties'], ['inbox-keeper', '1 trigger']].map(([n, d]) => `<li><b>${n}</b><span>${d}</span></li>`).join('')}</ul></div>
      <p class="en" data-from="4"><code>CLAUDE.md</code><i>→ Sync Agent with the Other Engines… →</i><code>AGENTS.md</code><span>read by Codex and Antigravity · memory/ is plain Markdown, used as it is</span></p>`;
    $$(fv, '.tg').forEach(b => b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'on' : 'off'; }));
  },
};
