# Changelog

All notable changes to agentfarm.space. The site follows [semantic versioning](https://semver.org).

## Unreleased (0.8.0)

- Photographs: six human bands on the landing between chapters (Fri 18:00 you leave the desk, Sat 03:12 the farm is still at it, a line in a notebook, a projector's beam, a team at a laptop, Mon 08:00 a phone in hand), and a photo strip at the head of every district page. Real photographs from Unsplash, self-hosted; they fade in and drift slowly while on screen.
- The console ("This is the screen you work in. Take it apart.") is third again, right after the fleet wall.
- Features moves: a board of every district's cells in the hero on which the whole-farm stories travel, cards that come in with their district, and a small moving emblem for each district.
- Sounds load from the site's top folder, so any page can play them.

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
