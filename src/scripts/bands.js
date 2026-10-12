// Human bands: a photo fades in the first time it is seen and drifts (a slow zoom) only while it is on screen.
const io = new IntersectionObserver(es => es.forEach(e => {
  e.target.classList.toggle('vis', e.isIntersecting);
  if (e.isIntersecting) e.target.classList.add('seen');
}), { threshold: 0.15 });
document.querySelectorAll('[data-band]').forEach(b => io.observe(b));
