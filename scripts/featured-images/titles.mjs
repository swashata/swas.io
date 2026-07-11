import { image } from './config.mjs';

export function getImageTitle(frontmatter) {
  if (typeof frontmatter.image_title === 'string') {
    return {
      value: frontmatter.image_title,
      original: frontmatter.image_title,
      explicit: true,
      trimmed: false,
    };
  }

  if (typeof frontmatter.title !== 'string' || !frontmatter.title.trim()) {
    throw new Error('frontmatter must contain a non-empty title or image_title');
  }

  const original = frontmatter.title.trim();

  if (original.length <= image.maxTitleLength) {
    return { value: original, original, explicit: false, trimmed: false };
  }

  const available = image.maxTitleLength - 3;
  const candidate = original.slice(0, available + 1);
  const lastWhitespace = candidate.search(/\s+\S*$/);
  const shortened = (
    lastWhitespace > 0 ? candidate.slice(0, lastWhitespace) : original.slice(0, available)
  )
    .trimEnd()
    .concat('...');

  return {
    value: shortened,
    original,
    explicit: false,
    trimmed: true,
  };
}
