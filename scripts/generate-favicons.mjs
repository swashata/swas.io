import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(projectRoot, 'src/assets/icons/favicon.svg');
const outputDirectory = resolve(projectRoot, 'public/favicon');

const pngFavicons = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['favicon-96x96.png', 96],
  ['apple-icon-57x57.png', 57],
  ['apple-icon-60x60.png', 60],
  ['apple-icon-72x72.png', 72],
  ['apple-icon-76x76.png', 76],
  ['apple-icon-114x114.png', 114],
  ['apple-icon-120x120.png', 120],
  ['apple-icon-144x144.png', 144],
  ['apple-icon-152x152.png', 152],
  ['apple-icon-180x180.png', 180],
  ['android-icon-192x192.png', 192],
];

const svg = await readFile(source);

await mkdir(outputDirectory, { recursive: true });
await copyFile(source, resolve(outputDirectory, 'favicon.svg'));

await Promise.all(
  pngFavicons.map(async ([filename, size]) => {
    const png = new Resvg(svg, {
      fitTo: { mode: 'width', value: size },
    })
      .render()
      .asPng();

    await writeFile(resolve(outputDirectory, filename), png);
  }),
);

console.log(`Generated ${pngFavicons.length + 1} favicons from ${source}`);
