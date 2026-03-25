# Open secret box - chưa mở — Feature Specification

**Frame ID:** `1466:7676`
**Frame Name:** Open secret box - chưa mở
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Open Secret Box — Modal mở hộp quà bí ẩn (trạng thái chưa mở)

### Purpose
Modal dialog hiển thị khi nhân viên Sun* bấm "Mở Secret Box". Hiển thị hình ảnh hộp quà chưa mở trên sân khấu vàng, mời user click vào box để nhận huy hiệu ngẫu nhiên. Hiển thị số secret box còn lại chưa mở.

### Target Users
- Nhân viên Sun* đã đăng nhập, có ít nhất 1 secret box chưa mở

### Business Context
- Secret box là phần thưởng nhận được khi gửi Kudo cho đồng nghiệp
- Mỗi lần mở box nhận ngẫu nhiên 1 trong 6 huy hiệu (badge) với tỷ lệ khác nhau
- Huy hiệu và tỷ lệ:
  - Stay Gold: 30%
  - Flow to Horizon: 25%
  - Touch of Light: 20%
  - Beyond the Boundary: 10%
  - Revival: 10%
  - Root Further: 5%
- Mỗi lần mở chỉ nhận 1 huy hiệu duy nhất
- Modal này là trạng thái "chưa mở" — sau khi click box sẽ chuyển sang trạng thái animation rồi hiển thị kết quả

---

## 2. User Stories

### US1: Mở Secret Box [P1]

**As a** nhân viên Sun* có secret box chưa mở
**I want to** click vào hộp quà để mở
**So that** tôi nhận được huy hiệu ngẫu nhiên

#### Acceptance Scenarios

**Scenario 1: Mở modal Secret Box**
- Given: User có ít nhất 1 secret box chưa mở
- When: Click nút "Mở Secret Box" trên sidebar của Kudos Live Board (`2940:13431`)
- Then: Modal mở ra với tiêu đề "KHÁM PHÁ SECRET BOX CỦA BẠN"
- And: Hiển thị hình hộp quà chưa mở trên sân khấu vàng
- And: Dòng hướng dẫn "Click vào box để mở"
- And: Footer hiển thị "Secretbox chưa mở" + số lượng (ví dụ "05")

**Scenario 2: Click vào box để mở**
- Given: Modal đang hiển thị, số secretbox chưa mở > 0
- When: Click vào hình hộp quà
- Then: Box image enters loading state (disabled, pulse animation)
- And: Gọi `POST /api/secret-box/open` với `{ box_id }` của box chưa mở đầu tiên
- And: Sau khi API trả về thành công, hiển thị huy hiệu nhận được (`gift_description`)
- And: Số secretbox chưa mở giảm đi 1
- And: Box ID đã mở bị loại khỏi danh sách

**Scenario 2b: Double-click prevention**
- Given: User đã click box, API đang loading
- When: User click box lần nữa
- Then: Click bị ignore (box đang disabled trong loading state)

**Scenario 3: Không còn secret box nào**
- Given: Số secretbox chưa mở = 0
- When: Modal hiển thị
- Then: Hình hộp quà hiển thị nhưng disabled (không click được)
- And: Ẩn dòng "Click vào box để mở"
- And: Footer hiển thị "Secretbox chưa mở 00"

**Scenario 4: Đóng modal**
- Given: Modal đang mở
- When: Click nút ✕ (close) ở góc trên phải
- Then: Modal đóng lại
- And: Quay về Kudos Live Board

**Scenario 5: Lỗi khi mở box**
- Given: User click vào hộp quà
- When: API trả về lỗi
- Then: Hiển thị thông báo lỗi
- And: Số secretbox không thay đổi
- And: User có thể thử lại

### US2: Hiển thị thông tin Secret Box [P1]

**As a** nhân viên Sun*
**I want to** thấy rõ số secret box còn lại
**So that** tôi biết mình còn bao nhiêu box chưa mở

#### Acceptance Scenarios

**Scenario 1: Hiển thị số box chưa mở**
- Given: User có N secret box chưa mở
- Then: Footer hiển thị "Secretbox chưa mở" (text trắng) + số N (text vàng lớn, format 2 chữ số: "01", "05", "12")

**Scenario 2: Cập nhật sau khi mở**
- Given: User vừa mở thành công 1 box
- Then: Số hiển thị giảm đi 1 (ví dụ "05" → "04")

---

## 3. UI/UX Requirements

### Component Structure

| # | Component | Node ID | Type | Description |
|---|-----------|---------|------|-------------|
| A | Title + Close | `1466:7677` | FRAME | Header: "KHÁM PHÁ SECRET BOX CỦA BẠN" + nút ✕ |
| A.title | Title text | `1466:7678` | TEXT | Tiêu đề modal |
| A.close | Close button | `1466:7679` | INSTANCE | Nút đóng modal (✕) 19x19 |
| — | Divider top | `1466:7680` | RECTANGLE | Đường kẻ phân cách 1px |
| B | Instruction text | `1466:7681` | GROUP | "Click vào box để mở" |
| C | Box image | `1466:7684` | FRAME | Hình hộp quà + hiệu ứng ánh sáng |
| C.box | Gift box image | `1466:7686` | RECTANGLE | Hình hộp quà chưa mở (557x557) |
| C.effect | Light effect | `1466:7685` | RECTANGLE | Hiệu ứng ánh sáng quanh box |
| — | Divider bottom | `1466:7688` | RECTANGLE | Đường kẻ phân cách 1px |
| D | Unopened count | `1466:7689` | FRAME | "Secretbox chưa mở" + số lượng |
| D.count | Count number | `1466:7693` | TEXT | Số lượng (ví dụ "05") |
| D.label | Count label | `1466:7692` | TEXT | "Secretbox chưa mở" |

### Visual Specs
Xem chi tiết trong [design-style.md](./design-style.md)

### Responsive Behavior (Constitution P4)

| Breakpoint | Behavior |
|------------|----------|
| < 768px (mobile) | Modal full-screen hoặc gần full-screen, box image scales proportionally |
| >= 768px (md+) | Modal ~652px width, centered with overlay backdrop |

### Accessibility (Constitution P7: WCAG AA)
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` trỏ tới title
- Close button: `aria-label="Đóng"`, focus on open
- Box image (clickable): `role="button"`, `aria-label="Mở secret box"`, `tabIndex={0}`
- Khi disabled (0 box): `aria-disabled="true"` trên box image
- **Keyboard navigation:**
  - `Escape`: đóng modal
  - `Enter` / `Space` trên box image: mở box
  - `Tab`: navigate giữa close button và box image
- Focus trap trong modal khi mở
- Contrast: vàng `#FFEA9E` trên dark `#00101A` = ratio > 10:1 (pass AAA)

---

## 4. Data Requirements

### Input (Props)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| isOpen | boolean | Yes | Modal visibility |
| onClose | () => void | Yes | Close modal callback |
| unopenedBoxes | SecretBox[] | Yes | Danh sách secret box chưa mở (cần `id` để gọi API) |
| onOpened | (result: OpenSecretBoxResponse) => void | Yes | Callback sau khi mở thành công, parent cập nhật state |

### Display Fields

| Field | Source | Format | i18n |
|-------|--------|--------|------|
| Title "KHÁM PHÁ SECRET BOX CỦA BẠN" | Static | Text | Yes |
| Instruction "Click vào box để mở" | Static | Text, ẩn khi count=0 | Yes |
| Box image | Static asset | Image (557x557) | No |
| Label "Secretbox chưa mở" | Static | Text | Yes |
| Count | Derived from `unopenedBoxes.length` | 2-digit format (padded: "05") | No |

---

## 5. API Requirements

| Endpoint | Method | Purpose | Response |
|----------|--------|---------|----------|
| `/api/secret-box/open` | POST | Mở 1 secret box | `{ success: boolean, gift_description: string }` |
| `/api/kudos/stats` | GET | Get stats including unopened count | `KudosStats` with `secret_box_unopened` |
| Supabase: `secret_boxes` | SELECT | Fetch user's unopened boxes | `SecretBox[] where is_opened = false and user_id = current` |

> **Note:** API endpoint `/api/secret-box/open` already exists at `src/app/api/secret-box/open/route.ts`. It requires `{ box_id: string }` in the request body. Verifies ownership and unopened status. The `OpenSecretBoxResponse` and `SecretBox` types already exist in `src/types/kudos.ts`.
>
> **Important:** The component makes the API call directly (not via parent callback) — consistent with how `hashtag-selector.tsx` self-fetches. The `onOpened` callback notifies the parent to refresh stats.

---

## 6. State Management

### Local Component State (Client Component - `"use client"`)

```typescript
interface SecretBoxModalState {
  isOpening: boolean;     // Loading state during API call
  result: string | null;  // Gift description after opening
  error: string | null;   // Error message if API fails
}
```

- `isOpening`: true while API call in progress (show loading/animation)
- `result`: gift description after successful open
- `error`: error message for retry UI

### Global State
- `unopenedBoxes` managed by parent (Kudos Live Board sidebar via `kudos-stats.tsx`)
- Parent removes opened box from list after `onOpened` callback
- Parent refreshes stats count via `/api/kudos/stats`

---

## 7. Navigation

| From | Action | To |
|------|--------|----|
| Kudos Live Board sidebar (`2940:13431`) | Click "Mở Secret Box" | Mở modal Open Secret Box |
| Open Secret Box modal | Click ✕ / Escape | Đóng modal |
| Open Secret Box modal | Click box (success) | Chuyển sang trạng thái kết quả (hiển thị huy hiệu) |

---

## 8. Dependencies

- **Parent Component** — `kudos-stats.tsx` provides `unopenedBoxes`, `onClose`, `onOpened`. Currently has `handleOpenSecretBox` TODO placeholder.
- **Assets** — Hình hộp quà chưa mở + hiệu ứng ánh sáng (from Figma media via `get_media_files`)
- **API** — `/api/secret-box/open` already exists at `src/app/api/secret-box/open/route.ts` (requires `{ box_id }`)
- **Types** — `OpenSecretBoxResponse` and `SecretBox` already defined in `src/types/kudos.ts`
- **Pattern** — Follow `write-kudo-modal.tsx` for modal structure: Escape key, body scroll lock, backdrop click to close

---

## 9. Constitution Compliance Checklist

- [x] P1: Clean Code — Single responsibility modal component
- [x] P2: TypeScript — Strict types for props and state
- [x] P3: Component Architecture — Client Component (`"use client"`) for modal + API call
- [x] P4: Responsive — Mobile-first
- [x] P5: Security — API requires authentication, server validates user owns the box
- [x] P6: Performance — Single API call on click, static assets cached
- [x] P7: Code Quality — Keyboard nav, ARIA roles, focus trap, WCAG AA
