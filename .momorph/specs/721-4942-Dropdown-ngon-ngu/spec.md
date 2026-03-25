# Dropdown Ngôn ngữ — Feature Specification

**Frame ID:** `721:4942`
**Frame Name:** Dropdown-ngôn ngữ
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Dropdown Ngôn ngữ (Language Selector)

### Purpose
Dropdown menu cho phép người dùng chuyển đổi ngôn ngữ giao diện giữa Tiếng Việt (VN) và Tiếng Anh (EN). Hiển thị cờ quốc gia + mã ngôn ngữ.

### Target Users
- Nhân viên Sun* (`@sun-asterisk.com`) đã đăng nhập vào ứng dụng SAA 2025
- Trên trang Login: tất cả visitor (chưa cần đăng nhập)

### Business Context
- Nằm trong Header, cho phép chuyển đổi ngôn ngữ toàn bộ giao diện
- Hỗ trợ 2 ngôn ngữ: Tiếng Việt (VN) và Tiếng Anh (EN)
- Mặc định: Tiếng Việt (VN)
- Component con của Header (`MainHeader`), hiển thị trên mọi trang
- **Existing implementation:** `src/components/header/language-selector.tsx` — cần update visual để match Figma design

---

## 2. User Stories

### US1: Chuyển đổi ngôn ngữ [P1]

**As a** người dùng SAA 2025
**I want to** chọn ngôn ngữ hiển thị (VN/EN) từ dropdown
**So that** tôi có thể sử dụng ứng dụng bằng ngôn ngữ mình quen thuộc

#### Acceptance Scenarios

**Scenario 1: Mở dropdown ngôn ngữ**
- Given: User thấy trigger button ngôn ngữ hiện tại trên Header (VD: [🇻🇳 VN ▼])
- When: Click vào trigger button
- Then: Dropdown mở xuống dưới trigger, hiển thị 2 option (VN và EN), option đang chọn có nền highlight vàng nhạt

**Scenario 2: Chọn ngôn ngữ khác**
- Given: Dropdown đang mở, ngôn ngữ hiện tại là VN
- When: Click vào "EN"
- Then: Cookie `locale=en` được set, trang reload, giao diện hiển thị tiếng Anh

**Scenario 3: Click vào ngôn ngữ đang chọn**
- Given: Dropdown đang mở, ngôn ngữ hiện tại là VN
- When: Click vào "VN"
- Then: Cookie `locale=vi` được set lại, trang reload (không có thay đổi thực tế)

**Scenario 4: Đóng dropdown không chọn**
- Given: Dropdown đang mở
- When: Click bên ngoài dropdown hoặc nhấn Escape
- Then: Dropdown đóng, không có thay đổi

**Scenario 5: Keyboard navigation**
- Given: Trigger button đang focus
- When: Nhấn Enter hoặc Space
- Then: Dropdown mở, focus di chuyển đến option đầu tiên
- When: Nhấn Arrow Down/Up
- Then: Focus di chuyển giữa các options (wrap around)
- When: Nhấn Enter/Space trên option
- Then: Chọn ngôn ngữ đó, trang reload

### US2: Nhận diện ngôn ngữ đang chọn [P1]

**As a** người dùng
**I want to** thấy rõ ngôn ngữ nào đang được chọn
**So that** tôi biết ngôn ngữ hiện tại của giao diện

#### Acceptance Scenarios

**Scenario 1: Hiển thị trạng thái selected trong dropdown**
- Given: Ngôn ngữ hiện tại là VN
- When: Mở dropdown
- Then: Option "VN" có nền highlight vàng nhạt (`rgba(255,234,158,0.20)`, border-radius 2px), option "EN" nền trong suốt

**Scenario 2: Trigger button hiển thị locale hiện tại**
- Given: Ngôn ngữ hiện tại là EN
- When: User nhìn Header
- Then: Trigger button hiển thị cờ UK + "EN" + chevron-down icon

---

## 3. UI/UX Requirements

### Component List

| # | Component | Description |
|---|-----------|-------------|
| — | Trigger Button | Nút trong Header: [Flag] [Code] [Chevron▼], click để mở dropdown |
| A | Dropdown Container | Panel chứa 2 language options, mở xuống dưới trigger |
| A.1 | Tiếng Việt Option | Cờ VN + text "VN" — hiển thị selected state khi locale=vi |
| A.2 | Tiếng Anh Option | Cờ UK + text "EN" — hiển thị selected state khi locale=en |

> Visual specs chi tiết: xem [design-style.md](./design-style.md)

### Layout
- Trigger button nằm trong Header, cạnh NotificationBell và UserMenu
- Dropdown mở xuống dưới trigger button, right-aligned (`top-full right-0 mt-1`)
- 2 options xếp dọc (flex-column)
- Mỗi option hiển thị: [Flag Icon 24x24] [4px gap] [Language Code]

### Responsive Behavior
- Dropdown position absolute, right-aligned với trigger
- Kích thước cố định, không thay đổi theo breakpoint
- Trên mobile: vẫn hiển thị cùng vị trí trong Header

### Accessibility
- Trigger: `aria-expanded`, `aria-haspopup="listbox"`
- Container: `role="listbox"`, `aria-label="Select language"`
- Items: `role="option"`, `aria-selected` cho item đang chọn
- Keyboard: Arrow Up/Down để di chuyển (wrap around), Enter/Space để chọn, Escape để đóng
- Focus visible outline cho keyboard navigation
- WCAG AA compliance (per constitution Principle 7)

---

## 4. Data Requirements

### Language Options (Hardcoded)

| Code | Label | Flag Icon Path | Locale Value |
|------|-------|----------------|--------------|
| VN | Tiếng Việt | `/images/icons/flag-vn.svg` | `vi` |
| EN | English | `/images/icons/flag-en.svg` | `en` |

> Danh sách ngôn ngữ là hardcoded constant, không cần fetch từ API.

### Input/Output
- **Input:** Current locale từ cookie `locale` (default: `"vi"`)
- **Output:** Set cookie `locale={value};path=/;max-age=31536000` → `window.location.reload()`

---

## 5. API Requirements

| Endpoint | Method | Purpose |
|----------|--------|---------|
| N/A | — | Không cần API. Locale xử lý client-side via cookie |

> **Implementation:** Cookie-based locale persistence. Server đọc cookie qua `getLocaleFromCookie()` trong `src/utils/i18n.ts`. Client set cookie + reload page khi chuyển ngôn ngữ. Không sử dụng URL-based i18n routing.

---

## 6. State Management

### Local Component State
- `isOpen: boolean` — Dropdown open/close state
- `focusedIndex: number` — Keyboard navigation index (-1 khi chưa focus)

### Global State
- `currentLocale: Locale` — Passed as prop từ server component (MainHeader)
- Server đọc locale từ cookie: `getLocaleFromCookie()` → `"vi" | "en"`
- Cookie: `locale={value}`, path `/`, max-age 1 year (31536000s)

### Integration
- `MainHeader` (server component) đọc locale, pass `currentLocale` prop
- `LanguageSelector` (client component) nhận prop, render trigger + dropdown
- Khi chọn ngôn ngữ: `document.cookie = ...` → `window.location.reload()`
- Server re-renders toàn bộ page với locale mới từ cookie

### Edge Cases
- **First visit (no cookie):** Default to `"vi"` (handled by `getLocaleFromCookie()`)
- **Invalid cookie value:** Default to `"vi"`
- **During reload:** Brief flash — no special loading state needed (full page reload)

---

## 7. Navigation

### Entry Points
- Visible on **every page** via Header component (Login, Homepage, Kudos, Awards, etc.)

### Exit Points
- Chọn ngôn ngữ → Page reload (same page, new locale)
- Click outside / Escape → Dropdown đóng, no navigation
