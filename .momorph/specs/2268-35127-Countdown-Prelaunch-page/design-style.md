# Countdown - Prelaunch Page - Design Style Document

**Frame ID:** `2268:35127`
**Frame Name:** Countdown - Prelaunch page
**Dimensions:** 1512 x 1077px (design viewport; implementation target: 1440px)
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#00101A` | Background chính `rgba(0,16,26,1)` |
| `--color-text-primary` | `#FFFFFF` | Heading text, labels, digit numbers |
| `--color-border-digit` | `#FFEA9E` | Border ô số (0.75px, opacity 0.5) |
| `--gradient-cover` | `linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)` | Gradient overlay trên background |
| `--gradient-digit-bg` | `linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)` | Background gradient ô số (opacity 0.5) |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-heading` | Montserrat | 36px | 700 (italic) | 48px | 0px | #FFFFFF | "Sự kiện sẽ bắt đầu sau" — centered, **font-style: italic** |
| `--text-digit` | Digital Numbers | 73.73px | 400 | — | 0% | #FFFFFF | Countdown digits (0-9) inside glassmorphism boxes |
| `--text-label` | Montserrat | 36px | 700 | 48px | 0px | #FFFFFF | "DAYS", "HOURS", "MINUTES" — uppercase labels |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-container-pad` | 96px 144px | "Bìa" outer container padding |
| `--sp-bia-gap` | 120px | Gap trong "Bìa" container (outer nesting level). **Note:** In Figma, there are 4 nested frames (Bìa → Frame 487 → Frame 523 → Countdown time) each with only 1 child, so the 120px/60px intermediate gaps have no visible effect. For implementation, flatten to a single container with `h-full justify-center` (vertical center) — the only meaningful gap is `--sp-heading-timer-gap: 24px` below. |
| `--sp-heading-timer-gap` | 24px | Gap giữa heading "Sự kiện..." và timer groups (inside `Countdown time` frame `2268:35136`) |
| `--sp-timer-group-gap` | 60px | Gap giữa 3 nhóm countdown (Days/Hours/Minutes) |
| `--sp-digit-gap` | 21px | Gap giữa 2 ô số trong cùng nhóm |
| `--sp-digit-label-gap` | 21px | Gap giữa row ô số và label text |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-digit-box` | 12px | Ô số countdown (glassmorphism card) |

### Effects

| Token | Value | Usage |
|-------|-------|-------|
| `--blur-digit-bg` | `blur(24.96px)` | Backdrop-filter cho ô số |
| `--opacity-digit-box` | `0.5` | Opacity cho background + border ô số |

---

## 2. Component Style Details

### Background Image (`2268:35129`)
- **Dimensions:** Full viewport (100vw x 100vh)
- **Position:** Absolute, full screen
- **Image:** `background: url(...) lightgray -142px -789.753px / 109.392% 216.017% no-repeat`
- **Implementation:** `next/image` with `fill`, `object-cover`, `priority`

### Cover Gradient (`2268:35130`)
- **Dimensions:** Full viewport
- **Position:** Absolute, overlays background
- **Background:** `linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)`

### Countdown Container / "Bìa" (`2268:35131`)
- **Dimensions:** Full width, auto height
- **Layout:** `display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 120px`
- **Padding:** `96px 144px`
- **Position:** Absolute, centered vertically over background
- **Y offset:** starts at y=218 in Figma (center of viewport)

### Heading Text (`2268:35137`)
- **Text:** "Sự kiện sẽ bắt đầu sau"
- **Font:** Montserrat 36px/700/48px, **font-style: italic**
- **Color:** `#FFFFFF`
- **Text-align:** center
- **Width:** Full container width

### Timer Container (`2268:35138`)
- **Dimensions:** 644 x 192px
- **Layout:** `display: flex; flex-direction: row; gap: 60px; align-items: center`

### Countdown Group (Days/Hours/Minutes) (`2268:35139`, `2268:35144`, `2268:35149`)
- **Dimensions:** 175 x 192px
- **Layout:** `display: flex; flex-direction: column; gap: 21px; align-items: flex-start`

#### Digit Row (Frame 485 inside each group)
- **Dimensions:** 175 x 123px
- **Layout:** `display: flex; flex-direction: row; gap: 21px; align-items: center`

#### Digit Box — Instance of component `186:2619`
- **Outer dimensions:** 77 x 123px

##### Digit Box Background (Rectangle 1)
- **Dimensions:** 76.8 x 122.88px
- **Border:** `0.75px solid #FFEA9E` (variable `--Details-Text-Primary-1`)
- **Opacity:** `0.5` (applies to entire box visual)
- **Background:** `linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)`
- **Border-radius:** `12px`
- **Backdrop-filter:** `blur(24.96px)`

##### Digit Text
- **Dimensions:** 59 x 95px (bounding box)
- **Font:** Digital Numbers, 73.73px, weight 400
- **Color:** `#FFFFFF`
- **Text-align:** left (visually centered in box)
- **Letter-spacing:** 0%

#### Label Text ("DAYS" / "HOURS" / "MINUTES")
- **Font:** Montserrat 36px/700/48px
- **Color:** `#FFFFFF`
- **Text-align:** left (aligns with digit boxes left edge)

---

## 3. Z-Index Layering

| Layer | Z-Index | Component | Node ID |
|-------|---------|-----------|---------|
| 1 (bottom) | 0 | Background Image | `2268:35129` |
| 2 | 1 | Cover Gradient | `2268:35130` |
| 3 | 10 | Countdown Container ("Bìa") | `2268:35131` |

---

## 4. Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐ 100vw x 100vh
│ ▓▓▓▓▓▓▓▓▓ [BG] Background Artwork (absolute, fill) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ░░░░░░░░░ [Cover] Gradient 18deg (absolute, fill) ░░░░░░░░░░░░░░░░ │
│                                                                     │
│                                                                     │
│         ┌─────────────────────────────────────────────────┐         │
│         │         Sự kiện sẽ bắt đầu sau                 │         │
│         │         Montserrat 36px/700 italic white        │         │
│         │         (centered)                              │         │
│         │                                                 │         │
│         │                  ↕ 24px gap                     │         │
│         │                                                 │         │
│         │   ┌──────┐┌──────┐  60px  ┌──────┐┌──────┐  60px  ┌──────┐┌──────┐  │
│         │   │  0   ││  0   │  gap   │  0   ││  5   │  gap   │  2   ││  0   │  │
│         │   │ 77x  ││ 77x  │        │ 77x  ││ 77x  │        │ 77x  ││ 77x  │  │
│         │   │ 123  ││ 123  │        │ 123  ││ 123  │        │ 123  ││ 123  │  │
│         │   └──────┘└──────┘        └──────┘└──────┘        └──────┘└──────┘  │
│         │     21px gap                21px gap                21px gap         │
│         │     ↕                       ↕                       ↕               │
│         │     DAYS                    HOURS                   MINUTES         │
│         │                                                 │         │
│         └─────────────────────────────────────────────────┘         │
│                                                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Digit Box Detail

```
┌─────────────────────┐ 77 x 123px
│ ╔═══════════════╗   │
│ ║               ║   │ border: 0.75px solid #FFEA9E
│ ║               ║   │ opacity: 0.5
│ ║     ██████    ║   │ bg: linear-gradient(180deg, #FFF, rgba(255,255,255,0.1))
│ ║    ██    ██   ║   │ border-radius: 12px
│ ║    ██    ██   ║   │ backdrop-filter: blur(24.96px)
│ ║     ██████    ║   │
│ ║    ██    ██   ║   │ Font: Digital Numbers 73.73px
│ ║    ██    ██   ║   │ Color: #FFFFFF
│ ║     ██████    ║   │
│ ║               ║   │
│ ╚═══════════════╝   │
└─────────────────────┘
```

---

## 5. Implementation Mapping

| Figma Node ID | React Component | File Path | Key Tailwind / CSS |
|---------------|-----------------|-----------|---------------------|
| `2268:35127` | `CountdownPage` | `src/app/(prelaunch)/countdown/page.tsx` | `relative w-full h-screen bg-[#00101A] overflow-hidden` |
| `2268:35129` | BG Image (inside page) | — | `absolute inset-0 object-cover` via `next/image` fill |
| `2268:35130` | Cover Gradient (div) | — | `absolute inset-0` with inline gradient style |
| `2268:35131` | Countdown Container | — | `relative z-10 flex flex-col items-center justify-center h-full` |
| `2268:35137` | Heading (h1) | — | `font-montserrat text-4xl font-bold italic leading-[48px] text-white text-center` |
| `2268:35138` | Timer Container | — | `flex items-center gap-[60px]` |
| `2268:35139` | `CountdownUnit` | `src/components/countdown/countdown-unit.tsx` | `flex flex-col gap-[21px]` |
| `186:2619` | `DigitBox` | `src/components/countdown/digit-box.tsx` | Custom glassmorphism styles |
| `2268:35143` | Unit Label | — | `font-montserrat text-4xl font-bold leading-[48px] text-white` |

### Font Registration

| Font | Source | CSS Variable | Usage |
|------|--------|-------------|-------|
| Montserrat | `next/font/google` | `--font-montserrat` | Already registered in project. **Verify italic variant is loaded** — the heading uses `font-style: italic`. If current config only loads `style: 'normal'`, add `style: ['normal', 'italic']` to the Montserrat `next/font/google` config. |
| Digital Numbers | Google Fonts (`next/font/google`) — available as "Digital Numbers" | `--font-digital` | New — LED/7-segment style countdown digits. If unavailable, fallback to similar fonts: "DSEG7 Classic" (local/npm) or monospace |

---

## 6. Responsive Breakpoints (Constitution P4: Mobile-first)

### Mobile (default, < 768px)
- Background: full cover, crop as needed
- Heading: `text-xl` (20px), italic
- Timer groups: `gap-4` (16px), single row — scale digit boxes to fit
- Digit boxes: ~45 x 72px, font ~44px
- Labels: `text-base` (16px)
- Container padding: `px-4 py-8`
- Digit gap within group: `gap-2` (8px)

### Tablet (md: 768px)
- Heading: `text-2xl` (24px), italic
- Timer groups: `gap-8` (32px)
- Digit boxes: ~60 x 96px, font ~58px
- Labels: `text-2xl` (24px)
- Digit gap within group: `gap-3` (12px)

### Desktop (lg: 1024px)
- Near pixel-perfect
- Heading: `text-3xl` (30px), italic
- Timer groups: `gap-[48px]`
- Digit boxes: 70 x 112px, font ~67px
- Labels: `text-3xl` (30px)
- Digit gap within group: `gap-4` (16px)
- Full horizontal layout

### Large Desktop (xl: 1440px)
- Pixel-perfect Figma match
- Digit boxes: 77 x 123px
- Timer gap: 60px
- Digit gap: 21px
- Heading + labels: 36px/700

---

## 7. Assets Required

| Asset | Figma Node | Format | Size |
|-------|-----------|--------|------|
| Background artwork | `2268:35129` (MM_MEDIA_BG Image) | WebP | Full screen |

> **Note:** The background image appears to be the same SAA 2025 artwork used on other pages. Check if it already exists in `public/images/` before downloading.

---

## 8. Glassmorphism Digit Box — CSS Reference

```css
.digit-box {
  width: 77px;
  height: 123px;
  position: relative;
}

.digit-box-bg {
  width: 76.8px;
  height: 122.88px;
  border: 0.75px solid #FFEA9E;
  border-radius: 12px;
  opacity: 0.5;
  background: linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.10) 100%);
  backdrop-filter: blur(24.96px);
}

.digit-text {
  font-family: 'Digital Numbers', monospace;
  font-size: 73.73px;
  font-weight: 400;
  color: #FFFFFF;
  /* Centered within box */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

> **Implementation Note:** The `opacity: 0.5` on the Figma rectangle affects the entire box visual (border + background) but NOT the digit text inside. In CSS, use `opacity` on the background element only, or use `rgba` colors with 50% alpha for border and background. The digit text should remain at full opacity.
