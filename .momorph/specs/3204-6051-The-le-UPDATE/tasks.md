# Tasks: Thể lệ UPDATE

**Frame:** `3204:6051` — Thể lệ UPDATE
**Spec:** `spec.md` | **Plan:** `plan.md` | **Design:** `design-style.md`
**Created:** 2026-03-16

---

## Summary

| Metric | Value |
|---|---|
| Total Tasks | 7 |
| Phase 1 (Setup) | 3 tasks |
| Phase 2 (US1+US2+US3 — Modal) | 3 tasks |
| Phase 3 (Polish) | 1 task |
| Parallel Opportunities | T002+T003 parallel in Phase 1 |

---

## Phase 1: Setup — Assets, Types, i18n

> **Goal:** Download badge icon assets, add types and translations.

- [x] T001 Download 6 icon badge images from Figma frame `3204:6051` to `public/images/kudos/` using MCP `get_media_files`: badge-revival.png, badge-touch-of-light.png, badge-stay-gold.png, badge-flow-to-horizon.png, badge-beyond-the-boundary.png, badge-root-further.png (64x64 circles)
- [x] T002 [P] Add `RulesTranslations` interface to `src/types/kudos.ts` — fields: title, sectionReceiverTitle, sectionReceiverIntro, badgeTiers (array of {name, threshold, description}), sectionSenderTitle, sectionSenderIntro, sectionSenderSecretBox, iconBadgeNames (6 strings), sectionSenderCollect, sectionKudosQuocDanTitle, sectionKudosQuocDanBody, buttonClose, buttonWriteKudos
- [x] T003 [P] Add `getRulesTranslations()` to `src/utils/i18n.ts` — vi/en static content for all 3 sections: (1) Người nhận Kudos with 4 hero badge tiers (New Hero 1-4, Rising Hero 5-9, Super Hero 10-20, Legend Hero 20+), (2) Người gửi Kudos with Secret Box rules + 6 icon names, (3) Kudos Quốc Dân description. Include heart emoji ❤️ in body text where design shows it.

**Checkpoint:** Types importable. Translations render correctly. 6 badge images in `public/images/kudos/`.

---

## Phase 2: US1+US2+US3 — Rules Modal

> **Goal:** Build modal panel with static content, open/close logic, and "Viết KUDOS" CTA.
> **Independent test:** Click "Thể lệ" from Widget → modal slides in from right → content scrollable → "Đóng" closes → "Viết KUDOS" opens placeholder.

- [x] T004 [US1] Create `src/components/kudos/rules-content.tsx` — Client Component (`"use client"`), props: `translations: RulesTranslations`. Render 3 sections: (1) Title "Thể lệ" (Montserrat 45px/700 gold `#FFEA9E`), (2) Section "NGƯỜI NHẬN KUDOS" heading (22px/700 gold) + intro text (16px/700 white justified) + 4 hero badge rows (pill ~126x22px border `0.579px solid #FFEA9E` border-radius 55px + threshold text 16px + description text 14px), (3) Section "NGƯỜI GỬI KUDOS" heading + body + 6 icon grid (2x3, each 64x64 circle border `2px solid #FFF`, label 11-12px/700 centered), (4) Sub-heading "KUDOS QUỐC DÂN" (24px/700 gold) + body. All per design-style.md.
- [x] T005 [US1+US2+US3] Create `src/components/kudos/rules-modal.tsx` — Client Component (`"use client"`), props: `isOpen: boolean`, `onClose: () => void`, `translations: RulesTranslations`. Overlay: `fixed inset-0 z-[200] bg-[rgba(0,16,26,0.6)]`, click → `onClose`. Panel: `fixed right-0 top-0 w-full md:w-[553px] h-full bg-[#00070C]`, padding `24px 40px 40px 40px` (mobile: `16px 20px 20px 20px`), slide-in animation `translateX(100%) → translateX(0)` 300ms ease-out. Content area: `overflow-y-auto flex-1`. Footer sticky: 2 buttons — "✕ Đóng" (bg `rgba(255,234,158,0.10)`, border `1px solid #998C5F`, rounded, 16px/700 white) + "✏️ Viết KUDOS" (bg `#FFEA9E`, rounded, flex-1, 16px/700 `#00101A`, hover `#FFE078`). Close on Escape. `role="dialog"`, `aria-modal="true"`, `aria-label="Thể lệ"`. Focus trap inside modal. Render `<RulesContent>` inside scrollable area.
- [x] T006 [US1+US2+US3] Wire RulesModal to Widget in `src/components/widget-button.tsx` — Replace `<Link href="/rules">` with `<button onClick={() => setShowRules(true)}>`. Add `const [showRules, setShowRules] = useState(false)`. Import and render `<RulesModal isOpen={showRules} onClose={() => setShowRules(false)} translations={rulesTranslations} />`. Get `rulesTranslations` from `getRulesTranslations(locale)` — need to pass locale as prop or read from cookie client-side.

**Checkpoint:** Click "Thể lệ" on Widget → modal slides in from right with all 3 sections. Scroll works. "Đóng" / Escape / overlay click closes. "Viết KUDOS" shows placeholder alert. Responsive: full-width on mobile.

---

## Phase 3: Polish

> **Goal:** Verify responsive, accessibility, keyboard navigation.

- [x] T007 Polish — Verify: (1) Responsive at 375px (full-width panel) and 768px+ (553px panel), (2) Keyboard: Tab through content → Đóng → Viết KUDOS, Escape closes, (3) Focus trap: Tab doesn't leave modal, (4) Scroll: content scrolls, footer stays fixed, (5) Animation: smooth slide-in/out, (6) Multiple modals: closing rules then opening Viết KUDOS works sequentially (not stacked).

**Checkpoint:** All breakpoints tested. Keyboard navigation works. Focus trapped. Animation smooth.

---

## Dependencies & Execution Order

```
Phase 1 (Setup: T001-T003)
  └──▶ Phase 2 (Modal: T004-T006)
         └──▶ Phase 3 (Polish: T007)
```

### Parallel Opportunities
- Phase 1: T002 + T003 can run in parallel (different files)
- Phase 2: T004 → T005 → T006 (sequential — each depends on previous)

---

## Implementation Strategy

### MVP (All tasks)
- Feature nhỏ, 7 tasks, tất cả cùng priority P1
- Implement tuần tự Phase 1 → 2 → 3
- Không cần chia MVP/incremental

### Key Constraints
- 2 Client Components (rules-modal.tsx, rules-content.tsx)
- Không cần API/DB — nội dung hoàn toàn static/i18n
- Reuse existing icons: `icon-write.svg` (pen), cần thêm close (X) icon
- Widget button refactor nhỏ: `<Link>` → `<button>` + state
