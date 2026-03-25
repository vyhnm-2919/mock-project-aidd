# Dropdown Hashtag Filter — Feature Specification

**Frame ID:** `721:5580`
**Frame Name:** Dropdown Hashtag filter
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Dropdown Hashtag Filter

### Purpose
Dropdown menu hiển thị danh sách hashtag để lọc nội dung Kudos trên Highlight section. User chọn 1 hashtag → Kudos được lọc theo hashtag đó.

### Target Users
- Nhân viên Sun* đã đăng nhập

### Business Context
- Mở từ nút "Hashtag ▼" trên section header Highlight Kudos
- Lọc carousel/feed theo hashtag đã chọn
- Component con của `HashtagFilter` trong màn Kudos Live Board

---

## 2. User Stories

### US1: Chọn Hashtag Filter [P1]

**As a** Sunner
**I want to** chọn 1 hashtag từ dropdown
**So that** tôi xem được các Kudos thuộc hashtag đó

#### Acceptance Scenarios

**Scenario 1: Mở dropdown**
- Given: User click nút "Hashtag ▼"
- When: Dropdown mở
- Then: Hiển thị danh sách hashtag, mục đang chọn highlight (gold glow)

**Scenario 2: Chọn hashtag**
- Given: Dropdown đang mở
- When: Click vào 1 hashtag (VD: "#Dedicated")
- Then: Hashtag đó được highlight (selected state), dropdown đóng, filter áp dụng

**Scenario 3: Bỏ chọn (reset)**
- Given: Đã chọn 1 hashtag
- When: Click "Tất cả" hoặc click lại hashtag đã chọn
- Then: Bỏ filter, hiển thị tất cả

**Scenario 4: Scroll danh sách dài**
- Given: Danh sách > viewport
- When: Scroll
- Then: Danh sách cuộn trong dropdown

---

## 3. UI/UX Requirements

### Component List

| # | Component | Type | Description |
|---|-----------|------|-------------|
| A | Dropdown Container | Client | Danh sách hashtag, scrollable |
| A.1 | Tag Item (selected) | — | Nền gold 10%, text glow |
| A.2 | Tag Item (default) | — | Nền transparent, text white |

### Data — 13 Hashtag Options

1. Toàn diện
2. Giỏi chuyên môn
3. Hiệu suất cao
4. Truyền cảm hứng
5. Cống hiến
6. Aim High
7. Be Agile
8. Wasshoi
9. Hướng mục tiêu
10. Hướng khách hàng
11. Chuẩn quy trình
12. Giải pháp sáng tạo
13. Quản lý xuất sắc

### Accessibility
- `role="listbox"`, `aria-label="Chọn hashtag"`
- Items: `role="option"`, `aria-selected` for selected
- Keyboard: Arrow up/down to navigate, Enter to select, Escape to close
- Focus visible on items

---

## 4. API Requirements

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/hashtags` | GET | Load hashtag list (existing) |

---

## 5. State Management

### Local
- Selected hashtag (string | null)
- Dropdown open/close

### Parent Integration
- `onSelect(hashtag: string | null)` callback to parent filter component
