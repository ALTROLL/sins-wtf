# sins.wtf UI Design Guide

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary: #ff3333;           /* Main red accent */
--primary-dark: #cc0000;      /* Darker red for hover states */
--primary-glow: rgba(255, 51, 51, 0.4);  /* Glow effect */

/* Background Colors */
--bg-dark: #050505;           /* Main page background */
--bg-sidebar: #0a0a0a;        /* Sidebar background */
--bg-card: #0f0f0f;           /* Card background */
--bg-card-hover: #141414;     /* Card hover state */
--bg-input: #111111;          /* Input field background */

/* Text Colors */
--text: #ffffff;              /* Primary text */
--text-muted: rgba(255, 255, 255, 0.5);    /* Muted/secondary text */
--text-secondary: rgba(255, 255, 255, 0.7); /* Semi-muted text */

/* Border Colors */
--border: rgba(255, 255, 255, 0.08);       /* Default border */
--border-hover: rgba(255, 255, 255, 0.15); /* Hover border */

/* Accent Colors */
--success: #22c55e;           /* Green - success states */
--purple: #8b5cf6;            /* Purple - special elements */
--blue: #3b82f6;              /* Blue - links/info */
--orange: #f97316;            /* Orange - warnings */
--pink: #f472b6;              /* Pink - decorative */
--yellow: #fbbf24;            /* Yellow - highlights */
```

---

## 📐 Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Font Weights
| Weight | Usage |
|--------|-------|
| 300 | Light text, subtle labels |
| 400 | Body text |
| 500 | Medium emphasis, nav items |
| 600 | Semi-bold, section titles |
| 700 | Bold, card values |
| 800 | Extra bold, page titles |

### Font Sizes
| Size | Usage |
|------|-------|
| 11px | UIDs, tiny labels |
| 12px | Badges, hints, subtitles |
| 13px | Buttons, form labels |
| 14px | Body text, nav items |
| 16px | Section titles |
| 18px | Card titles |
| 20px | Logo text |
| 24-28px | Page titles |
| 36px | Large stat numbers |

---

## 🧱 Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary), #ff6600);
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 51, 51, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 51, 51, 0.4);
}
```

#### Outline Button
```css
.btn-outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-hover);
}
```

#### Purple Button
```css
.btn-purple {
  background: var(--purple);
  color: white;
}

.btn-purple:hover {
  background: #7c3aed;
  transform: translateY(-1px);
}
```

### Cards

#### Standard Card
```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s;
}

.card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}
```

#### Overview Card (with colored accent)
```css
.overview-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.overview-card:hover::before {
  opacity: 1;
}
```

### Inputs

#### Text Input
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  font-size: 14px;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 51, 51, 0.1);
}
```

#### Input with Icon
```css
.form-input-icon {
  position: relative;
}

.form-input-icon input {
  padding-left: 44px;
}

.form-input-icon svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  width: 18px;
  height: 18px;
}
```

### Toggle Tabs
```css
.toggle-tabs {
  display: inline-flex;
  background: var(--bg-input);
  border-radius: 10px;
  padding: 4px;
}

.toggle-tab {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  color: var(--text-muted);
  transition: all 0.2s;
}

.toggle-tab.active {
  background: var(--bg-card);
  color: var(--text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
```

---

## 🎭 Effects & Animations

### Background Glow
```css
.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.12;
}

/* Animate with Framer Motion */
animate={{ 
  scale: [1, 1.2, 1], 
  opacity: [0.12, 0.18, 0.12] 
}}
transition={{ 
  duration: 8, 
  repeat: Infinity, 
  ease: "easeInOut" 
}}
```

### Hover Lift Effect
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}
```

### Progress Bar Shimmer
```css
.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

### Framer Motion Presets

#### Fade In
```tsx
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
```

#### Stagger Container
```tsx
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
```

#### Hover Button
```tsx
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
>
```

#### Nav Item Hover
```tsx
<motion.button
  whileHover={{ x: 4 }}
  whileTap={{ scale: 0.98 }}
>
```

---

## 📏 Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps |
| sm | 8px | Tight spacing |
| md | 12px | Default spacing |
| lg | 16px | Section padding |
| xl | 20px | Card padding |
| 2xl | 24px | Large sections |
| 3xl | 32px | Page margins |

---

## 🔲 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 6px | Small buttons, badges |
| md | 8px | Inputs, small cards |
| lg | 10px | Buttons, nav items |
| xl | 12px | Medium cards |
| 2xl | 16px | Large cards |
| 3xl | 20px | Preview cards |
| full | 50% | Avatars, circles |

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1400px) {
  /* Full layout with preview panel */
}

/* Laptop */
@media (max-width: 1400px) {
  .overview-grid { grid-template-columns: repeat(2, 1fr); }
  .content-grid { grid-template-columns: 1fr; }
  .preview-panel { display: none; }
}

/* Tablet */
@media (max-width: 768px) {
  .sidebar { transform: translateX(-100%); }
  .main { margin-left: 0; }
  .overview-grid { grid-template-columns: 1fr; }
}
```

---

## 🧩 Layout Structure

### Dashboard Layout
```
┌──────────────────────────────────────────────────────────┐
│ Sidebar (260px)  │  Main Content (flex: 1)  │ Preview    │
│                  │                          │ (340px)    │
│ ┌──────────────┐ │  ┌────────────────────┐  │            │
│ │ Logo         │ │  │ Page Header        │  │ ┌────────┐ │
│ ├──────────────┤ │  ├────────────────────┤  │ │ Live   │ │
│ │ Main Nav     │ │  │ Overview Cards     │  │ │ Preview│ │
│ │ - Dashboard  │ │  │ ┌───┐ ┌───┐ ┌───┐  │  │ │        │ │
│ │ - Customize  │ │  │ └───┘ └───┘ └───┘  │  │ │        │ │
│ │ - Links      │ │  ├────────────────────┤  │ │        │ │
│ │ - Analytics  │ │  │ Content Grid       │  │ │        │ │
│ ├──────────────┤ │  │ ┌─────────┐ ┌────┐ │  │ │        │ │
│ │ Account      │ │  │ │ Stats   │ │Side│ │  │ │        │ │
│ │ - Profile    │ │  │ │ Card    │ │Bar │ │  │ │        │ │
│ │ - Settings   │ │  │ └─────────┘ └────┘ │  │ └────────┘ │
│ ├──────────────┤ │  └────────────────────┘  │            │
│ │ Help Box     │ │                          │            │
│ │ Quick Btns   │ │                          │            │
│ │ Share Btn    │ │                          │            │
│ │ User Profile │ │                          │            │
│ └──────────────┘ │                          │            │
└──────────────────────────────────────────────────────────┘
```

---

## 🎯 Icon System

Using **Lucide React** icons:

```tsx
import {
  LayoutDashboard,  // Dashboard
  Palette,          // Customize
  Link2,            // Links
  BarChart3,        // Analytics
  User,             // Profile
  Settings,         // Settings
  Eye,              // Views
  TrendingUp,       // Growth
  Plus,             // Add
  Trash2,           // Delete
  Pencil,           // Edit
  Check,            // Success
  X,                // Close
  Upload,           // Upload
  Copy,             // Copy
  Share2,           // Share
  ExternalLink,     // External link
  HelpCircle,       // Help
} from "lucide-react";
```

Standard icon sizes:
- **14px**: Small buttons, inline
- **16px**: Buttons, nav
- **18px**: Card icons
- **20px**: Section headers
- **24px**: Large/emphasis

---

## ✅ Component Checklist

### Dashboard Components
- [x] Sidebar with nav
- [x] Overview cards
- [x] Profile status card
- [x] Progress bar with shimmer
- [x] Completion checklist
- [x] Analytics charts (placeholder)
- [x] Quick actions panel
- [x] Connections panel
- [x] Live preview panel

### Customize Components
- [x] Avatar section with shape options
- [x] Decoration button
- [x] Background color/media toggle
- [x] Banner upload
- [x] Display name input
- [x] Bio rich text editor
- [x] Occupation/Location fields
- [x] Tags section

### Links Components
- [x] Links list with drag handles
- [x] Link item with edit/delete
- [x] Add link form

### Form Components
- [x] Text input
- [x] Input with icon
- [x] Color picker
- [x] Toggle tabs
- [x] Shape buttons
- [x] Rich text editor toolbar

---

## 🚀 Animation Guidelines

1. **Subtle is better** - Don't overdo animations
2. **Duration**: 0.2s for hovers, 0.3-0.4s for transitions
3. **Easing**: Use `ease-in-out` or `cubic-bezier(0.4, 0, 0.2, 1)`
4. **Stagger**: 0.1s delay between list items
5. **Background effects**: Slow (8-10s), subtle opacity changes

---

## 🔗 Reference Sites

- **feds.lol** - Animation inspiration (Next.js + Framer Motion)
- **guns.lol** - Dashboard UI reference
- **shadcn/ui** - Component patterns
- **Tailwind CSS** - Utility classes reference

---

## 📝 Notes

- Always use CSS modules for component-specific styles
- Use CSS variables for theming consistency
- Framer Motion for complex animations
- Keep bundle size in mind - lazy load heavy components
- Test on dark backgrounds - everything should be visible
- Ensure sufficient contrast for accessibility
- Ensure mobile friendliness before desktop
