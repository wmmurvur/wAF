// Local: the line carrying your work reaches out and is cut once, when the diagram first comes into view; the licence
// check's packet goes out and back only while the diagram is on screen (vis).
const m = document.getElementById('l-mach');
const io = new IntersectionObserver(es => {
  const e = es[0];
  m.classList.toggle('vis', e.isIntersecting);
  if (e.isIntersecting && e.intersectionRatio >= 0.45) m.classList.add('on');
}, { threshold: [0, 0.45] });
io.observe(m);
