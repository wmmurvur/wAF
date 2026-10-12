// District I, Never stops: the words of its page (/features/never-stops/). Names, sentences and tile figures are in
// data/features.js; this file holds what the page says beyond them. Every default and every quoted line was read in the
// extension's source at 19187ad (notes: AF-WEB_NOTES_district-I_v1.0); the citations are the comments.
// how and note may hold <code>; everything else is plain text. fig: a short label per step of how, shown on the
// step and under the feature's figure (scripts/figs/relay.js draws the figures and what each step shows).

export default {
  description: 'Relay chains that hand over before the context fills, move to the account with room, wait for the reset when every account is full, and stop when they should. Every default is the extension\'s own.',
  promise: 'A long job outlives any one session. When a context fills, a fresh session takes over from a handover note. When an account\'s window fills, the next leg opens on another account. When every account is full, the chain waits for the reset and carries on. You set the lines and the brakes once.',

  features: {
    relay: {
      fig: ['Watching', 'The two lines', 'The baton', 'A fresh leg', 'Failsafe'],
      why: 'A long session gets worse as its context fills: it loses the start, repeats itself and begins to guess. Starting over by hand means explaining everything again.',
      how: [
        // contextGuard.ts:72-96, 121-132, 378-401; package.json:9299, 9306
        'Agent Farm watches every running session\'s context. At 35% the session is told once to start nothing new and finish the step in flight.',
        'At 40% it is told to stop, commit its work, write a handover note and end its run. Each line is said once, and again only after the reading drops back.',
        // batonBridge.ts:148-215; baton.ts:289
        'In a relay chain the agent passes the baton with the words its successor needs. An empty baton is refused: the baton <em>is</em> the words the successor is handed.',
        // batonRunner.ts:55-62, 314-349; batonDoor.ts:12-13, 115-139
        'Once the old session has really ended, a fresh session opens. It is given the chain and the leg it is on, the relay\'s rules, your standing rule if you set one, and its predecessor\'s words. It never resumes the old conversation, which would walk straight back into a full window.',
        // batonFailsafe.ts:26-30, 69-108, 172-214
        'A leg that ends without passing is not lost. If it left a handover note in the last two minutes or new commits, an emergency leg starts with that evidence. A leg that dies within 30 seconds is recorded as failed instead of looping.',
      ],
      set: [
        ['agentFarm.contextConvergePct', '35%', 'Told once to start nothing new and finish the step in flight. 0 = off.'],
        ['agentFarm.contextHandoverPct', '40%', 'Told once to stop, commit, write its handover note and end the run. 0 = off.'],
        ['agentFarm.batonInjectedDirective', 'empty', 'A standing rule said to every leg, above its predecessor\'s words.'],
        ['agentFarm.batonHandoverTemplate', 'empty', 'Write the successor\'s message yourself, with {leg}, {chain}, {agentPrompt} and the rest filled in.'],
      ],
      // contextGuard.ts:282-295, 386-392; extension.ts:1908-1910
      note: 'The two lines reach a running session through Claude Code\'s hooks. On the other engines the crossing is recorded on the session card as <em>undelivered</em>, so it is never assumed to have been said.',
      see: { href: '#s-days', l: 'Watch a chain run for three days' },
    },

    quota: {
      fig: ['Its account', 'The quota line', 'Staying put', 'The next account', 'The ceiling'],
      why: 'A plan\'s five-hour window runs out in the middle of the work. When it does, the session stops dead and whatever was half done stays half done.',
      how: [
        // contextGuard.ts:414-479; quotaWeek.ts:33-46; package.json:9320, 9327
        'The session\'s own account is read: how much of its five-hour window and of its week is used.',
        'At 90% of the five-hour window the session is told once to stop, commit, write its note and end the run. At 98% of the week the same happens, and the next leg never stays on that account.',
        // stayAccount.ts:76-100; package.json:9449
        'When a run hands over for any reason but the quota and its account is under 70% of its window, the next leg stays on that account, so one window is used up before another is opened.',
        // accountPlacement.ts:268-291; baton.ts:28
        'Otherwise the next leg goes to the account you chose for the chain, else to the chain\'s pool or account policy. A relay\'s default is <code>@emptiest</code>: the account with the most of its window left.',
        // startRoom.ts:64-90; package.json:9435, 9442
        'An account at or past the ceiling, 70% of its window or 95% of its week, is passed over by every start that runs without you. No ceiling can sit above the handover line.',
      ],
      set: [
        ['agentFarm.quotaHandoverPct', '90%', 'The five-hour window\'s line. 0 = off.'],
        ['agentFarm.quotaWeeklyHandoverPct', '98%', 'The week\'s line; the next leg leaves that account. 0 = off.'],
        ['agentFarm.quotaConvergePct', 'off', 'Below the handover line a run works at full capacity, unless you set this.'],
        ['agentFarm.contextHandoverStayAccountPct', '70%', 'Under this, a handover that was not about the quota keeps the next leg on the same account.'],
        ['agentFarm.defaultAccountCeiling', '70%', 'An account this full is passed over by every start that runs without you.'],
        ['agentFarm.defaultAccountWeeklyCeiling', '95%', 'The same wall for the week.'],
      ],
      see: { href: '#s-rules', l: 'The lines side by side' },
    },

    policies: {
      fig: ['Four built in', 'Your own rule', 'Rules in rules', 'Decided at launch'],
      why: 'Which account a session runs on is a decision. Making it by hand at every launch is how the wrong plan gets drained.',
      how: [
        // accountPolicy.ts:49-54, 73-78
        'Every account picker offers four built-in rules beside your accounts. <code>@emptiest</code>: the sign-in with the most of its five-hour window left when the session starts. <code>@pool</code>: the next account with room in the running sentry campaign\'s pool. <code>@standing</code>: this agent\'s own sign-in, else the machine\'s "use this next", else the main one. <code>@round-robin</code>: the usable sign-ins in turn, so no single plan carries every session.',
        // accountPolicy.ts:283-293, 440-497; package.json:10917
        'Your own rules have a name, steps and, if you like, an engine and a ceiling. A step is an account or another rule, with its own ceiling. A rule tries its steps in order, or takes the emptiest of them.',
        // accountPolicy.ts:64, 320
        'Rules can point at rules, four deep at most. Deeper is refused as a loop.',
        // accountPlacement.ts:208-218; accountPolicy.ts:304-311
        'The rule is decided at every launch. A rule that can choose nothing refuses the launch and says why, with the time the first account comes back when that is known.',
      ],
      set: [
        ['agentFarm.accountPolicies', 'none', 'Your named rules, offered in every account picker as @Name.'],
        ['agentFarm.defaultAccountCeiling', '70%', 'The wall a rule obeys unless it names its own.'],
      ],
      // package.json:10917, the setting's own example
      note: 'The setting\'s own example: <code>{"name": "Night", "chain": [{"account": "spare"}, {"policy": "@emptiest", "ceiling": 80}]}</code> is <code>@Night</code>. It tries the spare account first, then the emptiest one under 80%.',
    },

    park: {
      fig: ['Parked', 'Told', 'Woken', 'Your call'],
      why: 'With every account full, a chain left alone would either fail or keep knocking on a closed door.',
      how: [
        // accountPlacement.ts:268-291; batonDoor.ts:110-112, 202-203; package.json:10295
        'When the next leg finds no account with room, it is parked, not dropped. Its start time is the first reset plus a 3-minute buffer: the window reopening and the CLI agreeing that it has are not the same instant.',
        // batonRunner.ts:333-345; batonView.ts:101-135
        'Notices says so, with the chain, the leg and the time it starts. The status bar shows the wake time beside the leg.',
        // tasks.ts:2354-2356
        'The queue is checked every 30 seconds, and the leg starts when its time comes. The chain carries on from the same handover.',
        // batonBridge.ts:244-266
        'Made room sooner? Start it now. Changed your mind? Stop the chain, and the waiting leg is dropped.',
      ],
      set: [
        ['agentFarm.taskRetry.safetyBufferMin', '3 min', 'Added to the stated reset time before the parked leg starts (0 to 240).'],
      ],
      see: { href: '#s-days', l: 'See the parks in the three days' },
    },

    ouroboros: {
      fig: ['Asked', 'Armed', 'The new build', 'Taken up', 'Runs resumed'],
      why: 'An agent that improves Agent Farm itself needs the new build running. Restarting VS Code\'s extensions would normally cut off every session, its own included.',
      how: [
        // extension.ts:19632-19669; selfRestart.ts:107, 317-396
        'The agent asks, over the bridge, for the extension host to restart and for its session to resume. The request is refused if this window restarted less than 20 seconds ago.',
        // selfRestart.ts:255-293, 443-445
        'If other sessions are starting or working, the restart is armed, not fired, and goes the moment the last of them is done. The asking session does not hold it up.',
        // selfRestart.ts:92-102, 402-440
        'If a newer build is on disk, the restart becomes a window reload, so the new build is the one that runs.',
        // extension.ts:30443-30645; consoleRevive.ts:270-279
        'After the restart every console session is taken up again, same conversation, same id, and nudged after a 30-second grace. Its card says: "Agent Farm restarted on 3.931.0 and took this session up where it left off."',
        // tasks.ts:772, 2671-2740
        'Runs in the background that the restart cut off are picked up again, never more than 3 times, so a restart loop cannot keep spawning them.',
      ],
      note: 'There is no button and no setting for this. It is something an agent does over the bridge (<code>farm.restartExtensionHost</code>, with resume), behind fixed guards.',
      see: { href: '../../#top', l: 'Watch it on the home page' },
    },

    sentry: {
      fig: ['Rounds', 'Its mode', 'The leader', 'The leash', 'When it stops'],
      why: 'A fixed rule keeps a chain going but cannot tell a round that went nowhere from one that worked. Paying a large model to watch every round is a waste.',
      how: [
        // sentryDriver.ts:158, 226-372; sentryRun.ts:214-326
        'A sentry campaign works a project\'s backlog in rounds. Each round is a clean session, Sentry R1, R2 and on, on an account from the campaign\'s pool. An empty backlog is a wait, not a stop.',
        // sentryPolicy.ts:162-198
        'Between rounds a leader may decide what comes next. Mechanical: the next prompt is always built from a template, at zero tokens. Intelligent: the leader wakes every round. Hybrid: a routine round stays free, and the leader wakes only when something is off: no handover note, uncommitted work, a failed round, two empty rounds in a row, facts it cannot check.',
        // sentryLeader.ts:82-170, 257-270, 319-342, 498-603
        'The leader is a small model, Claude Code\'s haiku unless you pick another. It reads a brief and answers with the next prompt, the account, or a hold. An answer it cannot read sends the round on the mechanical path.',
        // sentryLeader.ts:384-419; package.json:11470-11488
        'It is kept on a leash: $2 a day, $0.25 and 120 seconds a turn, 3 failed turns in a row. Past any of them the campaign does not stop. It carries on mechanically, and Notices says so once.',
        // sentryDriver.ts:278-299; sentryWatch.ts:35; package.json:11494, 11506
        'The campaign stops when you stop it, when you cancel its running round by hand, or after 3 rounds in a row that produce nothing. A round silent for 45 minutes ends as failed.',
      ],
      set: [
        ['agentFarm.sentryLeaderModel', 'haiku', 'The leader\'s model. Its engine is Claude Code unless agentFarm.sentryLeaderEngine says otherwise.'],
        ['agentFarm.sentryLeaderBudgetUsd', '$2 a day', 'Once spent, the campaign carries on mechanically. 0 = no daily budget.'],
        ['agentFarm.sentryLeaderMaxUsd', '$0.25', 'The most one leader turn may cost.'],
        ['agentFarm.sentryLeaderMaxSeconds', '120 s', 'The longest one leader turn may take.'],
        ['agentFarm.sentryFailureLimit', '3', 'Empty rounds in a row that switch the campaign off. 0 = off.'],
        ['agentFarm.sentryStallMin', '45 min', 'A round silent this long ends as failed and is not retried. 0 = off.'],
      ],
      see: { href: '../../#t-sentry', l: 'See it on the home page' },
    },

    brakes: {
      fig: ['Leg ceiling', 'Barren chain', 'Your brakes', 'Spend cap', 'Kept'],
      why: 'Anything that runs without you has to know when to stop, or it spends your quota on nothing.',
      how: [
        // batonBrake.ts:37-42; package.json:9382
        'A leg ceiling: a chain runs 6 legs by default, counting the run that started it. A pass from the last leg opens nothing; the agent writes a handover note instead, and Notices says so once.',
        // batonBrake.ts:50-64; passCause.ts:116-118
        'The barren-chain brake: two legs in a row that end on the same commit stop the chain, instead of burning quota on nothing. A leg that was starved or paused does not count.',
        // batonBrake.ts:43-49; batonBridge.ts:94-115, 244-252
        'Your own brakes: mark the running leg as the last (⊣), or stop the whole chain, a successor waiting to start included.',
        // runSpendCap.ts:23-39; tasks.ts:6630, 6979-6995; package.json:10049
        'Workflows have a spend cap. Once a run has spent it, no further step or branch starts and the run stops, saying so. Set it for every workflow, for one, or for a single run. A run never goes past 25 steps.',
        // baton.ts:21, 142-151
        'Every stop is kept with its reason. The baton is recorded as stopped, never deleted.',
      ],
      set: [
        ['agentFarm.batonMaxHops', '6', 'The most legs one chain may run; the run that started it is leg 1. 0 = no ceiling.'],
        ['agentFarm.workflowSpendCap', 'none', 'The most one workflow run may spend, in dollars. A workflow can set its own, and one run can override both.'],
      ],
      see: { href: '#s-rules', l: 'The brakes among the rules' },
    },
  },

  faq: [
    ['Does the next session remember anything?', 'It starts fresh, on purpose: a session already at the handover line would walk straight back into the wall. What carries over is what the last leg wrote, its handover note and the words it passed, plus your standing rule.'],
    ['I have one account. Is this for me?', 'Yes. The relay still hands over at the context line. When that account\'s window fills, the chain parks until its reset and carries on by itself.'],
    ['Does it work on engines other than Claude Code?', 'The next leg opens on the same engine as the leg before it. The converge and handover lines reach a running session through Claude Code\'s hooks; on the others the crossing is recorded on the session card as undelivered, so you can see it was not said.'],
    ['Can a chain run for ever?', 'Only if you let it: set the leg ceiling to 0. The barren-chain brake still stops a chain whose legs stop committing, and you can stop it at any time.'],
    ['What happens at night when every account is full?', 'The next leg parks until the first reset, plus 3 minutes, and starts by itself. Notices tells you when; in the morning the chain has carried on.'],
  ],
};
