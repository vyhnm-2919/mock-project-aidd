# Dropdown Profile Admin — Design Style Document

**Frame ID:** `721:5277`
**Frame Name:** Dropdown-profile Admin
**Dimensions:** 215 x 304px (frame), dropdown panel ~165 x 180px
**Constitution:** v1.0.0

> **Note:** Existing implementation at `src/components/header/user-menu.tsx` has different styling from Figma. See Section 7 for diff.

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-dropdown` | `#00070C` | Dropdown container background |
| `--color-bg-active` | `rgba(255, 234, 158, 0.10)` | Active/selected item background |
| `--color-bg-hover` | `rgba(255, 234, 158, 0.10)` | Hover state background |
| `--color-text-primary` | `#FFFFFF` | Menu item text |
| `--color-border-dropdown` | `#998C5F` | Container border (golden) |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-menu-item` | Montserrat | 16px | 700 (Bold) | 24px | 0.15px | `#FFFFFF` | Menu item labels |
| `--text-menu-active` | Montserrat | 16px | 700 (Bold) | 24px | 0.15px | `#FFFFFF` + text-shadow | Active item label |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-container-padding` | 6px | Dropdown container padding |
| `--sp-item-padding` | 16px | Menu item internal padding |
| `--sp-item-gap` | 4px | Gap between text and icon inside item |

### Border

| Token | Value | Usage |
|-------|-------|-------|
| `--border-dropdown` | `1px solid #998C5F` | Dropdown container border |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-dropdown` | 8px | Dropdown container |
| `--radius-item` | 4px | Item hover/active state |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-active-text` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Active item text glow |

### Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-hover` | `background-color 150ms ease` | Menu item hover state |
| `--transition-dropdown` | N/A (instant show/hide) | Dropdown open/close — Figma không specify animation, dùng instant toggle |

---

## 2. Component Style Details

### Trigger Button (in Header)
- **Existing:** 40x40px, border `#998C5F`, rounded, user icon 24x24
- **No changes needed** — trigger styling is correct

### Dropdown Container (`666:9728`)
- **Node ID:** `666:9728`
- **Component:** `A_Dropdown-List` (Instance of `666:9276`, Set `563:8216`)
- **Width:** auto (fit-content, derived from widest child ~153px + 6px*2 padding = ~165px)
- **Background:** `#00070C` (var `--Details-Container-2`)
- **Border:** `1px solid #998C5F` (var `--Details-Border`)
- **Border-radius:** 8px
- **Padding:** 6px
- **Layout:** `display: flex; flex-direction: column; align-items: flex-start`
- **Position:** absolute, `top: 100%; right: 0; margin-top: 4px`
- **Z-index:** 50

### Menu Item — Profile / Active (`I666:9728;666:9277`)
- **Node ID:** `I666:9728;666:9277`
- **Component:** `A.1_Profile` (Instance of `186:1496`, Set `186:1426`)
- **Width:** 151px
- **Height:** 56px
- **Background:** `rgba(255, 234, 158, 0.10)` — active state
- **Border-radius:** 4px
- **Layout:** `display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 4px`
- **Inner padding:** 16px
- **Content:**
  - Text "Profile": Montserrat 16px/700/24px, letter-spacing 0.15px, `#FFFFFF`, text-shadow `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`
  - Icon: User profile icon 24x24px (Component `186:1611`)

### Menu Item — Dashboard / Default (`I666:9728;666:9452`)
- **Node ID:** `I666:9728;666:9452`
- **Component:** `A.2_Dashboard` (Instance of `186:1433`, Set `186:1426`)
- **Width:** 153px
- **Height:** 56px
- **Background:** transparent
- **Border-radius:** 4px
- **Layout:** `display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 4px`
- **Inner padding:** 16px
- **Content:**
  - Text "Dashboard": Montserrat 16px/700/24px, letter-spacing 0.15px, `#FFFFFF`
  - Icon: Grid/dashboard icon 24x24px (Component `662:10350`)

### Menu Item — Logout / Default (`I666:9728;666:9278`)
- **Node ID:** `I666:9728;666:9278`
- **Component:** `A.3_Logout` (Instance of `186:1433`, Set `186:1426`)
- **Width:** 153px
- **Height:** 56px
- **Background:** transparent
- **Border-radius:** 4px
- **Layout:** `display: flex; flex-direction: row; align-items: center; justify-content: flex-start; gap: 4px`
- **Inner padding:** 16px
- **Content:**
  - Text "Logout": Montserrat 16px/700/24px, letter-spacing 0.15px, `#FFFFFF`
  - Icon: Chevron-right/logout icon 24x24px (Component `335:10890`)

---

## 3. Layout Structure

```
Header:
  ┌────────┐
  │ [👤]   │ ← Trigger Button (40x40, border #998C5F)
  └────────┘
       │
       ▼  mt-1, right-aligned
  ┌─────────────────────────┐
  │  Dropdown Container     │ border: 1px solid #998C5F
  │  bg: #00070C            │ border-radius: 8px
  │  padding: 6px           │
  │                         │
  │  ┌───────────────────┐  │
  │  │ Profile     [👤]  │  │ ← Active (bg: rgba(255,234,158,0.10))
  │  │ 151x56  p:16 g:4  │  │   text-shadow glow
  │  └───────────────────┘  │
  │                         │
  │  ┌───────────────────┐  │
  │  │ Dashboard   [⊞]  │  │ ← Default (bg: transparent)
  │  │ 153x56  p:16 g:4  │  │   Admin only
  │  └───────────────────┘  │
  │                         │
  │  ┌───────────────────┐  │
  │  │ Logout      [>]   │  │ ← Default (bg: transparent)
  │  │ 153x56  p:16 g:4  │  │
  │  └───────────────────┘  │
  │                         │
  └─────────────────────────┘
```

---

## 4. Component States

### Menu Item States

| State | Property | Value |
|-------|----------|-------|
| Default | background | `transparent` |
| Default | border-radius | `4px` |
| Default | text-shadow | none |
| Hover | background | `rgba(255, 234, 158, 0.10)` |
| Hover | border-radius | `4px` |
| Hover | cursor | `pointer` |
| Active (current page) | background | `rgba(255, 234, 158, 0.10)` |
| Active (current page) | text-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |
| Focus | outline | `2px solid rgba(255, 255, 255, 0.5)` |
| Focus | outline-offset | `2px` |
| Disabled (Logout loading) | opacity | `0.6` |
| Disabled (Logout loading) | cursor | `not-allowed` |

> **Note:** Focus state outline is an accessibility addition (not from Figma) per constitution WCAG AA requirement.

---

## 5. Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Default (mobile) | Same size, position absolute below trigger |
| All breakpoints | No change — fixed size component |

---

## 6. Implementation Mapping

| Figma Node ID | React Component | File Path | Key Tailwind Classes |
|---------------|-----------------|-----------|----------------------|
| — (trigger) | `UserMenu` (trigger button) | `src/components/header/user-menu.tsx` | `w-10 h-10 rounded border border-[#998C5F]` |
| `666:9728` | `UserMenu` (dropdown panel) | same file | `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col z-50` |
| `I666:9728;666:9277` | Menu item (Profile, active) | same file | `w-full bg-[rgba(255,234,158,0.10)] rounded p-4 h-14 gap-1 flex items-center transition-colors` |
| `I666:9728;666:9452` | Menu item (Dashboard) | same file | `w-full bg-transparent hover:bg-[rgba(255,234,158,0.10)] rounded p-4 h-14 gap-1 flex items-center transition-colors` |
| `I666:9728;666:9278` | Menu item (Logout) | same file | `w-full bg-transparent hover:bg-[rgba(255,234,158,0.10)] rounded p-4 h-14 gap-1 flex items-center transition-colors` |
| `186:1611` | User icon | `public/images/icons/user.svg` | `w-6 h-6` |
| `662:10350` | Dashboard icon | `public/images/icons/dashboard.svg` | `w-6 h-6` |
| `335:10890` | Logout icon | `public/images/icons/logout.svg` | `w-6 h-6` |

> Text: `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white`
> Active text: add `[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]`

### Icon Assets (Need Download)

| Icon | Figma Component | Target Path | Status |
|------|----------------|-------------|--------|
| User profile | `186:1611` | `public/images/icons/user.svg` | ✅ Exists (verified) |
| Dashboard grid | `662:10350` | `public/images/icons/dashboard.svg` | ❌ Need download from Figma |
| Logout chevron | `335:10890` | `public/images/icons/logout.svg` | ❌ Need download from Figma |

> **Action required:** Download 2 missing icons from Figma before implementation. Use `mcp__momorph__get_media_file` or export from Figma directly.

---

## 7. Implementation Diff (Current vs Figma Target)

| Property | Current Implementation | Figma Target |
|----------|----------------------|--------------|
| Dropdown bg | `rgba(11,15,18,0.95)` + `backdrop-blur` | `#00070C` (solid, no blur) |
| Dropdown border | `1px solid #2E3940` | `1px solid #998C5F` (golden) |
| Dropdown border-radius | `rounded` (4px) | `rounded-lg` (8px) |
| Dropdown padding | none | `6px` (p-1.5) |
| Menu items | 2 items (Profile, Sign out) | 3 items (Profile, Dashboard, Logout) |
| Item text | `text-sm` (14px), no font specified | `font-montserrat text-base font-bold` (16px/700) |
| Item padding | `px-4 py-3` | `p-4` (16px all sides) |
| Item height | auto | `h-14` (56px) |
| Item icons | none | Each item has icon on the right (24x24) |
| Active state | none | `rgba(255,234,158,0.10)` bg + text-shadow glow |
| Hover state | `bg-white/10` | `bg-[rgba(255,234,158,0.10)]` (golden tint) |
| Dashboard item | missing | Need to add (Admin only) |
| Item labels | "Profile", "Sign out" | "Profile", "Dashboard", "Logout" |

> **Behavior partially correct** — click-outside, Escape key, signOut work. Need: add Dashboard item, add icons, update styling, add active state highlight.
