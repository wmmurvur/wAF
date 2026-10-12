// District III, Beyond code: the words of its page (/features/beyond-code/). Names, sentences and tile figures are in
// data/features.js; this file holds what the page says beyond them. Every rule, default and setting key was read in the
// extension's own guide (the Blueprint, cited by section heading: "The content layer at a glance", "🎬 Studio — the
// pipeline on one page", "Media Step", "Media Gallery", "Production Scenes", "External Asset Ingest", "Media Cost and
// Budget", "The Editing Bridge — Premiere Sequence", "Tool step — local media recipes", "Feeding the flow", "Airtable
// Engine Module", "Content Calendar and Publish Step", "Analytics feedback — the metrics step", "Daily Digest Card",
// "Voice Briefing", the Farm Settings reference table and the release notes named), its Technical DNA (cited by §) or
// the owner's ranked feature list (§19 the Studio, §16 the voice cockpit); the citations are the comments. Productions,
// files, agents, models, prices and figures in the figures are demo data.
// how and note may hold <code> and <em>; everything else is plain text. fig: a short label per step of how, shown on
// the step and under the feature's figure (scripts/figs/studio.js draws the figures and what each step shows).

export default {
  description: 'Agent Farm is not only for code: agents run a media production scene by scene, with any fal.ai or Replicate model, local FFmpeg cuts, a vision judge, a brand kit, a library that files every file by stage, Premiere sequences, a content calendar with approved publishing, the numbers back into the next idea, and a spoken daily briefing.',
  promise: 'Not all work is code. A video, a series of shorts or a week of posts is the same kind of long, many-step job, and agents can carry it the same way: an idea, a script, the shots, a judge that looks at every one, your keep or drop, and a sequence that opens in Premiere. You get the files, filed and described, not a chat about them.',

  features: {
    studio: {
      fig: ['Five tabs', 'The next step', 'A card\'s doors', 'A production', 'Agents drive it'],
      // Blueprint, 🎬 Studio (3.30.0: "plan → generate → triage → assign → approve → assemble existed nowhere as a whole")
      why: 'A production has many parts: a list of scenes, a wall of generated files, an edit, the models and folders that feed them. When each lives in its own window, the thing you actually do, from a plan to a cut, exists nowhere as a whole.',
      how: [
        // Blueprint, 🎬 Studio (the five tabs and what each answers)
        'The Studio is one page with five tabs: Pipeline, the production scene by scene; Assets, everything made or brought in; Triage, what nobody has judged yet; Assemble, exactly what the export will hold; Sources, the providers, watched folders and what it all costs.',
        // Blueprint, 🎬 Studio ("A scene's next step is derived from evidence, not guessed")
        'Each scene shows one button, its next step, and the step is read from what exists, not guessed: nothing made yet is Generate, files nobody judged is Triage, judged but not approved is Set status, approved is In sequence.',
        // Blueprint, Media Gallery (Re-run, Vary…, Feedback… 2.40.0, Scene…); 🎬 Studio (a record made here keeps its doors)
        'Every file made here keeps its doors. <em>Re-run</em> sends the same input again, <em>Vary…</em> lets you rewrite it, <em>Feedback…</em> asks what was wrong and folds your critique into the prompt, and <em>Scene…</em> files it under a scene.',
        // Blueprint, Production Scenes (production.json; draft / generating / review / approved); 🎬 Studio (studio.production.new: one scene title per line)
        'A production is a plain file in the agent\'s folder, <code>production.json</code>: a title and its scenes, one per line, each draft, generating, review or approved. You can edit it by hand.',
        // Blueprint, 🎬 Studio ("Bridge ops — the Studio had none at all"); DNA (bridge: studio 15 ops)
        'Everything a person clicks here, an agent can do too: fifteen bridge operations list the productions, find the files nobody has decided on, generate, judge, assign, approve and export. A long, repetitive production is exactly the job to hand over.',
      ],
      // Blueprint, Media Gallery (the old Open Media Gallery command opens the Assets tab)
      note: 'The old <em>Open Media Gallery</em> command still works: it opens the Studio on its Assets tab, which is what the gallery became.',
      see: { href: '#s-studio', l: 'The Studio page, live' },
    },

    crecipes: {
      fig: ['One pick', 'Three recipes', 'Roles, not agents', 'The showrunner', 'This run only'],
      // Blueprint, Production Scenes › The recipe book (M-53, 3.708.0)
      why: 'A content workflow is many steps, and building one from a blank page is where most people stop. Tie it to named agents and it breaks the day you rename one.',
      how: [
        // Blueprint, Production Scenes › The recipe book (New Recipe Workflow; saved through workflows.add's own validator)
        '<code>New Recipe Workflow</code> installs a whole workflow in one pick. It is saved like any workflow you build yourself, checked the same way, and you can change every step after.',
        // Blueprint, The recipe book (the three content recipes); The content layer at a glance (the vertical slice, accepted 2026-09-28)
        'Three content recipes come with it. <em>Video edited in parts</em> splits a video, edits each part from one brief, judges them and joins them over the original sound. <em>Long to shorts</em> turns a transcript into subtitled vertical shorts, each cut in one pass. <em>Weekly channel rhythm</em> goes from the week\'s idea to a publishing package for your approval.',
        // Blueprint, Role slots (M-53, 3.706.0: a step names a role; the workflow form's Roles box)
        'A recipe\'s steps name roles, such as scriptwriter, editor or publisher, never agents. You bind each role to one of your agents once, in the workflow\'s Roles box.',
        // Blueprint, Role slots (agentFarm.showrunner, default youtuber; a role bound to an agent that is gone stops the run naming both)
        'A role you leave open goes to the showrunner, one agent you name in Farm Settings who takes every open role. A role bound to an agent that no longer exists stops the run and names both.',
        // Blueprint, Role slots for one run (M-53, 3.707.0: Run with…, workflows.run roles=)
        '<code>Run with…</code> shows one box per role, with the agent the run will get and why. A pick there is for this run only; the workflow keeps its own binding.',
      ],
      // Blueprint, The recipe book (three quick one-agent recipes; no judge or supervisor model pinned)
      note: 'Three quick one-agent recipes come too: text to image, text to image to video, and audio to text with Whisper. No recipe pins a judge or supervisor model, so the cost preset you run with decides them.',
      set: [
        // Blueprint, Role slots
        ['agentFarm.showrunner', 'youtuber', 'The agent that takes every role a workflow leaves open.'],
      ],
      see: { href: '#s-studio', l: 'Install a recipe, live' },
    },

    media: {
      fig: ['The model id', 'Fed by the last step', 'A long job', 'A file of yours', 'What it costs'],
      // Blueprint, Media Step (2.26.0 the MediaProvider abstraction)
      why: 'The best image or video model changes every few months, and each lives behind its own site and its own API. A tool that wires in one is out of date by the time you learn it.',
      how: [
        // Blueprint, Media Step (no prefix → the fal.ai queue; replicate: prefix; FAL_KEY, REPLICATE_API_TOKEN)
        'A media step names its model in plain text, and the name says where it goes: <code>fal-ai/flux/schnell</code> goes to fal.ai, which reaches hundreds of image, video and voice models; <code>replicate:owner/name</code> goes to Replicate, latest or pinned to a version. Each uses its own key from the vault.',
        // Blueprint, Media Step (JSON input template with {prev_text} / {prev_json.field}; the answer becomes the next step's handoff)
        'Its input is a JSON template, and the prompt an earlier agent wrote flows straight in. What the model returns is downloaded and kept, and its answer is handed to the next step.',
        // Blueprint, Media Step ("Long video jobs can take minutes — the step stays running, and the queue status is polled")
        'A video can take minutes. The step stays running and asks the queue how it is doing at regular intervals, with a time limit you can set per step.',
        // Blueprint, Feeding the flow (M-41: local files uploaded by themselves, once, reused until the URL expires); 3.742.0 (a media step asking to upload a local file waits on you)
        'When the input names a file on your computer, the step asks before uploading it to the provider, then uploads it once and reuses the link until it expires. The question waits in Needs You like any approval.',
        // Blueprint, Media Cost and Budget (mediaPricing per image / per second / per request; the Media cost card; mediaBudgetMonthUSD)
        'Every job is priced by your own rules, per image, per second or per request, and lands on the Dashboard beside your text spend. A monthly media budget warns once when the last 30 days pass it.',
      ],
      // Blueprint, Media Cost and Budget ("The default prices are placeholders"); Media Step (a missing key fails with a clear message)
      note: 'The prices that ship are placeholders: check them against your provider\'s price page. Without a key the step does not run, and says which key it needs.',
      set: [
        ['agentFarm.mediaAuthSecret', 'FAL_KEY', 'The name of the vault secret that holds the fal.ai key.'],
        ['agentFarm.replicateAuthSecret', 'REPLICATE_API_TOKEN', 'The name of the vault secret that holds the Replicate key.'],
        ['agentFarm.mediaPricing', 'a table', 'Your price rules per model, per image, second or request.'],
        ['agentFarm.mediaBudgetMonthUSD', '0 (off)', 'The 30-day media spend that raises a warning, once a month.'],
      ],
      see: { href: '#s-studio', l: 'Sources and costs, live' },
    },

    cuts: {
      fig: ['Ten recipes', 'No shell', 'Presets', 'What comes back', 'Filed as it goes'],
      // Blueprint, Tool step — local media recipes, zero tokens (M-49)
      why: 'Half of video work is cutting, joining, reframing and levelling, and none of it needs a model. Paying an agent to write an FFmpeg command, and trusting the command it wrote, is the slow and risky way to do it.',
      how: [
        // Blueprint, Tool step (the recipe table)
        'A tool step runs one of ten FFmpeg recipes on your machine: split, join, take the sound out, lay sound under the picture, reframe, burn in subtitles, cut a short, pull stills, level the loudness, re-encode.',
        // Blueprint, Tool step ("ffmpeg is spawned with an argument list, never a shell line, so nothing can be injected through a value"; save refuses an unknown name)
        'FFmpeg is started with a list of arguments, never a shell line, so nothing in a file name or a value can run as a command. A recipe, preset or parameter name it does not know is refused when you save.',
        // Blueprint, Tool step (presets: Omni Flash parts, Vertical short 9:16, Web loudness −16 LUFS)
        'Named presets fill in the parameters you leave out: parts of ten seconds, a vertical 9:16 short, web loudness at −16 LUFS.',
        // Blueprint, Tool step (the result JSON; {steps.<id>.json.outputs} feeds a for-each or a join)
        'What comes back is a small JSON on the run\'s board, with the files it wrote, so the next step can walk every part, or join them, without anyone copying a path.',
        // Blueprint, Tool step ("every output is filed into the media library"); the content layer (zero tokens)
        'No agent, no model and no token is involved, so a cut costs nothing. Every file it writes is filed into the media library as it goes, a failed one kept with a note.',
      ],
      set: [
        // Blueprint, Tool step (flex points tool.outDir, tool.overwrite)
        ['tool.outDir', 'af-tool, beside the input', 'Where a recipe writes. Whether it may overwrite a file, or adds a suffix, is a setting too.'],
      ],
    },

    judge: {
      fig: ['The criteria', 'FAIL, made again', 'Before and after', 'Several at once', 'Keep or drop'],
      // Blueprint, Media Step (vision QA 2.25.0); 🎬 Studio ("Why Triage is new")
      why: 'A video model is wrong often enough that someone has to look at every shot. If that someone is you, the agents are only as fast as your evenings.',
      how: [
        // Blueprint, Media Step (an optional quality criterion; a vision-capable model opens the file)
        'Give a media step its criteria in a sentence, such as one person, a clear face, the beam visible. When the file is made, a model that can see opens it and answers PASS or FAIL, with its reason.',
        // Blueprint, Media Step (FAIL → the rationale appended to the prompt, regenerated up to the retry count); 3.711.0 (FAIL-METHOD and the same defect withhold retries)
        'A FAIL adds its reason to the prompt and the shot is made again, up to the retries you allow. A retry that would repeat the same mistake is not bought: the step stops and its supervisor is asked to change the plan.',
        // Blueprint, An edit is judged against what it started from (M-62, 3.743.0; judge.compare)
        'An edit is judged against what it started from. The judge sees the source and the result side by side and is asked whether only what you asked for changed, so colour bars that were already there do not read as a fault.',
        // Blueprint, Parallel-cheap (A-27, 3.712.0: media.candidates 1–4; the first PASS is picked)
        'A step can make up to four takes at once. The judge goes through them in order and the first that passes goes on; the others are kept, not handed on.',
        // Blueprint, 🎬 Studio (Triage writes the same fields as a selection step; a dropped asset never enters the sequence)
        'What nobody has judged waits in Triage for your keep or drop, whether a workflow made it or it came in from a folder. A dropped file never goes into a sequence.',
      ],
      // Blueprint, Media Step ("If the judge can't run … it doesn't block the pipeline"); district IX, Judge ladder
      note: 'If the judge cannot run, the shot is let through and marked unjudged rather than blocking the line. Checks start on a cheap model and only a FAIL climbs to a stronger one: see the judge ladder in Measured, not claimed.',
      set: [
        ['agentFarm.judgeCompare', 'auto', 'auto shows the judge the source beside an edit; never judges the result alone.'],
      ],
      see: { href: '#s-studio', l: 'Triage, live' },
    },

    brand: {
      fig: ['One kit', 'Read by every step', 'A step\'s own', 'Nothing hidden', 'Kept as a preset'],
      // Blueprint, Production Scenes › Brand kit (M-50, 3.702.0 – 3.704.0)
      why: 'A series looks like a series because the same colours, type, voice and faces come back every time. Typed again into every prompt, they drift by the third episode.',
      how: [
        // Blueprint, Brand kit (style, negative, colors, typography, voice, logo + logoPlace, aspect, duration, character)
        'A production keeps one brand kit: style, what to avoid, colours, typography, the voice that reads, the logo rule, aspect, length, and the recurring characters, each with a name, a reference image and a description.',
        // Blueprint, Brand kit ({brand.style}, {brand.character.ana.ref}; filled first, on the step's own words only)
        'Any step reads it by name: <code>{brand.style}</code>, or a character\'s reference image. It is filled in on the step\'s own words only, never on what an earlier step wrote.',
        // Blueprint, Brand kit (a step's own brand fields lie over the kit field by field; the tooltip names the value and where it came from)
        'A step can set a field of its own, such as a vertical aspect for the shorts, and only that field changes. Each box shows the production\'s value faintly and says where the value in force came from.',
        // Blueprint, Brand kit ("with NO kit the placeholder stays as written, so a missing brand shows in the prompt")
        'With no kit, the placeholder stays in the prompt as written, so a missing brand is something you can see, not a silent gap.',
        // Blueprint, Studio ▸ Sources ▸ Brand kits (3.704.0: Edit kit, Keep as preset…, Take a kept kit… fills the editor only)
        'Keep a kit as a preset and start the next production from it. Taking a kept kit only fills the editor; nothing is written until you press Save, so one click never overwrites a kit.',
      ],
      see: { href: '#s-studio', l: 'The brand kit in Sources' },
    },

    library: {
      fig: ['Five stages', 'Filed as it runs', 'A model fills it in', 'Your edits stay', 'Promoted'],
      // Blueprint, Airtable Engine Module › The media library (X-417), Every file a run makes is filed and recorded (X-418)
      why: 'A month of generating leaves thousands of files named like <code>output_0412.mp4</code>. Which one was the good take, which prompt made it, and what it was cut from is gone by the next week.',
      how: [
        // Blueprint, The media library (X-417: source · raw · semi · final · asset; all_in)
        'Every file has a stage, and a folder to match: source for material that came in, raw for what did not make it but is kept, semi for half done, final for what truly worked, asset for the reusable best, reached only by promoting it.',
        // Blueprint, Every file a run makes is filed and recorded (X-418: stage by role, the record, fingerprint, cause)
        'A run files every file it makes as it goes, with a record: duration, size and codec read off the file, the model and prompt that made it, the run and step, and a fingerprint, so the same bytes are never recorded twice. What it was made from is linked as its cause.',
        // Blueprint, A model fills each record's meaning (X-419: image by claude, video by agy frames, audio by nobody)
        'At the end of the run, a model that looks at the file fills in what only a look can tell: topic, tone, platform fit, accessibility, tags, and for a failed take which seconds can still be used. Claude opens images, Antigravity watches video frames.',
        // Blueprint, X-419 (only blank fields; the write re-reads on a version conflict); 🎬 Studio (the wall writes back only onto the version the card showed)
        'Only blank fields are filled. Your keep, drop, score, tags and notes are written onto the version you saw, and a record someone changed since is left alone, with the card saying so.',
        // Blueprint, 🎬 Studio (↑ promotes: the file moves to the next stage folder and its record with it; studioLibraryPromote)
        'Promote a file and it moves to the next stage folder with its record, after a yes or straight away, as you choose. The next run can start from your assets.',
      ],
      // Blueprint, X-418 (an engine down: filed anyway, the record waits in the pending list); Backfill (X-426, a dry run unless apply)
      note: 'If the database is not running, the file is filed anyway and its record waits until it answers. Files made before the library existed can be brought in once; it shows what it would do before it does it.',
      set: [
        ['agentFarm.studioLibraryPromote', 'asks first', 'Set to auto and a promotion moves the file at once.'],
      ],
      see: { href: '#s-studio', l: 'The Assets wall, live' },
    },

    airtable: {
      fig: ['Its own page', 'Ten tools', 'Never overwritten', 'Started for you', 'A run\'s material'],
      // Blueprint, Airtable Engine Module (3.0.0: a built-in module; knowledge atoms + media records; each deploy an instance on its own port)
      why: 'Records of what was made are only useful if agents can read and write them as easily as you can. A database only a person can open turns every agent into someone asking you to look something up.',
      how: [
        // Blueprint, Airtable Engine Module (the page: Instances, Folders, Defaults & connection; ports rediscovered on every look)
        'The Airtable engine is a local database of media records and knowledge on your machine, and its module ships with Agent Farm. Its page shows each instance as a card: running or not, its port, what it holds, and a button to open its own panel.',
        // Blueprint, Airtable Engine Module (Register MCP into ~/.claude.json; the staged copy self-heals; Probe tools; the 10 airtable_* tools)
        'One press registers it for every new Claude session, and <code>Probe tools</code> connects and checks. Agents then have ten tools: find instances, search, get a record, list templates, scan a folder for new files, save, update, and save knowledge or a note.',
        // Blueprint, Airtable Engine Module (media_update: optimistic concurrency; files referenced by absolute path, never moved or copied)
        'A file is referenced by its path, never copied into the database. An agent\'s update is refused if the record changed since it read it, so an edit made in the panel is never silently overwritten.',
        // Blueprint, Starting an engine (X-416: Start = node server.js, hidden and detached, no npm install, no browser tab)
        'An instance that is down shows <code>Start</code>: it runs hidden, outlives VS Code, opens no browser tab and installs nothing. The records that waited for it are written then.',
        // Blueprint, A run takes its material from the library (X-420: an airtable input is a search; for-each walks {item.file}; a folder trigger maps {file})
        'A workflow input can be a search of the library, such as the newest twenty assets about lighthouses, and a for-each step walks what it finds. Whatever is made names its source as the cause, so the chain from raw to finished can be followed back.',
      ],
      // Blueprint, Airtable Engine Module ("On an unconfigured module the tools guide instead of erroring"; one source of truth, re-read on every call)
      note: 'Until you add your engine\'s folder, the tools explain what to do instead of failing. A change on the page reaches running agents on their next call, with no restart.',
      see: { href: '#s-studio', l: 'Records on the Assets wall' },
    },

    inbox: {
      fig: ['The waiting area', 'Looked at', 'Sure, or asked', 'Watched folders', 'By hand'],
      // Blueprint, The waiting area (3.684.0, X-422: media.allin); External Asset Ingest (Wave A)
      why: 'Not everything comes from a workflow: a clip downloaded by hand, a phone\'s photos, an export from your editor. Sorting them is the job everyone postpones, and the unsorted pile is where good material is lost.',
      how: [
        // Blueprint, The media library (all_in: the user's waiting area; agents never file into it)
        'Each library has a waiting area, an <code>all_in</code> folder, where you drop files nobody has processed yet. Agents never put anything there; it is yours.',
        // Blueprint, The waiting area (each image looked at by claude, each video by agy frames; a stage, never asset)
        'On a pass, Claude looks at each image and Antigravity at each video\'s frames, and each is given a stage. Nothing goes straight to asset; that takes your promotion.',
        // Blueprint, The waiting area (sure → filed, recorded, form filled; unsure, audio, non-media stay; allInUnsure ask | wait)
        'A file the model is sure of is filed, recorded and described. One it is unsure of stays where it is, and you get one question listing them all, or they wait for the next pass, as you choose.',
        // Blueprint, External Asset Ingest (ingestFolders: scanned every 30 s, registered in place, waits until the file stops growing, 48 h, a folder pre-assigned to a scene)
        'Other folders can be watched. A new image, video or sound is registered where it lies, never copied, since video is big; a file still downloading is left until it stops growing, and a folder can be tied to a production and a scene.',
        // Blueprint, External Asset Ingest (Register Media Asset(s)…; external: badge; Re-run/Vary do not apply)
        'Or register files by hand and bind them to a scene. A file from outside wears an <em>external</em> badge and has no Re-run, since there is no input to run again.',
      ],
      set: [
        ['agentFarm.allInWhen', 'daily', 'Go through the waiting area with the daily media batch, or only when you ask.'],
        ['agentFarm.allInUnsure', 'ask', 'Ask about the files the model was unsure of, or leave them for the next pass.'],
        ['agentFarm.ingestFolders', '[]', 'Folders scanned for new media, each optionally tied to a production and scene.'],
      ],
      see: { href: '#s-studio', l: 'The waiting area in Sources' },
    },

    premiere: {
      fig: ['The sequence', 'Two files', 'Your frame rate', 'Back in', 'The next step'],
      // Blueprint, The Editing Bridge — Premiere Sequence (Wave D); 🎬 Studio › Assemble
      why: 'Agents can make the shots, but the final cut is a craft and a person\'s taste. A folder of clips with no order leaves you rebuilding the plan by hand before the real editing starts.',
      how: [
        // Blueprint, The Editing Bridge (scene order; kept video first, else video, else image; rejected not taken; empty scene skipped)
        'Assemble lays one clip per scene in the production\'s order: your kept video first, else any video, else a still. A dropped file is never taken, and a scene with nothing is skipped.',
        // Blueprint, The Editing Bridge (FCP7 XML: File → Import; CMX3600 EDL)
        'The export writes two files: an XML that Adobe Premiere opens with <code>File → Import</code>, its bins in scene order, and a CMX3600 EDL beside it for any other editor.',
        // Blueprint, The Editing Bridge ("The frame rate (24/25/30/60) and a default clip duration per scene are asked")
        'It asks for the frame rate, 24, 25, 30 or 60, and a clip length per scene. You refine the timing in the edit, where it belongs.',
        // Blueprint, The Editing Bridge (Naming convention: …_s03_… lands on that scene — the loop closes)
        'Name an export from your editor with its scene, such as <code>P01_S03_T02.mp4</code>, and drop it in a watched folder: it lands on scene three by itself. The loop between the agents and your edit closes.',
        // Blueprint, The Editing Bridge (Export watch: the render folder + a watch trigger)
        'Watch your render folder with a trigger and a finished export can start the next step, such as the subtitles or the publishing package.',
      ],
      // Blueprint, 🎬 Studio (studio.export: fcpxml, edl or both; only assets assigned to a scene are placed)
      note: 'An agent can export too, the XML, the EDL or both; only files assigned to a scene are placed.',
      see: { href: '#s-studio', l: 'Assemble and export, live' },
    },

    calendar: {
      fig: ['A note per publish', 'Through your flow', 'Your yes', 'Published', 'Overdue'],
      // Blueprint, Content Calendar and Publish Step (M-51, 3.719.0; "The calendar is a fact, so it lives in the vault")
      why: 'A content plan in a spreadsheet nobody opens, and uploads done by hand at midnight, is how a weekly channel becomes a monthly one. An agent that uploads on its own is worse: one bad post is public before you see it.',
      how: [
        // Blueprint, Content Calendar (one note per publish; Full Calendar frontmatter; status planned · producing · ready · published · cancelled; only its own keys patched)
        'The calendar lives in your notes vault, one note per publish, in the format Obsidian\'s Full Calendar plugin shows: title, date, time, platform and status, from planned to published. Agent Farm changes only its own lines; the rest of the note is yours.',
        // Blueprint, The publish step (one platform through a connection: your n8n flow does the YouTube / Instagram / TikTok upload)
        'A publish step sends one platform\'s publish to your own flow, such as an n8n webhook that does the YouTube, Instagram or TikTok upload. Agent Farm keeps no platform password and uploads nothing itself.',
        // Blueprint, The publish step (approval ask (default) · auto · never = rehearse; schedule now or planned)
        'Before it sends, it asks for your yes by default. It can also send on its own, or only rehearse: build the whole package and keep it, sending nothing. It can go out now or at the note\'s planned time.',
        // Blueprint, The publish step (the flow's answer read fail-soft; the note becomes published with the URL and time; the media record patched)
        'When your flow answers, the note becomes published with its link and time, or ready if the flow only scheduled it, and the file\'s record says where it went.',
        // Blueprint, The calendar on Living and Needs You (M-61, 3.721.0)
        'A publish past its time and still open shows on Living and in Needs You, oldest first, with buttons to open the note or its publish step. Move the date or mark it and the row goes.',
      ],
      set: [
        ['agentFarm.contentCalendarDir', '${vault}/01_INBOX/02_Calendar/CONTENT', 'The vault folder that holds one note per publish.'],
        ['agentFarm.publishApproval', 'ask', 'Ask before every publish, send on its own, or never send and only rehearse.'],
      ],
      see: { href: '#s-studio', l: 'The calendar and a publish, live' },
    },

    metrics: {
      fig: ['Asked for', 'On the record', 'What worked', 'Into the next idea', 'On its schedule'],
      // Blueprint, Analytics feedback — the metrics step (M-52, 3.720.0)
      why: 'The numbers live on the platforms and the ideas live in your head, and the two rarely meet. A channel that never looks back makes the same video that did not work, again.',
      how: [
        // Blueprint, the metrics step (published notes with a URL; posted to your flow; views · watchSeconds · completion · likes · comments · shares · saves · engagement)
        'A metrics step takes the published pieces of the last 30 days and asks your own flow for their numbers: views, watch time, completion, likes, comments, shares, saves and engagement.',
        // Blueprint, the metrics step (each row lands on its media record; engagement worked out when missing)
        'Each answer lands on the piece\'s own record. If the flow sends no engagement rate, it is worked out from the interactions; an answer with no numbers at all fails the step rather than recording zeros.',
        // Blueprint, Where it is read (performanceSummary: similar published content, its numbers and the average, or the best performers)
        'From them, a short summary is written for any new idea: how similar published pieces did against the average, or, when nothing is similar, what performed best.',
        // Blueprint, Where it is read ({performance} in the idea and script steps; the supervisor's brief)
        'The idea and script steps of a content recipe read it as <code>{performance}</code>, and the supervisor of a run gets it in its brief. The next idea is written knowing what worked.',
        // Blueprint, the metrics step ("How often is the workflow's own schedule — there is no second clock")
        'How often it runs is the workflow\'s own schedule; there is no second clock to keep in step.',
      ],
      // Blueprint, the metrics step (flex points metrics.fields and performance.brief)
      note: 'Which numbers are asked for is yours to choose, and a step can ask for its own. Switch the summary off and the prompts and the brief simply go without it.',
    },

    briefing: {
      fig: ['The digest', 'When it comes', 'This computer reads it', 'Or a voice model'],
      // Blueprint, Daily Digest Card (Pocket) and Voice Briefing; the owner's list §16
      why: 'At the end of the day you want to know what the farm did, but not by opening four pages. Sometimes your eyes are on something else entirely.',
      how: [
        // Blueprint, Daily Digest Card ("no model call, pure data": today's cost, active agents, top spenders with budget %, task and duty status, warnings)
        'The daily digest is one short card with no model call behind it: today\'s cost, the agents that worked, who spent most against their budget, how tasks and duties went, and any warnings.',
        // Blueprint, Daily Digest Card (agentFarm.dailyDigest = "21:30" → the webhook; Send Daily Digest Now by hand)
        'It comes at a time you set, through your webhook to Telegram, or when you ask for it.',
        // DNA §16 Audio / reader (speech.ts Windows voices; speechLang.ts senses the language and picks the voice; sanitizeForSpeech); district VIII, Read aloud
        'This computer can read it aloud for free, in a voice for the language it is written in, leaving out code and links that make no sense spoken.',
        // Blueprint, Voice Briefing (Speak Daily Briefing (TTS): a fal.ai TTS model, the same FAL_KEY; the mp3 into digestTtsFolder, else autoReportFolder)
        'Or name a voice model on fal.ai and the briefing becomes an mp3 in a folder your phone syncs, ready for the walk in the morning. It uses the same key as your other media.',
      ],
      set: [
        ['agentFarm.dailyDigest', 'off', 'The time the daily digest card is sent, such as 21:30.'],
        ['agentFarm.digestTtsModel', 'empty', 'The fal.ai voice model that reads the briefing into an mp3.'],
        ['agentFarm.digestTtsFolder', 'empty', 'Where the mp3 goes; empty uses the report folder.'],
      ],
      see: { href: '#s-studio', l: 'The spoken briefing, live' },
    },
  },

  faq: [
    // Blueprint, Media Step (fal.ai, Replicate; keys in the vault); DNA §1 (no model of its own)
    ['Does Agent Farm make the images and videos itself?', 'No. It runs no model of its own: a media step calls the fal.ai or Replicate model you name, on your own key, and Agent Farm downloads, judges, files and assembles what comes back.'],
    // Blueprint, Media Cost and Budget; Tool step (zero tokens)
    ['What does a production cost?', 'What your providers charge for the models you pick, and nothing more from us. Each job is priced by your rules and shown beside your text spend, a monthly media budget warns when you pass it, and the FFmpeg cuts on your machine cost nothing.'],
    // Blueprint, The Editing Bridge (FCP7 XML + CMX3600 EDL)
    ['Do I need Adobe Premiere?', 'No. Premiere opens the XML directly, and the EDL beside it is a standard any editor reads. You can also just take the files from their stage folders.'],
    // Blueprint, The publish step (your n8n flow does the upload; approval ask by default; never = rehearse)
    ['Will it post to my channels without asking?', 'Not unless you tell it to. A publish waits for your yes by default, can be set to only rehearse, and goes out through your own upload flow; Agent Farm holds no platform password.'],
    // Blueprint, External Asset Ingest; The media library (referenced by absolute path, never moved or copied by the engine)
    ['Can I use clips I made somewhere else?', 'Yes. Drop them in the waiting area to be looked at and filed, or in a watched folder to be registered where they are. They can be judged, kept, placed in a scene and exported like anything an agent made.'],
    // the owner's list §19 (Agent Farm is not only a code tool); Blueprint, The content layer at a glance (the vertical slice, accepted 2026-09-28)
    ['Is this a real part of the product or a side demo?', 'It is a real part. The whole chain, from a video split into parts, each edited and judged, to the parts joined over the original sound and filed as final, was run end to end with no copy and paste before it was called done.'],
  ],
};
