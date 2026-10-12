// "The last keeper": the short film the Studio demo produces, six scenes of five seconds, drawn on a canvas.
// Nothing is a video file: every frame is painted here, so the film is crisp at any size and weighs a few KB.
// In the app each shot would come from the model the step names (a video model for moving shots, an image model for
// stills); here they are drawn by hand and labelled as a demo. frame() paints one frame of one scene; still() a thumbnail.

export const DUR = 5;

/* Six scenes. cap: the subtitle; o.beam === false paints the storm's first, failed take (a dark lantern, no beam). */
export const SCENES = [
  { id: 's01', t: 'Night falls on the rock', cap: 'Every night for nineteen years, he climbed to the light.', draw: dusk },
  { id: 's02', t: 'The steps', cap: 'One hundred and fourteen steps. He never once counted them aloud.', draw: stairs },
  { id: 's03', t: 'Lighting the lamp', cap: 'The lamp was never the hard part. Staying awake was.', draw: lens },
  { id: 's04', t: 'The storm', cap: 'The worst storm was not the loud one.', draw: storm },
  { id: 's05', t: 'Dawn', cap: 'It was the quiet morning after, when no ship came.', draw: dawn },
  { id: 's06', t: 'The logbook', cap: 'He wrote it down anyway. Every night. Every ship.', draw: logbook },
];

/* ---------- helpers ---------- */
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = x => x * x * (3 - 2 * x);
function rnd(seed) { let s = seed >>> 0; return () => { s = (s + 0x6d2b79f5) >>> 0; let x = s; x = Math.imul(x ^ (x >>> 15), x | 1); x ^= x + Math.imul(x ^ (x >>> 7), x | 61); return ((x ^ (x >>> 14)) >>> 0) / 4294967296; }; }
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
function mix(a, b, k) { const p = hex(a), q = hex(b); return `rgb(${p.map((v, i) => Math.round(v + (q[i] - v) * k)).join(',')})`; }
function rgba(h, a) { return `rgba(${hex(h).join(',')},${a})`; }
function vgrad(c, y0, y1, stops) { const g = c.createLinearGradient(0, y0, 0, y1); stops.forEach(([o, col]) => g.addColorStop(o, col)); return g; }
function glow(c, x, y, r, col, a) {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(col, a)); g.addColorStop(0.35, rgba(col, a * 0.35)); g.addColorStop(1, rgba(col, 0));
  c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2);
}

function stars(c, w, hz, n, a, t, seed) {
  if (a <= 0) return;
  const R = rnd(seed);
  for (let i = 0; i < n; i++) {
    const x = R() * w, y = R() * R() * hz * 0.95, s = 0.6 + R() * 1.4;
    c.globalAlpha = a * (0.45 + 0.55 * Math.abs(Math.sin(t * (0.8 + R()) + i)));
    c.fillStyle = '#f4efe2'; c.fillRect(x, y, s * w / 960, s * w / 960);
  }
  c.globalAlpha = 1;
}

/* light on water: short strokes in a column under (x0) that widens towards the viewer */
function glints(c, w, h, hz, t, col, a, x0, spread, seed) {
  const R = rnd(seed);
  c.strokeStyle = col; c.lineWidth = Math.max(1, h / 300);
  for (let i = 0; i < 70; i++) {
    const d = R(), y = hz + 2 + d * d * (h - hz), x = x0 + (R() - 0.5) * spread * (0.25 + d) + Math.sin(t * 1.2 + i) * w * 0.008;
    const len = w * (0.008 + R() * 0.035) * (0.4 + d);
    c.globalAlpha = a * (0.35 + 0.65 * Math.abs(Math.sin(t * 1.8 + i * 1.7)));
    c.beginPath(); c.moveTo(x - len / 2, y); c.lineTo(x + len / 2, y); c.stroke();
  }
  c.globalAlpha = 1;
}

function rock(c, x, y, wd, ht, col, seed) {
  const R = rnd(seed);
  c.fillStyle = col; c.beginPath(); c.moveTo(x - wd / 2, y + ht * 0.6);
  for (let i = 0; i <= 10; i++) { const k = i / 10; c.lineTo(x - wd / 2 + wd * k, y - Math.sin(k * Math.PI) * ht * (0.55 + R() * 0.45)); }
  c.lineTo(x + wd / 2, y + ht * 0.6); c.closePath(); c.fill();
}

/* a lighthouse; returns the lamp's position */
function tower(c, x, base, H, lit, col) {
  const bw = H * 0.2, tw = H * 0.13, th = H * 0.7, top = base - th;
  c.fillStyle = col;
  c.beginPath(); c.moveTo(x - bw / 2, base); c.lineTo(x - tw / 2, top); c.lineTo(x + tw / 2, top); c.lineTo(x + bw / 2, base); c.closePath(); c.fill();
  c.fillStyle = 'rgba(255,255,255,.035)';
  for (const k of [0.3, 0.62]) { const y = base - th * k, half = (bw + (tw - bw) * k) / 2; c.fillRect(x - half, y - H * 0.045, half * 2, H * 0.09); }
  c.fillStyle = col; c.fillRect(x - tw * 0.72, top - H * 0.03, tw * 1.44, H * 0.03);
  const lw = tw * 0.72, lh = H * 0.11, ly = top - H * 0.03 - lh;
  c.fillStyle = lit ? '#ffd58a' : '#141c29'; c.fillRect(x - lw / 2, ly, lw, lh);
  c.fillStyle = col; for (const k of [-0.18, 0.18]) c.fillRect(x + k * lw - lw * 0.03, ly, lw * 0.06, lh);
  c.beginPath(); c.moveTo(x - lw * 0.62, ly); c.lineTo(x, ly - H * 0.09); c.lineTo(x + lw * 0.62, ly); c.closePath(); c.fill();
  return { x, y: ly + lh / 2, r: lw };
}

/* the beam turns around the tower: seen from the side it sweeps across and flares when it faces you */
function beam(c, L, len, phase, a, w, h) {
  const s = Math.sin(phase), face = Math.pow(Math.max(0, Math.cos(phase)), 10);
  const reach = len * Math.abs(s), dir = s >= 0 ? 1 : -1, spread = L.r * (0.7 + 2.4 * Math.abs(s));
  c.save(); c.globalCompositeOperation = 'lighter';
  if (reach > 2) {
    const g = c.createLinearGradient(L.x, 0, L.x + dir * reach, 0);
    g.addColorStop(0, `rgba(255,214,140,${0.5 * a})`); g.addColorStop(1, 'rgba(255,214,140,0)');
    c.fillStyle = g; c.beginPath(); c.moveTo(L.x, L.y - L.r * 0.18); c.lineTo(L.x + dir * reach, L.y - spread); c.lineTo(L.x + dir * reach, L.y + spread * 0.75); c.lineTo(L.x, L.y + L.r * 0.18); c.closePath(); c.fill();
  }
  glow(c, L.x, L.y, L.r * (2.2 + 7 * face), '#ffd58a', a * (0.55 + 0.45 * face));
  if (face > 0.02) { c.fillStyle = `rgba(255,226,170,${0.12 * face * a})`; c.fillRect(0, 0, w, h); }
  c.restore();
}

/* ---------- the six scenes ---------- */
function dusk(c, w, h, t) {
  const hz = h * 0.66, k = clamp(t / DUR);
  c.fillStyle = vgrad(c, 0, hz, [[0, mix('#16294a', '#070d1c', k)], [0.6, mix('#43537a', '#17233e', k)], [1, mix('#e8915a', '#7a5058', k)]]);
  c.fillRect(0, 0, w, hz + 1);
  glow(c, w * 0.3, hz, w * 0.4, '#f0a060', 0.35 * (1 - k * 0.7));
  stars(c, w, hz, 80, k * 0.9, t, 11);
  c.fillStyle = vgrad(c, hz, h, [[0, mix('#5a4a58', '#20253a', k)], [1, '#05080f']]); c.fillRect(0, hz, w, h - hz);
  glints(c, w, h, hz, t, mix('#f6b07a', '#c7a27e', k), 0.6 - k * 0.3, w * 0.3, w * 0.3, 12);
  rock(c, w * 0.76, hz + h * 0.015, w * 0.36, h * 0.07, '#04060b', 13);
  const lit = t > 1.4, L = tower(c, w * 0.76, hz - h * 0.02, h * 0.46, lit, '#060910');
  if (lit) beam(c, L, w * 0.85, (t - 1.4) * 0.95 + 0.5, ease(clamp((t - 1.4) / 0.9)), w, h);
  title(c, w, h, t);
}

function stairs(c, w, h, t) {
  c.fillStyle = '#06070b'; c.fillRect(0, 0, w, h);
  const cx = w * 0.5, cy = h * 0.42, R = Math.hypot(w, h) * 0.7, rot = t * 0.13, N = 54;
  glow(c, cx, cy, h * 0.5, '#f4c06a', 0.5);
  for (let i = N; i >= 0; i--) {
    const r1 = R * Math.pow(0.925, i), r2 = r1 * 0.8, a = i * 0.5 + rot, da = 0.44, br = Math.pow(i / N, 0.7);
    c.beginPath(); c.arc(cx, cy, r1, a, a + da); c.arc(cx, cy, r2, a + da, a, true); c.closePath();
    c.fillStyle = mix('#140f0b', '#e6b064', 0.08 + br * 0.8); c.fill();
    c.strokeStyle = 'rgba(0,0,0,.55)'; c.lineWidth = Math.max(1, r1 * 0.012); c.stroke();
  }
  c.strokeStyle = 'rgba(30,22,14,.9)'; c.lineWidth = h * 0.006; c.beginPath();
  for (let i = 0; i <= 260; i++) { const k = i / 260 * N, r = R * Math.pow(0.925, k) * 0.79, a = k * 0.5 + rot; c[i ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
  c.stroke();
  glow(c, cx, cy, h * 0.12, '#fff1cf', 0.8);
}

function lens(c, w, h, t) {
  c.fillStyle = '#05060a'; c.fillRect(0, 0, w, h);
  const cx = w * 0.5, cy = h * 0.47, k = ease(clamp(t / 3.4)), n = 13;
  c.save(); c.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 28; i++) {
    const a = i / 28 * Math.PI * 2 + t * 0.05; c.strokeStyle = `rgba(255,205,130,${0.05 * k})`; c.lineWidth = h * 0.004;
    c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(a) * w, cy + Math.sin(a) * w); c.stroke();
  }
  c.restore();
  for (let i = n; i >= 1; i--) {
    const r = i * h * 0.036; c.lineWidth = h * 0.02;
    c.strokeStyle = mix('#1d2028', '#e9b868', k * (1 - i / (n + 3)) * 0.95); c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.stroke();
    const a = t * 0.35 + i * 0.45; c.strokeStyle = `rgba(255,240,205,${0.15 + 0.5 * k * (1 - i / n)})`; c.lineWidth = h * 0.006;
    c.beginPath(); c.arc(cx, cy, r + h * 0.005, a, a + 0.7); c.stroke();
  }
  c.strokeStyle = '#2b2418'; c.lineWidth = h * 0.012;
  const s = n * h * 0.036 + h * 0.03; c.strokeRect(cx - s, cy - s, s * 2, s * 2);
  for (const d of [-1, 1]) { c.beginPath(); c.moveTo(cx + d * s, cy - s); c.lineTo(cx + d * s * 1.5, cy - s * 1.6); c.stroke(); }
  glow(c, cx, cy, h * (0.06 + 0.32 * k), '#ffc970', 0.35 + 0.55 * k);
  glow(c, cx, cy, h * 0.05, '#fff6e2', 0.25 + 0.75 * k);
}

function storm(c, w, h, t, o) {
  const hz = h * 0.56, beamOn = o.beam !== false, R = rnd(41);
  const fl = t > 2.1 && t < 3.1 ? Math.exp(-(t - 2.1) * 7) : 0;
  c.fillStyle = vgrad(c, 0, hz, [[0, mix('#03050a', '#56637a', fl)], [1, mix('#0f1a29', '#7e8ca3', fl)]]); c.fillRect(0, 0, w, hz + 1);
  for (let i = 0; i < 9; i++) { const x = ((R() * 1.4 - 0.2) * w + t * w * 0.02 * (1 + R())) , y = R() * hz * 0.7; glow(c, x, y, w * (0.12 + R() * 0.15), '#26324a', 0.55); }
  rock(c, w * 0.3, hz + h * 0.01, w * 0.24, h * 0.06, '#020307', 42);
  const L = tower(c, w * 0.3, hz - h * 0.015, h * 0.38, beamOn, '#03050a');
  if (beamOn) beam(c, L, w * 0.95, t * 1.25 + 1.2, 1, w, h);
  for (let l = 0; l < 4; l++) {
    const y0 = hz + h * 0.02 + l * h * 0.1, A = h * (0.022 + l * 0.02), f = 5.5 * (1 + l * 0.35), sp = 1.1 + l * 0.45;
    c.beginPath(); c.moveTo(0, h);
    const pts = [];
    for (let x = 0; x <= w + 8; x += w / 64) { const y = y0 + A * Math.sin(x / w * f + t * sp + l * 1.7) + A * 0.45 * Math.sin(x / w * f * 2.3 - t * sp * 1.3); pts.push([x, y]); c.lineTo(x, y); }
    c.lineTo(w, h); c.closePath(); c.fillStyle = mix('#0a1420', '#1e3a57', l / 3 * 0.8 + fl * 0.2); c.fill();
    c.strokeStyle = `rgba(206,222,236,${0.12 + l * 0.08})`; c.lineWidth = h * (0.002 + l * 0.0015); c.beginPath(); pts.forEach(([x, y], i) => c[i ? 'lineTo' : 'moveTo'](x, y)); c.stroke();
  }
  c.strokeStyle = 'rgba(170,190,212,.28)'; c.lineWidth = Math.max(1, h / 420);
  c.beginPath();
  for (let i = 0; i < 170; i++) {
    const v = 0.8 + R() * 0.5, x = ((R() * 1.3 * w + t * w * 0.5 * v) % (w * 1.3)) - w * 0.15, y = (R() * h + t * h * 1.9 * v) % h;
    c.moveTo(x, y); c.lineTo(x - w * 0.012, y + h * 0.05);
  }
  c.stroke();
  if (fl) { c.fillStyle = `rgba(220,230,255,${fl * 0.35})`; c.fillRect(0, 0, w, h); }
}

function dawn(c, w, h, t) {
  const hz = h * 0.62, sy = hz - h * 0.015 - t * h * 0.014, sx = w * 0.62;
  c.fillStyle = vgrad(c, 0, hz, [[0, '#4a6b98'], [0.55, '#a7b7cd'], [1, '#f2c08e']]); c.fillRect(0, 0, w, hz + 1);
  glow(c, sx, sy, w * 0.45, '#ffd2a0', 0.55);
  c.fillStyle = '#fff0d2'; c.beginPath(); c.arc(sx, sy, h * 0.048, 0, Math.PI * 2); c.fill();
  c.fillStyle = vgrad(c, hz, h, [[0, '#d0aa8e'], [1, '#33475f']]); c.fillRect(0, hz, w, h - hz);
  glints(c, w, h, hz, t, '#fff1d6', 0.75, sx, w * 0.22, 51);
  rock(c, w * 0.16, hz + h * 0.008, w * 0.15, h * 0.035, '#3a3f4f', 52);
  tower(c, w * 0.16, hz - h * 0.008, h * 0.22, false, '#3b4153');
  c.strokeStyle = '#2b3040'; c.lineWidth = Math.max(1.2, h / 280); c.lineCap = 'round';
  [[0.2, 0.22, 0], [0.3, 0.3, 1.3], [0.44, 0.18, 2.1]].forEach(([x0, y0, ph]) => {
    const x = (x0 + t * 0.035) * w, y = y0 * h + Math.sin(t * 1.4 + ph) * h * 0.01, s = h * 0.022, f = Math.sin(t * 7 + ph) * 0.5;
    c.beginPath(); c.moveTo(x - s, y - s * (0.3 + f)); c.quadraticCurveTo(x - s * 0.4, y - s * 0.6, x, y); c.quadraticCurveTo(x + s * 0.4, y - s * 0.6, x + s, y - s * (0.3 + f)); c.stroke();
  });
}

const LOG = ['Wind north-west, force 8. Lamp lit 18:52.', 'Rain from the west until three.', 'Fog at four. Horn sounded forty minutes.', 'No ships sighted.', 'Barometer rising.', 'Lamp out 07:31.'];
function logbook(c, w, h, t) {
  c.fillStyle = vgrad(c, 0, h, [[0, '#24170e'], [1, '#0d0805']]); c.fillRect(0, 0, w, h);
  c.save(); c.translate(w * 0.5, h * 0.52); c.rotate(-0.035);
  const pw = w * 0.74, ph = h * 0.98, x0 = -pw / 2, y0 = -ph / 2;
  c.fillStyle = vgrad(c, y0, y0 + ph, [[0, '#efe3c8'], [1, '#d9c8a4']]); c.fillRect(x0, y0, pw, ph);
  c.strokeStyle = 'rgba(150,130,100,.55)'; c.lineWidth = Math.max(1, h / 540);
  const gap = h * 0.075, top = y0 + h * 0.2;
  for (let y = top; y < y0 + ph; y += gap) { c.beginPath(); c.moveTo(x0, y); c.lineTo(x0 + pw, y); c.stroke(); }
  c.strokeStyle = 'rgba(190,90,80,.5)'; c.beginPath(); c.moveTo(x0 + pw * 0.12, y0); c.lineTo(x0 + pw * 0.12, y0 + ph); c.stroke();
  c.fillStyle = '#2b2a38'; c.font = `italic ${h * 0.052}px Georgia, "Times New Roman", serif`;
  c.fillText('14 Oct · 21:40', x0 + pw * 0.15, top - gap * 0.35);
  /* the night's entries, written line by line: each line is revealed left to right, the pen at its end */
  c.fillStyle = '#26324f'; c.font = `italic ${h * 0.043}px Georgia, "Times New Roman", serif`;
  let pen = null;
  LOG.forEach((line, j) => {
    const p = clamp((t - 0.25 - j * 0.68) / 0.66); if (p <= 0) return;
    const x = x0 + pw * 0.15, y = top + gap * (j + 1) - gap * 0.2, full = c.measureText(line).width;
    c.save(); c.beginPath(); c.rect(x - 4, y - gap, full * p + 4, gap * 1.2); c.clip(); c.fillText(line, x, y); c.restore();
    if (p < 1) pen = [x + full * p, y];
  });
  if (pen) {
    c.strokeStyle = '#1a1a1f'; c.lineWidth = h * 0.007; c.lineCap = 'round';
    c.beginPath(); c.moveTo(pen[0] + h * 0.004, pen[1] - h * 0.012); c.lineTo(pen[0] + h * 0.13, pen[1] - h * 0.17); c.stroke();
  }
  c.restore();
  glow(c, w * 0.2, h * 0.1, w * 0.6, '#ffb860', 0.28);
}

/* the film's title over the first seconds */
function title(c, w, h, t) {
  const a = clamp(t / 0.6) * clamp((3.2 - t) / 0.6); if (a <= 0) return;
  c.globalAlpha = a; c.fillStyle = '#f3ead6'; c.font = `600 ${h * 0.034}px "Geist Variable", system-ui, sans-serif`;
  if ('letterSpacing' in c) c.letterSpacing = `${h * 0.012}px`;
  c.fillText('THE LAST KEEPER', w * 0.06, h * 0.12);
  if ('letterSpacing' in c) c.letterSpacing = '0px';
  c.globalAlpha = 1;
}

/* ---------- finishing: grain, vignette, subtitle ---------- */
let noise;
function grain(c, w, h) {
  if (!noise) {
    noise = document.createElement('canvas'); noise.width = noise.height = 160;
    const n = noise.getContext('2d'), d = n.createImageData(160, 160);
    for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
    n.putImageData(d, 0, 0);
  }
  c.save(); c.globalAlpha = 0.055; c.globalCompositeOperation = 'overlay';
  c.translate(-Math.random() * 160, -Math.random() * 160);
  c.fillStyle = c.createPattern(noise, 'repeat'); c.fillRect(0, 0, w + 160, h + 160); c.restore();
}
function vignette(c, w, h) {
  const g = c.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.75);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)'); c.fillStyle = g; c.fillRect(0, 0, w, h);
}
function subtitle(c, w, h, text, t) {
  const a = clamp((t - 0.25) / 0.4) * clamp((DUR - 0.15 - t) / 0.4); if (a <= 0) return;
  c.globalAlpha = a; c.textAlign = 'center'; c.font = `500 ${Math.round(h * 0.046)}px "Geist Variable", system-ui, sans-serif`;
  c.lineWidth = h * 0.012; c.strokeStyle = 'rgba(0,0,0,.6)'; c.lineJoin = 'round';
  c.strokeText(text, w / 2, h * 0.9); c.fillStyle = '#fbf7ec'; c.fillText(text, w / 2, h * 0.9);
  c.textAlign = 'start'; c.globalAlpha = 1;
}

/** one frame of scene i at t seconds (0 to DUR). o.cap: draw the subtitle (default true); o.beam: see SCENES. */
export function frame(c, w, h, i, t, o = {}) {
  const s = SCENES[i], z = 1 + 0.045 * (t / DUR);
  c.save(); c.translate(w / 2, h / 2); c.scale(z, z); c.translate(-w / 2, -h / 2);
  s.draw(c, w, h, t, o);
  c.restore();
  if (o.grain !== false) grain(c, w, h);
  vignette(c, w, h);
  if (o.cap !== false) subtitle(c, w, h, s.cap, t);
}

/** a thumbnail of scene i on its own canvas (no subtitle, no grain) */
export function still(i, wd, o = {}) {
  const cv = document.createElement('canvas'), dpr = Math.min(2, devicePixelRatio || 1);
  cv.width = Math.round(wd * dpr); cv.height = Math.round(wd * 9 / 16 * dpr);
  frame(cv.getContext('2d'), cv.width, cv.height, i, o.t ?? 2.6, { ...o, cap: false, grain: false });
  return cv;
}
