# Content extraction from davinaleong.com

Crawled from the live site (server-rendered Laravel/Alpine app) on 2026-09-06,
in preparation for the Astro rebuild. Extraction was done programmatically
(fetch + cheerio + turndown), not by hand-copying, so wording is verbatim from
the live HTML `.prose` bodies, converted to Markdown.

## What's here

| Collection | Count | Source path | Notes |
|---|---|---|---|
| `article/` | 25 | `/article/*` | |
| `fem/` | 24 | `/fem/*` | Frontend Mentor challenge write-ups |
| `knowledge-sharing/` | 4 | `/knowledge-sharing/*` | |
| `notebook/` | 27 | `/notebook/*` | |
| `project/` | 29 | `/project/*` | |
| `tool/` | 13 | `/tool/*` | Each has a `reactComponent` frontmatter field |
| `ebook/` | 4 | `/ebooks/*` | Non-Christian titles only, see below |

**122 standard entries + 4 ebooks = 126 markdown files.**

## What was intentionally excluded

- **Sermons** (`/sermon/*`) — excluded entirely, per scope.
- **Christian eBooks** — excluded from `ebook/`: the *Scrolls for the Screen
  Generation* bundle and its 6 volumes, *Jesus & AI*, *Daddy God is for You*,
  *Carried by Grace*, and the *Carried, Guided, Held* bundle. Only the 4
  non-Christian titles (*It's Not Scary (Debug)*, *The Punny Side of Things*,
  *Code & Corny* bundle, *It's Not Magic (Code)*) were migrated.
- **Template** (`/template`) — checked; the live page has zero published
  entries ("No e-books yet."), so there was nothing to extract.
- **Funny** (`/funny`) — left for a later pass, per instructions. Its data
  shape was reverse-engineered from the live Alpine component (fetches
  `/api/quips/random`, which returns `{ variant: "statement" | "qa",
  question?, punchline }`) and captured as a schema + template, not real
  content. See `quips/_template.md` and the `quips` collection in
  `config.ts`.

## Supporting data files

- [`../data/post-image-map.json`](../data/post-image-map.json) — maps every
  `"<type>/<slug>"` to the images referenced on that post's page (gallery
  figures below the prose, inline `<img>`s inside the prose, and eBook
  cover/inside-item art). 85 of 126 posts have at least one image.
- [`../data/tool-component-map.json`](../data/tool-component-map.json) —
  maps each of the 13 tool slugs to the `data-react-component` value the
  live site mounts on that page (e.g. `20260102-minesweeper` →
  `minesweeper`), plus title/url/tags for convenience. This is the
  post-to-React-component map for the Tool content type.
- [`config.ts`](./config.ts) — draft Astro `astro:content` collection
  definitions (zod schemas) for all of the above, including the `quips`
  discriminated union.

## Known source-site quirks (carried through as-is, not fixed)

- All 24 `fem/` entries have a broken "Links" section where the live
  template failed to interpolate — the markdown literally contains
  `[Live Demo](%7Blinks%5B0%5D.href%7D)` etc. This is a bug on the live
  site (confirmed across every entry checked), not an extraction error;
  flagging here rather than silently "fixing" content during a migration.
  The real demo/GitHub/Frontend-Mentor URLs will need to be sourced
  separately when these are rebuilt in Astro.
