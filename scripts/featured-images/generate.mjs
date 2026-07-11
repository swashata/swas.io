import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import ts from 'typescript';
import { paths } from './config.mjs';
import { readFrontmatter, setImageFrontmatter } from './frontmatter.mjs';
import { renderFeaturedImage } from './render.mjs';
import { getImageTitle } from './titles.mjs';

function relativeToProject(filepath) {
  return path.relative(paths.projectRoot, filepath);
}

function collectionForFile(filepath) {
  const relativeToPages = path.relative(paths.pages, filepath);
  return !relativeToPages.startsWith('..') && !path.isAbsolute(relativeToPages)
    ? 'pages'
    : 'writing';
}

function outputForContent(filepath) {
  const slug = path.basename(filepath, path.extname(filepath));
  const collection = collectionForFile(filepath);
  return {
    absolute: path.join(paths.contentImages[collection], `${slug}-featured.png`),
    frontmatter: `./images/${slug}-featured.png`,
  };
}

export async function findWritingFiles(directory = paths.writing) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const filepath = path.join(directory, entry.name);
      if (entry.isDirectory()) return findWritingFiles(filepath);
      return entry.isFile() && entry.name.endsWith('.mdx') ? [filepath] : [];
    }),
  );

  return files.flat().sort();
}

export async function findContentFiles() {
  const [writing, pages] = await Promise.all([
    findWritingFiles(paths.writing),
    findWritingFiles(paths.pages),
  ]);
  return [...writing, ...pages].sort();
}

export function resolvePostPath(argument) {
  if (!argument) {
    throw new Error(
      'Provide an MDX path inside src/content/writing or src/content/pages',
    );
  }

  const filepath = path.resolve(process.cwd(), argument);
  const inCollection = [paths.writing, paths.pages].some((directory) => {
    const relative = path.relative(directory, filepath);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
  });

  if (!inCollection || path.extname(filepath) !== '.mdx') {
    throw new Error(
      'The content must be an .mdx file inside src/content/writing or src/content/pages',
    );
  }

  return filepath;
}

export async function generateForPost(filepath, { force = false } = {}) {
  const source = await readFile(filepath, 'utf8');
  const frontmatter = readFrontmatter(source, relativeToProject(filepath));

  if (frontmatter.data.draft === true) {
    return { status: 'draft', filepath };
  }

  if (!force && frontmatter.data.image) {
    return { status: 'skipped', filepath };
  }

  const title = getImageTitle(frontmatter.data);
  const output = outputForContent(filepath);
  const png = await renderFeaturedImage(title);
  const updated = setImageFrontmatter(source, frontmatter, output.frontmatter);

  await mkdir(path.dirname(output.absolute), { recursive: true });
  await writeFile(output.absolute, png);
  await writeFile(filepath, updated, 'utf8');

  return { status: 'generated', filepath, output: output.absolute, title };
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function loadTaxonomies() {
  const source = await readFile(paths.taxonomies, 'utf8');
  const javascript = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`;
  return import(moduleUrl);
}

export async function generateTaxonomyImages() {
  const { CATEGORIES, TAGS } = await loadTaxonomies();
  const taxonomies = [
    ...CATEGORIES.map(({ label }) => ({ type: 'categories', label })),
    ...TAGS.map((label) => ({ type: 'topics', label })),
  ];
  const results = [];

  for (const taxonomy of taxonomies) {
    const output = path.join(
      paths.taxonomyImages,
      taxonomy.type,
      `${slugify(taxonomy.label)}.png`,
    );

    try {
      await access(output);
      results.push({ status: 'skipped', output, taxonomy });
      continue;
    } catch {}

    const png = await renderFeaturedImage({
      value: taxonomy.label,
      original: taxonomy.label,
      explicit: false,
      trimmed: false,
    });
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, png);
    results.push({ status: 'generated', output, taxonomy });
  }

  return results;
}

export function printTaxonomyResult(result, spinner) {
  const output = relativeToProject(result.output);
  if (result.status === 'skipped') {
    spinner.stopAndPersist({
      symbol: chalk.dim('↷'),
      text: chalk.dim(`${output} already exists`),
    });
  } else {
    spinner.succeed(chalk.green(output));
  }
}

export function printResult(result, spinner) {
  const post = relativeToProject(result.filepath);

  if (result.status === 'draft') {
    const message = chalk.yellow(`${post} is a draft; image generation skipped`);
    if (spinner) spinner.warn(message);
    else console.warn(`Warning: ${message}`);
    return;
  }

  if (result.status === 'skipped') {
    const message = chalk.dim(`${post} already has an image`);
    if (spinner) spinner.stopAndPersist({ symbol: chalk.dim('↷'), text: message });
    else console.log(`Skipped: ${message}`);
    return;
  }

  const message = chalk.green(relativeToProject(result.output));
  if (spinner) spinner.succeed(message);
  else console.log(`Generated: ${message}`);

  if (result.title.trimmed) {
    console.warn(
      chalk.yellow(
        `  Title shortened:\n    "${result.title.original}"\n    → "${result.title.value}"`,
      ),
    );
  }
}
