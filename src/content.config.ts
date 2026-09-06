import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

const blogLoader = (dir: string) => glob({ pattern: "**/*.md", base: `./src/content/${dir}` });

const article = defineCollection({ loader: blogLoader("article"), schema: entrySchema });
const fem = defineCollection({ loader: blogLoader("fem"), schema: entrySchema });
const knowledgeSharing = defineCollection({
  loader: blogLoader("knowledge-sharing"),
  schema: entrySchema,
});
const notebook = defineCollection({ loader: blogLoader("notebook"), schema: entrySchema });
const project = defineCollection({ loader: blogLoader("project"), schema: entrySchema });
const tool = defineCollection({ loader: blogLoader("tool"), schema: entrySchema });

// eBooks are bespoke marketing landing pages, not blog posts, so they get
// their own shape. Only non-Christian titles were migrated here; the
// Christian eBooks and bundles (Scrolls for the Screen Generation, Jesus &
// AI, Daddy God is for You, Carried by Grace, Carried Guided Held) were
// intentionally excluded per the content migration scope.
const ebook = defineCollection({
  loader: blogLoader("ebook"),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    sourceUrl: z.string().url(),
    isBundle: z.boolean().default(false),
    status: z.enum(["draft", "published"]).default("published"),
    tagline: z.string().optional(),
    coverImage: z.string().url().nullable().optional(),
    // Each tier is its own purchasable Stripe line: `stripePriceId` is used
    // when set, otherwise checkout builds an ad-hoc `price_data` from
    // `priceCents`/`currency`. `manuscriptFileKey` is the Vercel Blob key
    // the download route serves post-purchase; blank until a real file is
    // uploaded (see /api/download/[token]).
    pricingTiers: z
      .array(
        z.object({
          name: z.string(),
          priceCents: z.number().int().nonnegative(),
          currency: z.string().default("SGD"),
          stripePriceId: z.string().optional(),
          manuscriptFileKey: z.string().optional(),
        })
      )
      .default([]),
  }),
});

// The "Funny" page's random-quip feature (davinaleong.com/funny). Two
// variants: a plain "statement" joke, or a "qa" joke that reveals its
// punchline after a delay (see src/pages/funny.astro).
const quips = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/quips" }),
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
