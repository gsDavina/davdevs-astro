import { pgTable, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  buyerEmail: text('buyer_email').notNull(),
  ebookSlug: text('ebook_slug').notNull(),
  tierName: text('tier_name').notNull(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  stripeCheckoutSessionId: text('stripe_checkout_session_id').notNull().unique(),
  amountCents: integer('amount_cents').notNull(),
  currency: text('currency').notNull(),
  status: text('status', { enum: ['paid', 'refunded'] }).notNull().default('paid'),
  downloadToken: text('download_token').notNull().unique(),
  downloadTokenExpiresAt: timestamp('download_token_expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
