import { parse } from 'yaml';

export function readFrontmatter(source, filepath) {
  const opening = source.match(/^\uFEFF?---[ \t]*\r?\n/);

  if (!opening) {
    throw new Error(`${filepath} does not start with YAML frontmatter`);
  }

  const bodyStart = opening[0].length;
  const closingPattern = /^---[ \t]*$/gm;
  closingPattern.lastIndex = bodyStart;
  const closing = closingPattern.exec(source);

  if (!closing) {
    throw new Error(`${filepath} has unclosed YAML frontmatter`);
  }

  const raw = source.slice(bodyStart, closing.index);
  let data;

  try {
    data = parse(raw) ?? {};
  } catch (error) {
    throw new Error(`${filepath} has invalid YAML frontmatter: ${error.message}`);
  }

  return {
    data,
    raw,
    start: bodyStart,
    end: closing.index,
  };
}

export function setImageFrontmatter(source, frontmatter, imagePath) {
  const imageLine = `image: '${imagePath}'`;
  const imagePattern = /^image\s*:.*$/m;
  let raw = frontmatter.raw;

  if (imagePattern.test(raw)) {
    raw = raw.replace(imagePattern, imageLine);
  } else {
    const newline = raw.includes('\r\n') ? '\r\n' : '\n';
    raw = `${raw.replace(/[\r\n]*$/, '')}${newline}${imageLine}${newline}`;
  }

  return `${source.slice(0, frontmatter.start)}${raw}${source.slice(frontmatter.end)}`;
}
