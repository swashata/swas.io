import { readFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { image, paths } from './config.mjs';

let assetsPromise;

const titleMarkupPattern = /(<br\s*\/?>|<small>|<\/small>)/gi;

function smallTextNode(text) {
  return {
    type: 'span',
    props: {
      style: {
        color: image.mutedTextColor,
        fontSize: image.fontSize * image.smallTextScale,
      },
      children: text,
    },
  };
}

function titleLineNode() {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        minHeight: image.lineHeight,
        width: '100%',
      },
      children: [],
    },
  };
}

export function renderTitleMarkup(value) {
  const root = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
      children: [titleLineNode()],
    },
  };
  let offset = 0;
  let smallDepth = 0;
  let hasMarkup = false;

  const appendText = (text) => {
    if (!text) return;
    const line = root.props.children.at(-1);
    line.props.children.push(smallDepth > 0 ? smallTextNode(text) : text);
  };

  for (const match of value.matchAll(titleMarkupPattern)) {
    hasMarkup = true;
    appendText(value.slice(offset, match.index));

    const tag = match[0].toLowerCase();
    if (tag.startsWith('<br')) {
      root.props.children.push(titleLineNode());
    } else if (tag === '<small>') {
      smallDepth += 1;
    } else if (smallDepth > 0) {
      smallDepth -= 1;
    } else {
      appendText(match[0]);
    }

    offset = match.index + match[0].length;
  }

  appendText(value.slice(offset));

  return hasMarkup ? root : value;
}

function loadAssets() {
  assetsPromise ??= Promise.all([readFile(paths.template), readFile(paths.font)]);
  return assetsPromise;
}

export async function renderFeaturedImage(title) {
  const [template, font] = await loadAssets();
  const templateUrl = `data:image/png;base64,${template.toString('base64')}`;
  const titleStyle = {
    position: 'absolute',
    left: image.titleLeft,
    top: 0,
    bottom: 0,
    width: image.titleWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: image.textColor,
    fontFamily: 'Inter',
    fontSize: image.fontSize,
    fontWeight: 700,
    lineHeight: `${image.lineHeight}px`,
    textAlign: 'left',
  };

  if (!title.explicit) {
    titleStyle.lineClamp = image.maxLines;
  }

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          position: 'relative',
          display: 'flex',
          width: image.width,
          height: image.height,
        },
        children: [
          {
            type: 'img',
            props: {
              src: templateUrl,
              width: image.width,
              height: image.height,
              style: { position: 'absolute', inset: 0 },
            },
          },
          {
            type: 'div',
            props: { style: titleStyle, children: renderTitleMarkup(title.value) },
          },
        ],
      },
    },
    {
      width: image.width,
      height: image.height,
      fonts: [{ name: 'Inter', data: font, weight: 700, style: 'normal' }],
    },
  );

  return new Resvg(svg).render().asPng();
}
