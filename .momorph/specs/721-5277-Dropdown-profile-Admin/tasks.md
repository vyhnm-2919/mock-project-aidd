# Tasks: Dropdown Profile Admin

**Frame**: `721-5277-Dropdown-profile-Admin`
**Plan**: `plan.md` | **Spec**: `spec.md` | **Design**: `design-style.md`
**Created**: 2026-03-25
**Updated**: 2026-03-26

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | 18 |
| Phase 1 — Setup | 4 tasks (assets + types + i18n) |
| Phase 2 — Foundation | 2 tasks (wire props) |
| Phase 3 — US1 (P1) | 7 tasks (core rewrite + keyboard + auto-close) |
| Phase 4 — US2 (P2) | 1 task (active state) |
| Phase 5 — Polish | 4 tasks (lint + verification) |
| Parallel opportunities | T001+T002+T003+T004, T015+T016+T017+T018 |
| MVP scope | Phase 1→2→3 (US1 only) |

---

## Phase 1: Setup (Asset Preparation & Types)

**Purpose**: Download missing icon assets and create shared types/i18n infrastructure

- [ ] T001 [P] Download dashboard grid icon (Figma Component `662:10350`) via `mcp__momorph__get_media_file` and save as 24x24 SVG | `public/images/icons/dashboard.svg`
- [ ] T002 [P] Download logout chevron-right icon (Figma Component `335:10890`) via `mcp__momorph__get_media_file` and save as 24x24 SVG | `public/images/icons/logout.svg`
- [ ] T003 [P] Create `UserMenuTranslations` and `MenuItem` interfaces following `src/types/fab.ts` pattern. `UserMenuTranslations`: `menuProfile: string`, `menuDashboard: string`, `menuLogout: string`, `menuLogoutError: string`. `MenuItem`: `label: string`, `href: string | null`, `icon: string`, `show: boolean`, `action?: "signout"` | `src/types/header.ts`
- [ ] T004 [P] Add user menu translations to i18n: import `UserMenuTranslations` from `@/types/header`, add `userMenuTranslations: Record<Locale, UserMenuTranslations>` with vi (`menuProfile: "Hồ sơ"`, `menuDashboard: "Bảng điều khiển"`, `menuLogout: "Đăng xuất"`, `menuLogoutError: "Đăng xuất thất bại, vui lòng thử lại"`) and en (`"Profile"`, `"Dashboard"`, `"Logout"`, `"Logout failed, please try again"`), add `getUserMenuTranslations(locale: Locale): UserMenuTranslations` getter function following `getFabTranslations` pattern | `src/utils/i18n.ts`

**Commit**: `chore(header): add dropdown profile admin assets and i18n types`

**Checkpoint**: Types compile, translations accessible via `getUserMenuTranslations()`, icons in public folder

---

## Phase 2: Foundation (Wire Props from Parent)

**Purpose**: Connect layout -> MainHeader -> UserMenu prop chain so component receives translations

**MUST complete before US1/US2**: UserMenu needs `translations` prop to render

- [ ] T005 Update `MainHeaderProps` interface: add `userMenuTranslations: UserMenuTranslations` (import from `@/types/header`) and `isAdmin?: boolean`. Destructure new props and forward to `<UserMenu translations={userMenuTranslations} isAdmin={isAdmin} />` | `src/components/header/main-header.tsx`
- [ ] T006 Import `getUserMenuTranslations` from `@/utils/i18n`, call `const userMenuT = getUserMenuTranslations(locale)` in function body, pass `userMenuTranslations={userMenuT}` and `isAdmin={false}` to `<MainHeader>` | `src/app/(main)/layout.tsx`

**Commit**: `feat(header): wire UserMenu translations and isAdmin prop from layout`

**Checkpoint**: App compiles with new props flowing through; UserMenu receives translations

---

## Phase 3: User Story 1 — Truy cap nhanh cac chuc nang Admin (Priority: P1)

**Goal**: Admin sees dropdown with Profile/Dashboard/Logout items with icons, can navigate and sign out with loading/error handling, keyboard accessible

**Independent Test**: Click user icon -> dropdown opens with 3 items (icons + labels) -> click each navigates correctly -> Logout shows spinner -> signOut works -> non-admin hides Dashboard -> keyboard Arrow/Enter/Escape works

### Core Rewrite (US1)

- [ ] T007 [US1] Update `UserMenu` component signature: add `interface UserMenuProps { isAdmin?: boolean; translations: UserMenuTranslations; }`, destructure props with `isAdmin = false` default. Replace inline `createBrowserClient()` with `createClient()` from `src/libs/supabase/client.ts`. Add `usePathname()` import from `next/navigation`. Add state: `isSigningOut: boolean` (false), `signOutError: boolean` (false), `focusedIndex: number` (-1). Add `triggerRef = useRef<HTMLButtonElement>(null)` | `src/components/header/user-menu.tsx`
- [ ] T008 [US1] Define menu items data array typed as `MenuItem[]` (import from `@/types/header`): Profile (`href: "/profile"`, `icon: "/images/icons/user.svg"`, `show: true`), Dashboard (`href: "/admin"`, `icon: "/images/icons/dashboard.svg"`, `show: isAdmin`), Logout (`href: null`, `icon: "/images/icons/logout.svg"`, `show: true`, `action: "signout"`). Apply `.filter(item => item.show)`. Use `translations.menuProfile/menuDashboard/menuLogout` as labels | `src/components/header/user-menu.tsx`
- [ ] T009 [US1] Update dropdown panel container styles: replace `bg-[rgba(11,15,18,0.95)] backdrop-blur-[10px]` with `bg-[#00070C]`, replace `border-[#2E3940]` with `border-[#998C5F]`, replace `rounded` with `rounded-lg`, add `p-1.5`, add `z-50`, add `flex flex-col`, remove `min-w-[180px]`, remove `overflow-hidden` | `src/components/header/user-menu.tsx`
- [ ] T010 [US1] Rewrite menu items render: replace 2 hardcoded buttons with `.map()` over `menuItems`. Each `<button role="menuitem">` with classes: `w-full flex items-center gap-1 p-4 h-14 rounded font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white transition-colors cursor-pointer hover:bg-[rgba(255,234,158,0.10)]`. Add `<Image src={item.icon} width={24} height={24} alt="" aria-hidden="true" className="w-6 h-6" />` after text span. Navigation items: `router.push(item.href)` + `close()`. Logout item: call `handleSignOut` | `src/components/header/user-menu.tsx`
- [ ] T011 [US1] Implement `handleSignOut` with loading/error: guard `if (isSigningOut) return`, set `setIsSigningOut(true)`, try/catch `createClient().auth.signOut()` -> success: `router.push("/login")` -> catch: `setSignOutError(true)`, `setTimeout(() => setSignOutError(false), 3000)`, `setIsSigningOut(false)`. Logout button when `isSigningOut`: add `disabled`, `opacity-60 cursor-not-allowed`, replace icon with spinner `<span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />`. Add error toast below dropdown: `{signOutError && <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-red-600 text-white text-sm rounded shadow-lg whitespace-nowrap z-50">{translations.menuLogoutError}</div>}` | `src/components/header/user-menu.tsx`

### Keyboard Navigation & Auto-close (US1)

- [ ] T012 [US1] Add `handleKeyDown(event: React.KeyboardEvent)` on trigger button and menu container, following `LanguageSelector` pattern at `src/components/header/language-selector.tsx`. When closed: Enter/Space -> open + `setFocusedIndex(0)`. When open: ArrowDown -> increment (wrap to 0), ArrowUp -> decrement (wrap to last), Enter/Space -> activate focused item, Escape -> `close()` + `triggerRef.current?.focus()`. Focused item visual: `focusedIndex === index ? "bg-[rgba(255,234,158,0.10)] rounded" : ""`. Update `close()` to also `setFocusedIndex(-1)` | `src/components/header/user-menu.tsx`
- [ ] T013 [US1] Add auto-close on route change: `useEffect(() => { close(); }, [pathname, close])` using `pathname` from `usePathname()` | `src/components/header/user-menu.tsx`

**Commit**: `feat(header): update UserMenu dropdown to match Figma design`

**Checkpoint**: US1 complete — dropdown opens/closes, 3 items with icons, navigation works, signOut with loading/error, keyboard nav, non-admin hides Dashboard

---

## Phase 4: User Story 2 — Nhan dien item dang active (Priority: P2)

**Goal**: Active page highlighted with golden background + text glow in dropdown

**Independent Test**: Navigate to `/profile` -> open dropdown -> Profile has golden bg + glow. Navigate to `/admin` -> Dashboard highlighted. Navigate to `/` -> no highlight on any item

### Active State (US2)

- [ ] T014 [US2] Add active state logic to menu item render: compute `const isActive = item.href !== null && pathname.startsWith(item.href)`. When `isActive`: add `bg-[rgba(255,234,158,0.10)]` bg class + `[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` on text span + `aria-current="page"` attribute. When NOT active AND NOT focused: `bg-transparent`. Logout item (href null) never gets active state | `src/components/header/user-menu.tsx`

**Commit**: `feat(header): add active state highlight to UserMenu dropdown items`

**Checkpoint**: US2 complete — active item highlights on /profile and /admin, no highlight elsewhere

---

## Phase 5: Polish & Verification

**Purpose**: Lint, visual verification, accessibility check

- [ ] T015 [P] Run `yarn lint` on all changed files, fix any ESLint warnings to zero | `src/components/header/user-menu.tsx`, `src/components/header/main-header.tsx`, `src/app/(main)/layout.tsx`, `src/utils/i18n.ts`, `src/types/header.ts`
- [ ] T016 [P] Visual comparison: open app, click user icon, compare dropdown against `.momorph/specs/721-5277-Dropdown-profile-Admin/assets/frame.png`. Verify: dark bg #00070C, golden border #998C5F, rounded-lg 8px, 3 items with icons, Montserrat 16px bold white text, hover golden tint, icon sizes 24x24
- [ ] T017 [P] Functional verification: (1) open/close via click + Escape + click-outside, (2) Profile navigates to `/profile`, (3) Dashboard navigates to `/admin`, (4) Logout shows spinner then redirects to `/login`, (5) keyboard Arrow/Enter/Space/Escape cycle, (6) active highlight on `/profile` and `/admin`, (7) no highlight on homepage, (8) switch language VN/EN verify labels
- [ ] T018 [P] Edge case verification: (1) set `isAdmin={false}` in layout -> Dashboard hidden, (2) simulate signOut error -> toast appears 3s then disappears, (3) rapid-click Logout -> only one signOut, (4) navigate while dropdown open -> auto-closes

**Commit**: `fix(header): lint and polish UserMenu dropdown`

**Checkpoint**: All stories verified, lint passes, visual match confirmed

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup ──────────────────> can start immediately
    T001, T002, T003, T004 [all parallel]
         |
         v
Phase 2: Foundation ─────────────> depends on Phase 1 (needs types from T003)
    T005 -> T006 [sequential]
         |
         v
Phase 3: US1 (P1) ──────────────> depends on Phase 2 (needs props wired)
    T007 -> T008 -> T009 -> T010 -> T011 [sequential: builds on each step]
    T012 -> T013 [sequential: keyboard before auto-close]
    Note: T012 depends on T010 (needs rendered items for focus)
         |
         v
Phase 4: US2 (P2) ──────────────> depends on Phase 3 (needs rendered items)
    T014 [single task]
         |
         v
Phase 5: Polish ─────────────────> depends on Phase 4
    T015, T016, T017, T018 [all parallel after T015 lint passes]
```

### Parallel Opportunities

| Group | Tasks | Reason |
|-------|-------|--------|
| Setup | T001 + T002 + T003 + T004 | Different files: 2 icon downloads + types + i18n |
| Verify | T016 + T017 + T018 | Independent verification areas (visual, functional, edge) |

---

## Implementation Strategy

### MVP First (Recommended)

1. Phase 1 + 2: Setup + Wire props
2. Phase 3: US1 core dropdown
3. **STOP and VALIDATE**: dropdown opens, navigates, signs out with loading/error
4. Deploy — active highlight (US2) is P2 enhancement

### Incremental Delivery

1. Phase 1 + 2 -> Commit
2. Phase 3 (US1) -> Commit -> Test
3. Phase 4 (US2) -> Commit -> Test
4. Phase 5 (Polish) -> Commit -> Final verify

---

## Notes

- Commit after each phase using Conventional Commits (see plan.md)
- Run `yarn lint` before each commit
- Reference `src/components/header/language-selector.tsx` as primary pattern for dropdown styling + keyboard nav
- `isAdmin` is hardcoded `false` until backend adds role to Supabase `app_metadata`
- Mark tasks complete as you go: `[x]`
