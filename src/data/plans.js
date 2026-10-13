// The plans and what they cost (/pricing/). One place to change a price, a name, a limit or a plan: the cards, the limit
// table, the comparison of every feature and the early-access form all read this file.
//
// The owner's decisions (2026-10-12): Free $0, then $19, $34 and $49 a month in USD; a year costs ten months; no trial;
// sales through Lemon Squeezy; during the beta the free plan is open and the paid plans take early-access sign-ups.
// Prices are not final and will change often, so nothing else on the site types a price.
//
// The model: every plan has every feature, and a plan changes only how far each one goes (the owner's rule: "every
// function is there for a free user, with its own limits; the plan raises them or takes them away"). The numbers below
// are the first proposal and are meant to be tuned. The extension enforces them once paid plans open; until then
// everything is open.
//
// checkout: the Lemon Squeezy checkout links per plan, monthly and yearly. While `beta` is true, or a plan has no link,
// its button reserves early access instead of buying.

export const pricing = {
  currency: '$',
  yearlyMonths: 10,                       // a yearly plan costs this many months
  beta: true,
  updated: '2026-10-12',
  plans: [
    { id: 'free', n: 'Free', price: 0, k: 'Every part of the farm, to try on real work.', who: 'One night of it, to see what it does.' },
    { id: 'pro', n: 'Pro', price: 19, k: 'One person\'s work, carried on through the night.', who: 'One person\'s work of any kind: code, content, automation, research.' },
    { id: 'fleet', n: 'Fleet', price: 34, k: 'Many projects and sign-ins, side by side.', who: 'Several projects at once, a studio or a team.', pick: true },
    { id: 'farm', n: 'Farm', price: 49, k: 'No ceilings anywhere.', who: 'Teams and companies: whole days and nights of work on every engine they have.' },
  ],
  checkout: {},                           // e.g. pro: { monthly: 'https://…lemonsqueezy.com/buy/…', yearly: '…' }
};

const U = 'Unlimited';

/* What changes between plans: one row per limit, values in plan order (Free, Pro, Fleet, Farm). `f` ties a row to a
   feature of data/features.js, so the comparison of every feature shows the limit in that feature's row. `card` rows are
   also printed on the plan cards. */
export const limits = [
  { id: 'legs', f: 'relay', card: true, n: 'Relay legs per chain', v: [3, 15, 50, U], note: 'A chain that reaches its ceiling parks with its handover note; you can carry it on yourself.' },
  { id: 'sessions', f: 'console', card: true, n: 'Sessions running at once', v: [3, 6, 12, U] },
  { id: 'signins', f: 'accounts', card: true, n: 'Sign-ins in the pool', v: [2, 4, 10, U], note: 'Your own plans and keys on any engine, used as each provider\'s terms allow; the relay and the night shift move between them.' },
  { id: 'projects', f: 'kinds', card: true, n: 'Projects with their own memory', v: [3, 15, 50, U] },
  { id: 'flows', f: 'flows', n: 'Saved workflows and recipes', v: [3, 15, 50, U] },
  { id: 'schedules', f: 'schedules', n: 'Schedules and watch triggers', v: [3, 15, 50, U] },
  { id: 'sentry', f: 'sentry', n: 'Night shifts (Sentry)', v: ['1, three rounds', '1', '3 at once', U] },
  { id: 'missions', f: 'missions', n: 'Missions running at once', v: [1, 2, 5, U] },
  { id: 'studio', f: 'studio', n: 'Studio productions', v: [1, 5, 20, U] },
  { id: 'phone', f: 'phone', card: true, n: 'Phone app and Telegram', v: ['Watch, 20 answers a day', 'Full control', 'Full control', 'Full control'] },
  { id: 'search', f: 'search', n: 'Search history', v: ['30 days', '1 year', 'Everything', 'Everything'] },
  { id: 'machines', n: 'Machines per licence', v: ['No licence needed', 2, 3, 5] },
  { id: 'help', n: 'Help', v: ['Community', 'Email', 'Priority email', 'Priority email, and a say in what comes next'] },
];

/* features whose row carries the same limit as another row (a schedule and a watch trigger share one count) */
export const sameLimit = { triggers: 'schedules', telegram: 'phone' };

export const yearly = p => p.price * pricing.yearlyMonths;
export const money = n => `${pricing.currency}${n}`;
