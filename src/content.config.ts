import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { CATEGORY_NAMES, TAGS } from '../TAXONOMIES';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(CATEGORY_NAMES),
      tags: z.array(z.enum(TAGS)).default([]),
      image: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      image: image().optional(),
      order: z.number().default(0),
      link: z.string().url(),
      tags: z.array(z.enum(TAGS)).default([]),
      draft: z.boolean().default(false),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing, projects, pages };
