# Floating Action Button (Expanded) - Design Style Document

**Frame ID:** `313:9139`
**Frame Name:** Floating Action Button - phím nổi chức năng 2
**Dimensions:** 1440x1024 (viewport), component area 214x224
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)
**Status:** reviewed
**Related:** `313:9137` (collapsed state design-style)

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--fab-bg-primary` | `#FFEA9E` | Background cho "Thể lệ" và "Viết KUDOS" buttons `rgba(255,234,158,1)` |
| `--fab-bg-close` | `#D4271D` | Background nút đóng `rgba(212,39,29,1)` |
| `--fab-text-primary` | `#00101A` | Text labels trên nền vàng `rgba(0,16,26,1)` |
| `--fab-icon-close` | `#FFFFFF` | Icon "×" trên nền đỏ |
| `--fab-bg-hover` | `#FFE078` | Hover state cho action buttons *(predicted)* |
| `--fab-bg-close-hover` | `#B91C14` | Hover state cho close button *(predicted)* |
| `--page-bg` | `#00101A` | Page background `rgba(0,16,26,1)` |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--fab-text-label` | Montserrat | 24px | 700 (Bold) | 32px | 0px | `#00101A` | Labels: "Thể lệ", "Viết KUDOS" |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--fab-padding` | 16px | Padding bên trong tất cả nút (top/right/bottom/left) |
| `--fab-gap-inner` | 8px | Khoảng cách giữa icon và text bên trong mỗi nút |
| `--fab-gap-buttons` | 20px | Khoảng cách giữa 3 nút trong container |
| `--fab-offset-right` | 138px | Khoảng cách container right edge đến viewport right (1440 - 1302) |
| `--fab-offset-bottom` | 120px | Khoảng cách container bottom đến viewport bottom (1024 - 904) |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--fab-radius-action` | 4px | Bo góc cho "Thể lệ" và "Viết KUDOS" buttons |
| `--fab-radius-close` | 100px | Hình tròn cho nút đóng (56/2 = 28, dùng 100px = full circle) |

---

## 2. Component Style Details

### 2.1 Expanded Container (Node: `313:9140`)

**Figma Name:** `Widget Button`
**Component ID:** `214:3909` (componentSet: `214:3916`)

| Property | Value |
|----------|-------|
| Width | 214px (hug content) |
| Height | 224px (hug content) |
| Display | flex |
| Flex Direction | column |
| Align Items | flex-end |
| Gap | 20px |
| Position | fixed |
| Right | 138px from viewport right in Figma; **implemented as 143px** (see note) |
| Bottom | 120px from viewport bottom (at xl breakpoint) |

**Position in viewport (Figma raw):**
- Start X: 1088, End X: 1302 → right edge at 138px from 1440
- Start Y: 680, End Y: 904 → bottom edge at 120px from 1024

**Implementation note:** The expanded container's Figma right offset (138px) differs by 5px from the collapsed FAB (143px). The implementation uses **143px for both states** (collapsed anchor position) to avoid shifting when toggling. This 5px difference is absorbed by the flex-end alignment within the container. See Section 6 for responsive values.

---

### 2.2 Button "Thể lệ" (Node: `I313:9140;214:3799`)

**Figma Name:** `A_Button thể lệ`
**Component ID:** `186:1567` (componentSet: `186:1426`)

| Property | Value |
|----------|-------|
| Width | 149px (Figma hug-content; implementation uses natural flex width ~140px) |
| Height | 64px |
| Background | `#FFEA9E` `rgba(255,234,158,1)` |
| Border Radius | 4px |
| Padding | 16px (all sides; Figma position data suggests right padding may be ~25px, but implementation uses uniform 16px — visually acceptable) |
| Display | flex |
| Flex Direction | row |
| Align Items | center |
| Gap | 8px |
| Cursor | pointer |

**Inner Frame (`I313:9140;214:3799;186:1935`):**
- Width: 108px, Height: 32px
- Display: flex, align-items: center, gap: 8px

**Children:**

| Element | Node ID | Size | Details |
|---------|---------|------|---------|
| SAA Logo Icon | `I313:9140;214:3799;186:1763` | 24x24px | Instance `MM_MEDIA_LOGO` (componentId: `214:3752`), inner group 20x18px |
| Text "Thể lệ" | `I313:9140;214:3799;186:1568` | 76x32px | Montserrat 24px/700/32px, color `#00101A`, text-align center |

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Hover | background | `#FFE078` *(predicted)* |
| Active | transform | `scale(0.98)` *(predicted)* |
| Focus-visible | outline | `2px solid #FFEA9E`, offset 2px |

---

### 2.3 Button "Viết KUDOS" (Node: `I313:9140;214:3732`)

**Figma Name:** `B_Button viết kudos`
**Component ID:** `186:1567` (componentSet: `186:1426`)

| Property | Value |
|----------|-------|
| Width | 214px |
| Height | 64px |
| Background | `#FFEA9E` `rgba(255,234,158,1)` |
| Border Radius | 4px |
| Padding | 16px (all sides) |
| Display | flex |
| Flex Direction | row |
| Align Items | center |
| Gap | 8px |
| Cursor | pointer |

**Inner Frame (`I313:9140;214:3732;186:1935`):**
- Width: 182px, Height: 32px
- Display: flex, align-items: center, gap: 8px

**Children:**

| Element | Node ID | Size | Details |
|---------|---------|------|---------|
| Pen Icon | `I313:9140;214:3732;186:1763` | 24x24px | Instance `MM_MEDIA_Pen` (componentId: `214:3812`) |
| Text "Viết KUDOS" | `I313:9140;214:3732;186:1568` | 150x32px | Montserrat 24px/700/32px, color `#00101A`, text-align center |

**States:** Same as Button "Thể lệ" (section 2.2)

---

### 2.4 Button Close (Node: `I313:9140;214:3827`)

**Figma Name:** `C_Button huỷ`
**Component ID:** `186:1567` (componentSet: `186:1426`)

| Property | Value |
|----------|-------|
| Width | 56px |
| Height | 56px |
| Background | `#D4271D` `rgba(212,39,29,1)` |
| Border Radius | 100px (circle) |
| Padding | 16px (all sides) |
| Display | flex |
| Align Items | center |
| Justify Content | center *(implied by single centered child)* |
| Cursor | pointer |

**Children:**

| Element | Node ID | Size | Details |
|---------|---------|------|---------|
| Close Icon | `I313:9140;214:3827;186:1766` | 24x24px | Instance `MM_MEDIA_Close` (componentId: `214:3851`), color white |

**Close Icon Implementation:** Inline SVG recommended (simple × shape):
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
```

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#D4271D` |
| Hover | background | `#B91C14` *(predicted — darker red)* |
| Active | transform | `scale(0.95)` *(predicted)* |
| Focus-visible | outline | `2px solid #D4271D`, offset 2px |

---

## 3. Layout Structure

```
┌──────────────────────────── Viewport (1440x1024) ─────────────────┐
│                                                                    │
│                                                                    │
│                                                                    │
│                                                                    │
│                                                                    │
│                                          ┌────────────────┐        │
│                                          │ 🔥  Thể lệ    │        │ ← 149x64, r=4px
│                                          └────────────────┘        │
│                                                 ↕ gap: 20px        │
│                                     ┌─────────────────────┐        │
│                                     │ ✏  Viết KUDOS       │        │ ← 214x64, r=4px
│                                     └─────────────────────┘        │
│                                                 ↕ gap: 20px        │
│                                                   ┌──────┐         │
│                                                   │  ✕   │         │ ← 56x56, circle
│                                                   └──────┘         │
│                                                   ↑                │
│                                         bottom: 120px from edge    │
│                                         right: 138px from edge ────┘
└────────────────────────────────────────────────────────────────────┘

Container: 214x224px, flex-col, items-end
All buttons right-aligned (align-items: flex-end)
Close button right edge aligns with other buttons' right edge
```

### Detailed Measurements

```
Container (214 x 224)
├─ Button "Thể lệ" (149 x 64)
│   ├─ padding: 16px all
│   ├─ [SAA Icon 24x24] ←8px→ [Text "Thể lệ" 76x32]
│   └─ right-aligned within container
│
├─ gap: 20px
│
├─ Button "Viết KUDOS" (214 x 64)
│   ├─ padding: 16px all
│   ├─ [Pen Icon 24x24] ←8px→ [Text "Viết KUDOS" 150x32]
│   └─ full width of container
│
├─ gap: 20px
│
└─ Button Close (56 x 56)
    ├─ padding: 16px all
    ├─ [Close Icon 24x24] centered
    └─ right-aligned within container
```

---

## 4. Animation

### Entry (collapsed → expanded)
- **Strategy:** Both-in-DOM. Expanded container always rendered, visibility controlled via CSS.
- **Duration:** 200ms
- **Easing:** ease-out
- **Properties:**
  - `opacity`: 0 → 1
  - `translateY`: 20px → 0 (slide up from below)
  - `pointer-events`: none → auto
- **Collapsed button** simultaneously:
  - `opacity`: 1 → 0
  - `pointer-events`: auto → none
  - `scale`: 1 → 0.9

### Exit (expanded → collapsed)
- **Duration:** 200ms
- **Easing:** ease-out
- **Properties:** Reverse of entry
  - Expanded: `opacity` 1 → 0, `translateY` 0 → 20px, `pointer-events` auto → none
  - Collapsed: `opacity` 0 → 1, `pointer-events` none → auto, `scale` 0.9 → 1

---

## 5. Implementation Mapping

| Figma Node | CSS / Tailwind Classes | React Element |
|------------|----------------------|---------------|
| `313:9140` (container) | `flex flex-col items-end gap-5 transition-all duration-200 ease-out` | `<div>` inside `<WidgetButton>` |
| `I313:9140;214:3799` (Thể lệ) | `flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded-[4px] hover:bg-[#FFE078] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFEA9E] transition-all cursor-pointer` | `<Link href="/rules">` |
| `I313:9140;214:3732` (Viết KUDOS) | `flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded-[4px] hover:bg-[#FFE078] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFEA9E] transition-all cursor-pointer` | `<Link href="/kudos/write">` |
| `I313:9140;214:3827` (Close) | `flex items-center justify-center w-14 h-14 bg-[#D4271D] rounded-full hover:bg-[#B91C14] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4271D] transition-all cursor-pointer` | `<button>` |
| Text labels | `font-montserrat text-2xl font-bold leading-8 text-[#00101A]` | `<span>` |
| Icons (SAA, Pen) | `w-6 h-6` via `next/image` | `<Image width={24} height={24}>` |
| Close icon | Inline SVG, stroke white, strokeWidth 2 | `<svg>` |
| Visibility toggle | `opacity-100 translate-y-0 pointer-events-auto` (visible) / `opacity-0 translate-y-5 pointer-events-none` (hidden) | Conditional className |

**File:** `src/components/widget-button.tsx`

---

## 6. Responsive Breakpoints

| Breakpoint | Container Position | Button Size |
|------------|-------------------|-------------|
| Mobile (< 768px) | `right-4 bottom-4` (16px) | Unchanged |
| Tablet (768–1023px) | `right-6 bottom-6` (24px) | Unchanged |
| Desktop (1024–1439px) | `right-8 bottom-8` (32px) | Unchanged |
| XL (>= 1440px) | `right-[143px] bottom-[120px]` | Unchanged, matches Figma |

Note: Position uses collapsed FAB anchor point. The 5px right offset difference (138px expanded vs 143px collapsed) is negligible — use collapsed position for both states.

---

## 7. Assets

| Asset | Figma Component | Component ID | Size | Path | Status |
|-------|----------------|-------------|------|------|--------|
| SAA Logo Icon | `MM_MEDIA_LOGO` | `214:3752` (set: `178:1020`) | 24x24 | `/images/icons/saa-icon.svg` | ✅ Exists |
| Pen Icon | `MM_MEDIA_Pen` | `214:3812` (set: `178:1020`) | 24x24 | `/images/icons/pen.svg` | ✅ Exists |
| Close Icon | `MM_MEDIA_Close` | `214:3851` (set: `178:1020`) | 24x24 | Inline SVG | ✅ Implemented |

### Reference Screenshot

| State | Frame ID | MoMorph URL |
|-------|----------|-------------|
| Expanded | `313:9139` | `https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/313:9139/15801186ffe7c4fb8d845c238680b3ae.png` |
