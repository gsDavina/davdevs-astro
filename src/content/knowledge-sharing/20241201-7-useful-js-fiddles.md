---
title: "7 Useful JS Fiddles"
slug: "20241201-7-useful-js-fiddles"
sourceUrl: "https://davinaleong.com/knowledge-sharing/20241201-7-useful-js-fiddles"
excerpt: "Latest article published on DEV.to showcasing practical JavaScript code snippets and utilities."
publishedAtLabel: "Dec 1, 2024"
datePublished: "2024-12-01T00:00:00+00:00"
dateModified: "2026-07-07T05:55:58+00:00"
readTimeMinutes: 3
tags: ["JavaScript", "Web Development", "Code Snippets"]
images:
  - src: "https://res.cloudinary.com/ryrno9i5/image/upload/w_680,q_auto,f_auto/v1783403514/davdevs/entries/knowledge-sharing/dev-to.png"
    alt: ""
    caption: "7 Useful JS Fiddles on DEV.to"
---

## Introduction

Sharing some JSFiddles the rest of you may find useful. I often use JSFiddle as a playground to test out snippets of UI code before putting them into an actual project. I built all these fiddles myself, with some help from Google. Excuse the boring colour scheme; I'm not much of a designer... Anyways, hope you find these code snippets useful.

## 1\. Custom Checkbox & Radio

Custom checkboxes and radio buttons. Includes hover effects.

I had a project from my day job where I had to create custom checkboxes. I already had an idea on how to do it, but needed to test the idea. I got the code to render the checkmark from [W3Schools](https://www.w3schools.com/howto/howto_css_custom_checkbox.asp). I also decided to include a snippet for radio buttons in-case I needed it in the future.

## 2\. Ribbon Label

Product ribbon label. The image is generated from [placeholder.com](https://placeholder.com/).

My most recent project required me to style product labels as ribbons. I tried to find solutions online, but many of them were too complicated. In the end, I came up with this solution. I couldn't get pseudo elements to work for the ribbon corner. So I ended up using an inner div to achieve the result.

## 3\. Custom File Input Placeholder

Custom File Input Placeholder. This snippet uses [jQuery](https://jquery.com/).

One of the projects I worked on recently at my day job needed a file input to upload the customer's profile picture. There were no input labels in the mockup. It used the `placeholder` attribute as the input's label. The problem is the file input type doesn't render the `placeholder` attribute. This fiddle is my solution to the problem after searching for ideas to the problem.

## 4\. Custom Select Field

I often have designs that change the design of the select input arrow. After some searching, I found the code to render the arrow. Remember to make the input field's background transparent.

## 5\. Button with Overlapping Shadow

I had one project where the button had such a design. Here is the solution.

To give a transparent appearance, make sure the `inset` `box-shadow` colour is the same as your `background colour`.

## 6\. Grid Gallery

I had to build a grid gallery for one of my projects for my day job. Since it was company policy to support IE11, I had to find a solution that works for IE11. Here is the solution I came up with.

I'm sure there's a better way to code a responsive grid, but this was what I could think of at that time.

## 7\. Mega Menu Hover

This solution uses [jQuery](https://www.jquery.com/).

I had to build a mega menu for one of my projects. This was what I came up with.

## Conclusion

These JS Fiddles represent practical solutions to common web development challenges I've encountered in my professional work. Each snippet solves a specific problem and has been tested in real projects. Feel free to use and adapt these code snippets for your own projects!

* * *

_Originally published on [DEV.to](https://dev.to/davinaleong/7-useful-js-fiddles-1mg0)_
