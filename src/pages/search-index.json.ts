import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { BLOG_TYPES, TYPE_LABELS } from '../lib/content';

export const GET: APIRoute = async () => {
  const blogResults = await Promise.all(
    BLOG_TYPES.map(async (type) => {
      const entries = await getCollection(type);
      return entries.map((entry) => ({
        title: entry.data.title,
        url: `/${type}/${entry.data.slug}`,
        type: TYPE_LABELS[type],
      }));
    })
  );

  const ebooks = await getCollection('ebook');
  const ebookResults = ebooks.map((entry) => ({
    title: entry.data.title,
    url: `/ebooks/${entry.data.slug}`,
    type: 'E-Book',
  }));

  const items = [...blogResults.flat(), ...ebookResults];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
};
