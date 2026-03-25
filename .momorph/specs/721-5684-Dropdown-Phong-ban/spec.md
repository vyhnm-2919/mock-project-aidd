# Dropdown Phòng ban — Feature Specification

**Frame ID:** `721:5684`
**Frame Name:** Dropdown Phòng ban
**Status:** spec
**Figma File:** `9ypp4enmFmdK3YAFJLIu6C`
**Constitution:** v1.0.0

---

## 1. Overview

### Feature Name
Dropdown Phòng ban (Department Filter)

### Purpose
Dropdown menu hiển thị danh sách phòng ban để lọc Kudos. User chọn 1 phòng ban → Kudos được lọc theo phòng ban người gửi/nhận.

### Target Users
- Nhân viên Sun* đã đăng nhập

### Business Context
- Mở từ nút "Phòng ban ▼" trên section header Highlight Kudos
- Lọc carousel/feed theo phòng ban đã chọn
- Component con của `DepartmentFilter` trong màn Kudos Live Board

---

## 2. User Stories

### US1: Chọn Phòng ban Filter [P1]

**As a** Sunner
**I want to** chọn 1 phòng ban từ dropdown
**So that** tôi xem được các Kudos liên quan đến phòng ban đó

#### Acceptance Scenarios

**Scenario 1: Mở dropdown**
- Given: User click nút "Phòng ban ▼"
- When: Dropdown mở
- Then: Hiển thị danh sách ~50 phòng ban, mục đang chọn highlight (gold glow)

**Scenario 2: Chọn phòng ban**
- Given: Dropdown đang mở
- When: Click vào 1 phòng ban (VD: "CEVC2")
- Then: Phòng ban đó highlight, dropdown đóng, filter áp dụng

**Scenario 3: Bỏ chọn (reset)**
- Given: Đã chọn 1 phòng ban
- When: Click "Tất cả" hoặc click lại phòng ban đã chọn
- Then: Bỏ filter, hiển thị tất cả

**Scenario 4: Scroll danh sách dài**
- Given: 50 phòng ban > viewport
- When: Scroll
- Then: Danh sách cuộn trong dropdown (max-height giới hạn)

---

## 3. Data — ~50 Department Options

Danh sách phòng ban từ Figma (trích):
CTO, SPD, FCOV, CEVC1, CEVC2, STVC - R&D, CEVC2 - CySS, FCOV - LRM, CEVC2 - System, OPDC - HRF, CEVC1 - DSV - UI/UX 1, CEVC1 - DSV, CEVEC, OPDC - HRD - C&C, STVC, FCOV - F&A, CEVC1 - DSV - UI/UX 2, CEVC1 - AIE, OPDC - HRF - C&B, FCOV - GA, FCOV - ISO, STVC - EE, GEU - HUST, CEVEC - SAPD, OPDC - HRF - OD, CEVEC - GSD, GEU - TM, STVC - R&D - DTR, STVC - R&D - DPS, CEVC3, STVC - R&D - AIR, CEVC4, PAO, GEU, GEU - DUT, OPDC - HRD - L&D, OPDC - HRD - TI, OPDC - HRF - TA, GEU - UET, STVC - R&D - SDX, OPDC - HRD - HRBP, PAO - PEC, IAV, STVC - Infra, CPV - CGP, GEU - UIT, OPDC - HRD, BDV, CPV, PAO - PAO

---

## 4. API Requirements

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/departments` | GET | Load department list (existing) |

---

## 5. State Management

### Local
- Selected department code (string | null)
- Dropdown open/close

### Parent Integration
- `onSelect(code: string | null)` callback to parent filter component

---

## 6. Accessibility
- `role="listbox"`, `aria-label="Chọn phòng ban"`
- Items: `role="option"`, `aria-selected`
- Keyboard: Arrow up/down, Enter, Escape
