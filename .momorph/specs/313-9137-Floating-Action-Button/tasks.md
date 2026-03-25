# Tasks: Floating Action Button (FAB)

**Frame**: `313:9137` / `313:9139`
**Spec**: `spec.md` | **Plan**: `plan.md` | **Design**: `design-style.md`

---

## Phase 1: Setup

- [x] T001 Create FAB translations type in `src/types/fab.ts`
- [x] T002 Add FAB translation data and getter in `src/utils/i18n.ts`
- [x] T003 Update main layout to pass FAB translations in `src/app/(main)/layout.tsx`

## Phase 2: Foundational — Assets & Icons

- [x] T004 Verify icon assets exist: `pen.svg`, `saa-icon.svg` in `public/images/icons/`
- [x] T005 Confirm close icon approach (inline SVG)

## Phase 3: US1 — Collapsed FAB (Trigger Button)

- [x] T006 [US1] Create WidgetButton client component shell in `src/components/widget-button.tsx`
- [x] T007 [US1] Implement collapsed trigger button with pen + "/" + SAA icons
- [x] T008 [US1] Apply collapsed styles: bg-[#FFEA9E], rounded-full, shadow, position fixed
- [x] T009 [US1] Add hover/active/focus-visible states per design-style.md

## Phase 4: US2 — Expanded FAB (Action Buttons)

- [x] T010 [US2] Implement expanded state container with flex-col layout
- [x] T011 [US2] Create "Thể lệ" action button linking to `/rules`
- [x] T012 [US2] Create "Viết KUDOS" action button linking to `/kudos/write`
- [x] T013 [US2] Create close button with inline SVG X icon and red bg
- [x] T014 [US2] Apply both-in-DOM animation strategy (opacity + translate + pointer-events)

## Phase 5: US3 — Toggle & Dismiss Behavior

- [x] T015 [US3] Implement toggle state with useState
- [x] T016 [US3] Add click-outside dismiss via mousedown listener
- [x] T017 [US3] Add Escape key dismiss with focus return to trigger
- [x] T018 [US3] Close on route change via usePathname

## Phase 6: US4 — Accessibility

- [x] T019 [US4] Add aria-expanded, aria-haspopup, aria-label, role="group"
- [x] T020 [US4] Manage tabIndex (-1 when hidden) and auto-focus first action on expand

## Phase 7: Polish — Font Bug Fixes

- [x] T021 Fix footer font: change links and copyright from `font-montserrat text-base font-bold leading-6` to `font-montserrat-alt text-sm font-normal leading-5 tracking-[0.1px]` in `src/components/footer/main-footer.tsx`
- [x] T022 Fix kudos description font weight: change `font-bold` to `font-normal` in `src/components/homepage/sun-kudos-section.tsx`

## Dependencies

```
T001 → T002 → T003 (setup chain)
T004, T005 (parallel, no deps)
T006 → T007-T009 (collapsed FAB)
T010 → T011-T014 (expanded FAB)
T015-T018 (behavior, after T006+T010)
T019-T020 (a11y, after T015)
T021-T022 (font fixes, independent)
```

## Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| Setup | T001-T003 | Done |
| Assets | T004-T005 | Done |
| US1 Collapsed | T006-T009 | Done |
| US2 Expanded | T010-T014 | Done |
| US3 Behavior | T015-T018 | Done |
| US4 A11y | T019-T020 | Done |
| Font Fixes | T021-T022 | Done |

**Total: 22 tasks — All complete**
