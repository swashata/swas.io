# Astro Migration PRD

## Objective

Migrate `swas.io` from the existing Gatsby 1 personal blog to the latest Astro stack, using TypeScript, React islands, Tailwind CSS, shadcn/ui, npm, and Node.js 22. The new site should fully replace the current visual design with the attached monochrome editorial design direction.

- [Home Page](./home-page.png)
- [Article Page](./article-page.png)

This document is intended to be edited by the site owner, then used by Codex as the implementation plan.

## Product Direction

- Build a clean, fast, content-first personal site.
- Ditch the current Gatsby/Bulma/Sass design entirely.
- Use the new design mockups as the source of truth:
  - Large bold sans-serif display headings.
  - Monospace/editorial body and metadata treatment.
  - Off-white background, black text, thin dividers, restrained amber accent.
  - Sparse navigation: `writing`, `projects`, `about`, `now`.
  - Footer with copyright and small code mark.
- Keep the site simple: no Disqus, no legacy social widgets, no Google Analytics requirement unless added later.
- Add one native share button on article/detail pages using the Web Share API with a clipboard fallback.

## Required Stack

- Astro latest version available at implementation time.
- TypeScript.
- React integration for interactive islands only.
- MDX for all content.
- Tailwind CSS.
- Use Tailwind Typography plugin for article prose.
- shadcn/ui components where useful, configured for Astro/Tailwind.
- npm as the package manager.
- Node.js 22.
- Netlify deployment.

## Content Model

Move all existing markdown into Astro-style content collections and convert every file to MDX.

Target collections:

- `writing`: migrated from `src/pages/blog/*.md`.
- `projects`: migrated from `src/pages/project/*.md`.
- `pages`: long-lived standalone MDX pages such as `about`, `uses`, and `now`.

Suggested frontmatter fields:

```ts
{
  title: string;
  description?: string;
  date?: Date;
  updated?: Date;
  tags?: string[];
  image?: string;
  draft?: boolean;
  order?: number;
  link?: string;
}
```

Implementation should create `src/content/config.ts` with schemas for each collection.

## Routes

URL preservation is not required. Prefer modern, simple Astro routes.

Required routes:

- `/` home page with hero, latest writing, topics, and visual style from the homepage mockup.
- `/writing` writing index.
- `/writing/[slug]` writing detail.
- `/projects` project index with outbound links. Do not build individual project detail pages unless this is revisited later.
- `/about` about page, combining useful old content with the new positioning and visual style.
- `/now` an editable MDX living page: what you are focused on recently, what you are building/thinking about, and what has your attention. It should not be a full bio. More like a timestamped snapshot.
- `/uses` dedicated uses page at `swas.io/uses`.
- `/topics/[slug]` tag/topic archive

Do not recreate Gatsby pagination unless the content volume makes it necessary. A single writing index is acceptable for the current corpus.

## Component Structure

Keep a semantic component structure similar in spirit to the current app, but rebuild it for Astro.

Suggested structure:

```txt
src/
  components/
    site/
      Header.astro
      Footer.astro
      LayoutShell.astro
      Seo.astro
    content/
      ArticleHeader.astro
      ArticleBody.astro
      ContentList.astro
      TopicList.astro
      ProjectCard.astro
    islands/
      ShareButton.tsx
  content/
    writing/
    projects/
    pages/
  layouts/
    BaseLayout.astro
    ArticleLayout.astro
    PageLayout.astro
  pages/
```

Use `.astro` components by default. Use React only for interactive UI, starting with the native share button.

## Styling Requirements

- Configure Tailwind as the primary styling layer.
- Configure shadcn/ui for reusable primitives, but avoid overbuilding a component library.
- Avoid card-heavy layouts unless representing repeated content items.
- Keep the new design sparse and typographic.
- Use responsive type scales that do not break on mobile.
- Use semantic HTML for header, nav, main, article, aside, footer, lists, and time elements.
- Include accessible focus states and keyboard-friendly navigation.
- Ensure article prose supports headings, blockquotes, code blocks, inline code, images, lists, and links.

## Images

- Preserve existing images currently in `src/images`.
- Move/organize images into the Astro structure during migration, preferably near content or under `src/assets`.
- Use Astro's native image support where it fits.
- Use native/lazy image loading only if Astro supports it cleanly without a custom image pipeline. If not, defer enhanced lazy loading to a later task.

## Migration Tasks

1. Create a new Astro project structure inside the existing repository without preserving Gatsby runtime code.
2. Replace Yarn usage with npm:
   - Remove `yarn.lock`.
   - Keep/regenerate `package-lock.json`.
   - Update scripts to Astro commands.
   - Update Netlify build command to `npm run build`.
3. Configure Node.js 22:
   - Add/update `.nvmrc`.
   - Add/update `engines.node` in `package.json`.
   - Configure Netlify environment for Node 22 if needed.
4. Install/configure Astro, TypeScript, React integration, MDX, Tailwind, and shadcn/ui.
5. Create content collections and migrate all markdown files to MDX.
6. Migrate image references from Gatsby `featured_image` paths to Astro-compatible image references.
7. Rebuild layouts and components following the new design.
8. Build required routes. Map `about`, `uses`, and `now` from the `pages` collection.
9. Implement the native share button React island.
10. Remove Gatsby-only files, dependencies, templates, CMS code, Sass, Bulma, FontAwesome, Disqus, and legacy Gatsby plugins.
11. Update README with npm/Node 22 development commands.
12. Verify locally and with a production build.

## Acceptance Criteria

- `npm install` works on Node.js 22.
- `npm run dev` starts the Astro site.
- `npm run build` succeeds.
- Netlify build uses npm and Node.js 22.
- All existing blog posts are available as MDX under `writing`.
- Existing project content is available under `projects`.
- `about`, `uses`, and `now` exist.
- `/now` is editable MDX content from the `pages` collection.
- `/projects` is index-only and links to external project URLs.
- All old blog posts are included in `writing`; do not archive or draft old posts during this migration.
- The homepage and article page match the attached design direction closely.
- No Gatsby runtime dependencies remain.
- No Yarn workflow remains.
- Basic SEO metadata, canonical URLs, Open Graph metadata, sitemap, and RSS are present if Astro integrations make them straightforward.
- RSS includes `writing` posts only.
- Images render correctly in content and are not broken after migration.
- Article pages include a native share button.

## Deferred

- Comments.
- Analytics.
- Advanced image lazy-loading beyond Astro-native support.
- Search.
- Dark mode.
- Full CMS/editor workflow.
- Strict URL redirects from old Gatsby paths.
