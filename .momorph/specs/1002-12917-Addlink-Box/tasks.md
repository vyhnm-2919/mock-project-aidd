# Tasks: Addlink Box

**Feature:** Addlink Box - Dialog thêm đường dẫn
**Frame:** `1002-12917-Addlink-Box`
**Spec:** `spec.md` | **Design:** `design-style.md` | **Plan:** `plan.md`
**Created:** 2026-03-23

---

## Phase 1: Setup — Asset Preparation

> **Goal:** Prepare SVG icon assets needed by the component.

- [x] T001 [P] Download Close (X) icon SVG from Figma node `I1002:12682;1002:12544;186:2761` (MM_MEDIA_Close) and save to `public/images/icons/icon-close.svg` (24x24px)
- [x] T002 [P] Download Link icon SVG from Figma node `I1002:12682;1002:12545;186:1766` (MM_MEDIA_Link) and save to `public/images/icons/icon-link.svg` (24x24px)

---

## Phase 2: Foundation — Types + Translations

> **Goal:** Create shared TypeScript interfaces and i18n translations used by the component.
> **Blocking:** Must complete before Phase 3.

- [x] T003 [P] Create TypeScript interfaces (`LinkData`, `AddLinkBoxProps`, `AddLinkFormState`, `AddLinkTranslations`) in `src/types/add-link.ts` — follow plan.md Phase 1 type definitions exactly
- [x] T004 [P] Create i18n translations (VN/EN) for all labels, buttons, and 5 error messages in `src/utils/add-link-translations.ts` — export as `addLinkTranslations: Record<Locale, AddLinkTranslations>` using spec.md Display Fields for exact Vietnamese text

---

## Phase 3: US1 + US3 — Core Modal Component (P1)

> **Goal:** Implement the AddLinkBox modal with form, validation, dismiss behavior, responsive layout, and accessibility.
> **Test criteria:** Modal opens/closes correctly (Cancel, Escape, overlay click). Form validates all fields on submit. Error states display correctly. Valid submit calls onSave with `{ text, url }`.
> **Depends on:** Phase 2 (T003, T004)

- [x] T005 [US1] [US3] Create `AddLinkBox` component shell in `src/components/ui/add-link-box.tsx` — `"use client"`, conditional render (`if (!isOpen) return null`), fixed overlay `z-[250] bg-[rgba(0,16,26,0.6)]`, content container `z-[251] max-w-[752px] bg-[#FFF8E1] rounded-3xl`, `role="dialog"` + `aria-modal="true"` + `aria-labelledby`, `stopPropagation` on content, overlay click calls `onCancel`
- [x] T006 [US3] Add Escape key listener via `useEffect` in `src/components/ui/add-link-box.tsx` — listen for Escape key and call `onCancel`, cleanup on unmount (no body overflow lock — parent modal handles it)
- [x] T007 [US1] Implement form layout (components A-D from design-style.md) in `src/components/ui/add-link-box.tsx` — Title `<h2>` (A: 32px/700 Montserrat), Text field row (B: label "Nội dung" 22px/700 + input flex:1 h-14 border-[#998C5F] rounded-lg), URL field row (C: label "URL" + input with trailing link icon 24x24), Button group (D: Cancel button r-4 border + Save button flex-1 r-8 bg-[#FFEA9E])
- [x] T008 [US1] Implement validation logic in `src/components/ui/add-link-box.tsx` — `validateText()`: trim, empty/whitespace check, max 100 chars; `validateUrl()`: empty check, http/https format, max 2048 chars; `handleSubmit`: validate all fields simultaneously, show errors or call `onSave` with `{ text, url }`, set `isSubmitting` to prevent double-click; `handleChange(field)`: clear error on input; `handleUrlBlur`: validate URL format on blur
- [x] T009 [US1] Implement error display in `src/components/ui/add-link-box.tsx` — error message below each input (margin-top 4px, Montserrat 14px/400 #EF4444), input border changes to `border-[#EF4444]` on error, `aria-describedby` links input to error element, `role="alert"` on error messages, focus first errored field on submit
- [x] T010 [US1] Add responsive styles in `src/components/ui/add-link-box.tsx` — Mobile (default): stack labels above inputs, stack buttons vertical (Lưu first then Hủy), full-width, padding 24px, min-height 48px touch targets; Tablet (md:): horizontal label+input layout, horizontal buttons; Desktop (lg:+): pixel-perfect Figma 752px
- [x] T011 [US1] [US3] Implement accessibility in `src/components/ui/add-link-box.tsx` — `<label htmlFor>` linked to each input, tab order (text → URL → Cancel → Save), Enter submits form, focus trap using `useRef` for first/last focusable elements, `aria-label` on buttons ("Hủy thêm đường dẫn", "Lưu đường dẫn")

---

## Phase 4: US2 — Edit Mode (P2)

> **Goal:** Support pre-filling the form with existing link data for edit mode.
> **Test criteria:** Modal opens with `initialText`/`initialUrl` pre-filled. Editing and saving calls `onSave` with updated data. Form resets when modal re-opens.
> **Depends on:** Phase 3 (T005-T011)

- [x] T012 [US2] Add edit mode support in `src/components/ui/add-link-box.tsx` — initialize `text`/`url` state from `initialText`/`initialUrl` props, add `useEffect` to sync props → state when `isOpen` changes to `true`, reset form state (text, url, errors, isSubmitting) when `isOpen` changes to `false`

---

## Phase 5: Integration — Wire into Viết Kudo

> **Goal:** Connect AddLinkBox to the Viết Kudo modal's rich text editor.
> **Test criteria:** Clicking toolbar link button opens AddLinkBox. Saving inserts `<a>` tag into editor. Canceling returns to editor unchanged.
> **Depends on:** Phase 4 (T012)

- [x] T013 Integrate AddLinkBox into `src/components/kudos/write-kudo-modal.tsx` — add `isAddLinkOpen` state, import `AddLinkBox` and `addLinkTranslations`, render `<AddLinkBox>` with `isOpen={isAddLinkOpen}`, wire toolbar "link" button to set `isAddLinkOpen = true`, implement `handleAddLinkSave(data: LinkData)` to insert `<a href={url}>{text}</a>` into rich text editor and close modal, implement `handleAddLinkCancel` to close modal, pass `translations={addLinkTranslations[locale]}`

---

## Phase 6: Polish & Verification

> **Goal:** Final quality checks across all user stories.

- [ ] T014 Verify all 14 acceptance scenarios from spec.md work correctly — US1 (9 scenarios: valid save, empty text, invalid URL, empty URL, whitespace, maxlength text/URL, both errors, clear on change, blur validation), US2 (2 scenarios: pre-fill, edit save), US3 (3 scenarios: cancel click, Escape, overlay click)
- [ ] T015 Test responsive layout at 375px, 768px, 1024px, 1440px widths — verify mobile stacking, tablet horizontal, desktop pixel-perfect per design-style.md Section 6
- [x] T016 Run ESLint and verify zero warnings in all new/modified files — `src/components/ui/add-link-box.tsx`, `src/types/add-link.ts`, `src/utils/add-link-translations.ts`

---

## Dependencies

```
Phase 1 (T001-T002) ──┐
                       ├──→ Phase 3 (T005-T011) ──→ Phase 4 (T012) ──→ Phase 5 (T013) ──→ Phase 6 (T014-T016)
Phase 2 (T003-T004) ──┘
```

### Parallel Opportunities

| Tasks | Why Parallel |
|-------|-------------|
| T001 + T002 | Independent icon downloads |
| T003 + T004 | Different files, no dependency |
| T001-T002 + T003-T004 | Phase 1 and Phase 2 are independent — can run simultaneously |
| T005 → T006-T011 | T005 creates file; T006-T011 add features to it sequentially |

---

## Implementation Strategy

- **MVP (Phase 1-3):** Complete AddLinkBox as standalone component with create + cancel. Can be tested in isolation without parent integration.
- **Increment 1 (Phase 4):** Add edit mode — minimal change, same component.
- **Increment 2 (Phase 5):** Integration with Viết Kudo — the only file modification.
- **Final (Phase 6):** Verification sweep.

---

## Summary

| Metric | Value |
|--------|-------|
| **Total tasks** | 16 |
| **US1 tasks** | 6 (T005, T007, T008, T009, T010, T011) |
| **US2 tasks** | 1 (T012) |
| **US3 tasks** | 3 (T005, T006, T011) |
| **Setup/Foundation** | 4 (T001-T004) |
| **Integration** | 1 (T013) |
| **Polish** | 3 (T014-T016) |
| **Parallel opportunities** | 4 groups |
| **New files** | 5 |
| **Modified files** | 1 |
| **MVP scope** | Phase 1-3 (T001-T011) |
