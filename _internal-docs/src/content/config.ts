import { defineCollection, z } from "astro:content";

// Shared shape for the six "blog-style" content types crawled from the
// live davinaleong.com Laravel site (article, fem, knowledge-sharing,
// notebook, project, tool). Each was server-rendered with the same
// article/header/prose/gallery template.
const imageSchema = z.object({
  src: z.string().url(),
  alt: z.string().optional().default(""),
  caption: z.string().optional(),
});

const entrySchema = z.object({
  title: z.string(),
  slug: z.string(),
  sourceUrl: z.string().url(),
  excerpt: z.string().optional(),
  publishedAtLabel: z.string().optional(),
  datePublished: z.coerce.date().optional(),
  dateModified: z.coerce.date().optional(),
  readTimeMinutes: z.number().nullable().optional(),
  tags: z.array(z.string()).default([]),
  images: z.array(imageSchema).optional(),
  // Tool entries only: the client-side component mounted via
  // `<div data-react-component="...">` on the live site. See
  // src/data/tool-component-map.json for the full slug -> component map.
  reactComponent: z.string().optional(),
});

const article = defineCollection({ type: "content", schema: entrySchema });
const fem = defineCollection({ type: "content", schema: entrySchema });
const knowledgeSharing = defineCollection({ type: "content", schema: entrySchema });
const notebook = defineCollection({ type: "content", schema: entrySchema });
const project = defineCollection({ type: "content", schema: entrySchema });
const tool = defineCollection({ type: "content", schema: entrySchema });

// eBooks are bespoke marketing landing pages, not blog posts, so they get
// their own shape. Only non-Christian titles were migrated here; the
// Christian eBooks and bundles (Scrolls for the Screen Generation, Jesus &
// AI, Daddy God is for You, Carried by Grace, Carried Guided Held) were
// intentionally excluded per the content migration scope.
const ebook = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    sourceUrl: z.string().url(),
    isBundle: z.boolean().default(false),
    tagline: z.string().optional(),
    coverImage: z.string().url().nullable().optional(),
    pricingTiers: z
      .array(
        z.object({
          name: z.string(),
          price: z.string().nullable(),
          checkoutUrl: z.string().url().nullable(),
        })
      )
      .default([]),
  }),
});

// The "Funny" page's random-quip feature (davinaleong.com/funny). Two
// variants observed live via the Alpine.js component's fetch to
// /api/quips/random: a plain "statement" joke, or a "qa" joke that reveals
// its punchline after a delay. Real quip content has not been migrated yet
// — see src/content/quips/_template.md.
const quips = defineCollection({
  type: "content",
  schema: z.discriminatedUnion("variant", [
    z.object({
      variant: z.literal("statement"),
      punchline: z.string(),
    }),
    z.object({
      variant: z.literal("qa"),
      question: z.string(),
      punchline: z.string(),
    }),
  ]),
});

export const collections = {
  article,
  fem,
  "knowledge-sharing": knowledgeSharing,
  notebook,
  project,
  tool,
  ebook,
  quips,
};
