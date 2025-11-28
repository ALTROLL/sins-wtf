# sins.wtf - Project Context

## What This Project Is
A **free link-in-bio platform** (like guns.lol but completely free). Users create profiles at `sins.wtf/username` with custom links, themes, effects, etc.

## Tech Stack
- **Frontend/Backend**: Next.js (App Router, TypeScript, Tailwind)
- **Database + Auth**: Supabase
- **Hosting**: Vercel (free tier)
- **DNS/CDN**: Cloudflare
- **Domain**: sins.wtf (bought on Namecheap)

## Features (All Free)
1. **Typewriter Description** - Animated bio with customizable speed
2. **Metadata & SEO** - Custom title, description, embed image, favicon
3. **Profile Widgets** - YouTube, Discord, Telegram, Spotify embeds
4. **Cursor Effects** - Trails, sparkles, custom cursors
5. **Layout Customization** - Banners, borders, buttons, icons
6. **Custom Fonts** - Choose from library or upload your own

## URL Structure
```
sins.wtf/                → Landing page
sins.wtf/login           → Login page
sins.wtf/register        → Signup page  
sins.wtf/dashboard       → User dashboard (edit profile)
sins.wtf/username        → Public profile page (dynamic)
```

## Database Schema Needed
```sql
profiles
├── id (uuid)
├── user_id (links to auth)
├── username (unique, lowercase) -- URL slug
├── display_name
├── bio
├── avatar_url
├── theme (JSON - colors, effects, etc.)
└── created_at

links
├── id
├── profile_id
├── title
├── url
├── icon
├── order
└── enabled
```

## Landing Page
The landing page HTML is already built at `c:\Users\Damir\Downloads\wawa\index2.html`. 
It needs to be converted to a Next.js page component (`app/page.tsx`).

### Landing Page Features:
- Dark theme with red accents (#ff3333)
- Animated background (floating orbs, particles, grid)
- Stats section with counter animation (numbers count up on scroll)
- Feature cards with Lucide icons
- shadcn-style FAQ accordion
- Claim username input boxes
- Inter font from Google Fonts

## Business Model
- 100% free, no premium tiers
- Funded by owner + community donations
- No ads, no tracking

## Next Steps
1. Convert landing page HTML to Next.js page.tsx
2. Set up Supabase config (.env.local)
3. Create database tables in Supabase
4. Build auth pages (login/register)
5. Build dashboard page
6. Build dynamic profile page [username]
7. Deploy to Vercel
8. Connect domain via Cloudflare

## Important Notes
- Never use em dashes (—) in text, it looks AI-generated
- Use Lucide icons via CDN or npm package
- shadcn/ui style for components (accordion, inputs, buttons)
- Keep the edgy/dark aesthetic throughout
