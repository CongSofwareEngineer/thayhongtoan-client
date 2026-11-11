---
name: component
description: Always reuse existing components from the components/ folder, avoid creating new ones
---

# Component Skill

## Rules

- **Always check `components/` first** before writing any new UI.
- Reuse the existing primitives and layout blocks; do not create a new component when one can be used or extended.
- Everything is daisyUI 5 — see skill `daisyui` before writing markup.

## UI primitives

| Component | Path | Notes |
|---|---|---|
| `MyButton` | `components/MyButton/` | `color`, `variant` (`solid`/`outline`/`ghost`/`soft`/`link`), `size`, `isLoading`, `startContent` |
| `MyInput` | `components/MyInput/` | `label`, `isRequired`, `errorMessage`, `startContent`, `onValueChange`; `type='password'` adds the eye toggle |
| `MyInputArea` | `components/MyInputArea/` | `minRows`, same label/error API |
| `MyInputNumber` | `components/MyInputNumber/` | numeric-only, `formatComma`, `endContent`, `onChange(value: number)` |
| `MySelect` | `components/MySelect/` | `options: {key,label}[]`, `placeholder`, `onValueChange` |
| `MyCheckbox` | `components/MyCheckbox/` | `isSelected`, `onValueChange` |
| `MyForm` | `components/MyForm/` | native `<form>`; `onSubmit` receives the values object |
| `MyTable` | `components/MyTable/` | `columns`, `items`, `renderCell`, optional `renderMobileItem`, sorting, load-more |
| `MyModal` / `MyDrawer` | rendered by `ClientRender` | never mount these yourself — use `useModalDrawer` |
| `MyDropdown` | `components/MyDropdown/` | `options`, `onAction(key)` |
| `MyImage` | `components/MyImage/` | next/image with `fill`; parent needs `relative` + a height |

## Layout blocks

| Component | Use |
|---|---|
| `Section`, `SectionHeading` | public page section with the site max-width and gutters |
| `PageHeader` | hero band + breadcrumb at the top of an inner public page |
| `AdminPage`, `AdminCard` | admin screen frame and content cards |
| `StatCard` | admin KPI tile with icon and trend |
| `Charts` (`BarChart`, `LineChart`, `DonutChart`, `ProgressList`, `ChartCard`) | hand-rolled SVG charts, no dependency |
| `ClassCard` | class tile used on home, class list and related lists |
| `CommentSection` | parent reviews: rating summary, submit form, teacher replies |
| `StarRating` | read-only rating, or an input when `onChange` is passed |
| `EmptyState` | "no data" block |
| `ConfirmModal` + `useConfirm` | destructive-action confirmation |
| `FloatingContact` | fixed Zalo / Facebook / phone shortcuts |

## Icons

All icons live in `components/Icons/` as named exports (`export const XxxIcon`). Never create a new icon file or
inline an SVG without checking the folder first — see skill `icon-image`.
