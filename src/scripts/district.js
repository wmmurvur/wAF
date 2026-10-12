// A district page's figures (components/District.astro): each feature with `fig` has a figure beside its steps.
// A figure is drawn once by its district's figure module (scripts/figs/<district>.js) and shows one step at a time:
// elements marked data-from="i" (and data-to="j") are shown from step i (to step j), and the module's own step(i)
// moves whatever else must move. The first time a figure is seen it plays its steps by itself, one every few
// seconds, while it is on screen; a click on a step, or on the arrows under the figure, takes over. With reduced
// motion it opens on its last step. On a phone the figure stays in the flow above the steps and the arrows step it.
import './bands.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function figures(FIGS) {
  for (const ft of document.querySelectorAll('.ft.hasfig')) {
    const make = FIGS[ft.dataset.f], fig = ft.querySelector('.fig');
    if (!make || !fig) continue;
    const fv = fig.querySelector('.fv'), steps = [...ft.querySelectorAll('.steps li')];
    const fk = fig.querySelector('.fk'), fn = fig.querySelector('.fn'), fp = fig.querySelector('.fp'), fx = fig.querySelector('.fx');
    fv.dataset.fig = ft.dataset.f;
    const F = make(fv) || {};
    let cur = -1, played = false, user = false, seen = false;
    const show = i => {
      cur = i; fv.dataset.s = i;
      steps.forEach((li, k) => { li.classList.toggle('on', k === i); li.classList.toggle('past', k < i); });
      for (const el of fv.querySelectorAll('[data-from]')) {
        const a = +el.dataset.from, b = el.dataset.to === undefined ? 99 : +el.dataset.to;
        el.classList.toggle('in', i >= a && i <= b);
      }
      fk.textContent = steps[i].querySelector('.k').textContent; fn.textContent = `${i + 1} / ${steps.length}`;
      fp.disabled = i === 0; fx.disabled = i === steps.length - 1;
      F.step && F.step(i);
    };
    steps.forEach((li, i) => li.querySelector('button').addEventListener('click', () => { user = true; show(i); }));
    fp.addEventListener('click', () => { user = true; if (cur > 0) show(cur - 1); });
    fx.addEventListener('click', () => { user = true; if (cur < steps.length - 1) show(cur + 1); });
    show(reduce ? steps.length - 1 : 0);
    new IntersectionObserver(es => {
      seen = es[0].isIntersecting; fv.classList.toggle('vis', seen);
      if (seen && !played && !reduce) { played = true; play(); }
    }, { threshold: 0.5 }).observe(fv);
    async function play() {
      for (let i = 1; i < steps.length; i++) {
        let t = 0;
        while (t < 3600) { await new Promise(r => setTimeout(r, 200)); if (user) return; if (seen && !document.hidden) t += 200; }
        show(i);
      }
    }
  }
}
