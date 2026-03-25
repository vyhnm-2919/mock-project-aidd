# Tasks: Dropdown list hashtag

**Feature**: Dropdown list hashtag (`1002:13013`)
**Plan**: [plan.md](./plan.md)
**Spec**: [spec.md](./spec.md) | [design-style.md](./design-style.md)
**Created**: 2026-03-23

---

## Phase 1: Setup & Preparation

> Seed data, CSS utilities, and inline SVG constants. No story dependency.

- [x] T001 [P] Create seed migration `supabase/migrations/20260323_seed_hashtags.sql` — INSERT 13 hashtags (High-perorming, BE PROFESSIONAL, BE OPTIMISTIC, BE A TEAM, THINK OUTSIDE THE BOX, GET RISKY, GO FAST, WASSHOI, Toàn diện, Giỏi chuyên môn, Hiệu suất cao, Truyền cảm hứng, Cống hiến) with ON CONFLICT (name) DO NOTHING
- [x] T002 [P] Add `.scrollbar-dark` utility class to `src/app/globals.css` — webkit-scrollbar 4px width, transparent track, rgba(255,255,255,0.2) thumb with 2px radius, scrollbar-width: thin for Firefox
- [x] T003 Apply seed migration — run `make down && make up` to restart Supabase and apply new migration, verify 13 hashtags appear in DB

**Checkpoint**: `GET /api/hashtags` returns 13 hashtag names.

---

## Phase 2: Foundational — Props & Data Fetching

> Update the component interface and keep existing fetch logic. Blocking for all story phases.

- [x] T004 Update `HashtagSelectorProps` interface in `src/components/kudos/hashtag-selector.tsx` — add `disabled?: boolean` and `maxSelections?: number` (default 5). Replace hardcoded `5` with `const max = maxSelections ?? 5`. Keep existing `hashtags`, `onChange`, `label`, `maxLabel`, `error` props unchanged.
- [x] T005 Verify existing data fetch in `src/components/kudos/hashtag-selector.tsx` — keep `useEffect` fetching `/api/hashtags` on mount, storing result in `options` state. Add error handling: if fetch fails, set `options` to empty array (triggers empty state in US1-S7).

**Checkpoint**: Component compiles with new props, existing `write-kudo-modal.tsx` import still works (no breaking changes).

---

## Phase 3: US1 — Chọn hashtag (Core Multi-Select)

> **Goal**: User can open dropdown, select/deselect hashtags with toggle behavior, max 5 limit, click-outside to close.
> **Test criteria**: Open dropdown → see 13 items → click 3 to select (highlight + check) → click 1 to deselect → select 5 → 6th is disabled → click outside → closes → reopen → state preserved.

- [x] T006 [US1] Refactor trigger button in `src/components/kudos/hashtag-selector.tsx` — replace chip-based layout with: `<button>` containing inline Plus SVG icon (24x24, stroke #999) + two-line text (label + maxLabel), white bg, `border border-[#998C5F]`, rounded-lg. Trigger always visible regardless of selection count. Wire `onClick` to toggle `isOpen` state.
- [x] T007 [US1] Refactor dropdown panel in `src/components/kudos/hashtag-selector.tsx` — replace filtered-list popup with: `{isOpen && <div>}` panel showing ALL options (not just unselected). Dark bg `#00070C`, border `#998C5F`, rounded-lg, 6px padding. Render items as `<button role="option">` with `#` prefix + hashtag name. Position: `absolute top-full left-0 mt-1.5`, z-50.
- [x] T008 [US1] Implement toggle selection logic in `src/components/kudos/hashtag-selector.tsx` — replace `addTag`/`removeTag` with single `toggleTag(tag)`: if selected → remove from array, if not selected and count < max → add to array. Call `onChange` with new array. Dropdown stays open after toggle (remove `setOpen(false)` from selection handler).
- [x] T009 [US1] Implement selected item visual in `src/components/kudos/hashtag-selector.tsx` — selected items: `bg-[rgba(255,234,158,0.20)]` rounded-sm, inline Check SVG icon (24x24, circle + checkmark, stroke #998C5F) trailing with `shrink-0`. Unselected items: transparent bg, no icon. Both: `flex items-center justify-between min-h-[44px] md:min-h-[40px] px-4`.
- [x] T010 [US1] Implement max limit disable in `src/components/kudos/hashtag-selector.tsx` — when `hashtags.length >= max`: unselected items get `opacity-40 cursor-not-allowed pointer-events-none`. Selected items remain clickable for deselection. Use `const isMaxReached = hashtags.length >= max` and `const isDisabled = isMaxReached && !hashtags.includes(tag)`.
- [x] T011 [US1] Keep click-outside handling in `src/components/kudos/hashtag-selector.tsx` — preserve existing `useRef<HTMLDivElement>` + `mousedown` event listener pattern. Ensure ref wraps the entire component (trigger + panel).

**Checkpoint**: Full multi-select works visually — toggle, max limit, click-outside close.

---

## Phase 4: US2 — Hiển thị trạng thái chọn (Visual States)

> **Goal**: All interactive states (hover, focus, error, disabled, empty) render correctly.
> **Test criteria**: Hover unselected → subtle bg. Hover selected → brighter bg. Error prop → red border. Empty API → message. Disabled prop → grayed trigger.

- [x] T012 [P] [US2] Add trigger visual states in `src/components/kudos/hashtag-selector.tsx` — hover: `hover:bg-[rgba(255,234,158,0.10)]`. Open state: `data-[open]:bg-[rgba(255,234,158,0.15)]` (set `data-open` attribute when `isOpen`). Error: `data-[error]:border-[#EF4444]` (set `data-error` when `error` prop). Disabled: `disabled:opacity-60 disabled:cursor-not-allowed` (set `disabled` attribute when `disabled` prop).
- [x] T013 [P] [US2] Add item hover states in `src/components/kudos/hashtag-selector.tsx` — unselected hover: `hover:bg-white/5`. Selected hover: `hover:bg-[rgba(255,234,158,0.30)]`. Apply via conditional Tailwind classes based on `isSelected` boolean.
- [x] T014 [US2] Implement empty state in `src/components/kudos/hashtag-selector.tsx` — when `options.length === 0` and `isOpen`: show `<p>` with "Không có hashtag nào" centered in panel. Style: `font-montserrat text-sm font-normal text-[#999] py-4 text-center`.
- [x] T015 [US2] Add scrollbar and max-height to panel in `src/components/kudos/hashtag-selector.tsx` — add `max-h-[332px] overflow-y-auto scrollbar-dark` classes to dropdown panel div.

**Checkpoint**: All visual states match design-style.md. Error/disabled/empty states work.

---

## Phase 5: Accessibility & Keyboard Navigation

> **Goal**: Full ARIA roles, keyboard navigation, focus management, screen reader support.
> **Test criteria**: Tab to trigger → Enter opens → ArrowDown navigates → Enter selects → Escape closes → focus returns to trigger. VoiceOver announces "listbox", "option", selection state.

- [x] T016 Add ARIA attributes in `src/components/kudos/hashtag-selector.tsx` — trigger: `aria-haspopup="listbox"`, `aria-expanded={isOpen}`. Panel: `role="listbox"`, `aria-multiselectable="true"`, `aria-label={label}`. Items: `role="option"`, `aria-selected={isSelected}`, `aria-disabled={isDisabled}`.
- [x] T017 Add `focusedIndex` state and keyboard handler for trigger in `src/components/kudos/hashtag-selector.tsx` — `useState<number>(-1)`. Trigger `onKeyDown`: Enter/Space → toggle dropdown. ArrowDown → open and set focusedIndex to 0. Reset focusedIndex to -1 when dropdown closes.
- [x] T018 Add keyboard handler for panel in `src/components/kudos/hashtag-selector.tsx` — panel `onKeyDown`: ArrowDown → focusedIndex + 1 (wrap to 0). ArrowUp → focusedIndex - 1 (wrap to last). Enter/Space → toggleTag on focused item (skip if disabled). Escape → close and return focus to trigger. Prevent default on Space to avoid page scroll.
- [x] T019 Add focus management refs in `src/components/kudos/hashtag-selector.tsx` — `triggerRef = useRef<HTMLButtonElement>(null)`. `itemRefs = useRef<(HTMLButtonElement | null)[]>([])`. Set item refs via `ref={el => { itemRefs.current[index] = el }}`. On focusedIndex change: `itemRefs.current[focusedIndex]?.scrollIntoView({ block: "nearest" })`. Apply focused visual: `outline outline-1 outline-white/40 -outline-offset-1` on focused item.
- [x] T020 Add `aria-live` region in `src/components/kudos/hashtag-selector.tsx` — add visually-hidden `<span aria-live="polite" className="sr-only">` after panel. Update content to `${hashtags.length}/${max}` on every selection change.

**Checkpoint**: Full keyboard navigation works. Screen reader announces roles and selection count.

---

## Phase 6: Responsive & Polish

> **Goal**: Mobile-first responsive, final visual polish.
> **Test criteria**: At 375px: panel full-width, items 44px touch targets. At 768px+: panel 318px. At 1440px: matches Figma screenshot exactly.

- [x] T021 [P] Apply responsive panel width in `src/components/kudos/hashtag-selector.tsx` — panel classes: `w-full md:w-[318px]`. Wrapper div: `relative` positioning context. Verify panel doesn't overflow viewport on mobile.
- [x] T022 Final visual QA of `src/components/kudos/hashtag-selector.tsx` — compare rendered component against `assets/frame.png` at 1440px. Verify: trigger dimensions (116x48), panel width (318px), item height (40px), padding (6px panel, 16px items), border radius (8px panel/trigger, 2px selected items), colors match design tokens exactly.

**Checkpoint**: Component matches Figma design at all breakpoints. All acceptance scenarios pass.

---

## Phase 7: Bug Fixes

- [x] T023 Fix missing `leading-5` (20px line-height) on empty state text in `src/components/kudos/hashtag-selector.tsx` — added `leading-5` class to match `--text-empty-state` design token (Montserrat 14px/400/20px)

---

## Dependencies

```
Phase 1 (Setup) ──────────────────────────────────────────┐
  T001 [P] seed migration                                  │
  T002 [P] scrollbar CSS                                   │
  T003 apply migration (depends on T001)                   │
                                                           ▼
Phase 2 (Foundation) ─────────────────────────────────────┐
  T004 props interface                                     │
  T005 data fetch verification                             │
                                                           ▼
Phase 3 (US1: Core) ─────────────────────────────────────┐
  T006 trigger button                                      │
  T007 dropdown panel                                      │
  T008 toggle logic (depends on T006, T007)                │
  T009 selected visual (depends on T007)                   │
  T010 max limit (depends on T008)                         │
  T011 click-outside                                       │
                                                           ▼
Phase 4 (US2: States) ── can start after T006+T007 ─────┐
  T012 [P] trigger states                                  │
  T013 [P] item hover states                               │
  T014 empty state                                         │
  T015 scrollbar + max-height                              │
                                                           ▼
Phase 5 (Accessibility) ── depends on Phase 3+4 ─────────┐
  T016 ARIA attributes                                     │
  T017 trigger keyboard                                    │
  T018 panel keyboard (depends on T017)                    │
  T019 focus refs (depends on T017)                        │
  T020 aria-live                                           │
                                                           ▼
Phase 6 (Polish) ── depends on all above                   │
  T021 [P] responsive width                                │
  T022 visual QA                                           │
```

## Parallel Execution Opportunities

**Within Phase 1**: T001 and T002 can run in parallel (different files).
**Within Phase 3**: T006 and T007 touch the same file but different sections — can be done sequentially in one pass.
**Within Phase 4**: T012 and T013 can run in parallel (trigger vs items, same file but independent sections).
**Phase 3 + Phase 4 overlap**: T012/T013 can start as soon as T006/T007 are done (don't need to wait for T008-T011).
**Within Phase 6**: T021 can run in parallel with earlier polish tasks.

## Implementation Strategy

### MVP (Minimum Viable)
**Phases 1-3 (T001-T011)**: Core multi-select dropdown matching Figma design. This alone delivers a working, visually correct component. ~11 tasks.

### Full Feature
**Phases 4-6 (T012-T022)**: Visual states, accessibility, responsive polish. Adds production quality. ~11 tasks.

### Suggested Approach
Implement all 22 tasks in one pass since they all modify the same file (`hashtag-selector.tsx`). The phase structure is for logical grouping and testing checkpoints, not separate PRs.

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | 22 |
| Phase 1 (Setup) | 3 tasks |
| Phase 2 (Foundation) | 2 tasks |
| Phase 3 (US1: Core) | 6 tasks |
| Phase 4 (US2: States) | 4 tasks |
| Phase 5 (Accessibility) | 5 tasks |
| Phase 6 (Polish) | 2 tasks |
| Parallelizable tasks | 7 (marked [P]) |
| Files modified | 2 (`hashtag-selector.tsx`, `globals.css`) |
| Files created | 1 (`seed migration`) |
