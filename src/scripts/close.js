// Start: the closing band shows the live leg of the relay chain on this page.
import { S, on } from './state.js';

const leg = document.getElementById('x-leg');
const show = () => { leg.textContent = '⑂ ' + S.leg; };
show(); on('pass', show);
