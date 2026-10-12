// The photographs on the site: people, desks, rooms and light between the rebuilt screens, so the farm is seen from the
// side of the person it works for. All from Unsplash (unsplash.com/license: free to use, no permission needed), saved
// in public/assets/photos at two widths (-l, -s) and served from there, so the site still makes no third-party request.
// id: the Unsplash photo id; pos: object-position for the crop; tall: a portrait photo, shown beside its text.
export const photos = {
  friday:   { id: '1501504905252-473c47e087f8', alt: 'A laptop, a mug and an open notebook on a table by a bright window', pos: '50% 60%' },
  night:    { id: '1444723121867-7a241cacace9', alt: 'A city at night seen from a hill, its lights spread to the horizon', pos: '50% 70%' },
  backlog:  { id: '1484480974693-6ca0a78fb36b', alt: 'A hand writing a checklist in a notebook', pos: '50% 45%' },
  studio:   { id: '1478720568477-152d9b164e26', alt: 'An old film projector throwing its beam through the dark', pos: '45% 50%' },
  team:     { id: '1531482615713-2afd69097998', alt: 'Two colleagues looking at a laptop together in a busy office', pos: '60% 40%' },
  monday:   { id: '1523206489230-c012c64b2b48', alt: 'A phone held above an open hand by the water', pos: '50% 50%', tall: true },
  'd-relay':      { id: '1519681393784-d120267933ba', alt: 'Snowy mountains under a night sky full of stars', pos: '50% 60%' },
  'd-projects':   { id: '1552664730-d307ca884978', alt: 'A team planning in front of a wall of sticky notes', pos: '50% 40%' },
  'd-studio':     { id: '1485846234645-a62644f84728', alt: 'A hand holding a clapperboard against a desert sky', pos: '50% 45%' },
  'd-automation': { id: '1506784983877-45594efa4cbe', alt: 'A cup of coffee on an open monthly planner', pos: '50% 50%' },
  'd-team':       { id: '1517245386807-bb43f82c33c4', alt: 'People talking with their hands around a laptop', pos: '50% 45%' },
  'd-memory':     { id: '1481627834876-b7833e8f5570', alt: 'A long library aisle lit by hanging bulbs', pos: '50% 35%' },
  'd-engines':    { id: '1550439062-609e1531270e', alt: 'Someone at a desk in the dark between three glowing monitors', pos: '50% 50%' },
  'd-bridge':     { id: '1520923642038-b4259acecbd7', alt: 'An orange rotary telephone on a wooden table', pos: '55% 60%' },
  'd-measure':    { id: '1453928582365-b6ad33cbcf64', alt: 'A laptop, a cup of coffee and notes on a light wooden desk, from above', pos: '50% 50%' },
  'd-privacy':    { id: '1470770841072-f978cf4d019e', alt: 'A wooden house on a still mountain lake', pos: '50% 60%' },
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
