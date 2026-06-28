import path from 'node:path';

const writingDir = path.resolve('src/content/writing');

function visitLinks(node, visitor) {
  if (!node || typeof node !== 'object') {
    return;
  }

  if (node.type === 'link' && typeof node.url === 'string') {
    visitor(node);
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      visitLinks(child, visitor);
    }
  }
}

function splitUrl(url) {
  const match = url.match(/^([^?#]*)([?#].*)?$/);
  return {
    pathname: match?.[1] ?? url,
    suffix: match?.[2] ?? '',
  };
}

function isRelativeMarkdownLink(pathname) {
  return (
    /^\.{1,2}\//.test(pathname) &&
    /\.(md|mdx)$/i.test(pathname) &&
    !pathname.includes('\0')
  );
}

function toWritingUrl(filepath, suffix) {
  const relativeTarget = path.relative(writingDir, filepath);

  if (relativeTarget.startsWith('..') || path.isAbsolute(relativeTarget)) {
    return undefined;
  }

  const slug = relativeTarget
    .replace(/\.(md|mdx)$/i, '')
    .split(path.sep)
    .map(encodeURIComponent)
    .join('/');

  return `/writing/${slug}/${suffix}`;
}

export default function remarkWritingLinks() {
  return (tree, file) => {
    const sourcePath = file.history?.[0] ?? file.path;

    if (!sourcePath) {
      return;
    }

    const sourceDir = path.dirname(sourcePath);

    visitLinks(tree, (node) => {
      const { pathname, suffix } = splitUrl(node.url);

      if (!isRelativeMarkdownLink(pathname)) {
        return;
      }

      const targetPath = path.resolve(sourceDir, pathname);
      const writingUrl = toWritingUrl(targetPath, suffix);

      if (writingUrl) {
        node.url = writingUrl;
      }
    });
  };
}
