# Login - Design Style Document

**Frame ID:** `662:14387`
**Frame Name:** Login
**Dimensions:** 1440 x 1024px
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#00101A` | Background chính `rgba(0,16,26,1)` |
| `--color-bg-header` | `rgba(11,15,18,0.8)` | Header semi-transparent |
| `--color-bg-button` | `#FFEA9E` | Nút Login `rgba(255,234,158,1)` |
| `--color-text-primary` | `#FFFFFF` | Text chính trên nền tối |
| `--color-text-button` | `#00101A` | Text trên nút Login |
| `--color-text-error` | `#EF4444` | Error messages |
| `--color-border-footer` | `#2E3940` | Footer border-top |
| `--gradient-overlay-lr` | `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%)` | Overlay trái→phải |
| `--gradient-overlay-bt` | `linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%)` | Overlay dưới→trên |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-hero` | Montserrat | 20px | 700 | 40px | 0.5px | #FFFFFF | Hero description (B.2) |
| `--text-button` | Montserrat | 22px | 700 | 28px | 0px | #00101A | Login button text |
| `--text-lang` | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF | Language selector "VN" |
| `--text-footer` | Montserrat Alternates | 16px | 700 | 24px | 0% | #FFFFFF | Copyright text |
| `--text-error` | Montserrat | 14px | 400 | 20px | 0px | #EF4444 | Error messages |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-page-x` | 144px | Page horizontal padding (xl) |
| `--sp-page-y` | 96px | Hero section vertical padding |
| `--sp-header-x` | 144px | Header horizontal padding |
| `--sp-header-y` | 12px | Header vertical padding |
| `--sp-footer-x` | 90px | Footer horizontal padding |
| `--sp-footer-y` | 40px | Footer vertical padding |
| `--sp-section-gap` | 80px | Gap: Key Visual → Content |
| `--sp-content-gap` | 24px | Gap: Text → Button in content |
| `--sp-content-pl` | 16px | Content area padding-left |
| `--sp-btn-x` | 24px | Button horizontal padding |
| `--sp-btn-y` | 16px | Button vertical padding |
| `--sp-btn-gap` | 8px | Gap inside button (text↔icon) |
| `--sp-error-mt` | 12px | Error message margin-top |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-button` | 8px | Login button |
| `--radius-lang` | 4px | Language selector |

---

## 2. Component Style Details

### A. Header (`662:14391`)
- **Dimensions:** 1440 x 80px (full-width)
- **Position:** `position: absolute; top: 0` (trên cùng)
- **Layout:** `display: flex; flex-direction: row; justify-content: space-between; align-items: center`
- **Padding:** `12px 144px`
- **Background:** `rgba(11,15,18,0.8)`
- **Backdrop:** `backdrop-filter: blur(10px)`
- **Z-index:** 50

#### A.1 Logo (`I662:14391;186:2166`)
- **Container:** 52 x 56px, `display: flex; align-items: center`
- **Image:** 52 x 48px (`I662:14391;178:1033;178:1030`), `object-fit: cover`
- **Interaction:** None (decorative logo)

#### A.2 Language Selector (`I662:14391;186:1601`)
- **Container:** 108 x 56px
- **Inner button** (`I662:14391;186:1696;186:1821`):
  - Dimensions: 108 x 56px
  - Padding: 16px
  - Border-radius: 4px
  - Layout: `flex-direction: row; justify-content: space-between; align-items: center; gap: 2px`
- **Content:**
  - Flag icon (`I662:14391;186:1696;186:1821;186:1709`): 24x24px (VN flag 20x15px inside)
  - Text "VN" (`I662:14391;186:1696;186:1821;186:1439`): Montserrat 16px/700/24px, color #FFF, letter-spacing 0.15px
  - Chevron down (`I662:14391;186:1696;186:1821;186:1441`): 24x24px

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `transparent` |
| Hover | background | `rgba(255,255,255,0.1)` |
| Hover | cursor | `pointer` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |
| Focus | outline-offset | `2px` |
| Active | background | `rgba(255,255,255,0.15)` |
| Expanded | chevron transform | `rotate(180deg)` |

### B. Hero Section (`662:14393`)
- **Dimensions:** 1440 x 845px
- **Position:** `position: absolute; top: 88px`
- **Layout:** `display: flex; flex-direction: column; gap: 120px`
- **Padding:** `96px 144px`
- **Z-index:** 10

#### Inner Frame (`662:14394`)
- **Dimensions:** 1152 x 653px
- **Layout:** `display: flex; flex-direction: column; justify-content: center; gap: 80px`

#### B.1 Key Visual (`662:14395`)
- **Container:** 1152 x 200px, `display: flex; flex-direction: column`
- **Image** (`2939:9548`): 451 x 200px, `object-fit: cover`, aspect-ratio 115/51
- **Content:** "ROOT FURTHER" logo (static image asset)

#### B.2 Content Text (`662:14753`)
- **Node:** `662:14753`
- **Dimensions:** 480 x 80px
- **Font:** Montserrat, 20px, weight 700, line-height 40px, letter-spacing 0.5px
- **Color:** `#FFFFFF`
- **Text-align:** left
- **Content (VN):**
  ```
  Bắt đầu hành trình của bạn cùng SAA 2025.
  Đăng nhập để khám phá!
  ```
- **Content (EN, predicted):**
  ```
  Start your journey with SAA 2025.
  Login to explore!
  ```

#### Content + Button Wrapper (`662:14755`)
- **Dimensions:** 496 x 164px
- **Layout:** `display: flex; flex-direction: column; gap: 24px`
- **Padding:** `0 0 0 16px`

#### B.3 Login Button (`662:14425` → `662:14426`)
- **Outer frame:** 305 x 60px
- **Button instance** (`662:14426`, component `186:1567`):
  - Dimensions: 305 x 60px
  - Padding: `16px 24px`
  - Border-radius: 8px
  - Background: `#FFEA9E`
  - Layout: `display: flex; flex-direction: row; align-items: center; gap: 8px`
- **Text** (`I662:14426;186:1568`):
  - Content: "LOGIN With Google"
  - Font: Montserrat 22px/700/28px, letter-spacing 0px
  - Color: `#00101A`
  - Text-align: center
- **Google Icon** (`I662:14426;186:1766`): 24x24px, positioned after text

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Default | cursor | `pointer` |
| Hover | background | `#FFE078` |
| Hover | transform | `translateY(-2px)` |
| Hover | box-shadow | `0 4px 12px rgba(255,234,158,0.4)` |
| Focus | outline | `2px solid #FFEA9E` |
| Focus | outline-offset | `2px` |
| Active | background | `#FFD54F` |
| Active | transform | `translateY(0)` |
| Disabled | opacity | `0.5` |
| Disabled | cursor | `not-allowed` |
| Loading | icon | Spinner replaces Google icon (24x24px, animate-spin) |

### C. Background Layer

#### C.1 Key Visual Image (`662:14388` → `662:14389`)
- **Dimensions:** 1441 x 1022px (full bleed)
- **Position:** `position: absolute; inset: 0`
- **Background:** `object-fit: cover` (image từ Figma)
- **Z-index:** 0

#### C.2 Gradient Overlay Left→Right (`662:14392`)
- **Dimensions:** 1442 x 1024px
- **Position:** `position: absolute; inset: 0`
- **Background:** `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%)`
- **Z-index:** 1

#### C.3 Gradient Overlay Bottom→Top (`662:14390`)
- **Dimensions:** 1440 x 1093px (starts y:138)
- **Position:** `position: absolute; bottom: 0; left: 0; right: 0`
- **Background:** `linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%)`
- **Z-index:** 2

### D. Footer (`662:14447`)
- **Dimensions:** 1440 x auto
- **Position:** `position: absolute; bottom: 0`
- **Padding:** `40px 90px`
- **Layout:** `display: flex; align-items: center; justify-content: center`
- **Border-top:** `1px solid #2E3940`
- **Z-index:** 50
- **Text** (`I662:14447;342:1413`):
  - Content: "Bản quyền thuộc về Sun* © 2025"
  - Font: Montserrat Alternates 16px/700/24px
  - Color: `#FFFFFF`
  - Text-align: center

---

## 3. Z-Index Layering

| Layer | Z-Index | Component | Node ID |
|-------|---------|-----------|---------|
| 1 (bottom) | 0 | Background Image | `662:14388` |
| 2 | 1 | Gradient L→R | `662:14392` |
| 3 | 2 | Gradient B→T | `662:14390` |
| 4 | 10 | Hero Section | `662:14393` |
| 5 | 50 | Header | `662:14391` |
| 6 | 50 | Footer | `662:14447` |

---

## 4. Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────┐ 1440 x 1024
│ ▓▓▓▓▓▓ [C.1] Background Image (absolute, z:0) ▓▓▓▓▓ │
│ ░░░░░░ [C.2] Gradient L→R (z:1) ░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░ [C.3] Gradient B→T (z:2) ░░░░░░░░░░░░░░░░░░░ │
│                                                      │
│ ┌──────────────────────────────────────────────────┐  │
│ │ [A] HEADER  1440x80  z:50                        │  │
│ │ px:144  py:12  bg:rgba(11,15,18,0.8) blur:10px   │  │
│ │                                                  │  │
│ │ [A.1] Logo 52x56    ←space-between→  [A.2] VN▼  │  │
│ │                                      108x56 r:4  │  │
│ └──────────────────────────────────────────────────┘  │
│                                                      │
│ ┌──────────────────────────────────────────────────┐  │
│ │ [B] HERO  1440x845  z:10  top:88px               │  │
│ │ px:144  py:96                                    │  │
│ │                                                  │  │
│ │   ┌──────────────────────────┐                   │  │
│ │   │ [B.1] ROOT FURTHER       │                   │  │
│ │   │ 451x200 (image)          │                   │  │
│ │   └──────────────────────────┘                   │  │
│ │                                                  │  │
│ │          ↕ 80px gap                              │  │
│ │                                                  │  │
│ │   ├16px┤                                         │  │
│ │   ┌──────────────────────────────┐               │  │
│ │   │ [B.2] "Bắt đầu hành trình..." │               │  │
│ │   │ 480x80  Montserrat 20/700     │               │  │
│ │   └──────────────────────────────┘               │  │
│ │          ↕ 24px gap                              │  │
│ │   ┌────────────────────────────┐                 │  │
│ │   │ [B.3] LOGIN With Google [G]│ 305x60          │  │
│ │   │ bg:#FFEA9E r:8 px:24 py:16│                  │  │
│ │   └────────────────────────────┘                 │  │
│ │                                                  │  │
│ └──────────────────────────────────────────────────┘  │
│                                                      │
│ ┌──────────────────────────────────────────────────┐  │
│ │ [D] FOOTER  z:50  border-top:1px #2E3940         │  │
│ │ px:90 py:40                                      │  │
│ │      "Bản quyền thuộc về Sun* © 2025"            │  │
│ └──────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## 5. Implementation Mapping

| Figma Node ID | React Component | File Path (Constitution P3) | Tailwind Classes |
|---------------|-----------------|----------------------------|------------------|
| `662:14387` | `LoginPage` | `src/app/(auth)/login/page.tsx` | `relative w-full min-h-screen bg-[#00101A] overflow-hidden` |
| `662:14391` | `LoginHeader` | `src/components/login/login-header.tsx` | `absolute top-0 w-full h-20 flex items-center justify-between px-6 md:px-20 xl:px-36 bg-[rgba(11,15,18,0.8)] backdrop-blur-[10px] z-50` |
| `I662:14391;186:2166` | Logo (inside Header) | — | `w-[52px] h-[56px]` |
| `I662:14391;186:1601` | `LanguageSelector` (`"use client"`) | `src/components/login/language-selector.tsx` | `flex items-center rounded px-4 py-4 hover:bg-white/10 transition-colors` |
| `662:14388` | Background (img) | — | `absolute inset-0 w-full h-full object-cover` |
| `662:14392` | Gradient L→R (div) | — | `absolute inset-0 z-[1] [background:linear-gradient(90deg,#00101A_0%,#00101A_25.41%,rgba(0,16,26,0)_100%)]` |
| `662:14390` | Gradient B→T (div) | — | `absolute inset-0 z-[2] [background:linear-gradient(0deg,#00101A_22.48%,rgba(0,19,32,0)_51.74%)]` |
| `662:14393` | `LoginHero` | `src/components/login/login-hero.tsx` | `relative z-10 flex flex-col px-6 md:px-20 xl:px-36 pt-44 xl:pt-[184px]` |
| `2939:9548` | Key Visual (img) | — | `w-[280px] md:w-[360px] xl:w-[451px] h-auto` |
| `662:14753` | Hero Text (p) | — | `pl-4 text-base md:text-lg xl:text-xl font-bold leading-8 xl:leading-10 text-white font-montserrat` |
| `662:14425` | `LoginButton` (`"use client"`) | `src/components/login/login-button.tsx` | `flex items-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg font-montserrat text-lg xl:text-[22px] font-bold text-[#00101A] hover:bg-[#FFE078] hover:-translate-y-0.5 transition-all` |
| `662:14447` | `LoginFooter` | `src/components/login/login-footer.tsx` | `absolute bottom-0 w-full flex items-center justify-center px-6 md:px-[90px] py-10 border-t border-[#2E3940] z-50` |

---

## 6. Responsive Breakpoints (Constitution P4: Mobile-first)

### Mobile (default, < 768px)
- Header: `px-6`, logo 40x44px, language selector 80x44px
- Hero: `px-6 pt-32`, key visual width 280px
- Text: 16px/28px
- Button: full-width (w-full), min-height 48px (touch target)
- Footer: `px-6 py-6`, text 14px

### Tablet (md: 768px)
- Header: `px-20`
- Hero: `px-20`, key visual 360px
- Text: 18px/36px
- Button: auto-width (305px)
- Footer: `px-20`

### Desktop (lg: 1024px)
- Tương tự Figma nhưng padding giảm nhẹ

### Large Desktop (xl: 1440px — Figma design)
- Pixel-perfect match với Figma values ở trên

---

## 7. Assets Required

| Asset | Figma Node | Format | Responsive Sizes |
|-------|-----------|--------|------------------|
| Logo SAA 2025 | `I662:14391;178:1033;178:1030` | SVG preferred | 40x44 / 52x48 |
| ROOT FURTHER logo | `2939:9548` | SVG or WebP | 280w / 360w / 451w |
| Background artwork | `662:14389` | WebP (optimized) | 768w / 1024w / 1440w / 2880w (2x) |
| Google icon | `I662:14426;186:1766` | SVG | 24x24 |
| VN Flag | `I662:14391;186:1696;186:1821;186:1709` | SVG | 20x15 |
| EN Flag | (from i18n) | SVG | 20x15 |
| Chevron down | `I662:14391;186:1696;186:1821;186:1441` | SVG | 24x24 |

> **Note:** Background image MUST use `next/image` with `sizes` prop
> và Cloudflare Images binding cho optimization (Constitution P6).
