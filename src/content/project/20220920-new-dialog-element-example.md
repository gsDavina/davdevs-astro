---
title: "New Dialog Element Example"
slug: "20220920-new-dialog-element-example"
sourceUrl: "https://davinaleong.com/project/20220920-new-dialog-element-example"
excerpt: "Modern HTML dialog element implementation examples"
publishedAtLabel: "Sep 20, 2022"
datePublished: "2022-09-20T00:00:00+00:00"
dateModified: "2026-07-07T05:55:32+00:00"
readTimeMinutes: 1
tags: ["javascript", "html", "kevin-powell", "dialog-element", "modern-web"]
images:
  - src: "https://res.cloudinary.com/ryrno9i5/image/upload/w_680,q_auto,f_auto/v1783403369/davdevs/entries/project/20220920-001-dialog-example.png"
    alt: ""
    caption: "New Dialog Element Example"
---

Here is a demo I built featuring the [dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog). I found out about this new element from Kevin Powell's video [dialog = the easiest way to make a popup modal](https://www.youtube.com/watch?v=TAB_v6yBXIE&t=0s).

> **Tech Stack**
> 
> *   **Frontend:** HTML, CSS, JavaScript, Dialog Element
> *   **Deployment:** GitHub Pages
> *   **Highlights:** Dialog Element

I decided to build my own demo to explore and play around with this new element. I built 2 dialogs--a simple one and a form one. The repo can be found [here](https://github.com/davinaleong/proj-davdevs-gatsby), where you can view my code and perhaps give you some inspiration on how to use this new `dialog` element.

## Here are some simple how-tos:

*   The dialog element comes with its own pseudo element, `::backdrop` which gives you--as you guessed it, ability to style the backdrop of the dialog.
*   To open the dialog via **JavaScript**, use the `showModal()` function on the `dialog` element.
*   To close the dialog, use the `close()` function.
