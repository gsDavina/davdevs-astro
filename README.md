# Dav/Devs — Astro Rebuild

Davina Leong's personal dev journal (`davdevs.dev`), rebuilt as a static
[Astro](https://astro.build) site. Content — articles, projects, tools,
notebooks, Frontend Mentor write-ups, e-books, and jokes — is authored as
Markdown in `src/content/` and rendered through a design system ported
from the [davdevs-laravel](https://github.com/gsDavina) CMS this project
replaces the frontend of.

## Stack

- **[Astro](https://astro.build)** — static site generation, content
  collections (`src/content.config.ts`, Content Layer `glob()` loader)
- **React** (`@astrojs/react`) — for the 13 interactive tool islands only
  (games, converters, generators); everything else is plain Astro
- **Tailwind v4** (utilities-only, no preflight) — used only by the ported
  tool islands, which came with Tailwind classes already; the rest of the
  site is hand-written CSS using the design tokens in `src/styles/tokens.css`
- **`@astrojs/sitemap`** — generates `sitemap-index.xml` on build

## Getting started

```sh
npm install
npm run dev       # http://localhost:4321
```

| Command           | Action                                    |
| :----------------- | :----------------------------------------- |
| `npm run dev`       | Start the dev server                       |
| `npm run build`     | Build the static site to `./dist/`         |
| `npm run preview`   | Preview the production build locally       |
| `npm run astro ...` | Run any Astro CLI command (e.g. `check`)   |

## Project structure

```
src/
├── content.config.ts        # Content collection schemas (article, fem,
│                             # knowledge-sharing, notebook, project, tool,
│                             # ebook, quips)
├── content/                 # Markdown content — one folder per collection
├── components/
│   ├── tools/                # Ported React tool islands + shared/ helpers,
│   │                          # mirrored 1:1 from davdevs-laravel's
│   │                          # resources/js/components/ (see registry.ts)
│   └── *.astro                # Nav, Footer, PostCard, PostRow, Tag, etc.
├── layouts/Site.astro        # Shared page shell: head/meta/OG/JSON-LD,
│                             # nav, footer, search modal, cookie banner
├── lib/
│   ├── content.ts             # Blog-type helpers, tag colours, date/read-time
│   ├── jsonld.ts               # JSON-LD builders per content type
│   └── site-config.ts         # Brand name, footer links, Lighthouse badge values
├── pages/
│   ├── index.astro            # Home
│   ├── [type]/{index,[slug]}.astro  # Listing + detail for all 6 blog types
│   ├── ebooks/{index,[slug]}.astro  # Bespoke e-book landing pages
│   ├── funny.astro             # Random-quip page (statement / Q&A reveal)
│   ├── privacy.astro, 404.astro
│   └── {search,quips}-index.json.ts  # Build-time JSON indexes for ⌘K search
│                                       # and the Funny page
└── styles/
    ├── tokens.css              # Design tokens (colours, type scale, spacing)
    ├── tools.css                # Shared chrome classes for tool islands
    └── tailwind-utilities.css   # Tailwind (utilities layer only)
```

## Design system

Colours, type scale, spacing, and component patterns are ported from
**davdevs-laravel** — specifically its `_internal-docs/04-design-system.md`,
`06-frontend-design-language.md`, and the pixel-accurate mockup templates
in `resources/views/static/*`. If this site's design ever needs to change,
update those source-of-truth docs first, then port the change here — don't
invent new values in this repo's CSS directly.

## Content

Content was extracted from the live site and lives in `src/content/*.md`.
See `_internal-docs/content-extraction-notes.md` for what was migrated,
what was intentionally excluded (Sermons, Template — both out of scope),
and known source-content quirks carried through as-is.

The `⌘K`/`Ctrl+K` search palette and the `/funny` page are both powered by
build-time JSON indexes (`search-index.json`, `quips-index.json`) rather
than a database — there's no backend in this deployment.

## Known deviations from davdevs-laravel

This is a **static** rebuild with no chosen backend/hosting yet, so a few
things intentionally work differently from the Laravel CMS. Each is
documented in full (with rationale) in `_internal-docs/03-progress.md`;
summary:

- **Likes/reactions are per-browser (localStorage)**, not a shared,
  server-backed count — there's no database or cookie-issuing server here.
- **`/privacy` was rewritten, not copied verbatim** — the Laravel policy
  describes a cookie + hashed-IP system this static build doesn't have;
  copying it would make false claims.
- **Tag colours are hashed, not hand-curated** — the real migrated content
  has 100+ free-form tags with no colour mapping to port.
- **Footer Lighthouse badges are placeholders** (`—`) pending a real audit
  against a deployed build — see `src/lib/site-config.ts`.
- **Sermon and Template content types don't exist here** — Sermons were
  out of scope for content extraction, and Template had zero live entries.

## Project docs

Full milestone checklist, QA checklist, and dated progress log live in
[`_internal-docs/`](./_internal-docs/):

- [`01-milestones.md`](./_internal-docs/01-milestones.md) — phase-by-phase build plan and status
- [`02-test-checklists.md`](./_internal-docs/02-test-checklists.md) — QA checklist and status
- [`03-progress.md`](./_internal-docs/03-progress.md) — dated log of what was built, verified, and why

## License

[MIT](./LICENSE) © Davina Leong
