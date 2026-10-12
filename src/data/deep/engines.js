// District VII, Any brain: the words of its page (/features/any-brain/). Names, sentences and tile figures are in
// data/features.js; this file holds what the page says beyond them. Every rule, default and setting key was read in the
// extension's own guide (the Blueprint, cited by section heading: "Engines", "Choosing one — the engine axis", "The
// model box asks the engine itself", "Provider, Route and Tier Architecture", "Secret Vault", "Multi-Account
// Management", "Composer & Session Launch Architecture", "Start Session…", "Antigravity Compatibility", "Working With
// Other Engines", "Generic CLI profiles", "Farm Settings page" and the release notes named), its Technical DNA (cited by
// §) or the owner's ranked feature list (§3 the Console, §9 the eleven doors, §20 engines and providers, §21 local
// first and portable); the citations are the comments. Agents, routes, keys, accounts and figures in the figures are
// demo data.
// how and note may hold <code> and <em>; everything else is plain text. fig: a short label per step of how, shown on
// the step and under the feature's figure (scripts/figs/engines.js draws the figures and what each step shows).

export default {
  description: 'Agent Farm runs five engines, Claude Code, Codex, Gemini, Antigravity and OpenCode, and through routes almost any model: a real test turn when you ask for one, routes with tiers and health checks, a keychain vault, several sign-ins of one engine, the model switched mid-conversation, eleven doors that carry the same setup, one agent\'s rules written for every engine, and a farm that moves between machines.',
  promise: 'Every AI company sells its own tool, and each one wants your work inside it. Agent Farm runs no model of its own: it drives the CLIs you already pay for, side by side, and lends Claude Code and OpenCode any other model through a route. Change the brain behind an agent and the way you work stays the same.',

  features: {
    engines: {
      fig: ['Four questions', 'Paid your way', 'The next step', 'One real turn', 'Offered, refused'],
      // Blueprint, Engines ("four questions per engine"; "No row stops at naming a state")
      why: 'Five agent CLIs means five installers, five sign-ins and five ways of being paid for. A file on disk can say signed in while every call fails, and a tool that only works with one of them decides your model for you.',
      how: [
        // Blueprint, Engines (the four questions)
        'The Engines page answers four questions for each engine: is the CLI on this machine, how is it paid for, is it signed in, and what is the one thing to do next.',
        // Blueprint, Engines (four billing routes; OAuth grants never handed to Agent Farm); DNA §2.4 (Gemini: Google-account login retired June 2026 → API key), §2.6 (OpenCode usable with zero credentials)
        'Each is paid the way you already pay: Claude Code on a Pro or Max plan, Codex on a ChatGPT plan, Gemini on an API key, Antigravity on the app\'s Google sign-in, OpenCode on its own free models with no sign-in at all. A plan\'s sign-in stays in the CLI\'s own files and never passes through Agent Farm.',
        // Blueprint, Engines ("An engine that is not installed is never told to sign in"); release note 3.372.0 (U-129: typed, not run; the vendor's own script first)
        'An engine that is not installed is never told to sign in. Its row carries the install command, the vendor\'s own script where there is one, typed into a terminal for you to read and run. Nothing runs by itself.',
        // Blueprint, Engines ("⚡ Test — the one thing disk cannot tell you"; "It costs a turn, so it never runs by itself")
        '<code>⚡ Test</code> buys one real turn: the smallest model, a four-word prompt, read-only where the engine allows. It never runs on a schedule or when the page opens; its verdict keeps its age, and a failure is told in the engine\'s own words.',
        // Blueprint, Choosing one — the engine axis ("An engine that cannot run here is offered and refused"; launchDefaults.engine)
        'Every picker offers all five. One that cannot run here stays in the list, greyed, with the one thing to do about it, because hiding it would make "not installed" and "not signed in" look the same.',
      ],
      // Blueprint, Working With Other Engines ("first-class engines"); Generic CLI profiles
      note: 'For a CLI it does not know, a profile runs any command line, keeps its output and reports its exit code. It is a command runner, never a sixth engine: no invented transcript, price or live view.',
      set: [
        // Blueprint, Farm Settings reference table
        ['agentFarm.cliProfiles', '[]', 'Command lines for a CLI Agent Farm does not know, with {prompt} and {args} filled in.'],
        ['agentFarm.modelAliases', 'haiku, sonnet, opus, fable', 'Model names every picker offers; add a new one once. Codex\'s and Antigravity\'s lists are read from the engines themselves.'],
      ],
      see: { href: '#s-brains', l: 'The Engines page, live' },
    },

    routes: {
      fig: ['One route', 'Its tiers', 'Two engines', 'Nothing inherited', 'On the card'],
      // the owner's list §20 (Özel sağlayıcı rotaları); Blueprint, Provider, Route and Tier Architecture
      why: 'Claude Code and OpenCode are good programs, and the best model for a job is not always the one their maker sells. Pointing them somewhere else by hand means environment variables, and a variable left over in a window quietly sends a session to the wrong company.',
      how: [
        // Blueprint, Provider, Route and Tier Architecture (Kimi, MiniMax, DeepSeek, GLM); release note 3.342.0 (templates are data); the route form (https, or http on this machine)
        'A route is one address, one key and its models: a provider\'s (Kimi and MiniMax come as templates), a free one, or a model at an http address on this machine.',
        // the owner's list §20 (tiers mapped to the route's own names; the raw id never leaks; the default tier when none is picked); DNA §2.2 (X-522 the route's Context)
        'Its tiers map opus, sonnet and haiku onto the route\'s own model names, so a session that asks for sonnet gets the route\'s model, and one that asks for nothing gets the default tier. A Context figure tells Claude Code how big the window really is.',
        // DNA §2.6–§2.7 (X-513..X-519 one route, two engines; lent to OpenCode, never written into its files; X-521 two groups)
        'One route serves both engines: given to Claude Code when a session starts, lent to OpenCode without touching its files. OpenCode\'s own providers stay its own, in a group of their own.',
        // release note 3.347.0 (X-101: 75 ANTHROPIC_ names read out of the binary, cleared); the owner's list §20 (the key bound to the address)
        'Every inherited <code>ANTHROPIC_</code> variable is cleared, 75 names read out of the real binary, so a session picked as Kimi cannot run on whatever the window was carrying. The key is bound to the route\'s address: change the address and the key stops.',
        // release notes 3.359.0 (the route's own mark) and 3.363.0 (fixed on Claude, a turn boundary on OpenCode)
        'The card wears the route beside the engine badge, with the endpoint on hover. On Claude Code a route holds for the whole session; on OpenCode it may change between turns.',
      ],
      // DNA §2.7 (X-525 route settlement)
      note: 'Removing a route first settles every saved setup that names it, and a launch that would land on a route that is gone is refused at every door.',
      set: [
        // Blueprint, Farm Settings reference table
        ['agentFarm.contextWindowTokens', '0 (auto)', 'The context ceiling. 0 = the window the engine states, else the Context of the route the session runs on, else the model\'s.'],
      ],
      see: { href: '#s-brains', l: 'Add a route, live' },
    },

    radar: {
      fig: ['A schedule', 'At 04:30', 'Free today', 'A new route', 'Yours to use'],
      // the owner's own schedule (screenshot M7-8-a); built from parts every user has: a schedule, an agent, the bridge, the vault
      why: 'Providers hand out free models and take them back again. Keeping up by hand means reading their pages every morning and retyping routes.',
      how: [
        // district IV: a schedule, written in words if you like
        'It is not a button: it is a schedule you write once, even in a sentence, such as "every day at 04:30, explorer checks which models are free today".',
        // the owner's schedule: one agent turn, its own instructions
        'At that hour an agent opens a session, reads a provider\'s list of today\'s free models and compares it with the routes you already have.',
        // the same schedule; its output is archived like any run (district IV)
        'Its report goes where every run\'s does: what is new, what has gone, what answered. A run that finds nothing new changes nothing.',
        // the bridge (district VIII); Blueprint, Secret Vault (names over the bridge, never values)
        'A new one becomes a route over the bridge, addressed and tiered, naming a key you already keep in the vault. The route holds the key\'s name; the agent never sees its value.',
        // route health, the next feature; the composer and saved setups pick a route by hand
        'The route arrives untested, and nothing moves onto it by itself: you pick it for a session, an agent or a saved setup when you want it.',
      ],
      note: 'The owner of Agent Farm runs this every night. It is an example of what the parts can do together, not a feature you switch on.',
      see: { href: '#s-brains', l: 'A route the radar added' },
    },

    health: {
      fig: ['Free to know', 'By engine', 'Never tested is normal', 'One turn, pressed', 'Asked and answered'],
      // the Engines page, Route health (screenshot M9)
      why: 'A route is an address and a key you typed months ago. You want to know it still works before a night of work runs on it, without paying a turn every time a page opens.',
      how: [
        // Route health (M9): configured, available, model count
        'For each route, the free check reads everything that can be known without spending: is it set up, does the address answer with its list of models, and how many it offers.',
        // Route health (M9): grouped by engine
        'Routes are listed by the engine they serve: Claude Code\'s, beside the first-party Anthropic one, and OpenCode\'s, beside its own providers.',
        // Route health (M9): "Available and never tested is the ordinary state"
        '"Available, never tested" is the ordinary state, not a warning. The free check is all that can be known for free.',
        // Route health (M9); Blueprint, Engines (the same rule as ⚡ Test: only when pressed, with its age)
        '<code>Test route</code> spends one real turn on that engine through that route, and only when you press it. The answer keeps its age: tested two days ago is not tested just now.',
        // release notes 3.352.0–3.353.0 (X-102: the launch manifest, what was asked beside what answered)
        'Every launch writes down which route it was started on, at which revision, beside what the engine reported back. Claude Code never names its route in a transcript, so that record is the only witness.',
      ],
      see: { href: '#s-brains', l: 'Route health, live' },
    },

    vault: {
      fig: ['Into the keychain', 'As a variable', 'As {secret:NAME}', 'Who may use it', 'Names only'],
      // Blueprint, Secret Vault ("So API keys don't wander around config files in plaintext")
      why: 'Keys pasted into settings files end up in git, in screenshots and in an agent\'s context. Every model behind a route, every media service and every bot needs one.',
      how: [
        // Blueprint, Secret Vault (Set Secret…, OS keychain, hidden as you type)
        '<code>Set Secret…</code> puts a key into your OS keychain. It is hidden as you type and never written to a settings file.',
        // Blueprint, Secret Vault (1. as an environment variable)
        'It reaches the work as an environment variable: save <code>FAL_KEY</code> and every task the key is open to sees <code>FAL_KEY</code>.',
        // Blueprint, Secret Vault (2. as a template variable)
        'In a webhook step or a notification address, <code>{secret:FAL_KEY}</code> is replaced with the value at the moment of the call. The value is never written to any file.',
        // the Secrets page (screenshot Mz2: scope); Blueprint, Secret Vault ("Farm only (X-409)")
        'Each key says who may use it: all agents, only the agents you tick, or Agent Farm alone, for a key such as Gatekeeper\'s that no agent should be handed.',
        // Blueprint, Secret Vault (List Secrets shows only names; "No bridge op, like the rest of the vault")
        'The list shows names, never values. The vault has no bridge operation at all: an agent uses the keys open to its task and can never ask the bridge for one.',
      ],
      // Blueprint, Secret Vault (the health engine warns about plaintext keys; three golden rules)
      note: 'If something that looks like a key turns up in plain text in a config file, the health check tells you to move it into the vault.',
      set: [
        // Blueprint, Farm Settings reference table
        ['agentFarm.mediaAuthSecret', 'FAL_KEY', 'The name of the key media steps use.'],
      ],
      see: { href: '#s-brains', l: 'The Secrets page, live' },
    },

    accounts: {
      fig: ['Capture a sign-in', 'A folder, not a copy', 'Standing, or this one', 'Its quota', 'Refused, not guessed'],
      // release note 3.373.0 (X-169: three Claude Pro plans, switched by hand all day)
      why: 'Two or three plans on one machine meant signing out and in all day, the right browser profile, a fresh login, and sometimes a night of work on the wrong plan.',
      how: [
        // Blueprint, Multi-Account Management (X-172 capture and retention, custom labels)
        'Sign in as usual, then capture the sign-in on the Engines page under a name of your own. Each account gets a slot of its own.',
        // DNA §2.7 (accounts = directories, X-168: CLAUDE_CONFIG_DIR, CODEX_HOME); release note 3.373.0
        'An account is a config folder, not a copied credential. A session started on it points the engine at that folder, so two accounts run side by side and the session you are talking to is never touched.',
        // Blueprint, Multi-Account Management (X-217 one standing account, "Use this one"); release note 3.373.0 (a box at every door; a task names its account when it is written)
        'One account per engine is standing; any other is one press away. Every door that starts a session has an account box, and a task says which account it spends when it is written.',
        // Blueprint, Multi-Account Management (X-187 live 5-hour and weekly bars; X-218 refresh all in a line)
        'Each card shows its five-hour and weekly bars. They are read one at a time, a few seconds apart, so asking how much is left never becomes what spends it.',
        // release note 3.373.0 (an id naming no stored slot is refused; an account belongs to one engine); DNA §2.7 (gemini, opencode, agy unmapped)
        'An account that does not exist is refused, never swapped for whoever is signed in, and an account belongs to one engine. Claude Code and Codex have this; the other three were found to work another way.',
      ],
      // DNA §2.7 (X-530, X-531: disable, sign out keeps the folder); district I, Account policies
      note: 'An account can be switched off without being removed, and signing out clears its credentials but keeps its folder. Which account a session gets can also be left to a rule: see Account policies in Never stops.',
      see: { href: '#s-brains', l: 'The Accounts page, live' },
    },

    switch: {
      fig: ['Mid-conversation', 'Until it agrees', 'Effort, permissions', 'Per engine', 'Who serves it'],
      // Blueprint, The model changes mid-conversation (3.38.0)
      why: 'Halfway through a conversation you know whether it needs the big model or the cheap one. Starting again to change it loses the context you built.',
      how: [
        // Blueprint, The model changes mid-conversation (set_model; from the next turn; context and transcript untouched)
        'In the Console the model box works on a running session. The switch takes effect from the next turn, and the conversation, its context and its transcript stay as they are.',
        // Blueprint, The model changes mid-conversation ("pending until the CLI agrees"; a refusal is an error)
        'It is pending until the CLI agrees. A refusal shows as an error and leaves the model alone, so the box never names a model that is not answering.',
        // DNA §2.2 (control requests set_permission_mode, apply_flag_settings effortLevel); the owner's list §3 (Kart üzerinden ayar)
        'Effort and the permission mode change the same way on Claude Code, as live settings on the running process.',
        // Blueprint, Choosing one — the engine axis (codex exec is one process per turn; held messages); DNA §2.1
        'Codex, Gemini and Antigravity start one process per turn, so there the boxes are the next turn\'s flags, and a message typed mid-turn waits for the turn to end. The line under the box says which kind of engine you are on.',
        // release note 3.363.0 (X-105: a provider change is answered, not guessed; fork or new)
        'Who serves it is a different question. On Claude Code a route holds for the session, and a change is refused with a fork or a new session offered; OpenCode may change provider between turns.',
      ],
      // Blueprint, Two lines of numbers ("…and the strip ends with WHAT is doing the thinking (3.45.0)"); console.setModel
      note: 'Each turn\'s line ends with the model and effort that answered it, so a switch made meanwhile cannot rewrite the turn you are watching. An agent can switch too, with <code>console.setModel</code>.',
    },

    doors: {
      fig: ['Eleven places', 'The same boxes', 'One Enter', 'Where it runs', 'Back as it closed'],
      // DNA §1.2 (every launch dimension reaches all 11 entry points); the owner's list §9
      why: 'A session can be started from many places, and a setting that one of them forgets is a session on the wrong model, the wrong account or with the wrong permissions, which you notice afterwards.',
      how: [
        // the owner's list §9 (11 giriş noktası paritesi)
        'Eleven places start a session: the Console, the sidebar tree, a right-click, a saved setup, the launcher, the terminal-or-Console picker, the project tree, the pages, the command palette, the bridge and Telegram.',
        // Blueprint, Composer & Session Launch Architecture (the control strip); DNA §1.2 (test_launch_parity)
        'Each carries the same choices: agent, engine, route, model, effort, permissions, account and the Superpowers discipline. A door that drops one fails the build.',
        // Blueprint, Start Session… (launchProfiles "deep review"; remembers the last launch); release notes 3.510.0 (X-180 one click) and 3.344.0 (X-145 per engine)
        'A setup you use often is a saved setup, such as "deep review" = opus, xhigh, plan, and one click starts it. The launcher remembers what each agent last ran with, on each engine separately.',
        // Blueprint, Start Session… (the Where row; the Start row's description is the exact command line); the owner's list §3 (Çalışma yüzeyleri)
        'Where it runs is a choice too: the Console, a terminal (VS Code\'s or your system\'s own), or the background as a task. In a terminal, the launcher\'s top line is the exact command that will run.',
        // DNA §1.2 (a reopen uses what the session closed with, S-109); Blueprint, "…and it is every engine's list" (a resume starts on the engine it was had with)
        'A session you reopen comes back with the model, effort and permissions it closed with, on the engine the conversation was had with.',
      ],
      // Blueprint, Telegram (the 11th launch door: /new, seeded with the last launch, under the daily budget)
      note: 'From Telegram, <code>/new developer</code> starts a real Console session on your desktop with that agent\'s last setup, under the chat\'s daily budget.',
      set: [
        // Blueprint, Start Session… ("an empty one emits no flag at all")
        ['agentFarm.launchDefaults', '{}', 'The engine, model, effort and permissions every session starts with. An empty field adds no flag.'],
      ],
    },

    sync: {
      fig: ['One instruction file', 'Duties and tools', 'The constitution', 'Which side moved', 'Never overwritten'],
      // Blueprint, Antigravity Compatibility ("the same agent runs under Google Antigravity (Gemini) and OpenAI Codex too")
      why: 'An agent\'s rules are written for one engine: Claude Code reads CLAUDE.md, the others read AGENTS.md and their own folders. Without a copy they start as strangers, and a copy kept by hand goes stale the day you change the original.',
      how: [
        // Blueprint, Antigravity Compatibility (CLAUDE.md → AGENTS.md; every engine walks up for it; memory is plain markdown)
        '<code>Sync Agent with the Other Engines…</code> writes the agent\'s CLAUDE.md as an AGENTS.md in the same folder, the file Codex and Antigravity both walk up to read. Memory files are plain Markdown and need no copy at all.',
        // Blueprint, Antigravity Compatibility (duties → .agents/workflows, /duty-name; .mcp.json → suggestions; never writes ~/.gemini)
        'Its standing duties become workflow files Antigravity calls as <code>/duty-name</code>. Its MCP servers become a suggested config for Gemini and for Codex, which you merge yourself: Agent Farm never writes into their home folders.',
        // Blueprint, Antigravity Compatibility (the shared constitution; ⚖ Sync Constitution; constitution.sync)
        'A nest of agents shares one constitution. <code>⚖ Sync Constitution</code> mirrors it once into the nest\'s own AGENTS.md, and every engine picks it up on its way up from whichever agent folder it runs in.',
        // Blueprint, Antigravity Compatibility (directional sync, fingerprints; Apply to CLAUDE.md)
        'It is not a one-time export. Fingerprints say which side moved: a changed CLAUDE.md is a reminder in Insights; a changed AGENTS.md, because an Antigravity session taught the agent something, can be applied back to CLAUDE.md.',
        // Blueprint, Antigravity Compatibility (both changed → conflict, diff, .afbak; hand-written files not touched)
        'If both changed you get a conflict, a diff and a direction to pick, and the losing side is kept as a backup. Files you wrote yourself are not touched without asking.',
      ],
      // Blueprint, Antigravity Compatibility (the reply says what Antigravity will load; the 24,000-byte cut)
      note: 'The sync also says what Antigravity will load from that folder: which files, how big, any text that would arrive twice and any file past its 24,000-byte cut.',
    },

    portable: {
      fig: ['Saved as tokens', 'Back as folders', 'Healed on load', 'Settings that travel', 'Never guessed'],
      // the owner's list §21 (Taşınabilir yollar; "Sağlayıcıya ve makineye kilitlenme yoktur")
      why: 'A new computer, or a second one, should not mean setting the farm up again. Files full of one machine\'s paths break on every other.',
      how: [
        // Blueprint, Farm Settings page ("Machine-independent stores and paths (2.76.0)")
        'The farm\'s own records, its tasks, missions and run history, can travel between machines in git. On save, a machine\'s path becomes a token such as <code>${home}</code> or <code>${claudeDir}</code>.',
        // the same paragraph (on load the tokens expand to this machine's real roots)
        'On load the tokens become this machine\'s own folders.',
        // the same paragraph (foreign absolute paths heal themselves on load; prose is never touched)
        'A record written before the tokens, with another computer\'s <code>C:\\Users\\…\\.claude</code> path in it, heals itself on load. Only values that are a path are changed; a prompt is never touched.',
        // the same paragraph (folder settings accept %USERPROFILE%, ${env:VAR} and ~); DNA §1.3 (portableState lifts fleet state out of state.vscdb)
        'Every folder setting takes <code>%USERPROFILE%</code>, <code>${env:VAR}</code> or <code>~</code>, so one settings file synced through git works on both machines. The fleet\'s state is lifted out of VS Code\'s per-machine store as well.',
        // DNA §1.3 (pathVars resolves ${vault}, ${temp} and refuses to guess)
        'A path variable this machine cannot resolve is refused, never guessed.',
      ],
      // district VIII (Take it with you); district VI (Other machines)
      note: 'One agent travels as an .agentpack, and another machine\'s sessions can be read here as they happen.',
      see: { href: '../just-ask/#move', l: 'Take one agent with you' },
    },
  },

  faq: [
    // DNA §1 (it runs no LLM itself: the user's own CLIs, subscriptions and keys)
    ['Does Agent Farm have a model of its own?', 'No. It runs no model itself: it drives the agent CLIs you have installed, on your own plans and keys, and reads back what they wrote. What you pay those companies is unchanged.'],
    // Blueprint, Choosing one — the engine axis ("You never have to choose between them")
    ['Do I need all five engines?', 'No. One is enough. The ones you do not have stay in the pickers, greyed, with the one thing it would take to use them, and a Claude Code session and a Codex session can run side by side whenever you want both.'],
    // Blueprint, Provider, Route and Tier Architecture; DNA §2.6 (OpenCode without credentials)
    ['Can I use a model that runs on my own computer?', 'Yes. Give it a route at an http address on this machine, such as 127.0.0.1, and Claude Code or OpenCode will run it. OpenCode also has free models of its own that need no sign-in.'],
    // DNA §2.7 (routes: claude and opencode); Blueprint, Choosing one (Codex reports tokens)
    ['Why can only Claude Code and OpenCode use routes?', 'Because only those two can be pointed at another provider. Codex, Gemini and Antigravity each talk to their own maker\'s models, so for them there is nothing to route; you pick their model, effort and permissions instead.'],
    // Blueprint, Choosing one — the engine axis ("A subscription engine states no price, and $0.00 is not a smaller number")
    ['What does a session on a plan cost on the page?', 'An engine on a plan reports tokens, not money, so Agent Farm shows tokens and says why there is no price. It never prints $0.00 for work that was paid for by a plan.'],
    // district V, Shared sessions; Blueprint, "…and it is every engine's list" (a resume starts on its own engine)
    ['Can another engine carry on work one engine started?', 'Yes, by reading it: any agent can read any session, whichever engine wrote it, in the same five roles, and carry on. A resume itself always reopens on the engine the conversation was had with.'],
  ],
};
