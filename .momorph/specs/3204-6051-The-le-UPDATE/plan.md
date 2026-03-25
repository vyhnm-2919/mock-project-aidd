# Implementation Plan: Thể lệ UPDATE

**Frame:** `3204:6051` — Thể lệ UPDATE
**Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-16

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|---|---|---|
| Clean Code | P1: Files < 200 lines | ✅ — Simple modal, 2 files |
| TypeScript strict | P2: No `any`, explicit types | ✅ |
| Client Component | P3: `"use client"` — modal needs interactivity | ✅ |
| Mobile-first responsive | P4: Tailwind breakpoints | ✅ |
| Edge-compatible | P6: No Node.js-only APIs | ✅ — Static content only |
| WCAG AA | P7: Focus trap, keyboard, ARIA | ✅ |

---

## Architecture Decisions

### Frontend

**Pattern:** Single Client Component `RulesModal` with static content rendered inside. No API needed — all content is i18n text + static images.

**Component split:**
- `rules-modal.tsx` — Client Component: overlay, panel, open/close logic, buttons, focus trap, Escape/click-outside, slide-in animation
- `rules-content.tsx` — Client Component (vì nằm bên trong Client modal): static content sections (title, hero badges, icon grid, Kudos Quốc Dân). Dùng translations prop thay vì server-side fetch.

**State:** Modal open/close managed by parent. Widget button (`widget-button.tsx`) hiện dùng `<Link href="/rules">` — cần đổi thành `onClick` handler + `useState` để render `<RulesModal>` inline.

**Reuse:** Close (X) icon and pen icon already exist at `public/images/kudos/icon-write.svg`. Icon badge images need to be downloaded.

### Backend

Không cần API/DB — nội dung hoàn toàn static.

---

## Project Structure

### New Files

| File | Purpose | Type |
|------|---------|------|
| `src/components/kudos/rules-modal.tsx` | Modal overlay + panel + buttons + close logic + slide-in animation | Client |
| `src/components/kudos/rules-content.tsx` | Static content: 3 sections + badge tiers + icon grid (Client — inside modal) | Client |
| `public/images/kudos/badge-revival.png` | Icon badge REVIVAL | Asset |
| `public/images/kudos/badge-touch-of-light.png` | Icon badge TOUCH OF LIGHT | Asset |
| `public/images/kudos/badge-stay-gold.png` | Icon badge STAY GOLD | Asset |
| `public/images/kudos/badge-flow-to-horizon.png` | Icon badge FLOW TO HORIZON | Asset |
| `public/images/kudos/badge-beyond-the-boundary.png` | Icon badge BEYOND THE BOUNDARY | Asset |
| `public/images/kudos/badge-root-further.png` | Icon badge ROOT FURTHER | Asset |

### Modified Files

| File | Changes |
|------|---------|
| `src/utils/i18n.ts` | Add `getRulesTranslations()` with vi/en static content for all 3 sections |
| `src/types/kudos.ts` | Add `RulesTranslations` interface |
| `src/components/widget-button.tsx` | Replace `<Link href="/rules">` with `onClick` handler + `useState<boolean>` for `showRules`. Render `<RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />` inline. Import RulesModal + translations. |

### Dependencies

Không cần thêm npm package.

---

## Implementation Approach

### Phase 0: Assets (1 task)

> Download 6 icon badge images from Figma.

### Phase 1: Types + i18n (2 tasks)

> Add `RulesTranslations` type and `getRulesTranslations()` to i18n.

### Phase 2: UI Components — US1+US2+US3 (3 tasks)

> Build RulesContent (static), RulesModal (interactive), wire to Widget.

### Phase 3: Polish (1 task)

> Responsive, accessibility, keyboard, animation.

**Total: 7 tasks**

---

## Testing Strategy

| Type | Focus | Coverage |
|---|---|---|
| Manual | Open/close modal, scroll, keyboard nav, responsive | All scenarios |
| E2E (optional) | Open rules from widget, verify content, close | Key flow |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| Widget button refactor needed | Low | Small change — add state + conditional render |
| Icon badge images quality | Low | Download from Figma at correct resolution |

---

## Open Questions

None — straightforward static modal.
