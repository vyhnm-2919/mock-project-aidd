# Tasks: Open Secret Box — chưa mở

**Feature**: Open Secret Box (`1466:7676`)
**Plan**: [plan.md](./plan.md)
**Spec**: [spec.md](./spec.md) | [design-style.md](./design-style.md)
**Created**: 2026-03-23

---

## Phase 1: Setup — Assets, API, Types, Translations

> Prepare all prerequisites before building the modal component.

- [x] T001 [P] Download gift box image from Figma via MoMorph `get_media_files` (node `1466:7686`, MM_MEDIA_box quà chưa mở) → save to `public/images/kudos/secret-box-unopened.png` (558x558, PNG/WebP)
- [x] T002 [P] Download light effect overlay from Figma via MoMorph `get_media_files` (node `1466:7685`, MM_MEDIA_hiệu ứng box quà) → save to `public/images/kudos/secret-box-effect.png` (547x547, transparent PNG)
- [x] T003 [P] Create `src/app/api/secret-box/unopened/route.ts` — GET endpoint: auth check via `createClient()`, query `secret_boxes` where `user_id = user.id` and `is_opened = false`, return `{ data: SecretBox[] }`. Follow pattern from `src/app/api/hashtags/route.ts`.
- [x] T004 [P] Add 4 translation fields to `KudosTranslations` interface in `src/types/kudos.ts`: `secretBoxTitle: string`, `secretBoxInstruction: string`, `secretBoxUnopenedLabel: string`, `secretBoxError: string`
- [x] T005 Add translation values to `src/utils/i18n.ts` — VN: `secretBoxTitle: "KHÁM PHÁ SECRET BOX CỦA BẠN"`, `secretBoxInstruction: "Click vào box để mở"`, `secretBoxUnopenedLabel: "Secretbox chưa mở"`, `secretBoxError: "Không thể mở secret box. Vui lòng thử lại."` — EN: equivalent English translations. Depends on T004.

**Checkpoint**: GET `/api/secret-box/unopened` returns `{ data: [] }` (empty, since no test data). TypeScript compiles with new translation keys.

---

## Phase 2: Foundational — Modal Shell

> Create the modal component with layout, open/close behavior, and data fetching. No open-box logic yet.

- [x] T006 Create `src/components/kudos/secret-box-modal.tsx` with props interface: `isOpen: boolean`, `onClose: () => void`, `onOpened: (result: OpenSecretBoxResponse) => void`, `translations: KudosTranslations`. Return `null` when `!isOpen`. Follow `write-kudo-modal.tsx` pattern: fixed overlay `z-[200]`, backdrop `bg-[rgba(0,16,26,0.8)]`, click backdrop to close (`onClick` + `stopPropagation`).
- [x] T007 Add Escape key handler and body scroll lock in `src/components/kudos/secret-box-modal.tsx` — `useEffect` attaching `keydown` listener for Escape → `onClose()`. Set `document.body.style.overflow = "hidden"` on mount, restore on cleanup. Same pattern as `write-kudo-modal.tsx` lines 34-45.
- [x] T008 Add `useEffect` fetch in `src/components/kudos/secret-box-modal.tsx` — on `isOpen` becoming true, fetch `GET /api/secret-box/unopened`, store result in `const [boxes, setBoxes] = useState<SecretBox[]>([])`. Derive `count = boxes.length`. Re-fetch when `isOpen` changes to true (reset state on each open).

**Checkpoint**: Modal opens/closes correctly. Escape and backdrop click work. Fetch fires on open (returns empty for now).

---

## Phase 3: US1 — Mở Secret Box (Core UI + Logic)

> **Goal**: User sees the full modal UI matching Figma design and can click box to open.
> **Test criteria**: Open modal → see title + gift box image + instruction + count → click box → loading state → result displayed → count decrements.

- [x] T009 [US1] Build title bar in `src/components/kudos/secret-box-modal.tsx` — row layout: title text (`translations.secretBoxTitle`, Montserrat 26px/700, color `#FFEA9E`, `text-center flex-1`) + close button (19x19 inline SVG ✕, white, `hover:opacity-70`, `aria-label` from translations). Close button calls `onClose`.
- [x] T010 [US1] Build dividers + instruction text in `src/components/kudos/secret-box-modal.tsx` — two `<div className="w-full h-px bg-[#2E3940]">` dividers. Instruction text (`translations.secretBoxInstruction`, Montserrat 13px/700 white, `tracking-[0.4px]`, `text-center`). Hide instruction when `count === 0`.
- [x] T011 [US1] Build box image area in `src/components/kudos/secret-box-modal.tsx` — `next/image` for `secret-box-unopened.png` (fill container, `aspect-square`, `max-w-[557px]`). Overlay light effect image on top with absolute positioning. Wrap in clickable div with `role="button"`, `tabIndex={0}`, `aria-label="Mở secret box"`.
- [x] T012 [US1] Build footer count in `src/components/kudos/secret-box-modal.tsx` — row layout: label (`translations.secretBoxUnopenedLabel`, Montserrat 13px/700 white, `tracking-[0.4px]`) + count number (Montserrat 29px/700 `#FFEA9E`, 2-digit padded via `String(count).padStart(2, '0')`). Gap 6px between.
- [x] T013 [US1] Implement click-to-open handler in `src/components/kudos/secret-box-modal.tsx` — on box click: set `isOpening = true`, call `POST /api/secret-box/open` with `{ box_id: boxes[0].id }`. On success: set `result = response.gift_description`, remove opened box from `boxes` array, call `onOpened(response)`. On error: set `error = translations.secretBoxError`. Finally: set `isOpening = false`.
- [x] T014 [US1] Implement visual states for box image in `src/components/kudos/secret-box-modal.tsx` — default: `cursor-pointer hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] transition-transform`. Disabled (count=0): `opacity-50 cursor-not-allowed` + `aria-disabled="true"`. Loading: `opacity-70 animate-pulse cursor-wait` + ignore clicks. Apply via conditional classes based on `isOpening`, `count`.
- [x] T015 [US1] Implement success display in `src/components/kudos/secret-box-modal.tsx` — when `result` is set, replace instruction text with gift description (Montserrat 13px/700, `#FFEA9E`). If `boxes.length > 0` after open, allow clicking again. If `boxes.length === 0`, disable box and hide instruction.
- [x] T016 [US1] Implement error display in `src/components/kudos/secret-box-modal.tsx` — when `error` is set, show error message in instruction area (Montserrat 13px/700, `#EF4444`). Box re-enabled for retry. Clear error on next click attempt.

**Checkpoint**: Full modal works — open, click box, see result, count updates. Error retry works. Disabled at 0 boxes.

---

## Phase 4: US2 — Hiển thị thông tin + Parent Integration

> **Goal**: Wire modal to parent `kudos-stats.tsx`. Stats refresh after opening.
> **Test criteria**: Click "Mở Secret Box" button → modal opens → open a box → close modal → sidebar stats updated.

- [x] T017 [US2] Wire modal in `src/components/kudos/kudos-stats.tsx` — add `import { SecretBoxModal } from "./secret-box-modal"`. Add `const [isSecretBoxOpen, setIsSecretBoxOpen] = useState(false)`. Replace TODO in `handleOpenSecretBox`: `setIsSecretBoxOpen(true)`.
- [x] T018 [US2] Add `onOpened` callback in `src/components/kudos/kudos-stats.tsx` — create `handleBoxOpened` function that re-fetches stats from `/api/kudos/stats` to update `secret_box_opened` and `secret_box_unopened` counts in sidebar.
- [x] T019 [US2] Render `<SecretBoxModal>` in `src/components/kudos/kudos-stats.tsx` JSX — pass `isOpen={isSecretBoxOpen}`, `onClose={() => setIsSecretBoxOpen(false)}`, `onOpened={handleBoxOpened}`, `translations={translations}`.

**Checkpoint**: Full end-to-end flow from sidebar button → modal → open box → sidebar stats refresh.

---

## Phase 5: Accessibility & Polish

> **Goal**: ARIA roles, keyboard navigation, focus trap, responsive.
> **Test criteria**: Tab navigates close→box. Enter/Space opens box. Escape closes. VoiceOver announces dialog. Mobile layout correct.

- [x] T020 Add ARIA attributes to modal in `src/components/kudos/secret-box-modal.tsx` — dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="secret-box-title"`. Title: `id="secret-box-title"`. Close: `aria-label` from translations.
- [x] T021 Add focus trap in `src/components/kudos/secret-box-modal.tsx` — on open, focus close button. Tab cycles between close button and box image only. Shift+Tab reverses. Prevent focus from leaving modal.
- [x] T022 Add keyboard handler for box image in `src/components/kudos/secret-box-modal.tsx` — `onKeyDown`: Enter/Space triggers open (same as click). Prevent default on Space to avoid scroll.
- [x] T023 Apply responsive styles in `src/components/kudos/secret-box-modal.tsx` — modal container: `w-full mx-4 md:mx-auto md:max-w-[652px] max-h-[calc(100vh-2rem)] overflow-y-auto`. Box image: `w-full max-w-[557px]`. Verify at 375px, 768px, 1440px.
- [x] T024 Final visual QA of `src/components/kudos/secret-box-modal.tsx` — compare against `assets/frame.png`. Verify: modal bg `#00101A`, border-radius 13px, title color `#FFEA9E` 26px, dividers `#2E3940`, instruction 13px white, footer layout, count formatting "05".

**Checkpoint**: Fully accessible, responsive, pixel-perfect modal.

---

## Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────────┐
  T001 [P] download box image                             │
  T002 [P] download effect image                          │
  T003 [P] create GET endpoint                            │
  T004 [P] add translation types                          │
  T005 add translation values (depends on T004)           │
                                                          ▼
Phase 2 (Foundation) ────────────────────────────────────┐
  T006 modal shell (depends on T004, T005)                │
  T007 escape + scroll lock                               │
  T008 data fetch (depends on T003)                       │
                                                          ▼
Phase 3 (US1: Core) ────────────────────────────────────┐
  T009 title bar                                          │
  T010 dividers + instruction                             │
  T011 box image (depends on T001, T002)                  │
  T012 footer count                                       │
  T013 click handler (depends on T008, T011)              │
  T014 visual states (depends on T011)                    │
  T015 success display (depends on T013)                  │
  T016 error display (depends on T013)                    │
                                                          ▼
Phase 4 (US2: Wire) ────────────────────────────────────┐
  T017 wire modal in parent                               │
  T018 onOpened callback                                  │
  T019 render modal                                       │
                                                          ▼
Phase 5 (Polish) ── depends on all above                  │
  T020 ARIA attributes                                    │
  T021 focus trap                                         │
  T022 keyboard for box                                   │
  T023 responsive                                         │
  T024 visual QA                                          │
```

## Parallel Execution Opportunities

**Within Phase 1**: T001, T002, T003, T004 are fully parallel (different files, no dependencies).
**Within Phase 3**: T009, T010, T012 can be done in one pass (same file, different JSX sections). T011 depends on T001/T002 assets.
**Phase 3 + Phase 4**: Phase 4 can start once T006 shell exists (T017-T019 only need the export and props interface).

## Implementation Strategy

### MVP (Minimum Viable)
**Phases 1-3 (T001-T016)**: Working modal with full UI and open logic. 16 tasks.

### Full Feature
**Phases 4-5 (T017-T024)**: Parent integration + accessibility polish. 8 tasks.

### Suggested Approach
Since this is a new component (not a refactor), implement in phase order. Phase 3 tasks are best done in a single pass since they all modify the same file's JSX.

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | 24 |
| Phase 1 (Setup) | 5 tasks |
| Phase 2 (Foundation) | 3 tasks |
| Phase 3 (US1: Core) | 8 tasks |
| Phase 4 (US2: Wire) | 3 tasks |
| Phase 5 (Polish) | 5 tasks |
| Parallelizable tasks | 5 (marked [P]) |
| New files | 4 (`secret-box-modal.tsx`, `unopened/route.ts`, 2 images) |
| Modified files | 3 (`kudos-stats.tsx`, `kudos.ts`, `i18n.ts`) |
