// District III, Beyond code: one figure per feature, each a small rebuilt screen with demo data. Elements carry
// data-from (scripts/district.js shows them by step); step(i) moves the rest. The rules are the extension's own
// (data/deep/studio.js cites them): the Studio's five tabs and a scene's next step read from evidence, a card's doors,
// production.json, the studio.* bridge ops; recipes that name roles, the showrunner and a pick for one run; a media
// step's model id choosing its provider, its template, a long job polled, a local file uploaded after a yes, priced by
// your rules; the ten FFmpeg recipes as argument lists, presets, the result on the board, filed as it goes; the vision
// judge, a FAIL made again, an edit judged beside its source, several takes and the first PASS, Triage; the brand kit
// read by every step, a step's own field, the placeholder left visible, presets; the five stages, the record, the model
// that fills the meaning, your edits kept, a promotion; the Airtable engine's page, its tools, an update refused, Start,
// a run's library input; the all_in waiting area and watched folders; Assemble, the XML and EDL, a file named by its
// scene coming back, a render folder watched; the calendar note, the publish step, its approval, overdue publishes; the
// metrics step and {performance}; the daily digest read aloud. Productions, files, agents, models, prices, times and
// figures are demo data. Today is Mon Oct 12.

const $$ = (fv, s) => [...fv.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
const ENG = { Claude: '', Antigravity: 'a' };
const eng = e => `<span class="eng ${ENG[e]}">${e}</span>`;
/* a frame of the demo film: night sea, the lighthouse, with or without its beam */
const pic = (k = 'b', t = '') => `<span class="pic ${k}" aria-hidden="true">${t ? `<i>${t}</i>` : ''}</span>`;

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
  /* III·1 the Studio: five tabs, a scene's next step from evidence, a card's doors, production.json, the bridge ops */
  studio(fv) {
    const TABS = [
      ['Pipeline', 'Where is each scene, and what is its next step?'],
      ['Assets', 'What was made or brought in, by whom, with what, for how much?'],
      ['Triage', 'What has nobody judged yet? Keep it or drop it.'],
      ['Assemble', 'Exactly which clips will the export hold, in what order?'],
      ['Sources', 'Which providers have a key, which folders are watched, what has it cost?'],
    ];
    const ROWS = [
      ['S1', 'The rock', 'nothing made yet', '＋ Generate', 'Nothing exists for this scene, so the only next step is to make something.'],
      ['S2', 'The storm', '2 takes nobody judged', '👁 Triage', 'Two takes exist and nobody has judged them: Triage comes before anything else.'],
      ['S3', 'The lantern', '1 kept · not approved', 'Set status', 'A take is kept but the scene is not approved yet: set its status when you are happy.'],
      ['S4', 'Dawn', 'approved', '🎬 In sequence', 'Approved: its kept take is already in the sequence Assemble will export.'],
    ];
    const DOORS = {
      'Re-run': 'Re-run: the same model and the same input again, straight away. The new take is filed beside this one.',
      'Vary…': 'Vary…: the input opens for you to rewrite, then it runs with your version.',
      'Feedback…': 'Feedback…: "the beam should sweep left to right, slower" is folded into the original prompt and the take is made again, filed where the first was.',
      'Scene…': 'Scene…: file this take under another scene, or take it off the scene it is on.',
    };
    fv.innerHTML = `
      <div class="hd"><b>🎬 Studio</b><span>The last keeper · 6 scenes · demo</span></div>
      ${seg('Studio tabs', 'tbs', TABS.map(t => t[0]))}<p class="tq" aria-live="polite"></p>
      <div class="pl" data-from="1">${ROWS.map(([id, t, ev, nx], k) => `<p class="sr"><span class="sid">${id}</span><b>${t}</b><em>${ev}</em><button type="button" class="gh nxt" data-k="${k}">${nx}</button></p>`).join('')}<p class="wy" aria-live="polite">Each button is read from what exists for the scene.</p></div>
      <div class="cdo" data-from="2">${pic('b')}<div><p class="ct"><b>S2 · The storm · take 8</b><span>fal-ai/kling-video · 22:41 · ~$0.50</span></p><div class="dor">${Object.keys(DOORS).map(d => `<button type="button" class="gh">${d}</button>`).join('')}</div><p class="dz" aria-live="polite"></p></div></div>
      <div class="pj" data-from="3"><p class="lb">production.json · in the agent's folder</p><pre>{ "title": "The last keeper",
  "scenes": [
    { "id": "S1", "title": "The rock",    "status": "draft" },
    { "id": "S2", "title": "The storm",   "status": "review" },
    { "id": "S3", "title": "The lantern", "status": "review" },
    { "id": "S4", "title": "Dawn",        "status": "approved" } ] }</pre></div>
      <pre class="op" data-from="4"><b>$ node af.js studio.assets production=the-last-keeper state=undecided</b>
<em>2 assets · S2 The storm · take-7.mp4 (Vision QA FAIL) · take-8.mp4 (PASS)</em>
<b>$ node af.js studio.triage keep=take-8.mp4 drop=take-7.mp4</b>
<em>S2: 1 kept · 1 dropped · next step: Set status</em></pre>`;
    const tq = fv.querySelector('.tq'), wy = fv.querySelector('.wy'), dz = fv.querySelector('.dz');
    const tab = onSeg(fv.querySelector('.tbs'), k => { tq.innerHTML = `<b>${TABS[k][0]}</b> · ${TABS[k][1]}`; });
    tab(0);
    for (const b of $$(fv, '.nxt')) b.addEventListener('click', () => { $$(fv, '.sr').forEach((r, k) => r.classList.toggle('hl', k === +b.dataset.k)); wy.textContent = ROWS[+b.dataset.k][4]; });
    for (const b of $$(fv, '.dor button')) b.addEventListener('click', () => { dz.textContent = DOORS[b.textContent]; });
    dz.textContent = 'Every file made here keeps four doors. Press one.';
    return { step(i) { tab(i === 2 ? 1 : 0); } };
  },

  /* III·2 content recipes: one pick, three chains, roles, the showrunner, a pick for this run */
  crecipes(fv) {
    const R = [
      ['Video edited in parts', [['split', 'tool · ffmpeg'], ['prompt-engineer', 'role'], ['edit each part', 'media · Omni Flash'], ['judge', 'vision · each part'], ['join + sound', 'tool · ffmpeg']]],
      ['Long to shorts', [['extract the sound', 'tool · ffmpeg'], ['transcript', 'media · Whisper'], ['editor', 'role · picks the moments'], ['cut each short', 'tool · one pass each'], ['final check', 'checkpoint']]],
      ['Weekly channel rhythm', [['idea', 'role · from the calendar'], ['scriptwriter', 'role'], ['shots', 'media · rendered, joined'], ['your approval', 'checkpoint'], ['publisher', 'role · package, no upload']]],
    ];
    const BOUND = { scriptwriter: 'writer', editor: 'cutter' };
    fv.innerHTML = `
      <div class="hd"><b>New Recipe Workflow</b><span>one pick, a whole workflow · demo</span></div>
      <ul class="rbk">${R.map(([n]) => `<li><b>${n}</b><span>content</span></li>`).join('')}<li><b>Text → Image</b><span>quick</span></li><li><b>Text → Image → Video</b><span>quick</span></li><li><b>Audio → Text (Whisper)</b><span>quick</span></li></ul>
      <div class="chn" data-from="1">${seg('Recipe', 'rcp2', R.map(r => r[0]), 2)}<ol class="cst"></ol></div>
      <div class="rls" data-from="2"><p class="lb">Roles · this workflow</p><div class="rlb"></div></div>
      <p class="msg p" data-from="3"><b>Run stopped.</b> Role editor is bound to cutter, and there is no agent called cutter any more.</p>
      <div class="rw1" data-from="4"><p class="lb">Run with… · publisher, this run only</p>${seg('Publisher for this run', 'pub', ['youtuber · the showrunner', 'social'])}<p class="ro" aria-live="polite"></p></div>`;
    const cst = fv.querySelector('.cst'), rlb = fv.querySelector('.rlb'), ro = fv.querySelector('.ro');
    let cur = 2;
    const draw = () => {
      const steps = R[cur][1];
      cst.innerHTML = steps.map(([n, k]) => `<li class="${k.startsWith('role') ? 'role' : ''}"><b>${n}</b><span>${k}</span></li>`).join('');
      const roles = steps.filter(s => s[1].startsWith('role')).map(s => s[0]);
      rlb.innerHTML = roles.map(r => `<p class="rr"><code>${r}</code><b>${BOUND[r] || 'youtuber'}</b><em>${BOUND[r] ? 'bound in the Roles box' : 'left open: the showrunner takes it'}</em></p>`).join('');
      fv.querySelector('.rw1').hidden = !roles.includes('publisher');
    };
    onSeg(fv.querySelector('.rcp2'), k => { cur = k; draw(); });
    draw();
    const pub = onSeg(fv.querySelector('.pub'), k => { ro.innerHTML = k ? 'This run gets <b>social</b>. The workflow still leaves publisher to the showrunner next time.' : 'The run gets <b>youtuber</b>, because the workflow leaves the role open.'; });
    pub(0);
    return { step(i) { $$(fv, '.rls .rr').forEach(r => r.classList.toggle('hl', i === 3 && r.querySelector('b').textContent === 'youtuber')); } };
  },

  /* III·3 a media step: the model id picks the provider, a template fed by the last step, a long job, a local file, the cost */
  media(fv) {
    const M = [
      ['fal-ai/flux/schnell', 'fal.ai', 'FAL_KEY', true, '$0.003 an image'],
      ['fal-ai/kling-video/v2/master/text-to-video', 'fal.ai', 'FAL_KEY', true, '$0.10 a second'],
      ['replicate:black-forest-labs/flux-schnell', 'Replicate · latest version', 'REPLICATE_API_TOKEN', false, '$0.003 an image'],
    ];
    fv.innerHTML = `
      <div class="hd"><b>Media step</b><span>S2 · The storm · demo</span></div>
      <p class="lb">Model</p>${seg('Model', 'mdl', ['flux/schnell', 'kling-video', 'replicate: flux'], 1)}<p class="pvd" aria-live="polite"></p>
      <div data-from="1"><p class="lb">Input · a JSON template</p><pre>{ "prompt": "<b>{prev_text}</b>", "duration": "5", "aspect_ratio": "16:9" }
<em>→ "prompt": "the keeper climbs the stairs at night, rain on the glass, the beam sweeping, night blues"</em></pre></div>
      <div class="job" data-from="2"><p class="lb">The job</p><p class="jl" aria-live="polite">waiting to start</p></div>
      <div class="upl" data-from="3"><p class="uq">Upload <code>harbour-at-night.jpg</code> from this computer to fal.ai for this step?</p><button type="button" class="gh ya">Allow</button><button type="button" class="gh na">Not now</button><p class="ua" aria-live="polite">Also waiting in Needs You.</p></div>
      <div class="cst2" data-from="4"><p class="lb">Your price rules · media, last 30 days</p><p class="rk" aria-live="polite"></p><div class="bar"><i></i></div><p class="bm"><b>$36.40</b> of a <b>$40</b> monthly media budget · warns once when passed</p></div>`;
    const pvd = fv.querySelector('.pvd'), rk = fv.querySelector('.rk'), jl = fv.querySelector('.jl'), ua = fv.querySelector('.ua');
    onSeg(fv.querySelector('.mdl'), k => {
      const [id, p, key, has, price] = M[k];
      pvd.innerHTML = `<code>${id}</code> goes to <b>${p}</b> · key <code>${key}</code> ${has ? '<span class="ok">in the vault ✓</span>' : '<span class="bad">not in the vault: the step will not run, and says which key it needs</span>'}`;
      rk.innerHTML = `<code>${id.replace('replicate:', '')}</code> · ${price}`;
    })(1);
    let up = 0;
    fv.querySelector('.ya').addEventListener('click', () => { up++; ua.innerHTML = up === 1 ? '<span class="ok">Uploaded once</span> · the model gets an https link · the same file reuses it until it expires.' : '<span class="ok">Same file, same link</span> · nothing uploaded again.'; });
    fv.querySelector('.na').addEventListener('click', () => { ua.textContent = 'Not uploaded. The step waits, and the question stays in Needs You.'; });
    let tok = 0, ran = false;
    async function run() {
      ran = true;
      const t = ++tok;
      for (const [s, l] of [['IN_QUEUE', '0:04'], ['IN_PROGRESS', '1:12'], ['IN_PROGRESS', '2:20'], ['done', '2:41']]) {
        if (t !== tok) return;
        jl.innerHTML = s === 'done' ? `<span class="ok">done · ${l}</span> · take-9.mp4 downloaded, kept, and its answer handed to the next step` : `<span class="t">${s}</span> · ${l} · the step stays running and asks again`;
        await sleep(900);
      }
    }
    return { step(i) { if (i === 2 || (i > 2 && !ran)) run(); fv.querySelector('.cst2 .bar i').style.width = i >= 4 ? '91%' : '0'; } };
  },

  /* III·4 the tool step: ten recipes as argument lists, presets, the result on the board, filed as it goes */
  cuts(fv) {
    const R = [
      ['split', 'cut into parts of a fixed length', 'segmentSec, overlapSec', ['-i', 'keeper.mp4', '-f', 'segment', '-segment_time', '10', '-reset_timestamps', '1', '-c:v', 'libx264', 'part-%02d.mp4']],
      ['concat', 'join files end to end, as they are', 'files, name', ['-f', 'concat', '-safe', '0', '-i', 'parts.txt', '-c', 'copy', 'joined.mp4']],
      ['extractAudio', 'the sound track on its own', 'format', ['-i', 'keeper.mp4', '-vn', 'keeper.wav']],
      ['muxAudio', 'lay a sound under the picture', 'audio, offsetSec', ['-i', 'joined.mp4', '-itsoffset', '0', '-i', 'keeper.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'copy', 'final.mp4']],
      ['reframe', 'change the aspect: crop or bars', 'aspect, mode, height', ['-i', 'keeper.mp4', '-vf', 'crop=ih*9/16:ih,scale=-2:1920', 'vertical.mp4']],
      ['burnSubtitles', 'draw an .srt onto the picture', 'subtitles', ['-i', 'keeper.mp4', '-vf', 'subtitles=keeper.srt', 'subbed.mp4']],
      ['short', 'cut, reframe and subtitle, one pass', 'start, end, aspect, mode, height, srt', ['-ss', '72', '-to', '101', '-i', 'talk.mp4', '-vf', 'crop=ih*9/16:ih,scale=-2:1920,subtitles=m3.srt', 'short-3.mp4']],
      ['keyframes', 'stills, evenly or at scene changes', 'mode, count, threshold', ['-i', 'keeper.mp4', '-vf', 'select=gt(scene\\,0.4)', '-vsync', 'vfr', 'still-%03d.jpg']],
      ['loudnorm', 'broadcast loudness, picture copied', 'lufs, truePeak', ['-i', 'final.mp4', '-af', 'loudnorm=I=-16:TP=-1.5', '-c:v', 'copy', 'web.mp4']],
      ['transcode', 're-encode to a codec and quality', 'codec, crf, preset, audioKbps', ['-i', 'final.mov', '-c:v', 'libx264', '-crf', '20', '-preset', 'slow', '-b:a', '192k', 'final.mp4']],
    ];
    const P = [['Omni Flash parts', 'split · segmentSec 10'], ['Vertical short (9:16)', 'reframe · aspect 9:16 · mode crop'], ['Web loudness', 'loudnorm · lufs −16']];
    fv.innerHTML = `
      <div class="hd"><b>Tool step · ffmpeg</b><span>no agent · no model · no token · demo</span></div>
      <div class="rch">${R.map(([n], k) => `<button type="button" class="${k === 6 ? 'on' : ''}" aria-pressed="${k === 6}">${n}</button>`).join('')}</div>
      <p class="rd" aria-live="polite"></p>
      <div data-from="1"><p class="lb">What runs · an argument list, never a shell line</p><pre class="av"></pre></div>
      <div data-from="2"><p class="lb">Presets fill what the step leaves out</p>${seg('Preset', 'pst', P.map(p => p[0]))}<p class="po" aria-live="polite"></p></div>
      <div data-from="3"><p class="lb">On the run's board · {steps.cut.json}</p><pre>{ "ok": true, "recipe": "split", "runs": 1, "ms": 8410,
  "outputs": ["part-01.mp4", "part-02.mp4", "part-03.mp4", "part-04.mp4"] }
<em>→ a for-each step walks {steps.cut.json.outputs}</em></pre></div>
      <p class="fl" data-from="4"><b>4 files</b> filed in <code>media_studio\\video\\semi</code>, each with its record · tokens <b>0</b> · cost <b>$0.00</b></p>`;
    const rd = fv.querySelector('.rd'), av = fv.querySelector('.av'), bs = $$(fv, '.rch button');
    const pick = k => {
      bs.forEach((b, j) => { b.classList.toggle('on', j === k); b.setAttribute('aria-pressed', String(j === k)); });
      const [n, w, p, a] = R[k];
      rd.innerHTML = `<b>${n}</b> · ${w} · <em>${p}</em>`;
      av.innerHTML = `[${['"ffmpeg"', ...a.map(x => `"${x}"`)].join(', ')}]\n<em>A file called "a.mp4; del *" is only ever a name here.</em>`;
    };
    bs.forEach((b, k) => b.addEventListener('click', () => pick(k)));
    pick(6);
    const po = fv.querySelector('.po');
    onSeg(fv.querySelector('.pst'), k => { po.innerHTML = `<code>${P[k][1]}</code> · the step's own values still win`; })(0);
  },

  /* III·5 the vision judge: criteria, a FAIL made again, an edit beside its source, several takes, Triage */
  judge(fv) {
    fv.innerHTML = `
      <div class="hd"><b>Vision check</b><span>S2 · The storm · demo</span></div>
      <p class="cri"><span class="lb">criteria</span>The lighthouse beam is visible, sweeping through rain.</p>
      <div class="tk2" data-from="1"><div>${pic('nb', 'take 1')}<p><span class="bad">✗ FAIL</span> no beam in frame, the lantern is dark</p></div><b class="ra">→</b><div>${pic('b', 'take 2')}<p><span class="ok">✓ PASS</span> made again with the critique in the prompt</p></div></div>
      <div class="bfa" data-from="2"><p class="lb">An edit: "warm the colours to sunset, change nothing else"</p><div class="ba">${pic('b bars', 'before')}${pic('b bars warm', 'after')}</div>${seg('The judge sees', 'cmp', ['before and after', 'the result alone'])}<p class="cv" aria-live="polite"></p></div>
      <div class="cnd" data-from="3"><p class="lb">4 takes at once · judged in order</p><div class="cg">${[['nb', 'FAIL'], ['b', 'PASS'], ['b', ''], ['b', '']].map(([k, v], j) => `<div class="cc${v === 'PASS' ? ' pk' : ''}">${pic(k, 'take ' + (j + 1))}<em class="${v === 'PASS' ? 'ok' : v ? 'bad' : ''}">${v === 'PASS' ? '✓ picked' : v ? '✗ fail' : 'kept, not handed on'}</em></div>`).join('')}</div></div>
      <div class="trg" data-from="4"><p class="lb">Triage · 2 nobody has judged</p>${[['take 3', 'S5 · The keeper', 'b'], ['flow-0931.mp4', 'S4 · Dawn · external', 'st']].map(([n, s, k], j) => `<p class="tr2" data-j="${j}">${pic(k)}<span><b>${n}</b><em>${s}</em></span><button type="button" class="gh kp">✓ Keep</button><button type="button" class="gh dp2">✗ Drop</button></p>`).join('')}<p class="to" aria-live="polite">A dropped file never goes into a sequence.</p></div>`;
    const cv = fv.querySelector('.cv'), to = fv.querySelector('.to');
    onSeg(fv.querySelector('.cmp'), k => { cv.innerHTML = k ? '<span class="bad">✗ FAIL</span> "colour bars over the picture: an unwanted layer". It never saw that they were in the source.' : '<span class="ok">✓ PASS</span> only the colour changed, as asked; the colour bars were already in the source, so they are not a change.'; })(0);
    for (const r of $$(fv, '.tr2')) {
      r.querySelector('.kp').addEventListener('click', () => { r.className = 'tr2 kept'; to.innerHTML = `<b>${r.querySelector('b').textContent}</b> kept: it can go into the sequence.`; });
      r.querySelector('.dp2').addEventListener('click', () => { r.className = 'tr2 gone'; to.innerHTML = `<b>${r.querySelector('b').textContent}</b> dropped: it is kept on disk, in raw, and never goes into a sequence.`; });
    }
  },

  /* III·6 the brand kit: its fields, read by every step, a step's own field, no kit, presets */
  brand(fv) {
    const TPL = 'A {brand.style} shot of {brand.character.keeper.name} climbing the stairs. Avoid {brand.negative}. {brand.aspect}.';
    const KIT = { 'brand.style': 'night blues, one warm light, film grain', 'brand.character.keeper.name': 'the old keeper', 'brand.negative': 'faces in close-up, text on screen', 'brand.aspect': '16:9' };
    fv.innerHTML = `
      <div class="hd"><b>Brand kit</b><span>The last keeper · demo</span></div>
      <div class="kit">
        <p><span>style</span><em>night blues, one warm light, film grain</em></p>
        <p><span>avoid</span><em>faces in close-up, text on screen</em></p>
        <p><span>colours</span><em><i style="background:#0d1b2a"></i><i style="background:#1b3a5c"></i><i style="background:#e8a33d"></i></em></p>
        <p><span>type</span><em>Space Grotesk · subtitles bottom, centred</em></p>
        <p><span>voice</span><em>en-GB · calm</em></p>
        <p><span>logo</span><em>place · bottom right</em></p>
        <p><span>aspect</span><em><b>16:9</b> · 5 s a shot</em></p>
        <p><span>characters</span><em>keeper · "the old keeper" · <code>keeper.jpg</code></em></p>
      </div>
      <div class="sp2" data-from="1"><p class="lb">A media step's prompt</p><pre class="tpl"></pre>${seg('Kit', 'kt', ['with the kit', 'no kit'])}</div>
      <div class="ow" data-from="2"><p class="lb">This step · Brand</p><p class="oa"><span>aspect</span><b>9:16</b><em>this step's own · over the kit's 16:9</em></p><p class="oa dim2"><span>style</span><i>night blues, one warm light…</i><em>from the production, shown faint</em></p></div>
      <div class="pr2" data-from="4"><button type="button" class="gh kpp">Keep as preset…</button><button type="button" class="gh tkk">Take a kept kit…</button><button type="button" class="gh svk">Save kit</button><p class="pv2" aria-live="polite"></p></div>`;
    const tpl = fv.querySelector('.tpl'), pv2 = fv.querySelector('.pv2');
    let own = false, kit = true;
    const draw = () => { tpl.innerHTML = TPL.replace(/\{(brand\.[a-z.]+)\}/g, (m, k) => kit ? `<b>${own && k === 'brand.aspect' ? '9:16' : KIT[k]}</b>` : `<em>${m}</em>`); };
    const kt = onSeg(fv.querySelector('.kt'), k => { kit = !k; draw(); });
    let taken = false;
    fv.querySelector('.kpp').addEventListener('click', () => { pv2.innerHTML = 'Kept as the preset <b>Night harbour</b>. The next production can start from it.'; });
    fv.querySelector('.tkk').addEventListener('click', () => { taken = true; pv2.innerHTML = 'The editor is filled from <b>Sunny kitchen</b>. Nothing is written until you press Save kit.'; });
    fv.querySelector('.svk').addEventListener('click', () => { pv2.innerHTML = taken ? '<span class="ok">Saved.</span> The Last keeper now uses the Sunny kitchen kit.' : '<span class="ok">Saved.</span> Nothing changed in the kit.'; });
    pv2.textContent = 'A kept kit never overwrites one by a single click.';
    return { step(i) { own = i === 2; kt(i === 3 ? 1 : 0); } };
  },

  /* III·7 the media library: five stages, a run's files filed as it goes, the record, the meaning filled, edits kept, a promotion */
  library(fv) {
    const ST = [['source', 'came in'], ['raw', 'kept, not used'], ['semi', 'half done'], ['final', 'truly worked'], ['asset', 'promoted']];
    /* each file: name, picture, the stage it is in from each step on */
    const F = [
      ['harbour.mp4', 'st', [null, 0, 0, 0, 0]],
      ['part-01.mp4', 'b', [null, 2, 2, 2, 2]],
      ['part-02.mp4', 'b', [null, 2, 2, 2, 2]],
      ['take-7.mp4', 'nb', [null, 1, 1, 1, 1]],
      ['final.mp4', 'b warm', [null, null, 3, 3, 3]],
    ];
    fv.innerHTML = `
      <div class="hd"><b>media_studio · video</b><span>one run, filed as it goes · demo</span></div>
      <div class="stg">${ST.map(([s, w], k) => `<div class="col" data-s="${k}"><p><b>${s}</b><em>${w}</em></p><div class="fls"></div></div>`).join('')}</div>
      <div class="rec" data-from="2"><p class="lb">final.mp4 · its record</p><p class="rf"><span>file</span>8.04 s · 1280×720 · h264 · 25 fps · 4.1 MB</p><p class="rf"><span>made by</span>fal-ai/omni-flash · prompt #a41f · run mukrik · step join</p><p class="rf"><span>cause</span>harbour.mp4 → part-01, part-02 → final.mp4</p><p class="rf"><span>fingerprint</span>sha256 9c1e…44d0 · the same bytes are never recorded twice</p></div>
      <div class="mng" data-from="3"><p class="lb">Filled by a model that looked · ${eng('Antigravity')} watched the frames</p><p class="rf"><span>topic</span>a lighthouse at sunset</p><p class="rf"><span>tone</span>calm, lonely</p><p class="rf"><span>platform</span>YouTube ✓ · Shorts ✗ (16:9)</p><p class="rf"><span>take-7</span>salvage: 0:02–0:04 still usable</p></div>
      <div class="yrs" data-from="4"><p class="rf"><span>your score</span><b>0.8 <em>· kept · written onto the version you saw</em></b></p><button type="button" class="gh pro">↑ Promote final.mp4</button><p class="pa" aria-live="polite"></p></div>`;
    const pa = fv.querySelector('.pa');
    let s = 0, promoted = false;
    const draw = () => {
      for (const col of $$(fv, '.col')) {
        const k = +col.dataset.s;
        col.querySelector('.fls').innerHTML = F.filter(([n, , at]) => (n === 'final.mp4' && promoted ? 4 : at[s]) === k).map(([n, p]) => `<span class="fc">${pic(p)}<i>${n}</i></span>`).join('');
      }
    };
    fv.querySelector('.pro').addEventListener('click', () => {
      promoted = !promoted; draw();
      pa.innerHTML = promoted ? '<span class="ok">Moved to asset</span>, file and record together. A run that asks for assets will find it.' : 'Back in final.';
      fv.querySelector('.pro').textContent = promoted ? '↓ Back to final' : '↑ Promote final.mp4';
    });
    pa.textContent = 'Asset is reached only by promoting.';
    draw();
    return { step(i) { s = i; if (i < 4 && promoted) { promoted = false; fv.querySelector('.pro').textContent = '↑ Promote final.mp4'; pa.textContent = 'Asset is reached only by promoting.'; } draw(); } };
  },

  /* III·8 the Airtable engine: its page, the ten tools, an update refused, Start, a run's library input */
  airtable(fv) {
    const TOOLS = ['instances', 'stats', 'search', 'get', 'media_templates', 'media_scan_folder', 'media_save', 'media_update', 'knowledge_save', 'note_save'];
    fv.innerHTML = `
      <div class="hd"><b>Airtable engine</b><span>2 instances · demo</span></div>
      <div class="ins">
        <div class="ic up"><p><i></i><b>media_studio</b><span>:3101</span></p><p class="cnt">1,284 media · 312 lessons · 2,906 sentences</p><p class="ib"><button type="button" class="gh" tabindex="-1">Open UI</button><em>default</em></p></div>
        <div class="ic dn"><p><i></i><b>media_test</b><span class="pt">down</span></p><p class="cnt">down: press Start, or start it yourself</p><p class="ib"><button type="button" class="gh sta">Start</button></p></div>
      </div>
      <div class="rgm" data-from="1"><p class="lb">Register MCP · ~/.claude.json</p><pre>"airtable": { "command": "node",
  "args": ["<b>\${APPDATA}</b>/Code/User/globalStorage/muvusoft.agent-farm/mcp/airtable/server.js"] }</pre><button type="button" class="gh prb">Probe tools</button><p class="tl" aria-live="polite">not probed yet</p></div>
      <pre class="cf" data-from="2"><b>airtable_media_update</b> id=rec8Kp version=12 tags="storm, beam"
<span class="bad">refused</span> <em>the record is at version 13: it was edited in the panel since you read it. Read it again first.</em></pre>
      <div class="ain" data-from="4"><p class="lb">Workflow input · refs · a search of the library</p><p class="aq"><code>lighthouse</code><span>stages asset + final</span><span>20</span><span>newest</span></p><pre>[{ "id": "rec8Kp", "file": "…\\video\\asset\\final.mp4", "stage": "asset", "topic": "a lighthouse at sunset" }, … 5 more]
<em>→ for each {item.file}: what it makes names rec8Kp as its cause</em></pre></div>`;
    const tl = fv.querySelector('.tl'), dn = fv.querySelector('.ic.dn');
    fv.querySelector('.prb').addEventListener('click', async () => {
      tl.innerHTML = '<span class="t">connecting · initialize · tools/list …</span>'; await sleep(700);
      tl.innerHTML = `<span class="ok">✓ 10 tools</span> ${TOOLS.map(t => `<code>airtable_${t}</code>`).join(' ')}`;
    });
    const start = async () => {
      if (dn.classList.contains('up')) return;
      dn.querySelector('.cnt').innerHTML = '<span class="t">node server.js · hidden · no npm install, no browser tab …</span>'; await sleep(900);
      dn.className = 'ic up'; dn.querySelector('.pt').textContent = ':3102';
      dn.querySelector('.cnt').innerHTML = '412 media · <span class="ok">3 records that waited were written</span>';
      dn.querySelector('.sta').disabled = true;
    };
    fv.querySelector('.sta').addEventListener('click', start);
    return { step(i) { if (i >= 3) start(); } };
  },

  /* III·9 the all_in waiting area: looked at, sure or asked; watched folders; registered by hand */
  inbox(fv) {
    const W = [
      ['harbour-at-night.jpg', 'image', 'Claude', 'source', 1],
      ['storm-wide.mp4', 'video', 'Antigravity', 'semi', 1],
      ['IMG_0412.MOV', 'video', 'Antigravity', 'not sure', 0],
      ['keeper-voice-2.wav', 'audio', '', 'nobody listens: stays', 0],
      ['notes.pdf', 'other', '', 'not media: stays', 0],
    ];
    fv.innerHTML = `
      <div class="hd"><b>media_studio\\all_in</b><span>5 waiting · yours, agents never file here · demo</span></div>
      <div class="ai2">${W.map(([n, k, by, v, ok]) => `<p class="wr${ok ? ' sure' : ' unsure'}"><b>${n}</b><span class="kd">${k}</span><span class="by">${by ? eng(by) : '—'}</span><em class="vd">${v}</em></p>`).join('')}</div>
      <div class="qq" data-from="3">${seg('Files it is unsure of', 'uq2', ['ask', 'wait'])}<p class="msg y qn" aria-live="polite"></p></div>
      <div class="wf" data-from="3"><p class="lb">Watched · D:\\Downloads\\Higgsfield → The last keeper · S4</p><p class="gr" aria-live="polite">flow-0931.mp4 · waiting</p></div>
      <div class="hb" data-from="4"><p class="lb">Register Media Asset(s)… · by hand</p><p class="ex">${pic('st')}<b>premiere-cut-v2.mp4</b><span class="xb">external</span><button type="button" class="gh" disabled>Re-run</button><button type="button" class="gh" disabled>Vary…</button></p><p class="dim3">From outside: nothing to run again, so those doors are closed.</p></div>`;
    const qn = fv.querySelector('.qn'), gr = fv.querySelector('.gr');
    onSeg(fv.querySelector('.uq2'), k => { qn.innerHTML = k ? 'They stay in all_in for the next pass. Nothing is asked.' : '<b>Notices · 3 files in all_in need your call:</b> IMG_0412.MOV (not sure), keeper-voice-2.wav (audio), notes.pdf (not media).'; })(0);
    let tok = 0, grown = false;
    async function grow() {
      const t = ++tok; grown = true;
      for (const mb of [41, 88, 132, 132]) { if (t !== tok) return; gr.innerHTML = `flow-0931.mp4 · ${mb} MB · <span class="t">still growing, left alone</span>`; await sleep(700); }
      if (t === tok) gr.innerHTML = 'flow-0931.mp4 · 132 MB · <span class="ok">registered where it lies, not copied</span> · on S4 · Dawn';
    }
    return {
      step(i) {
        fv.querySelector('.ai2').dataset.s = i;
        if (i === 3 || (i > 3 && !grown)) grow(); else if (i < 3) { tok++; grown = false; gr.textContent = 'flow-0931.mp4 · waiting'; }
      },
    };
  },

  /* III·10 Premiere: the sequence, two files, the frame rate, a file named by its scene, the render folder watched */
  premiere(fv) {
    const SC = [['S1', 'b', 'kept video'], ['S2', 'b', 'video'], ['S3', 'st', 'a still'], ['S4', '', 'nothing: skipped'], ['S5', 'b', 'kept video'], ['S6', 'x', 'dropped only: skipped']];
    fv.innerHTML = `
      <div class="hd"><b>Assemble</b><span>The last keeper · 6 scenes · demo</span></div>
      <div class="tln"><span class="v1">V1</span><div class="trk2">${SC.map(([s, k, w]) => `<span class="cl${k === '' || k === 'x' ? ' sk' : ''}" data-s="${s}">${k && k !== 'x' ? pic(k) : '<i class="em2"></i>'}<b>${s}</b><em>${w}</em></span>`).join('')}</div></div>
      <div class="ex2" data-from="1"><p class="fi"><code>the-last-keeper.xml</code><em>Premiere: File → Import</em></p><p class="fi"><code>the-last-keeper.edl</code><em>CMX3600, for any editor</em></p></div>
      <div class="fr" data-from="2"><p class="lb">Export · frame rate and clip length</p>${seg('Frame rate', 'fps', ['24', '25', '30', '60'], 2)}${seg('Clip length', 'len', ['3 s', '5 s', '8 s'], 1)}<pre class="edl"></pre></div>
      <p class="bk msg c" data-from="3" aria-live="polite"><b>P01_S03_T02.mp4</b> dropped in the watched folder · <span class="t">_S03_</span> → it lands on S3 · The lantern, in place of the still.</p>
      <p class="rw3 msg l" data-from="4"><b>Render folder watched</b> · the-last-keeper-final.mp4 appeared → trigger <b>Subtitles and package</b> started.</p>`;
    const edl = fv.querySelector('.edl');
    let fps = 30, len = 5;
    const tc = s => `00:00:${String(Math.floor(s)).padStart(2, '0')}:00`;
    const draw = () => {
      const q = SC.filter(([, k]) => k && k !== 'x');
      edl.innerHTML = `TITLE: The last keeper\nFCM: NON-DROP FRAME  <em>· ${fps} fps · ${len * fps} frames a clip</em>\n${q.slice(0, 3).map(([s], k) => `${String(k + 1).padStart(3, '0')}  AX  V  C  00:00:00:00 ${tc(len)} ${tc(k * len)} ${tc((k + 1) * len)}\n* FROM CLIP NAME: ${s.toLowerCase()}.mp4`).join('\n')}\n<em>… ${q.length - 3} more</em>`;
    };
    onSeg(fv.querySelector('.fps'), k => { fps = [24, 25, 30, 60][k]; draw(); });
    onSeg(fv.querySelector('.len'), k => { len = [3, 5, 8][k]; draw(); });
    draw();
    return {
      step(i) {
        const s3 = fv.querySelector('.cl[data-s="S3"]');
        s3.innerHTML = i >= 3 ? `${pic('b warm')}<b>S3</b><em>your edit</em>` : `${pic('st')}<b>S3</b><em>a still</em>`;
        s3.classList.toggle('hl', i === 3);
      },
    };
  },

  /* III·11 the content calendar: a vault note per publish, the publish step, its approval, published, overdue */
  calendar(fv) {
    const C = [['Sat 10', 'Keeper, part two', 'TikTok', 'producing'], ['Sun 11', 'The storm, cut down', 'YouTube', 'published'], ['Mon 12', 'The last keeper · teaser', 'YouTube', 'ready'], ['Fri 16', 'Questions from the rock', 'Instagram', 'planned']];
    fv.innerHTML = `
      <div class="hd"><b>CONTENT</b><span>01_INBOX/02_Calendar · one note per publish · demo</span></div>
      <div class="cl2">${C.map(([d, t, p, s], k) => `<p class="ce" data-k="${k}"><span class="d2">${d}</span><b>${t}</b><span class="pf">${p}</span><span class="cs2 ${s}">${s}</span></p>`).join('')}</div>
      <pre class="fm">---
title: The last keeper · teaser
date: 2026-10-12
startTime: "18:00"
allDay: false
type: single
completed: false
platform: YouTube
status: ready
---
<em>Your own notes below stay as you wrote them.</em></pre>
      <div class="pb2" data-from="1"><p class="lb">Publish step → your n8n flow · {secret:N8N_PUBLISH_URL}</p><pre>{ "platform": "YouTube", "title": "The last keeper · teaser",
  "publishAt": "2026-10-12T18:00", "files": ["teaser.mp4"],
  "calendar": "2026-10-12 YouTube - The last keeper · teaser.md" }</pre></div>
      <div class="apv" data-from="2">${seg('Approval', 'ap', ['ask', 'auto', 'never'])}<div class="aq2" aria-live="polite"></div></div>
      <p class="msg p ov" data-from="4"><b>Living · 1 publish overdue:</b> Keeper, part two · TikTok · 2 days late → Needs You · <u>Open the note</u> · <u>Open its publish step</u></p>`;
    const aq = fv.querySelector('.aq2');
    let mode = 0, sent = false;
    const mark = () => {
      const ce = fv.querySelector('.ce[data-k="2"] .cs2');
      ce.className = 'cs2 ' + (sent ? 'published' : 'ready'); ce.textContent = sent ? 'published' : 'ready';
      fv.querySelector('.ce[data-k="2"] b').innerHTML = sent ? 'The last keeper · teaser <em>youtu.be/k33p3r · 18:00</em>' : 'The last keeper · teaser';
    };
    const draw = () => {
      if (sent) { aq.innerHTML = '<span class="ok">Published.</span> Your flow answered with the link; the note says published, with the link and the time.'; return; }
      aq.innerHTML = [
        '<p class="qa2">Publish "The last keeper · teaser" to YouTube at 18:00?</p><button type="button" class="gh go2">Publish</button><button type="button" class="gh no2">Not now</button>',
        '<p class="qa2">Sends without asking. Your flow does the upload.</p><button type="button" class="gh go2">Run the step</button>',
        '<p class="qa2"><b>Rehearsal:</b> the payload is built and kept with the run. Nothing is sent.</p>',
      ][mode];
      const go = aq.querySelector('.go2'), no = aq.querySelector('.no2');
      if (go) go.addEventListener('click', async () => { aq.innerHTML = '<span class="t">sent to your flow · waiting for its answer …</span>'; await sleep(900); sent = true; mark(); draw(); });
      if (no) no.addEventListener('click', () => { aq.innerHTML = 'Not sent. The step waits for your yes, here and in Needs You.'; });
    };
    onSeg(fv.querySelector('.ap'), k => { mode = k; sent = false; mark(); draw(); });
    draw();
    return {
      step(i) {
        if (i >= 3 && !sent) { sent = true; mark(); draw(); }
        if (i < 3 && sent) { sent = false; mark(); draw(); }
        fv.querySelector('.ce[data-k="0"]').classList.toggle('late', i === 4);
      },
    };
  },

  /* III·12 the metrics step: asked for, on the record, a summary of what worked, {performance}, its schedule */
  metrics(fv) {
    const P = [['The storm, cut down', 'YouTube', 12400, '41%', '5.8%'], ['Keeper at dawn', 'TikTok', 31800, '63%', '9.1%'], ['How a lens works', 'YouTube', 2100, '22%', '2.0%'], ['Ten ways to make pasta', 'Instagram', 8800, '35%', '4.4%']];
    fv.innerHTML = `
      <div class="hd"><b>Metrics step</b><span>published, last 30 days · demo</span></div>
      <div class="mt2"><p class="mh"><span>published</span><span>views</span><span>to end</span><span>engaged</span></p>${P.map(([t, p, v, c, e]) => `<p><b>${t}<em>${p}</em></b><span>${v.toLocaleString('en')}</span><span>${c}</span><span>${e}</span></p>`).join('')}</div>
      <pre data-from="1">→ your flow: { "fields": ["views", "watchSeconds", "completion", "engagement", …],
  "items": [{ "title": "The storm, cut down", "platform": "YouTube", "url": "youtu.be/st0rm" }, …] }</pre>
      <div class="onr" data-from="2"><p class="lb">The storm, cut down · its record</p><p class="rf"><span>analytics.view_count</span>12,400</p><p class="rf"><span>analytics.completion_rate</span>0.41</p><p class="rf"><span>marketing.engagement_rate</span><b>5.8% <em>worked out from likes, comments and shares</em></b></p></div>
      <div class="sm" data-from="3"><p class="lb">How similar published content performed · for</p>${seg('The new idea is about', 'qy', ['the lighthouse', 'a new recipe video'])}<pre class="sb" aria-live="polite"></pre></div>
      <p class="sch msg" data-from="4">Runs when its workflow runs: <b>Mondays 07:00</b>, before the idea step. There is no second clock.</p>`;
    const sb = fv.querySelector('.sb');
    onSeg(fv.querySelector('.qy'), k => {
      sb.innerHTML = k
        ? 'Ten ways to make pasta · Instagram · 8,800 views · 35% · 4.4%\nAverage of everything published: 13,775 views · 40% · 5.3%\n<em>Little like it yet, so the best performers follow: Keeper at dawn · 31,800 · 63% · 9.1%</em>'
        : 'Keeper at dawn · TikTok · 31,800 views · 63% · 9.1%\nThe storm, cut down · YouTube · 12,400 views · 41% · 5.8%\nAverage of these two: 22,100 views · 52% · 7.5% · overall: 13,775\n<em>→ the idea step reads this as {performance}; so does the supervisor\'s brief</em>';
    })(0);
  },

  /* III·13 the daily digest card, when it comes, read by this computer, or by a voice model into an mp3 */
  briefing(fv) {
    const TXT = 'Today: three dollars eighteen spent. Three agents worked; the showrunner spent most, at sixty-three percent of its budget. Twelve tasks done, one error. Duties on time. One warning: the media budget is at ninety-one percent.';
    fv.innerHTML = `
      <div class="hd"><b>Daily digest</b><span>Mon 12 Oct · no model call · demo</span></div>
      <div class="dg"><p><span>spent today</span><b>$3.18</b></p><p><span>agents</span><b>3 worked</b></p><p><span>top</span><b>showrunner $1.90 · 63% of budget</b></p><p><span>tasks</span><b>12 done · 1 error</b></p><p><span>duties</span><b>on time</b></p><p class="wn"><span>warning</span><b>media budget at 91%</b></p></div>
      <div class="wh" data-from="1">${seg('When', 'whn', ['21:30 every day', 'by hand'])}<p class="wo" aria-live="polite"></p></div>
      <div class="rd2" data-from="2"><button type="button" class="gh spk">▶ Read it aloud</button><p class="ro2" aria-live="polite">This computer's own voice, free, picked for the language the card is in; code and links are left out.</p></div>
      <div class="tts" data-from="3"><p class="rf"><span>digestTtsModel</span><b><code>fal-ai/…</code> <em>a voice model you name</em></b></p><p class="mp"><b>briefing-2026-10-12.mp3</b> → <code>Sync\\Phone\\Briefings</code></p><p class="dim3">Same FAL_KEY as your other media. On your phone for the walk in the morning.</p></div>`;
    const wo = fv.querySelector('.wo'), ro = fv.querySelector('.ro2');
    onSeg(fv.querySelector('.whn'), k => { wo.innerHTML = k ? '<code>Send Daily Digest Now</code> · it comes when you ask.' : 'At 21:30, on the first check after it, to your webhook · n8n → Telegram.'; })(0);
    fv.querySelector('.spk').addEventListener('click', () => {
      if (!('speechSynthesis' in window)) { ro.textContent = 'This browser has no voice to read with; the app uses the computer\'s own.'; return; }
      speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(TXT); u.lang = 'en-GB'; speechSynthesis.speak(u);
      ro.innerHTML = '<span class="t">Reading…</span> in this browser\'s voice, as the app would in the computer\'s.';
    });
  },
};
