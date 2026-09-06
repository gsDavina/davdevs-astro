import Stripe from 'stripe';

const secretKey = import.meta.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(secretKey);
