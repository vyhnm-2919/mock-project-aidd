# Tasks: Dropdown Phòng ban

**Frame:** `721:5684` — Dropdown Phòng ban
**Spec:** `spec.md` | **Plan:** `plan.md` | **Design:** `design-style.md`
**Created:** 2026-03-16

---

## Summary

| Metric | Value |
|---|---|
| Total Tasks | 2 |
| Phase 1 (US1 — Visual Fix) | 2 tasks |
| Parallel Opportunities | T001 + T002 parallel (different files) |

---

## Phase 1: US1 — Visual Fix to Match Design

> **Goal:** Fix dropdown panel styles in both filter components to match Figma pixel-perfect.
> **Independent test:** Open Hashtag/Phòng ban dropdown → container bg `#00070C`, items 56px height, 16px padding, selected item has gold bg + text glow.

- [x] T001 [P] [US1] Fix `src/components/kudos/department-filter.tsx` — Dropdown panel: change container bg from `bg-[#00101A]` to `bg-[#00070C]`, add `p-1.5` (6px padding). Each item: change from `px-4 py-3` to `p-4` (16px all sides), add `rounded` (4px border-radius), change text from `text-sm` to `text-base tracking-[0.5px]` (16px, letter-spacing 0.5px). Selected item: add `bg-[rgba(255,234,158,0.10)]` background + `[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` gold glow. "Tất cả" reset item: same text size fix.
- [x] T002 [P] [US1] Fix `src/components/kudos/hashtag-filter.tsx` — Same visual fixes as T001 (cùng design pattern): container bg `#00070C` + `p-1.5`, item `p-4 rounded text-base tracking-[0.5px]`, selected bg + glow shadow.

**Checkpoint:** Both dropdowns match Figma: dark bg `#00070C`, items 16px text with 0.5px spacing, selected item gold bg + glow.

---

## Dependencies

```
T001 + T002 (parallel) → Done
```

No dependencies — both tasks are independent file edits.
