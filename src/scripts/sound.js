// The extension's own tones (media/sounds in the extension), served from assets/sounds. The path is relative to the
// site's top folder, found from the page's own stylesheet link, so it works from disk and from a page in a subfolder.
// Nothing plays until a person clicks: a play button, or the sound switch in Never waits.
const FILE = {
  crystal: 'af_crystal_turn', knock: 'af_intercom_knock', sonar: 'af_deep_sonar', marimba: 'af_marimba_success',
  bell: 'af_bell_urgent', zen: 'af_zen_chime', pulse: 'af_pulse_start', pop: 'af_pop_advance', ticks: 'af_subtle_alert', lullaby: 'af_lullaby_sleep',
};
const cache = {};
const css = document.querySelector('link[rel="stylesheet"][href*="assets/site.css"]');
const ROOT = css ? css.getAttribute('href').replace(/assets\/site\.css.*$/, '') : '';

export function play(tone) {
  if (!FILE[tone]) return Promise.resolve();
  const a = cache[tone] || (cache[tone] = new Audio(`${ROOT}assets/sounds/${FILE[tone]}.wav`));
  a.volume = 0.5; a.currentTime = 0;
  return a.play().catch(() => {});
}

/* the page-wide switch, off on every visit */
let on = false;
const subs = [];
export const sound = {
  get on() { return on; },
  set(v) { on = !!v; subs.forEach(f => f(on)); },
  watch(f) { subs.push(f); },
};
