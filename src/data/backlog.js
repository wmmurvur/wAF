// The demo backlog every section shares: one project, the family the relay chain works through, and the queue behind it.
// Shaped like the real Projects → Backlog page (area codes, families, sizes S to XL, #byAI / #byREQ, ⛔ waits on),
// which keeps the work in a plain Backlog.md file. Every item here is invented; nothing comes from a real backlog.

export const project = { name: 'orbit-app', sessions: 412, open: 38, done: 214 };

/* Areas come from the file's own headings. Counts are the open items in each; they add up to project.open. */
export const AREAS = [['P', 1], ['K', 4], ['S', 2], ['M', 0], ['N', 0], ['B', 0], ['A', 0], ['U', 9], ['X', 22]];

/* The whole the chain in Days works through, then its twelve parts in queue order.
   legs: how many relay legs each part took in the demo chain (they add up to 92; the last one is still open). */
export const family = { c: 'X-40', t: 'Timeline export, end to end', s: 'XL', k: 'feat' };
export const parts = [
  { c: 'X-41', t: 'index the transcripts', s: 'S', k: 'feat', legs: 5 },
  { c: 'X-42', t: 'stream rows into the exporter', s: 'M', k: 'feat', legs: 9 },
  { c: 'X-43', t: 'write the CSV schema test', s: 'S', k: 'test', legs: 4 },
  { c: 'X-44', t: 'handle a 1M-row transcript', s: 'L', k: 'bug', legs: 13 },
  { c: 'X-45', t: 'JSON lines on the same stream', s: 'M', k: 'feat', legs: 8 },
  { c: 'X-46', t: 'resume a broken export from the last row', s: 'L', k: 'feat', legs: 12 },
  { c: 'X-47', t: 'wire the export button', s: 'S', k: 'ux', legs: 4 },
  { c: 'X-48', t: 'add the progress notice', s: 'S', k: 'ux', legs: 5 },
  { c: 'X-49', t: 'Windows paths past 260 characters', s: 'M', k: 'bug', legs: 9 },
  { c: 'X-50', t: 'tests at 10k, 1M and 10M rows', s: 'L', k: 'test', legs: 14 },
  { c: 'X-51', t: 'document the export path', s: 'S', k: 'docs', legs: 4 },
  { c: 'X-52', t: 'clean up the old writer', s: 'M', k: 'refactor', legs: 5 },
];

/* What is queued after the family. by: who wrote the line (AI = an agent filed it itself, REQ = you asked an agent to);
   wait: an unfinished item it waits on, so it is held back. */
export const queue = [
  { c: 'U-12', t: 'export drops rows past 10k', s: 'M', k: 'bug' },
  { c: 'X-53', t: 'Excel opens the UTF-8 CSV as Latin-1', s: 'S', k: 'bug', by: 'AI' },
  { c: 'K-7', t: 'settings search finds nothing for "quota"', s: 'S', k: 'bug', by: 'REQ' },
  { c: 'S-9', t: 'session list slows down past 1,000 rows', s: 'M', k: 'perf' },
  { c: 'X-54', t: 'Parquet as a third export format', s: 'L', k: 'feat', wait: 'X-52' },
  { c: 'U-31', t: 'export dialog forgets the last folder', s: 'S', k: 'ux' },
  { c: 'K-8', t: 'quota bar rounds 89.6% up to 90%', s: 'S', k: 'bug', by: 'AI' },
  { c: 'U-33', t: 'keyboard shortcut for the export', s: 'S', k: 'ux', by: 'REQ' },
  { c: 'S-10', t: 'archive sessions older than a year', s: 'M', k: 'feat' },
  { c: 'P-3', t: 'release notes for 2.0', s: 'S', k: 'docs' },
  { c: 'X-55', t: 'export a single turn from the transcript', s: 'S', k: 'feat' },
  { c: 'K-9', t: 'warn before a leg starts on a full account', s: 'M', k: 'ux', by: 'AI' },
  { c: 'U-34', t: 'empty state for a project with no sessions', s: 'S', k: 'ux' },
];

/* Thoughts filed while the page runs: typed into the capture box by a person, or filed by an agent mid-job (#byAI).
   a: the area the item is filed under; it gets the next free number there (codes only count up). */
export const captures = [
  { who: 'you', t: 'the export should say which account each leg ran on', a: 'X', k: 'feat', s: 'S' },
  { who: 'agent', t: 'rows.ts swallows a write error on a full disk', a: 'X', k: 'bug', s: 'S' },
  { who: 'you', t: 'dark theme for the export dialog', a: 'U', k: 'ux', s: 'M' },
  { who: 'agent', t: 'test_export.js leaves temp files behind on Windows', a: 'X', k: 'test', s: 'S' },
  { who: 'you', t: 'a weekly digest of what the chains closed', a: 'S', k: 'feat', s: 'M' },
  { who: 'agent', t: 'quota bar flickers when two accounts tie', a: 'K', k: 'bug', s: 'S' },
];
export const nextCode = { P: 4, K: 10, S: 11, U: 35, X: 56 };

/* the live item: the last part of the family, on the relay hero's live leg */
export const live = parts[parts.length - 1];

/* Chapter II: the same Projects page for work that is not code (plan v0.7 §3, II; owner, 11:46: "a non-software project
   is only a backlog whose items are not code"). Any #tag is a kind (projectBacklog.ts: "the shipped set is a suggestion"),
   so a film files #shoot and #edit and a thesis files #write. who: the agent on the first item. All of it is demo data. */
export const projects = [
  { id: 'orbit', name: 'orbit-app', desc: 'A desktop app that turns session transcripts into timelines.' },
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
   sessions were live). Session ids line up with the Memory chapter's demo sessions. */
export const tracks = {
  orbit: {
    stats: [['231', 'tracked'], ['1,318', 'events'], ['371', 'sessions'], ['2,904', 'turns'], ['131d', 'span']], unc: 3,
    items: [
      { c: 'U-12', st: 'open', k: 'bug', t: 'export drops rows past 10k', s: 'M', n: [2, 3, '6d'],
        ev: [['Jul 3, 22:41', 'a91c03e2', 14, 'developer · Claude', 'touched', 'root cause is in rows.ts; ran out of time'],
             ['Jul 9, 10:05', '5d2e77b1', 3, 'reviewer · Codex', 'touched', 'the cap lives in the writer, not the query']],
        next: 'Next up after X-52. The session that takes it reads both notes before it writes a line.' },
      { c: 'X-51', st: 'done', k: 'docs', t: 'document the export path', s: 'S', n: [4, 4, '1d'],
        ev: [['Oct 10, 21:16', 'e0b4c9d1', 9, 'developer · Claude', 'done', 'docs/export.md written; the dialog screenshots redone']] },
      { c: 'K-8', st: 'open', k: 'bug', by: 'AI', t: 'quota bar rounds 89.6% up to 90%', s: 'S', n: [1, 1, '0d'], unc: 'multi',
        ev: [['Oct 8, 14:02', '8a5f2c64', 22, 'developer · Claude', 'opened', 'noticed mid-job and filed: a proposal']] },
      { c: 'X-44', st: 'done', k: 'bug', t: 'handle a 1M-row transcript', s: 'L', n: [13, 31, '4d'],
        ev: [['Oct 5, 03:40', 'c4d18a07', 6, 'developer · Claude', 'done', 'rows stream in 64k batches; 1M rows export in 41s with flat memory']] },
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
