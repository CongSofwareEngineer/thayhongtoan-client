import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constants/zustand'

export type ModalData = TYPE_ZUSTAND[typeof ZUSTAND.Modal]

type ModalStoreState = { [ZUSTAND.Modal]: ModalData }

type ModalStoreActions = {
  openModal: (nextModal: ModalStoreState[ZUSTAND.Modal]) => void
  closeModal: () => void
}

type ModalStore = ModalStoreState & ModalStoreActions

const zustandModal = create<ModalStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.Modal]: INIT_ZUSTAND[ZUSTAND.Modal],
      openModal: (param: ModalData) => set({ [ZUSTAND.Modal]: param }),
      closeModal: () => {
        set((pre) => {
          if (pre?.[ZUSTAND.Modal]?.afterCose) {
            pre?.[ZUSTAND.Modal].afterCose()
          }
          return {
            [ZUSTAND.Modal]: {
              ...pre?.[ZUSTAND.Modal],
              content: null,
              open: false,
            },
          }
        })
      },
    }),
    {
      name: `zustand-${ZUSTAND.Modal}`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)

export const useModal = () => {
  return zustandModal((state) => state)
}
