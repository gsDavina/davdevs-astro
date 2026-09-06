---
title: "OOP Library Management System"
slug: "20250619-oop-library-management-system"
sourceUrl: "https://davinaleong.com/notebook/20250619-oop-library-management-system"
excerpt: "A Python notebook that applies object-oriented programming concepts to build a simple library management system using classes and object interactions."
publishedAtLabel: "Jun 19, 2025"
datePublished: "2025-06-19T00:00:00+00:00"
dateModified: "2026-07-07T05:55:54+00:00"
readTimeMinutes: 2
tags: ["Python", "Jupyter Notebook", "Mini Project", "System Design Basics", "Object-Oriented Programming", "OOP"]
---

## 📚 Introduction: From Objects to Systems

After learning how to model simple objects with classes, the next step is learning how **objects interact to form a system**.

This notebook introduces an **OOP-based Library Management System**, applying object-oriented principles to represent books, libraries, and actions such as borrowing and returning. It’s a meaningful step from isolated classes to coordinated behaviour.

This is where OOP starts to feel practical.

* * *

## 🎯 Purpose: Applying OOP to Real Scenarios

The goal of this notebook is to help learners understand how to:

*   Model real-world entities as classes
*   Separate responsibilities across objects
*   Use methods to control system behaviour
*   Manage state through object interactions

Rather than focusing on syntax, this notebook focuses on **design thinking**.

* * *

## 🧠 How It Works: Object Interactions

At a high level, the system is designed around multiple objects:

1.  A `Book` class to represent individual books
2.  A `Library` class to manage collections of books
3.  Methods to borrow and return books
4.  Internal state tracking for availability

Each object has a clear role, and the system emerges from their interaction.

* * *

## 🧩 The Technical Part: Classes and Responsibilities

A simplified version of the structure looks like this:

```python
class Book:
    def __init__(self, title):
        self.title = title
        self.is_borrowed = False
```

```python
class Library:
    def __init__(self):
        self.books = []

    def borrow_book(self, title):
        for book in self.books:
            if book.title == title and not book.is_borrowed:
                book.is_borrowed = True
                print("Book borrowed")
                return
        print("Book not available")
```

### 🔍 What This Demonstrates

*   🧱 Classes encapsulate both data and behaviour
*   🔁 Objects collaborate to enforce rules
*   🧠 State lives inside objects, not global variables
*   🛠 Methods act as controlled entry points

This mirrors how backend systems are structured.

* * *

## 💡 Key Takeaways: Why OOP Shines Here

This notebook reinforces key object-oriented ideas:

*   📦 Objects represent real-world entities
*   🧭 Responsibilities are clearly defined
*   🔄 State changes are controlled and predictable
*   🧠 Systems become easier to extend and reason about

This is exactly why OOP is widely used in large applications.

* * *

## 🏁 Conclusion: Designing with Objects

The **OOP Library Management System** represents a major conceptual shift:

> You’re no longer just writing code — you’re designing a system of collaborating objects.

With this foundation, learners are ready to explore:

*   Inheritance (e.g. different book types)
*   User objects and permissions
*   Persistence (saving data)
*   Full application architectures

This notebook is a strong signal of **software design maturity**.

* * *

## 🔗 Link to Notebook

**Notebook link:** _Coming Soon_
