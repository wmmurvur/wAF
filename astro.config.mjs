// @ts-check
import { defineConfig } from 'astro/config';

// Static site for agentfarm.space. No server, no adapter: `npm run build` writes plain files to dist/
// (astro build, then scripts/finish.mjs). The result opens from disk and uploads to any host as it is.
export default defineConfig({
  site: 'https://agentfarm.space',
  compressHTML: false,               // keep index.html readable
  build: {
    assets: 'assets',                // one folder for styles, scripts, fonts and sounds
    inlineStylesheets: 'never',      // styles stay in assets/site.css
  },
  vite: { build: { cssCodeSplit: false } },   // every page shares the one assets/site.css
});
