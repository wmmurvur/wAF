# agentfarm.space · source

> **Türkçe not:** Bu dal sitenin kaynak kodu. Yüklenecek bitmiş site `main` dalında; açmak ve Hostinger'a yüklemek için oradaki README'ye bak.

The website of **Agent Farm**, mission control for AI agents in VS Code (publisher MuVuSOFT, extension id `muvusoft.agent-farm`).

A long landing page and, behind it, the feature pages (plan v0.8): `/features/` with all 92 things, and one page for each of the ten districts of the board. Then the sales pages: `/pricing/` with the plans and the early-access form, the terms, privacy and refund pages, and `/about/`. Built as a static site with [Astro](https://astro.build). Every screen on it is rebuilt from real screenshots of the extension and runs on demo data. Every number it states comes from the extension's source or a real screen, and `src/data/facts.js` says where.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22 or newer) |
| `npm run build` | Build the finished site into `dist/`: `astro build`, then `scripts/finish.mjs` |
| `npm run deploy` | Build, then replace the contents of the `main` branch with `dist/` and push it |
| `npm run check` | Astro and TypeScript diagnostics |

To look at a build, open `dist/index.html` straight from disk; no server is needed. Links between pages are written as folders (`features/`); a host serves the folder's `index.html`, and opened from disk a small script in each page's head goes to the `index.html` itself.

## Branches

- **`source`**: this code. Every change happens here.
- **`main`**: only the finished site (`index.html`, the page folders such as `features/`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `assets/`), written by `npm run deploy`. It is what Hostinger serves, by upload to `public_html` or through Hostinger's Git deployment. Never edit it by hand: the next deploy replaces it.

## The finished site

`scripts/finish.mjs` turns Astro's output into a plain site:

- every path is relative, worked out from each page's folder, so every page works from disk and in any folder on any host;
- each page has one plain script (module scripts do not run from disk): the landing's is bundled from `src/scripts/main.js` into `assets/site.js`, another page's from `src/scripts/pages/<name>.js` into `assets/<name>.js`, named by the page's `script`;
- all pages share one stylesheet, `assets/site.css`; fonts are in `assets/fonts/`, sounds in `assets/sounds/`;
- the pages stay readable, and their links to the stylesheet and script carry `?v=<site version>` so browsers fetch the new files after a deploy.
- `sitemap.xml` lists every page a search engine may index (a page with `noindex`, like a legal draft, is left out); `robots.txt` points at it.

## The page, in order

The order lives in `src/data/page.js` (plan v0.7 §5); section numbers and the side index are computed from it. After the three v2 prototype heroes and the whole-farm board, the page is read in ten chapters, one per district of the board (`districts` in `src/data/features.js`). Each chapter starts with an opener (`src/components/Chapter.astro`, id `ch-<district id>`) showing the district's tiles.

| # | Chapter | Section | Id | From |
|---|---|---|---|---|
| 01 | | Relay hero: live leg counter, relay track, quota shield, console | `s-relay` | prototype v2.3 Relay Launch |
| 02 | | Fleet wall: six live Agent Farm pages | `s-fleet` | prototype v2.2 Control Room |
| 03 | | Console, exploded and assembled on scroll | `s-console` | prototype v2.1 Command Deck |
| 04 | | The whole farm: every capability as a tile in ten districts, with stories that run across them | `s-atlas` | plan v0.7, the extension's source, the owner's Mserisi screenshots |
| 05 | I Never stops | Day and night: one chain across three days and four nights, item by item | `s-days` | prototype v2.3 |
| 06 | I | The rules of the relay (real defaults) | `s-rules` | prototype v2.3 |
| 07 | II Any project | Backlog: projects of any kind, the work list, and the Track tab | `s-backlog` | the owner's Projects screenshots (2026-10-11), M14 |
| 08 | III Beyond code | Studio: a production makes a short film | `s-studio` | M1a, M1b, the extension's `media/studio.js` |
| 09 | IV Recipes and triggers | Tasks: plan, runs, a watch trigger, Gatekeeper, a recipe | `s-auto` | M7-8-a to d, M15 |
| 10 | V Works as a team | Together: a mission with a lead and a team, and Sentry | `s-together` | screenshot 043 |
| 11 | VI Never forgets | Memory: sessions, a turn kept, the wiki compiled, the vault in Obsidian | `s-memory` | M3, M4, M5, the extension's `_REF/wiki.md` |
| 12 | VII Any brain | Brains: engines, routes, route health, accounts, secrets | `s-brains` | M9, M9b, M13, Mz2, Mz3a, Mz3b, 073, 074 |
| 13 | VIII Just ask | The bridge: an agent sets the farm up from one sentence | `s-bridge` | the extension's `_REF/bridge.md` and source |
| 14 | VIII | Never waits: question card, permission, phone app and Telegram, the Sound page (events, sessions, voice) | `s-waits` | screenshots 004, 021, 023, 060, Mz4, Mz5 |
| 15 | IX Measured, not claimed | Plan of every account, where the money and the window went, budgets, the judge's ladder, evals | `s-meter` | the Technical DNA §4–§6, the Blueprint (What Work Costs, judge ladder, budgets) |
| 16 | X Safe and yours alone | Local: nothing about your work comes to us, the licence check's whole message, and the proof | `s-local` | the v2.1 proof block; the owner's licence plan (2026-10-12) |
| 17 | | Start: straight answers and the closing band | `s-close` | v2.3 closing band |

## The feature pages

| Address | Page | Made from |
|---|---|---|
| `/features/` | All 92 things as cards in their ten districts; search and district buttons, kept in the address (`?q=…&d=…`) | `src/pages/features/index.astro`, `src/data/features.js` |
| `/features/never-stops/` | District I: the landing's Days and Rules demos, then each feature beside its figure: what it solves, its steps (a step clicked shows itself in the figure; some figures have a setting to slide), the settings folded, where to see it; questions; the next district | `src/pages/features/never-stops.astro`, `src/components/District.astro`, `src/data/deep/relay.js` |
| `/features/any-project/` | District II: the landing's Backlog chapter, then its seven features beside their figures (four kinds of project, the backlog file and its queue, the track, the brief every session starts with, the handover letter, the portfolio, cost and analysis); questions | `src/pages/features/any-project.astro`, `src/data/deep/projects.js`, `src/scripts/figs/projects.js` |
| `/features/measured-not-claimed/` | District IX: the landing's Measured chapter, then its nine features beside their figures (plan usage, where the money went, budgets, the downgrade, cost alarms, honest numbers, the judge's ladder, evals, Insights); questions | `src/pages/features/measured-not-claimed.astro`, `src/data/deep/measure.js`, `src/scripts/figs/measure.js` |
| `/features/safe-and-yours-alone/` | District X, the same way: the landing's Local chapter, then its eight features beside their figures (the machine, the licence check, the guards, Superpowers); questions | `src/pages/features/safe-and-yours-alone.astro`, `src/data/deep/privacy.js`, `src/scripts/figs/privacy.js` |
| `/features/recipes-and-triggers/` | District IV: the landing's Recipes and triggers chapter, then its ten features beside their figures (workflows, schedules, watch triggers, Gatekeeper, a sentence turned into a task, the queue and its limits, a record of every run, retries and rounds, the one switch, the forecast); questions | `src/pages/features/recipes-and-triggers.astro`, `src/data/deep/automation.js`, `src/scripts/figs/automation.js` |
| `/features/works-as-a-team/` | District V: the landing's mission and Console, then its nine features beside their figures (missions, shared sessions, agent notes and tasks, steer and veto, the Console, countdown questions, Notices and the queue, the Live Timeline, worktrees); questions | `src/pages/features/works-as-a-team.astro`, `src/data/deep/team.js`, `src/scripts/figs/team.js` |
| `/features/never-forgets/` | District VI: the landing's Never forgets chapter, then its nine features beside their figures (every session kept, any turn replayed, the wiki, the drop box, Obsidian, search, agents' memory, other machines, reports); questions | `src/pages/features/never-forgets.astro`, `src/data/deep/memory.js`, `src/scripts/figs/memory.js` |
| `/features/just-ask/` | District VIII: the landing's Just ask and Never waits chapters, then its ten features beside their figures (the bridge, its operations, the one command line, agents with a home, the capability matrix, the phone app, Telegram, sound, reading aloud, agent packs); a few figures play real tones or speak with the browser's own voice; questions | `src/pages/features/just-ask.astro`, `src/data/deep/bridge.js`, `src/scripts/figs/bridge.js` |
| `/features/any-brain/` | District VII: the landing's Brains chapter, then its ten features beside their figures (five engines, plug-in routes, the free-model radar, route health, the secret vault, many sign-ins, switching the model, the eleven doors, one agent for every engine, any machine); questions | `src/pages/features/any-brain.astro`, `src/data/deep/engines.js`, `src/scripts/figs/engines.js` |
| `/features/beyond-code/` | District III: the landing's Studio chapter, then its thirteen features beside their figures (the Studio, content recipes, any media model, FFmpeg cuts, the vision judge and Triage, the brand kit, the five-stage library, the Airtable engine, the media inbox, Premiere, the content calendar, what worked, the spoken briefing); questions | `src/pages/features/beyond-code.astro`, `src/data/deep/studio.js`, `src/scripts/figs/studio.js` |

## The sales pages

| Address | Page | Made from |
|---|---|---|
| `/pricing/` | The plans (Free, Pro, Fleet, Farm) with a monthly/yearly switch, the kinds of work it is for, what changes between plans, every feature on every plan by district, answers, and the early-access form | `src/pages/pricing/index.astro`, `src/data/plans.js`, `src/scripts/pages/pricing.js` |
| `/terms/`, `/privacy/`, `/refunds/` | The terms of use and licence, the privacy policy, the refund policy: a short version, then each part in full | `src/pages/<name>/index.astro`, `src/layouts/Legal.astro` |
| `/about/` | Who makes Agent Farm and how: four numbers from `facts.js`, why it exists, how it is made, what we promise, how to write to us. A photo of the maker's own workplace goes in `photos.js` as `about` | `src/pages/about/index.astro`, `src/styles/pages/about.css` |

- **Prices and limits** live only in `src/data/plans.js`: the cards, the tables, the form and the page description read it. Every plan has every feature; a plan changes the limits. `beta: true` makes the paid plans' buttons reserve early access; a Lemon Squeezy link in `checkout` makes a button buy.
- **The early-access form** posts to `public/early-access.php`, which Hostinger runs beside the static site. It keeps one CSV line per address (time, email, plan, use, the consent's wording date) in `agentfarm-private/early-access.csv` next to `public_html`, out of the web's reach, and emails `NOTIFY_TO` when that is filled in. A honeypot field and a minimum fill time keep bots out; no IP address is kept.
- **The legal pages** take who sells and how to reach them from `legal` in `src/data/site.js`. An empty field shows as a marked gap; while `draft` is true the pages say they are drafts and carry `noindex`.

A district gets its page by a page file, a `data/deep/<district id>.js` with its words (and `fig`, a label per step, for a feature drawn beside its text), a `scripts/figs/<district id>.js` that draws its figures, a `scripts/pages/<slug>.js` with its demos' scripts that calls `figures()` from `scripts/district.js`, and its id in `PAGES` (`src/data/features.js`). Until then its links go to its chapter on the landing. The words on a district page were checked in the extension's source; the citations are comments in its `data/deep` file.

## Structure

```
src/
  pages/index.astro            the landing: composes the sections in order
  pages/features/              /features/ and the district pages
  layouts/Base.astro           <head>, self-hosted fonts, global styles
  layouts/Legal.astro          the terms, privacy and refund pages' frame: draft notice, sections beside the text
  components/                  Header, SideIndex, Chapter (a chapter opener), District (a district's page), Who (a seller detail on the legal pages), Footer (markup only)
  components/sections/         Relay … Close, one file per section (markup only)
  styles/base.css              tokens, header, buttons, shared section heading, footer
  styles/chapter.css           the chapter openers
  styles/pages/*.css           the feature pages; figs.css: the figures beside a district's features
  styles/sections/*.css        one file per section, every rule scoped by the section id
  scripts/main.js              the page's one script: imports the others in page order
  scripts/state.js             the shared demo farm: accounts, relay leg, backlog queue, version, event bus
  scripts/*.js                 one script per section, plus header, side index, chapters and sound
  scripts/film.js              the Studio demo's short film, painted on a canvas
  scripts/pages/*.js           the script of each page but the landing
  scripts/district.js          a district page's figures: steps, autoplay once, arrows
  scripts/figs/*.js            the figures of each district, drawn with demo data
  scripts/soundpage.js         the Sound page under Never waits: events, sessions, and answers read aloud with the browser's on-device voice
  data/facts.js                every stated figure, with its source
  data/page.js                 the page order and which chapter each section belongs to
  data/backlog.js              the demo backlog: project, the family the chain works, the queue, captures; the other projects and their tracks
  data/features.js             every capability (92), its district, where the page shows it, and the story steps: the board, the chapter openers, later /features and /pricing
  data/photos.js               the photographs (Unsplash ids or the owner's picks, crops) and the human bands' words
  data/emblems.js              the small moving emblem of each district on /features/
  data/site.js                 links, the call to action, the site version, who sells (legal), rootOf (the way back to the top folder from a page)
  data/plans.js                the plans, their prices and limits: everything /pricing/ states
  data/deep/*.js               what a district's page says beyond its tiles, with the source of each fact
public/
  early-access.php             the early-access form's handler, run by the host
  assets/sounds/               the extension's own tones (media/sounds)
  assets/photos/               the photographs, two widths each (-l, -s)
scripts/
  finish.mjs                   second half of the build: makes dist/ a plain site
  deploy-main.sh               npm run deploy: puts dist/ on the main branch
  main-README.md               the README main carries (Turkish: how to open and upload the site)
docs/DESIGN.md                 palette, type, motion and demo-data rules
```

## Conventions

- **One farm.** All sections read `scripts/state.js`. The relay hero is the only writer of leg, context and quota, and it closes the front backlog item when its leg finishes it; other sections listen for `pass`, `rotate`, `item`, `filed`, `ver` and `reloading`; the Sound page's "Also sent to" sends `device` to turn the phone to its app or its Telegram screen. A chapter tile clicked sends `feature` with the tile's id; a demo that shows that tile switches to it and answers with `showing`. `data-shows="<tile ids>"` on an element with an id is where a tile's "See it" goes. The leg, the accounts, the backlog queue, the cost and the running version agree everywhere on the page.
- **Scoping.** Section styles are plain CSS files scoped by the section id (`#s-waits …`), so they also reach markup that scripts create. Element ids carry a section prefix (`r-`, `f-`, `a-`, `d-`, `b-`, `st-`, `au-`, `c-`, `t-`, `me-`, `br-`, `bg-`, `w-`, `l-`, `x-`). Keyframes are named `<section>-<name>`.
- **Facts.** A figure the page states goes into `src/data/facts.js` with a comment naming its source. Re-check them when the extension ships a release that changes them.
- **Demo data.** Screens are rebuilt, never pasted: no real emails, paths, account names or spending from the screenshots appear on the site.
- **Motion.** Every section pauses its animation while it is off screen and respects `prefers-reduced-motion`. Sound never plays and nothing is read aloud without a click.
- **Privacy.** Fonts are self-hosted; the page makes no third-party request. Read aloud uses only a voice that runs on the visitor's device (`localService`); with none, the demo says so and stays quiet.
- **Versions.** The site follows semver in `package.json`, `src/data/site.js` and `CHANGELOG.md`. Design prototypes and the plan are versioned outside this repo (`AF-WEB_PLAN_v0.7`, `AF-WEB_PROTO v1.x / v2.x`).

## Open decisions

- Hosting: Hostinger (decided 2026-10-11).
- The extension's repository is closing (plan v0.7 §8), so nothing links to it. The call to action goes to the Marketplace listing (`src/data/site.js`); check that the listing is live on the day the extension is published. The changelog gets its own page with the /features pages.
- The header's "Join early access" goes to the early-access form on `/pricing/#early`.
- Prices, plans and limits are a first proposal (owner, 2026-10-12: $0, $19, $34, $49 a month, a year is ten months, no trial, Lemon Squeezy); change them in `src/data/plans.js`.
- The legal pages carry the owner's name, country (Vietnam) and contact address from `legal` (`src/data/site.js`) and stay drafts until a reviewer has read them; set `draft: false` then. Early-access notes go to `NOTIFY_TO` in `public/early-access.php`.
- Licence: the free version never contacts us; a paid licence checks its key once a day and keeps working 30 days offline (owner, 2026-10-12; `licence` in `src/data/facts.js`). Change the figures there when the extension ships its own.
- An Open Graph image and the extra product pages (plan §6).
