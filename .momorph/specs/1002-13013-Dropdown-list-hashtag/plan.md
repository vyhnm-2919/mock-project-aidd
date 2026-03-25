# Implementation Plan: Dropdown list hashtag

**Frame**: `1002:13013` — Dropdown list hashtag
**Spec**: [spec.md](./spec.md) | [design-style.md](./design-style.md)
**Created**: 2026-03-23

---

## Executive Summary

This is a **refactor** of the existing `src/components/kudos/hashtag-selector.tsx`, not a greenfield build. The current implementation has the core logic (API fetch, multi-select, click-outside) but the UI doesn't match the Figma design and is missing accessibility, keyboard navigation, and proper visual states.

### Current vs Target

| Feature | Current (`hashtag-selector.tsx`) | Target (Figma spec) |
|---------|--------------------------------|---------------------|
| Visual theme | White background, chip-style tags | Dark panel `#00070C`, highlight rows |
| Selection display | Chips above trigger (remove-to-deselect) | In-dropdown checkmarks (toggle in-place) |
| Dropdown behavior | Closes after each selection | Stays open for multi-select |
| Keyboard nav | None | Full Arrow/Enter/Escape/Space |
| ARIA roles | None | `listbox` + `option` + `aria-multiselectable` |
| Max limit UX | Hides trigger button entirely | Disables unselected items (opacity 0.4) |
| Responsive | Basic flex-wrap | Mobile 100% width, 44px touch targets |
| Error state | Class on label only | Red border on trigger |
| Selected state | Yellow chip + ✕ button | Row highlight + check icon |
| Scroll | 200px max-height | 332px, custom dark scrollbar |

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|-------------|-------------------|--------|
| TypeScript strict | P2: No `any`, explicit types | ✅ Existing types in `kudos.ts` |
| Client Component | P3: `"use client"` for event handlers | ✅ Already client component |
| Responsive | P4: Mobile-first, 44px touch targets | 📋 Needs update |
| Security | P5: Supabase RLS, no user input | ✅ API uses auth check |
| Performance | P6: Single API fetch, no re-renders | ✅ Fetch on mount, cached |
| Accessibility | P7: WCAG AA, keyboard nav | 📋 Needs full implementation |
| File size | P1: < 200 lines | 📋 Monitor during refactor |

---

## Architecture Decisions

### Frontend

- **Component pattern**: Refactor existing `HashtagSelector` in-place. Same file, same export name to avoid breaking `write-kudo-modal.tsx` import.
- **State management**: Controlled component. Parent manages `hashtags[]`, component manages `isOpen` + `focusedIndex` locally.
- **Data fetching**: Keep existing pattern — component fetches `/api/hashtags` on mount via `useEffect` and stores in local state. This deviates from the spec's `availableHashtags` prop approach, but avoids modifying `write-kudo-modal.tsx` which doesn't currently pass that prop. The tradeoff: slightly less "pure UI" component, but zero integration risk and consistent with `hashtag-filter.tsx` which uses the same self-fetch pattern.
- **Props interface**: Extend existing `HashtagSelectorProps` with `disabled?: boolean` (additive, non-breaking). Note: spec's `availableHashtags` prop is NOT added — the component self-fetches instead (see above).
- **Icons**: Use **inline SVG** for Plus (+) and Check (✓) icons directly in the component. No external SVG files needed. This matches the codebase pattern (`hashtag-filter.tsx` uses inline SVG for its chevron, `language-selector.tsx` uses inline SVG for globe icon).

### Backend

- **API**: No changes needed. `/api/hashtags` route already returns `{ data: string[] }` with auth check and error handling.
- **Database**: No schema changes. `hashtags` table and `kudos_hashtags` join table already exist.
- **Seed data**: Existing seed has 10 hashtags. The 13 from Figma spec should be seeded — **new seed migration needed**.

### Why NOT extract a generic Dropdown component

The codebase has 3 dropdown variants (`hashtag-selector`, `hashtag-filter`, `department-filter`) each with different selection modes (multi vs single), different visual styles, and different positioning strategies. Extracting a shared abstraction would be premature — Constitution P1 says YAGNI.

---

## Project Structure

### Modified Files

| File | Changes |
|------|---------|
| `src/components/kudos/hashtag-selector.tsx` | **Major refactor**: New UI matching dark theme design, add keyboard nav, ARIA roles, check icons, disabled state, responsive styles |
| `src/app/globals.css` | Add custom scrollbar utility class for dark theme panels |

### New Files

| File | Purpose |
|------|---------|
| `supabase/migrations/20260323_seed_hashtags.sql` | Seed the 13 hashtags from Figma spec into `hashtags` table |

### No Changes Needed

| File | Reason |
|------|--------|
| `src/components/kudos/write-kudo-modal.tsx` | Already imports and uses `HashtagSelector` with compatible props. **Note**: Current modal shows selected hashtags as chips (rendered inside `HashtagSelector`). After refactor, selected state is only visible inside the dropdown. This is consistent with the Figma design — the trigger button is the only visible element when closed. If stakeholders want a "selected count badge" on the trigger, that's a future enhancement. |
| `src/app/api/hashtags/route.ts` | Already returns correct format with auth + error handling |
| `src/types/kudos.ts` | `WriteKudoFormData.hashtags: string[]` already correct |
| `src/libs/supabase/client.ts` | No changes needed |

### Dependencies

No new packages needed. The project uses no UI libraries — all custom components with Tailwind.

---

## Implementation Approach

### Phase 0: Preparation (Assets + Seed Data)

**0.1. Seed hashtags migration**
- Create `supabase/migrations/20260323_seed_hashtags.sql`
- Insert the 13 hashtags from the Figma spec into the `hashtags` table
- Use `INSERT ... ON CONFLICT (name) DO NOTHING` to be idempotent
- Hashtag names (without `#` prefix): `High-perorming`, `BE PROFESSIONAL`, `BE OPTIMISTIC`, `BE A TEAM`, `THINK OUTSIDE THE BOX`, `GET RISKY`, `GO FAST`, `WASSHOI`, `Toàn diện`, `Giỏi chuyên môn`, `Hiệu suất cao`, `Truyền cảm hứng`, `Cống hiến`

**0.2. Inline SVG icons**
- Define Plus and Check icons as inline SVG constants at the top of `hashtag-selector.tsx`
- Check icon: circle with checkmark, 24x24, stroke color `#998C5F`
- Plus icon: 24x24, stroke color `#999`
- No external SVG files needed (matches codebase pattern)

**0.3. Custom scrollbar class**
- Add to `globals.css`:
  ```css
  .scrollbar-dark::-webkit-scrollbar { width: 4px; }
  .scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
  .scrollbar-dark::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
  .scrollbar-dark { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.2) transparent; }
  ```

### Phase 1: Core Refactor — UI + Multi-Select (US1 Scenarios 1-5)

**1.1. Update props interface**
```typescript
interface HashtagSelectorProps {
  hashtags: string[];
  onChange: (tags: string[]) => void;
  label: string;
  maxLabel: string;
  error?: boolean;
  disabled?: boolean;       // NEW — disable entire component
  maxSelections?: number;   // NEW — default: 5 (replaces hardcoded `5`)
}
```
- `disabled` is additive, non-breaking
- `maxSelections` replaces the hardcoded `5` — used internally as `const max = maxSelections ?? 5`
- `availableHashtags` from spec is NOT added — component self-fetches (see Architecture Decisions)

**1.2. Refactor component structure**
- Replace chip-based display with Figma's dark dropdown panel design
- **Trigger button**: Plus icon + "Hashtag\nTối đa 5" text, white bg, `#998C5F` border, 8px radius
- **Dropdown panel**: Dark `#00070C` bg, `#998C5F` border, 8px radius, 6px padding
- **Items**: 40px height (44px on mobile), 16px horizontal padding
- **Selected items**: `rgba(255,234,158,0.20)` background, 2px radius, check icon trailing
- **Unselected items**: Transparent bg, no icon

**1.3. Fix multi-select behavior**
- Current: `setOpen(false)` after each selection → Change: dropdown stays open
- Current: `addTag` prevents duplicates → Keep, add toggle logic (click selected = deselect)
- Current: hides trigger when 5 selected → Change: show trigger always, disable unselected items

**1.4. Click-outside handling**
- Keep existing `useRef` + `mousedown` listener pattern (matches codebase)

### Phase 2: Accessibility + Keyboard (US1 S5, US2 S4, Accessibility section)

**2.1. ARIA attributes**
- Trigger: `aria-haspopup="listbox"`, `aria-expanded={open}`
- Panel: `role="listbox"`, `aria-multiselectable="true"`, `aria-label={label}`
- Items: `role="option"`, `aria-selected={isSelected}`, `aria-disabled={isDisabledByMax}`

**2.2. Keyboard navigation**
- Add `focusedIndex` state (`useState<number>(-1)`)
- `onKeyDown` handler on panel:
  - `ArrowDown`: focusedIndex + 1 (wrap to 0)
  - `ArrowUp`: focusedIndex - 1 (wrap to last)
  - `Enter` / `Space`: toggle selection on focused item
  - `Escape`: close dropdown, return focus to trigger
- `onKeyDown` on trigger:
  - `Enter` / `Space`: toggle dropdown
  - `ArrowDown`: open dropdown and focus first item
- Scroll focused item into view with `scrollIntoView({ block: "nearest" })`

**2.3. Focus management**
- When dropdown opens: focus the panel (or first item)
- When dropdown closes: return focus to trigger button
- `triggerRef = useRef<HTMLButtonElement>(null)` for the trigger button
- `itemRefs = useRef<(HTMLButtonElement | null)[]>([])` for item elements (set via `ref={el => { itemRefs.current[index] = el }}`)
- Use `itemRefs.current[focusedIndex]?.scrollIntoView({ block: "nearest" })` when focusedIndex changes

**2.4. Screen reader announcements**
- Add visually-hidden `aria-live="polite"` region
- Update text on selection change: `${count}/${max}` format (language-neutral)
- This avoids i18n complexity for screen reader strings — the format `"3/5"` is universally understood
- Announce max limit via `aria-disabled="true"` on items (no separate announcement needed)

### Phase 3: Visual States (US1 S4,6,7 + US2 S1-3)

**3.1. Trigger states**
- Default: white bg, `#998C5F` border
- Hover: `rgba(255,234,158,0.10)` bg
- Open: `rgba(255,234,158,0.15)` bg
- Error: `#EF4444` border (when `error` prop true)
- Disabled: `opacity-60`, `cursor-not-allowed`

**3.2. Item states**
- Hover (unselected): `bg-white/5`
- Hover (selected): `bg-[rgba(255,234,158,0.30)]`
- Keyboard focused: `outline: 1px solid rgba(255,255,255,0.4)`, `outline-offset: -1px`
- Disabled (max reached, unselected): `opacity-40`, `cursor-not-allowed`, `pointer-events-none`

**3.3. Error state (validation)**
- Trigger border red when `error={true}`
- Write-kudo-modal already passes `error` prop — just need to wire up the visual

**3.4. Empty state**
- If API returns empty array: show "Không có hashtag nào" message in panel
- Montserrat 14px/400, color `#999`

### Phase 4: Responsive + Polish

**4.1. Mobile-first responsive**
- Panel: `w-full md:w-[318px]`
- Items: `min-h-[44px] md:min-h-[40px]` (Constitution P4: 44px touch target)
- Panel positioning: absolute below trigger

**4.2. Animation**
- Keep simple conditional rendering (`{open && <div>...}`) — no animation. This is consistent with all other dropdowns in the codebase (`hashtag-filter.tsx`, `department-filter.tsx`, `user-menu.tsx`) which all use `{open && ...}` without transitions. Adding animation would require keeping the DOM element mounted and toggling visibility, which adds complexity for minimal UX benefit.

**4.3. Scrollbar**
- Apply `.scrollbar-dark` class to panel
- `max-h-[332px] overflow-y-auto`

**4.4. Z-index**
- Panel: `z-50` (consistent with existing dropdowns in codebase)

---

## Detailed File Changes

### `src/components/kudos/hashtag-selector.tsx` (full refactor)

**Lines to change**: Essentially all 82 lines. The structure changes fundamentally from chip-based to dropdown-with-checkmarks.

**Key structural changes**:
1. Remove chip rendering (`hashtags.map(tag => <span>...✕</span>)`)
2. Replace with trigger button (always visible) + dropdown panel
3. Items show all options with selected/unselected state (not filtered list)
4. Toggle on click (not add-only)
5. Add keyboard event handlers
6. Add ARIA attributes
7. Add `aria-live` region

**Estimated size**: ~150-170 lines (within P1 200-line limit)

### `src/app/globals.css`

**Add after existing keyframes** (4 lines):
```css
.scrollbar-dark::-webkit-scrollbar { width: 4px; }
.scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
.scrollbar-dark::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
.scrollbar-dark { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.2) transparent; }
```

### `supabase/migrations/20260323_seed_hashtags.sql`

```sql
INSERT INTO hashtags (name) VALUES
  ('High-perorming'),
  ('BE PROFESSIONAL'),
  ('BE OPTIMISTIC'),
  ('BE A TEAM'),
  ('THINK OUTSIDE THE BOX'),
  ('GET RISKY'),
  ('GO FAST'),
  ('WASSHOI'),
  ('Toàn diện'),
  ('Giỏi chuyên môn'),
  ('Hiệu suất cao'),
  ('Truyền cảm hứng'),
  ('Cống hiến')
ON CONFLICT (name) DO NOTHING;
```

---

## Testing Strategy

| Type | Focus | Method |
|------|-------|--------|
| Manual | Visual match to Figma screenshot | Compare side-by-side at 375px, 768px, 1440px |
| Manual | Multi-select toggle | Click to select/deselect, verify check icon appears/disappears |
| Manual | Max limit (5) | Select 5, verify 6th is disabled |
| Manual | Keyboard | Tab to trigger, Enter to open, Arrow to navigate, Enter to select, Escape to close |
| Manual | Click-outside | Click outside dropdown, verify it closes |
| Manual | Error state | Submit form without hashtag, verify red border |
| Manual | Screen reader | VoiceOver/NVDA: verify role announcements and selection count |
| E2E (future) | Critical path | Playwright test: open modal → select 3 hashtags → submit |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking write-kudo-modal integration | High | Keep same export name and props interface (additive only) |
| Seed data mismatch with existing DB | Low | Use `ON CONFLICT DO NOTHING` — idempotent |
| 200-line limit exceeded | Low | Extract inline SVG icons to constants at top of file |
| Dropdown positioning on mobile | Medium | Use `w-full` on mobile, absolute positioning relative to wrapper |
| Migration requires Supabase restart | Low | Run `npx supabase db reset` or `make down && make up` to apply new seed migration locally |
| Selected hashtags not visible when dropdown closed | Medium | Matches Figma design. If UX feedback says otherwise, add optional chip display below trigger as future enhancement |

---

## Implementation Order (Recommended)

```
Phase 0 → Phase 1 → Phase 3 → Phase 2 → Phase 4
(Prep)    (Core UI)  (States)  (A11y)    (Polish)
```

Rationale: Get the visual refactor working first (Phase 1), add visual states (Phase 3), then layer on accessibility (Phase 2) and polish (Phase 4). This allows visual testing at each step.

---

## Open Questions

None. All requirements are fully specified in spec.md and design-style.md.
