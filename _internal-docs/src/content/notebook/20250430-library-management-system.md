---
title: "Library Management System"
slug: "20250430-library-management-system"
sourceUrl: "https://davinaleong.com/notebook/20250430-library-management-system"
excerpt: "A Python notebook that simulates a simple library management system, introducing state, collections, and basic CRUD-style operations."
publishedAtLabel: "Apr 30, 2025"
datePublished: "2025-04-30T00:00:00+00:00"
dateModified: "2026-07-07T05:55:47+00:00"
readTimeMinutes: 2
tags: ["Python", "Jupyter Notebook", "Beginner Programming", "Data Structures", "Mini Project", "System Design Basics"]
---

## 📚 Introduction: From Scripts to Systems

After working with calculators, sorters, and conditional logic, the next natural step is building something that **resembles a real application**.

This notebook introduces a **Library Management System** — a simple but meaningful mini project that ties together multiple programming concepts into one cohesive flow.

It’s no longer just about running code — it’s about **managing state**.

* * *

## 🎯 Purpose: Thinking in Systems

The purpose of this notebook is to help beginners understand how:

*   Multiple pieces of data relate to each other
*   A program can keep track of **available vs borrowed items**
*   User actions change system state over time
*   Small programs can simulate real-world workflows

This mirrors the foundations of backend systems and business logic.

* * *

## 🧠 How It Works: The Overall Flow

At a high level, the system follows this loop:

1.  Store a collection of books
2.  Display available options to the user
3.  Allow borrowing or returning of books
4.  Update the system state accordingly

Each action affects what the user can do next — just like in real software.

* * *

## 🧩 The Technical Part: Managing Data and Actions

A simplified version of the core logic looks like this:

```python
books = ["1984", "The Hobbit", "Pride and Prejudice"]

def display_books():
    for book in books:
        print(book)

def borrow_book(book_name):
    if book_name in books:
        books.remove(book_name)
        print("Book borrowed")
    else:
        print("Book not available")
```

### 🔍 What’s Happening Here?

*   📦 A list represents the library’s inventory
*   🔄 Functions encapsulate actions (display, borrow)
*   🧠 The system checks state before acting
*   🗂 Data changes persist during program execution

This is an introduction to **CRUD-style logic** (Create, Read, Update, Delete).

* * *

## 💡 Key Takeaways: Building Realistic Logic

This notebook reinforces several important concepts:

*   🧱 Data structures represent real-world entities
*   🔁 Programs can model workflows
*   🛠 Functions help organise system behaviour
*   🧠 State management is a core programming skill

These ideas scale directly into web apps, APIs, and databases.

* * *

## 🏁 Conclusion: Your First Mini System

The **Library Management System** marks an important milestone:

> You’re no longer writing isolated code snippets — you’re building a system with rules and behaviour.

With this foundation, you’re ready to explore:

*   Dictionaries for richer data
*   Loops for menus
*   Persistent storage
*   Object-oriented design

Every full application starts as a simple system like this.

* * *

## 🔗 Link to Notebook

**Notebook link:** _Coming Soon_
