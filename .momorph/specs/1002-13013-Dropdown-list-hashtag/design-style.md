# Dropdown list hashtag - Design Style Document

**Frame ID:** `1002:13013`
**Frame Name:** Dropdown list hashtag
**Dimensions:** 318 x 421px (trigger + panel)
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-panel` | `#00070C` | Dropdown panel background |
| `--color-bg-item-selected` | `rgba(255, 234, 158, 0.20)` | Selected item highlight |
| `--color-bg-trigger` | `#FFFFFF` | Trigger button background |
| `--color-text-item` | `#FFFFFF` | Hashtag text color |
| `--color-text-trigger` | `#999999` | Trigger label/hint text |
| `--color-border` | `#998C5F` | Panel border, trigger border |
| `--color-check-icon` | `#998C5F` | Check icon color (predicted from design) |
| `--color-icon-plus` | `#999999` | Plus icon color in trigger (matches trigger text) |
| `--color-error-border` | `#EF4444` | Error state border color (predicted) |
| `--color-bg-hover-unselected` | `rgba(255, 255, 255, 0.05)` | Hover state for unselected items (predicted) |
| `--color-bg-hover-selected` | `rgba(255, 234, 158, 0.30)` | Hover state for selected items (predicted) |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-item` | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF | Hashtag item text |
| `--text-trigger-label` | Montserrat | 11px | 700 | 16px | 0.5px | #999999 | Trigger "Hashtag\nTối đa 5" |
| `--text-empty-state` | Montserrat | 14px | 400 | 20px | 0px | #999999 | Empty state "Không có hashtag nào" (predicted) |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-panel-padding` | 6px | Panel internal padding (all sides) |
| `--sp-item-px` | 16px | Item horizontal padding |
| `--sp-item-height` | 40px | Item row height |
| `--sp-trigger-padding` | 4px 8px | Trigger button padding |
| `--sp-trigger-gap` | 8px | Gap inside trigger button |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-panel` | 8px | Dropdown panel |
| `--radius-trigger` | 8px | Trigger button |
| `--radius-item-selected` | 2px | Selected item row |

---

## 2. Component Style Details

### Trigger Button (`1002:15114`)
- **Dimensions:** 116 x 48px
- **Layout:** `display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px`

#### Inner Button (`1002:15115`)
- **Height:** 48px
- **Padding:** `4px 8px`
- **Border:** `1px solid #998C5F`
- **Border-radius:** `8px`
- **Background:** `#FFFFFF`
- **Layout:** `display: flex; align-items: center; gap: 8px`
- **Content:**
  - Plus icon: 24x24px (`I1002:15115;186:2759`, MM_MEDIA_Plus)
  - Text: "Hashtag\nTối đa 5" — Montserrat 11px/700/16px, letter-spacing 0.5px, color #999

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFFFFF` |
| Default | border | `1px solid #998C5F` |
| Hover | background | `rgba(255, 234, 158, 0.10)` (predicted) |
| Focus | outline | `2px solid #998C5F` |
| Open (active) | background | `rgba(255, 234, 158, 0.15)` (predicted) |
| Open (active) | border | `1px solid #998C5F` |
| Error | border | `1px solid #EF4444` (predicted) |
| Disabled | opacity | `0.6` |
| Disabled | cursor | `not-allowed` |

### Dropdown Panel (`1002:13102`)
- **Dimensions:** 318px width (auto height based on content)
- **Padding:** `6px`
- **Border:** `1px solid #998C5F`
- **Border-radius:** `8px`
- **Background:** `#00070C`
- **Layout:** `display: flex; flex-direction: column; align-items: flex-start`
- **Max-height:** `332px` (~8 items visible, Figma frame height) + `overflow-y: auto` for scrolling when 13 items
- **Position:** `position: absolute; top: 100%; left: 0; margin-top: 6px` — Panel left-aligns with trigger and spans wider (318px vs trigger's 116px)
- **Z-index:** `50` (above modal content, below modal overlay)
- **Scrollbar:** Thin scrollbar, styled to match dark theme:
  - `scrollbar-width: thin` / `::-webkit-scrollbar { width: 4px }`
  - Track: `transparent`
  - Thumb: `rgba(255, 255, 255, 0.2)`, border-radius 2px
- **Animation:** `opacity 150ms ease-in-out` on open/close (or use CSS `transition` on visibility)

### Item — Selected (A, B, C: `1002:13185`, `1002:13207`, `1002:13216`)
- **Dimensions:** 306 x 40px (fill panel width minus padding)
- **Padding:** `0px 16px`
- **Border-radius:** `2px`
- **Background:** `rgba(255, 234, 158, 0.20)`
- **Layout:** `display: flex; flex-direction: row; align-items: center; justify-content: space-between` (text fills available space via `flex: 1`, check icon is pushed to trailing edge)

#### Item Text (A.1: `1002:13188`)
- **Dimensions:** 253 x 24px (flex)
- **Font:** Montserrat 16px, weight 700, line-height 24px, letter-spacing 0.15px
- **Color:** `#FFFFFF`
- **Text-align:** left

#### Check Icon (A.2: `1002:13204`)
- **Dimensions:** 24 x 24px
- **Position:** Trailing (right side of row)
- **Component:** `1002:13201` (custom check icon)
- **Visibility:** Visible only when selected

### Item — Unselected (D: `1002:13104`)
- **Dimensions:** 306 x 40px
- **Padding:** `0px 16px`
- **Border-radius:** `0px`
- **Background:** `transparent`
- **Layout:** Same as selected item
- **Check Icon:** Hidden

**Item States:**

| State | Property | Value |
|-------|----------|-------|
| Unselected | background | `transparent` |
| Unselected | check icon | hidden |
| Selected | background | `rgba(255, 234, 158, 0.20)` |
| Selected | border-radius | `2px` |
| Selected | check icon | visible, 24x24 |
| Hover | background | `rgba(255, 255, 255, 0.05)` (predicted, unselected) |
| Hover (selected) | background | `rgba(255, 234, 158, 0.30)` (predicted) |
| Focused (keyboard nav) | outline | `1px solid rgba(255, 255, 255, 0.4)` (predicted) |
| Focused (keyboard nav) | outline-offset | `-1px` |
| Disabled (max reached) | opacity | `0.4` (predicted) |
| Disabled (max reached) | cursor | `not-allowed` |

---

## 3. Layout Structure (ASCII)

```
┌───────────────┐
│ Trigger 116x48│ "+" Hashtag / Tối đa 5
│ bg:#FFF r:8   │ border:1px #998C5F
└───────┬───────┘
        │ ~6px gap
        ▼
┌──────────────────────────────────┐ 318px
│ Panel  bg:#00070C  r:8  p:6px    │ border:1px #998C5F
│                                  │
│ ┌──────────────────────────────┐ │ 306x40
│ │ #High-performing        ✓   │ │ selected: bg:rgba(255,234,158,0.20) r:2
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ #BE PROFESSIONAL        ✓   │ │ selected
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ #BE OPTIMISTIC          ✓   │ │ selected
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ #BE A TEAM                  │ │ unselected: bg:transparent
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ #THINK OUTSIDE THE BOX      │ │ unselected
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ #GET RISKY                  │ │ unselected
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ #GO FAST                    │ │ unselected
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ #WASSHOI                    │ │ unselected
│ └──────────────────────────────┘ │
│ ... (13 items total)             │
└──────────────────────────────────┘
```

---

## 4. Implementation Mapping

| Figma Node ID | React Component | Tailwind Classes |
|---------------|-----------------|------------------|
| `1002:15114` | `HashtagSelector` (wrapper) | `relative flex flex-col items-center gap-0.5` |
| `1002:15115` | Trigger `<button>` | `flex items-center gap-2 h-12 px-2 py-1 border border-[#998C5F] rounded-lg bg-white hover:bg-[rgba(255,234,158,0.10)] data-[open]:bg-[rgba(255,234,158,0.15)] data-[error]:border-red-500 disabled:opacity-60 disabled:cursor-not-allowed` |
| `1002:13102` | Dropdown panel | `absolute top-full left-0 mt-1.5 w-full md:w-[318px] p-1.5 border border-[#998C5F] rounded-lg bg-[#00070C] flex flex-col max-h-[332px] overflow-y-auto z-50 scrollbar-thin` |
| `1002:13185` | HashtagItem (selected) | `flex items-center justify-between min-h-[44px] md:min-h-[40px] px-4 rounded-sm bg-[rgba(255,234,158,0.20)] cursor-pointer hover:bg-[rgba(255,234,158,0.30)]` |
| `1002:13104` | HashtagItem (unselected) | `flex items-center justify-between min-h-[44px] md:min-h-[40px] px-4 cursor-pointer hover:bg-white/5` |
| `1002:13104` | HashtagItem (disabled, max reached) | adds `opacity-40 cursor-not-allowed pointer-events-none` |
| `1002:13188` | Item text | `flex-1 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white` |
| `1002:13204` | Check icon | `w-6 h-6 shrink-0` (visible when selected, hidden otherwise) |

---

## 5. Responsive Breakpoints (Constitution P4: Mobile-first)

### Mobile (default, < 768px)
- Dropdown panel: full-width of parent container
- Items: full-width, min-height 44px (increase from Figma's 40px to meet Constitution P4 touch target requirement)

### Tablet/Desktop (md: 768px+)
- Dropdown panel: 318px fixed width
- Positioned absolutely below trigger

---

## 6. Assets Required

| Asset | Figma Node | Format | Size |
|-------|-----------|--------|------|
| Plus icon | `I1002:15115;186:2759` (MM_MEDIA_Plus) | SVG | 24x24px |
| Check icon (selected) | `1002:13204` → `1002:13201` | SVG | 24x24px |
