---
name: UI Development Expert
description: Guidelines for building consistent and high-quality UI using Hero UI and pre-existing components.
---

# UI Development Expert Skill

You are an expert in building modern, responsive, and visually stunning user interfaces. This project uses **Hero UI** (formerly NextUI) as its primary UI framework.

## Core Mandates

1.  **Framework**: ALWAYS use **Hero UI** packages (`@heroui/*`) for UI components.
2.  **Custom Components**: ALWAYS prioritize using the project's pre-existing, styled wrapper components located in `@/components/`. Do NOT re-implement these or use raw Hero UI components if a wrapper exists.
3.  **Aesthetics**: Follow the "Web Application Development" instructions for visual excellence (gradients, micro-animations, premium feel).

## Available Custom Components

| Component | Path | Description |
| :--- | :--- | :--- |
| `MyButton` | `@/components/MyButton` | Primary button with preset colors and loading states. |
| `MyInput` | `@/components/MyInput` | Input field with label placement and password visibility toggle. |
| `MySelect` | `@/components/MySelect` | Styled select component with custom option rendering. |
| `MyTable` | `@/components/MyTable` | Data table with mobile-responsive view and sorting. |
| `MyModal` | `@/components/MyModal` | Global modal manager (use with `useModal` hook). |
| `MyCheckbox` | `@/components/MyCheckbox` | Styled checkbox. |
| `Icons` | `@/components/Icons` | A collection of custom SVG icons (e.g., `Sparkles`, `PenNib`, `Eye`). |

## Implementation Guidelines

### 1. Using Buttons
Always use `MyButton` for consistency. it handles loading states and specific brand colors.

```tsx
import MyButton from '@/components/MyButton'

// Usage
<MyButton color="primary" isLoading={loading} onClick={handleClick}>
  Submit
</MyButton>
```

### 2. Form Inputs
Use `MyInput` which wraps Hero UI's Input but with project-specific styling and features.

```tsx
import MyInput from '@/components/MyInput'

<MyInput 
  label="Email" 
  placeholder="Enter your email" 
  type="email" 
/>
```

### 3. Data Presentation
Use `MyTable` for lists. It automatically switches to a card-based layout on mobile.

```tsx
import MyTable from '@/components/MyTable'

<MyTable
  columns={columns}
  items={data}
  renderCell={(item, columnKey) => {
    // cell rendering logic
  }}
  renderMobileItem={(item) => (
    // mobile card rendering logic
  )}
/>
```

### 4. Icons
Prefer using the custom icons from `@/components/Icons`.

```tsx
import { SparklesIcon } from '@/components/Icons/Sparkles'

<SparklesIcon className="w-5 h-5 text-warning" />
```

## Best Practices

- **Tailwind CSS**: Use `cn()` utility from `@/utils/tailwind` for class merging.
- **Responsiveness**: Always test and implement for mobile-first.
- **Micro-interactions**: Use `framer-motion` (already in dependencies) for subtle animations if needed.
- **Theme**: Stick to the light theme migration guidelines (standard white/gray backgrounds with brand accent colors).
