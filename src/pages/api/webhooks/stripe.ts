import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { eq } from 'drizzle-orm';
import type Stripe from 'stripe';
import { db } from '../../../db/client';
import { orders } from '../../../db/schema';
import { downloadTokenExpiry, generateDownloadToken } from '../../../lib/download-token';
import { sendDownloadEmail } from '../../../lib/email';
import { stripe } from '../../../lib/stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;
  const rawBody = await request.text();

  if (!signature || !webhookSecret) {
    return new Response('Missing signature', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session, new URL(request.url).origin);
  } else if (event.type === 'charge.refunded') {
    await handleChargeRefunded(event.data.object as Stripe.Charge);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};

async function handleCheckoutCompleted(session: Stripe.Checkout.Session, origin: string) {
  const [existing] = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeCheckoutSessionId, session.id))
    .limit(1);
  if (existing) return;

  const ebookSlug = session.metadata?.ebookSlug;
  const tierName = session.metadata?.tierName;
  const buyerEmail = session.customer_details?.email;
  if (!ebookSlug || !tierName || !buyerEmail) {
    console.error('checkout.session.completed missing metadata/email', session.id);
    return;
  }

  const downloadToken = generateDownloadToken();

  await db.insert(orders).values({
    buyerEmail,
    ebookSlug,
    tierName,
    stripePaymentIntentId:
      typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
    stripeCheckoutSessionId: session.id,
    amountCents: session.amount_total ?? 0,
    currency: (session.currency ?? 'sgd').toUpperCase(),
    status: 'paid',
    downloadToken,
    downloadTokenExpiresAt: downloadTokenExpiry(),
  });

  try {
    const ebooks = await getCollection('ebook');
    const ebookTitle = ebooks.find((e) => e.data.slug === ebookSlug)?.data.title ?? ebookSlug;
    const downloadUrl = `${origin}/api/download/${downloadToken}`;
    await sendDownloadEmail(buyerEmail, ebookTitle, downloadUrl);
  } catch (err) {
    console.error('Failed to send download email', session.id, err);
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
  if (!paymentIntentId) return;

  await db
    .update(orders)
    .set({ status: 'refunded', updatedAt: new Date() })
    .where(eq(orders.stripePaymentIntentId, paymentIntentId));
}
