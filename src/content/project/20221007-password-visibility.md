---
title: "Password Visibility"
slug: "20221007-password-visibility"
sourceUrl: "https://davinaleong.com/project/20221007-password-visibility"
excerpt: "Password visibility toggle implementation with vanilla JavaScript"
publishedAtLabel: "Oct 7, 2022"
datePublished: "2022-10-07T00:00:00+00:00"
dateModified: "2026-07-07T05:55:32+00:00"
readTimeMinutes: 1
tags: ["javascript", "vanilla-js", "ux", "forms"]
images:
  - src: "https://res.cloudinary.com/ryrno9i5/image/upload/w_680,q_auto,f_auto/v1783403375/davdevs/entries/project/20221007-001-password-visibility.png"
    alt: ""
    caption: "Password Visibility"
---

Here is my solution/demo to the password visibility toggle found on many websites. This is a pure JavaScript solution. As per the pattern I learned from Kevin Powell, I've used `data-` attributes as my selectors like the form or password toggle buttons.

> **Tech Stack**
> 
> *   **Frontend:** HTML, CSS, JavaScript
> *   **Deployment:** GitHub Pages
> *   **Highlights:** CSS Adjacent Sibling Selector

I've now streamlined to use a custom `data-element` attribute and the value as the label of the element--e.g. `data-element=\"form-example\"`. Then I access it in `CSS` like this: `[data-element=form-example]` or in `JS` like this: `document.querySelector(\"[data-element=form-example]\")`.

For the solution demo, the form doesn't do anything and just outputs the form values on the page itself.

Feel free to use my code for your own reference! :)
