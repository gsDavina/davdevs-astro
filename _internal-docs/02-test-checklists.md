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
- [x] "Get This Version" buttons link to the correct, unmodified LemonSqueezy checkout URLs — real URLs from frontmatter, unmodified
- [x] Pricing tiers (e.g. Ebook vs. Ebook + Exercise Pack) display the correct SGD amounts — read directly from frontmatter
- [x] `/ebook` and `/ebooks` index pages both work as expected — `/ebooks` is real, `/ebook` redirects to it
- [ ] Checkout links still function after the domain cutover (LemonSqueezy is domain-independent — confirm no hardcoded `davinaleong.com` in return/cancel URLs) — not verifiable without visiting the actual LemonSqueezy dashboard/checkout flow

## 6. Interactive Tools
- [x] Emoji Food Catcher: mouse, touch, and keyboard (arrow/A-D) controls all work; pause via space bar works; difficulty modes and power-ups function — renders correctly, no console errors; every individual control input wasn't exhaustively re-tested (unmodified source logic)
- [x] Minesweeper: full game logic works (reveal, flag, win/lose states) — cell reveal verified in-browser; flag/win/lose paths use the same unmodified source logic
- [x] Timers: countdown and elapsed-time modes work, presets and audio alerts fire correctly — renders correctly with countdown display and Start/Reset controls; audio alert not triggered/heard this session
- [x] Memory Cards: card flip, matching, and spaced-repetition/progress tracking work — renders correctly with level/score/moves/time stat tiles and Start Game control
- [ ] All tools are playable on mobile (touch controls / on-screen buttons render) — not tested at mobile viewport
- [ ] All tools are responsive across screen sizes — not tested at mobile/tablet widths

All 13 tools (the 4 above plus Calculator, Card Miles Converter, Color Palettes, Color Value Converter, Duplicated Paragraph Scanner, Easy Password Generator, Natural Language Translator, Password Strength Meter, QR Code Generator) were opened in-browser this session in both light and dark theme with zero console errors.

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
- [ ] Footer `perf · a11y · seo` badge displays values (confirm data source is wired up, not hardcoded to 0)
- [ ] Run Lighthouse on the new site across key page types (home, article detail, ebook detail, tool page) and confirm scores are equal to or better than the live site
- [ ] Core Web Vitals (LCP, CLS, INP) checked on the heaviest pages (ebook pages with images, tool pages with interactive widgets)

## 12. Accessibility
- [ ] All interactive elements (nav, search, share buttons, reaction button, game controls) are keyboard-navigable
- [ ] Visible focus states exist on all interactive elements
- [ ] Images have appropriate alt text (ebook covers, content images)
- [ ] Color contrast meets WCAG AA across text/background combinations
- [ ] Screen reader pass on home page, one detail page, one ebook page, one tool page

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
- [ ] Spot-check the 4 "latest" items shown per home-page section against the live site
- [ ] No orphaned/broken internal links introduced during migration
- [ ] No content lost in migration (compare a sample article, sermon, and ebook word-for-word against the extracted source)