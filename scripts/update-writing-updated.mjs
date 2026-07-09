import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const writingPrefix = 'src/content/writing/';
const timestampValue = new Date().toISOString();

function stagedWritingFiles() {
  const output = execFileSync(
    'git',
    [
      'diff',
      '--cached',
      '--name-only',
      '--diff-filter=ACMR',
      '--',
      'src/content/writing',
    ],
    { encoding: 'utf8' },
  );

  return output
    .split('\n')
    .map((file) => file.trim())
    .filter((file) => file.startsWith(writingPrefix) && file.endsWith('.mdx'));
}

function updateFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    return source;
  }

  const frontmatter = match[1];
  const isDraft = /^draft:\s*true\s*$/m.test(frontmatter);
  let nextFrontmatter;

  if (isDraft && /^date:\s*.*$/m.test(frontmatter)) {
    nextFrontmatter = frontmatter.replace(/^date:\s*.*$/m, `date: ${timestampValue}`);
  } else if (/^updated:\s*.*$/m.test(frontmatter)) {
    nextFrontmatter = frontmatter.replace(
      /^updated:\s*.*$/m,
      `updated: ${timestampValue}`,
    );
  } else if (/^date:\s*.*$/m.test(frontmatter)) {
    nextFrontmatter = frontmatter.replace(
      /^(date:\s*.*)$/m,
      `$1\nupdated: ${timestampValue}`,
    );
  } else {
    nextFrontmatter = `updated: ${timestampValue}\n${frontmatter}`;
  }

  return source.replace(match[0], `---\n${nextFrontmatter}\n---`);
}

const files = stagedWritingFiles();

for (const file of files) {
  const filepath = path.join(process.cwd(), file);
  const source = readFileSync(filepath, 'utf8');
  const updated = updateFrontmatter(source);

  if (updated !== source) {
    writeFileSync(filepath, updated);
  }
}

if (files.length > 0) {
  execFileSync('git', ['add', '--', ...files], { stdio: 'inherit' });
}
