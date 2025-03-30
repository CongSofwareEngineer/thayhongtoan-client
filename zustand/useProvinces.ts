import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { INIT_ZUSTAND, TYPE_ZUSTAND, ZUSTAND } from '@/constants/zustand'
import axios from 'axios'

type ProvincesStoreState = { [ZUSTAND.Provinces]: TYPE_ZUSTAND[ZUSTAND.Provinces] }

type ProvincesStoreActions = {
  setProvinces: (nextProvinces: ProvincesStoreState[ZUSTAND.Provinces]) => void
  fetchData: () => Promise<void>
}

type ProvincesStore = ProvincesStoreState & ProvincesStoreActions

const zustandProvinces = create<ProvincesStore>()(
  devtools(
    (set) => ({
      [ZUSTAND.Provinces]: INIT_ZUSTAND[ZUSTAND.Provinces],
      setProvinces: (user: TYPE_ZUSTAND[ZUSTAND.Provinces]) => set({ [ZUSTAND.Provinces]: user }),
      fetchData: async () => {
        try {
          const data = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
          set({ [ZUSTAND.Provinces]: data?.data?.data || data?.data || [] })
        } catch {}
      },
    }),
    {
      name: `zustand-${ZUSTAND.Provinces}`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)

export const useProvinces = () => {
  return zustandProvinces((state) => state)
}
