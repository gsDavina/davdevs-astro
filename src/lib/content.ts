import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * The six "blog-style" content types that have real migrated content and
 * share `entrySchema` (see src/content.config.ts).
 */
export const BLOG_TYPES = [
  'article',
  'fem',
  'knowledge-sharing',
  'notebook',
  'project',
  'tool',
] as const;

export type BlogType = (typeof BLOG_TYPES)[number];

/**
 * Template is a real content type on the live site (it appears in its nav
 * and has a listing page) but has zero live entries to extract (see
 * _internal-docs/content-extraction-notes.md). Its listing page renders
 * the same "No entries found" empty state the live site shows.
 *
 * Sermon used to be handled the same way, but there's no Sermon content
 * or nav link at all in this rebuild now — removed entirely rather than
 * kept as an empty placeholder.
 */
export const EMPTY_TYPES = ['template'] as const;
export type EmptyType = (typeof EMPTY_TYPES)[number];

export const LISTING_TYPES = [...BLOG_TYPES, ...EMPTY_TYPES] as const;
export type ListingType = BlogType | EmptyType;

export const TYPE_LABELS: Record<ListingType, string> = {
  article: 'Article',
  fem: 'Frontend Mentor',
  'knowledge-sharing': 'Knowledge Sharing',
  notebook: 'Notebooks',
  project: 'Project',
  tool: 'Tool',
  template: 'Template',
};

export function isBlogType(slug: string): slug is BlogType {
  return (BLOG_TYPES as readonly string[]).includes(slug);
}

export function isListingType(slug: string): slug is ListingType {
  return (LISTING_TYPES as readonly string[]).includes(slug);
}

export async function getBlogEntries(type: BlogType) {
  const entries = await getCollection(type);
  return entries.sort((a, b) => {
    const dateA = a.data.datePublished?.valueOf() ?? 0;
    const dateB = b.data.datePublished?.valueOf() ?? 0;
    return dateB - dateA;
  });
}

/**
 * Home page section order: davdevs-laravel's home.blade.php pins E-Books
 * first (handled separately in index.astro), then loops content_types
 * ordered alphabetically by name, skipping any section with zero entries.
 * Template always has zero, so it never renders a home section, matching
 * the source behaviour. Sermon has no nav link or route at all here (see
 * the EMPTY_TYPES comment above), so it's not part of this list either.
 */
export const HOME_SECTION_ORDER: BlogType[] = [
  'article',
  'fem',
  'knowledge-sharing',
  'notebook',
  'project',
  'tool',
];

/**
 * Nav order matches the live site: content types alphabetically by name
 * (Article, eBooks, Frontend Mentor, Knowledge Sharing, Notebooks,
 * Project, Template, Tool), then Funny appended last. Sermon removed
 * entirely — no link, no route.
 */
export const NAV_ITEMS = [
  { label: 'Article', href: '/article' },
  { label: 'eBooks', href: '/ebooks' },
  { label: 'Frontend Mentor', href: '/fem' },
  { label: 'Knowledge Sharing', href: '/knowledge-sharing' },
  { label: 'Notebooks', href: '/notebook' },
  { label: 'Project', href: '/project' },
  { label: 'Template', href: '/template' },
  { label: 'Tool', href: '/tool' },
  { label: 'Funny', href: '/funny' },
] as const;

const TAG_COLORS = ['amber', 'teal', 'coral'] as const;

/**
 * The Laravel CMS hand-curates tag -> colour (see 04-design-system.md's Tag
 * Colour System table). The real migrated content has ~100+ free-form tag
 * strings with no such mapping, so this assigns one of the three palette
 * colours deterministically by hashing the tag text — stable across builds
 * and pages, but not a content-meaning-aware assignment like the original.
 */
export function tagColor(tag: string): (typeof TAG_COLORS)[number] {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) | 0;
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

/** Matches davdevs-laravel's `$date->format('M j, Y')`, e.g. "Jun 18, 2024". */
export function formatDate(date: Date | undefined): string {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const WORDS_PER_MINUTE = 200;

function readTimeMinutes(minutes: number | null | undefined, body?: string): number | undefined {
  if (minutes) return minutes;
  if (!body) return undefined;
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Card/listing style: "3 min" (no "read" suffix) — matches home/listing cards. */
export function readTimeShort(minutes: number | null | undefined, body?: string): string {
  const n = readTimeMinutes(minutes, body);
  return n ? `${n} min` : '';
}

/** Detail-page kicker style: "3 min read" — matches entry-detail.blade.php. */
export function readTimeLabel(minutes: number | null | undefined, body?: string): string {
  const n = readTimeMinutes(minutes, body);
  return n ? `${n} min read` : '';
}

export type BlogEntry = CollectionEntry<BlogType>;
