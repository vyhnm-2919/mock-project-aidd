# Implementation Plan: Dropdown Profile Admin

**Frame:** `721:5277` — Dropdown-profile Admin
**Spec:** `spec.md` | **Design:** `design-style.md`
**Created:** 2026-03-25
**Updated:** 2026-03-26

---

## Summary

Update existing `UserMenu` component (`src/components/header/user-menu.tsx`) to match Figma design. This is a **visual update + feature addition** — behavior scaffolding (click-outside, Escape, signOut) already works. Key changes: update styling to dark/golden theme, add Dashboard item (Admin only), add icons to all items, add active state highlight, add keyboard navigation, add i18n, add signOut loading/error handling.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15.x (App Router)
**Primary Dependencies**: React 19.x, Tailwind CSS 4.x, @supabase/ssr 0.8.x
**Database**: N/A (no DB changes)
**Testing**: ESLint + Manual + Playwright E2E (existing)
**State Management**: Local component state (useState)
**API Style**: N/A (client-side Supabase SDK only)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case file, PascalCase component)
- [x] Uses approved libraries and patterns (Supabase, Tailwind, next/image)
- [x] Adheres to folder structure guidelines (components/header/)
- [x] Meets security requirements (Supabase Auth, no secrets exposed)
- [x] Follows testing standards (ESLint, manual, E2E)

**Violations:** None

| Requirement | Constitution Rule | Status |
|-------------|-------------------|--------|
| TypeScript strict | Principle 2 | ✅ Existing |
| `"use client"` for interactivity | Principle 3 | ✅ Existing |
| kebab-case file / PascalCase component | Naming | ✅ `user-menu.tsx` / `UserMenu` |
| Tailwind CSS styling | Tech Stack | ✅ Utilities |
| Keyboard navigation | Principle 7 | ⚠️ Need: Arrow key nav between items |
| WCAG AA | Principle 7 | ⚠️ Need: `aria-current="page"`, tab trapping |
| Touch targets ≥ 44px | Principle 4 | ✅ Items 56px height |
| next/image for images | Principle 4 & 6 | ✅ Using `next/image` |
| No dead code | Principle 1 | 📋 Verify after changes |
| ESLint zero warnings | Principle 7 | 📋 Verify after changes |
| Error handling: generic messages | Principle 5 | ⚠️ Need: toast for signOut error |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure:** Update existing `UserMenu` in-place. No new component files needed. Estimated ~160-180 lines after rewrite (under 200-line constitution budget; current: 92 lines).
- **Styling Strategy:** Tailwind utilities with arbitrary values for Figma tokens (e.g., `bg-[#00070C]`, `border-[#998C5F]`).
- **Data Fetching:** None — all data is props from server component parent or client hooks (`usePathname`).

### Backend Approach

- **No backend changes.** SignOut uses existing Supabase client SDK.
- **Admin role detection:** Accept `isAdmin` prop from server parent. Default `false`. Server component in layout reads `user.app_metadata.role` from Supabase session.

### Integration Points

- **Existing Services:**
  - Supabase Auth: `createClient()` from `src/libs/supabase/client.ts` (replace inline `createBrowserClient` call)
  - Next.js Router: `useRouter()` for navigation, `usePathname()` for active state
- **Shared Components:** None — self-contained dropdown
- **Shared Patterns:**
  - i18n: Follow `FabTranslations` type + `getFabTranslations()` getter pattern
  - Toast: Follow existing `useState + setTimeout` pattern (no external library)
  - Keyboard nav: Follow `LanguageSelector` `focusedIndex` pattern
  - Pathname: Use `usePathname()` client-side (simpler than passing from parent via headers)

---

## Codebase Research Findings

### Existing UserMenu (`src/components/header/user-menu.tsx`)
- **92 lines**, client component with `useState`, `useRef`, `useEffect`
- Has: click-outside close, Escape key close, signOut with `router.push("/login")`
- Missing: Dashboard item, icons, active state, keyboard nav, i18n, loading/error for signOut
- Creates Supabase client inline → should use shared `createClient()` from `src/libs/supabase/client.ts`

### MainHeader Integration (`src/components/header/main-header.tsx`)
- Props: `{ locale, translations, pathname }`
- Renders `<UserMenu />` with no props currently
- Need to pass: `translations` (new UserMenu translations), `isAdmin`

### Layout (`src/app/(main)/layout.tsx`)
- Server component that fetches locale, translations, pathname
- Pattern: `getFooTranslations(locale)` → pass to component
- Need: add `getUserMenuTranslations(locale)` + pass to `MainHeader` → `UserMenu`

### i18n (`src/utils/i18n.ts`)
- Pattern: type interface → Record<Locale, T> → getter function
- Menu translation keys confirmed **not yet present**

### Toast Pattern
- Simple `useState<boolean>` + `setTimeout(3000)` to auto-dismiss
- Used in `kudo-action-footer.tsx` and `write-kudo-modal.tsx`
- No external toast library — keep it simple, inline

### Admin Role
- **No `role` field exists** in current `UserProfile` type or Supabase session metadata
- Middleware only checks `user !== null`
- **Decision:** Accept `isAdmin` prop with default `false`. When backend adds role to `app_metadata`, wire it up in layout.

### Icon Assets
- `user.svg` ✅ exists at `public/images/icons/`
- `dashboard.svg` ❌ need download from Figma (Component `662:10350`)
- `logout.svg` ❌ need download from Figma (Component `335:10890`)

---

## Visual Refinement: Current → Figma Target

### Dropdown Panel (`<div role="menu">`)

| Property | Current | Figma Target | Tailwind |
|----------|---------|--------------|----------|
| Background | `bg-[rgba(11,15,18,0.95)]` | `#00070C` solid | `bg-[#00070C]` |
| Backdrop | `backdrop-blur-[10px]` | none | remove |
| Border | `border-[#2E3940]` | `#998C5F` golden | `border-[#998C5F]` |
| Border radius | `rounded` (4px) | 8px | `rounded-lg` |
| Padding | none | 6px | `p-1.5` |
| Min width | `min-w-[180px]` | auto | remove |
| Overflow | `overflow-hidden` | visible | remove |
| Z-index | implicit | 50 | `z-50` |

### Menu Items (`<button role="menuitem">`)

| Property | Current | Figma Target | Tailwind |
|----------|---------|--------------|----------|
| Layout | `w-full text-left` | flex row | `w-full flex items-center gap-1` |
| Text | `text-sm text-white` | Montserrat 16px/700 | `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white` |
| Padding | `px-4 py-3` | 16px all | `p-4` |
| Height | auto | 56px | `h-14` |
| Border radius | none | 4px | `rounded` |
| Hover bg | `bg-white/10` | golden tint | `hover:bg-[rgba(255,234,158,0.10)]` |
| Active bg | none | golden tint | `bg-[rgba(255,234,158,0.10)]` (conditional) |
| Active text | none | glow | `[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` |
| Icons | none | 24x24 per item | `<Image>` after text label |
| Transition | none | 150ms ease | `transition-colors` |

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/721-5277-Dropdown-profile-Admin/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design tokens & visual specs ✅
├── plan.md              # This file ✅
├── tasks.md             # Task breakdown (next step)
└── assets/frame.png     # Reference screenshot ✅
```

### Modified Files

| File | Changes |
|------|---------|
| `src/components/header/user-menu.tsx` | Rewrite dropdown panel + items. Add props (`isAdmin`, `translations`), icons, active state (via `usePathname`), keyboard nav, signOut loading/error, i18n |
| `src/components/header/main-header.tsx` | Update `MainHeaderProps` interface: add `userMenuTranslations: UserMenuTranslations`, `isAdmin: boolean`. Forward both to `<UserMenu>` |
| `src/app/(main)/layout.tsx` | Import + call `getUserMenuTranslations(locale)`, pass result + `isAdmin` to `<MainHeader>` |
| `src/utils/i18n.ts` | Add `import type { UserMenuTranslations }`, add `userMenuTranslations: Record<Locale, UserMenuTranslations>`, add `getUserMenuTranslations()` getter |

### New Files

| File | Purpose |
|------|---------|
| `src/types/header.ts` | `UserMenuTranslations` interface (following `src/types/fab.ts` pattern) |
| `public/images/icons/dashboard.svg` | Dashboard grid icon (download from Figma `662:10350`) |
| `public/images/icons/logout.svg` | Logout chevron-right icon (download from Figma `335:10890`) |

### Dependencies

None — no new packages needed.

---

## Implementation Strategy

### Phase 0: Asset Preparation (1 task)
- Download `dashboard.svg` (Figma Component `662:10350`) and `logout.svg` (Figma Component `335:10890`) using `mcp__momorph__get_media_file`
- Save to `public/images/icons/`
- Verify SVG quality and dimensions (24x24)

### Phase 1: i18n & Types (1 task)
1. Create `src/types/header.ts` with interfaces:
   ```typescript
   export interface UserMenuTranslations {
     menuProfile: string;
     menuDashboard: string;
     menuLogout: string;
     menuLogoutError: string;
   }

   export interface MenuItem {
     label: string;
     href: string | null;
     icon: string;
     show: boolean;
     action?: "signout";
   }
   ```
2. Add translations to `src/utils/i18n.ts`:
   - vi: `menuProfile: "Hồ sơ"`, `menuDashboard: "Bảng điều khiển"`, `menuLogout: "Đăng xuất"`, `menuLogoutError: "Đăng xuất thất bại, vui lòng thử lại"`
   - en: `menuProfile: "Profile"`, `menuDashboard: "Dashboard"`, `menuLogout: "Logout"`, `menuLogoutError: "Logout failed, please try again"`
3. Add `getUserMenuTranslations(locale)` getter function (follow `getFabTranslations` pattern)

### Phase 2: Update UserMenu Component (2 tasks) [US1 + US2]

**Task 2a: Core rewrite** — `src/components/header/user-menu.tsx`

1. **Update component signature:**
   ```typescript
   interface UserMenuProps {
     isAdmin?: boolean;
     translations: UserMenuTranslations;
   }
   export function UserMenu({ isAdmin = false, translations }: UserMenuProps): React.ReactElement
   ```
2. **Add state:** `isSigningOut: boolean` (default `false`), `signOutError: boolean` (default `false`), `focusedIndex: number` (default `-1`)
3. **Use shared Supabase client:** Replace inline `createBrowserClient()` with `createClient()` from `src/libs/supabase/client.ts`
4. **Use `usePathname()`:** For active item detection (import from `next/navigation`)
5. **Define menu items data array** (typed as `MenuItem[]`):
   ```typescript
   const menuItems: MenuItem[] = [
     { label: translations.menuProfile, href: "/profile", icon: "/images/icons/user.svg", show: true },
     { label: translations.menuDashboard, href: "/admin", icon: "/images/icons/dashboard.svg", show: isAdmin },
     { label: translations.menuLogout, href: null, icon: "/images/icons/logout.svg", show: true, action: "signout" },
   ].filter(item => item.show);
   ```
6. **Update dropdown panel styles** (see Visual Refinement table above)
7. **Render menu items** with:
   - Conditional active state: `item.href && pathname.startsWith(item.href)` → golden bg + text-shadow glow
   - Icon on the right: `<Image src={item.icon} width={24} height={24} alt="" aria-hidden="true" />`
   - `aria-current="page"` on active item
   - **Logout item:** When `isSigningOut`, replace icon with CSS spinner (`animate-spin` on a circular border element), set `disabled`, add `opacity-60 cursor-not-allowed`
8. **SignOut with loading/error:**
   ```typescript
   async function handleSignOut(): Promise<void> {
     if (isSigningOut) return; // Prevent multiple rapid clicks
     setIsSigningOut(true);
     try {
       const supabase = createClient();
       await supabase.auth.signOut();
       router.push("/login");
     } catch {
       setSignOutError(true);
       setTimeout(() => setSignOutError(false), 3000);
       setIsSigningOut(false);
     }
   }
   ```
   **Toast visual** (inline, below dropdown): `position: absolute; bottom: -40px; right: 0` — styled same as codebase pattern:
   ```tsx
   {signOutError && (
     <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-red-600 text-white text-sm rounded shadow-lg whitespace-nowrap z-50">
       {translations.menuLogoutError}
     </div>
   )}
   ```

**Task 2b: Keyboard navigation + auto-close**

9. **Keyboard navigation** (follow `LanguageSelector` pattern exactly):
   - `handleKeyDown(event: React.KeyboardEvent)` on trigger button + menu container
   - When closed: Enter/Space → open + `setFocusedIndex(0)`
   - When open: ArrowDown → `focusedIndex + 1` (wrap to 0), ArrowUp → `focusedIndex - 1` (wrap to last)
   - Enter/Space on focused item → activate (navigate or signOut)
   - Escape → `close()` + return focus to trigger button via `triggerRef.current?.focus()`
   - Add `triggerRef = useRef<HTMLButtonElement>(null)` for focus return
   - Focused item visual: same as hover (`bg-[rgba(255,234,158,0.10)] rounded`)
10. **Auto-close on route change:**
    ```typescript
    useEffect(() => { close(); }, [pathname, close]);
    ```
11. **Reset focusedIndex** when dropdown closes: handled in existing `close()` callback (set `focusedIndex(-1)`)

### Phase 3: Wire Props from Parent (1 task)
1. **`src/app/(main)/layout.tsx`:**
   ```typescript
   import { getUserMenuTranslations } from "@/utils/i18n";
   // In function body:
   const userMenuT = getUserMenuTranslations(locale);
   // In JSX:
   <MainHeader locale={locale} translations={translations} pathname={pathname}
     userMenuTranslations={userMenuT} isAdmin={false} />
   ```
2. **`src/components/header/main-header.tsx`:**
   - Update `MainHeaderProps` interface:
     ```typescript
     interface MainHeaderProps {
       locale: Locale;
       translations: HomepageTranslations;
       pathname: string;
       userMenuTranslations: UserMenuTranslations;  // ADD
       isAdmin?: boolean;                            // ADD
     }
     ```
   - Forward to UserMenu: `<UserMenu translations={userMenuTranslations} isAdmin={isAdmin} />`
3. **`isAdmin` prop:** Hardcode `false` in layout for now. When backend adds role to `app_metadata`, replace with:
   ```typescript
   const supabase = await createClient();
   const { data: { user } } = await supabase.auth.getUser();
   const isAdmin = user?.app_metadata?.role === "admin";
   ```

### Phase 4: Verify & Lint (1 task)
1. Run `yarn lint` — zero warnings
2. Visual comparison against `assets/frame.png`
3. Test all scenarios:
   - Open/close dropdown (click, Escape, click-outside)
   - Navigate Profile → `/profile`
   - Navigate Dashboard → `/admin` (Admin only)
   - Logout → signOut → `/login`
   - Keyboard: Arrow keys, Enter, Space, Escape
   - Active state highlight on `/profile` and `/admin`
   - i18n: verify VN/EN labels
   - SignOut error: disconnect network, verify toast appears

**Total: 5 phases, 6 tasks**

### Commit Strategy (Conventional Commits — Principle 7)

| After Phase | Commit Message |
|-------------|----------------|
| Phase 0 | `chore(header): add dashboard and logout icon assets` |
| Phase 1 | `feat(i18n): add user menu translation keys (vi/en)` |
| Phase 2a+2b | `feat(header): update UserMenu dropdown to match Figma design` |
| Phase 3 | `feat(header): wire UserMenu translations and isAdmin prop from layout` |

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: UserMenu ↔ MainHeader prop passing
- [x] **External dependencies**: Supabase Auth signOut
- [ ] **Data layer**: N/A
- [x] **User workflows**: Open menu → navigate/signOut → verify redirect

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Dropdown open/close, active state, keyboard nav |
| Service ↔ Service | No | — |
| App ↔ External API | Yes | Supabase signOut success/failure |
| App ↔ Data Layer | No | — |
| Cross-platform | No | Fixed-size component, no responsive changes |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Admin opens dropdown → sees Profile, Dashboard, Logout with icons
   - [x] Click Profile → navigates to `/profile`, dropdown closes
   - [x] Click Dashboard → navigates to `/admin`, dropdown closes
   - [x] Click Logout → loading state → signOut → redirect to `/login`
   - [x] Active state highlights correct item based on current page

2. **Error Handling**
   - [x] SignOut fails → toast "Đăng xuất thất bại" → button re-enabled after 3s
   - [x] Session expired → signOut returns error → still redirect to `/login`

3. **Edge Cases**
   - [x] Non-admin user → Dashboard item hidden
   - [x] Multiple rapid clicks on Logout → only one signOut call
   - [x] Route change → dropdown auto-closes
   - [x] Keyboard: full Arrow/Enter/Escape cycle

### Tooling

- **ESLint**: `yarn lint` on changed files
- **Playwright E2E**: Existing header tests — verify no regression
- **Manual**: Visual + keyboard + screen reader

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Admin role not in session metadata yet | High | Medium | Accept `isAdmin` prop, default `false`; Dashboard hidden until role is wired |
| Missing SVG icons from Figma | Low | Low | Download via `mcp__momorph__get_media_file` in Phase 0 |
| Keyboard nav adds complexity | Low | Low | Follow existing LanguageSelector `focusedIndex` pattern |
| i18n type additions may cause TS errors | Low | Low | New separate type `UserMenuTranslations`, no modification to existing types |
| Toast pattern is not centralized | Low | Low | Use same inline `useState + setTimeout` as rest of codebase |

### Estimated Complexity

- **Frontend**: Medium (visual rewrite + keyboard nav + loading/error states)
- **Backend**: None
- **Testing**: Low (mostly manual verification)

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (reviewed and updated 2026-03-26)
- [x] `design-style.md` verified against Figma (reviewed and updated 2026-03-26)
- [ ] Icon assets downloaded from Figma (Phase 0)

### External Dependencies

- Supabase Auth service (existing, no changes)
- Figma icon export (Phase 0 only)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Begin** Phase 0 (asset download) → Phase 1 (i18n) → Phase 2 (component) → Phase 3 (wiring) → Phase 4 (verify)

---

## Notes

- **Supabase client refactor:** Current UserMenu creates Supabase client inline with `createBrowserClient(url, key)`. This plan uses the shared `createClient()` from `src/libs/supabase/client.ts` — cleaner and consistent with rest of codebase.
- **`usePathname()` vs prop:** Spec originally suggested `currentPath` as a prop, but `usePathname()` is simpler and avoids prop drilling through MainHeader. Since UserMenu is already a client component, this is the preferred approach.
- **`font-montserrat` verified:** The Tailwind utility class `font-montserrat` is confirmed working — configured via CSS variable `--font-montserrat` in `globals.css`, loaded in root `layout.tsx` via `next/font`. Same class is used in `LanguageSelector` and `NavLink`.
- **LanguageSelector as reference pattern:** The `LanguageSelector` component at `src/components/header/language-selector.tsx` (162 lines) uses identical dropdown styling (`bg-[#00070C]`, `border-[#998C5F]`, `rounded-lg`, `p-1.5`, `z-50`), identical item styling (`h-14`, `p-4`, `gap-1`, `font-montserrat text-base font-bold`), and identical keyboard nav pattern (`focusedIndex`, `handleKeyDown`, wrap-around). Copy this pattern closely.
- **Admin role caveat:** No admin role mechanism exists in the current codebase. The `isAdmin` prop defaults to `false` — Dashboard item will be hidden until the backend team adds role to Supabase `app_metadata`. This is documented as a known limitation.
- **Toast visual decision:** Uses inline absolute-positioned red toast below dropdown (not a global toast system). Matches the simplicity of existing `useState + setTimeout` pattern in the codebase. If a centralized toast system is added later, this can be migrated.
