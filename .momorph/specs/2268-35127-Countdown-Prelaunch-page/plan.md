# Implementation Plan: Countdown - Prelaunch Page

**Frame:** `2268:35127` — Countdown - Prelaunch page
**Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-11

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|-------------|-------------------|--------|
| Clean code | P1: Single responsibility, <200 lines | ✅ Compliant — each component has one job |
| TypeScript strict | P2: No `any`, explicit types | ✅ Compliant |
| Server Components default | P3: Only `"use client"` when needed | ✅ CountdownTimer is client, page is server |
| Mobile-first responsive | P4: Tailwind breakpoints | ✅ 4 breakpoints planned |
| Auth bypass | P5: Middleware exclusion | ✅ `/countdown` excluded from auth |
| Performance | P6: Minimal client JS, `next/image` | ✅ Single client component |
| Accessibility | P7: WCAG AA, semantic HTML | ✅ `role="timer"`, `aria-live`, `<h1>`, `<time>` |

---

## Codebase Research Findings

### Reusable Patterns & Assets

| Item | Location | Reuse |
|------|----------|-------|
| Font: DigitalNumbers | `src/app/layout.tsx` (local font, `--font-digital-numbers`) | **Already registered** — use `font-digital-numbers` Tailwind class |
| Font: Montserrat | `src/app/layout.tsx` (`--font-montserrat`) | **Already registered** — verify italic variant loads (config uses all weights + `latin-ext,vietnamese` subsets) |
| CSS vars | `src/app/globals.css` | Reuse `--color-saa-bg` (#00101A), `--color-saa-text-accent` (#FFEA9E), `--color-saa-border` (#2E3940) |
| i18n pattern | `src/utils/i18n.ts` | Follow `Record<Locale, T>` + `getXxxTranslations(locale)` pattern |
| Route group | `src/app/(main)/`, `src/app/(auth)/` | Create new `src/app/(prelaunch)/` group |
| Middleware | `src/middleware.ts` | Add `countdown` to matcher exclusion |
| BG artwork | `public/images/homepage/bg-artwork.png` | **Check if same asset** — download from Figma if different |

### Montserrat Italic Check

The current Montserrat config in `layout.tsx` loads via `next/font/google` with all weights and `latin-ext,vietnamese` subsets. Need to verify if `style: ['normal', 'italic']` is set. If only `'normal'` is loaded, the browser will synthesize italic (faux-italic) which may look slightly different. During implementation, check and add italic if needed.

---

## Architecture Decisions

### Frontend

- **Component pattern:** Server Component page + single Client Component (`CountdownTimer`) for realtime updates
- **State management:** `useState` + `useEffect` with `setInterval(1000)` for countdown logic. Recalculate diff on each tick (not accumulate) to handle tab-inactive drift.
- **Data flow:**
  1. Page (server) reads `NEXT_PUBLIC_EVENT_START_DATE` env var and locale cookie
  2. Passes `targetDate` string + translations to `CountdownTimer` (client)
  3. Client hydrates with live `Date.now()` and starts interval
- **Styling:** Tailwind CSS with existing CSS variables. Glassmorphism digit box uses inline styles for gradient + backdrop-filter (complex values not easily Tailwindable).

### Route Structure

```
src/app/(prelaunch)/
├── layout.tsx          # Minimal layout — no header/footer, just font classes + bg color
└── countdown/
    └── page.tsx        # Server Component — reads env var, locale, renders CountdownTimer
```

- **Why separate route group?** The countdown page has NO header, footer, or widget. Using `(main)` layout would add unwanted shared UI. A `(prelaunch)` group provides a clean, standalone layout.
- **Why `/countdown` route?** Separate from `/` to avoid interference with the main Homepage. Middleware handles redirecting `/` → `/countdown` when pre-event.

### Middleware Strategy

```typescript
// In middleware.ts:
// 1. Add "countdown" to matcher exclusion (no auth needed)
// 2. Add pre-event check: if event not started AND path is NOT /countdown, /login, /auth/callback
//    → redirect ALL routes to /countdown
```

Per spec.md Section 7: "Any page (pre-event) → Middleware redirect → /countdown". ALL authenticated routes should redirect to countdown during pre-launch, not just `/`. The `/login` and `/auth/callback` paths are already excluded by the matcher. The `/countdown` path itself is excluded to prevent redirect loops.

The event date check uses `NEXT_PUBLIC_EVENT_START_DATE` (available at build time and runtime). Middleware runs on edge, so `Date.now()` comparison works.

---

## Project Structure

### New Files

| File | Purpose | Type |
|------|---------|------|
| `src/app/(prelaunch)/layout.tsx` | Minimal layout — just `{children}` wrapper, no header/footer. Fonts already applied by root `layout.tsx`. | Server Component |
| `src/app/(prelaunch)/countdown/page.tsx` | Countdown page — reads env + locale, renders timer | Server Component |
| `src/components/countdown/countdown-timer.tsx` | Client component: countdown logic + digit display | Client Component |
| `src/components/countdown/countdown-unit.tsx` | Single unit (Days/Hours/Minutes): 2 digit boxes + label | Component (client-bundled — imported by CountdownTimer client boundary) |
| `src/components/countdown/digit-box.tsx` | Glassmorphism digit box with LED number | Component (client-bundled — imported by CountdownTimer client boundary) |
| `src/types/countdown.ts` | TypeScript interfaces for countdown | Types |

### Modified Files

| File | Changes |
|------|---------|
| `src/middleware.ts` | Add `countdown` to matcher exclusion. Add pre-event redirect logic (`/` → `/countdown`). |
| `src/utils/i18n.ts` | Add `CountdownTranslations` type + `getCountdownTranslations(locale)` function |
| `.env.local` | Add `NEXT_PUBLIC_EVENT_START_DATE` variable |
| `.env.example` (if exists) | Document `NEXT_PUBLIC_EVENT_START_DATE` with placeholder value |

### Files NOT Modified

| File | Reason |
|------|--------|
| `src/app/layout.tsx` | DigitalNumbers font already registered — no changes needed |
| `src/app/globals.css` | CSS variables already cover needed colors — no changes needed |
| `package.json` | No new dependencies (use native `Date` API) |

### Dependencies

No new packages required. Native `Date` API is sufficient for countdown math.

---

## Component Architecture

```
CountdownPage (Server Component)
├── <Image /> — Background artwork (next/image, fill, priority)
├── <div> — Cover gradient overlay (absolute, CSS gradient)
└── <main> — Page wrapper
    └── CountdownTimer (Client Component, "use client")
        ├── <h1> — "Sự kiện sẽ bắt đầu sau" (italic)
        └── <div role="timer" aria-live="polite">
            ├── CountdownUnit — DAYS
            │   ├── DigitBox — tens digit
            │   ├── DigitBox — ones digit
            │   └── <span> — "DAYS"
            ├── CountdownUnit — HOURS
            │   ├── DigitBox — tens digit
            │   ├── DigitBox — ones digit
            │   └── <span> — "HOURS"
            └── CountdownUnit — MINUTES
                ├── DigitBox — tens digit
                ├── DigitBox — ones digit
                └── <span> — "MINUTES"
```

### `CountdownUnit` and `DigitBox` — Client Boundary Note

These are pure presentational components (no hooks, no browser APIs). They don't need their own `"use client"` directive. However, since they're imported by `CountdownTimer` (which IS a client component), Next.js automatically bundles them as client code. This is correct behavior — they receive props from the client boundary and re-render when parent state changes. Do NOT add `"use client"` to these files.

---

## Implementation Approach

### Phase 0: Setup & Assets (2 tasks)

1. **Download background artwork** from Figma (if not reusable from Homepage). Save to `public/images/countdown/`.
2. **Create types** (`src/types/countdown.ts`): `CountdownTranslations`, `CountdownUnitType`.

### Phase 1: Foundation — Route & Layout (3 tasks)

3. **Create `(prelaunch)` route group** with minimal layout (`layout.tsx`): just return `{children}` — fonts are already on `<body>` from root `layout.tsx`. No header, footer, or widget.
4. **Create countdown page** (`page.tsx`): server component that reads env var + locale, renders background image + gradient + CountdownTimer.
5. **Add i18n translations** for countdown (`src/utils/i18n.ts`): heading, labels (DAYS/HOURS/MINUTES).

### Phase 2: Core UI — Digit Components (3 tasks)

6. **Build `DigitBox` component**: glassmorphism card (gradient bg, blur, gold border at 50% opacity) with LED digit text using `font-digital-numbers`.
7. **Build `CountdownUnit` component**: 2 DigitBox + label. Accepts `value: number` and `label: string`, splits value into tens/ones digits.
8. **Build `CountdownTimer` client component**: useState for days/hours/minutes, useEffect with setInterval(1000), diff calculation, auto-redirect on expiry. Renders heading + 3 CountdownUnits.

### Phase 3: Middleware & Auth (2 tasks)

9. **Update middleware** — add pre-event redirect block BEFORE existing auth logic. Also handle `/countdown` path to skip auth (no matcher change needed — handled in code).
10. **Update middleware** — pre-event redirect: if `NEXT_PUBLIC_EVENT_START_DATE` is in the future, redirect ALL matched routes (except `/countdown` itself) to `/countdown`. This blocks access to Homepage, Awards, Kudos, etc. during pre-launch.

### Phase 4: Responsive & Polish (2 tasks)

11. **Add responsive styles**: mobile (< 768px), tablet (md), desktop (lg), xl breakpoints per design-style.md. Scale digit boxes, font sizes, gaps.
12. **Add Montserrat italic variant** (if needed): verify current font config, add `style: ['normal', 'italic']` if missing.

### Phase 5: Validation (1 task)

13. **Visual verification**: run dev server, navigate to `/countdown`, compare with Figma screenshot. Check glassmorphism effect, font rendering, responsive behavior.

---

## Reuse Analysis

| Component | Source | Reuse? | Notes |
|-----------|--------|--------|-------|
| `MainHeader` | `src/components/header/` | ❌ No | Countdown page has no header |
| `MainFooter` | `src/components/footer/` | ❌ No | Countdown page has no footer |
| `WidgetButton` | `src/components/widget-button.tsx` | ❌ No | Not shown in countdown design |
| DigitalNumbers font | `src/app/layout.tsx` | ✅ Yes | Already registered as `--font-digital-numbers` |
| CSS color vars | `src/app/globals.css` | ✅ Yes | `--color-saa-bg`, `--color-saa-text-accent` |
| i18n pattern | `src/utils/i18n.ts` | ✅ Yes | Same `Record<Locale, T>` + getter pattern |
| Supabase middleware | `src/middleware.ts` | ✅ Extend | Add countdown exclusion + pre-event redirect |

---

## Key Implementation Details

### Countdown Math (in CountdownTimer)

```typescript
// Recalculate on every tick — handles tab-inactive drift
const diff = Math.max(0, targetDate.getTime() - Date.now());
const days = Math.floor(diff / 86_400_000);
const hours = Math.floor((diff % 86_400_000) / 3_600_000);
const minutes = Math.floor((diff % 3_600_000) / 60_000);
```

### Digit Splitting (in CountdownUnit)

```typescript
const tens = Math.floor(value / 10);
const ones = value % 10;
// Render: <DigitBox digit={tens} /> <DigitBox digit={ones} />
```

### Glassmorphism CSS (in DigitBox)

```css
/* Background element (opacity 0.5) */
border: 0.75px solid rgba(255, 234, 158, 0.5);  /* #FFEA9E at 50% */
background: linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 100%);
backdrop-filter: blur(24.96px);
border-radius: 12px;

/* Digit text (full opacity, positioned above) */
color: #FFFFFF;
font-family: var(--font-digital-numbers);
```

> **Note:** Use `rgba` colors with built-in alpha instead of CSS `opacity: 0.5` on the container. This avoids affecting child text opacity.

### SSR Hydration Mismatch Prevention

Server renders with server time → client hydrates with client time. To avoid mismatch:
```typescript
// Option: Suppress hydration warning on timer container
// Or: Render empty/skeleton on server, populate on client mount
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <CountdownSkeleton />; // or null
```

### Middleware Pre-Event Check

```typescript
// In middleware, BEFORE auth check and BEFORE /login check:
const eventDate = process.env.NEXT_PUBLIC_EVENT_START_DATE;
if (eventDate && new Date(eventDate) > new Date()) {
  // Event hasn't started — redirect ALL routes to /countdown (except /countdown itself and /login)
  if (pathname !== "/countdown" && pathname !== "/login") {
    return NextResponse.redirect(new URL("/countdown", request.url));
  }
  if (pathname === "/countdown") {
    return supabaseResponse; // skip auth for countdown page
  }
  // /login falls through to normal login handling below
}
// Post-event: normal auth flow continues below
```

> **Note:** `/login` is NOT excluded by the matcher regex — it's handled inside the middleware function (lines 13-18). So we must explicitly exclude it from the pre-event redirect. `/auth/callback` IS excluded by the matcher, so it won't reach this code.

---

## Testing Strategy

| Type | Focus | Scope |
|------|-------|-------|
| Unit | Countdown math (diff → days/hours/minutes) | Pure function test |
| Unit | Digit splitting (value → tens/ones) | Pure function test |
| Visual | Glassmorphism effect, font rendering | Manual Playwright screenshot |
| Integration | Middleware redirect logic | Request simulation |
| Edge case | Timer expiry → redirect, negative diff, large countdown | Client component test |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Montserrat italic not loaded | Low — faux-italic fallback looks similar | Check font config, add italic style if needed |
| `backdrop-filter` not supported on older browsers | Low — degrades gracefully to flat background | Already used on other pages (header). Acceptable degradation. |
| SSR/client time mismatch flash | Medium — briefly shows wrong countdown | Use `mounted` state pattern — render skeleton until client hydrates |
| `NEXT_PUBLIC_EVENT_START_DATE` not set | Medium — countdown shows 00:00:00 and redirects | Add validation: if env var missing, redirect to `/` immediately |
| Background image different from Homepage | Low — just download correct asset | Verify during Phase 0, download from Figma if needed |

---

## Open Questions

None — all questions resolved during spec review.
