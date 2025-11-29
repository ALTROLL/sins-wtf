# Copilot Instructions for sins.wtf

## Project Overview
sins.wtf is a **bio link page builder** (similar to Linktree/Guns.lol) built with Next.js 16 App Router. Users create customizable profile pages with social links, custom themes, video backgrounds, Discord integration, and more.

## Tech Stack
- **Framework**: Next.js 16 with App Router (React 19)
- **Database/Auth**: Supabase (PostgreSQL + Auth)
- **Styling**: CSS Modules + Tailwind CSS 4 + Framer Motion
- **UI Components**: Radix UI primitives, Lucide icons
- **Deployment**: Vercel

## Key Architecture Patterns

### Route Structure
- `/` - Landing page
- `/login`, `/register`, `/signup` - Auth pages
- `/dashboard` - User dashboard (protected, server-fetched)
- `/[username]` - Dynamic public profile pages

### Data Flow Pattern
```
Server Component (page.tsx) 
  → Fetches from Supabase via createClient()
  → Passes data to Client Component (*Client.tsx)
```

Example: `src/app/dashboard/page.tsx` fetches profile, passes to `DashboardClient.tsx`

### Supabase Client Usage
```typescript
// Server Components (RSC): use server client
import { createClient } from "@/lib/supabase/server";
const supabase = await createClient();

// Client Components: use browser client  
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();
```

### Database Schema (key tables in `src/types/database.types.ts`)
- `profiles` - User profiles (username, display_name, bio, avatar_url, views)
- `profile_customization` - Theme settings (colors, fonts, effects, card_style, etc.)
- `links` - Custom links with sort_order
- `social_links` - Platform-specific social links
- `widgets` - Embeddable widgets (YouTube, Spotify, Discord)

### Type Definitions
All types derived from Supabase schema at `src/types/index.ts`:
- `Profile`, `ProfileCustomization`, `Link`, `SocialLink`, `Widget`
- `PublicProfile` - Combined type for fetching complete profile data

## Profile Customization Features

### Background Types
```typescript
background_type: "color" | "image" | "video"
```

### Card Styles
```typescript
card_style: "classic" | "frosted_square" | "frosted_soft" | "outlined" | "aurora" | "transparent"
```

### Avatar Styles
```typescript
avatar_style: "circle" | "square" | "rounded" | "hexagon"
```

### Effects
- `click_to_enter` - Entry overlay before profile loads
- `typewriter_enabled` + `typewriter_phrases[]` - Animated bio text
- `discord_widget_enabled` + `discord_user_id` - Live Discord status
- `parallax_enabled` - 3D card tilt on hover
- `sparkle_name` - Glitter effect on username

## Component Patterns

### Profile Page (`src/app/[username]/ProfilePage.tsx`)
- Uses CSS Modules (`profile.module.css`) for styling
- Fetches Discord status from `dcdn.dstn.to/profile/{user_id}`
- Supports video backgrounds with audio (unmuted on click-to-enter)

### Dashboard (`src/app/dashboard/DashboardClient.tsx`)
- Tab-based navigation: dashboard, customize, links, analytics, profile, settings
- Uses Framer Motion for animations
- Real-time profile preview panel

## Critical Conventions

### File Naming
- Server pages: `page.tsx`
- Client components: `*Client.tsx` or `ComponentName.tsx`
- CSS Modules: `*.module.css`

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### CSS Module Usage
```typescript
import styles from "./component.module.css";
// Use: className={styles.className}
// Combine: className={`${styles.class1} ${styles.class2}`}
```

### Protected Routes
Middleware at `src/middleware.ts` handles auth session refresh. Dashboard checks auth server-side and redirects to `/login` if unauthorized.

## Development Commands
```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
npm run lint   # ESLint
```

## Common Patterns to Follow

### Adding New Profile Features
1. Add field to `profile_customization` table type in `src/types/database.types.ts`
2. Add to `ProfileCustomization` interface in component
3. Implement in `ProfilePage.tsx` with CSS Module styling
4. Add dashboard control in `DashboardClient.tsx` under appropriate tab

### Social Platform Icons
SVG icons are inline in `ProfilePage.tsx` in the `socialIcons` object. Add new platforms by adding the SVG path there.

### Discord Integration
Uses Lanyard-compatible API (`dcdn.dstn.to`). User must have Discord ID stored in customization.discord_user_id.
