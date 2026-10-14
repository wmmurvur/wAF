// Why a farm (#s-farm): one agent's home at three ages. While the section is on screen and nobody has picked an age,
// the card grows from Day 1 to Month 4, holds, and starts again; the figures count up and new rules arrive lit.
import { reduce, vis } from './state.js';

const home = document.getElementById('g-home');
if (home) {
  const AGES = JSON.parse(home.dataset.ages);
  const mem = document.getElementById('g-mem'), pass = document.getElementById('g-pass'), tools = document.getElementById('g-tools'), bar = document.getElementById('g-bar');
  const rules = [...home.querySelectorAll('#g-rules li')], btns = [...home.querySelectorAll('.ages button')];
  const fmt = n => Math.round(n).toLocaleString('en-US');
  let age = AGES.length - 1, picked = false, tick = 0, shown = { mem: AGES[age].mem, pass: AGES[age].pass, tools: AGES[age].tools };
  function count(to) {
    const from = { ...shown }, t0 = performance.now(), dur = reduce ? 0 : 900;
    (function step(now) {
      const p = dur ? Math.min(1, (now - t0) / dur) : 1, e = 1 - Math.pow(1 - p, 3);
      for (const k in to) shown[k] = from[k] + (to[k] - from[k]) * e;
      mem.textContent = fmt(shown.mem); pass.textContent = Math.round(shown.pass) + '%'; tools.textContent = Math.round(shown.tools);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  function grow(i) {
    const back = i < age; age = i;
    btns.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    const A = AGES[i];
    count({ mem: A.mem, pass: A.pass, tools: A.tools });
    bar.style.width = ((i + 1) / AGES.length * 100).toFixed(1) + '%';
    rules.forEach(li => {
      const at = li.classList.contains('none') ? 0 : +li.dataset.at, keep = li.classList.contains('none') ? i === 0 : at <= i;
      const was = !li.classList.contains('out');
      li.classList.toggle('out', !keep);
      li.classList.remove('in', 'new');
      if (keep && (!was || (at === i && !back && i > 0))) { void li.offsetWidth; li.classList.add('in'); if (at === i && i > 0) li.classList.add('new'); }
    });
    setTimeout(() => rules.forEach(li => li.classList.remove('new')), 2200);
  }
  btns.forEach((b, i) => b.addEventListener('click', () => { picked = true; grow(i); }));
  if (!reduce) {
    grow(0);
    setInterval(() => {
      if (picked || !vis['s-farm']) return;
      const hold = age === AGES.length - 1 ? 6 : 3;
      if (++tick >= hold) { tick = 0; grow((age + 1) % AGES.length); }
    }, 1000);
  }
}
