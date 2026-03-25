

## Problem
The `DisclaimerFooter` uses `fixed` positioning at the bottom, overlapping interactive content (spells, buttons) on mobile screens.

## Solution
Change the footer from `fixed` to static positioning, and add bottom padding to the main content area so nothing is hidden behind it. Alternatively, make the footer part of the normal document flow so content scrolls above it.

### Changes

1. **`src/components/DisclaimerFooter.tsx`** — Remove `fixed bottom-0 left-0 right-0 z-50` positioning. Make it a normal flow element at the bottom of the page, or keep it fixed but add a collapse/expand toggle on mobile.

   Simplest fix: change `fixed` to `relative` so it sits naturally at the bottom of the page content without overlapping anything.

2. **Screens that use DisclaimerFooter** — Ensure the footer is placed at the end of the content flow. If any screen has its own bottom padding, verify it still looks correct.

### Approach
- Use `relative` positioning instead of `fixed` so the disclaimer becomes part of the scrollable content
- On mobile, this prevents it from permanently blocking buttons and spells
- The disclaimer will appear at the very bottom when users scroll down

