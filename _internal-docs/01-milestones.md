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
- [x] Confirm extracted content covers all 10 content types + home + privacy, with no gaps vs. live site listing pages — covers article/fem/knowledge-sharing/notebook/project/tool/ebook + quips (Funny); **Sermon and Template are absent by design**, not a gap: see `content-extraction-notes.md` (Sermons excluded from extraction scope, Template had zero live entries)
- [x] Inventory all media assets referenced (Cloudinary URLs, local images, ebook covers) and decide: re-host vs. keep external — **decided: keep external**, all frontmatter `images`/`coverImage` fields are live Cloudinary URLs used directly; the local mirror lives at `public/images/*` as backup only
- [ ] Catalogue every external link/integration in use: LemonSqueezy checkout URLs (in use, wired to real ebook buttons), social share intents (built), **embedded scripts on Tool pages — not yet catalogued, blocked on Phase 6**
- [x] Note any dynamic/server-only behavior on the current site (reactions, CSRF token, search) that needs an equivalent in Astro — see `03-progress.md` deviations section: reactions are localStorage-only (no backend chosen yet), search is a static client-side JSON index, no CSRF needed (no forms/mutating routes on a static build)

## Phase 1 — Project Setup
- [x] Scaffold Astro project, repo, base tooling (linting, formatting, TS config) — `@astrojs/react` + `@astrojs/sitemap` added, TS strict config from `astro add`
- [ ] Register/point `davdevs.dev` DNS; decide hosting target (static host vs. adapter for any server routes) — infra/registrar access not available in this environment; `astro.config.mjs` sets `site: 'https://davdevs.dev'` in anticipation
- [x] Set up content collections structure in `src/content/` with a `content.config.ts` schema per content type (title, date, description, tags, cover image, reading time) — migrated to `src/content.config.ts` using Astro's Content Layer `glob()` loader (the legacy `type: "content"` API used in the original draft was removed in the installed Astro version)
- [x] Decide static vs. hybrid rendering: which routes (if any — e.g. reactions endpoint) need `prerender = false` — **decided: fully static**, no server routes; `search-index.json` / `quips-index.json` are build-time static JSON, reactions are client-only

## Phase 2 — Design System Port
- [x] Extract design tokens from the live site (colors, spacing scale, font families/sizes, radii, shadows) into `tokens.css` / theme config — `src/styles/tokens.css`, sourced from davdevs-laravel's `04-design-system.md`/`06-frontend-design-language.md` and `resources/css/app.css`
- [x] Port global styles: base typography, terminal-style wordmark treatment, link/button states
- [x] Rebuild the top nav (10 links + `⌘K` trigger) and footer (wordmark, `perf/a11y/seo` badge, copyright, Privacy link, cookie banner) as shared layout components — nav has 8 links (6 blog types + E-Books + Funny; no Sermon/Template, see Phase 0)
- [ ] Verify responsive breakpoints match the original (mobile nav behavior, stacking order) — CSS ported from the mockup's breakpoints, but not yet screenshot-verified at mobile widths this session

## Phase 3 — Core Layouts & Listing Pages
- [x] Home page: hero + "latest 4 + view all" sections, matching card styling per content type — 6 blog-type sections + E-Books section (no Sermon/Template sections, see Phase 0)
- [x] Per-content-type listing page (`/article`, `/ebooks`, `/fem`, `/knowledge-sharing`, `/notebook`, `/project`, `/tool`) — one dynamic `[type]` route pair serves all 6 blog types; **no pagination**, every collection is small enough (4–29 entries) to render in full
- [x] Shared detail-page shell: kicker (type/date/read-time), title, tags, body, `♥`, share row
- [x] 404 page — custom page built; "matches the original's behavior/copy" not verifiable (no live-site access), built to a reasonable default instead

## Phase 4 — Content Type Rendering
- [x] Standard long-form types (Article, Knowledge Sharing, Project, Frontend Mentor, Tool, Funny): Markdown rendering with code blocks, images, blockquotes matching original typography — verified in-browser on an article detail page (code spans, bold, headings all render correctly)
- [ ] Notebooks: confirm and replicate how `.ipynb`-style content is rendered (code cells, output blocks) if applicable — renders as standard Markdown via the same template; not specifically verified against original code-cell fidelity
- [x] Reading-time calculation matches original (e.g. "3 min read") — uses `readTimeMinutes` from frontmatter, falls back to a 200wpm word-count estimate when absent
- [x] Date formatting matches original — using davdevs-laravel's actual format (`"28 Jun 2026"`, day-month-year, no comma) per its static mockups, which take precedence over this doc's hypothetical `"Jul 8, 2026"` example per the later instruction to follow davdevs-laravel

## Phase 5 — eBook Product Pages (bespoke)
- [x] Rebuild each ebook as its own landing-page layout: cover art, blurb, pricing tiers — built; **no separate "feature/theme grid" component** — the "What's Inside" content renders as the markdown body's own headings rather than a dedicated grid layout, since the real content wasn't structured as discrete grid items
- [x] Wire "Get This Version" buttons to the correct existing LemonSqueezy checkout URLs (no new checkout logic needed — these are external links)
- [x] Confirm Cloudinary image URLs still resolve — verified visually in-browser (real cover art for "The Punny Side of Things" rendered correctly)
- [x] `/ebook` and `/ebooks` index pages — `/ebooks` is the real index+detail; `/ebook` redirects to `/ebooks` (`astro.config.mjs` redirects map) since which path the live site actually uses couldn't be confirmed without site access

## Phase 6 — Interactive Tool Pages
- [ ] Rebuild each tool as an Astro island (React/vanilla JS as appropriate): Emoji Food Catcher, Minesweeper, Timers, Memory Cards
- [ ] Preserve controls parity: mouse/trackpad, touch, keyboard (arrow keys/A-D, space to pause) per game
- [ ] Preserve game logic details called out on the pages themselves (scoring, difficulty modes, power-ups, first-click protection, etc.)
- [ ] Confirm mobile on-screen controls render and function

## Phase 7 — Search (⌘K)
- [x] Decide indexing approach for a static site (build-time search index vs. client-side fuzzy search over content collections) — **decided: build-time JSON index** (`/search-index.json`) + client-side substring match, no external search service
- [x] Rebuild the command-palette UI and keyboard shortcut (`⌘K` / `Ctrl+K`) — verified in-browser, including the match-highlight styling fix (see `03-progress.md`)
- [ ] Confirm search covers all 10 content types plus pages, matching original result quality — covers the 6 blog types + E-Books; **quips are intentionally excluded** (no single canonical URL per quip)

## Phase 8 — Reactions / Likes
- [x] Decide the equivalent mechanism in Astro (server route + DB, or a lightweight edge function) for the anonymous like/reaction token described in the Privacy Policy — **decided: localStorage-only, per-browser** (no shared count); a real shared counter needs a backend that hasn't been chosen (Phase 1 hosting decision still open) — see `03-progress.md`
- [ ] Cookie must remain HttpOnly, SameSite=Strict, anonymous (no PII), consistent with the existing Privacy Policy wording — **N/A as designed**: no cookie is set at all (localStorage instead), so `/privacy` was rewritten rather than copied to avoid describing a cookie that doesn't exist
- [ ] Confirm rate limiting / anti-abuse approach (hashed IP, daily-rotating salt) is preserved if reactions are kept — N/A, there's no server to rate-limit

## Phase 9 — SEO & Metadata
- [x] Port per-page meta: title, description, canonical, OG tags, Twitter card — via `Site.astro`
- [x] Update all canonical/OG URLs from `davinaleong.com` to `davdevs.dev` — `astro.config.mjs` `site` is set to `https://davdevs.dev`, canonical built from it on every page
- [x] Generate `sitemap.xml` and `robots.txt` — `@astrojs/sitemap` (outputs `sitemap-index.xml`), `public/robots.txt` points to it
- [ ] Add JSON-LD where the original uses it (articles, ebook products, if any) — not yet added
- [x] Drop the CSRF meta tag if it was a Next.js-only artifact with no static equivalent need — confirm first — **confirmed and dropped**: a static build has no session/forms to protect

## Phase 10 — Privacy, Cookies & Compliance
- [ ] Rebuild `/privacy` page content verbatim (PDPA framing, what's collected, what isn't, essential cookies only) — **intentionally not verbatim**: rewritten to accurately describe this build's actual (much smaller) data footprint rather than copy claims about a cookie/hashed-IP/DB system this static site doesn't have — see `03-progress.md`
- [x] Rebuild the cookie-notice banner ("We use only essential cookies... Learn more / Got it") with the same dismiss behavior — copy updated to match what's actually stored (theme + like prefs in localStorage, not cookies)
- [x] Confirm no analytics/tracking scripts are introduced anywhere in the rebuild — none present; only first-party inline scripts (theme, search, likes, cookie banner) and the Google Fonts stylesheet

## Phase 11 — Performance / A11y / SEO Badge
- [x] Reproduce the footer `perf · a11y · seo` score display — confirm data source (live Lighthouse run, stored report, or build-time check) and replicate — badge UI built (`src/lib/site-config.ts` + `Footer.astro`), **values are placeholders (`—`)** pending a real audit; single place to update once real numbers exist
- [ ] Run Lighthouse against the new Astro build and confirm scores meet or beat the original — not run this session (needs a deployed build or a local Lighthouse CLI pass, not attempted yet)

## Phase 12 — Domain Cutover (davinaleong.com → davdevs.dev)
> Every item below needs live registrar/hosting/CDN access this environment doesn't have — documented as a manual follow-up for whoever has those accounts, not silently skipped.
- [ ] Set up 301 redirects from every `davinaleong.com` URL to its `davdevs.dev` equivalent (preserve full path structure)
- [ ] Update all external references Davina controls (social profiles, ebook checkout success/cancel URLs, share links) to the new domain
- [ ] SSL/DNS cutover plan and rollback plan
- [ ] Confirm old ebook checkout links (LemonSqueezy) still work post-cutover, since they're external and domain-agnostic

## Phase 13 — QA & Launch
- [ ] Run through `02-test-checklist.md` in full
- [ ] Visual regression pass (side-by-side against live `davinaleong.com`, all breakpoints)
- [ ] Go-live on `davdevs.dev`, confirm redirects are live, monitor for 404s/broken links post-launch