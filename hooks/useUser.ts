import { userZustand } from '@/zustand/user'

const useUser = () => {
  const { setUser, user, isLoadedUser, setLoadedUser } = userZustand((state) => state)

  return { setUser, user, isLoadedUser, setLoadedUser }
}

export default useUser
