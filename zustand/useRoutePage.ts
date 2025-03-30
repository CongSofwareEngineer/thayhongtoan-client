import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constants/zustand'

export type RoutePageData = TYPE_ZUSTAND[ZUSTAND.RoutePage]

type RoutePageStoreState = { [ZUSTAND.RoutePage]: RoutePageData }

type RoutePageStoreActions = {
  addPathName: (pathName: string) => void
}

type RoutePageStore = RoutePageStoreState & RoutePageStoreActions

const zustandRoutePage = create<RoutePageStore>()(
  devtools(
    (set, get) => ({
      [ZUSTAND.RoutePage]: INIT_ZUSTAND[ZUSTAND.RoutePage],
      addPathName: (pathName: string) => {
        const mapRoutePage = get()[ZUSTAND.RoutePage]
        mapRoutePage.set(pathName, pathName)

        set({ [ZUSTAND.RoutePage]: mapRoutePage })
      },
    }),
    {
      name: `zustand-${ZUSTAND.RoutePage}`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)

export const useRoutePage = () => {
  return zustandRoutePage((state) => state)
}
