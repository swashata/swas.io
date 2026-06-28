import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import {
  filterVisibleWritingEntries,
  getEntrySlug,
  site,
  sortByDateDesc,
} from '@/lib/content';

export async function GET(context) {
  const writing = sortByDateDesc(
    filterVisibleWritingEntries(await getCollection('writing')),
  );

  return rss({
    title: `${site.title} writing`,
    description: site.description,
    site: context.site,
    items: writing.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description ?? '',
      pubDate: entry.data.date,
      link: `/writing/${getEntrySlug(entry)}`,
    })),
  });
}
