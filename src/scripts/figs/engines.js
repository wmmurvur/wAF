// District VII, Any brain: one figure per feature, each a small rebuilt screen with demo data. Elements carry
// data-from (scripts/district.js shows them by step); step(i) moves the rest. The rules are the extension's own
// (data/deep/engines.js cites them): the Engines page's four questions, the install line typed and not run, ⚡ Test as
// one real turn with its age and the engine's own words, an engine offered and refused; a route's tiers, its two
// engines, the inherited names cleared and the key bound to the address, fixed on Claude and turn-bound on OpenCode;
// the radar as a schedule; route health's free check and the paid turn on a press; the vault's keychain, variables,
// {secret:NAME}, scopes and no bridge op; accounts as folders, one standing, read in a line, refused not guessed; the
// model switched from the next turn; eleven doors, saved setups, where it runs and the reopen; the sync to AGENTS.md
// and its directions; paths saved as tokens, healed on load, refused when they cannot be resolved.
// Agents, routes, keys, accounts, paths, times and figures are demo data. Today is Mon Oct 12.

const $$ = (fv, s) => [...fv.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
const ENG = { 'Claude Code': '', Codex: 'x', Antigravity: 'a', OpenCode: 'o', Gemini: 'g' };
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
  /* VII·1 five engines, four questions each; the install line; one real turn; offered and refused */
  engines(fv) {
    const ROWS = [
      ['Claude Code', '2.1.x', 'a Max plan', '✓', 'nothing to do'],
      ['Codex', '0.147', 'a ChatGPT plan', '✓', 'nothing to do'],
      ['Gemini', '—', 'an API key', '—', 'Install'],
      ['Antigravity', '1.1.11', 'the app\'s sign-in', '✓', 'nothing to do'],
      ['OpenCode', '1.18', 'free models, no sign-in', '—', 'nothing to do'],
    ];
    fv.innerHTML = `
      <div class="hd"><b>Engines</b><span>4 of 5 can run here · 3 on a plan · demo</span></div>
      <div class="eg"><p class="th"><span>engine</span><span>on this machine</span><span>paid with</span><span>signed in</span><span>next</span></p>
        ${ROWS.map(([e, v, p, s, n]) => `<p class="er${v === '—' ? ' no' : ''}"><span>${eng(e)}</span><span class="c1">${v === '—' ? 'not installed' : 'v ' + v}</span><span class="c2">${p}</span><span class="c3">${s}</span><span class="c4">${n}</span></p>`).join('')}</div>
      <div class="inst" data-from="2"><p class="lb">Gemini · Install</p><pre>PS&gt; npm install -g @google/gemini-cli<i class="cur"></i></pre><p class="tn">Typed into a terminal for you to read. It runs when you press Enter, not before. Needs Node.js v20+.</p></div>
      <div class="tst" data-from="3"><p class="lb">⚡ Test · one real turn</p>${seg('Engine to test', 'tse', ['Claude Code', 'Codex'])}<button type="button" class="gh go">⚡ Test</button><p class="tv" aria-live="polite"></p></div>
      <div class="pk" data-from="4"><p class="lb">Start a session · Engine</p><ul><li class="on">Claude Code</li><li>Codex</li><li class="off">Gemini <em>not installed: install it on the Engines page</em></li><li>Antigravity</li><li>OpenCode</li></ul></div>`;
    const tv = fv.querySelector('.tv'), go = fv.querySelector('.go');
    let which = 0, busy = false;
    const said = ['Not tested in this window. What is above was read off disk; only a call proves it works.', 'Tested 4 h ago · ✓ answered in 4.6 s · said OK. Four hours is not now.'];
    onSeg(fv.querySelector('.tse'), k => { which = k; if (!busy) tv.innerHTML = said[k]; })(0);
    go.addEventListener('click', async () => {
      if (busy) return; busy = true; go.disabled = true;
      tv.innerHTML = `<span class="t">⟳ calling ${which ? 'codex' : 'claude'} · smallest model · read-only · prompt: <code>Reply with exactly: OK</code></span>`;
      await sleep(1500);
      tv.innerHTML = which
        ? '<span class="bad">✗ Failed · just now.</span> The engine said: <code>error sending request (os error 10013)</code>. Its sign-in file looked fine; only the call found it.'
        : '<span class="ok">✓ Answered · just now · 3.1 s · it said OK.</span> Cached for this window, with its age.';
      said[which] = tv.innerHTML; busy = false; go.disabled = false;
    });
    return { step(i) { fv.querySelectorAll('.eg .er').forEach((r, k) => r.classList.toggle('hl', i === 2 && k === 2)); fv.querySelector('.eg').dataset.col = i === 1 ? '2' : i === 0 ? 'all' : ''; } };
  },

  /* VII·2 a route: address, key, tiers, two engines, what is cleared, the card */
  routes(fv) {
    fv.innerHTML = `
      <div class="hd"><b>New route</b><span>from the Kimi template · demo</span></div>
      <div class="rt"><p><span>id</span><code>kimi-k2</code></p><p><span>endpoint</span><code>https://api.moonshot.ai/anthropic</code></p><p><span>key</span><code>KIMI_KEY</code><i>in the keychain · ••••</i></p></div>
      <div class="ti" data-from="1"><p class="lb">Tiers · the route's own names</p>
        <p class="tr"><span>opus</span><b>→</b><code>kimi-k2-thinking</code></p><p class="tr"><span>sonnet</span><b>→</b><code>kimi-k2</code><em>default</em></p><p class="tr"><span>haiku</span><b>→</b><code>kimi-k2-turbo</code></p>
        <p class="cx"><span>Context</span><code>256k</code><em>the window Claude Code is told</em></p>
        ${seg('The session asks for', 'ask', ['opus', 'sonnet', 'nothing'], 1)}<p class="ao" aria-live="polite"></p></div>
      <div class="sv" data-from="2"><p><span class="eng">Claude Code</span><b>given at start</b><em>the route is part of the session's environment</em></p><p><span class="eng o">OpenCode</span><b>lent at start</b><em>its own files untouched · a group of its own: <i>Agent Farm routes</i> · <i>OpenCode's own</i></em></p></div>
      <div class="en" data-from="3"><p class="lb">The session's environment</p>
        <pre><s>ANTHROPIC_BASE_URL=https://old-proxy.example</s>  <em>inherited · cleared</em>
<s>ANTHROPIC_API_KEY=sk-ant-…</s>              <em>inherited · cleared</em>
<b>ANTHROPIC_BASE_URL=https://api.moonshot.ai/anthropic</b>
<b>key → bound to api.moonshot.ai</b></pre>
        <button type="button" class="gh mv">Change the address</button><p class="mo" aria-live="polite">75 ANTHROPIC_ names are cleared before the route's own go in.</p></div>
      <div class="cd" data-from="4"><p class="ch"><b>developer</b><span class="eng">Claude Code</span><span class="pill">Kimi K2</span><em>sonnet</em></p>
        ${seg('Engine', 'cde', ['Claude Code', 'OpenCode'])}<p class="co" aria-live="polite"></p></div>`;
    const ao = fv.querySelector('.ao');
    onSeg(fv.querySelector('.ask'), k => { ao.innerHTML = ['Sent as <code>kimi-k2-thinking</code>. The name <em>opus</em> never reaches Kimi.', 'Sent as <code>kimi-k2</code>.', 'No model picked: the default tier goes in, <code>kimi-k2</code>.'][k]; })(1);
    const mo = fv.querySelector('.mo');
    fv.querySelector('.mv').addEventListener('click', e => { e.target.disabled = true; mo.innerHTML = '<span class="bad">Address changed to https://api.other.example.</span> KIMI_KEY was bound to api.moonshot.ai, so it is not sent there. Bind a key to the new address first.'; });
    const co = fv.querySelector('.co'), pill = fv.querySelector('.cd .pill'), badge = fv.querySelector('.cd .ch .eng');
    onSeg(fv.querySelector('.cde'), k => {
      badge.className = 'eng' + (k ? ' o' : ''); badge.textContent = k ? 'OpenCode' : 'Claude Code';
      pill.title = 'Kimi K2 · https://api.moonshot.ai/anthropic';
      co.innerHTML = k ? 'On OpenCode the provider may change between turns, and the pill follows what is serving now, with <em>Started on: Kimi K2</em> under it.' : 'On Claude Code the route holds for the whole session. Hover the pill: the endpoint.';
    })(0);
  },

  /* VII·3 the radar: a schedule, a run, its report, a route over the bridge, untested until you pick it */
  radar(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Schedules</b><span>an example the owner runs · demo</span></div>
      <p class="sc"><b>Free model radar</b><span>explorer</span><span>every day 04:30</span><em>next: tomorrow 04:30</em></p>
      <pre class="lg" data-from="1">04:30:02  explorer · a new session · sonnet
04:30:09  read a provider's list of today's free models: 14
04:30:11  routes you already have for them: 12</pre>
      <div class="rp" data-from="2"><p class="lb">Its report · archived like every run</p><p class="nw">+ <code>coder-34b:free</code> answered a test prompt</p><p class="nw">+ <code>chat-70b:free</code> answered a test prompt</p><p class="gn">− <code>vision-11b:free</code> is no longer free</p></div>
      <div class="br" data-from="3"><p class="lb">Over the bridge · a new route</p><pre>id        or-coder-34b
endpoint  https://openrouter.ai/api
tiers     sonnet → coder-34b:free
key       OPENROUTER_FREE   <em>a name in your vault; the value is never seen</em></pre></div>
      <div class="us" data-from="4"><p class="rc"><b>OpenRouter coder 34b</b><i class="nt">never tested</i><span>added by the schedule Free model radar</span></p>
        ${seg('Use it for', 'use', ['nothing yet', 'one session', 'an agent', 'a saved setup'])}<p class="uo" aria-live="polite"></p></div>`;
    const uo = fv.querySelector('.uo');
    onSeg(fv.querySelector('.use'), k => {
      uo.innerHTML = ['Nothing moves onto it by itself.', 'Picked in the composer\'s Route box for this one session.', '<b>writer</b> now starts on it by default, on Claude Code.', 'The setup <b>cheap draft</b> = route or-coder-34b · sonnet · plan.'][k];
    })(0);
  },

  /* VII·4 route health: the free check, by engine, never tested is normal, one paid turn on a press, the manifest */
  health(fv) {
    const R = [
      ['Claude Code', [['Anthropic (first-party)', 'anthropic', 'tested · 2d ago', 3], ['Kimi K2', 'kimi-k2', '', 3]]],
      ['OpenCode', [['its own providers', 'opencode', 'tested · 1d ago', 7], ['Kimi K2', 'kimi-k2', '', 3], ['On this machine', 'local', 'tested · 2d ago', 1]]],
    ];
    fv.innerHTML = `
      <div class="hd"><b>Route health</b><span>what can be known for free · demo</span></div>
      ${R.map(([e, rows]) => `<p class="hg">${eng(e)}</p>${rows.map(([l, id, t, n]) => `<p class="hr" data-r="${e}:${id}"><b>${l}</b><code>${id}</code><i class="cf">configured</i><i class="av">available</i><i class="${t ? 'ok' : 'nt'}">${t || 'never tested'}</i><em>${n} model${n > 1 ? 's' : ''}</em>${!t && e === 'Claude Code' ? '<button type="button" class="gh tr">Test route</button>' : ''}</p>`).join('')}`).join('')}
      <p class="nm" data-from="2">Available, never tested: the ordinary state. A turn is only ever bought by pressing for it.</p>
      <p class="tv" data-from="3" aria-live="polite">Test route spends one real turn on Claude Code through Kimi K2.</p>
      <div class="mf" data-from="4"><p class="lb">Launch record · session 5d1e09aa</p><p><span>asked</span>Claude Code · route <code>kimi-k2</code> r3 · tier sonnet → <code>kimi-k2</code></p><p><span>reported</span>model <code>kimi-k2</code> · provider: Claude Code names none, so this record is the only witness</p></div>`;
    const tv = fv.querySelector('.tv'), b = fv.querySelector('.tr');
    b.addEventListener('click', async () => {
      b.disabled = true; b.textContent = '⟳ testing…'; tv.textContent = 'One real turn: smallest tier, a four-word prompt.';
      await sleep(1600);
      const chip = b.parentElement.querySelector('.nt'); chip.className = 'ok'; chip.textContent = 'tested · just now'; b.remove();
      tv.innerHTML = '<span class="ok">✓ Kimi K2 answered on Claude Code in 2.4 s.</span> Tomorrow this says "1d ago".';
    });
    return { step(i) { fv.querySelectorAll('.hr').forEach(r => { r.classList.toggle('a0', i === 0); r.classList.toggle('a2', i === 2 && !!r.querySelector('.nt')); }); fv.querySelectorAll('.hg').forEach(g => g.classList.toggle('hl', i === 1)); } };
  },

  /* VII·5 the vault: keychain, variable, {secret:NAME}, scope, no bridge op */
  vault(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Set Secret…</b><span>Agent Farm · demo</span></div>
      <div class="ss"><p><span>Name</span><code>FAL_KEY</code></p><p><span>Value</span><code>••••••••••••••••</code><em>hidden as you type</em></p><p class="ok">✓ In the OS keychain. Not in settings, not in git.</p></div>
      <pre class="ev" data-from="1">task 0412 · studio · env
FAL_KEY=••••   <em>from the vault</em></pre>
      <div class="tp" data-from="2"><p class="lb">A webhook step</p><p><span>in the step</span><code>https://n8n.example/hook?t={secret:N8N_TOKEN}</code></p><p><span>at the call</span><code>…/hook?t=••••</code><em>filled in for this call, written nowhere</em></p></div>
      <div class="scope" data-from="3"><p class="lb">FAL_KEY · used by</p>${seg('Scope', 'scp', ['all agents', 'studio, writer', 'Agent Farm only'])}<ul class="ag"></ul></div>
      <div class="nb" data-from="4"><p><b>List Secrets</b> FAL_KEY · KIMI_KEY · N8N_TOKEN · OPENROUTER_FREE <em>names only</em></p><p class="no">The vault has no bridge operation: an agent uses the keys open to its task, and can never ask for one.</p></div>`;
    const AG = ['developer', 'studio', 'writer', 'reviewer', 'explorer'], ul = fv.querySelector('.ag');
    onSeg(fv.querySelector('.scp'), k => {
      const open = k === 0 ? AG : k === 1 ? ['studio', 'writer'] : [];
      ul.innerHTML = AG.map(a => `<li class="${open.includes(a) ? 'y' : 'n'}">${a}</li>`).join('') + `<li class="${k === 2 ? 'y af' : 'n'}">⚙ Agent Farm</li>`;
    })(0);
  },

  /* VII·6 accounts: capture, a folder each, one standing, bars read in a line, refused not guessed */
  accounts(fv) {
    const A = [['work', 'max', 78, 23], ['night', 'pro', 4, 54], ['studio', 'pro', 12, 79]];
    fv.innerHTML = `
      <div class="hd"><b>Accounts</b><span>Claude Code 3 · Codex 1 · demo</span></div>
      <p class="cap"><span>Claude Code ▾</span><span class="lbl">night</span><button type="button" class="gh cpt">Capture this sign-in</button></p>
      <pre class="fd" data-from="1">developer  → CLAUDE_CONFIG_DIR = …\\accounts\\claude\\work
studio     → CLAUDE_CONFIG_DIR = …\\accounts\\claude\\night
<em>two sessions, two plans, at the same time; neither signs the other out</em></pre>
      <div class="ac">${A.map(([n, p, h, w], k) => `<div class="a${k === 0 ? ' st' : ''}" data-a="${n}"><p class="ah"><b>${n}</b><i>${p}</i><span class="tg">${k === 0 ? '🟢 standing' : ''}</span><button type="button" class="gh use"${k === 0 ? ' hidden' : ''}>⚡ Use this one</button></p><p class="q" data-from="3"><span>5H</span><span class="bar"><i style="width:${h}%"></i></span><em>${h}%</em><span>WK</span><span class="bar"><i style="width:${w}%"></i></span><em>${w}%</em></p></div>`).join('')}</div>
      <p class="ln" data-from="3">◍ refresh all: one read every 5 s, the stalest first</p>
      <div class="rf" data-from="4"><p><b>task 0418 · account "spare"</b> no such slot: refused. Not started on "work" instead.</p><p><b>Codex · account "night"</b> night belongs to Claude Code: refused.</p><p class="dm">Gemini · OpenCode · Antigravity: one sign-in each; each was found to work another way.</p></div>`;
    const cap = fv.querySelector('.cpt');
    cap.addEventListener('click', () => { cap.disabled = true; cap.textContent = '✓ captured as night'; });
    const setStanding = n => $$(fv, '.ac .a').forEach(a => { const on = a.dataset.a === n; a.classList.toggle('st', on); a.querySelector('.tg').textContent = on ? '🟢 standing' : ''; a.querySelector('.use').hidden = on; });
    $$(fv, '.use').forEach(b => b.addEventListener('click', () => setStanding(b.closest('.a').dataset.a)));
    return { step(i) { fv.querySelector('.ac').classList.toggle('hl', i === 2); } };
  },

  /* VII·7 the model switched mid-conversation; pending until the CLI agrees; per-turn engines; who serves it */
  switch(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Console</b><span>developer · demo</span></div>
      <div class="cv"><p class="u">Now write the migration and its test.</p><p class="as">Writing <code>0007_timeline_export.sql</code>…</p><p class="ls">✓ last turn — 41s · $0.031 (4.2k tokens) · <b class="lm">opus 5 · high</b></p></div>
      <div class="bx"><div class="rw"><span>Model</span>${seg('Model', 'mdl', ['opus', 'sonnet', 'haiku'])}</div><p class="mo" aria-live="polite"></p>
        <div class="rw" data-from="2"><span>Effort</span>${seg('Effort', 'eff', ['medium', 'high', 'xhigh'], 1)}</div><div class="rw" data-from="2"><span>Permissions</span>${seg('Permissions', 'prm', ['plan', 'acceptEdits', 'manual'], 1)}</div></div>
      <div class="pe" data-from="3">${seg('Engine', 'pen', ['Claude Code', 'Codex'])}<p class="po" aria-live="polite"></p></div>
      <div class="sw" data-from="4"><p><b>Route</b> Kimi K2 → MiniMax</p><p class="bad">Refused: on Claude Code a route holds for the whole session.</p><p class="bt2"><button type="button" class="gh fk">Fork onto MiniMax</button><button type="button" class="gh nw">New session</button></p><p class="fo" aria-live="polite"></p></div>`;
    const mo = fv.querySelector('.mo'), lm = fv.querySelector('.lm');
    let t = 0;
    onSeg(fv.querySelector('.mdl'), async k => {
      const n = ['opus', 'sonnet', 'haiku'][k], my = ++t;
      if (!k) { mo.innerHTML = 'Running on opus.'; return; }
      mo.innerHTML = `<span class="t">⟳ pending: asked for ${n}</span>`;
      await sleep(900); if (my !== t) return;
      mo.innerHTML = `<span class="ok">✓ ${n} from the next turn.</span> Context and transcript as they were. The last turn still says <b>opus 5 · high</b>.`;
    })(0);
    const po = fv.querySelector('.po');
    onSeg(fv.querySelector('.pen'), k => {
      po.innerHTML = k ? '<b>Codex</b> runs one process per turn: these boxes are the next turn\'s flags, and a message typed now is <b>held</b> until the turn ends. <span class="hld">⏸ 1 held</span>'
        : '<b>Claude Code</b> is one long process: model, effort and permissions change on it live, and a message typed now steers the running turn.';
    })(0);
    const fo = fv.querySelector('.fo');
    fv.querySelector('.fk').addEventListener('click', () => { fo.innerHTML = 'A new session on MiniMax starts from this conversation; the Kimi one stays as it was.'; });
    fv.querySelector('.nw').addEventListener('click', () => { fo.innerHTML = 'A fresh session on MiniMax, same agent and folder, nothing carried over.'; });
    return { step(i) { lm.classList.toggle('hl', i === 1); } };
  },

  /* VII·8 eleven doors, the same boxes, saved setups, where it runs, the reopen */
  doors(fv) {
    const D = ['Console', 'sidebar tree', 'right-click', 'saved setup', 'launcher', 'terminal or Console', 'project tree', 'pages', 'command palette', 'bridge', 'Telegram'];
    const B = ['agent', 'engine', 'route', 'model', 'effort', 'permissions', 'account', '⚡'];
    fv.innerHTML = `
      <div class="hd"><b>Where a session starts</b><span>11 doors · demo</span></div>
      <div class="mx"><p class="mh"><span></span>${B.map(b => `<i>${b}</i>`).join('')}</p>${D.map((d, r) => `<p class="mr" data-r="${r}"><span>${d}</span>${B.map(() => '<b>✓</b>').join('')}</p>`).join('')}</div>
      <p class="dq" data-from="1"><button type="button" class="gh drop">Make Telegram forget the account</button><span class="dro" aria-live="polite"></span></p>
      <div class="pf" data-from="2"><p class="lb">Saved setups · one click</p><p class="sv"><b>deep review</b><span>opus · xhigh · plan</span><button type="button" class="gh run">Start</button></p><p class="sv"><b>night batch</b><span>sonnet · high · acceptEdits · account night</span></p><p class="pfo" aria-live="polite"></p></div>
      <div class="wh" data-from="3">${seg('Where', 'whr', ['Console', 'terminal', 'background'], 1)}<pre class="cmd"></pre></div>
      <p class="ro" data-from="4"><b>reopened</b> ${eng('Codex')} gpt-5-codex · high · acceptEdits <em>as it closed, on the engine it was had with</em></p>`;
    const dro = fv.querySelector('.dro'), drop = fv.querySelector('.drop');
    drop.addEventListener('click', () => {
      const tg = fv.querySelector('.mr[data-r="10"] b:nth-of-type(7)');
      const off = !tg.classList.contains('x'); tg.classList.toggle('x', off); tg.textContent = off ? '✗' : '✓';
      dro.innerHTML = off ? '<span class="bad">The build fails: Telegram does not carry account.</span>' : 'Every door carries all eight.';
      drop.textContent = off ? 'Put it back' : 'Make Telegram forget the account';
    });
    const pfo = fv.querySelector('.pfo');
    fv.querySelector('.run').addEventListener('click', () => { pfo.innerHTML = '<span class="ok">✓ Started: developer · opus · xhigh · plan.</span> No dialog in between.'; });
    const cmd = fv.querySelector('.cmd');
    onSeg(fv.querySelector('.whr'), k => {
      cmd.innerHTML = ['The composer opens on the setup. Nothing runs until you press Send.',
        'claude --model opus --effort xhigh --permission-mode plan -n "deep review"',
        'A task: headless, its output archived, metered like every run.'][k];
      cmd.classList.toggle('cl', k === 1);
    })(1);
    return { step(i) { fv.querySelector('.mx').classList.toggle('hl', i === 0 || i === 1); fv.querySelector('.mx').dataset.s = i; } };
  },

  /* VII·9 the sync: AGENTS.md, duties and MCP, the constitution, which side moved, a conflict */
  sync(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Sync Agent with the Other Engines…</b><span>developer · demo</span></div>
      <ul class="tree"><li class="d">agents/</li>
        <li class="d i1">developer/</li>
        <li class="i2"><code>CLAUDE.md</code><em>yours</em></li>
        <li class="i2 nw"><code>AGENTS.md</code><em>written · Codex and Antigravity read it</em></li>
        <li class="i2"><code>memory/</code><em>plain Markdown · read as it is</em></li>
        <li class="i2 nw" data-from="1"><code>.agents/workflows/morning-check.md</code><em>a duty · <code>/morning-check</code> in Antigravity</em></li>
        <li class="i2 nw" data-from="1"><code>.agents/mcp_config.suggested.json</code><em>for Gemini · you merge it</em></li>
        <li class="i2 nw" data-from="1"><code>.agents/codex/mcp.suggested.toml</code><em>for Codex · you merge it</em></li>
        <li class="i1" data-from="2"><code>CLAUDE.md</code><em>the nest's constitution</em></li>
        <li class="i1 nw" data-from="2"><code>AGENTS.md</code><em>⚖ mirrored once · every engine finds it on its way up</em></li></ul>
      <p class="ld" data-from="2">Antigravity will load: <code>developer/AGENTS.md</code> 6.1 KB · <code>agents/AGENTS.md</code> 3.4 KB · nothing twice · nothing past 24,000 bytes</p>
      <div class="dir" data-from="3">${seg('What changed', 'chg', ['CLAUDE.md', 'AGENTS.md', 'both'])}<p class="do" aria-live="polite"></p></div>`;
    const dO = fv.querySelector('.do');
    const chg = onSeg(fv.querySelector('.chg'), k => {
      dO.innerHTML = [
        'Insights: <b>developer\'s CLAUDE.md moved ahead.</b> Sync again to refresh AGENTS.md.',
        'An Antigravity session taught developer something. <button type="button" class="gh">Apply to CLAUDE.md</button> <em>with a backup</em>',
        '<span class="bad">Both sides changed.</span> <button type="button" class="gh">Diff</button> <button type="button" class="gh">Keep CLAUDE.md</button> <button type="button" class="gh">Keep AGENTS.md</button> <em>the other side is kept as <code>.afbak</code></em>',
      ][k];
    });
    chg(0);
    dO.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const t = b.textContent;
      dO.innerHTML = t === 'Diff' ? '<code>- Run the tests before every commit.</code> <code>+ Run the tests, and the linter, before every commit.</code>'
        : t.startsWith('Apply') ? '<span class="ok">✓ Carried into CLAUDE.md.</span> <em>The old one is kept as <code>CLAUDE.md.afbak</code>.</em>'
        : `<span class="ok">✓ Kept ${t.slice(5)}.</span> <em>The other side is saved as <code>.afbak</code>.</em>`;
    });
    return { step(i) { fv.querySelector('.dir').classList.toggle('cf', i === 4); if (i >= 3) chg(i === 4 ? 2 : 1); } };
  },

  /* VII·10 portable: saved as tokens, opened on this machine's folders, healed on load, settings with variables, refused */
  portable(fv) {
    const M = [['desktop · Windows', 'C:/Users/dev/.claude', 'C:/Users/dev'], ['laptop · macOS', '/Users/dev/.claude', '/Users/dev']];
    fv.innerHTML = `
      <div class="hd"><b>farm-tasks.json</b><span>in git · demo</span></div>
      <div class="sv"><p class="lb">Saved</p><pre>"transcript": "\${claudeDir}/projects/timeline/3efb20bf.jsonl",
"cwd":        "\${home}/agents/developer"</pre></div>
      <div class="ld" data-from="1"><p class="lb">Opened on</p>${seg('Machine', 'mch', M.map(m => m[0]))}<pre class="lo"></pre></div>
      <div class="hl2" data-from="2"><p class="lb">An older record, from another machine</p><pre><s>C:\\Users\\old\\.claude</s>\\projects\\x\\91ac.jsonl  →  <b>C:\\Users\\dev\\.claude</b>\\projects\\x\\91ac.jsonl
"prompt": "read C:\\Users\\old\\notes.md"   <em>a prompt: never touched</em></pre></div>
      <div class="st" data-from="3"><p class="lb">settings.json · the same on both</p><pre>"agentFarm.agentRoots":  ["\${env:USERPROFILE}/agents"],
"agentFarm.autoReportFolder": "~/vault/03_REPORTS"</pre></div>
      <p class="rf" data-from="4"><code>\${vault}/reports</code> <span class="bad">refused:</span> this machine has no vault set, and a path is never guessed.</p>`;
    const lo = fv.querySelector('.lo');
    onSeg(fv.querySelector('.mch'), k => {
      const [, cd, h] = M[k];
      lo.innerHTML = `"transcript": "<b>${cd}</b>/projects/timeline/3efb20bf.jsonl",\n"cwd":        "<b>${h}</b>/agents/developer"`;
    })(0);
  },
};
