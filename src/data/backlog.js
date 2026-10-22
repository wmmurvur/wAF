// The backlog every section shares: one project, the family the relay chain works through, and the queue behind it.
// Shaped like the real Projects → Backlog page (area codes, families, sizes S to XL, #byAI / #byREQ, ⛔ waits on),
// which keeps the work in a plain Backlog.md file. The project is Agent Farm itself, and the items are its own (owner's
// video of 22 Oct 2026, translated): its agents building its video pipeline, phases A to E. Counts and areas are the real
// page's; legs, captures and the few items without a code in that video are demo data.

export const project = { name: 'Agent Farm', sessions: 1463, open: 73, done: 561 };

/* Areas come from the file's own headings. Counts are the open items in each; they add up to project.open. */
export const AREAS = [['P', 1], ['K', 5], ['S', 2], ['M', 40], ['N', 1], ['B', 0], ['A', 0], ['U', 5], ['X', 19]];

/* The whole the chain in Days works through, then its twelve parts in queue order: Phase A, B and the start of C.
   legs: how many relay legs each part took in the demo chain (they add up to 92; the last one is still open). */
export const family = { c: 'M-64', t: 'Video pipeline: a brief in, a finished video out', s: 'XL', k: 'feat' };
export const parts = [
  { c: 'M-70', t: 'A-0 common ground: skeleton and purity gate', s: 'M', k: 'feat', legs: 5 },
  { c: 'M-71', t: 'A-1 capability profile, proven by a trial encode', s: 'M', k: 'feat', legs: 7 },
  { c: 'M-80', t: 'A-10 sound chain: voice, music bed, master mix', s: 'L', k: 'feat', legs: 9 },
  { c: 'M-81', t: 'A-11 final render and 480p draft in one pass', s: 'L', k: 'feat', legs: 10 },
  { c: 'M-82', t: 'A-12 preflight: 32 checks before the render', s: 'M', k: 'test', legs: 8 },
  { c: 'M-83', t: 'A-13 voice-over price: unknown is never zero', s: 'S', k: 'feat', legs: 4 },
  { c: 'M-90', t: 'B-3 versions: undo, redo, approve, lock', s: 'M', k: 'feat', legs: 8 },
  { c: 'M-91', t: 'B-4 project lock: one writer at a time', s: 'M', k: 'feat', legs: 6 },
  { c: 'M-93', t: 'B-6 route finder: plans back from the goal', s: 'L', k: 'feat', legs: 12 },
  { c: 'M-99', t: 'Phase B acceptance, measured on this machine', s: 'S', k: 'chore', legs: 5 },
  { c: 'M-100', t: 'C-0 editing actors: trim, cut, join, speed', s: 'L', k: 'feat', legs: 13 },
  { c: 'M-101', t: 'C-1 sound and compose: de-hum, pip, logo, intro', s: 'L', k: 'feat', legs: 5 },
];

/* What is queued after the family. by: who wrote the line (AI = an agent filed it itself, REQ = you asked an agent to);
   wait: an unfinished item it waits on, so it is held back. */
export const queue = [
  { c: 'M-106', t: 'C-6 preview: storyboard, cut, sound, text, 480p', s: 'M', k: 'feat' },
  { c: 'K-8', t: 'quota bar rounds 89.6% up to 90%', s: 'S', k: 'bug', by: 'AI' },
  { c: 'M-107', t: 'C-7 ad-hoc runner for work that is not on the map', s: 'L', k: 'feat', by: 'REQ' },
  { c: 'M-108', t: 'C-8 script actor: hash allow-list, runs on your yes', s: 'L', k: 'feat', wait: 'M-107' },
  { c: 'M-109', t: 'C-9 editor bridge both ways: Premiere and CapCut', s: 'L', k: 'feat' },
  { c: 'U-189', t: 'Agent Farm in more languages, English first', s: 'L', k: 'ux', by: 'REQ' },
  { c: 'M-110', t: 'C-10 bench agent and its pipeline playbook', s: 'M', k: 'feat' },
  { c: 'M-111', t: 'C-11 one door to the bench, from any video', s: 'L', k: 'ux', wait: 'M-110' },
  { c: 'S-9', t: 'session list slows down past 1,000 rows', s: 'M', k: 'perf' },
  { c: 'M-112', t: 'Phase C closing: seven scenarios on the bench', s: 'M', k: 'chore' },
  { c: 'M-113', t: 'D-0 package file and autonomy: supervised to full', s: 'L', k: 'feat' },
  { c: 'M-114', t: 'D-1 experiment mode: variants side by side', s: 'L', k: 'feat', wait: 'M-113' },
  { c: 'M-122', t: 'E-1 publish to YouTube with your own sign-in', s: 'L', k: 'feat', by: 'REQ' },
];

/* Thoughts filed while the page runs: typed into the capture box by a person, or filed by an agent mid-job (#byAI).
   a: the area the item is filed under; it gets the next free number there (codes only count up). */
export const captures = [
  { who: 'you', t: 'every episode also as a 9:16 short, by default', a: 'M', k: 'feat', s: 'S' },
  { who: 'agent', t: 'this ffmpeg build has no arnndn; fall back to afftdn', a: 'M', k: 'bug', s: 'S' },
  { who: 'you', t: 'subtitles in Spanish and German for every episode', a: 'M', k: 'feat', s: 'M' },
  { who: 'agent', t: 'the trial encode leaves a temp file behind on Windows', a: 'M', k: 'test', s: 'S' },
  { who: 'you', t: 'a weekly digest of what the chains closed', a: 'S', k: 'feat', s: 'M' },
  { who: 'agent', t: 'quota bar flickers when two accounts tie', a: 'K', k: 'bug', s: 'S' },
];
export const nextCode = { P: 2, K: 10, S: 11, M: 137, U: 197, X: 570 };

/* the live item: the last part of the family, on the relay hero's live leg */
export const live = parts[parts.length - 1];

/* Chapter II: the same Projects page for work that is not code (plan v0.7 §3, II; owner, 11:46: "a non-software project
   is only a backlog whose items are not code"). Any #tag is a kind (projectBacklog.ts: "the shipped set is a suggestion"),
   so a film files #shoot and #edit and a thesis files #write. who: the agent on the first item. All of it is demo data. */
export const projects = [
  { id: 'farm', name: 'Agent Farm', desc: 'This extension, built by its own agents. Right now they are building its video pipeline.' },
  {
    id: 'keeper', name: 'The last keeper', sessions: 96, open: 17, done: 41, queued: 9,
    desc: 'A documentary series in six episodes: the last lighthouse keepers, and the storms they wrote down.',
    areas: [['R', 3], ['W', 4], ['S', 6], ['E', 4]], who: 'showrunner · Claude',
    rows: [
      { c: 'S-7', t: 'golden-hour shot of the lantern room', s: 'M', k: 'shoot' },
      { c: 'W-4', t: 'narration for episode 3, the 1953 storm', s: 'M', k: 'script', by: 'REQ' },
      { c: 'E-6', t: 'the long cut as six vertical shorts', s: 'L', k: 'edit' },
      { c: 'R-5', t: "find the keeper's logbook for 1953", s: 'S', k: 'research', by: 'AI' },
      { c: 'W-5', t: 'interview questions for the last keeper', s: 'S', k: 'script' },
      { c: 'S-8', t: 'rain plate for the storm scene', s: 'S', k: 'shoot', wait: 'S-7' },
    ],
    more: [['E-7', 'S'], ['R-6', 'M'], ['S-9', 'S']],
  },
  {
    id: 'thesis', name: 'Thesis', sessions: 58, open: 12, done: 23, queued: 8,
    desc: "MSc thesis: two centuries of storms, read from lighthouse keepers' logbooks.",
    areas: [['L', 2], ['D', 4], ['C', 3], ['F', 3]], who: 'researcher · Gemini',
    rows: [
      { c: 'D-6', t: 'transcribe the 1893 logbook, pages 40 to 80', s: 'M', k: 'research', by: 'REQ' },
      { c: 'C-3', t: 'draft chapter 3: storms in the logs, 1890 to 1910', s: 'L', k: 'write' },
      { c: 'F-2', t: 'figure: gales per decade, with error bars', s: 'S', k: 'figure' },
      { c: 'D-7', t: 'check the gale dates against the weather archive', s: 'M', k: 'research', by: 'AI' },
      { c: 'C-4', t: "answer the supervisor's notes on chapter 2", s: 'S', k: 'review' },
      { c: 'L-9', t: 'fourteen references are missing page numbers', s: 'S', k: 'chore', by: 'AI' },
    ],
    more: [['F-3', 'S']],
  },
  {
    id: 'spring', name: 'Spring launch', sessions: 34, open: 9, done: 15, queued: 6,
    desc: 'The spring campaign for a bike-share launch: banner, 15-second cuts, landing page copy.',
    areas: [['C', 3], ['V', 2], ['D', 2], ['L', 2]], who: 'editor · Claude',
    rows: [
      { c: 'V-4', t: 'a 15-second cut for stories', s: 'M', k: 'video' },
      { c: 'C-2', t: 'three headlines for the banner', s: 'S', k: 'copy', by: 'REQ' },
      { c: 'D-5', t: 'the key visual in six sizes', s: 'M', k: 'design' },
      { c: 'C-3', t: 'an A/B plan for the landing headline', s: 'S', k: 'research', by: 'AI' },
      { c: 'L-1', t: 'check the word "free" in the offer with legal', s: 'S', k: 'review' },
      { c: 'L-2', t: 'schedule the launch-week posts', s: 'S', k: 'chore', wait: 'C-2' },
    ],
    more: [],
  },
];

/* Projects → Track (screenshot M14; projects.track / projects.tracks in extension.ts): which session, which turn of it,
   when and by whom each item was worked, with a note when it was not finished. "Three months from now K-8 leads back to
   the exact turns it was fought in." uncertain: the attribution is a best effort and says why (multi: two of your
   sessions were live). Agent Farm's figures, M-93's and M-100's notes and session ids are the owner's (video, 22 Oct 2026). */
export const tracks = {
  farm: {
    stats: [['1,305', 'tracked'], ['4,067', 'events'], ['525', 'sessions'], ['1,065', 'turns'], ['79d', 'span']], unc: 3,
    items: [
      { c: 'X-499', st: 'open', k: 'debt', t: 'split the biggest files without breaking start-up', s: 'M', n: [2, 22, '3d'],
        ev: [['Sep 9, 23:12', 'b7d13216', 18, 'developer · Claude', 'touched', 'split by size first; the start-up order broke, so it was rolled back'],
             ['Sep 12, 10:40', '5d2e77b1', 4, 'reviewer · Codex', 'touched', 'split by feature, not by size: one folder per panel, the start-up list kept in one place']],
        next: 'Queued after Phase C. The session that takes it reads both notes before it writes a line.' },
      { c: 'M-93', st: 'done', k: 'feat', t: 'B-6 route finder: plans back from the goal', s: 'L', n: [2, 2, '1d'],
        ev: [['Oct 20, 06:30', 'b0d2ec28', 2, 'developer · Claude', 'done', 'planner.ts, pure code: it plans back from the goal and says why each step runs. Full suite: 885 files, 41,569 tests passed, 0 failed.']] },
      { c: 'K-8', st: 'open', k: 'bug', by: 'AI', t: 'quota bar rounds 89.6% up to 90%', s: 'S', n: [1, 1, '0d'], unc: 'multi',
        ev: [['Oct 21, 14:02', '8a5f2c64', 22, 'developer · Claude', 'opened', 'noticed mid-job and filed: a proposal']] },
      { c: 'M-100', st: 'done', k: 'feat', t: 'C-0 editing actors: trim, cut, join, speed', s: 'L', n: [3, 3, '2d'],
        ev: [['Oct 21, 11:48', '85340699', 3, 'developer · Claude', 'done', 'nine parts: the fragment contract, the cut-list core, then trim, cut, join, crop, rotate, speed, freeze, reverse and the audio track']] },
    ],
  },
  keeper: {
    stats: [['52', 'tracked'], ['164', 'events'], ['88', 'sessions'], ['402', 'turns'], ['61d', 'span']], unc: 0,
    items: [
      { c: 'S-6', st: 'done', k: 'shoot', t: 'storm shots keep losing the beam', s: 'M', n: [2, 5, '2d'],
        ev: [['Oct 9, 16:40', 'b93f0d17', 5, 'editor · Codex', 'touched', 'the judge failed the take: no beam in frame; retaken with its note'],
             ['Oct 11, 09:20', '7c41e2a0', 4, 'showrunner · Claude', 'done', 'one rotating beam, visible through rain; the judge passed it']] },
      { c: 'E-6', st: 'open', k: 'edit', t: 'the long cut as six vertical shorts', s: 'L', n: [1, 4, '0d'],
        ev: [['Oct 10, 11:48', 'd1c7e046', 3, 'editor · Claude', 'touched', 'nine moments picked; three run past 60 seconds']] },
      { c: 'R-5', st: 'open', k: 'research', by: 'AI', t: "find the keeper's logbook for 1953", s: 'S', n: [1, 1, '0d'],
        ev: [['Oct 8, 20:05', '9e04b7c3', 6, 'researcher · Gemini', 'opened', 'two sources quote it; neither says where it is kept']] },
    ],
  },
  thesis: {
    stats: [['31', 'tracked'], ['97', 'events'], ['52', 'sessions'], ['233', 'turns'], ['48d', 'span']], unc: 1,
    items: [
      { c: 'D-6', st: 'open', k: 'research', by: 'REQ', t: 'transcribe the 1893 logbook, pages 40 to 80', s: 'M', n: [1, 7, '0d'],
        ev: [['Oct 9, 16:20', '61ac0e5f', 7, 'researcher · Gemini', 'touched', 'pages 40 to 61 done; from 62 the ink has run, flagged for the archive visit']] },
      { c: 'C-2', st: 'done', k: 'write', t: 'chapter 2: the keepers and their logs', s: 'L', n: [6, 14, '12d'],
        ev: [['Sep 30, 18:44', 'f27d9b30', 11, 'writer · Claude', 'done', 'sent to the supervisor; the notes came back as C-4']] },
    ],
  },
  spring: {
    stats: [['20', 'tracked'], ['58', 'events'], ['31', 'sessions'], ['126', 'turns'], ['19d', 'span']], unc: 0,
    items: [
      { c: 'V-4', st: 'open', k: 'video', t: 'a 15-second cut for stories', s: 'M', n: [2, 5, '2d'],
        ev: [['Oct 10, 15:02', '0b6e3a91', 5, 'editor · Claude', 'touched', 'the first three seconds drag; recut with the bike in frame at 0:00']] },
      { c: 'C-1', st: 'done', k: 'copy', t: 'brief to three directions', s: 'S', n: [1, 3, '0d'],
        ev: [['Sep 26, 12:30', 'd4419c2e', 3, 'writer · Claude', 'done', 'three routes written; the client picked "Ride the light"']] },
    ],
  },
};
