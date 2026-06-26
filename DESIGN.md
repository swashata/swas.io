# Design Notes

## Direction

- Clean, fast, content-first personal site.
- Sparse monochrome/editorial feel, closer to a printed technical notebook than a marketing site.
- The design should feel calm, sharp, and durable.
- Avoid decorative UI, gradients, blobs, excessive cards, heavy shadows, and busy color systems.

## Typography

- Sans/display font: `Inter`.
- Mono/editorial font: `JetBrains Mono`.
- Use large, bold sans-serif display headings for hero/page titles.
- Use monospace treatment for metadata, lists, article prose, and small editorial details when it supports the notebook feel.
- Do not use negative letter spacing.
- Keep text readable and prevent overflow on mobile.

## Color

- Background: off-white `#fbfaf7`.
- Primary text: near-black `#111111`.
- Muted text: warm gray `#6f6a62`.
- Borders/dividers: soft warm gray `#cfcac1`.
- Accent: restrained amber `#c06f12`.
- Use amber sparingly for markers, separators, highlights, and hover states.

## Layout

- Prefer full-width sections with a constrained inner container.
- Current shared container: `.site-container`.
- Use thin divider rules instead of boxed panels.
- Keep generous vertical rhythm.
- Avoid nested cards and card-heavy layouts.
- Repeated content rows should be scannable, dense, and quiet.

## Components

- Header is minimal: `swas|` mark plus text nav.
- Footer is minimal: copyright plus small code mark.
- Buttons should be plain, bordered, and compact.
- Use icons only where they clarify an action.
- Use `.astro` components by default.
- Use React only for interactive islands.

## Content UI

- Homepage: large editorial hero, latest writing list, topics.
- Writing pages: strong title, date/read-time metadata, article prose, topics aside, native share action.
- Projects: one index page with outbound links, not individual detail pages.
- About, uses, and now: MDX-driven standalone pages.

## Styling Source Of Truth

- Global tokens and helpers live in `src/styles/global.css`.
- Layout components live in `src/layouts`.
- Site chrome lives in `src/components/site`.
- Content UI components live in `src/components/content`.

## QA

- Check homepage and at least one article page after visual changes.
- Check desktop and mobile widths.
- Watch for horizontal overflow, especially in headings and code blocks.
- Run `npm run build` after changes that affect imports, content rendering, or production output.
