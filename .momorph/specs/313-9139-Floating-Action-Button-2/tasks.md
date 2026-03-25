# Tasks: Floating Action Button — Expanded State

**Frame**: `313:9139` (related: `313:9137` collapsed state)
**Spec**: `spec.md` | **Plan**: `plan.md` | **Design**: `design-style.md`
**Status**: All tasks complete (retrospective — feature already implemented)

---

## Phase 1: Setup

- [x] T001 Create `FabTranslations` interface in `src/types/fab.ts`
- [x] T002 Add FAB translation data (VI/EN) and `getFabTranslations()` in `src/utils/i18n.ts`
- [x] T003 Pass FAB translations as prop from server layout in `src/app/(main)/layout.tsx`

## Phase 2: Foundational — Assets & Icons

- [x] T004 [P] Verify `pen.svg` icon exists in `public/images/icons/pen.svg`
- [x] T005 [P] Verify `saa-icon.svg` icon exists in `public/images/icons/saa-icon.svg`
- [x] T006 Confirm close icon approach as inline SVG (no external asset needed)

## Phase 3: US1 — View Expanded Menu

> **Goal**: Display 3 action buttons in a vertical flex-end column with slide-up animation when FAB is expanded.
> **Test criteria**: Clicking FAB trigger shows expanded container with "The le", "Viet KUDOS", and close buttons, right-aligned, with 20px gap.

- [x] T007 [US1] Implement expanded state container with `flex flex-col items-end gap-5` layout in `src/components/widget-button.tsx`
- [x] T008 [US1] Create "The le" action button as `<Link href="/rules">` with SAA icon + label in `src/components/widget-button.tsx`
- [x] T009 [US1] Create "Viet KUDOS" action button as `<Link href="/kudos/write">` with pen icon + label in `src/components/widget-button.tsx`
- [x] T010 [US1] Create close button with inline SVG X icon and `bg-[#D4271D] rounded-full` in `src/components/widget-button.tsx`
- [x] T011 [US1] Apply both-in-DOM animation strategy (opacity + translateY + pointer-events, 200ms ease-out) in `src/components/widget-button.tsx`
- [x] T012 [US1] Style action buttons per design tokens: `bg-[#FFEA9E] rounded-[4px] px-4 py-4` with hover/active/focus-visible states in `src/components/widget-button.tsx`

## Phase 4: US2 — Navigate to The le

> **Goal**: "The le" button navigates to `/rules` and FAB auto-closes on route change.
> **Test criteria**: Clicking "The le" navigates to `/rules`; hover shows `#FFE078` background; Enter/Space triggers navigation.

- [x] T013 [US2] Wire "The le" `<Link>` to `/rules` route in `src/components/widget-button.tsx`
- [x] T014 [US2] Add hover state `hover:bg-[#FFE078]` and active state `active:scale-[0.98]` to "The le" button in `src/components/widget-button.tsx`

## Phase 5: US3 — Navigate to Viet KUDOS

> **Goal**: "Viet KUDOS" button navigates to `/kudos/write` and FAB auto-closes on route change.
> **Test criteria**: Clicking "Viet KUDOS" navigates to `/kudos/write`; hover shows `#FFE078` background; Enter/Space triggers navigation.

- [x] T015 [US3] Wire "Viet KUDOS" `<Link>` to `/kudos/write` route in `src/components/widget-button.tsx`
- [x] T016 [US3] Add hover state `hover:bg-[#FFE078]` and active state `active:scale-[0.98]` to "Viet KUDOS" button in `src/components/widget-button.tsx`

## Phase 6: US4 — Dismiss FAB Menu

> **Goal**: FAB can be dismissed via close button, click outside, Escape key, or route change.
> **Test criteria**: All 4 dismiss methods work; focus returns to trigger on close/Escape; rapid toggle doesn't break animation.

- [x] T017 [US4] Implement `isExpanded` toggle state with `useState(false)` and `handleToggle`/`handleClose` callbacks in `src/components/widget-button.tsx`
- [x] T018 [US4] Add click-outside dismiss via `mousedown` listener checking `containerRef.contains()` in `src/components/widget-button.tsx`
- [x] T019 [US4] Add Escape key dismiss with focus return to `triggerRef` in `src/components/widget-button.tsx`
- [x] T020 [US4] Close on route change via `usePathname()` effect in `src/components/widget-button.tsx`

## Phase 7: Accessibility & Responsive

- [x] T021 Add `role="group"` and `aria-label` to FAB container in `src/components/widget-button.tsx`
- [x] T022 Add `aria-expanded` and `aria-haspopup="true"` to trigger button in `src/components/widget-button.tsx`
- [x] T023 Manage `tabIndex` (-1 when hidden, 0 when visible) for all action buttons in `src/components/widget-button.tsx`
- [x] T024 Auto-focus first action (`firstActionRef`) on expand in `src/components/widget-button.tsx`
- [x] T025 Add `aria-label` for close button using `translations.closeLabel` in `src/components/widget-button.tsx`
- [x] T026 Apply responsive positioning `right-4 bottom-4 md:right-6 md:bottom-6 lg:right-8 lg:bottom-8 xl:right-[143px] xl:bottom-[120px]` in `src/components/widget-button.tsx`

## Phase 8: Visual Verification & E2E Tests

- [ ] T027 Visual verification: capture Playwright screenshots at 375/768/1024/1440px and compare against Figma frame `313:9139`
- [ ] T028 E2E test: click FAB trigger → verify expanded menu appears with 3 buttons
- [ ] T029 E2E test: click "The le" → verify navigation to `/rules`
- [ ] T030 E2E test: click "Viet KUDOS" → verify navigation to `/kudos/write`
- [ ] T031 E2E test: click close button → verify collapsed state restored
- [ ] T032 E2E test: click outside FAB → verify auto-close
- [ ] T033 E2E test: press Escape → verify auto-close + focus return to trigger
- [ ] T034 E2E test: navigate away → verify auto-close

---

## Dependencies

```
T001 → T002 → T003 (setup chain)
T004, T005, T006 (parallel, no deps)
T007 → T008-T012 (expanded UI, after setup)
T013-T014 (US2, after T008)
T015-T016 (US3, after T009)
T017-T020 (US4, after T007+T010)
T021-T026 (a11y/responsive, after T017)
T027-T034 (verification, after all implementation)
```

## Parallel Execution Opportunities

| Group | Tasks | Rationale |
|-------|-------|-----------|
| Assets | T004, T005, T006 | Independent verification tasks |
| US2 + US3 | T013-T014, T015-T016 | Different buttons, no shared state |
| A11y attrs | T021, T022, T025 | Independent ARIA attributes |
| E2E tests | T028-T034 | Independent test scenarios |

## Implementation Strategy

- **MVP**: Phases 1-3 (Setup + Assets + US1) — expanded menu renders with animation
- **Core**: + Phases 4-6 (US2-US4) — full navigation and dismiss behavior
- **Complete**: + Phase 7 (a11y/responsive) — production-ready
- **Verified**: + Phase 8 (E2E) — tested and verified

## Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| Setup | T001-T003 | Done |
| Assets | T004-T006 | Done |
| US1 Expanded Menu | T007-T012 | Done |
| US2 The le | T013-T014 | Done |
| US3 Viet KUDOS | T015-T016 | Done |
| US4 Dismiss | T017-T020 | Done |
| A11y & Responsive | T021-T026 | Done |
| Verification & E2E | T027-T034 | Pending |

**Total: 34 tasks — 26 complete, 8 pending (E2E/visual verification)**
