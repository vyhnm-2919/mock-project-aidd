# Sun* Kudos - Live Board — Design Style Document

**Frame ID:** `2940:13431`
**Frame Name:** Sun* Kudos - Live board
**Dimensions:** 1440 x 5862px
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#00101A` | Page background `rgba(0,16,26,1)` |
| `--color-bg-container` | `#00070C` | Sidebar stats, Sunner list card background |
| `--color-bg-header` | `rgba(16,20,23,0.80)` | Header semi-transparent |
| `--color-bg-card` | `#FFF8E1` | Kudo post card background `rgba(255,248,225,1)` |
| `--color-bg-content-box` | `rgba(255,234,158,0.40)` | Content text box inside cards |
| `--color-bg-button-primary` | `#FFEA9E` | Primary button (Mở quà) |
| `--color-bg-button-secondary` | `rgba(255,234,158,0.10)` | Secondary button, filter buttons |
| `--color-bg-button-hover` | `rgba(255,234,158,0.40)` | Button hover state |
| `--color-bg-badge` | `#FFF3C6` | Badge background `rgba(255,243,198,1)` |
| `--color-text-primary` | `#FFFFFF` | Text on dark background |
| `--color-text-accent` | `#FFEA9E` | Gold accent text (titles, stat numbers, names in sidebar) |
| `--color-text-dark` | `#00101A` | Text on light cards `rgba(0,16,26,1)` |
| `--color-text-secondary` | `#999999` | Secondary text (timestamps, pagination) |
| `--color-text-hashtag` | `rgba(212,39,29,1)` | Hashtag text (red) |
| `--color-text-highlight-name` | `rgba(241,118,118,1)` | Highlighted name (coral) |
| `--color-border-primary` | `#998C5F` | Secondary buttons, stat container, spotlight border |
| `--color-border-accent` | `#FFEA9E` | Highlight card, content box, active elements |
| `--color-border-divider` | `#2E3940` | Section dividers, footer border `rgba(46,57,64,1)` |
| `--color-notification` | `rgba(212,39,29,1)` | Notification badge dot |
| `--color-dot-separator` | `rgba(153,153,153,0.4)` | Dot separator in user info |
| `--color-heart-active` | `rgba(212,39,29,1)` | Heart icon filled (red) |
| `--color-heart-inactive` | `#999999` | Heart icon outline (gray) |

### Gradients

| Token | Value | Usage |
|-------|-------|-------|
| `--gradient-hero-cover` | `linear-gradient(25deg, #00101A 14.74%, rgba(0,19,32,0) 47.8%)` | Keyvisual overlay |
| `--gradient-carousel-left` | `linear-gradient(90deg, #00101A 50%, rgba(255,255,255,0) 100%)` | Left fade on carousel |
| `--gradient-carousel-right` | `linear-gradient(270deg, #00101A 50%, rgba(255,255,255,0) 100%)` | Right fade on carousel |
| `--gradient-spotlight-overlay` | `linear-gradient(0deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.70) 100%)` | Spotlight image overlay |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-section-title` | Montserrat | 57px | 700 | 64px | -0.25px | `#FFEA9E` | "HIGHLIGHT KUDOS", "SPOTLIGHT BOARD", "ALL KUDOS" |
| `--text-section-subtitle` | Montserrat | 24px | 700 | 32px | 0px | `#FFFFFF` | "Sun* Annual Awards 2025" |
| `--text-hero-tagline` | Montserrat | 36px | 700 | 44px | 0px | `#FFEA9E` | "Hệ thống ghi nhận và cảm ơn" |
| `--text-spotlight-count` | Montserrat | 36px | 700 | 44px | 0px | `#FFFFFF` | "388 KUDOS" |
| `--text-stat-number` | Montserrat | 32px | 700 | 40px | 0px | `#FFEA9E` | Stat numbers (25, etc.) |
| `--text-stat-label` | Montserrat | 22px | 700 | 28px | 0px | `#FFFFFF` | Stat labels |
| `--text-pagination` | Montserrat | 28px | 700 | 36px | — | `#999` | "2/5" |
| `--text-heart-count` | Montserrat | 24px | 700 | 32px | 0px | `#00101A` | "1,000" |
| `--text-body-content` | Montserrat | 20px | 700 | 32px | 0px | `#00101A` | Kudo content text |
| `--text-button` | Montserrat | 22px | 700 | 28px | 0px | `#00101A` | "Mở Secret Box" |
| `--text-body` | Montserrat | 16px | 700 | 24px | 0.15px | Various | Nav links, names, buttons |
| `--text-timestamp` | Montserrat | 16px | 700 | 24px | 0.5px | `#999` | "10:00 - 10/30/2025" |
| `--text-hashtag` | Montserrat | 16px | 700 | 24px | 0.5px | `rgba(212,39,29,1)` | "#Dedicated #Inspiring..." |
| `--text-hashtag-category` | Montserrat | 16px | 700 | 24px | 0.5px | `#00101A` | "IDOL GIỚI TRẺ" |
| `--text-small` | Montserrat | 14px | 700 | 20px | 0.1px | Various | Badge text, department |
| `--text-nav` | Montserrat | 14px | 700 | 20px | 0.1px | `#FFFFFF` | Header nav links |
| `--text-nav-active` | Montserrat | 14px | 700 | 20px | 0.1px | `#FFEA9E` | Active nav link (+ text-shadow) |
| `--text-sidebar-name` | Montserrat | 22px | 700 | 28px | 0px | `#FFEA9E` | Sunner name in sidebar |
| `--text-sidebar-desc` | Montserrat | 16px | 700 | 24px | — | `#FFFFFF` | Gift description in sidebar |
| `--text-footer-nav` | Montserrat | 16px | 700 | 24px | 0.15px | `#FFFFFF` | Footer nav links |
| `--text-footer-copyright` | Montserrat Alternates | 16px | 700 | 24px | 0% | `#FFFFFF` | Footer copyright text |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-page-x` | 144px | Page horizontal padding (xl) |
| `--sp-page-y-top` | 96px | Page top padding |
| `--sp-page-y-bottom` | 120px | Page bottom padding |
| `--sp-section-gap` | 120px | Gap between major sections |
| `--sp-header-x` | 144px | Header horizontal padding |
| `--sp-header-y` | 12px | Header vertical padding |
| `--sp-card-padding` | `40px 40px 16px 40px` | Kudo post card padding |
| `--sp-card-inner-gap` | 16px | Gap between card sections |
| `--sp-highlight-card-padding` | `24px 24px 16px 24px` | Highlight kudo card padding |
| `--sp-stats-padding` | 24px | Stats container padding |
| `--sp-stats-gap` | 16px | Gap between stat rows |
| `--sp-sidebar-gap` | 24px | Gap between sidebar cards |
| `--sp-feed-gap` | 24px | Gap between kudo post cards |
| `--sp-columns-gap` | 80px | Gap between left column and right sidebar |
| `--sp-filter-gap` | 8px | Gap between filter buttons |
| `--sp-carousel-card-gap` | 24px | Gap between carousel cards |
| `--sp-section-header-gap` | 40px | Gap between section header and content |
| `--sp-user-info-gap` | 13px | Gap between avatar and text info |
| `--sp-footer-x` | 90px | Footer horizontal padding |
| `--sp-footer-y` | 40px | Footer vertical padding |
| `--sp-footer-nav-gap` | 48px | Gap between footer nav items |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-nav` | 4px | Nav buttons, filter buttons, image thumbnails |
| `--radius-button` | 8px | "Mở quà" button, scrollbar |
| `--radius-content-box` | 12px | Content text box inside cards |
| `--radius-highlight-card` | 16px | Highlight kudo card |
| `--radius-stats-container` | 17px | Stats container, Sunner list |
| `--radius-image-container` | 18px | Image thumbnail container |
| `--radius-post-card` | 24px | Kudo post card |
| `--radius-spotlight` | 47.14px | Spotlight board |
| `--radius-hero-badge` | 48px | Hero badge pill |
| `--radius-avatar` | 64px | Avatar (circle) |
| `--radius-action-button` | 68px | Hero action buttons (pill shape) |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-nav-active` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Active nav link text glow |
| `--shadow-badge-legend` | `0 0 1.3px #FFF` | Legend Hero badge text glow |
| `--shadow-badge-rising` | `0 0.386px 1.543px #000` | Rising Hero badge text shadow |

---

## 2. Component Style Details

### A. Header (`2940:13431` top bar)
- **Dimensions:** 1440 x 80px (full-width)
- **Position:** `position: sticky; top: 0`
- **Layout:** `display: flex; flex-direction: row; justify-content: space-between; align-items: center`
- **Padding:** `12px 144px`
- **Background:** `rgba(16,20,23,0.80)`
- **Backdrop-filter:** `blur(10px)`
- **Z-index:** 50

*(Shared component — same as Homepage. See `.momorph/specs/2167-9026-Homepage-SAA/design-style.md`)*

### A. KV Kudos Hero Banner (`2940:13437`)
- **Dimensions:** 1440 x 512px
- **Background:** Full-width keyvisual image, `background: url(...) 50% / cover no-repeat`
- **Cover overlay:** 1440 x 957px, `linear-gradient(25deg, #00101A 14.74%, rgba(0,19,32,0) 47.8%)`
- **Tagline:** Montserrat 36px/700/44px, color `#FFEA9E`
- **Logo:** 593 x 104px (KUDOS logo image)

### A.1 Action Buttons Row (Ghi nhận + Search)
- **Layout:** `flex-direction: row`, centered
- **Button style:** Pill shape
- **Height:** 72px
- **Background:** `rgba(255,234,158,0.10)`
- **Border:** `1px solid #998C5F`
- **Border-radius:** 68px
- **Padding:** `24px 16px`
- **Inner gap:** 16px (icon + text)
- **Text:** Montserrat 16px/700/24px, letter-spacing 0.15px, `#FFFFFF`
- **Placeholder:** "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?"

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `rgba(255,234,158,0.10)` |
| Hover | background | `rgba(255,234,158,0.40)` |
| Focus | outline | `2px solid #FFEA9E` |

### B.1 Section Header (Highlight, Spotlight, All Kudos)
- **Container padding:** `0px 144px` (horizontal)
- **Content width:** 1152px
- **Layout:** `flex-direction: column; gap: 16px`

#### Subtitle (`B.1 subtitle`)
- **Font:** Montserrat 24px/700/32px, color `#FFFFFF`
- **Content:** "Sun* Annual Awards 2025"

#### Divider
- **Height:** 1px
- **Background:** `#2E3940`

#### Title Row
- **Layout:** `flex-direction: row; justify-content: space-between; align-items: center`
- **Title:** Montserrat 57px/700/64px, letter-spacing -0.25px, color `#FFEA9E`
- **Filter buttons:** flex row, gap 8px

### B.1.1 / B.1.2 Filter Dropdown Buttons
- **Background:** `rgba(255,234,158,0.10)`
- **Border:** `1px solid #998C5F`
- **Border-radius:** 4px
- **Padding:** 16px
- **Gap:** 8px (text + chevron icon)
- **Text:** Montserrat 16px/700/24px, letter-spacing 0.15px, `#FFFFFF`
- **Chevron:** 24x24px icon

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `rgba(255,234,158,0.10)` |
| Hover | background | `rgba(255,234,158,0.40)` |
| Expanded | chevron transform | `rotate(180deg)` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |

### B.3 Highlight KUDO Card (`2940:13465`)
- **Dimensions:** 528px wide
- **Background:** `#FFF8E1`
- **Border:** `4px solid #FFEA9E`
- **Border-radius:** 16px
- **Padding:** `24px 24px 16px 24px`
- **Gap:** 16px between sections

#### User Info Row
- **Layout:** `flex-direction: row; justify-content: space-between; gap: 24px`
- **Height:** ~123px

#### User Block (Sender/Receiver)
- **Width:** 235px
- **Layout:** `flex-direction: column; align-items: center; gap: 13px`
- **Avatar:** 64x64px, border-radius: 64px (circle), border: `1.869px solid #FFF`, object-fit: cover
- **Name:** Montserrat 16px/700/24px, letter-spacing 0.15px, color `#00101A`
- **Department:** Montserrat 14px/700/20px, letter-spacing 0.1px, color `#999`
- **Hero Badge Pill:** height 19px, width ~109px, border-radius 48px, border: `0.5px solid #FFEA9E`, bg: `linear-gradient(0deg, rgba(9,36,50,0.50) 0%, rgba(9,36,50,0.50) 100%)`
- **Badge text:** ~11.4px/700 Montserrat, white
- **Badge variants:**

| Badge | Text Shadow | Background |
|-------|-------------|------------|
| Legend Hero | `0 0 1.3px #FFF` (white glow) | gradient overlay |
| Rising Hero | `0 0.386px 1.543px #000` (dark shadow) | gradient overlay |
| New Hero | `0 0.386px 1.543px #000` (dark shadow) | gradient overlay |

- **Dot separator:** 4x4px circle, `#999`, opacity 0.4

#### Send Arrow Icon
- **Dimensions:** 32x32px
- **Position:** Between sender and receiver blocks

#### Content Box
- **Background:** `rgba(255,234,158,0.40)`
- **Border:** `1px solid #FFEA9E`
- **Border-radius:** 12px
- **Padding:** `16px 24px`
- **Text:** Montserrat 20px/700/32px, color `#00101A`, text-align: justified
- **Max lines:** 3, overflow with ellipsis

#### Timestamp
- **Font:** Montserrat 16px/700/24px, letter-spacing 0.5px, color `#999`
- **Format:** "HH:mm - MM/DD/YYYY"

#### Hashtag Category (clickable filter)
- **Font:** Montserrat 16px/700/24px, letter-spacing 0.5px, color `#00101A`, text-align: center
- **Icon:** Pen icon 24x24px bên phải (trang trí, thể hiện đây là tag)
- **Cursor:** pointer
- **Click:** Lọc danh sách kudos theo category này

#### Hashtags
- **Font:** Montserrat 16px/700/24px, letter-spacing 0.5px, color `rgba(212,39,29,1)` (red)

#### Action Footer
- **Layout:** `flex-direction: row; justify-content: space-between; align-items: center`
- **Heart count:** Montserrat 24px/700/32px, color `#00101A`, format: Vietnamese locale (1.000)
- **Heart icon:** 32x32px
- **Copy Link button:** border-radius 4px, padding 16px, gap 4px, Montserrat 16px/700/24px, letter-spacing 0.15px, color `#00101A`
- **"Xem chi tiết" button:** Same style as Copy Link, with arrow-up-right icon 24x24px

**Heart Icon States:**

| State | Property | Value |
|-------|----------|-------|
| Inactive (chưa tim) | color | `#999` (gray outline) |
| Active (đã tim) | color | `rgba(212,39,29,1)` (red filled) |
| Hover | transform | `scale(1.1)` |

**Copy Link / Xem chi tiết States:**

| State | Property | Value |
|-------|----------|-------|
| Default | color | `#00101A` |
| Hover | color | `#FFEA9E` |
| Hover | text-decoration | `underline` |
| Focus | outline | `2px solid #FFEA9E` |

### Carousel Navigation
- **Container:** 400px wide, gradient fade overlay
- **Arrow button:** 80x80px, transparent bg, border-radius 4px, padding 10px
- **Arrow icon:** 60x60px

### B.5 Pagination
- **Layout:** `flex-direction: row; align-items: center; gap: 32px; justify-content: center`
- **Padding:** `0px 144px`
- **Arrow buttons:** 48x48px, transparent bg, border-radius 4px
- **Page text:** Montserrat 28px/700/36px, color `#999`
- **Active page:** color `#FFFFFF`

### B.7 Spotlight Board (`2940:14174`)
- **Dimensions:** 1157 x 548px
- **Border:** `1px solid #998C5F`
- **Border-radius:** 47.14px
- **Background:** Multiple image layers with blend-mode: screen
- **Title count:** Montserrat 36px/700/44px, white
- **Name labels:** Various sizes (6.66px-11.34px), 700 weight, white, letter-spacing 0.208px
- **Search button:** border-radius 46.4px, border: `0.682px solid #998C5F`, bg: `rgba(255,234,158,0.10)`, padding: `16.38px 10.92px`
- **Search text:** Montserrat ~10.92px/500, white

### C.3 Kudo Post Card (All Kudos feed)
- **Dimensions:** 680px wide, ~749px height
- **Background:** `#FFF8E1`
- **Border-radius:** 24px
- **Padding:** `40px 40px 16px 40px`
- **Gap:** 16px between internal sections
- **Content width:** 600px

#### User Info Row
- **Layout:** `flex-direction: row; justify-content: space-between; gap: 24px`
- **Each user block:** 235px wide, `flex-direction: column; align-items: center; gap: 13px`
- **Avatar:** 64x64px, border-radius: 64px, border: `1.869px solid #FFF`
- **Name:** Montserrat 16px/700/24px, letter-spacing 0.15px, color `#00101A`
- **Department:** Montserrat 14px/700/20px, color `#999`, letter-spacing 0.1px
- **Hero Badge:** Same as highlight card

#### Content Box
- Same as highlight card, but **max lines: 5** with ellipsis

#### Image Attachments
- **Container:** border-radius 18px, border: `1px solid #998C5F`, bg: `#FFF`, 88x88px
- **Image:** border-radius 4px, border: `1px solid #FFEA9E`, 88x88px, object-fit: cover
- **Row gap:** 16px
- **Max images:** 5

#### Divider (inside card)
- 1px, `#FFEA9E` (gold)

#### Hashtag Category (clickable filter)
- Tương tự highlight card (pen icon trang trí + click để lọc)

#### Action Footer
- Same as highlight card (heart + Copy Link), without "Xem chi tiết" button

### D.1 Stats Container (`2940:13489`)
- **Background:** `#00070C`
- **Border:** `1px solid #998C5F`
- **Border-radius:** 17px
- **Padding:** 24px
- **Gap:** 16px between stat items
- **Width:** 374px (inner content)

#### Stat Row
- **Layout:** `flex-direction: row; justify-content: space-between; gap: 8px`
- **Label:** Montserrat 22px/700/28px, white, text-align: right
- **Number:** Montserrat 32px/700/40px, `#FFEA9E`, text-align: right

#### 🔥x2 Decorative Icon (on "Số tim bạn nhận được" row)
- **Fire emoji:** 🔥 inline, positioned after label text
- **x2 badge:** Montserrat 17.54px/700, color white, stroke: `1.04px #000`
- **Position:** Overlapping fire emoji, top-right
- **Luôn hiển thị** — chỉ là trang trí, không có logic bật/tắt

#### Stat Divider
- 1px, `#2E3940`

#### "Mở Secret Box" Button (`2940:13497`)
- **Background:** `#FFEA9E`
- **Border-radius:** 8px
- **Height:** 60px, **Width:** 374px
- **Padding:** 16px
- **Gap:** 4px (text + gift icon)
- **Text:** Montserrat 22px/700/28px, color `#00101A`

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Hover | background | `#FFE078` |
| Hover | transform | `translateY(-2px)` |
| Focus | outline | `2px solid #FFEA9E` |
| Active | background | `#FFD54F` |

### D.3 Top Sunner Recipients List (`2940:13510`)
- **Background:** `#00070C`
- **Border:** `1px solid #998C5F`
- **Border-radius:** 17px
- **Padding:** `24px 16px 24px 24px`
- **Title:** Montserrat 22px/700/28px, `#FFEA9E`, text-align: center
- **List gap:** 8px between items

#### List Item
- **Layout:** `flex-direction: row; gap: 8px; height: 64px; align-items: center`
- **Avatar:** 64x64px, circle, border: `1.869px solid #FFF`
- **Name:** Montserrat 22px/700/28px, `#FFEA9E`, text-align: left
- **Description:** Montserrat 16px/700/24px, white

#### Scrollbar
- **Width:** 2px
- **Color:** `#999`
- **Border-radius:** 8px

### Footer (Shared Component — `MainFooter`)
- **Layout:** `flex-direction: row; justify-content: space-between; align-items: center`
- **Border-top:** `1px solid #2E3940`
- **Padding:** `40px 90px`
- **Width:** 1440px
- **Logo:** 69 x 64px
- **Nav gap:** 48px
- **Active link bg:** `rgba(255,234,158,0.10)`, text with gold glow shadow
- **Nav links:** Montserrat 16px/700/24px, letter-spacing 0.15px, white
- **Copyright:** Montserrat Alternates 16px/700/24px, white

---

## 3. Z-Index Layering

| Layer | Z-Index | Component |
|-------|---------|-----------|
| 1 (bottom) | 0 | Background Image / Keyvisual |
| 2 | 1 | Gradient Cover |
| 3 | 10 | Main Content (Bia) |
| 4 | 50 | Header |
| 5 | 50 | Footer |
| 6 | 60 | Widget Button (if present) |
| 7 | 100 | Dropdowns / Overlays |

---

## 4. Layout Structure (ASCII)

```
┌────────────────────────────────────────────────────────────┐ 1440 x 5862
│ ▓▓▓▓ [KV] Keyvisual Background 1440x512 (absolute) ▓▓▓▓▓ │
│ ░░░░ [Cover] Gradient 1440x957 (absolute) ░░░░░░░░░░░░░░░ │
│                                                            │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ HEADER  1440x80  bg:rgba(16,20,23,0.8)  sticky        │  │
│ │ [Logo] [About SAA] [Awards] [Sun* Kudos*] [🔔][VN][👤] │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                            │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ BIA (Main Content)  py: 96px/120px  gap: 120px         │  │
│ │                                                        │  │
│ │   ┌────────────────────────────────────────────┐       │  │
│ │   │ [A] KV KUDOS HERO                          │       │  │
│ │   │ "Hệ thống ghi nhận và cảm ơn"             │       │  │
│ │   │ 🎨 KUDOS Logo (593x104)                    │       │  │
│ │   └────────────────────────────────────────────┘       │  │
│ │                                                        │  │
│ │   ┌──────────────────────┐ ┌────────────────────┐      │  │
│ │   │ ✏️ Hôm nay, bạn muốn │ │ 🔍 Tìm kiếm       │      │  │
│ │   │ gửi lời cảm ơn...   │ │ profile Sunner     │      │  │
│ │   └──────────────────────┘ └────────────────────┘      │  │
│ │                     ↕ 120px                            │  │
│ │   ┌────────────────────────────────────────────┐       │  │
│ │   │ [B.1] Sun* Annual Awards 2025              │       │  │
│ │   │ ─────────────────────── (divider)           │       │  │
│ │   │ HIGHLIGHT KUDOS  [Hashtag▼] [Phòng ban▼]  │       │  │
│ │   └────────────────────────────────────────────┘       │  │
│ │          ↕ 40px                                        │  │
│ │   ┌────────────────────────────────────────────┐       │  │
│ │   │ [B.2] CAROUSEL                             │       │  │
│ │   │ ◀ [Card1] [Card2*] [Card3] [Card4] [Card5] ▶     │  │
│ │   │      528px each   gap:24px                  │       │  │
│ │   │ Gradient fades on both sides (400px)        │       │  │
│ │   └────────────────────────────────────────────┘       │  │
│ │   ┌────────────────────────────────────────────┐       │  │
│ │   │ [B.5]        ◀  2/5  ▶                     │       │  │
│ │   └────────────────────────────────────────────┘       │  │
│ │                     ↕ 120px                            │  │
│ │   ┌────────────────────────────────────────────┐       │  │
│ │   │ [B.6] Sun* Annual Awards 2025              │       │  │
│ │   │ ─────────────────────── (divider)           │       │  │
│ │   │ SPOTLIGHT BOARD                             │       │  │
│ │   └────────────────────────────────────────────┘       │  │
│ │          ↕ 40px                                        │  │
│ │   ┌────────────────────────────────────────────┐       │  │
│ │   │ [B.7] SPOTLIGHT BOARD  r:47px              │       │  │
│ │   │ ┌──────────────────────────────────────┐   │       │  │
│ │   │ │ 🔍 388 KUDOS                         │   │       │  │
│ │   │ │   name  name  NAME  name             │   │       │  │
│ │   │ │  name   NAME    name  name           │   │       │  │
│ │   │ │     name   name    NAME              │   │       │  │
│ │   │ └──────────────────────────────────────┘   │       │  │
│ │   │                1157 x 548px                │       │  │
│ │   └────────────────────────────────────────────┘       │  │
│ │                     ↕ 120px                            │  │
│ │   ┌────────────────────────────────────────────┐       │  │
│ │   │ [C.1] Sun* Annual Awards 2025              │       │  │
│ │   │ ─────────────────────── (divider)           │       │  │
│ │   │ ALL KUDOS                                   │       │  │
│ │   └────────────────────────────────────────────┘       │  │
│ │          ↕ 40px                                        │  │
│ │   ┌──────────────────────┐  ┌──────────────────┐      │  │
│ │   │ [C.2] LEFT COLUMN    │  │ [D] RIGHT SIDEBAR│      │  │
│ │   │ 680px                │  │ 422px             │      │  │
│ │   │                      │  │                   │      │  │
│ │   │ ┌──────────────────┐ │  │ ┌───────────────┐│      │  │
│ │   │ │ Kudo Post Card   │ │  │ │ [D.1] Stats   ││      │  │
│ │   │ │ bg:#FFF8E1 r:24  │ │  │ │ bg:#00070C    ││      │  │
│ │   │ │                  │ │  │ │ r:17           ││      │  │
│ │   │ │ [Avatar] → [Avtr]│ │  │ │ Kudos nhận: 25││      │  │
│ │   │ │ Time | Category  │ │  │ │ Kudos gửi: 25 ││      │  │
│ │   │ │ ┌──────────────┐ │ │  │ │ Tim nhận: 25  ││      │  │
│ │   │ │ │ Content box  │ │ │  │ │ ────────────  ││      │  │
│ │   │ │ │ bg:gold/40%  │ │ │  │ │ Box mở: 25   ││      │  │
│ │   │ │ │ r:12         │ │ │  │ │ Box chưa: 25 ││      │  │
│ │   │ │ └──────────────┘ │ │  │ │               ││      │  │
│ │   │ │ [📷📷📷📷📷]     │ │  │ │ [Mở Secret 🎁]││      │  │
│ │   │ │ #tags #tags      │ │  │ └───────────────┘│      │  │
│ │   │ │ ❤️ 1,000 CopyLink│ │  │      ↕ 24px      │      │  │
│ │   │ └──────────────────┘ │  │ ┌───────────────┐│      │  │
│ │   │      ↕ 24px          │  │ │ [D.3] Top 10  ││      │  │
│ │   │ ┌──────────────────┐ │  │ │ SUNNER NHẬN   ││      │  │
│ │   │ │ Kudo Post Card 2 │ │  │ │ QUÀ MỚI NHẤT ││      │  │
│ │   │ │ ...              │ │  │ │               ││      │  │
│ │   │ └──────────────────┘ │  │ │ [👤] Name     ││      │  │
│ │   │      ↕ 24px          │  │ │ [👤] Name     ││      │  │
│ │   │ ┌──────────────────┐ │  │ │ [👤] Name     ││      │  │
│ │   │ │ Kudo Post Card 3 │ │  │ │ ...           ││      │  │
│ │   │ │ ...              │ │  │ └───────────────┘│      │  │
│ │   │ └──────────────────┘ │  │                   │      │  │
│ │   └──────────────────────┘  └──────────────────┘      │  │
│ │        gap: 80px between columns                       │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                            │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ FOOTER  px:90 py:40  border-top:1px #2E3940            │  │
│ │ [Logo] [About] [Awards] [Sun* Kudos*] [Tiêu chuẩn] ©  │  │
│ └────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

## 5. Implementation Mapping

| Figma Node ID | React Component | File Path | Key Tailwind Classes |
|---------------|-----------------|-----------|----------------------|
| `2940:13431` | `KudosLiveBoardPage` | `src/app/(main)/kudos/page.tsx` | `relative w-full min-h-screen bg-[#00101A]` |
| `2940:13437` | `KudosHero` | `src/components/kudos/kudos-hero.tsx` | `relative w-full h-[512px]` |
| `2940:13449` | `KudosActionBar` | `src/components/kudos/kudos-action-bar.tsx` | `flex items-center gap-4` |
| `2940:13451` | `HighlightSection` | `src/components/kudos/highlight-section.tsx` | `flex flex-col gap-10` |
| `2940:13459` | `HashtagFilter` | `src/components/kudos/hashtag-filter.tsx` | `bg-[#FFEA9E]/10 border border-[#998C5F] rounded px-4 py-4` |
| `2940:13460` | `DepartmentFilter` | `src/components/kudos/department-filter.tsx` | `bg-[#FFEA9E]/10 border border-[#998C5F] rounded px-4 py-4` |
| `2940:13465` | `HighlightKudoCard` | `src/components/kudos/highlight-kudo-card.tsx` | `w-[528px] bg-[#FFF8E1] border-4 border-[#FFEA9E] rounded-2xl` |
| `2940:13471` | `CarouselPagination` | `src/components/kudos/carousel-pagination.tsx` | `flex items-center gap-8 justify-center` |
| `2940:14174` | `SpotlightBoard` | `src/components/kudos/spotlight-board.tsx` | `w-[1157px] h-[548px] border border-[#998C5F] rounded-[47px]` |
| `2940:13475` | `AllKudosSection` | `src/components/kudos/all-kudos-section.tsx` | `flex gap-20` |
| `3127:21871` | `KudoPostCard` | `src/components/kudos/kudo-post-card.tsx` | `w-[680px] bg-[#FFF8E1] rounded-3xl p-10` |
| `2940:13488` | `KudosSidebar` | `src/components/kudos/kudos-sidebar.tsx` | `w-[422px] flex flex-col gap-6` |
| `2940:13489` | `KudosStats` | `src/components/kudos/kudos-stats.tsx` | `bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6` |
| `2940:13497` | `OpenSecretBoxButton` | `src/components/kudos/open-secret-box-button.tsx` | `w-full h-[60px] bg-[#FFEA9E] rounded-lg` |
| `2940:13510` | `TopSunnerList` | `src/components/kudos/top-sunner-list.tsx` | `bg-[#00070C] border border-[#998C5F] rounded-[17px]` |

---

## 6. Responsive Breakpoints (Constitution P4: Mobile-first)

### Mobile (default, < 768px)
- Header: hamburger menu, `px-6`
- Hero: text smaller (24px tagline), full-width
- Action buttons: stack vertical, full-width
- Section titles: 36px
- Carousel: single card visible, horizontal scroll
- Spotlight: hidden or simplified view
- All Kudos: single column, card width 100%
- Sidebar: below feed, full-width
- Footer: `px-6 py-6`, stack vertical

### Tablet (md: 768px)
- Header: full nav visible, `px-20`
- Section titles: 48px
- Carousel: 1-2 cards visible
- All Kudos: single column (card 100% width), sidebar below
- Footer: `px-20`

### Desktop (lg: 1024px)
- 2-column layout for All Kudos (feed + sidebar)
- Carousel: 2-3 cards visible
- Spacing increases

### Large Desktop (xl: 1440px — Figma design)
- Pixel-perfect match with Figma
- `px-36` (~144px)
- Left column: 680px, Right sidebar: 422px, gap: 80px

---

## 7. Assets Required

| Asset | Figma Node | Format | Responsive Sizes |
|-------|-----------|--------|------------------|
| KV Kudos background | `2940:13437` | WebP | 768w / 1024w / 1440w / 2880w |
| KUDOS Logo | Inside `2940:13437` | SVG/WebP | 593x104 |
| Spotlight background images | `2940:14174` | WebP | 1157x548 |
| Arrow left/right (carousel) | Inside carousel | SVG | 60x60 |
| Arrow left/right (pagination) | Inside `2940:13471` | SVG | 48x48 |
| Heart icon (active/inactive) | Inside cards | SVG | 32x32 |
| Send arrow icon | Inside cards | SVG | 32x32 |
| Copy link icon | Inside cards | SVG | 24x24 |
| Gift icon | Inside `2940:13497` | SVG | 24x24 |
| Pan/Zoom icon | `3007:17479` | SVG | 24x24 |
| Search icon | Inside search buttons | SVG | 24x24 |
| Pen/Write icon | Inside action button | SVG | 24x24 |
| Chevron down | Inside dropdowns | SVG | 24x24 |
| Font: Montserrat | Google Fonts | WOFF2 | 400, 500, 700 |
| Font: Montserrat Alternates | Google Fonts | WOFF2 | 400, 700 |

> **Note:** All images MUST use `next/image` with `sizes` prop and Cloudflare Images binding (Constitution P6).
