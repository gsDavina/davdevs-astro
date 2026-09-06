# Progress

> Reference for design/colour: **davdevs-laravel** (`_internal-docs/04-design-system.md`,
> `06-frontend-design-language.md`, and the pixel-accurate `resources/views/static/*`
> mockup templates) — not a pixel-diff against the live `davinaleong.com`. Where the
> two would conflict, davdevs-laravel wins per instruction.

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
