---
title: "Fruit Calculator"
slug: "20250426-fruit-calculator"
sourceUrl: "https://davinaleong.com/notebook/20250426-fruit-calculator"
excerpt: "A beginner-friendly Python notebook that demonstrates user input, type casting, and a common pitfall when working with strings and numbers."
publishedAtLabel: "Apr 26, 2025"
datePublished: "2025-04-26T00:00:00+00:00"
dateModified: "2026-07-07T05:55:45+00:00"
readTimeMinutes: 3
tags: ["Python", "Jupyter Notebook", "Beginner Programming", "Type Casting", "User Input", "Learning by Doing"]
---

## 🍎 Introduction: A Simple Calculator with a Hidden Lesson

This notebook looks innocent at first glance — a **fruit calculator** that asks for apples and oranges, then totals them up.

But beneath this simple exercise lies one of the **most common beginner mistakes in Python** (and programming in general):  
👉 confusing **strings** with **numbers**.

This notebook is intentionally simple, making it a great learning artifact for anyone starting out with Python and Jupyter Notebooks.

* * *

## 🎯 Purpose: Learning Input and Types

The goal of this notebook is to help beginners understand:

*   How to accept **user input** using `input()`
*   What data type `input()` returns
*   Why **type casting** matters
*   How small mistakes can lead to **unexpected results**

It’s less about fruits — and more about **thinking like a programmer**.

* * *

## 🧠 How It Works: Step-by-Step Logic

The notebook walks through three basic steps:

1.  Ask the user how many **apples** they have
2.  Ask the user how many **oranges** they have
3.  Combine both values to get a “total”

On the surface, this sounds straightforward — but the implementation matters.

* * *

## 🧩 The Technical Part: Where Things Get Interesting

Here’s a simplified version of what the notebook does:

```python
str_num_of_apples = input("Enter the number of apples you have.")
str_num_of_oranges = input("Enter the number of oranges you have.")

num_of_apples = str(str_num_of_apples)
num_of_oranges = str(str_num_of_oranges)

num_total_fruits = num_of_apples + num_of_oranges
```

### ⚠️ What’s Happening Here?

*   `input()` **always returns a string**
*   Casting a string to a string (`str(...)`) does nothing
*   Using `+` on strings **concatenates**, instead of adds

So if the user enters:

```
Apples: 2
Oranges: 3
```

The result becomes:

```
"2" + "3" = "23"
```

Not `5`.

And that’s the lesson.

* * *

## 💡 Key Takeaways: Small Details Matter

This notebook highlights several important programming fundamentals:

*   🧪 **Always check your data types**
*   🔄 Strings and numbers behave very differently
*   ➕ The `+` operator means different things depending on type
*   🛠 Bugs aren’t failures — they’re learning milestones

For beginners, encountering (and understanding) this mistake is a **huge win**.

* * *

## 🏁 Conclusion: Simple, but Foundational

The Fruit Calculator may be small, but it teaches something big:

> Programming isn’t just about writing code — it’s about understanding what the computer thinks you mean.

This notebook serves as a great foundation for future improvements, such as:

*   Proper integer casting with `int()`
*   Input validation
*   Error handling
*   Refactoring into functions

Every great developer starts here.

* * *

## 🔗 Link to Notebook

**Notebook link:** _Coming Soon_
