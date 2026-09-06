import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { stripe } from '../../lib/stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect, url }) => {
  const form = await request.formData();
  const ebookSlug = String(form.get('ebookSlug') ?? '');
  const tierName = String(form.get('tierName') ?? '');

  const ebooks = await getCollection('ebook');
  const ebook = ebooks.find((e) => e.data.slug === ebookSlug);
  if (!ebook || ebook.data.status !== 'published') {
    return redirect('/ebooks?error=not-available');
  }

  const tier = ebook.data.pricingTiers.find((t) => t.name === tierName);
  if (!tier) {
    return redirect(`/ebooks/${ebookSlug}?error=not-available`);
  }

  const lineItem = tier.stripePriceId
    ? { price: tier.stripePriceId, quantity: 1 }
    : {
        price_data: {
          currency: tier.currency.toLowerCase(),
          product_data: { name: `${ebook.data.title} — ${tier.name}` },
          unit_amount: tier.priceCents,
        },
        quantity: 1,
      };

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [lineItem],
    success_url: `${url.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url.origin}/ebooks/${ebookSlug}`,
    metadata: { ebookSlug, tierName },
  });

  if (!session.url) {
    return redirect(`/ebooks/${ebookSlug}?error=checkout-failed`);
  }
  return redirect(session.url, 303);
};
