// District IX, Measured, not claimed: the words of its page (/features/measured-not-claimed/). Names, sentences and tile
// figures are in data/features.js; this file holds what the page says beyond them. Every default, limit and setting key
// was read in the extension's own guide (the Blueprint, cited by section heading), its Technical DNA (cited by §) or the
// owner's ranked feature list (cited by its section number: §6 cost and quota, §15 quality); the citations are the
// comments. Figures written as measurements (1,737 thinking blocks, 0.80× to 3.86×, $0.0245 → $0.0021) are the
// Blueprint's own measurements, quoted; the rest of the numbers on this page are demo data.
// how and note may hold <code> and <em>; everything else is plain text. fig: a short label per step of how, shown on
// the step and under the feature's figure (scripts/figs/measure.js draws the figures and what each step shows).

export default {
  description: 'How full each account\'s plan window is and when it resets, what every step of a turn cost in money and in plan, budgets that brake, cheaper models instead of a stop, cost alarms from a median, and work judged against its criteria by the cheapest model that can tell.',
  promise: 'An agent always sounds sure, and a dashboard can always look exact. Agent Farm counts instead: what each step cost, read from the transcripts on your machine; how much of every plan is left, as the provider reports it; whether the work passed its check, judged by a cheap model first. Where a figure cannot be known it says so, and it never fills the gap with a guess.',

  features: {
    planuse: {
      fig: ['The status bar', 'The card', 'Its beat', 'Every account', 'When it cannot know'],
      // Blueprint, Dashboard: "The two percentages, without opening anything (3.42.0)"
      why: 'The limit of a subscription plan arrives in the middle of a turn, without warning. Typing /usage in Claude Code tells you where you stand, if you remember to, and usually after the long turn rather than before it.',
      how: [
        // Blueprint, Dashboard: "The two percentages, without opening anything (3.42.0)", first field since 3.43.0
        'The status bar of every window shows the time left in the five-hour window, how full it is, and the week: <code>3h 49m - 86% / wk 41%</code>. It turns yellow at 80% and red at 95%, driven by the worst limit on your plan, even one there is no room to print.',
        // Blueprint, Dashboard: "Plan usage card (3.23.0)"
        'On the Dashboard, the plan usage card holds the same figures Anthropic reports to <code>/usage</code>: the current session (5h), the current week (all models) and the per-model weekly bars when your plan has them, each with its reset as a clock time and a countdown: "Resets 21:40 · in 2h 20m".',
        // Blueprint, Dashboard: "One beat, two windows (3.43.0)", 3.45.0, 3.45.1
        'The figures move only while a turn runs, so the beat follows the fleet: every 60 seconds while an agent works, every 5 minutes while the farm is idle. A turn that ends pulls the next read forward. The bar, the card and any agent asking share one reading: one request per beat.',
        // Blueprint, Engines: Multi-Account Management (X-187, X-206, X-215), 3.572.0, 3.580.0; Technical DNA §2.7 (Quota, engineUsage.ts); X-437
        'Every account shows its own five-hour and weekly bars. A Claude account is read with its own sign-in, a Codex account from its session file, and Antigravity\'s quota by <code>agy -p /usage</code> on a beat of its own, only while Antigravity works.',
        // Blueprint, Dashboard: three honesty rules (3.42.0); Plan usage card; "The interval was never what earned the 429s (3.45.0)"
        'When it cannot know, it says so. With no subscription sign-in there is no indicator at all. An expired sign-in reads <code>usage ?</code> and asks you to start a Claude Code session, because Agent Farm never writes to the CLI\'s sign-in. A busy endpoint is left alone for 3, 6, 12, then 15 minutes, and the tooltip says when the next read is.',
      ],
      set: [
        // Blueprint, Dashboard: "The two percentages" and "One beat, two windows"
        ['agentFarm.planUsageWarnPercent', '80%', 'The status bar turns yellow.'],
        ['agentFarm.planUsageDangerPercent', '95%', 'The status bar turns red.'],
        ['agentFarm.planUsageActiveRefreshSeconds', '60 s', 'How often the plan is read while an agent works. Never under 30 s.'],
        ['agentFarm.planUsageRefreshMinutes', '5 min', 'How often an idle farm reads it. 0 = only when you press ⟳.'],
        ['agentFarm.planUsageStatusBar', 'on', 'The status bar indicator. The card stays either way.'],
      ],
      // Blueprint, Status Bar: "Token lap counter (2.6.0)"; the owner's list §6 (quotaStyle.*)
      note: 'Beside it, a lap counter of your own: <em>Reset Token Lap</em> counts the whole fleet\'s tokens, cost and messages from that moment, as <code>⏱ 84.2K</code> in the status bar, like a car\'s trip meter. How the percentage, the time left and the reset are drawn is yours to change (<code>quotaStyle.*</code>).',
      see: { href: '#s-meter', l: 'Every account\'s plan, live' },
    },

    steps: {
      fig: ['Nine kinds', 'Every step counted', 'What each call cost', 'Raw and ⚖', 'Cache by its life'],
      // Blueprint, What Work Costs: "Nine kinds of step"; "The fault was the UNIT"
      why: '"Where did my limit go?" had no answer. Reading a file and nine seconds of the model\'s reasoning drew the same row, though one runs here for free and the other is billed at the output rate. And a raw token total is mostly cache reads, the cheapest thing in it, so it does not describe the wall it seems to.',
      how: [
        // Blueprint, What Work Costs: the nine kinds table; stepkind.ts (Technical DNA §4.5)
        'Every step of a turn is one of nine kinds, each with its glyph: ◈ thinking, ▸ reply, ⌘ local tool, ↩ tool result, ⇄ MCP tool, ⌗ web, ⑂ sub-agent, ⚙ harness, · local only. The kinds were counted in 60 real transcripts before they were named.',
        // Blueprint, What Work Costs: "Thinking was the invisible one"; "26api·99steps"
        'A step is anything an agent does: it reasoned, it wrote, or it called a tool. Thinking was the invisible one: 1,737 thinking blocks against 878 replies in the measurement, every token billed as output. A turn is written <code>26api·99steps</code>: the round trips, then the steps they carried.',
        // Blueprint, What Work Costs: "Each step also carries what its API call spent"
        'Each step carries what its API call spent, raw and weighted, written once, on the call\'s first step. A step with no figure did not cost nothing: it rode on the call above it, and its tooltip says so.',
        // Blueprint, What Work Costs: "The fault was the UNIT"; "It is all a setting" (quotaWeightMode model-aware)
        'Every token figure carries two numbers: raw, then ⚖ weighted, which counts tokens the way the plan\'s limit does, against one Sonnet input token. A cache read weighs about a tenth, an output token five, an Opus token five Sonnets. Measured over 32 days, raw ÷ weighted for a busy window ran from 0.80× to 3.86×.',
        // Blueprint, What Work Costs: "Cache writes are priced by TTL, and the 1-hour rate is the one that applies"
        'Cache writes are priced by how long they live: a one-hour write at twice an input token, a five-minute one at 1.25. The split is read from each line, and a line that does not give it is charged at the one-hour rate, because understating a turn is the mistake being fixed.',
      ],
      set: [
        // Blueprint, What Work Costs: "It is all a setting"
        ['agentFarm.quotaWeightMode', 'model-aware', 'model-aware: Opus 5, Sonnet 1, Haiku ⅓. model-flat: weigh only the kinds of token. raw: ⚖ is the raw total.'],
        ['agentFarm.quotaWeights', 'the table', 'The weights per model, against one Sonnet input token. Apart from the prices, so a billing fix never moves the gauge.'],
        ['agentFarm.windowWeightedTokenLimit', '0 (off)', 'Your five-hour ceiling in weighted tokens, for a percentage.'],
        // Blueprint, Cost Accounting (the table); Settings reference
        ['agentFarm.pricing', 'the rate card', 'USD per million tokens per model pattern; the first match wins.'],
      ],
      // Blueprint, What Work Costs: "It is all a setting" (re-read on change; an unusable table falls back)
      note: 'The rates are the provider\'s, so they are settings, never a release. Changing the weights re-reads every transcript at once, and a table that cannot be used falls back to the shipped one rather than quietly zeroing the gauge.',
      see: { href: '#m-spend', l: 'A live leg, counted by kind' },
    },

    budgets: {
      fig: ['Per agent, per fleet', 'A warning, then a brake', 'A run\'s cap', 'A mission\'s two', 'Media, and all off'],
      // Blueprint, Automation: "4. Budget is a brake, not a warning"
      why: 'An agent left to run overnight can spend what was meant for a week, and a warning in the morning is too late. A ceiling you can walk through is not a ceiling.',
      how: [
        // Blueprint, Budget Alerts (agentFarm.budgets; "*" = fleet); 3.209.0 (0 = no cap on that name)
        'A daily budget in dollars per agent, and <code>"*"</code> for the whole fleet: <code>{"builder": 25, "*": 50}</code>. A figure of 0 lifts that one name\'s cap and leaves the others in force.',
        // Blueprint, Budget Alerts (80% ⚠, over ⛔ + one notification a day); "Budget is a brake, not a warning"
        'At 80% the agent gets a ⚠ in Insights. Past its budget it is a ⛔, a notification comes once a day, and the next launch is blocked: the task is parked with the reason.',
        // Blueprint, Production: "The run's hard spend cap" (A-27 part 1, 3.709.0)
        'A workflow run has a hard cap of its own. Once the run has spent it, counting every step, the media and the checks, no further step starts. The run stops saying what it spent, the cap, and where the cap came from. Nothing is asked, so nothing can talk past it.',
        // Blueprint, Missions: maxCostUSD and maxTokens; "The ceilings belong to whoever pays for the run (3.231.0)"
        'A mission carries a dollar ceiling and a token ceiling, 2,000,000 by default, and stops at whichever runs out first, because a team on a plan never moves the dollars. Its lead is told both. 0 means no ceiling, on every axis.',
        // Blueprint, Media Cost and Budget (mediaBudgetMonthUSD); 3.209.0 (budgetsUnlimited); 3.649.0 (Telegram maxDailyUSD)
        'Media has a monthly budget: a warning once a month when the last 30 days\' estimated media cost passes it. Sessions opened from Telegram have a daily cap. And one switch lifts every daily budget at once, keeping your figures for when you turn it back.',
      ],
      set: [
        // Blueprint, Settings reference; 3.209.0; Production (workflowSpendCap); Media Cost and Budget
        ['agentFarm.budgets', '{}', 'Daily USD per agent; "*" = the fleet.'],
        ['agentFarm.budgetsUnlimited', 'off', 'Suspends every daily budget without losing the figures.'],
        ['agentFarm.workflowSpendCap', '0 (none)', 'A run\'s hard cap; a workflow or a single run can set its own.'],
        ['agentFarm.mediaBudgetMonthUSD', '0 (off)', 'A warning when the last 30 days\' media cost passes it.'],
      ],
      // Blueprint, Budget Alerts ("The numbers are API-equivalent value"); 3.209.0 ("honoured everywhere or not at all")
      note: 'On a subscription the dollars are the API-equivalent value of the work, not a bill: "builder should not use more than $25 of value today". Seven places read the budgets, and all seven read them through one door, so the switch that lifts them is obeyed everywhere or nowhere.',
      see: { href: '#m-spend', l: 'Budgets filling, live' },
    },

    downgrade: {
      fig: ['Wait', 'The handover line', 'Cheaper', 'Said in the output', 'By where it came from'],
      // Blueprint, Concurrency and the Quota Guard ("an overnight factory won't have eaten your morning quota")
      why: 'An overnight factory eats the morning\'s quota, and a job that hits the wall halfway through is a job done for nothing. Cancelling it is not the only answer.',
      how: [
        // Blueprint, Concurrency and the Quota Guard
        'The quota guard: once the five-hour window reaches the line you set, automatic jobs wait, marked deferred. When the window loosens they start by themselves, in order.',
        // Blueprint, Concurrency and the Quota Guard: "The handover line (3.738.0; quotaBrake.ts)"
        'A job that names an account is also held while that account\'s own window is at or past the handover line, 90% by default, because a run started there would be told to hand over on its first reading. The board says so: <code>quota handover line (93% of kate\'s 5h window, at or past 90%)</code>.',
        // Blueprint, Model Policy: "Quota downgrade"
        'Below that, the downgrade: past the line you set, every job the farm started itself runs on a cheaper model, haiku unless you name another. Sessions you opened by hand are left alone.',
        // Blueprint, Model Policy ("written to the headless output header")
        'What ran cheap, and why, is written at the top of its output: <code>Model policy: quota window 82% ≥ 70% — downgraded…</code>',
        // Blueprint, Model Policy (modelPolicy rules); Automation: "3. The model belongs on the automation"
        'Model rules by where a job came from: <code>{"source": "trigger", "model": "haiku"}</code> puts every routine job a trigger starts on a cheap model. A model named on the schedule or the trigger itself beats the rule.',
      ],
      set: [
        // Blueprint, Settings reference; What Work Costs (quotaBrakeBasis); Technical DNA §4.7 (quotaHandoverPct 90)
        ['agentFarm.quotaGuardPercent', '0 (off)', 'Automatic jobs wait at this fullness of the five-hour window.'],
        ['agentFarm.quotaDowngradePercent', '0 (off)', 'Past this fullness, the farm\'s own jobs run on the cheaper model.'],
        ['agentFarm.quotaDowngradeModel', 'haiku', 'The cheaper model.'],
        ['agentFarm.quotaHandoverPct', '90%', 'The handover line; 0 turns the hold off.'],
        ['agentFarm.quotaBrakeBasis', 'whichever', 'Which figure the guard and the downgrade read: raw, weighted, or whichever is further along.'],
      ],
      see: { href: '#m-plan', l: 'Windows past the line, live' },
    },

    anomaly: {
      fig: ['Fourteen days', 'Flagged', 'The noise floor', 'The week', 'Heavy hitters'],
      // Blueprint, Cost Anomaly ("A fixed budget threshold has a blind spot"); Trend Alerts ("silent cost creep")
      why: 'A budget has a blind spot: a day that costs ten times the usual but stays under the cap passes in silence. And cost creeps, a little more every week, with no single day worth a warning.',
      how: [
        // Blueprint, Cost Anomaly; Technical DNA §4.5 (anomaly.ts, median + MAD)
        'For every agent, and for the fleet, the median of its last 14 days and how far its days usually stray from it, measured with the median too, so one wild day does not move the usual.',
        // Blueprint, Cost Anomaly
        'Today is flagged when it is well beyond that, more than 3.5 times the usual spread, and at least twice the median: "researcher is at 4.2× its normal today". No model is asked.',
        // Blueprint, Cost Anomaly (costAnomalyMinUsd default $1)
        'Days under a dollar are noise and never flagged. The floor is yours to set, and 0 turns the alarm off. It works apart from the budgets.',
        // Blueprint, Trend Alerts
        'The week: when an agent\'s last seven days cost twice the seven before, Insights says so: "Weekly cost trend: $24 this week vs $6 last week (4.0x)". Under $0.50 last week and $1 this week it says nothing.',
        // Blueprint, Cost Anomaly ("Cost Anomaly Report … heavy hitters")
        'The Cost Anomaly Report lays today, the median and the multiple side by side, with the heavy hitters: the sessions that ate half the tokens of the last seven days.',
      ],
      set: [
        // Blueprint, Settings reference
        ['agentFarm.costAnomalyMinUsd', '$1', 'Days under this are not judged. 0 = off.'],
        ['agentFarm.trendAlertFactor', '2×', 'This week against last. 0 = off.'],
      ],
      // Blueprint, Insight Lifecycle (click opens Agent Detail; dismiss 1 day / 7 days / permanently; identity by agent+category+file)
      note: 'A click on the flag opens that agent\'s own cost view, where the evidence is. Dismiss it for a day, a week or for good, and tomorrow\'s "3.9×" stays the same dismissed finding as today\'s "4.2×".',
      see: { href: '#m-an', l: 'A cost alarm, live' },
    },

    honest: {
      fig: ['From your transcripts', 'Dated rates', 'Zero, or unknown', 'Matched, or blank', 'Time worked'],
      // Blueprint, What Work Costs (five investigations, no counting bug); Active Duration vs. Idle Break (36 hours)
      why: 'A figure that looks exact and is not is worse than none: $0.00 beside work that was billed, a session that "ran 36 hours" because it was picked up again the next morning, an hourly cost divided by a night\'s sleep.',
      how: [
        // Blueprint, Cost Accounting; Technical DNA §4.5 (pricing.ts)
        'Cost is read from the transcripts on your machine and priced with your rate card, USD per million tokens, the first matching model pattern winning. On a subscription it is the API-equivalent value of the work, not a bill.',
        // Blueprint, Cost Accounting ("A change applies going forward only"; dated history, 2.47.0)
        'Rates are dated. Edit one and it applies from then on: each message is priced at the rate in force when it ran, so a price change never rewrites what the past cost.',
        // Blueprint, Codex: "A subscription engine states no price"; Technical DNA §2.6 (OpenCode reports cost); Cost Accounting (unmatched: warning, $0); 3.548.0 (mixed totals tagged)
        'A zero is only a zero when it is one. OpenCode states its own cost, so a free model\'s $0.00 is real. Codex on a ChatGPT plan states none: its figures are tokens, with the reason beside them, never a price made up from someone else\'s rate card. A model with no rate is named in a warning on the Dashboard. A total that mixes providers is marked as mixed.',
        // Blueprint, Task Cost (2.40.0); A-27 3.715.0 (costReady waits while $0 and 0 tokens)
        'A task\'s cost comes from the transcript its own run wrote. When two sessions could be it, no number is chosen: the task stays without one. While the transcript is still being read, it waits rather than lock a zero in.',
        // Blueprint, Active Duration vs. Idle Break Precision (S-52)
        'Time is the time worked. A pause between turns longer than half an hour is taken out and shown beside it, <code>50m ⋯25.8 h</code>, so cost per hour and minutes per turn are divided by work, not by sleep.',
      ],
      set: [
        // Blueprint, Active Duration vs. Idle Break Precision; Settings reference
        ['agentFarm.sessionBreakMin', '30 min', 'A pause longer than this between turns is not counted as work. 0 = count everything.'],
        ['agentFarm.agentRowCostUnit', 'tokens', 'What each agent row in the Agents view shows for today: tokens or cost.'],
      ],
      // the owner's list §6 ("kesme ve iptal sonrası gelen sıfır kullanımlı satırlar gerçek bağlam sayısını silmez")
      note: 'An interrupted or cancelled turn can leave lines that report zero usage. They are not read as an empty context: the real figure stays.',
    },

    ladder: {
      fig: ['Cheap first', 'A FAIL climbs', 'Stop paying', 'Before and after', 'What the checks saved'],
      // Blueprint, Production: "The judge's ladder" (A-27 part 2); "A check's own cost"
      why: 'Checking every step with a strong model costs more than many of the steps. Checking with a cheap one alone fails good work, and every wrong FAIL buys a retry nobody needed.',
      how: [
        // Blueprint, Production: "The judge's ladder" (agentFarm.judgeLadder, cheapest first); Settings reference (judgeArgs haiku)
        'A step\'s check, on text or on an image, is judged against its criteria by a model of its own: haiku unless you name another. With a ladder set, cheapest first, such as <code>haiku,sonnet</code>, every check starts on the bottom rung.',
        // Blueprint, Production: "The judge's ladder" (3.710.0)
        'A FAIL is judged once more on the next rung before the step is paid for again. A PASS there overturns it and no retry is made; a FAIL there goes to the retry as before. The output says which: <code>Escalated: haiku said FAIL (…) → sonnet says PASS — overturned, no retry paid</code>.',
        // Blueprint, Production: "Stop, replan, and what a run's checks saved" (A-27 part 3, 3.711.0)
        'A retry is bought only while it can still help. When the judge says the approach itself is wrong, or a FAIL names the same defect as the attempt before, the retries left are held back and the run\'s supervisor is woken to change the plan.',
        // Blueprint, Production: "An edit is judged against what it started from" (M-62, 3.743.0); A-27 3.713.0 (an error envelope is no verdict); the owner's list §15 (judgeUnjudged)
        'An edit is judged against what it started from: the check sees the image or video before and after, and is asked whether only what was asked changed. A check that comes back with no verdict is never counted as a pass.',
        // Blueprint, Production: "A check's own cost" (3.713.0, 3.716.0); "Stop, replan" (economy)
        'The checks are counted too: their cost is part of the step, the run\'s total and its cap. A lean check on haiku was measured at $0.0021 against $0.0245 before. Each run adds up what its checks did: climbs, overturns, stops, replans and about how much was saved.',
      ],
      set: [
        // Blueprint, Settings reference; Production (judgeLadder; cost presets: Balanced = none, the shipped behaviour); M-62 (judgeCompare auto · never)
        ['agentFarm.judgeArgs', 'haiku', 'The judge\'s model. Keep it cheap.'],
        ['agentFarm.judgeLadder', 'empty', 'Models cheapest first, such as haiku,sonnet. Empty: one judge, no climb.'],
        ['agentFarm.judgeCompare', 'auto', 'Shows the judge what an edit started from. never: the result alone.'],
      ],
      // Blueprint, Production: "The judge's ladder" (cost presets)
      note: 'Three cost presets set a run\'s ladder and cap together: <em>Economy</em> judges on haiku with a $5 run cap, <em>Balanced</em> is the shipped behaviour, <em>Quality</em> climbs from sonnet to opus with no cap.',
      see: { href: '#m-judge', l: 'The ladder, judging' },
    },

    evals: {
      fig: ['A case', 'A run', 'What changed', 'A against B', 'Between runs'],
      // Blueprint, Evals; Intelligence Depth: Instruction Versioning
      why: 'After a change of model or of an agent\'s instructions, the only evidence left is how sure the agent sounds. A change that breaks yesterday\'s good answers goes unnoticed until someone trips over it.',
      how: [
        // Blueprint, Evals ("A case = an input plus an expectation"; "born from a BAD TRACE")
        'A case is an input and an expectation: the prompt the agent is asked again, and what must be true of the answer, handed to the judge word for word. Most cases are born from a bad trace: a session scored ⭐ 2 or less, a task whose check failed.',
        // Blueprint, Evals ("A run asks for confirmation, because it spends money"); Eval Set
        'A run asks first, because it spends: one call to the agent per case, on haiku unless you clear that to test the real model, and one cheap judge call.',
        // Blueprint, Evals ("The real gain: what changed"); Eval Set ("12/14 passed, 2 regressed")
        'The page compares the latest run with the one before it, case by case: ⛔ regressed, ✅ fixed, 🆕 new. "12/14 passed, 2 regressed" names the two.',
        // Blueprint, A/B Instruction Experiment; Evals (A/B)
        'A against B: the agent\'s instructions as they are, and the same with one rule more. Each prompt runs in two sandboxes that leave the real agent untouched, and the judge sees the two answers in random order. If B wins, one click applies it, with a backup.',
        // Blueprint, Quality Scorecard; Pulse Check; Instruction Versioning
        'Between runs, a cheap judge scores recent sessions from 1 to 5 against what was asked, and a pulse check asks each agent who it is and checks the answer against its instructions. Every version of an agent\'s instructions keeps its sessions, its average quality and its daily cost.',
      ],
      set: [
        // Blueprint, Settings reference
        ['agentFarm.evalRunArgs', '--model haiku', 'The model eval cases are replayed on. Empty: the agent\'s own.'],
        ['agentFarm.qualitySample', 'off', 'Score recent sessions: daily or weekly.'],
        ['agentFarm.qualitySamplesPerAgent', '2', 'Sessions scored per agent each time.'],
        ['agentFarm.pulse', 'off', 'The pulse check: nightly or weekly.'],
      ],
      // Blueprint, Quality Scorecard (warnings ≥0.8 drop, below 3; "If cost is low but quality is low too")
      note: 'A quality average that drops by 0.8 in a week, or sits under 3 for two, raises a warning. Cheap and bad is a loss, so cost and quality sit side by side.',
      see: { href: '#m-judge', l: 'An evals scorecard, live' },
    },

    insights: {
      fig: ['One list', 'Fix, hand over, dismiss', 'Did it hold?', 'A rule from corrections', 'Alive today?'],
      // Blueprint, Insight History ("Insights were a snapshot"); Instruction Suggestions ("the corrections are in the follow-ups")
      why: 'A finding that is only a snapshot gets fixed, comes back, and nobody knows whether the fix held. And the same correction typed to an agent every day never becomes the rule it should be.',
      how: [
        // Blueprint, Insights Tree; Budget Alerts; Quality Scorecard; Pulse Check; Guardrail Auditor; Trigger Scorecard
        'Every finding of the fleet in one list, ⛔ error, ⚠ warning, ℹ info: budgets and cost alarms, a quality drop, a failed pulse, a permission rule too broad, a trigger that always fails or never fires. A click opens the file or the evidence.',
        // Blueprint, Insight Lifecycle (2.41.0); insightAutoDelegate
        'Each finding has a way to close. 🛠 Fix starts the mechanical fix where there is one. 🚀 Delegate hands it to an agent as a task: find the root cause, fix what is safe, report what is not. ✕ Dismiss hides it for a day, a week or for good, and the hidden ones are counted.',
        // Blueprint, Insight History (3.27.0)
        'A ledger remembers each one: ↻4 when it has come back four times, ⚠back when it came back after your fix. Insight History lists the worst first, and how many fixes are holding.',
        // Blueprint, Instruction Suggestions
        'A cheap model reads the last 14 days of follow-up messages, where the corrections are, and suggests a rule for the agent\'s instructions, such as "write titles in Turkish". Nothing is written until you press Apply.',
        // Blueprint, The Living Page (3.18.0)
        'The Living page asks one question: is the system alive today? It checks loops, not parts: unread notices by age, unanswered questions, the queue, silent automations, duties with nothing behind them, spend, and checks of your own. A dead loop counts zero.',
      ],
      set: [
        // Blueprint, Insight Lifecycle; Instruction Suggestions; The Living Page
        ['agentFarm.insightAutoDelegate', '[]', 'Categories handed to their agent as soon as they appear; at most one task per problem a day.'],
        ['agentFarm.suggestScan', 'off', 'Scan for rule suggestions every week.'],
        ['agentFarm.livingChecks', '[]', 'Your own checks on the Living page: a diary file, a folder that should be empty.'],
      ],
      // Blueprint, The Living Page (16 days)
      note: 'The Living page exists because of a measured failure: a daily cycle stopped for 16 days while its reminder ran correctly every morning and nobody read it. No error, nothing red, and the system was dead.',
      see: { href: '#m-judge', l: 'Findings and a suggested rule, live' },
    },
  },

  faq: [
    // Blueprint, Cost Accounting; Budget Alerts
    ['Is the cost a bill?', 'On a subscription, no: it is what the same work would cost at the provider\'s API rates, the value you got from the plan. On an API key it is close to the bill, at your own rate card. The plan figures, how full a window is, are the provider\'s own.'],
    // Blueprint, Plan usage card ("the only figure on the page that is not derived from local transcripts"); Technical DNA §2.7
    ['Where do the plan percentages come from?', 'From the provider: for Claude, the figures <code>/usage</code> prints, read with the sign-in Claude Code already keeps; for Codex, its session file; for Antigravity, <code>agy -p /usage</code>. Everything else on this page is counted from the transcripts on your machine.'],
    // the owner's list §6 ("fren kullanıcıdadır"); Settings reference (all brakes off by default)
    ['Will Agent Farm stop or cheapen my work by itself?', 'Only where you said so. The guard, the downgrade and the run cap start off, and budgets start empty. Sessions you open by hand are never moved to a cheaper model.'],
    // Blueprint, Quality Scorecard; Judge ladder (judgeArgs haiku); Evals (run asks first)
    ['Do the checks cost money?', 'A little, and they are counted. The judge is a cheap model, a lean check on haiku was measured at about a fifth of a cent, and its cost is added to the step it checked. An eval run or an A/B test asks before it spends.'],
    // Blueprint, What Work Costs ("these numbers are the provider's rate card, not ours"); Cost Accounting (Model pricing editor)
    ['What happens when a provider changes its prices?', 'You change the rate in settings or in the Model pricing editor; no update is needed. The new rate applies from then on, and what was spent before keeps the price it had.'],
    // Blueprint, Codex ("A subscription engine states no price")
    ['Why is there no price beside Codex?', 'Codex on a ChatGPT plan reports tokens, not a price. Agent Farm shows the tokens and says why there is no money beside them, rather than estimate one from Anthropic\'s rates.'],
  ],
};
