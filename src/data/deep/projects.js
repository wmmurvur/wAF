// District II, Any project: the words of its page (/features/any-project/). Names, sentences and tile figures are in
// data/features.js; this file holds what the page says beyond them. Every rule, default and setting key was read in the
// extension's own guide (the Blueprint, cited by section heading: "Projects, Portfolio and Code Changes" and the
// sections under it), its Technical DNA (cited by §) or the owner's ranked feature list (§5, project memory); the
// citations are the comments. Figures written as measurements (538 tokens, 303,987 tokens, 42 ms) are the Blueprint's
// own, quoted; project names, codes and notes are the site's demo data (data/backlog.js).
// how and note may hold <code> and <em>; everything else is plain text. fig: a short label per step of how, shown on
// the step and under the feature's figure (scripts/figs/projects.js draws the figures and what each step shows).

export default {
  description: 'A project of any kind, an app, a documentary, a thesis, a campaign, with its own folder of plain documents, a backlog the fleet works off in your order, a track of how every item was worked, a brief every session starts with, a letter for whoever takes it over, and what it cost.',
  promise: 'A project is not code. It is a pile of work, the decisions behind it, the people in it and what it costs, and it is all kept in plain files in a folder of your own, readable in Obsidian with nothing running. Every session started on it arrives knowing it, works off the top of your list, and writes back what it did, so the next one starts from there.',

  features: {
    kinds: {
      fig: ['A project', 'Its folder', 'Found by role', 'Any kind of work', 'Parts and templates'],
      // the owner's list §5 ("aylar önce denenip bırakılan şey yeniden denenir"); the owner, 11:46 (any kind of project)
      why: 'Tools for agents assume the work is code. A documentary, a thesis or a campaign has the same trouble: a pile of work, decisions nobody should have to make twice, and agents that forget between sessions.',
      how: [
        // Blueprint, "Projects — the umbrella everything hangs under" (3.52.0); the project page (Settings tab)
        'A project has a name, a status, a kind, an icon and a colour, a folder for its documents, code roots if there is code, people with their roles, a daily and a total budget, dates and tags. Sessions, tasks, missions and commits stay where they are; the project is what joins them.',
        // Blueprint, Projects ("Where it lives"); the owner's list §5 (six role documents, the folder skeleton)
        'Its folder holds what people write: the charter, the plan, the backlog and its log, the people and the worklog, beside notes, decisions, deliverables, resources and an archive. It opens in Obsidian with nothing running and travels in git.',
        // Blueprint, Projects ("Agent Farm never depends on a document's file name"; projectSkeleton)
        'A document is found by one line at its top, its role, never by its name. Rename it, move it, write it in any language, and nothing breaks. A folder renamed in Obsidian is still recognised as the same project.',
        // data/backlog.js (projectBacklog.ts: "the shipped set is a suggestion"); the owner's list §5 (kinds of work)
        'Any tag is a kind of work. The shipped ones are a suggestion, bug, research, feature, interface, chore, debt, docs, idea, so a film files <code>#shoot</code> and <code>#edit</code>, and a thesis <code>#write</code> and <code>#figure</code>.',
        // Blueprint, "Parts, shapes, a letter and a counterpart (3.109.0)"
        'A project can have parts, nested under it, each with its own status. A project that proved itself can be saved as a template, ticking what travels: never its identity, its folder or its status. The template list starts empty, on purpose.',
      ],
      set: [
        // Blueprint, Projects; "The documents" (a folder entry may declare holds: "decisions")
        ['agentFarm.projectSkeleton', 'the shipped layout', 'Your own folder layout for new projects, for a vault with its own naming.'],
        // Blueprint, "Parts, shapes, a letter and a counterpart" (archive mirroring)
        ['agentFarm.projectsArchiveRoot', 'derived', 'Where a finished project\'s folder moves when you archive it. Nothing moves until you confirm both paths, and Restore moves it back.'],
      ],
      // Blueprint, Projects ("When the folder is gone")
      note: 'If a project\'s folder goes missing, the project stays, with a warning and three answers: relink, recreate, ignore. Its sessions, cost and timeline keep working, and nothing is ever recreated silently.',
      see: { href: '#b-plist', l: 'Four kinds of project, one page' },
    },

    backlog: {
      fig: ['Capture', 'A plain file', 'Codes and the queue', 'The top five', 'Families, and who wrote it'],
      // Blueprint, "The backlog — the standing pile of work (3.59.0)" ("a box that asks which area? is a form")
      why: 'A thought that needs a form is never written down. A list kept in a database is unreadable without the tool. And "do the top five" needs an order you set, not the order the lines happen to sit in.',
      how: [
        // Blueprint, The backlog ("Capture costs nothing"; Ctrl+Alt+B)
        'One line is enough. <code>Ctrl+Alt+B</code> takes a thought from anywhere in VS Code and asks nothing back. It lands in the 📥 inbox, and you or an agent file it later.',
        // Blueprint, The backlog ("It is a document, not a database"); the owner's list §5 (six priorities, XS to XL)
        'It is a file, <code>Backlog.md</code>, made of lines your vault already understands: the checkbox is the state, open, doing, done, cancelled; <code>#bug</code> is the kind; 🔺 ⏫ 🔼 🔽 ⏬ the priority; <code>[effort:: S]</code> the size, XS to XL; <code>⛔ P-5</code> what it waits on.',
        // Blueprint, The backlog ("The code is permanent; the order is the queue"; "There is one order and it holds everything")
        'A code never changes: <code>K-8</code>, an area letter and a number that only counts up. The order is one list at the top of the file, the 🎯 Queue. Drag an item or move it a few places, and exactly one entry moves.',
        // Blueprint, The backlog (projects.backlog.next; "And the top of it rides in the brief")
        '"Do the top five" means the first five of your queue. Anything waiting on an unfinished item is held back and named. The top of the queue rides in every project session\'s brief as <em>Next in backlog</em>, so nothing has to be pasted.',
        // Blueprint, The backlog ("An item may be part of another one"; "a line an agent wrote says so")
        'Big work comes as a whole and its parts, each part saying on its own line which whole it belongs to. Either can be worked first, and closing a whole says which of its parts are still open. A line an agent wrote says so: <code>#byAI</code> when it noticed the thing itself, a proposal; <code>#byREQ</code> when you asked for it.',
      ],
      // Blueprint, The backlog ("Closing a box changes exactly one character"; archive in the same file; a duplicate code is flagged)
      note: 'Ticking an item changes exactly one character of the file, and adds no date the tool does not own. Closed items are archived at the end of the same file, so a code is never issued twice. A duplicate code is flagged on its row and never corrected for you.',
      see: { href: '#s-backlog', l: 'The backlog, being worked' },
    },

    track: {
      fig: ['Every touch', 'Notes for the next', 'Sure, or why not', 'Two files, two owners', 'Four views'],
      // Blueprint, "The Backloglog (3.68.0)" ("there was no join"; "three sessions of digging that ended in still not found")
      why: 'An item that was not finished leaves nothing behind, so the next agent tries again what the last one already tried. And three months later nobody can say which session fixed K-8, or how.',
      how: [
        // Blueprint, The Backloglog ("The ledger"; projects.track including touch)
        'Each time an item is worked, the agent says so: touched it, closed it, with a note. A ledger keeps the code, what happened, when, which session, which turn and who. It is only ever added to, so two windows and an agent writing at once lose nothing.',
        // Blueprint, The Backloglog ("The touch event is what makes the ledger worth keeping")
        'The touches are the point. "Root cause is in rows.ts; ran out of time" is the history the next session reads before it writes a line. Closing happens once; how it got there is the item\'s story.',
        // Blueprint, The Backloglog ("Which session it was is INFERRED"; doubt codes; outside events)
        'Which session it was is worked out, and when it cannot be sure it says why: two live sessions, none, a stale one, the turn unknown, a reconstruction. A box ticked in Obsidian is noticed and recorded, with no turn made up for it.',
        // Blueprint, The Backloglog ("Two files, two owners"; "One trace stays in the file itself")
        '<code>Backloglog.md</code> sits beside the backlog. Agent Farm writes each item\'s data line and its session rows; any line you write there is kept as you wrote it. The closed item\'s own line gets where it ended: <code>[closed:: 9c4d1f2a#3]</code>.',
        // Blueprint, The Backloglog ("The Track tab: four questions over one ledger"; backfill)
        'The Track tab asks four questions of the ledger: how was this item solved, what happened here lately, what did that session get through, and what does the record not know. A session and turn is a door into that conversation. Old work is reconstructed only where the code itself was written in a turn, as a preview first.',
      ],
      // Blueprint, The Backloglog (Items card: estimated size, turns taken, median for that size)
      note: 'Each item\'s card puts the size the backlog estimated beside the turns it really took, and the median for that size in this project, once there are enough sized items for a median worth quoting.',
      see: { href: '#b-tabs', l: 'The Track tab, on demo items' },
    },

    context: {
      fig: ['Before the first message', 'What is open', 'The same bytes', 'On screen', 'Written back'],
      // the owner's list §5 ("Her yeni oturum projeyi yeniden keşfederek token yakar"); Blueprint, project session protocol
      why: 'Every new session finds its way around the project by reading the folder, and pays for it in tokens. It guesses where the worklog is, and tries again what was dropped months ago.',
      how: [
        // Blueprint, "The project session protocol (3.54.0)"
        'A session started on a project knows it before its first message: the name, the documents folder, the code roots, and a brief with the status, the summary, the people and their roles, which file is the charter, the plan and the worklog, and the latest worklog lines.',
        // Blueprint, The documents ("The brief got what it was missing"); The backlog ("Next in backlog"); Parts (a part is told it is one)
        'And what is open: the unfinished plan items, the latest decisions, and the next items in the backlog. A session inside a part of a project is told so, so its notes land in the right folder.',
        // Blueprint, project session protocol (--append-system-prompt-file; Cost: 538 input tokens); Technical DNA §2.2 (pinned identical bytes, X-267), §2.3 (Codex: first prompt)
        'Claude Code takes the brief as an added system prompt; Codex, which has no such channel, in its first prompt. It is the same bytes every time, so the provider\'s cache keeps it: a full brief measured 538 tokens, and one regenerated file once cost 303,987 tokens to read again.',
        // Blueprint, project session protocol ("Transparency is not optional here"; "The window only speaks for tasks a person made"); Projects ("A resume is told about its OWN project")
        'You can see it: the Console shows <code>◧ orbit-app — project context active</code>, and its hover is the text itself. A resumed session is told about its own project, not the window\'s. A schedule firing at 3 a.m. gets a project only if the schedule names one.',
        // Blueprint, The documents (the write side: log, plan.check, decision.add, deliver)
        'And the work goes back in: an agent that finishes something adds a worklog line, ticks the plan item, records a decision or a delivery. The next brief is built from what happened, not from what somebody remembered to type.',
      ],
      set: [
        // Blueprint, project session protocol
        ['agentFarm.projectContextExtra', 'empty', 'One line of your own added to every project\'s brief, such as where your own rules are.'],
      ],
      // Blueprint, project session protocol (2,500 characters; _AF/BRIEF.md); The documents (built to a budget, lists shortened)
      note: 'The brief is kept under 2,500 characters by shortening its lists, never by cutting its last part, which says where to write back. The full text is <code>_AF/BRIEF.md</code> in the project folder, readable by any session.',
      see: { href: '#s-backlog', l: 'What every session starts with' },
    },

    letter: {
      fig: ['What and where', 'Where it stands', 'Already fought', 'First five minutes', 'Your part of it'],
      // Blueprint, Parts, shapes, a letter ("The handover — the cold-start letter")
      why: 'Handing a project over, to a colleague, to a new agent, or to yourself in three months, costs an afternoon of "where is…" and "did anyone try…".',
      how: [
        // Blueprint, "The handover — the cold-start letter" (3.109.0)
        'One button writes the cold-start letter. It opens with what the project is, in the charter\'s own words; where every document and code root is, calling out the ones not on this machine; and who to ask.',
        'Then where it stands: what is open, and what is blocked and by what.',
        'Then what somebody already fought and left open, from the track, with their last note; why it is built the way it is, from the decisions; and what has shipped.',
        'Then how the project is actually worked, and a numbered first five minutes that names the real item codes.',
        'It ends in a block that is yours. Writing the letter again keeps that block word for word, and a letter whose marker has gone is refused, not rewritten.',
      ],
      // Blueprint, the cold-start letter ("Not a second report: a report is a period, this is a starting position")
      note: 'It is not a report. A report covers a period; the letter is a starting position, for whoever starts next.',
    },

    portfolio: {
      fig: ['Every project', 'Parts', 'Health', 'The week', 'The work'],
      // the owner's list §5 (portföy radarı; sessiz kalan aktif proje uyarısı)
      why: 'With several projects at once, the question is which one is moving, which one has stalled, and which one nobody has touched for weeks, without opening each one to find out.',
      how: [
        // the owner's list §5 ("Portföy radarı: faz ilerlemesi, açık backlog sayısı ve son etkinliği tek ekranda"); Blueprint, Projects ("Its own page")
        'Every project on one screen, by status: how far its plan has come, how much of its backlog is open, and when it was last worked.',
        // Blueprint, Parts ("A sub-project appears in exactly one place"; "The parts\' figures ride alongside, never inside")
        'A part sits under its parent, once, with its own status. Its figures ride beside the parent\'s and never inside them, so the rows still add up to the fleet: <code>$11.60 total · +$84.15 in 2 parts</code>.',
        // Blueprint, Intelligence ("Health reaches the Living page"); the owner's list §5 (projectStaleDays)
        'A missing folder, a budget gone over, a project marked active that nothing has touched: each is warned on the project, and the Living page names them in one row. A missing folder counts as dead, because every document is in it.',
        // Blueprint, Intelligence ("A weekly digest that reaches you")
        'A weekly digest, if you want one: on the weekday you choose, each open project\'s week lands on the Notices board you already read, with the full report attached. Once a week, however many windows are open.',
        // Blueprint, "The work — five stores, one tab (3.107.0)"
        'The Work tab: everything a project is doing, grouped by how much it needs you: running now, needs you, queued, on the books, fires by itself, settled. A group with nothing in it is not drawn.',
      ],
      set: [
        // Blueprint, Intelligence ("Off by default (agentFarm.projectDigestDay)")
        ['agentFarm.projectDigestDay', 'off', 'The weekday each open project\'s week is posted to Notices.'],
      ],
      // Blueprint, "Agent Portfolio — the fleet on one screen"
      note: 'The same question for agents is the Agents page: one row per agent, grouped by project, with how many days it has been quiet, its last 7 and 30 days of sessions and cost, and what is waiting for it.',
      see: { href: '#b-plist', l: 'Four projects on one page' },
    },

    cost: {
      fig: ['One project each', 'The bill', 'By model', 'How it is worked', 'Code, two ways'],
      // Blueprint, Projects ("cost could be summed per customer"); Intelligence ("A farm running for months before projects existed")
      why: '"What has this client cost?" and "how is this project actually worked?" are in the transcripts, but only if every session belongs to a project, and nobody files hundreds of sessions by hand.',
      how: [
        // Blueprint, Projects ("Membership — one order, five steps"; "Longest root wins"); Intelligence ("Backfilling proposes; a person approves")
        'Every session belongs to exactly one project: the one you filed it under, or none if you said so, or the project whose folder holds it, the deepest folder winning, or its agent\'s rule, or Unassigned. So the projects add up to the fleet. Right-click any session row to file it, move it, take it off, or start a new project from it. Loose old sessions are proposed with reasons you can check in a second, and you approve.',
        // Blueprint, "The project page — Overview · Timeline · Sessions · Cost" (Cost)
        'The Cost tab: the total, today, a day-by-day series, the burn over 7 and 30 days, where it lands by the due date, and how long the budget lasts.',
        // Blueprint, The project page ("a turn served by two models is reported as mixedTurnCost rather than divided by an invented ratio")
        'By model, split turn by turn, since a turn is where the transcript names a model. A turn two models served is shown as mixed, not divided by a guess, and the parts add up to the total.',
        // Blueprint, Intelligence ("The second fold — the Analysis tab")
        'The Analysis tab: the weeks, the rhythm by weekday and hour, how long an item takes from its first touch to its close, the files most written, which agents take the turns, and the pace against the project\'s own average. A figure with too little behind it is not drawn: the rhythm needs 40 turns, cycle time 5 closed items, the pace 2 weeks.',
        // Blueprint, Intelligence ("The Code tab — two sources, never summed")
        'The Code tab: the commits git recorded in the project\'s code roots, and what the project\'s own sessions wrote, side by side and never added together. A root not on this machine is shown as missing, not as a quiet repository.',
      ],
      // Blueprint, The project page ("Timeline is the join"; "A document event needs a date the DOCUMENT states"; 42 ms)
      note: 'The Timeline tab joins everything the project touched: sessions, their turns, tasks, missions, commits, decisions and deliveries. A document event appears only with a date the document itself states; the page says so, so a missing row reads as a limit, not a loss.',
      see: { href: '#b-tabs', l: 'The project\'s tabs' },
    },
  },

  faq: [
    // the owner, 11:46 ("a non-software project is only a backlog whose items are not code"); Blueprint, Projects (code roots)
    ['Does a project have to be software?', 'No. A project with no code has no code roots, and that is all. Its backlog holds shots, chapters or posts instead of bugs, and its agents work them off the same way.'],
    // Blueprint, Projects ("it travels in git, opens in Obsidian with no extension running"); The backlog
    ['Where is it all kept?', 'In the project\'s folder, as plain Markdown files: the charter, the plan, the backlog and its log, the worklog, decisions and deliverables. Agent Farm keeps only a list of projects and which session belongs to which.'],
    // Blueprint, The documents ("Every write goes through one guarded, atomic path")
    ['Can I keep editing in Obsidian?', 'Yes. Every write Agent Farm makes checks the file has not changed since it read it, and refuses rather than overwrite a save you made in between. A box you tick in Obsidian is picked up by the track. Any document opens where you like it: in VS Code, its preview, Obsidian or your own app.'],
    // Blueprint, Codex ("A terminal session on that engine is not told at all and says so"); Technical DNA §2.3, §8 A4
    ['Do Codex and the other engines get the project brief?', 'Yes, in their first prompt, since they have no system prompt channel. A Codex session you start yourself in a terminal is not told, and Agent Farm says so rather than typing into your terminal for you.'],
    // Blueprint, Intelligence ("Backfilling proposes; a person approves")
    ['I have months of sessions from before projects. What about them?', 'Agent Farm proposes where each one belongs, with reasons you can check: it wrote these files, its folder\'s other sessions are filed here, its agent mostly works here. A close call is shown as one and left out of "select all". Nothing is filed until you approve it.'],
    // Blueprint, Projects ("af-id"; "When the folder is gone")
    ['What if I rename or move the folder?', 'Renamed in Obsidian, it is recognised as the same project on the next rescan. Moved somewhere Agent Farm cannot find, the project stays with a warning and asks you to relink, recreate or ignore it.'],
  ],
};
