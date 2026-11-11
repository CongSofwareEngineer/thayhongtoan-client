import type { Metadata } from 'next'

import React from 'react'

import AdminShell from '@/components/AdminShell'

export const metadata: Metadata = {
  title: 'Quản trị',
  robots: { index: false, follow: false },
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => <AdminShell>{children}</AdminShell>

export default AdminLayout
