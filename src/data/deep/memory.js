// District VI, Never forgets: the words of its page (/features/never-forgets/). Names, sentences and tile figures are
// in data/features.js; this file holds what the page says beyond them. Every rule, default and setting key was read in
// the extension's own guide (the Blueprint, cited by section heading: "Dashboard" (the Sessions table and the session
// right-click), "Session Viewer", "Turns Page", "Session Replay", "Subagent Tree", "Coverage and honest boundaries",
// "LLM Wiki — Candidate Pool and Compilation", "The Wiki Cockpit", "Wiki Phase 2", "Transcript Search", "Memory
// Management", "Memory Graph", "Memory on the bridge", "Memory Synchronization", "Memory Distillation", "Semantic
// Memory Query", "Health: Context Load", "Multiple Machines", "Fleet Report", "Automatic Report (to the Vault)",
// "Task Outputs Digest", the settings tables and the release notes named), its Technical DNA (cited by §) or the
// owner's ranked feature list (§11 finding and reviewing, §13 knowledge, the wiki and Obsidian); the citations are the
// comments. Agents, sessions, pages and figures in the figures are demo data.
// how and note may hold <code> and <em>; everything else is plain text. fig: a short label per step of how, shown on
// the step and under the feature's figure (scripts/figs/memory.js draws the figures and what each step shows).

export default {
  description: 'Every session from every engine kept in one table, any turn opened, replayed or exported, a wiki compiled from the turns you mark and the files you drop, Obsidian as the second brain, one search over everything by words or by meaning, agents\' memory files that are measured, linked and kept honest, other machines\' sessions, and reports written into your vault.',
  promise: 'Every conversation on this machine is kept, from every engine, with what it cost, and any turn of it is a click away. What mattered does not stay buried there: you mark it in passing, and later one run writes it into your wiki, one concept to a page, each fact pointing back to the turn it came from. Models get replaced; what they worked out stays.',

  features: {
    sessions: {
      fig: ['Every engine', 'Yours or the farm\'s', 'Sorted by what matters', 'Found again', 'Kept your way'],
      // the owner's list §11 (İhtiyaç)
      why: 'Each CLI keeps its conversations in its own folder, in its own format. A week later nobody can say which session decided what, which one is still running, or what any of them cost.',
      how: [
        // Blueprint, Coverage and honest boundaries (Sessions tables: every engine; rows carry an engine badge); Technical DNA §4.4
        'Claude Code, Codex, Gemini CLI, Antigravity and OpenCode conversations are rows of the same table, each with its engine badge, read from where each CLI already writes them.',
        // Blueprint, Dashboard ("Your dialogs vs the farm's own runs (3.20.0)": the By column, the entrypoint field, opens scoped to 🧑)
        'A By column tells a session you started, 🧑, from one the farm ran, 🤖: a schedule, a trigger, a task, a mission. It is read from the transcript itself, never guessed, and the table opens on yours.',
        // Blueprint, Dashboard (Sessions table: Sort by Recent · Cost · Tokens · Ctx now · Duration · Turns; ● active; ▸ turn list)
        'Sort by recent, cost, tokens, context now, duration or turns, and the rows are that order\'s real top, not a re-slice. A green dot marks the ones running now, and ▸ unfolds a session\'s turns with each one\'s tokens and cost.',
        // Blueprint, Dashboard (Sessions-table filters 2.72.0); Transcript Search ("I know the id" X-34, Find Session by ID)
        'Filters take a title, an agent, errors, date ranges and ranges of any figure. A session id, or the 8 characters printed everywhere in the farm, finds that session on any engine.',
        // Blueprint, Dashboard (right-click: Rename, Pin, Label; Resume in Terminal); Starting and Steering Sessions; Dashboard (Multi-select 3.58.0); the owner's list §11 (Oturum işlemleri)
        'Rename one without touching its transcript, pin it to your shelf, label it, file it to a project, resume it in the terminal or the Console on the engine it ran on. Select several and the same right-click acts on all of them.',
      ],
      set: [
        // Blueprint, settings table
        ['agentFarm.includeUnmatchedProjects', 'false', 'Also list sessions outside your agents\' folders, under Other projects.'],
        ['agentFarm.activeThresholdSeconds', '150', 'A session whose log changed within this many seconds counts as active.'],
      ],
      // Blueprint, Subagent Tree; Dashboard (pinned sessions exempt from the row limit)
      note: 'A session\'s subagents are gathered under it, with what they cost together on the parent\'s row, and a pinned session is always listed, whatever the row limit.',
      see: { href: '#me-panel', l: 'The Sessions page, live' },
    },

    turns: {
      fig: ['A map of turns', 'Only what you want', 'Replay it', 'Export what you see', 'Every turn, farm-wide'],
      // the owner's list §11 (Farkı: search goes down to the turn, the step and the changed line)
      why: 'A long session is a wall of text. The decision you are after is in one turn of forty, between screens of tool output nobody needs.',
      how: [
        // Blueprint, Session Viewer (turn bands; turn accordion, opens folded + single-open since 3.20.0; ↑ ↓; per-turn model; turn start date on hover)
        'A session opens folded, as its list of turns. Each band says Turn 3/12, the first sentence of what was asked, its tokens, cost and model, and gives the day it started when you point at it; ↑ and ↓ jump from turn to turn.',
        // Blueprint, Session Viewer (Show filter; Dialog default since 2.52.0; message colours)
        'Show picks what you see: All, Dialog, you, the agent, tool calls, results or errors. Dialog is where it opens, and a failed tool result comes with a red edge, already open.',
        // Blueprint, Session Replay
        '▶ Replay plays the session step by step at its real pace, gaps capped at 5 seconds, at 1× to 8×, with jumps to the next error or the next prompt and one step back or forward.',
        // Blueprint, Session Viewer (⬇ Export MD 2.81.1: Current view or Everything; filename stamp; header)
        '⬇ Export MD asks first: the current view, with your filters, folds and ticked turns, or everything. The file names the session and the moment, and opens with its id, duration and totals.',
        // Blueprint, Turns Page (one row per user turn, all 5 engines; sort; a row opens the viewer at that turn; turns.list)
        'The Turns page lays out every turn of every session in the farm, one row each, sortable by cost, tokens, duration, tools or errors. A row opens its session at that turn.',
      ],
      set: [
        // Blueprint, settings table
        ['agentFarm.maxTranscriptMessages', '1500', 'The newest messages shown for a very long session.'],
      ],
      // Blueprint, Session Viewer (Context now card, model-aware; 70% yellow, 90% red)
      note: 'A Context now card shows how full the model\'s window was after the last reply, measured against that model\'s own window. It turns yellow at 70% and red at 90%.',
      see: { href: '#me-panel', l: 'A session, live' },
    },

    wiki: {
      fig: ['Mark it, free', 'Only the turns', 'One run compiles', 'One concept a page', 'Nothing locked'],
      // the owner's list §13 (İhtiyaç); Blueprint, LLM Wiki ("where exactly does this belong in the wiki?")
      why: 'Decisions get made in the middle of conversations and are never written up. Stopping to ask where a thought belongs in a wiki is exactly what makes sure it is never written down.',
      how: [
        // Blueprint, Candidate Pool Philosophy (3.201.0: free, reversible, touches no vault files; overlapping tags merge)
        'Marking is free, can be undone and writes nothing: 🔖 on a turn, or Add to Wiki Candidates… on a session, files it under one or more topics. Marking the same turn twice merges into one mark.',
        // Blueprint, Marking Entry Points (turn range 4, 3-7, or blank); the owner's list §13 (Cerrahi tur işaretleme)
        'You mark only the turns that matter, 4 or 3-7 or the whole session, so greetings and commits stay out.',
        // Blueprint, Compilation Engine (wiki.compile; wiki.compile.run headless; the constitution; Wiki Phase 2, Compile Confirmation Strip)
        'Compile Selected or Compile All Pending starts one run on your wiki agent, after a strip shows its engine, model and effort. The agent reads the marked turns, the wiki\'s own rules, its index and the pages already there.',
        // Blueprint, Compilation Engine (Synthesis Rules; Completion Contract); the owner's list §13 (Geçersiz kılma)
        'It updates a page or opens a new one, one concept to a page, every fact footnoted to its transcript and turn. A newer decision does not erase the old one: it is written beside it, with a date.',
        // Blueprint, Compilation Engine (claimed marks; stale claims return to pending); The Wiki Cockpit (🩺 Lint reports and never repairs)
        'A run that crashes or runs out of quota locks nothing: its marks go back to waiting. 🩺 Lint lists orphan pages, broken links and pages missing from the index, and repairs nothing by itself.',
      ],
      set: [
        // Blueprint, Compilation Engine (agentFarm.wikiAgent, default developer)
        ['agentFarm.wikiAgent', 'developer', 'The agent that compiles the wiki.'],
      ],
      // Blueprint, The Wiki Cockpit (filter bar, the shared query grammar; a mark stays pending until the run reports back)
      note: 'The Wiki page shows what is waiting, what it is about and which pages a compile wrote, searchable with the farm\'s query grammar. A mark only reads compiled once the run itself says it wrote the page.',
      see: { href: '#me-panel', l: 'A turn kept and compiled, live' },
    },

    dropbox: {
      fig: ['Drop a file', 'It is a candidate', 'Compiled with the rest', 'Filed as done', 'Nothing lost'],
      // Blueprint, 3.320.0 X-138 (a Claude Web answer, a ChatGPT export, something typed by hand)
      why: 'Much of what you learn never happens in a CLI: an answer in a browser chat, an export from another assistant, a note you typed yourself.',
      how: [
        // Blueprint, 3.320.0 X-138 (into <wikiRoot>/_RAW_, no command, no conversion, no naming rule)
        'Save it into the wiki\'s <code>_RAW_</code> folder. No command, no conversion and no naming rule.',
        // Blueprint, 3.324.0 X-139 (wiki.status and wiki.candidates.list sync; 📄 the file's own name and a RAW badge)
        'The pool notices it the next time it is looked at, and it becomes a candidate under its own file name with a RAW badge, beside the marked turns.',
        // Blueprint, the drop box's brief (rawArchive and rawLink: "- [YYYY-MM-DD] Harici Kaynak: [[…]]" on the page)
        'A compile reads it with the rest, and the page cites it as an outside source, with the date.',
        // Blueprint, "And a compiled drop is moved into _RAW_/_DONE_ — by the agent, in the same breath as the report"
        'The agent moves it into <code>_RAW_/_DONE_</code> in the same breath as it reports the page, so the drop box stays a to-do list rather than a pile.',
        // Blueprint, 3.324.0 X-139 (the file is the identity; a file that vanishes never takes somebody's work with it); 3.320.0 (self-healing)
        'A file you took out of the queue is never brought back by the next scan, and one that disappears only takes its row with it if nobody had touched it. A missing drop box is made again.',
      ],
      // Blueprint, "📥 _RAW_ is on the strip, with the count"
      note: 'The Wiki page\'s strip shows 📥 _RAW_ with how many files wait in it, and pressing it opens the folder.',
      see: { href: '#me-panel', l: 'The drop box in the Wiki page, live' },
    },

    obsidian: {
      fig: ['You curate, agents write', 'Facts in the vault', 'Both sides, no rot', 'Plain Markdown', 'Paths that travel'],
      // the owner's list §13 (Obsidian omurgası; İhtiyaç)
      why: 'Your notes live in one app and your agents\' notes in hidden folders, and the two drift apart. Every change to how things are organised leaves a trail of documents that are no longer true.',
      how: [
        // Blueprint, LLM Wiki ("Obsidian is the IDE, LLM is the programmer, wiki is the codebase"; a user never authors 00_WIKI by hand)
        'Obsidian is the IDE, the model is the programmer, the wiki is the codebase. You never write the wiki: agents do, and you read, link and correct it in Obsidian.',
        // Blueprint, the master blueprint §0.1 (PRINCIPLE: single source of truth — facts in the vault, methods in CLAUDE.md and _REF/)
        'Facts live in the vault: plans, backlogs, decisions, your preferences. Methods live with the agents, in their CLAUDE.md and reference files. An agent points to where a fact lives instead of copying it into its own memory.',
        // the owner's list §13 (Obsidian omurgası: both sides, a rule applied to both, human documents updated on every structural change)
        'Your side and the agents\' side live next to each other. A rule you set is applied to both without asking, and every change of structure updates your documents as well, so nothing goes stale.',
        // Blueprint, the project documents ("Ticking a plan item changes exactly one character"; "Every write goes through one guarded, atomic path"); Obsidian Tasks Metadata Syntax Protection
        'Everything stays Markdown Obsidian understands: ticking a plan item changes one character of the file, the Tasks plugin\'s icons are left intact, and a write is refused if Obsidian saved the file in between.',
        // Blueprint, 3.384.0 X-188 (${vault} ${home} ${today}…; an unresolved variable cancels the path); the owner's list §5 (open in the editor, the preview, Obsidian or your own app)
        'Folder settings can say <code>${vault}</code>, <code>${home}</code> or <code>${today}</code>, and a variable with nothing behind it cancels the path rather than guessing one. Pages open in the editor, its preview, Obsidian or an app of your choice.',
      ],
      // Blueprint, Wiki Phase 2 (Settings & Vault Health: 3-file health check, 🛠 Start the wiki here); The Wiki Cockpit (vault strip, each missing file marked ⚠)
      note: 'Settings checks the wiki\'s three files, its rules, its index and its log, and offers 🛠 Start the wiki here when they are missing. Until they exist, the compile buttons say why they will not run.',
      see: { href: '#me-vault', l: 'The vault, live' },
    },

    search: {
      fig: ['Every engine', 'One grammar', 'The exact message', 'By meaning', 'I know the id'],
      // Blueprint, Transcript Search ("I discussed this with an agent, but which one?"); the owner's list §11 (İhtiyaç)
      why: '"Which session did we decide that in?" With hundreds of sessions on five engines, scrolling is not an answer.',
      how: [
        // Blueprint, Transcript Search ("Every engine (3.114.0)"; content badges You · Agent · Delegator · Handler · Tools · Results, + Memory and Events)
        'Search reads Claude Code, Codex, Gemini and Antigravity transcripts with the parser the session view uses, and each result carries its engine. You choose what to look in: you, the agent, one agent\'s brief to another, tools, results, and the agents\' memory notes.',
        // Blueprint, The query language (3.84.0) — one grammar, every box that searches
        'One grammar works in every search box of the extension: <code>foo bar</code> for both, <code>OR</code>, <code>-foo</code> to leave out, parentheses, <code>"an exact phrase"</code>, <code>refact*</code>, whole words or regex. A half-typed query is not an error.',
        // Blueprint, Transcript Search (grouped per session with turn sub-headers; scrolls to the exact matching message; matches found · previews shown · sessions matched · sessions scanned)
        'Results come grouped by session under the turn they were in, and a click opens the session at that very message. The page says how many matched and how many it showed, so a preview limit never passes for the whole answer.',
        // Blueprint, Transcript Search (Meaning mode; embeddingsProvider gemini / openai, Ollama fully local; runs only on Search; scope); Coverage and honest boundaries (Meaning search: Claude Code index only)
        'Meaning finds passages by what they were about, through Gemini or any OpenAI-compatible endpoint, Ollama included, which keeps it on your machine. It covers Claude Code conversations and says how many others are outside it, and it runs only when you press Search, since a query may be a paid call.',
        // Blueprint, Transcript Search ("I know the id" X-34, 3.117.0)
        'Paste a session id, or its first 8 characters, and Find session ID opens it on whichever engine it ran.',
      ],
      set: [
        // Blueprint, settings table
        ['agentFarm.embeddingsProvider', 'off', 'Meaning search: gemini, or openai for any compatible endpoint, Ollama included.'],
        ['agentFarm.semanticMaxSessions', '300', 'How many recent sessions the meaning index covers.'],
      ],
      // Blueprint, Transcript Search ("It is fast now", X-42: 58 ms; a cache and never your transcripts)
      note: 'A fleet-wide search answers in milliseconds from a cache of the conversations\' text, built the first time you search. It is a cache, never your transcripts: losing it costs a rebuild and nothing else.',
      see: { href: '#me-panel', l: 'Search, live' },
    },

    recall: {
      fig: ['What it recalled', 'Born in the index', 'Contradictions', 'Distilled, with a diff', 'A graph of it'],
      // Blueprint, Memory Management ("whether it's actually used is measured"); Health: Context Load
      why: 'Agents keep memory files, and an index of them loads into every session. Nobody knows which files are ever read, which ones the index has lost, or which say the opposite of another.',
      how: [
        // Blueprint, Memory Management (Status at a glance; Recall tracking)
        'Each agent\'s memory reads like <em>12 files · ~6k tok · 7 recalled (30d)</em>, and each file says <em>recalled ×5, last 2h</em> or <em>not recalled</em>. Recalled means the agent opened it with a tool, counted from its own sessions.',
        // Blueprint, Memory Management (New Memory File; Orphan flag; Fix Memory Index); Memory on the bridge (memory.add)
        'A new memory file and its line in the index are written together, from the page or by the agent over the bridge, so none is born lost. A file the index does not name is marked ⚠ orphan, and Fix Memory Index adds or drops lines, with a backup.',
        // Blueprint, Memory Management (Scan Memory Contradictions 2.16.0)
        'Scan Memory Contradictions has a cheap model read the files against each other and list the claims that disagree: which two files, which two sentences. The findings are advice, not edits.',
        // Blueprint, Memory Distillation; Health: Stale Memory
        'A bloated or stale file can be distilled: a draft merges the repeats, marks contradictions and sets old lines aside, you read it as a diff, and Apply writes it with a backup.',
        // Blueprint, Memory Graph; Memory Synchronization (Compare, Sync, Merge Draft); Semantic Memory Query (Ask Fleet Memory)
        'The Memory Graph draws the links between records: recalled ones green, ones missing from the index ringed, plus broken links, islands and hubs. Copies that drifted apart across agents can be compared, synced or merged, and Ask Fleet Memory searches every agent\'s memory by meaning.',
      ],
      set: [
        // Blueprint, settings table
        ['agentFarm.staleMemoryDays', '45', 'A memory file untouched this long is flagged as stale.'],
        ['agentFarm.contextBudgetTokens', '8000', 'The weight of what loads into every session before a warning.'],
      ],
      // Blueprint, Health: Context Load (CLAUDE.md + memory/MEMORY.md + .agents/AGENTS.md)
      note: 'CLAUDE.md, the memory index and AGENTS.md load at the start of every session and are paid for every time, so an agent whose fixed load passes its budget gets a warning.',
      see: { href: '#me-panel', l: 'The Memory Graph, live' },
    },

    machines: {
      fig: ['Mirror it', 'Name it', 'The ⇄ badge', 'Counted right', 'Read-only'],
      // Blueprint, Scale and Portability ("When the fleet doesn't fit on a single machine")
      why: 'Agents on a laptop and a desktop are two farms. The history and the cost of one never show up on the other.',
      how: [
        // Blueprint, Multiple Machines (Syncthing, OneDrive, an SSH copy)
        'Mirror the other machine\'s <code>.claude</code> folder onto this one with any sync tool: Syncthing, OneDrive, a copy over SSH.',
        // Blueprint, Multiple Machines (agentFarm.extraClaudeDirs { name, dir })
        'Name it in one setting, such as <code>{ "name": "laptop", "dir": "D:/sync/laptop/.claude" }</code>.',
        // Blueprint, Multiple Machines (⇄ laptop badge; cost, scorecard and search cover them); the owner's list §11 (Diğer makineler)
        'Its sessions join the same tables with a ⇄ laptop badge, and cost, scorecards and search all cover them.',
        // Blueprint, Multiple Machines (agent matching by working directory; Other projects (laptop))
        'Sessions are matched to agents by their working folder, so the same layout on both machines counts each to the right agent; the rest gather under Other projects (laptop).',
        // Blueprint, Multiple Machines (writes nothing to the remote folder; warning when projects is missing)
        'Agent Farm writes nothing into the mirrored folder. If its projects folder is missing at startup, it warns you that the sync may have stopped.',
      ],
      set: [
        // Blueprint, settings table
        ['agentFarm.extraClaudeDirs', '[]', 'Other machines\' synced .claude folders, each with a name.'],
      ],
    },

    reports: {
      fig: ['A scorecard', 'Cache efficiency', 'On its own', 'What the jobs made', 'Into your vault'],
      // Blueprint, Fleet Report; Task Outputs Digest ("the at-a-glance answer at the end of the day")
      why: 'The farm works while you are elsewhere. At the end of a week you want one page that says what it did and what it cost, in the place you keep everything else.',
      how: [
        // Blueprint, Fleet Report (7/30/90 days; contents)
        'Export Fleet Report writes a Markdown scorecard for 7, 30 or 90 days: totals, every agent side by side with sessions, cost, tokens, tools, error rate, cache efficiency, context load and memory, the models used, the most expensive sessions and the health findings.',
        // Blueprint, Fleet Report (Cache efficiency)
        'Cache efficiency is the share of prompt tokens read from cache. High means the same context is read cheaply again and again; low points to short sessions that could be one.',
        // Blueprint, Automatic Report (to the Vault) (autoReport daily/weekly; checked hourly; file names)
        'Set it to daily or weekly and the report appears by itself, <code>AgentFarm-Report-2026-W28.md</code>, checked every hour while VS Code is open.',
        // Blueprint, Automatic Report (Task outputs section, 0.7.0); Task Outputs Digest (today / 7 / 30 days; ⛔)
        'What your scheduled jobs and workflows produced in the period is added as its own section, and the Task Outputs Digest gathers it alone for today, 7 or 30 days, failed runs marked ⛔.',
        // Blueprint, Automatic Report ("a regular scorecard drops into your Obsidian vault"); Task Outputs Digest (default save location autoReportFolder)
        'Both land in the folder you name, usually in your vault, where they are linked and searched like any other page.',
      ],
      set: [
        // Blueprint, settings table
        ['agentFarm.autoReport', 'off', 'Write the fleet report by itself: daily or weekly.'],
        ['agentFarm.autoReportFolder', '', 'The folder the reports are written to, such as one in your vault.'],
        ['agentFarm.autoReportDays', '7', 'How many days a report covers.'],
        ['agentFarm.autoReportIncludeOutputs', 'true', 'Add the task outputs of the period to the report.'],
      ],
      // Blueprint, Daily Digest Card (Pocket); the owner's list §5 (Haftalık proje özeti, projectDigestDay)
      note: 'The day\'s scorecard can also reach your phone over Telegram, and each project gets its own weekly summary.',
      see: { href: '#me-vault', l: 'A report in the vault, live' },
    },
  },

  faq: [
    // Technical DNA §4.4 (SessionIndex reads each CLI's own transcripts); Transcript Search (a cache and never your transcripts); Dashboard (Rename: the transcript file is untouched)
    ['Does Agent Farm copy my conversations somewhere?', 'No. They stay where each CLI writes them. Agent Farm reads them, and keeps an index and a search cache it can rebuild at any time; even renaming a session leaves its transcript untouched.'],
    // Blueprint, The Wiki Cockpit (docOpen: Obsidian / VS Code / a custom app); LLM Wiki
    ['Do I need Obsidian?', 'The wiki is a folder of Markdown pages, written for Obsidian, where the links and the graph come alive. Pages can just as well open in VS Code or an app of your choice.'],
    // Blueprint, Candidate Pool Philosophy; Wiki Phase 2 (Compile Confirmation Strip)
    ['Does building the wiki cost money?', 'Marking costs nothing. A compile is one run on your wiki agent, metered like any task, and before it starts a strip shows the engine, model and effort it will use.'],
    // Blueprint, Transcript Search (Meaning mode: embeddingsProvider; Ollama fully local; off by default)
    ['Does searching by meaning send my conversations out?', 'It is off until you choose a provider. With a cloud provider the passages go to it to be indexed; with Ollama everything stays on your machine. Text and regex search never leave it.'],
    // Blueprint, Session Viewer ("External transcripts are real transcripts (3.112.0)": Antigravity's historical store is protobuf with no schema)
    ['Can it read every old conversation?', 'Claude Code, Codex, Gemini and OpenCode, yes. Antigravity stored its older conversations in a form with no published schema, so only the ones Agent Farm hosted itself, which it writes out as plain JSON, open in full.'],
    // Blueprint, the master blueprint §0.1 (facts in the vault, methods with the agents); Memory Management
    ['What is the difference between an agent\'s memory and the wiki?', 'An agent\'s memory is its own notes, loaded through its index into every session it starts. The wiki is shared knowledge, compiled from sessions for you and every agent, and it lives in your vault.'],
  ],
};
