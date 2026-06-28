import { closeSync, mkdirSync, openSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const writingDir = path.join(process.cwd(), 'src/content/writing');
const title = process.argv.slice(2).join(' ').trim() || 'Untitled Post';
const now = new Date();
const categories = [
  'Engineering Leadership',
  'Product Engineering',
  'Software Architecture',
  'Developer Experience',
  'Web Platforms',
  'AI Systems',
  'Freemius Lessons',
  'Technical Notes',
  'Career & Craft',
  'Personal Notes',
];

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatLocalIso(date) {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absoluteOffset = Math.abs(offsetMinutes);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${sign}${pad(
    Math.floor(absoluteOffset / 60),
  )}:${pad(absoluteOffset % 60)}`;
}

function formatDateOnly(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function uniquePath(baseSlug) {
  let suffix = 0;

  while (true) {
    const slug = suffix === 0 ? baseSlug : `${baseSlug}-${suffix + 1}`;
    const filepath = path.join(writingDir, `${slug}.mdx`);

    try {
      const fd = openSync(filepath, 'wx');
      return { fd, filepath };
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
      suffix += 1;
    }
  }
}

mkdirSync(writingDir, { recursive: true });

const baseSlug = slugify(title) || `${formatDateOnly(now)}-draft`;
const { fd, filepath } = uniquePath(baseSlug);
const categoryOptions = categories
  .filter((category) => category !== 'Technical Notes')
  .map((category) => `# category: ${category}`)
  .join('\n');
const markdown = `---
title: '${title.replaceAll("'", "''")}'
description: ''
date: ${formatLocalIso(now)}
category: Technical Notes
${categoryOptions}
tags: []
draft: true
# image: ../../assets/images/example.jpg
---

Write the opening thought here.
`;

writeFileSync(fd, markdown);
closeSync(fd);
console.log(`Created ${path.relative(process.cwd(), filepath)}`);
