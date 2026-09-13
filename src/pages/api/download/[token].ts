import { GetObjectCommand } from '@aws-sdk/client-s3';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/client';
import { orders } from '../../../db/schema';
import { OBJECT_STORAGE_BUCKET, r2 } from '../../../lib/r2';

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

  const object = await r2
    .send(new GetObjectCommand({ Bucket: OBJECT_STORAGE_BUCKET, Key: manuscriptFileKey }))
    .catch(() => null);
  if (!object?.Body) return new Response('Not found', { status: 404 });

  return new Response(await object.Body.transformToWebStream(), {
    status: 200,
    headers: {
      'Content-Type': object.ContentType ?? 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${manuscriptFileKey.split('/').pop()}"`,
    },
  });
};
