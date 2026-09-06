import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { head } from '@vercel/blob';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/client';
import { orders } from '../../../db/schema';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const token = params.token;
  if (!token) return new Response('Not found', { status: 404 });

  const [order] = await db.select().from(orders).where(eq(orders.downloadToken, token)).limit(1);
  if (!order || order.status !== 'paid' || order.downloadTokenExpiresAt < new Date()) {
    return new Response('Not found', { status: 404 });
  }

  const ebooks = await getCollection('ebook');
  const ebook = ebooks.find((e) => e.data.slug === order.ebookSlug);
  const tier = ebook?.data.pricingTiers.find((t) => t.name === order.tierName);
  const manuscriptFileKey = tier?.manuscriptFileKey;
  if (!manuscriptFileKey) {
    // Scaffolded pipeline, no manuscript file uploaded yet for this tier.
    return new Response('Not found', { status: 404 });
  }

  const blob = await head(manuscriptFileKey).catch(() => null);
  if (!blob) return new Response('Not found', { status: 404 });

  const fileResponse = await fetch(blob.url);
  if (!fileResponse.ok || !fileResponse.body) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(fileResponse.body, {
    status: 200,
    headers: {
      'Content-Type': blob.contentType ?? 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${manuscriptFileKey.split('/').pop()}"`,
    },
  });
};
