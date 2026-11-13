# Project Rules (MANDATORY)

These rules apply to every task and override default behavior. They work together with the project skills in
`.claude/skills/`: `language`, `component`, `create-page`, `icon-image`, `modal-drawer`, `comment`, `review`,
`seo-check`, `daisyui`.

## 1. Never hardcode text in the UI

- Every user-facing string (labels, buttons, titles, placeholders, toasts, errors, empty states, `alt`,
  `aria-label`) MUST come from `translate()` of `useLanguage` (`@/hooks/useLanguage`).
- Add each key to BOTH `public/assets/language/vn.json` and `public/assets/language/en.json`. The two files must
  stay key-for-key identical — see skill `language`.
- Page `metadata` (title/description in `page.tsx`) is the one exception: it runs on the server where the
  language store is not available, so write it directly in Vietnamese.
- Images come from `config/images.ts`, icons from `components/Icons/` (see skill `icon-image`).

```tsx
// ❌ Bad
<MyButton>Lưu</MyButton>
toast.error('Có lỗi xảy ra')

// ✅ Good
const { translate } = useLanguage()
<MyButton>{translate('common.save')}</MyButton>
showNotificationError(translate('common.error'))
```

Check for missing keys before reporting done:

```bash
grep -rhoE "translate\(\s*'[a-zA-Z0-9_.]+'" app components hooks utils --include="*.ts" --include="*.tsx" \
  | sed -E "s/translate\(\s*'//; s/'$//" | sort -u
```

## 2. Never hardcode names/values — always go through constants

- No raw string/number literals for keys, names, routes or config values inside components, hooks or services.
  Define them in `constants/` (or `config/` for site/API/image config) and import them.
- This covers: React Query keys, cookie keys, status/enum values, routes/paths, API endpoints, limits/page
  sizes, colors, external URLs, regex patterns, timeouts.
- Reuse existing constants first:
  - `constants/reactQuery.ts` — `QUERY_KEY`, `PAGE_SIZE`
  - `constants/app.ts` — `PAGE_SIZE_LIMIT`, `LINK_CONTACT`, `INFO_CONTACT`, `COOKIE_KEY`, `OBSERVER_KEY`,
    `COMMENT_STATUS`, `REGISTER_STATUS`, `PAYMENT_STATUS`, `BLOG_STATUS`, `MAX_STAR`, `MONTH_LABELS`
  - `constants/routes.ts` — `ROUTES` (every internal link goes through this)
  - `constants/demoData.ts` — seed content for the public pages
  - `constants/finance.ts`, `constants/sepay.ts`, `constants/zustand.ts`
  - `config/` — `fetchConfig.ts`, `images.ts`, `site.ts`, `fonts.ts`

```ts
// ❌ Bad
useQuery({ queryKey: ['getListClass', page] })
router.push('/admin/students')
if (payment.status === 'paid') { ... }

// ✅ Good
useQuery({ queryKey: [QUERY_KEY.Class, page] })
router.push(ROUTES.admin.students)
if (payment.status === PAYMENT_STATUS.PAID) { ... }
```

## 3. Never commit or push on your own

Do NOT run `git commit`, `git push`, `git merge`, `git rebase`, `git reset` or `git stash` unless the user asks
for that exact action in the current message. Leave changes uncommitted for review.

## 4. Always ask before adding or deleting

Before creating a new file/folder/component/hook/constant/translation namespace, installing a package, or
deleting/renaming any file, code block, key or dependency: describe what will change and wait for confirmation.
Editing existing code inside the scope of the task does not need extra confirmation; removing existing logic does.

## 5. UI is daisyUI 5 on Tailwind CSS 4

- There is **no `tailwind.config.js`**. Theme and plugins live in `styles/globals.css` (`@import "tailwindcss"`,
  `@plugin "daisyui"`, `@plugin "daisyui/theme"`).
- Use daisyUI component classes (`btn`, `card`, `badge`, `modal`, `table`, `input`, `select`, `collapse`,
  `dropdown`, `loading`, `join`, `stat`, …) and daisyUI **semantic colors** — `primary`, `secondary`, `accent`,
  `base-100/200/300`, `base-content`, `info`, `success`, `warning`, `error`.
- Never use fixed Tailwind palette colors (`text-gray-800`, `bg-white`, `#22C55E`) for themed surfaces. The only
  exceptions are brand marks that must not change (e.g. `text-[#1877F2]` for the Facebook icon).
- Radius tokens: `rounded-box` (cards/modals), `rounded-field` (buttons/inputs), `rounded-selector`.
- Read `.claude/skills/daisyui/` before writing markup — especially `usage/SKILL.md`, `colors/SKILL.md` and the
  relevant file under `components/`.
- **Turbopack is the default** (`dev` and `build` run it; `build-webpack` is the fallback). daisyUI's `join`
  utility is the one thing Turbopack's CSS parser cannot read — it emits `@scope(&) { & > :where(...) }` and
  `next dev` then returns 500 on every route. It is therefore excluded in `styles/globals.css`
  (`@plugin "daisyui" { exclude: join }`) and replaced there by plain `.join` / `.join-item` rules. Keep that
  block in sync if you upgrade daisyUI, and do not re-enable the built-in `join`.

## 6. Done checklist

Before reporting a task as done:

- [ ] No hardcoded UI text — all via `translate()`, keys present in both `vn.json` and `en.json`
- [ ] No raw keys/routes/values — all via `constants/` or `config/`
- [ ] daisyUI classes + semantic colors only (rule 5)
- [ ] Reused `components/My*` primitives; dialogs opened via `useModalDrawer`
- [ ] New logic functions carry a short English comment
- [ ] Nothing committed or pushed
- [ ] `npm run lint` and `npm run build` pass
- [ ] Checked the change in the browser at 390px and 1440px — no horizontal scroll, no overlap

---

# Project Context

## Overview

Next.js client for **"Thầy Hồng Toán"** — a tutoring centre in Hà Tiên, Kiên Giang teaching handwriting, mental
math, Soroban and basic computing to children aged 5–12. Deployed at `thayhongtoan.vercel.app`.

- **Public site**: home, about, classes + class detail (with parent reviews), weekly schedule, tuition, gallery,
  blog + post detail, FAQ, contact, trial registration, QR tuition payment, student progress lookup, login.
- **Admin** (`/admin`): dashboard with charts, classes, students, parents, attendance, tuition, trial
  applications, reviews (approve / reply / delete), blog posts, teachers, settings. Guarded by
  `user.isAdmin`, `noindex`.
- Backend is a separate **NestJS** API at `NEXT_PUBLIC_API_APP`. This repo has no database.

## Tech Stack

- **Next.js 16.4.6** (App Router, Turbopack) + **React 19** + **TypeScript**. Route `params` are `Promise`s (`await params`).
- **TailwindCSS 4** (CSS-first) + **daisyUI 5**, custom theme `thayhong` in `styles/globals.css`. Merge classes
  with `cn()` from `utils/tailwind.ts`.
- **TanStack Query v5** for server state, **Zustand v5** for client state (user, language, modal, modal2, drawer).
- **axios** via `config/fetchConfig.ts`; **react-toastify** for toasts; **framer-motion**; **next-sitemap**.
- **BlockNote** (`@blocknote/core|mantine|react|server-util`) is the blog editor; posts are stored as
  `JSON.stringify(editor.document)` and rendered on the server — see `components/MyBlog/` + `utils/blogContent.ts`.
- Charts are hand-rolled SVG in `components/Charts/` — there is no charting dependency, keep it that way.
- Lint/format: ESLint 9 + Prettier. Lockfile: `package-lock.json`.

## Project Structure

```
app/
  (public)/                # public pages; page.tsx holds metadata, client.tsx holds the UI
    page.tsx + client.tsx  # home
    about/ class/ class/[id]/ schedule/ tuition/ gallery/
    blog/ blog/[slug]/ faq/ contact/ register/ payment/ student-tracking/ login/
  admin/                   # admin area, wrapped in components/AdminShell
    layout.tsx             # AdminShell (sidebar + guard)
    page.tsx + client.tsx  # dashboard
    classes/ students/ parents/ teachers/ attendance/ tuition/ registers/ comments/ blog/ settings/
  api/info-me/ api/sepay/  # route handlers
  layout.tsx               # root: fonts, metadata, JSON-LD, ReactQueryProvider, ClientRender
  error.tsx, not-found.tsx
components/
  My*                      # UI primitives: MyButton, MyInput, MyInputArea, MyInputNumber, MySelect,
                           #   MyCheckbox, MyForm, MyTable, MyModal, MyDrawer, MyDropdown, MyImage
  AdminShell/ AdminPage/ StatCard/ Charts/   # admin building blocks
  Section/ PageHeader/ ClassCard/ CommentSection/ StarRating/ EmptyState/ ConfirmModal/ FloatingContact/
  Header/ Footer/ ClientRender/ Modal2/ Icons/
config/                    # fetchConfig.ts, images.ts, site.ts, fonts.ts
constants/                 # app.ts, routes.ts, reactQuery.ts, demoData.ts, finance.ts, sepay.ts, zustand.ts
hooks/
  react-query/             # useGetClass, useGetClassPublic, useGetStudent, useGetParent, useGetPayment,
                           #   useGetAttendance, useGetRegister, useGetTeacher, useGetComment, useGetBlog
  useLanguage, useModalDrawer, useModal, useDrawer, useConfirm, useUser, useMedia, useDebounce, ...
services/API/<Resource>/   # one class per backend resource, extending BaseAPI
utils/                     # functions.ts, notification.ts, tailwind.ts, serverNext.ts, sepay.ts, CryptoJS/
zustand/                   # user, language, modal, modal2, drawer
public/assets/language/    # vn.json, en.json
```

## Architecture & Conventions

### Pages
- One route = `page.tsx` (server, exports `metadata`) + `client.tsx` (`'use client'`, the actual screen).
- Public screens are composed from `PageHeader` + `Section`/`SectionHeading`; admin screens from `AdminPage` +
  `AdminCard`. Do not re-invent page chrome.
- `ClientRender` hides the public header/footer on `/admin` and renders the modal/drawer/toast roots.

### API layer
- Each service extends `BaseAPI` (`services/API/BaseAPI/index.ts`) with a `router` prefix and is exported as a
  singleton: `const ClassAPI = new ClassBase(); export default ClassAPI`.
- `BaseAPI.get` strips `undefined`/`null`/`''` from the query object — pass `undefined` to mean "no filter".
- `fetchConfig` never throws: it resolves `{ data, messages, error }` with `data: null` on failure.
- A 401 triggers one shared `/auth/refresh` retry; a second failure emits `OBSERVER_KEY.LogOut`.
- Components fetch through `hooks/react-query/`, with keys from `QUERY_KEY`; mutations call `refetch()`.

### Public data + fallbacks
- `useGetClassPublic`, `useGetComment` and `useGetBlog` fall back to `constants/demoData.ts` when the backend
  returns nothing, so marketing pages are never blank. Pass `{ useFallback: false }` to opt out.
- Admin hooks never fall back — the admin must see the real state.

### Auth
- `TeacherAPI.login/logout/infoMe` with httpOnly cookies set by the backend.
- `components/PreLoadData` calls `infoMe()` once on mount and flips `isLoadedUser`. `AdminShell` shows a spinner
  until `isLoadedUser`, then requires `user.isAdmin` — never render admin content before that flag is true.

### Dialogs
- Open everything through `useModalDrawer` (modal on desktop, drawer on mobile) — see skill `modal-drawer`.
- Destructive actions go through `useConfirm`.
- `Modal2` (`useModal2`) is a legacy standalone modal; prefer `useModalDrawer` for new code.

### SEO
- Per-route `metadata` in `page.tsx` with `alternates.canonical` (paths come from `ROUTES`). Admin and login are
  `robots: noindex`.
- Structured data is built in `utils/seo.ts` and printed by `components/JsonLd`: organisation + `WebSite` in
  `app/layout.tsx`, `BreadcrumbList` on every public page, `BlogPosting` on `/blog/[slug]`, `Course` on
  `/class/[id]`, `FAQPage` on `/faq`.
- Social preview images are generated by `app/opengraph-image.tsx` (+ `twitter-image.tsx`); do not hardcode an
  `og:image` in `SITE_CONFIG`.
- Sitemap + robots via `next-sitemap.config.js` on `postbuild`; it also appends `/blog/*` and `/class/*` from the
  API (falling back to `constants/demoData.ts`) and allows the AI crawlers. Static copy of the site map for LLMs
  lives in `public/llms.txt`.

### Gotchas
- `PAGE_SIZE_LIMIT` (`constants/app.ts`, 20) and `PAGE_SIZE` (`constants/reactQuery.ts`, 20) both exist — check
  which one the surrounding code uses.
- `MyForm.onSubmit` receives the form values as a plain object, not the event.
- `MyImage` always renders with `fill`; the parent needs `position: relative` and a height, and overrides use
  `!important` utilities (`!absolute !inset-0 !h-full !w-full`).
- `next.config.ts` redirects `/home` → `/`.
- `components/MyBlog` is the BlockNote editor (client, `dynamic` with `ssr: false`); `components/MyBlog/Content.tsx`
  is the Server Component that renders stored blocks to HTML and falls back to the markdown-lite seed posts.
- `proxy.ts` replaces the deprecated `middleware.ts` convention (Next 16).

## Environment

Variables are typed in `environment.d.ts`, template in `.env.example`, real values in `.env.local` (git-ignored
— never commit it, never print keys).

- Public: `NEXT_PUBLIC_API_APP` (required), `NEXT_PUBLIC_ENV`, `NEXT_PUBLIC_BUILD`, `NEXT_PUBLIC_KEY_SALT`
- Server-only: `SEPAY_API_KEY`, `MODE_DEPLOY`

## Commands

```bash
npm run dev     # dev server on http://localhost:3000 (Turbopack — see rule 5)
npm run lint    # eslint --fix
npm run build   # production build (Turbopack); postbuild runs next-sitemap
npm run build-webpack # same build on webpack, only as a fallback
npm run start   # serve the production build
```

There is no test suite — verify with `npm run lint` + `npm run build` plus a browser pass at 390px and 1440px.
