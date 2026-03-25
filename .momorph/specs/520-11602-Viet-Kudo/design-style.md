# Viết Kudo — Design Style Document

**Frame ID:** `520:11602`
**Frame Name:** Viết Kudo
**Dimensions:** 1440 x 1024px (modal: 752px wide)
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-overlay` | `rgba(0,16,26,0.8)` | Modal overlay (80% dark) |
| `--color-bg-modal` | `#FFF8E1` | Modal background (warm cream) |
| `--color-bg-input` | `#FFFFFF` | Input field backgrounds |
| `--color-bg-button-primary` | `#FFEA9E` | "Gửi" button |
| `--color-bg-button-secondary` | `rgba(255,234,158,0.10)` | "Hủy" button |
| `--color-text-dark` | `#00101A` | Dark text on light bg |
| `--color-text-placeholder` | `#999999` | Placeholder text |
| `--color-text-required` | `#CF1322` | Required asterisk (*) red |
| `--color-text-community` | `#E46060` | "Tiêu chuẩn cộng đồng" link (coral) |
| `--color-border` | `#998C5F` | Input borders, toolbar borders |
| `--color-border-accent` | `#FFEA9E` | Image thumbnail inner border |
| `--color-delete` | `#D4271D` | Image delete button red |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-modal-title` | Montserrat | 32px | 700 | 40px | 0px | `#00101A` | Modal title |
| `--text-section-label` | Montserrat | 22px | 700 | 28px | 0px | `#00101A` | "Người nhận", "Hashtag", "Image", checkbox label |
| `--text-body` | Montserrat | 16px | 700 | 24px | 0.15px | `#00101A` | Input text, button text |
| `--text-placeholder` | Montserrat | 16px | 700 | 24px | 0.15px | `#999` | Input placeholders |
| `--text-hint` | Montserrat | 16px | 700 | 24px | 0.5px | `#00101A` | Hint text ("@ + tên") |
| `--text-helper` | Montserrat | 16px | 700 | 24px | 0.15px | `#999` | Helper text ("Ví dụ:...") |
| `--text-community-link` | Montserrat | 16px | 700 | 24px | — | `#E46060` | "Tiêu chuẩn cộng đồng" |
| `--text-small-label` | Montserrat | 11px | 700 | 16px | 0.5px | `#999` | "+ Hashtag / + Image" labels |
| `--text-submit-button` | Montserrat | 22px | 700 | 28px | 0px | `#00101A` | "Gửi" button text |
| `--text-required` | Noto Sans JP | 16px | 700 | 20px | 0px | `#CF1322` | Required asterisk (*) |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-modal-padding` | 40px | Modal internal padding (all sides) |
| `--sp-modal-gap` | 32px | Gap between form sections |
| `--sp-input-padding` | `16px 24px` | Input field padding |
| `--sp-toolbar-padding` | `10px 16px` | Toolbar button padding |
| `--sp-button-padding-cancel` | `16px 40px` | Cancel button padding |
| `--sp-button-padding-submit` | 16px | Submit button padding |
| `--sp-checkbox-gap` | 16px | Gap between checkbox and label |
| `--sp-button-gap` | 16px | Gap between Hủy and Gửi buttons |
| `--sp-hashtag-padding` | `4px 8px` | Hashtag chip/button padding |
| `--sp-image-gap` | 16px | Gap between image thumbnails |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-modal` | 24px | Modal container |
| `--radius-input` | 8px | Input fields, textarea bottom corners |
| `--radius-toolbar-left` | `8px 0 0 0` | First toolbar button (top-left) |
| `--radius-toolbar-right` | `0 8px 0 0` | Last toolbar item (top-right) |
| `--radius-textarea` | `0 0 8px 8px` | Textarea (bottom corners only) |
| `--radius-submit` | 8px | Submit button |
| `--radius-checkbox` | 4px | Checkbox |
| `--radius-hashtag` | 8px | Hashtag chip/button |
| `--radius-image-outer` | 18px | Image thumbnail outer container |
| `--radius-image-inner` | 4px | Image thumbnail inner |
| `--radius-delete` | 71.4px | Image delete button (circle) |

---

## 2. Component Style Details

### Overlay (`520:11646`)
- **Position:** `fixed; inset: 0`
- **Background:** `rgba(0,16,26,0.8)`
- **Z-index:** 200
- **Click:** closes modal

### Modal Container (`520:11647`)
- **Width:** 752px (md+), 100% (mobile)
- **Max-height:** 90vh
- **Padding:** 40px
- **Gap:** 32px between sections
- **Background:** `#FFF8E1`
- **Border-radius:** 24px
- **Layout:** `flex-direction: column; align-items: flex-start`
- **Overflow-y:** auto
- **Position:** centered

### A. Modal Title
- **Font:** Montserrat 32px/700/40px, `#00101A`, text-align center
- **Width:** 672px (full content width)

### B. Người nhận (Search Dropdown)
- **Label:** Montserrat 22px/700/28px, `#00101A` + required `*` (Noto Sans JP 16px, `#CF1322`)
- **Input:** 514x56px, border `1px solid #998C5F`, border-radius 8px, bg `#FFF`, padding `16px 24px`
- **Placeholder:** "Tìm kiếm" (Montserrat 16px/700, `#999`)
- **Dropdown icon:** 24x24px chevron on right

**Input States (applies to all text inputs):**

| State | Property | Value |
|-------|----------|-------|
| Default | border | `1px solid #998C5F` |
| Focus | border | `1px solid #FFEA9E` |
| Focus | outline | `2px solid rgba(255,234,158,0.3)` |
| Error | border | `1px solid #CF1322` |
| Error | background | `rgba(207,19,34,0.05)` |

### Danh hiệu Input
- **Same input style as Người nhận**
- **Placeholder:** "Dành tặng một danh hiệu cho đồng đội"
- **Helper:** "Ví dụ: Người truyền động lực cho tôi." + "Danh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn."
- **Helper font:** Montserrat 16px/700/24px, `#999`

### C. Rich Text Toolbar
- **Layout:** `flex-direction: row`
- **Height:** 40px
- **6 toggle buttons:** Each 40px+ height, border `1px solid #998C5F`, bg transparent, padding `10px 16px`
- **Icons:** 24x24px each (B, I, S, numbered list, link, quote)
- **"Tiêu chuẩn cộng đồng" link:** Right-aligned, Montserrat 16px/700, color `#E46060`
- **First button:** border-radius `8px 0 0 0`
- **Last item:** border-radius `0 8px 0 0`

### D. Text Area
- **Min-height:** 120px, **default height:** ~200px
- **Border:** `1px solid #998C5F` (connected to toolbar — no top border-radius)
- **Border-radius:** `0 0 8px 8px`
- **Background:** `#FFF`
- **Padding-left:** 24px
- **Placeholder:** "Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!"
- **Hint below:** 'Bạn có thể "@ + tên" để nhắc tới đồng nghiệp khác' (Montserrat 16px/700, `#00101A`, letter-spacing 0.5px)

### E. Hashtag Section
- **Label:** "Hashtag *" (22px/700 `#00101A` + asterisk `#CF1322`)
- **"+ Hashtag" button:** border `1px solid #998C5F`, bg `#FFF`, border-radius 8px, padding `4px 8px`
- **Button label:** "Hashtag" (Montserrat 11px/700, `#999`) + "Tối đa 5" note
- **Plus icon:** 24x24px
- **Chips:** Hashtag chips with "x" remove button

### F. Image Upload Section
- **Label:** "Image" (22px/700 `#00101A`)
- **Thumbnail:** 80x80px, border-radius 18px outer, border `1px solid #998C5F`, bg `#FFF`
- **Image inside:** border `1px solid #FFEA9E`, border-radius 4px, object-fit cover
- **Delete button:** 20x20px circle, bg `#D4271D`, positioned top-right of thumbnail
- **"+ Image" button:** Same style as "+ Hashtag" button
- **Max:** 5 images, hide button when full

### G. Anonymous Checkbox
- **Checkbox:** 24x24px, border `1px solid #999`, bg `#FFF`, border-radius 4px
- **Label:** "Gửi lời cám ơn và ghi nhận ẩn danh" (Montserrat 22px/700/28px, `#999`)
- **Gap:** 16px between checkbox and label

### H. Action Buttons
- **Layout:** `flex-direction: row; gap: 16px`

#### H.1 Cancel Button ("Hủy ✕")
- **Border:** `1px solid #998C5F`
- **Background:** `rgba(255,234,158,0.10)`
- **Padding:** `16px 40px`
- **Text:** Montserrat 16px/700/24px, `#00101A`
- **Icon:** 24x24 close icon

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `rgba(255,234,158,0.10)` |
| Hover | background | `rgba(255,234,158,0.40)` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |

#### H.2 Submit Button ("Gửi ▷")
- **Width:** 502px (flex-1)
- **Height:** 60px
- **Background:** `#FFEA9E`
- **Border-radius:** 8px
- **Padding:** 16px
- **Gap:** 8px (text + icon)
- **Text:** Montserrat 22px/700/28px, `#00101A`
- **Icon:** 24x24 send icon

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Hover | background | `#FFE078` |
| Hover | transform | `translateY(-2px)` |
| Focus | outline | `2px solid #FFEA9E` |
| Active | background | `#FFD54F` |
| Disabled | opacity | `0.5` |
| Disabled | cursor | `not-allowed` |

---

## 3. Layout Structure (ASCII)

```
┌────────────────────────────────────────────────────┐ 1440 x 1024
│ ░░░░ Overlay bg:rgba(0,16,26,0.8) ░░░░░░░░░░░░░░░ │
│                                                    │
│       ┌────────────────────────────────┐           │
│       │ MODAL  752px  bg:#FFF8E1       │           │
│       │ r:24  p:40  gap:32             │           │
│       │                                │           │
│       │ "Gửi lời cám ơn..."  (32px)    │           │
│       │         ↕ 32px                 │           │
│       │ Người nhận * [Tìm kiếm    ▼]  │           │
│       │         ↕ 32px                 │           │
│       │ Danh hiệu * [Danh hiệu... ]   │           │
│       │ Ví dụ: ...                     │           │
│       │         ↕ 32px                 │           │
│       │ [B][I][S][≡][🔗][""]  Tiêu...  │           │
│       │ ┌──────────────────────────┐   │           │
│       │ │ Textarea  h:200          │   │           │
│       │ │ placeholder...           │   │           │
│       │ └──────────────────────────┘   │           │
│       │ Bạn có thể "@ + tên"...       │           │
│       │         ↕ 32px                 │           │
│       │ Hashtag * [+ Hashtag Tối đa 5] │           │
│       │         ↕ 32px                 │           │
│       │ Image [📷][📷][📷] [+ Image]   │           │
│       │         ↕ 32px                 │           │
│       │ ☐ Gửi lời cám ơn ẩn danh      │           │
│       │         ↕ 32px                 │           │
│       │ [Hủy ✕]  [    Gửi ▷    ]      │           │
│       │          gap:16                │           │
│       └────────────────────────────────┘           │
└────────────────────────────────────────────────────┘
```

---

## 4. Implementation Mapping

| Figma Node ID | React Component | File Path | Key Tailwind Classes |
|---------------|-----------------|-----------|----------------------|
| `520:11602` | `WriteKudoModal` | `src/components/kudos/write-kudo-modal.tsx` | `fixed inset-0 z-[200]` |
| `520:11647` | Modal container | (inside WriteKudoModal) | `w-full md:w-[752px] bg-[#FFF8E1] rounded-3xl p-10` |
| `I520:11647;520:9873` | `ReceiverSearch` | `src/components/kudos/receiver-search.tsx` | `border border-[#998C5F] rounded-lg` |
| `I520:11647;520:9877` | `RichTextToolbar` | `src/components/kudos/rich-text-toolbar.tsx` | `flex h-10` |
| `I520:11647;520:9886` | `KudoTextArea` | `src/components/kudos/kudo-text-area.tsx` | `border border-[#998C5F] rounded-b-lg` |
| `I520:11647;520:9890` | `HashtagSelector` | `src/components/kudos/hashtag-selector.tsx` | `flex items-center gap-2` |
| `I520:11647;520:9896` | `ImageUploader` | `src/components/kudos/image-uploader.tsx` | `flex items-center gap-4` |
| `I520:11647;520:14099` | Anonymous checkbox | (inside WriteKudoModal) | `flex items-center gap-4` |

---

## 5. Responsive Breakpoints

### Mobile (< 768px)
- Modal: full-width, full-height, padding 20px
- Title: 24px
- Section labels: 18px
- Submit button: full width, stacked below cancel
- Image thumbnails: 60x60px

### Tablet+ (>= 768px)
- Modal: 752px, centered, max-height 90vh, padding 40px
- Pixel-perfect match with Figma

---

## 6. Assets Required

| Asset | Format | Size |
|-------|--------|------|
| Send icon (▷) | SVG | 24x24 |
| Close icon (✕) | SVG | 24x24 |
| Bold icon (B) | SVG | 24x24 |
| Italic icon (I) | SVG | 24x24 |
| Strikethrough icon (S) | SVG | 24x24 |
| Numbered list icon | SVG | 24x24 |
| Link icon | SVG | 24x24 |
| Quote icon ("") | SVG | 24x24 |
| Plus icon (+) | SVG | 24x24 |
| Chevron down icon | SVG | 24x24 |
| Delete circle icon (x) | SVG | 20x20 |
