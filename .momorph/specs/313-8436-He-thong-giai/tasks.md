# Tasks: Hệ thống giải thưởng SAA 2025

**Frame:** `313:8436` — Hệ thống giải
**Spec:** `spec.md` | **Plan:** `plan.md` | **Design:** `design-style.md`
**Created:** 2026-03-11

---

## Summary

| Metric | Value |
|---|---|
| Total Tasks | 30 |
| Phase 1 (Setup & Assets) | 4 tasks |
| Phase 2 (Foundational — Types & Data) | 3 tasks |
| Phase 3 (US1 — Award Cards) | 5 tasks |
| Phase 4 (US2 — Sidebar Navigation) | 2 tasks |
| Phase 5 (US3 — Deep Link & Hash) | 1 task |
| Phase 6 (US1+US2+US3 — Page Assembly) | 2 tasks |
| Phase 7 (US4 — Sun* Kudos) | 3 tasks |
| Phase 8 (US5 — Header/Footer Active State) | 2 tasks |
| Phase 9 (Polish) | 8 tasks |
| Parallel Opportunities | Phase 3 and Phase 4 can run in parallel after Phase 2. Phase 7 and Phase 8 can run in parallel. |

---

## Phase 1: Setup & Asset Preparation

> **Goal:** Download new icons and verify existing assets are in place.

- [x] T001 Download 3 new SVG icons (Target 24x24, Diamond 24x24, License 24x24) from Figma using MCP `get_media_files` to `public/images/icons/target.svg`, `public/images/icons/diamond.svg`, `public/images/icons/license.svg`
- [x] T002 Download Sun* Kudos background image from Figma node `I335:12023;313:8416` to `public/images/homepage/kudos-bg.webp` (1152x500px) using MCP `get_media_files`
- [x] T003 Verify keyvisual banner — check if Figma `2167:5138` is same as existing `public/images/homepage/bg-artwork.png`; if different, download to `public/images/awards/banner.webp`
- [x] T004 Verify all 6 award images exist in `public/images/homepage/awards/` (top-talent.png, top-project.png, top-project-leader.png, best-manager.png, signature-creator.png, mvp.png) and ROOT FURTHER logo at `public/images/homepage/root-further-hero.png`

**Checkpoint:** All required assets present on disk. 3 new SVG icons + 1 new background image downloaded. Existing assets verified.

---

## Phase 2: Foundational — Types & Data (i18n)

> **Goal:** Extend type system and i18n data to support award detail page. Blocking prerequisite for all UI phases.

- [x] T005 Add `AwardDetailItem` interface (extends `AwardItem` with `quantityDisplay: string`, `quantityUnit?: string`, `prizeValue: string`, `prizeNote?: string`, `secondPrizeValue?: string`, `secondPrizeNote?: string`) and `AwardsPageTranslations` interface in `src/types/homepage.ts`
- [x] T006 Add `getAwardDetailItems(locale: string)` function in `src/utils/i18n.ts` — returns `AwardDetailItem[]` for all 6 awards with full data (quantity, prize, unit, notes) per spec.md Section 4 data table. Include vi and en translations.
- [x] T007 Add `getAwardsPageTranslations(locale: string)` function in `src/utils/i18n.ts` — returns `AwardsPageTranslations` with labels: section subtitle ("Sun* Annual Awards 2025"), section title ("Hệ thống giải thưởng SAA 2025"), quantity label ("Số lượng giải thưởng:"), prize label ("Giá trị giải thưởng:"), sidebar aria-label, "Hoặc" text, Kudos section texts. Include vi and en.

**Checkpoint:** `yarn tsc --noEmit` passes. New types and i18n functions are importable.

---

## Phase 3: US1 — Award Cards [P1]

> **Goal:** Build the award card components that display all 6 award categories with alternating layout.
> **Independent test:** Award cards render with correct data, alternating image/content layout, Signature "Hoặc" special case, last card has no bottom divider.

- [x] T008 [P] [US1] Create `src/components/awards/award-card-content.tsx` — Server Component. Props: `AwardDetailItem` + `translations: AwardsPageTranslations`. Renders: title row (target icon 24x24 + name 24px/700 gold), description (16px/700 white), divider (1px #2E3940 480px), quantity block (diamond icon + label 24px gold + number 36px white + unit 14px white), divider, prize block (license icon + label 24px gold + value 36px white + note 14px white). Handle Signature card: render "Hoặc" divider (`flex-row gap-8`, text 14px #2E3940 + line 434x1px) between two prize rows. Handle MVP: no `quantityUnit`, no `prizeNote`.
- [x] T009 [P] [US1] Create `src/components/awards/award-card.tsx` — Server Component. Props: `award: AwardDetailItem`, `index: number`, `translations: AwardsPageTranslations`. Wrapper with `id={award.slug}` and `aria-labelledby={award.slug + "-title"}`. Uses `index % 2 === 0` for `flex-row` (image left) vs `flex-row-reverse` (image right). Inner frame: `flex gap-10 items-start`. Award image: `next/image` 336x336, `rounded-[24px] border-[0.955px] border-[#FFEA9E] mix-blend-screen`, with `onError` fallback (gray placeholder div). Renders `<AwardCardContent>`.
- [x] T010 [P] [US1] Create `src/components/awards/award-cards-list.tsx` — Server Component. Props: `awards: AwardDetailItem[]`, `translations: AwardsPageTranslations`. Maps over 6 awards, renders `<AwardCard>` for each with 853px divider (1px #2E3940) between cards — omit divider after last card (MVP). Container: `flex flex-col`.
- [x] T011 [P] [US1] Create `src/components/awards/section-title.tsx` — Server Component. Props: `subtitle: string`, `title: string`. Layout: `flex flex-col gap-4` within 1152px. Subtitle: 24px/700 white. Divider: 1px #2E3940 full width. Title: 57px/700 gold (#FFEA9E), letter-spacing -0.25px.
- [x] T012 [US1] Verify: create a temporary test page at `src/app/(main)/awards/page.tsx` that imports `getAwardDetailItems`, `getAwardsPageTranslations`, `getLocaleFromCookie` and renders `<AwardsSectionTitle>` + `<AwardCardsList>` to visually confirm all 6 cards render correctly with alternating layout

**Checkpoint:** All 6 award cards render with correct data. Odd cards = image left, even = image right. Signature has "Hoặc" divider. MVP has no bottom divider. Section title displays correctly.

---

## Phase 4: US2 — Sidebar Navigation [P1]

> **Goal:** Build sticky sidebar with scroll-spy behavior using IntersectionObserver.
> **Independent test:** Sidebar renders 6 items, click scrolls to section, scroll updates active item.

- [x] T013 [US2] Create `src/components/awards/awards-sidebar.tsx` — Client Component (`"use client"`). Props: `awards: { slug: string; title: string }[]`. State: `activeSlug: string`. On mount: read `window.location.hash` → if valid slug, set initial active + scroll to section. IntersectionObserver: observe all `[id]` sections matching award slugs, `rootMargin: "-80px 0px -60% 0px"`, update `activeSlug` on intersection. Click handler: `scrollIntoView({ behavior: 'smooth' })`, update hash via `history.replaceState`. Render: `<nav aria-label="Danh mục giải thưởng" aria-live="polite">` with 6 items. Each item: `flex-row gap-1 items-center p-4 rounded-[4px]`, target icon 24x24 + title 14px/700. States: normal = white text/transparent bg, active = gold text (#FFEA9E), hover = `bg-white/10 cursor-pointer`, focus = `outline-2 outline-white/50`. Desktop (lg+): `sticky top-[96px] w-[178px] flex-col gap-4`. Mobile/Tablet (< lg): horizontal scroll tabs `overflow-x-auto snap-x`, touch targets >= 44px.
- [x] T014 [US2] Update temporary test page `src/app/(main)/awards/page.tsx` — add `<AwardsSidebar>` beside `<AwardCardsList>` in a `flex flex-row gap-20` container. Verify: sidebar renders, click scrolls to correct section, scroll updates active item, sticky behavior works.

**Checkpoint:** Sidebar renders 6 items with target icons. Click scrolls to section. Scroll-spy updates active state. Sticky positioning works. Mobile shows horizontal tabs.

---

## Phase 5: US3 — Deep Link & Hash Navigation [P1]

> **Goal:** Handle `/awards#slug` navigation from Homepage award cards.
> **Independent test:** Navigate to `/awards#top-project` → page scrolls to Top Project section, sidebar highlights it.

- [x] T015 [US3] Verify deep link handling in `src/components/awards/awards-sidebar.tsx` — ensure `useEffect` on mount reads `window.location.hash`, validates against known slugs (top-talent, top-project, top-project-leader, best-manager, signature-creator, mvp), scrolls to target section with slight delay (100ms) for DOM ready, sets `activeSlug`. Invalid/empty hash → stay at top, first item active. Test by navigating from Homepage award cards.

**Checkpoint:** `/awards#best-manager` scrolls to Best Manager and highlights sidebar. `/awards` (no hash) starts at top with Top Talent active. Invalid hash ignored.

---

## Phase 6: US1+US2+US3 — Page Assembly [P1]

> **Goal:** Assemble the full Awards page route with keyvisual, gradient, content container, and all sections.

- [x] T016 [US1] Build final `src/app/(main)/awards/page.tsx` — Server Component. Fetch `locale` via `getLocaleFromCookie()`, `awards` via `getAwardDetailItems(locale)`, `translations` via `getAwardsPageTranslations(locale)`. Render page structure: (1) Keyvisual `<Image fill priority>` absolute top-0 w-full h-[547px] object-cover z-0, (2) Cover gradient absolute w-full h-[627px] z-[1] `bg-gradient-to-t from-[#00101A] to-transparent`, (3) "Bìa" container relative z-10 `px-4 md:px-8 lg:px-16 xl:px-36 py-24 flex flex-col gap-[120px]`: ROOT FURTHER logo (338x150), `<AwardsSectionTitle>`, Award System container (`flex flex-col lg:flex-row gap-10 lg:gap-20`): `<AwardsSidebar>` + `<AwardCardsList>`, placeholder for `<AwardsKudosSection>` (Phase 7).
- [x] T017 Verify full page: keyvisual renders with gradient overlay, content layers above, sidebar + cards in 2-column desktop layout, responsive stacking on mobile. Login page still works. Header shows "Award Information" active.

**Checkpoint:** Full Awards page functional at `/awards`. Keyvisual + gradient + content layered correctly. 2-column layout on desktop. All 6 cards + sidebar working. Deep links from Homepage navigate correctly.

---

## Phase 7: US4 — Sun* Kudos Section [P2]

> **Goal:** Build Awards-page-specific Kudos section (new component, NOT reusing Homepage version).
> **Independent test:** Kudos section renders with solid yellow button, background image, decorative "KUDOS" text, and links to `/kudos`.

- [x] T018 [P] [US4] Download arrow icon for Kudos button if not already at `public/images/icons/arrow-right.svg` — 24x24 SVG, check if existing Homepage CTA arrow can be reused
- [x] T019 [US4] Create `src/components/awards/kudos-section.tsx` — Server Component. Props: translations (label, title, subtitle, description, detailButton text). Layout: 1152x500px container with `bg-[#0F0F0F]` + background image overlay (`/images/homepage/kudos-bg.webp`). 2-column: text left (~60%) + illustration right (~40%). Text block (`flex-col gap-8`): label "Phong trào ghi nhận" 24px/700 white, title "Sun* Kudos" 57px/700 gold, description 16px/700 white with "ĐIỂM MỚI CỦA SAA 2025" inline bold. Button: `<Link href="/kudos">` with `bg-[#FFEA9E] text-[#00101A] rounded-[4px] px-4 py-4 flex gap-2 items-center`, text 16px/700, arrow icon 24x24. Hover: `bg-[#FFE078] translateY(-2px)`. Illustration: `next/image` 272x219. Decorative "KUDOS" text: SVN-Gotham 96px/400 `text-[#DBD1C1]`, fallback to system sans-serif. Responsive: stack vertical on mobile (text top, illustration bottom).
- [x] T020 [US4] Integrate `<AwardsKudosSection>` into `src/app/(main)/awards/page.tsx` — replace placeholder, pass translations from `getHomepageTranslations(locale)` (Kudos keys shared with Homepage). Verify: section renders below award cards, button navigates to `/kudos`.

**Checkpoint:** Kudos section renders with background image, solid yellow button, decorative text. Button links to `/kudos`. Responsive stacking works.

---

## Phase 8: US5 — Header/Footer Active State [P2]

> **Goal:** Ensure "Award Information" is visually highlighted in both header and footer navigation.
> **Independent test:** Header nav shows gold text + underline + glow on "Award Information". Footer shows highlighted background on "Award Information".

- [x] T021 [US5] Modify `src/components/footer/main-footer.tsx` — add optional `pathname?: string` prop. When `pathname` matches a footer link's `href`, apply active style: `bg-[rgba(255,234,158,0.1)]` (rounded). No changes to existing links or layout. Ensure backward compatibility (Homepage passes no pathname = no active state, Awards page passes `/awards`).
- [x] T022 [US5] Update `src/app/(main)/layout.tsx` — pass `pathname` to `<MainFooter pathname={pathname}>` (pathname already available from `headers()`, already passed to `MainHeader`). Verify: footer shows "Award Information" highlighted when on `/awards`, no highlight when on `/`.

**Checkpoint:** Header "Award Information" active (gold + glow). Footer "Award Information" has subtle gold background. Homepage footer unchanged.

---

## Phase 9: Polish & Cross-Cutting Concerns

> **Goal:** Responsive, accessibility, performance, edge cases.

- [x] T023 Responsive verification — test at 375px, 768px, 1024px, 1440px: (375) sidebar = horizontal scroll tabs, cards stack vertical (image top, content below), section title 32px, keyvisual 300px, Kudos stacks vertical, page px-4; (768) sidebar horizontal tabs above content, single column cards, section title 40px, px-8; (1024) full 2-column sidebar+content, alternating card row layout, section title 48px, px-16; (1440) pixel-perfect Figma match, px-36, sidebar 178px + gap 80px + content 853px
- [x] T024 Accessibility audit — keyboard Tab through sidebar items → award sections → Kudos button → footer. Verify: `<nav aria-label="Danh mục giải thưởng">`, `aria-current="true"` on active sidebar item, `<section id={slug} aria-labelledby>` on each award, `aria-live="polite"` on sidebar nav for screen reader announcements, `focus-visible:ring-2 ring-white/50` on interactive elements, descriptive `alt` text on award images
- [x] T025 Performance check — verify First Load JS < 100KB for `/awards` route (only `AwardsSidebar` is Client Component). All award images use `next/image` with `sizes` prop. Keyvisual has `priority` for LCP. Below-fold images lazy loaded. No layout shift (explicit dimensions on all images).
- [x] T026 Edge cases — (1) invalid hash fragment → ignore, show top, first sidebar item active; (2) last card (MVP) no bottom divider; (3) Signature card "Hoặc" divider renders between two prize values; (4) award images fail → fallback placeholder; (5) session expired → middleware redirects to `/login`; (6) SVN-Gotham font missing → "KUDOS" falls back to sans-serif gracefully
- [x] T027 Register SVN-Gotham font if available — check if font file exists or needs download. If available, register via `next/font/local` in `src/app/layout.tsx` with CSS variable. If not available, document the fallback (system sans-serif) and move on.
- [x] T028 Award image `mix-blend-mode: screen` verification — confirm all 6 award images render with `mix-blend-screen` against dark background, matching Homepage card style. Verify gold border `0.955px solid #FFEA9E` and `border-radius: 24px` on all images.
- [x] T029 Verify award description texts — use MoMorph `list_design_items` tool on frame `313:8436` to extract full description text for each award card. Update `getAwardDetailItems()` in `src/utils/i18n.ts` if descriptions differ from short Homepage versions.
- [x] T030 Final page scroll verification — ensure all sections render in correct order (Keyvisual → ROOT FURTHER logo → Section Title → Award System (sidebar + cards) → Sun* Kudos) with `gap-[120px]` between main sections. No horizontal scroll at any breakpoint. Full page navigable.

**Checkpoint:** All breakpoints tested. Accessibility passes. Performance budget met. Edge cases handled. Award descriptions verified.

---

## Phase 10: Font Bug Fix

> **Goal:** Fix incorrect font in footer and verify all component fonts match design-style.md.

- [x] T031 [BUG] Fix footer font — `main-footer.tsx` uses `font-montserrat-alt text-sm font-normal` (Montserrat Alternates 14px/400) but design-style.md specifies `Montserrat 16px/700/24px` for footer nav links. Change to `font-montserrat text-base font-bold leading-6`. Applies to both nav links and copyright text.

**Checkpoint:** Footer nav links and copyright text use Montserrat 16px/700/24px matching the Figma design.

---

## Dependencies & Execution Order

```
Phase 1 (Assets)
  └──▶ Phase 2 (Types & Data)
        ├──▶ Phase 3 (Award Cards — US1) ──┐
        │                                   ├──▶ Phase 6 (Page Assembly)
        └──▶ Phase 4 (Sidebar — US2) ──────┘       │
                                                     ├──▶ Phase 9 (Polish)
             Phase 5 (Deep Link — US3) ◄── Phase 4  │
             Phase 7 (Kudos — US4) ──────────────────┘
             Phase 8 (Active State — US5) ───────────┘
```

### Parallel Execution Opportunities

**After Phase 2 completes, 2 parallel tracks:**

| Track A (Award Cards) | Track B (Sidebar) |
|---|---|
| T008-T012 (Phase 3) | T013-T014 (Phase 4) |
| Section title, card content, card, cards list | Sidebar with scroll-spy |

**After Phase 6 completes, 2 parallel tracks:**

| Track C (Kudos) | Track D (Active State) |
|---|---|
| T018-T020 (Phase 7) | T021-T022 (Phase 8) |
| Awards-specific Kudos section | Footer pathname prop |

**Within Phase 3, [P] tasks can run in parallel:**
- T008, T009, T010, T011 in parallel → T012 (verification, depends on all)

---

## Implementation Strategy

### MVP Scope (Recommended First Delivery)
- **Phase 1** + **Phase 2** + **Phase 3** + **Phase 4** + **Phase 6** = Functional awards page with sidebar + 6 award cards
- This covers US1 (award details), US2 (sidebar nav), US3 (deep link) — all P1 priority
- Estimated: ~17 tasks (T001-T017)

### Incremental Delivery
1. **MVP:** Phases 1-6 → Award cards + sidebar + page assembly working
2. **Content:** Phase 7 → Sun* Kudos section
3. **Navigation:** Phase 8 → Header/footer active state
4. **Polish:** Phase 9 → Responsive, a11y, performance, edge cases

### Key Constraints
- No new npm dependencies required
- 1 Client Component only (`AwardsSidebar`)
- All other components are Server Components
- Cookie-based i18n (shared with Homepage)
- Static award data for v1 (abstracted via `getAwardDetailItems()`)
- Extends existing `AwardItem` type (backward compatible)
- Shared layout components (MainHeader, MainFooter, WidgetButton) already in place from Homepage
