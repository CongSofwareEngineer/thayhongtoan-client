import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { ZUSTAND } from '@/constants/zustand'
import { User } from '@/types'

interface UserState {
  user: User | null
  /** false until the first /info-me call settles, so guards can wait */
  isLoadedUser: boolean
  setUser: (user: User | null) => void
  setLoadedUser: (loaded: boolean) => void
}

export const userZustand = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      isLoadedUser: false,
      setUser: (user: User | null) => set({ user: user || null }),
      setLoadedUser: (isLoadedUser: boolean) => set({ isLoadedUser }),
    }),
    {
      name: `${ZUSTAND.User}-zustand`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)
