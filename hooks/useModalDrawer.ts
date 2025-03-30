import useMedia from './useMedia'

import React from 'react'
import { ModalData, useModal } from '@/zustand/useModal'
import { DrawerData, useDrawer } from '@/zustand/useDrawer'

type UseModalType = {
  useDrawer?: boolean | false
  onlyDrawer?: boolean | false
  configModal?: ModalData
  configDrawer?: DrawerData
  content: React.ReactNode
  title?: string | React.ReactNode | undefined
}

const useModalDrawer = () => {
  const { closeModal, openModal } = useModal()
  const { closeDrawer, openDrawer, drawer } = useDrawer()
  const { isMobile } = useMedia()

  const openModalDrawer = (config: UseModalType) => {
    const configDrawerBase: DrawerData = {
      content: config.content,
      position: 'bottom',
      height: 'auto',
      width: '500px',
      noPadding: false,
      overClickOutside: true,
      ...config.configDrawer,
      title: config.configDrawer?.title || config?.title,
      opened: true,
    }

    const configModalBase: ModalData = {
      showBtnClose: true,
      ...config.configModal,
      title: config.configModal?.title || config.title,
      content: config.content,
      open: true,
    }

    if (config.onlyDrawer) {
      openDrawer(configDrawerBase)
    } else {
      if (isMobile && config.useDrawer) {
        openDrawer(configDrawerBase)
        closeModal()
      } else {
        openModal(configModalBase)
        closeDrawer()
      }
    }
  }

  const closeModalDrawer = () => {
    if (drawer.opened) {
      closeDrawer()
    } else {
      closeModal()
    }
  }

  return {
    openModalDrawer,
    closeModalDrawer,
  }
}

export default useModalDrawer
