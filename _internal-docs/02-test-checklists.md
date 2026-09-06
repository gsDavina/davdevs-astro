# 02 — Test Checklist: Astro Rebuild (davdevs.dev) vs. davinaleong.com

Goal: the rebuild should be **indistinguishable in design** from the live site and **fully functional** at the new domain. Test against the live `davinaleong.com` side-by-side wherever a check says "compare."

## 1. Visual / Design Parity
- [ ] Home page hero and section styling pixel-match the original at desktop, tablet, and mobile widths
- [ ] Typography (font family, sizes, weights, line-height) matches across headings, body text, and the terminal-style wordmark
- [ ] Color palette, spacing, and card styling match for every content-type section on the home page
- [ ] Top nav (all 10 links + `⌘K`) matches spacing, order, and mobile collapse behavior
- [ ] Footer (`~/dav/devs`, `perf · a11y · seo` badge, copyright, Privacy link) matches placement and styling
- [ ] Cookie-notice banner matches copy, placement, and "Got it" dismiss styling
- [ ] Detail-page furniture (kicker line, title, tags, share row, `♥`) matches spacing and iconography

## 2. Navigation & Routing
- [ ] All 10 top-nav links resolve to the correct listing pages
- [ ] "view all →" links on every home-page section go to the correct listing page
- [ ] Every listing page paginates the same way as the original (or shows all items, if that's what the original does)
- [ ] Every detail-page URL slug from the live site has a working equivalent on the new site
- [ ] 404 page renders and matches the original's behavior/copy
- [ ] Internal links (e.g. "← All E-Books") work

## 3. Content Rendering (per type)
- [ ] Article — body, code blocks, images, headings render correctly
- [ ] eBooks — bespoke landing layout renders correctly (see section 5)
- [ ] Frontend Mentor — challenge write-ups render correctly
- [ ] Knowledge Sharing — render correctly, including embedded links/media
- [ ] Notebooks — code/output cells (if applicable) render and are readable
- [ ] Project — render correctly
- [ ] Sermon — scripture references and reflection text render correctly
- [ ] Template — render correctly
- [ ] Tool — instructions + embedded widget both render (see section 6)
- [ ] Funny — render correctly
- [ ] Date and "N min read" values match the source content on every page
- [ ] Tags/categories, where shown, match the original

## 4. Search (⌘K)
- [ ] `⌘K` (Mac) and `Ctrl+K` (Windows/Linux) both open the search palette
- [ ] Search covers all 10 content types and returns relevant results
- [ ] Selecting a result navigates to the correct page
- [ ] Palette is dismissible via `Esc` and click-outside
- [ ] Mobile fallback (tap target for search) works if no keyboard is present

## 5. eBook Pages
- [ ] Each ebook's bespoke layout (cover, blurb, pull-quote, feature grid, pricing) renders correctly
- [ ] Cover images load (Cloudinary or migrated equivalent) at correct resolution/format
- [ ] "Get This Version" buttons link to the correct, unmodified LemonSqueezy checkout URLs
- [ ] Pricing tiers (e.g. Ebook vs. Ebook + Exercise Pack) display the correct SGD amounts
- [ ] `/ebook` and `/ebooks` index pages both work as expected
- [ ] Checkout links still function after the domain cutover (LemonSqueezy is domain-independent — confirm no hardcoded `davinaleong.com` in return/cancel URLs)

## 6. Interactive Tools
- [ ] Emoji Food Catcher: mouse, touch, and keyboard (arrow/A-D) controls all work; pause via space bar works; difficulty modes and power-ups function
- [ ] Minesweeper: full game logic works (reveal, flag, win/lose states)
- [ ] Timers: countdown and elapsed-time modes work, presets and audio alerts fire correctly
- [ ] Memory Cards: card flip, matching, and spaced-repetition/progress tracking work
- [ ] All tools are playable on mobile (touch controls / on-screen buttons render)
- [ ] All tools are responsive across screen sizes

## 7. Reactions / Likes
- [ ] Reacting to a piece of content sets an anonymous cookie (HttpOnly, SameSite=Strict) — verify via browser dev tools
- [ ] Toggling a reaction on/off works and persists on reload
- [ ] No personally identifiable data is stored or transmitted for reactions
- [ ] Reaction counts (if publicly shown) update correctly and match expectations after multiple toggles

## 8. Social Sharing
- [ ] LinkedIn, Facebook, and Threads share links generate correct pre-filled URLs pointing to the **new** `davdevs.dev` URL
- [ ] "Copy link" copies the correct, current-domain URL to clipboard
- [ ] Shared links produce correct OG previews when pasted into LinkedIn/Facebook/Threads/Slack (check on all migrated content types)

## 9. SEO & Metadata
- [ ] Every page has correct `<title>`, meta description, canonical URL (pointing to `davdevs.dev`)
- [ ] OG and Twitter card tags are present and correct per page (title, description, image)
- [ ] `sitemap.xml` exists, is complete, and is reachable
- [ ] `robots.txt` exists and is correctly configured
- [ ] JSON-LD (if used) validates with no errors
- [ ] Old CSRF meta tag is either correctly reproduced (if still needed) or intentionally removed (if it was a Next.js-only artifact) — confirm decision was made, not overlooked

## 10. Privacy & Compliance
- [ ] `/privacy` page content matches the original verbatim (PDPA framing, what's collected/not collected, essential cookies only)
- [ ] Cookie-notice banner copy matches exactly, including the "Learn more" link target
- [ ] No third-party analytics or ad-tracking scripts are present anywhere on the new site (check network tab)
- [ ] Server logs / rate-limiting behavior (hashed IP, 90-day retention) matches stated policy if reactions are implemented

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
- [ ] Item counts on each listing page match the live site's counts
- [ ] Spot-check the 4 "latest" items shown per home-page section against the live site
- [ ] No orphaned/broken internal links introduced during migration
- [ ] No content lost in migration (compare a sample article, sermon, and ebook word-for-word against the extracted source)