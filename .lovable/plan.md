

## Plan: Publish & Fix OG Image Meta Tags

### Step 1: Publish the App
You need to publish the app yourself — click the **Publish** button (web icon, top right of the editor). I cannot trigger publishing directly.

### Step 2: Update OG Image Meta Tags
Once published, the URL will be something like:
`https://94bc7123-0dfd-44e9-88c3-dcd401e83158.lovable.app`

I will update `index.html` lines 15 and 18 to use absolute URLs:

```html
<meta property="og:image" content="https://<published-domain>/og-image.jpg" />
<meta name="twitter:image" content="https://<published-domain>/og-image.jpg" />
```

Also add `og:url` meta tag for completeness:
```html
<meta property="og:url" content="https://<published-domain>/" />
```

### What You Need To Do
1. **Click Publish** (top-right web icon on desktop, or `...` → Publish on mobile)
2. **Tell me the published URL** so I can update the OG tags with the correct absolute domain

This is a single-file change to `index.html` — no other files affected.

