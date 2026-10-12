// District IV, Recipes and triggers: the words of its page (/features/recipes-and-triggers/). Names, sentences and tile
// figures are in data/features.js; this file holds what the page says beyond them. Every rule, default and setting key was
// read in the extension's own guide (the Blueprint, cited by section heading: "Multi-Agent Workflows", "Scheduled Tasks",
// "Triggers", "The Automation Gate", "Kapici", "Concurrency and the Quota Guard", "Task Output Archive", "Task Cost",
// "Task Templates", "Task History", "Multi-Round Tasks", "Task Forecast"
// and the release notes named), its Technical DNA (cited by §) or the owner's ranked feature list (§7, §17); the
// citations are the comments. Agents, files, times and figures in the figures are demo data.
// how and note may hold <code> and <em>; everything else is plain text. fig: a short label per step of how, shown on
// the step and under the feature's figure (scripts/figs/automation.js draws the figures and what each step shows).

export default {
  description: 'Work that starts by itself: workflows that hand each step\'s output to the next, schedules that survive a closed laptop, triggers on a file, a hook or a private address, Gatekeeper deciding whether there is real work, one sentence instead of a form, a queue with ceilings, a record of every run with its output and price, retries and rounds, one switch for all of it, and a forecast of the week.',
  promise: 'Some work should not wait for you to press a button: the Monday video, the folder of new footage, the report at nine. Here it starts on a clock, on an event or from one sentence, runs in turn under the limits you set, tries again when a plan runs out, and stops everywhere at once when you say so.',

  features: {
    flows: {
      fig: ['The chain', 'Handing on', 'Branches', 'Your yes', 'Side by side'],
      // Blueprint, "Multi-Agent Workflows" (copying one output into the next by hand)
      why: 'Work that needs several agents or tools in a row means copying one result into the next by hand, and waiting at the desk to do it.',
      how: [
        // Blueprint, Multi-Agent Workflows (+ Workflow on the Plan tab; step kinds); Technical DNA §5 (tool, checkpoint, publish)
        'A workflow is a list of steps, built on the Tasks page with <code>+ Workflow</code>. A step can be an agent, an HTTP call with no agent, an image or video job, a browser run, a local tool such as ffmpeg that spends no tokens, or a stop that waits for you.',
        // Blueprint, "Structured Handoff"; "Feeding the flow" (workflowPrevTextChars 1,500; the run's board)
        'Each step gets what the last one made: <code>{prev_output}</code> is its file, <code>{prev_text}</code> its text, cut at 1,500 characters, and <code>{prev_json.title}</code> one field of it. Any later step can also read any earlier one by name.',
        // Blueprint, "Conditional Branching"; "Verify Steps"
        'A step can run only when the last output matches a pattern, and say what happens when it fails: stop, carry on, or jump to another step. A cheap judge can check a step and send it back once with its reason. A run is capped at 25 step executions, so a loop cannot run away.',
        // Blueprint, "Approval Step"
        'An approval step stops the chain without calling any model. The request shows as a notification and in Needs You; approve and the last output goes on unchanged, reject and the step\'s failure rule applies.',
        // Blueprint, "Parallel Steps"; "Feeding the flow" (for-each: concurrency 4, 1–16)
        'Steps marked parallel run side by side and their outputs merge back into one handoff. A for-each step runs once per item of a list, four at a time by default, up to sixteen.',
      ],
      set: [
        // Blueprint, Feeding the flow
        ['workflowPrevTextChars', '1,500', 'How much of the last step\'s text the next step is handed as {prev_text}.'],
        // Blueprint, Media Production Pipeline (A-27 part 1)
        ['agentFarm.workflowSpendCap', '0 (none)', 'Once a run has spent this much, no further step starts.'],
        // Blueprint, Multi-Agent Workflows (browser step)
        ['agentFarm.browserApproval', 'ask', 'Whether a browser step asks before it acts.'],
      ],
      // Blueprint, Parallel Steps; Approval Step; Headless Service
      note: 'Workflows run in VS Code. If it closes in the middle of a parallel group, Resume runs the whole group again, and an approval waits until a window is open.',
      see: { href: '#au-panel', l: 'The Plan tab and a recipe, live' },
    },

    schedules: {
      fig: ['Three kinds', 'A missed run', 'VS Code closed', 'Quiet hours', 'Other ways in'],
      // Blueprint, "Scheduled Tasks"
      why: 'A morning plan or a weekly report should start without anyone pressing a button, and a night the laptop was shut should not leave you guessing what ran.',
      how: [
        // Blueprint, Scheduled Tasks (Daily, Weekly, Once; a one-time schedule switches itself off)
        'A schedule is daily, weekly on a day and an hour, or once on a date. A one-time schedule switches itself off after it runs. Each has its agent, its prompt and, if you like, its own model.',
        // Blueprint, Scheduled Tasks (missed-time policy)
        'For a run that was missed, each schedule has a rule: skip it, which is the default, catch up at the first chance, or ask you with Run now and Skip this one. Picking a rule settles the past; only runs missed after it count.',
        // Blueprint, "Headless Service"; Technical DNA §3.6 (30 s heartbeat, ~90 s takeover, service-runs.jsonl)
        'On Windows, a small service can take over while VS Code is closed. It sleeps as long as VS Code writes its heartbeat every 30 seconds, takes over about 90 seconds after the last one, and runs schedules and watch triggers with <code>claude -p</code>, keeping a log of each run.',
        // Blueprint, The Automation Gate (quiet hours: deferred, not dropped)
        'Inside quiet hours nothing wakes on its own. A schedule whose time comes is deferred, not dropped: it fires when the window ends, with a <em>deferred</em> badge.',
        // Blueprint, "Scheduling Outside VS Code"; Farm Bridge (schedules.add and the rest)
        'An agent can add, edit, switch or run a schedule itself through the bridge. Or export one as a Windows Scheduled Task, a small script plus the command that registers it.',
      ],
      // Blueprint, Headless Service; Kapici (M-59: a schedule refuses a Gatekeeper precondition)
      note: 'The service runs Claude only, and only schedules and watch triggers; hooks, webhooks and workflows wait for VS Code. Only one window runs the scheduler, so two open windows never fire a schedule twice.',
      see: { href: '#au-panel', l: 'Schedules on the Plan tab' },
    },

    triggers: {
      fig: ['A file lands', 'Live hooks', 'A private address', 'What it runs', 'Storm guards'],
      // Blueprint, "Triggers"
      why: 'Some work has no time of day. It starts when footage arrives, when a session ends, or when another program says so.',
      how: [
        // Blueprint, Trigger Types (watch; FAST_NOTE example, ~10 s)
        'A watch trigger fires when a file or folder changes. Drop a note into a watched folder and its agent is at work about ten seconds later.',
        // Blueprint, Trigger Types (hook: stop, end, permission, compact, subagent; Live Hooks)
        'A hook trigger fires on a live event in a session: a turn stops, a session ends, a permission is asked, a context is compacted, a subagent finishes. It can be limited to one agent.',
        // Blueprint, "Inbound: the /trigger Endpoint"; Technical DNA §3.2
        'A webhook trigger gets a private address on this machine, <code>http://127.0.0.1:8377/trigger/&lt;token&gt;</code>. Whatever is posted to it reaches the prompt as <code>{payload}</code>; a wrong token gets nothing back but a 404.',
        // Blueprint, "Action and Guards"; "Dispatcher"
        'A firing does one of three things: runs a task on the agent you picked, dispatches it to whichever agent fits (your rules first, then a cheap classifier), or starts a workflow.',
        // Blueprint, Action and Guards (debounce 10 s, cooldown 60 s, 6 an hour); Automation Gate §2 (fireIf); Trigger Scorecard
        'Each trigger has storm guards: it waits for 10 seconds of quiet, rests 60 seconds after firing, and fires at most 6 times an hour. A free check can ask first whether the folder has files at all. Its row keeps score: how often it fired, passed and failed.',
      ],
      set: [
        // Blueprint, Inbound; Technical DNA §3.2
        ['agentFarm.livePort', '8377', 'The local port that hooks and the private trigger addresses listen on.'],
        // Blueprint, Dispatcher
        ['agentFarm.dispatchRules', '[]', 'Your own patterns that send a firing to an agent before the classifier is asked.'],
        ['agentFarm.dispatchClassifier', 'on', 'When no rule matches, a cheap model picks the agent.'],
      ],
      // Blueprint, Inbound ("set up your own tunnel"); Action and Guards (a trigger that watches its own output is refused)
      note: 'The private address answers on this machine only; reaching it from outside needs a tunnel you set up yourself. A trigger that would watch its own output folder is refused, so it cannot wake itself.',
      see: { href: '#au-flow', l: 'A watch trigger and its recipe, live' },
    },

    gatekeeper: {
      fig: ['Free checks first', 'Jev decides', 'In the shadow', 'Four places', 'Never in the way'],
      // Blueprint, "The Automation Gate" (23 wake-ups, five nights, $70.90)
      why: 'One folder watch woke opus 23 times over five nights, found nothing every time, and cost $70.90. A cooldown limits how often an agent wakes; it never asks whether there is anything to do.',
      how: [
        // Blueprint, Kapici (provider order: heuristic, Jev, llm, arbiter); Technical DNA §5
        'Gatekeeper answers small questions without waking an agent. Free local checks on numbers, dates, counts and patterns answer first, on this machine.',
        // Blueprint, Kapici (Jev answers typed questions; trigger.has-work, passIf work > 0.5, first 64 KB or git diff); M-59
        'Then Jev, a small model that only answers typed questions, a probability, a choice or a score, and writes no text. For a trigger it reads the firing and the file\'s first 64 KB, or its git diff, and says how likely it is that there is work.',
        // Blueprint, Kapici (shadow; agreement rate per consumer over 30 days)
        'Each use starts off. In shadow, the old path still decides and Gatekeeper is asked afterwards, quietly; Farm Settings shows how often the two agreed over 30 days. Turning it on is your call.',
        // Blueprint, Kapici (four consumers)
        'It serves four places, each switched on its own: which agent a dispatch goes to, how a cut-off task carries on, whether a trigger fires, and where a workflow step goes.',
        // Blueprint, Kapici (never throws; 10-minute cache; masked input; audit keeps a hash and length; MCP server)
        'It never stands in the way. With no rule, no key or an error, the caller\'s own path decides, and no other model is called instead. Answers are cached for 10 minutes, the input is masked, and the audit keeps only a hash and a length.',
      ],
      set: [
        // Blueprint, Kapici
        ['agentFarm.kapici.trigger', 'off', 'Whether Gatekeeper decides a trigger\'s firing: off, shadow or on. The same for dispatch, retry and workflow.'],
        ['agentFarm.kapici.timeoutMs', '3000', 'How long it may take; past it, the caller\'s own path decides.'],
        ['agentFarm.kapici.route', 'auto', 'Which service answers for Jev, picked from the key you keep in the vault.'],
      ],
      // Blueprint, Kapici (rules builtin → system → project; MCP server with three tools)
      note: 'Rules come in layers, the built-in ones, yours, then a project\'s, the later one winning. Gatekeeper also comes as an MCP server with three tools, registered only when you ask.',
      see: { href: '#au-flow', l: 'Gatekeeper saying no, live' },
    },

    words: {
      fig: ['One sentence', 'A plan', 'Checked', 'Your Create', 'Who should do it'],
      // Blueprint, "Natural Language Command"
      why: 'Setting up a job, a schedule or a chain through forms is slow, and it is the reason a good idea for an automation never gets set up.',
      how: [
        // Blueprint, Natural Language Command (🚀; Agent Farm: Natural Language Command…)
        'Type a sentence into the command bar, from 🚀 on the Tasks page or the command palette.',
        // Blueprint, Natural Language Command (a cheap model; one-time job, schedule, chain)
        'A cheap model turns it into a plan: a one-time job, a schedule, or a chain of steps.',
        // Blueprint, Natural Language Command (real agent names; times and steps checked; "tomorrow" computed; raw output on error)
        'The plan is checked before you see it: only agents that exist, times worked out from today\'s date, steps in order. If the model rambles you get the error and its raw output, not a guess.',
        // Blueprint, Natural Language Command (Create / Create & Run)
        'You read the plan in plain words. Nothing is set up until you press Create, or Create &amp; Run.',
        // Blueprint, "Dispatcher" (regex rules, then a classifier over each agent's CLAUDE.md summary; Test Dispatcher…)
        'Work that arrives with no agent named, a webhook body or a dropped file, goes to the Dispatcher: your patterns first, then a cheap classifier that reads what each agent says it is for. <code>Test Dispatcher…</code> shows where a sentence would land, and why.',
      ],
      // Blueprint, 2.0.0 release notes (real haiku against "tomorrow 09:00", a 2-step chain's order, agent picking)
      note: 'Its tests run a real cheap model against sentences such as "tomorrow 09:00", a two-step chain\'s order and picking the agent.',
      see: { href: '#au-panel', l: 'The words box on the Runs tab' },
    },

    queue: {
      fig: ['Ceilings', 'Held, not dropped', 'Who goes first', 'One after another', 'Checked before start'],
      // Blueprint, "Concurrency and the Quota Guard"
      why: 'Unattended jobs pile onto the same agent and the same plan. An overnight factory can eat the morning\'s quota before you sit down.',
      how: [
        // Blueprint, Concurrency (maxConcurrentTasks 2, maxConcurrentPerAgent 1)
        'Two runs at once across the fleet, and one per agent, by default. Both are yours to change.',
        // Blueprint, Concurrency ("deferred" badge; runs by itself when capacity opens)
        'A run that meets a ceiling is not cancelled. It waits with a <em>deferred</em> badge and starts by itself when a slot frees.',
        // Blueprint, "Rerun and Priority" (priority, older first, +1 every 30 min, Run Next)
        'Higher priority goes first, the older task on a tie, and a waiting task gains a point of priority every 30 minutes, so nothing waits for ever. Run Next moves one to the front.',
        // Blueprint, "Adding and Running Tasks" (queueAutoAdvance off)
        'An agent\'s own list of queued tasks waits for your ▶, unless you turn on auto-advance: then its next task starts as the last one ends.',
        // Blueprint, Concurrency (quotaGuardPercent); Automation Gate §4 (budgets park with the reason)
        'Before a run starts it is checked: past the quota guard\'s line, automatic jobs wait; over its budget, it is parked with the reason written on it.',
      ],
      set: [
        ['agentFarm.maxConcurrentTasks', '2', 'Runs at once across the fleet. 0 = no ceiling.'],
        ['agentFarm.maxConcurrentPerAgent', '1', 'Runs at once on one agent.'],
        ['agentFarm.queueAutoAdvance', 'off', 'Start an agent\'s next queued task when one finishes.'],
      ],
      // Blueprint, Concurrency (tasks.owner lease; ~20 s takeover)
      note: 'One VS Code window runs the queue; the others watch. If it closes, another takes over in about 20 seconds.',
      see: { href: '#au-panel', l: 'The Automation strip, live' },
    },

    record: {
      fig: ['In the background', 'Failed is failed', 'What it cost', 'A template', 'Nothing lost'],
      why: 'A run that happened while you slept is only worth something if you can read what it said, know whether it really worked and what it cost, and if the job you set up every week does not have to be typed again.',
      how: [
        // Blueprint, "Task Output Archive"
        'A task runs as a background process, not in a terminal. All it says is written to a Markdown file with its title, agent and start time, and the exit code and duration go at the end. <code>Open Task Output</code> shows it, even while it is still running.',
        // Blueprint, "Task Output Archive" (an exit code other than 0 marks it failed)
        'An exit code other than 0 marks the task failed by itself, so a retry, a workflow\'s failure rule or the morning digest never takes a crash for a finished job.',
        // Blueprint, "Task Cost (2.40.0)" (lifetime match, the badge, the digest, the honesty rule)
        'When a run ends, the farm finds the transcript it wrote and puts the price on the row, <em>done • $0.12 • 3m ago</em>, and the day\'s total goes into the daily digest. If another session ran in the same agent folder at the same time, it cannot tell whose cost was whose, so the row stays without a price.',
        // Blueprint, "Task Templates"
        'Right-click a task and <code>Save as Template</code>. A template belongs to one agent, or to any agent and then asks which when you run it. ▶ on a template makes a new task in one click.',
        // Blueprint, "Task History"; settings table (outputsMaxMB 200)
        '<code>Clear Finished Tasks</code> moves finished rows into a history file for each month, opened with <code>Open Task History</code>. The output folder stays under its ceiling by dropping the oldest outputs no task points to.',
      ],
      set: [
        // Blueprint, settings table
        ['agentFarm.outputsMaxMB', '200', 'How big the folder of task outputs may grow, in MB, before the oldest unreferenced ones go.'],
      ],
      // Blueprint, the bridge's control plane (tasks.get also returns the task's archived output)
      note: 'Over the bridge, <code>tasks.get</code> hands an agent the archived output of a task, so one agent can read what another one\'s night run produced.',
      see: { href: '#au-panel', l: 'The Runs tab, live' },
    },

    retries: {
      fig: ['A wall at 03:00', 'Every 40 minutes', 'At the reset', 'Another account', 'Rounds'],
      // Blueprint, 3.405.0 (X-226); Multi-Round Tasks
      why: 'A run at 03:00 that hits a usage limit should not die with nobody watching. And a job in several stages should keep one conversation, not start four.',
      how: [
        // Blueprint, 3.402.0 (X-227: maybeScheduleRetry carries every run dimension)
        'A run that fails tries again by itself, with everything it had: the same agent, account, route and prompt. By hand, <code>Retry with edited prompt…</code> sends it again with a change.',
        // Blueprint, 3.405.0 (an unconfigured run waits forty minutes)
        'Out of the box it waits 40 minutes between tries, or a growing pause if you set one.',
        // Blueprint, 3.405.0 / 3.402.0 (resetAware ships off; waits for the engine's published reset); the plan walled four hours, six tries
        'Reset-aware, it waits for the time the plan says it resets instead. Without it, a plan walled for four hours was retried every 40 minutes and failed six times.',
        // Blueprint, 3.405.0 (carryOnAccount and its limits)
        'It can carry on on another signed-in account of the same engine, but never the one that refused, never from an empty pool, and never for a failure that was not a limit.',
        // Blueprint, "Multi-Round Tasks" (M-27: R2, R3, wait N min, --resume, notBefore rows, R2/4 badge)
        'A task can have rounds: a second prompt, a third, each after a wait you set, all in the same conversation. The waits are queue rows, so a restart does not lose them, and a badge shows how far it is, R2/4.',
      ],
      set: [
        // Blueprint, 3.297.0 (taskRetry), 3.405.0 (40 min; resetAware off)
        ['agentFarm.taskRetry', '40 min, not reset-aware', 'How a failed run tries again: the pause, a growing back-off, the plan\'s reset, another account.'],
        // Blueprint, Kapici (retry consumer)
        ['agentFarm.kapici.retry', 'off', 'Let Gatekeeper decide how a cut-off task goes on.'],
      ],
      // Blueprint, Kapici (retry supervisor, M-13)
      note: 'A retry supervisor decides how a cut-off task goes on: it resumes only when there is a session to continue, and waits only when the reset time is known.',
      see: { href: '#au-panel', l: 'Runs and their retries' },
    },

    mainswitch: {
      fig: ['One switch', 'For a while', 'Quiet hours', 'You can still run it', 'Everything listens'],
      // Blueprint, The Automation Gate §1
      why: 'With schedules, triggers, chains and night shifts running, you need one place that stops all of it, and nights in which nothing wakes.',
      how: [
        // Blueprint, The Automation Gate (Pause All / Resume All, with a reason)
        '<code>Pause all</code> stops every automation at once, with a reason if you give one. <code>Resume all</code> starts them again.',
        // Blueprint, The Automation Gate (1h / 8h / 24h); bridge automations.pause
        'Or pause for 1, 8 or 24 hours, and it lifts by itself.',
        // Blueprint, The Automation Gate (quiet hours, e.g. 23:30–04:30, wrap midnight; deferred, not dropped)
        'Quiet hours, such as 23:30 to 04:30, may wrap past midnight. Inside them nothing wakes on its own; a schedule that comes due waits for the end of the window.',
        // Blueprint, The Automation Gate (manual run now ignores quiet hours; the switch still applies)
        'A run you start yourself ignores quiet hours. The main switch still stops it.',
        // Blueprint, Bridge (automations.pause, bulk, status); 3.376.0 (Sentry obeys the switch, pause and quiet hours)
        'Schedules, triggers, workflows and the night shift all obey it. An agent can ask its state, or pause it, through the bridge.',
      ],
      // Technical DNA §6 (automation quiet hours and alert-sound quiet hours are separate)
      note: 'The quiet hours for automations and the quiet hours for sounds are two separate settings: one keeps agents asleep, the other keeps the house quiet.',
      see: { href: '#au-strip', l: 'Pause all and quiet hours, live' },
    },

    forecast: {
      fig: ['The week ahead', 'How long, how sure', 'What is waiting', 'Health', 'Chronic failures'],
      // Blueprint, "Task Forecast"; "Task Health"
      why: 'Before a night or a week of unattended work, you want to see what will run, and whether the jobs you hand off come back.',
      how: [
        // Blueprint, Task Forecast (forecastDays 7, grouped by day)
        'The forecast lists every schedule\'s runs over the next 7 days, day by day.',
        // Blueprint, Task Forecast (median duration and success rate over the last 30 days; successful runs only)
        'Beside each run: that job\'s median time and its success rate over the last 30 days. The median counts only the runs that passed, and there is no dollar forecast.',
        // Blueprint, Task Forecast (running and queued with the defer reason; totals)
        'It also shows what is running and what is waiting, with why it is waiting, and the total: how many runs, how much agent time.',
        // Blueprint, Task Health (green ≥ 80%, red < 50%)
        'Each task\'s health card shows its success rate, green from 80%, red under 50%, with how often it was retried or sent back by a check.',
        // Blueprint, Task Health (Insights: under 50% with 5+ runs; a family all failing; families ignore (retry N), dates and numbers)
        'Insights warns when an agent passes under half its runs in 30 days, with at least five, and when a family of tasks has failed every recent run. A family is the same job whatever its date or number.',
      ],
      set: [
        // Blueprint, Task Forecast
        ['forecastDays', '7', 'How many days ahead the forecast lists.'],
      ],
      // Blueprint, Tasks Page (Task Analytics: KPIs, throughput, scorecard, families, alerts; Markdown export)
      note: 'Task Analytics puts 30 days in one page: the figures, throughput, a scorecard per agent, task families and alerts, each table exportable as Markdown.',
      see: { href: '#au-panel', l: 'The Tasks page, live' },
    },
  },

  faq: [
    // Blueprint, Headless Service; Scheduling Outside VS Code
    ['Do schedules run with VS Code closed?', 'On Windows, yes, if you install the small headless service: it runs schedules and watch triggers with Claude while VS Code is closed. Or export a schedule as a Windows Scheduled Task.'],
    // Blueprint, The Automation Gate
    ['How do I stop an empty folder from waking an expensive model?', 'Give the trigger a free check, such as "the folder has files", or put Gatekeeper on it. Without either, one watch once cost <b>$70.90</b> in five nights of finding nothing.'],
    // Blueprint, The Automation Gate
    ['What happens to a schedule in quiet hours?', 'It waits for the end of the window and then runs, marked deferred. A run you start yourself ignores quiet hours; the main switch still stops it.'],
    // Blueprint, Concurrency
    ['How many runs go at once?', 'Two across the fleet and one per agent, by default. The rest wait, marked deferred, and start as slots free.'],
    // Blueprint, 3.405.0
    ['What if a run hits my usage limit at night?', 'It tries again by itself, after 40 minutes unless you set it otherwise. It can also wait for the plan\'s reset, or carry on on another signed-in account of the same engine.'],
    // Blueprint, Kapici; One-Click Example Setup
    ['Is Gatekeeper on by default? Is there a quick start?', 'Gatekeeper is off for every use; shadow shows how often it agrees with you before you turn it on, and it needs a key for Jev. For a quick start, one click sets up three examples: an inbox duty, a briefing at 09:00 and a two-agent chain.'],
  ],
};
