# Dav/Devs — Astro Rebuild

Davina Leong's personal dev journal (`davdevs.dev`), rebuilt as an
[Astro](https://astro.build) site. Content — articles, projects, tools,
notebooks, Frontend Mentor write-ups, e-books, and jokes — is authored as
Markdown in `src/content/` and rendered through a design system ported
from the [davdevs-laravel](https://github.com/gsDavina) CMS this project
replaces the frontend of.

The site is **mostly static** (every content page prerenders at build time),
with one deliberate exception: e-book purchases go through a real Stripe
Checkout → webhook → Postgres → download-email pipeline, so a handful of
routes (`/api/checkout`, `/api/webhooks/stripe`, `/api/download/[token]`,
`/order-confirmation`) render on-demand via the Vercel adapter instead.

## Stack

- **[Astro](https://astro.build)** — content collections
  (`src/content.config.ts`, Content Layer `glob()` loader), hybrid
  rendering via `@astrojs/vercel` (static by default, `prerender = false`
  on the checkout/webhook/download/confirmation routes only)
- **React** (`@astrojs/react`) — for the 13 interactive tool islands only
  (games, converters, generators); everything else is plain Astro
- **Tailwind v4** (utilities-only, no preflight) — used only by the ported
  tool islands, which came with Tailwind classes already; the rest of the
  site is hand-written CSS using the design tokens in `src/styles/tokens.css`
- **Stripe** — e-book Checkout Sessions, webhook-driven order fulfillment
- **Drizzle + Postgres** (`src/db/`) — the `orders` table for e-book purchases;
  the only database in the project, everything else is Markdown files
- **Vercel Blob** — stores purchased e-book files, served through a
  token-gated download route (never exposed directly to buyers)
- **Resend** — sends the post-purchase download-link email
- **`@astrojs/sitemap`** — generates `sitemap-index.xml` on build

## Getting started

```sh
npm install
npm run dev       # http://localhost:4321
```

Browsing the site needs nothing further. The e-book checkout flow needs a
local `.env` — copy `.env.example` and fill in test-mode Stripe keys, a
Postgres `DATABASE_URL`, a Vercel Blob token, and Resend credentials, then
run the Drizzle migration once:

```sh
npm run db:generate   # generate a migration from src/db/schema.ts
npm run db:migrate     # apply it to DATABASE_URL
```

For local webhook testing: `stripe listen --forward-to localhost:4321/api/webhooks/stripe`.

| Command              | Action                                     |
| :-------------------- | :------------------------------------------ |
| `npm run dev`          | Start the dev server                        |
| `npm run build`        | Build the site to `./dist/` + `.vercel/output/` |
| `npm run preview`      | Preview the production build locally        |
| `npm run db:generate`  | Generate a Drizzle migration from `src/db/schema.ts` |
| `npm run db:migrate`   | Apply pending migrations to `DATABASE_URL`  |
| `npm run astro ...`    | Run any Astro CLI command (e.g. `check`)    |

## Project structure

```
src/
├── content.config.ts        # Content collection schemas (article, fem,
│                             # knowledge-sharing, notebook, project, tool,
│                             # ebook, quips)
├── content/                 # Markdown content — one folder per collection
├── components/
│   ├── tools/                # Ported React tool islands + shared/ helpers,
│   │                          # mirrored 1:1 from davdevs-laravel's
│   │                          # resources/js/components/ (see registry.ts)
│   └── *.astro                # Nav, Footer, EntryCard, Tag, etc.
├── db/
│   ├── schema.ts               # Drizzle schema — the `orders` table
│   └── client.ts                # Drizzle + postgres-js client
├── layouts/Site.astro        # Shared page shell: head/meta/OG/JSON-LD,
│                             # nav, footer, search modal, cookie banner
├── lib/
│   ├── content.ts             # Blog-type helpers, tag colours, date/read-time
│   ├── jsonld.ts               # JSON-LD builders per content type
│   ├── site-config.ts         # Brand name, footer links, Lighthouse badge values
│   ├── stripe.ts, download-token.ts, email.ts, format.ts  # E-book checkout helpers
├── pages/
│   ├── index.astro            # Home
│   ├── [type]/{index,[slug]}.astro  # Listing + detail for all 6 blog types
│   ├── ebooks/{index,[slug]}.astro  # Bespoke e-book landing pages
│   ├── api/checkout.ts, api/webhooks/stripe.ts, api/download/[token].ts
│   │                          # Server routes (prerender = false) for the
│   │                          # Stripe checkout/webhook/download pipeline
│   ├── order-confirmation.astro  # Post-checkout landing page
│   ├── funny.astro             # Random-quip page (statement / Q&A reveal)
│   ├── privacy.astro, 404.astro
│   └── {search,quips}-index.json.ts  # Build-time JSON indexes for ⌘K search
│                                       # and the Funny page
└── styles/
    ├── tokens.css              # Design tokens (colours, type scale, spacing)
    ├── tools.css                # Shared chrome classes for tool islands
    └── tailwind-utilities.css   # Tailwind (utilities layer only)

drizzle.config.ts             # Drizzle Kit config (schema + DATABASE_URL)
.env.example                  # Every env var the checkout pipeline needs
```

## Design system

Colours, type scale, spacing, and component patterns are ported from
**davdevs-laravel** — specifically its `_internal-docs/04-design-system.md`,
`06-frontend-design-language.md`, and the pixel-accurate mockup templates
in `resources/views/static/*`. If this site's design ever needs to change,
update those source-of-truth docs first, then port the change here — don't
invent new values in this repo's CSS directly.

## Content

Content was extracted from the live site and lives in `src/content/*.md`.
See `_internal-docs/content-extraction-notes.md` for what was migrated,
what was intentionally excluded (Sermons, Template — both out of scope),
and known source-content quirks carried through as-is.

The `⌘K`/`Ctrl+K` search palette and the `/funny` page are both powered by
build-time JSON indexes (`search-index.json`, `quips-index.json`) — no
database involved for either of those.

## E-book checkout

Each e-book's pricing tiers post to `/api/checkout`, which creates a real
Stripe Checkout Session (using a live `stripePriceId` per tier where set,
falling back to ad-hoc `price_data` otherwise) and redirects there. A
webhook (`/api/webhooks/stripe`) fulfils the order on
`checkout.session.completed` — inserting a row in the `orders` table,
generating a download token, and emailing the buyer via Resend — and
flips the order to `refunded` on `charge.refunded`. `/order-confirmation`
reads the order back from Postgres by Stripe session ID rather than
trusting the redirect alone (the webhook may not have landed yet).
`/api/download/[token]` is the only URL a buyer is ever given; it streams
the file from Vercel Blob server-side so the underlying Blob URL is never
exposed. See `_internal-docs/03-progress.md`'s 2026-09-07 entries for the
full build log, including the real Stripe product/price IDs already wired
into each e-book's frontmatter.

**Not yet done**: no manuscript files exist anywhere in this repo yet
(the e-book content is Markdown web copy, not the deliverable itself), so
every tier's `manuscriptFileKey` is blank and the download route 404s
until real files are uploaded to Vercel Blob.

## Known deviations from davdevs-laravel

A few things intentionally work differently from the Laravel CMS. Each is
documented in full (with rationale) in `_internal-docs/03-progress.md`;
summary:

- **Likes/reactions are per-browser (localStorage)**, not a shared,
  server-backed count. A Postgres database now exists (added for the
  e-book pipeline above), so this is no longer infra-blocked the way it
  originally was — it stays this way because a shared counter was never
  actually asked for.
- **`/privacy` was rewritten, not copied verbatim** — the Laravel policy
  describes a cookie + hashed-IP system this build doesn't have. It's kept
  up to date as the site's actual data footprint changes: it now also
  discloses exactly what the e-book checkout stores (buyer email + order
  details, for fulfillment only) now that that's real.
- **Tag colours are hashed, not hand-curated** — the real migrated content
  has 100+ free-form tags with no colour mapping to port.
- **Footer Lighthouse badges show real numbers** from a local audit
  against the production build (not the live `davdevs.dev` domain, which
  doesn't exist yet) — see `src/lib/site-config.ts` and
  `_internal-docs/lighthouse/` for the full per-page reports.
- **Sermon and Template content types don't exist here** — Sermons were
  out of scope for content extraction, and Template had zero live entries.

## Project docs

Full milestone checklist, QA checklist, and dated progress log live in
[`_internal-docs/`](./_internal-docs/):

- [`01-milestones.md`](./_internal-docs/01-milestones.md) — phase-by-phase build plan and status
- [`02-test-checklists.md`](./_internal-docs/02-test-checklists.md) — QA checklist and status
- [`03-progress.md`](./_internal-docs/03-progress.md) — dated log of what was built, verified, and why
- [`lighthouse/`](./_internal-docs/lighthouse/) — Lighthouse HTML/JSON reports per audited page

Everything left unchecked in the first two is blocked on infrastructure
this environment doesn't have access to (live DNS/hosting for
`davdevs.dev`, real browsers/devices beyond an in-app browser, screen-reader
software, or Stripe/database/email credentials only Davina can supply) —
each is called out explicitly where it appears, not silently skipped.

## License

[MIT](./LICENSE) © Davina Leong
