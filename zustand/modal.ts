import { ReactNode } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'

export type Modal = {
  title?: ReactNode
  children?: ReactNode
  size?: ModalSize
  placement?: 'center' | 'top' | 'bottom'
  showBtnClose?: boolean
  overClickClose?: boolean
  /** push on top of the current modal instead of replacing it */
  addModal?: boolean
  callBackAfter?: () => any
  classNames?: {
    base?: string
    header?: string
    body?: string
    backdrop?: string
  }
}

interface ModalState {
  listModals: Modal[]
  openModal: (modal: Modal) => void
  closeModal: (isIconClose?: boolean) => void
  closeAllModal: () => void
}

export const modal = create<ModalState>()(
  devtools(
    (set, get) => ({
      listModals: [],
      openModal: (param: Modal) => {
        const listModals = [...get().listModals]

        if (param.addModal || listModals.length === 0) {
          listModals.push(param)
        } else {
          listModals[listModals.length - 1] = param
        }
        set({ listModals })
      },
      closeModal: () => {
        const listModals = [...get().listModals]
        const closed = listModals.pop()

        closed?.callBackAfter?.()
        set({ listModals })
      },
      closeAllModal: () => {
        get().listModals.forEach((item) => item?.callBackAfter?.())
        set({ listModals: [] })
      },
    }),
    {
      name: 'modal-zustand',
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)
