import React from 'react'

import ClientAdminRender from '@/components/ClientAdminRender/page'

function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return <ClientAdminRender>{children}</ClientAdminRender>
}

export default LayoutAdmin
