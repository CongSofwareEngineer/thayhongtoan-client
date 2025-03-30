import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constants/zustand'
import ClientApi from '@/services/clientApi'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CategoryData = TYPE_ZUSTAND[ZUSTAND.CategoryMenu]

type CategoryMenuStoreState = {
  [ZUSTAND.CategoryMenu]: CategoryData
}

type CategoryMenuStoreActions = {
  setCategoryMenu: (nextCategoryMenu: CategoryData) => void
  fetchData: () => Promise<void>
}

type CategoryMenuStore = CategoryMenuStoreState & CategoryMenuStoreActions

const zustandCategoryMenu = create<CategoryMenuStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.CategoryMenu]: INIT_ZUSTAND[ZUSTAND.CategoryMenu],
      setCategoryMenu: (categoryMenu: CategoryData) => {
        set({ [ZUSTAND.CategoryMenu]: categoryMenu })
      },
    }),
    {
      name: `zustand-${ZUSTAND.CategoryMenu}`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)

export const useCategoryMenu = () => {
  return zustandCategoryMenu((state) => state)
}
