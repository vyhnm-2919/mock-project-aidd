# Login - Feature Specification

**Frame ID:** `662:14387`
**Frame Name:** Login
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Login Page - SAA 2025 (Sun Annual Awards 2025)

### Purpose
Trang đăng nhập chính của ứng dụng SAA 2025 với chủ đề "ROOT FURTHER".
Cho phép nhân viên Sun* đăng nhập bằng tài khoản Google (@sun-asterisk.com)
để truy cập hệ thống.

### Target Users
- Nhân viên Sun* có tài khoản Google domain `@sun-asterisk.com`

### Business Context
- Điểm truy cập đầu tiên vào hệ thống SAA 2025
- Chỉ hỗ trợ đăng nhập qua Google OAuth (SSO)
- Chỉ cho phép domain `@sun-asterisk.com` (Constitution P5: Security)
- Hỗ trợ đa ngôn ngữ (VN/EN)

---

## 2. User Stories

### US1: Đăng nhập bằng Google [P1]

**As a** nhân viên Sun*
**I want to** đăng nhập bằng tài khoản Google @sun-asterisk.com
**So that** tôi có thể truy cập hệ thống SAA 2025

#### Acceptance Scenarios

**Scenario 1: Đăng nhập thành công**
- Given: Người dùng chưa có session và ở trang Login
- When: Click nút "LOGIN With Google"
- Then: Hệ thống redirect đến Google OAuth consent screen
- And: Sau khi xác thực thành công với tài khoản @sun-asterisk.com
- Then: Supabase tạo session và set httpOnly cookie
- And: Redirect đến Homepage SAA (`2167:9026`)

**Scenario 2: Đăng nhập thất bại - Google error**
- Given: Người dùng ở trang Login
- When: Click nút "LOGIN With Google" nhưng Google trả về lỗi
- Then: Redirect về trang Login với error query param
- And: Hiển thị thông báo lỗi bên dưới nút Login (text đỏ #EF4444, 14px)
- And: Nút Login trở lại trạng thái mặc định

**Scenario 3: Tài khoản không thuộc domain Sun***
- Given: Người dùng ở trang Login
- When: Đăng nhập bằng tài khoản Google không phải @sun-asterisk.com
- Then: Hiển thị thông báo "Chỉ tài khoản @sun-asterisk.com được phép truy cập"
- And: Session không được tạo, người dùng ở lại trang Login

**Scenario 4: Đăng nhập đang xử lý**
- Given: Người dùng đã click nút "LOGIN With Google"
- When: Hệ thống đang redirect đến Google
- Then: Nút chuyển sang trạng thái disabled với spinner thay thế Google icon
- And: Không cho phép click lại (prevent double-click)

**Scenario 5: Đã đăng nhập (session hợp lệ)**
- Given: Người dùng đã có Supabase session hợp lệ (cookie)
- When: Truy cập trang Login
- Then: Middleware kiểm tra session → redirect đến Homepage SAA
- And: Không hiển thị trang Login

**Scenario 6: Người dùng huỷ OAuth**
- Given: Google OAuth consent screen đang hiển thị
- When: Người dùng đóng tab hoặc nhấn Cancel
- Then: Redirect về trang Login không có error
- And: Nút Login ở trạng thái mặc định

### US2: Chuyển đổi ngôn ngữ [P2]

**As a** nhân viên Sun*
**I want to** chuyển đổi ngôn ngữ hiển thị (VN/EN)
**So that** tôi có thể sử dụng ứng dụng bằng ngôn ngữ ưa thích

#### Acceptance Scenarios

**Scenario 1: Mở dropdown ngôn ngữ**
- Given: Người dùng ở trang Login
- When: Click vào nút chọn ngôn ngữ "VN" trên header
- Then: Hiển thị dropdown danh sách ngôn ngữ
- And: Chevron icon xoay 180deg (trỏ lên)
- Ref: Linked frame `721:4942` (Dropdown-ngôn ngữ)

**Scenario 2: Chọn ngôn ngữ khác**
- Given: Dropdown ngôn ngữ đang mở
- When: Chọn "EN"
- Then: Giao diện cập nhật sang tiếng Anh
- And: Dropdown đóng lại, nút hiển thị "EN" với cờ tương ứng
- And: Preference lưu vào cookie

**Scenario 3: Đóng dropdown không chọn**
- Given: Dropdown ngôn ngữ đang mở
- When: Click bên ngoài dropdown hoặc nhấn `Escape`
- Then: Dropdown đóng lại, ngôn ngữ không thay đổi

---

## 3. UI/UX Requirements

### Component Structure

| # | Component | Node ID | Type | Description |
|---|-----------|---------|------|-------------|
| A | Header | `662:14391` | Navigation | Thanh đầu trang semi-transparent |
| A.1 | Logo | `I662:14391;186:2166` | Logo | SAA 2025 logo, góc trái, không tương tác |
| A.2 | Language Selector | `I662:14391;186:1601` | Button (toggle) | Cờ VN + "VN" + chevron down |
| B | Hero Section | `662:14393` | Hero | Khu vực chính |
| B.1 | Key Visual | `662:14395` | Image | Logo "ROOT FURTHER" |
| B.2 | Content Text | `662:14753` | Text | Mô tả 2 dòng kêu gọi đăng nhập |
| B.3 | Login Button | `662:14425` | Button (icon_text) | "LOGIN With Google" + Google icon |
| C | Background | `662:14388` | Image | Artwork key visual toàn trang |
| D | Footer | `662:14447` | Label | Bản quyền "Bản quyền thuộc về Sun* © 2025" |

### Visual Specs
Xem chi tiết trong [design-style.md](./design-style.md)

### Responsive Behavior (Constitution P4)

| Breakpoint | Behavior |
|------------|----------|
| < 768px (mobile) | Padding giảm, key visual thu nhỏ, button full-width, touch target >= 44px |
| 768-1023px (md) | Padding trung bình, layout giữ nguyên |
| 1024-1439px (lg) | Giảm padding nhẹ so với design gốc |
| >= 1440px (xl) | Design gốc Figma |

> Figma chỉ có design 1440px. Responsive cần mobile-first approach.

### Accessibility (Constitution P7: WCAG AA)
- Nút Login: `aria-label="Đăng nhập bằng Google"` (sử dụng `<button>` element, không cần `role`)
- Language selector: `aria-expanded`, `aria-haspopup="listbox"`
- Background/overlays: `aria-hidden="true"` (decorative)
- Focus ring visible trên tất cả interactive elements
- **Keyboard navigation:**
  - `Tab`: Focus Language selector → Login button
  - `Enter` / `Space`: Kích hoạt button hoặc toggle dropdown
  - `Escape`: Đóng dropdown ngôn ngữ
- Contrast: White text (#FFF) trên #00101A = ratio 18.1:1 (pass AAA)

---

## 4. Data Requirements

### Input Fields
Không có input trực tiếp. Đăng nhập qua Google OAuth redirect.

### Display Fields

| Field | Source | Format | i18n |
|-------|--------|--------|------|
| Logo SAA 2025 | Static asset | Image (52x48px) | No |
| "ROOT FURTHER" | Static asset | Image (451x200px) | No |
| Hero description | i18n key: `login.hero_description` | Text (2 dòng) | Yes |
| Language label | User preference | "VN" / "EN" | - |
| Flag icon | Static asset | SVG (20x15px) | - |
| Copyright text | i18n key: `login.copyright` | Text | Yes |
| Error message | Auth error response | Text (dynamic) | Yes |

---

## 5. API Requirements (Predicted)

> Dự án sử dụng **Supabase Auth** (Constitution Tech Stack).
> Không cần custom API endpoints cho login flow cơ bản.

### Supabase Auth Methods

| Method | Purpose |
|--------|---------|
| `supabase.auth.signInWithOAuth({ provider: 'google' })` | Khởi tạo Google OAuth redirect |
| `supabase.auth.getSession()` | Kiểm tra session hiện tại |
| `supabase.auth.getUser()` | Lấy thông tin user sau login |

### Route Handlers (Next.js)

| Route | Method | Purpose |
|-------|--------|---------|
| `/auth/callback` | GET | Nhận OAuth callback, exchange code → session |

### Middleware

| Path | Logic |
|------|-------|
| `/login` | Nếu có session → redirect Homepage |
| `/` (protected) | Nếu không có session → redirect Login |

---

## 6. State Management

### Local Component State (Client Components only)
- **LoginButton** (`"use client"`):
  - `isLoading: boolean` — Trạng thái đang redirect đến Google
  - `error: string | null` — Error message từ URL query param
- **LanguageSelector** (`"use client"`):
  - `isOpen: boolean` — Toggle dropdown ngôn ngữ

### Global State
- `locale: 'vi' | 'en'` — Ngôn ngữ hiện tại (cookie-based, không cần global store)

### Server State (Constitution P3: Server Components default)
- Session check trong middleware (`src/libs/supabase/middleware.ts`)
- Không cần client-side session state trên trang Login

### Error Display
- Vị trí: Bên dưới Login button, margin-top 12px
- Style: Montserrat 14px, color #EF4444, text-align left
- Auto-dismiss: 5 giây hoặc khi click Login lại

---

## 7. Navigation

| From | Action | To |
|------|--------|----|
| Login | Login thành công | Homepage SAA (`2167:9026`) |
| Login | Click Language | Dropdown-ngôn ngữ (`721:4942`) (overlay) |
| Any protected page | Không có session | Login (middleware redirect) |
| Login | Đã có session | Homepage SAA (middleware redirect) |

---

## 8. Dependencies

- **Supabase Auth** — Google OAuth provider, domain restriction
- **i18n** — Đa ngôn ngữ (VN/EN) cho text content
- **Middleware** — Session check, redirect logic (`src/libs/supabase/middleware.ts`)
- **Static Assets** — Logo SAA, ROOT FURTHER image, background artwork, Google icon
- **Cookie** — Locale preference, Supabase auth tokens (httpOnly)

---

## 9. Constitution Compliance Checklist

- [x] P1: Clean Code — Server Component mặc định; LoginButton và LanguageSelector là Client Components
- [x] P2: TypeScript — Strict types cho props, session, error
- [x] P3: Component Architecture — App Router, `(auth)/login/page.tsx`
- [x] P4: Responsive — Mobile-first breakpoints defined
- [x] P5: Security — Domain restrict @sun-asterisk.com, httpOnly cookies
- [x] P6: Performance — Server Component, minimal client JS
- [x] P7: Code Quality — Keyboard nav, WCAG AA, Conventional Commits
