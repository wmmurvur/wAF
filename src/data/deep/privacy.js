// District X, Safe and yours alone: the words of its page (/features/safe-and-yours-alone/). Names, sentences and tile
// figures are in data/features.js; this file holds what the page says beyond them. Every default, limit and setting key
// was read in the extension's own guide (the Blueprint, cited by section heading), its Technical DNA (cited by §) or the
// owner's ranked feature list (cited by its section number); the citations are the comments. The privacy wording is
// the owner's (2026-10-12), and the licence figures come from data/facts.js (`licence`), never typed here.
// how and note may hold <code> and <em>; everything else is plain text. fig: a short label per step of how, shown on
// the step and under the feature's figure (scripts/figs/privacy.js draws the figures and what each step shows).
import { licence } from '../facts.js';

const never = licence.never.join(', ');

export default {
  description: `Agent Farm runs on your machine and nothing about your work comes to us: the free version never contacts us, and a paid licence checks its key ${licence.checkEvery}. Guards stop the shell commands, disk searches, permissions and browser visits an agent should not make, and keys stay out of what a run prints.`,
  promise: `Your work stays on your machine. The free version never contacts us; a paid licence checks its key ${licence.checkEvery}, and that is the whole message. Your engines talk to their own providers, and anything else Agent Farm reaches is a service you switch on. On the machine, guards stop an agent before a command runs, not after: one for the shell, one for disk searches, one for permissions, one for keys and one for the browser.`,

  features: {
    local: {
      fig: ['Inside VS Code', 'Their providers', '127.0.0.1', 'The keychain', 'Your network'],
      why: 'Whatever watches your agents sees all of your work: the code, the prompts, the answers and what they cost. None of that has to leave your machine for the watching to work.',
      how: [
        // Technical DNA §1 (Purpose: "runs no LLM itself … leaves transcripts where each CLI writes them"); §1.3 (globalStorage)
        'Agent Farm runs inside VS Code and runs no model of its own. It starts the CLIs you already have, on your own plans and keys, and reads their transcripts where each CLI writes them. Its own records, the tasks, chains and projects, are files in VS Code\'s storage folder on your disk.',
        // Blueprint, Dashboard: "Plan usage card (3.23.0)" and "One beat, two windows (3.43.0)"; Technical DNA §2.7 (Quota, planusage.ts)
        'Each engine talks to its own provider, as it does without Agent Farm. To show how much of a Claude plan is left, Agent Farm reads that account\'s usage from Anthropic with the sign-in Claude Code already keeps.',
        // Blueprint, Live Observation: "How It Works" and "Security and Performance"; Technical DNA §3.2
        'The live hooks post each session\'s events to a listener on <code>127.0.0.1:8377</code>, which only this machine can reach. The hook always exits cleanly, so a listener that is not there never holds an agent up.',
        // Blueprint, Secret Vault; Technical DNA §3.1 (secret values never cross the bridge), §2.7 (Accounts = directories)
        'Keys go into the OS keychain, never into a file, and their values never cross the bridge to an agent. An account is the CLI\'s own config folder, not a copied credential.',
        // Blueprint, "Read-Only Mobile Web Cockpit (Port 8378) & Built-in QR Engine", "Two-Way Chat Cockpit"; Technical DNA §3.6
        'The read-only phone page needs a token and will not start without one. It listens on this machine until you choose your network, and only then draws its QR code, with Agent Farm\'s own encoder. Telegram opens no port: Agent Farm fetches its messages.',
      ],
      set: [
        // Blueprint, Settings: Reference table
        ['agentFarm.liveMonitor', 'on', 'Runs the live event listener.'],
        ['agentFarm.livePort', '8377', 'The listener\'s port on 127.0.0.1. Installed hooks follow a change without a reload.'],
        // Blueprint, Dashboard: "One beat, two windows (3.43.0)"
        ['agentFarm.planUsageRefreshMinutes', '5 min', 'How often an idle farm reads your plan\'s usage. 0 = only when you ask.'],
      ],
      // Blueprint, Live Observation: "Setup: Install Live Hooks"
      note: 'The hooks go into Claude Code\'s <code>settings.json</code> beside your own entries. The first write keeps an <code>.agentfarm-bak</code> backup, and <em>Remove Live Hooks</em> takes out only Agent Farm\'s entries.',
      see: { href: '#s-local', l: 'The machine, drawn' },
    },

    telemetry: {
      fig: ['Free', 'Paid: one check', 'Never in it', 'Offline', 'Yours to switch on'],
      why: 'Most tools count how they are used and send the count home. You are left to trust what is in it.',
      how: [
        // the owner, 2026-10-12 (data/facts.js licence)
        'The free version never contacts us. There is no account with us and no request to a server of ours.',
        `A paid licence checks its key ${licence.checkEvery}. The whole message is the key, a hash of the machine and the version. The answer is whether the key is valid, and until when.`,
        // Blueprint, Data and Privacy ("No telemetry. The extension collects no data and reports nowhere.")
        `Never in it: ${never}. There is no telemetry and no analytics in the extension, so nothing counts what you use.`,
        `If the check cannot reach us, the licence keeps working for ${licence.offlineDays} days.`,
        // Blueprint, Data and Privacy; Settings: Reference table; Kapici; Two-Way Chat Cockpit
        'Anything else Agent Farm reaches is a service you switch on, with your own key: a voice for the briefing, media models in Studio, Jev for Gatekeeper, Telegram, a webhook you name.',
      ],
      set: [
        // Blueprint, Settings: Reference table
        ['agentFarm.digestTtsModel', 'empty', 'The fal.ai voice model the briefing is read with.'],
        ['agentFarm.embeddingsProvider', 'off', 'Semantic search through gemini or openai, Ollama included.'],
        ['agentFarm.notifyWebhookUrl', 'empty', 'A webhook to forward notifications to.'],
        // Blueprint, Kapici: "every consumer will get its own agentFarm.kapici.<consumer> = off · shadow · on, default off"
        ['agentFarm.kapici.dispatch', 'off', 'Asks Gatekeeper which agent takes a request. Each use of Gatekeeper has its own switch, and all start off.'],
      ],
      // Blueprint, Scale and Portability: "OpenTelemetry Export"
      note: '<em>Export Traces (OpenTelemetry JSON)</em> writes your sessions to a file on your disk. Where that file goes is your call; Agent Farm sends it nowhere.',
      see: { href: '#s-local', l: 'The licence check, whole' },
    },

    shellguard: {
      fig: ['Before it runs', 'Four shapes', 'The safe way', 'Your way through'],
      why: 'Agents write long shell commands. Some arrive garbled, a character re-encoded on the way, and some run more than they show, a second command inside a backtick. Neither is visible until it has run.',
      how: [
        // Technical DNA §6 (Shell guard, X-439: PreToolUse on the shell tool), §3.2 (PreToolUse permissionDecision "deny" + reason)
        'Every shell command an agent sends passes through ShellGuard in the hook that runs before a tool, <code>PreToolUse</code>, before any shell sees it.',
        // Technical DNA §6
        'Four shapes are refused: a character outside ASCII; a backtick; a heredoc that carries <code>\\</code> or <code>${</code> or runs past 20 lines; a quoted text longer than 600 characters.',
        // the owner's list §12 (ShellGuard: the recovery directive); Technical DNA §3.2
        'The refusal goes back to the agent with its reason and the safe way: write the text to a file, and give the command only the file\'s name.',
        // Technical DNA §6 (escape af:allow-shell)
        'When a command really needs one of those shapes, <code>af:allow-shell</code> in it lets that one command through. It is in the command, so the transcript shows it.',
      ],
      // Technical DNA §6 ("backtick (Claude/Git Bash only — Codex's Windows shell is PowerShell)"); Blueprint, Terminal or Console ("a backtick (PowerShell's escape character)")
      note: 'The backtick rule applies where the shell is bash: Claude Code, Git Bash. Codex\'s shell on Windows is PowerShell, where a backtick is the escape character, so there it is not refused.',
    },

    bridgeguard: {
      fig: ['The hunt', 'Stopped', 'To the bridge', 'Read properly', 'Escape and coverage'],
      // Blueprint, "Bridge Guard and Search Interceptor (bridgeGuard)": Rationale
      why: 'An agent asked about an old session goes looking for it on disk: a recursive search through every CLI\'s folders for its id. It burns context and quota, and those folders and their formats change with each CLI release.',
      how: [
        // Blueprint, Bridge Guard: Rationale; Technical DNA §6 (PreToolUse on Grep/Glob/search verbs)
        'An agent searches for a session id with Grep, Glob or a search command: <code>grep</code>, <code>find</code>, <code>rg</code>, <code>ls</code>, <code>dir</code>, <code>Select-String</code>.',
        // Blueprint, Bridge Guard: Mechanical Interception; Technical DNA §6 ("git hashes untouched")
        'BridgeGuard stops it in the hook before the tool runs, when the pattern holds a full session id, 36 characters, or the 8-character start of one Agent Farm knows. Git hashes are left alone.',
        // Blueprint, Bridge Guard: Guiding Refusal Directive
        'The agent is told in one line what the id is and what to run instead: <code>af.js sessions.find q=&lt;id&gt;</code> for the file, engine, agent and folder, and <code>af.js sessions.read id=&lt;id&gt;</code> for the conversation itself.',
        // Blueprint, Live Observation, Timeline: "Read a Whole Conversation from the Bridge (3.536.0 — B-24)"
        '<code>sessions.read</code> gives the session\'s messages in one vocabulary for every engine (user, assistant, tool, tool result, system) through the viewer\'s own reader, filtered and paged. The agent never opens a transcript file.',
        // Blueprint, Bridge Guard: Escape Hatch, Engine Coverage Transparency
        '<code>af:allow-id</code> anywhere in a command lets that one search through, and calls to <code>af.js</code> are never stopped. Each engine is reported as covered by a hook or not, so an engine without one is never assumed to be guarded.',
      ],
      // the owner's list §12 (BridgeGuard "konsol kartında işaret bırakır"); Technical DNA §6 (bridgeGuardLog.ts)
      note: 'Each stop is logged and leaves a mark on that session\'s Console card.',
      see: { href: '../../#bg-chat', l: 'Session 7c41e2a0, picked up by its id' },
    },

    permissions: {
      fig: ['One label', 'Default, resolved', 'Refused', 'Live, answered', 'The lint'],
      // Blueprint, 3.301.0 (K-22): "a session asked for permission on a terminal nobody was watching and sat there for an hour and a half"
      why: 'When a card says one permission and the process runs under another, a session you set to bypass can sit for an hour on a question nobody sees, and one you thought would ask goes ahead.',
      how: [
        // Blueprint, 3.301.0: "K-22 — bypass on the card has to mean bypass in the process"; Technical DNA §6 (Permission contract)
        'The permission on a session\'s card is the one its process runs with. The Console, a terminal and a headless run build their flags in one place, so bypass on the card is bypass in the process.',
        // Blueprint, 3.301.0 ("Default was never resolved at all"); the owner's list §12 (managed > local > project > user)
        'Default is worked out before the command line is built, from the CLI\'s own settings layers: managed, local, project, user. The launcher\'s preview shows the flags the launch will really carry.',
        // Blueprint, 3.301.0 ("A bypass that a policy forbids refuses to start"); the owner's list §12
        'If a managed policy forbids the mode, the session refuses to start and says why. It is never opened under a label it cannot keep.',
        // Blueprint, Console: "The live vocabulary is not the launcher's — and the CLI can say no (3.93.0)"
        'Change a running session\'s mode and the CLI\'s answer is shown: the mode it accepted, or its refusal in its own words, as a line in the conversation. A retry nudge goes out only after a yes.',
        // Blueprint, Security and Reliability: "Guardrail Auditor"
        'The permission lint reads each agent\'s permission rules and files what it finds in Insights: bypass mode, dangerous patterns such as <code>rm -rf</code> or <code>curl … | sh</code>, blanket allows such as <code>Bash(*)</code>, wildcard rules unused for 30 days, duplicates and broken JSON. A click opens the file.',
      ],
      set: [
        // Blueprint, Settings: Reference table; Guardrail Auditor
        ['agentFarm.permissionLint', 'on', 'Audits the permission rules in each agent\'s .claude/settings(.local).json; findings go to Insights.'],
        // Blueprint, Settings: "Session launch defaults (3.24.0)"
        ['agentFarm.launchDefaults', '{}', 'The model, effort and permission mode every interactive session carries. An empty field adds no flag.'],
      ],
      // Blueprint, Console: "Not on the bridge on purpose"
      note: 'An agent can answer a session\'s question over the bridge, but it can never grant a tool permission. That stays your call, in the panel.',
    },

    masking: {
      fig: ['The keychain', 'Into the run', 'Scrubbed', 'Masked', 'Hash and length'],
      why: 'A key handed to a run ends up in what the run prints: a request line, an error, a config dump. Archived, that output is your key in plain text in a file.',
      how: [
        // Technical DNA §6 (Route keys X-488/491/492: key in keychain, bound to the endpoint; Secrets vault: never on the bridge); Blueprint, Secret Vault ("List Secrets shows only names")
        'A route key such as <code>OPENROUTER_FREE</code> is kept in the OS keychain, bound to the endpoint it was given for. Lists show its name, never its value, and no bridge op reads it.',
        // Technical DNA §2.7 (Layering; route isolation X-101), §6 (Route isolation)
        'At launch the key goes into the run\'s environment, after the inherited <code>ANTHROPIC_*</code> variables, and the <code>CLAUDE_*</code> ones that carry a route, are cleared.',
        // Technical DNA §6 (Output scrubbing X-115: task archives, test verdicts)
        'Whatever the run prints, the route key is scrubbed out before the output is archived, and out of test verdicts too.',
        // Blueprint, Kapici ("the input is masked (key/token patterns and every vault value) and trimmed to a budget")
        'Before Gatekeeper sends anything to Jev, key and token patterns and every value in your vault are masked, and the input is trimmed.',
        // Blueprint, Kapici ("hash and length of the input, never the input or a key"); Technical DNA §6
        'Gatekeeper\'s audit log keeps a hash and a length of what it read, never the input and never a key.',
      ],
      set: [
        // Blueprint, Settings: Reference table; Secret Vault
        ['agentFarm.mediaAuthSecret', 'FAL_KEY', 'The name of the secret that holds the media key. The setting holds the key\'s name, not the key.'],
      ],
      // Blueprint, Secret Vault: "Farm only (X-409, 3.745.0)" and the health check on plaintext keys
      note: 'A secret can be marked <em>farm only</em>: Agent Farm still uses it, but no agent\'s task receives it. The Gatekeeper key starts that way. And a key found in plain text in a config file is reported, so you can move it to the vault.',
      see: { href: '../../#br-panel', l: 'Secrets on the home page' },
    },

    browser: {
      fig: ['The step', 'The allow list', 'Outside: no run', 'Ask first', 'Held by the browser'],
      why: 'An agent with a browser can follow a link anywhere. A step that runs at night has nobody watching where it goes.',
      how: [
        // Blueprint, Browser Steps
        'A browser step has an agent, a URL, an objective and the hosts it may open. What it finds goes to the next step.',
        'The URL is checked against the step\'s own hosts and <code>agentFarm.browserAllowHosts</code>. Subdomains are included.',
        'A URL neither list covers fails the step without running it at all, and the workflow\'s on-fail rules take over.',
        'Before each run you are asked, with the URL and the objective in front of you. <code>auto</code> skips the question, and only by your choice.',
        // Blueprint, Browser Steps: "The hosts are held by the browser, not only by the prompt (3.735.0)"
        'On a recipe step, which runs Agent Farm\'s own browser, the list is held by the browser too: a page on a host outside it is replaced by <code>about:blank#BLOCKED BY AGENT FARM</code>, naming the host. Frames, such as a sign-in box, are left alone.',
      ],
      set: [
        // Blueprint, Settings: Reference table; Browser Steps
        ['agentFarm.browserAllowHosts', '[]', 'Hosts every browser step may open, beside the step\'s own list.'],
        ['agentFarm.browserApproval', 'ask', 'ask: approve each run, with the URL and objective shown. auto: no question.'],
      ],
      // Blueprint, Browser Steps (hard rules in the prompt; the recipe book: LOGIN NEEDED)
      note: 'The agent\'s prompt carries hard rules as well: open no link off the list, never make up a sign-in, and report <code>NO BROWSER MCP</code> when there is no browser. A login wall on a recipe step is reported as <code>LOGIN NEEDED</code>, never typed into.',
    },

    superpowers: {
      fig: ['Asleep on disk', 'A small index', 'Read when needed', 'Strict rules', 'Per agent, per job'],
      why: 'An agent left to itself patches the symptom and says it is done. Loading a whole engineering method into every session to stop that costs tokens on every turn, even when the work is a lint sweep.',
      how: [
        // Blueprint, "Superpowers Engineering Discipline — Dormant on Disk & Composer Switch"; 3.286.0 (X-132)
        'Fourteen engineering disciplines from the Obra Superpowers library sit in a folder on disk: test-driven development, systematic debugging, planning, brainstorming, verification, code review and more. On disk they cost no tokens.',
        // Blueprint, Superpowers: Root Hook Injection
        'A session with Superpowers on gets one small root hook, about 2.5 KB, and a list of where each discipline\'s file is, added to its system prompt.',
        // Blueprint, Superpowers: On-Demand Reading
        'When the work calls for one, debugging or writing code, the agent reads that discipline\'s <code>SKILL.md</code> with its own file tools, and only that one.',
        // the owner's list §22 (strict rules)
        'The rules are strict: no fix before the root cause is found, by four steps of systematic debugging, and no "done" without evidence.',
        // Blueprint, Superpowers: Composer Switch, Agent Defaults; 3.315.0 (M-30)
        'It is a switch per agent, on for <code>developer</code> by default, and the ⚡ chip in the Console shows the exact hook. A task, a schedule, a trigger or a workflow step can say Agent default, On or Off for that job alone.',
      ],
      set: [
        // Blueprint, Superpowers; 3.289.0 (X-136: "Empty configurations dynamically resolve to _SKILLS/superpowers adjacent to agent roots")
        ['agentFarm.superpowersPath', 'empty', 'The disciplines\' folder. Empty: _SKILLS/superpowers beside your agent folders.'],
        // Blueprint, Superpowers: Agent Defaults; 3.298.0 (U-110: name → boolean, exact names, no wildcard)
        ['agentFarm.superpowersDefaults', 'developer: on', 'On or off per agent, by exact name. An agent not named starts without it.'],
      ],
      // Blueprint, 3.315.0 (M-30): "THREE ANSWERS, AND THE EMPTY ONE IS NOT OFF"
      note: '<em>Agent default</em> is not off: it hands the choice back to the agent\'s own setting, which is what every task written before the switch existed still says.',
    },
  },

  faq: [
    // the owner, 2026-10-12 (data/facts.js licence)
    ['Does anything about my work come to you?', `No. The free version never contacts us. A paid licence checks its key ${licence.checkEvery}, and that message holds the key, a hash of the machine and the version, nothing else. Your code, prompts, transcripts, names, costs and the features you use never come to us.`],
    ['What does a paid licence do without a connection?', `It keeps working for ${licence.offlineDays} days without reaching us. The check only asks whether the key is valid; nothing runs on our side.`],
    // Local.astro's engines; Blueprint, Provider, Route and Tier Architecture
    ['Who sees my prompts, then?', 'The provider of the engine you run, as without Agent Farm: Anthropic for Claude Code, OpenAI for Codex, Google for Gemini and Antigravity, and the providers you give OpenCode. A route sends a run to the provider you picked for it.'],
    // Technical DNA §6 (Sandboxing)
    ['Does Agent Farm sandbox my agents?', 'No. It maps its permission choices onto each engine\'s own: Claude Code\'s permission modes, Codex\'s sandbox, Gemini\'s approval mode, Antigravity\'s mode, OpenCode\'s plan agent. Parallel runs work in separate git worktrees. The guards on this page stop the commands that should not run.'],
    // Technical DNA §3.2 (PreToolUse deny), §2.3 (Codex hooks); Blueprint, Bridge Guard: Engine Coverage Transparency
    ['Do the guards work on every engine?', 'They act in the hook an engine runs before a tool: Claude Code\'s, and Codex\'s. BridgeGuard reports for each engine whether a hook covers it, so an engine without one is never assumed to be guarded.'],
    // Technical DNA §6 (escapes); Blueprint, Bridge Guard: Escape Hatch
    ['Can I let one command through?', 'Yes, on purpose and one command at a time: <code>af:allow-shell</code> for ShellGuard, <code>af:allow-id</code> for BridgeGuard. It is written into the command, so the session\'s transcript shows every time it was used.'],
  ],
};
