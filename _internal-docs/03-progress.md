# Progress

## 2026-09-07 — Stripe purchase pipeline for e-books (replacing LemonSqueezy)

Replicated the Stripe purchase pipeline from the sibling project
`davinas-ministries-astro` (redirect-to-Checkout, signature-verified
webhook, Postgres orders table, Resend email, token-gated download) for
davdevs' 3 e-books, replacing their external LemonSqueezy checkout links
entirely. This moves the site from fully static to hybrid rendering: the
new checkout/webhook/confirmation/download routes are `prerender = false`
on `@astrojs/vercel`, everything else still prerenders as static output.

**New infrastructure** (Railway Postgres via Drizzle, Vercel Blob, Resend —
chosen with the user over the reference's Neon/S3-R2 defaults):
- `src/db/schema.ts` (`orders` table) + `src/db/client.ts`
- `src/lib/stripe.ts`, `download-token.ts`, `email.ts`, `format.ts`
- `drizzle.config.ts`, `.env.example`, `src/env.d.ts`
- `package.json`: `stripe`, `@astrojs/vercel`, `drizzle-orm`, `postgres`,
  `@vercel/blob`, `resend`, `drizzle-kit` (dev); `db:generate`/`db:migrate`
  scripts

**Routes**: `POST /api/checkout` (validates the ebook+tier server-side,
builds a Stripe Checkout line item, redirects to `session.url`),
`POST /api/webhooks/stripe` (idempotent on `checkout.session.completed`,
handles `charge.refunded`), `GET /api/download/[token]` (streams the file
from Vercel Blob, gated by the order's download token), and
`/order-confirmation` (queries our own DB by `session_id`, never assumes
the webhook has already landed).

**Content schema** (`src/content.config.ts`, `ebook` collection): each
pricing tier now carries `priceCents`/`currency`/`stripePriceId`/
`manuscriptFileKey` instead of the old `price` string + LemonSqueezy
`checkoutUrl`. `stripePriceId` is set when a real Stripe Price exists;
otherwise checkout falls back to an ad-hoc `price_data`. All three e-books
now have real, live Stripe Price IDs for every tier (product/price IDs
supplied by the user directly, not created by this session):
- *It's Not Magic (Code)* — `prod_VD8EyJE555GTSF`: Ebook Only
  `price_1UCiTiKH93TdgTLB5gJLl5lV`, Ebook + Exercise Pack
  `price_1UCioFKH93TdgTLBU79NmZxK`
- *It's Not Scary (Debug)* — `prod_VD8GtlDL4n1V28`: Ebook
  `price_1UCiTiKH93TdgTLBZiZ2G0XT`, Ebook + Exercise Pack
  `price_1UCinPKH93TdgTLB14pwjH3y`
- *The Punny Side of Life/Things* — `prod_VD8FOPsxrZnTvQ`: Ebook
  `price_1UChz7Gfu4ZIyhLbGiywoJIk`

**Deliberate deviations from the reference pattern** (flagged to the user,
not silent):
- Multi-tier pricing preserved (reference has one price per ebook; davdevs
  keeps "Ebook Only" vs "Ebook + Exercise Pack" as separately-priced,
  separately-tracked purchases — checkout metadata carries
  `{ ebookSlug, tierName }`, not just `ebookSlug`).
- No "+ GST" copy on the Buy button (reference's copy assumes GST
  registration davdevs doesn't have an established context for).
- Vercel Blob has no S3-style signed URLs, so the download token itself is
  the real access gate — `/api/download/[token]` streams the file
  server-side rather than redirecting to the Blob URL.

**Not done yet — genuinely blocked on user-supplied credentials/files**:
no manuscript files exist anywhere in this repo (the e-book content is
just Markdown web pages), so `manuscriptFileKey` is blank on every tier
and `/api/download/[token]` will 404 until real files are uploaded to
Vercel Blob. Nothing in `.env` has been set — `STRIPE_SECRET_KEY`/
`STRIPE_WEBHOOK_SECRET`, `DATABASE_URL` (Railway), `BLOB_READ_WRITE_TOKEN`,
`RESEND_API_KEY`/`RESEND_FROM_EMAIL` are all still empty in the local
environment, and the Drizzle migration (`npm run db:generate && npm run
db:migrate`) hasn't been run against a real database. End-to-end purchase
flow (a real `stripe listen` + test-mode card + webhook + email +
download) has not been exercised — only `npm run build` (confirms the
schema/route changes compile and the rest of the site still prerenders)
and an in-browser smoke test (ebook page renders both tier buttons with
correct prices, form posts to `/api/checkout`, which correctly 500s given
no `STRIPE_SECRET_KEY` locally rather than crashing the page).

## 2026-09-06 — Re-downloaded Cloudinary images to refresh the local mirror

Matched every Cloudinary URL referenced in content frontmatter (`images[].src`,
ebook `coverImage`) against the existing local files in `public/images/` by
basename (stripping Cloudinary transform segments to fetch the original-
quality asset, not the web-optimized thumbnail variant used inline), then
re-downloaded and overwrote each match. 102 files matched; only 2 actually
changed (`ebooks/its-not-magic-code.png`, `ebooks/its-not-scary-debug.png` —
their local copies were stale/incorrect covers, now fixed to match the real
current Cloudinary asset). Everything else was already byte-equivalent to
its Cloudinary source, so this mostly confirmed the existing mirror rather
than replacing it wholesale.

**58 local files have no Cloudinary equivalent in the migrated content** and
were left untouched — legacy assets from before the Cloudinary migration
(plain-slug names like `b4-admin-template.png`, `color-palettes.png`,
`the-beloveds-blog.png` in `public/images/projects/`), a few extra
screenshot variants not referenced in the final published frontmatter (some
`getting-started-with-canva` and `how-to-bold-italicize...whatsapp` numbered
images), and one literal `fem/placeholder.png`. Full match/skip list in
`_internal-docs/cloudinary-download-report.json`.


> Reference for design/colour: **davdevs-laravel** — but specifically its
> **real dynamic templates** (`resources/views/layouts/site.blade.php`,
> `site/home.blade.php`, `site/listing.blade.php`, `site/entry-detail.blade.php`,
> `site/ebooks.blade.php`, `site/publication-detail.blade.php`, `site/partials/
> ebook-card.blade.php`), not the `resources/views/static/*` files. See the
> 2026-09-06 "design-reference correction" entry below for why that distinction
> matters — the two are not interchangeable, and iteration 1 got this wrong.

## 2026-09-06 — Design-reference correction (post-iteration-5)

The user shared a screenshot of the actual intended home page. It didn't
match what iterations 1–5 had built at all: a plain centered hero, E-Books
pinned first then one section per content type, and simple hairline-grid
cards with no tags/like-counts/date-boxes/featured-spanning-tiles/year-
dividers/sidebar filters.

**Root cause**: iteration 1 read `davdevs-laravel/resources/views/static/
home.blade.php` (and its listing/post-detail/ebook-detail siblings) and
treated it as the design spec. That folder is early design-exploration
mockups with dummy placeholder data — visually elaborate (stats bar,
category strip, featured 2-col cards, sidebar tag clouds, sticky TOC
rails) — but it is **not what the Laravel app actually serves**. The real
production templates live in `resources/views/site/*.blade.php` (home,
listing, entry-detail, ebooks, publication-detail) and
`resources/views/layouts/site.blade.php` (the real nav/footer), and they're
much simpler. Nobody had actually looked at those files before this
correction — `layouts/site.blade.php` was read in iteration 1 for the nav
JS behaviour, but its plain CSS-in-`style=""` markup for the actual card
grids was never compared against what got built.

**What this also surfaced and fixed:**
- **Nav has 10 items, not 8** — Sermon and Template *are* real
  `content_types` rows (with `listed=true`) even though neither has
  migrated content; the live nav lists them with empty listing pages
  ("No entries found."), it doesn't hide them. `EMPTY_TYPES` in
  `src/lib/content.ts` now models this, and `/sermon` + `/template` render
  the same empty state as the source.
- **Date format was wrong**: iteration 1 used a day-month-year style
  (`28 Jun 2026`) copied from the static mockup. The real format (`$date->
  format('M j, Y')`) is `Jun 18, 2024` — fixed in `formatDate()`.
- **Wordmark is `~/dav/devs`**, not `dav/devs` — fixed in `Nav.astro`/
  `Footer.astro`.
- **Cards never show tags or like counts** on home/listing — only the
  detail page does. Removed both from the card component.
- **Footer Lighthouse badges are a plain text line** (`perf X · a11y Y ·
  seo Z`), not boxed badges — fixed in `Footer.astro`.
- **Like button is a plain `♥` glyph + count**, not an SVG-icon pill.
  **Share row is plain text links**, not bordered buttons. Both simplified
  to match `entry-detail.blade.php` exactly.

**Rebuilt**: `Nav.astro`, `Footer.astro`, `LikeButton.astro` (simplified),
`ShareRow.astro` (simplified), new `EntryCard.astro` (replaces `PostCard.astro`
+ `PostRow.astro` + `DateBox.astro`, all deleted — home and listing now share
one card component, matching the source's actual behaviour of reusing the
same markup in both places), `index.astro`, `[type]/index.astro`,
`[type]/[slug].astro`, `ebooks/index.astro`, `ebooks/[slug].astro`.
`src/lib/content.ts` reworked (`TYPE_LABELS`/`LISTING_TYPES`/`EMPTY_TYPES`
replace the old `BLOG_TYPE_LABELS*`).

Verified in-browser against the corrected reference: home (E-Books section
with real cover art, Article/etc. sections in matching grid style), an
article listing page, an article detail page, `/sermon` (empty state),
an ebook detail page (cover image, buy button), `/tool` listing (13 tools
in the same grid, including the trailing-empty-cell effect the reference
screenshot showed). Build stays clean (139 pages — the two new empty
listing routes).

**Lesson for future work on this repo**: when davdevs-laravel is the
design reference, always check `resources/views/site/*` and
`layouts/site.blade.php` first — those are what's actually live.
`resources/views/static/*` is historical design exploration and should
not be trusted without cross-checking against the real dynamic view.

## 2026-09-06 — Iteration 5: README + LICENSE

Replaced the default Astro-starter `README.md` with a real project README
(stack, structure, design-system pointer, known deviations summary, links
into `_internal-docs/`). Added `LICENSE` (MIT, © Davina Leong).

### Where this leaves the rebuild

Everything achievable **without live infrastructure/account access** from
`01-milestones.md` Phases 0–11 is done: project setup, full design-system
port, home/listing/detail pages for all 6 blog types, e-book pages, all 13
interactive tool islands, `⌘K` search, the Funny page's reveal behaviour,
SEO metadata + sitemap + JSON-LD, privacy/cookie-banner (adapted honestly
for a static build), and the Lighthouse-badge UI (placeholder values).
Verified via a clean production build (137 pages) plus repeated in-browser
testing (desktop, mobile, light/dark theme, all 13 tools, search, the joke
reveal timer).

**Phases 12–13 (domain cutover, cross-browser/device matrix, live
Lighthouse audit) remain genuinely blocked** on things this environment
doesn't have: a `davdevs.dev` DNS/hosting account, real devices/browsers
beyond this session's in-app browser, and a deployed URL to audit. These
are documented as manual follow-ups throughout `01-milestones.md` and
`02-test-checklists.md`, not silently skipped — same treatment
davdevs-laravel's own progress doc gave its equivalent infra-gated items.

Everything is pushed to `main` in 5 commits (29a6f2e..HEAD).

## 2026-09-06 — Iteration 4: verified all 13 tool islands

Opened every remaining tool (Timers, Memory Cards, Calculator, Card Miles
Converter, Color Palettes, Color Value Converter, Duplicated Paragraph
Scanner, Easy Password Generator, Natural Language Translator — the 4
from iteration 2 were already verified) in-browser, in both light and
dark theme. All 13/13 render their full UI with zero console errors.
Updated `01-milestones.md` Phase 6 and checklist §6 accordingly.

This closes out the last "not yet verified" item from Phase 6 that was
realistically checkable without deeper per-control interaction testing
(every keyboard shortcut, every game's win/lose path, mobile touch
targets) — those remain genuinely untested, noted rather than assumed.

## 2026-09-06 — Iteration 3: JSON-LD + mobile/light-theme verification

### Done

- **JSON-LD** (`src/lib/jsonld.ts`): `Article` for standard blog entries,
  `SoftwareApplication` for Tool entries, `Book` + `Offer` for ebooks —
  wired into both detail-page templates via `Site.astro`'s existing
  `jsonLd` prop. Spot-checked the raw `<script type="application/ld+json">`
  output in the built HTML for one article and one ebook; both are
  well-formed and carry the right fields (price/currency/checkout URL on
  the ebook's `Offer`).
- **Mobile viewport verified in-browser** (375×812): nav collapses to
  logo + theme toggle with the mobile tab bar taking over navigation
  (home/browse/search/theme), hero and card grids stack to a single
  column, cookie banner remains usable alongside the tab bar.
- **Light theme verified in-browser**: toggling switched the whole page
  to the cream/dark-text palette correctly (backgrounds, tags, hero
  wordmark, cards) — confirms the `[data-theme="light"]` token block is
  wired correctly, not just present in the CSS.

### Not done this iteration

Tablet breakpoint, cross-browser matrix, and the remaining 9 unverified
tools are still open — see Phase 6 notes in `01-milestones.md`.

## 2026-09-06 — Iteration 2: interactive tool islands (Phase 6)

### Done

- **Ported all 13 tool components** from `davdevs-laravel/resources/js/components/*.jsx`
  into `src/components/tools/` (plus their `shared/*` helpers — Button, Input,
  Panel, ToolPanel, Table, DropdownMenu, etc. — and `shared/data/*.json`),
  preserving the exact directory structure so every relative import
  (`./shared/Button`) kept working with zero path edits.
- **Added Tailwind v4** (`tailwindcss` + `@tailwindcss/vite`), which the
  ported components need for their utility classes. Imported only the
  `theme`+`utilities` layers (`src/styles/tailwind-utilities.css`), skipping
  `preflight` so Tailwind's base reset doesn't fight this project's own
  hand-built reset in `tokens.css`. Added a `@custom-variant dark` keyed to
  this site's `[data-theme="dark"]` attribute so ported `dark:` utility
  classes follow the same manual toggle as the rest of the site, instead of
  Tailwind's default `.dark`-class/OS-preference behaviour.
- **Added `lucide-react`, `colord`, `zxcvbn`, `react-qrcode-logo`** — same
  libraries the source components already depend on.
- **Wired tool entries to their island** via `src/components/tools/registry.ts`
  (slug → component map, keyed off each entry's `reactComponent` frontmatter
  field) and `ToolMount.tsx`. Needed a real fix here: Astro's `client:load`
  requires statically resolving which component to hydrate, so
  `TOOL_REGISTRY[slug]` can't be handed to a `client:load` directive directly
  from `.astro` frontmatter (throws `NoMatchingImport`) — `ToolMount` is the
  one statically-imported island Astro hydrates, and it does the dynamic
  lookup internally in React, where that's fine.
- Tool detail pages (`/tool/[slug]`) now render the live widget above the
  existing written instructions.
- **Verified in-browser**: Minesweeper (clicked a cell, board updated
  correctly), QR Code Generator (form + icon render), Password Strength
  Meter (typed a password, zxcvbn scored it "Good" live), Emoji Food Catcher
  (renders its gradient hero + difficulty selector, no console errors).
  Build stays clean (137 pages, no errors) with all islands wired in.

### Not verified yet

The remaining 9 tools (Timers, Memory Cards, Calculator, Card Miles
Converter, Color Palettes, Color Value Converter, Duplicated Paragraph
Scanner, Password Creator, Translator) build without error but haven't
been individually clicked through. Keyboard controls, touch controls, and
mobile-viewport rendering haven't been tested for any tool this session —
the ported code is unmodified from source, so this is about verifying the
port, not re-implementing anything.

## 2026-09-06 — Iteration 1: foundation, content, core pages

### Done

- **Content migrated into `src/`**: moved the pre-extracted collections from
  `_internal-docs/src/{content,data,images}` into `src/content`, `src/data`,
  `public/images`. 126 blog-style entries (article/fem/knowledge-sharing/
  notebook/project/tool) + 4 ebooks, all with real frontmatter from the live
  site crawl.
- **`src/content.config.ts`**: ported the draft schema to Astro 7's Content
  Layer API (`glob()` loader — the installed Astro version removed the
  legacy `type: "content"` collections, so the staged draft needed this
  migration to build at all).
- **Quips ("Funny" page) content**: converted the *Punny Side of Life* joke
  book (`_internal-docs/quips.md`) into 64 individual `src/content/quips/*.md`
  entries matching the `statement` / `qa` discriminated-union schema. This is
  now real content, not the placeholder template.
- **Design tokens** (`src/styles/tokens.css`): fonts (Syne/JetBrains Mono/
  Inter/Lora), full dark+light CSS custom property set, spacing/radius/motion
  tokens — copied directly from davdevs-laravel's design-system docs and
  `resources/css/app.css` (dark-mode `--text-muted`/`--text-faint` values
  taken from the `static/layouts/site.blade.php` mockup, which is the more
  complete/concrete visual reference of the two slightly-diverging sources).
- **Layout & shared components**: `Site.astro` (head/meta/OG/Twitter/JSON-LD,
  theme init script), `Nav.astro` (desktop nav + mobile tab bar), `Footer.astro`,
  `CookieBanner.astro`, `SearchModal.astro`, `Tag.astro`, `DateBox.astro`,
  `LikeButton.astro`, `ShareRow.astro`, `PostCard.astro`, `PostRow.astro`.
- **Pages built and verified in-browser** (dev server + screenshots):
  - Home (`/`): hero with blinking cursor, latest-4 grid per content type +
    "view all", e-books teaser section.
  - Dynamic listing (`/[type]`) and detail (`/[type]/[slug]`) routes for all
    six blog-style collections (article, fem, knowledge-sharing, notebook,
    project, tool) — one pair of route files generates all of them via
    `getStaticPaths`, since they share one schema/template.
  - E-books (`/ebooks`, `/ebooks/[slug]`) — bespoke layout with real cover
    art, pricing tiers linking to the real LemonSqueezy checkout URLs.
  - `/funny` — **implements the requested reveal behaviour**: `statement`
    quips render immediately; `qa` quips show the question first, then
    reveal the punchline after 30s (or immediately on "Show answer") —
    ported from davdevs-laravel's `--duration-joke: 30000ms` token and
    `site/funny.blade.php` countdown behaviour.
  - `/privacy`, custom `/404`.
  - `⌘K`/`Ctrl+K` search modal — client-side substring match over a
    build-time JSON index (`/search-index.json`) of all blog + ebook titles.
- **SEO plumbing**: `@astrojs/sitemap` wired in (`sitemap-index.xml` generates
  on build), `public/robots.txt`, per-page canonical/OG/Twitter meta via
  `Site.astro`, `/ebook` → `/ebooks` redirect.
- **Build verified clean**: `npm run build` → 137 pages, no errors.
- **Two rendering bugs caught and fixed via in-browser testing** (not just
  build success): the search overlay and cookie banner were visible on load
  because a scoped `display: flex` rule outranked the `[hidden]` attribute's
  default `display: none` — fixed with an explicit `[hidden]` override.
  Separately, dynamically-injected search-result markup (built via
  `innerHTML` in a plain `<script>`) never receives Astro's scoped
  `data-astro-cid` attribute, so its styles had to be marked `:global()` to
  actually apply — the match-highlight color rule was silently not
  applying until this fix.

### Deliberate deviations from davdevs-laravel (documented, not silent)

- **Reactions/likes are localStorage-only**, not shared across visitors.
  davdevs-laravel backs likes with a signed HttpOnly cookie + hashed-IP rate
  limiting + a DB-stored count shared by everyone (milestones Phase 8). This
  Astro build is static with no chosen hosting/backend yet (milestones Phase 1
  explicitly defers that decision), so `LikeButton.astro` toggles a per-browser
  count instead. A real shared counter needs a backend (Cloudflare KV/D1,
  Supabase, etc.) — flagging as a hosting decision, not an oversight.
- **`/privacy` content was rewritten, not copied verbatim.** The Laravel
  policy describes the anonymous cookie + hashed-IP + 90-day-log system
  above — none of which exists in this static build. Copying that text
  verbatim would make false claims about what the site does, so the page
  now accurately describes the actual (much simpler) data footprint:
  effectively nothing server-side, localStorage for theme/likes only.
- **Tag colours are hashed, not curated.** davdevs-laravel hand-maps tags to
  amber/teal/coral by meaning (`04-design-system.md`'s Tag Colour System).
  The real migrated content has 100+ free-form tag strings with no such
  mapping, so `tagColor()` in `src/lib/content.ts` assigns one of the three
  colours deterministically by hashing the tag text. Stable across builds,
  not meaning-aware.
- **Lighthouse footer badges are placeholders** (`—`), not real scores — no
  Lighthouse run has been done against this build yet. `src/lib/site-config.ts`
  is the single place to update once real numbers exist.
- **Sermon and Template content types are absent, not missed.** Per
  `_internal-docs/content-extraction-notes.md` (moved from the content
  staging folder): Sermons were excluded from extraction scope entirely, and
  Template had zero live entries to extract. Nav/home only show the 6 blog
  types + E-Books + Funny.
- **No pagination on listing pages.** Every collection is small enough
  (4–29 entries) to render in full; a "load more" control with nothing to
  load would be fake UI, so it was left out rather than built non-functional.
- **No detail-page TOC/right-rail.** The davdevs-laravel *static mockup*
  (not the milestones doc) includes a sticky table-of-contents rail; the
  milestones' own furniture list (kicker/title/tags/body/♥/share) doesn't
  require it, so it was scoped out to keep detail pages to what was asked.

### Not started yet

- **Interactive tool islands** (Phase 6): the 13 tool posts currently render
  as plain markdown instructions with no embedded widget. The React source
  for all of them already exists at
  `C:\laragon\www\davdevs-laravel\resources\js\components\*.jsx` and can be
  ported into Astro/React islands (`@astrojs/react` is already installed and
  configured) — next iteration.
- **Search coverage**: only blog + ebook titles are indexed. Quips are
  intentionally excluded (there's no single canonical URL per quip to link
  to), matching how davdevs-laravel's sitemap generator also excludes them.
- **Real Lighthouse audit** against a deployed build.
- Everything in milestones Phase 12 (domain cutover, DNS/SSL, redirect map
  from `davinaleong.com`) — this needs live registrar/host access this
  environment doesn't have. Documented as a manual follow-up, not attempted.
- Cross-browser/device matrix and screen-reader passes (checklist §12–13) —
  needs real device/AT access beyond this session's in-app browser.

### Verified in-browser (not just "build succeeds")

Home, one article detail page, `/tool` listing, one ebook detail page,
`/funny` (both the countdown and the "Show answer" reveal), and `⌘K` search
(including the match-highlight fix) were all opened and screenshotted in a
real browser this session — see chat history for screenshots. Light-mode
toggle, mobile breakpoints, and the remaining detail pages have not been
individually screenshotted yet.
