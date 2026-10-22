// District X, Safe and yours alone: one figure per feature, each a small rebuilt screen or a moving diagram with demo
// data. Elements carry data-from (scripts/district.js shows them by step); step(i) moves the rest. The rules, limits and
// defaults are the extension's own (data/deep/privacy.js cites them); the licence figures come from data/facts.js.
// Names, ids and texts are demo data from the site's one farm: chain chn_7f3a and its leg 93 (session 8b2d07c1), the
// session 7c41e2a0 of "The last keeper", the route or-free and its key OPENROUTER_FREE, accounts acct-a to acct-d.
// Hosts end in .example, which no one can own. The "Try one" rows answer the way the guard would; they never move a step.
import { licence } from '../../data/facts.js';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const json = o => `{ ${Object.entries(o).map(([k, v]) => `"${k}": ${JSON.stringify(v)}`).join(', ')} }`;

/* a row of things to try against a guard, with the try and the verdict under it */
const tryBox = (label, items) => `
  <div class="try"><p class="lb">${label}</p>
    <div class="btns" role="group" aria-label="${label}">${items.map(t => `<button type="button" aria-pressed="false">${esc(t.b)}</button>`).join('')}</div>
    <pre class="tc" hidden></pre><p class="tv" aria-live="polite">Pick one: the answer is the guard's, before anything runs.</p>
  </div>`;
function tries(fv, items, show) {
  const bs = [...fv.querySelectorAll('.try .btns button')], tc = fv.querySelector('.try .tc'), tv = fv.querySelector('.try .tv');
  bs.forEach((b, k) => b.addEventListener('click', () => {
    bs.forEach((x, j) => { x.classList.toggle('on', j === k); x.setAttribute('aria-pressed', String(j === k)); });
    const t = items[k], r = show(t);
    if (t.c) { tc.hidden = false; tc.textContent = '$ ' + t.c; }
    tv.className = 'tv ' + (r ? 'ok' : 'no'); tv.innerHTML = typeof t.v === 'function' ? t.v() : t.v;
  }));
}
/* two or three buttons, one pressed */
const seg = (label, cls, opts, on = 0) =>
  `<div class="seg ${cls}" role="group" aria-label="${label}">${opts.map((o, k) => `<button type="button" data-k="${k}" aria-pressed="${k === on}"${k === on ? ' class="on"' : ''}>${o}</button>`).join('')}</div>`;
function onSeg(el, fn) {
  const bs = [...el.querySelectorAll('button')];
  const set = k => { bs.forEach((b, j) => { b.classList.toggle('on', j === k); b.setAttribute('aria-pressed', String(j === k)); }); fn(k); };
  bs.forEach((b, k) => b.addEventListener('click', () => set(k, true)));
  return set;
}

export default {
  /* X·1 your machine: the engines talk to their providers, the hooks stay on 127.0.0.1, keys in the keychain, the phone page */
  local(fv) {
    const ENG = [['Claude Code', 'var(--claude)', 'Anthropic'], ['Codex', '#9ad', 'OpenAI'], ['Gemini', '#84a9f0', 'Google'], ['Antigravity', 'var(--agy)', 'Google'], ['OpenCode', 'var(--teal)', 'its providers']];
    fv.innerHTML = `
      <div class="hd"><b>Your machine</b><span>who talks to whom · diagram</span></div>
      <div class="mach">
        <p class="zones"><span>this machine</span><span>outside</span></p>
        <div class="afb"><b>VS Code · Agent Farm</b><small>runs no model of its own</small></div>
        <p class="disk">On your disk: each CLI's transcripts, where it writes them, and Agent Farm's tasks, chains and projects.</p>
        <ul class="engs">${ENG.map(([n, c, p]) => `<li style="--ec:${c}"><span class="en">${n}</span><i class="wire"></i><span class="pv">${p}</span></li>`).join('')}</ul>
        <p class="use" data-from="1"><span class="en">plan usage</span><i class="wire"></i><span class="pv">Anthropic</span><small>acct-a … acct-d, each with its own sign-in</small></p>
        <div class="hook" data-from="2"><span>Claude Code</span><i>→</i><code>POST /event</code><i>→</i><b>127.0.0.1:8377</b><small>nine kinds of event · only this machine can reach it</small></div>
        <div class="keys" data-from="3"><span class="kc">OS keychain</span><code>OPENROUTER_FREE</code><code>FAL_KEY</code><small>names on screen, values never over the bridge · acct-a … acct-d are the CLI's own config folders</small></div>
        <div class="web" data-from="4">
          <div class="wi"><p class="wh"><b>Phone page</b><code>:8378</code><span>read-only · token required</span></p>
            ${seg('Where the phone page listens', 'bind', ['This machine', 'Your network'])}
            <p class="wo"></p></div>
          <div class="ph" aria-hidden="true"><i></i><span>a phone on your network</span></div>
        </div>
      </div>
      <label class="sl"><code>agentFarm.planUsageRefreshMinutes</code><input type="range" min="0" max="30" step="1" value="5"><output>5 min</output></label><p class="slo"></p>`;
    const mach = fv.querySelector('.mach'), web = fv.querySelector('.web'), wo = fv.querySelector('.wo');
    onSeg(fv.querySelector('.bind'), k => {
      web.classList.toggle('lan', k === 1);
      wo.innerHTML = k ? 'Listening on your network. The QR code carries the link and its token, drawn by Agent Farm\'s own encoder, never by an online service.'
        : 'Listening on 127.0.0.1. No QR code: the page says <b>Bound to this machine only — select LAN for phone access</b>.';
    })(0);
    const r = fv.querySelector('.sl input'), o = fv.querySelector('.sl output'), p = fv.querySelector('.slo');
    const go = () => {
      const v = +r.value;
      o.textContent = v ? v + ' min' : '0';
      p.innerHTML = v ? `An idle farm reads each plan's usage every <b>${v} min</b>; while an agent works, every 60 s. One request per beat, however many screens show it.`
        : '<b>0 = only when you ask</b>: no read on a timer, idle or busy, until you press ⟳.';
    };
    r.addEventListener('input', go); go();
    return { step(i) { mach.classList.toggle('flow', i >= 1); } };
  },

  /* X·2 everything that comes to us: nothing on Free, one check a day on a paid licence, and the services you switch on */
  telemetry(fv) {
    const SVC = [['Voice briefing', 'fal.ai'], ['Studio media', 'fal.ai · Replicate'], ['Gatekeeper', 'Jev'], ['Telegram', 'Telegram'], ['Webhook', 'your URL']];
    const N = licence.offlineDays;
    fv.innerHTML = `
      <div class="hd"><b>To MuVuSOFT</b><span>everything Agent Farm sends us · diagram</span></div>
      ${seg('Licence', 'plan', ['Free', 'Paid licence'])}
      <div class="zero"><b>0</b><span>bytes of your work,<br>on either</span></div>
      <div class="lic">
        <p class="none">No request to us. Not one.</p>
        <div class="chk"><p class="mh"><span>The licence check, whole</span><span>${licence.checkEvery}</span></p><pre><span class="aw">→</span> ${esc(json(licence.sends))}
<span class="aw">←</span> ${esc(json(licence.answer))}</pre></div>
      </div>
      <p class="never" data-from="2"><b>Never in it:</b> ${licence.never.join(' · ')}.</p>
      <div class="off" data-from="3"><div class="days">${Array.from({ length: N }, (_, k) => `<i style="--d:${k * 40}ms"></i>`).join('')}</div><p>No connection for ${N} days: still working.</p></div>
      <div class="svc" data-from="4"><p class="lb">Yours to switch on · tap one</p><div class="sv">${SVC.map(([n, to]) => `<button type="button" aria-pressed="false"><b>${n}</b><span>→ ${to}</span></button>`).join('')}</div></div>
      <p class="tally" aria-live="polite"></p>`;
    const lic = fv.querySelector('.lic'), tally = fv.querySelector('.tally'), sv = [...fv.querySelectorAll('.sv button')];
    let paid = 0, mine = false;
    const draw = () => {
      lic.classList.toggle('paid', !!paid);
      const on = sv.filter(b => b.classList.contains('on')).map(b => b.querySelector('b').textContent);
      tally.innerHTML = `To us today: <b>${paid ? `1 request, the licence check` : '0 requests'}</b>. Switched on by you: <b>${on.length ? on.join(', ') : 'none'}</b>.`;
    };
    const plan = onSeg(fv.querySelector('.plan'), k => { paid = k; draw(); });
    fv.querySelector('.plan').addEventListener('click', () => { mine = true; });
    sv.forEach(b => b.addEventListener('click', () => { const on = !b.classList.contains('on'); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); draw(); }));
    return { step(i) { if (!mine) plan(i === 0 ? 0 : 1); } };
  },

  /* X·3 a shell command refused before it runs, the safe way told, and the one deliberate way through */
  shellguard(fv) {
    const R = ['a character outside ASCII', 'a backtick', 'a heredoc with <code>\\</code> or <code>${</code>, or past 20 lines', 'quoted text over 600 characters'];
    const TOLD = ' Told: write the text to a file and give the command its name.';
    const T = [
      { b: 'em dash', c: 'git commit -m "X-40 part 9 — CSV writer"', r: 0, v: '<b>Refused.</b> The em dash (—) is outside ASCII.' + TOLD },
      { b: 'backtick', c: 'echo "built at `date`"', r: 1, v: '<b>Refused.</b> A backtick runs a second command inside this one.' + TOLD },
      { b: 'long heredoc', c: "cat <<'EOF' > notes.md\n  … 24 lines …\nEOF", r: 2, v: '<b>Refused.</b> A heredoc past 20 lines.' + TOLD },
      { b: 'long quote', c: 'node -e "… 812 characters …"', r: 3, v: '<b>Refused.</b> Quoted text over 600 characters.' + TOLD },
      { b: 'from a file', c: 'git commit -F msg.txt', r: -1, v: '<b>Runs.</b> Plain ASCII, and the text is in a file.' },
      { b: 'af:allow-shell', c: 'git commit -m "X-40 part 9 — CSV writer"  # af:allow-shell', r: -1, v: '<b>Runs.</b> af:allow-shell lets this one command through, and the transcript shows it.' },
    ];
    fv.innerHTML = `
      <div class="hd"><b>ShellGuard</b><span>leg 93 · session 8b2d07c1 · the shell tool</span></div>
      <div class="call"><p class="lb">The agent's shell call</p><pre class="cmd">$ git commit -m "X-40 part 9 <mark>—</mark> CSV writer"</pre><p class="hk">PreToolUse <i>→</i> ShellGuard <i>→</i> <span class="shl">the shell</span></p></div>
      <p class="vd" data-from="1"><b>Refused</b> before the shell saw it: <code>—</code> is a character outside ASCII.</p>
      <ol class="rules" data-from="1">${R.map((t, k) => `<li${k === 0 ? ' class="hit"' : ''}>${t}</li>`).join('')}</ol>
      <div class="safe" data-from="2"><p class="lb">Told to the agent</p><p>Write the text to a file, and give the command only the file's name.</p><pre class="cmd">$ git commit -F msg.txt <span class="okk">✓ runs</span></pre></div>
      <p class="esc" data-from="3"><code>af:allow-shell</code> in a command lets that one through. It is in the command, so the transcript shows it.</p>
      ${tryBox('Try one', T)}`;
    const rules = [...fv.querySelectorAll('.rules li')], sh = fv.querySelector('.hk .shl');
    tries(fv, T, t => { rules.forEach((li, k) => li.classList.toggle('hit', k === t.r)); return t.r < 0; });
    return { step(i) { sh.classList.toggle('x', i >= 1 && i < 2); sh.classList.toggle('ok', i >= 2); } };
  },

  /* X·4 an agent hunting the disk for a session id is stopped and sent to the bridge, which reads the session properly */
  bridgeguard(fv) {
    const T = [
      { b: 'short id', c: 'grep -r 7c41e2a0 ~/.claude/projects', ok: 0, v: '<b>Stopped.</b> 7c41e2a0 starts a session Agent Farm knows. Told: <code>af.js sessions.find q=7c41e2a0</code>.' },
      { b: 'full id', c: 'rg -l 7c41e2a0-5b9d-4e8a-9f20-3c1d6a7e44b1', ok: 0, v: '<b>Stopped.</b> A full session id, 36 characters. Told: <code>af.js sessions.read id=…</code>.' },
      { b: 'git hash', c: 'git log --oneline | grep a41c9e2', ok: 1, v: '<b>Runs.</b> A git hash is left alone.' },
      { b: 'the bridge', c: 'node af.js sessions.find q=7c41e2a0', ok: 1, v: '<b>Runs.</b> A call to af.js is never stopped.' },
      { b: 'af:allow-id', c: 'grep -r 7c41e2a0 exports/  # af:allow-id', ok: 1, v: '<b>Runs.</b> af:allow-id lets this one search through.' },
    ];
    fv.innerHTML = `
      <div class="hd"><b>BridgeGuard</b><span>showrunner · Grep, Glob and search commands</span></div>
      <p class="ask"><b>You</b> Pick up where session 7c41e2a0 left off.</p>
      <pre class="cmd">$ grep -r "7c41e2a0" ~/.claude/projects</pre>
      <p class="vd" data-from="1"><b>Stopped</b> before it ran: 7c41e2a0 starts a session Agent Farm knows.</p>
      <blockquote class="dir" data-from="2">"7c41e2a0" is a session id, and Agent Farm data is asked of the bridge, never hunted for on disk. Run <code>af.js sessions.find q=7c41e2a0</code> instead (answers file, engine, agent, cwd), and <code>af.js sessions.read id=7c41e2a0</code> hands over the conversation itself.</blockquote>
      <div class="rd" data-from="3"><pre class="cmd">$ node af.js sessions.read id=7c41e2a0 from=-4</pre>
        <ol class="ms"><li><b>user</b><span>It passed. What exactly changed?</span></li><li><b>assistant</b><span>One line in the prompt: "one rotating beam, visible through rain".</span></li><li><b>user</b><span>Write that line into the recipe's scene step.</span></li><li><b>tool</b><span>Edit · the recipe's scene step</span></li></ol></div>
      <div class="cov" data-from="4"><span><code>af:allow-id</code> lets one search through</span><span><code>af.js</code> is never stopped</span><span class="cv">Claude Code · claude-hook</span><span class="cv">Codex · codex-hook</span><span class="cv no">no hook · none</span></div>
      ${tryBox('Try a search', T)}`;
    const card = fv.querySelector('.cmd');
    tries(fv, T, t => t.ok);
    return { step(i) { card.classList.toggle('x', i >= 1); } };
  },

  /* X·5 the label on the card is the mode in force; Default resolved from the layers; a refused launch; the live picker; the lint */
  permissions(fv) {
    const L = [['managed', '—'], ['local', '—'], ['project', '—'], ['user', 'defaultMode: bypassPermissions']];
    fv.innerHTML = `
      <div class="hd"><b>Console</b><span>developer · Claude Code · acct-b</span></div>
      <div class="pc"><span class="pl"></span><span class="st"></span></div>
      <div class="doors"><span>Console</span><span>Terminal</span><span>Headless</span><i>→</i><b>one place builds the flags</b></div>
      <div class="layers" data-from="1"><p class="lb">Default, worked out before launch</p>${L.map(([n, v]) => `<p class="ly"><span>${n}</span><code>${v}</code></p>`).join('')}<p class="res"></p></div>
      <p class="msg p" data-from="2"><b>Launch refused.</b> A managed policy on this machine forbids bypass, so the session does not open under that label.</p>
      <div class="live" data-from="3"><p class="lb">A running session's mode</p><div class="modes"><span>default</span><span>acceptEdits</span><span class="on">plan</span><span>dontAsk</span><span class="bp">⚠ bypassPermissions</span></div>
        <p class="lo">Asked for bypassPermissions: the CLI's refusal is a line in the conversation, in its own words, and the picker shows the mode it kept, <b>plan</b>.</p></div>
      <div class="lint" data-from="4"><p class="lb">Insights · permission lint · developer</p><ul>
        <li class="x"><b>⛔ bypass mode</b><code>defaultMode: bypassPermissions</code></li>
        <li class="x"><b>⛔ dangerous pattern</b><code>Bash(git push --force:*)</code></li>
        <li class="w"><b>⚠ overly broad</b><code>Bash(*)</code></li>
        <li class="i"><b>ℹ unused broad rule</b><code>Bash(docker:*)</code><small>not called in 30 days</small></li>
        <li class="i"><b>ℹ duplicate rule</b><code>Bash(npm run:*)</code></li></ul></div>`;
    const pc = fv.querySelector('.pc'), pl = pc.querySelector('.pl'), st = pc.querySelector('.st'), ly = fv.querySelectorAll('.ly'), res = fv.querySelector('.res');
    return { step(i) {
      pl.textContent = i === 0 ? '⚠ bypassPermissions' : 'Default';
      st.textContent = i === 0 ? 'in the process: bypass' : i === 1 ? '→ bypassPermissions, from the user layer' : 'refused before launch';
      pc.classList.toggle('no', i >= 2);
      ly[0].querySelector('code').textContent = i >= 2 ? 'bypass forbidden' : '—';
      ly[0].classList.toggle('hit', i >= 2); ly[3].classList.toggle('hit', i === 1);
      res.textContent = i >= 2 ? 'The managed layer wins: no bypass on this machine.' : 'Default here means bypassPermissions, and the preview says so.';
    } };
  },

  /* X·6 a route key from the keychain into a run, scrubbed from what the run printed; Gatekeeper's masking and its audit line */
  masking(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Keys kept out</b><span>route or-free · task run 41</span></div>
      <div class="vault"><span class="kc">OS keychain</span><code>OPENROUTER_FREE</code><span>bound to or-free · openrouter.ai/api</span><span class="hid">value never shown</span></div>
      <div class="env" data-from="1"><p class="lb">Run 41's environment, at launch</p><p><s>ANTHROPIC_*</s> <s>CLAUDE_* that carry a route</s> <i>→</i> <b>or-free's key, from OPENROUTER_FREE</b></p></div>
      <div class="out" data-from="2">
        <div><p class="lb">What run 41 printed</p><pre>POST /api/v1/chat/completions 401
Authorization: Bearer <mark>sk-or-v1-9c2e…f04d</mark></pre></div>
        <div><p class="lb">What the archive keeps</p><pre>POST /api/v1/chat/completions 401
Authorization: Bearer <span class="rx" role="img" aria-label="removed"></span></pre></div>
      </div>
      <div class="gk" data-from="3"><p class="lb">Gatekeeper → Jev · rule trigger.has-work</p><pre>run 41 failed: 401 with key <span class="rx" role="img" aria-label="masked"></span> … (trimmed)</pre><small>key and token patterns, and every value in your vault, masked before it leaves</small></div>
      <pre class="audit" data-from="4">audit-2026-10.jsonl · trigger.has-work · input: hash 3f9a…c21, length 4,182
never the input, never a key</pre>`;
    const mk = fv.querySelector('.out mark');
    return { step(i) { mk.classList.toggle('hot', i >= 2); } };
  },

  /* X·7 a browser step: the allow list (try a URL), a URL outside it failing without running, the approval, the browser's own block */
  browser(fv) {
    let ask = true, last = -1;
    const opens = why => () => `<b>Opens</b>: ${why} ${ask ? 'You are asked first, with the URL and the objective.' : 'No question: approval is auto, by your choice.'}`;
    const T = [
      { b: 'logbooks.example/keepers/1891', ok: 1, v: opens('on this step\'s list.') },
      { b: 'scans.logbooks.example/p/412', ok: 1, v: opens('a subdomain of logbooks.example.') },
      { b: 'docs.orbit-app.example/export', ok: 1, v: opens('covered by agentFarm.browserAllowHosts.') },
      { b: 'paste.example/raw/7f3a', ok: 0, v: '<b>Fails without running.</b> No list covers paste.example, and the workflow\'s on-fail rule takes over.' },
    ];
    fv.innerHTML = `
      <div class="hd"><b>Browser step</b><span>workflow keeper-logs · step 2 · researcher</span></div>
      <div class="bs"><p><span class="k">URL</span><code>https://logbooks.example/keepers/1891</code></p><p><span class="k">Objective</span><span>List the keepers named in the 1891 log.</span></p><p><span class="k">Hosts</span><code>logbooks.example</code></p></div>
      <div class="al" data-from="1"><span class="h"><code>logbooks.example</code><small>this step</small></span><span class="h"><code>orbit-app.example</code><small>browserAllowHosts</small></span><span class="sub">subdomains included</span></div>
      <p class="msg p" data-from="2"><b>✗ paste.example/raw/7f3a</b> failed without running; the on-fail rule takes over.</p>
      <div class="dlg" data-from="3"><p class="dt">Approval · before each run</p><p><code>https://logbooks.example/keepers/1891</code></p><p>List the keepers named in the 1891 log.</p><div class="btns"><button type="button" tabindex="-1">Run</button><button type="button" tabindex="-1">Cancel</button></div></div>
      <div class="blk" data-from="4"><p class="lb">Recipe step · a link off the list, mid-run</p><code>about:blank#BLOCKED BY AGENT FARM … tracker.example</code></div>
      ${tryBox('Try a URL', T)}
      <div class="ap"><code>agentFarm.browserApproval</code>${seg('Approval before a browser step', 'appr', ['ask', 'auto'])}</div>`;
    const bs = [...fv.querySelectorAll('.try .btns button')];
    tries(fv, T, t => { last = T.indexOf(t); return t.ok; });
    onSeg(fv.querySelector('.appr'), k => { ask = k === 0; if (last >= 0) bs[last].click(); });
    const dlg = fv.querySelector('.dlg');
    return { step(i) { dlg.classList.toggle('up', i === 3); } };
  },

  /* X·8 fourteen disciplines asleep on disk, a small index in the prompt, one read when needed; the switch per job */
  superpowers(fv) {
    const SK = ['test-driven development', 'systematic debugging', 'root-cause analysis', 'planning', 'brainstorming', 'verification', 'code review'];
    fv.innerHTML = `
      <div class="hd"><b>Superpowers</b><span>developer · leg 93 · ⚡ on</span></div>
      <div class="disk"><p class="lb">On disk · 0 tokens</p><ul class="sk">${SK.map((n, k) => `<li${k === 1 ? ' class="sd"' : ''}>${n}</li>`).join('')}${Array.from({ length: 14 - SK.length }, () => '<li class="un" aria-hidden="true">SKILL.md</li>').join('')}</ul><small>14 in all; the folder is agentFarm.superpowersPath</small></div>
      <div class="pr" data-from="1"><p class="lb">In the session's system prompt</p><p class="hk"><code>using-superpowers/SKILL.md</code><span>the root hook · about 2.5 KB</span></p><p class="mf">+ where each of the 14 is on disk</p></div>
      <p class="msg c" data-from="2">Leg 93 debugs the CSV writer's date column across a DST change: it reads <b>systematic debugging</b>'s SKILL.md, and no other.</p>
      <ul class="rl" data-from="3"><li>No fix before the root cause: four steps of systematic debugging.</li><li>No "done" without evidence.</li></ul>
      <div class="job"><p class="lb">⚡ Superpowers for one job · try it</p>
        <div class="jr"><span>Agent</span>${seg('Agent', 'ag', ['developer', 'showrunner'])}</div>
        <div class="jr"><span>This job</span>${seg('Superpowers for this job', 'ch', ['Agent default', 'On', 'Off'])}</div>
        <p class="jo" aria-live="polite"></p></div>`;
    const sk = [...fv.querySelectorAll('.sk li')], jo = fv.querySelector('.jo');
    const AG = ['developer', 'showrunner'], DEF = [true, false];
    let a = 0, c = 0;
    const draw = () => {
      const on = c === 0 ? DEF[a] : c === 1;
      jo.innerHTML = `<b class="${on ? 'on' : ''}">⚡${on ? 'on' : 'off'}</b> ${c === 0 ? `agent default (${on ? 'on' : 'off'} for ${AG[a]})` : `for this job only; ${AG[a]}'s own setting is untouched`}. A retry of the job keeps this answer.`;
    };
    onSeg(fv.querySelector('.ag'), k => { a = k; draw(); });
    onSeg(fv.querySelector('.ch'), k => { c = k; draw(); });
    draw();
    return { step(i) {
      sk.forEach(li => li.classList.toggle('zz', i < 2));
      sk[1].classList.toggle('rd', i >= 2);
    } };
  },
};
