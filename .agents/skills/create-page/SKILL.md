---
name: create-page
description: Create a route in this Next.js App Router project with the project's page.tsx + client.tsx split, reusing existing components and daisyUI styling. Use whenever adding a new route, page, or page UI.
---

# Create Page

## The convention in this repo

Every route is **two files**:

```text
app/(public)/<route>/
├── page.tsx     # server component: metadata only, renders <Screen />
└── client.tsx   # 'use client': the whole screen
```

Admin routes are the same shape under `app/admin/<route>/`.

If the screen grows past ~350 lines, split pieces into a sibling folder:

```text
app/(public)/<route>/
├── page.tsx
├── client.tsx
└── components/
    ├── HeroBlock.tsx
    └── PricingTable.tsx
```

Do **not** put UI inside `page.tsx`, and do **not** put `metadata` inside `client.tsx` (it is a client module and
`metadata` would be ignored).

## 1. `page.tsx`

Server component. Exports `metadata` (or `generateMetadata` for dynamic routes) and nothing else.

```tsx
import type { Metadata } from 'next'

import ScheduleScreen from './client'

export const metadata: Metadata = {
  title: 'Lịch học',
  description: 'Thời khóa biểu các lớp trong tuần tại lớp Thầy Hồng Toán.',
  alternates: { canonical: '/schedule' },
}

const SchedulePage = () => <ScheduleScreen />

export default SchedulePage
```

Dynamic route — `params` is a Promise:

```tsx
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  // …
}

const ClassDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <ClassDetailClient id={id} />
}
```

Metadata strings are written directly in Vietnamese — `translate()` is not available on the server.
Admin and auth routes set `robots: { index: false, follow: false }`.

If the route reads search params (`useQuerySearch` / `useSearchParams`), wrap the screen in `<Suspense>` inside
`page.tsx`.

## 2. `client.tsx`

```tsx
'use client'
import PageHeader from '@/components/PageHeader'
import Section, { SectionHeading } from '@/components/Section'
import useLanguage from '@/hooks/useLanguage'

const ScheduleScreen = () => {
  const { translate } = useLanguage()

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: translate('schedulePage.title') }]}
        description={translate('schedulePage.subtitle')}
        title={translate('schedulePage.title')}
      />

      <Section>
        <SectionHeading title={translate('schedulePage.title')} />
        {/* content */}
      </Section>
    </>
  )
}

export default ScheduleScreen
```

Admin screens use the admin frame instead:

```tsx
<AdminPage action={<MyButton …/>} description={translate('admin.xDesc')} title={translate('admin.x')}>
  <AdminCard>…</AdminCard>
</AdminPage>
```

## 3. Rules for the screen body

- **No hardcoded text** — everything through `translate()`, keys added to both `vn.json` and `en.json`.
- **No hardcoded routes** — use `ROUTES` from `constants/routes.ts`.
- **Reuse components** — `MyInput`, `MyButton`, `MyTable`, `ClassCard`, `EmptyState`, `StatCard`, `Charts`, …
  (skill `component`). Open dialogs with `useModalDrawer`, confirm deletes with `useConfirm`.
- **daisyUI classes + semantic colors only** (skill `daisyui`). No `bg-white`, `text-gray-*` or hex literals.
- **Data** comes from `hooks/react-query/`. Add a new hook there rather than calling a service from the screen.
- Always handle the three states: loading (`skeleton-loading` block or `loading loading-spinner`),
  empty (`EmptyState`), and error.
- Mobile first: check at 390px — no horizontal scroll, tap targets ≥ 40px, tables get `renderMobileItem`.

## 4. Register the route

- Add the path to `ROUTES` in `constants/routes.ts`.
- Link it from `components/Header/Components/Nav` (public) or `components/AdminShell` (admin) if it should be
  reachable from navigation, and from `components/Footer` when relevant.

## 5. Before reporting done

Run `npx tsc --noEmit`, `npm run lint`, `npm run build`, then open the route in the browser at 390px and 1440px
(skill `review`).
