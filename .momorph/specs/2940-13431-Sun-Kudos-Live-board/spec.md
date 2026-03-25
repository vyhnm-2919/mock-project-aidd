# Sun* Kudos - Live Board — Feature Specification

**Frame ID:** `2940:13431`
**Frame Name:** Sun* Kudos - Live board
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Sun* Kudos - Live Board

### Purpose
Trang "bảng tin trực tiếp" hiển thị toàn bộ lời cảm ơn (Kudos) giữa các Sunner trong sự kiện SAA 2025. Bao gồm carousel Highlight Kudos, Spotlight Board tương tác, danh sách All Kudos feed, sidebar thống kê cá nhân và danh sách Sunner nhận quà.

### Target Users
- Nhân viên Sun* đã đăng nhập (có session hợp lệ)

### Business Context
- Trang đích khi user click "Sun* Kudos" từ Header hoặc Homepage
- Phong trào ghi nhận lần đầu tiên cho tất cả Sunner tại SAA 2025
- User có thể gửi, xem, lọc, và tương tác với lời cảm ơn
- Tích hợp Secret Box (hệ thống quà tặng bất ngờ)
- Route: `/kudos`

---

## 2. User Stories

### US1: Xem Hero Banner và Gửi Kudos [P1]

**As a** Sunner đã đăng nhập
**I want to** thấy banner giới thiệu và ô nhập để gửi lời cảm ơn
**So that** tôi có thể nhanh chóng gửi Kudos cho đồng nghiệp

#### Acceptance Scenarios

**Scenario 1: Hiển thị hero section**
- Given: User đã đăng nhập và truy cập `/kudos`
- When: Trang load xong
- Then: Hiển thị banner KV Kudos với tiêu đề "Hệ thống ghi nhận và cảm ơn" và logo KUDOS

**Scenario 2: Mở dialog gửi Kudos**
- Given: User đang ở trang `/kudos`
- When: Click vào ô nhập "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?"
- Then: Mở dialog gửi lời cảm ơn (linked frame: `520:11602` - Viết Kudo)

**Scenario 3: Tìm kiếm profile Sunner**
- Given: User đang ở trang `/kudos`
- When: Click vào ô tìm kiếm "Tìm kiếm profile Sunner"
- Then: Mở chức năng tìm kiếm profile

---

### US2: Xem Highlight Kudos [P1]

**As a** Sunner
**I want to** xem TOP những kudos nổi bật nhất (nhiều tim nhất)
**So that** tôi biết được những lời cảm ơn được yêu thích nhất

#### Acceptance Scenarios

**Scenario 1: Hiển thị carousel**
- Given: User đang ở trang `/kudos`
- When: Scroll đến phần Highlight
- Then: Hiển thị carousel với tối đa 5 card kudos nổi bật, mỗi card gồm: thông tin người gửi/nhận, nội dung (max 3 dòng), hashtags, số tim, nút copy link, nút xem chi tiết (mở modal)

**Scenario 2: Điều hướng carousel**
- Given: Carousel đang hiển thị card 2/5
- When: Click nút tiến (→)
- Then: Trượt sang card 3/5, cập nhật pagination
- And: Ở card 5/5, nút tiến bị disable
- And: Ở card 1/5, nút lùi bị disable

**Scenario 3: Lọc theo Hashtag**
- Given: User đang xem Highlight Kudos
- When: Click dropdown "Hashtag" và chọn tag
- Then: Carousel lọc hiển thị chỉ các kudos có hashtag đã chọn

**Scenario 4: Lọc theo Phòng ban**
- Given: User đang xem Highlight Kudos
- When: Click dropdown "Phòng ban" và chọn phòng ban
- Then: Carousel lọc hiển thị chỉ các kudos thuộc phòng ban đã chọn

---

### US3: Xem Spotlight Board [P2]

**As a** Sunner
**I want to** xem word cloud/diagram tên người nhận Kudos
**So that** tôi thấy được bức tranh tổng thể ai được ghi nhận nhiều nhất

#### Acceptance Scenarios

**Scenario 1: Hiển thị Spotlight**
- Given: User đang ở trang `/kudos`
- When: Scroll đến phần Spotlight Board
- Then: Hiển thị tổng số "388 KUDOS" và word cloud tên người nhận (tên lớn = nhiều kudos hơn)

**Scenario 2: Pan/Zoom**
- Given: Spotlight Board đang hiển thị
- When: Click icon Pan/Zoom
- Then: Toggle chế độ pan/zoom cho board

**Scenario 3: Tìm kiếm trên Spotlight**
- Given: Spotlight Board đang hiển thị
- When: Nhập tên Sunner vào ô tìm kiếm
- Then: Highlight tên Sunner trên board

---

### US4: Xem All Kudos Feed [P1]

**As a** Sunner
**I want to** xem danh sách tất cả lời cảm ơn
**So that** tôi đọc được các kudos từ đồng nghiệp

#### Acceptance Scenarios

**Scenario 1: Hiển thị danh sách**
- Given: User đang ở trang `/kudos`
- When: Scroll đến phần All Kudos
- Then: Hiển thị danh sách card kudos, mỗi card gồm: thông tin người gửi/nhận (avatar, tên, số hoa thị, danh hiệu), thời gian, nội dung (max 5 dòng), ảnh đính kèm (max 5), hashtags, số tim, nút copy link

**Scenario 2: Thả tim**
- Given: User đang xem 1 kudo card
- When: Click icon trái tim
- Then: Tăng số tim lên 1, đổi icon sang màu đỏ (đã tim)
- And: Click lại → giảm số tim, đổi icon sang màu xám (chưa tim)

**Scenario 3: Copy link**
- Given: User đang xem 1 kudo card
- When: Click "Copy Link"
- Then: URL của kudo được copy vào clipboard, hiện toast "Link copied — ready to share!"

**Scenario 4: Xem profile**
- Given: User đang xem 1 kudo card
- When: Click avatar hoặc tên người gửi/nhận
- Then: Mở trang profile người đó
- And: Hover → hiển thị preview profile

**Scenario 5: Xem ảnh đính kèm**
- Given: Kudo có ảnh đính kèm
- When: Click ảnh thu nhỏ
- Then: Mở full ảnh (gallery mode nếu nhiều ảnh)

**Scenario 6: Click hashtag**
- Given: Kudo hiển thị hashtag (VD: "#Dedicated")
- When: Click hashtag
- Then: Lọc danh sách All Kudos theo hashtag đó

**Scenario 7: Infinite scroll / Load more**
- Given: Có nhiều hơn 1 page kudos
- When: User scroll đến cuối danh sách
- Then: Tự động load thêm kudos tiếp theo (infinite scroll) hoặc hiển thị nút "Xem thêm"
- And: Hiển thị skeleton loading trong khi đang fetch

**Scenario 8: Lọc theo hashtag category**
- Given: Kudo hiển thị hashtag category (VD: "IDOL GIỚI TRẺ")
- When: Click vào hashtag category
- Then: Lọc danh sách All Kudos để chỉ hiển thị các kudos thuộc category đó

---

### US5: Xem Thống Kê Cá Nhân [P1]

**As a** Sunner
**I want to** xem số liệu Kudos và Secret Box của mình
**So that** tôi biết tình trạng cá nhân trong phong trào

#### Acceptance Scenarios

**Scenario 1: Hiển thị thống kê**
- Given: User đã đăng nhập
- When: Xem sidebar phải
- Then: Hiển thị 5 thông số + nút mở quà:
  - Số Kudos bạn nhận được: {number}
  - Số Kudos bạn đã gửi: {number}
  - Số tim bạn nhận được: {number} (kèm icon 🔥x2 trang trí)
  - (divider)
  - Số Secret Box bạn đã mở: {number}
  - Số Secret Box chưa mở: {number}
- And: Số hiển thị format theo Vietnamese locale (VD: 1.000 thay vì 1,000)

**Scenario 2: Mở Secret Box**
- Given: User có Secret Box chưa mở
- When: Click nút "Mở Secret Box 🎁"
- Then: Mở dialog mở quà (linked frame: `1466:7676` - Open secret box)

---

### US6: Xem Danh Sách Sunner Nhận Quà [P2]

**As a** Sunner
**I want to** xem 10 Sunner vừa nhận quà mới nhất
**So that** tôi cập nhật ai mới nhận được quà

#### Acceptance Scenarios

**Scenario 1: Hiển thị danh sách**
- Given: User đang ở trang `/kudos`
- When: Xem sidebar phải
- Then: Hiển thị "10 SUNNER NHẬN QUÀ MỚI NHẤT" với danh sách gồm: avatar, tên, mô tả quà nhận được

**Scenario 2: Click profile**
- Given: Danh sách đang hiển thị
- When: Click tên/avatar Sunner
- Then: Mở trang profile Sunner đó

---

## 3. UI/UX Requirements

### Component List

| # | Component | Type | Description |
|---|-----------|------|-------------|
| A | KV Kudos (Hero Banner) | Server | Banner đầu trang với tiêu đề + logo KUDOS |
| A.1 | Button ghi nhận | Client | Ô nhập pill mở dialog gửi Kudos |
| A.2 | Search Sunner | Client | Ô tìm kiếm profile Sunner |
| B | Highlight Kudos Section | Client | Section với header, filters, carousel |
| B.1 | Section Header + Filters | Client | Title + dropdown Hashtag + dropdown Phòng ban |
| B.2 | Carousel | Client | Carousel 5 card, có nút prev/next |
| B.3 | Kudo Highlight Card | Client | Card hiển thị kudo nổi bật (có heart, copy link, xem chi tiết) |
| B.5 | Pagination | Client | Điều hướng 2/5 với nút prev/next |
| B.6 | Spotlight Header | Server | Section header cho Spotlight Board |
| B.7 | Spotlight Board | Client | Word cloud tương tác |
| C | All Kudos Section | Client | Section danh sách tất cả kudos |
| C.1 | All Kudos Header | Server | Section title |
| C.2 | Kudo Post Card | Client | Card hiển thị kudos đầy đủ |
| D | Right Sidebar | Server/Client | Thống kê + danh sách Sunner nhận quà |
| D.1 | Stats Container | Client | 6 thống kê + nút Mở quà |
| D.3 | Top Sunner List | Server | 10 Sunner nhận quà mới nhất |

### Layout Structure

Xem chi tiết trong `design-style.md` section Layout Structure (ASCII diagram).

**Key Layout:**
- Page width: 1440px (xl), responsive
- Content area: 1152px (with 144px horizontal padding)
- All Kudos section: 2-column layout — Left (680px posts) + Right (422px sidebar), gap 80px
- Carousel: horizontal scroll, 528px cards, fade gradients on edges

### Responsive Behavior (Constitution P4)

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Single column, sidebar below feed, carousel horizontal scroll, hero text smaller |
| Tablet (768px-1023px) | 2-column for feed+sidebar (narrower), carousel shows 1 card |
| Desktop (1024px-1439px) | Full layout, slightly compressed spacing |
| XL (>= 1440px) | Pixel-perfect match with Figma |

### Accessibility

- All interactive elements keyboard accessible
- `aria-live="polite"` on carousel and live feed
- `role="feed"` on All Kudos list
- `aria-label` on filter dropdowns, search inputs, and icon buttons
- Focus rings visible on all interactive elements
- Color contrast WCAG AA
- Image alt texts for avatars and attachments
- `aria-current="page"` on active nav link

---

## 4. Data Requirements

### Input Fields

| Field | Type | Required | Validation | Component |
|---|---|---|---|---|
| Hashtag filter | select | No | From DB | B.1.1 |
| Phòng ban filter | select | No | From DB | B.1.2 |
| Search Sunner | text | No | Min 2 chars | A.2, B.7.3 |

### Display Fields

| Field | Source | Format | Component |
|---|---|---|---|
| Kudos content | DB | Text, max 3-5 lines + ellipsis | B.3, C.2 |
| Sender/Receiver name | DB | String | B.3, C.2 |
| Sender/Receiver avatar | DB (Gmail) | URL | B.3, C.2 |
| Department | DB | String | B.3, C.2 |
| Star count (hoa thị) | DB | Number | B.3, C.2 |
| Department code | DB | String (VD: "CEVC10") | B.3, C.2 |
| Hero badge | DB | Enum (Legend Hero, Rising Hero, New Hero, etc.) | B.3, C.2 |
| Timestamp | DB | HH:mm - MM/DD/YYYY | B.3, C.2 |
| Hashtags | DB | Array of strings | B.3, C.2 |
| Heart count | DB | Number | B.3, C.2 |
| Attached images | DB | URL array, max 5 | C.2 |
| Hashtag category | DB | String | C.2 |
| Kudos received count | DB | Number | D.1 |
| Kudos sent count | DB | Number | D.1 |
| Hearts received count | DB | Number | D.1 |
| Secret Box opened | DB | Number | D.1 |
| Secret Box unopened | DB | Number | D.1 |
| Total Kudos | DB | Number | B.7 |
| Top 10 Sunner gifts | DB | Array | D.3 |

---

## 5. API Requirements (Predicted)

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/kudos` | GET | Load kudos feed (paginated, with filters) |
| `/api/kudos/highlights` | GET | Load top 5 highlighted kudos |
| `/api/kudos/spotlight` | GET | Load spotlight word cloud data |
| `/api/kudos/:id/heart` | POST | Toggle heart on a kudo |
| `/api/kudos/stats` | GET | Load personal stats (kudos/hearts/secret boxes) |
| `/api/kudos/top-receivers` | GET | Load top 10 Sunner gift receivers |
| `/api/hashtags` | GET | Load hashtag list for filter |
| `/api/departments` | GET | Load department list for filter |
| `/api/secret-box/open` | POST | Open a secret box |
| `/api/users/search` | GET | Search Sunner profiles |

### Query Parameters (GET /api/kudos)

| Param | Type | Description |
|---|---|---|
| `page` | number | Pagination page |
| `limit` | number | Items per page |
| `hashtag` | string | Filter by hashtag |
| `department` | string | Filter by department |
| `category` | string | Filter by hashtag category (VD: "IDOL GIỚI TRẺ") |

---

## 6. State Management

### Local Component State
- Carousel current slide index
- Filter dropdown open/close states
- Selected hashtag and department filters
- Heart toggle state per kudo (optimistic UI)
- Spotlight pan/zoom mode
- Search input value
- Feed pagination cursor / page number
- Loading states per section (initial load, pagination load, heart toggle)
- Toast message state (copy link feedback)
- Error states per API call (with retry capability)

### Server State (via API)
- Kudos feed list (paginated)
- Highlight kudos (top 5)
- Spotlight data
- Personal stats
- Top Sunner receivers
- Hashtag & department lists

### Cache Requirements
- Kudos feed: revalidate on new kudo posted or heart toggled
- Stats: revalidate on new kudo sent/received
- Highlight: revalidate every 60s
- Spotlight: revalidate every 60s
- Hashtags/Departments: cache for session duration

---

## 7. Navigation & Linked Frames

| Action | Target Frame | Route |
|---|---|---|
| Click "Xem chi tiết" (Highlight card) | — | Modal (hiển thị full kudo detail) |
| Click "Ghi nhận" input | `520:11602` (Viết Kudo) | Dialog/modal |
| Click "Mở Secret Box" | `1466:7676` (Open secret box) | Dialog/modal |
| Click avatar/name | `721:5827` (Profile) | `/profile/:id` |
| Click dropdown Hashtag | `1002:13013` (Dropdown list hashtag) | Overlay |
| Click dropdown Phòng ban | `721:5684` (Dropdown Phòng ban) | Overlay |
| Header "About SAA 2025" | `2167:9026` (Homepage) | `/` |
| Header "Award Information" | `313:8436` (Hệ thống giải) | `/awards` |
| Footer links | Same as header navigation | Various |

---

## 8. Edge Cases

- **No kudos yet:** Show empty state placeholder
- **Carousel < 5 items:** Show available items, disable unused pagination
- **Long content:** Truncate with ellipsis (3 lines highlight, 5 lines feed)
- **No images attached:** Hide image row
- **No Secret Box:** Disable "Mở quà" button, show count 0
- **User not in any department:** Show "—" for department
- **API error:** Show inline error message, retry button
- **Spotlight empty:** Show placeholder with "Chưa có dữ liệu"
- **Double-click heart:** Debounce, prevent duplicate API calls (optimistic UI)
- **Number formatting:** Use Vietnamese locale — period as thousands separator (1.000, not 1,000)
- **Hashtag overflow:** Max 5 hashtags on 1 line, truncate with "..." (both highlight card and post card)
- **Loading states:** Show skeleton cards while loading feed, skeleton stats while loading sidebar
- **All Kudos pagination:** Infinite scroll or "Xem thêm" button at bottom of feed
- **Hashtag category click:** Lọc danh sách theo category, không phải chức năng chỉnh sửa
- **🔥x2 icon trên tim:** Chỉ là UI trang trí, luôn hiển thị, không có logic bật/tắt
