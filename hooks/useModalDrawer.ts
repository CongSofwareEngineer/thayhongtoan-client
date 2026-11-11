import { useCallback } from 'react'

import useMedia from './useMedia'

import { Drawer, drawer as drawerZustand } from '@/zustand/drawer'
import { Modal, modal as modalZustand } from '@/zustand/modal'

export type ModalDrawerMode = 'auto' | 'modal' | 'drawer'

export type OpenParams = Modal &
  Pick<Drawer, 'placement'> & {
    mode?: ModalDrawerMode
    /** placement used when the content renders as a drawer */
    drawerPlacement?: Drawer['placement']
  }

type Config = {
  mode?: ModalDrawerMode
}

/**
 * Single entry point for dialogs: renders a modal on desktop and a drawer on mobile.
 * Never build a one-off modal/drawer in a page — use this hook.
 */
const useModalDrawer = ({ mode = 'auto' }: Config = {}) => {
  const { isMobile } = useMedia()
  const { openModal, closeModal, closeAllModal } = modalZustand((state) => state)
  const { openDrawer, closeDrawer } = drawerZustand((state) => state)

  const resolveMode = useCallback(
    (override?: ModalDrawerMode): 'modal' | 'drawer' => {
      const finalMode = override || mode

      if (finalMode === 'modal' || finalMode === 'drawer') {
        return finalMode
      }

      return isMobile ? 'drawer' : 'modal'
    },
    [mode, isMobile]
  )

  const open = useCallback(
    ({ mode: modeOverride, drawerPlacement, placement, ...params }: OpenParams) => {
      if (resolveMode(modeOverride) === 'drawer') {
        openDrawer({
          title: params.title,
          children: params.children,
          showBtnClose: params.showBtnClose,
          overClickClose: params.overClickClose,
          callBackAfter: params.callBackAfter,
          placement: drawerPlacement || 'bottom',
          classNames: params.classNames,
        })

        return
      }

      openModal({ ...params, placement: placement as Modal['placement'] })
    },
    [resolveMode, openDrawer, openModal]
  )

  const close = useCallback(() => {
    closeModal()
    closeDrawer()
  }, [closeModal, closeDrawer])

  const closeAll = useCallback(() => {
    closeAllModal()
    closeDrawer()
  }, [closeAllModal, closeDrawer])

  return { open, close, closeAll, isMobile }
}

export default useModalDrawer
