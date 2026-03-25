# Viết Kudo — Feature Specification

**Frame ID:** `520:11602`
**Frame Name:** Viết Kudo
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Viết Kudo (Write Kudo) — Modal Form

### Purpose
Modal form cho phép Sunner gửi lời cảm ơn và ghi nhận đến đồng đội. Bao gồm: chọn người nhận, nhập danh hiệu, soạn nội dung với rich text editor, thêm hashtag, đính kèm ảnh, và tùy chọn gửi ẩn danh.

### Target Users
- Nhân viên Sun* đã đăng nhập (có session hợp lệ)

### Business Context
- Mở từ: nút "Viết KUDOS" trên Widget, action bar trang Kudos, hoặc modal Thể lệ
- Kudo sau khi gửi sẽ hiển thị trên Kudos Live Board feed
- Mỗi kudo gửi đi sẽ nhận lượt ❤️ từ cộng đồng → tích lũy Secret Box
- Route: Modal overlay (không phải page riêng)

---

## 2. User Stories

### US1: Gửi lời cảm ơn [P1]

**As a** Sunner đã đăng nhập
**I want to** viết và gửi lời cảm ơn đến đồng đội
**So that** đồng đội nhận được ghi nhận và lời cảm ơn từ tôi

#### Acceptance Scenarios

**Scenario 1: Điền form đầy đủ và gửi**
- Given: Modal Viết Kudo đang mở
- When: User điền: Người nhận (required), Danh hiệu (tùy chọn), Nội dung (required), Hashtag (required, 1-5), Images (tùy chọn, max 5) → Click "Gửi"
- Then: Kudo được lưu vào DB, modal đóng, feed cập nhật

**Scenario 2: Validation — thiếu trường bắt buộc**
- Given: User chưa điền đủ (Người nhận hoặc Danh hiệu hoặc Nội dung hoặc Hashtag)
- When: Click "Gửi"
- Then: Nút "Gửi" disabled, hiển thị lỗi validation trên trường thiếu (border đỏ)

**Scenario 3: Chọn người nhận (autocomplete)**
- Given: User focus vào trường "Người nhận"
- When: Gõ ký tự
- Then: Hiển thị dropdown gợi ý lọc theo tên, click để chọn

**Scenario 4: Rich text editor**
- Given: User đang soạn nội dung
- When: Sử dụng toolbar (Bold, Italic, Strikethrough, Numbered list, Link, Quote)
- Then: Format áp dụng cho text được chọn hoặc text mới

**Scenario 5: Mention đồng nghiệp**
- Given: User đang soạn nội dung
- When: Gõ "@" + tên
- Then: Hiển thị gợi ý để nhắc tới đồng nghiệp

**Scenario 6: Thêm hashtag**
- Given: User click "+ Hashtag"
- When: Chọn hoặc nhập hashtag
- Then: Hashtag thêm dưới dạng chip, tối đa 5, click "x" để xóa

**Scenario 7: Đính kèm ảnh**
- Given: User click "+ Image"
- When: Chọn file ảnh
- Then: Hiển thị thumbnail 80x80px với nút "x" xóa, tối đa 5 ảnh, nút ẩn khi đủ 5

**Scenario 8: Gửi ẩn danh**
- Given: User tick checkbox "Gửi lời cám ơn và ghi nhận ẩn danh"
- When: Gửi kudo
- Then: Kudo hiển thị không có tên người gửi (ẩn danh)

---

### US2: Hủy viết Kudo [P1]

**As a** Sunner
**I want to** hủy và đóng modal
**So that** tôi quay lại trang trước mà không gửi

#### Acceptance Scenarios

**Scenario 1: Click Hủy**
- Given: Modal đang mở
- When: Click nút "Hủy ✕"
- Then: Modal đóng, mọi dữ liệu nhập bị xóa

**Scenario 2: Click overlay**
- Given: Modal đang mở
- When: Click vùng overlay tối bên ngoài
- Then: Modal đóng

**Scenario 3: Nhấn Escape**
- Given: Modal đang mở
- When: Nhấn Escape
- Then: Modal đóng

---

## 3. UI/UX Requirements

### Component List

| # | Component | Type | Description |
|---|-----------|------|-------------|
| A | Modal Title | Server | "Gửi lời cám ơn và ghi nhận đến đồng đội" |
| B | Người nhận | Client | Search dropdown autocomplete (required) |
| B.1 | Label | — | "Người nhận *" |
| B.2 | Search Input | Client | Text input + dropdown icon |
| C | Rich Text Toolbar | Client | 6 buttons: B, I, S, List, Link, Quote + "Tiêu chuẩn cộng đồng" link |
| C.1-C.6 | Toolbar Buttons | Client | Toggle format buttons |
| D | Text Area | Client | Rich text textarea (required) |
| D.1 | Hint | — | 'Bạn có thể "@ + tên" để nhắc tới đồng nghiệp khác' |
| E | Hashtag | Client | Label + "+ Hashtag" button + chips (required, max 5) |
| F | Image Upload | Client | Label + thumbnails + "+ Image" button (optional, max 5) |
| G | Anonymous Checkbox | Client | "Gửi lời cám ơn và ghi nhận ẩn danh" |
| H | Action Buttons | Client | "Hủy ✕" + "Gửi ▷" |
| — | Danh hiệu | Client | Text input for custom title/badge (optional) |

### Layout
- Modal: Centered, 752px wide, rounded-3xl, bg `#FFF8E1`
- Overlay: `rgba(0,16,26,0.8)` (80% opacity)
- Content: Scrollable if taller than viewport
- Footer buttons: At bottom of form

### Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Full-width modal, padding 20px |
| Tablet+ (>= 768px) | 752px centered modal, padding 40px |

### Accessibility
- `role="dialog"`, `aria-modal="true"`, `aria-label="Viết Kudo"`
- Focus trap inside modal
- Close on Escape
- Required fields marked with `aria-required="true"`
- Error messages with `aria-describedby`
- Toolbar buttons with `aria-pressed` for toggle state

---

## 4. Data Requirements

### Input Fields

| Field | Type | Required | Validation | Component |
|---|---|---|---|---|
| Người nhận | autocomplete | Yes | Must select from dropdown | B |
| Danh hiệu | text | Yes | Free text, custom title for the kudo (Figma shows required `*`) | — |
| Nội dung | rich text | Yes | Min 1 char, supports formatting + @mention | D |
| Hashtag | tag array | Yes | 1-5 hashtags from dropdown or custom | E |
| Images | file array | No | Max 5 images, image formats only | F |
| Ẩn danh | boolean | No | Default: false | G |

### API Requirements (Predicted)

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/kudos` | POST | Submit kudo (receiver_id, content, hashtag_category, hashtags, images, is_anonymous) |
| `/api/users/search` | GET | Search users for autocomplete (existing) |
| `/api/hashtags` | GET | Get hashtag list for dropdown (existing) |
| `/api/upload/image` | POST | Upload image attachment |

### POST /api/kudos Request Body

| Field | Type | Required |
|---|---|---|
| receiver_id | UUID | Yes |
| danh_hieu | string | Yes |
| content | string (HTML) | Yes |
| hashtag_category | string | No |
| hashtags | string[] | Yes (1-5) |
| images | string[] (URLs) | No (0-5) |
| is_anonymous | boolean | No (default false) |

---

## 5. State Management

### Local Component State
- Form fields: receiver, title, content, hashtags, images, isAnonymous
- Validation errors per field
- User search query + results
- Hashtag dropdown open/close
- Image upload progress
- Form submission loading state
- Rich text editor state (formatting)

### No Global State
- Form state is local to modal

---

## 6. Navigation & Linked Frames

| Action | Source | Target |
|---|---|---|
| Open modal | Widget "Viết KUDOS" button | This modal |
| Open modal | Kudos page action bar | This modal |
| Open modal | Thể lệ "Viết KUDOS" button | This modal |
| Close modal | Hủy / Escape / overlay click | Close |
| Submit success | "Gửi" button | Close + refresh feed |
| "Tiêu chuẩn cộng đồng" | Link in toolbar | External/rules page |

---

## 7. Edge Cases

- **User search no results:** Show "Không tìm thấy" message
- **Hashtag limit reached (5):** Disable "+ Hashtag" button
- **Image limit reached (5):** Hide "+ Image" button
- **Large image file:** Validate file size (suggest max 5MB per image)
- **Network error on submit:** Show error toast, keep form data, allow retry
- **Duplicate submit:** Disable "Gửi" button during submission
- **Rich text empty:** Strip HTML tags for validation — content must have visible text
- **@mention no match:** Show "Không tìm thấy" in mention dropdown
- **Modal open with unsaved data:** Confirm before closing (optional)
- **Submit success:** Show success toast "Gửi Kudos thành công!", close modal, refresh feed
- **Input error state:** Required fields show red border (`#CF1322`) when empty on submit attempt
