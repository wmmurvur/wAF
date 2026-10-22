# Changelog

All notable changes to agentfarm.space. The site follows [semantic versioning](https://semver.org).

## 0.13.8 · 2026-10-22

- The screens no longer read as coding only. The big Console now holds six sessions, each a different kind of work on a different engine, and each shows the first words of its instruction: developer (Claude), youtuber researching history videos (OpenCode), scholar running a chain from survey data to regressions to Table 3 (Gemini), analyst writing the morning market brief (Codex), writer drafting chapter 7 (Claude), editor cutting an interview into shorts (Antigravity). More sessions than the column holds, so the list steps through them by itself once the window is assembled. The side list, tasks and live feed follow.
- The fleet wall: the Console monitor shows developer, youtuber, scholar and analyst with their first words; the Live Timeline lanes, the Now page and the chains carry the same mix.
- Never waits and Together: a few rows take the new names (youtuber, scholar, a Q3 earnings mission).
- Turkish words left in the screens are gone: the Console's agent names (asistan, basit, genel, hafif) and the timeline's "genel". The read-aloud demo on Just ask shows German beside English instead of Turkish.

## 0.13.7 · 2026-10-14

- Console: nobody goes looking for a theme switch, so the window shows it by itself. Once it is assembled and in view, it turns light, a note by the switch says "Light theme, too" and the Light button glows; a few seconds later it turns dark again, and it does so now and then while on screen. One click on the switch ends the show for good.
- Console on a phone: the window, the switch and the caption keep a 16px gutter, and the caption reads "The real Console, rebuilt · demo data".
- Landing: "Why a farm" moves down from the top to chapter I, just above "The farm is still at it.", so the fleet and the Console come first again. It is laid out two by two: the title beside a photo of a person leading a team of agents (the owner's), the words beside the agent's home.

## 0.13.6 · 2026-10-14

- Landing, new section 02 "Why a farm", right after the relay: agents are raised here, fitted to you. One agent's home (memory, judge pass rate, toolbox, rules learned from you) grows from Day 1 to Week 3 to Month 4 while it is on screen; the ages can be picked. The side index and the section numbers follow. The landing and About descriptions say it too.
- Console section: the window can be dark or light, as VS Code is set. A "Your VS Code theme" Dark / Light switch sits at its foot, and a curtain wipes one into the other; left alone, the assembled window changes now and then. The light window is drawn from the light theme, with demo data.
- The fleet wall's theme switch is gone; the wall is dark again, with "Open the console" alone.
- Pricing, "Not only code.": the sliding row becomes a fanned deck of ten cards, held like a hand of cards. Each shows its slice of photo and its name; the one under the pointer (or the next, in turn, when it is left alone) opens and reads. On a phone it stands up as a stack, tap to open. New words for every card, Code first; the closing card says why it is a farm, in place of "if an agent can do it".
- About: a "Why a farm" block across both columns.

## 0.13.5 · 2026-10-14

- The fleet wall can show its six screens light or dark (Agent Farm follows the VS Code theme). A Dark / Light switch sits under "Open the console", and the first time the wall is seen it turns light for a moment and back.
- Pricing, "Not only code.": the row keeps to places to use it, with Code first again, then a content studio, automation at any size (from one small task to a team with a lead that runs a project), a second brain, books and theses, a life OS, projects on autopilot, your own workflows, channels and podcasts, and an agent OS. The feature tiles (phone, engines, privacy, costs, the night) are gone, and a wider last tile closes it: if an agent can do it, the farm can run it.
- Early access: "Mostly for" becomes "What would you use it for? Pick any", nine choices that follow the row; early-access.php keeps them joined by "+". The privacy page says so (dated 2026-10-13).

## 0.13.4 · 2026-10-13

- Pricing, "Not only code." is back as the title, without the extra paragraph, and its row now slides: fourteen ways in beyond code, each with who it is for (a content studio, a second brain, automation, a life OS, projects on autopilot, an agent OS, through the night, research and writing, channels and podcasts, from anywhere, any engine, teams and companies, yours alone, costs in sight). Arrows move it on a wide screen; on a phone it is swiped.

## 0.13.3 · 2026-10-13

- Pricing: "Not only code" becomes "Wherever agents can work", with a line on running agents as a fleet, and six kinds of work instead of five trades: code; video and all content; automation; anything agents do; a fleet, not a chat; teams and companies. "Small teams" is gone: companies use it too. The plans' "for whom" lines follow.

## 0.13.2 · 2026-10-13

- One place for Agent Farm's version: `app` and `beta` in `src/data/site.js`. The top chip, the demo screens and figures, the Ouroboros tile and the privacy payload all read it, and while `beta` is true every version the site prints carries "-beta" (the chip and the footer show a BETA tag; on phones the tag sits on the brand).
- About speaks as MuVuSOFT: no owner's name, country or "individual" on the page. The terms and privacy pages open with MuVuSOFT and keep the seller's legal details once, where the law asks for them.

## 0.13.1 · 2026-10-13

- The MuVuSOFT logo in place of the plain name: its brain mark and wordmark on a white tile in the footer, and the full logo beside the title of the About page. The files are in `public/assets/brand/`.

## 0.13.0 · 2026-10-12

The last two district pages, so every district of the board now has its own, and a page about who makes Agent Farm.

- Any brain, the district page (`/features/any-brain/`): all ten of district VII's features beside their figures, with the landing's Brains chapter as its live demo. Things to try: the Engines page's four questions, an install line typed and not run, ⚡ Test as one real turn; a route from a template, its tiers, the inherited `ANTHROPIC_` names cleared and the key bound to its address; the free-model radar; route health's free check and a paid test on a press; the vault's keychain, `{secret:NAME}` and its scopes; accounts as folders, one standing; the model switched from the next turn; the eleven doors and a saved setup; one agent's rules written to `AGENTS.md`; paths saved as tokens and healed on another machine.
- Beyond code, the district page (`/features/beyond-code/`): all thirteen of district III's features beside their figures, with the landing's Studio chapter as its live demo. Things to try: the Studio's five tabs and a scene's next step; a card's Re-run, Vary, Feedback and Scene; the three content recipes, their roles and the showrunner; a model id that picks fal.ai or Replicate, a long job polled, a local file uploaded after a yes; the ten FFmpeg recipes as argument lists; a FAIL made again, an edit judged beside its source, four takes and the first PASS, Triage; the brand kit with and without a kit; a run's files filed by stage and a promotion to asset; the Airtable engine's instances, its ten tools and Start; the all_in waiting area and a watched folder; the Premiere export at your frame rate; a publish asked, sent or only rehearsed; what worked, fed into the next idea; the daily digest read aloud.
- Five new tiles in district III, from the product's own feature list: Cut on your machine, Brand kit, Five stages, Airtable engine and What worked. Any media model now names its two providers and the upload that waits for your yes. Three new tiles in district VII: Eleven doors, One agent, every engine, and Any machine. 92 things in all.
- About (`/about/`): who makes Agent Farm, how it is made, what we promise, and how to write to us. Linked from the footer.
- Corrections found while writing VII: Gemini runs on an API key (its Google-account sign-in was retired), the vault has no bridge operation, so an agent can never ask for a key, and switching the model mid-session cannot change the account.
- The atlas keeps its tiles inside their column when a district has many.

## 0.12.0 · 2026-10-12

Two more district pages: agents that work as a team, and a farm that forgets nothing.

- Works as a team, the district page (`/features/works-as-a-team/`): all nine of district V's features beside their figures, with the landing's mission and Console as its live demos. Things to try: a mission's rounds, its writers taking turns, a cap spent and the finish-only round, Approve and Reject; one agent finding and reading another's session, written by another engine, in the same five words; a note, a task held for its role, a lease kept alive by heartbeats and a third handoff refused; a steer, a veto or a constraint on a running task; the Console's colours, a message steered into the turn or held for later, a setting the CLI refuses; a question's countdown, Stop timer, half-made picks and the words that never run on a clock; a question in Notices answered into the queue, and your own capture moving through it; the Live Timeline's marks, its alert boxes and a stall; four prompts in four worktrees, then Merge, Open or Discard.
- Never forgets, the district page (`/features/never-forgets/`): all nine of district VI's features beside their figures, with the landing's Never forgets chapter as its live demo. Things to try: every engine in one Sessions table, yours or the farm's, a session found by its id and the right-click; a session folded to its turns, the Show filter, Replay and Export MD's question; marking a turn for the wiki, a compile run and the page it writes; a file dropped into `_RAW_` and filed as done; the vault's facts and the agents' methods, a rule applied to both, a write refused; the search grammar, a hit opened at its message, search by meaning and its boundary; an agent's memory files, recalled or orphaned, a contradiction, a distilled draft and the graph; a laptop's sessions with their ⇄ badge; the fleet report, cache efficiency and the reports landing in the vault.
- New tile in district VI, Memory that gets used: which of an agent's memory files are really recalled, which the index lost, which contradict each other, and how they link up. Search everything now speaks only of transcripts. 84 things in all.
- Notes added where the pages were missing something: the Console takes files and screenshots dropped or pasted and saved prompt snippets; an agent that asks in Notices can sleep until you answer; a session opens with the files it changed and its own edits; a live feed opens a session at the event you click.

## 0.11.0 · 2026-10-12

Two more district pages: work that starts by itself, and an agent that sets the farm up for you.

- Recipes and triggers, the district page (`/features/recipes-and-triggers/`): all ten of district IV's features beside their figures, with the landing's Recipes and triggers chapter as its live demo. Things to try: a six-step workflow fanning out a step per shot; a missed schedule skipped, caught up or put to you; drop a file on a watch trigger and send a burst of them against the storm guards; Gatekeeper letting a real video through and stopping a temp file and a note, off, in the shadow and on; a sentence turned into a job, a schedule, a chain, or caught as a slip; the queue's ceilings, Run Next and a waiting task gaining priority; a run's output, its price and its templates, and Clear Finished Tasks; a night walled at 03:00 retried every 40 minutes, at the reset, or on another account; Pause all, 1h, 8h, 24h and quiet hours; a week's forecast.
- Just ask, the district page (`/features/just-ask/`): all ten of district VIII's features beside their figures, with the landing's Just ask and Never waits chapters as its live demos. Things to try: an agent setting up a weekly video in one sentence, call by call; what stays human on purpose; asking `farm.ops` for an index, a contract and a misspelt name; the same command line from Claude Code, Codex, Gemini and a script; the Toolbox and a live MCP probe; the capability matrix, copying a skill to another agent; pairing the phone app with a QR code and answering from it; a Telegram card with its buttons and the four gates; each event's tone, played for real; a turn read aloud in English or Turkish; packing an agent and what stays behind.
- New tile in district IV, A record of every run: each run's output in a file, failed when the exit code says so, its price from its own transcript, templates, and a monthly history. 83 things in all.
- The landing's Recipes and triggers chapter now says what the extension does by default: two runs at once and one per agent (it said five), and its forecast counts agent time from each job's usual run. Its tiles (Workflows, Schedules, Watch triggers, Gatekeeper, Say it in words, Queue and limits, Retries and rounds, One switch, Forecast) and three in Just ask (the operations, Agents with a home, Phone app) say what they do more exactly.
- A district page's own parts no longer restyle the landing demos shown on it: the district numeral, its step list and its next-district card had class names the demos also use, which blew up the bridge's "farm, meanwhile" list on the Just ask page.

## 0.10.0 · 2026-10-12

Two more district pages: what everything cost and whether the work was good, and a project of any kind.

- Measured, not claimed, the district page (`/features/measured-not-claimed/`): all nine of district IX's features beside their figures, with the landing's chapter IX as its live demo. Things to try: drag the five-hour window and watch the status bar and the card turn yellow at 80% and red at 95%; filter a session's steps by kind and switch raw against ⚖ weighted; push an agent's day past its budget; move the window past the downgrade line and see which jobs drop to haiku and which never do; drag a day's cost against its usual and the alarm line; change a rate and see old turns keep theirs; the judge's ladder overturning a cheap fail, upholding one, or passing on the first rung; an evals run with regressed, fixed and new cases; Insights with Fix, Delegate and Dismiss.
- Any project, the district page (`/features/any-project/`): all seven of district II's features beside their figures, with the landing's Backlog chapter as its live demo. Things to try: the four kinds of project and what each one's settings hold; a thought added from the capture box, and the queue reordered by ▲▼ with the file's 🎯 block following; the track's four views; the brief as Claude Code and as Codex receive it; the handover letter rewritten with your block kept; the portfolio's parts, health and weekly digest; cost by model, the rhythm, and a new project with too few turns to draw one.
- The landing's Measured chapter no longer says a model with no known price gets no figure: it is counted as $0 with a warning, as the district page explains. In its place, Codex on a ChatGPT plan shows tokens and why there is no price. Its cost alarm reads per agent and day, the way the extension counts it. Three tiles (Cost alarms, Project context, Handover letter) say what they do more exactly.
- `sitemap.xml` lists the indexable pages, and `robots.txt` points at it.

## 0.9.1 · 2026-10-12

The seller is named on the legal pages.

- Terms, Privacy and Refunds name the seller (Murat Vural, trading as MuVuSOFT, in Vietnam) and the contact address, agentfarm@muvusoft.uk; the terms are governed by the law of Vietnam, consumers keeping their own country's protection. They stay drafts, with `noindex`, until a legal review.
- Privacy also follows Vietnam's Personal Data Protection Law (Law No. 91/2025/QH15): requests are confirmed within two working days and carried out within 30 days, and Vietnam's authority (A05, Ministry of Public Security) is named beside the UK's and the EU's.
- Early-access sign-ups send a note to apply_farm@muvusoft.uk; answering it answers the person.
- The footer has a Contact link.

## 0.9.0 · 2026-10-12

The sales pages: prices, early access, and the terms, privacy and refund pages. People in the photographs, at every kind of work.

- New page Pricing (`/pricing/`): Free, Pro ($19), Fleet ($34, our pick) and Farm ($49) a month, in US dollars, with a monthly/yearly switch (a year costs ten months). Every plan has all 82 features; a plan changes only how far each goes: relay legs per chain, sessions at once, sign-ins in the pool, projects, workflows, schedules, night shifts, missions, Studio productions, the phone app and Telegram, search history, machines per licence, help. A table of what changes between plans, every feature on every plan by district, straight answers on pricing, and "Not only code": code, video, podcasts and channels, writing and research, small teams. Every price and limit comes from `src/data/plans.js`, so a change is one line.
- Early access: during the beta the Free plan is open and the paid plans' buttons reserve a place. The form (email, plan, what it is mostly for, consent) is handled by `early-access.php` on the host: one line per address in a file outside the web folder, a honeypot and a minimum fill time against bots, no IP address kept. The header's and the relay hero's "Join early access" go to it, and the closing band links to the plans.
- New pages Terms (`/terms/`), Privacy (`/privacy/`) and Refunds (`/refunds/`), drafts for legal review: Lemon Squeezy as reseller and merchant of record, what agents may do on your computer and who answers for it, following each AI provider's own terms, the licence check and what it keeps, the early-access list, 14 days to get your money back. The seller's name, country and contact address are marked gaps until they are filled in `src/data/site.js`; until then the pages carry a draft notice and `noindex`.
- Photographs: the district pages' strips show people at work instead of landscapes (a desk at dusk, a wall of plans, a colourist, a planner at dawn, a team at a whiteboard, a notebook, a developer, two screens, the accounts, a quiet room). Picked by the owner from Unsplash and Pexels, self-hosted.
- The header links to Pricing; the footer to Pricing, Terms, Privacy and Refunds, and credits Unsplash and Pexels. Between 980 and 1180 pixels the header keeps only Features and Pricing, so it no longer runs off the page.

## 0.8.0 · 2026-10-12

The second district page, photographs between the chapters, and a Features page that moves.

- Safe and yours alone, the district page (`/features/safe-and-yours-alone/`), is drawn: all eight of district X's features beside their figures, with the landing's chapter X as its live demo. Things to try: where the phone page listens (this machine or your network) and how often an idle farm reads its plan (planUsageRefreshMinutes); free or paid licence and what each sends; commands, searches and browser visits thrown at ShellGuard, BridgeGuard and the browser leash, which pass or are stopped; the browser's approval (ask or auto); Superpowers per agent and per job. The licence questions answer from data/facts.js.
- Photographs: six human bands on the landing between chapters (Fri 18:00 you leave the desk, Sat 03:12 the farm is still at it, a line in a notebook, a projector's beam, a team at a laptop, Mon 08:00 a phone in hand), and a photo strip at the head of every district page. Real photographs from Unsplash, self-hosted; they fade in and drift slowly while on screen.
- The console ("This is the screen you work in. Take it apart.") is third again, right after the fleet wall.
- Features moves: a board of every district's cells in the hero on which the whole-farm stories travel, cards that come in with their district, and a small moving emblem for each district.
- Sounds load from the site's top folder, so any page can play them.
- The Features page's district buttons wrap at every width; on a wide screen the tenth ran off the page.

## 0.7.0 · 2026-10-12

Ten districts, privacy said exactly, and the first district page drawn instead of written.

- New district IX, Measured, not claimed, with its own chapter on the landing: the plan of every account (five-hour window and week, the 70% line past which automatic jobs move to haiku, the status bar), where the live leg's money and window went (nine kinds of step arriving one by one, raw and ⚖ weighted figures, the API calls and steps), daily budgets with their 80% warning, a cost alarm against a median, honest zeros, and the judge's ladder judging a check cheap first (a fail climbs, a pass above overturns it and no retry is paid), with evals and Insights. Nine tiles: Live plan usage, Where it went, Budgets, Cheaper, not stopped, Cost alarms, Honest numbers, Judge ladder, Evals, Insights.
- District IX, Yours alone, becomes X, Safe and yours alone, with five guards as tiles: ShellGuard, BridgeGuard, Permissions as shown, Keys kept out, Browser on a leash.
- New tiles elsewhere: One switch (IV), Any media model (III), Notices and the queue (V), Other machines (VI), Agents with a home (VIII). Missions, Countdown questions, Schedules, Search, the bridge operations and the phone app say more. 82 things in all.
- Privacy, said exactly: 0 bytes of your work to us. The free version never contacts us; a paid licence checks its key once a day, and the page shows the whole message (key, a hash of the machine, the version) and the answer, with what is never in it. Without a connection it keeps working 30 days. The diagram draws the licence line beside the cut line of your work, and the optional services you switch on are named. The FAQ, the fleet band, the closing band and the page description follow.
- Never stops, the district page, is drawn: each feature has a figure beside it, a rebuilt screen or a moving diagram with demo data, and its steps are buttons that show themselves in the figure; a figure plays its steps once by itself when first seen. Three have something to play with: the handover line (contextHandoverPct), the quota line (quotaHandoverPct) and the leg ceiling (batonMaxHops) as sliders, and the sentry leader's mode as buttons. The settings fold away.
- Facts: the bridge has 579 operations (it only grows; the page reads the number from data/facts.js everywhere). The answer on live hooks follows the Technical DNA: Claude Code and Codex report through their own hooks and Gemini's are forwarded, so all three reach the Live Timeline mid-turn; only Claude Code can be told something back.
- The maker is written MuVuSOFT.
- Chapter and district counts ("Chapter IV of X", "ten districts") are computed from the list. The whole-farm board is two rows of five with its figures under them; the Features page's district buttons wrap.

## 0.6.0 · 2026-10-11

The site has pages behind the landing (plan v0.8).

- New page Features (`/features/`): all 65 things as cards in their nine districts, with search and district buttons. A filtered list keeps its words in the address, so it can be shared.
- New page Never stops (`/features/never-stops/`), district I in depth: the landing's Days and Rules demos, then each of its seven features with what it solves, how it works step by step, the settings that steer it and their defaults, and where to see it; questions; the next district. Every default and every quoted line was read in the extension's source.
- The header and the footer link to Features; chapter I's opener links to its page.
- The build makes any number of pages, each in its own folder with relative paths and its own script, sharing one stylesheet. The site still opens from disk.

## 0.5.0 · 2026-10-11

The page is now read in nine chapters, one per district of the board, and every chapter shows its part of the farm working.

- Chapter openers: each district of the board opens its chapter with its numeral, name and tiles. Click a tile to read it; "See it" goes to the part of the chapter that shows it, and a demo that can show the tile switches to it. The side index lists the chapters.
- New chapter III, Beyond code: the Studio page rebuilt. A production makes a short film, "The last keeper": a vision model fails the first storm take and it is made again with the critique, Triage keeps what passed, Assemble lines the scenes up for a Premiere sequence, and the player beside the page plays the film. The film is drawn on a canvas, not a video file.
- New chapter IV, Recipes and triggers: the Tasks page rebuilt (plan, runs, "tell the farm what to do, in words"), and a file landing in a watched folder that Gatekeeper checks before a recipe runs.
- New chapter VI, Never forgets: the Sessions page, one session's turns, a turn kept for the wiki, the compile that writes a wiki page, and the vault in Obsidian with its graph.
- New chapter VII, Any brain: the Engines page with a test turn, routes that plug other models into Claude Code and OpenCode (a route made from a template, saved and tested), route health, the free-model radar, accounts with their policies, and the secret vault.
- New chapter VIII, Just ask: a chat in which an agent sets the farm up over the bridge, one command at a time: a weekly video recipe and its schedule, a session picked up by its id, a new route, an agent packed for another machine.
- Never waits, in chapter VIII, reaches past the phone. The phone has a second screen, a Telegram chat bound to an agent: a card when a turn ends or asks, answered with one tap, in step with the cards beside it. Below it is the Sound page: which of the ten events ring and with which tone, a session or an agent that sounds its own way, Say who after the tone, and an answer read aloud, whole or a selection. The demo reads with the browser's own speech, and only with a voice that runs on the device, so no text leaves the page.
- Two new tiles, Telegram and Read aloud: 65 in all.
- Chapter II, Any project: the Projects page now lists a documentary, a thesis and a campaign next to the app, with their own backlogs, and has the Track tab: which session and which turn worked each item, and what an agent tried that did not work.
- Section More is gone: its ten tones are on the Sound page under Never waits, its engines card became chapter VII, its platform card the bridge chat, and its figures are under the board.
- Copy: the fleet band says "nothing is sent to us" (engines talk to their own providers, so "nothing leaves your machine" was not exact); the hero says code is one kind of work; the bridge counts are recounted from the extension's source.
- The extension's repository is closing, so the page no longer links to it or calls the source public. The call to action goes to the extension's Marketplace listing; the footer links there too.
- Sections renumbered 01–16.

## 0.4.0 · 2026-10-11

The page now shows everything the farm does, not only the relay.

- New section 03 The whole farm: 63 capabilities as tiles in nine districts (Never stops, Any project, Beyond code, Recipes and triggers, Works as a team, Never forgets, Any brain, Just ask, Yours alone) and a card of the figures under them. Click a tile and the desk below reads it out; a few tile figures follow the live relay, accounts and backlog.
- Five stories play across the board, one step at a time, with a line following the path: a long video landing in a watched folder, a weekend chain, a thesis chapter, continuing another engine's session by its id, and a recipe set up from one sentence. On phones the tiles become chips and the desk shows the path so far.
- One list for every capability (`src/data/features.js`), with where each line was checked; the /features and /pricing pages planned next will read the same list.
- Sections renumbered 01–12; files renamed to match.

## 0.3.0 · 2026-10-11

The page now says where the work comes from: the project backlog.

- New section 04 Backlog: the Projects page, Backlog tab, rebuilt with demo data (project tabs, capture box, area codes, Next up with "agents take 5", families, sizes, `#byAI` / `#byREQ`, ⛔ waits on). A thought is captured and filed while you watch, and the item the relay's live leg is working closes when that leg finishes it.
- Section 05 (was Days) now shows the chain across three days and four nights, not three nights: nights are shaded and the legs run through them, a band above the legs names the backlog item each leg worked, and the backlog beside the strip ticks off as it plays.
- One backlog for the whole page (`src/data/backlog.js`, `state.js`): the hero, the console card and the Backlog section all work the same queue.
- Copy: the hero, the fleet band, the closing line and a new first answer ("Where does the work come from?") speak of the backlog and of day and night, not of nights alone.
- Sections renumbered 01–11; files renamed to match.

## 0.2.0 · 2026-10-11

The site can now be opened and uploaded without any tools.

- The build writes a plain site: `index.html` with relative paths, `assets/site.css`, one plain script `assets/site.js`, fonts and sounds under `assets/`. It opens from disk with a double-click and uploads to Hostinger as it is.
- Branches: `main` carries only the finished site, `source` carries the code; `npm run deploy` rebuilds and updates `main`.
- All page scripts now start from one entry, `src/scripts/main.js`; components hold markup only.

## 0.1.0 · 2026-10-11

First version of the landing page, combining the three v2 prototypes in the agreed order.

- Relay hero (from prototype v2.3), fleet wall (v2.2) and exploded console (v2.1), sharing one demo farm, so the leg, accounts, cost and running version agree across the page.
- Days and the rules of the relay (v2.3), with the relay defaults read from the extension's `package.json`.
- New: Never waits (question card with an auto-answer countdown, a tool permission, the Now page on a phone, sound events with an opt-in sound switch).
- New: Together (a mission played round by round, and the Missions page rebuilt).
- New: More (the extension's ten sound events with their real tones, the five engines with a demo test, project tracks, bridge namespaces, settings sections, the density wall).
- New: Local (nothing goes to us), the proof figures, straight answers and the closing band.
- Astro static build, self-hosted fonts, side index, reduced-motion support, every section paused while off screen.
