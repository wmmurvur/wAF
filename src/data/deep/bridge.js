// District VIII, Just ask: the words of its page (/features/just-ask/). Names, sentences and tile figures are in
// data/features.js; this file holds what the page says beyond them. Every rule, default and setting key was read in the
// extension's own guide (the Blueprint, cited by section heading: "Farm Bridge and CLI Helper", "Agent Manual", "Zero
// Parity Gap Guarantee", "Agents Tree", "Standing Duties", "Toolbox", "Capability Matrix", "Reaching the Farm from
// Outside", "Two-Way Chat Cockpit", "Agent Packs" and the release notes named), its Technical DNA (cited by §) or the
// owner's ranked feature list (§9, §10); the citations are the comments. Agents, files and figures in the figures are
// demo data. how and note may hold <code> and <em>; everything else is plain text. fig: a short label per step of how,
// shown on the step and under the feature's figure (scripts/figs/bridge.js draws the figures).

export default {
  description: 'Tell an agent what you want and it sets the farm up for you: one shell command any agent can run, an operation for every button, agents with their own folders and duties, a matrix of who has what, and the farm in your pocket by phone, Telegram, sound and voice.',
  promise: 'You never have to learn the farm. Say it in a chat, and the agent looks up how, does it one call at a time and shows you each call. When you leave the desk the farm comes with you: a card on your phone, a tone from the next room, a voice that says which agent wants you.',

  features: {
    bridge: {
      fig: ['One sentence', 'It looks first', 'It calls', 'You see it', 'Told at the start'],
      // owner's feature list §9 (agents operate the farm, not only people)
      why: 'A farm with hundreds of switches is one you would have to learn. Most people never will, and should not have to.',
      how: [
        // Blueprint, Farm Bridge — Agents Use the Farm Themselves (2.78.0)
        'Say what you want in a chat with any agent: "make a weekly video for the channel, every Monday at 7". There is no form to find and no setting to look up.',
        // Blueprint, Agent Manual (farm.find, farm.ops op=; answered locally from manual.json, VS Code closed)
        'The agent looks it up first. <code>farm.find</code> turns your sentence into the playbooks and operations that fit, and <code>farm.ops op=…</code> gives the exact contract of one. Both answer on the spot from a manual kept beside the bridge, even while VS Code is closed.',
        // Blueprint, Farm Bridge (handler calls the same manager the UI calls; Technical DNA §3.1); recipe and schedule ops
        'Then it calls, one command at a time: <code>workflows.addRecipe</code> installs the weekly recipe and <code>schedules.add</code> puts it on Mondays at 07:00. Each call does what the button would, through the same code.',
        // Blueprint, Farm Bridge (every processed request shows as a notification); Agent Manual (effects, asks)
        'Every call shows up as a notification, <em>Agent Farm bridge: schedules.add — ok</em>, and the farm changes in front of you. An operation that deletes says so in its contract, and some ask you first.',
        // Blueprint, Agent Manual (start card ~300 tokens; SessionStart hook; first prompt; manual.install)
        'Every session is told the way in when it starts. Claude Code and Codex get a start card of about 300 tokens through their start hook; Gemini, Antigravity and OpenCode runs that Agent Farm starts carry it in front of the first prompt. For sessions started elsewhere, <code>manual.install</code> adds an agent-farm skill.',
      ],
      set: [
        // Blueprint, Agent Manual
        ['agentFarm.agentManual.startCard', 'card', 'What a session is told when it starts: the whole card, one line, or nothing.'],
      ],
      // Blueprint, Agent Manual ("It cannot drift": test_manual_content.js)
      note: 'The manual cannot drift from the farm: the build fails when an operation has no description, or when a guide names an argument the operation does not have.',
      see: { href: '#bg-chat', l: 'A chat that sets up the farm, live' },
    },

    ops: {
      fig: ['Same as a click', 'The build checks', 'What stays yours', 'Find one', 'Plans first'],
      // Blueprint, Toolbox ("…it can WRITE, which for a while it could not": "open the page yourself")
      why: 'If an agent can do only half of what you can, every request ends with "open the page yourself".',
      how: [
        // Blueprint, Agent Manual ("Every function of Agent Farm is a bridge op"); owner 2026-10-12: 579; Technical DNA (~75 namespaces)
        'Every button, right-click item and command in Agent Farm has a bridge operation that does the same thing through the same code. There are 579 of them in about 75 areas, and the number only grows.',
        // Blueprint, Zero Parity Gap Guarantee (parity.manifest.json, gapBudget 0, test_parity.js)
        'A test keeps it that way. <code>parity.manifest.json</code> maps every command, menu item and panel message to its operations, and a new button without one fails the build. The budget for gaps is zero.',
        // Technical DNA (exemptions navigation · visual · file-picker · secrets · human-only); Blueprint "Not on the bridge on purpose"; Question Auto-Timer (no bridge op can stop it)
        'Some things stay off it on purpose: moving the view, a file picker, a secret\'s value, and the acts that stay human. An agent can answer a question but never grant a tool permission, and only your own Stop halts a question\'s countdown.',
        // Blueprint, Agent Manual (farm.ops index by area; op=; errors that teach); Farm Bridge (a new op joins with one register line)
        'An agent finds what it needs: <code>farm.ops</code> answers an index by area, <code>farm.ops op=tasks.add</code> one exact contract. A misspelt operation is answered with the closest names, and a new one is in the catalog the day it ships.',
        // Blueprint, Agent Manual (ops.meta.json: read · write · run · destructive · ui; asks; plans first; manual.install confirm=true)
        'Each operation says what it does to the farm: read, write, run, destructive or ui, and whether it asks first or plans first. One that plans first only says what it would do, until it is called again with <code>confirm=true</code>.',
      ],
      // Blueprint, Farm Bridge (farm.ops full=true --out: never read into a model's context); Evidence-Based Session
      // Identification (sessions.whoami: an argument, the environment, the process registry; never the folder)
      note: 'The full catalog, <code>farm.ops full=true</code>, is large, so it is written to a file with <code>--out</code> and never read into a model\'s context. An agent can ask about itself too: <code>sessions.whoami</code> names the session it is, worked out from its own process tree, never guessed from the folder, where several sessions often run at once.',
      see: { href: '#bg-asks', l: '"What can you do in the farm?", live' },
    },

    mcp: {
      fig: ['One command', 'Same everywhere', 'Files underneath', 'Safe in any shell', 'Gatekeeper as MCP'],
      // Technical DNA §3.1 (external entry points: af.js, the Kapıcı MCP server, the phone contract)
      why: 'A tool only one kind of agent can call splits the fleet in two: the agents that can drive the farm and the ones that cannot.',
      how: [
        // Blueprint, Farm Bridge and CLI Helper; Bridge.astro start line ("it is not an MCP tool")
        'The bridge is not an MCP tool. It is one shell command, <code>node "$HOME/.agentfarm/af.js" &lt;op&gt;</code>, so whatever can run a command can use it: Claude Code, Codex, Gemini, Antigravity, OpenCode, a script or a scheduled job.',
        // Blueprint, Agent Manual ("One address on every machine")
        '<code>~/.agentfarm/af.js</code> is a small launcher written at every start. The same line works in bash, zsh and PowerShell, on any system and any flavour of VS Code.',
        // Technical DNA §3.1 (request → claim → pending → response; one runner window)
        'Underneath, a call is files. The request lands in the bridge folder, the window that runs the farm claims it and leaves a pending note, and the answer is written beside it. Only that window answers, so two open windows never do a thing twice.',
        // Blueprint, Usage Modes (key=value, @args.json, --out UTF-8 without a BOM)
        'Arguments go as <code>key=value</code>, which needs no quoting in any shell, or as <code>@args.json</code> for long text. <code>--out</code> writes the answer to a file as UTF-8 without a BOM, where a PowerShell redirect would garble it.',
        // Blueprint, Kapici "As an MCP server (B-28)"; Technical DNA §3 (registered in ~/.claude.json only on request)
        'Gatekeeper also comes as an MCP server with three tools, <code>kapici_eval</code>, <code>kapici_ask</code> and <code>kapici_rules</code>. It holds no key and calls the bridge, and it is added to <code>~/.claude.json</code> only when you ask.',
      ],
      // Technical DNA §3.1 (default timeout 20 s; pending marker = still running, none = nothing ran); Blueprint, Farm Bridge (waits for the next window)
      note: 'A call waits 20 seconds by default. If it times out, af.js says which: the farm took it and is still running, or nobody took it and nothing ran. With VS Code closed, the request waits for the next window.',
      see: { href: '#bg-log', l: 'The calls as they happen, live' },
    },

    agents: {
      fig: ['Its own folder', 'Duties', 'A duty on a trigger', 'The Toolbox', 'A real probe'],
      // Blueprint, Standing Duties ("Over time these multiply and get muddled")
      why: 'An agent that is only a prompt forgets what it is for, and the standing agreements you made with it end up scattered in old chats.',
      how: [
        // Blueprint, Agents Tree (Identity, Duties, Memory, Tools, MCP, Skills, Permissions, the last 15 sessions)
        'Each agent is a folder: its identity in CLAUDE.md, its memory files, its tools, its MCP servers, skills and permissions. The farm finds them in the folders you name, and a folder you exclude stays out, in one click and back. The Agents tree shows each with its token size, its use over 30 days and its last 15 sessions.',
        // Blueprint, Standing Duties (DUTIES.md; cadences; "3 waiting", "changed 2h ago"; read 2h ago / never read)
        'Duties are standing agreements in DUTIES.md: a title, a cadence (every turn, at session start, daily, weekly or by hand), what to watch and what to do. The tree shows what is waiting, such as <em>3 waiting</em>, and whether the agent has read the file at all.',
        // Blueprint, Standing Duties (Automate Duty: watch trigger, debounce 10 s, cooldown 60 s, at most 6 an hour)
        'A duty only works while the agent runs. <code>Automate Duty</code> turns one into a watch trigger, so the work starts even while the agent is idle, with the usual guards: 10 seconds of quiet, 60 seconds of rest, 6 an hour.',
        // Blueprint, Toolbox (Skills, Subagents, Commands, MCP, Hooks, Plugins, Output Styles; user and agent scope; scaffold, remove with backup, plugins enable/disable)
        'The Toolbox shows everything that extends Claude Code, for each agent and for all of them: skills, subagents, commands, MCP servers, hooks, plugins and output styles. It scaffolds a new skill, subagent or command, removes any one with a backup, and switches plugins.',
        // Blueprint, Toolbox (MCP tab — with a real probe; per-agent disable; surgical edit of ~/.claude.json)
        'Its MCP tab really connects to each server and lists the tools it offers, with their parameters. A server can be switched off for one agent, and removing one edits <code>~/.claude.json</code> and leaves the rest of the file byte for byte.',
      ],
      set: [
        // Blueprint, Settings tables
        ['agentFarm.agentRoots', '[]', 'The folders scanned for agents. It starts empty: you add your own.'],
        ['agentFarm.newAgentModel', 'sonnet', 'The model a new agent starts with.'],
        ['agentFarm.contextBudgetTokens', '8000', 'How many tokens an agent\'s fixed files may load.'],
        // Blueprint, settings table; Agent folders section (2.61.0: Exclude / Include)
        ['agentFarm.excludeAgentDirs', '[]', 'Folders never treated as agents, even when they look like one.'],
      ],
      // Blueprint, Standing Duties (Add Duty from Template…; Copy Duty to Agent…)
      note: 'Duty templates set up the common ones in one pick: a question-and-answer loop, inbox triage, weekly memory upkeep, an output folder. A duty can be copied to another agent.',
    },

    matrix: {
      fig: ['Who has what', 'Used or idle', 'Copy it over', 'Memory that drifted', 'Duties and tasks'],
      // Blueprint, Capability Matrix ("which is dead weight")
      why: 'With ten agents nobody remembers which one has which skill, which MCP server is dead weight, or which copy of a memory file is the new one.',
      how: [
        // Blueprint, Capability Matrix (Skills × Agents, MCP servers × Agents)
        'The Capability Matrix puts the fleet in one grid: a row per skill or MCP server, a column per agent.',
        // Blueprint, Capability Matrix (cells; yellow ● for a row no agent used in 30 days)
        'A green number is how often it was used in the last 30 days; a faint ✓ is installed and never used; ⏻ is switched off on that agent. A row nobody used in 30 days gets a yellow dot: something to clean up.',
        // Blueprint, Capability Matrix (＋ copies; more than one donor → always a picker; variants grouped by content)
        '＋ means not installed: click it to copy the capability from another agent. When there is more than one copy to take it from, you always choose, and identical copies are grouped as one variant.',
        // Blueprint, Capability Matrix (Memory files matrix; orange ring = diverged; per-folder recall counts)
        'A memory matrix shows same-named memory files across agents, with how often each was read. An orange ring marks a copy that has drifted from the newest one.',
        // Blueprint, Capability Matrix (Duties matrix; Tasks matrix: the 30 busiest families)
        'Duties and tasks have a matrix too: each duty\'s cadence per agent, and the 30 busiest task families with how their runs ended.',
      ],
      // Blueprint, Capability Matrix (usage counted from session logs)
      note: 'Use is counted from the agents\' own session logs, so it is what they did, not what their settings say.',
    },

    phone: {
      fig: ['Pair it', 'Now', 'Answer from it', 'Woken, not told', 'A page for any device'],
      // owner's feature list §10 ("Masadan kalkınca filonun durması ya da habersiz kalmak")
      why: 'The moment you leave the desk, a question waits unseen, and the run behind it stands still until you are back.',
      how: [
        // Blueprint, the 📱 Mobile tab (Devices); Technical DNA §3 (pinned self-signed cert, 10-min pairing codes, device keys)
        'Pair the Agent Farm phone app from <code>📱 Mobile → Devices</code> by scanning a QR code. The connection is encrypted with a certificate made on your machine and pinned in the code, and the pairing code lasts 10 minutes.',
        // Blueprint, the 📱 Mobile tab (◉ Now: what waits, what runs, today); Technical DNA §3 (numbered event log, resumeAfter replay)
        'The phone opens on Now: what waits for you, what runs, and today. If the connection drops, it catches up on what it missed when it is back.',
        // owner's feature list §10 (a bottom drawer that does not take the desk's focus; per-device token, one-click revoke)
        'A question or a permission opens in a drawer at the bottom; one tap answers it, and your desk keeps its focus. Each phone has its own key and its own scope, and one click revokes it.',
        // Blueprint, "A sleeping phone is woken, never told" (X-451: only {wake, farm}); X-449 (farm.away, farm.open starts VS Code)
        'A sleeping phone is woken, not told: the push carries only a wake-up and which farm, and the phone fetches the rest over its own connection. With VS Code closed, the phone sees since when, and can start it.',
        // Blueprint, Read-Only Mobile Web Cockpit (token required; 20 s snapshot; no QR when bound to this machine)
        'Or switch on the read-only web page: made for a thumb, refreshed from the farm every 20 seconds, behind a token. Bound to this machine it shows no QR code, because a phone could not reach it; bind it to your network and scan.',
      ],
      set: [
        // Blueprint, Ports and their defaults
        ['agentFarm.web.enabled', 'off', 'The read-only web page.'],
        ['agentFarm.web.port', '8378', 'The port it answers on.'],
      ],
      // Technical DNA (phone remote host 7443, TLS; scopes read · answer · manage · admin; phones pair at manage)
      note: 'The app talks to your own machine on port 7443, nothing goes through a server of ours. Its scopes are read, answer, manage and admin; a phone pairs at manage.',
      see: { href: '#w-phone', l: 'The phone, live' },
    },

    telegram: {
      fig: ['Connect', 'A card per turn', 'One tap', 'Four gates', 'Start from the chat'],
      // Blueprint, Two-Way Chat Cockpit
      why: 'A turn that ends while you are out should reach you where you already are, and your reply should reach the agent.',
      how: [
        // Blueprint, Two-Way Chat Cockpit (token checked, kept in the vault; outbound long polling)
        '<code>Connect Telegram…</code> checks your bot\'s token with Telegram and keeps it in the secret vault, never in a settings file. No port is opened: the farm asks Telegram for new messages, outbound only.',
        // Blueprint, Rich Turn Digest Cards (the agent's own closing words, what it waits on, tokens, cost; 4096 characters)
        'When a turn ends or an agent asks, a card arrives: the agent\'s own last words rather than a summary, what it waits on, its tokens and its cost.',
        // Blueprint, Interactive Inline Buttons
        'Buttons answer it: the question\'s options, Allow or Deny for a permission, Continue, Cancel, and 📄 Diff for what changed in the working folder.',
        // Blueprint, Four Strict Execution Gates (alive, budget, risky command, busy; queue of 10 or steer)
        'What you type passes four gates: is the session alive, is today\'s budget left, does it look like a risky command such as <code>rm -rf</code> (then it asks), and is a turn running. If one is, your message waits in a queue of up to 10, or steers the turn if you prefer.',
        // Blueprint, The 11th Launch Door (/new seeds the last launch); Command Reference
        '<code>/new &lt;agent&gt; [prompt]</code> starts a real Console session on your desk, with the agent\'s last setup. <code>/focus</code>, <code>/sessions</code>, <code>/status</code> and <code>/cancel</code> steer the rest.',
      ],
      set: [
        // Blueprint, 3.346.0 (an empty allowlist refuses every message); owner's feature list §10
        ['agentFarm.telegram.allowedChats', '[]', 'The chats it listens to. Empty, every message is refused.'],
        // Blueprint, Four Strict Execution Gates
        ['agentFarm.telegram.maxDailyUSD', '$1', 'What turns started from Telegram may spend in a day.'],
        ['agentFarm.telegram.whenBusy', 'queue', 'A message sent during a turn: wait for it to end, or steer it.'],
        // Blueprint, settings table (notifyWebhookUrl empty; dailyDigest off); Daily Digest Card (Pocket)
        ['agentFarm.notifyWebhookUrl', 'empty', 'A webhook of your own that notifications are passed on to, such as n8n into a chat.'],
        ['agentFarm.dailyDigest', 'off', 'A time such as 21:30 to send the day\'s scorecard to that webhook.'],
      ],
      // Blueprint, The 11th Launch Door (every turn of the session counts against the budget); the owner's list §10
      // (permission, stall, budget, flow done or failed, summary to a webhook); Daily Digest Card (no model call)
      note: 'The budget counts every turn of a session started from the chat, wherever the turn was typed. Notifications can also go to a webhook of your own: permissions, stalls, budgets, a workflow done or failed, the weekly summary, and once a day a scorecard of the cost, the agents, the top spenders and the warnings, made without calling a model.',
      see: { href: '#w-phone', l: 'Telegram on the phone, live' },
    },

    sound: {
      fig: ['A tone per event', 'Yours to pick', 'One at a time', 'Quiet', 'A second ring'],
      // Blueprint, 3.306.0 (eight lanes, one noise); 3.308.0 (telling "your turn" from "it is asking you")
      why: 'Eight agents finishing in eight lanes: you cannot watch them all, and one ding cannot say whether an agent is stopped and waiting or simply done.',
      how: [
        // Blueprint, 3.308.0 (ten tones that are ten different objects: Crystal, Intercom knock…); 3.300.0 (the events: question, error, stalled, ended, turn-ready)
        'Each kind of news has its own tone: a question, an error, a stalled session, a session that ended, a finished turn. The ten made for it are ten different objects, struck glass, a knock on a panel, a bell, so they can be told apart from the next room.',
        // Blueprint, 3.303.0 (session → agent → settings → default); 3.312.0 (Sound on finish: default, a tone, silent); alertVoices.ts CUSTOM_LIMIT 10
        'A tone can belong to one session, one agent, your settings or the default, in that order. A task, a schedule or a trigger can say how it sounds when it ends, or that it ends in silence. Up to ten sounds of your own can join them.',
        // Blueprint, 3.306.0 (one queue; question, error, stalled, ended, then the rest; 500 ms from the end; over six, the least urgent goes)
        'When several agents finish together the sounds play one at a time, the most urgent first, half a second apart. With more than six waiting, the least urgent is dropped, and says so.',
        // Blueprint, 3.305.0 (🔇 in the status bar; quiet hours wrap midnight; mute one conversation)
        'A 🔇 in the status bar mutes the farm in one click, quiet hours may wrap past midnight, and one conversation can be muted on its own.',
        // Blueprint, 3.313.0 (Nudge after [3] min, [2] × [tone]; "2 waiting")
        'A question nobody answers can ring again, for instance after 3 minutes, twice, in a tone you pick. The strip says how many questions are waiting for that second ring.',
      ],
      // Blueprint, 3.308.0 ("alerts ship OFF"); 3.305.0 (🔇 appears the first time anything is armed)
      note: 'Sounds ship off. Nothing rings until you turn it on, and the 🔇 appears only once something can ring.',
      see: { href: '#w-sp', l: 'The Sound page, live' },
    },

    voice: {
      fig: ['Which agent', 'Read the answer', 'In its language', 'A selection', 'The briefing'],
      // Blueprint, 3.314.0 ("A tone says something happened… Neither says what it answered")
      why: 'A tone says that something happened. It cannot say which agent, or what it said, and for most turns the answer is one sentence long.',
      how: [
        // Blueprint, 3.309.0 (System.Speech / say / spd-say; no network; ships off, announces only question)
        'After the tone, a voice can say which agent it is, with the speech already on your machine: Windows\' own voices, <code>say</code> on a Mac, <code>spd-say</code> on Linux. No network, no account, no model. Out of the box it speaks only for a question.',
        // Blueprint, 3.314.0 (🔊 Read this session aloud; per session only; one reader per window)
        'Right-click a session, <code>🔊 Read this session aloud</code>, and every turn it finishes is read out in that session\'s voice. One reader per window: a newer answer cuts off an older one.',
        // Blueprint, Live Dialogue Speaker (sanitizeForSpeech); 3.311.0 (every voice with its language; a name nothing answers to is warned)
        'Code and formatting are left out of what is read, and each answer is read by a voice that speaks its language. The voice list shows every voice on the machine with its language, and warns when a name you set matches none.',
        // readSelection.ts (the tile's source)
        'Select text anywhere in VS Code and have it read aloud.',
        // Blueprint, Voice Briefing (fal.ai TTS → mp3 into digestTtsFolder); district III, Spoken briefing
        'The daily briefing can be read too: by this computer for free, or as an mp3 made by a voice model on fal.ai, saved to a folder your phone syncs.',
      ],
      // Blueprint, 3.314.0 ("It is not part of the alert plan")
      note: 'Reading is not an alert. A muted farm still reads the session you asked it to, and a long reading never holds the short tones up behind it.',
      see: { href: '#w-sp', l: 'Read aloud, live' },
    },

    move: {
      fig: ['One file', 'What stays behind', 'Unpack it', 'A gallery', 'Other engines'],
      // Blueprint, Agent Packs ("templatize an agent and move or share it to another machine")
      why: 'An agent you have tuned for months lives in one folder on one machine. Setting it up again on a laptop, or sharing it, means copying by hand and hoping nothing private comes along.',
      how: [
        // Blueprint, Agent Packs (Export: CLAUDE.md, DUTIES.md, tools/, .claude settings, .mcp.json, workflows/triggers/schedules/templates)
        'Right-click an agent, <code>Export Agent Pack…</code>: one <code>.agentpack</code> file with its CLAUDE.md, duties, tools, Claude settings, MCP servers, and the workflows, triggers, schedules and templates it is part of.',
        // Blueprint, Agent Packs (What NEVER goes in)
        'Its memory and secrets never go in. Files that look like credentials are skipped with a warning, webhook tokens are removed, and <code>{secret:NAME}</code> references stay, to work again on a machine that has a secret of that name.',
        // Blueprint, Agent Packs (Import: fresh MEMORY.md; steps bound; triggers and schedules come in off)
        '<code>Import Agent Pack…</code> asks for a folder and a new name. The agent starts with a fresh MEMORY.md, its workflow steps are bound to it, and its triggers and schedules arrive switched off for you to check.',
        // Blueprint, Agentpack Gallery (packGalleryRepos; safe import; a new webhook token)
        'A gallery of packs can come from git repositories or folders you name. A pack you pick goes through the same safe import, with a new webhook token.',
        // Blueprint, Antigravity Compatibility (Sync Agent with the Other Engines…; AGENTS.md; memory is plain markdown)
        'The same agent can run on Codex or Antigravity: <code>Sync Agent with the Other Engines…</code> writes its rules into the AGENTS.md those engines read. Its memory files are plain Markdown and need no conversion.',
      ],
      set: [
        // Blueprint, Settings tables
        ['agentFarm.packGalleryRepos', '[]', 'Where the pack gallery looks: git addresses or local folders.'],
      ],
      // features.js src: agents.pack.export / import
      note: 'An agent can pack itself too, over the bridge, by the same rules.',
      see: { href: '#bg-asks', l: '"Pack the showrunner for my laptop", live' },
    },
  },

  faq: [
    // Blueprint, "Not on the bridge on purpose"; Question Auto-Timer
    ['Can an agent approve its own permissions?', 'No. An agent can answer a question through the bridge, but granting a tool permission stays with you: in the panel, on your phone or in Telegram. Only you can stop a question\'s countdown, too.'],
    // Blueprint, Agent Manual
    ['Do I have to learn the bridge?', 'No. Every session is told at its start how to reach the farm, and an agent looks up the rest in the farm\'s own manual. You say what you want; each call it makes shows as a notification.'],
    // Blueprint, Agent Manual; Technical DNA §3.1
    ['Does the bridge work with VS Code closed?', 'The manual answers at once. Anything that changes the farm waits for the next VS Code window; af.js gives up after 20 seconds and tells you whether anything ran.'],
    // Blueprint, 3.346.0; Four Strict Execution Gates
    ['Can strangers write to my agents on Telegram?', 'Only the chats on your list are heard; with an empty list, every message is refused. Turns started there have a daily budget, <b>$1</b> out of the box, and a risky-looking command asks before it runs.'],
    // Blueprint, "A sleeping phone is woken, never told"
    ['What does a phone wake-up send through Google?', 'Only that there is something new, and which farm. The phone then reads the rest straight from your machine over its own encrypted connection.'],
    // Blueprint, Agent Packs
    ['What does an agent pack leave out?', 'Its memory and its secrets, files that look like credentials, and webhook tokens. The triggers and schedules in it arrive switched off.'],
  ],
};
