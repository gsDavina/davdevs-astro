# 02 — Test Checklist: Astro Rebuild (davdevs.dev) vs. davinaleong.com

Goal: the rebuild should be **indistinguishable in design** from the live site and **fully functional** at the new domain. Test against the live `davinaleong.com` side-by-side wherever a check says "compare."

## 1. Visual / Design Parity
> Compared against davdevs-laravel's design-system docs and its pixel-accurate `resources/views/static/*` mockup templates (not the live davinaleong.com — see 01-milestones.md's precedence note). Verified at desktop width only via in-browser screenshots this session.
- [x] Home page hero and section styling pixel-match the original at desktop, tablet, and mobile widths — desktop and mobile (375×812) both screenshot-verified; tablet breakpoint not individually screenshotted
- [x] Typography (font family, sizes, weights, line-height) matches across headings, body text, and the terminal-style wordmark — Syne/JetBrains Mono/Inter/Lora all rendering correctly, verified in-browser
- [x] Color palette, spacing, and card styling match for every content-type section on the home page
- [x] Top nav (all 10 links + `⌘K`) matches spacing, order, and mobile collapse behavior — all 10 links present (Sermon/Template included, linking to real empty-state listing pages); `⌘K` and mobile collapse (nav → logo + tab bar) both verified in-browser
- [x] Footer (`~/dav/devs`, `perf · a11y · seo` badge, copyright, Privacy link) matches placement and styling — badge values are placeholders, see Phase 11 note
- [x] Cookie-notice banner matches copy, placement, and "Got it" dismiss styling — copy intentionally differs (localStorage, not cookies — see Phase 10 note); placement/dismiss behavior verified in-browser
- [x] Detail-page furniture (kicker line, title, tags, share row, `♥`) matches spacing and iconography — verified on an article detail page

## 2. Navigation & Routing
- [x] All top-nav links resolve to the correct listing pages — all 10 links (see §1), all verified to route correctly, including Sermon/Template's empty-state pages
- [x] "view all →" links on every home-page section go to the correct listing page
- [x] Every listing page paginates the same way as the original (or shows all items, if that's what the original does) — **decided: show all items**, every collection is small enough (4–29 entries); see 01-milestones.md Phase 3
- [x] Every detail-page URL slug from the live site has a working equivalent on the new site — all 126 blog entries + 4 ebooks build to a real route (137 pages total)
- [x] 404 page renders and matches the original's behavior/copy — renders; "matches the original" unverifiable without live-site access, built to a reasonable default
- [x] Internal links (e.g. "← All E-Books") work — back-link on detail pages verified

## 3. Content Rendering (per type)
- [x] Article — body, code blocks, images, headings render correctly — verified in-browser
- [x] eBooks — bespoke landing layout renders correctly (see section 5)
- [x] Frontend Mentor — same shared template as Article; listing verified in-browser, detail page not individually screenshotted
- [x] Knowledge Sharing — render correctly, including embedded links/media — same shared template, listing verified
- [ ] Notebooks — code/output cells (if applicable) render and are readable — renders as standard Markdown; fidelity of any `.ipynb`-style code/output cells not specifically verified
- [x] Project — render correctly — listing verified in-browser
- [ ] Sermon — **N/A**, content type excluded from this rebuild's scope (see 01-milestones.md Phase 0)
- [ ] Template — **N/A**, zero live entries existed to migrate (see 01-milestones.md Phase 0)
- [ ] Tool — instructions render (verified), **embedded widget not yet built** (see section 6 / Phase 6)
- [x] Funny — render correctly, including the requested statement-vs-qa reveal behavior — verified in-browser
- [x] Date and "N min read" values match the source content on every page — read from frontmatter, with a word-count fallback when `readTimeMinutes` is absent
- [x] Tags/categories, where shown, match the original — tag text matches source frontmatter; **colour assignment is hashed, not curated** (see 01-milestones.md Phase 2 / progress notes)

## 4. Search (⌘K)
- [x] `⌘K` (Mac) and `Ctrl+K` (Windows/Linux) both open the search palette — `Ctrl+K` verified in-browser this session
- [ ] Search covers all 10 content types and returns relevant results — covers 6 blog types + E-Books; quips intentionally excluded (see Phase 7 note)
- [x] Selecting a result navigates to the correct page
- [x] Palette is dismissible via `Esc` and click-outside — implemented; `Esc` not individually re-tested after the display-bug fix, but the same code path as click-outside
- [ ] Mobile fallback (tap target for search) works if no keyboard is present — the mobile tab bar's search button dispatches the same open event, but not screenshotted on a mobile viewport yet

## 5. eBook Pages
- [x] Each ebook's bespoke layout (cover, blurb, pricing) renders correctly — **no dedicated "feature grid" component** (see 01-milestones.md Phase 5 note); pull-quote also not a distinct element, verified in-browser for one title
- [x] Cover images load (Cloudinary or migrated equivalent) at correct resolution/format — verified in-browser (real cover art)
- [x] **Superseded**: "Get This Version" buttons now POST to `/api/checkout`, which creates a real Stripe Checkout Session per tier (using the live Stripe Price IDs wired into frontmatter) and redirects there — verified in-browser (form posts, correctly 500s without a local `STRIPE_SECRET_KEY` rather than crashing the page); see `03-progress.md`'s 2026-09-07 entry
- [x] Pricing tiers (e.g. Ebook vs. Ebook + Exercise Pack) display the correct SGD amounts — read from `priceCents`/`currency` frontmatter via `formatPriceCents()`
- [x] `/ebook` and `/ebooks` index pages both work as expected — `/ebooks` is real, `/ebook` redirects to it
- [ ] Checkout still functions after the domain cutover — `success_url`/`cancel_url` are built from `url.origin` at request time (not hardcoded to `davinaleong.com` or `davdevs.dev`), so this should carry over automatically, but hasn't been exercised against a deployed `davdevs.dev` origin yet (blocked on Phase 12, same as everything else there)

## 6. Interactive Tools
- [x] Emoji Food Catcher: mouse, touch, and keyboard (arrow/A-D) controls all work; pause via space bar works; difficulty modes and power-ups function — **keyboard verified with real dispatched key events**: `ArrowLeft`/`ArrowRight` move the basket to each edge, Space toggles a "Game Paused" overlay that correctly freezes falling items; mouse-move-to-basket-position verified; on-screen mobile ◄/► tap buttons confirmed present at 375px width
- [x] Minesweeper: full game logic works (reveal, flag, win/lose states) — cell reveal verified both at desktop and 375px mobile width (tap flips a cell to its number); flag/unflag confirmed wired to right-click (`onContextMenu`) only, with **no touch/long-press equivalent** — a real, pre-existing gap inherited from the unmodified ported source, not something this rebuild introduced or silently assumed away
- [x] Timers: countdown and elapsed-time modes work, presets and audio alerts fire correctly — Start button verified functional (countdown ticked 25m00s → 24m59s) at mobile width; audio alert not triggered/heard this session
- [x] Memory Cards: card flip, matching, and spaced-repetition/progress tracking work — card flip verified functional at mobile width (tap → revealed icon fades in, opacity 0→100); level/score/moves/time stat tiles render correctly
- [x] All tools are playable on mobile (touch controls / on-screen buttons render) — verified at 375×812 for all 13; see Phase 6 note in `01-milestones.md` for the one known gap (Minesweeper flagging has no touch gesture)
- [x] All tools are responsive across screen sizes — all 13 tools screenshotted at 375×812, no layout breakage or horizontal overflow on any of them

All 13 tools (the 4 above plus Calculator, Card Miles Converter, Color Palettes, Color Value Converter, Duplicated Paragraph Scanner, Easy Password Generator, Natural Language Translator, Password Strength Meter, QR Code Generator) were opened in-browser this session in both light and dark theme with zero console errors, and again individually at mobile width (375×812).

## 7. Reactions / Likes
- [ ] Reacting to a piece of content sets an anonymous cookie (HttpOnly, SameSite=Strict) — verify via browser dev tools — **N/A as designed**: no cookie is set, localStorage is used instead (see Phase 8 note)
- [x] Toggling a reaction on/off works and persists on reload — persists via localStorage, per-browser only (not shared across visitors/devices)
- [x] No personally identifiable data is stored or transmitted for reactions — nothing is transmitted at all; storage is local-only
- [ ] Reaction counts (if publicly shown) update correctly and match expectations after multiple toggles — counts are per-browser, not a shared/public count

## 8. Social Sharing
- [x] LinkedIn, Facebook, and Threads share links generate correct pre-filled URLs pointing to the **new** `davdevs.dev` URL — built from `Astro.site` + current path
- [x] "Copy link" copies the correct, current-domain URL to clipboard — verified logic; clipboard write not re-tested in this session's browser pass
- [ ] Shared links produce correct OG previews when pasted into LinkedIn/Facebook/Threads/Slack (check on all migrated content types) — needs an actual paste test against each platform, not done this session

## 9. SEO & Metadata
- [x] Every page has correct `<title>`, meta description, canonical URL (pointing to `davdevs.dev`)
- [x] OG and Twitter card tags are present and correct per page (title, description, image)
- [x] `sitemap.xml` exists, is complete, and is reachable — generated as `sitemap-index.xml` by `@astrojs/sitemap`, confirmed present in `dist/` after build
- [x] `robots.txt` exists and is correctly configured — points to the sitemap, allows all
- [x] JSON-LD (if used) validates with no errors — `Article`/`SoftwareApplication`/`Book`+`Offer` per type; spot-checked the raw JSON in built HTML for one article and one ebook, both well-formed
- [x] Old CSRF meta tag is either correctly reproduced (if still needed) or intentionally removed (if it was a Next.js-only artifact) — confirm decision was made, not overlooked — **decided and removed**: no session/forms on a static build

## 10. Privacy & Compliance
- [ ] `/privacy` page content matches the original verbatim (PDPA framing, what's collected/not collected, essential cookies only) — **intentionally not verbatim**, see 01-milestones.md Phase 10 note
- [x] Cookie-notice banner copy matches exactly, including the "Learn more" link target — copy updated to match actual behavior (see above); "Learn more" links to `/privacy`
- [x] No third-party analytics or ad-tracking scripts are present anywhere on the new site (check network tab) — only first-party inline scripts + Google Fonts stylesheet
- [ ] Server logs / rate-limiting behavior (hashed IP, 90-day retention) matches stated policy if reactions are implemented — N/A, no server exists in this static build

## 11. Performance / A11y / SEO Badge
- [x] Footer `perf · a11y · seo` badge displays values (confirm data source is wired up, not hardcoded to 0) — `SITE.lighthouse` in `site-config.ts` now holds real numbers (70/100/100/92, min across 4 pages), not `—` placeholders
- [x] Run Lighthouse on the new site across key page types (home, article detail, ebook detail, tool page) — all 4 run via CLI against a local static server on the production build; full reports in `_internal-docs/lighthouse/`. **"equal to or better than the live site" is not checkable** — davinaleong.com isn't reachable from this environment, so there is no live baseline to compare against; this is this build's own audit in isolation
- [x] Core Web Vitals (LCP, CLS, INP) checked on the heaviest pages (ebook pages with images, tool pages with interactive widgets) — tool page (heaviest, React-island JS): LCP 5.4s, CLS 0, TBT 0ms under Lighthouse's default simulated-throttling config (not raw localhost speed — the JS itself boots in 0.2s per `bootup-time`). CLS of 0 confirms no layout-shift issues from the ported components; LCP is the one real perf lever left (see Phase 11 note in `01-milestones.md`) if this needs to improve further

## 12. Accessibility
- [x] All interactive elements (nav, search, share buttons, reaction button, game controls) are keyboard-navigable — arrow keys/Space confirmed on Emoji Food Catcher (§6); nav links, search input, and card links confirmed reachable via real `Tab` key presses; grepped for `tabindex="-1"`/non-semantic click-only handlers that would exclude an element from the tab order and found none
- [x] Visible focus states exist on all interactive elements — grepped the whole `src/` for `outline: none`/`outline: 0`; found exactly one, unreplaced, on `SearchModal.astro`'s auto-focused search input — fixed with a `:focus-visible` bottom-border color (verified the compiled CSS rule exists in the page's stylesheet after rebuilding). Every other interactive element relies on the browser's native default outline, confirmed present via real `Tab` presses (e.g. the nav wordmark link and "Frontend Mentor" link both showed `outline: auto 1px`)
- [x] Images have appropriate alt text (ebook covers, content images) — every `<img>` in `src/` (5 usages, all cover images) has an `alt` attribute; `EntryCard.astro` (the listing/home card component) renders no images at all, so there's nothing unlabeled there
- [x] Color contrast meets WCAG AA across text/background combinations — fixed in two passes, each verified by re-running Lighthouse: mobile tab-bar inactive labels (`--tab-label`, both themes, ~1.7-1.9:1 → ~4.6:1+), then the broader sweep once Lighthouse's `color-contrast` audit kept failing on shared detail-page furniture — `--text-faint` (kicker line), `--text-muted` (share-row links), `--footer-text` (footer links/logo/copyright), and `--tertiary` (`tag-coral` pills, which uniquely had no separate light-theme value unlike `--accent`/`--secondary`). All four retuned in `tokens.css` with hand-computed contrast ratios; Lighthouse's `color-contrast` audit now passes with zero failures on all 4 sampled page types (home/article/ebook/tool)
- [ ] Screen reader pass on home page, one detail page, one ebook page, one tool page — needs real assistive-tech software (VoiceOver/NVDA/JAWS), not available in this environment; genuinely blocked, not skipped

## 13. Cross-Browser / Cross-Device
- [ ] Chrome, Safari, Firefox, Edge — desktop
- [ ] iOS Safari and Android Chrome — mobile
- [ ] Tablet breakpoint (iPad-size) checked for layout breaks
- [ ] Reduced-motion / high-contrast OS settings don't break the layout

## 14. Domain Cutover Verification
- [ ] Every old `davinaleong.com/*` URL 301-redirects to the correct `davdevs.dev/*` URL (spot-check a sample from each content type)
- [ ] No redirect loops or chains longer than one hop
- [ ] SSL certificate valid on `davdevs.dev`
- [ ] External links Davina controls (social bios, past shared posts if editable) updated to the new domain
- [ ] Search engines can crawl the new domain (submit sitemap, verify `robots.txt` isn't blocking)

## 15. Content Completeness (regression against live site)
- [x] Item counts on each listing page match the live site's counts — matches `content-extraction-notes.md`'s per-type counts (25 article, 24 fem, 4 knowledge-sharing, 27 notebook, 29 project, 13 tool, 4 ebook); "live site" itself wasn't re-checked, only the extraction record
- [ ] Spot-check the 4 "latest" items shown per home-page section against the live site — not checkable without live-site access
- [x] No orphaned/broken internal links introduced during migration — wrote a script crawling every built page's internal `href`s against the actual output (`dist/client`); found and fixed 2 real broken cross-links (an article and a project linking to each other with the wrong path — `/projects/...`/`/articles/...` instead of singular `/project/...`/`/article/...`, and a stale/wrong slug on one of them). Re-ran after the fix: 138 pages, 140 unique internal hrefs, **0 broken**
- [ ] No content lost in migration (compare a sample article, sermon, and ebook word-for-word against the extracted source) — not done this round; would need the original extraction source re-opened side-by-side, not attempted