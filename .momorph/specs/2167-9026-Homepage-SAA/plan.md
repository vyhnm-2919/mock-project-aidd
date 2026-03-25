# Implementation Plan: Homepage SAA

**Frame:** `2167:9026` — Homepage SAA
**Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-10
**Constitution:** v1.0.0

---

## 1. Constitution Compliance

| Requirement | Constitution Rule | Status |
|---|---|---|
| TypeScript strict | P2: `strict: true`, no `any` | ✅ Compliant |
| Server Components default | P3: Only `"use client"` when required | ✅ Planned — 5 Client Components only |
| Route structure | P3: `src/app/(main)/page.tsx` | ✅ Compliant |
| Mobile-first responsive | P4: Tailwind breakpoints `md/lg/xl` | ✅ Planned |
| Protected route | P5: Middleware redirect | ✅ Exists |
| `next/image` for all images | P6: Performance | ✅ Planned |
| No `dangerouslySetInnerHTML` | P5: XSS prevention | ✅ Compliant |
| Clean code < 200 lines/file | P1: Single responsibility | ✅ Planned |
| Kebab-case files | Naming conventions | ✅ Planned |
| PascalCase components | Naming conventions | ✅ Planned |
| WCAG AA | P7: Accessibility | ✅ Planned |
| Conventional Commits | P7: `feat(homepage): ...` | ✅ Planned |

---

## 2. Architecture Decisions

### 2.1. Route Structure

```
src/app/
├── (auth)/login/          # Existing — Login page
├── (main)/                # NEW — Authenticated route group
│   ├── layout.tsx         # Shared layout: Header + Footer + Widget
│   └── page.tsx           # Homepage SAA
└── layout.tsx             # Root layout (fonts, metadata) — Existing
```

**Decision:** Create `(main)` route group per constitution. Delete placeholder `src/app/page.tsx`. The `(main)/layout.tsx` wraps all authenticated pages with shared Header, Footer, and WidgetButton — so future pages (Awards, Kudos) inherit them automatically.

### 2.2. Component Architecture

```
Server Components (default)                Client Components ("use client")
─────────────────────────                  ─────────────────────────────────
HomepageSAA (page.tsx)                     Countdown (setInterval, state)
MainHeader (layout)                        LanguageSelector (dropdown state)
NavLink (active state via pathname)        NotificationBell (fetch + state)
EventInfo (static text)                    UserMenu (dropdown state)
HeroCTA (Link components)                  WidgetButton (toggle state)
RootFurtherContent (static text)
AwardsSection (grid layout)
AwardCard (reusable, Link)
SunKudosSection (static + Link)
MainFooter (static)
```

**Decision:** Minimize client JS bundle per Constitution P6. Only 5 components need `"use client"` for interactivity. All other components render on the server.

### 2.3. LanguageSelector — Extract to Shared Component

The login screen already has a fully functional `LanguageSelector` at `src/components/login/language-selector.tsx`. This component will be **moved** to `src/components/header/language-selector.tsx` and reused across both login and homepage headers.

**Migration steps:**
1. Move `src/components/login/language-selector.tsx` → `src/components/header/language-selector.tsx`
2. Update import in `src/components/login/login-header.tsx`
3. Use in `MainHeader`

### 2.4. Digital Numbers Font

The countdown uses the "Digital Numbers" custom font (not on Google Fonts). This requires `next/font/local`.

**Approach:**
1. Download `DigitalNumbers-Regular.woff2` to `src/fonts/`
2. Register via `next/font/local` in root `layout.tsx`
3. Expose as CSS variable `--font-digital-numbers`
4. Add to Tailwind `@theme` in `globals.css`

### 2.5. i18n Expansion

Current i18n system is login-specific (`LoginTranslations`). Homepage needs its own translations.

**Approach:**
1. Create `src/types/homepage.ts` for homepage types (translations + award data)
2. Expand `src/utils/i18n.ts` with `HomepageTranslations` and `getHomepageTranslations()`
3. Keep existing `LoginTranslations` unchanged (no breaking changes)

### 2.6. Image Strategy

All images use `next/image` with responsive `sizes` prop (Constitution P6).

| Image | Strategy | Sizes |
|---|---|---|
| Background artwork | `fill` + `priority` + `sizes="100vw"` | Full viewport |
| ROOT FURTHER logo (hero) | `width/height` + responsive | `(max-width: 768px) 280px, (max-width: 1024px) 360px, 451px` |
| Award card images (x6) | `width={336} height={336}` + `sizes` | `(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 336px` |
| Kudos illustration | Responsive within flex container | `(max-width: 768px) 100vw, 40vw` |
| Icons (SVG) | Direct `<Image>` 24x24 | Static size |

### 2.7. State Management

| State | Scope | Storage |
|---|---|---|
| `locale` | Global | Cookie (`locale`) — read by server, set by client |
| `user` | Server | Supabase session via middleware |
| `countdown` | Local (Countdown) | `useState` + `useEffect` interval |
| `isOpen` (dropdowns) | Local per component | `useState` |
| `unreadCount` | Local (NotificationBell) | `useState` + `fetch` |

No global state library needed. Cookie-based locale + Supabase session is sufficient.

### 2.8. API Endpoints

| Endpoint | Priority | Notes |
|---|---|---|
| `GET /api/notifications/unread-count` | P2 | Returns `{ count: number }`. Client-fetched in NotificationBell. |
| `GET /api/user/profile` | P2 | Returns user role for admin link in UserMenu. Can use Supabase session directly instead. |
| `GET /api/awards` | Deferred | Only needed if awards become dynamic/CMS-driven. Start with static data. |

**Decision:** For P1 (MVP), use static award data and Supabase session for user info. Build notification endpoint in P2. This avoids blocking the homepage on backend API work.

---

## 3. Project Structure

### 3.1. New Files

| # | File | Purpose | Type |
|---|---|---|---|
| 1 | `src/app/(main)/layout.tsx` | Shared layout: Header + children + Footer + Widget | Server |
| 2 | `src/app/(main)/page.tsx` | Homepage SAA — assembles all sections | Server |
| 3 | `src/components/header/main-header.tsx` | Sticky header with nav, controls | Server |
| 4 | `src/components/header/nav-link.tsx` | Navigation link with active state | Server |
| 5 | `src/components/header/notification-bell.tsx` | Bell icon + unread badge | Client |
| 6 | `src/components/header/user-menu.tsx` | Avatar dropdown (profile/signout) | Client |
| 7 | `src/components/homepage/hero-section.tsx` | Hero wrapper: logo + countdown + event info + CTAs | Server |
| 8 | `src/components/homepage/countdown.tsx` | Real-time Days/Hours/Minutes countdown | Client |
| 9 | `src/components/homepage/event-info.tsx` | Date, location, livestream text | Server |
| 10 | `src/components/homepage/hero-cta.tsx` | ABOUT AWARDS + ABOUT KUDOS buttons | Server |
| 11 | `src/components/homepage/root-further-content.tsx` | Description frame with quote | Server |
| 12 | `src/components/homepage/awards-section.tsx` | Section header + award grid | Server |
| 13 | `src/components/homepage/award-card.tsx` | Reusable card: image + title + desc + link | Server |
| 14 | `src/components/homepage/sun-kudos-section.tsx` | Kudos promo: text + illustration + CTA | Server |
| 15 | `src/components/footer/main-footer.tsx` | Footer: logo + nav links + copyright | Server |
| 16 | `src/components/widget-button.tsx` | Fixed FAB with quick actions | Client |
| 17 | `src/types/homepage.ts` | Homepage types: translations, award data | Types |
| 18 | `src/fonts/DigitalNumbers-Regular.woff2` | Custom font for countdown digits | Asset |
| 19 | `public/images/homepage/bg-artwork.webp` | Hero background artwork | Asset |
| 20 | `public/images/homepage/root-further-hero.png` | ROOT FURTHER logo (large, hero) | Asset |
| 21 | `public/images/homepage/root-further-small.png` | ROOT FURTHER logo (small, content frame) | Asset |
| 22 | `public/images/homepage/awards/*.webp` | Award card images (x6) | Assets |
| 23 | `public/images/homepage/kudos-illustration.webp` | Sun* Kudos illustration | Asset |
| 24 | `public/images/icons/bell.svg` | Notification bell icon | Asset |
| 25 | `public/images/icons/arrow-up-right.svg` | Arrow icon for CTAs and links | Asset |
| 26 | `public/images/icons/user.svg` | User profile icon | Asset |
| 27 | `public/images/icons/pen.svg` | Widget pen icon | Asset |
| 28 | `public/images/icons/saa-icon.svg` | Widget SAA icon | Asset |
| 29 | `src/app/api/notifications/unread-count/route.ts` | API: unread notification count | Server (API Route) |
| 30 | `src/components/header/mobile-nav.tsx` | Hamburger button + slide-out mobile nav panel | Client |

### 3.2. Modified Files

| File | Changes |
|---|---|
| `src/app/page.tsx` | **Delete** — replaced by `(main)/page.tsx` |
| `src/app/layout.tsx` | Add Digital Numbers font (`next/font/local`), CSS variable, fix Montserrat Alternates weight `["400","700"]` |
| `src/app/globals.css` | Add design tokens (`--font-digital-numbers`, `--color-saa-accent`, `--color-saa-notification`, countdown styles) |
| `next.config.ts` | Add `images` config if needed for Cloudflare static optimization (test with `wrangler preview` first — may work without config for local images) |
| `src/components/login/language-selector.tsx` | **Move** → `src/components/header/language-selector.tsx` |
| `src/components/login/login-header.tsx` | Update import path for LanguageSelector + update logo image path from `login/logo-saa.png` to `logo-saa.png` |
| `src/utils/i18n.ts` | Add `HomepageTranslations`, `getHomepageTranslations()`, `getAwardItems()`, `getRootFurtherContent()` |
| `.env.development` | Add `NEXT_PUBLIC_EVENT_START_DATETIME` |

### 3.3. Dependencies

No new npm packages required. Existing stack is sufficient:

| Existing Package | Used For |
|---|---|
| `next` 15.x | App Router, `next/image`, `next/font`, `next/link` |
| `react` 19.x | Client Components, hooks |
| `@supabase/ssr` | Session management |
| `tailwindcss` 4.x | All styling |

---

## 4. Implementation Phases

### Phase 0: Asset Preparation

**Goal:** Download all required visual assets from Figma before any code work.

**Tasks:**
1. Use `get_media_files` MCP tool to download all assets listed in design-style.md §7
2. Organize into `public/images/homepage/` and `public/images/icons/`
3. Download Digital Numbers font file → `src/fonts/DigitalNumbers-Regular.woff2`
4. **Reuse existing assets:** Logo SAA at `public/images/login/logo-saa.png` → move to `public/images/logo-saa.png` (shared between login and homepage). Update `src/components/login/login-header.tsx` to reference the new path. Icons `flag-vn.svg`, `flag-en.svg`, `chevron-down.svg` already exist in `public/images/icons/`.
5. Verify all asset files exist and are correctly named

**File structure after Phase 0:**
```
public/images/
├── icons/
│   ├── google.svg          # Existing
│   ├── flag-vn.svg         # Existing
│   ├── flag-en.svg         # Existing
│   ├── chevron-down.svg    # Existing
│   ├── bell.svg            # NEW
│   ├── arrow-up-right.svg  # NEW
│   ├── user.svg            # NEW
│   ├── pen.svg             # NEW
│   └── saa-icon.svg        # NEW
├── login/                  # Existing (unchanged)
└── homepage/               # NEW
    ├── bg-artwork.webp
    ├── root-further-hero.png
    ├── root-further-small.png
    ├── kudos-illustration.webp
    └── awards/
        ├── top-talent.webp
        ├── top-project.webp
        ├── top-project-leader.webp
        ├── best-manager.webp
        ├── signature-creator.webp
        └── mvp.webp
src/fonts/
└── DigitalNumbers-Regular.woff2
```

---

### Phase 1: Foundation & Shared Infrastructure

**Goal:** Setup route structure, design tokens, fonts, types, and shared layout components.

**Tasks:**

#### 1.1. Delete placeholder and create route group
- Delete `src/app/page.tsx`
- Create `src/app/(main)/layout.tsx` — minimal wrapper (children only, Header/Footer added in Phase 2)
- Create `src/app/(main)/page.tsx` — temporary skeleton with section placeholders

#### 1.2. Register Digital Numbers font + fix Montserrat Alternates
- Place font file in `src/fonts/`
- Update `src/app/layout.tsx`:
  ```typescript
  import localFont from "next/font/local";

  const digitalNumbers = localFont({
    src: "../fonts/DigitalNumbers-Regular.woff2",
    variable: "--font-digital-numbers",
    display: "swap",
  });
  ```
- Add variable to `<body>` className
- **Fix Montserrat Alternates:** Add weight `"400"` to `Montserrat_Alternates` config (footer uses 14px/400):
  ```typescript
  const montserratAlt = Montserrat_Alternates({
    subsets: ["latin", "vietnamese"],
    weight: ["400", "700"],  // was ["700"] — footer needs 400
    variable: "--font-montserrat-alt",
  });
  ```

#### 1.3. Expand design tokens in globals.css
- Add missing tokens from design-style.md:
  ```css
  @theme inline {
    /* existing tokens... */
    --font-digital-numbers: var(--font-digital-numbers);
    --color-saa-accent: #998C5F;
    --color-saa-notification: #D4271D;
    --color-saa-text-accent: #FFEA9E;
    --color-saa-header-bg: rgba(16, 20, 23, 0.8);
  }
  ```

#### 1.4. Create homepage types
- Create `src/types/homepage.ts`:
  ```typescript
  export interface HomepageTranslations {
    // Navigation
    navAboutSaa: string;       // "About SAA 2025"
    navAwardInfo: string;      // "Award Information"
    navSunKudos: string;       // "Sun* Kudos"
    navTieuChuan: string;      // "Tiêu chuẩn chung"
    // Hero
    comingSoon: string;
    days: string;
    hours: string;
    minutes: string;
    eventTimeLabel: string;    // "Thời gian:"
    eventTimeValue: string;    // "26/12/2025"
    eventVenueLabel: string;   // "Địa điểm:"
    eventVenueValue: string;   // "Âu Cơ Art Center"
    livestreamNote: string;
    aboutAwards: string;       // CTA button text
    aboutKudos: string;        // CTA button text
    // Awards
    awardsCaption: string;
    awardsTitle: string;
    detail: string;            // "Chi tiết"
    // Kudos
    kudosLabel: string;
    kudosTitle: string;
    kudosSubtitle: string;
    kudosDescription: string;
    // Footer
    copyright: string;
  }

  // Root Further content is long-form — stored separately
  export interface RootFurtherContent {
    paragraphs: string[];      // Array of paragraph strings
    quote: string;             // "A tree with deep roots fears no storm"
    quoteAttribution: string;  // "(Cây sâu bền rễ, bão giông chẳng nề - Ngạn ngữ Anh)"
  }

  export interface AwardItem {
    slug: string;
    title: string;
    description: string;
    image: string;
  }
  ```

#### 1.5. Expand i18n
- Add `HomepageTranslations` to `src/utils/i18n.ts`
- Add `getHomepageTranslations(locale: Locale)` function
- Add `getAwardItems(locale: Locale): AwardItem[]` function (static data for 6 awards)
- Add `getRootFurtherContent(locale: Locale): RootFurtherContent` function — returns paragraphs array + quote (long-form text stored as string arrays, not in the short-label translations object)

#### 1.6. Move LanguageSelector to shared location
- Move `src/components/login/language-selector.tsx` → `src/components/header/language-selector.tsx`
- Update import in `src/components/login/login-header.tsx`

**Verification:** `yarn dev` starts without errors, `/` renders skeleton page, login still works.

---

### Phase 2: Header & Footer (Shared Layout)

**Goal:** Build the sticky header and footer that appear on all authenticated pages.

**Tasks:**

#### 2.1. MainHeader (`src/components/header/main-header.tsx`)
- Server Component
- Sticky header: `sticky top-0 z-50`
- Background: `rgba(16,20,23,0.8)` + `backdrop-blur-[10px]`
- Layout: flex row, `justify-between`, `items-center`, `px-6 md:px-20 xl:px-36 py-3`
- Contains: Logo, NavLinks, NotificationBell, LanguageSelector, UserMenu
- **Pathname for active nav:** Use `headers()` from `next/headers` to read the current URL (via `x-invoke-path` or `x-url` header set by Next.js internals). Pass as prop to NavLink. Alternative: make NavLink a thin client wrapper using `usePathname()` — acceptable since it's a small component with no heavy deps.
- Pass `locale` as server-side prop (from `getLocaleFromCookie()`)

#### 2.2. NavLink (`src/components/header/nav-link.tsx`)
- Server Component (receives `pathname` from parent)
- Props: `href`, `label`, `isActive`
- Active: `text-[#FFEA9E]`, `border-b border-[#FFEA9E]`, text-shadow glow
- Normal: `text-white`, `hover:bg-white/10`
- Links: "About SAA 2025" → `/`, "Award Information" → `/awards`, "Sun* Kudos" → `/kudos`

#### 2.3. NotificationBell (`src/components/header/notification-bell.tsx`)
- Client Component — fetches unread count
- `useEffect` to call `/api/notifications/unread-count` on mount
- Badge: 8x8px red dot, conditionally rendered
- Stub: hardcode `unreadCount = 0` until API is built (Phase 5)
- Click handler: toggle `isPanelOpen` state
- **Notification panel:** Render a simple placeholder dropdown on click ("Không có thông báo mới"). Full notification list UI is out of scope for Homepage — will be implemented as a separate feature when notification system is ready.
- Accessible: `aria-label="Thông báo"`

#### 2.4. UserMenu (`src/components/header/user-menu.tsx`)
- Client Component — dropdown toggle
- Icon: 40x40px with `#998C5F` border
- Dropdown: Profile link (placeholder `/profile`), Sign out, Admin (if applicable)
- **Sign out fully implemented in Phase 2** (not deferred to Phase 5): calls `supabase.auth.signOut()` → `router.push('/login')`. This is a critical flow.
- Close on outside click + Escape key (reuse pattern from LanguageSelector)
- Admin link: conditionally show based on user metadata from Supabase session (`supabase.auth.getUser()` client-side)
- Ref: dropdown-profile frame `721:5223`

#### 2.5. MainFooter (`src/components/footer/main-footer.tsx`)
- Server Component
- Layout: flex row, `justify-between`, `items-center`
- `border-t border-[#2E3940]`, `px-6 xl:px-36 py-10`
- Content: Logo (69x64), nav links (same as header + "Tiêu chuẩn chung"), copyright
- Links: hover → `text-[#FFEA9E]`, underline

#### 2.6. WidgetButton (`src/components/widget-button.tsx`)
- Client Component — toggle state
- `position: fixed; bottom: 32px; right: 19px; z-index: 60`
- Pill shape: `rounded-full`, `bg-[#FFEA9E]`, 106x64px
- Content: pen icon + "/" + SAA icon
- Hover: scale(1.05), lighter yellow
- Quick action menu: defer implementation (placeholder `TODO`)

#### 2.7. Update (main) layout
- Import and render: `<MainHeader>`, `{children}`, `<MainFooter>`, `<WidgetButton>`
- Pass locale from `getLocaleFromCookie()`

**Verification:** Header sticky with working nav links (active state on `/`), footer renders, widget floats. Language selector and user menu dropdowns toggle. Login page still works (different layout).

---

### Phase 3: Hero Section (US1 + US3)

**Goal:** Build the hero area with ROOT FURTHER banner, countdown, event info, and CTA buttons.

**Tasks:**

#### 3.1. HeroSection wrapper (`src/components/homepage/hero-section.tsx`)
- Server Component
- Contains: Background image (absolute), gradient overlay, ROOT FURTHER logo, Countdown, EventInfo, HeroCTA
- Background: `<Image>` with `fill`, `priority`, `object-cover`, z-index 1
- Gradient: `<div>` with CSS gradient from design-style.md, z-index 2
- Content area: `relative z-10`, centered, `px-6 xl:px-36 pt-24 xl:pt-32`

#### 3.2. Countdown (`src/components/homepage/countdown.tsx`)
- Client Component — core interactivity
- Props: `targetDate: string` (ISO-8601 from env var)
- State: `{ days, hours, minutes, isExpired }`
- Logic:
  - `useEffect` → `setInterval` every 60,000ms (1 min)
  - Calculate diff: `target - now` → days/hours/minutes
  - Zero-padding: `.toString().padStart(2, '0')`
  - If expired: show `00:00:00`, hide "Coming soon"
- Digit box: `w-[51px] h-[82px]`, gradient bg, blur backdrop, `border-[0.5px] border-[#FFEA9E]`, opacity 0.5
- Font: Digital Numbers 49px
- Labels: "DAYS", "HOURS", "MINUTES" — Montserrat 24px/700
- If `targetDate` is empty/undefined: render nothing (Scenario 5)
- Accessibility: `role="timer"`, `aria-live="polite"`, `aria-label` with current countdown

#### 3.3. EventInfo (`src/components/homepage/event-info.tsx`)
- Server Component
- 2 rows: "Thời gian: 26/12/2025" + "Địa điểm: Âu Cơ Art Center"
- Livestream note below
- i18n: All text from `HomepageTranslations`

#### 3.4. HeroCTA (`src/components/homepage/hero-cta.tsx`)
- Server Component (uses `next/link`)
- 2 buttons side-by-side (stack vertical on mobile)
- Primary (ABOUT AWARDS): `bg-[#FFEA9E]` text `#00101A`, arrow-up-right icon
- Secondary (ABOUT KUDOS): `border border-[#998C5F]` `bg-[#FFEA9E]/10`, text white
- Hover states per design-style.md (translateY, color changes)
- `<Link href="/awards">` / `<Link href="/kudos">`

#### 3.5. Assemble in page.tsx
- Pass `NEXT_PUBLIC_EVENT_START_DATETIME` to `<Countdown targetDate={...} />`

**Verification:** Hero renders with background, logo, countdown ticking, event info, CTA buttons work. Responsive: stack on mobile, side-by-side on desktop. Countdown shows 00:00:00 when expired.

---

### Phase 4: Content Sections (US2 + US4)

**Goal:** Build Root Further content, awards grid, and Sun* Kudos section.

**Tasks:**

#### 4.1. RootFurtherContent (`src/components/homepage/root-further-content.tsx`)
- Server Component
- Padded frame: `px-[26px] xl:px-[104px] py-[60px] xl:py-[120px] rounded-lg`
- Background: semi-transparent dark overlay
- Content: ROOT FURTHER small logos (2 images) + text paragraphs + centered quote
- Text: Montserrat 24px/700 (xl) → 16px (mobile)
- Quote: italic centered, 20px
- i18n: text from translations

#### 4.2. AwardsSection (`src/components/homepage/awards-section.tsx`)
- Server Component
- Section header: caption (24px white) + divider (1px `#2E3940`) + title (57px gold)
- Gap: 80px between header and grid

#### 4.3. AwardCard (`src/components/homepage/award-card.tsx`)
- Server Component (wrapped in `<Link>`)
- Props: `{ slug, title, description, image }`
- Image: `336x336 rounded-3xl border border-[#FFEA9E]` + glow shadow + `mix-blend-mode: screen` (Tailwind: `mix-blend-screen`)
- Title: 24px/400 gold
- Description: 16px/400 white, `line-clamp-2`
- "Chi tiết" link: 16px/500 white, arrow icon, hover → gold + underline
- Card hover: `translateY(-4px)`, enhanced glow
- Navigate to: `/awards#${slug}`

#### 4.4. Award Grid (inside AwardsSection)
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20`
- 6 cards from static `AwardItem[]` data
- Responsive: 1 → 2 → 3 columns

#### 4.5. SunKudosSection (`src/components/homepage/sun-kudos-section.tsx`)
- Server Component
- Container: dark bg + `border border-[#2E3940] rounded-lg p-10`
- 2-column layout: text left (~60%) + illustration right (~40%)
- Left: label, title ("Sun* Kudos"), subtitle ("ĐIỂM MỚI CỦA SAA 2025" in gold), description, "Chi tiết" button
- Right: Kudos illustration `<Image>`
- Button: secondary style (same as ABOUT KUDOS), `<Link href="/kudos">`
- Mobile: stack vertical (illustration below text)

#### 4.6. Assemble in page.tsx
- Render sections with `gap-[60px] xl:gap-[120px]` spacing between them

**Verification:** All sections render. Award grid responsive. Cards link correctly. Sun* Kudos 2-column layout collapses on mobile. All images load with `next/image`.

---

### Phase 5: Interactivity & API (US5 + US6 + US7)

**Goal:** Complete interactive features — language switching, notifications, user menu, widget.

**Tasks:**

#### 5.1. Notification API
- Create `src/app/api/notifications/unread-count/route.ts`
- Read Supabase session, query notification table
- Return `{ count: number }`
- If no table yet: return `{ count: 0 }` stub
- Error handling: return `{ count: 0 }` on failure, log server-side

#### 5.2. Wire NotificationBell to API
- `useEffect` → `fetch('/api/notifications/unread-count')`
- Show badge when `count > 0`
- Error: silently hide badge

#### 5.3. UserMenu enhancements (if needed)
- Sign out already implemented in Phase 2.4
- Wire profile link to actual profile page when it exists (placeholder `/profile` for now)
- Refine admin role detection if user metadata structure changes

#### 5.4. Widget quick actions
- Define action items (based on clarification from stakeholders)
- Implement expanding menu on click
- If undefined: show tooltip "Coming soon" on click

**Verification:** Language switching works across pages. Notification badge shows/hides correctly. Sign out redirects to login. Widget toggles.

---

### Phase 6: Responsive & Polish

**Goal:** Ensure pixel-perfect responsive behavior and accessibility compliance.

**Tasks:**

#### 6.1. Mobile header (`src/components/header/mobile-nav.tsx`)
- Client Component — toggle state for slide-out panel
- Hamburger icon (3-line) visible below `md` breakpoint, hidden on `md:` and up
- Desktop nav links hidden below `md` (use `hidden md:flex` pattern)
- Slide-out panel: full-screen overlay with nav links, language selector, notification, user menu
- Close on link click, outside click, or Escape
- Animate: translate-x from right
- Touch targets >= 44px

#### 6.2. Responsive verification
- Test at 4 breakpoints: 375px, 768px, 1024px, 1440px
- Countdown: smaller digits on mobile (~40x65px)
- CTA: full-width stack on mobile
- Awards: 1 → 2 → 3 columns
- Sun* Kudos: stack vertical on mobile
- Footer: stack vertical on mobile
- No horizontal scrolling at any breakpoint

#### 6.3. Accessibility audit
- [ ] Keyboard navigation: Tab through all interactive elements
- [ ] `aria-live="polite"` on countdown
- [ ] `aria-current="page"` on active nav link
- [ ] `aria-expanded` on all dropdowns
- [ ] `aria-label` on icon-only buttons
- [ ] Focus rings visible on all interactive elements
- [ ] Screen reader: countdown reads meaningfully
- [ ] Color contrast WCAG AA (gold on dark blue verified)

#### 6.4. Performance check
- [ ] First Load JS < 100KB per route (Constitution P6)
- [ ] Images use `sizes` prop with responsive breakpoints
- [ ] Below-fold sections lazy loaded (`dynamic()` or `loading="lazy"`)
- [ ] Background image: `priority` for LCP
- [ ] No layout shift (explicit dimensions on images)

#### 6.5. Edge cases
- Countdown: env var missing → hide section
- Countdown: already expired → show 00:00:00
- Notification API fail → badge hidden
- Award images fail → fallback placeholder
- Session expired mid-page → middleware redirects on next navigation

---

## 5. Testing Strategy

| Type | Scope | Focus |
|---|---|---|
| Unit | `countdown.tsx` | Timer logic, zero-padding, expired state, missing env var |
| Unit | `award-card.tsx` | Rendering, link generation, line-clamp |
| Unit | i18n helpers | Translation completeness, locale fallback |
| Integration | NotificationBell | API fetch, badge visibility, error handling |
| Integration | UserMenu | Sign out flow, dropdown toggle |
| E2E | Full page | Scroll through all sections, nav links work, countdown ticks, responsive |
| E2E | Auth flow | Unauthenticated → redirect to login → login → homepage |

---

## 6. File Dependency Graph

```
Phase 0: Assets
  └── public/images/homepage/*, src/fonts/*

Phase 1: Foundation
  ├── src/types/homepage.ts
  ├── src/utils/i18n.ts (expand)
  ├── src/app/globals.css (tokens)
  ├── src/app/layout.tsx (font)
  ├── src/app/(main)/layout.tsx
  └── src/app/(main)/page.tsx (skeleton)
      └── Move: language-selector.tsx

Phase 2: Header & Footer (depends on Phase 1)
  ├── src/components/header/main-header.tsx
  │   ├── src/components/header/nav-link.tsx
  │   ├── src/components/header/notification-bell.tsx
  │   ├── src/components/header/language-selector.tsx (moved)
  │   └── src/components/header/user-menu.tsx
  ├── src/components/footer/main-footer.tsx
  └── src/components/widget-button.tsx

Phase 3: Hero (depends on Phase 1)
  ├── src/components/homepage/hero-section.tsx
  │   ├── src/components/homepage/countdown.tsx
  │   ├── src/components/homepage/event-info.tsx
  │   └── src/components/homepage/hero-cta.tsx
  └── .env.development (NEXT_PUBLIC_EVENT_START_DATETIME)

Phase 4: Content (depends on Phase 1)
  ├── src/components/homepage/root-further-content.tsx
  ├── src/components/homepage/awards-section.tsx
  │   └── src/components/homepage/award-card.tsx
  └── src/components/homepage/sun-kudos-section.tsx

Phase 5: API & Interactivity (depends on Phase 2)
  └── src/app/api/notifications/unread-count/route.ts

Phase 6: Polish (depends on all above)
  ├── src/components/header/mobile-nav.tsx (new)
  └── Responsive, accessibility, performance
```

> **Parallelization opportunity:** Phase 2 (Header/Footer), Phase 3 (Hero), and Phase 4 (Content) can be developed in parallel after Phase 1 is complete. They have no dependencies on each other.

---

## 7. Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| Digital Numbers font not available / licensing | Medium | Fallback to monospace system font; verify license before use |
| Award data becomes dynamic (CMS) mid-sprint | Low | Data layer abstracted via `getAwardItems()` — easy to swap from static to API |
| Notification table doesn't exist yet | Low | API returns `{ count: 0 }` stub; badge hidden by default |
| Figma estimated values (Kudos bg, content frame bg) inaccurate | Low | Use estimated values; adjust after visual QA with design team |
| Background artwork large file size | Medium | Optimize to WebP, provide 2x/1x versions, use `priority` for LCP |
| Cloudflare Workers edge runtime limitations | Medium | Avoid Node.js-only APIs; test with `wrangler` preview |

---

## 8. Open Questions

- [ ] **Q1:** Widget quick action menu — what are the specific options? (Blocked for full Widget implementation)
- [ ] **Q2:** "Tiêu chuẩn chung" — what is the destination URL? (Use `#` placeholder)
- [ ] **Q3:** Digital Numbers font — confirm licensing and obtain `.woff2` file
- [ ] **Q4:** Award data — static or API-driven for v1? (Plan assumes static)
- [ ] **Q5:** Notification system — is the database table ready? (Plan stubs the API)
