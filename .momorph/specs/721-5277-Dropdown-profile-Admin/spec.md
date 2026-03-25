# Dropdown Profile Admin — Feature Specification

**Frame ID:** `721:5277`
**Frame Name:** Dropdown-profile Admin
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Dropdown Profile Admin (User Menu for Admin)

### Purpose
Dropdown menu hiển thị khi Admin click vào avatar/user icon trên Header. Gồm 3 menu items: Profile, Dashboard, Logout. Đây là phiên bản Admin — thêm mục "Dashboard" so với Dropdown Profile thường.

### Target Users
- Nhân viên Sun* (`@sun-asterisk.com`) có quyền Admin

### Business Context
- Nằm trong Header, phía bên phải (cạnh Language Selector)
- Hiển thị khi user có role Admin
- Component con của `MainHeader`, render bởi `UserMenu`
- **Existing implementation:** `src/components/header/user-menu.tsx` — cần update visual + thêm Dashboard menu item + thêm icons

---

## 2. User Stories

### US1: Truy cập nhanh các chức năng Admin [P1]

**As a** Admin
**I want to** thấy menu Profile / Dashboard / Logout khi click avatar
**So that** tôi có thể điều hướng nhanh đến các trang quản trị

#### Acceptance Scenarios

**Scenario 1: Mở dropdown**
- Given: Admin đã đăng nhập, thấy user icon trên Header
- When: Click vào user icon
- Then: Dropdown mở xuống dưới, hiển thị 3 items: Profile (active), Dashboard, Logout

**Scenario 2: Điều hướng Profile**
- Given: Dropdown đang mở
- When: Click "Profile"
- Then: Dropdown đóng, điều hướng đến trang Profile cá nhân

**Scenario 3: Điều hướng Dashboard**
- Given: Dropdown đang mở
- When: Click "Dashboard"
- Then: Dropdown đóng, điều hướng đến trang Admin Dashboard

**Scenario 4: Đăng xuất**
- Given: Dropdown đang mở
- When: Click "Logout"
- Then: Button hiển thị loading state (disable click), Supabase signOut() được gọi, redirect về trang Login

**Scenario 4a: Đăng xuất thất bại**
- Given: Dropdown đang mở
- When: Click "Logout" nhưng signOut() fail (network error)
- Then: Hiển thị toast notification lỗi chung "Đăng xuất thất bại, vui lòng thử lại", button trở lại trạng thái bình thường

**Scenario 5: Đóng dropdown không chọn**
- Given: Dropdown đang mở
- When: Click bên ngoài hoặc nhấn Escape
- Then: Dropdown đóng, không có thay đổi

**Scenario 6: Keyboard navigation**
- Given: Trigger button đang focus
- When: Nhấn Enter/Space → Dropdown mở
- When: Nhấn Arrow Down/Up → Focus di chuyển giữa items
- When: Nhấn Enter/Space → Kích hoạt item đang focus
- When: Nhấn Escape → Đóng dropdown

### US2: Nhận diện item đang active [P2]

**As a** Admin
**I want to** thấy rõ trang nào đang được chọn trong dropdown
**So that** tôi biết mình đang ở trang nào

#### Acceptance Scenarios

**Scenario 1: Highlight active — Profile page**
- Given: User đang ở trang `/profile`
- When: Mở dropdown
- Then: Item "Profile" có nền highlight vàng nhạt + text glow, các item khác nền trong suốt

**Scenario 2: Highlight active — Dashboard page**
- Given: Admin đang ở trang `/admin`
- When: Mở dropdown
- Then: Item "Dashboard" có nền highlight vàng nhạt + text glow, các item khác nền trong suốt

**Scenario 3: No active — other pages**
- Given: User đang ở trang không phải Profile hay Dashboard (vd: Homepage, Kudos)
- When: Mở dropdown
- Then: Tất cả items đều ở trạng thái default (không highlight)

---

## 3. UI/UX Requirements

### Component List

| # | Component | Description |
|---|-----------|-------------|
| — | Trigger Button | User icon trong Header (40x40, border `#998C5F`) |
| A | Dropdown Container | Panel chứa 3 menu items |
| A.1 | Profile Item | Icon user + text "Profile" — active state với highlight |
| A.2 | Dashboard Item | Text "Dashboard" + icon grid — chỉ hiện cho Admin |
| A.3 | Logout Item | Text "Logout" + icon chevron-right |

> Visual specs chi tiết: xem [design-style.md](./design-style.md)

### Layout
- Trigger button nằm trong Header, phía phải sau Language Selector
- Dropdown mở xuống dưới trigger, right-aligned
- 3 items xếp dọc (flex-column)
- Mỗi item: [Text label] + [Icon bên phải], padding 16px, gap 4px

### Responsive Behavior
- Dropdown position absolute, right-aligned với trigger
- Kích thước cố định, không thay đổi theo breakpoint

### Accessibility
- Trigger: `aria-label="Menu tài khoản"`, `aria-expanded`, `aria-haspopup="menu"`
- Container: `role="menu"`
- Items: `role="menuitem"`, active item thêm `aria-current="page"`
- Keyboard: Arrow Up/Down, Enter/Space, Escape
- Focus visible outline (`2px solid rgba(255,255,255,0.5)`, offset 2px)
- Tab trapping: khi dropdown mở, focus trapped trong dropdown items

---

## 4. Data Requirements

### Menu Items (Hardcoded, conditional)

| Label | Icon | Action | Condition |
|-------|------|--------|-----------|
| Profile | User icon (`186:1611`) | Navigate to `/profile` | Always visible |
| Dashboard | Grid icon (`662:10350`) | Navigate to `/admin` | Admin role only |
| Logout | Chevron-right icon (`335:10890`) | Supabase signOut → redirect `/login` | Always visible |

### Input
- `isAdmin: boolean` — Từ Supabase user session metadata (`user.app_metadata.role === 'admin'`), quyết định hiện Dashboard item
- `currentPath: string` — Lấy từ `usePathname()` (next/navigation) để highlight active item

### i18n
Labels cần thêm vào `src/utils/i18n.ts` (đã xác nhận chưa có keys này):
- vi: `menuProfile: "Hồ sơ"`, `menuDashboard: "Bảng điều khiển"`, `menuLogout: "Đăng xuất"`, `menuLogoutError: "Đăng xuất thất bại, vui lòng thử lại"`
- en: `menuProfile: "Profile"`, `menuDashboard: "Dashboard"`, `menuLogout: "Logout"`, `menuLogoutError: "Logout failed, please try again"`

### Output
- Navigation action hoặc signOut action

---

## 5. API Requirements

| Endpoint | Method | Purpose |
|----------|--------|---------|
| N/A (Supabase Auth) | — | `supabase.auth.signOut()` cho Logout |
| N/A (client-side) | — | `router.push()` cho navigation |

> Không cần API riêng. Auth sử dụng Supabase client SDK. Role check từ user session.

---

## 6. State Management

### Local Component State
- `isOpen: boolean` — Dropdown open/close
- `isSigningOut: boolean` — Loading state khi đang gọi signOut (disable Logout button, show spinner)

### Props
- `isAdmin: boolean` — Hiện/ẩn Dashboard item (hoặc tự detect từ session)
- `currentPath: string` — Highlight active item

### Integration
- `MainHeader` render `UserMenu` component
- `UserMenu` sử dụng `createBrowserClient` Supabase cho signOut
- `useRouter()` cho navigation (push to `/profile`, `/admin`, `/login`)
- `usePathname()` cho active item detection

### Loading State
- **SignOut in progress:** Logout button disabled, show spinner icon thay thế chevron-right icon, text "Logout" giữ nguyên

### Edge Cases
- **Non-admin user:** Dashboard item ẩn, chỉ hiện Profile + Logout (component sử dụng `Dropdown-profile` variant `721:5223` thay vì Admin variant)
- **SignOut error:** Hiển thị toast notification lỗi chung ("Đăng xuất thất bại, vui lòng thử lại"), không expose technical details. Button trở lại trạng thái bình thường
- **Route change:** Dropdown đóng tự động (listen `usePathname()` changes)
- **Multiple rapid clicks:** Disable button sau click đầu tiên để tránh duplicate signOut calls
- **Session expired:** Nếu signOut trả về session-not-found, vẫn redirect về `/login` (coi như thành công)

---

## 7. Navigation

### Entry Points
- Visible on **every page** via Header (cho logged-in users)

### Exit Points
- Profile → `/profile` page
- Dashboard → `/admin` page (Admin only)
- Logout → `/login` page (after signOut)
- Click outside / Escape → Đóng dropdown
