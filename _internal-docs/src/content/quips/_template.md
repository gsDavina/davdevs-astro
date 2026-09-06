---
# Template for the "Funny" content type (davinaleong.com/funny).
# Source page renders a random quip via `/api/quips/random`, with a discriminated
# `variant` field: "statement" (joke shown immediately) or "qa" (question shown,
# punchline hidden behind a 30s timer / "Show answer" button).
#
# This file is a TEMPLATE ONLY — copy one of the two examples below into a new
# file (e.g. src/content/quips/001-statement.md) and delete the other example.
# Do not fill in real joke content here; the Funny page content itself is
# intentionally being left for a later pass.

# --- Example 1: Statement style ---
# variant: "statement"
# punchline: "Why do programmers prefer dark mode? Because light attracts bugs."

# --- Example 2: Q/A style ---
# variant: "qa"
# question: "Why did the developer go broke?"
# punchline: "Because they used up all their cache."
---

This file intentionally has no body content — it exists only to document the two
quip variants (`statement`, `qa`) ahead of migrating real jokes from the live
"Funny" page into this collection.
