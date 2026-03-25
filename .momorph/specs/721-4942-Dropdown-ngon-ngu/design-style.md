# Dropdown Ngôn ngữ — Design Style Document

**Frame ID:** `721:4942`
**Frame Name:** Dropdown-ngôn ngữ
**Dimensions:** 215 x 304px (frame), dropdown panel ~122 x 124px
**Constitution:** v1.0.0

> **Note:** Existing implementation at `src/components/header/language-selector.tsx` has different styling from Figma. This document describes the **Figma design target**. See Section 7 for diff summary.

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-dropdown` | `#00070C` | Dropdown container background |
| `--color-bg-selected` | `rgba(255, 234, 158, 0.20)` | Selected language item background |
| `--color-bg-hover` | `rgba(255, 234, 158, 0.10)` | Hover state background |
| `--color-text-label` | `#FFFFFF` | Language code text color |
| `--color-border-dropdown` | `#998C5F` | Container border (golden) |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-language-code` | Montserrat | 16px | 700 (Bold) | 24px | 0.15px | `#FFFFFF` | Language code (VN, EN) in dropdown items |
| `--text-trigger-code` | Montserrat | 16px | 700 (Bold) | 24px | 0.15px | `#FFFFFF` | Language code on trigger button |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-container-padding` | 6px | Dropdown container padding |
| `--sp-item-padding` | 16px | Language item internal padding (all sides) |
| `--sp-icon-text-gap` | 4px | Gap between flag icon and text |
| `--sp-trigger-padding` | 16px | Trigger button padding |
| `--sp-dropdown-offset` | 4px | Gap between trigger and dropdown (mt-1) |

### Border

| Token | Value | Usage |
|-------|-------|-------|
| `--border-dropdown` | `1px solid #998C5F` | Dropdown container border |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-dropdown` | 8px | Dropdown container |
| `--radius-item-selected` | 2px | Selected item |
| `--radius-item-hover` | 4px | Hovered item |
| `--radius-trigger` | 4px | Trigger button |

### Shadows

No shadows on dropdown container or items.

---

## 2. Component Style Details

### Trigger Button (in Header)
- **Component:** Part of `LanguageSelector` — visible in collapsed state
- **Layout:** `display: flex; flex-direction: row; align-items: center; gap: 2px`
- **Padding:** 16px
- **Border-radius:** 4px
- **Background:** transparent (default)
- **Content:**
  - Flag icon: 24x24px (current locale's flag)
  - Language code: Montserrat 16px/700, `#FFFFFF`
  - Chevron-down icon: 24x24px (`/images/icons/chevron-down.svg`), rotates 180deg when open

**Trigger Button States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `transparent` |
| Hover | background | `rgba(255, 255, 255, 0.10)` |
| Active | background | `rgba(255, 255, 255, 0.15)` |
| Focus | outline | `2px solid rgba(255, 255, 255, 0.5)` |
| Focus | outline-offset | `2px` |

### Dropdown Container (`525:11713`)
- **Node ID:** `525:11713`
- **Component:** `A_Dropdown-List` (Instance of `362:6179`, Set `563:8216`)
- **Width:** auto (fit content, ~122px based on item widths + padding)
- **Background:** `#00070C` (Figma var `--Details-Container-2`)
- **Border:** `1px solid #998C5F` (Figma var `--Details-Border`)
- **Border-radius:** 8px
- **Padding:** 6px
- **Layout:** `display: flex; flex-direction: column; align-items: flex-start`
- **Position:** absolute, `top: 100%; right: 0; margin-top: 4px`
- **Z-index:** 50

### Language Item — Tiếng Việt / Selected (`I525:11713;362:6085`)
- **Node ID:** `I525:11713;362:6085`
- **Component:** `A.1_tiếng Việt` (Instance of `186:1692`, Set `186:1695`)
- **Width:** 108px
- **Height:** 56px
- **Background:** `rgba(255, 234, 158, 0.20)` — selected state
- **Border-radius:** 2px
- **Layout:** `display: flex; flex-direction: row; align-items: center; justify-content: flex-start`
- **Inner padding:** 16px
- **Content:**
  - Flag icon (VN): 24x24px (`I525:11713;362:6085;186:1821;186:1709`, Instance of `178:1019`)
  - Gap: 4px
  - Text "VN": Montserrat 16px/700/24px, letter-spacing 0.15px, `#FFFFFF`, text-align center

### Language Item — Tiếng Anh / Default (`I525:11713;362:6128`)
- **Node ID:** `I525:11713;362:6128`
- **Component:** `A.2_tiếng Anh` (Instance of `186:1694`, Set `186:1695`)
- **Width:** 110px
- **Height:** 56px
- **Background:** transparent
- **Border-radius:** 0px (no radius in default state)
- **Layout:** `display: flex; flex-direction: row; align-items: center; justify-content: center`
- **Inner padding:** 16px
- **Content:**
  - Flag icon (UK): 24x24px (`I525:11713;362:6128;186:1903;186:1709`, Instance of `178:967`)
  - Gap: 4px
  - Text "EN": Montserrat 16px/700/24px, letter-spacing 0.15px, `#FFFFFF`, text-align center

### Flag Icons
- **VN Flag:** Component `178:1019` (from Set `178:1020`)
  - Size: 24x24px container, inner flag 20x15px
  - White background with Vietnam flag graphic
  - Asset: `/images/icons/flag-vn.svg`
- **EN Flag:** Component `178:967` (from Set `178:1020`)
  - Size: 24x24px container, inner flag 20x15px
  - White background with UK flag graphic
  - Asset: `/images/icons/flag-en.svg`

---

## 3. Layout Structure

```
Header:
  ┌──────────────────┐
  │ [🇻🇳] VN [▼]     │ ← Trigger Button (px-4 py-4, gap-0.5)
  └──────────────────┘
          │
          ▼  mt-1, right-aligned
  ┌─────────────────────────┐
  │  Dropdown Container     │ border: 1px solid #998C5F
  │  bg: #00070C            │ border-radius: 8px
  │  padding: 6px           │
  │                         │
  │  ┌───────────────────┐  │
  │  │ [🇻🇳] VN          │  │ ← Selected (bg: rgba(255,234,158,0.20))
  │  │ 108x56px  p:16px  │  │   border-radius: 2px
  │  │ gap: 4px           │  │
  │  └───────────────────┘  │
  │                         │
  │  ┌───────────────────┐  │
  │  │ [🇬🇧] EN          │  │ ← Default (bg: transparent)
  │  │ 110x56px  p:16px  │  │
  │  │ gap: 4px           │  │
  │  └───────────────────┘  │
  │                         │
  └─────────────────────────┘
```

---

## 4. Component States

### Language Item States

| State | Property | Value |
|-------|----------|-------|
| Default | background | `transparent` |
| Default | border-radius | `0px` |
| Hover | background | `rgba(255, 234, 158, 0.10)` |
| Hover | border-radius | `4px` |
| Hover | cursor | `pointer` |
| Selected | background | `rgba(255, 234, 158, 0.20)` |
| Selected | border-radius | `2px` |
| Selected+Hover | background | `rgba(255, 234, 158, 0.25)` |
| Selected+Hover | border-radius | `2px` |
| Focus | outline | `2px solid rgba(255, 255, 255, 0.5)` |
| Focus | outline-offset | `2px` |

---

## 5. Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Default (mobile) | Same size, position absolute below header trigger |
| `md:` (768px) | No change |
| `lg:` (1024px) | No change |
| `xl:` (1440px) | No change — fixed size component |

Dropdown kích thước cố định, chỉ thay đổi vị trí theo trigger button trong Header.

---

## 6. Implementation Mapping

| Figma Node ID | React Component | File Path | Key Tailwind Classes |
|---------------|-----------------|-----------|----------------------|
| — (trigger) | `LanguageSelector` (trigger button) | `src/components/header/language-selector.tsx` | `flex items-center gap-0.5 rounded px-4 py-4 hover:bg-white/10` |
| `525:11713` | `LanguageSelector` (dropdown panel) | same file | `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col` |
| `I525:11713;362:6085` | Language item (selected) | same file | `bg-[rgba(255,234,158,0.20)] rounded-sm flex items-center px-4 py-4 gap-1` |
| `I525:11713;362:6128` | Language item (default) | same file | `bg-transparent flex items-center justify-center px-4 py-4 gap-1 hover:bg-[rgba(255,234,158,0.10)] hover:rounded` |
| `178:1019` | VN Flag Icon | `public/images/icons/flag-vn.svg` | `w-6 h-6` |
| `178:967` | EN Flag Icon | `public/images/icons/flag-en.svg` | `w-6 h-6` |

> Text classes: `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white`

---

## 7. Implementation Diff (Current vs Figma Target)

The existing `language-selector.tsx` needs the following visual updates to match Figma:

| Property | Current Implementation | Figma Target |
|----------|----------------------|--------------|
| Dropdown bg | `rgba(11,15,18,0.95)` + `backdrop-blur` | `#00070C` (solid, no blur) |
| Dropdown border | `1px solid #2E3940` | `1px solid #998C5F` (golden) |
| Dropdown border-radius | `rounded` (4px) | `rounded-lg` (8px) |
| Dropdown padding | none (items fill edge) | `6px` (p-1.5) |
| Item content | Full label ("Tiếng Việt") | Code only ("VN") |
| Item text style | `text-sm font-medium` | `text-base font-bold` (Montserrat 16px/700) |
| Item padding | `px-4 py-3` | `px-4 py-4` (16px all sides) |
| Item gap | `gap-3` | `gap-1` (4px) |
| Item flag size | `20x15` | `24x24` container |
| Selected bg | `bg-white/5` | `rgba(255,234,158,0.20)` (golden tint) |
| Hover bg | `bg-white/10` | `rgba(255,234,158,0.10)` (golden tint) |
| Selected radius | none | `2px` (rounded-sm) |

> **Behavior is correct** — cookie-based locale switching with page reload, keyboard navigation, click-outside handling. Only visual styling needs updating.
