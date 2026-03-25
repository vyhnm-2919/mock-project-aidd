# Countdown - Prelaunch Page - Feature Specification

**Frame ID:** `2268:35127`
**Frame Name:** Countdown - Prelaunch page
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Countdown - Prelaunch Page — Trang đếm ngược trước sự kiện SAA 2025

### Purpose
Trang full-screen hiển thị bộ đếm ngược (ngày, giờ, phút) đến thời điểm khai mạc sự kiện Sun Annual Awards 2025. Trang này hiển thị cho tất cả người dùng trước khi sự kiện diễn ra, thay thế Homepage.

### Target Users
- Tất cả người dùng truy cập trang SAA 2025 trước thời điểm sự kiện bắt đầu

### Business Context
- Trang landing mặc định khi sự kiện chưa bắt đầu
- Tạo sự mong đợi/anticipation trước sự kiện
- Không có header/footer — trang tập trung hoàn toàn vào countdown
- Khi countdown kết thúc → chuyển sang Homepage hoặc Login
- Cần config thời gian sự kiện (env variable hoặc CMS)

---

## 2. User Stories

### US1: Xem thời gian đếm ngược [P1]

**As a** người truy cập trang SAA 2025
**I want to** xem bộ đếm ngược đến sự kiện
**So that** tôi biết còn bao lâu nữa sự kiện bắt đầu

#### Acceptance Scenarios

**Scenario 1: Hiển thị countdown khi sự kiện chưa bắt đầu**
- Given: Thời điểm hiện tại trước thời gian khai mạc sự kiện
- When: Người dùng truy cập trang
- Then: Hiển thị full-screen với background artwork
- And: Text "Sự kiện sẽ bắt đầu sau" ở giữa trang (italic, bold, white)
- And: 3 nhóm đếm ngược: DAYS, HOURS, MINUTES
- And: Mỗi nhóm có 2 ô số kiểu LED (digital clock style)
- And: Các số cập nhật realtime mỗi phút

**Scenario 2: Countdown đang chạy**
- Given: Trang countdown đang hiển thị
- When: Mỗi phút trôi qua
- Then: Số phút giảm 1
- And: Khi phút = 0 → reset về 59, giờ giảm 1
- And: Khi giờ = 0 → reset về 23, ngày giảm 1

**Scenario 3: Countdown hiển thị 2 chữ số**
- Given: Countdown đang hiển thị
- When: Giá trị < 10 (ví dụ 5 giờ)
- Then: Hiển thị với leading zero: "05"
- And: Mỗi chữ số nằm trong ô riêng biệt

**Scenario 4: Countdown kết thúc (đạt 00:00:00)**
- Given: Countdown đang chạy
- When: Thời gian đạt 00 DAYS / 00 HOURS / 00 MINUTES
- Then: Chuyển hướng người dùng đến Homepage (`/`)
- And: Không hiển thị số âm

### US2: Trải nghiệm visual immersive [P1]

**As a** người truy cập
**I want to** thấy trang countdown đẹp mắt với background artwork
**So that** trang tạo ấn tượng và mong đợi cho sự kiện

#### Acceptance Scenarios

**Scenario 1: Background hiển thị đúng**
- Given: Trang countdown tải xong
- When: Render hoàn tất
- Then: Background artwork full-screen
- And: Gradient overlay phủ lên (18deg, từ #00101A đến transparent)
- And: Countdown timer hiển thị ở giữa trang, dễ đọc trên mọi background

**Scenario 2: Digit boxes có glassmorphism effect**
- Given: Countdown đang hiển thị
- When: Xem các ô số
- Then: Mỗi ô có border vàng nhạt (#FFEA9E) opacity 0.5
- And: Background gradient (trắng → trắng 10%) với blur effect
- And: Border-radius 12px
- And: Số hiển thị bằng font "Digital Numbers" kiểu LED

### US3: Responsive trên mọi thiết bị [P2]

**As a** người truy cập trên mobile/tablet
**I want to** xem countdown rõ ràng trên mọi kích thước màn hình
**So that** tôi có trải nghiệm tốt bất kể thiết bị

#### Acceptance Scenarios

**Scenario 1: Mobile (< 768px)**
- Given: Người dùng truy cập trên mobile
- When: Trang hiển thị
- Then: Countdown co lại vừa màn hình
- And: Font size và digit box nhỏ hơn nhưng vẫn dễ đọc
- And: Vẫn hiển thị 3 nhóm trên 1 hàng (hoặc wrap nếu quá nhỏ)

**Scenario 2: Tablet (768px - 1023px)**
- Given: Người dùng truy cập trên tablet
- When: Trang hiển thị
- Then: Layout tương tự desktop, scale phù hợp

---

## 3. UI/UX Requirements

### Component Structure

| # | Component | Node ID | Type | Description |
|---|-----------|---------|------|-------------|
| A | Background Image | `2268:35129` | Media | Full-screen artwork, absolute positioned |
| B | Cover Gradient | `2268:35130` | Overlay | Gradient 18deg overlay trên background |
| C | Countdown Container | `2268:35131` | Layout | Centered container chứa text + timer |
| C.1 | Heading Text | `2268:35137` | Text | "Sự kiện sẽ bắt đầu sau" |
| C.2 | Timer | `2268:35138` | Layout | 3 nhóm countdown, flex-row gap 60px |
| C.2.1 | Days Group | `2268:35139` | Component | 2 digit boxes + "DAYS" label |
| C.2.2 | Hours Group | `2268:35144` | Component | 2 digit boxes + "HOURS" label |
| C.2.3 | Minutes Group | `2268:35149` | Component | 2 digit boxes + "MINUTES" label |
| C.2.x.1 | Digit Box | `186:2619` (instance) | Component | Glassmorphism card with LED digit |

### Visual Specs
Xem chi tiết trong [design-style.md](./design-style.md)

### Responsive Behavior (Constitution P4)

| Breakpoint | Behavior |
|------------|----------|
| < 768px (mobile) | Digit boxes scale down (~45x72px). Title 20px italic. Labels 16px. Gap between groups 16px. Background cover crop |
| 768-1023px (md) | Digit boxes ~60x96px. Title 24px italic. Labels 24px. Gap 32px |
| 1024-1439px (lg) | Near pixel-perfect. Digit boxes 77x123px |
| >= 1440px (xl) | Pixel-perfect Figma match. Full layout as designed |

### Accessibility (Constitution P7: WCAG AA)
- `<main>` as page wrapper (implicit `main` landmark role)
- Timer container: `<div role="timer" aria-live="polite" aria-atomic="true">` wrapping the countdown digits (NOT on `<main>` — would override landmark)
- Each countdown unit: `aria-label="X days"`, `aria-label="X hours"`, `aria-label="X minutes"`
- Heading "Sự kiện sẽ bắt đầu sau" in `<h1>` tag (italic style is decorative, not semantic — do not use `<em>`)
- Sufficient color contrast: white text on dark background (passes AA)
- No keyboard interaction needed (display-only page)
- `<time>` element wrapping countdown for semantic HTML

---

## 4. Data Requirements

### Input Fields
Không có input trực tiếp.

### Configuration

| Field | Type | Example | Source |
|-------|------|---------|--------|
| `eventStartDate` | ISO 8601 string | `"2026-04-15T09:00:00+07:00"` | Environment variable `NEXT_PUBLIC_EVENT_START_DATE` |

### Display Fields

| Field | Type | Example | Computed |
|-------|------|---------|----------|
| `days` | number (0-999) | 00 | `Math.floor(diff / 86400000)` |
| `hours` | number (0-23) | 05 | `Math.floor((diff % 86400000) / 3600000)` |
| `minutes` | number (0-59) | 20 | `Math.floor((diff % 3600000) / 60000)` |

### i18n Text

| Key | VI | EN |
|-----|----|----|
| `countdownHeading` | Sự kiện sẽ bắt đầu sau | The event starts in |
| `daysLabel` | DAYS | DAYS |
| `hoursLabel` | HOURS | HOURS |
| `minutesLabel` | MINUTES | MINUTES |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_EVENT_START_DATE` | ISO 8601 date-time for event start | Yes |

---

## 5. API Requirements (Predicted)

> Trang countdown là static/client-side — không cần API backend.

| Endpoint | Method | Purpose |
|----------|--------|---------|
| — | — | Countdown tính toán client-side từ env variable |

### Middleware

| Path | Logic |
|------|-------|
| `/countdown` | **BYPASS AUTH** — Không yêu cầu đăng nhập. Trang countdown phải truy cập được bởi tất cả người dùng (kể cả chưa login). Thêm `/countdown` vào middleware matcher exclusion hoặc skip auth check cho path này. |
| `/` (pre-event) | Nếu sự kiện chưa bắt đầu → redirect đến `/countdown` |

> **Implementation Note:** Có 2 cách tiếp cận:
> 1. **Route-based (recommended):** Trang `/countdown` riêng trong route group `(prelaunch)`, middleware redirect khi chưa đến giờ. Auth middleware MUST skip `/countdown` path.
> 2. **Conditional render:** Trong root layout/page, kiểm tra thời gian và render Countdown hoặc Homepage.
>
> Khuyến nghị: Route-based (`/countdown`) để tách biệt rõ ràng, dễ test và deploy. Middleware cần kiểm tra `NEXT_PUBLIC_EVENT_START_DATE` để quyết định redirect.

---

## 6. State Management

### Local Component State (Client Component required)
- **CountdownTimer** (`"use client"`):
  - `days: number` — Số ngày còn lại
  - `hours: number` — Số giờ còn lại
  - `minutes: number` — Số phút còn lại
  - `isExpired: boolean` — Countdown đã kết thúc

### Timer Logic
- `useEffect` với `setInterval` mỗi 60 giây (hoặc 1 giây cho UX mượt hơn)
- Tính `diff = eventStartDate - Date.now()`
- Khi `diff <= 0` → set `isExpired = true` → `router.push('/')`

### Global State
- `locale: 'vi' | 'en'` — Cookie-based (shared)

### Loading States
- **Initial render:** Server-rendered HTML với giá trị countdown ban đầu (SSR)
- **Hydration:** Client takes over với realtime updates
- **Background image:** `next/image` with priority loading

### Error States
- **Invalid event date:** Show "00 DAYS 00 HOURS 00 MINUTES" + redirect
- **Event already started:** Immediate redirect to Homepage

### Edge Cases
- **Negative countdown (event already passed):** Redirect immediately, show 00:00:00 briefly
- **Very large countdown (>99 days):** 3-digit display for days if needed (expand digit boxes)
- **Timezone differences:** Use `NEXT_PUBLIC_EVENT_START_DATE` with timezone offset (ISO 8601)
- **Browser tab inactive:** Timer catches up on tab focus (recalculate diff, not accumulate)
- **SSR vs client time mismatch:** Hydrate with client time to avoid flash

---

## 7. Navigation

| From | Action | To |
|------|--------|----|
| Any page (pre-event) | Middleware redirect | /countdown |
| Countdown page | Timer expires | / (Homepage or Login) |

---

## 8. Dependencies

- **No shared components** — standalone full-screen page (no header, footer, widget)
- **Font: Digital Numbers** — LED/7-segment style font for countdown digits. Register via `next/font/google` (available as "Digital Numbers"). Fallback: "DSEG7 Classic" or monospace. Must define CSS variable `--font-digital`
- **Font: Montserrat** — For heading and labels (already registered in project)
- **Background artwork** — Same SAA 2025 artwork used across the site
- **Environment variable** — `NEXT_PUBLIC_EVENT_START_DATE` for countdown target
- **i18n** — Cookie-based locale (reuse existing `getLocaleFromCookie()`)

---

## 9. Constitution Compliance Checklist

- [x] P1: Clean Code — Single responsibility: CountdownTimer component handles timer logic
- [x] P2: TypeScript — Strict types for countdown state
- [x] P3: Component Architecture — Server Component for page, Client Component for timer
- [x] P4: Responsive — Mobile-first, countdown scales across breakpoints
- [x] P5: Security — No sensitive data exposed; public env var only
- [x] P6: Performance — Minimal JS (single Client Component), `next/image` for background
- [x] P7: Code Quality — Semantic HTML, aria-live for timer updates, WCAG AA contrast
