# Implementation Plan: Hệ thống giải thưởng SAA 2025

**Frame:** `313:8436` — Hệ thống giải
**Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-10

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|---|---|---|
| TypeScript strict | P2: No `any`, explicit types | ✅ Compliant — new `AwardDetailItem` interface |
| Server Components default | P3: Only `"use client"` when needed | ✅ Compliant — only `AwardsSidebar` is Client |
| App Router conventions | P3: `(main)/awards/page.tsx` | ✅ Compliant |
| Responsive mobile-first | P4: Tailwind breakpoints, 44px touch | ✅ Compliant |
| Auth protection | P5: Middleware session check | ✅ Already handled — middleware protects all `(main)` routes |
| Performance | P6: Server Components, `next/image` | ✅ Compliant — static content, no client JS for cards |
| Accessibility | P7: WCAG AA, keyboard, ARIA | 📋 Planned — sidebar nav, aria-labelledby, focus rings |
| No new dependencies | Constitution tech stack | ✅ No npm additions needed |

---

## Architecture Decisions

### Frontend

**Component pattern:** Server Components by default. Only `AwardsSidebar` needs `"use client"` for IntersectionObserver scroll tracking. All award card content is static server-rendered HTML.

**State management:**
- **Server state:** Award data fetched via `getAwardDetailItems(locale)` in page server component
- **Client state:** Only `activeSlug: string` in `AwardsSidebar` (tracked via IntersectionObserver)
- **No global state additions** — locale and session already handled by layout/middleware

**Data fetching:** Direct function call in server component (static data, no API needed for v1). The existing pattern from Homepage: `getLocaleFromCookie()` → `getAwardDetailItems(locale)`.

**Layout inheritance:** The `(main)/layout.tsx` already renders `<MainHeader>` + `<MainFooter>` + `<WidgetButton>`. The Awards page only needs to render page-specific content — header/footer/widget are automatic.

**Active nav state:** Layout passes `pathname` (from `headers()`) to `MainHeader`. When pathname is `/awards`, the "Award Information" nav link is already active via `pathname === link.href` comparison. No changes needed.

**Deep linking:** Hash fragments (`#top-talent`, `#mvp`, etc.) handled client-side by `AwardsSidebar` — on mount, read `window.location.hash`, scroll to target section, set initial `activeSlug`.

### Shared Component Reuse

| Component | Location | Reuse Strategy |
|---|---|---|
| `MainHeader` | `src/components/header/main-header.tsx` | As-is — active state via `pathname === "/awards"` |
| `MainFooter` | `src/components/footer/main-footer.tsx` | **Modify** — add optional `pathname` prop for active link highlighting |
| `WidgetButton` | `src/components/widget-button.tsx` | As-is — no props needed |
| `SunKudosSection` | `src/components/homepage/sun-kudos-section.tsx` | **Cannot reuse as-is** — see below |

### SunKudosSection Reuse Analysis

The existing `SunKudosSection` was built for the Homepage with a significantly different visual treatment:

| Property | Homepage (current) | Awards Page (required) |
|---|---|---|
| Background | `rgba(0,12,20,0.8)` with border | `#0F0F0F` with background image overlay |
| Title size | 40px (`text-[40px]`) | 57px (`text-[57px]`) |
| Button style | Outlined: `border-[#998C5F] bg-[#FFEA9E]/10 text-white` | Solid: `bg-[#FFEA9E] text-[#00101A]` |
| Decorative text | None | "KUDOS" (SVN-Gotham 96px, `#DBD1C1`) |
| Border | `border border-[#2E3940] rounded-lg` | No visible border |
| Dimensions | Flexible | 1152x500px |

**Decision:** Create a new `src/components/awards/kudos-section.tsx` for the Awards page. The content (translations) is shared, but the visual treatment is too different for a simple variant prop. Future refactoring could extract a shared base if more pages need Kudos sections.

### Key Technical Decisions

1. **Extend `AwardItem` → `AwardDetailItem`**: Add quantity, prize, and unit fields. Keep `AwardItem` for Homepage cards, new `AwardDetailItem` extends it for the detail page.

2. **IntersectionObserver for scroll-spy**: Each award section has `id={slug}`. Sidebar observes all 6 sections, updates `activeSlug` when a section crosses threshold. `rootMargin: "-80px 0px -60% 0px"` accounts for sticky header (80px) and triggers when section enters top 40% of viewport.

3. **Alternating card layout**: Use array index — `index % 2 === 0` renders image-left, odd renders image-right. Achieved with `flex-row` vs `flex-row-reverse`.

4. **Sidebar sticky positioning**: `sticky top-[96px]` — header is 80px + 16px breathing room. Sidebar sticks within the Award System container height.

5. **Award images reuse**: Same 336x336 award images from Homepage (`/images/homepage/awards/{slug}.png`). No new image downloads needed for award circles. Images use `mix-blend-mode: screen`, `border: 0.955px solid #FFEA9E`, `border-radius: 24px`. Use `next/image` with `onError` fallback (gray placeholder div with award title text).

6. **Responsive sidebar**: Single `awards-sidebar.tsx` Client Component handles both layouts:
   - **Desktop (lg+)**: Sticky vertical sidebar `w-[178px]`, scroll-spy with IntersectionObserver
   - **Mobile/Tablet (< lg)**: Horizontal scrollable tabs at top of award system area, same scroll-spy logic, overflow-x-auto with snap scrolling, touch targets >= 44px

7. **Z-index layering** (from design-style Section 3):
   - `z-0`: Keyvisual image (absolute, behind content)
   - `z-[1]`: Cover gradient (absolute, overlaps keyvisual bottom)
   - `z-10`: "Bìa" main content container (relative)
   - `z-50`: Header (sticky) + Footer
   - `z-[60]`: WidgetButton (fixed)

8. **Card inner frame alignment**: `align-items: flex-start` — image (336px tall) aligns to top while content area (variable height) can extend below image. Card uses `flex-row` or `flex-row-reverse` based on index.

---

## Project Structure

### New Files

| File | Purpose | Type |
|---|---|---|
| `src/app/(main)/awards/page.tsx` | Awards page route — fetches data, assembles sections | Server Component |
| `src/components/awards/section-title.tsx` | "Sun* Annual Awards 2025" + divider + "Hệ thống giải thưởng SAA 2025" | Server Component |
| `src/components/awards/awards-sidebar.tsx` | Sticky sidebar nav (desktop) + horizontal scroll tabs (mobile) with scroll-spy via IntersectionObserver | Client Component |
| `src/components/awards/award-cards-list.tsx` | Container rendering 6 AwardCard instances with dividers | Server Component |
| `src/components/awards/award-card.tsx` | Single award card — alternating image/content layout, `align-items: flex-start`, `mix-blend-mode: screen` on image | Server Component |
| `src/components/awards/award-card-content.tsx` | Card content area — title, description, quantity, prize. Handles Signature "Hoặc" special case | Server Component |
| `src/components/awards/kudos-section.tsx` | Awards-page-specific Sun* Kudos section — solid yellow button, `#0F0F0F` bg with image overlay, "KUDOS" decorative text, 57px title | Server Component |

### Modified Files

| File | Changes |
|---|---|
| `src/types/homepage.ts` | Add `AwardDetailItem` interface extending `AwardItem` with quantity/prize fields. Add `AwardsPageTranslations` interface. |
| `src/utils/i18n.ts` | Add `getAwardDetailItems(locale)` function with full award data (quantity, prize, unit, notes) and `getAwardsPageTranslations(locale)` for page-specific text labels |
| `src/components/footer/main-footer.tsx` | Add optional `pathname` prop for active link highlighting (`bg-[rgba(255,234,158,0.1)]`). Currently footer has no active state — design shows active link for "Award Information" on this page. |
| `src/app/(main)/layout.tsx` | Pass `pathname` to `MainFooter` (currently only passed to `MainHeader`) |

### No Changes Needed

| File | Reason |
|---|---|
| `src/middleware.ts` | Already protects all `(main)` routes |
| `src/components/header/main-header.tsx` | Active state works via `pathname === "/awards"` |
| `src/components/widget-button.tsx` | No props, self-contained |
| `src/components/homepage/sun-kudos-section.tsx` | NOT reused — new Awards-specific `kudos-section.tsx` created instead (see Reuse Analysis) |

### Assets to Download

| Asset | Target Path | Source |
|---|---|---|
| Keyvisual banner (if different from Homepage) | `public/images/awards/banner.webp` | Figma `2167:5138` |
| ROOT FURTHER logo (banner) | Reuse `public/images/homepage/root-further-hero.png` | Already exists |
| Icon: Target (sidebar/title) | `public/images/icons/target.svg` | Figma MCP `get_media_files` |
| Icon: Diamond (quantity) | `public/images/icons/diamond.svg` | Figma MCP `get_media_files` |
| Icon: License (prize) | `public/images/icons/license.svg` | Figma MCP `get_media_files` |
| Award images (x6) | Reuse from `public/images/homepage/awards/` | Already exist ✓ (top-talent.png, top-project.png, top-project-leader.png, best-manager.png, signature-creator.png, mvp.png) |
| Sun* Kudos illustration | Reuse `public/images/homepage/kudos-illustration.png` | Already exists ✓ |
| Sun* Kudos background image | `public/images/homepage/kudos-bg.webp` | **Needs download** — Figma `I335:12023;313:8416`, 1152x500px. Not currently in repo. |
| Sun* Kudos label icon | Reuse `public/images/homepage/kudos-label.svg` | Already exists ✓ |

### Dependencies

No new npm packages required.

---

## Implementation Approach

### Phase 0: Asset Preparation

**Goal:** Download new icons and verify existing assets.

- Download 3 new SVG icons (Target, Diamond, License) from Figma using MCP `get_media_files`
- Download Sun* Kudos background image (`I335:12023;313:8416`) → `public/images/homepage/kudos-bg.webp` (not in repo)
- Verify keyvisual banner — check if same as Homepage (`bg-artwork.png`) or needs separate download
- Verify all 6 award images exist in `public/images/homepage/awards/` ✓ (confirmed: all present)

### Phase 1: Foundation — Types & Data

**Goal:** Extend type system and i18n to support award detail fields.

- Add `AwardDetailItem` interface in `src/types/homepage.ts`:
  ```typescript
  export interface AwardDetailItem extends AwardItem {
    quantityDisplay: string;  // "10", "02", "03", "01" (zero-padded display string)
    quantityUnit?: string;    // "Cá nhân", "Tập thể", null for MVP
    prizeValue: string;       // "7.000.000 VNĐ"
    prizeNote?: string;       // "cho mỗi giải thưởng", null for MVP/Best Manager
    secondPrizeValue?: string; // "8.000.000 VNĐ" (Signature only)
    secondPrizeNote?: string;  // "cho giải tập thể" (Signature only)
  }
  ```
- Add `AwardsPageTranslations` interface for page-specific text labels
- Add `getAwardDetailItems(locale)` in `src/utils/i18n.ts` with full data for all 6 awards
- Add `getAwardsPageTranslations(locale)` for labels like "Số lượng giải thưởng:", "Giá trị giải thưởng:", section titles, etc.

### Phase 2: Core UI — US1 (Award Cards) [P1]

**Goal:** Build the award card components that display all 6 award categories.

- **`section-title.tsx`**: Section title with subtitle/divider/title pattern (replicates Homepage pattern)
- **`award-card-content.tsx`**: Renders title (icon + name), description, quantity block (icon + label + number + unit), prize block (icon + label + value + note). Handles Signature card's "Hoặc" divider special case.
- **`award-card.tsx`**: Wrapper that accepts `AwardDetailItem` + `index`. Uses `index % 2` for image-left vs image-right layout. Includes `id={slug}` for hash linking. Renders award image + `AwardCardContent`.
- **`award-cards-list.tsx`**: Maps over 6 awards, renders `AwardCard` for each with 853px dividers between cards (except after last card).

### Phase 3: Core UI — US2 (Sidebar Navigation) [P1]

**Goal:** Build sticky sidebar with scroll-spy behavior.

- **`awards-sidebar.tsx`** (`"use client"`):
  - Props: `awards: { slug: string; title: string }[]`
  - State: `activeSlug: string` (default: first award or hash fragment)
  - IntersectionObserver: observes all `[id]` sections, updates `activeSlug`
  - Click handler: `scrollIntoView({ behavior: 'smooth' })` + update URL hash
  - Render: `<nav aria-label="Danh mục giải thưởng">` with 6 sidebar items
  - Each item: target icon + title text, active state = gold text (#FFEA9E)
  - Hover state: `bg-white/10` + `cursor-pointer` (design-style sidebar states)
  - Focus state: `outline: 2px solid rgba(255,255,255,0.5)`
  - Sticky: `sticky top-[96px]` within award system container

### Phase 4: Page Assembly — US1 + US2 + US3 [P1]

**Goal:** Assemble the Awards page route.

- **`src/app/(main)/awards/page.tsx`**:
  1. Fetch `locale` from `getLocaleFromCookie()`
  2. Fetch `awards` from `getAwardDetailItems(locale)`
  3. Fetch `translations` from `getAwardsPageTranslations(locale)` + `getHomepageTranslations(locale)`
  4. Render page structure:
     - Keyvisual background (absolute positioned `next/image` with priority)
     - Cover gradient overlay
     - "Bìa" container (`px-36 py-24 gap-[120px]`)
       - ROOT FURTHER logo
       - `<AwardsSectionTitle>`
       - Award System (flex row, gap-20):
         - `<AwardsSidebar>` (sticky, 178px)
         - `<AwardCardsList>` (853px, 6 cards)
       - `<AwardsKudosSection>` (Awards-specific, see Phase 6)

### Phase 5: Deep Link & Hash Navigation — US3 [P1]

**Goal:** Handle `/awards#slug` navigation from Homepage.

- In `AwardsSidebar`, on mount: read `window.location.hash`, if valid slug → scroll to section + set active
- Handle edge case: invalid hash → ignore, stay at top, first item active
- URL hash updates on sidebar click (via `history.replaceState` to avoid page jump)

### Phase 6: Sun* Kudos Section — US4 [P2]

**Goal:** Build Awards-page-specific Kudos section (cannot reuse Homepage component — see Reuse Analysis above).

- **`src/components/awards/kudos-section.tsx`** (Server Component):
  - Background: `#0F0F0F` with background image overlay (`/images/homepage/kudos-bg.webp` or similar)
  - 2-column layout: text left (~60%), illustration + decorative "KUDOS" text right (~40%)
  - Label: "Phong trào ghi nhận" (24px/700 white)
  - Title: "Sun* Kudos" (57px/700 gold `#FFEA9E`)
  - Description: 16px/700 white, with "ĐIỂM MỚI CỦA SAA 2025" inline bold
  - Button: **Solid yellow** `bg-[#FFEA9E] text-[#00101A]` with arrow icon, `rounded-[4px]`, `Link` to `/kudos`
  - Button hover: `bg-[#FFE078]`, `translateY(-2px)`
  - Decorative: "KUDOS" text (SVN-Gotham 96px/400, `#DBD1C1`) — fallback to system sans-serif if font unavailable
  - Illustration: 272x219px image
  - Responsive: Stack vertical on mobile, text on top
- Translations: Pass same `Pick<HomepageTranslations, kudos keys>` as Homepage

### Phase 7: Responsive & Accessibility — Polish [P2]

**Goal:** Ensure mobile-first responsive behavior and WCAG AA compliance.

**Responsive (concrete breakpoint decisions):**
- **Mobile (< 768px)**: Sidebar renders as horizontal scroll tabs (overflow-x-auto, snap-x, scroll-snap-align-start). Award cards stack vertically (image on top full-width, content below). Section title: `text-[32px]`. Keyvisual height: `h-[300px]`. Kudos section: vertical stack. Page padding: `px-4`.
- **Tablet (md: 768px-1023px)**: Sidebar still horizontal tabs above content (single column). Award cards remain single column with larger padding. Section title: `text-[40px]`. Page padding: `px-8`.
- **Desktop (lg: 1024px+)**: Full 2-column layout — sticky sidebar left + scrollable content right. Award cards use alternating row layout. Section title: `text-[48px]`. Page padding: `px-16`.
- **XL (1440px+)**: Pixel-perfect Figma match. `px-36` (144px). Full sidebar 178px + gap 80px + content 853px.

**Accessibility:**
- Sidebar: `<nav aria-label="Danh mục giải thưởng">`, items as `<button>` or `<a>`, `aria-current="true"` on active
- Award sections: `<section id={slug} aria-labelledby={slug + "-title"}>`, heading with matching `id`
- Award images: Descriptive `alt` text (`"{title} award image"`)
- Keyboard: Tab through sidebar → award content → Kudos button
- Focus rings: `focus-visible:ring-2 ring-white/50`
- Smooth scroll: `scroll-behavior: smooth` on container or programmatic
- `aria-live="polite"` on sidebar nav container — announces active section changes during scroll to screen readers

---

## Component Hierarchy

```
(main)/layout.tsx
  ├─ MainHeader (shared, active nav = "/awards")
  ├─ AwardsPage (page.tsx)
  │  ├─ [Keyvisual Image] (absolute, priority)
  │  ├─ [Cover Gradient] (absolute)
  │  ├─ "Bìa" Container (relative, z-10)
  │  │  ├─ [ROOT FURTHER Logo]
  │  │  ├─ AwardsSectionTitle (Server)
  │  │  │  ├─ Subtitle: "Sun* Annual Awards 2025"
  │  │  │  ├─ Divider (1px #2E3940)
  │  │  │  └─ Title: "Hệ thống giải thưởng SAA 2025"
  │  │  ├─ Award System Container (flex row, gap: 80px)
  │  │  │  ├─ AwardsSidebar (Client, sticky)
  │  │  │  │  ├─ SidebarItem × 6 (target icon + title)
  │  │  │  │  └─ IntersectionObserver (tracks 6 sections)
  │  │  │  └─ AwardCardsList (Server)
  │  │  │     ├─ AwardCard #1 — Top Talent (img LEFT)
  │  │  │     │  ├─ Award Image (336x336, rounded, gold border)
  │  │  │     │  └─ AwardCardContent
  │  │  │     │     ├─ Title: target icon + "Top Talent"
  │  │  │     │     ├─ Description
  │  │  │     │     ├─ Divider
  │  │  │     │     ├─ Quantity: diamond icon + label + "10" + "Cá nhân"
  │  │  │     │     ├─ Divider
  │  │  │     │     └─ Prize: license icon + label + "7.000.000 VNĐ" + note
  │  │  │     ├─ [Divider 853px]
  │  │  │     ├─ AwardCard #2 — Top Project (img RIGHT)
  │  │  │     ├─ [Divider 853px]
  │  │  │     ├─ AwardCard #3 — Top Project Leader (img LEFT)
  │  │  │     ├─ [Divider 853px]
  │  │  │     ├─ AwardCard #4 — Best Manager (img RIGHT)
  │  │  │     ├─ [Divider 853px]
  │  │  │     ├─ AwardCard #5 — Signature (img LEFT, special "Hoặc" divider)
  │  │  │     ├─ [Divider 853px]
  │  │  │     └─ AwardCard #6 — MVP (img RIGHT, NO bottom divider)
  │  │  └─ AwardsKudosSection (Awards-specific, NOT shared)
  │  │     ├─ Background image overlay (#0F0F0F)
  │  │     ├─ Text block (label 24px + title 57px + description)
  │  │     ├─ "Chi tiết" button (solid yellow #FFEA9E) → /kudos
  │  │     └─ Illustration (272x219) + "KUDOS" decorative (SVN-Gotham 96px)
  ├─ MainFooter (shared)
  └─ WidgetButton (shared)
```

---

## Testing Strategy

| Type | Focus | Coverage |
|---|---|---|
| Visual | Screenshot comparison vs Figma frame | All sections at 1440px |
| Functional | Sidebar scroll-spy, deep linking, hash navigation | US2 + US3 critical paths |
| Responsive | Layout at 375px, 768px, 1024px, 1440px | All breakpoints |
| Accessibility | Keyboard navigation, ARIA attributes, focus rings | WCAG AA |
| Edge cases | Invalid hash, last card divider, session expired | Spec edge cases |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| IntersectionObserver threshold tuning | Med | Test with different content heights; adjust `rootMargin` |
| Sidebar sticky conflicts with header | Med | Use `top-[96px]` (header 80px + 16px gap); test at all scroll positions |
| Award description text extraction | Med | Use MoMorph `list_design_items` during implementation to get full text |
| Award image load failure | Low | Use `next/image` placeholder + gray fallback div showing award title text on error |
| SVN-Gotham font availability | Low | Font is decorative ("KUDOS" text); fallback to system sans-serif acceptable |
| Keyvisual banner image overlap | Low | Same pattern as Homepage hero; z-index layering already proven |

---

## Open Questions

- [x] **Resolved:** Footer active link state → Add optional `pathname` prop to `MainFooter`, pass from layout. Cross-cutting improvement.
- [x] **Resolved:** Award descriptions → Extract from Figma during implementation task.
- [x] **Resolved:** Keyvisual banner → Verify during asset preparation; likely same ROOT FURTHER artwork.
- [x] **Resolved:** SunKudosSection reuse → **Cannot reuse as-is.** Existing component has different bg, title size, button style, and no decorative text. Create new `src/components/awards/kudos-section.tsx`. See Reuse Analysis section.
- [x] **Resolved:** Mobile sidebar → Single `awards-sidebar.tsx` renders both desktop sticky sidebar (lg+) and mobile horizontal tabs (< lg) using responsive Tailwind classes.
