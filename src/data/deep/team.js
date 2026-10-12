// District V, Works as a team: the words of its page (/features/works-as-a-team/). Names, sentences and tile figures are
// in data/features.js; this file holds what the page says beyond them. Every rule, default and setting key was read in
// the extension's own guide (the Blueprint, cited by section heading: "Missions", "Classic vs. Adaptive Missions",
// "Normalized Multi-Engine Transcript Reader", "A2A (Agent-to-Agent) Protocol", "Human Supervisor Directive", "Console",
// "Question Auto-Timer Resolution", "Approval Queue", "Notices and the Work Queue", "The Living Page", "Timeline",
// "Parallel Worktree Runs" and the release notes named), its Technical DNA (cited by §) or the owner's ranked feature
// list (§3 the Console, §4 questions and approvals, §8 orchestration); the citations are the comments. Agents, goals,
// files and figures in the figures are demo data.
// how and note may hold <code> and <em>; everything else is plain text. fig: a short label per step of how, shown on
// the step and under the feature's figure (scripts/figs/team.js draws the figures and what each step shows).

export default {
  description: 'Agents working together: a lead that plans and a team on different engines with one writer per folder and five hard caps, any session read by any agent, notes and tasks agents leave each other, your steer or veto above everything, the Console, questions that answer themselves when time runs out, Notices and the Work Queue, the Live Timeline, and parallel jobs in git worktrees.',
  promise: 'One agent can only do so much, and five of them in the same folder get in each other\'s way. Here a lead plans and a team carries it out, each on the engine that suits it, writers taking turns. Agents read each other\'s sessions and leave each other notes; you see everyone in one column, answer from one list, and your word overrides any of them.',

  features: {
    missions: {
      fig: ['A goal and a team', 'Round by round', 'One writer', 'Five caps', 'An honest verdict'],
      // Blueprint, Missions ("How it runs"; "Who runs on which model (2.64.0)"; the role labels reach the lead as hints)
      why: 'Some work does not fit in one agent: it needs planning, doing, reviewing and testing, and the next step depends on what the last one found. Drawing that as a fixed chain in advance means guessing.',
      how: [
        // Blueprint, Missions (goal, lead, team; role labels as hints; per-member engine and model)
        'You give a goal, a lead agent and a team. The role you type beside each member, coder, reviewer, tester, reaches the lead as a hint, and each member can run on its own engine and model: a strong model plans, cheaper ones carry out.',
        // Blueprint, Missions ("How it runs" steps 1–4)
        'Each round the lead makes one decision: hand out tasks, each with a prompt that stands on its own and its success criteria, ask you a question, or finish. The tasks run as ordinary tasks, metered and archived, and what comes back goes into the lead\'s own session for the next round.',
        // Blueprint, Missions ("The planner plans — it does not work (2.64.0)"; "Workdir safety")
        'The lead plans and does not work: its write tools are switched off while it plans. With a working folder, two writers never run at once; steps marked read-only, such as research or a review, may share a wave.',
        // Blueprint, Missions ("Hard limits — never the model's goodwill")
        'Five hard caps: cost, rounds, tasks, minutes and tasks at once. Time spent waiting for you does not count. When one is spent the lead gets a round in which it may only finish, and sending the same work to the same agent twice is refused.',
        // Blueprint, Missions ("Approval modes"; the verdict success / partial / failed; the closing summary as a notification)
        'A mission ends with a verdict, success, partial or failed, and a summary of what was and was not reached. By default each round waits for your Approve in Needs You; a Reject goes back to the lead, which plans again.',
      ],
      // Blueprint, Classic vs. Adaptive Missions (2 waves, 1 review pipeline, 5 conversation, 6 council)
      note: 'An adaptive mission takes an objective with criteria instead: independent tasks run side by side in waves, a reviewer is handed the real output of the task it reviews, and agents can hold a conversation in which each turn reads what the others actually wrote.',
      see: { href: '#s-together', l: 'A mission, live' },
    },

    shared: {
      fig: ['Where it is', 'Read it', 'The same words', 'A page at a time', 'No hunting'],
      // the owner's list §3 (Farkı: tomorrow another engine reads today's work from the same standard record)
      why: 'A session written by Claude Code is a file Codex cannot read, and the other way round. Work started by one engine stopped there, unless you copied the important parts across by hand.',
      how: [
        // Blueprint, the bridge guard's refusal ("sessions.find q=<id> … answers file, engine, agent, cwd")
        '<code>sessions.find q=&lt;id&gt;</code> tells an agent where a session lives: its file, its engine, its agent and its folder.',
        // Blueprint, Timeline ("Read a Whole Conversation from the Bridge (3.536.0 — B-24)")
        '<code>sessions.read</code> hands over the conversation itself. It takes the id, its first 8 characters or the transcript\'s path; a prefix two sessions share is refused with both candidates.',
        // Blueprint, Normalized Multi-Engine Transcript Reader (ReadRole; one parse with the transcript page)
        'Every engine comes back in the same words: user, assistant, tool, toolResult, system. It reads through the transcript page\'s own parse, so what an agent reads is what you see on the screen.',
        // Blueprint, Normalized Multi-Engine Transcript Reader (limit 50 / 500, from, turn, maxChars 4000, clipped)
        'It hands over 50 steps at a time, up to 500, filtered by role or turn, counted from the end if you like, and cuts a long step at 4,000 characters, saying how much it cut.',
        // Blueprint, the bridge guard (PreToolUse; claude-hook, codex-hook)
        'An agent that searches the disk for a session id is stopped by a hook and told which bridge call to make instead, so nobody spends a context hunting through folders.',
      ],
      // the owner's list §3 (Farkı); Blueprint, Normalized Multi-Engine Transcript Reader
      note: 'So the reviewer on Codex reads what the developer on Claude actually did, turn by turn, and carries on from there.',
    },

    notes: {
      fig: ['A note', 'A task', 'A 30-minute lease', 'Done, or handed on', 'Three strikes'],
      // Blueprint, A2A ("Notices is the agent→human board … A2A … without cluttering Notices or distracting the user")
      why: 'Agents find things the next agent needs, a locked database, an API that changed, a result, and they find work they cannot do themselves. Telling you every time turns you into the postman.',
      how: [
        // Blueprint, A2A, Note vs Task (1)
        'A note is passive: a fact, a warning, a result. It is addressed by project, role and subject, not to one agent; any agent that fits can read it, and reading marks it read for that agent only.',
        // Blueprint, A2A, Note vs Task (2); 5-Axis Coordinate System (project never crossed; requires); Grace Window (2h)
        'A task is work for exactly one agent, with the abilities it needs, such as write tools, a browser or a shell. It never crosses into another project. One addressed to a role waits 2 hours for that role before others may take it.',
        // Blueprint, A2A, Note vs Task (lease); Claim Race
        'The agent that takes it holds a 30-minute lease and renews it with a heartbeat and a line of progress. A lease that lapses puts the task back in the queue, and when two agents grab it at once exactly one wins.',
        // Blueprint, A2A, Task Lifecycle and Loop Guard (3 Finish, 4 Handoff)
        'Finished, it leaves a result note for the agent that asked, and nothing lands on your desk. An agent that cannot do it hands it to a role that can.',
        // Blueprint, A2A, Task Lifecycle and Loop Guard ("The third consecutive handoff is strictly refused … blocked")
        'The third handoff in a row is refused and the task is marked blocked, so work cannot bounce between agents for ever. A blocked task waits for you to send it somewhere.',
      ],
      set: [
        // Blueprint, A2A, Grace Window
        ['agentFarm.a2a.preferredGraceHours', '2', 'How long a task waits for the role it names before another agent may take it.'],
      ],
      // Blueprint, Four-Tab Agent Inbox UI (Session-Start Habit); Baton Handovers on the A2A Board
      note: 'Agents look at the board when a session starts: <code>a2a.status</code> gives unread notes, tasks they could take and leases they hold in one call. A relay\'s handover shows there too, as a card that resolves itself when the next leg starts.',
    },

    steer: {
      fig: ['Steer, veto, constraint', 'Above everything', 'First thing it reads', 'On a running task', 'Workflows and missions'],
      // the owner's list §8 (Süpervizör direktifi)
      why: 'An agent on the wrong track keeps going until somebody stops it. Stopping it and starting over loses what it already got right.',
      how: [
        // Blueprint, Human Supervisor Directive (Supervisor Cockpit: + button, colours)
        'Hover a note or a task on the A2A board and press +: a steer, a veto or a constraint, marked amber, red or blue on the card.',
        // Blueprint, Human Supervisor Directive (Absolute Precedence)
        'Your directive outranks everything else the agent was told: its constitution, its own instructions and the task\'s. Where they disagree, it is obeyed.',
        // Blueprint, Human Supervisor Directive (First Key Delivery)
        'Whenever the agent looks at that note or task, the directive is the first thing in the answer, under <code>supervisor</code>, so it cannot be skimmed past.',
        // Blueprint, Human Supervisor Directive (Live Injection; Re-route; Run Now)
        'On a task already running it arrives with the next heartbeat. Re-route sends the task to another role, and ⚡ Run now opens a Console session for the agent you name.',
        // Technical DNA §5 (workflowLive.ts: live steer/veto/constraint); Blueprint, Classic vs. Adaptive Missions 8 ("Guide next decision")
        'A running workflow takes a steer, a veto or a constraint the same way. A mission takes a word for the lead\'s next decision, which lands at its next plan, never in the middle of the task already running.',
      ],
      see: { href: '#s-together', l: 'A mission, live' },
    },

    console: {
      fig: ['Five engines, one card', 'Colour says it', 'Now, or next', 'Change it live', 'Stop the turn'],
      // the owner's list §3 (İhtiyaç)
      why: 'Every CLI has its own terminal and its own habits. With eight sessions running at once you cannot tell which is working, which is stuck and which is waiting for you.',
      how: [
        // the owner's list §3 (Beş motor, tek biçim); Blueprint, Console ("Each row carries its own cost · turns · the CLI's context estimate")
        'Claude Code, Codex, Gemini CLI, Antigravity and OpenCode run as the same card in one column, each with its cost, its turns and how full its context is.',
        // the owner's list §3 (Renk dili; Sabit dört satırlı kart)
        'Colour tells the state at a glance: blue thinking, purple a tool or a test running, yellow asking you, green done, red stuck. A card keeps its four lines however long the text gets, so nothing jumps.',
        // Blueprint, Console, The composer ("Typing mid-turn steers that turn (3.39.0)"; "⏸ Hold")
        'What you type while it works goes into the running turn, at its next step, marked ↯. ⏸ Hold keeps a message for when the turn ends, and it stays yours: rewrite it, say it now, or drop it.',
        // Blueprint, Console, The composer ("All three tuning dimensions stay live (3.44.0)"); Technical DNA §4.1 (setAccount = a new spawn)
        'Model, effort and permission mode change while the session runs. Only the folder is fixed. A change the CLI refuses is shown in its own words, not quietly undone.',
        // Blueprint, Console (⎋ Interrupt); the owner's list §3 (Akıllı yeniden açılış); Technical DNA §4.3 (closingSetup)
        '⎋ Interrupt ends the turn and keeps the session and its context. A session reopens with the model, effort and permissions it closed with.',
      ],
      // Blueprint, Console ("Your install, your subscription")
      note: 'Your install, your subscription: the Console runs the CLI you already have, and the transcript lands where it always does, so every other page keeps reading it.',
      see: { href: '#s-console', l: 'The Console, live' },
    },

    question: {
      fig: ['The countdown', 'Only you stop it', 'Some words wait', 'Permissions wait', 'One list'],
      // the owner's list §4 (İhtiyaç)
      why: 'An agent asks a question at midnight, nobody is at the desk, and the whole night goes by waiting for one click.',
      how: [
        // Blueprint, Question Auto-Timer Resolution (timeoutSeconds 300, 5–7200; Recommended, else the first option)
        'A question shows a countdown, 5 minutes unless you set another, from 5 seconds to 2 hours. When it ends, the option the agent marked Recommended is chosen, or the first one.',
        // Blueprint, Question Auto-Timer Resolution (only the person's Stop timer; partial picks kept)
        'Only your own Stop timer stops it; no agent and no bridge call can. A choice you started is kept: when time runs out your picks go, and only the questions you left open get the recommended answer.',
        // Blueprint, Question Auto-Timer Resolution (Destructive Action Safeguard)
        'A question with a destructive word in it, delete, drop, purge, remove, destroy, never runs on the clock. It waits for you.',
        // Blueprint, Console ("A permission — three ways out (3.93.0)"; the middle button scoped by command prefix, session only)
        'A tool permission never runs on a clock either. Allow once, allow and stop asking for that command for this session only, such as <code>npm:*</code>, or deny with a reason.',
        // Blueprint, Approval Queue (the admission test; the rows; self-healing clearing)
        'Whatever is stuck on you is one list, Needs You, most urgent first: permissions, browser steps, a mission\'s question, an interrupted workflow, a stalled session. A row you clear comes back if the problem does.',
      ],
      set: [
        // Blueprint, Question Auto-Timer Resolution
        ['agentFarm.console.autoAnswer.timeoutSeconds', '300', 'Seconds before a question picks its recommended answer. 5 to 7200.'],
      ],
      // Blueprint, Question Auto-Timer Resolution (Agent and Ledger Transparency; Host-Resident Clock)
      note: 'The agent is told the timer answered, not you, and the transcript marks each answer as yours or the recommended one. The clock runs in VS Code itself, so it keeps going with the Console closed.',
      see: { href: '#s-console', l: 'Waiting for you, in the Console' },
    },

    notices: {
      fig: ['One row each', 'Four levels', 'A question', 'Your answer is work', 'Your side of it'],
      // the owner's list §4 (Notices panosu; İş kuyruğu)
      why: 'Agents have things to tell you that are not urgent, and you have small jobs for them that come to mind while you work on something else. Both get lost in chats.',
      how: [
        // Blueprint, Notices and the Work Queue (Notices: type; summary + full report)
        'An agent leaves one row for each thing it wants to tell you: an update, a report, a result, a reminder, a suggestion, a warning or a question. A long report waits behind the row: 📄 Open full report.',
        // Blueprint, Notices (level 1 routine → 4 ultra); The Living Page ("Notice ageing", noticeStaleHours 24)
        'Each row has a level, from 1, routine, to 4. An unread one at level 3 or above, or a question nobody answered, older than 24 hours turns the bell in the status bar into a warning that names it.',
        // Blueprint, Notices (the question lifecycle: answered / declined)
        'A question waits for you. Answer it, or close it unanswered, and the agent applies what you said and closes it on its next turn.',
        // Blueprint, Full Notice Conversion to Queue Item (routed back to the asking agent with the whole notice)
        'Your answer, or Add to queue on any row, becomes an item in the Work Queue, routed back to the agent that asked, with the whole notice attached.',
        // Blueprint, Work Queue (Ctrl+Alt+A; captured → grouped → delegated → done; groupSize, maxAgeHours)
        'Your side: <code>Ctrl+Alt+A</code> drops a fix you noticed into the queue without leaving what you are doing. Items go captured, grouped, delegated, done, and never disappear unhandled; items for one agent are handed over together when the group is full or the oldest has waited long enough.',
      ],
      set: [
        // Blueprint, The Living Page (Notice ageing)
        ['agentFarm.noticeStaleHours', '24', 'When an unread important notice or an unanswered question turns the bell into a warning.'],
      ],
      // Blueprint, Approval Queue ("THE ADMISSION TEST")
      note: 'Needs You only holds what stays stuck if you never touch it. News, a blown budget or a proposal, goes to Notices, which is made to be read later.',
    },

    timeline: {
      fig: ['A lane per session', 'Every event', 'To the moment', 'When it is your turn', 'Stalled'],
      // the owner's list §3 (İhtiyaç: eight sessions at once cannot be followed)
      why: 'Thousands of tool calls across a dozen sessions cannot be read as text. You need to see who did what, when, and where something stopped.',
      how: [
        // Blueprint, Timeline (Swim lanes; Concurrent sessions of the same agent (2.45.0))
        'Each agent is a lane on one time axis. Two sessions of the same agent at once get a lane each, dev #1 and dev #2.',
        // Blueprint, Timeline (Swim lanes legend)
        'Green blocks are tool runs, as long as they took. A blue dot is your prompt, a blue ring the model\'s reply, a red diamond a permission wait, a purple one a compaction, an orange dot a subagent done.',
        // Blueprint, Timeline (Click → go to that exact moment (2.37.0); Copy Corpus (3.184.0))
        'Click any mark and the session opens at that exact message, framed for a moment. Right-click and Copy Corpus copies the whole prompt or answer from the transcript.',
        // Blueprint, Timeline (Your-turn alerts (3.144.0); "Test in 3 seconds")
        'Four boxes beside each lane pick what happens when that session turns to you: a sound, the panel brought forward, a dialog, a toast. ⏱ tests them in 3 seconds. They belong to the session and work with the panel closed.',
        // Blueprint, settings table (stuckThresholdSeconds 240); Approval Queue (stalled sessions); Timeline ("no live process")
        'A session silent for 4 minutes is marked stalled and joins Needs You. One whose process is gone says so, and can be cleared.',
      ],
      set: [
        // Blueprint, settings table
        ['agentFarm.stuckThresholdSeconds', '240', 'Seconds of silence before a session is marked stalled. 0 = never.'],
        ['agentFarm.notifyTurnEnd', 'off', 'A notification every time any agent finishes a turn. Can be noisy.'],
      ],
    },

    worktrees: {
      fig: ['Plan first', 'A branch each', 'Commit when done', 'Merge, open or discard', 'Nothing left behind'],
      // Blueprint, Parallel Worktree Runs ("several jobs in the same repo, zero conflicts")
      why: 'Two agents in the same repository at once overwrite each other\'s files and mix their changes into one diff nobody can review.',
      how: [
        // Blueprint, Isolated Git Worktree Parallel Orchestration (PARALLEL_MAX 6; dryRun true by default)
        '<code>Run Parallel Worktrees…</code> takes an agent\'s repository and up to six prompts. Asked over the bridge, it first only says what it would do: the branches it would make, and whether they would run at once.',
        // Blueprint, Parallel Worktree Runs (af/ branch, .af-worktrees-* folder); maxConcurrentPerAgent throttles
        'Each prompt runs in its own git worktree, on an <code>af/</code> branch in a folder beside the repository, so no job touches another\'s files. As many run at once as the agent\'s ceiling allows; the rest wait their turn.',
        // Blueprint, Parallel Worktree Runs ("commit when done" instruction; ⑂ prefix on the board)
        'Each is told to commit when it is done, and its card shows on the board with ⑂ in front.',
        // Blueprint, Parallel Worktree Runs (Worktree Runs…: commits, diffstat, uncommitted; Merge --no-ff, Open, Discard)
        '<code>Worktree Runs…</code> lists them with their commits, the lines they changed and anything not committed. Merge brings one onto your branch and cleans up, Open shows it in a new window, Discard deletes it after asking.',
        // Blueprint, Parallel Worktree Runs ("A branch never outlives its worktree unseen")
        'A minute after VS Code opens, and each time the list opens, the repositories are swept: a merged <code>af/</code> branch is removed, and one with work of its own is listed to merge or discard.',
      ],
      set: [
        // Blueprint, settings table; Isolated Git Worktree Parallel Orchestration (concurrency throttled by it)
        ['agentFarm.maxConcurrentPerAgent', '1', 'How many of one agent\'s runs go at once; the other worktrees wait.'],
      ],
    },
  },

  faq: [
    // Blueprint, Missions (Workdir safety); Parallel Worktree Runs
    ['Can two agents edit the same files at once?', 'Not by accident. In a mission with a working folder, writers take turns and only read-only steps share a wave. For jobs that should run side by side, each gets its own git worktree and branch.'],
    // Blueprint, Missions (Hard limits)
    ['Can a mission run away with my plan?', 'No. Every mission has five caps, cost, rounds, tasks, minutes and tasks at once, and when one is spent the lead may only finish. Repeating the same work to the same agent is refused.'],
    // Blueprint, Question Auto-Timer Resolution; Console (permissions not on the bridge)
    ['What if nobody answers an agent\'s question?', 'When the countdown ends, the answer the agent recommended goes in, and the agent is told it was the timer. A destructive question and a tool permission are never answered on a clock: they wait in Needs You.'],
    // Blueprint, Normalized Multi-Engine Transcript Reader; Missions (per-member engine)
    ['Can agents on different engines work on the same thing?', 'Yes. A mission\'s team can mix Claude Code, Codex, Gemini CLI, Antigravity and OpenCode, and any agent can read any engine\'s session in the same words.'],
    // Blueprint, A2A; Classic vs. Adaptive Missions 5
    ['Do agents talk to each other?', 'Through notes and tasks on the A2A board, and in an adaptive mission through a conversation in which each turn is shown what the others actually wrote. Nothing reaches you unless it is for you.'],
    // Blueprint, Notices and the Work Queue; Approval Queue
    ['What is the difference between Notices, the queue and Needs You?', 'Notices is what agents tell you. The Work Queue is what you give them. Needs You is only what stays stuck until you act: a permission, a question no timer answers, a stalled session.'],
  ],
};
