

## Anonymize Player Data + Add Privacy & User Guide Page

### Overview
Five changes: hash player names in analytics, add a combined "About" page with user guide + privacy policy + terms, link it from the footer and welcome screen.

### Changes

| File | Change |
|------|--------|
| `src/lib/analytics.ts` | Add `hashName()` using Web Crypto API SHA-256; hash `player_name` before sending to backend |
| `src/pages/About.tsx` | **New** — single page with sections: **How to Play** (step-by-step user guide), **Privacy Policy**, **For Parents**, **Terms of Use**, **Disclaimer** |
| `src/App.tsx` | Add `/about` route |
| `src/components/DisclaimerFooter.tsx` | Add "Privacy & Guide" link |
| `src/screens/WelcomeScreen.tsx` | Add small privacy notice below name input with link to About page |

### User Guide content (inside About page)
1. **Enter your wizard name** — pick any name, it stays on your device only
2. **Choose a spell book** — browse spells organized by difficulty
3. **Learn the spell** — read about each spell's history and usage
4. **Practice casting** — type the spell name, then complete an interactive challenge (tap, drag, or choose)
5. **Complete all 3 scenarios** — master each spell by finishing all three narrative scenarios
6. **Rate and track progress** — rate spells and view your stats

### Technical detail
- SHA-256 hash via `crypto.subtle.digest()` — zero dependencies, all browsers
- Real name stays in React state only (on-device); server never sees readable names
- About page styled to match the app's dark/night theme with scroll sections

