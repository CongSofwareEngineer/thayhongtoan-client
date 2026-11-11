'use client'
import { useEffect } from 'react'

import useUser from '@/hooks/useUser'
import TeacherAPI from '@/services/API/Teacher'

// Restore the signed-in teacher once on first load, then unblock the admin guard
function PreLoadData() {
  const { setUser, setLoadedUser } = useUser()

  useEffect(() => {
    let active = true

    const getData = async () => {
      try {
        const res = await TeacherAPI.infoMe()

        if (active && res?.data) {
          setUser(res.data)
        }
      } finally {
        if (active) {
          setLoadedUser(true)
        }
      }
    }

    getData()

    return () => {
      active = false
    }
  }, [setUser, setLoadedUser])

  return null
}

export default PreLoadData
