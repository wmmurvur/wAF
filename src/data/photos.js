// The photographs on the site: people, desks, rooms and light between the rebuilt screens, so the farm is seen from the
// side of the person it works for, and the work is not only code. The landing's bands are from Unsplash
// (unsplash.com/license: free to use, no permission needed); the rest the owner picked from Unsplash and Pexels (free
// licences) and sent as files (src: 'owner'). All are saved in public/assets/photos at two widths (-l, -s) and served
// from there, so the site still makes no third-party request.
// id: the Unsplash photo id; pos: object-position for the crop; tall: a portrait photo, shown beside its text.
export const photos = {
  friday:   { id: '1501504905252-473c47e087f8', alt: 'A laptop, a mug and an open notebook on a table by a bright window', pos: '50% 60%' },
  night:    { id: '1444723121867-7a241cacace9', alt: 'A city at night seen from a hill, its lights spread to the horizon', pos: '50% 70%' },
  backlog:  { id: '1484480974693-6ca0a78fb36b', alt: 'A hand writing a checklist in a notebook', pos: '50% 45%' },
  studio:   { id: '1478720568477-152d9b164e26', alt: 'An old film projector throwing its beam through the dark', pos: '45% 50%' },
  team:     { id: '1531482615713-2afd69097998', alt: 'Two colleagues looking at a laptop together in a busy office', pos: '60% 40%' },
  monday:   { id: '1523206489230-c012c64b2b48', alt: 'A phone held above an open hand by the water', pos: '50% 50%', tall: true },
  // the district pages' strips: people at the kind of work the district does (photos the owner picked, 2026-10-12)
  'd-relay':      { src: 'owner', alt: 'An empty desk at dusk, a lamp still on beside a laptop and a phone', pos: '50% 55%' },
  'd-projects':   { src: 'owner', alt: 'A hand pinning a card to a wall of plans and sketches', pos: '50% 40%' },
  'd-studio':     { src: 'owner', alt: 'A colourist at a grading desk in front of four screens', pos: '50% 35%' },
  'd-automation': { src: 'owner', alt: 'A cup of coffee on a monthly planner with the month\'s goals', pos: '50% 50%' },
  'd-team':       { src: 'owner', alt: 'A team around a table while one of them sorts sticky notes on the wall', pos: '50% 35%' },
  'd-memory':     { src: 'owner', alt: 'A fountain pen writing a line in a notebook', pos: '50% 50%' },
  'd-engines':    { src: 'owner', alt: 'Two people working side by side at their monitors', pos: '50% 40%' },
  'd-bridge':     { src: 'owner', alt: 'A woman in a café smiling at her phone', pos: '70% 40%' },
  'd-measure':    { src: 'owner', alt: 'A hand holding a calculator over a folder of bills', pos: '50% 55%' },
  'd-privacy':    { src: 'owner', alt: 'A quiet home office: a desk, a chair and a lamp by the wall', pos: '50% 50%' },
  // the landing's "Why a farm" section: a person leading a team of agents (the owner sent it, 2026-10-14)
  farm:           { src: 'owner', alt: 'A person standing among robots, guiding them by threads to screens of code, documents, search and charts', pos: '50% 50%' },
  // the pricing page: the kinds of work one farm does, and a face beside its questions
  'w-code':       { src: 'owner', alt: 'A developer with headphones at a terminal in a dim room', pos: '50% 40%', tall: true },
  'w-video':      { src: 'owner', alt: 'A video editor at a desk under a wall of pinned frames', pos: '50% 60%', tall: true },
  'w-audio':      { src: 'owner', alt: 'A podcaster with headphones speaking into a microphone', pos: '62% 40%' },
  'w-writing':    { src: 'owner', alt: 'Hands typing on a laptop at a wooden table beside a mug of coffee', pos: '58% 50%' },
  'w-team':       { src: 'owner', alt: 'A small team working on laptops around a wooden table', pos: '50% 45%' },
  'p-faq':        { src: 'owner', alt: 'A smiling woman in a hoodie and denim jacket against a blue wall', pos: '50% 30%', tall: true },
  'p-cut':        { src: 'owner', alt: 'A video timeline on an editing screen, close up', pos: '50% 50%' },
};

/* the human bands on the landing: a time or a place, a line, and what the farm is doing meanwhile */
export const bands = {
  friday:  { k: 'Fri 18:00', t: 'You leave the desk.', s: 'Thirty-eight items are open on the backlog. The fleet takes it from here.' },
  night:   { k: 'Sat 03:12', t: 'The farm is still at it.', s: 'Leg after leg, account after account. Nobody has to stay awake for it.' },
  backlog: { k: 'Any project', t: 'It starts as a line in a notebook.', s: 'Write the thought down. Agents work the list off in the order you set, whether it is an app, a film or a thesis.' },
  studio:  { k: 'Beyond code', t: 'Not all work is code.', s: 'Agents work as a production team, from the idea to the cut, and you get the film, not a chat about it.' },
  team:    { k: 'Works as a team', t: 'Agents work like a team. You still lead it.', s: 'A lead plans, a team on different engines does the work, and one word from you changes its course.' },
  monday:  { k: 'Mon 08:00', t: 'Coffee, and the weekend\'s work.', s: 'On your phone: nine items closed, two waiting for you. One tap answers each.' },
};
