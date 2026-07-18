import assert from 'node:assert/strict';
import test from 'node:test';
import { image } from './config.mjs';
import { renderFeaturedImage, renderTitleMarkup } from './render.mjs';

test('leaves plain titles unchanged', () => {
  assert.equal(renderTitleMarkup('Plain title'), 'Plain title');
});

test('turns br and small tags into styled title lines', () => {
  const title = renderTitleMarkup('Primary<br><small>Secondary</small>');
  const [firstLine, secondLine] = title.props.children;
  const smallText = secondLine.props.children[0];

  assert.equal(firstLine.props.children[0], 'Primary');
  assert.equal(smallText.props.children, 'Secondary');
  assert.equal(smallText.props.style.fontSize, image.fontSize * 0.75);
  assert.equal(smallText.props.style.color, image.mutedTextColor);
});

test('renders supported title markup to a PNG', async () => {
  const png = await renderFeaturedImage({
    value: '/uses/<br><small>The Gear That Earned Its Place</small>',
    explicit: true,
  });

  assert.equal(png.subarray(1, 4).toString(), 'PNG');
});
