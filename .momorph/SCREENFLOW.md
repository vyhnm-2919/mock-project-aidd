# SAA 2025 - Screen Flow Map

**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Last Updated:** 2026-03-23

---

## Overview

| # | Frame ID | Screen Name | Status | Description |
|---|----------|-------------|--------|-------------|
| 1 | `662:14387` | Login | spec | Trang đăng nhập Google OAuth |
| 2 | `2167:9026` | Homepage SAA | spec | Trang chủ chính - Root Further, Countdown, Awards, Kudos |
| 3 | `2268:35127` | Countdown - Prelaunch page | spec | Trang đếm ngược trước sự kiện SAA 2025 (Days, Hours, Minutes) |
| 4 | `2940:13431` | Sun* Kudos - Live board | spec | Bảng tin Kudos: Highlight carousel, Spotlight word cloud, All Kudos feed, Stats sidebar |
| 5 | `3204:6051` | Thể lệ UPDATE | spec | Modal thể lệ: Hero badges, Secret Box icons, Kudos Quốc Dân, CTA Viết KUDOS |
| 6 | `520:11602` | Viết Kudo | spec | Modal form gửi Kudos: người nhận, danh hiệu, rich text, hashtag, ảnh, ẩn danh |
| 7 | `721:5580` | Dropdown Hashtag filter | spec | Dropdown panel lọc hashtag: 13 options, selected glow state |
| 8 | `721:5684` | Dropdown Phòng ban | spec | Dropdown panel lọc phòng ban: ~50 departments, same visual pattern as hashtag |
| 9 | `1002:12917` | Addlink Box | spec | Modal dialog thêm đường dẫn: nhập Nội dung + URL, nút Hủy/Lưu |
| 10 | `1002:13013` | Dropdown list hashtag | spec | Dropdown multi-select 13 hashtag cố định, tối đa 5 lựa chọn, check icon |
| 11 | `1466:7676` | Open secret box - chưa mở | spec | Modal dialog mở Secret Box: gift box image 557x557, dark bg #00101A, title "KHÁM PHÁ SECRET BOX CỦA BẠN", footer unopened count |
| 12 | `721:4942` | Dropdown-ngôn ngữ | spec | Dropdown chọn ngôn ngữ VN/EN: cờ quốc gia + mã ngôn ngữ, selected highlight |
| 13 | `721:5277` | Dropdown-profile Admin | spec | Dropdown menu Admin: Profile (active + glow), Dashboard, Logout với icons |

---

## Navigation Map

```
┌─────────────────────────────────────┐
│   Countdown - Prelaunch page        │
│   (2268:35127)                      │
│                                     │
│   Background image + gradient       │
│   Centered countdown timer          │
│   (Days / Hours / Minutes)          │
│   No header/footer                  │
└──────────────┬──────────────────────┘
               │ Countdown reaches zero
               ▼
┌──────────────┐
│   Login      │
│ (662:14387)  │
└──────┬───────┘
       │ Login thành công
       ▼
┌──────────────────────────────────────────────────┐
│              Homepage SAA (2167:9026)             │
│                                                  │
│  [About SAA 2025*] [Awards Info] [Sun* Kudos]    │
│                                                  │
│  ROOT FURTHER + Countdown                        │
│  [ABOUT AWARDS ↗]  [ABOUT KUDOS ↗]              │
│                                                  │
│  Root Further Description                        │
│                                                  │
│  Award Cards (x6) → Awards Info + #anchor        │
│                                                  │
│  Sun* Kudos → Sun* Kudos page                    │
│                                                  │
│  [Widget ✏️/🏆]                                   │
│                                                  │
│  Overlays:                                       │
│  - Language dropdown (VN/EN)                     │
│  - Notification panel                            │
│  - Profile dropdown (721:5223)                   │
│  - Widget quick actions                          │
└──────────────────────────────────────────────────┘
       │              │                │
       │              │                │
       ▼              ▼                ▼
  Awards Info    Sun* Kudos      Dropdown-profile
    page            page          (721:5223)
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│        Sun* Kudos - Live board (2940:13431)       │
│                                                  │
│  [About SAA 2025] [Awards Info] [Sun* Kudos*]    │
│                                                  │
│  KV Kudos Hero + Action Buttons                  │
│  [✏️ Ghi nhận] [🔍 Tìm kiếm]                    │
│                                                  │
│  HIGHLIGHT KUDOS (carousel 5 cards)              │
│  [Hashtag▼] [Phòng ban▼]                        │
│                                                  │
│  SPOTLIGHT BOARD (word cloud)                    │
│                                                  │
│  ALL KUDOS (feed)  |  Sidebar (Stats + Top 10)   │
│                                                  │
│  Overlays:                                       │
│  - Viết Kudo dialog (520:11602)                  │
│    └─ Addlink Box dialog (1002:12917)            │
│    └─ Dropdown list hashtag (1002:13013)         │
│  - Open Secret Box dialog (1466:7676)            │
│  - Hashtag filter dropdown (721:5580)            │
│  - Phòng ban dropdown (721:5684)                 │
│  - Profile preview (721:5827)                    │
└──────────────────────────────────────────────────┘
```

---

## Screen Details

### 1. Countdown - Prelaunch page (`2268:35127`)
- **Entry:** User visits site before the SAA 2025 event starts
- **Layout:** Full-screen page with background image, gradient overlay, and centered countdown timer (Days, Hours, Minutes). No header or footer.
- **Exits:**
  - Countdown reaches zero → redirect to Homepage SAA (`2167:9026`) via Login (`662:14387`)
- **Spec:** `.momorph/specs/2268-35127-Countdown-Prelaunch-page/`

### 2. Login (`662:14387`)
- **Entry:** Unauthenticated user, or middleware redirect
- **Exits:**
  - Login success → Homepage SAA (`2167:9026`)
  - Language dropdown → overlay
- **Spec:** `.momorph/specs/662-14387-Login/`

### 3. Homepage SAA (`2167:9026`)
- **Entry:** After login, or click Logo/About SAA 2025
- **Exits:**
  - Header "Award Information" → Awards Information page
  - Header "Sun* Kudos" → Sun* Kudos page
  - CTA "ABOUT AWARDS" → Awards Information page
  - CTA "ABOUT KUDOS" → Sun* Kudos page
  - Award card click → Awards Information + `#slug`
  - Sun* Kudos "Chi tiết" → Sun* Kudos page
  - Notification bell → Notification panel
  - User icon → Profile dropdown (`721:5223`)
  - Language selector → Language dropdown
  - Widget button → Quick action menu
  - Footer links → Same as header navigation
- **Spec:** `.momorph/specs/2167-9026-Homepage-SAA/`

### 4. Sun* Kudos - Live board (`2940:13431`)
- **Entry:** Click "Sun* Kudos" from Header or Homepage CTA
- **Layout:** Hero banner, Highlight Kudos carousel (5 cards), Spotlight Board (word cloud), All Kudos feed (2-column: posts + sidebar with stats & top receivers)
- **Exits:**
  - Click "Ghi nhận" input → Viết Kudo dialog (`520:11602`)
  - Click "Mở Secret Box" → Open Secret Box dialog (`1466:7676`)
  - Click avatar/name → Profile page (`721:5827`)
  - Hashtag dropdown → Dropdown list hashtag (`1002:13013`)
  - Phòng ban dropdown → Dropdown Phòng ban (`721:5684`)
  - Header navigation → Homepage, Awards Info
  - Footer links → Same as header navigation
- **Spec:** `.momorph/specs/2940-13431-Sun-Kudos-Live-board/`

### 5. Addlink Box (`1002:12917`)
- **Entry:** Click insert link trong rich text editor của Viết Kudo (`520:11602`)
- **Layout:** Modal dialog 752x388px with warm background (#FFF8E1). Contains title, text input (Nội dung), URL input, and Cancel/Save buttons.
- **Exits:**
  - Click "Lưu" (valid) → Close modal, return link data to parent editor
  - Click "Hủy" / Escape / Click overlay → Close modal, no changes
- **Spec:** `.momorph/specs/1002-12917-Addlink-Box/`

### 6. Dropdown list hashtag (`1002:13013`)
- **Entry:** Click hashtag selector trong Viết Kudo modal (`520:11602`)
- **Layout:** Trigger button (116x48px) + dropdown panel (318px width, dark bg #00070C). 13 fixed hashtag options, max 5 selections. Selected items have yellow highlight + check icon.
- **Exits:**
  - Click item → Toggle selection (dropdown stays open)
  - Click outside / Escape → Close dropdown
- **Spec:** `.momorph/specs/1002-13013-Dropdown-list-hashtag/`

### 7. Open secret box - chưa mở (`1466:7676`)
- **Entry:** Click "Mở Secret Box" in Kudos Live Board sidebar (`2940:13431`)
- **Layout:** Modal dialog ~652px, dark background #00101A. Gift box image 557x557 centered, title "KHÁM PHÁ SECRET BOX CỦA BẠN", close button (top-right ✕), footer with unopened box count.
- **Exits:**
  - Click ✕ / Escape → Close modal, return to Live board
  - Click gift box → Open animation → Result display (badge reveal)
- **Spec:** `.momorph/specs/1466-7676-Open-secret-box-chua-mo/`

### 8. Dropdown-ngôn ngữ (`721:4942`)
- **Entry:** Click language selector (VN/EN button) trong Header trên mọi trang
- **Layout:** Dropdown panel ~122x124px, dark bg #00070C, border #998C5F. 2 options: VN (cờ Việt Nam + "VN") và EN (cờ Anh + "EN"). Selected item có nền highlight vàng nhạt.
- **Exits:**
  - Click option → Chuyển ngôn ngữ, đóng dropdown, reload UI với locale mới
  - Click outside / Escape → Đóng dropdown, không thay đổi
- **Spec:** `.momorph/specs/721-4942-Dropdown-ngon-ngu/`

---

## Shared Components

| Component | Used In | Notes |
|-----------|---------|-------|
| Header (MainHeader) | Homepage, Awards, Kudos | Sticky, nav links with active state |
| Footer (MainFooter) | Homepage, Awards, Kudos | Logo + nav links + copyright |
| Language Selector | All pages (via Header) | VN/EN toggle |
| Notification Bell | All pages (via Header) | Badge for unread count |
| User Menu | All pages (via Header) | Profile/Signout/Admin |
| Widget Button | Homepage (possibly others) | Fixed position FAB |
