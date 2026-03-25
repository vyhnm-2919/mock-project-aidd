# Addlink Box - Feature Specification

**Frame ID:** `1002:12917`
**Frame Name:** Addlink Box
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Addlink Box - Dialog thêm đường dẫn

### Purpose
Modal dialog cho phép người dùng thêm đường dẫn (hyperlink) với nội dung hiển thị và URL. Sử dụng trong ngữ cảnh soạn thảo nội dung (ví dụ: viết Kudo) để chèn liên kết vào văn bản.

### Target Users
- Nhân viên Sun* đã đăng nhập, đang soạn nội dung (Kudo, bài viết)

### Business Context
- Là modal phụ trợ cho tính năng soạn thảo rich text (ví dụ: Viết Kudo `520:11602`)
- Cho phép chèn hyperlink với văn bản tùy chỉnh
- Hỗ trợ đa ngôn ngữ (VN/EN)

---

## 2. User Stories

### US1: Thêm đường dẫn mới [P1]

**As a** nhân viên Sun* đang soạn nội dung
**I want to** thêm một đường dẫn với nội dung hiển thị và URL
**So that** bài viết của tôi có thể chứa hyperlink dẫn đến tài nguyên liên quan

#### Acceptance Scenarios

**Scenario 1: Thêm đường dẫn thành công**
- Given: Modal "Thêm đường dẫn" đang mở
- And: "Nội dung" hợp lệ (1-100 ký tự) và "URL" hợp lệ (http/https, 5-2048 ký tự)
- When: Click "Lưu"
- Then: Nút "Lưu" chuyển sang trạng thái disabled (prevent double-click)
- And: Link data (`{ text, url }`) được truyền về parent qua `onSave` callback
- And: Modal đóng lại, form được reset

**Scenario 2: Lưu với trường "Nội dung" trống**
- Given: Modal đang mở, trường "Nội dung" trống
- When: Click "Lưu"
- Then: Hiển thị thông báo lỗi "Vui lòng nhập nội dung" (`addlink.error_text_required`) dưới trường "Nội dung"
- And: Trường "Nội dung" border chuyển sang `#EF4444`
- And: Modal không đóng, focus vào trường "Nội dung"

**Scenario 3: Lưu với URL không hợp lệ**
- Given: Modal đang mở, trường "URL" chứa giá trị không đúng định dạng URL (không bắt đầu bằng http:// hoặc https://)
- When: Click "Lưu"
- Then: Hiển thị thông báo lỗi "URL không hợp lệ" (`addlink.error_url_invalid`) dưới trường URL
- And: Trường "URL" border chuyển sang `#EF4444`
- And: Modal không đóng

**Scenario 3b: Blur validation cho URL**
- Given: Trường "URL" chứa giá trị không đúng định dạng
- When: Blur (focus rời khỏi) trường URL
- Then: Hiển thị thông báo lỗi "URL không hợp lệ" dưới trường URL ngay lập tức
- And: Lỗi tự xóa khi user bắt đầu nhập lại (onChange)

**Scenario 4: Lưu với trường "URL" trống**
- Given: Modal đang mở, trường "URL" trống
- When: Click "Lưu"
- Then: Hiển thị thông báo lỗi "Vui lòng nhập URL" (`addlink.error_url_required`) dưới trường "URL"
- And: Trường "URL" border chuyển sang `#EF4444`
- And: Modal không đóng, focus vào trường "URL"

**Scenario 5: Nội dung chỉ gồm khoảng trắng**
- Given: Trường "Nội dung" chỉ chứa khoảng trắng
- When: Click "Lưu"
- Then: Hiển thị thông báo lỗi "Vui lòng nhập nội dung" (`addlink.error_text_required`), coi như trường trống
- And: Trường "Nội dung" border chuyển sang `#EF4444`

**Scenario 6: Nội dung vượt quá 100 ký tự**
- Given: Trường "Nội dung" chứa hơn 100 ký tự
- When: Click "Lưu"
- Then: Hiển thị thông báo lỗi "Nội dung không được vượt quá 100 ký tự" (`addlink.error_text_maxlength`)

**Scenario 7: URL vượt quá 2048 ký tự**
- Given: Trường "URL" chứa hơn 2048 ký tự
- When: Click "Lưu"
- Then: Hiển thị thông báo lỗi "URL không được vượt quá 2048 ký tự" (`addlink.error_url_maxlength`)

**Scenario 8: Cả hai trường đều có lỗi**
- Given: Cả "Nội dung" và "URL" đều không hợp lệ
- When: Click "Lưu"
- Then: Hiển thị thông báo lỗi cho cả hai trường đồng thời
- And: Focus vào trường "Nội dung" (trường đầu tiên)

**Scenario 9: Xóa lỗi khi nhập lại**
- Given: Trường đang hiển thị lỗi validation
- When: User bắt đầu nhập vào trường đó (onChange)
- Then: Lỗi của trường đó tự xóa
- And: Border trở lại `#998C5F`

### US2: Chỉnh sửa đường dẫn hiện có [P2]

**As a** nhân viên Sun* đang soạn nội dung
**I want to** chỉnh sửa một đường dẫn đã chèn trước đó
**So that** tôi có thể cập nhật nội dung hiển thị hoặc URL của link

#### Acceptance Scenarios

**Scenario 1: Mở modal với dữ liệu có sẵn**
- Given: Có một link đã chèn trong rich text editor
- When: Click vào link hoặc chọn "Sửa link" từ context menu
- Then: Modal mở với `initialText` và `initialUrl` được điền sẵn
- And: User có thể chỉnh sửa cả hai trường

**Scenario 2: Lưu chỉnh sửa thành công**
- Given: Modal mở ở chế độ edit, user đã sửa nội dung
- When: Click "Lưu"
- Then: Dữ liệu cập nhật được truyền về parent qua `onSave` callback
- And: Modal đóng lại

### US3: Hủy thêm đường dẫn [P1]

**As a** nhân viên Sun*
**I want to** hủy thao tác thêm đường dẫn
**So that** tôi có thể quay lại soạn thảo mà không thêm link

#### Acceptance Scenarios

**Scenario 1: Click nút Hủy**
- Given: Modal "Thêm đường dẫn" đang mở
- When: Click nút "Hủy"
- Then: Modal đóng lại
- And: Không có thay đổi nào được lưu

**Scenario 2: Nhấn Escape**
- Given: Modal đang mở
- When: Nhấn phím `Escape`
- Then: Modal đóng lại, không lưu thay đổi

**Scenario 3: Click overlay ngoài modal**
- Given: Modal đang mở
- When: Click vào vùng overlay bên ngoài modal
- Then: Modal đóng lại, không lưu thay đổi

---

## 3. UI/UX Requirements

### Component Structure

| # | Component | Node ID | Type | Description |
|---|-----------|---------|------|-------------|
| A | Title | `I1002:12682;1002:12500` | TEXT | Tiêu đề "Thêm đường dẫn" |
| B | Text Field | `I1002:12682;1002:12501` | FRAME | Nhóm label + input cho "Nội dung" |
| B.1 | Label "Nội dung" | `I1002:12682;1002:12502` | INSTANCE | Nhãn bên trái |
| B.2 | Text Input | `I1002:12682;1002:12503` | INSTANCE | Ô nhập nội dung hiển thị |
| C | Link Field | `I1002:12682;1002:12652` | FRAME | Nhóm label + input cho "URL" |
| C.1 | Label "URL" | `I1002:12682;1002:12653` | INSTANCE | Nhãn bên trái |
| C.2 | URL Input | `I1002:12682;1002:12654` | INSTANCE | Ô nhập URL (có icon link) |
| D | Buttons | `I1002:12682;1002:12543` | FRAME | Nhóm nút hành động |
| D.1 | Button Hủy | `I1002:12682;1002:12544` | INSTANCE | Nút hủy với icon X |
| D.2 | Button Lưu | `I1002:12682;1002:12545` | INSTANCE | Nút lưu với icon link |

### Visual Specs
Xem chi tiết trong [design-style.md](./design-style.md)

### Responsive Behavior (Constitution P4)

| Breakpoint | Behavior |
|------------|----------|
| < 768px (mobile) | Modal full-width trừ margin 16px hai bên, padding giảm xuống 24px, buttons stack vertical |
| 768-1023px (md) | Modal max-width 752px, centered |
| >= 1024px (lg/xl) | Pixel-perfect theo Figma (752x388px) |

> Figma chỉ có design cho desktop. Modal cần responsive mobile-first.

### Accessibility (Constitution P7: WCAG AA)
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` trỏ đến title
- Title: `id` cho `aria-labelledby` reference
- Input fields: `<label>` liên kết với `<input>` qua `htmlFor`/`id`
- Error messages: `aria-describedby` liên kết input với error text, `role="alert"`
- Button Hủy: `aria-label="Hủy thêm đường dẫn"`
- Button Lưu: `aria-label="Lưu đường dẫn"`
- **Focus trap:** Focus bị giữ trong modal khi mở
- **Keyboard navigation:**
  - `Tab`: Nội dung input → URL input → Hủy → Lưu
  - `Enter`: Submit form (kích hoạt Lưu)
  - `Escape`: Đóng modal
- Contrast: #00101A trên #FFF8E1 = ratio > 14:1 (pass AAA)

---

## 4. Data Requirements

### Input Fields

| Field | Label | Type | Required | Validation | Min | Max |
|-------|-------|------|----------|------------|-----|-----|
| text | Nội dung | string | Yes | Không chỉ gồm khoảng trắng, trim before validate | 1 | 100 |
| url | URL | string | Yes | Định dạng URL hợp lệ (http:// hoặc https://) | 5 | 2048 |

### Display Fields

| Field | Source | Format | i18n |
|-------|--------|--------|------|
| Title "Thêm đường dẫn" | i18n key: `addlink.title` | Text | Yes |
| Label "Nội dung" | i18n key: `addlink.label_text` | Text | Yes |
| Label "URL" | i18n key: `addlink.label_url` | Text | Yes |
| Button "Hủy" | i18n key: `addlink.cancel` | Text | Yes |
| Button "Lưu" | i18n key: `addlink.save` | Text | Yes |
| Error "Vui lòng nhập nội dung" | i18n key: `addlink.error_text_required` | Text | Yes |
| Error "Nội dung không được vượt quá 100 ký tự" | i18n key: `addlink.error_text_maxlength` | Text | Yes |
| Error "Vui lòng nhập URL" | i18n key: `addlink.error_url_required` | Text | Yes |
| Error "URL không hợp lệ" | i18n key: `addlink.error_url_invalid` | Text | Yes |
| Error "URL không được vượt quá 2048 ký tự" | i18n key: `addlink.error_url_maxlength` | Text | Yes |

### Error Display Behavior
- **Position:** Ngay dưới input field tương ứng, margin-top 4px
- **Style:** Montserrat 14px/400, color `#EF4444`, text-align left
- **Input border:** Chuyển sang `#EF4444` khi có lỗi
- **Dismiss:** Tự xóa khi user bắt đầu nhập lại (onChange)
- **Multiple errors:** Hiển thị đồng thời cho tất cả trường lỗi

---

## 5. API Requirements (Predicted)

> Modal này là client-side component. Không gọi API trực tiếp.
> Link data được truyền về parent component qua callback.

| Action | Method | Description |
|--------|--------|-------------|
| onSave | Callback | `(data: { text: string; url: string }) => void` — Truyền dữ liệu link về parent |
| onCancel | Callback | `() => void` — Đóng modal không lưu |

### Server-side Validation (khi parent submit)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| (Parent form endpoint) | POST | Validate URL server-side trước khi lưu vào DB |

> Constitution P5: Input validation MUST happen server-side. Client validation chỉ là UX enhancement.

---

## 6. State Management

### Local Component State (Client Component - `"use client"`)

```typescript
interface AddLinkFormState {
  text: string;           // Nội dung hiển thị
  url: string;            // URL đường dẫn
  isSubmitting: boolean;  // Trạng thái đang submit (disable Save button)
  errors: {
    text: string | null;
    url: string | null;
  };
}
```

- `text: string` — Giá trị trường "Nội dung" (init từ `initialText` hoặc `""`)
- `url: string` — Giá trị trường "URL" (init từ `initialUrl` hoặc `""`)
- `isSubmitting: boolean` — Prevent double-click trên nút Lưu
- `errors.text: string | null` — Lỗi validation cho trường "Nội dung"
- `errors.url: string | null` — Lỗi validation cho trường "URL"

### Validation Timing
- **On submit (Click Lưu):** Validate tất cả trường, hiển thị lỗi đồng thời
- **On blur (URL field):** Validate URL format khi focus rời khỏi trường
- **On change:** Xóa lỗi của trường đang nhập

### Props Interface

```typescript
interface AddLinkBoxProps {
  isOpen: boolean;
  onSave: (data: { text: string; url: string }) => void;
  onCancel: () => void;
  initialText?: string;  // Pre-fill khi edit link
  initialUrl?: string;   // Pre-fill khi edit link
}
```

### Global State
- Không cần global state. Modal được điều khiển bởi parent component.

---

## 7. Navigation

| From | Action | To |
|------|--------|----|
| Viết Kudo (`520:11602`) | Click chèn link trong rich text editor | Mở Addlink Box (overlay, mode: create) |
| Viết Kudo (`520:11602`) | Click sửa link đã chèn | Mở Addlink Box (overlay, mode: edit, pre-filled) |
| Addlink Box | Click "Lưu" (thành công) | Đóng modal, truyền `{ text, url }` về parent |
| Addlink Box | Click "Hủy" / Escape / Click overlay | Đóng modal, quay về parent (không lưu) |

---

## 8. Dependencies

- **Parent Component** — Rich text editor (Viết Kudo hoặc tương tự) cung cấp callbacks
- **i18n** — Đa ngôn ngữ (VN/EN) cho labels và messages
- **Icons** — Close (X) icon, Link icon (từ design system)

---

## 9. Constitution Compliance Checklist

- [x] P1: Clean Code — Single responsibility modal component
- [x] P2: TypeScript — Strict types cho props, state, callbacks
- [x] P3: Component Architecture — Client Component (`"use client"`) vì có form state & event handlers
- [x] P4: Responsive — Mobile-first breakpoints defined
- [x] P5: Security — Server-side URL validation khi parent submit; client validation chỉ UX
- [x] P6: Performance — Lightweight modal, không fetch data
- [x] P7: Code Quality — Keyboard nav, focus trap, WCAG AA compliance
