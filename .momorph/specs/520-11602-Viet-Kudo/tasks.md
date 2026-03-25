# Tasks: Viết Kudo

**Frame:** `520:11602` — Viết Kudo
**Spec:** `spec.md` | **Plan:** `plan.md` | **Design:** `design-style.md`
**Created:** 2026-03-16

---

## Summary

| Metric | Value |
|---|---|
| Total Tasks | 15 |
| Phase 1 (Setup) | 3 tasks |
| Phase 2 (Foundational — API) | 2 tasks |
| Phase 3 (US1 — Form UI) | 6 tasks |
| Phase 4 (US1+US2 — Integration) | 3 tasks |
| Phase 5 (Polish) | 1 task |
| Parallel Opportunities | T002+T003 in Phase 1; T006-T010 partially parallel in Phase 3 |

---

## Phase 1: Setup — DB Migration, Types, i18n

> **Goal:** Add DB columns, types, translations for Write Kudo form.

- [x] T001 Create DB migration `supabase/migrations/YYYYMMDD_add_kudos_columns.sql` — ALTER TABLE kudos ADD COLUMN `danh_hieu` TEXT, ADD COLUMN `is_anonymous` BOOLEAN DEFAULT false. Run migration.
- [x] T002 [P] Add to `src/types/kudos.ts` — `WriteKudoTranslations` interface (title, labels for all fields, placeholders, button texts, error messages, hint texts) + `WriteKudoFormData` type (receiver_id, danh_hieu, content, hashtags, images, is_anonymous)
- [x] T003 [P] Add `getWriteKudoTranslations()` to `src/utils/i18n.ts` — vi/en translations: modal title ("Gửi lời cám ơn và ghi nhận đến đồng đội"), field labels ("Người nhận", "Danh hiệu", "Hashtag", "Image"), placeholders ("Tìm kiếm", "Dành tặng một danh hiệu cho đồng đội", "Hãy gửi gắm lời cám ơn..."), helper texts, button texts ("Hủy", "Gửi"), checkbox label, error messages, "Tiêu chuẩn cộng đồng" link text

**Checkpoint:** Types importable. Translations render. DB columns added.

---

## Phase 2: Foundational — API Routes

> **Goal:** POST create kudo + POST upload image endpoints working.

- [x] T004 [P] Add POST handler to `src/app/api/kudos/route.ts` — Validate auth via `getUser()`. Request body: `{ receiver_id: UUID, danh_hieu: string, content: string, hashtags: string[], images: string[], is_anonymous: boolean }`. Validate: receiver_id required + exists in user_profiles, danh_hieu required (non-empty), content required (strip HTML tags for min 1 char check), hashtags 1-5 required. Insert into `kudos` table (sender_id from auth, receiver_id, content, danh_hieu, hashtag_category from first hashtag, is_anonymous). Insert hashtags into `kudos_hashtags`. Insert image URLs into `kudos_images`. Return `{ success: true, id: kudo.id }`. Error: 400 for validation, 401 for auth, 500 for server.
- [x] T005 [P] Create `src/app/api/upload/image/route.ts` — POST handler: validate auth, accept `FormData` with `file` field, validate image type (jpeg/png/webp/gif) + max 5MB, upload to Supabase Storage bucket `kudos-images`, return `{ url: publicUrl }`. Error: 400 for invalid file, 413 for too large.

**Checkpoint:** Both endpoints return correct JSON. Auth validated. Validation errors return 400.

---

## Phase 3: US1 — Write Kudo Form UI

> **Goal:** Build all form sub-components and assemble into modal.
> **Independent test:** Open modal → fill all fields → preview looks correct.

- [x] T006 [P] [US1] Create `src/components/kudos/receiver-search.tsx` — Client Component. Props: `value: UserProfile | null`, `onChange: (user: UserProfile) => void`, `label: string`, `placeholder: string`. Input: border `1px solid #998C5F`, border-radius 8px, bg `#FFF`, padding `16px 24px`, 514px wide. Placeholder: Montserrat 16px/700 `#999`. Chevron icon 24x24 on right. On type: debounce 300ms, fetch `/api/users/search?q=...`, show dropdown results. On select: fill input, call onChange. Required asterisk `*` in `#CF1322`. Focus state: border `#FFEA9E`. Error state: border `#CF1322`.
- [x] T007 [P] [US1] Create `src/components/kudos/rich-text-toolbar.tsx` — Client Component. Props: `editorRef: RefObject<HTMLDivElement>`. 6 toggle buttons in a row (B, I, S, List, Link, Quote): each height 40px, border `1px solid #998C5F`, bg transparent, padding `10px 16px`, icon 24x24. First button: border-radius `8px 0 0 0`. `aria-pressed` for toggle state. "Tiêu chuẩn cộng đồng" link on right: Montserrat 16px/700 `#E46060`, border-radius `0 8px 0 0`. Use `document.execCommand` for format commands.
- [x] T008 [P] [US1] Create `src/components/kudos/kudo-text-area.tsx` — Client Component. Props: `editorRef: RefObject<HTMLDivElement>`, `placeholder: string`, `hint: string`. `contenteditable` div: min-height 120px, border `1px solid #998C5F`, border-radius `0 0 8px 8px` (connected to toolbar above), bg `#FFF`, padding-left 24px. Placeholder shown when empty. Hint text below: Montserrat 16px/700 `#00101A` letter-spacing 0.5px. Support `@` mention: on typing `@`, debounce search `/api/users/search`, show dropdown inline.
- [x] T009 [P] [US1] Create `src/components/kudos/hashtag-selector.tsx` — Client Component. Props: `hashtags: string[]`, `onChange: (tags: string[]) => void`, `label: string`, `maxLabel: string`. Label: Montserrat 22px/700 `#00101A` + required `*` `#CF1322`. "+ Hashtag" button: border `1px solid #998C5F`, bg `#FFF`, border-radius 8px, padding `4px 8px`, label Montserrat 11px/700 `#999`. On click: fetch `/api/hashtags`, show dropdown. Selected tags as chips with "x" remove. Max 5, disable button when full.
- [x] T010 [P] [US1] Create `src/components/kudos/image-uploader.tsx` — Client Component. Props: `images: string[]`, `onChange: (urls: string[]) => void`, `label: string`, `maxLabel: string`. Label: Montserrat 22px/700 `#00101A`. Each thumbnail: 80x80px, border-radius 18px outer, border `1px solid #998C5F`, image inside border `1px solid #FFEA9E` border-radius 4px. Delete button: 20x20px circle bg `#D4271D` top-right. "+ Image" button: same style as hashtag button. On click: open file picker, validate type (image/*) + size (max 5MB), upload via `/api/upload/image`, add returned URL. Max 5, hide button when full.
- [x] T011 [US1] Create `src/components/kudos/write-kudo-modal.tsx` — Client Component. Props: `isOpen: boolean`, `onClose: () => void`, `translations: WriteKudoTranslations`. Overlay: `fixed inset-0 z-[200] bg-[rgba(0,16,26,0.8)]`, click → onClose. Modal: centered, `w-full md:w-[752px] max-h-[90vh] bg-[#FFF8E1] rounded-3xl p-6 md:p-10 gap-8 overflow-y-auto`. Close on Escape. `role="dialog"` `aria-modal="true"`. Form state: `useState` for receiver, danhHieu, content (from editorRef.innerHTML), hashtags, images, isAnonymous. Compose: Title (32px/700 centered) → Người nhận (ReceiverSearch) → Danh hiệu input (same style, required, placeholder + helper text) → RichTextToolbar + KudoTextArea → HashtagSelector → ImageUploader → Anonymous checkbox (24x24 border `1px solid #999`, border-radius 4px, gap 16px, label Montserrat 22px/700 `#999`) → Buttons: "Hủy ✕" (secondary: bg `rgba(255,234,158,0.10)`, border `1px solid #998C5F`, padding `16px 40px`) + "Gửi ▷" (primary: bg `#FFEA9E`, flex-1, height 60px, border-radius 8px, text 22px/700 `#00101A`, disabled when required fields empty → opacity 0.5). On submit: validate, POST `/api/kudos`, show loading, on success close + optional toast.

**Checkpoint:** Modal renders with all fields. Form validates required fields. Submit disabled when incomplete.

---

## Phase 4: US1+US2 — Integration

> **Goal:** Wire WriteKudoModal to Widget, Action Bar, and Rules Modal. Cancel/close works.

- [x] T012 [US1+US2] Wire WriteKudoModal to Widget in `src/components/widget-button.tsx` — Replace "Viết KUDOS" `<Link href="/kudos/write">` with `<button onClick={() => { setShowWriteKudo(true); setIsExpanded(false); }}>`. Add `const [showWriteKudo, setShowWriteKudo] = useState(false)`. Import and render `<WriteKudoModal isOpen={showWriteKudo} onClose={() => setShowWriteKudo(false)} translations={writeKudoTranslations} />`. Get translations from new prop `writeKudoTranslations: WriteKudoTranslations` passed from layout.
- [x] T013 [US1+US2] Wire WriteKudoModal to Action Bar in `src/components/kudos/kudos-action-bar.tsx` — Add `const [showWriteKudo, setShowWriteKudo] = useState(false)`. Replace first button's `alert()` with `setShowWriteKudo(true)`. Import and render `<WriteKudoModal>` with translations. Need to add `writeKudoTranslations` prop or import `getWriteKudoTranslations` client-side (use cookie-based locale detection).
- [x] T014 [US1+US2] Update `src/app/(main)/layout.tsx` — Import `getWriteKudoTranslations`, pass `writeKudoT` as prop to `<WidgetButton>`. Update WidgetButton props interface to accept `writeKudoTranslations`.

**Checkpoint:** Click "Viết KUDOS" from Widget → modal opens. Click from Action Bar → modal opens. Click from Rules Modal → modal opens (already wired via onWriteKudos). Hủy/Escape/overlay click closes. Form data cleared on close.

---

## Phase 5: Polish

> **Goal:** Validation UX, loading states, responsive, accessibility.

- [x] T015 Polish — Verify: (1) Required fields show red border on submit attempt when empty, (2) "Gửi" button disabled with opacity 0.5 when form incomplete, (3) Loading spinner on "Gửi" during submission, (4) Success toast after submit, (5) Responsive: full-width modal on mobile with padding 20px, title 24px, submit button full-width stacked, (6) Focus trap inside modal, Tab order: receiver → danh hiệu → toolbar → textarea → hashtag → image → checkbox → Hủy → Gửi, (7) `aria-required`, `aria-describedby` for error messages, `aria-pressed` on toolbar buttons, (8) Image upload progress indicator, (9) Debounce on user search (300ms).

**Checkpoint:** All validation visible. Loading shows. Responsive correct. Keyboard navigation works. Focus trapped.

---

## Dependencies & Execution Order

```
Phase 1 (Setup: T001-T003)
  └──▶ Phase 2 (API: T004-T005)
  └──▶ Phase 3 (UI: T006-T011)
         └──▶ Phase 4 (Integration: T012-T014)
                └──▶ Phase 5 (Polish: T015)
```

### Parallel Opportunities
- Phase 1: T002 + T003 parallel (different files)
- Phase 2: T004 + T005 parallel (different files)
- Phase 3: T006-T010 all parallel (different component files) → T011 assembles them (sequential)
- Phase 4: T012 + T013 parallel (different files) → T014 after both

---

## Implementation Strategy

### MVP (All tasks)
- Feature 15 tasks, all P1 priority
- Implement Phase 1 → 2 → 3 → 4 → 5
- Rich text: native `contenteditable` + `document.execCommand` (deprecated but works)

### Key Constraints
- 7 Client Components (modal + 6 sub-components)
- POST to existing `/api/kudos/route.ts` (add handler alongside GET)
- New `/api/upload/image/route.ts` for Supabase Storage
- DB migration adds 2 columns to existing `kudos` table
- Reuse existing APIs: `/api/users/search`, `/api/hashtags`
- No new npm dependencies
