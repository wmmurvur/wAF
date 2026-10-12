// Header: the version chip follows the running version of the demo (it changes when the agent updates Agent Farm).
import { on } from './state.js';

const chip = document.getElementById('af-ver');
on('reloading', () => { if (chip) chip.textContent = 'reloading…'; });
on('ver', v => { if (chip) chip.textContent = v; });
