# Agent Notes

## Project Shape

- This is an Astro site using TypeScript, MDX content collections, React islands, Tailwind CSS, and shadcn-style primitives.
- Routes live in `src/pages`. File paths map to URLs:
  - `src/pages/index.astro` -> `/`
  - `src/pages/writing/index.astro` -> `/writing`
  - `src/pages/writing/[slug].astro` -> writing detail pages
  - `src/pages/about.astro` -> `/about`
  - `src/pages/uses.astro` -> `/uses`
  - `src/pages/now.astro` -> `/now`
- Shared layouts live in `src/layouts`.
- Shared components live in `src/components`.
- Global CSS, theme tokens, font imports, prose styles, and layout helpers live in `src/styles/global.css`.
- Content lives in `src/content`:
  - `writing`: blog posts
  - `projects`: project entries for `/projects`
  - `pages`: standalone MDX pages such as about, uses, and now
- Content schemas and loaders live in `src/content.config.ts`.

## Workflow

- Assume `npm run dev` is already running unless proven otherwise. Check http://localhost:4321/ for the local dev site.
- Before running a full build, prefer checking the relevant page in the browser at the local dev URL.
- Use `npm run build` after code/content/style changes that could affect routing, MDX, imports, or production output.
- Use the user's NVM-backed shell when npm/node are needed: run commands through
  `zsh -lic 'npm ...'` or `zsh -lic 'node ...'` so NVM initializes correctly.
  The sandbox may print zsh startup permission warnings, but npm/node still run.
- You don't have to verify the browser output for every change, do it only when explicitly asked.

## Useful Guardrails

- For design, styling, layout, typography, visual polish, or UI component work, read `@DESIGN.md` first.
- Prefer `.astro` components for static UI.
- Use React only for interactive islands, such as the share button.
- Keep the design sparse, typographic, and close to the monochrome editorial direction.
- Keep content editable as MDX.
- Do not reintroduce Gatsby, Yarn, Disqus, legacy analytics, or old CMS code.
- Preserve the npm workflow and `package-lock.json`.
- When changing styles, check both the homepage and an article page for horizontal overflow.
