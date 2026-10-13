// /pricing/: monthly or yearly prices on the cards, a Reserve button that picks its plan in the form, and the
// early-access form, sent to early-access.php on the host. Opened from disk there is no host, and the form says so.
import '../header.js';

// the kinds of work: a row that slides; the arrows move it by about two tiles, and the fade at its edge goes at the end
const row = document.querySelector('.prc .wtiles');
if (row) {
  const kb = [...document.querySelectorAll('.prc .kb')];
  const edge = () => {
    const end = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
    row.classList.toggle('end', end);
    kb.forEach(b => { b.disabled = b.dataset.k === '1' ? end : row.scrollLeft <= 4; });
  };
  kb.forEach(b => b.addEventListener('click', () => row.scrollBy({ left: +b.dataset.k * row.clientWidth * 0.75 })));
  row.addEventListener('scroll', edge, { passive: true }); addEventListener('resize', edge); edge();
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
