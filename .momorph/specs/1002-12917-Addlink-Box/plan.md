# Implementation Plan: Addlink Box

**Frame:** `1002-12917-Addlink-Box`
**Spec:** `spec.md`
**Design:** `design-style.md`
**Created:** 2026-03-23

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|-------------|-------------------|--------|
| TypeScript strict mode | P2: No `any`, explicit types | ✅ Compliant — `AddLinkBoxProps`, `AddLinkFormState` interfaces |
| Client Component | P3: Only `"use client"` when needed | ✅ Compliant — form state + event handlers require client |
| File naming | P3: kebab-case files, PascalCase components | ✅ `add-link-box.tsx` → `AddLinkBox` |
| File location | P3: `src/components/ui/` for primitives | ✅ Reusable UI modal → `ui/` folder |
| Mobile-first | P4: Default mobile, `md:` tablet, `lg:` desktop | ✅ Responsive breakpoints planned |
| Touch targets | P4: >= 44x44px on mobile | ✅ Buttons min-height 48px on mobile |
| Server-side validation | P5: Never trust client-side alone | ✅ Client validation is UX only; parent handles server validation |
| XSS prevention | P5: React escaping, no dangerouslySetInnerHTML | ✅ Standard React rendering only |
| Minimal client JS | P6: Prefer Server Components | ✅ Single client component, no data fetching |
| Keyboard navigation | P7: All interactive elements | ✅ Tab order, Enter submit, Escape close |
| WCAG AA | P7: Accessible | ✅ ARIA attributes, focus trap, contrast AAA |
| Conventional Commits | P7: `type(scope): description` | ✅ `feat(addlink): add link dialog modal` |

---

## Architecture Decisions

### Frontend

**Component Pattern:** Single `"use client"` component following existing modal pattern from `write-kudo-modal.tsx` and `rules-modal.tsx`:
- Fixed overlay with `stopPropagation` on content
- `useEffect` for Escape key listener (no body overflow — parent handles it)
- Conditional render (`if (!isOpen) return null`)
- Translations passed as props (i18n pattern)

**State Management:** Local `useState` hooks (no global state needed):
- `text: string` — Input value for "Nội dung"
- `url: string` — Input value for "URL"
- `errors: { text: string | null; url: string | null }` — Validation errors
- `isSubmitting: boolean` — Double-click prevention

**Validation:** Inline validation (no external library — consistent with existing codebase pattern):
- On submit: validate all fields, show errors simultaneously
- On blur (URL): validate URL format
- On change: clear error for the changed field

**Z-Index:** Existing modals use `z-[200]`. Since AddLinkBox opens ON TOP of Viết Kudo modal, it needs `z-[250]` (overlay) and `z-[251]` (content). This differs from design-style.md's z-50/51 — adjusted to fit the actual project layering.

**Backdrop color:** Use `rgba(0,16,26,0.6)` (existing codebase pattern from `write-kudo-modal.tsx`) instead of `rgba(0,0,0,0.5)` from design-style.md. This maintains visual consistency across all modals in the project.

**Body overflow:** Skip `document.body.style.overflow = "hidden"` — parent Viết Kudo modal already handles scroll lock. Adding a second lock would require tracking restore state. AddLinkBox only needs Escape key listener.

**i18n:** Follow existing `Record<Locale, Translations>` pattern. Define `AddLinkTranslations` interface and `addLinkTranslations` object in standalone file (no modification to `src/utils/i18n.ts` needed).

### Backend
- No backend changes needed. This is a pure client-side modal.
- Link data passed to parent via `onSave` callback.
- Server-side URL validation handled by parent form endpoint (Viết Kudo).

---

## Codebase Research Summary

| Pattern | Source File | How to Apply |
|---------|-----------|-------------|
| Modal overlay + escape + body lock | `src/components/kudos/write-kudo-modal.tsx` | Same useEffect pattern |
| Form validation + error state | `src/components/kudos/write-kudo-modal.tsx` | `validate()` function, `errors` state |
| i18n translations as props | `src/utils/i18n.ts` + `src/types/kudos.ts` | `Record<Locale, AddLinkTranslations>` |
| Design tokens (CSS vars) | `src/app/globals.css` | Use existing `--color-saa-*` vars where possible |
| Icon usage | `src/components/kudos/write-kudo-modal.tsx` | Next.js `Image` from `/public/images/` |
| Montserrat font | `src/app/layout.tsx` | `font-montserrat` class already available |
| Error border color | `src/components/kudos/write-kudo-modal.tsx` | Uses `border-[#CF1322]` — BUT spec uses `#EF4444` (matching `--color-saa-error`). Use `#EF4444` per spec. |

### Existing Design Tokens Available (globals.css)

| Token | Value | Spec Equivalent |
|-------|-------|----------------|
| `--color-saa-button` | `#FFEA9E` | `--color-bg-button-save` ✅ match |
| `--color-saa-button-hover` | `#FFE078` | D.2 hover state ✅ match |
| `--color-saa-button-active` | `#FFD54F` | D.2 active state ✅ match |
| `--color-saa-error` | `#EF4444` | `--color-text-error` ✅ match |
| `--color-saa-accent` | `#998C5F` | `--color-border` ✅ match |

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/components/ui/add-link-box.tsx` | Main modal component (`"use client"`) — overlay, form, validation, accessibility |
| `src/utils/add-link-translations.ts` | i18n translations (VN/EN) for all labels, buttons, error messages |
| `src/types/add-link.ts` | TypeScript interfaces: `AddLinkBoxProps`, `AddLinkFormState`, `AddLinkTranslations`, `LinkData` |
| `public/images/icons/icon-close.svg` | Close (X) icon 24x24 — download from Figma if not existing |
| `public/images/icons/icon-link.svg` | Link icon 24x24 — download from Figma if not existing |

### Modified Files

| File | Changes |
|------|---------|
| `src/components/kudos/write-kudo-modal.tsx` | Import and render `AddLinkBox` — add state for `isAddLinkOpen`, wire `onSave`/`onCancel` callbacks to insert link into rich text editor |

### Dependencies

No new packages needed. Uses existing:
- `react` 19.x (useState, useEffect, useRef, useCallback)
- `next/image` (icon rendering)
- `tailwindcss` 4.x (styling)

---

## Implementation Approach

### Phase 0: Asset Preparation
**Deliverables:** SVG icons in `/public/images/icons/`

1. Check if `icon-close.svg` and `icon-link.svg` already exist in `/public/images/`
2. If not, download from Figma using `get_media_files` tool:
   - Close (X): Node `I1002:12682;1002:12544;186:2761` (MM_MEDIA_Close)
   - Link: Node `I1002:12682;1002:12545;186:1766` (MM_MEDIA_Link)
3. Save to `public/images/icons/` with descriptive names
4. Verify 24x24px, SVG format, single color (for Tailwind fill control)

### Phase 1: Foundation — Types + Translations
**Deliverables:** `src/types/add-link.ts`, `src/utils/add-link-translations.ts`

1. **Create types** (`src/types/add-link.ts`):
   ```typescript
   export interface LinkData {
     text: string;
     url: string;
   }

   export interface AddLinkBoxProps {
     isOpen: boolean;
     onSave: (data: LinkData) => void;
     onCancel: () => void;
     initialText?: string;
     initialUrl?: string;
     translations: AddLinkTranslations;
   }

   export interface AddLinkFormState {
     text: string;
     url: string;
     isSubmitting: boolean;
     errors: {
       text: string | null;
       url: string | null;
     };
   }

   export interface AddLinkTranslations {
     title: string;
     labelText: string;
     labelUrl: string;
     save: string;
     cancel: string;
     errorTextRequired: string;
     errorTextMaxlength: string;
     errorUrlRequired: string;
     errorUrlInvalid: string;
     errorUrlMaxlength: string;
   }
   ```

2. **Create translations** (`src/utils/add-link-translations.ts`):
   - Vietnamese (vi): Use exact text from spec Display Fields
   - English (en): Translated equivalents
   - Export as `addLinkTranslations: Record<Locale, AddLinkTranslations>`

### Phase 2: Core Component — US1 + US3 (P1 features)
**Deliverables:** `src/components/ui/add-link-box.tsx`

**2.1. Modal shell (US3: Cancel/Escape/Overlay close)**
- Fixed overlay: `fixed inset-0 z-[250] bg-[rgba(0,16,26,0.6)]`
- Content container: `z-[251] max-w-[752px] bg-[#FFF8E1] rounded-3xl p-10`
- `useEffect` for Escape key listener only (no body overflow lock — parent modal handles scroll lock)
- `stopPropagation` on content div
- Conditional render: `if (!isOpen) return null`
- Focus trap using `useRef` for first/last focusable elements
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby`

**2.2. Form layout (design-style.md components A-D)**
- Title (A): `<h2>` with `font-montserrat text-[32px] font-bold`
- Text field row (B): flex-row with label + input, error below
- URL field row (C): flex-row with label + input + trailing icon, error below
- Button group (D): flex-row with Cancel + Save buttons

**2.3. Validation logic (US1: all 9 scenarios)**
- `validateText(value: string): string | null` — trim, empty check, whitespace-only, max 100
- `validateUrl(value: string): string | null` — empty check, http/https format, max 2048
- `handleSubmit`: validate all → show errors or call `onSave`
- `handleChange(field)`: clear error for that field on input
- `handleUrlBlur`: validate URL format on blur

**2.4. Responsive (Constitution P4)**
- Mobile: stack labels above inputs, stack buttons vertical (Lưu first), full-width
- Tablet (md:): horizontal layout as Figma
- Desktop (lg:+): pixel-perfect Figma values

**2.5. Accessibility (Constitution P7)**
- `<label htmlFor>` linked to inputs
- Error messages: `aria-describedby` + `role="alert"`
- Tab order: text input → URL input → Cancel → Save
- Enter → submit form
- Focus trap within modal

### Phase 3: Edit Mode — US2 (P2 feature)
**Deliverables:** Update `add-link-box.tsx`

- Initialize form state from `initialText`/`initialUrl` props
- `useEffect` to sync props → state when modal opens (reset on close)
- Same validation + submit flow as create mode
- No visual difference — same component, pre-filled data

### Phase 4: Integration with Viết Kudo
**Deliverables:** Update `src/components/kudos/write-kudo-modal.tsx`

- Add `isAddLinkOpen` state
- Add `handleAddLinkSave(data: LinkData)` — insert `<a>` tag into rich text editor
- Add `handleAddLinkCancel` — close modal
- Wire toolbar "link" button to open AddLinkBox
- Pass translations via `addLinkTranslations[locale]`

### Phase 5: Polish + Testing
**Deliverables:** Tests, final review

- Verify all 14 acceptance scenarios work
- Test responsive at 375px, 768px, 1024px, 1440px
- Keyboard navigation walkthrough
- Screen reader testing (VoiceOver on macOS)
- ESLint pass with zero warnings

---

## Testing Strategy

| Type | Focus | Coverage |
|------|-------|----------|
| Unit | `validateText()`, `validateUrl()` — boundary values (0, 1, 100, 101 chars; valid/invalid URLs) | Extract validators to pure functions for easy testing |
| Component | `AddLinkBox` render states — open/closed, empty, with errors, with initial data, disabled save | React Testing Library |
| Integration | Parent integration — onSave receives correct data, onCancel fires, form resets on re-open | React Testing Library |
| E2E | Full flow: open modal → fill form → save → verify link inserted in Kudo editor | Playwright |

### Key Test Scenarios

| # | Scenario | Type |
|---|----------|------|
| 1 | Render with isOpen=false returns null | Unit |
| 2 | Render with isOpen=true shows form | Unit |
| 3 | Submit valid data calls onSave with { text, url } | Component |
| 4 | Submit empty text shows error, focuses text input | Component |
| 5 | Submit invalid URL shows error | Component |
| 6 | Submit whitespace-only text shows required error | Component |
| 7 | Submit text >100 chars shows maxlength error | Component |
| 8 | Submit URL >2048 chars shows maxlength error | Component |
| 9 | Both fields invalid shows both errors, focuses first | Component |
| 10 | Typing clears error for that field | Component |
| 11 | Blur URL with invalid value shows error | Component |
| 12 | Click Cancel calls onCancel | Component |
| 13 | Press Escape calls onCancel | Component |
| 14 | Click overlay calls onCancel | Component |
| 15 | Pre-filled initialText/initialUrl populates form | Component |
| 16 | Full create flow in Viết Kudo context | E2E |
| 17 | Responsive layout at 375px | Visual |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Z-index conflict with Viết Kudo modal | High — AddLinkBox invisible or behind parent | Use z-[250]/z-[251] (above Viết Kudo's z-[200]). Verified existing layering. |
| Focus trap conflicts with parent modal | Medium — focus may escape to parent | Implement independent focus trap scoped to AddLinkBox content only |
| Rich text editor link insertion | Medium — complex DOM manipulation | Phase 4 handles this separately; AddLinkBox is decoupled via callback. Falls back to parent's implementation detail. |
| Icon assets not available in Figma export | Low — blocked on design team | Fallback: use inline SVG or Heroicons close/link icons with matching size |
| Body overflow already hidden by parent modal | Low — double-lock on scroll | Check `document.body.style.overflow` before setting; parent modal already handles this, so AddLinkBox can skip it |

---

## Open Questions

- None. All requirements are self-contained in the spec. No external API dependencies.
