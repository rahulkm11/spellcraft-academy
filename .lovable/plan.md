

## Fix LinkedIn Preview

### Problem
1. All `og:image`, `og:url`, and `twitter:image` meta tags point to the old `94bc7123-...lovable.app` domain instead of `spellbook-magic-play.lovable.app`
2. The `og-image.jpg` file in `/public` is blank white — LinkedIn has nothing to show

### Fix

**Step 1: Generate a proper OG image (1200x630px)**
Create an HTML-to-image OG card programmatically using a React component rendered to a canvas, or generate one via a script. The image will feature:
- Deep purple/magical gradient background
- "SpellCraft" title in large text
- Tagline: "Interactive Spell Learning for Kids"
- Wand/sparkle emoji or simple decorative elements
- 1200x630px (LinkedIn recommended size)

Since we can't run server-side image generation easily, the simplest approach is to **create a dedicated `/og-preview` route** that renders a styled 1200x630 card, screenshot it, and save as `og-image.png`. Alternatively, I can generate the image via a script.

**Step 2: Update `index.html` meta tags**
Change all URLs from `https://94bc7123-0dfd-44e9-88c3-dcd401e83158.lovable.app/` to `https://spellbook-magic-play.lovable.app/`:

```html
<meta property="og:url" content="https://spellbook-magic-play.lovable.app/" />
<meta property="og:image" content="https://spellbook-magic-play.lovable.app/og-image.png" />
<meta name="twitter:image" content="https://spellbook-magic-play.lovable.app/og-image.png" />
```

### Files Changed
- `index.html` — fix all meta tag URLs
- `public/og-image.png` — new branded OG image (replaces blank jpg)

### Technical Detail
LinkedIn caches OG data aggressively. After deploying, you'll need to clear the cache at [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) by entering your URL.

