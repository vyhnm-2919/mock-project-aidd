# Floating Action Button - Feature Specification

**Frame ID:** `313:9137` (collapsed), `313:9139` (expanded)
**Frame Name:** Floating Action Button - phím nổi chức năng
**Status:** spec (reviewed)
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Floating Action Button (FAB) - Widget Button

### Purpose
Nút hành động nhanh (FAB) cố định ở góc dưới bên phải màn hình, cho phép người dùng truy cập nhanh 2 chức năng chính:
1. **Xem Thể lệ SAA** - Mở trang/modal thể lệ chương trình
2. **Viết KUDOS** - Mở form viết lời khen/cảm ơn đồng nghiệp

### Target Users
- Nhân viên Sun* đã đăng nhập vào hệ thống SAA 2025

### Business Context
- FAB hiển thị trên **tất cả các trang** sau khi đăng nhập (Homepage, Awards, Kudos, etc.)
- Cung cấp lối tắt đến 2 chức năng quan trọng nhất của SAA 2025
- Hỗ trợ đa ngôn ngữ (VN/EN)
- Không che khuất không gian nội dung chính

### Existing Implementation
- File: `src/components/widget-button.tsx` (placeholder, chỉ hiển thị "Coming soon")
- Đã được mount trong `src/app/(main)/layout.tsx`
- Cần nâng cấp từ placeholder thành full FAB với expanded state

---

## 2. User Stories

### US1: Xem FAB trên mọi trang [P1]

**As a** nhân viên Sun* đã đăng nhập
**I want to** thấy nút hành động nhanh ở góc dưới phải
**So that** tôi có thể truy cập nhanh các chức năng quan trọng bất kỳ lúc nào

#### Acceptance Scenarios

**Scenario 1: FAB hiển thị ở trạng thái thu gọn (collapsed)**
- Given: Người dùng đã đăng nhập và đang ở bất kỳ trang nào
- When: Trang được tải
- Then: FAB hiển thị ở góc dưới phải với 2 icon (biểu tượng bút + logo SAA) và dấu "/" ở giữa
- And: FAB có nền vàng (#FFEA9E), hình viên (pill), có bóng đổ

**Scenario 2: FAB không hiển thị khi chưa đăng nhập**
- Given: Người dùng chưa đăng nhập
- When: Truy cập trang Login hoặc Countdown
- Then: FAB không hiển thị

**Scenario 3: FAB luôn nổi khi cuộn trang**
- Given: FAB đang hiển thị (collapsed hoặc expanded)
- When: Người dùng cuộn trang lên/xuống
- Then: FAB giữ nguyên vị trí fixed ở góc dưới phải

**Scenario 4: FAB đóng khi chuyển trang**
- Given: FAB đang ở trạng thái expanded
- When: Người dùng navigate sang trang khác (qua link/header)
- Then: FAB tự động đóng về trạng thái collapsed

---

### US2: Mở/đóng FAB menu [P1]

**As a** nhân viên Sun*
**I want to** click FAB để xem các tùy chọn hành động
**So that** tôi có thể chọn chức năng muốn sử dụng

#### Acceptance Scenarios

**Scenario 1: Mở FAB menu (collapsed -> expanded)**
- Given: FAB đang ở trạng thái thu gọn
- When: Click vào FAB
- Then: FAB chuyển sang trạng thái mở rộng với animation
- And: Hiển thị 2 nút: "Thể lệ" (trên) và "Viết KUDOS" (giữa)
- And: Hiển thị nút đóng màu đỏ (dưới) với icon "×"
- And: Các nút được căn lề phải (align-items: flex-end)

**Scenario 2: Đóng FAB menu (expanded -> collapsed)**
- Given: FAB đang ở trạng thái mở rộng
- When: Click nút đóng màu đỏ (icon "×")
- Then: FAB chuyển về trạng thái thu gọn với animation
- And: Chỉ còn hiển thị nút vàng hình viên

**Scenario 3: Đóng FAB khi click ra ngoài**
- Given: FAB đang ở trạng thái mở rộng
- When: Click ra ngoài vùng FAB
- Then: FAB tự động đóng về trạng thái thu gọn

**Scenario 4: Đóng FAB bằng phím Escape**
- Given: FAB đang ở trạng thái mở rộng
- When: Người dùng nhấn phím Escape
- Then: FAB đóng về trạng thái thu gọn
- And: Focus trả về nút FAB collapsed

---

### US3: Truy cập Thể lệ SAA [P1]

**As a** nhân viên Sun*
**I want to** click "Thể lệ" từ FAB
**So that** tôi có thể xem thể lệ chương trình SAA 2025

#### Acceptance Scenarios

**Scenario 1: Mở Thể lệ từ FAB**
- Given: FAB đang ở trạng thái mở rộng
- When: Click nút "Thể lệ"
- Then: Điều hướng đến trang/modal Thể lệ (Frame: `3204:6051`)
- And: FAB đóng lại

---

### US4: Viết KUDOS từ FAB [P1]

**As a** nhân viên Sun*
**I want to** click "Viết KUDOS" từ FAB
**So that** tôi có thể gửi lời khen/cảm ơn đến đồng nghiệp

#### Acceptance Scenarios

**Scenario 1: Mở form Viết KUDOS**
- Given: FAB đang ở trạng thái mở rộng
- When: Click nút "Viết KUDOS"
- Then: Mở modal/trang Viết Kudo (Frame: `520:11602`)
- And: FAB đóng lại

---

## 3. UI/UX Requirements

### Component List

| Component | Node ID | Figma Name | Description |
|-----------|---------|------------|-------------|
| FAB Collapsed | `313:9138` | `A_Widget Button` | Nút vàng pill với 2 icon + "/" |
| FAB Expanded Container | `313:9140` | `Widget Button` | Flex column, align-end, gap 20px |
| Button "Thể lệ" | `I313:9140;214:3799` | `A_Button thể lệ` | Nút vàng bo góc, icon SAA + text |
| Button "Viết KUDOS" | `I313:9140;214:3732` | `B_Button viết kudos` | Nút vàng bo góc, icon bút + text |
| Button Close | `I313:9140;214:3827` | `C_Button huỷ` | Nút tròn đỏ, icon "×" trắng |

### Layout
- **Position:** Fixed, bottom-right corner
- **Z-index:** 60 (trên tất cả nội dung, dưới modals)
- **Offset (xl):** 143px từ cạnh phải, 120px từ cạnh dưới (exact Figma values)
- Xem chi tiết trong `design-style.md`

### Responsive Behavior
- FAB hiển thị ở tất cả breakpoints
- Mobile: khoảng cách 16px từ cạnh phải và dưới
- Tablet: khoảng cách 24px từ cạnh
- Desktop/XL: vị trí như Figma (góc dưới phải)
- Touch target tối thiểu 44x44px (Constitution P4)

### Accessibility
- `role="group"` cho FAB container
- `aria-label` cho FAB (i18n)
- `aria-expanded="true/false"` cho trạng thái mở/đóng
- `aria-haspopup="true"` cho collapsed button
- Keyboard: `Enter`/`Space` để toggle, `Escape` để đóng
- Focus management: focus vào nút đầu tiên khi mở, trả focus khi đóng
- WCAG AA contrast cho text trên nền vàng (#00101A trên #FFEA9E = pass)

---

## 4. Data Requirements

### Display Fields

| Field | Type | Source | i18n |
|-------|------|--------|------|
| "Thể lệ" label | string | Static | VI: "Thể lệ" / EN: "Rules" |
| "Viết KUDOS" label | string | Static | VI: "Viết KUDOS" / EN: "Write KUDOS" |
| "/" separator | string | Static | "/" (no i18n) |

### i18n Keys

```typescript
interface FabTranslations {
  theLe: string;       // "Thể lệ" / "Rules"
  vietKudos: string;   // "Viết KUDOS" / "Write KUDOS"
  ariaLabel: string;   // "Mở menu hành động nhanh" / "Open quick actions menu"
  closeLabel: string;  // "Đóng" / "Close"
}
```

---

## 5. API Requirements

Không cần API cho FAB - đây là component UI thuần túy với navigation.

---

## 6. State Management

### Local Component State

| State | Type | Default | Description |
|-------|------|---------|-------------|
| `isExpanded` | boolean | false | FAB đang mở hay đóng |

### No Global State Needed
FAB là self-contained component, không cần global state.

### Side Effects
- Click outside listener (khi expanded)
- Escape key listener (khi expanded)
- Route change listener (đóng FAB khi navigate)

---

## 7. Navigation Map

| Action | Target Frame | Route (predicted) |
|--------|-------------|-------------------|
| Click "Thể lệ" | `3204:6051` (Thể lệ UPDATE) | `/rules` hoặc modal overlay |
| Click "Viết KUDOS" | `520:11602` (Viết Kudo) | `/kudos/write` hoặc modal overlay |

---

## 8. Dependencies

- **Placement:** Đã có trong `src/app/(main)/layout.tsx` → `<WidgetButton />`
- **Auth required:** Chỉ hiển thị khi người dùng đã đăng nhập (layout (main) đã handle)
- **Icon assets:** Pen icon (`/images/icons/pen.svg` ✅), SAA logo icon (`/images/icons/saa-icon.svg` ✅), Close (×) icon (❌ cần tạo mới — xem `design-style.md` section 7)
- **i18n:** Cần thêm translations vào `src/utils/i18n.ts`
