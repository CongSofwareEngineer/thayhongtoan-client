'use client'
import React from 'react'

import useUser from '@/hooks/useUser'

function ClientAdminRender({ children }: { children: React.ReactNode }) {
  const { user } = useUser()

  return <>{user?.isAdmin ? children : null}</>
}

export default ClientAdminRender
