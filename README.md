# StickerSwap

Trade Panini FIFA World Cup 2026 stickers — collection tracker + smart matching + reviews.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Vercel auto-detects Vite. Just click Deploy.
4. Done — you get a live URL.

## Supabase

The Supabase URL + key are already set in `src/App.jsx`. The database tables
(profiles, collections, trades, reviews) are already created.

Before going live: turn email confirmation back ON in Supabase
(Authentication → Sign In / Providers → Email → Confirm email).
