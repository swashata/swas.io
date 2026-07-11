import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const paths = {
  projectRoot,
  writing: path.join(projectRoot, 'src/content/writing'),
  pages: path.join(projectRoot, 'src/content/pages'),
  contentImages: {
    writing: path.join(projectRoot, 'src/content/writing/images'),
    pages: path.join(projectRoot, 'src/content/pages/images'),
  },
  taxonomyImages: path.join(projectRoot, 'public/featured-images'),
  taxonomies: path.join(projectRoot, 'TAXONOMIES.ts'),
  template: path.join(
    projectRoot,
    'src/assets/featured-image/featured-image-template.png',
  ),
  font: path.join(
    projectRoot,
    'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff',
  ),
};

export const image = {
  width: 1200,
  height: 630,
  titleLeft: 70,
  titleWidth: 450,
  fontSize: 45,
  lineHeight: 54,
  maxLines: 4,
  maxTitleLength: 60,
};
