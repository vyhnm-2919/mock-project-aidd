# Dropdown Hashtag Filter — Design Style Document

**Frame ID:** `721:5580`
**Frame Name:** Dropdown Hashtag filter
**Dimensions:** 215 x 410px (dropdown panel)
**Constitution:** v1.0.0

---

## 1. Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-dropdown` | `#00070C` | Dropdown container background |
| `--color-bg-selected` | `rgba(255,234,158,0.10)` | Selected tag item background (10% gold) |
| `--color-bg-hover` | `rgba(255,234,158,0.10)` | Hover state background |
| `--color-text-item` | `#FFFFFF` | Tag text color |
| `--color-border-dropdown` | `#998C5F` | Container border |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-tag` | Montserrat | 16px | 700 | 24px | 0.5px | `#FFFFFF` | Hashtag text |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-container-padding` | 6px | Dropdown container padding |
| `--sp-item-padding` | 16px | Tag item padding (all sides) |
| `--sp-item-gap` | 4px | Gap within tag row |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-dropdown` | 8px | Dropdown container |
| `--radius-item` | 4px | Tag item hover/selected |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-selected` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Selected tag text glow |

---

## 2. Component Style Details

### Dropdown Container (`563:8026`)
- **Width:** min 215px (auto based on content)
- **Max-height:** 410px (scrollable if exceeds)
- **Background:** `#00070C`
- **Border:** `1px solid #998C5F`
- **Border-radius:** 8px
- **Padding:** 6px
- **Layout:** `flex-direction: column; align-items: flex-start`
- **Overflow-y:** auto
- **Position:** absolute, below trigger button
- **Z-index:** 50

### Tag Item — Default
- **Height:** 56px
- **Width:** 100%
- **Padding:** 16px
- **Border-radius:** 4px
- **Background:** transparent
- **Text:** Montserrat 16px/700/24px, letter-spacing 0.5px, `#FFFFFF`, text-align center
- **Cursor:** pointer

### Tag Item — Selected (`186:1496`)
- **Background:** `rgba(255,234,158,0.10)`
- **Border-radius:** 4px
- **Text-shadow:** `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` (gold glow)

### Tag Item — Hover
- **Background:** `rgba(255,234,158,0.10)`

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `transparent` |
| Hover | background | `rgba(255,234,158,0.10)` |
| Selected | background | `rgba(255,234,158,0.10)` |
| Selected | text-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |

---

## 3. Layout Structure (ASCII)

```
┌─────────────────────┐ 215 x auto (max 410)
│ bg:#00070C          │
│ border:#998C5F r:8  │
│ p:6                 │
│                     │
│ ┌─────────────────┐ │
│ │ #Dedicated ✨   │ │ ← selected (gold bg + glow)
│ │ h:56 p:16 r:4   │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ #Inspring       │ │ ← default
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ #Dedicated      │ │
│ └─────────────────┘ │
│ │ ...             │ │
│ └─────────────────┘ │
└─────────────────────┘
```

---

## 4. Implementation Mapping

| Figma Node ID | React Component | File Path | Key Tailwind Classes |
|---------------|-----------------|-----------|----------------------|
| `563:8026` | `HashtagFilter` (dropdown panel) | `src/components/kudos/hashtag-filter.tsx` | `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5` |
| `186:1496` | Tag item (selected) | (inside HashtagFilter) | `bg-[#FFEA9E]/10 rounded [text-shadow:...]` |
| `186:1433` | Tag item (default) | (inside HashtagFilter) | `rounded hover:bg-[#FFEA9E]/10` |

> **Note:** `HashtagFilter` component already exists at `src/components/kudos/hashtag-filter.tsx` — this spec documents the dropdown panel visual specs for pixel-perfect matching.

---

## 5. Responsive Breakpoints

- Mobile: same dimensions, positioned relative to trigger button
- Dropdown may need repositioning if near screen edge
