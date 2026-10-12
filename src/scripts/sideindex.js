// Side index (desktop): lights the section or chapter that crosses the middle of the screen; appears after the first screen.
const nav = document.getElementById('snav');
const links = [...nav.querySelectorAll('a')];
const io = new IntersectionObserver(es => {
  for (const e of es) if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.dataset.for.split(' ').includes(e.target.id)));
}, { rootMargin: '-48% 0px -48% 0px' });
links.forEach(a => a.dataset.for.split(' ').forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); }));
const show = () => nav.classList.toggle('on', scrollY > innerHeight * 0.6);
addEventListener('scroll', show, { passive: true }); show();
