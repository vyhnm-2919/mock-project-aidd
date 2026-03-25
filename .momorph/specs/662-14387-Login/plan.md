# Implementation Plan: Login Page

**Frame:** `662-14387-Login`
**Spec:** `spec.md` | **Design:** `design-style.md`
**Constitution:** v1.0.0
**Created:** 2026-03-10

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|-------------|------------------|--------|
| Server Components default | P3: Component Architecture | ✅ LoginPage, LoginHeader, LoginHero, LoginFooter are Server Components |
| Client Components minimal | P3: Component Architecture | ✅ Only LoginButton + LanguageSelector are `"use client"` |
| TypeScript strict | P2: TypeScript Strictness | ✅ All types explicit, no `any` |
| File naming kebab-case | P3: Naming | ✅ `login-button.tsx`, `language-selector.tsx` |
| Mobile-first responsive | P4: Responsive Design | ✅ Breakpoints: default → md → lg → xl |
| Google OAuth domain restrict | P5: Security (OWASP) | ✅ Supabase Auth with `@sun-asterisk.com` |
| httpOnly cookies | P5: Session Management | ✅ Supabase SSR cookie handling |
| `next/image` for images | P6: Performance | ✅ Background + Key Visual use next/image |
| Keyboard navigation | P7: WCAG AA | ✅ Tab, Enter, Space, Escape support |
| Conventional Commits | P7: Code Quality | ✅ `feat(login): ...` format |

---

## Architecture Decisions

### Frontend

**Component Pattern:** Feature-based folder under `src/components/login/`
- Server Components render layout + static content
- Client Components handle only interactivity (OAuth click, dropdown toggle)
- Composition: LoginPage composes Header + Hero (with Button) + Footer over Background layers

**State Management:**
- No global state store needed for Login page
- `isLoading` + `error`: local state in LoginButton (read error from URL search params)
- `isOpen`: local state in LanguageSelector
- `locale`: cookie-based, read server-side via `cookies()`
- Session: checked in middleware, not in components

**Data Fetching:**
- No data fetching on Login page itself
- Session check happens in Next.js middleware (server-side)
- OAuth flow handled by Supabase Auth redirect (not API call)

### Auth Flow (Supabase + Next.js)

```
User clicks "LOGIN With Google"
  → LoginButton calls supabase.auth.signInWithOAuth({ provider: 'google' })
  → Browser redirects to Google OAuth consent
  → Google redirects to /auth/callback?code=xxx
  → /auth/callback route handler exchanges code for session
  → Supabase sets httpOnly cookie
  → Redirect to Homepage /
```

### Font Strategy

- Add **Montserrat** + **Montserrat Alternates** via `next/font/google` in root layout
- Export CSS variables `--font-montserrat` and `--font-montserrat-alt`
- Register in Tailwind theme via `globals.css`

### i18n Strategy (Simplified)

- No i18n library for MVP — use a simple JSON dictionary approach
- Create `src/utils/i18n.ts` with translations object
- Read locale from cookie server-side
- Pass translated strings as props from Server → Client Components
- Can migrate to `next-intl` later if needed

---

## Project Structure

### New Files

| File | Purpose | Component Type |
|------|---------|----------------|
| `src/middleware.ts` | Next.js middleware: session refresh + auth redirects | Server |
| `src/app/(auth)/login/page.tsx` | Login page (Server Component) | Server |
| `src/app/(auth)/login/layout.tsx` | Auth layout (minimal, no sidebar/nav) | Server |
| `src/app/auth/callback/route.ts` | OAuth callback route handler | Server |
| `src/components/login/login-header.tsx` | Header with logo + language selector | Server |
| `src/components/login/login-hero.tsx` | Hero section with key visual + text | Server |
| `src/components/login/login-button.tsx` | Google login button with loading/error | Client |
| `src/components/login/language-selector.tsx` | Language dropdown toggle | Client |
| `src/components/login/login-footer.tsx` | Footer with copyright | Server |
| `src/types/auth.ts` | Auth-related types (Locale, AuthError) | — |
| `src/utils/i18n.ts` | Simple i18n dictionary + helper | — |
| `public/images/login/root-further.png` | ROOT FURTHER key visual | Asset |
| `public/images/login/bg-artwork.webp` | Background artwork | Asset |
| `public/images/login/logo-saa.png` | SAA 2025 logo | Asset |
| `public/images/icons/google.svg` | Google icon | Asset |
| `public/images/icons/flag-vn.svg` | Vietnam flag | Asset |
| `public/images/icons/chevron-down.svg` | Chevron down icon | Asset |
| `public/images/icons/flag-en.svg` | EN flag icon | Asset |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Add Montserrat + Montserrat Alternates fonts, update metadata to SAA 2025, add font CSS variables |
| `src/app/globals.css` | Add `--font-montserrat`, `--font-montserrat-alt` to Tailwind theme, add SAA color tokens, update body font |
| `src/app/page.tsx` | Replace starter content with redirect to `/login` (or homepage if authenticated) |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| — | — | Không cần thêm dependency mới. Supabase Auth + next/font đã có sẵn. |

---

## Implementation Approach

### Phase 0: Asset Preparation

**Deliverables:** All static assets downloaded and organized

1. Download media files from Figma via `get_media_files`:
   | Asset | Figma Node | Save To |
   |-------|-----------|---------|
   | SAA Logo | `I662:14391;178:1033;178:1030` | `public/images/login/logo-saa.png` |
   | ROOT FURTHER | `2939:9548` | `public/images/login/root-further.png` |
   | Google icon | `I662:14426;186:1766` | `public/images/icons/google.svg` |
   | VN Flag | `I662:14391;186:1696;186:1821;186:1709` | `public/images/icons/flag-vn.svg` |
   | Chevron down | `I662:14391;186:1696;186:1821;186:1441` | `public/images/icons/chevron-down.svg` |

2. Background artwork: export manually from Figma in WebP format (multiple sizes: 768w, 1024w, 1440w, 2880w)

3. Create EN flag SVG (simple UK/US flag icon) → `public/images/icons/flag-en.svg`

---

### Phase 1: Foundation — Fonts, Styles, Types

**Deliverables:** Montserrat fonts loaded, Tailwind tokens configured, TypeScript types created

**1.1. Update root layout** (`src/app/layout.tsx`):
- Import Montserrat + Montserrat Alternates from `next/font/google`
- Add `--font-montserrat` and `--font-montserrat-alt` CSS variables to `<html>`
- Read locale from cookie server-side → set `<html lang={locale}>` dynamically (WCAG AA: P7)
- Update metadata: title "SAA 2025 - Sun Annual Awards", description

**1.2. Update global CSS** (`src/app/globals.css`):
```css
@theme inline {
  --font-montserrat: var(--font-montserrat);
  --font-montserrat-alt: var(--font-montserrat-alt);
  --color-saa-bg: #00101A;
  --color-saa-button: #FFEA9E;
  --color-saa-button-hover: #FFE078;
  --color-saa-button-active: #FFD54F;
  --color-saa-error: #EF4444;
  --color-saa-border: #2E3940;
}
```

**1.3. Create types** (`src/types/auth.ts`):
```typescript
export type Locale = 'vi' | 'en';

export interface LoginTranslations {
  heroDescription: string;
  loginButton: string;
  copyright: string;
  errorDefault: string;
  errorDomain: string;
}
```

**1.4. Create i18n utility** (`src/utils/i18n.ts`):
- Dictionary object with `vi` and `en` keys
- `getTranslations(locale: Locale): LoginTranslations` function
- `getLocaleFromCookie(): Locale` helper (defaults to `'vi'`)

---

### Phase 2: Auth Infrastructure — Middleware + Callback

**Deliverables:** Session management working, OAuth callback handling code exchange

**2.1. Create Next.js middleware** (`src/middleware.ts`):
- Import `createClient` from `src/libs/supabase/middleware.ts`
- Call `const { supabase, supabaseResponse } = createClient(request)` to get client + response with refreshed cookies
- Call `supabase.auth.getUser()` to check session (NOT `getSession()` — `getUser()` validates with Supabase server, more secure)
- Auth redirect logic:
  - Path `/login`: if user exists → redirect to `/`
  - Path `/` and all other protected paths: if no user → redirect to `/login`
- Return `supabaseResponse` (carries refreshed cookie headers)
- Export `config.matcher` excluding static files, `_next`, `auth/callback`

**2.2. Create OAuth callback** (`src/app/auth/callback/route.ts`):
- Extract `code` from URL search params
- Call `supabase.auth.exchangeCodeForSession(code)`
- On success: redirect to `/` (or `next` param if provided)
- On error: redirect to `/login?error=auth_error`
- Handle domain restriction error: redirect to `/login?error=domain_restricted`

---

### Phase 3: Core UI — Login Page (US1)

**Deliverables:** Full login page with all visual components matching Figma

**3.1. Create auth layout** (`src/app/(auth)/login/layout.tsx`):
- Minimal layout: just `{children}` without nav/sidebar
- Set metadata for login page

**3.2. Create LoginPage** (`src/app/(auth)/login/page.tsx`):
- Server Component
- Read locale from cookie
- Get translations
- Compose: Background image (z-0) + Gradient L→R overlay (z-1) + Gradient B→T overlay (z-2) + LoginHeader (z-50) + LoginHero with LoginButton (z-10) + LoginFooter (z-50)
- **IMPORTANT:** Gradient overlays (C.2, C.3) MUST render at LoginPage level as sibling divs of the background, NOT inside LoginHero. This matches the z-index layering in design-style.md.
- Pass translations as props to child components

**3.3. Create LoginHeader** (`src/components/login/login-header.tsx`):
- Server Component (wraps LanguageSelector Client Component)
- Props: `locale: Locale`
- Render: absolute positioned, semi-transparent bg, backdrop-blur
- Logo: `next/image` with SAA logo
- Slot for LanguageSelector

**3.4. Create LoginHero** (`src/components/login/login-hero.tsx`):
- Server Component (wraps LoginButton Client Component)
- Props: `translations: LoginTranslations`
- Render: Key visual image + description text
- Slot for LoginButton
- **NOTE:** Gradient overlays are NOT in this component — they render at LoginPage level (see 3.2)

**3.5. Create LoginButton** (`src/components/login/login-button.tsx`):
- `"use client"` — Client Component
- Props: `label: string, errorMessages: { default: string, domain: string }`
- State: `isLoading`, read `error` from `useSearchParams()`
- **IMPORTANT:** `useSearchParams()` requires `<Suspense>` boundary in Next.js 15. LoginHero (not LoginPage) MUST wrap `<LoginButton>` in `<Suspense fallback={<LoginButtonSkeleton />}>` since LoginButton is a child of LoginHero, not rendered directly in LoginPage
- Import `createClient` from `src/libs/supabase/client.ts` to get browser Supabase client
- onClick: set loading → call `createClient().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })`
- **IMPORTANT:** `redirectTo` MUST be an absolute URL (with origin), not a relative path
- Render: Yellow button (#FFEA9E) with text + Google icon
- Loading state: spinner replaces Google icon, button disabled
- Error state: red text below button, auto-dismiss after 5s
- Hover/focus/active states per design-style.md

**3.6. Create LoginFooter** (`src/components/login/login-footer.tsx`):
- Server Component
- Props: `copyright: string`
- Render: absolute bottom, border-top, centered copyright text
- Font: Montserrat Alternates

---

### Phase 4: Language Selector (US2)

**Deliverables:** Working language toggle with cookie persistence

**4.1. Create LanguageSelector** (`src/components/login/language-selector.tsx`):
- `"use client"` — Client Component
- Props: `currentLocale: Locale`
- State: `isOpen: boolean`
- Render: Flag icon + locale text ("VN"/"EN") + chevron (rotates when open)
- Dropdown: simple 2-item list (VN, EN)
- On select: set cookie `locale={value}`, reload page (Server Components re-render with new locale)
- Close on: click outside (useRef + useEffect), Escape key
- Keyboard: Enter/Space to toggle, Arrow keys to navigate options

---

### Phase 5: Responsive + Polish

**Deliverables:** Mobile/tablet responsive, accessibility complete

**5.1. Responsive adjustments** (all component files):
- Apply mobile-first Tailwind classes per design-style.md Section 6:
  - Mobile: `px-6`, key visual `w-[280px]`, button `w-full`, text `text-base`
  - Tablet (md): `px-20`, key visual `w-[360px]`, button `w-auto`
  - Desktop (xl): `px-36`, pixel-perfect Figma values

**5.2. Accessibility audit:**
- Add `aria-label` to LoginButton
- Add `aria-expanded`, `aria-haspopup` to LanguageSelector
- Add `aria-hidden="true"` to decorative background/overlays
- Verify Tab order: LanguageSelector → LoginButton
- Verify focus rings on all interactive elements
- Test with keyboard-only navigation

**5.3. Update root page** (`src/app/page.tsx`):
- Replace Next.js starter content with a simple placeholder (e.g., "Homepage coming soon")
- **NOTE:** Middleware đã handle redirect: unauthenticated → `/login`, nên KHÔNG cần redirect trong page.tsx. Khi authenticated, user thấy page.tsx. Khi chưa login, middleware tự redirect sang `/login`.

---

## Testing Strategy

> **⚠️ Prerequisites:** Project hiện chưa có test framework. Cần cài đặt trước khi viết tests:
> - **Unit/Integration:** `vitest` + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom`
> - **E2E:** `@playwright/test` (setup riêng qua `/momorph.setupe2e`)
> - Thêm script `"test": "vitest"` vào `package.json`
> - Tạo `vitest.config.ts` với setup cho Next.js + React 19

| Type | Focus | Files |
|------|-------|-------|
| Unit | i18n utility: correct translations per locale | `src/utils/__tests__/i18n.test.ts` |
| Unit | LoginButton: loading state, error display, click handler | `src/components/login/__tests__/login-button.test.tsx` |
| Unit | LanguageSelector: open/close, keyboard nav, cookie set | `src/components/login/__tests__/language-selector.test.tsx` |
| Integration | OAuth callback route: code exchange, error handling, redirects | `src/app/auth/callback/__tests__/route.test.ts` |
| Integration | Middleware: redirect logic for authenticated/unauthenticated | `src/__tests__/middleware.test.ts` |
| E2E | Full login flow: click button → Google OAuth → callback → homepage | Playwright |
| E2E | Language switch: click VN → dropdown → select EN → page updates | Playwright |
| E2E | Error states: invalid domain, auth failure | Playwright |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Google OAuth setup incomplete in Supabase dashboard | High | Verify `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` in `.env` before Phase 2. Check Supabase Auth → Providers → Google is enabled |
| Domain restriction not enforced by Supabase | High | Configure `Restrict email domain` in Supabase Auth settings to `sun-asterisk.com`. Test with non-Sun* account in Phase 2 |
| Background image too large (>500KB) | Medium | Export WebP from Figma, use `next/image` with `sizes` prop, serve multiple sizes via `srcSet`. Target <200KB for 1440w |
| Montserrat Alternates not available in `next/font` | Low | Verify font name in Google Fonts. Fallback: use regular Montserrat for footer |
| Cloudflare Workers edge runtime incompatibility | Medium | Test `yarn preview` (OpenNext Cloudflare build) after Phase 3. Avoid Node.js-only APIs in middleware |
| Cookie-based locale not working in middleware | Low | Test locale cookie read/write flow. Ensure cookie is set with `path=/` and no httpOnly (needs client read) |

---

## Implementation Order Summary

```
Phase 0: Assets          → Download 6 media files from Figma
Phase 1: Foundation      → Fonts + CSS tokens + Types + i18n
Phase 2: Auth Infra      → Middleware + /auth/callback route
Phase 3: Core UI (US1)   → LoginPage + Header + Hero + Button + Footer
Phase 4: Language (US2)  → LanguageSelector with dropdown
Phase 5: Polish          → Responsive + Accessibility + Root page update
```

Each phase builds on the previous. Phase 2 can be tested independently with Supabase. Phase 3 produces the visible login page. Phase 4 adds language support. Phase 5 ensures production quality.

---

## Open Questions

- [ ] **Background artwork**: Cần export thủ công từ Figma (không có trong media API). Ai sẽ cung cấp file WebP?
- [ ] **Supabase domain restriction**: Đã config `sun-asterisk.com` trong Supabase dashboard chưa?
- [ ] **Homepage route**: Sau khi login thành công, redirect đến `/` hay route cụ thể nào?
