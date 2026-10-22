// District II, Any project: one figure per feature, each a small rebuilt screen of the Projects page with demo data.
// Elements carry data-from (scripts/district.js shows them by step); step(i) moves the rest. The rules are the
// extension's own (data/deep/projects.js cites them): roles found by frontmatter, the backlog's line format and its one
// queue, the track's doubt codes and two files, the brief and its write side, the letter's kept block, the membership
// order, the turn-level model split and the Analysis tab's minimums. Projects, codes and notes are the site's demo data
// (data/backlog.js): Agent Farm itself (its real backlog), The last keeper, Thesis, Spring launch.
import { projects, tracks, family, parts, queue, project } from '../../data/backlog.js';

const $$ = (fv, s) => [...fv.querySelectorAll(s)];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* two or more buttons, one pressed */
const seg = (label, cls, opts, on = 0) =>
  `<div class="seg ${cls}" role="group" aria-label="${label}">${opts.map((o, k) => `<button type="button" aria-pressed="${k === on}"${k === on ? ' class="on"' : ''}>${o}</button>`).join('')}</div>`;
function onSeg(el, fn) {
  const bs = [...el.querySelectorAll('button')];
  const set = k => { bs.forEach((b, j) => { b.classList.toggle('on', j === k); b.setAttribute('aria-pressed', String(j === k)); }); fn(k); };
  bs.forEach((b, k) => b.addEventListener('click', () => set(k)));
  return set;
}

/* each demo project's ⚙ Settings tab: kind, folder, code roots, people with their roles, budgets, the tags its backlog uses */
const P = {
  farm: { kind: 'software', folder: '10_PROJECTS/Agent Farm', roots: 'D:/code/agent-farm', people: 'you, decides and pays · Mira, does the work · Sam, ask about the pipeline', budget: '$40 a day · $2,500 in all', tags: ['feat', 'bug', 'ux', 'test', 'perf', 'docs', 'debt', 'chore'] },
  keeper: { kind: 'documentary', folder: '10_PROJECTS/The last keeper', roots: '', people: 'you, decide · Ana, camera · the archive, ask about 1953', budget: '$15 a day · $400 in all', tags: ['shoot', 'script', 'edit', 'research'] },
  thesis: { kind: 'research', folder: '10_PROJECTS/Thesis', roots: '', people: 'you, do the work · Prof. Lind, decides', budget: '$5 a day', tags: ['research', 'write', 'figure', 'review', 'chore'] },
  spring: { kind: 'campaign', folder: '10_PROJECTS/Spring launch', roots: '', people: 'you, decide · the client, pays · legal, ask about the offer', budget: '$10 a day · $300 in all', tags: ['video', 'copy', 'design', 'research', 'review', 'chore'] },
};

export default {
  /* II·1 a project of any kind: what it holds, its folder, roles found by frontmatter, kinds as tags, parts and templates */
  kinds(fv) {
    fv.innerHTML = `
      <div class="hd"><b>◧ Projects · ⚙ Settings</b><span>four kinds, one page · demo</span></div>
      ${seg('Project', 'pick', projects.map(p => esc(p.name)))}
      <dl class="pf"></dl>
      <div class="tree" data-from="1"><p class="lb">Its folder, plain files</p><ul></ul></div>
      <div class="fm" data-from="2"><p class="lb">Renamed, moved, in another language</p>
        <pre>📄 notlar/00 Kapsam.md
---
af-role: charter
af-id: afprj-07
---</pre><p>Still the charter: the role is in the file, not in its name.</p></div>
      <div class="tags" data-from="3"><p class="lb">Kinds of work in its backlog</p><p class="tg"></p></div>
      <div class="pt" data-from="4"><p class="lb">Parts · Save as template</p>
        <ul class="parts"><li><b>The last keeper</b><em>active</em></li><li class="sub">↳ Episode 1: the keepers<em>done</em></li><li class="sub">↳ Episode 3: the 1953 storm<em>active</em></li></ul>
        <p class="tpl"><span class="y">☑ the folder layout</span><span class="y">☑ the people</span><span class="y">☑ the plan's open items</span><span>☐ the queued backlog</span><span class="no">never: its id, its folder, its parent or its status</span></p></div>`;
    const pf = fv.querySelector('.pf'), tree = fv.querySelector('.tree ul'), tg = fv.querySelector('.tg');
    onSeg(fv.querySelector('.pick'), k => {
      const p = projects[k], s = P[p.id];
      pf.innerHTML = [['Status', 'active'], ['Kind', s.kind], ['About', esc(p.desc)], ['Folder', `<code>${esc(s.folder)}</code>`],
        ['Code roots', s.roots ? `<code>${s.roots}</code>` : '<i>none: there is no code in it</i>'], ['People', esc(s.people)], ['Budget', s.budget]]
        .map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('');
      tree.innerHTML = ['00 Charter.md', '01 Plan.md', 'Backlog.md', 'Backloglog.md', 'People.md', 'Worklog.md', 'notes/', 'decisions/', 'deliverables/', 'resources/', '90_Archive/']
        .map(f => `<li${f.endsWith('/') ? ' class="d"' : ''}>${f}</li>`).join('') + (s.roots ? '<li class="x">its code stays in D:/code/agent-farm, outside the vault</li>' : '');
      tg.innerHTML = s.tags.map(t => `<code>#${t}</code>`).join(' ');
    })(0);
  },

  /* II·2 a thought in one line, the file it lands in, codes and the one queue, the top five, families and who wrote it */
  backlog(fv) {
    const Q = queue.slice(0, 6).map(q => ({ ...q }));
    fv.innerHTML = `
      <div class="hd"><b>Backlog · ${project.name}</b><span>Backlog.md · demo</span></div>
      <div class="cap"><span class="box">every episode also as a 9:16 short, by default</span><button type="button" class="add">Add</button><small>Ctrl+Alt+B, from anywhere in VS Code</small></div>
      <ul class="inbox" aria-live="polite"></ul>
      <pre class="file" data-from="1"><span class="h">## 🎯 Queue</span>
<span class="ql"></span>
<span class="h">## M · Media and the video pipeline</span>
- [/] M-101 C-1 sound and compose #feat 🔼 [effort:: L] [parent:: M-64]
- [ ] M-133 no arnndn in this ffmpeg build; use afftdn #bug #byAI [effort:: S]
- [ ] M-108 C-8 script actor, runs on your yes #feat [effort:: L] ⛔ M-107
<span class="h">## K · Quota</span>
- [ ] K-7 settings search finds nothing for "quota" #bug #byREQ ⏫ [effort:: S]</pre>
      <ol class="q" data-from="2"></ol>
      <p class="t5" data-from="3">"Do the top five" takes the first five that can start. <b>M-108</b> waits on M-107, so it is held back and named.</p>
      <div class="fam" data-from="4"><p><code>${family.c}</code> ${esc(family.t)} <em>${family.s} · the whole</em></p><p class="pp">${parts.slice(-4).map(p => `<span><code>${p.c}</code> [parent:: ${family.c}]</span>`).join('')}</p>
        <p class="who"><code>#byAI</code> an agent noticed it and filed it itself: a proposal. <code>#byREQ</code> you asked an agent for it. Neither: you wrote it.</p></div>`;
    const add = fv.querySelector('.add'), inbox = fv.querySelector('.inbox'), qEl = fv.querySelector('.q'), ql = fv.querySelector('.ql');
    add.addEventListener('click', () => {
      if (add.disabled) return; add.disabled = true;
      inbox.innerHTML = '<li><span>📥</span><span class="t">every episode also as a 9:16 short, by default</span><em>inbox · filed later</em></li>';
      fv.querySelector('.box').textContent = '';
    });
    let shown = 0;
    const draw = () => {
      let can = 0;
      ql.textContent = Q.map((q, k) => `${k + 1}. ${q.c}`).join('  ');
      qEl.innerHTML = Q.map((q, i) => {
        const held = !!q.wait, top = shown >= 3 && !held && can < 5 && ++can;
        return `<li class="${top ? 'top' : ''}${held && shown >= 3 ? ' held' : ''}"><span class="n">${i + 1}</span><code>${q.c}</code><span class="t">${esc(q.t)}</span>${q.by ? `<em class="by">#by${q.by}</em>` : ''}${q.wait ? `<em class="wt">⛔ ${q.wait}</em>` : ''}`
          + `<span class="mv"><button type="button" data-i="${i}" data-d="-1" aria-label="Move ${q.c} up"${i === 0 ? ' disabled' : ''}>▲</button><button type="button" data-i="${i}" data-d="1" aria-label="Move ${q.c} down"${i === Q.length - 1 ? ' disabled' : ''}>▼</button></span></li>`;
      }).join('');
      $$(fv, '.q button').forEach(b => b.addEventListener('click', () => {
        const i = +b.dataset.i, j = i + +b.dataset.d; [Q[i], Q[j]] = [Q[j], Q[i]]; draw();
      }));
    };
    draw();
    return { step(i) { shown = i; draw(); } };
  },

  /* II·3 the track: touches with notes, inferred sessions and their doubt codes, the two files, the four views */
  track(fv) {
    const T = tracks.farm, U = T.items[0], K8 = T.items[2];
    const ev = e => `<li><span class="w">${e[0]}</span><code>${e[1]}</code><span class="tn">#${e[2]}</span><span class="a">${e[3]}</span><em class="${e[4]}">${e[4]}</em><q>${esc(e[5])}</q></li>`;
    const V = [
      ['⬢ Items', '<b>X-499</b> · 2 sessions · 22 turns · estimated M · the median for M in this project is 4 turns'],
      ['≡ Timeline', 'Oct 21 14:02 K-8 opened · Oct 21 11:48 M-100 done · Oct 20 06:30 M-93 done · …'],
      ['⌸ Sessions', '<code>85340699</code> touched M-100 and closed it · 3 of its turns went on the backlog'],
      ['⚕ Gaps', '112 of 1,305 codes have no history · 3 attributions are a best effort, 2 multi and 1 stale · no closure without a session'],
    ];
    fv.innerHTML = `
      <div class="hd"><b>Track · ${project.name}</b><span>Projects → Track · demo</span></div>
      <p class="st">${T.stats.map(([n, l]) => `<span><b>${n}</b> ${l}</span>`).join('')}</p>
      <div class="it first"><p class="ih"><code>${U.c}</code><span>${esc(U.t)}</span><em>open · #${U.k} · ${U.s}</em></p><ol class="ev">${U.ev.map(ev).join('')}</ol>
        <p class="nxt" data-from="1">${esc(U.next)}</p></div>
      <div class="it" data-from="2"><p class="ih"><code>${K8.c}</code><span>${esc(K8.t)}</span><em>open · #byAI</em></p><ol class="ev">${K8.ev.map(ev).join('')}</ol>
        <p class="dbt"><b>multi</b> two of developer's sessions were live, so the row says which it named and that it may be the other.</p>
        <p class="dbt"><b>outside</b> M-83 was ticked in Obsidian. Recorded when it was noticed; no turn is made up for it.</p></div>
      <div class="lg" data-from="3"><pre class="md"><span class="h">Backloglog.md</span>
- <b>M-100</b> [status:: done] [sessions:: 3] [turns:: 3] [closed:: 85340699#3]
    - \`8d4d0799\` #1 · 2026-10-21 03:03 · developer · opened
    - \`6edefcb6\` #1 · 2026-10-21 06:14 · developer · touched
    - \`85340699\` #3 · 2026-10-21 11:48 · developer · <b>done</b>
    <span class="mine">&gt; The nine parts stay in this order: the cut list
    &gt; needs the fragment contract first. Keep it.</span></pre>
        <p class="cpt"><span class="mc">machine</span> the data line and the session rows, rebuilt from the ledger <span class="yc">you</span> every other line, kept as written</p></div>
      <div class="vw" data-from="4">${seg('Track view', 'views', V.map(v => v[0]))}<p class="vo"></p></div>`;
    const vo = fv.querySelector('.vo');
    onSeg(fv.querySelector('.views'), k => { vo.innerHTML = V[k][1]; })(0);
    const notes = $$(fv, '.it.first q');
    return { step(i) { notes.forEach(q => q.classList.toggle('hi', i === 1)); } };
  },

  /* II·4 the brief a session is handed before its first message, how it travels, where it shows, and what comes back */
  context(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Console · developer</b><span>${project.name} · demo</span></div>
      <p class="chip" data-from="3">◧ ${project.name} — project context active</p>
      <pre class="br"><span class="h"># ${project.name}</span>
Status: active · ${esc(projects[0].desc)}
Folder: 10_PROJECTS/Agent Farm · Code: D:/code/agent-farm
People: you (decides, pays) · Mira (does the work) · Sam (ask about the pipeline)
Roles: charter 00 Charter.md · plan 01 Plan.md · worklog Worklog.md
Worklog: Oct 21 · M-100 closed: nine editing actors, the cut-list core<span class="o" data-from="1">
<span class="h">## Open in the plan</span>
- [ ] Phase C: the editing actors   - [ ] Phase D: packages, experiments
<span class="h">## Latest decisions</span>
- Oct 20 · Publishing always waits for a person's yes
<span class="h">## Next in backlog</span>
${queue.slice(0, 5).map(q => q.c).join(' · ')}
<span class="h">## Writing back</span>
worklog: Worklog.md · plan: 01 Plan.md · do not reformat either</span></pre>
      <div class="how" data-from="2">${seg('Engine', 'chan', ['Claude Code', 'Codex'])}<pre class="cmd"></pre><p class="tk"><b>538</b> tokens for a full brief, measured. The same bytes on every start, so the provider's cache keeps them.</p></div>
      <p class="msg c" data-from="3"><b>A resume</b> of 3f2a1b2c is told about its own project, whatever the window says. A schedule firing at 03:00 gets no project unless the schedule names one.</p>
      <ul class="wb" data-from="4"><li><code>projects.log</code><span>M-100: nine editing actors are in</span></li><li><code>projects.plan.check</code><span>Phase B: the map and the route finder</span></li><li><code>projects.decision.add</code><span>Publishing always waits for a person's yes</span></li><li><code>projects.deliver</code><span>the video pipeline, Phase B</span></li></ul>`;
    const cmd = fv.querySelector('.cmd');
    onSeg(fv.querySelector('.chan'), k => {
      cmd.textContent = k ? 'codex exec "<project-context>\n# Agent Farm … the brief …\n</project-context>\n\nDo the top three."\n# Codex has no system prompt flag, so the brief rides in the first prompt'
        : 'claude --append-system-prompt-file "<the brief>"\n# a file, and quoted: a folder named "John Doe" arrives whole\n# passed again on every start: it does not survive --resume';
    })(0);
  },

  /* II·5 the cold-start letter, section by section, and the block of yours that a rewrite keeps */
  letter(fv) {
    fv.innerHTML = `
      <div class="hd"><b>HANDOVER.md</b><span>${project.name} · demo</span></div>
      <div class="doc">
        <section><h4>What it is</h4><p>${esc(projects[0].desc)}</p>
          <h4>Where things are</h4><p>Documents <code>10_PROJECTS/Agent Farm</code> · code <code>D:/code/agent-farm</code> · site <code>D:/code/agentfarm-site</code> <mark>not on this machine</mark></p>
          <h4>Who to ask</h4><p>you, who decides · Mira, who does the work · Sam, about the pipeline</p></section>
        <section data-from="1"><h4>Where it stands</h4><p>${project.open} open, ${project.done} done. <b>Blocked:</b> M-108, the script actor, waits on M-107.</p></section>
        <section data-from="2"><h4>Already fought, still open</h4><p><code>X-499</code> splitting the biggest files: “split by feature, not by size” (reviewer, Sep 12).</p>
          <h4>Why it is this way</h4><p>Oct 20 · Publishing always waits for a person's yes.</p><h4>Shipped</h4><p>Phase B of the video pipeline: the map and the route finder.</p></section>
        <section data-from="3"><h4>First five minutes</h4><ol><li>Read the charter: two pages.</li><li>Open <code>X-499</code> and read both notes.</li><li>Run the full suite: 885 files.</li><li>Check where <code>M-101</code> got to.</li><li>Take the top of the queue.</li></ol></section>
        <section class="mine" data-from="4"><h4>Yours</h4><p>Sam reviews anything that touches the render. Never ship on a Friday.</p></section>
      </div>
      <p class="rw" data-from="4"><button type="button" class="ghost2">Write it again</button><span aria-live="polite"></span></p>`;
    const b = fv.querySelector('.rw button'), say = fv.querySelector('.rw span'), mine = fv.querySelector('.mine');
    b.addEventListener('click', () => {
      say.innerHTML = 'Rewritten from the project as it is now. <b>Your block is kept word for word.</b>';
      mine.classList.remove('flash'); void mine.offsetWidth; mine.classList.add('flash');
    });
  },

  /* II·6 every project on one screen; parts beside, not inside; health; the weekly digest; the work by how much it needs you */
  portfolio(fv) {
    const R = [
      { n: 'Agent Farm', ph: 62, open: 73, last: '2 min ago', usd: '$1,284.60' },
      { n: 'The last keeper', ph: 40, open: 17, last: '1 h ago', usd: '$11.60', parts: [['Episode 1: the keepers', 'done', '$52.30', 0], ['Episode 3: the 1953 storm', 'active', '$31.85', 6]] },
      { n: 'Thesis', ph: 55, open: 12, last: '16 days ago', usd: '$63.20', stale: 1 },
      { n: 'Spring launch', ph: 80, open: 9, last: '3 h ago', usd: '$212.70', over: '$10.40 today' },
    ];
    fv.innerHTML = `
      <div class="hd"><b>◧ Projects</b><span>${R.length} active · demo</span></div>
      <table class="pt"><thead><tr><th>Project</th><th>Plan</th><th>Open</th><th>Last worked</th></tr></thead><tbody>
        ${R.map(r => `<tr class="${r.stale ? 'stale' : ''}${r.over ? ' over' : ''}"><td><b>${r.n}</b><small>${r.usd} total${r.over ? ` · <span class="ov">${r.over}</span>` : ''}${r.parts ? ` <span class="pts" data-from="1">· +$84.15 in 2 parts</span>` : ''}</small></td><td><div class="bar"><i style="width:${r.ph}%"></i></div><small>${r.ph}%</small></td><td>${r.open}</td><td>${r.last}</td></tr>`
          + (r.parts || []).map(p => `<tr class="part" data-from="1"><td colspan="4">↳ ${p[0]} · ${p[1]} · ${p[2]}${p[3] ? ` · ${p[3]} open` : ''}</td></tr>`).join('')).join('')}
      </tbody></table>
      <ul class="hl" data-from="2"><li class="w"><b>⚠ Thesis</b> is active, and nothing has touched it for 16 days</li><li class="x"><b>⛔ Spring launch</b> is over its $10 daily budget</li><li class="d"><b>Living · Projects</b> Thesis quiet for 16 days · Spring launch over budget</li></ul>
      <p class="msg c" data-from="3"><b>Notices · Monday · Agent Farm's week</b> 14 items closed, 3 opened, 41 sessions, $212.40. The full report is attached.</p>
      <div class="wk" data-from="4"><p class="lb">Agent Farm · Work</p>${[['Running now', 'leg 92 of the chain, on M-101'], ['Needs you', 'a question: which de-hum filter ships?'], ['Queued', 'X-499 · "waits for Phase C"'], ['Fires by itself', 'nightly-digest, 03:00, with a brake']].map(([g, t]) => `<p><b>${g}</b><span>${t}</span></p>`).join('')}</div>`;
  },

  /* II·7 cost: one project per session, the bill, by model with mixed turns, how it is worked, code two ways */
  cost(fv) {
    const days = [22, 31, 18, 40, 36, 12, 8, 29, 44, 38, 41, 27, 9, 6, 33, 39, 26, 30, 35, 11, 7, 28, 37, 37, 31, 40, 14, 9, 56.2, 36.8];
    const top = Math.max(...days);
    const M = [['opus', 612, '#de8cf0'], ['sonnet', 498, '#71e3ed'], ['haiku', 41, '#e4e07f'], ['mixed turns', 96, '#8f8f84'], ['unattributed', 37.6, '#5f6056']];
    const tot = M.reduce((s, m) => s + m[1], 0);
    // the rhythm: weekday evenings carry most turns, weekends a little
    const H = Array.from({ length: 7 }, (_, d) => Array.from({ length: 24 }, (_, h) =>
      d < 5 ? (h >= 20 ? 4 : h >= 9 ? (h === 13 ? 1 : 2) : h < 2 ? 1 : 0) : (h >= 20 ? 2 : h >= 11 ? 1 : 0)));
    fv.innerHTML = `
      <div class="hd"><b>${project.name} · Cost</b><span>the project page · demo</span></div>
      <ol class="mb"><li>you filed it</li><li>you said "no project"</li><li class="hit">the deepest folder that holds it</li><li>its agent's rule</li><li>Unassigned</li></ol>
      <p class="sg"><code>a3f9c2e1</code> → <b>Agent Farm</b>: it ran in <code>D:/code/agent-farm/src/core/pipeline</code>. For a loose old one, a proposal: <code>e09b44d7</code> wrote 11 of its 11 files under <code>D:/code/agent-farm</code>. <button type="button" class="ghost2 ap">Approve</button></p>
      <div class="kp" data-from="1"><p><b>$1,284.60</b><span>total</span></p><p><b>$36.80</b><span>today</span></p><p><b>$32 a day</b><span>last 7 days</span></p><p><b>~$2,885</b><span>by Dec 1</span></p><p><b>38 days</b><span>of budget left</span></p></div>
      <div class="days" data-from="1" aria-hidden="true">${days.map(v => `<i style="height:${(v / top * 100).toFixed(1)}%"></i>`).join('')}</div>
      <div class="bm" data-from="2"><div class="stk">${M.map(m => `<i style="width:${(m[1] / tot * 100).toFixed(2)}%;background:${m[2]}"></i>`).join('')}</div>
        <p class="lg2">${M.map(m => `<span><i style="background:${m[2]}"></i>${m[0]} $${m[1].toFixed(2)}</span>`).join('')}</p><small>A turn two models served is mixed, not split by a guess. Sessions with no turn detail are unattributed. The five add up to the total.</small></div>
      <div class="an" data-from="3">${seg('Which project', 'which', [project.name, 'a new project'])}<div class="rh"></div><p class="ao"></p></div>
      <div class="cd" data-from="4"><p><b>120</b> commits in D:/code/agent-farm<span>what git recorded, whoever typed it</span></p><p><b>341</b> files written by its sessions<span>from the transcripts, files outside the repo included</span></p><small>Two sources, side by side, never added together.</small></div>`;
    const ap = fv.querySelector('.ap');
    ap.addEventListener('click', () => { ap.disabled = true; ap.textContent = 'Filed under Agent Farm'; });
    const rh = fv.querySelector('.rh'), ao = fv.querySelector('.ao');
    onSeg(fv.querySelector('.which'), k => {
      rh.classList.toggle('none', !!k);
      rh.innerHTML = k ? '' : H.map((r, d) => `<span>${'MTWTFSS'[d]}</span>` + r.map(v => `<i class="v${v}"></i>`).join('')).join('');
      ao.innerHTML = k ? 'Not enough turns yet, <b>23 so far</b>. The rhythm needs 40 turns, cycle time 5 closed items, the pace 2 weeks.'
        : 'Most turns land on weekday evenings. From first touch to close: S <b>1 day</b>, M <b>3 days</b>, L <b>6 days</b>. This week runs at <b>1.4×</b> its own average.';
    })(0);
  },
};
