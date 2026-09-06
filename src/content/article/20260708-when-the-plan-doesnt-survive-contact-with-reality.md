---
title: "When the Plan Doesn't Survive Contact With Reality"
slug: "20260708-when-the-plan-doesnt-survive-contact-with-reality"
sourceUrl: "https://davinaleong.com/article/20260708-when-the-plan-doesnt-survive-contact-with-reality"
excerpt: "I spent an entire day writing detailed migration docs for Claude Code, then woke up the next morning and realized the plan was wrong — built for a local-to-local move when the real target was local-to-cloud, a difference that changes sequencing, validation, and rollback enough to make most of it unsalvageable. Turns out the \"wasted\" day wasn't wasted at all."
publishedAtLabel: "Jul 8, 2026"
datePublished: "2026-07-08T18:00:00+00:00"
dateModified: "2026-07-08T10:14:48+00:00"
readTimeMinutes: 3
tags: []
---

## The day I threw away a day's work

I spent an entire day writing `.md` guideline docs — detailed, step-by-step instructions for Claude Code to migrate this site's content from a flat-file Astro repo into a Laravel app backed by PostgreSQL, with Cloudinary handling media.

The next morning, reading it back with fresh eyes, I found the flaw: the whole plan was built for a **local-to-local** migration, because both repos currently sit on my dev machine. But the real target is **local-to-cloud** — Cloudinary for media, hosted Postgres for data — and that one difference changes sequencing, validation, and rollback enough that most of the original docs weren't salvageable.

So the day started over. `Updated migration docs`. `Updated migration plan to audit images`. Rebuilding the plan around the constraint that actually mattered.

I'm also still not fully sure how cleanly Claude Code will execute a migration like this end-to-end — subtle content breakage is the kind of thing that's easy to miss until it's live. So instead of treating the image import as one big atomic job, I made it resumable and resilient to per-file failures. If it dies partway through a batch, I don't want to re-run the whole thing from scratch.

## Two content types that needed real thinking, not just scripting

**Tool pages** — each post under `/tools` has a React component attached to it. This one was contained: migrate only the components in `/tools`, and restyle them to the new site's palette (yellow buttons replacing blue, and so on). Shipped as `Add React Component Manager for Tools`.

**Ebook product pages** — the harder problem. Every ebook page had been hand-designed as a unique one-off, which is great for a bespoke launch and terrible for migrating into storable DB records. Rather than porting each design 1:1, I consolidated everything into two layout variants — **individual** and **bundle** — and extended the publications module to support full design customization within those two shapes. Shipped in the same commit as the tools work: `Publication Template Manager for eBooks`.

Both of these build on architecture already in place from earlier phases — the publication manager, taxonomy CRUD, a headless REST API, JSON-LD/OG tags — so the consolidation slots into an existing content model rather than bolting something new on top.

## The takeaway

The "wasted" day wasn't actually wasted. It surfaced the wrong assumption early, before I'd built anything on top of it. Sometimes the plan you throw away is the one that gets you to the plan that works.

Hoping to close this out in the next day or two so I can get back to GraceSoft full-time.
