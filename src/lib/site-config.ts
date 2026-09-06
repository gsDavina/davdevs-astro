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
   * Placeholder Lighthouse scores. The Laravel CMS wires these to a stored
   * report (see 01-milestones.md Phase 11); no live Lighthouse run exists
   * for this Astro build yet, so these are marked pending rather than
   * invented as real scores. Update once a real audit runs against the
   * deployed davdevs.dev build.
   */
  lighthouse: {
    show: true,
    performance: '—',
    accessibility: '—',
    seo: '—',
    bestPractices: '—',
  },
} as const;
