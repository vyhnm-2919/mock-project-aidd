# Tasks: Dropdown Ngôn ngữ (Language Selector)

**Frame:** `721:4942` — Dropdown-ngôn ngữ
**Plan:** `plan.md`
**Created:** 2026-03-25

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | 5 |
| US1 tasks | 2 |
| US2 tasks | 1 |
| Verify tasks | 2 |
| Parallel opportunities | T002 + T003 (different elements in same file) |
| MVP scope | T001 → T002 + T003 → T004 + T005 |

---

## Phase 1: Visual Update — Dropdown Panel [US1]

**Goal:** Update dropdown container styling to match Figma design (golden border, solid bg, proper spacing).

**Independent test criteria:** Open language dropdown → container has dark solid background `#00070C`, golden border `#998C5F`, 8px radius, 6px padding, z-index 50.

- [x] T001 [US1] Update `<ul>` dropdown panel classes in `src/components/header/language-selector.tsx` — Replace class string from `"absolute top-full right-0 mt-1 min-w-[160px] bg-[rgba(11,15,18,0.95)] backdrop-blur-[10px] rounded border border-[#2E3940] overflow-hidden"` to `"absolute top-full right-0 mt-1 z-50 bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col"`

## Phase 2: Visual Update — Dropdown Items [US1 + US2]

**Goal:** Update item styling (content, typography, spacing, states) to match Figma design.

**Independent test criteria:**
- US1: Items show flag icon (24x24) + code ("VN"/"EN") with Montserrat 16px bold, 56px height, 16px padding, 4px gap.
- US2: Selected item has golden background `rgba(255,234,158,0.20)` with 2px radius. Non-selected item is transparent.

- [x] T002 [P] [US1] Update `<li>` item layout and content in `src/components/header/language-selector.tsx` — Apply ALL of the following changes to each `<li>`: (1) Change displayed text from `{lang.label}` to `{lang.value.toUpperCase()}`, (2) Add `aria-label={lang.label}` to `<li>` for screen reader accessibility, (3) Change text `<span>` classes from `"text-sm font-medium text-white"` to `"font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white"`, (4) Change flag `<Image>` props from `width={20} height={15}` to `width={24} height={24}` and add `className="w-6 h-6"`, (5) Change item gap from `gap-3` to `gap-1`, (6) Change item padding from `px-4 py-3` to `p-4`, (7) Add `h-14` for 56px fixed height

- [x] T003 [P] [US2] Update `<li>` item interactive states in `src/components/header/language-selector.tsx` — Change selected state from `bg-white/5` to `bg-[rgba(255,234,158,0.20)] rounded-sm`. Change hover/focus state from `bg-white/10` to `bg-[rgba(255,234,158,0.10)] rounded`. Ensure focused item (keyboard nav) also uses golden tint `bg-[rgba(255,234,158,0.10)] rounded` instead of `bg-white/10`

## Phase 3: Verification

**Goal:** Ensure no regressions and visual match with Figma.

- [x] T004 Run `yarn lint` on `src/components/header/language-selector.tsx` — ESLint must pass with zero warnings (Constitution Principle 7)

- [x] T005 Manual verification checklist for `src/components/header/language-selector.tsx`: (1) Visual: compare browser with `.momorph/specs/721-4942-Dropdown-ngon-ngu/assets/frame.png`, (2) Keyboard: Arrow Up/Down, Enter, Space, Escape all work, (3) Click-outside: dropdown closes, (4) Locale switch: VN→EN→VN via cookie + reload, (5) Screen reader: `aria-label` reads "Tiếng Việt"/"English", (6) Trigger button: no visual regression, (7) Mobile 375px: dropdown stays in viewport

---

## Dependencies

```
T001 (panel) ──┐
               ├──→ T004 (lint) ──→ T005 (verify)
T002 (items)  ─┤
T003 (states) ─┘
```

- T001 can run first (panel container)
- T002 + T003 can run in parallel after T001 (different concerns within `<li>`)
- T004 + T005 run after all code changes complete

## Parallel Execution

| Parallel Group | Tasks | Reason |
|---------------|-------|--------|
| Group A | T002 + T003 | T002 handles layout/content, T003 handles interactive states — both modify `<li>` but different class concerns |

## Implementation Strategy

**MVP:** T001 → T002 + T003 → T004 + T005

This is a single-file visual update. All 3 code tasks (T001-T003) modify `src/components/header/language-selector.tsx`. The entire feature can be delivered in one commit:

```
style(header): update language selector dropdown to match Figma design
```

---

## Phase 4: Bug Fix — Footer Font

- [x] T006 Fix footer nav links font in `src/components/footer/main-footer.tsx` — Change from `font-montserrat text-base font-bold leading-6 tracking-[0.15px]` (Montserrat 16px/700/24px) to `font-montserrat-alt text-sm font-normal leading-5 tracking-[0.1px]` (Montserrat Alternates 14px/400/20px) per design-style.md Footer Links spec
- [x] T007 Fix footer copyright font size/weight in `src/components/footer/main-footer.tsx` — Change from `text-base font-bold leading-6` (16px/700/24px) to `text-sm font-normal leading-5` (14px/400/20px) per design-style.md Copyright spec
