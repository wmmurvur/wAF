// Chapter openers: a tile clicked reads out its sentence under the row and tells the page ('feature'), so a demo in the
// chapter that can show that tile switches to it. "See it" goes to the part of the page marked data-shows="<tile ids>"
// (on a phone the panel and the picture stack, so the section top is not always the right place), else to the section.
// A demo says what it is showing ('showing') and the tile is marked.
import { emit, on } from './state.js';
import { features } from '../data/features.js';

const F = Object.fromEntries(features.map(f => [f.id, f]));
const chaps = [...document.querySelectorAll('.chap')];

for (const ch of chaps) {
  const tiles = [...ch.querySelectorAll('.ctile')];
  const code = ch.querySelector('.cc'), tx = ch.querySelector('.cx'), go = ch.querySelector('.cgo');
  ch.addEventListener('click', e => {
    const t = e.target.closest('.ctile'); if (!t) return;
    const f = F[t.dataset.f];
    tiles.forEach(x => x.classList.toggle('on', x === t));
    code.textContent = t.dataset.code;
    tx.textContent = f.s;
    const at = document.querySelector(`[data-shows~="${f.id}"][id]`) || (f.at && document.getElementById(f.at));
    go.hidden = !at; if (at) go.href = '#' + at.id;
    emit('feature', f.id);
  });
}

/* a demo moved on by itself: mark the tile it is showing now */
on('showing', id => {
  const ch = chaps.find(c => c.querySelector(`.ctile[data-f="${id}"]`)); if (!ch) return;
  for (const t of ch.querySelectorAll('.ctile')) t.classList.toggle('cur', t.dataset.f === id);
});
