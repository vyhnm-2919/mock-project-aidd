# Implementation Plan: Floating Action Button (FAB)

**Frame**: `313:9137-Floating-Action-Button`
**Spec**: `spec.md`
**Design**: `design-style.md`
**Created**: 2026-03-12

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|-------------|------------------|--------|
| TypeScript strict mode | P2: No `any`, explicit types | ✅ Compliant — `FabTranslations` interface defined in spec |
| Server Components by default | P3: `"use client"` only when required | ✅ Compliant — WidgetButton needs client for state/events |
| Responsive mobile-first | P4: Tailwind breakpoints, 44px touch targets | ✅ Compliant — 4 breakpoints defined in design-style |
| Clean Code < 200 lines | P1: Single responsibility | ✅ Planned — single file, simple state |
| WCAG AA accessibility | P7: Keyboard nav, screen reader | ✅ Planned — ARIA attrs, focus management, Escape key |
| Performance / edge runtime | P6: Minimize client JS | ✅ Compliant — lightweight component, no heavy deps |
| Security / XSS | P5: No dangerouslySetInnerHTML | ✅ Compliant — static content only |
| ESLint zero warnings | P7: Pass before commit | 📋 Planned |

---

## Architecture Decisions

### Frontend

**Component pattern:** Single client component (`widget-button.tsx`) with internal state toggle. No sub-components needed — the FAB is small enough to stay in one file under 200 lines.

**State management:** Local `useState<boolean>` for `isExpanded`. No global state or context needed — FAB is self-contained.

**Side effects (inline `useEffect`):**
1. **Click outside** — `mousedown` listener on `document`, check `ref.contains()`. Pattern copied from existing `language-selector.tsx`.
2. **Escape key** — `keydown` listener on `document`. Same pattern as `language-selector.tsx`.
3. **Route change** — `usePathname()` from `next/navigation`. Close on pathname change via `useEffect` dependency.

**i18n approach:** `src/utils/i18n.ts` imports `cookies` from `next/headers`, making it a **server-only module**. Client components cannot import from it directly. Follow the existing pattern:
- Define `FabTranslations` interface in `src/types/fab.ts` (constitution P2: shared types in dedicated type files)
- Add `fabTranslations` record and `getFabTranslations(locale)` to `src/utils/i18n.ts`
- Layout (server component) calls `getFabTranslations(locale)` and passes result as `translations` prop to `<WidgetButton>`
- WidgetButton receives `translations: FabTranslations` prop (not `locale`)

**Navigation:** Use `next/link` for "Thể lệ" and "Viết KUDOS" buttons. This enables:
- Client-side navigation (no full page reload)
- Route change detection via `usePathname()` to auto-close FAB
- Prefetching for instant navigation

**Close icon:** Inline SVG (simple × path) — avoids extra network request, matches design spec recommendation.

**Animation:** CSS transitions via Tailwind `transition-all duration-200 ease-out`. Both collapsed and expanded states are **always rendered in DOM** — visibility controlled via `opacity-0/opacity-100` + `pointer-events-none/auto` + `translate-y` transforms. This ensures smooth CSS transitions (conditional rendering with ternary removes elements from DOM, breaking CSS transitions). The collapsed button uses `absolute` positioning within the fixed container so it overlaps with the close button area.

### Backend

No backend changes needed. FAB is a pure UI component with client-side navigation.

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/types/fab.ts` | `FabTranslations` interface (constitution P2: shared types in dedicated files) |

### Modified Files

| File | Changes |
|------|---------|
| `src/components/widget-button.tsx` | Full rewrite: accept `translations` prop, add expanded state with "Thể lệ", "Viết KUDOS", close button, click-outside, Escape key, route change detection, accessibility, responsive positioning, animations |
| `src/utils/i18n.ts` | Import `FabTranslations` from types, add `fabTranslations` record, export `getFabTranslations()` function |
| `src/app/(main)/layout.tsx` | Import `getFabTranslations`, call it with locale, pass result as `translations` prop to `<WidgetButton translations={fabTranslations} />` |

### Dependencies

No new packages needed. All functionality uses Next.js built-in APIs:
- `next/navigation` → `usePathname()`
- `next/link` → `<Link>`
- `next/image` → `<Image>` (existing)
- `react` → `useState`, `useEffect`, `useRef`, `useCallback`

---

## Implementation Approach

### Phase 0: Asset Verification

- Confirm `pen.svg` and `saa-icon.svg` exist in `/images/icons/` → ✅ Already verified
- Close icon → inline SVG (no download needed)
- No new assets required

### Phase 1: Foundation (US1 — FAB display)

**Goal:** Replace placeholder with proper collapsed FAB that displays correctly on all authenticated pages.

1. **Create type file** `src/types/fab.ts`:
   - Define `FabTranslations` interface: `{ theLe, vietKudos, ariaLabel, closeLabel }`

2. **Add i18n translations** to `src/utils/i18n.ts`:
   - Import `FabTranslations` from `@/types/fab`
   - Add `fabTranslations: Record<Locale, FabTranslations>` with vi/en values
   - Export `getFabTranslations(locale)` function

3. **Update layout** `src/app/(main)/layout.tsx`:
   - Import `getFabTranslations` from i18n
   - Call `const fabTranslations = getFabTranslations(locale)`
   - Pass as prop: `<WidgetButton translations={fabTranslations} />`

4. **Rewrite collapsed state** in `widget-button.tsx`:
   - Accept `translations: FabTranslations` prop
   - Render collapsed pill button with exact Figma styles
   - Add responsive positioning: `right-4 bottom-4 md:right-6 md:bottom-6 lg:right-8 lg:bottom-8 xl:right-[143px] xl:bottom-[120px]`
   - Add ARIA attributes: `aria-label`, `aria-expanded`, `aria-haspopup`

### Phase 2: Core Interaction (US2 — Open/close FAB)

**Goal:** Implement expanded state with all 3 buttons and close mechanisms.

1. **Expanded state rendering:**
   - Flex column container, align-items flex-end, gap 20px
   - "Thể lệ" button: 149x64px, SAA logo icon + text, radius 4px
   - "Viết KUDOS" button: 214x64px, pen icon + text, radius 4px
   - Close button: 56x56px, red circle, inline SVG × icon

2. **Toggle mechanism:**
   - Click collapsed → show expanded (set `isExpanded = true`)
   - Click close button → show collapsed (set `isExpanded = false`)

3. **Close on click outside:**
   - `useRef` for FAB container
   - `useEffect` with `mousedown` listener when `isExpanded`
   - Check `!ref.current?.contains(event.target)`

4. **Close on Escape key:**
   - `keydown` listener in same `useEffect`
   - Return focus to collapsed button ref

5. **Close on route change:**
   - `usePathname()` hook
   - `useEffect(() => setIsExpanded(false), [pathname])`

6. **Animation:**
   - Collapsed → Expanded: buttons fade in + slide up (`opacity-0 translate-y-5` → `opacity-100 translate-y-0`)
   - Expanded → Collapsed: reverse animation
   - Duration: 200ms, easing: ease-out

### Phase 3: Navigation (US3 + US4 — Thể lệ & Viết KUDOS)

**Goal:** Wire up navigation for both action buttons.

1. **"Thể lệ" button:** `<Link href="/rules">` wrapping the button content
2. **"Viết KUDOS" button:** `<Link href="/kudos/write">` wrapping the button content
3. Both links close FAB on click (via route change detection in Phase 2)

**Note:** Target routes `/rules` and `/kudos/write` are predicted from spec. If these pages don't exist yet, the links will still work and navigate — the pages will show 404 until implemented. This is acceptable for FAB development.

### Phase 4: Polish & Accessibility

**Goal:** Final refinements for production readiness.

1. **Focus management:**
   - When expanding: focus first action button ("Thể lệ")
   - When closing via Escape: return focus to collapsed FAB button
   - Tab order: Thể lệ → Viết KUDOS → Close

2. **Hover/active states:**
   - Yellow buttons: `hover:bg-[#FFE078] active:scale-[0.98]`
   - Close button: `hover:bg-[#B91C14] active:scale-95`
   - Collapsed FAB: `hover:bg-[#FFE078] hover:scale-105 active:bg-[#FFD54F]`

3. **Focus visible styles:**
   - All buttons: `focus-visible:outline-2 focus-visible:outline-offset-2`
   - Yellow: `focus-visible:outline-[#FFEA9E]`
   - Red: `focus-visible:outline-[#D4271D]`

4. **Final review:**
   - Test at all 4 breakpoints (375px, 768px, 1024px, 1440px)
   - Keyboard-only navigation test
   - Screen reader test (aria labels)
   - ESLint pass

---

## Component Blueprint

```tsx
// src/components/widget-button.tsx
"use client";

import type { FabTranslations } from "@/types/fab";

interface WidgetButtonProps {
  translations: FabTranslations;
}

export function WidgetButton({ translations: t }: WidgetButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => { setIsExpanded(false); }, [pathname]);

  // Click outside + Escape key (only when expanded)
  useEffect(() => {
    if (!isExpanded) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
        triggerRef.current?.focus(); // Return focus
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded]);

  return (
    <div
      ref={containerRef}
      className="fixed right-4 bottom-4 md:right-6 md:bottom-6 lg:right-8 lg:bottom-8 xl:right-[143px] xl:bottom-[120px] z-[60]"
      role="group"
      aria-label={t.ariaLabel}
    >
      {/* Expanded state — always in DOM, visibility controlled */}
      <div className={`flex flex-col items-end gap-5 transition-all duration-200 ease-out ${
        isExpanded ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-5 pointer-events-none"
      }`}>
        <Link href="/rules">...</Link>      {/* Thể lệ */}
        <Link href="/kudos/write">...</Link> {/* Viết KUDOS */}
        <button onClick={() => setIsExpanded(false)}>...</button> {/* Close */}
      </div>

      {/* Collapsed state — always in DOM, visibility controlled */}
      <button
        ref={triggerRef}
        onClick={() => setIsExpanded(true)}
        aria-expanded={isExpanded}
        aria-haspopup="true"
        className={`transition-all duration-200 ${
          isExpanded ? "opacity-0 pointer-events-none scale-90" : "opacity-100 pointer-events-auto scale-100"
        } ...`}
      >
        {/* Pen / SAA icons */}
      </button>
    </div>
  );
}
```

---

## Testing Strategy

| Type | Focus | Coverage |
|------|-------|---------|
| Unit | Toggle state, close on escape, close on click outside | Component logic |
| Integration | Route change closes FAB, navigation links work | Next.js routing |
| E2E (Playwright) | Full open/close flow, keyboard navigation, responsive positions | Critical user flow |
| Visual | Compare collapsed + expanded vs Figma screenshots | Pixel accuracy |

**Key test scenarios:**
1. FAB renders in collapsed state on page load
2. Click collapsed → expanded with correct buttons
3. Click close → collapses
4. Click outside → collapses
5. Press Escape → collapses + focus returns
6. Click "Thể lệ" → navigates to /rules
7. Click "Viết KUDOS" → navigates to /kudos/write
8. Route change → auto-close
9. FAB stays fixed during scroll
10. Responsive positioning at 4 breakpoints

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Target routes don't exist yet (`/rules`, `/kudos/write`) | Low | FAB navigation works regardless; pages show 404 until built |
| Animation jank on mobile | Low | Use CSS transforms (GPU-accelerated), keep animations simple |
| Click-outside conflicts with other overlays (modals) | Medium | Z-index 60 is below modals; FAB auto-closes on route change |
| Focus trap conflicts | Low | FAB is not a modal — no focus trap needed, just focus management |

---

## Open Questions

- [ ] **Route for "Thể lệ"**: Is it `/rules` or a modal overlay? Spec says "predicted". Using `/rules` as default — easy to change later.
- [ ] **Route for "Viết KUDOS"**: Is it `/kudos/write` or a modal overlay? Using `/kudos/write` as default.

---

## Estimated Scope

- **New files:** 1 (`src/types/fab.ts`)
- **Files modified:** 3
- **Lines of code (estimated):** ~120 lines in widget-button.tsx, ~20 lines in i18n.ts, ~5 lines in fab.ts, ~3 lines in layout.tsx
- **Complexity:** Low — pure UI component with local state, no API, no database
