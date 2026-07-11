import { readFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { image, paths } from './config.mjs';

let assetsPromise;

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
    color: '#171717',
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
          { type: 'div', props: { style: titleStyle, children: title.value } },
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
