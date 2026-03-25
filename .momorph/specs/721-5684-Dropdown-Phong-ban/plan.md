# Implementation Plan: Dropdown Phòng ban

**Frame:** `721:5684` — Dropdown Phòng ban
**Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-16

---

## Status: ALREADY IMPLEMENTED

Component `DepartmentFilter` đã tồn tại tại `src/components/kudos/department-filter.tsx` — được implement trong Kudos Live Board (T029).

---

## Visual Refinement Needed

So sánh implementation hiện tại với design-style.md:

| Property | Design Spec | Current Code | Match? |
|----------|------------|--------------|--------|
| Container bg | `#00070C` | `bg-[#00101A]` | **Cần sửa** → `bg-[#00070C]` |
| Container border | `1px solid #998C5F` | `border border-[#998C5F]` | OK |
| Container radius | 8px | `rounded-lg` (8px) | OK |
| Container padding | 6px | Không có | **Cần thêm** `p-1.5` |
| Item height | 56px | Auto | **Cần thêm** min-height |
| Item padding | 16px | `px-4 py-3` (12px) | **Cần sửa** → `p-4` |
| Item radius | 4px | Không có | **Cần thêm** `rounded` |
| Item text | Montserrat 16px/700, ls 0.5px | `text-sm font-bold` (14px) | **Cần sửa** → `text-base tracking-[0.5px]` |
| Selected bg | `rgba(255,234,158,0.10)` | `text-[#FFEA9E]` (text only) | **Cần thêm** bg + glow |
| Selected glow | `text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Không có | **Cần thêm** |
| Hover bg | `rgba(255,234,158,0.10)` | `hover:bg-[rgba(255,234,158,0.10)]` | OK |

---

## Project Structure

### Modified Files

| File | Changes |
|------|---------|
| `src/components/kudos/department-filter.tsx` | Fix: container bg `#00070C`, padding 6px, item padding 16px, item text 16px/0.5px, selected bg + glow shadow, item border-radius 4px |
| `src/components/kudos/hashtag-filter.tsx` | Same fixes — cùng visual pattern. Container bg, padding, item styles, selected glow |

### No New Files

Không cần file mới — chỉ sửa style 2 existing components.

---

## Implementation Approach

### Phase 1: Visual Fix (2 tasks)

> Sửa cả `department-filter.tsx` và `hashtag-filter.tsx` cho khớp pixel-perfect với design-style.md (cùng visual pattern).

**Total: 2 tasks**

---

## Open Questions

None — straightforward style fix.
