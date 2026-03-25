# Homepage SAA - Feature Specification

**Frame ID:** `2167:9026`
**Frame Name:** Homepage SAA
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Homepage SAA - Sun* Annual Awards 2025

### Purpose
Trang chủ chính của ứng dụng SAA 2025 với chủ đề "ROOT FURTHER". Hiển thị thông tin sự kiện, đồng hồ đếm ngược, hệ thống giải thưởng và phong trào Sun* Kudos. Là điểm truy cập trung tâm sau khi đăng nhập.

### Target Users
- Nhân viên Sun* đã đăng nhập (có session hợp lệ)

### Business Context
- Trang đích sau đăng nhập thành công từ Login (`662:14387`)
- Giới thiệu chủ đề "Root Further" và đếm ngược đến ngày sự kiện
- Điều hướng đến các trang chi tiết: Awards Information, Sun* Kudos
- Hỗ trợ đa ngôn ngữ (VN/EN) và thông báo
- Chỉ truy cập được khi đã đăng nhập (Constitution P5: Security)

---

## 2. User Stories

### US1: Xem thông tin sự kiện và đếm ngược [P1]

**As a** nhân viên Sun*
**I want to** xem thời gian còn lại đến sự kiện SAA 2025
**So that** tôi biết khi nào sự kiện diễn ra và chuẩn bị tham gia

#### Acceptance Scenarios

**Scenario 1: Hiển thị đồng hồ đếm ngược**
- Given: Người dùng đã đăng nhập và truy cập Homepage
- When: Trang tải xong
- Then: Hiển thị banner "ROOT FURTHER" với đồng hồ đếm ngược (Days, Hours, Minutes)
- And: Label "Comming soon" hiển thị phía trên countdown (⚠️ typo từ Figma — implement đúng chính tả "Coming soon")
- And: Thông tin sự kiện hiển thị: Thời gian (26/12/2025), Địa điểm (Âu Cơ Art Center)
- And: Ghi chú "Tường thuật trực tiếp qua sóng Livestream"

**Scenario 2: Đồng hồ đếm ngược cập nhật realtime**
- Given: Đồng hồ đang hiển thị
- When: Thời gian trôi qua
- Then: Số phút giảm dần theo thời gian thực (cập nhật mỗi phút)
- And: Luôn hiển thị 2 chữ số (zero-padding: "05", "00")

**Scenario 3: Sự kiện đã diễn ra (countdown = 0)**
- Given: Thời điểm hiện tại >= thời điểm sự kiện bắt đầu
- When: Trang tải
- Then: Ẩn dòng "Coming soon"
- And: Đồng hồ hiển thị 00 : 00 : 00

**Scenario 4: Cấu hình thời gian sự kiện**
- Given: Admin muốn thay đổi thời gian sự kiện
- When: Cập nhật biến môi trường (datetime ISO-8601)
- Then: Đồng hồ đếm ngược tự động tính toán lại

**Scenario 5: Biến môi trường chưa được cấu hình**
- Given: `NEXT_PUBLIC_EVENT_START_DATETIME` chưa được set
- When: Trang tải
- Then: Ẩn toàn bộ section countdown và "Coming soon"
- And: Các section khác hiển thị bình thường

### US2: Xem hệ thống giải thưởng [P1]

**As a** nhân viên Sun*
**I want to** xem danh sách các hạng mục giải thưởng
**So that** tôi biết được các giải thưởng và tìm hiểu chi tiết

#### Acceptance Scenarios

**Scenario 1: Hiển thị danh sách giải thưởng**
- Given: Người dùng đang ở Homepage
- When: Cuộn xuống section giải thưởng
- Then: Hiển thị tiêu đề "Sun* annual awards 2025" / "Hệ thống giải thưởng"
- And: Grid 3 cột (desktop) hiển thị 6 thẻ giải thưởng:
  - Top Talent
  - Top Project
  - Top Project Leader
  - Best Manager
  - Signature 2025 - Creator
  - MVP (Most Valuable Person)
- And: Mỗi thẻ có: hình thu nhỏ, tiêu đề, mô tả ngắn (tối đa 2 dòng, ellipsis), link "Chi tiết"

**Scenario 2: Click vào thẻ giải thưởng**
- Given: Danh sách giải thưởng đang hiển thị
- When: Click vào hình ảnh, tiêu đề hoặc "Chi tiết" của một thẻ
- Then: Điều hướng đến trang "Awards Information" kèm hashtag slug của hạng mục
- And: Trình duyệt tự động cuộn tới vị trí chứa thông tin chi tiết giải thưởng

**Scenario 3: Hover trên thẻ giải thưởng**
- Given: Danh sách giải thưởng đang hiển thị
- When: Hover chuột trên một thẻ
- Then: Thẻ nâng nhẹ và viền/ánh sáng nổi bật

### US3: Điều hướng trang [P1]

**As a** nhân viên Sun*
**I want to** điều hướng đến các trang khác từ Homepage
**So that** tôi có thể truy cập thông tin chi tiết về giải thưởng và Sun* Kudos

#### Acceptance Scenarios

**Scenario 1: Click nút CTA "ABOUT AWARDS"**
- Given: Người dùng đang ở Hero section
- When: Click nút "ABOUT AWARDS"
- Then: Điều hướng đến trang Awards Information

**Scenario 2: Click nút CTA "ABOUT KUDOS"**
- Given: Người dùng đang ở Hero section
- When: Click nút "ABOUT KUDOS"
- Then: Điều hướng đến trang Sun* Kudos

**Scenario 3: Header navigation**
- Given: Header hiển thị ở mọi vị trí cuộn
- When: Click "About SAA 2025" (đang selected)
- Then: Scroll lên đầu trang
- When: Click "Award Information"
- Then: Điều hướng đến trang Awards Information
- When: Click "Sun* Kudos"
- Then: Điều hướng đến trang Sun* Kudos

**Scenario 4: Footer navigation**
- Given: Người dùng cuộn đến cuối trang
- When: Click link trong footer
- Then: Điều hướng tương tự header (About SAA 2025, Awards Information, Sun* Kudos)

### US4: Xem thông tin Sun* Kudos [P2]

**As a** nhân viên Sun*
**I want to** xem tóm tắt về phong trào Sun* Kudos
**So that** tôi biết về phong trào ghi nhận và có thể tham gia

#### Acceptance Scenarios

**Scenario 1: Hiển thị section Sun* Kudos**
- Given: Người dùng cuộn xuống phần Sun* Kudos
- When: Section hiển thị
- Then: Hiển thị label "Phong trào ghi nhận", tiêu đề "Sun* Kudos"
- And: Subtitle "ĐIỂM MỚI CỦA SAA 2025" nổi bật
- And: Mô tả tóm tắt về chiến dịch Kudos
- And: Hình minh họa "KUDOS" bên phải
- And: Nút "Chi tiết" với icon (outline style)

**Scenario 2: Click "Chi tiết" Sun* Kudos**
- Given: Section Sun* Kudos đang hiển thị
- When: Click nút "Chi tiết"
- Then: Điều hướng đến trang Sun* Kudos

### US5: Chuyển đổi ngôn ngữ [P2]

**As a** nhân viên Sun*
**I want to** chuyển đổi ngôn ngữ hiển thị (VN/EN)
**So that** tôi có thể sử dụng ứng dụng bằng ngôn ngữ ưa thích

#### Acceptance Scenarios

**Scenario 1: Mở dropdown ngôn ngữ**
- Given: Người dùng ở Homepage
- When: Click vào nút chọn ngôn ngữ "VN" trên header
- Then: Hiển thị dropdown danh sách ngôn ngữ (VN/EN)
- And: Chevron icon xoay 180deg (trỏ lên)

**Scenario 2: Chọn ngôn ngữ khác**
- Given: Dropdown ngôn ngữ đang mở
- When: Chọn "EN"
- Then: Giao diện cập nhật sang tiếng Anh
- And: Dropdown đóng lại, nút hiển thị "EN" với cờ tương ứng
- And: Preference lưu vào cookie

**Scenario 3: Đóng dropdown không chọn**
- Given: Dropdown ngôn ngữ đang mở
- When: Click bên ngoài hoặc nhấn `Escape`
- Then: Dropdown đóng, ngôn ngữ giữ nguyên

### US6: Xem thông báo [P2]

**As a** nhân viên Sun*
**I want to** xem thông báo mới
**So that** tôi không bỏ lỡ thông tin quan trọng

#### Acceptance Scenarios

**Scenario 1: Có thông báo mới**
- Given: Có thông báo chưa đọc
- When: Trang tải
- Then: Icon chuông hiển thị badge đỏ (8x8px)

**Scenario 2: Không có thông báo mới**
- Given: Tất cả thông báo đã đọc hoặc không có thông báo
- When: Trang tải
- Then: Icon chuông hiển thị bình thường, không có badge đỏ

**Scenario 3: Click notification bell**
- Given: Người dùng ở bất kỳ đâu trên trang
- When: Click icon chuông
- Then: Mở panel thông báo

**Scenario 4: Lỗi tải thông báo**
- Given: API `/api/notifications/unread-count` trả về lỗi
- When: Trang tải
- Then: Không hiển thị badge, icon chuông vẫn hiển thị bình thường
- And: Lỗi được log phía server, không hiển thị cho user

### US7: Quản lý tài khoản [P2]

**As a** nhân viên Sun*
**I want to** truy cập menu tài khoản
**So that** tôi có thể xem profile hoặc đăng xuất

#### Acceptance Scenarios

**Scenario 1: Click avatar/user icon**
- Given: Người dùng ở bất kỳ đâu trên trang
- When: Click biểu tượng người dùng (40x40px, góc trên phải)
- Then: Mở dropdown menu: Profile / Sign out / Admin Dashboard (nếu là admin)
- Ref: Linked frame `721:5223` (Dropdown-profile)

**Scenario 2: Sign out**
- Given: Dropdown profile đang mở
- When: Click "Sign out"
- Then: Supabase session bị xóa (cookie cleared)
- And: Redirect đến trang Login (`662:14387`)

**Scenario 3: Đóng dropdown không chọn**
- Given: Dropdown profile đang mở
- When: Click bên ngoài hoặc nhấn `Escape`
- Then: Dropdown đóng lại

### US8: Widget nhanh [P3]

**As a** nhân viên Sun*
**I want to** truy cập chức năng nhanh
**So that** tôi có thể thực hiện hành động nhanh mà không cần rời trang

#### Acceptance Scenarios

**Scenario 1: Click Widget Button**
- Given: Widget button nổi ở mép phải dưới màn hình
- When: Click vào widget
- Then: Mở menu các option hành động nhanh

---

## 3. UI/UX Requirements

### Component Structure

| # | Component | Node ID | Type | Description |
|---|-----------|---------|------|-------------|
| A1 | Header | `2167:9091` | Navigation | Thanh header sticky (dính khi cuộn) với logo, nav links, controls |
| A1.1 | Logo | `I2167:9091;178:1033` | Button | Logo SAA 52x48px, click → trang chủ |
| A1.2 | Nav - About SAA 2025 | `I2167:9091;186:1579` | Button (selected) | Link đang chọn, vàng + underline |
| A1.3 | Nav - Award Information | `I2167:9091;186:1587` | Button (hover) | Link hover state |
| A1.4 | Nav - Sun* Kudos | `I2167:9091;186:1593` | Button (normal) | Link trạng thái bình thường |
| A1.5 | Notification | `I2167:9091;186:2101` | Button | Icon chuông + badge đỏ |
| A1.6 | Language | `I2167:9091;186:1696` | Button (toggle) | Cờ VN + "VN" + chevron |
| A1.7 | User Profile | `I2167:9091;186:1597` | Button | Icon user 40x40, border vàng |
| 3.5 | Keyvisual | `2167:9027` | Hero | Banner chính background |
| B1 | Countdown time | `2167:9035` | Countdown | Đếm ngược Days/Hours/Minutes |
| B1.2 | Coming soon | `2167:9036` | Label | Chữ "Coming soon" ẩn khi hết thời gian |
| B1.3 | Countdown | `2167:9037` | Countdown | 3 ô số: Days, Hours, Minutes |
| B2 | Thông tin sự kiện | `2167:9053` | Info | Thời gian, Địa điểm, Livestream |
| B3 | CTA Buttons | `2167:9062` | Buttons | "ABOUT AWARDS" + "ABOUT KUDOS" |
| B3.1 | Button ABOUT AWARDS | `2167:9063` | Button (primary) | Nền vàng, icon arrow-up |
| B3.2 | Button ABOUT KUDOS | `2167:9064` | Button (secondary) | Viền vàng, nền trong suốt |
| B4 | Content | `5001:14827` | Text | Đoạn mô tả Root Further |
| C1 | Header Giải thưởng | `2167:9069` | Section header | Caption + Title + Divider |
| C2 | Award list | `5005:14974` | Grid | Grid 3x2 thẻ giải thưởng |
| C2.1 | Top Talent | `2167:9075` | Card | Thẻ giải Top Talent |
| C2.2 | Top Project | `2167:9076` | Card | Thẻ giải Top Project |
| C2.3 | Top Project Leader | `2167:9077` | Card | Thẻ giải Top Project Leader |
| C2.4 | Best Manager | `2167:9079` | Card | Thẻ giải Best Manager |
| C2.5 | Signature Creator | `2167:9080` | Card | Thẻ giải Signature 2025 Creator |
| C2.6 | MVP | `2167:9081` | Card | Thẻ giải MVP |
| D1 | Sun* Kudos | `3390:10349` | Section | Khối quảng bá Sun* Kudos |
| D2 | Kudos Content | `I3390:10349;313:8419` | Info | Tiêu đề, mô tả, hình ảnh, CTA |
| D2.1 | Button Chi tiết | `I3390:10349;313:8426` | Button | Nút dẫn đến trang Kudos |
| 6 | Widget Button | `5022:15169` | FAB | Nút nổi cố định mép phải dưới |
| 7 | Footer | `5001:14800` | Navigation | Chân trang với logo, links (About SAA 2025, Award Information, Sun* Kudos, Tiêu chuẩn chung), copyright |

### Visual Specs
Xem chi tiết trong [design-style.md](./design-style.md)

### Responsive Behavior (Constitution P4)

| Breakpoint | Behavior |
|------------|----------|
| < 768px (mobile) | Header hamburger menu, hero padding giảm, countdown nhỏ hơn, award grid 1 cột, Sun* Kudos stack vertical, touch target >= 44px |
| 768-1023px (md) | Award grid 2 cột, padding trung bình |
| 1024-1439px (lg) | Award grid 3 cột, padding giảm nhẹ so với design gốc |
| >= 1440px (xl) | Design gốc Figma (1512px wide) |

> Figma thiết kế ở 1512px. Responsive cần mobile-first approach.

### Accessibility (Constitution P7: WCAG AA)
- Header nav links: `<nav aria-label="Main navigation">`, active link `aria-current="page"`
- Countdown: `aria-live="polite"` để screen reader đọc khi cập nhật, `role="timer"`
- Award cards: Mỗi card là `<article>` hoặc `<a>` block link với alt text cho hình ảnh
- CTA buttons: Accessible label rõ ràng ("Xem thông tin giải thưởng", "Xem Sun* Kudos")
- Language selector: `aria-expanded`, `aria-haspopup="listbox"`
- Widget button: `aria-label="Mở menu hành động nhanh"`
- Notification: `aria-label="Thông báo"`, badge đỏ có `aria-label="Có thông báo mới"`
- Focus ring visible trên tất cả interactive elements
- **Keyboard navigation:**
  - `Tab`: Cycle qua header controls → CTA buttons → award cards → Kudos → footer
  - `Enter` / `Space`: Kích hoạt buttons/links
  - `Escape`: Đóng dropdowns

---

## 4. Data Requirements

### Input Fields
Không có input trực tiếp trên Homepage.

### Display Fields

| Field | Source | Format | i18n |
|-------|--------|--------|------|
| "ROOT FURTHER" logo | Static asset | Image (451x200px) | No |
| "Coming soon" | Static text | Text | Yes |
| Countdown (Days/Hours/Minutes) | Computed (từ env var) | 2 chữ số x 3 nhóm | No |
| Thời gian sự kiện | Static / env var | "26/12/2025" | Yes |
| Địa điểm | Static / env var | "Âu Cơ Art Center" | Yes |
| Livestream note | Static text | Text | Yes |
| Root Further description | Static content | Long text (paragraphs) | Yes |
| "Hệ thống giải thưởng" title | Static text | Text | Yes |
| Award cards (x6) | Static data / CMS | Title + Description + Image | Yes |
| Sun* Kudos content | Static data / CMS | Title + Description + Image | Yes |
| Copyright text | Static | "Bản quyền thuộc về Sun* © 2025" | Yes |

### Environment Variables

| Variable | Format | Purpose |
|----------|--------|---------|
| `NEXT_PUBLIC_EVENT_START_DATETIME` | ISO-8601 (e.g. `2025-12-26T18:30:00+07:00`) | Mốc thời gian sự kiện để tính countdown (cần `NEXT_PUBLIC_` vì Countdown là Client Component) |

---

## 5. API Requirements (Predicted)

> Hầu hết nội dung Homepage là static/CMS-driven. Predicted endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/notifications` | GET | Lấy danh sách thông báo (badge count) |
| `/api/notifications/unread-count` | GET | Đếm số thông báo chưa đọc |
| `/api/user/profile` | GET | Lấy thông tin user hiện tại (role, avatar) |
| `/api/awards` | GET | Lấy danh sách hạng mục giải thưởng (nếu dynamic) |

### Middleware

| Path | Logic |
|------|-------|
| `/` (Homepage) | Nếu không có session → redirect Login (`662:14387`) |
| All protected routes | Supabase middleware refresh session |

---

## 6. State Management

### Local Component State (Client Components only)
- **Countdown** (`"use client"`):
  - `days: number` — Số ngày còn lại
  - `hours: number` — Số giờ còn lại
  - `minutes: number` — Số phút còn lại
  - `isExpired: boolean` — Đã hết thời gian
- **LanguageSelector** (`"use client"`):
  - `isOpen: boolean` — Toggle dropdown ngôn ngữ
- **NotificationBell** (`"use client"`):
  - `unreadCount: number` — Số thông báo chưa đọc
  - `isPanelOpen: boolean` — Panel thông báo
- **UserMenu** (`"use client"`):
  - `isOpen: boolean` — Toggle dropdown profile
- **WidgetButton** (`"use client"`):
  - `isOpen: boolean` — Toggle menu hành động nhanh

### Global State
- `locale: 'vi' | 'en'` — Ngôn ngữ hiện tại (cookie-based)
- `user: User | null` — Thông tin user (từ Supabase session)

### Loading States
- **Page initial load:** Server-rendered HTML (no skeleton needed cho static content)
- **Notification count:** Fetch client-side, badge ẩn cho đến khi có data
- **Award images:** Placeholder blur (next/image `placeholder="blur"`) trong khi load

### Error States
- **Notification API fail:** Badge ẩn, icon hiển thị bình thường, log error server-side
- **Award images fail:** Hiển thị placeholder/fallback image
- **Session expired:** Middleware auto-redirect đến Login

### Server State (Constitution P3: Server Components default)
- Page content (static text, award data) render trên Server Component
- Session check trong middleware
- Countdown target time từ env var (`NEXT_PUBLIC_EVENT_START_DATETIME`), truyền xuống Client Component

---

## 7. Navigation

| From | Action | To |
|------|--------|----|
| Homepage | Click "ABOUT AWARDS" | Awards Information page |
| Homepage | Click "ABOUT KUDOS" | Sun* Kudos page |
| Homepage | Click award card | Awards Information + `#slug-hang-muc` |
| Homepage | Click "Chi tiết" (Kudos) | Sun* Kudos page |
| Homepage | Click header "Award Information" | Awards Information page |
| Homepage | Click header "Sun* Kudos" | Sun* Kudos page |
| Homepage | Click header "About SAA 2025" (selected) | Scroll to top |
| Homepage | Click Logo | Scroll to top |
| Homepage | Click Language selector | Dropdown ngôn ngữ (overlay) |
| Homepage | Click Notification bell | Notification panel (overlay) |
| Homepage | Click User icon | Dropdown-profile (`721:5223`) |
| Homepage | Click Widget button | Quick action menu (overlay) |
| Homepage | Click footer "Tiêu chuẩn chung" | Trang Tiêu chuẩn chung |
| Login | Login thành công | Homepage |
| Any protected page | No session | Login (redirect) |

---

## 8. Dependencies

- **Supabase Auth** — Session management, user info
- **i18n** — Đa ngôn ngữ (VN/EN) cho tất cả text content
- **Middleware** — Session check, redirect logic
- **Static Assets** — Logo SAA, ROOT FURTHER logo, background artwork, award images (x6), Kudos illustration
- **Environment Variables** — `NEXT_PUBLIC_EVENT_START_DATETIME` cho countdown
- **Cookie** — Locale preference, Supabase auth tokens (httpOnly)

---

## 9. Constitution Compliance Checklist

- [x] P1: Clean Code — Server Component mặc định; Countdown, LanguageSelector, NotificationBell, UserMenu, WidgetButton là Client Components
- [x] P2: TypeScript — Strict types cho props, countdown state, user data
- [x] P3: Component Architecture — App Router, `(main)/page.tsx`; Reusable award card component
- [x] P4: Responsive — Mobile-first breakpoints; Grid responsive (1/2/3 cột); Touch targets >= 44px
- [x] P5: Security — Protected route (middleware), domain restriction
- [x] P6: Performance — Server Components cho static content, lazy load below-the-fold sections, `next/image` cho tất cả hình ảnh
- [x] P7: Code Quality — Keyboard nav, WCAG AA, aria attributes, Conventional Commits
