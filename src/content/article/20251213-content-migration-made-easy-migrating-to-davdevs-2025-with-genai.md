---
title: "Content Migration Made Easy: Migrating to Dav/Devs 2025 with GenAI"
slug: "20251213-content-migration-made-easy-migrating-to-davdevs-2025-with-genai"
sourceUrl: "https://davinaleong.com/article/20251213-content-migration-made-easy-migrating-to-davdevs-2025-with-genai"
excerpt: "Learn how I streamlined content migration from various formats (Astro MD, Next.js MD) to Next.js with MDX using GitHub Copilot and a systematic workflow. A practical guide to automating content conversion with AI assistance."
publishedAtLabel: "Dec 13, 2025"
datePublished: "2025-12-13T00:00:00+00:00"
dateModified: "2026-07-07T05:55:19+00:00"
readTimeMinutes: 2
tags: ["web-development", "content-migration", "mdx", "nextjs", "github-copilot", "workflow", "automation"]
images:
  - src: "https://res.cloudinary.com/ryrno9i5/image/upload/w_680,q_auto,f_auto/v1783403303/davdevs/entries/article/20251213-0001-davdevs-content-migration.png"
    alt: ""
    caption: "Dav/Devs Content Migration"
---

I've been working on the latest version of my website — **[Dav/Devs 2025](/project/20251223-davdevs-2025-complete-website-rebuild)** — where I consolidated all my projects, articles, and microsites into a single platform. The goal was simple: make it less confusing for visitors and much easier for me to maintain and update.

One seemingly insignificant but _very_ tedious part of this revamp was **content migration**.

The new site runs on **Next.js with MDX**, while my older projects were a mix of:

*   Next.js with Markdown (MD)
*   Astro with MD and React

Manually converting and rewriting everything would’ve been time-consuming and error-prone. That’s when Jesus gave me the idea to lean on **GenAI / vibe coding** to help with the migration.

Here’s the workflow I came up with.

* * *

## 🛠️ Tools & Prerequisites

*   **VS Code** — main IDE
*   **GitHub Copilot** — AI assistant for migration
*   **MDX template file** — target structure for converted content
*   **Notepad++** — drafting and refining Copilot instructions

* * *

## ⚙️ Setup

1.  Create a separate folder in `/app` to hold files to be converted, e.g.:
    
    ```
    /app/_import
    ```
    
    (The underscore pushes it to the top of the directory for easy access.)
    
2.  Inside `/app/_import`, create an output folder:
    
    ```
    /app/_import/_output
    ```
    
    This is where the generated MDX files will go.
    
3.  In `/public`, create subdirectories for images based on post type:
    
    ```
    /public/articles
    /public/projects
    /public/…
    ```
    

* * *

## 🔄 Migration Process

1.  Place all old `.md` or `.mdx` files into `/app/_import`.
    
2.  Copy all images into their respective `/public` subdirectories.
    
3.  Open:
    
    *   One old Markdown file
    *   The MDX template file in VS Code side by side.
4.  In Notepad++, map the old frontmatter and content structure to the new MDX template.
    
5.  Write clear Copilot instructions in this format (with examples):
    
    **Goal:** Migrate project MD files to MDX files
    
    **Instructions / Tasks / TODO:**
    
    *   Example file: `<template-file-name>`
    *   File name format: `yyyymmdd-kebab-case-title.mdx`
    *   `subtitle` → `description`
    *   `tech stack` → blockquote in content
    *   Improve clarity and flow of content
    *   Update metadata to match template
    *   Output directory: `/_output`
6.  Send the instructions to Copilot and let it do its magic ✨ — while I reviewed the output as it was generated.
    

* * *

## ✅ Validation & Final Step

*   To verify completeness, I compared the file count between:
    
    *   `/app/_import`
    *   `/app/_import/_output`
*   Once everything checked out, I moved the converted files into:
    
    ```
    /content/<post-type>
    ```
