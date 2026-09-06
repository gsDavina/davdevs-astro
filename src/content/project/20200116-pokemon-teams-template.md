---
title: "Pokemon Teams Template"
slug: "20200116-pokemon-teams-template"
sourceUrl: "https://davinaleong.com/project/20200116-pokemon-teams-template"
excerpt: "HTML template prototype for Pokemon team builder app"
publishedAtLabel: "Jan 16, 2020"
datePublished: "2020-01-16T00:00:00+00:00"
dateModified: "2026-07-07T05:55:23+00:00"
readTimeMinutes: 1
tags: ["css-grid", "sass", "html", "pokemon", "jquery"]
images:
  - src: "https://res.cloudinary.com/ryrno9i5/image/upload/w_680,q_auto,f_auto/v1783403321/davdevs/entries/project/20200116-001-pokemon-teams-template.png"
    alt: ""
    caption: "Pokemon Teams Template"
---

This project is the first part of a 2-part project I'm in the midst of building. The second part is to build this project in `ReactJS`.

> **Tech Stack**
> 
> *   **Frontend:** HTML, CSS, SASS, JSON, jQuery, Font Awesome 5
> *   **Highlights:** CSS Grid, Flex

I first sketched up the mockups of the app pages in [Affinity Designer](https://affinity.serif.com/en-gb/designer/).

I then built the template in `HTML` and `SASS`, using the [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemlabel=ritwickdey.live-sass) [VS Code](https://code.visualstudio.com/) extension to compile the `SASS` scripts.

This template features **CSS Grid** and **Flex**. **CSS Grid** is used to lay out the main components like the sidebar and main sections, and **Flex** is used to lay out the Team-cards.

`jQuery` is used to render the Team-cards and the Team-list on the sidebar. Dummy team data is stored in a `JSON` file and is pulled in and displayed by the Team-cards.
