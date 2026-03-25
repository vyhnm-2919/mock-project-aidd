# Tasks: Countdown - Prelaunch Page

**Frame:** `2268-35127-Countdown-Prelaunch-page`
**Plan:** `plan.md` | **Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-11
**Total Tasks:** 16

---

## Phase 1: Setup — Types & Assets

> **Goal:** TypeScript types defined, background image asset ready, environment variable configured.
> **Test Criteria:** No TypeScript errors. Asset exists in `public/images/countdown/`. `.env.local` has `NEXT_PUBLIC_EVENT_START_DATE`.

- [x] T001 [P] Create countdown TypeScript types in `src/types/countdown.ts`
  - `export type CountdownUnitType = 'days' | 'hours' | 'minutes'`
  - `export interface CountdownTranslations { heading: string; daysLabel: string; hoursLabel: string; minutesLabel: string }`
  - `export interface CountdownTimeLeft { days: number; hours: number; minutes: number }`
  - No `any` (Constitution P2)

- [x] T002 [P] Download background artwork and save to `public/images/countdown/bg-artwork.webp`
  - Check if `public/images/homepage/bg-artwork.png` is reusable — if same asset, copy/convert to webp
  - If different, download from Figma node `2268:35129` using MoMorph tools
  - Ensure WebP format for performance

- [x] T003 [P] Add `NEXT_PUBLIC_EVENT_START_DATE` to `.env.local` and `.env.example`
  - `.env.local`: `NEXT_PUBLIC_EVENT_START_DATE="2026-04-15T09:00:00+07:00"`
  - `.env.example`: `NEXT_PUBLIC_EVENT_START_DATE="2026-04-15T09:00:00+07:00"` with comment

**Checkpoint:** `yarn dev` runs. Types import without errors. Background image loads in browser.

---

## Phase 2: Foundation — Route, Layout, i18n

> **Goal:** `(prelaunch)` route group created, countdown page server component renders, i18n translations available.
> **Test Criteria:** Navigate to `/countdown` → page renders (may require temporary middleware bypass). Translations return correct strings for vi/en.
> **Depends on:** Phase 1 (types)

- [x] T004 Create prelaunch layout in `src/app/(prelaunch)/layout.tsx`
  - Server Component — minimal layout, just `{children}` wrapper
  - No header, footer, or widget — standalone page
  - Fonts already applied by root `layout.tsx` on `<body>`

- [x] T005 Add countdown i18n translations in `src/utils/i18n.ts`
  - Import `CountdownTranslations` from `src/types/countdown.ts`
  - Add translation dictionary: `Record<Locale, CountdownTranslations>`
  - VI: `{ heading: "Sự kiện sẽ bắt đầu sau", daysLabel: "DAYS", hoursLabel: "HOURS", minutesLabel: "MINUTES" }`
  - EN: `{ heading: "The event starts in", daysLabel: "DAYS", hoursLabel: "HOURS", minutesLabel: "MINUTES" }`
  - Export `getCountdownTranslations(locale: Locale): CountdownTranslations` function
  - Follow existing `Record<Locale, T>` + getter pattern

- [x] T006 Create countdown page server component in `src/app/(prelaunch)/countdown/page.tsx`
  - Server Component (no `"use client"`)
  - Read `NEXT_PUBLIC_EVENT_START_DATE` from `process.env`
  - Read locale via `getLocaleFromCookie()`
  - Get translations via `getCountdownTranslations(locale)`
  - Render structure:
    1. `<main className="relative w-full h-screen bg-[#00101A] overflow-hidden">`
    2. Background image: `next/image` with `fill`, `object-cover`, `priority`, src `/images/countdown/bg-artwork.webp`
    3. Cover gradient: `<div>` with `absolute inset-0 z-[1]` and inline style `background: linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)`
    4. Countdown container: `<div className="relative z-10 flex flex-col items-center justify-center h-full">`
    5. `<CountdownTimer targetDate={eventStartDate} translations={translations} />`
  - Pass `targetDate` as string prop, translations as object prop

**Checkpoint:** Visit `/countdown` (temporarily bypass middleware if needed). Background + gradient render. CountdownTimer placeholder visible.

---

## Phase 3: Core UI — Countdown Timer (US1)

> **Goal:** Working countdown timer with realtime digit updates, glassmorphism digit boxes, and LED-style font.
> **Story:** US1 — Xem thời gian đếm ngược [P1]
> **Test Criteria:** Timer displays correct days/hours/minutes. Digits update every second. Leading zeros shown. Timer reaches 00:00:00 → redirects to `/`. No SSR hydration mismatch.
> **Depends on:** Phase 2 (page, i18n, types)

- [x] T007 [P] [US1] Create DigitBox component in `src/components/countdown/digit-box.tsx`
  - Props: `{ digit: number }` — single digit 0-9
  - No `"use client"` directive (client-bundled via parent)
  - Glassmorphism container: `relative` wrapper
    - Background element with `opacity-50`: `rounded-xl` (12px), border `0.75px solid rgba(255, 234, 158, 0.5)`, background `linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 100%)`, `backdrop-blur-[24.96px]`
    - Use `rgba` for border and background alpha — NOT CSS `opacity` on container (would affect child text)
  - Digit text: `font-digital-numbers` (CSS var `--font-digital-numbers`), `text-white`, centered in box
  - Responsive sizing:
    - Mobile: `w-[45px] h-[72px] text-[44px]`
    - Tablet (md): `w-[60px] h-[96px] text-[58px]`
    - Desktop (lg): `w-[70px] h-[112px] text-[67px]`
    - XL: `w-[77px] h-[123px] text-[73.73px]`

- [x] T008 [P] [US1] Create CountdownUnit component in `src/components/countdown/countdown-unit.tsx`
  - Props: `{ value: number; label: string }` — value 0-999, label string
  - No `"use client"` directive (client-bundled via parent)
  - Split value into digits: `tens = Math.floor(value / 10)`, `ones = value % 10`
  - Layout: `flex flex-col` with gap responsive (`gap-2 md:gap-3 lg:gap-4 xl:gap-[21px]`)
  - Digit row: `flex` with gap responsive (`gap-2 md:gap-3 lg:gap-4 xl:gap-[21px]`)
  - Render 2 `<DigitBox>` components (tens, ones)
  - Label: `font-montserrat font-bold text-white` responsive (`text-base md:text-2xl lg:text-3xl xl:text-4xl xl:leading-[48px]`)
  - `aria-label` prop on wrapper: `"{value} {label.toLowerCase()}"` for accessibility

- [x] T009 [US1] Create CountdownTimer client component in `src/components/countdown/countdown-timer.tsx`
  - `"use client"` directive
  - Props: `{ targetDate: string; translations: CountdownTranslations }`
  - State: `useState` for `{ days, hours, minutes }` initialized to `{ 0, 0, 0 }`
  - `mounted` state for SSR hydration mismatch prevention:
    - `const [mounted, setMounted] = useState(false)`
    - `useEffect(() => setMounted(true), [])`
    - If `!mounted`, render skeleton/placeholder (matching layout dimensions)
  - Countdown logic in `useEffect`:
    - Parse `targetDate` to `Date` object
    - If invalid date or date in past → redirect to `/` via `router.push('/')`
    - `setInterval(1000)`: recalculate `diff = Math.max(0, target.getTime() - Date.now())`
    - `days = Math.floor(diff / 86_400_000)`
    - `hours = Math.floor((diff % 86_400_000) / 3_600_000)`
    - `minutes = Math.floor((diff % 3_600_000) / 60_000)`
    - When `diff <= 0`: clear interval, redirect to `/`
    - Cleanup: return `() => clearInterval(id)` in useEffect
  - Render:
    - `<h1>` heading: `font-montserrat text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold italic leading-[48px] text-white text-center`
    - `<div role="timer" aria-live="polite" aria-atomic="true">` wrapping:
    - Timer row: `flex items-center` with gap responsive (`gap-4 md:gap-8 lg:gap-[48px] xl:gap-[60px]`)
    - 3x `<CountdownUnit>` for days, hours, minutes
    - Gap between heading and timer: `gap-4 md:gap-5 xl:gap-6` (~24px at xl)
  - Import `useRouter` from `next/navigation` for redirect

**Checkpoint:** Visit `/countdown`. Timer displays with glassmorphism digit boxes. Numbers count down every second. Font is Digital Numbers LED-style. Heading is italic Montserrat. No hydration warnings in console.

---

## Phase 4: Visual Immersive (US2)

> **Goal:** Background artwork + gradient overlay create immersive visual experience matching Figma.
> **Story:** US2 — Trải nghiệm visual immersive [P1]
> **Test Criteria:** Background image fills viewport. Gradient overlay visible (dark at bottom-left, transparent at top-right). Digit boxes have glassmorphism blur effect. Content centered vertically.
> **Depends on:** Phase 3 (all visual components rendered)

- [x] T010 [US2] Verify Montserrat italic variant loads in `src/app/layout.tsx`
  - Check current Montserrat `next/font/google` config
  - If only `style: 'normal'` is loaded, add `style: ['normal', 'italic']`
  - Verify heading renders with true italic (not faux-italic)

- [x] T011 [US2] Visual polish and glassmorphism refinement across countdown components
  - Verify background image renders full-screen with `object-cover` in `src/app/(prelaunch)/countdown/page.tsx`
  - Verify gradient overlay angle (18deg) and color stops match design-style.md
  - Verify digit box glassmorphism: blur visible, border gold at 50%, gradient background
  - Verify z-index layering: bg (0) → gradient (1) → content (10)
  - Verify countdown content is vertically and horizontally centered
  - Compare with Figma screenshot in `.momorph/specs/2268-35127-Countdown-Prelaunch-page/assets/frame.png`

**Checkpoint:** Page looks pixel-perfect at 1440px compared to Figma screenshot. Glassmorphism effect visible on digit boxes. Background properly covered with gradient overlay.

---

## Phase 5: Responsive (US3)

> **Goal:** Countdown page displays correctly across all breakpoints.
> **Story:** US3 — Responsive trên mọi thiết bị [P2]
> **Test Criteria:** At 375px, 768px, 1024px, 1440px — digit boxes scale, text readable, no overflow, all 3 groups on one row.
> **Depends on:** Phase 3 + Phase 4

- [x] T012 [US3] Verify and adjust responsive behavior across all countdown components
  - Test at 375px (mobile): digit boxes ~45x72px, heading 20px, labels 16px, gap 16px, padding `px-4 py-8`
  - Test at 768px (tablet): digit boxes ~60x96px, heading 24px, labels 24px, gap 32px
  - Test at 1024px (desktop): digit boxes ~70x112px, heading 30px, labels 30px, gap 48px
  - Test at 1440px (xl): pixel-perfect Figma match — digit boxes 77x123px, all text 36px, gap 60px
  - Verify all 3 countdown groups remain on single row at all breakpoints
  - Adjust in: `src/components/countdown/digit-box.tsx`, `src/components/countdown/countdown-unit.tsx`, `src/components/countdown/countdown-timer.tsx`

**Checkpoint:** Resize browser through all breakpoints. Content scales smoothly. No horizontal overflow. Digit boxes and text readable at all sizes.

---

## Phase 6: Middleware & Auth Bypass

> **Goal:** `/countdown` bypasses auth. Pre-event: ALL routes redirect to `/countdown`. Post-event: normal auth flow.
> **Test Criteria:** Unauthenticated user visits `/countdown` → page renders (no redirect to `/login`). Pre-event: visit `/` → redirected to `/countdown`. Post-event: normal auth flow resumes.
> **Depends on:** Phase 2 (route exists)

- [x] T013 Update middleware with countdown auth bypass and pre-event redirect in `src/middleware.ts`
  - Add pre-event check BEFORE existing auth logic:
    ```
    const eventDate = process.env.NEXT_PUBLIC_EVENT_START_DATE;
    if (eventDate && new Date(eventDate) > new Date()) {
      if (pathname === "/countdown") return supabaseResponse; // skip auth
      if (pathname !== "/login") return NextResponse.redirect(new URL("/countdown", request.url));
      // /login falls through to normal handling below
    }
    ```
  - Post-event: no change to existing auth flow
  - `/auth/callback` already excluded by matcher — no change needed
  - Env var `NEXT_PUBLIC_EVENT_START_DATE` available at edge runtime

**Checkpoint:** Set `NEXT_PUBLIC_EVENT_START_DATE` to future date. Visit `/` → redirected to `/countdown`. Visit `/countdown` without login → page renders. Set date to past → normal auth flow resumes.

---

## Phase 7: Polish & Accessibility

> **Goal:** Accessibility complete, edge cases handled, final visual validation.
> **Test Criteria:** `role="timer"` + `aria-live` present. `<h1>` used for heading. Semantic `<time>` wrapping. No console warnings.
> **Depends on:** All previous phases

- [x] T014 [P] Accessibility audit on countdown components
  - Verify `<main>` as page wrapper in `src/app/(prelaunch)/countdown/page.tsx`
  - Verify `role="timer"` on inner div (NOT on `<main>`) in `src/components/countdown/countdown-timer.tsx`
  - Verify `aria-live="polite"` and `aria-atomic="true"` on timer container
  - Verify `aria-label` on each CountdownUnit: `"{value} days"`, `"{value} hours"`, `"{value} minutes"`
  - Verify `<h1>` for heading text (italic is decorative, not semantic — no `<em>`)
  - Verify `aria-hidden="true"` on background image and gradient overlay
  - Verify sufficient color contrast: white text on dark background

- [x] T015 [P] Edge case handling in `src/components/countdown/countdown-timer.tsx`
  - Invalid/missing `NEXT_PUBLIC_EVENT_START_DATE` → show 00:00:00 briefly then redirect to `/`
  - Event already started (past date) → immediate redirect to `/`
  - Very large countdown (>99 days) → 3 digits display correctly (digit boxes expand)
  - Tab inactive → timer catches up on focus (recalculate diff, not accumulate — already handled by design)
  - No negative numbers displayed (`Math.max(0, diff)`)

- [x] T016 Final visual verification against Figma screenshot
  - Run dev server, navigate to `/countdown`
  - Compare with `.momorph/specs/2268-35127-Countdown-Prelaunch-page/assets/frame.png`
  - Verify: glassmorphism effect, LED font rendering, italic heading, gradient overlay, spacing
  - Test on multiple browsers if possible (backdrop-filter support)
  - `yarn lint` passes with no errors

**Checkpoint:** All accessibility attributes present. Edge cases handled gracefully. Visual match confirmed. No lint errors.

---

## Dependencies

```
Phase 1 (Setup)
  ├── T001, T002, T003 can run in parallel [P]

Phase 2 (Foundation) — depends on Phase 1
  ├── T004 independent
  ├── T005 depends on T001 (imports CountdownTranslations type)
  └── T006 depends on T002, T004, T005 (uses asset, layout, translations)

Phase 3 (US1) — depends on Phase 2
  ├── T007, T008 can run in parallel [P]
  └── T009 depends on T007, T008 (imports DigitBox, CountdownUnit)

Phase 4 (US2) — depends on Phase 3
  ├── T010 independent (font check)
  └── T011 depends on T010

Phase 5 (US3) — depends on Phase 3 + Phase 4
  └── T012 sequential (tests all components)

Phase 6 (Middleware) — depends on Phase 2
  └── T013 independent (can run parallel with Phase 3-5)

Phase 7 (Polish) — depends on all previous phases
  ├── T014, T015 can run in parallel [P]
  └── T016 depends on T014, T015
```

## Parallel Execution Opportunities

| Phase | Parallel Tasks | Sequential Tasks |
|-------|---------------|-----------------|
| Phase 1 | T001 ∥ T002 ∥ T003 | — |
| Phase 2 | T004 ∥ T005 | T006 (after T004, T005) |
| Phase 3 | T007 ∥ T008 | T009 (after T007, T008) |
| Phase 4 | — | T010 → T011 |
| Phase 5 | — | T012 |
| Phase 6 | T013 (parallel with Phase 3-5) | — |
| Phase 7 | T014 ∥ T015 | T016 (after T014, T015) |

## Implementation Strategy

- **MVP Scope:** Phase 1 + 2 + 3 = Working countdown timer with digit display (US1)
- **Full Scope:** + Phase 4 (Visual) + Phase 5 (Responsive) + Phase 6 (Middleware) + Phase 7 (Polish)
- **Incremental Delivery:** Each phase produces a testable increment
- **No new dependencies:** All libraries already installed. Native `Date` API for countdown math.
- **Phase 6 can start early:** Middleware update is independent of UI work — can run in parallel with Phases 3-5
