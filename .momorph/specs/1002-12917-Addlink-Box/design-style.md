# Addlink Box - Design Style Document

**Frame ID:** `1002:12917`
**Frame Name:** Addlink Box
**Dimensions:** 752 x 388px
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-modal` | `#FFF8E1` | Modal background `rgba(255, 248, 225, 1)` |
| `--color-bg-input` | `#FFFFFF` | Input field background |
| `--color-bg-button-save` | `#FFEA9E` | Button "Lưu" background `rgba(255, 234, 158, 1)` |
| `--color-bg-button-cancel` | `rgba(255, 234, 158, 0.10)` | Button "Hủy" background |
| `--color-text-primary` | `#00101A` | Title, labels, button text `rgba(0, 16, 26, 1)` |
| `--color-border` | `#998C5F` | Input borders, cancel button border |
| `--color-text-error` | `#EF4444` | Error messages |
| `--color-border-error` | `#EF4444` | Input border on error state |
| `--color-overlay` | `rgba(0, 0, 0, 0.5)` | Modal backdrop overlay |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-title` | Montserrat | 32px | 700 | 40px | 0px | #00101A | Title "Thêm đường dẫn" (A) |
| `--text-label` | Montserrat | 22px | 700 | 28px | 0px | #00101A | Labels "Nội dung", "URL" (B.1, C.1) |
| `--text-button-save` | Montserrat | 22px | 700 | 28px | 0px | #00101A | Button "Lưu" text (D.2) |
| `--text-button-cancel` | Montserrat | 16px | 700 | 24px | 0.15px | #00101A | Button "Hủy" text (D.1) |
| `--text-input` | Montserrat | 16px | 400 | 24px | 0px | #00101A | Input placeholder/value (predicted) |
| `--text-error` | Montserrat | 14px | 400 | 20px | 0px | #EF4444 | Error messages (predicted) |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-modal-padding` | 40px | Modal internal padding (all sides) |
| `--sp-section-gap` | 32px | Gap between sections (title→text, text→link, link→buttons) |
| `--sp-field-gap` | 16px | Gap between label and input within a field row |
| `--sp-button-gap` | 24px | Gap between Hủy and Lưu buttons |
| `--sp-input-x` | 24px | Input horizontal padding |
| `--sp-input-y` | 16px | Input vertical padding |
| `--sp-btn-cancel-x` | 40px | Cancel button horizontal padding |
| `--sp-btn-cancel-y` | 16px | Cancel button vertical padding |
| `--sp-btn-save-padding` | 16px | Save button padding (all sides) |
| `--sp-btn-icon-gap` | 8px | Gap between text and icon in buttons |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-modal` | 24px | Modal container |
| `--radius-input` | 8px | Input fields |
| `--radius-button-save` | 8px | Save button |
| `--radius-button-cancel` | 4px | Cancel button |

---

## 2. Component Style Details

### Modal Overlay (Backdrop)
- **Position:** `position: fixed; inset: 0`
- **Background:** `rgba(0, 0, 0, 0.5)`
- **Z-index:** 50
- **Layout:** `display: flex; align-items: center; justify-content: center`
- **Transition:** `opacity 150ms ease-in-out` (fade in/out)
- **Interaction:** Click on backdrop closes modal (propagation stops on modal content)

### Container — Add link box (`1002:12682`)
- **Dimensions:** 752 x 388px
- **Layout:** `display: flex; flex-direction: column; gap: 32px`
- **Padding:** `40px`
- **Background:** `#FFF8E1`
- **Border-radius:** `24px`
- **Z-index:** 51 (above overlay)
- **Transition:** `transform 150ms ease-out, opacity 150ms ease-out` (scale 0.95→1 + fade)

### A. Title (`I1002:12682;1002:12500`)
- **Dimensions:** 672 x 40px (fill container width minus padding)
- **Font:** Montserrat 32px, weight 700, line-height 40px
- **Color:** `#00101A`
- **Text-align:** left
- **Content:** "Thêm đường dẫn"

### B. Text Field (`I1002:12682;1002:12501`)
- **Dimensions:** 672 x 56px
- **Layout:** `display: flex; flex-direction: row; align-items: center; gap: 16px`

#### B.1 Label "Nội dung" (`I1002:12682;1002:12502`)
- **Dimensions:** 107 x 28px
- **Layout:** `display: flex; flex-direction: row; align-items: center; gap: 2px`
- **Font:** Montserrat 22px, weight 700, line-height 28px
- **Color:** `#00101A`
- **Text-align:** center

#### B.2 Text Input (`I1002:12682;1002:12503`)
- **Dimensions:** flex: 1 0 0 (fills remaining space, ~549px)
- **Height:** 56px
- **Padding:** `16px 24px`
- **Border:** `1px solid #998C5F`
- **Border-radius:** `8px`
- **Background:** `#FFFFFF`
- **Layout:** `display: flex; align-items: center; justify-content: space-between`

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | border | `1px solid #998C5F` |
| Default | background | `#FFFFFF` |
| Focus | border | `2px solid #998C5F` |
| Focus | outline | `none` |
| Focus | box-shadow | `0 0 0 2px rgba(153, 140, 95, 0.2)` (predicted) |
| Error | border | `1px solid #EF4444` |
| Disabled | opacity | `0.5` |

#### B.2.error Error Message (below input)
- **Position:** Below B.2 input, margin-top 4px
- **Font:** Montserrat 14px, weight 400, line-height 20px
- **Color:** `#EF4444`
- **Text-align:** left
- **Width:** Same as input (flex: 1)

### C. Link Field (`I1002:12682;1002:12652`)
- **Dimensions:** 672 x 56px
- **Layout:** `display: flex; flex-direction: row; align-items: center; gap: 16px`

#### C.1 Label "URL" (`I1002:12682;1002:12653`)
- **Dimensions:** 47 x 28px
- **Layout:** `display: flex; flex-direction: row; align-items: center; gap: 2px`
- **Font:** Montserrat 22px, weight 700, line-height 28px
- **Color:** `#00101A`
- **Text-align:** center

#### C.2 URL Input (`I1002:12682;1002:12654`)
- **Dimensions:** flex: 1 0 0 (fills remaining space, ~609px)
- **Height:** 56px
- **Padding:** `16px 24px`
- **Border:** `1px solid #998C5F`
- **Border-radius:** `8px`
- **Background:** `#FFFFFF`
- **Layout:** `display: flex; align-items: center; justify-content: space-between`
- **Icon:** Link icon 24x24px (`I1002:12682;1002:12654;186:2761`) inside input, trailing position

**States:** Same as B.2 Text Input (Default, Focus, Error, Disabled)

#### C.2.error Error Message (below input)
- **Position:** Below C.2 input, margin-top 4px
- **Font:** Montserrat 14px, weight 400, line-height 20px
- **Color:** `#EF4444`
- **Text-align:** left
- **Width:** Same as input (flex: 1)

### D. Button Group (`I1002:12682;1002:12543`)
- **Dimensions:** 672 x 60px
- **Layout:** `display: flex; flex-direction: row; gap: 24px; align-items: flex-start`

#### D.1 Button Hủy (`I1002:12682;1002:12544`)
- **Dimensions:** 146 x 60px (auto width based on content + padding)
- **Padding:** `16px 40px`
- **Border:** `1px solid #998C5F`
- **Border-radius:** `4px`
- **Background:** `rgba(255, 234, 158, 0.10)`
- **Layout:** `display: flex; align-items: center; gap: 8px; align-self: stretch`
- **Text:** "Hủy" — Montserrat 16px, weight 700, line-height 24px, letter-spacing 0.15px, color #00101A
- **Icon:** Close (X) icon 24x24px (`I1002:12682;1002:12544;186:2761`), after text

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `rgba(255, 234, 158, 0.10)` |
| Default | border | `1px solid #998C5F` |
| Default | cursor | `pointer` |
| Hover | background | `rgba(255, 234, 158, 0.25)` (predicted) |
| Focus | outline | `2px solid #998C5F` |
| Focus | outline-offset | `2px` |
| Active | background | `rgba(255, 234, 158, 0.35)` (predicted) |

#### D.2 Button Lưu (`I1002:12682;1002:12545`)
- **Dimensions:** 502 x 60px (fills remaining space)
- **Padding:** `16px`
- **Border-radius:** `8px`
- **Background:** `#FFEA9E`
- **Layout:** `display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 8px`
- **Text:** "Lưu" — Montserrat 22px, weight 700, line-height 28px, color #00101A
- **Icon:** Link icon 24x24px (`I1002:12682;1002:12545;186:1766`), after text

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Default | cursor | `pointer` |
| Hover | background | `#FFE078` (predicted, consistent with Login button) |
| Hover | transform | `translateY(-1px)` (predicted) |
| Focus | outline | `2px solid #FFEA9E` |
| Focus | outline-offset | `2px` |
| Active | background | `#FFD54F` (predicted) |
| Active | transform | `translateY(0)` |
| Disabled | opacity | `0.5` (predicted) |
| Disabled | cursor | `not-allowed` |

---

## 3. Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────┐ 752 x 388
│ bg: #FFF8E1   border-radius: 24px   padding: 40px   │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │ [A] "Thêm đường dẫn"                         │    │
│  │ 672x40  Montserrat 32/700  #00101A            │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│           ↕ 32px gap                                 │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │ [B] Text Field  672x56  flex-row  gap:16px    │    │
│  │                                              │    │
│  │ ┌─────────┐  ┌───────────────────────────┐   │    │
│  │ │[B.1]    │  │[B.2] Text Input           │   │    │
│  │ │"Nội dung"│  │ flex:1  h:56  r:8         │   │    │
│  │ │107x28   │  │ border:1px #998C5F         │   │    │
│  │ │22/700   │  │ bg:#FFF  px:24 py:16       │   │    │
│  │ └─────────┘  └───────────────────────────┘   │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│           ↕ 32px gap                                 │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │ [C] Link Field  672x56  flex-row  gap:16px    │    │
│  │                                              │    │
│  │ ┌─────┐  ┌──────────────────────────────┐    │    │
│  │ │[C.1]│  │[C.2] URL Input          [🔗]│    │    │
│  │ │"URL"│  │ flex:1  h:56  r:8            │    │    │
│  │ │47x28│  │ border:1px #998C5F           │    │    │
│  │ │22/700│  │ bg:#FFF  px:24 py:16         │    │    │
│  │ └─────┘  └──────────────────────────────┘    │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│           ↕ 32px gap                                 │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │ [D] Buttons  672x60  flex-row  gap:24px       │    │
│  │                                              │    │
│  │ ┌──────────┐  ┌────────────────────────────┐ │    │
│  │ │[D.1]     │  │[D.2]                       │ │    │
│  │ │"Hủy" ✕   │  │        "Lưu" 🔗            │ │    │
│  │ │146x60    │  │     502x60                 │ │    │
│  │ │r:4       │  │     r:8                    │ │    │
│  │ │border    │  │     bg:#FFEA9E             │ │    │
│  │ │px:40     │  │     px:16                  │ │    │
│  │ └──────────┘  └────────────────────────────┘ │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 4. Z-Index Layering

| Layer | Z-Index | Component |
|-------|---------|-----------|
| 1 | 50 | Modal backdrop overlay |
| 2 | 51 | Modal container (Add link box) |

---

## 5. Implementation Mapping

| Figma Node ID | React Component | File Path (Constitution P3) | Tailwind Classes |
|---------------|-----------------|----------------------------|------------------|
| — (overlay) | `AddLinkBox` wrapper | `src/components/ui/add-link-box.tsx` | `fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-150` |
| `1002:12917` | `AddLinkBox` content | `src/components/ui/add-link-box.tsx` | `z-[51] w-full max-w-[752px] p-10 bg-[#FFF8E1] rounded-3xl flex flex-col gap-8 transition-all duration-150` |
| `I1002:12682;1002:12500` | Title (h2) | — | `font-montserrat text-[32px] font-bold leading-10 text-[#00101A]` |
| `I1002:12682;1002:12501` | TextFieldRow | — | `flex flex-row items-center gap-4` |
| `I1002:12682;1002:12502` | Label | — | `font-montserrat text-[22px] font-bold leading-7 text-[#00101A] whitespace-nowrap` |
| `I1002:12682;1002:12503` | Input | — | `flex-1 h-14 px-6 py-4 border border-[#998C5F] rounded-lg bg-white font-montserrat text-base focus:border-2 focus:border-[#998C5F] outline-none` |
| `I1002:12682;1002:12652` | LinkFieldRow | — | `flex flex-row items-center gap-4` |
| `I1002:12682;1002:12653` | Label | — | `font-montserrat text-[22px] font-bold leading-7 text-[#00101A] whitespace-nowrap` |
| `I1002:12682;1002:12654` | Input (with icon) | — | `flex-1 h-14 px-6 py-4 border border-[#998C5F] rounded-lg bg-white font-montserrat text-base focus:border-2 focus:border-[#998C5F] outline-none` |
| `I1002:12682;1002:12543` | ButtonGroup | — | `flex flex-row gap-6 items-start` |
| `I1002:12682;1002:12544` | CancelButton | — | `flex items-center gap-2 self-stretch px-10 py-4 border border-[#998C5F] rounded bg-[rgba(255,234,158,0.10)] font-montserrat text-base font-bold text-[#00101A] hover:bg-[rgba(255,234,158,0.25)] transition-colors` |
| `I1002:12682;1002:12545` | SaveButton | — | `flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-[#FFEA9E] rounded-lg font-montserrat text-[22px] font-bold text-[#00101A] hover:bg-[#FFE078] transition-all` |

---

## 6. Responsive Breakpoints (Constitution P4: Mobile-first)

### Mobile (default, < 768px)
- Modal: `w-[calc(100vw-32px)]`, padding 24px, border-radius 16px
- Title: 24px/700/32px
- Labels: 18px/700/24px, full-width above inputs (stack vertical)
- Inputs: full-width, height 48px
- Buttons: stack vertical, both full-width, Lưu first then Hủy
- Touch targets: min 48px height

### Tablet (md: 768px)
- Modal: max-width 752px, centered
- Layout returns to horizontal (labels beside inputs)
- Buttons: horizontal layout as designed

### Desktop (lg: 1024px+)
- Pixel-perfect match with Figma values

---

## 7. Assets Required

| Asset | Figma Node | Format | Size |
|-------|-----------|--------|------|
| Close (X) icon | `I1002:12682;1002:12544;186:2761` (MM_MEDIA_Close) | SVG | 24x24px |
| Link icon (Save) | `I1002:12682;1002:12545;186:1766` (MM_MEDIA_Link) | SVG | 24x24px |
| Link icon (URL input) | `I1002:12682;1002:12654;186:2761` | SVG | 24x24px |
