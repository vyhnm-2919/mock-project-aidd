# Floating Action Button - Design Style Document

**Frame ID:** `313:9137` (collapsed), `313:9139` (expanded)
**Frame Name:** Floating Action Button
**Dimensions:** Component (not full page)
**Constitution:** v1.0.0 (P4: Responsive, mobile-first)
**Status:** reviewed

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--fab-bg-primary` | `#FFEA9E` | Background nút chính và action buttons `rgba(255,234,158,1)` |
| `--fab-bg-close` | `#D4271D` | Background nút đóng `rgba(212,39,29,1)` |
| `--fab-text-primary` | `#00101A` | Text trên nền vàng `rgba(0,16,26,1)` |
| `--fab-text-close` | `#FFFFFF` | Icon "×" trên nền đỏ |
| `--fab-shadow` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Bóng FAB collapsed |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--fab-text-separator` | Montserrat | 24px | 700 | 32px | 0px | #00101A | Dấu "/" ngăn cách |
| `--fab-text-label` | Montserrat | 24px | 700 | 32px | 0px | #00101A | Label "Thể lệ", "Viết KUDOS" |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--fab-padding` | 16px | Padding bên trong các nút |
| `--fab-gap-inner` | 8px | Khoảng cách icon <-> text bên trong nút |
| `--fab-gap-buttons` | 20px | Khoảng cách giữa các nút (expanded) |
| `--fab-offset-right-collapsed` | 143px | Collapsed: khoảng cách từ cạnh phải viewport (1440 - 1297) |
| `--fab-offset-right-expanded` | 138px | Expanded container: khoảng cách từ cạnh phải viewport (1440 - 1302) |
| `--fab-offset-bottom` | 120px | Khoảng cách từ cạnh dưới viewport (1024 - 904), cả 2 state |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--fab-radius-collapsed` | 100px | Pill shape cho collapsed state |
| `--fab-radius-expanded-btn` | 4px | Bo góc cho expanded action buttons |
| `--fab-radius-close` | 100px | Hình tròn cho nút đóng |

---

## 2. Component Style Details

### 2.1 FAB Collapsed State (Node: `313:9138`)

**Container (outer wrapper `I313:9138;214:3839`):**
- Width: 106px, Height: 64px
- Background: `#FFEA9E`
- Border-radius: 100px (pill shape)
- Padding: 16px
- Box-shadow: `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`
- Display: flex, flex-direction: row, align-items: center, gap: 8px
- Position: fixed, bottom-right corner
- Cursor: pointer

**Inner Content (Frame `I313:9138;214:3839;186:1935`):**
- Width: 42px, Height: 32px
- Display: flex, flex-direction: row, align-items: center, gap: 8px
- Children:
  - Pen icon (`MM_MEDIA_Pen`): 24x24px
  - "/" text: Montserrat 24px/700, color #00101A, text-align center, width 10px

**SAA Logo Icon (`I313:9138;214:3839;186:1766`):**
- Width: 24px, Height: 24px (inner group 20x18px)

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Default | box-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |
| Hover | background | `#FFE078` *(predicted - slightly darker yellow)* |
| Hover | transform | `scale(1.05)` *(predicted)* |
| Active | background | `#FFD54F` *(predicted)* |
| Focus | outline | `2px solid #FFEA9E`, offset 2px |

---

### 2.2 FAB Expanded State (Node: `313:9140`)

**Container:**
- Width: 214px (hug content), Height: 224px (hug content)
- Display: flex, flex-direction: column, align-items: flex-end, gap: 20px
- Position: fixed, bottom-right. Right edge at 138px from viewport right (5px difference from collapsed state's 143px due to wider container with flex-end alignment)
- Bottom edge matches collapsed state: 120px from viewport bottom

#### 2.2.1 Button "Thể lệ" (Node: `I313:9140;214:3799`)

- Width: 149px, Height: 64px
- Background: `#FFEA9E`
- Border-radius: 4px
- Padding: 16px
- Display: flex, flex-direction: row, align-items: center, gap: 8px
- Cursor: pointer

**Inner Content (Frame `I313:9140;214:3799;186:1935`):**
- Width: 108px, Height: 32px
- Display: flex, align-items: center, gap: 8px
- SAA Logo icon (`MM_MEDIA_LOGO`): 24x24px (inner 20x18px)
- Text "Thể lệ": Montserrat 24px/700/32px, color #00101A, width 76px, text-align center

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E` |
| Hover | background | `#FFE078` *(predicted)* |
| Hover | box-shadow | `0 2px 8px rgba(0,0,0,0.15)` *(predicted)* |
| Active | transform | `scale(0.98)` *(predicted)* |
| Focus | outline | `2px solid #FFEA9E`, offset 2px |

#### 2.2.2 Button "Viết KUDOS" (Node: `I313:9140;214:3732`)

- Width: 214px, Height: 64px
- Background: `#FFEA9E`
- Border-radius: 4px
- Padding: 16px
- Display: flex, flex-direction: row, align-items: center, gap: 8px
- Cursor: pointer

**Inner Content (Frame `I313:9140;214:3732;186:1935`):**
- Width: 182px, Height: 32px
- Display: flex, align-items: center, gap: 8px
- Pen icon (`MM_MEDIA_Pen`): 24x24px
- Text "Viết KUDOS": Montserrat 24px/700/32px, color #00101A, width 150px, text-align center

**States:** Same as "Thể lệ" button above.

#### 2.2.3 Button Close (Node: `I313:9140;214:3827`)

- Width: 56px, Height: 56px
- Background: `#D4271D` (red)
- Border-radius: 100px (circle)
- Padding: 16px
- Display: flex, align-items: center, justify-content: center
- Cursor: pointer

**Inner Content:**
- Close icon (`MM_MEDIA_Close`): 24x24px, color white

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#D4271D` |
| Hover | background | `#B91C14` *(predicted - darker red)* |
| Active | transform | `scale(0.95)` *(predicted)* |
| Focus | outline | `2px solid #D4271D`, offset 2px |

---

## 3. Layout Structure

### Collapsed State
```
┌──────────────────────────── Viewport (1440x1024) ─────────┐
│                                                            │
│                                                            │
│                                                            │
│                                              ┌──────────┐  │
│                                              │ ✏ / 🔥   │  │ ← 106x64, pill
│                                              └──────────┘  │
│                                              ↑ 120px from  │
└───────────────────────────── 143px from right─┘   bottom   │
```

### Expanded State
```
┌──────────────────────────── Viewport (1440x1024) ─────────┐
│                                                            │
│                                       ┌────────────────┐   │
│                                       │ 🔥  Thể lệ    │   │ ← 149x64, r=4px
│                                       └────────────────┘   │
│                                              gap: 20px     │
│                                  ┌─────────────────────┐   │
│                                  │ ✏  Viết KUDOS       │   │ ← 214x64, r=4px
│                                  └─────────────────────┘   │
│                                              gap: 20px     │
│                                                ┌──────┐    │
│                                                │  ✕   │    │ ← 56x56, circle
│                                                └──────┘    │
│                                        aligned with close ─┘
└────────────────────────────────────────────────────────────┘
  Note: Close button bottom-right ≈ collapsed FAB position (5px horizontal offset)
  Bottom Y identical (120px from bottom), right edge 138px vs 143px from right
  All buttons right-aligned (align-items: flex-end)
```

---

## 4. Animation (Predicted)

### Collapsed -> Expanded
- Duration: 200-300ms
- Easing: ease-out
- Effect: Collapsed pill fades out, action buttons slide up from bottom with stagger
- Action buttons appear with opacity 0→1 and translateY(20px→0)
- Stagger delay: ~50ms between each button

### Expanded -> Collapsed
- Duration: 150-200ms
- Easing: ease-in
- Effect: Action buttons slide down and fade out
- Collapsed pill fades back in at close button position

---

## 5. Implementation Mapping

| Figma Node | Tailwind Classes | React Component |
|------------|-----------------|-----------------|
| `313:9138` (collapsed) | `flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] cursor-pointer` | `<WidgetButton>` (collapsed state) |
| `313:9140` (expanded container) | `flex flex-col items-end gap-5` | `<WidgetButton>` (expanded state) |
| `I313:9140;214:3799` (Thể lệ) | `flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded hover:bg-[#FFE078] transition-all cursor-pointer` | Internal to `<WidgetButton>` |
| `I313:9140;214:3732` (Viết KUDOS) | `flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded hover:bg-[#FFE078] transition-all cursor-pointer` | Internal to `<WidgetButton>` |
| `I313:9140;214:3827` (Close) | `flex items-center justify-center w-14 h-14 bg-[#D4271D] rounded-full hover:bg-[#B91C14] transition-all cursor-pointer` | Internal to `<WidgetButton>` |
| Fixed wrapper | `fixed bottom-8 right-5 z-[60]` (responsive: `xl:bottom-[120px] xl:right-[143px]`) | `<WidgetButton>` wrapper div |

**Position strategy:** Wrapper anchored at collapsed FAB position (right: 143px). Expanded container extends leftward from right edge. The 5px right offset difference (138px vs 143px) is negligible — use collapsed position as anchor for both states.

**File:** `src/components/widget-button.tsx` (existing, needs upgrade)

---

## 6. Responsive Breakpoints

| Breakpoint | Position | Size |
|------------|----------|------|
| Mobile (< 768px) | `right-4 bottom-4` (16px) | Full size, touch-friendly |
| Tablet (768-1023px) | `right-6 bottom-6` (24px) | Full size |
| Desktop (1024-1439px) | `right-8 bottom-8` (32px) | Full size |
| XL (>= 1440px) | `right-[143px] bottom-[120px]` | Full size, matches Figma |

---

## 7. Assets Required

| Asset | Figma Component | Component ID | Format | Size | Path | Status |
|-------|----------------|-------------|--------|------|------|--------|
| Pen icon | `MM_MEDIA_Pen` | `214:3812` (set: `178:1020`) | SVG | 24x24 | `/images/icons/pen.svg` | ✅ Exists |
| SAA Logo icon | `MM_MEDIA_LOGO` | `214:3752` (set: `178:1020`) | SVG | 24x24 | `/images/icons/saa-icon.svg` | ✅ Exists |
| Close (×) icon | `MM_MEDIA_Close` | `214:3851` (set: `178:1020`) | SVG | 24x24 | `/images/icons/close.svg` | ❌ Needs download from Figma or implement as inline SVG |

**Recommendation for Close icon:** Use inline SVG (simple × shape) to avoid an extra network request. Example: `<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`

### Reference Screenshots

| State | Frame ID | URL |
|-------|----------|-----|
| Collapsed | `313:9137` | `https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/313:9137/33b061b4f815401edd69d316bd636c65.png` |
| Expanded | `313:9139` | `https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/313:9139/15801186ffe7c4fb8d845c238680b3ae.png` |
