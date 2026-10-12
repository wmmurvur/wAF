// Second half of `npm run build`: turns Astro's dist/ into a plain site that runs when a page is opened
// from disk and uploads to any host (Hostinger included) as it is.
//   dist/index.html          the landing; other pages in their own folders (features/index.html), readable, every path relative
//   dist/assets/site.css     all styles, shared by every page
//   dist/assets/site.js      the landing's scripts, one plain (non-module) script; module scripts do not run from disk
//   dist/assets/<page>.js    another page's scripts, bundled from src/scripts/pages/<page>.js
//   dist/assets/fonts/       the three font families
//   dist/assets/sounds/      the extension's tones
//   dist/assets/photos/      the photographs (data/photos.js)
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { site } from '../src/data/site.js';

const DIST = 'dist', A = path.join(DIST, 'assets'), FONTS = path.join(A, 'fonts'), V = `?v=${site.version}`;
const clean = f => f.replace(/\.[\w-]{8}(\.\w+)$/, '$1');   // geist-latin-wght-normal.BgDaEnEv.woff2 → geist-latin-wght-normal.woff2

/* 1. scripts: one plain script per page, the landing's from src/scripts/main.js, the others' from src/scripts/pages/ */
const ENTRIES = { site: 'src/scripts/main.js' };
for (const f of fs.readdirSync('src/scripts/pages').filter(f => f.endsWith('.js'))) ENTRIES[f.slice(0, -3)] = `src/scripts/pages/${f}`;
for (const [name, entry] of Object.entries(ENTRIES))
  await build({ entryPoints: [entry], bundle: true, format: 'iife', minify: true, target: 'es2020', legalComments: 'none', outfile: path.join(A, `${name}.js`) });

/* 2. fonts: out of their hashed names, into assets/fonts */
fs.mkdirSync(FONTS, { recursive: true });
const fontMap = {};
for (const f of fs.readdirSync(A).filter(f => f.endsWith('.woff2'))) {
  fontMap[f] = clean(f);
  fs.renameSync(path.join(A, f), path.join(FONTS, clean(f)));
}

/* 3. styles: the one stylesheet Astro wrote becomes assets/site.css, with font paths relative to it */
const sheets = fs.readdirSync(A).filter(f => f.endsWith('.css') && f !== 'site.css');
if (sheets.length !== 1) throw new Error(`expected one stylesheet in ${A}, found ${sheets.length}: ${sheets.join(', ')}`);
let css = fs.readFileSync(path.join(A, sheets[0]), 'utf8');
css = css.replace(/url\(\/assets\/([^)]+)\)/g, (m, f) => `url(fonts/${fontMap[f] || clean(f)})`);
fs.writeFileSync(path.join(A, 'site.css'), css);
fs.rmSync(path.join(A, sheets[0]));

/* 4. every page: point at site.css from its own folder; nothing may still reach for a module script, a root-absolute path
      or a script that was not built */
const pages = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? pages(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []);
for (const htmlPath of pages(DIST)) {
  const root = '../'.repeat(path.relative(DIST, path.dirname(htmlPath)).split(path.sep).filter(Boolean).length);
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html.replace(/<link rel="stylesheet" href="\/assets\/[^"]+\.css">/, `<link rel="stylesheet" href="${root}assets/site.css${V}">`);
  const left = html.match(/type="module"|(?:src|href)="\/(?!\/)[^"]*"/g);
  if (left) throw new Error(`${htmlPath} still has module scripts or root-absolute paths: ${left.join(', ')}`);
  for (const [, js] of html.matchAll(/src="(?:\.\.\/)*assets\/([\w-]+)\.js/g))
    if (!ENTRIES[js]) throw new Error(`${htmlPath} asks for assets/${js}.js, and there is no src/scripts/pages/${js}.js`);
  fs.writeFileSync(htmlPath, html);
}

/* 5. nothing else may be left in assets/ */
const extra = fs.readdirSync(A).filter(f => !['site.css', 'fonts', 'sounds', 'photos', ...Object.keys(ENTRIES).map(n => `${n}.js`)].includes(f));
if (extra.length) throw new Error(`unexpected files in ${A}: ${extra.join(', ')}`);

const size = d => fs.readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? size(path.join(d, e.name)) : fs.statSync(path.join(d, e.name)).size), 0);
console.log(`finish: dist/ is a plain site, ${pages(DIST).length} page(s), ${(size(DIST) / 1024).toFixed(0)} KB (site ${site.version})`);
