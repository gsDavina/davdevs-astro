---
title: "Tic Tac Toe"
slug: "20250519-tic-tac-toe"
sourceUrl: "https://davinaleong.com/notebook/20250519-tic-tac-toe"
excerpt: "A Python notebook that implements a simple Tic Tac Toe game, demonstrating game logic, control flow, and state management."
publishedAtLabel: "May 19, 2025"
datePublished: "2025-05-19T00:00:00+00:00"
dateModified: "2026-07-07T05:55:51+00:00"
readTimeMinutes: 2
tags: ["Python", "Jupyter Notebook", "Beginner Programming", "Control Flow", "Mini Project", "Game Logic"]
---

## ❌⭕ Introduction: A Classic Game in Code

Tic Tac Toe is one of those projects that almost every programmer builds at least once — and for good reason.

Despite its simplicity, the game requires clear **logic**, **rules**, and **state tracking**, making it an excellent way to practice core programming concepts in a fun and familiar context.

This notebook implements a playable Tic Tac Toe game using Python.

* * *

## 🎯 Purpose: Practising Logic and Flow

The goal of this notebook is to help learners understand how to:

*   Represent a game board in code
*   Track player turns
*   Validate user input
*   Check win and draw conditions
*   Control the flow of a game from start to finish

It’s less about fancy features, and more about **thinking clearly**.

* * *

## 🧠 How It Works: Game Loop Thinking

At a high level, the game follows this flow:

1.  Initialise an empty game board
2.  Display the board to the players
3.  Alternate turns between players
4.  Update the board after each move
5.  Check for a winner or a draw
6.  End the game when a condition is met

This introduces the idea of a **game loop**, a pattern used widely in interactive programs.

* * *

## 🧩 The Technical Part: Board, Turns, and Rules

A simplified example of the board representation might look like this:

```python
board = [" ", " ", " ",
         " ", " ", " ",
         " ", " ", " "]
```

And a basic win check:

```python
def check_winner(board):
    win_conditions = [
        (0,1,2), (3,4,5), (6,7,8),
        (0,3,6), (1,4,7), (2,5,8),
        (0,4,8), (2,4,6)
    ]

    for a, b, c in win_conditions:
        if board[a] == board[b] == board[c] != " ":
            return True
    return False
```

### 🔍 What This Demonstrates

*   🎯 Clear rule definition
*   🔁 Repeated checks inside a loop
*   🧠 State stored and updated over time
*   🛡 Validation to prevent invalid moves

These patterns show up in many real-world applications.

* * *

## 💡 Key Takeaways: Why This Project Matters

This notebook reinforces several important skills:

*   🧠 Translating rules into logic
*   🔄 Managing state changes
*   🧱 Breaking problems into smaller functions
*   🎮 Designing interactive programs

Many developers remember this as the project where things “clicked”.

* * *

## 🏁 Conclusion: Small Game, Big Learning

The **Tic Tac Toe** notebook is more than just a game:

> It’s an exercise in clarity, structure, and logical thinking.

With this project complete, learners are well prepared to explore:

*   Larger game logic
*   Menu-driven programs
*   AI opponents
*   Object-oriented refactors

Every complex system starts with simple rules — just like Tic Tac Toe.

* * *

## 🔗 Link to Notebook

**Notebook link:** _Coming Soon_
