// A small moving emblem for each district (the Features page's district headers): line drawings in the district's
// colour (currentColor), 72 × 44, animated by styles/pages/features.css only while their district is on screen.
export const emblems = {
  relay: '<circle cx="10" cy="22" r="6"/><circle cx="36" cy="22" r="6"/><circle cx="62" cy="22" r="6"/><circle class="e-run" cx="10" cy="22" r="2.6" fill="currentColor" stroke="none"/>',
  projects: '<rect x="6" y="6" width="60" height="32" rx="1"/><path class="e-t1" d="M13 15l3 3 5-6"/><path class="e-t2" d="M13 25l3 3 5-6"/><line x1="27" y1="15" x2="58" y2="15"/><line x1="27" y1="26" x2="52" y2="26"/><line x1="27" y1="34" x2="46" y2="34" opacity=".4"/>',
  studio: '<rect x="2" y="8" width="68" height="28"/><g class="e-film"><rect x="6" y="13" width="14" height="18"/><rect x="24" y="13" width="14" height="18"/><rect x="42" y="13" width="14" height="18"/><rect x="60" y="13" width="14" height="18"/><rect x="78" y="13" width="14" height="18"/></g>',
  automation: '<circle cx="22" cy="22" r="16"/><line class="e-hand" x1="22" y1="22" x2="22" y2="10"/><circle cx="22" cy="22" r="1.6" fill="currentColor"/><path d="M44 22h10l-3-3m3 3l-3 3"/><rect class="e-blink" x="58" y="15" width="12" height="14"/>',
  team: '<circle cx="36" cy="9" r="5"/><circle cx="12" cy="35" r="5"/><circle cx="60" cy="35" r="5"/><path d="M33 13L15 31M39 13l18 18M17 35h38" opacity=".5"/><circle class="e-pulse" r="2.4" fill="currentColor" stroke="none"/>',
  memory: '<rect x="14" y="14" width="40" height="26"/><rect x="18" y="9" width="40" height="26" opacity=".6"/><rect class="e-page" x="22" y="4" width="40" height="26"/>',
  engines: '<circle cx="8" cy="8" r="3"/><circle cx="8" cy="22" r="3"/><circle cx="8" cy="36" r="3"/><path class="e-route" d="M11 8C36 8 36 22 62 22M11 22h51M11 36C36 36 36 22 62 22"/><circle cx="64" cy="22" r="5"/>',
  bridge: '<path d="M6 8h52v22H24l-10 8v-8H6z"/><circle class="e-d1" cx="22" cy="19" r="2.2" fill="currentColor"/><circle class="e-d2" cx="32" cy="19" r="2.2" fill="currentColor"/><circle class="e-d3" cx="42" cy="19" r="2.2" fill="currentColor"/>',
  measure: '<path d="M10 38a26 26 0 0 1 52 0"/><line class="e-needle" x1="36" y1="38" x2="36" y2="18"/><rect class="e-b1" x="6" y="30" width="5" height="8" fill="currentColor"/><rect class="e-b2" x="61" y="26" width="5" height="12" fill="currentColor"/>',
  privacy: '<path d="M36 4l22 8v11c0 10-9 16-22 19C23 39 14 33 14 23V12z"/><path class="e-check" d="M27 22l6 6 12-12"/>',
};
