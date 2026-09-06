/**
 * Site-wide settings that the Laravel CMS stores in its `settings` table
 * (see davdevs-laravel panel/settings). The Astro rebuild is static, so
 * these live here as a single source of truth instead of a database row.
 */
export const SITE = {
  brandName: 'Dav/Devs',
  copyrightText: `© ${new Date().getFullYear()} Davina Leong`,
  footerLinks: [
    { label: 'GitHub', url: 'https://github.com/davinaleong', target: '_blank' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/davinaleong', target: '_blank' },
  ],
  /**
   * Real Lighthouse scores from a local production-build audit (2026-09-07),
   * not the live deployed davdevs.dev domain — DNS/hosting cutover (Phase 12)
   * hasn't happened yet, so a true "vs. the deployed site" run isn't possible
   * in this environment. Audited home, one article detail, one ebook detail,
   * and one tool page (`astro build` + a static file server on the built
   * `dist/client` output, since the Vercel-adapter output isn't `astro
   * preview`-able directly); full per-page JSON/HTML reports live in
   * `_internal-docs/lighthouse/`. Each figure here is the **minimum** across
   * those four pages, not the best one, so the badge doesn't overstate the
   * site's weakest page (the tool page, with its heavier React-island JS,
   * scores lowest on performance). Re-run and update after any further
   * accessibility/perf fixes or once a real davdevs.dev deploy exists.
   */
  lighthouse: {
    show: true,
    performance: '68',
    accessibility: '95',
    seo: '92',
    bestPractices: '100',
  },
} as const;
