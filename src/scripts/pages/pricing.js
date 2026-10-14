// /pricing/: monthly or yearly prices on the cards, a Reserve button that picks its plan in the form, and the
// early-access form, sent to early-access.php on the host. Opened from disk there is no host, and the form says so.
import '../header.js';

// the kinds of work: a fanned deck. The card under the pointer, in focus or tapped opens; left alone and on screen, the
// deck opens the next card every few seconds, so its words are read without a hover.
const cards = [...document.querySelectorAll('.prc .fc')];
if (cards.length) {
  let cur = 0, idle = 0, seen = false;
  const open = i => { cur = i; cards.forEach((c, k) => c.classList.toggle('on', k === i)); };
  cards.forEach((c, i) => {
    c.addEventListener('mouseenter', () => { if (matchMedia('(hover: hover)').matches) { idle = -3; open(i); } });
    c.addEventListener('focus', () => { idle = -3; open(i); });
    c.addEventListener('click', () => { idle = -3; open(i); });
  });
  const deck = cards[0].parentElement;
  deck.addEventListener('mouseleave', () => { idle = 0; });
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { seen = es[0].isIntersecting; }, { threshold: 0.5 }).observe(deck);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
    setInterval(() => { if (!seen || deck.matches(':hover') || deck.contains(document.activeElement)) return; if (++idle >= 4) { idle = 0; open((cur + 1) % cards.length); } }, 1000);
}

const per = document.querySelector('.prc .per');
function period(p) {
  for (const b of per.querySelectorAll('button')) { const on = b.dataset.per === p; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }
  for (const el of document.querySelectorAll('.prc [data-m][data-y]')) {
    const v = p === 'y' ? el.dataset.y : el.dataset.m;
    if (el.tagName === 'A') el.href = v; else el.textContent = v;
  }
}
per.addEventListener('click', e => { const b = e.target.closest('button'); if (b) period(b.dataset.per); });

const form = document.getElementById('ea'), st = document.getElementById('ea-st');
for (const a of document.querySelectorAll('.prc a[data-plan]'))
  a.addEventListener('click', () => { form.plan.value = a.dataset.plan; setTimeout(() => form.email.focus({ preventScroll: true }), 600); });

form.t.value = String(Date.now());
const say = (t, ok) => { st.textContent = t; st.className = 'st ' + (ok ? 'ok' : 'no'); };

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.email.checkValidity()) return say('That email address does not look right.', false);
  if (!form.consent.checked) return say('Tick the box, so we may write to you.', false);
  if (location.protocol === 'file:') return say('The form works on agentfarm.space, not from a file on disk.', false);
  const btn = form.querySelector('button');
  btn.disabled = true;
  try {
    const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.ok) { form.dataset.sent = ''; say(j.again ? 'You were already on the list. We will write once, when paid plans open.' : 'Done. We will write once, when paid plans open.', true); }
    else say(j.error || 'Something went wrong on our side. Please try again later.', false);
  } catch { say('The form could not reach us. Please try again later.', false); }
  btn.disabled = false;
});
