# Tasks: Sun* Kudos - Live Board

**Frame:** `2940:13431` — Sun* Kudos - Live board
**Spec:** `spec.md` | **Plan:** `plan.md` | **Design:** `design-style.md`
**Created:** 2026-03-16

---

## Summary

| Metric | Value |
|---|---|
| Total Tasks | 49 |
| Phase 1 (Setup) | 6 tasks |
| Phase 2 (Foundational — API Routes) | 10 tasks |
| Phase 3 (Foundational — Shared Components) | 6 tasks |
| Phase 4 (US1 — Hero & Action Bar) | 3 tasks |
| Phase 5 (US2 — Highlight Kudos) | 5 tasks |
| Phase 6 (US4+US5+US6 — Feed & Sidebar) | 7 tasks |
| Phase 7 (US3 — Spotlight Board) | 4 tasks |
| Phase 8 (Cross-cutting — Modal, Footer, Toast) | 3 tasks |
| Phase 9 (Polish) | 5 tasks |
| Parallel Opportunities | Phase 2+3 parallel; Phase 4, 5, 6, 7 parallel after Phase 2+3 |

---

## Phase 1: Setup & Asset Preparation

> **Goal:** Tải assets, tạo route skeleton, types, i18n, DB migration, utils.

- [x] T001 Download all Figma assets (KV background, KUDOS logo, icons: heart, send-arrow, copy-link, gift, pen, chevron-down, search, pan-zoom, carousel arrows) to `public/images/kudos/` using MCP `get_media_files`
- [x] T002 Create DB migration `supabase/migrations/YYYYMMDD_create_kudos_tables.sql` with all 8 tables (kudos, kudos_hashtags, kudos_images, kudos_hearts, secret_boxes, user_profiles, hashtags, departments) + indexes + RLS policies from plan.md, then create seed data in `supabase/seeds/kudos_seed.sql`
- [x] T003 [P] Create `src/types/kudos.ts` — interfaces: `Kudo` (id, sender, receiver, content, hashtag_category, hashtags, images, heart_count, is_hearted, created_at), `KudoHighlight` (extends Kudo), `KudosStats` (kudos_received, kudos_sent, hearts_received, secret_box_opened, secret_box_unopened), `UserProfile` (id, full_name, department_code, star_count, hero_badge, avatar_url), `SecretBox` (id, is_opened, gift_description), `TopSunner` (profile + gift_description), `KudosTranslations`, `SpotlightEntry` (name, count)
- [x] T004 [P] Add `getKudosTranslations()` to `src/utils/i18n.ts` — vi/en strings for: section titles ("HIGHLIGHT KUDOS", "SPOTLIGHT BOARD", "ALL KUDOS"), subtitles ("Sun* Annual Awards 2025"), hero tagline, stat labels, action bar placeholders, button labels, toast messages
- [x] T005 Create route `src/app/(main)/kudos/page.tsx` — Server Component skeleton with section placeholder divs, import locale from `getLocaleFromCookie()`, pass translations
- [x] T006 [P] Create `src/utils/format-number.ts` — export `formatNumber(n: number): string` using Vietnamese locale (1.000 separator), handle edge cases (0, negative, large numbers)

**Checkpoint:** `yarn dev` starts. `/kudos` renders skeleton page. DB tables created with seed data. Types importable.

---

## Phase 2: Foundational — API Routes

> **Goal:** Tất cả 10 API endpoints hoạt động với Supabase Auth + proper error handling.

- [x] T007 [P] Create `src/app/api/kudos/route.ts` — GET handler: validate auth via `createClient()` + `getUser()`, query kudos table with JOINs (sender/receiver profiles, hashtags, images, heart count, is_hearted by current user), support query params: `page` (default 1), `limit` (default 10), `hashtag`, `department`, `category`. Return `{ data: Kudo[], total: number, page: number }`. Cursor-based pagination via `created_at`.
- [x] T008 [P] Create `src/app/api/kudos/highlights/route.ts` — GET handler: query top 5 kudos ORDER BY heart_count DESC, with same JOINs as T007, support optional `hashtag` and `department` filter params. Return `{ data: KudoHighlight[] }`.
- [x] T009 [P] Create `src/app/api/kudos/spotlight/route.ts` — GET handler: aggregate receiver names + count from kudos table, GROUP BY receiver_id, JOIN user_profiles for full_name. Return `{ data: SpotlightEntry[], total_kudos: number }`.
- [x] T010 [P] Create `src/app/api/kudos/[id]/heart/route.ts` — POST handler: check if kudos_hearts row exists for (kudo_id, user_id). If exists → DELETE (unheart). If not → INSERT (heart). Return `{ hearted: boolean, heart_count: number }`. Validate kudo_id exists.
- [x] T011 [P] Create `src/app/api/kudos/stats/route.ts` — GET handler: query for current user: COUNT kudos received, COUNT kudos sent, SUM hearts received on own kudos, COUNT secret_boxes opened, COUNT secret_boxes unopened. Return `KudosStats`.
- [x] T012 [P] Create `src/app/api/kudos/top-receivers/route.ts` — GET handler: query secret_boxes WHERE is_opened = true ORDER BY opened_at DESC LIMIT 10, JOIN user_profiles. Return `{ data: TopSunner[] }`.
- [x] T013 [P] Create `src/app/api/hashtags/route.ts` — GET handler: query DISTINCT hashtags from kudos_hashtags table, ORDER BY name. Return `{ data: string[] }`.
- [x] T014 [P] Create `src/app/api/departments/route.ts` — GET handler: query departments table ORDER BY name. Return `{ data: { code: string, name: string }[] }`.
- [x] T015 [P] Create `src/app/api/secret-box/open/route.ts` — POST handler: body `{ box_id: string }`, validate ownership (user_id = current user), UPDATE is_opened = true + opened_at = now(). Return `{ success: boolean, gift_description: string }`.
- [x] T016 [P] Create `src/app/api/users/search/route.ts` — GET handler: query param `q` (min 2 chars), search user_profiles by full_name ILIKE `%q%` LIMIT 20. Return `{ data: UserProfile[] }`.

**Checkpoint:** All 10 endpoints return correct JSON. Auth validated on each. Error handling returns proper status codes (401, 400, 404, 500).

---

## Phase 3: Foundational — Shared Components & Hooks

> **Goal:** Build reusable UI building blocks used across multiple sections.

- [x] T017 [P] Create `src/components/kudos/section-header.tsx` — Server Component, props: `subtitle: string`, `title: string`, `filterSlot?: ReactNode`. Render: subtitle (Montserrat 24px/700 white) → divider (1px `#2E3940`) → title row (Montserrat 57px/700 gold `#FFEA9E` letter-spacing -0.25px) with filterSlot right-aligned. Container `px-6 xl:px-36`. Responsive: title 36px mobile → 48px md → 57px xl.
- [x] T018 [P] Create `src/components/kudos/kudo-user-info.tsx` — Server Component, props: `user: UserProfile`, `showBadge?: boolean`. Render: avatar 64x64px circle (border `1.869px solid #FFF`) → full_name (Montserrat 16px/700 `#00101A` letter-spacing 0.15px) → department_code (14px/700 `#999`) + dot separator (4px circle `#999` opacity 0.4) + hero badge pill (height 19px, border-radius 48px, border `0.5px solid #FFEA9E`, badge text ~11.4px/700 white with text-shadow per variant). Layout: `flex-col items-center gap-[13px]`, width 235px.
- [x] T019 [P] Create `src/components/kudos/kudo-content-box.tsx` — Server Component, props: `content: string`, `maxLines: 3 | 5`. Render: box bg `rgba(255,234,158,0.40)`, border `1px solid #FFEA9E`, border-radius 12px, padding `16px 24px`. Text: Montserrat 20px/700/32px `#00101A` text-justify. Truncate with `line-clamp-3` or `line-clamp-5` + ellipsis.
- [x] T020 [P] Create `src/components/kudos/kudo-action-footer.tsx` — Client Component (`"use client"`), props: `kudoId: string`, `heartCount: number`, `isHearted: boolean`, `showDetail?: boolean`, `onDetailClick?: () => void`. Render: heart icon 32x32 (red `rgba(212,39,29,1)` if hearted, gray `#999` if not, hover `scale(1.1)`) + count (Montserrat 24px/700 `#00101A`, format with `formatNumber`) | "Copy Link 🔗" button (Montserrat 16px/700 `#00101A`, hover gold) | optional "Xem chi tiết ↗" button. Use `use-heart-toggle` hook. Copy link uses `navigator.clipboard.writeText()` + triggers toast.
- [x] T021 [P] Create `src/hooks/use-heart-toggle.ts` — Custom hook: `useHeartToggle(kudoId, initialHearted, initialCount)` → returns `{ isHearted, heartCount, toggle }`. Optimistic UI: update state immediately, POST `/api/kudos/${kudoId}/heart`, rollback on error. Debounce 300ms to prevent double-click.
- [x] T022 [P] Create `src/hooks/use-kudos-feed.ts` — Custom hook: `useKudosFeed(filters)` → returns `{ kudos, isLoading, isLoadingMore, error, loadMore, hasMore }`. Fetch `/api/kudos` with cursor pagination. Append new pages. Support filter params (hashtag, department, category). Reset on filter change. IntersectionObserver for infinite scroll trigger.

**Checkpoint:** Shared components render correctly in isolation. Hooks work with API endpoints from Phase 2.

---

## Phase 4: US1 — Hero Banner & Action Bar [P1]

> **Goal:** Hero banner hiển thị, action buttons mở placeholder dialogs.
> **Independent test:** Hero renders with KV background, tagline, logo. Pill buttons clickable.

- [x] T023 [US1] Create `src/components/kudos/kudos-hero.tsx` — Server Component. Background: `<Image fill priority>` with KV Kudos image + gradient overlay (`linear-gradient(25deg, #00101A 14.74%, rgba(0,19,32,0) 47.8%)`). Height 512px. Tagline: Montserrat 36px/700/44px gold `#FFEA9E` ("Hệ thống ghi nhận và cảm ơn" from translations). Logo: KUDOS image 593x104. Z-index layering per design-style. Responsive: height auto on mobile, tagline 24px.
- [x] T024 [US1] Create `src/components/kudos/kudos-action-bar.tsx` — Client Component (`"use client"`). Two pill buttons: (1) "✏️ Hôm nay, bạn muốn gửi lời cảm ơn..." — height 72px, bg `rgba(255,234,158,0.10)`, border `1px solid #998C5F`, border-radius 68px, padding `24px 16px`, text Montserrat 16px/700 white. Click: placeholder alert (Viết Kudo dialog not yet implemented). (2) "🔍 Tìm kiếm profile Sunner" — same style. Hover: bg `rgba(255,234,158,0.40)`. Focus: outline `2px solid #FFEA9E`. Responsive: stack vertical full-width on mobile.
- [x] T025 [US1] Assemble hero in `src/app/(main)/kudos/page.tsx` — Import and render `<KudosHero>` + `<KudosActionBar>` at top of page, passing translations and locale

**Checkpoint:** Hero renders with background, tagline, KUDOS logo. Both pill buttons clickable with hover/focus states. Responsive: stacks on mobile.

---

## Phase 5: US2 — Highlight Kudos Carousel [P1]

> **Goal:** Carousel hiển thị top 5 kudos, filter dropdowns work, pagination syncs.
> **Independent test:** Carousel slides with arrows, pagination shows X/5, filters update carousel content.

- [x] T026 [P] [US2] Create `src/components/kudos/highlight-kudo-card.tsx` — Client Component. Width 528px. Background `#FFF8E1`, border `4px solid #FFEA9E`, border-radius 16px, padding `24px 24px 16px 24px`, gap 16px. Compose: KudoUserInfo (sender) → send arrow icon 32x32 → KudoUserInfo (receiver) | timestamp (Montserrat 16px/700 `#999`, format "HH:mm - MM/DD/YYYY") | hashtag category (clickable, pen icon, Montserrat 16px/700 `#00101A`) | KudoContentBox (maxLines 3) | hashtags (red `rgba(212,39,29,1)`, max 1 line with "...") | KudoActionFooter (with "Xem chi tiết" button that opens modal)
- [x] T027 [P] [US2] Create `src/components/kudos/highlight-carousel.tsx` — Client Component. Horizontal scroll container with CSS scroll-snap. Gradient fades on both sides (400px, gradients from design-style). Prev/next arrow buttons: 80x80px transparent, arrow icon 60x60. Disable prev at index 0, disable next at last item. Animate slide transition. Touch/swipe support via scroll-snap.
- [x] T028 [P] [US2] Create `src/components/kudos/carousel-pagination.tsx` — Client Component, props: `currentIndex`, `total`, `onPrev`, `onNext`. Render: ◀ button (48x48px) + page text (Montserrat 28px/700, current in `#FFF`, total in `#999`) + ▶ button. Disable at bounds. Gap 32px. `aria-label` on buttons.
- [x] T029 [P] [US2] Create `src/components/kudos/hashtag-filter.tsx` + `src/components/kudos/department-filter.tsx` — Client Components. Dropdown button: bg `rgba(255,234,158,0.10)`, border `1px solid #998C5F`, border-radius 4px, padding 16px, text Montserrat 16px/700 white, chevron 24x24 (rotate 180° when expanded). Hover: bg `rgba(255,234,158,0.40)`. Fetch options from `/api/hashtags` and `/api/departments`. Dropdown panel: absolute positioned, close on outside click + Escape. `aria-expanded`, `aria-label`.
- [x] T030 [US2] Create `src/components/kudos/highlight-section.tsx` — Client Component. Compose: SectionHeader (title "HIGHLIGHT KUDOS", filterSlot = HashtagFilter + DepartmentFilter with gap 8px) → HighlightCarousel (gap 40px below header) → CarouselPagination. Fetch `/api/kudos/highlights` with filter params. Loading state: skeleton cards. Error state: retry button. Assemble in `page.tsx`.

**Checkpoint:** Carousel slides 5 cards with arrows. Pagination shows 2/5. Filters fetch from API and update carousel. Prev disabled at 1, next disabled at 5.

---

## Phase 6: US4 + US5 + US6 — All Kudos Feed & Sidebar [P1]

> **Goal:** Feed với infinite scroll, sidebar thống kê cá nhân, top Sunner list.
> **Independent test:** Feed loads cards, scroll triggers load more, heart toggles, stats display, sidebar scrollable.

- [x] T031 [P] [US4] Create `src/components/kudos/kudo-post-card.tsx` — Client Component. Width 680px (xl), 100% (mobile). Background `#FFF8E1`, border-radius 24px, padding `40px 40px 16px 40px`, gap 16px. Compose: KudoUserInfo (sender) → send arrow → KudoUserInfo (receiver) | timestamp + hashtag category (clickable → filter by category) | KudoContentBox (maxLines 5) | ImageGallery (if images exist) | divider (1px `#FFEA9E`) | hashtags (red, max 1 line "...") | KudoActionFooter (heart + Copy Link, no "Xem chi tiết")
- [x] T032 [P] [US4] Create `src/components/kudos/image-gallery.tsx` — Client Component, props: `images: string[]`. Thumbnail row: max 5 images, each 88x88px, border-radius 4px, border `1px solid #FFEA9E`, object-fit cover, row gap 16px. Click: open fullscreen modal with image viewer. Container: border-radius 18px, border `1px solid #998C5F`. Hide entirely if no images.
- [x] T033 [P] [US5] Create `src/components/kudos/kudos-stats.tsx` — Client Component. Fetch `/api/kudos/stats`. Container: bg `#00070C`, border `1px solid #998C5F`, border-radius 17px, padding 24px, gap 16px. 5 stat rows: label (Montserrat 22px/700 white) + number (Montserrat 32px/700 gold `#FFEA9E`, format with `formatNumber`). Row 3 ("Số tim"): append 🔥x2 decorative (Montserrat 17.54px/700 white, stroke `1.04px #000`). Divider (1px `#2E3940`) between row 3 and 4. "Mở Secret Box 🎁" button: bg `#FFEA9E`, border-radius 8px, height 60px, text Montserrat 22px/700 `#00101A`, hover `#FFE078` + translateY(-2px), click → placeholder (Secret Box dialog). Loading: skeleton stats.
- [x] T034 [P] [US6] Create `src/components/kudos/top-sunner-list.tsx` — Server Component, props: `sunners: TopSunner[]`. Container: bg `#00070C`, border `1px solid #998C5F`, border-radius 17px, padding `24px 16px 24px 24px`. Title: Montserrat 22px/700 gold, centered, "10 SUNNER NHẬN QUÀ MỚI NHẤT". List: gap 8px, each item: avatar 64x64 circle (border `1.869px solid #FFF`) + name (Montserrat 22px/700 gold) + description (Montserrat 16px/700 white). Scrollbar: 2px `#999` border-radius 8px. Click name/avatar → `/profile/:id`.
- [x] T035 [US5+US6] Create `src/components/kudos/kudos-sidebar.tsx` — Server Component. Wrapper: width 422px (xl), 100% (mobile). Flex column gap 24px. Render KudosStats + TopSunnerList. Fetch top-receivers data server-side and pass to TopSunnerList.
- [x] T036 [US4] Create `src/components/kudos/all-kudos-section.tsx` — Client Component. 2-column layout: left 680px (feed) + right 422px (sidebar), gap 80px. Uses `use-kudos-feed` hook for infinite scroll. Map kudos to KudoPostCard. Show skeleton cards while loading. "Xem thêm" or IntersectionObserver at bottom. Responsive: single column on mobile (sidebar below feed), sidebar below on md.
- [x] T037 [US4] Assemble All Kudos in `src/app/(main)/kudos/page.tsx` — Import SectionHeader ("ALL KUDOS") + AllKudosSection. Render below Spotlight section with 120px gap.

**Checkpoint:** Feed loads with infinite scroll. Heart toggle works with optimistic UI. Stats show personal numbers. Sidebar scrolls. Copy link triggers toast. Responsive: single column on mobile.

---

## Phase 7: US3 — Spotlight Board [P2]

> **Goal:** Word cloud tương tác hiển thị, pan/zoom, tìm kiếm.
> **Independent test:** Word cloud renders names proportional to count. Search highlights. Pan/zoom toggles.

- [x] T038 [P] [US3] Create `src/components/kudos/spotlight-board.tsx` — Client Component, loaded via `next/dynamic` with `ssr: false`. Props: `data: SpotlightEntry[]`, `totalKudos: number`. Canvas-based rendering: calculate font sizes (6.66px-11.34px) proportional to kudo count per name, scatter names on canvas. Container: 1157x548px (xl), border `1px solid #998C5F`, border-radius 47px. Title overlay: "388 KUDOS" (Montserrat 36px/700 white). Background layers with blend-mode screen. Responsive: simplified/smaller on mobile.
- [x] T039 [P] [US3] Add Spotlight interactivity to `src/components/kudos/spotlight-board.tsx` — Pan/zoom toggle button (icon from assets). Mini search input (border-radius 46.4px, border `0.682px solid #998C5F`, bg `rgba(255,234,158,0.10)`, text Montserrat ~10.92px/500 white). Search: highlight matching name on canvas (coral `rgba(241,118,118,1)`). Pan: mouse drag. Zoom: scroll wheel.
- [x] T040 [US3] Create `src/components/kudos/spotlight-section.tsx` — Server Component. Compose: SectionHeader (title "SPOTLIGHT BOARD") → SpotlightBoard (dynamic import). Fetch `/api/kudos/spotlight` server-side, pass data. Assemble in `page.tsx` between Highlight and All Kudos sections with 120px gap.
- [x] T041 [US3] Spotlight accessibility — Add `aria-label` on canvas describing content ("Spotlight board hiển thị {totalKudos} kudos"), `role="img"`. Keyboard navigation for search input. Focus ring on search.

**Checkpoint:** Word cloud renders with scattered names. "388 KUDOS" title shows. Search finds and highlights names. Pan/zoom works. Screen reader can describe content.

---

## Phase 8: Cross-Cutting — Modal, Footer, Toast

> **Goal:** Kudo detail modal, footer font update, toast notification.

- [x] T042 Create `src/components/kudos/kudo-detail-modal.tsx` — Client Component, props: `kudo: Kudo | null`, `onClose: () => void`. Full kudo display: KudoUserInfo (sender + receiver), full content (no truncation), all images, hashtags, heart + copy link. Overlay: bg `rgba(0,0,0,0.5)`, centered card. Close: outside click + Escape. `aria-modal="true"`, `role="dialog"`, focus trap. Wire to "Xem chi tiết" button in HighlightKudoCard.
- [x] T043 Update `src/components/footer/main-footer.tsx` — Change footer links + copyright font from `font-montserrat-alt text-sm font-normal` (14px/400) to `font-montserrat-alt text-base font-bold` (16px/700). ⚠️ Shared component — ảnh hưởng tất cả pages (Homepage, Awards, Kudos).
- [x] T044 Create toast notification for Copy Link — When "Copy Link" clicked in KudoActionFooter, show toast "Link copied — ready to share!" at bottom of screen, auto-dismiss after 3s, animate slide-up/fade-out. Can be inline state in KudoActionFooter or a shared toast context.

**Checkpoint:** Modal opens from "Xem chi tiết", closes on Escape/click-outside. Footer font is 16px/700 on all pages. Toast shows on copy link.

---

## Phase 9: Polish & Cross-Cutting Concerns

> **Goal:** Responsive, accessibility, loading states, edge cases, performance.

- [x] T045 Responsive verification — Test at 375px, 768px, 1024px, 1440px: hero text smaller on mobile, action buttons stack vertical, carousel single card on mobile, spotlight simplified, feed single column, sidebar below feed, footer stacks vertical. No horizontal scroll at any breakpoint.
- [x] T046 Accessibility audit — Keyboard tab through all interactive elements, `aria-live="polite"` on carousel + feed, `role="feed"` on All Kudos list, `aria-expanded` on filter dropdowns, `aria-label` on icon buttons (heart, copy, arrows), focus rings visible, color contrast WCAG AA, image alt texts on avatars.
- [x] T047 Loading states — Skeleton cards for feed (3 placeholder cards), skeleton stats for sidebar (5 placeholder rows), spinner/skeleton for carousel (3 placeholder cards), spotlight loading placeholder ("Đang tải...").
- [x] T048 Edge cases — Empty state: no kudos → "Chưa có kudos nào" placeholder. Carousel < 5 items → show available, disable unused arrows. API error → inline error message + "Thử lại" retry button. Number formatting → `formatNumber()` everywhere. Hashtag overflow → 1 line max with "...". Long names → truncate with ellipsis. No images → hide gallery row. No Secret Box → disable button, show 0.
- [x] T049 Performance — Lazy load SpotlightBoard + AllKudosSection with `next/dynamic`. Verify First Load JS < 100KB per route. All images use `next/image` with `sizes` prop. Files under 200 lines (split if needed). Cloudflare-compatible (no Node.js-only APIs).

**Checkpoint:** All breakpoints tested. Keyboard navigation works. Loading skeletons show. Edge cases handled. First Load JS < 100KB.

---

## Dependencies & Execution Order

```
Phase 1 (Setup)
  └──▶ Phase 2 (API Routes) ──────────────────────────┐
  └──▶ Phase 3 (Shared Components & Hooks) ────────────┤
         ├──▶ Phase 4 (US1 — Hero)                     │
         ├──▶ Phase 5 (US2 — Highlight) ◀──────────────┘
         ├──▶ Phase 6 (US4+5+6 — Feed+Sidebar) ◀──────┘
         └──▶ Phase 7 (US3 — Spotlight)
                └──▶ Phase 8 (Modal, Footer, Toast)
                       └──▶ Phase 9 (Polish)
```

### Parallel Execution Opportunities

**After Phase 1 completes, 2 parallel tracks:**

| Track A (API) | Track B (UI Foundation) |
|---|---|
| T007-T016 (Phase 2) | T017-T022 (Phase 3) |
| All [P] — independent endpoints | All [P] — independent components |

**After Phase 2+3 complete, 4 parallel tracks:**

| Track C (Hero) | Track D (Highlight) | Track E (Feed+Sidebar) | Track F (Spotlight) |
|---|---|---|---|
| T023-T025 | T026-T030 | T031-T037 | T038-T041 |

**Within phases, [P] tasks can run in parallel:**
- Phase 2: T007-T016 all [P] (different API files)
- Phase 3: T017-T022 all [P] (different component files)
- Phase 5: T026-T029 [P] → T030 (assembles them)
- Phase 6: T031-T034 [P] → T035 → T036 → T037
- Phase 7: T038, T039 [P] → T040 → T041

---

## Implementation Strategy

### MVP Scope (Recommended First Delivery)
- **Phase 1** + **Phase 2** + **Phase 3** + **Phase 4** + **Phase 6** = Functional /kudos page with hero, feed, sidebar
- Covers US1 (hero), US4 (feed), US5 (stats), US6 (top sunner) — all P1 priority
- Estimated: 32 tasks (T001-T037, skipping Phase 5 carousel for later)

### Incremental Delivery
1. **MVP:** Phases 1-4 + 6 → Hero + Feed + Sidebar working
2. **Highlight:** Phase 5 → Carousel + filters
3. **Spotlight:** Phase 7 → Word cloud interactive board
4. **Polish:** Phases 8-9 → Modal, footer, responsive, a11y, performance

### Key Constraints
- No new npm dependencies required
- 9 Client Components (carousel, cards, stats, filters, spotlight, action bar, gallery, modal, action footer)
- 7 Server Components (hero, section header, user info, content box, sidebar, top sunner list, spotlight section, page)
- Cookie-based i18n (no global state library)
- All API routes use Supabase server client with auth validation
- Infinite scroll via IntersectionObserver (no library needed)
- Spotlight via Canvas API (no external word cloud library)
