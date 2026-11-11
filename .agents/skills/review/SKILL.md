---
name: review
description: Always review your own code after completing a task, fix bugs immediately
---

# Review Skill

## Rules

- **Always review your own code** after finishing a task. If you find a bug, fix it immediately.
- Verify with:

```bash
npx tsc --noEmit   # type errors the build would otherwise hide (eslint.ignoreDuringBuilds is on)
npm run lint
npm run build
```

- Then check the result in a real browser at **390px** and **1440px**. Look for: horizontal scroll, overlapping
  fixed elements, unreadable contrast, empty blocks where data failed to load.

## Checklist

- [ ] No hardcoded UI strings — everything via `translate()`
- [ ] New keys added to BOTH `vn.json` and `en.json`, and the two files have identical key sets
- [ ] No raw routes/keys/values — via `constants/routes.ts`, `constants/app.ts`, `constants/reactQuery.ts`
- [ ] daisyUI semantic colors only (`base-*`, `primary`, `error`, …), no `gray-700` / `bg-white` / hex literals
- [ ] Components reused from `components/`; dialogs via `useModalDrawer`, confirms via `useConfirm`
- [ ] Icons from `components/Icons/`, images from `config/images.ts`
- [ ] New logic functions have a short English comment
- [ ] `npx tsc --noEmit`, `npm run lint` and `npm run build` all pass
- [ ] Nothing committed or pushed
