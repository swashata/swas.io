import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { paths } from './config.mjs';
import { readFrontmatter, setImageFrontmatter } from './frontmatter.mjs';
import { renderFeaturedImage } from './render.mjs';
import { getImageTitle } from './titles.mjs';

function relativeToProject(filepath) {
  return path.relative(paths.projectRoot, filepath);
}

function outputForPost(filepath) {
  const slug = path.basename(filepath, path.extname(filepath));
  return {
    absolute: path.join(paths.images, `${slug}-featured.png`),
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

export function resolvePostPath(argument) {
  if (!argument) {
    throw new Error('Provide an MDX path, for example ./src/content/writing/example.mdx');
  }

  const filepath = path.resolve(process.cwd(), argument);
  const relative = path.relative(paths.writing, filepath);

  if (
    relative.startsWith('..') ||
    path.isAbsolute(relative) ||
    path.extname(filepath) !== '.mdx'
  ) {
    throw new Error('The post must be an .mdx file inside src/content/writing');
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
  const output = outputForPost(filepath);
  const png = await renderFeaturedImage(title);
  const updated = setImageFrontmatter(source, frontmatter, output.frontmatter);

  await mkdir(paths.images, { recursive: true });
  await writeFile(output.absolute, png);
  await writeFile(filepath, updated, 'utf8');

  return { status: 'generated', filepath, output: output.absolute, title };
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
