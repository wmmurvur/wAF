// Site-wide links and the site's own version. One place to change where the call to action goes.
// The extension's source is closing (plan v0.7 §8), so nothing links to its repo: the CTA goes to the Marketplace listing
// (publisher muvusoft, name agent-farm in the extension's package.json). The changelog gets its own page with the /features pages.

export const site = {
  version: '0.13.2',                                        // this website, see CHANGELOG.md
  // Agent Farm's version, as the demos show it running, and whether it is in beta (owner, 2026-10-13). Change them
  // here and every page follows: the top chip, the demo screens and figures, the tiles and the footer. While `beta`
  // is true every version the site prints carries "-beta" (vtag below).
  app: '3.931.0',
  beta: true,
  url: 'https://agentfarm.space',
  get: { label: 'Get Agent Farm', href: 'https://marketplace.visualstudio.com/items?itemName=muvusoft.agent-farm' },
  maker: { name: 'MuVuSOFT', href: 'https://muvusoft.uk/' },
  // Who sells Agent Farm and how to reach them, for the terms, privacy and refund pages and the footer (owner,
  // 2026-10-12). The owner trades as an individual under the MuVuSOFT name. An empty field shows as a marked gap on those pages; while `draft` is true they
  // carry a draft notice and ask search engines not to index them.
  legal: { name: 'Murat Vural', country: 'Vietnam', email: 'agentfarm@muvusoft.uk', draft: true, updated: '2026-10-12' },
};

/** the way back to the site's top folder from a page: '' on the landing, '../' on /features/, '../../' below it */
export const rootOf = url => '../'.repeat(url.pathname.split('/').filter(Boolean).length);

// appVer(0) is the running version, appVer(1) the build the agent installs next, appVer(-1) the one before.
export const appVer = (step = 0) => { const [a, b] = site.app.split('.').map(Number); return `${a}.${b + step}.0`; };
// A version as the site prints it: "3.931.0-beta" while in beta.
export const vtag = v => site.beta ? `${v}-beta` : v;
