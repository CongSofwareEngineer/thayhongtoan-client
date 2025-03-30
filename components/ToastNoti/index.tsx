import useMedia from '@/hooks/useMedia'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastNoti = () => {
  const { isMobile } = useMedia()

  return <ToastContainer className={'mb-3'} style={{ marginTop: isMobile ? 65 : 42 }} />
}

export default ToastNoti
