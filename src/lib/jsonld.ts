import type { BlogEntry, BlogType } from './content';
import type { CollectionEntry } from 'astro:content';

/**
 * JSON-LD builders matching what davdevs-laravel's SiteLayout component
 * renders per content type (Article default, SoftwareApplication for
 * Tool, Book with Offer for E-Book — see davdevs-laravel Phase 13).
 * Sermon/VideoObject is skipped: Sermons are out of scope for this rebuild.
 */

const AUTHOR = { '@type': 'Person', name: 'Davina Leong', email: 'leong.shi.yun@gmail.com' } as const;

export function blogEntryJsonLd(type: BlogType, entry: BlogEntry, canonicalURL: string) {
  const base = {
    '@context': 'https://schema.org',
    headline: entry.data.title,
    description: entry.data.excerpt,
    url: canonicalURL,
    datePublished: entry.data.datePublished?.toISOString(),
    dateModified: (entry.data.dateModified ?? entry.data.datePublished)?.toISOString(),
    image: entry.data.images?.[0]?.src,
    author: AUTHOR,
  };

  if (type === 'tool') {
    return {
      ...base,
      '@type': 'SoftwareApplication',
      name: entry.data.title,
      applicationCategory: 'BrowserApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'SGD' },
    };
  }

  return { ...base, '@type': 'Article' };
}

export function ebookJsonLd(entry: CollectionEntry<'ebook'>, canonicalURL: string) {
  const tier = entry.data.pricingTiers[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: entry.data.title,
    description: entry.data.tagline,
    url: canonicalURL,
    image: entry.data.coverImage ?? undefined,
    author: AUTHOR,
    offers: tier
      ? {
          '@type': 'Offer',
          price: (tier.priceCents / 100).toFixed(2),
          priceCurrency: tier.currency,
          url: canonicalURL,
          availability: 'https://schema.org/InStock',
        }
      : undefined,
  };
}
