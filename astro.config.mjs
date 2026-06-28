import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import remarkWritingLinks from './src/lib/remark-writing-links.mjs';

export default defineConfig({
  site: 'https://swas.io',
  integrations: [mdx(), react(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkWritingLinks],
    }),
    shikiConfig: {
      theme: 'github-light',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
