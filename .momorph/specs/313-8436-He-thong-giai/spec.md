# Hệ thống giải - Feature Specification

**Frame ID:** `313:8436`
**Frame Name:** Hệ thống giải
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Hệ thống giải thưởng SAA 2025 — Awards Information Page

### Purpose
Trang chi tiết về hệ thống giải thưởng SAA 2025. Hiển thị đầy đủ thông tin 6 hạng mục giải: mô tả, tiêu chí, số lượng giải thưởng và giá trị giải thưởng. Trang có sidebar điều hướng nhanh giữa các hạng mục.

### Target Users
- Nhân viên Sun* đã đăng nhập (có session hợp lệ)

### Business Context
- Điểm đến khi click "ABOUT AWARDS" hoặc "Award Information" từ Homepage (`2167:9026`)
- Điểm đến khi click vào từng thẻ giải thưởng trên Homepage (deep link `#slug`)
- Cung cấp thông tin chi tiết giúp nhân viên hiểu rõ từng hạng mục giải thưởng
- Hỗ trợ đa ngôn ngữ (VN/EN)
- Chỉ truy cập được khi đã đăng nhập (Constitution P5: Security)

---

## 2. User Stories

### US1: Xem thông tin chi tiết giải thưởng [P1]

**As a** nhân viên Sun*
**I want to** xem thông tin chi tiết của từng hạng mục giải thưởng SAA 2025
**So that** tôi hiểu rõ tiêu chí, số lượng và giá trị giải thưởng

#### Acceptance Scenarios

**Scenario 1: Hiển thị danh sách giải thưởng chi tiết**
- Given: Người dùng đã đăng nhập và truy cập trang Hệ thống giải
- When: Trang tải xong
- Then: Hiển thị banner ROOT FURTHER ở đầu trang
- And: Tiêu đề section "Sun* Annual Awards 2025" và "Hệ thống giải thưởng SAA 2025"
- And: Hiển thị 6 thẻ giải thưởng theo thứ tự:
  1. Top Talent (10 giải cá nhân, 7.000.000 VNĐ/giải)
  2. Top Project (02 giải tập thể, 15.000.000 VNĐ/giải)
  3. Top Project Leader (03 giải cá nhân, 7.000.000 VNĐ/giải)
  4. Best Manager (01 giải cá nhân, 10.000.000 VNĐ)
  5. Signature 2025 - Creator (01 giải, 5.000.000 VNĐ cá nhân hoặc 8.000.000 VNĐ tập thể)
  6. MVP — Most Valuable Person (01 giải, 15.000.000 VNĐ)

**Scenario 2: Cấu trúc thẻ giải thưởng**
- Given: Đang xem một thẻ giải thưởng
- When: Thẻ hiển thị
- Then: Bên trái hoặc phải có hình ảnh giải (336x336px, khung tròn viền vàng)
- And: Bên còn lại có:
  - Icon target + Tên giải (vàng)
  - Mô tả chi tiết (trắng)
  - Đường kẻ phân cách (#2E3940)
  - Icon diamond + "Số lượng giải thưởng:" (vàng) + số lượng (trắng, lớn) + loại (Cá nhân/Tập thể/Đơn vị)
  - Đường kẻ phân cách
  - Icon license + "Giá trị giải thưởng:" (vàng) + giá trị VNĐ (trắng, lớn) + ghi chú

**Scenario 3: Layout xen kẽ ảnh trái/phải**
- Given: Danh sách giải thưởng đang hiển thị
- When: Xem chuỗi các thẻ
- Then: Thẻ lẻ (1, 3, 5): ảnh bên trái, nội dung bên phải
- And: Thẻ chẵn (2, 4, 6): nội dung bên trái, ảnh bên phải
- And: Phân cách giữa các thẻ bằng đường kẻ ngang (853px, #2E3940) — trừ thẻ cuối cùng (MVP) không có divider ở dưới

**Scenario 4: Giải Signature có 2 mức giá trị**
- Given: Xem thẻ "Signature 2025 - Creator"
- When: Thẻ hiển thị
- Then: Hiển thị 2 mức giá trị:
  - "5.000.000 VNĐ" cho giải cá nhân
  - "Hoặc" (text + divider)
  - "8.000.000 VNĐ" cho giải tập thể

### US2: Điều hướng nhanh giữa các giải thưởng [P1]

**As a** nhân viên Sun*
**I want to** click vào menu bên trái để nhảy đến giải thưởng cụ thể
**So that** tôi không cần cuộn qua toàn bộ trang

#### Acceptance Scenarios

**Scenario 1: Hiển thị menu điều hướng**
- Given: Người dùng đang ở trang Hệ thống giải
- When: Trang tải xong
- Then: Menu bên trái hiển thị 6 mục (mỗi mục đều có icon target 24x24 bên trái):
  - Top Talent (active by default)
  - Top Project
  - Top Project Leader
  - Best Manager
  - Signature 2025 - Creator
  - MVP

**Scenario 2: Click mục menu**
- Given: Menu điều hướng đang hiển thị
- When: Click vào một mục (ví dụ "Best Manager")
- Then: Trang cuộn mượt đến phần tương ứng
- And: Mục vừa click chuyển sang trạng thái active (text vàng #FFEA9E)
- And: Các mục khác về trạng thái normal (text trắng)

**Scenario 3: Active state theo scroll**
- Given: Người dùng đang cuộn trang
- When: Một phần giải thưởng vào viewport
- Then: Mục tương ứng trong menu chuyển sang active
- And: Menu sidebar sticky (theo dõi khi cuộn)

**Scenario 4: Hover trên mục menu**
- Given: Menu đang hiển thị
- When: Hover chuột lên mục "Top Project"
- Then: Mục highlight (bg nhạt, cursor pointer)

### US3: Deep link từ Homepage [P1]

**As a** nhân viên Sun*
**I want to** click vào thẻ giải thưởng trên Homepage và được dẫn đến đúng giải
**So that** tôi truy cập nhanh thông tin chi tiết giải cụ thể

#### Acceptance Scenarios

**Scenario 1: Deep link qua hash**
- Given: Người dùng ở Homepage click thẻ "Top Talent"
- When: Điều hướng đến `/awards#top-talent`
- Then: Trang Hệ thống giải tải
- And: Tự động cuộn đến phần "Top Talent"
- And: Menu sidebar highlight mục "Top Talent"

**Scenario 2: Truy cập trực tiếp URL**
- Given: Người dùng truy cập `/awards` (không hash)
- When: Trang tải xong
- Then: Hiển thị từ đầu trang, mục đầu tiên (Top Talent) active trong menu

### US4: Xem thông tin Sun* Kudos [P2]

**As a** nhân viên Sun*
**I want to** xem section giới thiệu Sun* Kudos ở cuối trang giải thưởng
**So that** tôi biết về phong trào ghi nhận mới

#### Acceptance Scenarios

**Scenario 1: Hiển thị section Sun* Kudos**
- Given: Người dùng cuộn đến cuối trang
- When: Section Sun* Kudos hiển thị
- Then: Hiển thị label "Phong trào ghi nhận", tiêu đề "Sun* Kudos"
- And: Mô tả ngắn về chương trình
- And: Hình minh họa KUDOS bên phải
- And: Nút "Chi tiết" màu vàng (#FFEA9E)

**Scenario 2: Click "Chi tiết"**
- Given: Section Sun* Kudos đang hiển thị
- When: Click nút "Chi tiết"
- Then: Điều hướng đến trang Sun* Kudos

### US5: Header navigation — Active state "Award Information" [P2]

**As a** nhân viên Sun*
**I want to** thấy rõ mình đang ở trang Award Information
**So that** tôi biết vị trí hiện tại trong ứng dụng

#### Acceptance Scenarios

**Scenario 1: Nav link active**
- Given: Đang ở trang /awards
- When: Header hiển thị
- Then: "Award Information" có text vàng (#FFEA9E) + underline + glow
- And: "About SAA 2025" và "Sun* Kudos" ở trạng thái normal (trắng)

---

## 3. UI/UX Requirements

### Component Structure

| # | Component | Node ID | Type | Description |
|---|-----------|---------|------|-------------|
| A | Header | `313:8440` | Navigation | Shared component — reuse `MainHeader` từ Homepage |
| B | Keyvisual | `313:8437` | Hero Banner | Background artwork ROOT FURTHER 1440x547px |
| C | Cover gradient | `313:8439` | Overlay | Gradient cover trên keyvisual |
| D | Section Title | `313:8453` | Label | "Sun* Annual Awards 2025" + divider + "Hệ thống giải thưởng SAA 2025" |
| E | Award System | `313:8458` | Content | Container 2 cột: sidebar + award cards |
| E.1 | Sidebar Menu | `313:8459` | Navigation | 6 mục điều hướng, sticky |
| E.1.1 | Top Talent (menu) | `313:8460` | Nav Item | Active default |
| E.1.2 | Top Project (menu) | `313:8461` | Nav Item | |
| E.1.3 | Top Project Leader (menu) | `313:8462` | Nav Item | |
| E.1.4 | Best Manager (menu) | `313:8463` | Nav Item | |
| E.1.5 | Signature 2025 (menu) | `313:8464` | Nav Item | |
| E.1.6 | MVP (menu) | `313:8465` | Nav Item | |
| E.2 | Award Cards List | `313:8466` | Content | 6 thẻ giải thưởng chi tiết |
| E.2.1 | Top Talent card | `313:8467` | Info Block | Image + Content + Metadata |
| E.2.2 | Top Project card | `313:8468` | Info Block | |
| E.2.3 | Top Project Leader card | `313:8469` | Info Block | |
| E.2.4 | Best Manager card | `313:8470` | Info Block | |
| E.2.5 | Signature 2025 card | `313:8471` | Info Block | Có 2 mức giá trị |
| E.2.6 | MVP card | `313:8510` | Info Block | |
| F | Sun* Kudos | `335:12023` | Section | Khối quảng bá Sun* Kudos + nút Chi tiết |
| F.1 | Chi tiết button | `I335:12023;313:8426` | Button | **Solid yellow** CTA (#FFEA9E bg, #00101A text) — differs from Homepage Kudos outlined button |
| G | Footer | `354:4323` | Navigation | Shared `MainFooter` — note: padding `40px 90px` differs from Homepage `40px 144px` |
| H | Widget Button | — | FAB | Shared `WidgetButton` — fixed bottom-right, same as Homepage |

### Visual Specs
Xem chi tiết trong [design-style.md](./design-style.md)

### Responsive Behavior (Constitution P4)

| Breakpoint | Behavior |
|------------|----------|
| < 768px (mobile) | Sidebar ẩn, hiển thị dạng dropdown hoặc horizontal scroll tabs. Award cards stack vertical (ảnh trên, content dưới). Touch target >= 44px |
| 768-1023px (md) | Sidebar có thể collapse. Award cards vẫn 2 cột nhưng nhỏ hơn |
| 1024-1439px (lg) | Layout gốc 2 cột: sidebar cố định + content cuộn |
| >= 1440px (xl) | Design gốc Figma — pixel perfect |

### Accessibility (Constitution P7: WCAG AA)
- Sidebar nav: `<nav aria-label="Danh mục giải thưởng">`, active item `aria-current="true"`
- Each award section: `id="slug"` for hash navigation, `<section aria-labelledby>`
- Award images: `alt` text mô tả tên giải thưởng
- Keyboard: `Tab` qua sidebar items → award sections → Kudos button → footer
- Focus visible trên tất cả interactive elements
- Scroll to section on sidebar click with `scroll-behavior: smooth`
- `aria-live="polite"` nếu sidebar active state thay đổi khi scroll

---

## 4. Data Requirements

### Input Fields
Không có input trực tiếp trên trang này.

### Display Fields — Award Data (x6)

| Field | Type | Example | i18n |
|-------|------|---------|------|
| `title` | string | "Top Talent" | Yes |
| `slug` | string | "top-talent" | No |
| `description` | string | (long text) | Yes |
| `image` | string (path) | "/images/awards/top-talent.png" | No |
| `quantity` | number | 10 | No |
| `quantityUnit` | string? | "Cá nhân" / "Tập thể" / null (MVP) | Yes |
| `prizeValue` | string | "7.000.000 VNĐ" | No |
| `prizeNote` | string? | "cho mỗi giải thưởng" / null (Best Manager, MVP) | Yes |
| `secondPrizeValue` | string? | "8.000.000 VNĐ" (only Signature) | No |
| `secondPrizeNote` | string? | "cho giải tập thể" | Yes |

### Award Data (Static v1)

| # | Title | Slug | Qty | Unit | Prize Value | Note |
|---|-------|------|-----|------|-------------|------|
| 1 | Top Talent | top-talent | 10 | Cá nhân | 7.000.000 VNĐ | cho mỗi giải thưởng |
| 2 | Top Project | top-project | 02 | Tập thể | 15.000.000 VNĐ | cho mỗi giải thưởng |
| 3 | Top Project Leader | top-project-leader | 03 | Cá nhân | 7.000.000 VNĐ | cho mỗi giải thưởng |
| 4 | Best Manager | best-manager | 01 | Cá nhân | 10.000.000 VNĐ | — |
| 5 | Signature 2025 - Creator | signature-creator | 01 | Cá nhân hoặc tập thể | 5.000.000 VNĐ / 8.000.000 VNĐ | cho giải cá nhân / cho giải tập thể |
| 6 | MVP (Most Valuable Person) | mvp | 01 | — | 15.000.000 VNĐ | — |

### Award Description Texts

> **NOTE:** The existing `getAwardItems()` in `src/utils/i18n.ts` already contains short descriptions (slug, title, description, image) for the 6 awards. For the detail page, this function must be extended (or a new `getAwardDetailItems()` created) to include the additional fields: `quantity`, `quantityUnit`, `prizeValue`, `prizeNote`, `secondPrizeValue`, `secondPrizeNote`.
>
> The detail page descriptions may be longer than the Homepage card descriptions. During implementation, use MoMorph `list_design_items` tool to extract the full text content from each award card's description node, or reference the frame screenshot (`assets/frame.png`).

### Data Source Note

> **IMPORTANT:** Figma component instances for several award cards retain template defaults (e.g. "10" and "7.000.000 VNĐ") in their raw text nodes. The correct values come from the **design item annotations** (verified against the frame screenshot). Implementations MUST use the data table above, NOT the raw Figma text.
>
> Affected cards: Top Project (raw: 10/7M, correct: 02/15M), Best Manager (raw: 10/7M, correct: 01/10M), MVP (raw: 10/7M, correct: 01/15M).

### Environment Variables
Không cần thêm biến môi trường mới.

---

## 5. API Requirements (Predicted)

> Nội dung trang là static/CMS-driven, tương tự Homepage.

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/notifications/unread-count` | GET | Notification badge (shared header) |
| `/api/awards` | GET | Lấy danh sách giải thưởng (nếu chuyển sang dynamic) |

### Middleware

| Path | Logic |
|------|-------|
| `/awards` | Nếu không có session → redirect Login |

---

## 6. State Management

### Local Component State (Client Components only)
- **AwardsSidebar** (`"use client"`):
  - `activeSlug: string` — Mục đang active trong sidebar
- **IntersectionObserver** (inside sidebar):
  - Track which award section is in viewport → update `activeSlug`

### Global State
- `locale: 'vi' | 'en'` — Cookie-based (shared)
- `user: User | null` — Supabase session (shared)

### Loading States
- **Page initial load:** Server-rendered HTML (no skeleton needed for static content)
- **Award images:** Use `next/image` with responsive `sizes` — placeholder blur while loading
- **Notification count:** Fetch client-side in header, badge hidden until data arrives

### Error States
- **Session expired:** Middleware auto-redirect to Login
- **Award images fail:** Display fallback placeholder
- **Notification API fail:** Badge hidden, icon displayed normally

### Edge Cases
- **Hash fragment for non-existent slug:** Ignore, show page from top, first item active in sidebar
- **Very long award descriptions:** Content wraps naturally, no truncation on detail page (unlike Homepage cards)
- **Sidebar scroll when at bottom of awards list:** Last visible award section stays active
- **Browser resize crossing breakpoints:** Sidebar collapses/expands, award card layout reflows
- **Keyboard-only navigation:** Tab through sidebar items → award sections in order → Kudos button

### Server State (Constitution P3)
- Page content (award data, text) render trên Server Component
- Sidebar + scroll tracking là Client Component
- Header, Footer là shared Server Components

---

## 7. Navigation

| From | Action | To |
|------|--------|----|
| Homepage | Click "ABOUT AWARDS" CTA | /awards |
| Homepage | Click "Award Information" header nav | /awards |
| Homepage | Click award card "Top Talent" | /awards#top-talent |
| Homepage | Click award card "MVP" | /awards#mvp |
| Awards page | Click sidebar "Best Manager" | Scroll to #best-manager |
| Awards page | Click "Chi tiết" (Kudos) | /kudos |
| Awards page | Click header "About SAA 2025" | / |
| Awards page | Click header "Sun* Kudos" | /kudos |
| Awards page | Click footer links | Same as header |

---

## 8. Dependencies

- **Shared Components:** MainHeader, MainFooter, WidgetButton (from Homepage)
- **Supabase Auth** — Session management
- **i18n** — Đa ngôn ngữ (VN/EN)
- **Middleware** — Session check, redirect logic
- **Static Assets** — Award images (x6), ROOT FURTHER banner, icons
- **Homepage award data** — Extend existing `getAwardItems()` (has slug, title, description, image) with detail fields: quantity, quantityUnit, prizeValue, prizeNote, secondPrizeValue?, secondPrizeNote?
- **SVN-Gotham font** — Used by `SunKudosSection` for "KUDOS" decorative text (96px). Must be registered if not already available from Homepage implementation

---

## 9. Constitution Compliance Checklist

- [x] P1: Clean Code — Server Component default; AwardsSidebar is Client Component
- [x] P2: TypeScript — Strict types for award data, sidebar state
- [x] P3: Component Architecture — App Router, `(main)/awards/page.tsx`
- [x] P4: Responsive — Mobile-first, sidebar collapses on mobile
- [x] P5: Security — Protected route (middleware), domain restriction
- [x] P6: Performance — Server Components for static content, `next/image` for award images
- [x] P7: Code Quality — Keyboard nav, WCAG AA, aria attributes, smooth scroll
