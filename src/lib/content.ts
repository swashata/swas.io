import type { CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../../TAXONOMIES';

export const site = {
  name: 'swas',
  title: 'swas.io',
  description: 'Software, systems, and the quiet craft of building things that last.',
  url: 'https://swas.io',
  author: 'Swas',
};

export function getEntrySlug(entry: { id: string; slug?: string }) {
  return entry.slug ?? entry.id.replace(/\.(md|mdx)$/, '');
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function readingTime(body = '') {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function sortByDateDesc<T extends CollectionEntry<'writing'>>(entries: T[]) {
  return [...entries].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function isVisibleWritingEntry(entry: CollectionEntry<'writing'>) {
  return import.meta.env.DEV || !entry.data.draft;
}

export function filterVisibleWritingEntries<T extends CollectionEntry<'writing'>>(
  entries: T[],
) {
  return entries.filter(isVisibleWritingEntry);
}

export function sortProjects<T extends CollectionEntry<'projects'>>(entries: T[]) {
  return [...entries].sort((a, b) => b.data.order - a.data.order);
}

export function getAllTopics(entries: CollectionEntry<'writing'>[]) {
  const topics = new Map<string, { label: string; count: number }>();

  for (const entry of entries) {
    for (const tag of entry.data.tags ?? []) {
      const key = slugify(tag);
      const existing = topics.get(key);
      topics.set(key, {
        label: existing?.label ?? tag,
        count: (existing?.count ?? 0) + 1,
      });
    }
  }

  return [...topics.entries()]
    .map(([slug, topic]) => ({ slug, ...topic }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getAllCategories(entries: CollectionEntry<'writing'>[]) {
  const counts = new Map<string, number>();

  for (const entry of entries) {
    const key = slugify(entry.data.category);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return CATEGORIES.map((category) => ({
    ...category,
    slug: slugify(category.label),
    count: counts.get(slugify(category.label)) ?? 0,
  })).filter((category) => category.count > 0);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
