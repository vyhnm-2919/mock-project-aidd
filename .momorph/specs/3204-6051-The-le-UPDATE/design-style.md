# Thể lệ UPDATE — Design Style Document

**Frame ID:** `3204:6051`
**Frame Name:** Thể lệ UPDATE
**Dimensions:** 1440 x 1796px (panel: 553px wide)
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-page` | `#00101A` | Page/overlay background `rgba(0,16,26,1)` |
| `--color-bg-panel` | `#00070C` | Panel background `rgba(0,7,12,1)` |
| `--color-bg-button-primary` | `#FFEA9E` | "Viết KUDOS" button `rgba(255,234,158,1)` |
| `--color-bg-button-secondary` | `rgba(255,234,158,0.10)` | "Đóng" button background |
| `--color-text-accent` | `#FFEA9E` | Gold accent (titles, headings) |
| `--color-text-primary` | `#FFFFFF` | Body text, descriptions |
| `--color-text-button-primary` | `#00101A` | Text on gold button |
| `--color-border` | `#998C5F` | Button borders |
| `--color-border-badge` | `#FFEA9E` | Hero badge pill border |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-title` | Montserrat | 45px | 700 | 52px | 0px | `#FFEA9E` | "Thể lệ" page title |
| `--text-sub-heading` | Montserrat | 24px | 700 | 32px | 0px | `#FFEA9E` | "KUDOS QUỐC DÂN" |
| `--text-section-heading` | Montserrat | 22px | 700 | 28px | 0px | `#FFEA9E` | Section headings |
| `--text-body` | Montserrat | 16px | 700 | 24px | 0.5px | `#FFFFFF` | Body text, descriptions |
| `--text-small` | Montserrat | 14px | 700 | 20px | 0.1px | `#FFFFFF` | Badge tier descriptions |
| `--text-badge-pill` | Montserrat | ~13.2px | 700 | ~18.8px | ~0.094px | `#FFFFFF` | Badge pill labels |
| `--text-badge-icon-label` | Montserrat | 11-12px | 700 | 16px | 0.5px | `#FFFFFF` | Icon badge names |
| `--text-button` | Montserrat | 16px | 700 | 24px | 0.5px | Various | Button labels |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-panel-padding` | `24px 40px 40px 40px` | Panel container padding |
| `--sp-panel-gap` | 40px | Gap between content and footer |
| `--sp-section-gap` | 24px | Gap between sections |
| `--sp-within-section` | 16px | Gap within section (heading + body) |
| `--sp-badge-grid-outer` | `0px 24px` | Badge grid outer padding |
| `--sp-badge-grid-gap` | 16px | Gap between badge rows/items |
| `--sp-badge-icon-gap` | 8px | Gap between icon and label |
| `--sp-button-gap` | 16px | Gap between buttons |
| `--sp-button-padding` | 16px | Internal button padding |
| `--sp-button-icon-gap` | 8px | Gap between icon and text in button |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-button` | 4px | All buttons |
| `--radius-badge-pill` | 55.579px | Hero badge pill (fully rounded) |
| `--radius-badge-icon` | 100px | Badge icon circle |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-badge-rising` | `0 0.447px 1.787px #000` | Rising Hero text shadow |
| `--shadow-badge-super` | `0 0.457px 1.83px #000` | Super Hero text shadow |
| `--shadow-badge-legend` | `0 0 1.505px #FFF` | Legend Hero text glow |

---

## 2. Component Style Details

### Overlay
- **Position:** `fixed; inset: 0`
- **Background:** `rgba(0,16,26,0.6)`
- **Z-index:** 200
- **Click:** closes modal

### Panel Container (`3204:6052`)
- **Width:** 553px (md+), 100% (mobile)
- **Height:** viewport height
- **Position:** `fixed; right: 0; top: 0`
- **Background:** `#00070C`
- **Padding:** `24px 40px 40px 40px`
- **Layout:** `flex-direction: column; justify-content: space-between; align-items: flex-end`
- **Gap:** 40px (between content and footer)
- **Animation:** Slide-in from right (`transform: translateX(100%) → translateX(0)`, duration 300ms, ease-out)

### Content Area (`3204:6053`) — Scrollable
- **Overflow-y:** auto (ONLY content area scrolls, footer stays fixed)

### Content Area (`3204:6053`)
- **Width:** 473px
- **Layout:** `flex-direction: column; gap: 24px`

### Title (`3204:6055`)
- **Font:** Montserrat 45px/700/52px, color `#FFEA9E`

### Section Heading (`3204:6132`, `3204:6077`)
- **Font:** Montserrat 22px/700/28px, color `#FFEA9E`
- **Text-transform:** uppercase

### Body Text
- **Font:** Montserrat 16px/700/24px, letter-spacing 0.5px, color `#FFFFFF`
- **Text-align:** justified

### Small Text (tier descriptions)
- **Font:** Montserrat 14px/700/20px, letter-spacing 0.1px, color `#FFFFFF`

### Hero Badge Pill (4 tiers)
- **Width:** ~126px, **Height:** 22px
- **Border:** `0.579px solid #FFEA9E`
- **Border-radius:** 55.579px (pill)
- **Background:** gradient overlay `linear-gradient(0deg, rgba(9,36,50,0.50), rgba(9,36,50,0.50))` over image
- **Text:** ~13.2px/700 Montserrat, white

| Badge | Text Shadow |
|-------|------------|
| New Hero | none |
| Rising Hero | `0 0.447px 1.787px #000` |
| Super Hero | `0 0.457px 1.83px #000` |
| Legend Hero | `0 0 1.505px #FFF` (white glow) |

### Icon Badge Grid
- **Grid:** 2 rows x 3 columns
- **Row gap:** 16px, **Col gap:** 16px
- **Outer padding:** `0px 24px`
- **Each icon:** 64x64px circle (border `2px solid #FFF`), border-radius 100px
- **Label:** Montserrat 11-12px/700/16px, letter-spacing 0.5px, centered, white

**Icon names:** REVIVAL, TOUCH OF LIGHT, STAY GOLD, FLOW TO HORIZON, BEYOND THE BOUNDARY, ROOT FURTHER

### Sub-heading "KUDOS QUỐC DÂN" (`3204:6090`)
- **Font:** Montserrat 24px/700/32px, color `#FFEA9E`

### Button Bar (`3204:6092`)
- **Layout:** `flex-direction: row; gap: 16px`
- **Width:** 473px
- **Height:** 56px
- **Position:** Sticky bottom of panel

#### B.1 Close Button (`3204:6093`)
- **Background:** `rgba(255,234,158,0.10)`
- **Border:** `1px solid #998C5F`
- **Border-radius:** 4px
- **Padding:** 16px
- **Text:** Montserrat 16px/700/24px, letter-spacing 0.5px, white
- **Icon:** 24x24 close (X) icon

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `rgba(255,234,158,0.10)` |
| Hover | background | `rgba(255,234,158,0.40)` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |

#### B.2 Write KUDOS Button (`3204:6094`)
- **Width:** 363px
- **Height:** 56px
- **Background:** `#FFEA9E`
- **Border-radius:** 4px
- **Padding:** 16px
- **Gap:** 8px (icon + text)
- **Text:** Montserrat 16px/700/24px, letter-spacing 0.5px, `#00101A`
- **Icon:** 24x24 pen icon

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Hover | background | `#FFE078` |
| Hover | transform | `translateY(-2px)` |
| Focus | outline | `2px solid #FFEA9E` |
| Active | background | `#FFD54F` |

---

## 3. Layout Structure (ASCII)

```
┌────────────────────────────────────────────────────┐ 1440 x viewport
│ ░░░░░░░░░░ Overlay bg:rgba(0,16,26,0.6) ░░░░░░░░░ │
│                                                    │
│                            ┌───────────────────┐   │
│                            │ PANEL  553px       │   │
│                            │ bg:#00070C         │   │
│                            │ p:24/40/40/40      │   │
│                            │                    │   │
│                            │ ┌───────────────┐  │   │
│                            │ │ Thể lệ (45px) │  │   │
│                            │ │ gold           │  │   │
│                            │ └───────────────┘  │   │
│                            │      ↕ 24px        │   │
│                            │ ┌───────────────┐  │   │
│                            │ │ NGƯỜI NHẬN    │  │   │
│                            │ │ KUDOS (22px)  │  │   │
│                            │ │               │  │   │
│                            │ │ [New Hero]    │  │   │
│                            │ │ [Rising Hero] │  │   │
│                            │ │ [Super Hero]  │  │   │
│                            │ │ [Legend Hero]  │  │   │
│                            │ └───────────────┘  │   │
│                            │      ↕ 24px        │   │
│                            │ ┌───────────────┐  │   │
│                            │ │ NGƯỜI GỬI     │  │   │
│                            │ │ KUDOS (22px)  │  │   │
│                            │ │               │  │   │
│                            │ │ [6 icon grid] │  │   │
│                            │ │ 3x2, gap:16   │  │   │
│                            │ └───────────────┘  │   │
│                            │      ↕ 24px        │   │
│                            │ ┌───────────────┐  │   │
│                            │ │ KUDOS QUỐC    │  │   │
│                            │ │ DÂN (24px)    │  │   │
│                            │ └───────────────┘  │   │
│                            │      ↕ 40px        │   │
│                            │ ┌───────────────┐  │   │
│                            │ │ [✕ Đóng] [✏️ │  │   │
│                            │ │  Viết KUDOS]  │  │   │
│                            │ │ gap:16 h:56   │  │   │
│                            │ └───────────────┘  │   │
│                            └───────────────────┘   │
└────────────────────────────────────────────────────┘
```

---

## 4. Implementation Mapping

| Figma Node ID | React Component | File Path | Key Tailwind Classes |
|---------------|-----------------|-----------|----------------------|
| `3204:6051` | `RulesModal` | `src/components/kudos/rules-modal.tsx` | `fixed inset-0 z-[200]` |
| `3204:6052` | Panel container | (inside RulesModal) | `fixed right-0 top-0 w-[553px] h-full bg-[#00070C]` |
| `3204:6053` | `RulesContent` | `src/components/kudos/rules-content.tsx` | `flex flex-col gap-6 overflow-y-auto` |
| `3204:6092` | Button bar | (inside RulesModal) | `flex gap-4 sticky bottom-0` |
| `3204:6093` | Close button | — | `bg-[#FFEA9E]/10 border border-[#998C5F] rounded` |
| `3204:6094` | Write KUDOS button | — | `bg-[#FFEA9E] rounded flex-1` |

---

## 5. Responsive Breakpoints

### Mobile (< 768px)
- Panel: full width, full height
- Padding: `16px 20px 20px 20px`
- Title: 36px
- Button bar: stack vertical or full width

### Tablet+ (>= 768px)
- Panel: 553px, slide-in from right
- Padding: `24px 40px 40px 40px`
- Pixel-perfect match with Figma

---

## 6. Assets Required

| Asset | Format | Size |
|-------|--------|------|
| Close (X) icon | SVG | 24x24 |
| Pen/write icon | SVG | 24x24 |
| REVIVAL badge icon | WebP/PNG | 64x64 |
| TOUCH OF LIGHT badge icon | WebP/PNG | 64x64 |
| STAY GOLD badge icon | WebP/PNG | 64x64 |
| FLOW TO HORIZON badge icon | WebP/PNG | 64x64 |
| BEYOND THE BOUNDARY badge icon | WebP/PNG | 64x64 |
| ROOT FURTHER badge icon | WebP/PNG | 64x64 |
| Hero badge background images (4) | WebP/PNG | ~126x22 |
