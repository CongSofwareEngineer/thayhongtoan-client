---
name: modal-drawer
description: Always use useModalDrawer to open modals/drawers, and useConfirm for destructive actions
---

# Modal-Drawer Skill

## Rules

- **Always use `useModalDrawer`** from `@/hooks/useModalDrawer`. Never build a one-off modal or drawer in a page.
- It auto-selects **modal on desktop**, **drawer on mobile** (breakpoint comes from `useMedia`, 768px).
- `MyModal` and `MyDrawer` are already mounted by `ClientRender` — do not render them yourself.

## Usage

```tsx
import useModalDrawer from '@/hooks/useModalDrawer'

const { open, close, closeAll, isMobile } = useModalDrawer()

open({
  title: translate('admin.newClass'),
  children: <ClassFormBody onDone={refetch} />,
  size: '2xl',            // sm | md | lg | xl | 2xl | 3xl | 4xl | 5xl | full  (modal only)
  placement: 'center',    // center | top | bottom (modal only)
  drawerPlacement: 'bottom', // left | right | top | bottom (drawer only)
  showBtnClose: true,
  overClickClose: true,
  addModal: false,        // true stacks on top of the current modal
  callBackAfter: () => {},
  mode: 'modal',          // force a mode for this call: 'auto' | 'modal' | 'drawer'
  classNames: { base: '', header: '', body: '', backdrop: '' },
})
```

Inside the dialog body call `close()` from the same hook to dismiss it.

## Confirmations

Use `useConfirm` instead of hand-written "are you sure" dialogs:

```tsx
const { confirm } = useConfirm()

confirm({
  description: `${translate('common.deleteConfirmDesc')} (${item.name})`,
  onConfirm: async () => { await ClassAPI.delete(`/${item._id}`); refetch() },
})
```

## Side menus

The public mobile menu and other pure side panels use `useDrawer` (`openDrawer` / `closeDrawer`) directly —
that is fine for navigation, but content dialogs still go through `useModalDrawer`.
