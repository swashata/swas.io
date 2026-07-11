# swas.io

Personal site for writing, projects, uses, now, and about.

Built with Astro, TypeScript, React islands, MDX content collections, Tailwind CSS, and
shadcn/ui primitives.

## Requirements

- Node.js `22.12.0` or newer within Node 22
- npm

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

All content is MDX under `src/content`.

- `src/content/writing`: long-form posts
- `src/content/projects`: project entries used by `/projects`
- `src/content/pages`: standalone pages such as `/about`, `/uses`, and `/now`

RSS is generated for writing posts only at `/rss.xml`.

### Featured images

Generate images for posts without an `image` field:

```bash
npm run generate-featured-images
```

Force regeneration for one post:

```bash
npm run force-featured-image -- ./src/content/writing/example.mdx
```

Add `image_title` to a post's frontmatter to override the text rendered on its image.

## Project Map

- `src/pages/index.astro`: homepage route (`/`) and homepage hero/header content.
- `src/pages/**`: file-based routes. Example: `src/pages/about.astro` becomes `/about`.
- `src/layouts/BaseLayout.astro`: shared page shell with `<Header />`, `<main>`, and
  `<Footer />`.
- `src/components/site/Header.astro`: top logo and primary navigation.
- `src/components/site/Footer.astro`: shared footer.
- `src/styles/global.css`: global colors, typography, layout helpers, and prose styles.
- `src/layouts/ArticleLayout.astro`: writing detail page layout.
- `src/layouts/PageLayout.astro`: standalone page layout for about, uses, and now.
- `src/components/content/ContentList.astro`: writing list UI.
- `src/components/content/ProjectCard.astro`: project list item UI.
- `src/content.config.ts`: content collection schemas and loaders.
- `src/content/writing`: edit blog posts here.
- `src/content/projects`: edit project entries here.
- `src/content/pages`: edit about, uses, and now here.

For homepage styling, start with `src/pages/index.astro`, then follow into
`src/layouts/BaseLayout.astro`, `src/components/site/Header.astro`, and
`src/styles/global.css`.

## TODO - Projects

Revamp the projects page.

1. Filter by active and inactive projects.
2. Add some nice monochrome image/icon for each projects.
3. Surface the projects in the homepage with a few featured ones.
