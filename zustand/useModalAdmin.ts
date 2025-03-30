import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constants/zustand'

type ModalAdminData = TYPE_ZUSTAND[typeof ZUSTAND.ModalAdmin]

type ModalAdminStoreState = { [ZUSTAND.ModalAdmin]: ModalAdminData }

type ModalAdminStoreActions = {
  setModalAdmin: (nextModalAdmin: ModalAdminStoreState[ZUSTAND.ModalAdmin]) => void
  openModal: (nextModalAdmin: ModalAdminStoreState[ZUSTAND.ModalAdmin]) => void
  closeModal: (isIconClose?: boolean) => void
}

type ModalAdminStore = ModalAdminStoreState & ModalAdminStoreActions

const zustandModalAdmin = create<ModalAdminStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.ModalAdmin]: INIT_ZUSTAND[ZUSTAND.ModalAdmin],
      setModalAdmin: (param: ModalAdminData) => set({ [ZUSTAND.ModalAdmin]: param }),
      openModal: (param: ModalAdminData) => {
        set({
          [ZUSTAND.ModalAdmin]: {
            showBtnClose: true,
            position: 'center',
            overClickClose: true,
            ...param,
            open: true,
          },
        })
      },
      closeModal: (isIconClose: boolean = false) => {
        set((state) => {
          if (!isIconClose) {
            if (state?.[ZUSTAND.ModalAdmin]?.callBackAfter) {
              state?.[ZUSTAND.ModalAdmin].callBackAfter()
            }
          }
          return {
            [ZUSTAND.ModalAdmin]: INIT_ZUSTAND[ZUSTAND.ModalAdmin],
          }
        })
      },
    }),
    {
      name: `zustand-${ZUSTAND.ModalAdmin}`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)

export const useModalAdmin = () => {
  return zustandModalAdmin((state) => state)
}
