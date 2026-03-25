# Implementation Plan: Open Secret Box — chưa mở

**Frame**: `1466:7676` — Open secret box - chưa mở
**Spec**: [spec.md](./spec.md) | [design-style.md](./design-style.md)
**Created**: 2026-03-23

---

## Executive Summary

This is a **new component** — `SecretBoxModal`. No secret box modal exists yet. The parent component `kudos-stats.tsx` already has a TODO placeholder (`handleOpenSecretBox`) and a wired button. The API endpoint `POST /api/secret-box/open` already exists and is fully functional.

### What Exists vs What's Needed

| Layer | Status | Details |
|-------|--------|---------|
| API endpoint | ✅ Exists | `src/app/api/secret-box/open/route.ts` — POST with `{ box_id }` |
| Types | ✅ Exists | `SecretBox`, `OpenSecretBoxResponse` in `src/types/kudos.ts` |
| DB schema | ✅ Exists | `secret_boxes` table with RLS |
| Parent button | ✅ Exists | `kudos-stats.tsx` line 91-98 with TODO |
| Modal component | ❌ New | `src/components/kudos/secret-box-modal.tsx` |
| Assets | ❌ New | Gift box image + light effect from Figma |
| Translations | ❌ New | Modal-specific i18n keys |
| Unopened boxes fetch | ❌ New | Need API or direct Supabase query for box list |

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|-------------|-------------------|--------|
| TypeScript strict | P2: No `any`, explicit types | ✅ Types exist |
| Client Component | P3: `"use client"` for modal + API calls | 📋 New component |
| Responsive | P4: Mobile-first, 44px touch targets | 📋 Plan addresses |
| Security | P5: Supabase RLS, auth-gated API | ✅ Already implemented |
| Performance | P6: Lazy load modal, single API call | 📋 Plan addresses |
| Accessibility | P7: WCAG AA, keyboard, focus trap | 📋 Plan addresses |
| File size | P1: < 200 lines | 📋 Monitor |

---

## Architecture Decisions

### Frontend

- **Component pattern**: New `SecretBoxModal` client component following `write-kudo-modal.tsx` pattern (same overlay z-index `z-[200]`, backdrop `bg-[rgba(0,16,26,0.8)]`, escape key, body scroll lock).
- **State management**: Props-controlled (`isOpen`/`onClose` from parent). Local state for `boxes[]`, `isOpening`, `result`, `error`. Component self-fetches unopened boxes on mount — parent does NOT pass `unopenedBoxes` prop (deviates from spec, but simpler integration since parent doesn't need to fetch box list).
- **Data fetching**: Component fetches unopened boxes via `GET /api/secret-box/unopened` on mount. Consistent with codebase pattern where components fetch their own data via API routes.
- **Parent integration**: `kudos-stats.tsx` manages modal open state only (`isOpen`/`onClose`). Passes `onOpened` callback to refresh stats after successful open. Does NOT manage box list.
- **Assets**: Use `next/image` for gift box image. Download from Figma via MoMorph `get_media_files`.

### Backend

- **API**: No changes. Existing `POST /api/secret-box/open` is fully functional.
- **Database**: No schema changes. `secret_boxes` table and RLS policies already exist.
- **New API route**: `GET /api/secret-box/unopened` to fetch user's unopened boxes (cleaner than client-side Supabase query, consistent with existing API patterns).

### Why a new GET endpoint instead of client-side Supabase

Other components (`hashtag-selector`, `hashtag-filter`) fetch via `/api/*` routes, not direct Supabase client calls. Following this pattern keeps data fetching consistent. The endpoint is trivial (~20 lines).

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/components/kudos/secret-box-modal.tsx` | Secret Box modal component (~150-180 lines) |
| `src/app/api/secret-box/unopened/route.ts` | GET endpoint returning user's unopened SecretBox[] (~25 lines) |
| `public/images/kudos/secret-box-unopened.png` | Gift box image from Figma (558x558) |
| `public/images/kudos/secret-box-effect.png` | Light effect overlay from Figma (547x547, transparent) |

### Modified Files

| File | Changes |
|------|---------|
| `src/components/kudos/kudos-stats.tsx` | Wire modal: add `useState` for modal visibility, replace TODO in `handleOpenSecretBox`, render `<SecretBoxModal>`, pass `onOpened` to refresh stats |
| `src/utils/i18n.ts` | Add 4 translation keys to both VN and EN locale objects |
| `src/types/kudos.ts` | Add 4 fields to `KudosTranslations` interface for secret box modal strings |

### No Changes Needed

| File | Reason |
|------|--------|
| `src/app/api/secret-box/open/route.ts` | Already complete — no changes |
| `supabase/migrations/*` | No schema changes |

### Dependencies

No new packages needed.

---

## Implementation Approach

### Phase 0: Assets + API

**0.1. Download Figma assets**
- Use MoMorph `get_media_files` to download gift box image (`1466:7686`) → `public/images/kudos/secret-box-unopened.png`
- Download light effect overlay (`1466:7685`) → `public/images/kudos/secret-box-effect.png`
- Verify images are correct size and quality

**0.2. Create GET endpoint for unopened boxes**
- Create `src/app/api/secret-box/unopened/route.ts`
- Auth check (same pattern as other endpoints)
- Query: `supabase.from('secret_boxes').select('id, is_opened, gift_description').eq('user_id', user.id).eq('is_opened', false)`
- Response: `{ data: SecretBox[] }`

**0.3. Add translations**
- Add to `src/utils/i18n.ts` in both VN and EN:
  ```typescript
  secretBoxTitle: "KHÁM PHÁ SECRET BOX CỦA BẠN" / "DISCOVER YOUR SECRET BOX"
  secretBoxInstruction: "Click vào box để mở" / "Click the box to open"
  secretBoxUnopenedLabel: "Secretbox chưa mở" / "Unopened Secretbox"
  secretBoxError: "Không thể mở secret box. Vui lòng thử lại." / "Failed to open secret box. Please try again."
  ```

### Phase 1: Modal Component — Core UI (US1 S1, S3, S4)

**1.1. Create `secret-box-modal.tsx`**
- Props: `isOpen`, `onClose`, `onOpened`
- Follow `write-kudo-modal.tsx` pattern:
  - Fixed overlay `z-[200]` with backdrop `bg-[rgba(0,16,26,0.8)]`
  - Escape key handler in `useEffect`
  - Body scroll lock (`document.body.style.overflow = "hidden"`)
  - Backdrop click to close (`onClick` on overlay, `stopPropagation` on modal)

**1.2. Modal structure (matching Figma)**
- Title bar: "KHÁM PHÁ SECRET BOX CỦA BẠN" (26px/700 gold) + close button (19x19 ✕)
- Divider: 1px `#2E3940`
- Instruction: "Click vào box để mở" (13px/700 white, hidden when 0 boxes)
- Box image: `next/image` 557x557 with light effect overlay
- Divider: 1px `#2E3940`
- Footer: "Secretbox chưa mở" (13px white) + count (29px gold, 2-digit padded)

**1.3. Fetch unopened boxes on mount**
- `useEffect` → `fetch('/api/secret-box/unopened')` → store in state
- Derive `count` from `boxes.length`
- Disabled state when `count === 0`

### Phase 2: Open Box Logic (US1 S2, S2b, S5)

**2.1. Click handler**
- Click on box image → set `isOpening = true` (disables further clicks)
- Call `POST /api/secret-box/open` with `{ box_id: boxes[0].id }` (first unopened box)
- On success: set `result = gift_description`, remove box from local list, call `onOpened(response)`
- On error: set `error` message, re-enable box

**2.2. Loading state**
- Box image: `opacity-70` + CSS pulse animation
- Disabled cursor, ignore clicks

**2.3. Success state**
- Display `gift_description` prominently (replace instruction text)
- Box remains clickable if more boxes available (count > 0 after decrement)
- Or show "Không còn secret box nào" if count reaches 0

**2.4. Error state**
- Show error message in instruction area
- Re-enable box for retry

### Phase 3: Parent Integration

**3.1. Wire `kudos-stats.tsx`**
- Add `const [isSecretBoxOpen, setIsSecretBoxOpen] = useState(false)`
- Replace TODO: `handleOpenSecretBox` → `setIsSecretBoxOpen(true)`
- Add `onOpened` callback that refreshes stats (re-fetch `/api/kudos/stats`)
- Render: `<SecretBoxModal isOpen={isSecretBoxOpen} onClose={() => setIsSecretBoxOpen(false)} onOpened={handleBoxOpened} />`

### Phase 4: Accessibility + Polish

**4.1. ARIA attributes**
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="secret-box-title"`
- Close button: `aria-label="Đóng"` or translated
- Box image: `role="button"`, `aria-label="Mở secret box"`, `tabIndex={0}`
- Disabled: `aria-disabled="true"`

**4.2. Keyboard navigation**
- `Escape`: close modal
- `Enter` / `Space` on box image: trigger open
- `Tab`: cycle between close button and box image
- Focus trap within modal

**4.3. Responsive**
- Mobile: `w-full mx-4`, `max-h-[calc(100vh-2rem)] overflow-y-auto`
- Desktop: `max-w-[652px]` centered
- Box image: `w-full max-w-[557px] aspect-square`

**4.4. Visual states** (from design-style.md)
- Box hover: `scale(1.02)`, `brightness(1.1)`
- Box active: `scale(0.98)`
- Box disabled: `opacity-50`, `cursor-not-allowed`
- Box loading: `opacity-70` + `animate-pulse`

---

## Detailed File Changes

### `src/components/kudos/secret-box-modal.tsx` (NEW ~150-180 lines)

```typescript
// Props interface — NOTE: deviates from spec's `unopenedBoxes` prop.
// Component self-fetches via GET /api/secret-box/unopened for simpler parent integration.
interface SecretBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpened: (result: OpenSecretBoxResponse) => void;
  translations: KudosTranslations; // Reuse existing type (extended with 4 new keys)
}

// State
const [boxes, setBoxes] = useState<SecretBox[]>([]);
const [isOpening, setIsOpening] = useState(false);
const [result, setResult] = useState<string | null>(null);
const [error, setError] = useState<string | null>(null);

// Structure: overlay → modal container → title bar → divider → instruction → box image → divider → footer
```

### `src/app/api/secret-box/unopened/route.ts` (NEW ~25 lines)

```typescript
export async function GET(): Promise<NextResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("secret_boxes")
    .select("id, is_opened, gift_description, opened_at")
    .eq("user_id", user.id)
    .eq("is_opened", false);

  if (error) return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  return NextResponse.json({ data: data ?? [] });
}
```

### `src/components/kudos/kudos-stats.tsx` (MODIFY ~10 lines)

- Add import: `import { SecretBoxModal } from "./secret-box-modal"`
- Add state: `const [isSecretBoxOpen, setIsSecretBoxOpen] = useState(false)`
- Replace TODO handler: `setIsSecretBoxOpen(true)`
- Add `handleBoxOpened` callback to refresh stats
- Render `<SecretBoxModal>` in JSX

### `src/types/kudos.ts` (MODIFY ~4 lines)

- Add to `KudosTranslations` interface:
  ```typescript
  secretBoxTitle: string;
  secretBoxInstruction: string;
  secretBoxUnopenedLabel: string;
  secretBoxError: string;
  ```

### `src/utils/i18n.ts` (MODIFY ~8 lines)

- Add values for the 4 new keys in both VN and EN locale objects

---

## Testing Strategy

| Type | Focus | Method |
|------|-------|--------|
| Manual | Modal open/close | Click button → modal opens. Click ✕ → closes. Click backdrop → closes. Escape → closes. |
| Manual | Box image interaction | Click → loading state → result. Disabled when 0 boxes. |
| Manual | Visual match | Compare against `assets/frame.png` at 375px, 768px, 1440px |
| Manual | Keyboard | Tab between close + box. Enter on box opens. Escape closes. |
| Manual | Error state | Simulate API error, verify retry works |
| E2E (future) | Critical path | Playwright: open modal → click box → verify result |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| No seed data for secret_boxes | High | Create a test seed SQL that inserts fake unopened boxes for the test user. Or manually insert via Supabase Studio at `http://127.0.0.1:54323` |
| Gift box image quality | Medium | Download from Figma at 2x resolution, use `next/image` for optimization |
| Modal z-index conflict with other modals | Low | Use same `z-[200]` as `write-kudo-modal.tsx`, only one modal open at a time |
| Gift description is null in DB | Low | API already returns `""` as fallback. Display "Bạn nhận được một huy hiệu!" as default |
| Animation after opening (result reveal) | Medium | Out of scope for this frame (this is "chưa mở" state only). Simple text display for now, animation can be added later per frame `1466:7024` |

---

## Implementation Order (Recommended)

```
Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4
(Assets)  (Core UI)  (Logic)   (Wire)    (Polish)
```

Phase 0 and Phase 1 can partially overlap (start UI while assets download).
Phase 3 (parent integration) should come after Phase 2 so the modal is fully functional before wiring.

---

## Open Questions

None. All requirements are fully specified. The "result reveal" animation after opening is out of scope for this frame — it's a separate Figma frame (`1466:7024`).
