# Tasks: Login Page

**Frame:** `662-14387-Login`
**Plan:** `plan.md` | **Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-10
**Total Tasks:** 20

---

## Phase 1: Foundation — Fonts, Styles, Types

> **Goal:** Montserrat fonts loaded, Tailwind design tokens configured, TypeScript types + i18n utility created.
> **Test Criteria:** `yarn dev` runs, fonts render correctly, no TypeScript errors.

- [x] T001 [P] Create auth types (`Locale`, `LoginTranslations`) in `src/types/auth.ts`
  - `export type Locale = 'vi' | 'en'`
  - `export interface LoginTranslations { heroDescription, loginButton, copyright, errorDefault, errorDomain }`
  - All fields `string`, no `any` (Constitution P2)

- [x] T002 [P] Create i18n utility with translation dictionary in `src/utils/i18n.ts`
  - Import `Locale`, `LoginTranslations` from `src/types/auth.ts`
  - Dictionary object with `vi` and `en` keys containing all `LoginTranslations` fields
  - VN text: "Bắt đầu hành trình của bạn cùng SAA 2025.\nĐăng nhập để khám phá!", "LOGIN With Google", "Bản quyền thuộc về Sun* © 2025", error messages
  - EN text: "Start your journey with SAA 2025.\nLogin to explore!", "LOGIN With Google", "Copyright belongs to Sun* © 2025", error messages
  - `getTranslations(locale: Locale): LoginTranslations` function
  - `getLocaleFromCookie(): Promise<Locale>` — read `locale` cookie via `cookies()` from `next/headers`, default `'vi'`

- [x] T003 Update root layout with Montserrat fonts and dynamic `lang` attribute in `src/app/layout.tsx`
  - Import `Montserrat` and `Montserrat_Alternates` from `next/font/google`
  - Montserrat: `subsets: ['latin', 'vietnamese'], variable: '--font-montserrat'`
  - Montserrat Alternates: `subsets: ['latin', 'vietnamese'], weight: ['700'], variable: '--font-montserrat-alt'`
  - Remove Geist font imports
  - Read locale from `getLocaleFromCookie()` → set `<html lang={locale}>`
  - Add both CSS variables to `<html>` className
  - Update metadata: `title: "SAA 2025 - Sun Annual Awards"`, `description: "Sun Annual Awards 2025 - ROOT FURTHER"`
  - Keep `antialiased` class on `<body>`

- [x] T004 Update global CSS with SAA design tokens in `src/app/globals.css`
  - Replace `:root` vars and `@theme inline` block with:
    - Font vars: `--font-montserrat`, `--font-montserrat-alt`
    - Colors: `--color-saa-bg: #00101A`, `--color-saa-button: #FFEA9E`, `--color-saa-button-hover: #FFE078`, `--color-saa-button-active: #FFD54F`, `--color-saa-error: #EF4444`, `--color-saa-border: #2E3940`
  - Remove `prefers-color-scheme: dark` media query (SAA is dark theme only)
  - Update `body` to use `font-family: var(--font-montserrat)`, `background: #00101A`, `color: #FFFFFF`

**Checkpoint:** Run `yarn dev` → verify Montserrat fonts load, no console errors, dark background renders.

---

## Phase 2: Auth Infrastructure — Middleware + Callback

> **Goal:** Session management and OAuth callback working end-to-end with Supabase.
> **Test Criteria:** Unauthenticated user at `/` → redirected to `/login`. Authenticated user at `/login` → redirected to `/`. OAuth callback exchanges code for session.
> **Depends on:** Phase 1 (types)

- [x] T005 Create Next.js middleware for session refresh and auth redirects in `src/middleware.ts`
  - Import `createClient` from `src/libs/supabase/middleware.ts`
  - Call `createClient(request)` → destructure `{ supabase, supabaseResponse }`
  - Call `supabase.auth.getUser()` to validate session (NOT `getSession()`)
  - Redirect logic:
    - Path `/login`: if user exists → `NextResponse.redirect(new URL('/', request.url))`
    - All other paths: if no user → `NextResponse.redirect(new URL('/login', request.url))`
  - Return `supabaseResponse` (carries refreshed cookie headers)
  - Export `config.matcher`: `['/((?!_next/static|_next/image|favicon.svg|images/|auth/callback).*)']`

- [x] T006 Create OAuth callback route handler in `src/app/auth/callback/route.ts`
  - `export async function GET(request: NextRequest)`
  - Extract `code` and `next` (optional) from `request.nextUrl.searchParams`
  - If no code: redirect to `/login?error=auth_error`
  - Create Supabase server client via `createClient()` from `src/libs/supabase/server.ts`
  - Call `supabase.auth.exchangeCodeForSession(code)`
  - On success: check user email domain — if not `@sun-asterisk.com` → sign out + redirect to `/login?error=domain_restricted`
  - On success + valid domain: redirect to `next` param or `/`
  - On error: redirect to `/login?error=auth_error`
  - Use `NextResponse.redirect()` for all redirects

**Checkpoint:** Start dev server. Visit `/` → should redirect to `/login` (404 is OK, page not created yet). Check browser network tab for redirect.

---

## Phase 3: Core UI — Login with Google (US1)

> **Goal:** Full login page rendered with all visual components matching Figma design at 1440px.
> **Test Criteria:** Login page displays correctly. Click "LOGIN With Google" → redirects to Google OAuth. Error states display correctly. Loading spinner shows on click.
> **Depends on:** Phase 1 (fonts, types, i18n) + Phase 2 (middleware, callback)

- [x] T007 Create auth layout in `src/app/(auth)/login/layout.tsx`
  - Minimal layout: return `<>{children}</>` (no nav/sidebar)
  - Export metadata: `{ title: "Login - SAA 2025" }`

- [x] T008 [P] Create LoginFooter server component in `src/components/login/login-footer.tsx`
  - Props: `{ copyright: string }`
  - Render: `<footer>` with `absolute bottom-0 w-full flex items-center justify-center px-6 md:px-[90px] py-10 border-t border-[#2E3940] z-50`
  - Text: `font-[family-name:var(--font-montserrat-alt)]` 16px/700, color white, text-center
  - `aria-label` on footer element

- [x] T009 [P] Create LoginButton client component in `src/components/login/login-button.tsx`
  - `"use client"` directive
  - Props: `{ label: string; errorMessages: { default: string; domain: string } }`
  - Import `createClient` from `src/libs/supabase/client.ts`
  - Import `useSearchParams` from `next/navigation`
  - State: `isLoading: boolean` (default false)
  - Read `error` from `useSearchParams().get('error')`
  - Auto-dismiss error after 5s with `useEffect` + `setTimeout`
  - `handleLogin`: set `isLoading(true)` → call `createClient().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: \`\${window.location.origin}/auth/callback\` } })`
  - Button styles: `flex items-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg font-montserrat text-lg xl:text-[22px] font-bold text-[#00101A]`
  - Hover: `hover:bg-[#FFE078] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,234,158,0.4)]`
  - Focus: `focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2`
  - Active: `active:bg-[#FFD54F] active:translate-y-0`
  - Disabled/Loading: `disabled:opacity-50 disabled:cursor-not-allowed`
  - Loading state: spinner (`animate-spin` 24x24) replaces Google icon, button disabled
  - Error display: `<p>` below button, `mt-3 text-sm text-[#EF4444] font-montserrat`, map error param to errorMessages
  - Google icon: `next/image` from `/images/icons/google.svg` 24x24
  - `aria-label="Đăng nhập bằng Google"`

- [x] T010 [P] Create LoginHeader server component in `src/components/login/login-header.tsx`
  - Props: `{ locale: Locale }`
  - Render: `<header>` with `absolute top-0 w-full h-20 flex items-center justify-between px-6 md:px-20 xl:px-36 bg-[rgba(11,15,18,0.8)] backdrop-blur-[10px] z-50`
  - Logo: `next/image` src `/images/login/logo-saa.png`, width 52, height 48, alt "SAA 2025"
  - Placeholder slot for LanguageSelector (render `<div>` with locale text for now — LanguageSelector implemented in Phase 4)

- [x] T011 Create LoginHero server component in `src/components/login/login-hero.tsx`
  - Props: `{ translations: LoginTranslations }`
  - Import `Suspense` from `react`
  - Render: `<section>` with `relative z-10 flex flex-col px-6 md:px-20 xl:px-36 pt-44 xl:pt-[184px]`
  - Inner frame: `flex flex-col justify-center gap-20`
  - Key visual: `next/image` src `/images/login/root-further.png`, width 451, height 200, `w-[280px] md:w-[360px] xl:w-[451px] h-auto`, alt "ROOT FURTHER"
  - Content wrapper: `flex flex-col gap-6 pl-4`
  - Hero text: `<p>` with `text-base md:text-lg xl:text-xl font-bold leading-8 xl:leading-10 text-white tracking-[0.5px]`, content from `translations.heroDescription` (use `whitespace-pre-line` for newlines)
  - Wrap `<LoginButton>` in `<Suspense fallback={<div className="h-[60px] w-[305px] bg-[#FFEA9E]/20 rounded-lg animate-pulse" />}>`
  - Pass `label={translations.loginButton}` and `errorMessages={{ default: translations.errorDefault, domain: translations.errorDomain }}`

- [x] T012 Create LoginPage composing all components in `src/app/(auth)/login/page.tsx`
  - Server Component (no `"use client"`)
  - Import `getLocaleFromCookie`, `getTranslations` from `src/utils/i18n`
  - Import `LoginHeader`, `LoginHero`, `LoginFooter`
  - Read locale → get translations
  - Render structure (order matters for z-index layering):
    1. Container: `<main className="relative w-full min-h-screen bg-[#00101A] overflow-hidden">`
    2. Background image (z-0): `next/image` src `/images/login/bg-artwork.webp`, fill, `object-cover`, priority, `aria-hidden="true"`
    3. Gradient L→R (z-1): `<div className="absolute inset-0 z-[1] [background:linear-gradient(90deg,#00101A_0%,#00101A_25.41%,rgba(0,16,26,0)_100%)]" aria-hidden="true" />`
    4. Gradient B→T (z-2): `<div className="absolute inset-0 z-[2] [background:linear-gradient(0deg,#00101A_22.48%,rgba(0,19,32,0)_51.74%)]" aria-hidden="true" />`
    5. `<LoginHeader locale={locale} />`
    6. `<LoginHero translations={translations} />`
    7. `<LoginFooter copyright={translations.copyright} />`

**Checkpoint:** Run `yarn dev` → visit `/login`. Verify: background + gradients + header + hero + button + footer render correctly. Click button → redirects to Google OAuth. Test error state by visiting `/login?error=auth_error`.

---

## Phase 4: Language Selector (US2)

> **Goal:** Working language dropdown with cookie persistence and page reload.
> **Test Criteria:** Click language selector → dropdown opens. Select EN → page reloads in English. Click outside / Escape → dropdown closes. Keyboard navigation works.
> **Depends on:** Phase 3 (LoginHeader needs LanguageSelector slot)

- [x] T013 Create LanguageSelector client component in `src/components/login/language-selector.tsx`
  - `"use client"` directive
  - Props: `{ currentLocale: Locale }`
  - State: `isOpen: boolean` (default false)
  - `useRef` for container element (click outside detection)
  - `useEffect` for click outside listener + Escape key listener → close dropdown
  - Toggle button: `<button>` with flag icon (`next/image` from `/images/icons/flag-vn.svg` or `flag-en.svg` based on locale) + text ("VN"/"EN") + chevron (`transition-transform`, `rotate-180` when open)
  - Button styles: `flex items-center gap-0.5 rounded px-4 py-4 hover:bg-white/10 transition-colors`
  - `aria-expanded={isOpen}`, `aria-haspopup="listbox"`
  - Dropdown: absolute positioned below button, `bg-[rgba(11,15,18,0.95)] backdrop-blur-[10px] rounded border border-[#2E3940]`
  - 2 items: VN (flag-vn + "Tiếng Việt") and EN (flag-en + "English")
  - `role="listbox"`, items with `role="option"`, `aria-selected`
  - On select: `document.cookie = \`locale=\${value};path=/;max-age=31536000\`` → `window.location.reload()`
  - Keyboard: `Enter`/`Space` to toggle, `ArrowDown`/`ArrowUp` to navigate options, `Enter` to select, `Escape` to close

- [x] T014 Integrate LanguageSelector into LoginHeader in `src/components/login/login-header.tsx`
  - Replace placeholder div with `<LanguageSelector currentLocale={locale} />`
  - Import `LanguageSelector` from `./language-selector`

**Checkpoint:** Visit `/login` → click language selector → dropdown appears with VN/EN. Select EN → page reloads with English text. Cookie `locale=en` is set. Keyboard nav works.

---

## Phase 5: Responsive + Polish

> **Goal:** Mobile/tablet responsive, accessibility complete, root page updated.
> **Test Criteria:** Page renders correctly at 375px, 768px, 1024px, 1440px. All interactive elements keyboard-accessible. Focus rings visible. No horizontal scrolling.
> **Depends on:** Phase 3 + Phase 4

- [x] T015 [P] Apply responsive Tailwind classes to LoginHeader in `src/components/login/login-header.tsx`
  - Mobile: `px-6`, logo `w-10 h-11`, language selector `w-20 h-11`
  - Tablet (md): `px-20`
  - Desktop (xl): `px-36`, logo `w-[52px] h-[56px]`

- [x] T016 [P] Apply responsive Tailwind classes to LoginHero in `src/components/login/login-hero.tsx`
  - Mobile: `px-6 pt-32`, key visual `w-[280px]`, text `text-base leading-7`
  - Tablet (md): `px-20`, key visual `w-[360px]`, text `text-lg leading-9`
  - Desktop (xl): `px-36 pt-[184px]`, pixel-perfect Figma values

- [x] T017 [P] Apply responsive Tailwind classes to LoginButton in `src/components/login/login-button.tsx`
  - Mobile: `w-full min-h-[48px]` (touch target ≥ 44px, Constitution P4)
  - Tablet (md): `w-auto` (305px natural width)

- [x] T018 [P] Apply responsive Tailwind classes to LoginFooter in `src/components/login/login-footer.tsx`
  - Mobile: `px-6 py-6`, text `text-sm`
  - Tablet (md): `px-20`
  - Desktop (xl): `px-[90px] py-10`, text `text-base`

- [x] T019 Accessibility audit across all login components
  - Verify `aria-hidden="true"` on background image + gradient overlays in `src/app/(auth)/login/page.tsx`
  - Verify `aria-label` on LoginButton in `src/components/login/login-button.tsx`
  - Verify `aria-expanded`, `aria-haspopup="listbox"` on LanguageSelector in `src/components/login/language-selector.tsx`
  - Verify focus rings: `focus:outline-2 focus:outline-offset-2` on all interactive elements
  - Verify Tab order: LanguageSelector → LoginButton
  - Test keyboard-only navigation: Tab, Enter, Space, Escape, Arrow keys

- [x] T020 Update root page with placeholder content in `src/app/page.tsx`
  - Replace Next.js starter content with simple "Homepage coming soon" placeholder
  - Middleware handles redirect: unauthenticated → `/login`, so no redirect needed in page.tsx

**Checkpoint:** Test at 375px, 768px, 1024px, 1440px. All components scale correctly. No horizontal scroll. Keyboard navigation works end-to-end. `yarn lint` passes.

---

## Phase 6: Bug Fixes

- [x] T021 Fix font-family across all login components to match design-style.md typography specs
  - Hero text (`login-hero.tsx`): add explicit `font-montserrat` (design: Montserrat 20px/700/40px)
  - Button text (`login-button.tsx`): replace verbose `font-[family-name:var(--font-montserrat)]` with `font-montserrat`
  - Footer text (`login-footer.tsx`): replace `font-[family-name:var(--font-montserrat-alt)]` with `font-montserrat-alt`
  - Lang selector (`language-selector.tsx`): replace `font-[family-name:var(--font-montserrat)]` with `font-montserrat`
  - Error text (`login-button.tsx`): replace `font-[family-name:var(--font-montserrat)]` with `font-montserrat`

---

## Dependencies

```
Phase 1 (Foundation)
  ├── T001, T002 can run in parallel [P]
  ├── T003 depends on T002 (imports getLocaleFromCookie)
  └── T004 independent

Phase 2 (Auth) — depends on Phase 1
  ├── T005, T006 are sequential (T006 needs middleware pattern reference)

Phase 3 (US1) — depends on Phase 1 + Phase 2
  ├── T007 independent
  ├── T008, T009, T010 can run in parallel [P]
  ├── T011 depends on T009 (wraps LoginButton)
  └── T012 depends on T008, T010, T011 (composes all)

Phase 4 (US2) — depends on Phase 3
  ├── T013 independent
  └── T014 depends on T013

Phase 5 (Polish) — depends on Phase 3 + Phase 4
  ├── T015, T016, T017, T018 can run in parallel [P]
  ├── T019 depends on T015-T018
  └── T020 independent
```

## Parallel Execution Opportunities

| Phase | Parallel Tasks | Sequential Tasks |
|-------|---------------|-----------------|
| Phase 1 | T001 ∥ T002 ∥ T004 | T003 (after T002) |
| Phase 2 | — | T005 → T006 |
| Phase 3 | T008 ∥ T009 ∥ T010 | T007 → T011 → T012 |
| Phase 4 | — | T013 → T014 |
| Phase 5 | T015 ∥ T016 ∥ T017 ∥ T018 | T019 (after all), T020 (independent) |

## Implementation Strategy

- **MVP Scope:** Phase 1 + 2 + 3 = Login with Google working end-to-end (US1)
- **Full Scope:** + Phase 4 (Language) + Phase 5 (Polish)
- **Incremental Delivery:** Each phase produces a testable increment
- **No new dependencies:** All libraries already installed (`@supabase/ssr`, `next/font`)
