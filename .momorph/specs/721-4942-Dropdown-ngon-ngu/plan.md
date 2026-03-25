# Implementation Plan: Dropdown Ngôn ngữ

**Frame:** `721:4942` — Dropdown-ngôn ngữ
**Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-25
**Reviewed:** 2026-03-25

---

## Status: VISUAL UPDATE NEEDED

Component `LanguageSelector` đã tồn tại tại `src/components/header/language-selector.tsx` với behavior đúng (cookie-based locale switching, keyboard navigation, click-outside handling). Chỉ cần update **visual styling** để match Figma design.

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|-------------|-------------------|--------|
| TypeScript strict | Principle 2 | ✅ Compliant (existing) |
| "use client" for interactivity | Principle 3 | ✅ Compliant (existing) |
| kebab-case file naming | Naming Conventions | ✅ `language-selector.tsx` |
| PascalCase component | Naming Conventions | ✅ `LanguageSelector` |
| Tailwind CSS styling | Tech Stack | ✅ Tailwind utilities |
| Keyboard navigation | Principle 7 | ✅ Compliant (existing) |
| WCAG AA | Principle 7 | ⚠️ Fix needed: add `aria-label` to items after label→code change |
| No dead code | Principle 1 | ⚠️ Fix needed: repurpose `lang.label` for `aria-label` |
| Responsive mobile-first | Principle 4 | ✅ Fixed-size, no breakpoint changes |
| Touch targets ≥ 44px | Principle 4 | ✅ Items 56px height, trigger 56px height |
| next/image for images | Principle 4 & 6 | ✅ Using `next/image` for flags |
| ESLint zero warnings | Principle 7 | 📋 Verify after changes |

---

## Architecture Decisions

### Frontend
- **No architectural changes** — same component, same props, same behavior
- **Pattern:** Client component (`"use client"`) receiving `currentLocale` prop from server component `MainHeader`
- **State management:** Unchanged — `isOpen`, `focusedIndex` local state, cookie for persistence
- **Data fetching:** None — hardcoded language list, server reads cookie via `getLocaleFromCookie()`

### Backend
- **No changes** — no API endpoints, no database changes
- Cookie-based locale persistence already works correctly

---

## Visual Refinement: Current vs Figma Target

### Dropdown Panel (`<ul>`)

| Property | Current Code | Figma Target | Tailwind Change |
|----------|-------------|--------------|-----------------|
| Background | `bg-[rgba(11,15,18,0.95)]` | `#00070C` (solid) | → `bg-[#00070C]` |
| Backdrop blur | `backdrop-blur-[10px]` | none | → remove |
| Border | `border-[#2E3940]` | `#998C5F` (golden) | → `border-[#998C5F]` |
| Border radius | `rounded` (4px) | 8px | → `rounded-lg` |
| Padding | none (items fill edge) | 6px | → `p-1.5` |
| Overflow | `overflow-hidden` | visible (items have own radius) | → remove `overflow-hidden` |
| Min width | `min-w-[160px]` | auto (fit content ~122px) | → remove `min-w-[160px]` |
| Z-index | none | 50 | → add `z-50` |

### Dropdown Items (`<li>`)

| Property | Current Code | Figma Target | Tailwind Change |
|----------|-------------|--------------|-----------------|
| Content | Full label ("Tiếng Việt") | Code only ("VN") | → `{lang.value.toUpperCase()}` |
| Accessibility | implicit from label text | needs explicit aria-label | → add `aria-label={lang.label}` |
| Text style | `text-sm font-medium` | 16px/700 Montserrat | → `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white` |
| Padding | `px-4 py-3` | 16px all sides | → `p-4` |
| Gap | `gap-3` | 4px | → `gap-1` |
| Flag size | `width={20} height={15}` | 24x24 container | → `width={24} height={24}` + `w-6 h-6` |
| Selected bg | `bg-white/5` | golden tint | → `bg-[rgba(255,234,158,0.20)]` |
| Selected radius | none | 2px | → `rounded-sm` |
| Hover bg | `bg-white/10` | golden tint | → `bg-[rgba(255,234,158,0.10)]` |
| Hover radius | none | 4px | → `rounded` |
| Focus bg | `bg-white/10` | golden tint | → `bg-[rgba(255,234,158,0.10)]` |
| Height | auto | 56px | → `h-14` |

### Trigger Button (`<button>`)
- **No changes needed** — trigger button styling is already correct per the existing implementation

---

## Project Structure

### Modified Files

| File | Changes |
|------|---------|
| `src/components/header/language-selector.tsx` | Update dropdown panel classes, item classes, item content (label→code), add `aria-label` to items |

### No New Files

Không cần file mới — chỉ sửa Tailwind classes và content trong 1 file existing.

### No New Dependencies

Không cần thêm package mới.

---

## Implementation Approach

### Phase 0: Asset Preparation
- **No assets needed** — flag SVGs (`flag-vn.svg`, `flag-en.svg`, `chevron-down.svg`) already exist in `public/images/icons/`

### Phase 1: Update Dropdown Panel Styles (1 task)

Update `<ul>` element classes:
```
Before: "absolute top-full right-0 mt-1 min-w-[160px] bg-[rgba(11,15,18,0.95)] backdrop-blur-[10px] rounded border border-[#2E3940] overflow-hidden"

After:  "absolute top-full right-0 mt-1 z-50 bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col"
```

### Phase 2: Update Dropdown Item Styles (1 task)

Update each `<li>` element — 9 specific changes:

1. **Content:** Change `<span>` from `{lang.label}` → `{lang.value.toUpperCase()}`
2. **Accessibility:** Add `aria-label={lang.label}` to `<li>` (repurpose label field for screen readers — keeps `lang.label` useful, avoids dead code)
3. **Text classes:** Change `text-sm font-medium text-white` → `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white`
4. **Flag icon size:** Change `width={20} height={15}` → `width={24} height={24}` and add `className="w-6 h-6"`
5. **Gap:** Change `gap-3` → `gap-1`
6. **Padding:** Change `px-4 py-3` → `p-4`
7. **Height:** Add `h-14` for 56px fixed height
8. **Selected state:** Change `bg-white/5` → `bg-[rgba(255,234,158,0.20)] rounded-sm`
9. **Hover/focus state:** Change `bg-white/10` → `bg-[rgba(255,234,158,0.10)] rounded`

### Phase 3: Verify & Test (1 task)

- **ESLint:** Run `yarn lint` — must pass with zero warnings
- **Visual check:** Compare browser output with Figma screenshot in `assets/frame.png`
- **Keyboard navigation:** Arrow keys, Enter, Space, Escape
- **Click-outside:** Verify dropdown closes
- **Locale switching:** VN → EN → VN, verify cookie and reload
- **Screen reader:** Verify `aria-label` reads full language names
- **Trigger button:** Verify no visual regression
- **Mobile:** Check at 375px width — dropdown stays within viewport

**Total: 3 tasks**

---

## Testing Strategy

| Type | Focus | Status |
|------|-------|--------|
| ESLint | Zero warnings | Required (Principle 7) |
| Manual visual | Compare with Figma `assets/frame.png` | Required |
| Manual functional | Click/keyboard locale switching | Required |
| Manual a11y | Screen reader reads `aria-label` on items | Required |
| E2E (existing) | Language selector in Playwright tests | Verify no regression |

> No new automated tests needed — this is a CSS + content change. Existing behavior tests should still pass. `lang.label` field is repurposed for `aria-label`, so no dead code.

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Removing `overflow-hidden` may show item borders outside container | Low | Items (~110px) are narrower than container (~122px with padding); verify visually |
| Removing `backdrop-blur` changes perceived transparency | Low | Switching to solid `#00070C` bg — matches Figma exactly |
| Removing `min-w-[160px]` may shrink dropdown | Low | Items with `p-4` + flag 24px + gap-1 + text provide natural width ~110px + 12px padding = ~122px; verify |
| Label change ("Tiếng Việt" → "VN") reduces visual clarity | Low | Matches Figma; trigger still shows flag icon for context; `aria-label` preserves full name for screen readers |
| Missing `z-50` caused stacking issues | Medium | Added `z-50` to Phase 1 After string; consistent with other dropdown specs (e.g., department-filter) |

---

## Open Questions

None — straightforward visual style update. All values are explicitly defined in design-style.md Section 7 (Implementation Diff).
