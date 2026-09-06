import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const quips = await getCollection('quips');
  const items = quips.map((entry) => ({ id: entry.id, ...entry.data }));

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
};
