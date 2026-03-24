

## Add Fan Project Disclaimer Footer

Add a small, visible disclaimer footer to every screen stating this is an unofficial fan-made educational portfolio project with no commercial intent.

### What changes

| File | Change |
|------|--------|
| `src/components/DisclaimerFooter.tsx` | New component — subtle fixed-bottom disclaimer text |
| `src/App.tsx` | Add `<DisclaimerFooter />` outside routes so it appears on all screens |
| `index.html` | Update title to "SpellCraft" and meta description to frame as fan-made educational project |

### Disclaimer text
> "This is an unofficial fan-made educational project. Harry Potter™ names, characters, and spells are trademarks of Warner Bros. Entertainment & J.K. Rowling. Not affiliated with or endorsed by the rights holders. Built as a portfolio demonstration — not for commercial use."

### Design
- Semi-transparent, small text (~11px), fixed to bottom of viewport
- Dark background matching the app's night theme
- Doesn't interfere with gameplay on mobile (collapses to 1-2 lines)

