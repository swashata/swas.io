# swas.io

Personal site for writing, projects, uses, now, and about.

Built with Astro, TypeScript, React islands, MDX content collections, Tailwind CSS, and shadcn/ui primitives.

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
