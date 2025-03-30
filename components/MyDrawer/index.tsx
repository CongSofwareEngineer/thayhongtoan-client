import { useDrawer } from '@/zustand/useDrawer'
import { Drawer } from '@mantine/core'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { isIOS } from 'react-device-detect'

const MyDrawer: NextPage = () => {
  const { closeDrawer, drawer } = useDrawer()

  useEffect(() => {
    if (drawer?.opened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [drawer])

  return (
    <Drawer
      closeOnClickOutside={drawer?.overClickOutside}
      title={drawer.title}
      position={drawer.position || 'bottom'}
      size={drawer?.width}
      opened={drawer?.opened || false}
      onClose={closeDrawer}
      className='!max-h-[calc(100dvh-60px)]'
      styles={{
        content: {
          maxHeight:
            drawer.position === 'left' || drawer.position === 'right'
              ? 'unset'
              : 'calc(100dvh - 60px)',
          height: drawer.position === 'left' || drawer.position === 'right' ? '100%' : 'auto',
        },
      }}
    >
      <div className='h-full'>
        {drawer.content ?? <></>}
        {isIOS && <div className='w-full mb-1' />}
      </div>
    </Drawer>
  )
}

export default MyDrawer
