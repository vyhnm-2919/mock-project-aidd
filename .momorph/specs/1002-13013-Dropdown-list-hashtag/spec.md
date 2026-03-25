# Dropdown list hashtag - Feature Specification

**Frame ID:** `1002:13013`
**Frame Name:** Dropdown list hashtag
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Dropdown list hashtag - Chọn hashtag cho Kudo

### Purpose
Dropdown panel cho phép người dùng chọn tối đa 5 hashtag từ danh sách 13 hashtag cố định khi viết Kudo. Hiển thị trạng thái đã chọn (highlight + check icon) và chưa chọn.

### Target Users
- Nhân viên Sun* đang viết Kudo trong modal Viết Kudo (`520:11602`)

### Business Context
- Là component con của Viết Kudo modal
- Hashtag bắt buộc tối thiểu 1, tối đa 5
- Danh sách hashtag quản lý trong DB (hiện tại 13 options), không cho nhập tùy ý
- Hỗ trợ đa ngôn ngữ (VN/EN) cho label và hint

---

## 2. User Stories

### US1: Chọn hashtag [P1]

**As a** nhân viên Sun* đang viết Kudo
**I want to** chọn hashtag từ danh sách
**So that** bài Kudo của tôi được gắn thẻ chủ đề phù hợp

#### Acceptance Scenarios

**Scenario 1: Mở dropdown và chọn hashtag**
- Given: Dropdown đang đóng
- When: Click nút "Hashtag / Tối đa 5"
- Then: Dropdown panel mở ra bên dưới trigger button
- And: Hiển thị 13 hashtag, các item đã chọn trước đó có highlight + check icon

**Scenario 2: Chọn thêm hashtag**
- Given: Dropdown đang mở, có ít hơn 5 hashtag đã chọn
- When: Click vào một hashtag chưa chọn
- Then: Hashtag đó chuyển sang trạng thái "đã chọn" (highlight vàng + check icon)
- And: `onChange` callback trả về mảng hashtag mới

**Scenario 3: Bỏ chọn hashtag**
- Given: Dropdown đang mở, hashtag đang ở trạng thái "đã chọn"
- When: Click vào hashtag đã chọn
- Then: Hashtag đó chuyển về trạng thái "chưa chọn" (bỏ highlight, ẩn check icon)
- And: `onChange` callback trả về mảng hashtag mới

**Scenario 4: Đạt giới hạn 5 hashtag**
- Given: Đã chọn 5 hashtag
- When: Cố gắng chọn thêm hashtag thứ 6
- Then: Không cho phép chọn thêm (disable các item chưa chọn)
- And: Các item đã chọn vẫn có thể bỏ chọn

**Scenario 5: Đóng dropdown**
- Given: Dropdown đang mở
- When: Click bên ngoài dropdown hoặc click lại trigger button
- Then: Dropdown đóng lại
- And: Trạng thái chọn được giữ nguyên

**Scenario 6: Chưa chọn hashtag nào khi submit Kudo (validation)**
- Given: Dropdown đã đóng, chưa có hashtag nào được chọn
- When: Parent form trigger validation (user ấn "Gửi" Kudo)
- Then: Trigger button hiển thị trạng thái error (border đỏ)
- And: Tooltip hoặc message hiển thị "Vui lòng chọn ít nhất 1 hashtag"

**Scenario 7: Danh sách hashtag rỗng (edge case)**
- Given: Hệ thống không tải được danh sách hashtag từ DB
- When: Mở dropdown
- Then: Hiển thị empty state message "Không có hashtag nào"
- And: Trigger button vẫn hoạt động nhưng không có item để chọn

### US2: Hiển thị trạng thái chọn [P1]

**As a** nhân viên Sun*
**I want to** thấy rõ hashtag nào đã chọn, hashtag nào chưa
**So that** tôi biết đang chọn bao nhiêu và cần chọn thêm không

#### Acceptance Scenarios

**Scenario 1: Item đã chọn**
- Given: Một hashtag đã được chọn
- Then: Item có nền vàng nhạt `rgba(255, 234, 158, 0.20)`, border-radius 2px
- And: Check icon (✓ trong vòng tròn) hiển thị bên phải, 24x24px

**Scenario 2: Item chưa chọn**
- Given: Một hashtag chưa được chọn
- Then: Item không có nền (transparent)
- And: Không hiển thị check icon

**Scenario 3: Hover trên item**
- Given: Mouse hover trên một hashtag (đã chọn hoặc chưa)
- Then: Nền đổi nhẹ để tạo feedback visual
- And: Unselected hover: `rgba(255, 255, 255, 0.05)`, Selected hover: `rgba(255, 234, 158, 0.30)`

**Scenario 4: Keyboard focus trên item**
- Given: Dropdown đang mở, user đang dùng Arrow Down/Up để navigate
- Then: Item đang focused có outline `1px solid rgba(255, 255, 255, 0.4)` (inset)
- And: Focus ring rõ ràng trên cả dark background

---

## 3. UI/UX Requirements

### Component Structure

| # | Component | Node ID | Type | Description |
|---|-----------|---------|------|-------------|
| Trigger | Button "Hashtag / Tối đa 5" | `1002:15114` | FRAME | Trigger button mở dropdown |
| Panel | Dropdown-List | `1002:13102` | FRAME | Container danh sách 13 hashtag |
| A | Hashtag đã chọn 1 | `1002:13185` | FRAME | Item selected: text + check icon |
| A.1 | Hashtag text | `1002:13188` | FRAME | Label "#High-perorming" |
| A.2 | Icon đã chọn | `1002:13204` | INSTANCE | Check icon 24x24 |
| B | Hashtag đã chọn 2 | `1002:13207` | FRAME | Item selected |
| C | Hashtag đã chọn 3 | `1002:13216` | FRAME | Item selected |
| D | Hashtag chưa chọn | `1002:13104` | INSTANCE | Item unselected: text only |

### Visual Specs
Xem chi tiết trong [design-style.md](./design-style.md)

### Hashtag List (13 fixed options)

> Hashtags are **not translated** — they are fixed label names used in both VN and EN locales.
> Source: Design items spec A.1 from Figma.
> **Data Source:** Database table `hashtags` (see migration `20260316_create_kudos_tables.sql`). While the list is currently fixed at 13 options, it SHOULD be fetched from the `hashtags` table via Supabase to allow future additions without code changes. Fallback to hardcoded list if DB fetch fails.

| # | Hashtag |
|---|---------|
| 1 | #High-perorming |
| 2 | #BE PROFESSIONAL |
| 3 | #BE OPTIMISTIC |
| 4 | #BE A TEAM |
| 5 | #THINK OUTSIDE THE BOX |
| 6 | #GET RISKY |
| 7 | #GO FAST |
| 8 | #WASSHOI |
| 9 | #Toàn diện |
| 10 | #Giỏi chuyên môn |
| 11 | #Hiệu suất cao |
| 12 | #Truyền cảm hứng |
| 13 | #Cống hiến |

> **Note:** The Figma frame shows only 8 of 13 items. The remaining 5 items (9-13) are listed in design items A.1 spec but not visible — the panel likely scrolls when more than 8 items are visible.
> **Note:** "#High-perorming" has a typo in the Figma design — implement as-is unless corrected by design team.

### Responsive Behavior (Constitution P4)

| Breakpoint | Behavior |
|------------|----------|
| < 768px (mobile) | Dropdown width 100% of parent container, items full-width |
| >= 768px (md+) | Dropdown width 318px, positioned below trigger |

### Accessibility (Constitution P7: WCAG AA)
- Trigger: `aria-haspopup="listbox"`, `aria-expanded="true/false"`
- Panel: `role="listbox"`, `aria-multiselectable="true"`
- Items: `role="option"`, `aria-selected="true/false"`
- **Keyboard navigation:**
  - `Enter` / `Space` on trigger: toggle dropdown
  - `Arrow Down/Up`: navigate items
  - `Enter` / `Space` on item: toggle selection
  - `Escape`: close dropdown
- Focus trap within dropdown when open
- `aria-live="polite"` region (visually hidden) announces selection count changes: e.g. "3 trên 5 hashtag đã chọn"
- When max reached, announce: "Đã đạt giới hạn 5 hashtag"
- Contrast: white text on dark bg (#00070C) = ratio > 15:1 (pass AAA)

---

## 4. Data Requirements

### Input (Props)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| hashtags | string[] | Yes | Currently selected hashtag names |
| availableHashtags | string[] | Yes | Full list of hashtag names from DB |
| onChange | (hashtags: string[]) => void | Yes | Callback when selection changes |
| maxSelections | number | No | Max selections (default: 5) |
| label | string | Yes | Trigger label text |
| maxLabel | string | Yes | Hint text "Tối đa 5" |
| error | boolean | No | Error state for validation |
| disabled | boolean | No | Disable entire component |

### Display Fields

| Field | Source | Format | i18n |
|-------|--------|--------|------|
| Label "Hashtag" | Props | Text | Yes |
| Hint "Tối đa 5" | Props | Text | Yes |
| Hashtag items | DB `hashtags` table via props | Text with # prefix | No (hashtag names are fixed, not translated) |
| Selection count | Derived from `hashtags.length` | "{n}/5" or implicit | No |

---

## 5. API Requirements

> Selected hashtags are passed to parent Viết Kudo modal via `onChange` callback.

| Endpoint | Method | Purpose | Response |
|----------|--------|---------|----------|
| Supabase: `hashtags` table | SELECT | Load hashtag list on mount | `{ id: UUID, name: string }[]` |

```typescript
// Predicted Supabase query
const { data: hashtags } = await supabase
  .from('hashtags')
  .select('id, name')
  .order('name');
```

> **Note:** This should be fetched once and cached (SWR/React Query or parent-level fetch). The component itself should receive the list via props to remain a pure UI component. Hashtag data is stored in `kudos_hashtags` as text (not FK), so the hashtag `name` is the value used for selection and storage.

---

## 6. State Management

### Local Component State (Client Component - `"use client"`)

```typescript
interface HashtagDropdownState {
  isOpen: boolean;          // Dropdown visibility
  focusedIndex: number;     // Keyboard navigation index (-1 = none)
}
```

- `isOpen: boolean` — Toggle dropdown panel visibility
- `focusedIndex: number` — Track keyboard-navigated item for Arrow Up/Down
- Selected hashtags managed by parent via `hashtags` prop + `onChange` callback (controlled component)

### Loading & Error States
- **Loading:** While `availableHashtags` is being fetched by parent, trigger button should be disabled with `opacity: 0.6`
- **Error:** If `error` prop is true, trigger border changes to red (`#EF4444`)
- **Empty:** If `availableHashtags` is empty array, show "Không có hashtag nào" message inside panel

### Global State
- Không cần global state. Parent (Viết Kudo modal) quản lý mảng hashtag đã chọn và fetches `availableHashtags` từ Supabase.

---

## 7. Navigation

| From | Action | To |
|------|--------|----|
| Viết Kudo (`520:11602`) | Click hashtag selector | Mở Dropdown list hashtag (inline) |
| Dropdown list hashtag | Click outside / Escape | Đóng dropdown |
| Dropdown list hashtag | Click item | Toggle selection (remain open) |

---

## 8. Dependencies

- **Parent Component** — Viết Kudo modal provides `hashtags`, `availableHashtags`, `onChange`, `label`, `maxLabel`
- **Data Source** — `hashtags` table in Supabase DB, fetched by parent and passed as `availableHashtags` prop
- **Icons** — Check icon (✓ in circle) 24x24, Plus icon 24x24 — both exported as SVG from Figma

---

## 9. Constitution Compliance Checklist

- [x] P1: Clean Code — Single responsibility dropdown component
- [x] P2: TypeScript — Strict types for props and state
- [x] P3: Component Architecture — Client Component (`"use client"`) for toggle state
- [x] P4: Responsive — Mobile-first
- [x] P5: Security — No user-generated input; DB data read-only via Supabase RLS (`ref_hashtags_read` policy)
- [x] P6: Performance — Lightweight; hashtag list fetched once by parent and passed as props
- [x] P7: Code Quality — Keyboard nav, ARIA roles, WCAG AA
