---
title: "Joke of the Day"
slug: "20221110-joke-of-the-day"
sourceUrl: "https://davinaleong.com/project/20221110-joke-of-the-day"
excerpt: "Random joke generator with original content"
publishedAtLabel: "Nov 10, 2022"
datePublished: "2022-11-10T00:00:00+00:00"
dateModified: "2026-07-07T05:55:33+00:00"
readTimeMinutes: 1
tags: ["javascript", "api", "jokes", "laravel-cms", "random-generator"]
images:
  - src: "https://res.cloudinary.com/ryrno9i5/image/upload/w_680,q_auto,f_auto/v1783403378/davdevs/entries/project/20221110-001-joke-generator.png"
    alt: ""
    caption: "Joke of the Day"
---

The idea for this project came about when I was figuring out how to showcase all the original jokes and riddles I came up with. Currently, I store them Google Docs. But I wanted to create a generator which shows a random joke. It will also have a button for users to view another joke without refreshing the screen.

> **Tech Stack**
> 
> *   **Frontend:** HTML, CSS, JavaScript
> *   **Deployment:** Heroku
> *   **Highlights:** No jQuery

There were 2 parts to this project: the jokes API and the interface. The jokes API was built by extending [Davina's CMS](https://www.davina-devs.com/projects/davinas-cms). It includes a route that pulls a random joke.

Initially, I built the interface as a separate HTML, CSS & JS project, but was unable to resolve the cross-origin errors. So I decided to built it into Davina's CMS. It uses the blade template & CSS to load the interface, and uses JavaScript to load the joke from the random joke API route.
