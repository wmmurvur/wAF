// Site-wide links and the site's own version. One place to change where the call to action goes.
// The extension's source is closing (plan v0.7 §8), so nothing links to its repo: the CTA goes to the Marketplace listing
// (publisher muvusoft, name agent-farm in the extension's package.json). The changelog gets its own page with the /features pages.

export const site = {
  version: '0.7.0',                                        // this website, see CHANGELOG.md
  url: 'https://agentfarm.space',
  get: { label: 'Get Agent Farm', href: 'https://marketplace.visualstudio.com/items?itemName=muvusoft.agent-farm' },
  maker: { name: 'MuVuSOFT', href: 'https://muvusoft.uk/' },
};

/** the way back to the site's top folder from a page: '' on the landing, '../' on /features/, '../../' below it */
export const rootOf = url => '../'.repeat(url.pathname.split('/').filter(Boolean).length);
