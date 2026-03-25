# Thể lệ UPDATE — Feature Specification

**Frame ID:** `3204:6051`
**Frame Name:** Thể lệ UPDATE
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Thể lệ (Rules) — Modal/Panel

### Purpose
Modal hiển thị thể lệ chương trình Sun* Kudos tại SAA 2025. Bao gồm quy tắc cho người nhận Kudos (huy hiệu Hero), người gửi Kudos (sưu tập icon, Secret Box), và giải Kudos Quốc Dân. Modal có 2 nút hành động: Đóng và Viết KUDOS.

### Target Users
- Nhân viên Sun* đã đăng nhập (có session hợp lệ)

### Business Context
- Mở từ Widget button "Thể lệ" trên trang Kudos hoặc Homepage
- Giải thích luật chơi cho phong trào Kudos: huy hiệu, Secret Box, Kudos Quốc Dân
- CTA "Viết KUDOS" để chuyển sang form gửi Kudos ngay
- Route: Modal overlay (không phải page riêng)

---

## 2. User Stories

### US1: Xem Thể lệ [P1]

**As a** Sunner
**I want to** đọc thể lệ chương trình Kudos
**So that** tôi hiểu cách chơi và các phần thưởng

#### Acceptance Scenarios

**Scenario 1: Mở modal Thể lệ**
- Given: User đang ở trang có Widget button
- When: Click "Thể lệ" trên Widget
- Then: Hiển thị modal panel bên phải với nội dung thể lệ

**Scenario 2: Hiển thị nội dung**
- Given: Modal Thể lệ đang mở
- When: Render xong
- Then: Hiển thị đầy đủ:
  - Tiêu đề "Thể lệ" (gold)
  - Section "NGƯỜI NHẬN KUDOS: HUY HIỆU HERO" với 4 tier badges (New Hero, Rising Hero, Super Hero, Legend Hero) + mô tả
  - Section "NGƯỜI GỬI KUDOS: SƯU TẬP TRỌN BỘ 6 ICON" với grid 6 icon badges + mô tả Secret Box
  - Section "KUDOS QUỐC DÂN" với mô tả giải đặc biệt
  - Footer: 2 nút "Đóng" + "Viết KUDOS"

**Scenario 3: Scroll nội dung dài**
- Given: Nội dung thể lệ dài hơn viewport
- When: User scroll
- Then: Nội dung scroll trong panel, footer buttons sticky ở dưới

---

### US2: Đóng Modal [P1]

**As a** Sunner
**I want to** đóng modal thể lệ
**So that** tôi quay lại trang trước

#### Acceptance Scenarios

**Scenario 1: Click nút Đóng**
- Given: Modal đang mở
- When: Click nút "✕ Đóng"
- Then: Modal đóng, quay lại trang trước

**Scenario 2: Nhấn Escape**
- Given: Modal đang mở
- When: Nhấn phím Escape
- Then: Modal đóng

**Scenario 3: Click overlay**
- Given: Modal đang mở
- When: Click vào vùng overlay tối bên trái panel
- Then: Modal đóng

---

### US3: Viết KUDOS từ Thể lệ [P1]

**As a** Sunner
**I want to** mở form viết Kudos từ modal thể lệ
**So that** tôi có thể gửi lời cảm ơn ngay

#### Acceptance Scenarios

**Scenario 1: Click Viết KUDOS**
- Given: Modal Thể lệ đang mở
- When: Click nút "✏️ Viết KUDOS"
- Then: Đóng modal Thể lệ và mở dialog Viết Kudo (linked frame: `520:11602`)

---

## 3. UI/UX Requirements

### Component List

| # | Component | Type | Description |
|---|-----------|------|-------------|
| A | Rules Content | Server | Panel nội dung thể lệ, scrollable |
| B | Button Bar (Footer) | Client | 2 nút: Đóng + Viết KUDOS, sticky bottom |
| B.1 | Close Button | Client | Secondary/outlined, icon X + text "Đóng" |
| B.2 | Write KUDOS Button | Client | Primary/gold, icon pen + text "Viết KUDOS" |

### Layout

- Modal panel: Slide-in từ phải, width 553px, full height
- Background overlay: dark semi-transparent
- Content: Scrollable vertical
- Footer buttons: Fixed at bottom

### Responsive Behavior (Constitution P4)

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Full-width panel, full height |
| Tablet+ (>= 768px) | 553px panel, slide-in từ phải |

### Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-label="Thể lệ"`
- Focus trap inside modal
- Close on Escape key
- Buttons keyboard accessible
- Scrollable content with proper focus management

---

## 4. Data Requirements

### Display Fields (Static Content)

| Field | Type | Source |
|---|---|---|
| Title | Text | Static ("Thể lệ") |
| Section 1: Người nhận Kudos | Rich text + badges | Static/i18n |
| Hero badge tiers (4) | Badge pill + threshold + description | Static |
| Section 2: Người gửi Kudos | Rich text + icon grid | Static/i18n |
| Icon badges (6) | Image + label | Static assets |
| Section 3: Kudos Quốc Dân | Rich text | Static/i18n |

### Hero Badge Thresholds

| Badge | Threshold | Description |
|-------|-----------|-------------|
| New Hero | 1-4 người gửi Kudos | Hành trình lan tỏa điều tốt đẹp bắt đầu |
| Rising Hero | 5-9 người gửi Kudos | Hình ảnh bạn đang lớn dần trong trái tim đồng đội |
| Super Hero | 10-20 người gửi Kudos | Bạn đã trở thành biểu tượng được tin tưởng và yêu quý |
| Legend Hero | Hơn 20 người gửi Kudos | Bạn đã trở thành huyền thoại — để lại dấu ấn khó quên |

### Icon Badge Assets (6)

| Name | Description |
|---|---|
| REVIVAL | Icon badge 1 |
| TOUCH OF LIGHT | Icon badge 2 |
| STAY GOLD | Icon badge 3 |
| FLOW TO HORIZON | Icon badge 4 |
| BEYOND THE BOUNDARY | Icon badge 5 |
| ROOT FURTHER | Icon badge 6 |

---

## 5. API Requirements (Predicted)

Không cần API — nội dung hoàn toàn static (i18n text + images).

---

## 6. State Management

### Local Component State
- Modal open/close state
- Scroll position (for long content)

### No Server State
- All content is static/i18n

---

## 7. Navigation & Linked Frames

| Action | Target Frame | Route |
|---|---|---|
| Click "Viết KUDOS" | `520:11602` (Viết Kudo) | Dialog/modal |
| Click "Đóng" / Escape | — | Close modal |
| Widget "Thể lệ" | This modal | Overlay |

---

## 8. Edge Cases

- **Content taller than screen:** Scroll within panel, footer stays fixed
- **Multiple modals:** Close Thể lệ before opening Viết KUDOS (sequential, not stacked)
- **Keyboard navigation:** Tab through content, buttons; Escape closes
