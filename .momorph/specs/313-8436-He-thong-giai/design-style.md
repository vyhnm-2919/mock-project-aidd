# Hệ thống giải - Design Style Document

**Frame ID:** `313:8436`
**Frame Name:** Hệ thống giải
**Dimensions:** 1440 x 6410px
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#00101A` | Background chính `rgba(0,16,26,1)` |
| `--color-bg-header` | `rgba(16,20,23,0.8)` | Header semi-transparent |
| `--color-bg-kudos-btn` | `#FFEA9E` | Nút "Chi tiết" Sun* Kudos |
| `--color-bg-kudos-section` | `#0F0F0F` | Background section Sun* Kudos |
| `--color-text-primary` | `#FFFFFF` | Text chính trên nền tối |
| `--color-text-accent` | `#FFEA9E` | Text nhấn (tiêu đề giải, nav selected, labels) `rgba(255,234,158,1)` |
| `--color-text-button` | `#00101A` | Text trên nút vàng `rgba(0,16,26,1)` |
| `--color-border` | `#2E3940` | Divider, separator lines `rgba(46,57,64,1)` |
| `--color-border-accent` | `#FFEA9E` | Border award images (0.955px) |
| `--color-border-user` | `#998C5F` | Border user profile icon |
| `--color-badge` | `#D4271D` | Notification badge `rgba(212,39,29,1)` |
| `--gradient-cover` | `linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)` | Gradient overlay trên keyvisual |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-nav` | Montserrat | 14px | 700 | 20px | 0.1px | #FFFFFF | Header nav links (normal) |
| `--text-nav-active` | Montserrat | 16px | 700 | 24px | — | #FFEA9E | Header nav link "Award Information" (active) |
| `--text-section-subtitle` | Montserrat | 24px | 700 | 32px | 0px | #FFFFFF | "Sun* Annual Awards 2025" |
| `--text-section-title` | Montserrat | 57px | 700 | 64px | -0.25px | #FFEA9E | "Hệ thống giải thưởng SAA 2025" |
| `--text-sidebar-normal` | Montserrat | 14px | 700 | 20px | 0px | #FFFFFF | Sidebar menu items (normal) |
| `--text-sidebar-active` | Montserrat | 14px | 700 | 20px | 0px | #FFEA9E | Sidebar menu items (active) — same size as normal, only color changes |
| `--text-award-title` | Montserrat | 24px | 700 | 32px | 0px | #FFEA9E | Tên hạng mục giải (ví dụ "Top Talent") |
| `--text-award-desc` | Montserrat | 16px | 700 | 24px | 0px | #FFFFFF | Mô tả chi tiết giải thưởng |
| `--text-award-label` | Montserrat | 24px | 700 | 32px | 0px | #FFEA9E | "Số lượng giải thưởng:", "Giá trị giải thưởng:" |
| `--text-award-number` | Montserrat | 36px | 700 | 44px | 0px | #FFFFFF | Số lượng (10, 02, 03, 01) và giá trị VNĐ |
| `--text-award-unit` | Montserrat | 14px | 700 | 20px | 0px | #FFFFFF | "Cá nhân", "Tập thể", "Đơn vị" |
| `--text-award-note` | Montserrat | 14px | 700 | 20px | 0px | #FFFFFF | "cho mỗi giải thưởng", "cho giải cá nhân" |
| `--text-award-or` | Montserrat | 14px | 700 | 20px | 0px | #2E3940 | "Hoặc" (divider label, Signature card only) |
| `--text-kudos-label` | Montserrat | 24px | 700 | 32px | 0px | #FFFFFF | "Phong trào ghi nhận" |
| `--text-kudos-title` | Montserrat | 57px | 700 | 64px | 0px | #FFEA9E | "Sun* Kudos" |
| `--text-kudos-desc` | Montserrat | 16px | 700 | 24px | 0px | #FFFFFF | Mô tả Sun* Kudos |
| `--text-kudos-brand` | SVN-Gotham | 96px | 400 | 24px | 0px | #DBD1C1 | "KUDOS" decorative text |
| `--text-kudos-btn` | Montserrat | 16px | 700 | 24px | 0px | #00101A | Nút "Chi tiết" |
| `--text-footer-nav` | Montserrat | 16px | 700 | 24px | 0px | #FFFFFF | Footer nav links |
| `--text-lang` | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF | Language selector "VN" |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-page-x` | 144px | Page horizontal padding (xl) |
| `--sp-page-y` | 96px | Page vertical padding |
| `--sp-section-gap` | 120px | Gap giữa các section chính trong "Bìa" container |
| `--sp-header-pad` | 12px 144px | Header padding |
| `--sp-title-gap` | 16px | Gap trong section title (subtitle → divider → title) |
| `--sp-title-row-gap` | 32px | Gap trong title row |
| `--sp-award-system-gap` | 80px | Gap giữa sidebar và content area |
| `--sp-sidebar-item-gap` | 16px | Gap giữa mục sidebar |
| `--sp-sidebar-item-pad` | 16px | Padding mỗi mục sidebar |
| `--sp-sidebar-icon-gap` | 4px | Gap giữa icon và text trong sidebar item |
| `--sp-card-gap` | 80px | Gap giữa các thẻ giải thưởng (vertical) |
| `--sp-card-image-content-gap` | 40px | Gap giữa ảnh và content trong thẻ |
| `--sp-card-content-gap` | 32px | Gap giữa các block content trong thẻ |
| `--sp-card-text-gap` | 24px | Gap giữa title/desc, label/value trong content block |
| `--sp-card-metadata-gap` | 16px | Gap giữa items trong metadata row |
| `--sp-card-quantity-gap` | 8px | Gap giữa số và unit trong quantity |
| `--sp-kudos-content-gap` | 32px | Gap trong Sun* Kudos content |
| `--sp-kudos-text-gap` | 16px | Gap giữa text items trong Kudos |
| `--sp-kudos-btn-pad` | 16px | Padding nút Chi tiết |
| `--sp-kudos-btn-gap` | 8px | Gap giữa text và icon trong nút |
| `--sp-footer-pad` | 40px 90px | Footer padding |
| `--sp-footer-items-gap` | 80px | Gap giữa logo và nav links trong footer |
| `--sp-footer-links-gap` | 48px | Gap giữa footer links |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-nav` | 4px | Header nav hover, sidebar items, user button |
| `--radius-award-image` | 24px | Award images (336x336, rounded square — matching Homepage card style) |
| `--radius-card-content` | 16px | Content blocks trong award cards |
| `--radius-kudos-btn` | 4px | Nút "Chi tiết" |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-nav-selected` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Nav text selected glow (reuse from Homepage) |

---

## 2. Component Style Details

### Header (`313:8440`) — Shared Component
Reuse `MainHeader` from Homepage. Active nav: "Award Information" (text #FFEA9E + underline).
- **Dimensions:** 1440 x 80px
- **Background:** `rgba(16,20,23,0.8)`
- **Padding:** `12px 144px`
- **Backdrop-filter:** `blur(10px)`
- **Z-index:** 50

### Keyvisual / Hero Banner (`313:8437`)
- **Dimensions:** 1440 x 547px
- **Position:** Top of page
- **Image:** `background: url(...) lightgray 50% / cover no-repeat` — crop center
- **Z-index:** Below content

### Cover Gradient (`313:8439`)
- **Dimensions:** 1440 x 627px
- **Background:** `linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)`
- **Position:** Absolute, overlaps keyvisual bottom

### ROOT FURTHER Logo (`2789:12915`)
- **Dimensions:** 338 x 150px
- **Image:** `background: url(...) 50% / cover no-repeat`
- **Container:** 1152 x 150px, padding 0, gap 40px

### Section Title (`313:8453`)
- **Container:** 1152 x 129px
- **Layout:** `flex-direction: column; gap: 16px`

#### Subtitle (`313:8454`)
- **Text:** "Sun* Annual Awards 2025"
- **Font:** Montserrat 24px/700/32px
- **Color:** `#FFFFFF`

#### Divider (`313:8455`)
- **Height:** 1px
- **Background:** `rgba(46,57,64,1)` (#2E3940)
- **Width:** 1152px (full container)

#### Title Row (`313:8456`)
- **Layout:** `flex-direction: row; gap: 32px`

#### Title Text (`313:8457`)
- **Text:** "Hệ thống giải thưởng SAA 2025"
- **Font:** Montserrat 57px/700/64px
- **Color:** `rgba(255,234,158,1)` (#FFEA9E)
- **Width:** 931px

### Award System Container (`313:8458`)
- **Dimensions:** 1152 x 4833px
- **Layout:** `display: flex; flex-direction: row; gap: 80px` (sidebar left + content right)
- **Note:** Gap from design items shows `gap: 80px` between sidebar (178px) and content (853px). Total = 178 + 80 + 853 ≈ 1111px within 1152px container (with alignment offset)

### Sidebar Menu (`313:8459`)
- **Dimensions:** 178 x 448px
- **Layout:** `flex-direction: column; gap: 16px`
- **Position:** Sticky (follows scroll within award section)

#### Sidebar Item — Active (`313:8460`)
- **Padding:** 16px
- **Layout:** `flex-direction: row; gap: 4px; align-items: center`
- **Icon:** Target icon 24x24px
- **Text:** Color `#FFEA9E` (via Figma variable `--Details-Text-Primary-1`)
- **No background** (no border-radius visible in active state)

#### Sidebar Item — Normal (`313:8461` etc.)
- **Dimensions:** ~146 x 56px (single line) or ~146 x 72px (2 lines)
- **Padding:** 16px
- **Border-radius:** 4px
- **Layout:** `flex-direction: row; gap: 4px; align-items: center`
- **Icon:** Target icon 24x24px
- **Text:** Montserrat 14px/700/20px, color `#FFFFFF`

**Sidebar Item States:**

| State | Property | Value |
|-------|----------|-------|
| Normal | color | `#FFFFFF` |
| Normal | background | `transparent` |
| Hover | background | `rgba(255,255,255,0.1)` |
| Hover | cursor | `pointer` |
| Active | color | `#FFEA9E` |
| Active | icon color | `#FFEA9E` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |

### Award Card (Repeating Component)

Each card has this structure inside container `313:8466` (853 x 4833px):

#### Card Container (e.g. `313:8467` Top Talent)
- **Dimensions:** 856 x ~631-1047px (varies by content)
- **Layout:** `flex-direction: column; gap: 80px` (content + bottom divider area)

#### Card Inner Frame (e.g. `I313:8467;214:2803`)
- **Dimensions:** 856 x ~550-966px
- **Layout:** `display: flex; flex-direction: row; gap: 40px; align-items: flex-start`
- Odd cards (1, 3, 5): Image left, Content right
- Even cards (2, 4, 6): Content left, Image right

#### Award Image (`I313:8467;214:2525` etc.)
- **Dimensions:** 336 x 336px
- **Border:** `0.955px solid #FFEA9E` (via variable `--Details-Text-Primary-1`)
- **Border-radius:** ~24px (implicit from rounded circle visual)
- **Image:** `background: url(...) cover no-repeat`
- **Mix-blend-mode:** screen (matching Homepage card style)

#### Award Name Badge (inside image)
- **Overlay:** Image badge positioned inside award circle
- **Various dimensions per award**

#### Content Area (`I313:8467;214:2526`)
- **Width:** ~480px (fills remaining space)
- **Layout:** `flex-direction: column; gap: 32px`

##### Title Block (`I313:8467;214:2527`)
- **Layout:** `flex-direction: column; gap: 24px; border-radius: 16px`

###### Title Row (`I313:8467;214:2528`)
- **Layout:** `flex-direction: row; gap: 16px; align-items: center`
- **Icon:** Target 24x24px
- **Text:** Montserrat 24px/700/32px, color `#FFEA9E`

###### Description (`I313:8467;214:2531`)
- **Font:** Montserrat 16px/700/24px
- **Color:** `#FFFFFF`
- **Width:** 480px

##### Divider (`I313:8467;214:2532`)
- **Height:** 1px
- **Background:** `rgba(46,57,64,1)` (#2E3940)
- **Width:** 480px

##### Quantity Block (`I313:8467;214:2533`)
- **Layout:** `flex-direction: row; gap: 24px; align-items: center`
- **Visual order (left→right):** Diamond icon → Label → Number group
- **Quantity frame:** `flex-direction: row; gap: 16px`
  - **Diamond icon:** 24x24px
  - **Label:** "Số lượng giải thưởng:" — Montserrat 24px/700/32px, color `#FFEA9E`
  - **Number group:** `flex-direction: column; gap: 8px`
    - **Number:** Montserrat 36px/700/44px, color `#FFFFFF` (e.g. "10")
    - **Unit:** Montserrat 14px/700/20px, color `#FFFFFF` (e.g. "Cá nhân")
- **Note:** Figma node order may differ from visual order; implement per visual reference (screenshot)

##### Divider (second)
- Same as above: 480 x 1px, #2E3940

##### Prize Value Block (`I313:8467;214:2540`)
- **Layout:** `flex-direction: column; gap: 24px`
- **Label row:** `flex-direction: row; gap: 16px`
  - **License icon:** 24x24px
  - **Label:** "Giá trị giải thưởng:" — Montserrat 24px/700/32px, color `#FFEA9E`
- **Value:** Montserrat 36px/700/44px, color `#FFFFFF` (e.g. "7.000.000 VNĐ")
- **Note:** Montserrat 14px/700/20px, color `#FFFFFF` (e.g. "cho mỗi giải thưởng")

##### Card Bottom Divider (`I313:8467;214:2771`)
- **Width:** 853px
- **Height:** 1px
- **Background:** `rgba(46,57,64,1)` (#2E3940)
- **Note:** Omit for the last card (MVP) — no divider between last award and Sun* Kudos section

#### Signature Card Special: "Hoặc" Divider (`313:8498`)
- **Layout:** `flex-direction: row; gap: 8px; align-items: center`
- **"Hoặc" text:** Montserrat 14px/700/20px, color `#2E3940`
- **Line:** 434 x 1px, background `rgba(46,57,64,1)`

### Sun* Kudos Section (`335:12023`)
- **Dimensions:** 1152 x 500px
- **Layout:** `gap: 10px`
- **Background:** Dark bg with image `#0F0F0F` + background image overlay

#### Kudos Content Area (`I335:12023;313:8419`)
- **Dimensions:** 470 x 408px
- **Layout:** `flex-direction: column; gap: 32px`

##### Text Block (`I335:12023;313:8420`)
- **Layout:** `flex-direction: column; gap: 16px`
- **Label:** "Phong trào ghi nhận" — Montserrat 24px/700/32px, #FFFFFF
- **Title:** "Sun* Kudos" — Montserrat 57px/700/64px, #FFEA9E
- **Description:** Montserrat 16px/700/24px, #FFFFFF (contains "ĐIỂM MỚI CỦA SAA 2025" inline bold)

##### Button Frame (`I335:12023;313:8424`)
- **Layout:** `flex-direction: row; gap: 24px`

##### "Chi tiết" Button (`I335:12023;313:8426`)
- **Dimensions:** 127 x 56px
- **Padding:** 16px
- **Border-radius:** 4px
- **Background:** `rgba(255,234,158,1)` (#FFEA9E)
- **Layout:** `flex-direction: row; gap: 8px; align-items: center`
- **Text:** Montserrat 16px/700/24px, color `#00101A`
- **Icon:** Arrow 24x24px

**Button States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Hover | background | `#FFE078` |
| Hover | transform | `translateY(-2px)` |
| Focus | outline | `2px solid #FFEA9E` |
| Active | background | `#FFD54F` |

#### Kudos Illustration Area
- **"KUDOS" text:** SVN-Gotham 96px/400, color `#DBD1C1` `rgba(219,209,193,1)`
- **Illustration frame:** 272 x 219px

### Footer (`354:4323`) — Shared Component
Reuse `MainFooter`. Active nav: "Award Information" highlighted.
- **Padding:** `40px 90px` (⚠️ differs from Homepage's `40px 144px` — may be Figma inconsistency; implementation should use same padding as Homepage for consistency)
- **Layout:** `flex-direction: row; gap: 80px`
- **Logo:** 69 x 64px
- **Nav links:** Montserrat 16px/700/24px (matches Figma design — fixed in T031)
- **Footer active link:** `bg: rgba(255,234,158,0.1)` (highlighted "Award Information")
- **Border-top:** `1px solid #2E3940` (same as Homepage)

---

## 3. Z-Index Layering

| Layer | Z-Index | Component | Node ID |
|-------|---------|-----------|---------|
| 1 (bottom) | 0 | Keyvisual Image | `313:8437` |
| 2 | 1 | Cover Gradient | `313:8439` |
| 3 | 10 | Main Content ("Bìa") | `313:8449` |
| 4 | 50 | Header | `313:8440` |
| 5 | 50 | Footer | `354:4323` |
| 6 | 60 | Widget Button (shared) | — |

---

## 4. Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────┐ 1440 x 6410
│ ▓▓▓▓▓▓ [BG] Keyvisual 1440x547 (absolute) ▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ░░░░░░ [Cover] Gradient 1440x627 (absolute) ░░░░░░░░░░░░ │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ [HEADER]  1440x80  bg:rgba(16,20,23,0.8)  sticky    │  │
│ │ px:144                                               │  │
│ │ [Logo] [About SAA] [Awards*] [Kudos]  [🔔][VN▼][👤] │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ "BÌA" CONTAINER  px:144  py:96  gap:120px            │  │
│ │                                                      │  │
│ │   ┌──────────────────────────────────┐               │  │
│ │   │ ROOT FURTHER Logo  338x150       │               │  │
│ │   └──────────────────────────────────┘               │  │
│ │              ↕ 120px                                 │  │
│ │   ┌──────────────────────────────────────────┐       │  │
│ │   │ [SECTION TITLE]  1152x129                │       │  │
│ │   │ "Sun* Annual Awards 2025"  24px white    │       │  │
│ │   │ ──────────────────────── (divider 1px)   │       │  │
│ │   │ "Hệ thống giải thưởng SAA 2025" 57px 🟡 │       │  │
│ │   └──────────────────────────────────────────┘       │  │
│ │              ↕ 120px                                 │  │
│ │   ┌─────────────────────────────────────────────┐    │  │
│ │   │ [AWARD SYSTEM]  1152 x 4833  gap:80px       │    │  │
│ │   │                                             │    │  │
│ │   │ ┌──────┐  ┌──────────────────────────────┐  │    │  │
│ │   │ │SIDEBAR│  │ AWARD CARDS LIST  853px      │  │    │  │
│ │   │ │ 178px │  │                              │  │    │  │
│ │   │ │ sticky│  │ ┌────────────────────────┐   │  │    │  │
│ │   │ │       │  │ │ D.1 TOP TALENT         │   │  │    │  │
│ │   │ │•Top   │  │ │ [IMG 336x336] [Content]│   │  │    │  │
│ │   │ │ Talent│  │ │  ↑ left       ↑ right  │   │  │    │  │
│ │   │ │ Top   │  │ │ Title, Desc, Qty, Prize│   │  │    │  │
│ │   │ │ Proj  │  │ ├────────────────────────┤   │  │    │  │
│ │   │ │ Top PL│  │ │ ── divider 853px ──    │   │  │    │  │
│ │   │ │ Best  │  │ ├────────────────────────┤   │  │    │  │
│ │   │ │ Mgr   │  │ │ D.2 TOP PROJECT        │   │  │    │  │
│ │   │ │ Sig   │  │ │ [Content] [IMG 336x336]│   │  │    │  │
│ │   │ │ 2025  │  │ │  ↑ left     ↑ right    │   │  │    │  │
│ │   │ │ MVP   │  │ ├────────────────────────┤   │  │    │  │
│ │   │ │       │  │ │ ...D.3, D.4, D.5, D.6  │   │  │    │  │
│ │   │ └──────┘  │ └────────────────────────┘   │  │    │  │
│ │   │            │                              │  │    │  │
│ │   └─────────────────────────────────────────────┘    │  │
│ │              ↕ 120px                                 │  │
│ │   ┌──────────────────────────────────────────┐       │  │
│ │   │ [SUN* KUDOS]  1152x500  bg:#0F0F0F      │       │  │
│ │   │ "Phong trào ghi nhận"                    │       │  │
│ │   │ "Sun* Kudos" (57px gold)                 │       │  │
│ │   │ Description...           [Illustration]  │       │  │
│ │   │ [Chi tiết 🟡]             "KUDOS"        │       │  │
│ │   └──────────────────────────────────────────┘       │  │
│ │                                                      │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ [FOOTER]  1440x~144  px:90 py:40                     │  │
│ │ border-top: 1px #2E3940                              │  │
│ │ [Logo 69x64] [About SAA] [Awards*] [Kudos] [TCC] ©  │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                          │
│                              ┌───────────┐               │
│                              │ [WIDGET]  │ fixed         │
│                              │ bottom-right│              │
│                              └───────────┘               │
└──────────────────────────────────────────────────────────┘
```

### Award Card Layout Detail (Odd = Image Left)

```
┌────────────────────────────────────────────────────┐ 856px
│                                                    │
│ ┌──────────┐  gap:40  ┌─────────────────────────┐  │
│ │          │          │ 🎯 Top Talent            │  │
│ │  AWARD   │          │ 24px/700 #FFEA9E         │  │
│ │  IMAGE   │          │                          │  │
│ │ 336x336  │          │ Mô tả chi tiết...        │  │
│ │ border:  │          │ 16px/700 #FFF            │  │
│ │ 0.955px  │          │                          │  │
│ │ #FFEA9E  │          │ ──── divider ────        │  │
│ │          │          │                          │  │
│ │          │          │ 💎 Số lượng: 10 Cá nhân  │  │
│ └──────────┘          │                          │  │
│                       │ ──── divider ────        │  │
│                       │                          │  │
│                       │ 📜 Giá trị: 7.000.000 VNĐ│  │
│                       │ cho mỗi giải thưởng      │  │
│                       └─────────────────────────┘  │
│                                                    │
│ ──────────── card divider 853px ──────────────     │
└────────────────────────────────────────────────────┘
```

### Award Card Layout Detail (Even = Image Right)

```
┌────────────────────────────────────────────────────┐ 856px
│                                                    │
│ ┌─────────────────────────┐  gap:40  ┌──────────┐  │
│ │ 🎯 Top Project          │          │          │  │
│ │ 24px/700 #FFEA9E        │          │  AWARD   │  │
│ │                          │          │  IMAGE   │  │
│ │ Mô tả chi tiết...       │          │ 336x336  │  │
│ │ 16px/700 #FFF           │          │          │  │
│ │                          │          │          │  │
│ │ ──── divider ────        │          │          │  │
│ │                          │          │          │  │
│ │ 💎 Số lượng: 02 Tập thể │          │          │  │
│ │                          │          └──────────┘  │
│ │ ──── divider ────        │                        │
│ │                          │                        │
│ │ 📜 Giá trị: 15.000.000  │                        │
│ │ cho mỗi giải thưởng     │                        │
│ └─────────────────────────┘                        │
│                                                    │
│ ──────────── card divider 853px ──────────────     │
└────────────────────────────────────────────────────┘
```

---

## 5. Implementation Mapping

| Figma Node ID | React Component | File Path | Key Tailwind Classes |
|---------------|-----------------|-----------|----------------------|
| `313:8436` | `AwardsPage` | `src/app/(main)/awards/page.tsx` | `relative w-full min-h-screen bg-[#00101A]` |
| `313:8440` | `MainHeader` (shared) | `src/components/header/main-header.tsx` | Reuse — pass active nav |
| `313:8437` | Hero Banner (img) | — (inside page) | `absolute top-0 w-full h-[547px] object-cover` |
| `313:8439` | Cover Gradient | — (inside page) | `absolute w-full h-[627px] bg-gradient-to-t from-[#00101A] to-transparent` |
| `2789:12915` | ROOT FURTHER Logo | — | `w-[338px] h-[150px]` |
| `313:8453` | `AwardsSectionTitle` | `src/components/awards/section-title.tsx` | `flex flex-col gap-4` |
| `313:8459` | `AwardsSidebar` (`"use client"`) | `src/components/awards/awards-sidebar.tsx` | `sticky top-24 w-[178px] flex flex-col gap-4` |
| `313:8466` | `AwardCardsList` | `src/components/awards/award-cards-list.tsx` | `flex flex-col gap-20` |
| `313:8467` | `AwardCard` (reusable) | `src/components/awards/award-card.tsx` | `flex flex-col gap-20` |
| — | `AwardCardContent` | `src/components/awards/award-card-content.tsx` | `flex flex-col gap-8` |
| `335:12023` | `AwardsKudosSection` (Awards-specific) | `src/components/awards/kudos-section.tsx` | **New component** — cannot reuse Homepage version (different bg, title size, button style, decorative text). See plan.md Reuse Analysis. |
| `354:4323` | `MainFooter` (shared) | `src/components/footer/main-footer.tsx` | Reuse |
| — | `WidgetButton` (shared) | `src/components/widget-button.tsx` | Reuse |

---

## 6. Responsive Breakpoints (Constitution P4: Mobile-first)

### Mobile (default, < 768px)
- Header: Hamburger menu (shared MobileNav)
- Keyvisual: Smaller height (~300px), cover crop
- Section title: `text-[32px]` for title, `text-lg` for subtitle
- Sidebar: Hidden — replaced by horizontal scrollable tabs or dropdown
- Award cards: Stack vertical (image on top, content below), full width
- Award image: 280px or 100% width
- Sun* Kudos: Stack vertical
- Footer: Stack vertical

### Tablet (md: 768px)
- Sidebar: Could show as horizontal tabs above content
- Award cards: Still single column but with more padding
- Section title: medium size

### Desktop (lg: 1024px)
- Full 2-column layout: sidebar + content
- Sidebar sticky
- Award cards: Row layout with alternating image position

### Large Desktop (xl: 1440px)
- Pixel-perfect match with Figma
- `px-36` (~144px)
- Full sidebar 178px + gap 80px + content 853px

---

## 7. Assets Required

| Asset | Figma Node | Format | Size |
|-------|-----------|--------|------|
| Keyvisual/Banner artwork | `2167:5138` | WebP | 1440x547 |
| ROOT FURTHER logo (banner) | `2789:12915` | WebP/PNG | 338x150 |
| Award image: Top Talent | `I313:8467;214:2525;81:2442` | WebP/PNG | 336x336 |
| Award image: Top Project | `I313:8468;214:2617;81:2442` | WebP/PNG | 336x336 |
| Award image: Top Project Leader | `I313:8469;214:2525;81:2442` | WebP/PNG | 336x336 |
| Award image: Best Manager | `I313:8470;214:2617;81:2442` | WebP/PNG | 336x336 |
| Award image: Signature Creator | `I313:8473;81:2442` | WebP/PNG | 336x336 |
| Award image: MVP | `I313:8510;214:2617;81:2442` | WebP/PNG | 336x336 |
| Award name badge (x6) | Various `214:666` instances | WebP/PNG | Various |
| Icon: Target (sidebar/title) | `MM_MEDIA_Target` | SVG | 24x24 |
| Icon: Diamond (quantity) | `MM_MEDIA_Diamond` | SVG | 24x24 |
| Icon: License (prize) | `MM_MEDIA_License` | SVG | 24x24 |
| Icon: Arrow (CTA button) | `186:1766` | SVG | 24x24 |
| Sun* Kudos illustration | `I335:12023;313:8417` | WebP | 272x219 |
| Sun* Kudos background | `I335:12023;313:8416` | WebP | 1152x500 |

> **Note:** Award images may be reusable from Homepage (`public/images/homepage/awards/`). New icons (Target, Diamond, License) need to be downloaded.

---

## 8. Figma Data Discrepancy Note

> **CRITICAL:** Several Figma component instances retain template/default text values that do NOT match the intended design. The raw text nodes show "10" and "7.000.000 VNĐ" for Top Project, Best Manager, and MVP cards. The correct values are documented in the design item annotations and verified against the frame screenshot (see `spec.md` Section 4, "Data Source Note").
>
> When implementing, use the award data table in `spec.md` as the single source of truth for quantities and prize values.
