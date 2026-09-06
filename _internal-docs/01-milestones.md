# 01 — Milestones: Dav/Devs → Astro (davdevs.dev)

Rebuild of **davinaleong.com** ("~/dav/devs", currently Next.js + MDX) as a new **Astro** site at **davdevs.dev**. Content has already been extracted; this plan covers structure, design parity, and functionality porting only.

**Design goal: pixel-for-pixel parity.** No redesign, no re-flowing of layouts, no new color/type scale. If something looks different from the live site, that's a bug, not a design decision.

## Site inventory (from crawl of davinaleong.com)

- **Nav / brand:** terminal-style wordmark `~/dav/devs`, top nav with `Article`, `eBooks`, `Frontend Mentor`, `Knowledge Sharing`, `Notebooks`, `Project`, `Sermon`, `Template`, `Tool`, `Funny`, plus a `⌘K` search trigger.
- **Home page:** hero (`# ~/dav/devs _` + tagline), then one section per content type showing the latest 4 items with a "view all →" link.
- **Content types (10):** Article, eBooks, Frontend Mentor (fem), Knowledge Sharing, Notebooks, Project, Sermon, Template, Tool, Funny. Each has a listing page + detail page.
- **Detail page furniture:** kicker line (`Type · Date · N min read`), title, tags, body, `♥`, social share row (LinkedIn, Facebook, Threads, Copy link).
- **eBooks are bespoke:** each product page (e.g. `/ebooks/its-not-scary-debug`) is a one-off landing page — cover art (Cloudinary), blurb, pull-quote, "what's inside" feature grid, pricing tiers, external checkout links to LemonSqueezy.
- **Tools are interactive:** each `/tool/*` page embeds a playable widget (Emoji Food Catcher, Minesweeper, Timers, Memory Cards) alongside written instructions.
- **Footer:** wordmark repeat, `perf · a11y · seo` score badge, copyright, Privacy link, and an essential-cookies notice banner ("Got it" dismiss).
- **Privacy page:** PDPA-oriented policy — anonymous like/reaction token cookie, hashed-IP rate limiting, 90-day server logs, no analytics/ad trackers.
- **Reactions:** anonymous per-content like/reaction, backed by a cookie token (no login required).
- **SEO:** canonical URLs, OG + Twitter card meta per page, CSRF token present in page meta (confirm whether this is needed in the static Astro rebuild or was a Next.js-only artifact).

---

## Phase 0 — Discovery & Content Audit
- [ ] Confirm extracted content covers all 10 content types + home + privacy, with no gaps vs. live site listing pages
- [ ] Inventory all media assets referenced (Cloudinary URLs, local images, ebook covers) and decide: re-host vs. keep external
- [ ] Catalogue every external link/integration in use: LemonSqueezy checkout URLs, social share intents, any embedded scripts on Tool pages
- [ ] Note any dynamic/server-only behavior on the current site (reactions, CSRF token, search) that needs an equivalent in Astro

## Phase 1 — Project Setup
- [ ] Scaffold Astro project, repo, base tooling (linting, formatting, TS config)
- [ ] Register/point `davdevs.dev` DNS; decide hosting target (static host vs. adapter for any server routes)
- [ ] Set up content collections structure in `src/content/` with a `content.config.ts` schema per content type (title, date, description, tags, cover image, reading time)
- [ ] Decide static vs. hybrid rendering: which routes (if any — e.g. reactions endpoint) need `prerender = false`

## Phase 2 — Design System Port
- [ ] Extract design tokens from the live site (colors, spacing scale, font families/sizes, radii, shadows) into `tokens.css` / theme config
- [ ] Port global styles: base typography, terminal-style wordmark treatment, link/button states
- [ ] Rebuild the top nav (10 links + `⌘K` trigger) and footer (wordmark, `perf/a11y/seo` badge, copyright, Privacy link, cookie banner) as shared layout components
- [ ] Verify responsive breakpoints match the original (mobile nav behavior, stacking order)

## Phase 3 — Core Layouts & Listing Pages
- [ ] Home page: hero + 10 "latest 4 + view all" sections, matching card styling per content type
- [ ] Per-content-type listing page (`/article`, `/ebook`, `/fem`, `/knowledge-sharing`, `/notebook`, `/project`, `/sermon`, `/template`, `/tool`, `/funny`) with pagination if the original paginates
- [ ] Shared detail-page shell: kicker (type/date/read-time), title, tags, body, `♥`, share row
- [ ] 404 page (verify what the original shows)

## Phase 4 — Content Type Rendering
- [ ] Standard long-form types (Article, Knowledge Sharing, Project, Sermon, Frontend Mentor, Template, Funny): Markdown/MDX rendering with code blocks, images, blockquotes matching original typography
- [ ] Notebooks: confirm and replicate how `.ipynb`-style content is rendered (code cells, output blocks) if applicable
- [ ] Reading-time calculation matches original (e.g. "3 min read")
- [ ] Date formatting matches original (e.g. "Jul 8, 2026")

## Phase 5 — eBook Product Pages (bespoke)
- [ ] Rebuild each ebook as its own landing-page layout: cover art, blurb, pull-quote, feature/theme grid, pricing tiers
- [ ] Wire "Get This Version" buttons to the correct existing LemonSqueezy checkout URLs (no new checkout logic needed — these are external links)
- [ ] Confirm Cloudinary image URLs still resolve, or plan migration to Astro's image pipeline if re-hosting
- [ ] `/ebook` and `/ebooks` index pages (confirm both paths are in use and what each shows)

## Phase 6 — Interactive Tool Pages
- [ ] Rebuild each tool as an Astro island (React/vanilla JS as appropriate): Emoji Food Catcher, Minesweeper, Timers, Memory Cards
- [ ] Preserve controls parity: mouse/trackpad, touch, keyboard (arrow keys/A-D, space to pause) per game
- [ ] Preserve game logic details called out on the pages themselves (scoring, difficulty modes, power-ups, first-click protection, etc.)
- [ ] Confirm mobile on-screen controls render and function

## Phase 7 — Search (⌘K)
- [ ] Decide indexing approach for a static site (build-time search index vs. client-side fuzzy search over content collections)
- [ ] Rebuild the command-palette UI and keyboard shortcut (`⌘K` / `Ctrl+K`)
- [ ] Confirm search covers all 10 content types plus pages, matching original result quality

## Phase 8 — Reactions / Likes
- [ ] Decide the equivalent mechanism in Astro (server route + DB, or a lightweight edge function) for the anonymous like/reaction token described in the Privacy Policy
- [ ] Cookie must remain HttpOnly, SameSite=Strict, anonymous (no PII), consistent with the existing Privacy Policy wording
- [ ] Confirm rate limiting / anti-abuse approach (hashed IP, daily-rotating salt) is preserved if reactions are kept

## Phase 9 — SEO & Metadata
- [ ] Port per-page meta: title, description, canonical, OG tags, Twitter card
- [ ] Update all canonical/OG URLs from `davinaleong.com` to `davdevs.dev`
- [ ] Generate `sitemap.xml` and `robots.txt`
- [ ] Add JSON-LD where the original uses it (articles, ebook products, if any)
- [ ] Drop the CSRF meta tag if it was a Next.js-only artifact with no static equivalent need — confirm first

## Phase 10 — Privacy, Cookies & Compliance
- [ ] Rebuild `/privacy` page content verbatim (PDPA framing, what's collected, what isn't, essential cookies only)
- [ ] Rebuild the cookie-notice banner ("We use only essential cookies... Learn more / Got it") with the same dismiss behavior
- [ ] Confirm no analytics/tracking scripts are introduced anywhere in the rebuild

## Phase 11 — Performance / A11y / SEO Badge
- [ ] Reproduce the footer `perf · a11y · seo` score display — confirm data source (live Lighthouse run, stored report, or build-time check) and replicate
- [ ] Run Lighthouse against the new Astro build and confirm scores meet or beat the original

## Phase 12 — Domain Cutover (davinaleong.com → davdevs.dev)
- [ ] Set up 301 redirects from every `davinaleong.com` URL to its `davdevs.dev` equivalent (preserve full path structure)
- [ ] Update all external references Davina controls (social profiles, ebook checkout success/cancel URLs, share links) to the new domain
- [ ] SSL/DNS cutover plan and rollback plan
- [ ] Confirm old ebook checkout links (LemonSqueezy) still work post-cutover, since they're external and domain-agnostic

## Phase 13 — QA & Launch
- [ ] Run through `02-test-checklist.md` in full
- [ ] Visual regression pass (side-by-side against live `davinaleong.com`, all breakpoints)
- [ ] Go-live on `davdevs.dev`, confirm redirects are live, monitor for 404s/broken links post-launch