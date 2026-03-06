import React from 'react'

import ClassDetailClient from './client'

const ClassDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <ClassDetailClient id={id} />
}

export default ClassDetailPage
