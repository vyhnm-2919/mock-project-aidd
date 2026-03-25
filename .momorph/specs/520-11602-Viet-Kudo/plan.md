# Implementation Plan: Viết Kudo

**Frame:** `520:11602` — Viết Kudo
**Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-16

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|---|---|---|
| Clean Code | P1: Files < 200 lines | ✅ — Split into sub-components |
| TypeScript strict | P2: No `any`, explicit types | ✅ |
| Client Components | P3: `"use client"` — form needs interactivity | ✅ |
| Mobile-first responsive | P4: Tailwind breakpoints | ✅ |
| Input validation server-side | P5: Never trust client-side only | ✅ — API route validates |
| Edge-compatible | P6: No Node.js-only APIs | ✅ |
| WCAG AA | P7: Focus trap, keyboard, ARIA | ✅ |

---

## Architecture Decisions

### Frontend

**Pattern:** Single main `WriteKudoModal` Client Component with sub-components for each form section. All form state managed locally via `useState`.

**Component split (all Client — inside modal):**
- `write-kudo-modal.tsx` — Modal shell: overlay, container, form submission logic, close handlers
- `receiver-search.tsx` — Autocomplete search dropdown for "Người nhận"
- `rich-text-toolbar.tsx` — 6 toggle buttons (B, I, S, List, Link, Quote) + "Tiêu chuẩn cộng đồng" link
- `kudo-text-area.tsx` — Rich text textarea (connected to toolbar)
- `hashtag-selector.tsx` — "+ Hashtag" button + chips (max 5)
- `image-uploader.tsx` — "+ Image" button + thumbnails with delete (max 5)

**Rich Text:** Use a lightweight approach — `contenteditable` div with `document.execCommand` for basic formatting. No heavy library needed for B/I/S/List/Link/Quote. Note: `execCommand` is deprecated but still works in all major browsers and is the simplest approach for this scope. If more advanced editing is needed later, can migrate to Tiptap/ProseMirror.

**State:** All form state local to `WriteKudoModal`. No global state.

**Integration points:**
- Widget button: `widget-button.tsx` already has "Viết KUDOS" link → change to onClick + modal state
- Kudos action bar: `kudos-action-bar.tsx` → change placeholder alert to open modal
- Rules modal: `rules-modal.tsx` → onWriteKudos callback already wired

### Backend

**Extend existing API route:** Add `POST` handler to `src/app/api/kudos/route.ts` (already has `GET`) — validate required fields, insert into `kudos` + `kudos_hashtags` + `kudos_images` tables.

**New API route:** `POST /api/upload/image` — accept image file, upload to Supabase Storage, return public URL.

**Existing reuse:** `GET /api/users/search`, `GET /api/hashtags` — already implemented in Kudos Live Board.

### Database

**Existing tables:** `kudos`, `kudos_hashtags`, `kudos_images`, `user_profiles` — already created in Kudos Live Board migration. Need to add:
- `kudos.danh_hieu` column (TEXT, nullable) — for custom title/badge
- `kudos.is_anonymous` column (BOOLEAN, default false)

---

## Project Structure

### New Files

| File | Purpose | Type |
|------|---------|------|
| `src/components/kudos/write-kudo-modal.tsx` | Modal shell + form logic + submit | Client |
| `src/components/kudos/receiver-search.tsx` | Autocomplete search "Người nhận" | Client |
| `src/components/kudos/rich-text-toolbar.tsx` | 6 format buttons + community link | Client |
| `src/components/kudos/kudo-text-area.tsx` | contenteditable rich text area | Client |
| `src/components/kudos/hashtag-selector.tsx` | Hashtag chips + add button (max 5) | Client |
| `src/components/kudos/image-uploader.tsx` | Image thumbnails + upload (max 5) | Client |
| `src/app/api/upload/image/route.ts` | POST upload image to Supabase Storage | API |
| `supabase/migrations/YYYYMMDD_add_kudos_columns.sql` | Add danh_hieu + is_anonymous to kudos table | SQL |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/api/kudos/route.ts` | Add `POST` handler alongside existing `GET` — validate required fields (receiver_id, danh_hieu, content, hashtags), auth check, insert kudos + kudos_hashtags + kudos_images rows |
| `src/utils/i18n.ts` | Add `getWriteKudoTranslations()` vi/en for all form labels, placeholders, buttons, error messages |
| `src/types/kudos.ts` | Add `WriteKudoTranslations` interface, `WriteKudoFormData` type |
| `src/components/widget-button.tsx` | Replace "Viết KUDOS" `<Link>` with `<button>` + `useState` for `showWriteKudo`, render `<WriteKudoModal>` |
| `src/components/kudos/kudos-action-bar.tsx` | Add `useState` for `showWriteKudo` internally (already a Client Component), replace placeholder alert with modal render. Import WriteKudoModal + translations. |

### Dependencies

Không cần thêm npm package. Rich text sử dụng native `contenteditable` + `document.execCommand`.

---

## Implementation Approach

### Phase 0: Setup (3 tasks)

> Download assets, DB migration, types + i18n.

### Phase 1: API (2 tasks)

> POST /api/kudos/create + POST /api/upload/image.

### Phase 2: UI — US1 (6 tasks)

> Build 6 sub-components + assemble WriteKudoModal.

### Phase 3: Integration — US1+US2 (3 tasks)

> Wire to Widget, Action Bar, Rules Modal. Add close/cancel logic.

### Phase 4: Polish (1 task)

> Validation, loading, error states, responsive, accessibility.

**Total: 15 tasks**

---

## Testing Strategy

| Type | Focus | Coverage |
|---|---|---|
| Manual | Form fill + submit, validation, autocomplete, image upload, cancel | All scenarios |
| Integration | POST /api/kudos/create (auth, validation, DB insert) | API endpoint |
| E2E (optional) | Open modal → fill form → submit → verify feed | Key flow |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| Rich text complexity | Medium | Use native `contenteditable` — simple B/I/S/List/Link/Quote, no WYSIWYG library |
| Image upload size | Medium | Validate max 5MB per image client-side + server-side |
| @mention autocomplete | Medium | Reuse existing `/api/users/search`, debounce input |
| Widget button refactor scope | Low | Small change — already done for Rules modal pattern |

---

## Open Questions

None — straightforward form modal with known patterns.
