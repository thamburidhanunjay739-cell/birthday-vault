# 🎂 Birthday Vault

A cinematic, immersive birthday website built as a love letter from one PharmD friend to another.

## ✨ Features

- **Password-locked entry** — Gate page with animated unlock (`pharmacy` is the password)
- **Animated starfield** — Canvas-based constellation background with parallax
- **Cinematic hero** — Mouse-reactive 3D name effect with staggered reveals
- **Scroll-reveal timeline** — 4 PharmD chapters with intersection observer animations
- **Memory gallery** — Full masonry grid with hover overlays + lightbox navigation
- **The Letter** — A typewriter-style emotional birthday letter with scroll-reveal paragraphs

## 🗂️ Project Structure

```
birthday-vault/
├── app/
│   ├── vault/
│   │   └── page.tsx          ← Main page (password gate + full experience)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              ← Redirects to /vault
├── components/
│   ├── ConstellationBackground.tsx
│   ├── HeroSection.tsx
│   ├── TimelineSection.tsx
│   ├── GallerySection.tsx
│   └── LetterSection.tsx
├── public/
│   └── memories/             ← PUT ALL YOUR PHOTOS HERE ← IMPORTANT
│       ├── IMG_1241.JPG
│       ├── IMG_1242.JPG
│       └── ... (all your photos)
└── ...config files
```

## 🚀 Setup

1. **Copy these files** into your existing VS Code project (merge with your current structure)

2. **Place your photos** in `public/memories/` — they are already referenced in `GallerySection.tsx`

3. **Update the photo list** in `GallerySection.tsx` if you want to:
   - Change captions
   - Reorder photos
   - Add/remove entries

4. **Personalize the letter** in `LetterSection.tsx` — the `LETTER_PARAGRAPHS` array

5. **Change the password** in `app/vault/page.tsx`:
   ```ts
   const PASSWORD = "pharmacy"; // ← change this
   ```

6. **Install & run:**
   ```bash
   npm install
   npm run dev
   ```

7. **Deploy to Vercel:**
   - Push to GitHub
   - Connect repo to Vercel
   - Deploy → get a shareable URL

## 🎨 Customization

- **Friend's name**: Edit the `hero-name` div in `HeroSection.tsx`
- **Timeline content**: Edit the `CHAPTERS` array in `TimelineSection.tsx`
- **Gallery captions**: Edit the `PHOTOS` array in `GallerySection.tsx`
- **Colors**: CSS variables in `globals.css` — `--gold` drives the whole palette

## 💛 Made with love

*For a friendship forged in pharmacology labs, ward rounds, and midnight chai.*
