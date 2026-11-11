---
name: icon-image
description: Use icons from components/Icons/ only, reference images from config/images.ts
---

# Icon-Image Skill

## Rules

- **Use icons from `components/Icons/` only** — never inline a raw `<svg>` in a page or component.
- Every icon is a **named** export following the `XxxIcon` pattern and accepts standard SVG props.
- For images, **use `config/images.ts`** — never hardcode an image path. Remote images (Unsplash, Cloudinary)
  used as seed content live in `constants/demoData.ts`.
- Render images with `MyImage`, not a bare `<img>`.

## Importing

```tsx
import { SearchIcon } from '@/components/Icons/Search'
import { TrashIcon } from '@/components/Icons/Trash'
import { AcademicIcon } from '@/components/Icons/Academic'

import { images } from '@/config/images'
import MyImage from '@/components/MyImage'

<SearchIcon className='size-5 text-primary' />
<MyImage noAnimation alt='logo' className='!relative !h-10 !w-auto' src={images.logo} />
```

## Available icons

`Academic`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Award`, `Bell`, `BookOpen`, `Brain`, `Calendar`,
`ChartBar`, `Chat`, `CheckBadge`, `CheckCircle`, `ChevronLeft`, `ChevronRight`, `Class`, `Clipboard`, `Clock`,
`Close`, `Contact`, `Copy`, `Download`, `Eye`, `EyeSlash`, `Facebook`, `Filter`, `Heart`, `Home`,
`IconRegister`, `Inbox`, `Info`, `LightBulb`, `Location`, `LogOut`, `Mail`, `Menu`, `Money`, `Payment`,
`PenNib`, `Pencil`, `Phone`, `Photo`, `Plus`, `Quote`, `Reply`, `Search`, `Send`, `Setting`, `Shield`,
`Sparkles`, `Squares`, `Star`, `Trash`, `TrendUp`, `User`, `UserCircle`, `UserPlus`, `Users`, `XMark`,
`Youtube`.

If something is genuinely missing, ask first (rule 4), then add it to `components/Icons/` using the same
template: 24×24 viewBox, `fill='none'`, `stroke='currentColor'`, `strokeWidth={1.5}`, `className={cn('size-5',
props.className)}`.

## What NOT to do

```tsx
// ❌ hardcoded path
<img src='/logo.png' alt='Logo' />

// ❌ inline svg instead of an existing icon
<svg viewBox='0 0 24 24'>…</svg>

// ❌ fixed palette color on a themed icon
<SearchIcon className='text-gray-400' />   // use text-base-content/40
```
