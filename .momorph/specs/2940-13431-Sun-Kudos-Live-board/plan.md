# Implementation Plan: Sun* Kudos - Live Board

**Frame:** `2940:13431` — Sun* Kudos - Live board
**Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-16

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|---|---|---|
| Clean Code | P1: Files < 200 lines, single responsibility | ✅ Planned — extract sub-components when needed |
| TypeScript strict | P2: No `any`, explicit types | ✅ Planned |
| Server Components default | P3: `"use client"` only when needed | ✅ Planned — 7 Server, 9 Client |
| Mobile-first responsive | P4: Tailwind breakpoints md/lg/xl | ✅ Planned |
| Supabase Auth | P5: Google OAuth, session cookies | ✅ Reuse existing middleware |
| Edge-compatible | P6: No Node.js-only APIs | ✅ Planned |
| First Load JS < 100KB | P6: Bundle budget | ✅ Lazy load below-fold sections |
| WCAG AA | P7: Keyboard nav, ARIA, contrast | ✅ Planned |
| Conventional Commits | P7: `feat(kudos):` prefix | ✅ |

---

## Architecture Decisions

### Frontend

**Component Pattern:** Feature-based folder (`src/components/kudos/`) — follows existing `homepage/`, `awards/` pattern.

**Server vs Client split:**
- **Server Components** (initial render, SEO, no JS): KudosHero, SectionHeader, AllKudosHeader, SpotlightHeader, TopSunnerList, page.tsx
- **Client Components** (interactivity): KudosActionBar, HighlightCarousel, HighlightKudoCard, KudoPostCard, KudosStats, SpotlightBoard, HashtagFilter, DepartmentFilter

**Data Fetching:**
- Server Components fetch via Supabase server client (`createClient` from `src/libs/supabase/server.ts`)
- Client Components fetch via API routes (`/api/kudos/*`)
- Infinite scroll uses client-side fetch with cursor pagination

**State Management:**
- No global state library — component-local `useState` + API routes (follows existing pattern)
- Optimistic UI for heart toggle
- URL search params for filters (shareable links)

### Backend (API Routes)

**Pattern:** Follow existing `src/app/api/notifications/unread-count/route.ts` — return JSON, catch errors gracefully.

**Auth:** All API routes validate session via `createClient()` from `src/libs/supabase/server.ts` + `supabase.auth.getUser()`.

**Database:** Supabase PostgreSQL — queries use `@supabase/supabase-js` client.

---

## Database Schema (Supabase)

### New Tables

```sql
-- Kudos posts
CREATE TABLE kudos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  receiver_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  hashtag_category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Kudos hashtags (many-to-many)
CREATE TABLE kudos_hashtags (
  kudo_id UUID REFERENCES kudos(id) ON DELETE CASCADE,
  hashtag TEXT NOT NULL,
  PRIMARY KEY (kudo_id, hashtag)
);

-- Kudos images
CREATE TABLE kudos_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kudo_id UUID REFERENCES kudos(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Hearts (likes)
CREATE TABLE kudos_hearts (
  kudo_id UUID REFERENCES kudos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (kudo_id, user_id)
);

-- Secret boxes
CREATE TABLE secret_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  is_opened BOOLEAN DEFAULT false,
  gift_description TEXT,
  opened_at TIMESTAMPTZ
);

-- User profiles (extended)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  department_code TEXT,
  department_name TEXT,
  star_count INT DEFAULT 0,
  hero_badge TEXT, -- 'Legend Hero', 'Rising Hero', 'New Hero', null
  avatar_url TEXT
);

-- Hashtags reference
CREATE TABLE hashtags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL
);

-- Departments reference
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);
```

### Indexes
```sql
CREATE INDEX idx_kudos_created_at ON kudos(created_at DESC);
CREATE INDEX idx_kudos_sender ON kudos(sender_id);
CREATE INDEX idx_kudos_receiver ON kudos(receiver_id);
CREATE INDEX idx_kudos_hearts_kudo ON kudos_hearts(kudo_id);
CREATE INDEX idx_kudos_hearts_user ON kudos_hearts(user_id);
CREATE INDEX idx_secret_boxes_user ON secret_boxes(user_id);
CREATE INDEX idx_kudos_hashtags_hashtag ON kudos_hashtags(hashtag);
```

### RLS Policies
```sql
-- kudos: authenticated users can read all, insert own
ALTER TABLE kudos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "kudos_read" ON kudos FOR SELECT TO authenticated USING (true);
CREATE POLICY "kudos_insert" ON kudos FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);

-- kudos_hearts: authenticated users can read all, insert/delete own
ALTER TABLE kudos_hearts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hearts_read" ON kudos_hearts FOR SELECT TO authenticated USING (true);
CREATE POLICY "hearts_insert" ON kudos_hearts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "hearts_delete" ON kudos_hearts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- secret_boxes: users can only see own
ALTER TABLE secret_boxes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "boxes_own" ON secret_boxes FOR ALL TO authenticated USING (auth.uid() = user_id);

-- kudos_hashtags: read all (authenticated)
ALTER TABLE kudos_hashtags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hashtags_read" ON kudos_hashtags FOR SELECT TO authenticated USING (true);
CREATE POLICY "hashtags_insert" ON kudos_hashtags FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM kudos WHERE id = kudo_id AND sender_id = auth.uid()));

-- kudos_images: read all (authenticated)
ALTER TABLE kudos_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "images_read" ON kudos_images FOR SELECT TO authenticated USING (true);
CREATE POLICY "images_insert" ON kudos_images FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM kudos WHERE id = kudo_id AND sender_id = auth.uid()));

-- user_profiles: read all (authenticated), update own
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_read" ON user_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_update" ON user_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- hashtags: read all (authenticated)
ALTER TABLE hashtags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ref_hashtags_read" ON hashtags FOR SELECT TO authenticated USING (true);

-- departments: read all (authenticated)
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ref_departments_read" ON departments FOR SELECT TO authenticated USING (true);
```

---

## Project Structure

### New Files

| File | Purpose | Type |
|------|---------|------|
| **Route & Page** | | |
| `src/app/(main)/kudos/page.tsx` | Kudos page — Server Component, assembles all sections | Server |
| **Types** | | |
| `src/types/kudos.ts` | Kudo, KudoHighlight, KudosStats, UserProfile, SecretBox, TopSunner, KudosTranslations | — |
| **API Routes** | | |
| `src/app/api/kudos/route.ts` | GET paginated feed (filters: hashtag, department, category) | API |
| `src/app/api/kudos/highlights/route.ts` | GET top 5 highlighted kudos | API |
| `src/app/api/kudos/spotlight/route.ts` | GET spotlight word cloud data | API |
| `src/app/api/kudos/[id]/heart/route.ts` | POST toggle heart | API |
| `src/app/api/kudos/stats/route.ts` | GET personal stats | API |
| `src/app/api/kudos/top-receivers/route.ts` | GET top 10 gift receivers | API |
| `src/app/api/hashtags/route.ts` | GET hashtag list | API |
| `src/app/api/departments/route.ts` | GET department list | API |
| `src/app/api/secret-box/open/route.ts` | POST open secret box | API |
| `src/app/api/users/search/route.ts` | GET search Sunner profiles (min 2 chars) | API |
| **Components** | | |
| `src/components/kudos/kudos-hero.tsx` | Hero banner with KV image + tagline + logo | Server |
| `src/components/kudos/kudos-action-bar.tsx` | Pill buttons: ghi nhận + tìm kiếm | Client |
| `src/components/kudos/section-header.tsx` | Reusable section header (subtitle + divider + title) | Server |
| `src/components/kudos/highlight-section.tsx` | Highlight container: header + filters + carousel + pagination | Client |
| `src/components/kudos/hashtag-filter.tsx` | Dropdown filter cho hashtag | Client |
| `src/components/kudos/department-filter.tsx` | Dropdown filter cho phòng ban | Client |
| `src/components/kudos/highlight-carousel.tsx` | Carousel logic: slide, prev/next, gradient fades | Client |
| `src/components/kudos/highlight-kudo-card.tsx` | Card highlight (528px, border-4, 3 lines max) | Client |
| `src/components/kudos/carousel-pagination.tsx` | ◀ 2/5 ▶ pagination | Client |
| `src/components/kudos/spotlight-section.tsx` | Spotlight container: header + board | Server |
| `src/components/kudos/spotlight-board.tsx` | Word cloud tương tác, pan/zoom, search | Client |
| `src/components/kudos/all-kudos-section.tsx` | 2-column layout: feed + sidebar | Server |
| `src/components/kudos/kudo-post-card.tsx` | Card full (680px, images, 5 lines max) | Client |
| `src/components/kudos/kudo-user-info.tsx` | Avatar + name + dept + badge (shared between cards) | Server |
| `src/components/kudos/kudo-content-box.tsx` | Gold content box with text | Server |
| `src/components/kudos/kudo-action-footer.tsx` | Heart + Copy Link + optional Xem chi tiết | Client |
| `src/components/kudos/image-gallery.tsx` | Thumbnail row + fullscreen modal | Client |
| `src/components/kudos/kudos-sidebar.tsx` | Sidebar wrapper: stats + top sunner list | Server |
| `src/components/kudos/kudos-stats.tsx` | Stats container with 5 stats + Mở quà button | Client |
| `src/components/kudos/top-sunner-list.tsx` | 10 Sunner nhận quà mới nhất | Server |
| `src/components/kudos/kudo-detail-modal.tsx` | Modal hiển thị full kudo (from highlight "Xem chi tiết") | Client |
| **Hooks** | | |
| `src/hooks/use-kudos-feed.ts` | Infinite scroll hook: fetch, pagination, filter state | Client |
| `src/hooks/use-heart-toggle.ts` | Optimistic heart toggle with debounce | Client |
| **Utils** | | |
| `src/utils/format-number.ts` | Vietnamese locale number formatting (1.000) | — |
| **Database** | | |
| `supabase/migrations/YYYYMMDD_create_kudos_tables.sql` | DB schema + RLS + indexes | SQL |
| `supabase/seeds/kudos_seed.sql` | Sample data for development | SQL |

### Modified Files

| File | Changes |
|------|---------|
| `src/utils/i18n.ts` | Add `getKudosTranslations()` with vi/en strings |
| `src/components/footer/main-footer.tsx` | Update font from `text-sm font-normal` (14px/400) to `text-base font-bold` (16px/700). **⚠️ Ảnh hưởng tất cả pages (Homepage, Awards, Kudos) vì là shared component.** |
| `src/app/globals.css` | Add kudos-specific CSS variables if needed |

### Dependencies

Không cần thêm npm package mới — sử dụng hoàn toàn stack hiện có (Next.js, Supabase, Tailwind).

---

## Implementation Approach

### Phase 0: Setup & Assets (6 tasks)

> **Goal:** Tải assets, tạo route, types, i18n, DB migration.

1. **T001** Download Figma assets (KV background, KUDOS logo, icons) to `public/images/kudos/` via MCP `get_media_files`
2. **T002** Create DB migration `supabase/migrations/YYYYMMDD_create_kudos_tables.sql` + seed data + run `supabase db push`
3. **T003** Create `src/types/kudos.ts` — all interfaces (Kudo, KudoHighlight, KudosStats, UserProfile, etc.)
4. **T004** Add `getKudosTranslations()` to `src/utils/i18n.ts` — vi/en strings for section titles, stat labels, placeholders
5. **T005** Create route `src/app/(main)/kudos/page.tsx` — skeleton page with section placeholders
6. **T006** Create `src/utils/format-number.ts` — Vietnamese locale number formatter

**Checkpoint:** `/kudos` route renders skeleton page. DB tables created. Types available.

---

### Phase 1: API Routes (10 tasks)

> **Goal:** Tất cả API endpoints hoạt động với Supabase.

7. **T007** `src/app/api/kudos/route.ts` — GET paginated feed, query params: page, limit, hashtag, department, category
8. **T008** `src/app/api/kudos/highlights/route.ts` — GET top 5 by heart count (with filters)
9. **T009** `src/app/api/kudos/spotlight/route.ts` — GET aggregated receiver names + counts
10. **T010** `src/app/api/kudos/[id]/heart/route.ts` — POST toggle (insert/delete kudos_hearts)
11. **T011** `src/app/api/kudos/stats/route.ts` — GET personal stats for logged-in user
12. **T012** `src/app/api/kudos/top-receivers/route.ts` — GET 10 most recent gift receivers
13. **T013** `src/app/api/hashtags/route.ts` — GET distinct hashtags
14. **T014** `src/app/api/departments/route.ts` — GET departments list
15. **T015** `src/app/api/secret-box/open/route.ts` — POST mark box as opened
16. **T016** `src/app/api/users/search/route.ts` — GET search users by name (min 2 chars)

**Checkpoint:** Tất cả endpoints trả về data đúng. Auth validated. Error handling consistent.

---

### Phase 2: Shared Components & Hooks (6 tasks)

> **Goal:** Build reusable building blocks.

17. **T017** `src/components/kudos/section-header.tsx` — Reusable: subtitle + divider + title + optional filter slot
18. **T018** `src/components/kudos/kudo-user-info.tsx` — Avatar + name + dept code + hero badge pill + dot separator
19. **T019** `src/components/kudos/kudo-content-box.tsx` — Gold background box, configurable max lines (3 or 5)
20. **T020** `src/components/kudos/kudo-action-footer.tsx` — Heart toggle + Copy Link + optional "Xem chi tiết"
21. **T021** `src/hooks/use-heart-toggle.ts` — Optimistic toggle with debounce, API call, rollback on error
22. **T022** `src/hooks/use-kudos-feed.ts` — Infinite scroll: fetch pages, append, loading/error state

**Checkpoint:** Shared components render in isolation. Hooks work with mock data.

---

### Phase 3: Hero + Action Bar — US1 (3 tasks)

> **Goal:** Hero banner renders, action buttons navigate.

23. **T023** `src/components/kudos/kudos-hero.tsx` — KV background image + gradient overlay + tagline + logo
24. **T024** `src/components/kudos/kudos-action-bar.tsx` — Pill buttons: "ghi nhận" (opens placeholder dialog) + "tìm kiếm" (placeholder)
25. **T025** Assemble in `page.tsx` — Render KudosHero + KudosActionBar

**Checkpoint:** Hero renders with background, tagline, logo. Action buttons clickable.

---

### Phase 4: Highlight Kudos — US2 (5 tasks)

> **Goal:** Carousel hiển thị top 5, filters work, pagination.

26. **T026** `src/components/kudos/highlight-kudo-card.tsx` — Card 528px, uses KudoUserInfo + KudoContentBox + timestamp + hashtags + KudoActionFooter (with "Xem chi tiết")
27. **T027** `src/components/kudos/highlight-carousel.tsx` — Horizontal scroll, gradient fades, prev/next arrows
28. **T028** `src/components/kudos/carousel-pagination.tsx` — ◀ 2/5 ▶, disable at bounds
29. **T029** `src/components/kudos/hashtag-filter.tsx` + `department-filter.tsx` — Dropdown menus, fetch from API, close on outside click + Escape
30. **T030** `src/components/kudos/highlight-section.tsx` — Assemble: SectionHeader + filters + carousel + pagination, fetch highlights API

**Checkpoint:** Carousel slides, filters update cards, pagination syncs.

---

### Phase 5: All Kudos Feed + Sidebar — US4 + US5 + US6 (7 tasks)

> **Goal:** Feed với infinite scroll, sidebar thống kê.

31. **T031** `src/components/kudos/kudo-post-card.tsx` — Card 680px, uses shared components, 5-line content, image attachments, hashtag category click-to-filter
32. **T032** `src/components/kudos/image-gallery.tsx` — Thumbnail row (max 5, 88x88px) + fullscreen modal on click
33. **T033** `src/components/kudos/kudos-stats.tsx` — Stats container (5 stats + 🔥x2 decorative + divider + "Mở Secret Box" button)
34. **T034** `src/components/kudos/top-sunner-list.tsx` — 10 items, scrollable list, avatar + name + description
35. **T035** `src/components/kudos/kudos-sidebar.tsx` — Wrapper: KudosStats + TopSunnerList, 422px width
36. **T036** `src/components/kudos/all-kudos-section.tsx` — 2-column layout (680px feed + 422px sidebar, gap 80px), uses use-kudos-feed hook
37. **T037** Assemble in `page.tsx` — Render AllKudosSection below Spotlight

**Checkpoint:** Feed loads with infinite scroll. Stats display. Sidebar scrollable. Heart toggle works.

---

### Phase 6: Spotlight Board — US3 (4 tasks)

> **Goal:** Word cloud hiển thị, pan/zoom, search.

38. **T038** `src/components/kudos/spotlight-board.tsx` — Canvas-based word cloud rendering: receive data (name + count), calculate font sizes proportional to count, render names scattered on canvas, styled per design-style (border-radius 47px, border `#998C5F`). Use `next/dynamic` with `ssr: false`.
39. **T039** Spotlight interactivity — Add pan/zoom toggle button + mini search input (border-radius 46.4px). Search highlights matching name on canvas. Pan/zoom via mouse drag + scroll wheel.
40. **T040** `src/components/kudos/spotlight-section.tsx` — SectionHeader ("SPOTLIGHT BOARD") + SpotlightBoard, fetch `/api/kudos/spotlight` data
41. **T041** Spotlight accessibility — `aria-label` trên canvas mô tả nội dung, `role="img"`, keyboard navigation for search input

**Checkpoint:** Word cloud renders with names. Search highlights. Pan/zoom works. Screen reader friendly.

---

### Phase 7: Modal + Footer Update (3 tasks)

> **Goal:** Kudo detail modal, footer update.

42. **T042** `src/components/kudos/kudo-detail-modal.tsx` — Full kudo display in modal (from "Xem chi tiết" on highlight cards), close on outside click + Escape, `aria-modal="true"`
43. **T043** Update `src/components/footer/main-footer.tsx` — Font from `text-sm font-normal` (14px/400) to `text-base font-bold` (16px/700). **⚠️ Ảnh hưởng tất cả pages.**
44. **T044** Toast component — "Link copied — ready to share!" feedback on Copy Link click, auto-dismiss after 3s

**Checkpoint:** Modal opens/closes correctly. Footer font updated. Toast shows on copy.

---

### Phase 8: Polish & Responsive (5 tasks)

> **Goal:** Responsive, accessibility, loading states, edge cases.

45. **T045** Responsive verification — Test at 375px, 768px, 1024px, 1440px: carousel single card on mobile, sidebar below feed, hero text smaller, no horizontal scroll
46. **T046** Accessibility audit — Keyboard navigation through all elements, `aria-live` on feed/carousel, `role="feed"`, focus rings, WCAG AA contrast
47. **T047** Loading states — Skeleton cards for feed, skeleton stats for sidebar, spinner for carousel
48. **T048** Edge cases — Empty states, API errors with retry, number formatting (1.000), hashtag overflow ellipsis, debounce heart, long names truncation
49. **T049** Performance — Lazy load Spotlight + All Kudos sections (`dynamic()`), verify First Load JS < 100KB, image `sizes` props, files < 200 lines (P1)

**Checkpoint:** Tất cả breakpoints tested. Accessibility passes. Performance budget met.

---

## Dependencies & Execution Order

```
Phase 0 (Setup)
  └──▶ Phase 1 (API Routes)
  └──▶ Phase 2 (Shared Components)
         └──▶ Phase 3 (Hero — US1)
         ├──▶ Phase 4 (Highlight — US2)
         ├──▶ Phase 5 (Feed + Sidebar — US4+5+6)
         └──▶ Phase 6 (Spotlight — US3)
                └──▶ Phase 7 (Modal + Polish)
                       └──▶ Phase 8 (Final Polish)
```

### Parallel Opportunities

| Track A (API) | Track B (UI Foundation) |
|---|---|
| T007-T016 (Phase 1) | T017-T022 (Phase 2) |
| API routes | Shared components + hooks |

**After Phase 1+2, 3 parallel tracks:**

| Track C (Hero) | Track D (Highlight) | Track E (Feed+Sidebar) |
|---|---|---|
| T023-T025 | T026-T030 | T031-T037 |

Phase 6 (Spotlight) can start after Phase 2.

---

## Testing Strategy

| Type | Focus | Coverage |
|---|---|---|
| Unit | format-number, hooks (use-heart-toggle, use-kudos-feed) | Utility functions + hooks |
| Integration | API routes (auth validation, query params, pagination, RLS) | All 10 endpoints |
| E2E (Playwright) | Critical paths: view feed, toggle heart, filter, carousel nav, open secret box | Key user flows |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| Spotlight word cloud performance | High — large dataset | Limit to top 100 names, use canvas rendering, lazy load |
| Infinite scroll memory | Medium — many cards | Virtualize list (window only visible cards) or limit to 50 then paginate |
| Carousel touch on mobile | Medium — swipe gesture needed | Use CSS scroll-snap or lightweight touch handler |
| Supabase RLS complexity | Medium — multiple tables | Test RLS policies in isolation, seed test users |
| Bundle size (Spotlight) | Medium — canvas/SVG library | Dynamic import with `next/dynamic`, code-split from main bundle |

---

## Open Questions

- [ ] Spotlight Board: Sử dụng canvas rendering (performance) hay SVG (accessibility)? → Recommend canvas + `aria-label` cho accessibility
- [ ] Secret Box dialog: Có spec riêng cho frame `1466:7676` không? Nếu chưa có thì dùng placeholder
- [ ] Viết Kudo dialog: Frame `520:11602` đã có spec chưa? Nếu chưa thì action bar chỉ hiện placeholder
