# Tasks: Homepage SAA

**Frame:** `2167:9026` — Homepage SAA
**Spec:** `spec.md` | **Plan:** `plan.md` | **Design:** `design-style.md`
**Created:** 2026-03-10

---

## Summary

| Metric | Value |
|---|---|
| Total Tasks | 43 |
| Phase 1 (Setup) | 7 tasks |
| Phase 2 (Foundational) | 9 tasks |
| Phase 3 (US1+US3 — Hero & Navigation) | 6 tasks |
| Phase 4 (US2 — Awards) | 4 tasks |
| Phase 5 (US4 — Sun* Kudos) | 2 tasks |
| Phase 6 (US5+US6+US7 — Interactivity & API) | 5 tasks |
| Phase 7 (US8 — Widget) | 2 tasks |
| Phase 8 (Polish) | 7 tasks |
| Parallel Opportunities | Phases 3, 4, 5 can run in parallel after Phase 2 |

---

## Phase 1: Setup & Asset Preparation

> **Goal:** Download assets, create route structure, register fonts, setup types and i18n.

- [x] T001 Download all Figma assets (icons, images, illustrations) to `public/images/homepage/`, `public/images/icons/`, and Digital Numbers font to `src/fonts/DigitalNumbers-Regular.ttf` using MCP `get_media_files`
- [x] T002 Move logo from `public/images/login/logo-saa.png` to `public/images/logo-saa.png` and update import in `src/components/login/login-header.tsx`
- [x] T003 Delete placeholder `src/app/page.tsx` and create route group `src/app/(main)/layout.tsx` (minimal children wrapper) + `src/app/(main)/page.tsx` (skeleton with section placeholders)
- [x] T004 Register Digital Numbers font via `next/font/local` in `src/app/layout.tsx`, add CSS variable to `<body>` className, fix Montserrat Alternates weight to `["400","700"]`
- [x] T005 Expand design tokens in `src/app/globals.css` — add `--font-digital-numbers`, `--color-saa-accent`, `--color-saa-notification`, `--color-saa-text-accent`, `--color-saa-header-bg`
- [x] T006 Create homepage types in `src/types/homepage.ts` — `HomepageTranslations`, `RootFurtherContent`, `AwardItem` interfaces
- [x] T007 Expand i18n in `src/utils/i18n.ts` — add `getHomepageTranslations()`, `getAwardItems()`, `getRootFurtherContent()` functions with vi/en translations

**Checkpoint:** `yarn dev` starts without errors. `/` renders skeleton page. Login page still works.

---

## Phase 2: Foundational — Header, Footer & Layout

> **Goal:** Build shared layout components (Header, Footer, WidgetButton) that wrap all authenticated pages. These are blocking prerequisites for all user stories.

- [x] T008 Move `src/components/login/language-selector.tsx` → `src/components/header/language-selector.tsx` and update import in `src/components/login/login-header.tsx`
- [x] T009 [P] Create `src/components/header/nav-link.tsx` — Server Component, props: `href`, `label`, `isActive`; active state: `text-[#FFEA9E]` + underline + glow; normal: `text-white` + `hover:bg-white/10`
- [x] T010 [P] Create `src/components/header/notification-bell.tsx` — Client Component, stub `unreadCount = 0`, bell icon + conditional 8x8 red badge, placeholder panel on click, `aria-label="Thông báo"`
- [x] T011 [P] Create `src/components/header/user-menu.tsx` — Client Component, 40x40 icon with `#998C5F` border, dropdown (Profile/Sign out/Admin), sign out calls `supabase.auth.signOut()` → redirect `/login`, close on outside click + Escape
- [x] T012 Create `src/components/header/main-header.tsx` — Server Component, sticky `z-50`, `backdrop-blur-[10px]`, flex layout with Logo + NavLinks + NotificationBell + LanguageSelector + UserMenu, pass locale from `getLocaleFromCookie()`
- [x] T013 [P] Create `src/components/footer/main-footer.tsx` — Server Component, `border-t border-[#2E3940]`, Logo 69x64, nav links (same as header + "Tiêu chuẩn chung"), copyright, Montserrat Alternates 14px/400
- [x] T014 [P] Create `src/components/widget-button.tsx` — Client Component, `fixed bottom-8 right-[19px] z-60`, pill shape `rounded-full bg-[#FFEA9E]` 106x64, pen + SAA icons, hover scale(1.05), quick action menu placeholder
- [x] T015 Update `src/app/(main)/layout.tsx` — import and render `<MainHeader>`, `{children}`, `<MainFooter>`, `<WidgetButton>`, pass locale
- [ ] T016 Verify: header sticky with working nav links (active state on `/`), footer renders, widget floats, language selector and user menu dropdowns toggle, login page unaffected

**Checkpoint:** All shared layout components functional. Dropdowns toggle. Login still works separately.

---

## Phase 3: US1 + US3 — Hero Section & Navigation [P1]

> **Goal:** Build hero area with ROOT FURTHER banner, countdown, event info, and CTA navigation buttons.
> **Independent test:** Hero renders with background, countdown ticks, CTA buttons navigate to `/awards` and `/kudos`.

- [x] T017 [P] [US1] Create `src/components/homepage/countdown.tsx` — Client Component, props: `targetDate: string`, `useState` + `setInterval` 60s, zero-padding, expired state (00:00:00 + hide "Coming soon"), missing env → render nothing, `role="timer"` + `aria-live="polite"`, Digital Numbers font 49px, digit box `w-[51px] h-[82px]` with gradient + blur + `border-[0.5px] border-[#FFEA9E]`
- [x] T018 [P] [US1] Create `src/components/homepage/event-info.tsx` — Server Component, "Thời gian: 26/12/2025", "Địa điểm: Âu Cơ Art Center", livestream note, all text from `HomepageTranslations`
- [x] T019 [P] [US3] Create `src/components/homepage/hero-cta.tsx` — Server Component using `next/link`, primary (ABOUT AWARDS): `bg-[#FFEA9E]` text `#00101A` + arrow icon, secondary (ABOUT KUDOS): `border border-[#998C5F] bg-[#FFEA9E]/10` text white, hover states per design-style.md, stack vertical on mobile
- [x] T020 [US1] Create `src/components/homepage/hero-section.tsx` — Server Component wrapper, background `<Image fill priority>` + gradient overlay + z-index layering, contains Countdown + EventInfo + HeroCTA, responsive padding
- [x] T021 [US1] Add `.env.development` with `NEXT_PUBLIC_EVENT_START_DATETIME=2025-12-26T18:30:00+07:00`
- [x] T022 [US1] Assemble hero in `src/app/(main)/page.tsx` — render `<HeroSection>` with countdown targetDate from env var

**Checkpoint:** Hero renders with background, logo, ticking countdown, event info, CTA buttons link to `/awards` and `/kudos`. Responsive: stack on mobile.

---

## Phase 4: US2 — Awards Section [P1]

> **Goal:** Build awards grid with 6 award cards linking to Awards Information page.
> **Independent test:** Awards section renders 6 cards in responsive grid, cards link to `/awards#slug`.

- [x] T023 [P] [US2] Create `src/components/homepage/award-card.tsx` — Server Component wrapped in `<Link href="/awards#${slug}">`, props: `AwardItem`, image 336x336 `rounded-3xl border border-[#FFEA9E]` + glow + `mix-blend-screen`, title 24px gold, description `line-clamp-2`, "Chi tiết" link with arrow icon, hover: `translateY(-4px)` + enhanced glow
- [x] T024 [P] [US2] Create `src/components/homepage/awards-section.tsx` — Server Component, section header: caption 24px white + divider `1px #2E3940` + title 57px gold, award grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20`
- [x] T025 [US2] Assemble awards in `src/app/(main)/page.tsx` — render `<AwardsSection>` with `getAwardItems(locale)` data, 6 `<AwardCard>` instances
- [ ] T026 [US2] Verify: responsive grid 1→2→3 columns, card hover effect, links navigate to `/awards#slug`

**Checkpoint:** Awards section complete with responsive grid and working navigation.

---

## Phase 5: US4 — Sun* Kudos & Root Further Content [P2]

> **Goal:** Build Root Further content section and Sun* Kudos promo section.
> **Independent test:** Both sections render correctly with i18n text, Kudos links to `/kudos`.

- [x] T027 [P] [US4] Create `src/components/homepage/root-further-content.tsx` — Server Component, padded frame with semi-transparent bg, ROOT FURTHER small logo, text paragraphs from `getRootFurtherContent(locale)`, centered italic quote, Montserrat 24px/700 (xl) → 16px (mobile)
- [x] T028 [P] [US4] Create `src/components/homepage/sun-kudos-section.tsx` — Server Component, `border border-[#2E3940] rounded-lg bg-[rgba(0,12,20,0.8)] p-10`, 2-column: text left (~60%) + illustration right (~40%), label + title + gold subtitle "ĐIỂM MỚI CỦA SAA 2025" + description + "Chi tiết" `<Link href="/kudos">`, stack vertical on mobile

**Checkpoint:** Content sections render. Kudos button navigates to `/kudos`. Responsive stacking works.

---

## Phase 6: US5 + US6 + US7 — Interactivity & API [P2]

> **Goal:** Wire up notification API, complete language switching across pages, finalize user menu.
> **Independent test:** Notification badge shows/hides, language switch reloads with new locale, sign out redirects to login.

- [x] T029 [US6] Create `src/app/api/notifications/unread-count/route.ts` — read Supabase session, query notifications (stub: return `{ count: 0 }`), error handling returns `{ count: 0 }` + server log
- [x] T030 [US6] Wire NotificationBell to API in `src/components/header/notification-bell.tsx` — `useEffect` fetch `/api/notifications/unread-count`, show badge when `count > 0`, silently hide on error
- [ ] T031 [US5] Verify LanguageSelector works on Homepage — cookie-based locale switch reloads page, all Homepage text updates to selected language
- [ ] T032 [US7] Verify UserMenu sign out flow — `supabase.auth.signOut()` clears session, redirects to `/login`
- [ ] T033 [US7] Verify UserMenu admin link — conditionally show based on user metadata from Supabase session

**Checkpoint:** All interactive header features functional. Notification badge, language switch, sign out all work.

---

## Phase 7: US8 — Widget Button [P3]

> **Goal:** Complete widget button with quick action menu (or placeholder).
> **Independent test:** Widget toggles, shows "Coming soon" or action items.

- [x] T034 [US8] Implement widget toggle menu in `src/components/widget-button.tsx` — expand on click, show quick action items or "Coming soon" tooltip if actions undefined
- [ ] T035 [US8] Verify: widget floats at bottom-right, toggles on click, close on outside click

**Checkpoint:** Widget button complete.

---

## Phase 8: Polish & Cross-Cutting Concerns

> **Goal:** Responsive, accessibility, performance, edge cases.

- [x] T036 Create `src/components/header/mobile-nav.tsx` — Client Component, hamburger icon visible below `md`, slide-out panel with nav links + language selector + notification + user menu, close on link click / outside click / Escape, animate translate-x, touch targets >= 44px
- [x] T037 Update `src/components/header/main-header.tsx` — integrate MobileNav, hide desktop nav below `md` (`hidden md:flex`)
- [ ] T038 Responsive verification — test at 375px, 768px, 1024px, 1440px: countdown smaller on mobile, CTAs full-width stack, awards 1→2→3 columns, Kudos stack vertical, footer stack vertical, no horizontal scroll
- [ ] T039 Accessibility audit — keyboard tab through all elements, `aria-live` on countdown, `aria-current="page"` on active nav, `aria-expanded` on dropdowns, `aria-label` on icon buttons, focus rings visible, color contrast WCAG AA
- [ ] T040 Performance check — First Load JS < 100KB/route, `sizes` prop on all images, below-fold lazy load, background image `priority` for LCP, no layout shift (explicit image dimensions)
- [ ] T041 Edge cases — countdown env var missing → hide section, expired → 00:00:00, notification API fail → badge hidden, award images fail → fallback, session expired → middleware redirects
- [ ] T042 Assemble final `src/app/(main)/page.tsx` — ensure all sections in correct order with `gap-[60px] xl:gap-[120px]` spacing, verify full page scroll
- [x] T043 Fix font bugs: verify Montserrat Alternates weight 400 in `src/app/layout.tsx` (fixed in T004), remove incorrect `italic` from quote in `src/components/homepage/root-further-content.tsx`

**Checkpoint:** All breakpoints tested. Accessibility passes. Performance budget met. Edge cases handled.

---

## Dependencies & Execution Order

```
Phase 1 (Setup)
  └──▶ Phase 2 (Header/Footer/Layout) ──▶ Phase 6 (API/Interactivity)
  ├──▶ Phase 3 (Hero — US1+US3)         ──▶ Phase 8 (Polish)
  ├──▶ Phase 4 (Awards — US2)           ──▶ Phase 8 (Polish)
  └──▶ Phase 5 (Kudos — US4)            ──▶ Phase 7 (Widget — US8) ──▶ Phase 8 (Polish)
```

### Parallel Execution Opportunities

**After Phase 1 completes, 3 parallel tracks:**

| Track A (Layout) | Track B (Hero) | Track C (Content) |
|---|---|---|
| T008-T016 (Phase 2) | T017-T022 (Phase 3) | T023-T028 (Phase 4+5) |
| Header, Footer, Widget | Countdown, EventInfo, CTAs | Awards, Root Further, Kudos |

**Within phases, [P] tasks can run in parallel:**
- Phase 2: T009, T010, T011 in parallel → T012 (depends on them) → T013, T014 in parallel → T015
- Phase 3: T017, T018, T019 in parallel → T020 (assembles them) → T021, T022
- Phase 4: T023, T024 in parallel → T025

---

## Implementation Strategy

### MVP Scope (Recommended First Delivery)
- **Phase 1** + **Phase 2** + **Phase 3** = Functional homepage with header, footer, hero, countdown
- This covers US1 (countdown) and US3 (navigation) — both P1 priority
- Estimated: ~16 tasks (T001-T016 + T017-T022)

### Incremental Delivery
1. **MVP:** Phases 1-3 → Hero + Navigation working
2. **Content:** Phases 4-5 → Awards grid + Kudos section
3. **Interactivity:** Phase 6 → Notification API, language, user menu wired
4. **Widget:** Phase 7 → Quick action menu
5. **Polish:** Phase 8 → Responsive, a11y, performance

### Key Constraints
- No new npm dependencies required
- 5 Client Components only (Countdown, LanguageSelector, NotificationBell, UserMenu, WidgetButton)
- All other components are Server Components
- Cookie-based i18n (no global state library)
- Static award data for v1 (abstracted via `getAwardItems()` for future API swap)
