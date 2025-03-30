'use client'
import React, { useLayoutEffect } from 'react'
import MyModal from '../MyModal'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import dynamic from 'next/dynamic'

const MyModalAdmin = dynamic(() => import('@/components/MyModalAdmin'), { ssr: false })
const MyDrawer = dynamic(() => import('@/components/MyDrawer'), { ssr: false })
const ToastNoti = dynamic(() => import('@/components/ToastNoti'), {
  ssr: false,
})
const FirstLoadWebsite = dynamic(() => import('@/components/FirstLoadWebsite'), {
  ssr: false,
})

const CheckPingServer = dynamic(() => import('@/components/CheckPingServer'), {
  ssr: false,
})

const Notification = dynamic(() => import('@/components/Notification'), {
  ssr: false,
})

const ChatFirebase = dynamic(() => import('@/components/ChatFirebase'), {
  ssr: false,
})

const ClientRender = ({
  children,
  menuCategory = [],
}: {
  menuCategory: any
  children: React.ReactNode
}) => {
  const { setCategoryMenu } = useCategoryMenu()

  useLayoutEffect(() => {
    setCategoryMenu(menuCategory)
  }, [menuCategory, setCategoryMenu])

  return (
    <>
      {children}
      <MyModal />
      <MyDrawer />
      <ToastNoti />
      <MyModalAdmin />
      <FirstLoadWebsite />
      <CheckPingServer />
      <Notification />
      {process.env.NEXT_PUBLIC_ENABLE_CHAT && <ChatFirebase />}
    </>
  )
}

export default ClientRender
