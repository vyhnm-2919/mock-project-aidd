# Open secret box - chưa mở — Design Style Document

**Frame ID:** `1466:7676`
**Frame Name:** Open secret box - chưa mở
**Dimensions:** 652 x 823px
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-modal` | `#00101A` | Modal background |
| `--color-text-title` | `#FFEA9E` | Title "KHÁM PHÁ SECRET BOX CỦA BẠN" |
| `--color-text-instruction` | `#FFFFFF` | "Click vào box để mở" |
| `--color-text-label` | `#FFFFFF` | "Secretbox chưa mở" |
| `--color-text-count` | `#FFEA9E` | Count number "05" |
| `--color-divider` | `rgba(46, 57, 64, 1)` / `#2E3940` | Horizontal dividers |
| `--color-close-icon` | `#FFFFFF` | Close button (predicted) |
| `--color-backdrop` | `rgba(0, 0, 0, 0.6)` | Modal backdrop overlay (predicted, consistent with write-kudo-modal) |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-title` | Montserrat | 25.46px (~26px) | 700 | 31.82px (~32px) | 0px | #FFEA9E | Modal title |
| `--text-instruction` | Montserrat | 12.73px (~13px) | 700 | 19.09px (~19px) | 0.4px | #FFFFFF | "Click vào box để mở" |
| `--text-count-label` | Montserrat | 12.73px (~13px) | 700 | 19.09px (~19px) | 0.4px | #FFFFFF | "Secretbox chưa mở" |
| `--text-count-number` | Montserrat | 28.64px (~29px) | 700 | 35px | 0px | #FFEA9E | Count "05" |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-modal-padding` | 24px 13px | Modal internal padding (top/bottom, left/right) |
| `--sp-modal-gap` | 22px | Gap between main sections |
| `--sp-count-gap` | 6px | Gap between count label and number |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-modal` | 13px | Modal container |

---

## 2. Component Style Details

### Modal Container (`1466:7676`)
- **Dimensions:** 652 x 823px (scaled for Figma; implement as responsive)
- **Padding:** `24px 13px`
- **Border-radius:** `13px`
- **Background:** `#00101A`
- **Layout:** `display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px`

### Title Bar (`1466:7677`)
- **Dimensions:** 626px width (fill)
- **Layout:** Row — title text centered, close button absolute right

#### Title Text (A: `1466:7678`)
- **Font:** Montserrat 26px, weight 700, line-height 32px
- **Color:** `#FFEA9E`
- **Text-align:** center

#### Close Button (A.close: `1466:7679`)
- **Dimensions:** 19 x 19px
- **Position:** Absolute right within title bar
- **Component:** `214:3851` (MM_MEDIA_Close)

**Close Button States:**

| State | Property | Value |
|-------|----------|-------|
| Default | color | `#FFFFFF` |
| Hover | opacity | `0.7` (predicted) |
| Focus | outline | `2px solid #FFEA9E` (predicted) |

### Dividers (`1466:7680`, `1466:7688`)
- **Dimensions:** 626px x 1px
- **Background:** `#2E3940`

### Instruction Text (B: `1466:7681`)
- **Font:** Montserrat 13px, weight 700, line-height 19px, letter-spacing 0.4px
- **Color:** `#FFFFFF`
- **Text-align:** center
- **Visibility:** Hidden when `unopenedCount === 0`

### Box Image Area (C: `1466:7684`)
- **Dimensions:** 557 x 557px (square)
- **Content:**
  - Gift box image (`1466:7686`): 558x558px, aspect-ratio 1/1
  - Light effect overlay (`1466:7685`): 547x547px, positioned over the box
- **Cursor:** `pointer` when clickable, `not-allowed` when disabled

**Box Image States:**

| State | Property | Value |
|-------|----------|-------|
| Default | cursor | `pointer` |
| Hover | transform | `scale(1.02)` (predicted, subtle zoom) |
| Hover | filter | `brightness(1.1)` (predicted) |
| Active (clicking) | transform | `scale(0.98)` (predicted) |
| Disabled (0 boxes) | opacity | `0.5` |
| Disabled (0 boxes) | cursor | `not-allowed` |
| Loading (opening) | opacity | `0.7` + animation pulse |

### Unopened Count Footer (D: `1466:7689`)
- **Layout:** `display: flex; flex-direction: row; align-items: center; gap: 6px`
- **Position:** Centered horizontally

#### Count Label (D.label: `1466:7692`)
- **Font:** Montserrat 13px, weight 700, line-height 19px, letter-spacing 0.4px
- **Color:** `#FFFFFF`
- **Text-align:** right

#### Count Number (D.count: `1466:7693`)
- **Font:** Montserrat 29px, weight 700, line-height 35px
- **Color:** `#FFEA9E`
- **Text-align:** right
- **Format:** 2-digit zero-padded (e.g. "05", "12")

---

## 3. Layout Structure (ASCII)

```
┌──────────────────────────────────────────┐ 652px
│ Modal  bg:#00101A  r:13  p:24px 13px      │
│                                           │
│  ┌─────────────────────────────────────┐  │ 626px
│  │ KHÁM PHÁ SECRET BOX CỦA BẠN    ✕  │  │ title: #FFEA9E 26px/700
│  └─────────────────────────────────────┘  │
│  ─────────────────────────────────────── │ divider: #2E3940 1px
│                                           │
│         Click vào box để mở               │ instruction: #FFF 13px/700
│                                           │
│  ┌─────────────────────────────────────┐  │ 557x557
│  │                                     │  │
│  │         🎁 Gift Box Image           │  │ clickable area
│  │        (with light effects)         │  │
│  │                                     │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  ─────────────────────────────────────── │ divider: #2E3940 1px
│                                           │
│       Secretbox chưa mở  05              │ label:#FFF + count:#FFEA9E
│                                           │
└──────────────────────────────────────────┘
```

---

## 4. Implementation Mapping

| Figma Node ID | React Component | Tailwind Classes |
|---------------|-----------------|------------------|
| — | Backdrop overlay | `fixed inset-0 z-50 bg-black/60` (click to close) |
| `1466:7676` | `SecretBoxModal` (dialog) | `relative z-50 flex flex-col items-center gap-[22px] bg-[#00101A] rounded-[13px] p-6 px-3 w-full max-w-[652px] mx-4 md:mx-auto max-h-[calc(100vh-2rem)] overflow-y-auto` |
| `1466:7677` | Title bar | `flex items-center justify-between w-full` |
| `1466:7678` | Title text | `font-montserrat text-[26px] font-bold leading-8 text-[#FFEA9E] text-center flex-1` |
| `1466:7679` | Close button | `w-5 h-5 text-white hover:opacity-70 cursor-pointer shrink-0` |
| `1466:7680` | Divider | `w-full h-px bg-[#2E3940]` |
| `1466:7681` | Instruction | `font-montserrat text-[13px] font-bold leading-[19px] tracking-[0.4px] text-white text-center` |
| `1466:7684` | Box image wrapper | `relative w-full max-w-[557px] aspect-square cursor-pointer hover:scale-[1.02] transition-transform` |
| `1466:7688` | Divider | `w-full h-px bg-[#2E3940]` |
| `1466:7689` | Count footer | `flex items-center gap-1.5` |
| `1466:7692` | Count label | `font-montserrat text-[13px] font-bold leading-[19px] tracking-[0.4px] text-white` |
| `1466:7693` | Count number | `font-montserrat text-[29px] font-bold leading-[35px] text-[#FFEA9E]` |

---

## 5. Responsive Breakpoints (Constitution P4: Mobile-first)

### Mobile (default, < 768px)
- Modal: full-width with small margin (e.g. `mx-4`), max-height `100vh - 2rem`
- Box image: scales to fill available width, maintains aspect-ratio 1:1
- Title: may wrap to 2 lines at smaller widths

### Tablet/Desktop (md: 768px+)
- Modal: `max-w-[652px]`, centered with backdrop overlay
- Box image: 557px max width

---

## 6. Assets Required

| Asset | Figma Node | Format | Size |
|-------|-----------|--------|------|
| Gift box (unopened) | `1466:7686` (MM_MEDIA_box quà chưa mở) | PNG/WebP | 558x558 |
| Light effect overlay | `1466:7685` (MM_MEDIA_hiệu ứng box quà) | PNG/WebP | 547x547 (transparent) |
| Close icon | `1466:7679` (MM_MEDIA_Close) | SVG | 19x19 |

> **Note:** Gift box and light effect images must be downloaded from Figma via MoMorph `get_media_files` tool during implementation Phase 0.
