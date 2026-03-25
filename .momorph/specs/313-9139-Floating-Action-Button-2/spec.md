# Floating Action Button (Expanded) - Feature Specification

**Frame ID:** `313:9139`
**Frame Name:** Floating Action Button - phím nổi chức năng 2
**Status:** reviewed
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0
**Related Frame:** `313:9137` (collapsed state)

---

## 1. Overview

### Feature Name
Floating Action Button — Expanded State (FAB Menu)

### Purpose
Trạng thái mở rộng của nút hành động nhanh (FAB), hiển thị danh sách hành động khi người dùng click vào FAB collapsed. Gồm:
1. **Thể lệ** — Điều hướng đến trang Thể lệ SAA
2. **Viết KUDOS** — Điều hướng đến form viết lời khen đồng nghiệp
3. **Đóng (×)** — Thu gọn FAB về trạng thái collapsed

### Target Users
- Nhân viên Sun* đã đăng nhập vào hệ thống SAA 2025

### Business Context
- FAB expanded hiển thị khi người dùng click vào FAB collapsed (frame `313:9137`)
- Cung cấp lối tắt nhanh đến 2 chức năng quan trọng nhất
- Hỗ trợ đa ngôn ngữ (VI/EN)
- Luôn nổi trên nội dung, vị trí fixed góc dưới phải

### Existing Implementation
Feature này đã được implement đầy đủ trong:
- **File:** `src/components/widget-button.tsx` (client component, "use client")
- **Types:** `src/types/fab.ts` → `FabTranslations`
- **i18n:** `src/utils/i18n.ts` → `getFabTranslations()`
- **Mount:** `src/app/(main)/layout.tsx` → `<WidgetButton translations={fabT} />`

### Relationship to FAB Collapsed (313:9137)
Frame này là **trạng thái thứ 2** của cùng một component `WidgetButton`. Cả 2 trạng thái (collapsed/expanded) cùng tồn tại trong DOM, chuyển đổi qua CSS opacity/translate/pointer-events.

---

## 2. User Stories

### US1: Xem menu hành động FAB [P1]

**As a** nhân viên Sun* đã đăng nhập
**I want to** thấy danh sách hành động khi FAB mở rộng
**So that** tôi có thể chọn chức năng muốn sử dụng

#### Acceptance Scenarios

**Scenario 1: FAB expanded hiển thị đầy đủ 3 nút**
- Given: Người dùng đã click vào FAB collapsed
- When: FAB chuyển sang trạng thái expanded
- Then: Hiển thị 3 nút xếp dọc, căn lề phải (flex-end):
  - Nút "Thể lệ" (trên cùng): icon SAA logo + text "Thể lệ"
  - Nút "Viết KUDOS" (giữa): icon bút + text "Viết KUDOS"
  - Nút đóng (dưới cùng): hình tròn đỏ, icon "×" trắng
- And: Các nút cách nhau 20px (gap)
- And: Animation slide-up + fade-in từ dưới lên

**Scenario 2: FAB expanded ở đúng vị trí**
- Given: Viewport width >= 1440px
- When: FAB ở trạng thái expanded
- Then: Container căn phải cách viewport right 138px, bottom 120px
- And: Tất cả nút căn lề phải (align-items: flex-end)

**Scenario 3: FAB expanded responsive**
- Given: Viewport width < 1440px
- When: FAB ở trạng thái expanded
- Then: Vị trí điều chỉnh theo breakpoint (right-4/6/8) nhưng layout/style giữ nguyên

---

### US2: Truy cập Thể lệ SAA [P1]

**As a** nhân viên Sun*
**I want to** click nút "Thể lệ" trong FAB expanded
**So that** tôi có thể xem thể lệ chương trình SAA 2025

#### Acceptance Scenarios

**Scenario 1: Click nút Thể lệ**
- Given: FAB đang ở trạng thái expanded
- When: Click nút "Thể lệ" (icon SAA + text)
- Then: Điều hướng đến trang Thể lệ (Frame: `3204:6051`, route: `/rules`)
- And: FAB tự động đóng về collapsed (do route change)

**Scenario 2: Hover nút Thể lệ**
- Given: FAB đang ở trạng thái expanded
- When: Hover vào nút "Thể lệ"
- Then: Background chuyển từ `#FFEA9E` sang `#FFE078`

**Scenario 3: Keyboard navigation**
- Given: Focus đang ở nút "Thể lệ"
- When: Nhấn Enter hoặc Space
- Then: Điều hướng đến `/rules`

---

### US3: Viết KUDOS từ FAB [P1]

**As a** nhân viên Sun*
**I want to** click nút "Viết KUDOS" trong FAB expanded
**So that** tôi có thể gửi lời khen đến đồng nghiệp

#### Acceptance Scenarios

**Scenario 1: Click nút Viết KUDOS**
- Given: FAB đang ở trạng thái expanded
- When: Click nút "Viết KUDOS" (icon bút + text)
- Then: Điều hướng đến trang Viết Kudo (Frame: `520:11602`, route: `/kudos/write`)
- And: FAB tự động đóng về collapsed

**Scenario 2: Hover nút Viết KUDOS**
- Given: FAB đang ở trạng thái expanded
- When: Hover vào nút "Viết KUDOS"
- Then: Background chuyển từ `#FFEA9E` sang `#FFE078`

**Scenario 3: Keyboard navigation**
- Given: Focus đang ở nút "Viết KUDOS" (Tab từ "Thể lệ")
- When: Nhấn Enter hoặc Space
- Then: Điều hướng đến `/kudos/write`

---

### US4: Đóng FAB menu [P1]

**As a** nhân viên Sun*
**I want to** đóng menu FAB khi không cần nữa
**So that** tôi có thể tiếp tục xem nội dung trang

#### Acceptance Scenarios

**Scenario 1: Click nút đóng (×)**
- Given: FAB đang ở trạng thái expanded
- When: Click nút tròn đỏ (icon "×")
- Then: FAB thu gọn về collapsed với animation
- And: Focus trả về nút FAB collapsed

**Scenario 2: Click ra ngoài vùng FAB**
- Given: FAB đang ở trạng thái expanded
- When: Click ra bất kỳ đâu ngoài container FAB
- Then: FAB tự động thu gọn về collapsed

**Scenario 3: Nhấn phím Escape**
- Given: FAB đang ở trạng thái expanded
- When: Nhấn phím Escape
- Then: FAB thu gọn về collapsed
- And: Focus trả về nút FAB collapsed

**Scenario 4: Chuyển trang (route change)**
- Given: FAB đang ở trạng thái expanded
- When: Người dùng navigate sang trang khác
- Then: FAB tự động thu gọn về collapsed

**Scenario 5: Rapid toggle (edge case)**
- Given: FAB đang ở bất kỳ trạng thái nào
- When: Người dùng click nhanh liên tục vào FAB trigger/close
- Then: State toggle bình thường theo mỗi click, không bị lỗi animation
- And: CSS transition-all đảm bảo animation mượt dù click nhanh

**Scenario 6: Small viewport (edge case)**
- Given: Viewport height nhỏ (< 400px)
- When: FAB ở trạng thái expanded
- Then: FAB vẫn hiển thị đầy đủ 3 nút (224px height), có thể tràn ra ngoài viewport top
- And: Không ảnh hưởng đến scroll behavior của trang

---

## 3. UI/UX Requirements

### Component List

| Component | Node ID | Figma Name | Description |
|-----------|---------|------------|-------------|
| Expanded Container | `313:9140` | `Widget Button` | Flex column, align-end, gap 20px, chứa 3 nút |
| Button "Thể lệ" | `I313:9140;214:3799` | `A_Button thể lệ` | Nút vàng bo 4px, icon SAA logo + text, link → `/rules` |
| Button "Viết KUDOS" | `I313:9140;214:3732` | `B_Button viết kudos` | Nút vàng bo 4px, icon bút + text, link → `/kudos/write` |
| Button Close | `I313:9140;214:3827` | `C_Button huỷ` | Nút tròn đỏ 56x56, icon "×" trắng, đóng FAB |

### Layout
- **Position:** Fixed, bottom-right corner (shared with collapsed state)
- **Z-index:** 60
- **Offset (xl):** right 138px, bottom 120px
- **Direction:** Flex column, items aligned to flex-end (right-aligned)
- Xem chi tiết trong `design-style.md`

### Responsive Behavior
- Vị trí FAB theo breakpoints (xem design-style.md section 6)
- Kích thước nút giữ nguyên ở mọi breakpoint
- Touch target >= 44x44px (tất cả 3 nút đều đạt)

### Accessibility
- `role="group"` cho FAB container
- `aria-label` (i18n) cho container
- Nút collapsed có `aria-expanded="true"` và `aria-haspopup="true"` khi expanded
- Tab order: "Thể lệ" → "Viết KUDOS" → Close
- `tabIndex={-1}` cho tất cả nút khi FAB collapsed (ẩn khỏi tab order)
- `tabIndex={0}` khi FAB expanded
- Focus tự động vào "Thể lệ" (nút đầu tiên) khi mở
- `aria-label` cho nút close (i18n: "Đóng" / "Close")
- WCAG AA: #00101A trên #FFEA9E = contrast ratio > 7:1 (pass AAA)

---

## 4. Data Requirements

### Display Fields

| Field | Type | Source | i18n |
|-------|------|--------|------|
| "Thể lệ" label | string | Static | VI: "Thể lệ" / EN: "Rules" |
| "Viết KUDOS" label | string | Static | VI: "Viết KUDOS" / EN: "Write KUDOS" |

### i18n Keys (shared with FAB collapsed)

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

Không cần API — đây là component UI thuần túy với navigation links.

---

## 6. State Management

### Local Component State (shared with collapsed)

| State | Type | Default | Description |
|-------|------|---------|-------------|
| `isExpanded` | boolean | false | `true` = expanded state đang hiển thị |

### Side Effects (khi expanded)
- Click outside listener → đóng FAB
- Escape key listener → đóng FAB + focus trigger
- Route change listener → đóng FAB
- Auto-focus first action button khi mở

### No Global State Needed
FAB expanded là phần của component `WidgetButton`, self-contained.

---

## 7. Navigation Map

| Action | Target Frame | Route |
|--------|-------------|-------|
| Click "Thể lệ" | `3204:6051` (Thể lệ UPDATE) | `/rules` |
| Click "Viết KUDOS" | `520:11602` (Viết Kudo) | `/kudos/write` |
| Click Close / Escape / Click outside | `313:9137` (FAB collapsed) | Same page (state change) |

---

## 8. Dependencies

- **Parent component:** `src/components/widget-button.tsx` — cùng file với FAB collapsed
- **Mount point:** `src/app/(main)/layout.tsx` → `<WidgetButton translations={fabT} />`
- **i18n:** `src/utils/i18n.ts` → `getFabTranslations()`
- **Types:** `src/types/fab.ts` → `FabTranslations`
- **Icon assets:**
  - SAA logo: `/images/icons/saa-icon.svg` ✅
  - Pen: `/images/icons/pen.svg` ✅
  - Close (×): Inline SVG ✅ (no external asset needed)
- **Related spec:** `.momorph/specs/313-9137-Floating-Action-Button/` (collapsed state)
