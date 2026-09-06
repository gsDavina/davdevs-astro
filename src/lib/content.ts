import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * The six "blog-style" content types that share `entrySchema` (see
 * src/content/config.ts). Centralised here so listing/detail routes for all
 * six can be generated from one dynamic [type] route instead of six
 * near-identical page files.
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

export const BLOG_TYPE_LABELS: Record<BlogType, string> = {
  article: 'Article',
  fem: 'Frontend Mentor',
  'knowledge-sharing': 'Knowledge Sharing',
  notebook: 'Notebook',
  project: 'Project',
  tool: 'Tool',
};

export const BLOG_TYPE_LABELS_PLURAL: Record<BlogType, string> = {
  article: 'Articles',
  fem: 'Frontend Mentor',
  'knowledge-sharing': 'Knowledge Sharing',
  notebook: 'Notebooks',
  project: 'Projects',
  tool: 'Tools',
};

export function isBlogType(slug: string): slug is BlogType {
  return (BLOG_TYPES as readonly string[]).includes(slug);
}

export async function getBlogEntries(type: BlogType) {
  const entries = await getCollection(type);
  return entries.sort((a, b) => {
    const dateA = a.data.datePublished?.valueOf() ?? 0;
    const dateB = b.data.datePublished?.valueOf() ?? 0;
    return dateB - dateA;
  });
}

export async function getAllBlogEntries() {
  const all = await Promise.all(BLOG_TYPES.map((type) => getBlogEntries(type)));
  return BLOG_TYPES.flatMap((type, i) =>
    all[i].map((entry) => ({ type, entry }))
  ).sort((a, b) => {
    const dateA = a.entry.data.datePublished?.valueOf() ?? 0;
    const dateB = b.entry.data.datePublished?.valueOf() ?? 0;
    return dateB - dateA;
  });
}

/** Nav order: content types with real published entries, then E-Books, then Funny. */
export const NAV_ITEMS = [
  { label: 'Article', href: '/article' },
  { label: 'Projects', href: '/project' },
  { label: 'Tools', href: '/tool' },
  { label: 'Notebooks', href: '/notebook' },
  { label: 'Frontend Mentor', href: '/fem' },
  { label: 'Knowledge Sharing', href: '/knowledge-sharing' },
  { label: 'E-Books', href: '/ebooks' },
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

export function formatDate(date: Date | undefined): string {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateBox(date: Date | undefined): { day: string; month: string } {
  if (!date) return { day: '--', month: '---' };
  return {
    day: date.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: date.toLocaleDateString('en-GB', { month: 'short' }),
  };
}

const WORDS_PER_MINUTE = 200;

export function readTimeLabel(
  minutes: number | null | undefined,
  body?: string
): string {
  let n = minutes ?? undefined;
  if (!n && body) {
    const words = body.trim().split(/\s+/).filter(Boolean).length;
    n = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  }
  return n ? `${n} min read` : '';
}

export type BlogEntry = CollectionEntry<BlogType>;
