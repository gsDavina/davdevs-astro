CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"buyer_email" text NOT NULL,
	"ebook_slug" text NOT NULL,
	"tier_name" text NOT NULL,
	"stripe_payment_intent_id" text,
	"stripe_checkout_session_id" text NOT NULL,
	"amount_cents" integer NOT NULL,
	"currency" text NOT NULL,
	"status" text DEFAULT 'paid' NOT NULL,
	"download_token" text NOT NULL,
	"download_token_expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "orders_stripe_checkout_session_id_unique" UNIQUE("stripe_checkout_session_id"),
	CONSTRAINT "orders_download_token_unique" UNIQUE("download_token")
);
