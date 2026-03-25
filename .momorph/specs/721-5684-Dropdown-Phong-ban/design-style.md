# Dropdown Phòng ban — Design Style Document

**Frame ID:** `721:5684`
**Frame Name:** Dropdown Phòng ban
**Dimensions:** ~101 x 348px (dropdown panel, variable height)
**Constitution:** v1.0.0

---

## 1. Design Tokens

Cùng design system với Dropdown Hashtag filter (`721:5580`). Chỉ khác kích thước và data source.

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-dropdown` | `#00070C` | Container background |
| `--color-bg-selected` | `rgba(255,234,158,0.10)` | Selected item background |
| `--color-bg-hover` | `rgba(255,234,158,0.10)` | Hover state |
| `--color-text-item` | `#FFFFFF` | Item text |
| `--color-border-dropdown` | `#998C5F` | Container border |

### Typography

| Token | Font | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|-------|------|------|--------|-------------|----------------|-------|-------|
| `--text-department` | Montserrat | 16px | 700 | 24px | 0.5px | `#FFFFFF` | Department name |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-container-padding` | 6px | Container padding |
| `--sp-item-padding` | 16px | Item padding |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-dropdown` | 8px | Container |
| `--radius-item` | 4px | Item hover/selected |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-selected` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Selected item text glow |

---

## 2. Component Style Details

### Dropdown Container (`563:8027`)
- **Width:** auto (fit content, min ~101px)
- **Max-height:** 350px (scrollable)
- **Background:** `#00070C`
- **Border:** `1px solid #998C5F`
- **Border-radius:** 8px
- **Padding:** 6px
- **Overflow-y:** auto (scroll when > max-height)
- **Position:** absolute, below trigger button, right-aligned
- **Z-index:** 50

### Department Item — Default
- **Height:** 56px
- **Width:** 100%
- **Padding:** 16px
- **Border-radius:** 4px
- **Background:** transparent
- **Text:** Montserrat 16px/700/24px, letter-spacing 0.5px, `#FFFFFF`, text-align center

### Department Item — Selected
- **Background:** `rgba(255,234,158,0.10)`
- **Text-shadow:** `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `transparent` |
| Hover | background | `rgba(255,234,158,0.10)` |
| Selected | background | `rgba(255,234,158,0.10)` |
| Selected | text-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |
| Focus | outline | `2px solid rgba(255,255,255,0.5)` |

---

## 3. Implementation Mapping

| Figma Node ID | React Component | File Path | Key Tailwind Classes |
|---------------|-----------------|-----------|----------------------|
| `563:8027` | `DepartmentFilter` (dropdown panel) | `src/components/kudos/department-filter.tsx` | `bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5` |

> **Note:** `DepartmentFilter` component already exists. This spec documents visual specs for pixel-perfect matching. Same visual pattern as Hashtag filter.
