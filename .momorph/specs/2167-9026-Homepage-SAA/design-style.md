# Homepage SAA - Design Style Document

**Frame ID:** `2167:9026`
**Frame Name:** Homepage SAA
**Dimensions:** 1512 x 4480px
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#00101A` | Background chính `rgba(0,16,26,1)` |
| `--color-bg-header` | `rgba(16,20,23,0.8)` | Header semi-transparent |
| `--color-bg-button-primary` | `#FFEA9E` | Nút CTA primary `rgba(255,234,158,1)` |
| `--color-bg-button-secondary` | `rgba(255,234,158,0.1)` | Nút CTA secondary |
| `--color-bg-countdown` | `linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)` | Ô countdown (opacity 0.5) |
| `--color-bg-notification-badge` | `#D4271D` | Badge thông báo `rgba(212,39,29,1)` |
| `--color-text-primary` | `#FFFFFF` | Text chính trên nền tối |
| `--color-text-accent` | `#FFEA9E` | Text nhấn (tiêu đề giải, nav selected, thời gian/địa điểm) |
| `--color-text-button-primary` | `#00101A` | Text trên nút CTA primary |
| `--color-border` | `#2E3940` | Divider, footer border `rgba(46,57,64,1)` |
| `--color-border-accent` | `#998C5F` | Border nút secondary, user icon |
| `--color-border-countdown` | `#FFEA9E` | Border ô countdown (0.5px) |
| `--gradient-cover` | `linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%)` | Overlay gradient trên hero |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-nav` | Montserrat | 14px | 700 | 20px | 0.1px | #FFFFFF | Header nav links |
| `--text-nav-selected` | Montserrat | 14px | 700 | 20px | 0.1px | #FFEA9E | Nav link active (+ text-shadow) |
| `--text-lang` | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF | Language selector "VN" |
| `--text-countdown-number` | Digital Numbers | 49.15px | 400 | — | 0% | #FFFFFF | Số đếm ngược |
| `--text-countdown-label` | Montserrat | 24px | 700 | 32px | 0px | #FFFFFF | "DAYS", "HOURS", "MINUTES" |
| `--text-coming-soon` | Montserrat | 24px | 700 | 32px | 0px | #FFFFFF | "Coming soon" |
| `--text-event-label` | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF | "Thời gian:", "Địa điểm:" |
| `--text-event-value` | Montserrat | 24px | 700 | 32px | 0px | #FFEA9E | "26/12/2025", "Âu Cơ Art Center" |
| `--text-event-note` | Montserrat | 16px | 700 | 24px | 0.5px | #FFFFFF | Livestream note |
| `--text-cta` | Montserrat | 22px | 700 | 28px | 0px | #00101A / #FFF | Text nút CTA |
| `--text-content` | Montserrat | 24px | 700 | 32px | 0px | #FFFFFF | Đoạn mô tả Root Further |
| `--text-content-quote` | Montserrat | 20px | 700 | 32px | 0px | #FFFFFF | Trích dẫn (text-align center) |
| `--text-section-caption` | Montserrat | 24px | 700 | 32px | 0px | #FFFFFF | "Sun* annual awards 2025" |
| `--text-section-title` | Montserrat | 57px | 700 | 64px | -0.25px | #FFEA9E | "Hệ thống giải thưởng" |
| `--text-card-title` | Montserrat | 24px | 400 | 32px | 0px | #FFEA9E | Tên hạng mục giải |
| `--text-card-desc` | Montserrat | 16px | 400 | 24px | 0.5px | #FFFFFF | Mô tả giải thưởng |
| `--text-card-link` | Montserrat | 16px | 500 | 24px | 0.15px | #FFFFFF | "Chi tiết" link |
| `--text-footer` | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF | Footer nav links |
| `--text-copyright` | Montserrat Alternates | 16px | 700 | 24px | 0% | #FFFFFF | Copyright text |
| `--text-widget` | Montserrat | 24px | 700 | 32px | 0px | #00101A | Widget "/" separator |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-page-x` | 144px | Page horizontal padding (xl) |
| `--sp-page-y` | 96px | Page vertical padding |
| `--sp-header-x` | 144px | Header horizontal padding |
| `--sp-header-y` | 12px | Header vertical padding |
| `--sp-section-gap` | 120px | Gap giữa các section chính |
| `--sp-hero-gap` | 40px | Gap trong hero (logo → countdown area) |
| `--sp-countdown-gap` | 40px | Gap giữa Days/Hours/Minutes groups |
| `--sp-countdown-digit-gap` | 14px | Gap giữa 2 ô số trong 1 group |
| `--sp-countdown-label-gap` | 14px | Gap giữa ô số và label |
| `--sp-event-info-gap` | 8px | Gap giữa 2 dòng event info |
| `--sp-event-item-gap` | 60px | Gap giữa "Thời gian" và "Địa điểm" |
| `--sp-cta-gap` | 40px | Gap giữa 2 nút CTA |
| `--sp-cta-px` | 24px | Button CTA horizontal padding |
| `--sp-cta-py` | 16px | Button CTA vertical padding |
| `--sp-cta-icon-gap` | 8px | Gap giữa text và icon trong button |
| `--sp-awards-section-gap` | 80px | Gap giữa header và grid giải thưởng |
| `--sp-awards-row-gap` | 80px | Gap giữa 2 hàng thẻ giải (vertical) |
| `--sp-awards-col-gap` | 80px | Gap giữa thẻ trong hàng (horizontal) |
| `--sp-card-gap` | 24px | Gap giữa ảnh và text trong thẻ |
| `--sp-card-text-gap` | 4px | Gap giữa title/desc/link trong thẻ |
| `--sp-card-link-py` | 16px | Padding vertical cho link "Chi tiết" |
| `--sp-content-frame-px` | 104px | Padding horizontal khung content Root Further |
| `--sp-content-frame-py` | 120px | Padding vertical khung content Root Further |
| `--sp-footer-x` | 144px | Footer horizontal padding |
| `--sp-footer-y` | 40px | Footer vertical padding |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-button` | 8px | CTA buttons |
| `--radius-nav` | 4px | Header nav hover, language selector |
| `--radius-countdown` | 8px | Ô số countdown |
| `--radius-card-image` | 24px | Ảnh thẻ giải thưởng |
| `--radius-widget` | 100px | Widget button (pill shape) |
| `--radius-user` | 4px | User profile button |
| `--radius-content-frame` | 8px | Khung content Root Further |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-nav-selected` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Nav text selected glow |
| `--shadow-award-card` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Ảnh thẻ giải thưởng glow |
| `--shadow-widget` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Widget button glow |

---

## 2. Component Style Details

### A1. Header (`2167:9091`)
- **Dimensions:** 1512 x 80px (full-width)
- **Position:** `position: sticky; top: 0` (dính khi cuộn, luôn hiển thị trên cùng)
- **Layout:** `display: flex; flex-direction: row; justify-content: space-between; align-items: center`
- **Padding:** `12px 144px`
- **Background:** `rgba(16,20,23,0.8)`
- **Backdrop-filter:** `blur(10px)` (làm mờ nội dung phía sau khi cuộn)
- **Z-index:** 50 (above all content)

#### A1.1 Logo (`I2167:9091;178:1033`)
- **Container:** 52 x 48px
- **Image:** `object-fit: cover`
- **Click:** Navigate home / scroll to top

#### A1.2 Nav - Selected (`I2167:9091;186:1579`)
- **Padding:** 16px
- **Border-bottom:** `1px solid #FFEA9E`
- **Text:** Montserrat 14px/700, color `#FFEA9E`, letter-spacing 0.1px
- **Text-shadow:** `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`

#### A1.3 Nav - Hover (`I2167:9091;186:1587`)
- **Dimensions:** 173 x 52px
- **Padding:** 16px
- **Border-radius:** 4px
- **Text:** Montserrat 14px/700, color `#FFFFFF`, letter-spacing 0.1px

#### A1.4 Nav - Normal (`I2167:9091;186:1593`)
- **Dimensions:** 117 x 52px
- **Padding:** 16px
- **Border-radius:** 4px
- **Text:** Montserrat 14px/700, color `#FFFFFF`

**Nav Link States:**

| State | Property | Value |
|-------|----------|-------|
| Normal | color | `#FFFFFF` |
| Normal | background | `transparent` |
| Hover | background | `rgba(255,255,255,0.1)` |
| Hover | border-radius | `4px` |
| Selected | color | `#FFEA9E` |
| Selected | border-bottom | `1px solid #FFEA9E` |
| Selected | text-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |

#### A1.5 Notification (`I2167:9091;186:2101`)
- **Button:** 40 x 40px, padding 10px, border-radius 4px
- **Icon:** 24 x 24px (bell icon)
- **Badge:** 8 x 8px, `#D4271D`, border-radius 100px, positioned top-right

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `transparent` |
| Hover | background | `rgba(255,255,255,0.1)` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |
| Has unread | badge | Visible (8x8 `#D4271D`) |
| No unread | badge | Hidden |

#### A1.6 Language Selector (`I2167:9091;186:1696`)
- **Container:** 108 x 56px
- **Padding:** 16px
- **Border-radius:** 4px
- **Layout:** `flex-direction: row; justify-content: space-between; align-items: center; gap: 2px`
- **Content:** Flag (24x24) + Text "VN" (16px/700) + Chevron (24x24)

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `transparent` |
| Hover | background | `rgba(255,255,255,0.1)` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |
| Expanded | chevron transform | `rotate(180deg)` |

#### A1.7 User Profile (`I2167:9091;186:1597`)
- **Dimensions:** 40 x 40px
- **Padding:** 10px
- **Border:** `1px solid #998C5F`
- **Border-radius:** 4px
- **Background:** `transparent`
- **Icon:** 24 x 24px (user silhouette)

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `transparent` |
| Default | border | `1px solid #998C5F` |
| Hover | background | `rgba(255,255,255,0.1)` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |
| Active | background | `rgba(255,255,255,0.15)` |

### Hero Section (`2167:9030`)
- **Dimensions:** 1512 x 4220px (main content container)
- **Layout:** `display: flex; flex-direction: column; align-items: center; gap: 120px`
- **Padding:** `96px 144px`

#### Keyvisual Background (`2167:9027`)
- **Dimensions:** 1512 x 1392px
- **Position:** `position: absolute; top: 0`
- **Content:** Background artwork image, `background: url(...) 50% / cover no-repeat`
- **Z-index:** 1

#### Gradient Cover (`2167:9029`)
- **Dimensions:** 1512 x 1480px
- **Position:** `position: absolute; top: 0`
- **Background:** `linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%)`

#### ROOT FURTHER Logo (`2788:12911`)
- **Dimensions:** 451 x 200px
- **Aspect-ratio:** 115/51
- **Background:** `url(...) 50% / cover no-repeat`

#### B1. Countdown Section (`2167:9035`)
- **Layout:** `flex-direction: column; gap: 16px`

##### B1.2 "Coming soon" (`2167:9036`)
- **Font:** Montserrat 24px/700/32px
- **Color:** `#FFFFFF`

##### B1.3 Countdown (`2167:9037`)
- **Layout:** `flex-direction: row; align-items: center; gap: 40px`

##### Countdown Digit Box (e.g. `2167:9040`)
- **Box:** 51.2 x 81.92px
- **Border:** `0.5px solid #FFEA9E`
- **Opacity:** 0.5
- **Background:** `linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)`
- **Border-radius:** 8px
- **Backdrop-filter:** `blur(16.64px)`
- **Number text:** Digital Numbers 49.15px/400, color `#FFFFFF`

##### Countdown Unit Group (e.g. `2167:9038` Days)
- **Layout:** `flex-direction: column; justify-content: center; gap: 14px`
- **Digits row:** `flex-direction: row; gap: 14px` (2 boxes)
- **Label:** Montserrat 24px/700/32px, color `#FFFFFF`

#### B2. Event Info (`2167:9053`)
- **Layout:** `flex-direction: column; gap: 8px`

##### Row 1 (`2167:9054`)
- **Layout:** `flex-direction: row; gap: 60px`
- **Label:** Montserrat 16px/700/24px, letter-spacing 0.15px, color `#FFFFFF`
- **Value:** Montserrat 24px/700/32px, color `#FFEA9E`

##### Row 2 (`2167:9061`)
- **Text:** Montserrat 16px/700/24px, letter-spacing 0.5px, color `#FFFFFF`

#### B3. CTA Buttons (`2167:9062`)
- **Layout:** `flex-direction: row; gap: 40px`

##### B3.1 ABOUT AWARDS (Primary) (`2167:9063`)
- **Dimensions:** 276 x 60px
- **Padding:** `16px 24px`
- **Border-radius:** 8px
- **Background:** `#FFEA9E`
- **Layout:** `flex-direction: row; align-items: center; gap: 8px`
- **Text:** Montserrat 22px/700/28px, color `#00101A`
- **Icon:** Arrow-up 24x24px

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Hover | background | `#FFE078` |
| Hover | transform | `translateY(-2px)` |
| Hover | box-shadow | `0 4px 12px rgba(255,234,158,0.4)` |
| Focus | outline | `2px solid #FFEA9E` |
| Active | background | `#FFD54F` |

##### B3.2 ABOUT KUDOS (Secondary) (`2167:9064`)
- **Padding:** `16px 24px`
- **Border:** `1px solid #998C5F`
- **Border-radius:** 8px
- **Background:** `rgba(255,234,158,0.10)`
- **Text:** Montserrat 22px/700/28px, color `#FFFFFF`
- **Icon:** Arrow-up 24x24px

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `rgba(255,234,158,0.10)` |
| Default | border | `1px solid #998C5F` |
| Hover | background | `#FFEA9E` |
| Hover | color (text) | `#00101A` |
| Hover | transform | `translateY(-2px)` |
| Focus | outline | `2px solid #FFEA9E` |

### Root Further Content Frame (`3204:10152`)
- **Dimensions:** 1152 x 1219px (text area = 944px wide after padding)
- **Padding:** `120px 104px`
- **Border-radius:** 8px
- **Background:** Semi-transparent dark overlay (estimated `rgba(0,16,26,0.6)` or subtle gradient, matching the dark section visible in design)
- **Layout:** `flex-direction: column; align-items: center; gap: 32px`

#### ROOT FURTHER Text Logo (inside frame)
- **"Root" image:** 189 x 67px
- **"Further" image:** 290 x 67px

#### Content Text (`3204:10156`, `3204:10162`)
- **Width:** 1152px (full container)
- **Font:** Montserrat 24px/700/32px
- **Color:** `#FFFFFF`
- **Text-align:** justified

#### Quote (`3204:10161`)
- **Font:** Montserrat 20px/700/32px
- **Color:** `#FFFFFF`
- **Text-align:** center

### Awards Section (`2167:9068`)
- **Layout:** `flex-direction: column; gap: 80px`

#### C1. Section Header (`2167:9069`)
- **Layout:** `flex-direction: column; gap: 16px`

##### Caption (`2167:9070`)
- **Font:** Montserrat 24px/700/32px, color `#FFFFFF`
- **Content:** "Sun* annual awards 2025"

##### Divider (`2167:9071`)
- **Height:** 1px
- **Background:** `#2E3940`

##### Title Row (`2167:9072`)
- **Layout:** `flex-direction: row; gap: 32px`
- **Title (`2167:9073`):** Montserrat 57px/700/64px, letter-spacing -0.25px, color `#FFEA9E`

#### C2. Award Grid (`5005:14974`)

##### Row 1 (`2167:9074`)
- **Layout:** `flex-direction: row; justify-content: space-between; gap: 80px`
- **3 cards:** Top Talent, Top Project, Top Project Leader

##### Row 2 (`2167:9078`)
- **Layout:** `flex-direction: row; justify-content: space-between; gap: 80px`
- **3 cards:** Best Manager, Signature Creator, MVP

#### Award Card (Component `214:1032`)
- **Dimensions:** 336 x ~504px
- **Layout:** `flex-direction: column; gap: 24px`

##### Card Image (`81:2443`)
- **Dimensions:** 336 x 336px, aspect-ratio 1/1
- **Border:** `0.955px solid #FFEA9E`
- **Border-radius:** 24px
- **Background:** Award image with glow effect
- **Box-shadow:** `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`
- **Mix-blend-mode:** screen

##### Card Text Area
- **Layout:** `flex-direction: column; gap: 4px`
- **Title:** Montserrat 24px/400/32px, color `#FFEA9E`
- **Description:** Montserrat 16px/400/24px, letter-spacing 0.5px, color `#FFFFFF`
  - Max 2 lines, overflow ellipsis: `display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden` (Tailwind: `line-clamp-2`)
- **Link "Chi tiết":** Montserrat 16px/500/24px, letter-spacing 0.15px, color `#FFFFFF`
  - Padding: `16px 0`
  - Icon: Arrow-up 24x24px, gap 4px
  - Hover: color `#FFEA9E`, text-decoration underline
  - Focus: outline `2px solid #FFEA9E`, outline-offset 2px

**Card States:**

| State | Property | Value |
|-------|----------|-------|
| Default | transform | `none` |
| Hover | transform | `translateY(-4px)` |
| Hover | box-shadow (image) | Enhanced glow |
| Focus | outline | `2px solid #FFEA9E` |

### D1. Sun* Kudos Section (`3390:10349`)
- **Dimensions:** Full-width (1224px content area)
- **Layout:** `display: flex; flex-direction: row; align-items: center`
- **Background:** Dark card/container (darker than page bg, estimated `rgba(0,12,20,0.8)`)
- **Border:** `1px solid #2E3940` (visible container border matching divider color)
- **Border-radius:** 8px (matching content frame pattern)
- **Padding:** ~40px (estimated from visual)

#### D2. Content Block (`I3390:10349;313:8419`)
- **Layout:** 2-column: text content (left ~60%) + illustration (right ~40%)

##### Left Column (Text Content)
- **Label:** "Phong trào ghi nhận"
  - Font: Montserrat 16px/700/24px, color `#FFFFFF`
- **Title:** "Sun* Kudos"
  - Font: Montserrat ~40px/700/48px, color `#FFFFFF` (large heading, bold)
- **Subtitle:** "ĐIỂM MỚI CỦA SAA 2025"
  - Font: Montserrat ~14px/700/20px, color `#FFEA9E`, text-transform uppercase
- **Description:** Đoạn mô tả tóm tắt về chiến dịch Kudos
  - Font: Montserrat 16px/400/24px, color `#FFFFFF`
- **Button "Chi tiết"** (`I3390:10349;313:8426`):
  - Style: Outlined button (tương tự B3.2 secondary)
  - Border: `1px solid #998C5F`
  - Border-radius: 8px
  - Background: `rgba(255,234,158,0.10)`
  - Padding: `12px 24px`
  - Text: Montserrat 16px/700/24px, color `#FFFFFF`
  - Icon: Arrow-up-right 24x24px

  **States:**

  | State | Property | Value |
  |-------|----------|-------|
  | Default | background | `rgba(255,234,158,0.10)` |
  | Hover | background | `#FFEA9E` |
  | Hover | color (text) | `#00101A` |
  | Focus | outline | `2px solid #FFEA9E` |

##### Right Column (Illustration)
- **Content:** "KUDOS" stylized text/graphic
- **Dimensions:** ~40% width of container
- **Image:** WebP/SVG, decorative

### Widget Button (`5022:15169`)
- **Position:** `position: fixed; bottom: 32px; right: 19px` (cố định mép phải dưới màn hình, luôn hiển thị khi cuộn)
- **Box-shadow:** `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`
- **Z-index:** 60 (above footer)

#### Inner Button (`I5022:15169;214:3839`)
- **Dimensions:** 106 x 64px
- **Padding:** 16px
- **Border-radius:** 100px (pill)
- **Background:** `#FFEA9E`
- **Layout:** `flex-direction: row; align-items: center; gap: 8px`
- **Content:** Pen icon (24x24) + "/" (Montserrat 24px/700, `#00101A`) + SAA icon (24x24)

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Hover | background | `#FFE078` |
| Hover | transform | `scale(1.05)` |
| Focus | outline | `2px solid #FFEA9E` |
| Active | background | `#FFD54F` |

### Footer (`5001:14800`)
- **Dimensions:** 1512 x auto
- **Position:** Bottom of page
- **Padding:** `40px 144px`
- **Layout:** `display: flex; justify-content: space-between; align-items: center`
- **Border-top:** `1px solid #2E3940`

#### Footer Logo (`I5001:14800;342:1408`)
- **Dimensions:** 69 x 64px
- **Click:** Navigate to homepage / scroll to top

#### Footer Links
- **Text:** Montserrat Alternates 14px/400/20px, letter-spacing 0.1px, color `#FFFFFF`
- **Links:** "About SAA 2025", "Award Information", "Sun* Kudos", "Tiêu chuẩn chung"

**Link States:**

| State | Property | Value |
|-------|----------|-------|
| Default | color | `#FFFFFF` |
| Hover | color | `#FFEA9E` |
| Hover | text-decoration | `underline` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |

#### Copyright
- **Text:** "Bản quyền thuộc về Sun* © 2025"
- **Font:** Montserrat Alternates 14px/400/20px, color `#FFFFFF`

---

## 3. Z-Index Layering

| Layer | Z-Index | Component | Node ID |
|-------|---------|-----------|---------|
| 1 (bottom) | 0 | Background Image | `2167:9027` |
| 2 | 1 | Gradient Cover | `2167:9029` |
| 3 | 10 | Main Content | `2167:9030` |
| 4 | 50 | Header | `2167:9091` |
| 5 | 50 | Footer | `5001:14800` |
| 6 | 60 | Widget Button | `5022:15169` |

---

## 4. Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────┐ 1512 x 4480
│ ▓▓▓▓▓▓ [BG] Background Image 1512x1392 (absolute) ▓▓▓▓▓ │
│ ░░░░░░ [Cover] Gradient 1512x1480 (absolute) ░░░░░░░░░░ │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ [A1] HEADER  1512x80  bg:rgba(16,20,23,0.8)         │  │
│ │ px:144  py:12                                        │  │
│ │                                                      │  │
│ │ [Logo] [About SAA*] [Awards] [Kudos]  [🔔][VN▼][👤] │  │
│ │ 52x48   selected     hover    normal                 │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ MAIN CONTENT  px:144  py:96  gap:120px               │  │
│ │                                                      │  │
│ │   ┌────────────────────────┐                         │  │
│ │   │ ROOT FURTHER           │ 451x200 (image)         │  │
│ │   └────────────────────────┘                         │  │
│ │            ↕ 40px                                    │  │
│ │   ┌──────────────────────────────┐                   │  │
│ │   │ [B1.2] Coming soon           │ 24px/700          │  │
│ │   │                              │                   │  │
│ │   │ ┌──┐┌──┐  ┌──┐┌──┐  ┌──┐┌──┐│                   │  │
│ │   │ │20││20│  │20││20│  │20││20│ │ 51x82 each        │  │
│ │   │ └──┘└──┘  └──┘└──┘  └──┘└──┘│ gap:14 / 40       │  │
│ │   │  DAYS      HOURS    MINUTES  │                   │  │
│ │   └──────────────────────────────┘                   │  │
│ │            ↕ 16px                                    │  │
│ │   ┌──────────────────────────────────┐               │  │
│ │   │ [B2] Thời gian: 26/12/2025      │               │  │
│ │   │      Địa điểm: Âu Cơ Art Center │               │  │
│ │   │ Tường thuật trực tiếp qua sóng   │               │  │
│ │   └──────────────────────────────────┘               │  │
│ │            ↕ (within hero frame)                     │  │
│ │   ┌────────────────┐ ┌────────────────┐              │  │
│ │   │ ABOUT AWARDS ↗ │ │ ABOUT KUDOS ↗  │  gap:40      │  │
│ │   │ bg:#FFEA9E r:8 │ │ border:#998C5F │              │  │
│ │   └────────────────┘ └────────────────┘              │  │
│ │                                                      │  │
│ │            ↕ 120px section gap                       │  │
│ │                                                      │  │
│ │   ┌──────────────────────────────────────────┐       │  │
│ │   │ [Content Frame] px:104 py:120 r:8        │       │  │
│ │   │                                          │       │  │
│ │   │  ROOT FURTHER (small logos)              │       │  │
│ │   │  ↕ 32px                                  │       │  │
│ │   │  Long description text...                │       │  │
│ │   │  "A tree with deep roots..." (centered)  │       │  │
│ │   │  More description text...                │       │  │
│ │   └──────────────────────────────────────────┘       │  │
│ │                                                      │  │
│ │            ↕ 120px section gap                       │  │
│ │                                                      │  │
│ │   ┌──────────────────────────────────────────┐       │  │
│ │   │ [C1] Sun* annual awards 2025    24px     │       │  │
│ │   │ ─────────────────────────── (divider)    │       │  │
│ │   │ Hệ thống giải thưởng          57px gold │       │  │
│ │   └──────────────────────────────────────────┘       │  │
│ │            ↕ 80px                                    │  │
│ │   ┌──────────────────────────────────────────┐       │  │
│ │   │ [C2] Award Grid  3 cols  gap:80px        │       │  │
│ │   │                                          │       │  │
│ │   │ ┌──────┐  ┌──────┐  ┌──────┐            │       │  │
│ │   │ │ 336  │  │ 336  │  │ 336  │  336x336   │       │  │
│ │   │ │ img  │  │ img  │  │ img  │  r:24      │       │  │
│ │   │ ├──────┤  ├──────┤  ├──────┤            │       │  │
│ │   │ │Top   │  │Top   │  │Top PL│            │       │  │
│ │   │ │Talent│  │Proj. │  │Leader│            │       │  │
│ │   │ │desc  │  │desc  │  │desc  │            │       │  │
│ │   │ │Chi ↗ │  │Chi ↗ │  │Chi ↗ │            │       │  │
│ │   │ └──────┘  └──────┘  └──────┘            │       │  │
│ │   │      ↕ 80px row gap                     │       │  │
│ │   │ ┌──────┐  ┌──────┐  ┌──────┐            │       │  │
│ │   │ │Best  │  │Signa-│  │ MVP  │            │       │  │
│ │   │ │Mngr  │  │ture  │  │      │            │       │  │
│ │   │ └──────┘  └──────┘  └──────┘            │       │  │
│ │   └──────────────────────────────────────────┘       │  │
│ │                                                      │  │
│ │            ↕ 120px section gap                       │  │
│ │                                                      │  │
│ │   ┌──────────────────────────────────────────┐       │  │
│ │   │ [D1] Sun* Kudos Section                  │       │  │
│ │   │ "Phong trào ghi nhận"                    │       │  │
│ │   │ Sun* Kudos (title)          [Illustration]│      │  │
│ │   │ Description...              [  KUDOS img ]│      │  │
│ │   │ [Chi tiết ↗]                             │       │  │
│ │   └──────────────────────────────────────────┘       │  │
│ │                                                      │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ [7] FOOTER  px:144 py:40  border-top:1px #2E3940    │  │
│ │                                                      │  │
│ │ [Logo]  [About] [Awards] [Kudos] [Tiêu chuẩn]  ©   │  │
│ │ 69x64                                               │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                          │
│                              ┌───────────┐               │
│                              │ [6] Widget│ fixed         │
│                              │ ✏️ / 🏆   │ 106x64 r:100 │
│                              │ bg:#FFEA9E│               │
│                              └───────────┘               │
└──────────────────────────────────────────────────────────┘
```

---

## 5. Implementation Mapping

| Figma Node ID | React Component | File Path (Constitution P3) | Key Tailwind Classes |
|---------------|-----------------|----------------------------|----------------------|
| `2167:9026` | `HomepageSAA` | `src/app/(main)/page.tsx` | `relative w-full min-h-screen bg-[#00101A] overflow-hidden` |
| `2167:9091` | `MainHeader` | `src/components/header/main-header.tsx` | `sticky top-0 w-full h-20 flex items-center justify-between px-6 md:px-20 xl:px-36 bg-[rgba(16,20,23,0.8)] backdrop-blur-[10px] z-50` |
| `I2167:9091;178:1033` | Logo (inside Header) | — | `w-[52px] h-12` |
| `I2167:9091;186:1579` | `NavLink` (active) | `src/components/header/nav-link.tsx` | `text-sm font-bold text-[#FFEA9E] border-b border-[#FFEA9E] px-4 py-4` |
| `I2167:9091;186:1696` | `LanguageSelector` (`"use client"`) | `src/components/header/language-selector.tsx` | `flex items-center rounded px-4 py-4 hover:bg-white/10` |
| `I2167:9091;186:2101` | `NotificationBell` (`"use client"`) | `src/components/header/notification-bell.tsx` | `relative w-10 h-10 flex items-center justify-center rounded` |
| `I2167:9091;186:1597` | `UserMenu` (`"use client"`) | `src/components/header/user-menu.tsx` | `w-10 h-10 flex items-center justify-center rounded border border-[#998C5F]` |
| `2167:9027` | Background (img) | — | `absolute inset-0 w-full h-[1392px] object-cover` |
| `2167:9029` | Gradient Cover (div) | — | `absolute inset-0 z-[1] [background:linear-gradient(12deg,...)]` |
| `2167:9035` | `Countdown` (`"use client"`) | `src/components/homepage/countdown.tsx` | `flex flex-col gap-4` |
| `2167:9037` | CountdownDigits | — | `flex items-center gap-10` |
| `2167:9053` | `EventInfo` | `src/components/homepage/event-info.tsx` | `flex flex-col gap-2` |
| `2167:9062` | `HeroCTA` | `src/components/homepage/hero-cta.tsx` | `flex gap-10` |
| `2167:9063` | CTA Primary (a/Link) | — | `flex items-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg font-montserrat text-[22px] font-bold text-[#00101A]` |
| `2167:9064` | CTA Secondary (a/Link) | — | `flex items-center gap-2 px-6 py-4 border border-[#998C5F] bg-[#FFEA9E]/10 rounded-lg font-montserrat text-[22px] font-bold text-white` |
| `3204:10152` | `RootFurtherContent` | `src/components/homepage/root-further-content.tsx` | `rounded-lg px-[104px] py-[120px] flex flex-col items-center gap-8` |
| `2167:9068` | `AwardsSection` | `src/components/homepage/awards-section.tsx` | `flex flex-col gap-20` |
| `2167:9069` | `AwardsSectionHeader` | — | `flex flex-col gap-4` |
| `5005:14974` | `AwardGrid` | — | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20` |
| `2167:9075` | `AwardCard` (reusable) | `src/components/homepage/award-card.tsx` | `flex flex-col gap-6` |
| `I2167:9075;214:1019` | AwardCardImage | — | `w-[336px] h-[336px] rounded-3xl border border-[#FFEA9E] shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` |
| `3390:10349` | `SunKudosSection` | `src/components/homepage/sun-kudos-section.tsx` | `flex items-center gap-8 rounded-lg border border-[#2E3940] bg-[rgba(0,12,20,0.8)] p-10` |
| `5022:15169` | `WidgetButton` (`"use client"`) | `src/components/widget-button.tsx` | `fixed bottom-8 right-5 z-[60]` |
| `5001:14800` | `MainFooter` | `src/components/footer/main-footer.tsx` | `w-full flex items-center justify-between px-6 xl:px-36 py-10 border-t border-[#2E3940]` |

---

## 6. Responsive Breakpoints (Constitution P4: Mobile-first)

### Mobile (default, < 768px)
- Header: `px-6`, hamburger menu (collapse nav links)
- Hero: `px-6 pt-32`, ROOT FURTHER logo ~280px wide
- Countdown: Smaller digit boxes (~40x65px), gap reduced
- Event info: Stack vertical
- CTA buttons: Full-width, stack vertical, gap 16px
- Content text: 16px/24px
- Awards: Grid 1 column, card width 100%
- Sun* Kudos: Stack vertical
- Footer: `px-6 py-6`, stack vertical, text 12px
- Widget: Smaller (80x48px)

### Tablet (md: 768px)
- Header: `px-20`, full nav visible
- Hero: `px-20`, logo ~360px
- Countdown: Medium size
- CTA buttons: Side-by-side
- Awards: Grid 2 columns, gap 40px
- Footer: `px-20`

### Desktop (lg: 1024px)
- Awards: Grid 3 columns
- Padding increases

### Large Desktop (xl: 1440px — near Figma design)
- Pixel-perfect match with Figma values
- `px-36` (~144px)

---

## 7. Assets Required

| Asset | Figma Node | Format | Responsive Sizes |
|-------|-----------|--------|------------------|
| Logo SAA 2025 | `I2167:9091;178:1033;178:1030` | SVG | 40x44 / 52x48 |
| ROOT FURTHER logo (large) | `2788:12911` | SVG or WebP | 280w / 360w / 451w |
| ROOT FURTHER logo (small, content) | `3204:10153` | SVG or WebP | 189x67 + 290x67 |
| Background artwork | `2167:9028` | WebP | 768w / 1024w / 1512w / 3024w (2x) |
| Award card images (x6) | `I2167:9075;214:1019;81:2442` etc. | WebP | 336x336 |
| Award name badges (x6) | `I2167:9075;214:1019;214:666` etc. | SVG or WebP | Various |
| Sun* Kudos illustration | (inside `3390:10349`) | WebP | Responsive |
| Icon: Bell/Notification | `I2167:9091;186:2101;186:2020;186:1420` | SVG | 24x24 |
| Icon: VN Flag | `I2167:9091;186:1696;186:1821;186:1709` | SVG | 20x15 |
| Icon: Chevron down | `I2167:9091;186:1696;186:1821;186:1441` | SVG | 24x24 |
| Icon: Arrow up-right | `I2167:9063;186:1766` | SVG | 24x24 |
| Icon: User profile | `I2167:9091;186:1597;186:1420` | SVG | 24x24 |
| Icon: Pen (widget) | `I5022:15169;214:3839;186:1763` | SVG | 24x24 |
| Icon: SAA (widget) | `I5022:15169;214:3839;186:1766` | SVG | 24x24 |
| Font: Montserrat | Google Fonts | WOFF2 | 400, 500, 700 |
| Font: Montserrat Alternates | Google Fonts | WOFF2 | 400, 700 |
| Font: Digital Numbers | Custom | WOFF2 | 400 |

> **Note:** All images MUST use `next/image` with `sizes` prop
> and Cloudflare Images binding for optimization (Constitution P6).
