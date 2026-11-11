import { ReactNode } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { ZUSTAND } from '@/constants/zustand'

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export type Drawer = {
  isOpen?: boolean
  title?: ReactNode
  children?: ReactNode
  placement?: DrawerPlacement
  showBtnClose?: boolean
  overClickClose?: boolean
  callBackAfter?: () => any
  classNames?: {
    base?: string
    header?: string
    body?: string
    backdrop?: string
  }
}

interface DrawerState {
  [ZUSTAND.Drawer]: Drawer
  openDrawer: (drawer: Drawer) => void
  closeDrawer: (isIconClose?: boolean) => void
}

export const drawer = create<DrawerState>()(
  devtools(
    (set, get) => ({
      [ZUSTAND.Drawer]: {
        isOpen: false,
      },
      openDrawer: (param: Drawer) => {
        set({
          [ZUSTAND.Drawer]: {
            placement: 'right',
            showBtnClose: true,
            overClickClose: true,
            ...param,
            isOpen: true,
          },
        })
      },
      closeDrawer: () => {
        const current = get()[ZUSTAND.Drawer]

        current.callBackAfter?.()
        set({
          [ZUSTAND.Drawer]: {
            ...current,
            children: null,
            isOpen: false,
          },
        })
      },
    }),
    {
      name: 'drawer-zustand',
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)
