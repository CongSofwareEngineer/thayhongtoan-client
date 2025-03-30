import { cn } from '@/utils/tailwind'
import { useModal } from '@/zustand/useModal'
import { Modal } from '@mantine/core'

const MyModal = () => {
  const { modal, closeModal } = useModal()

  return (
    <Modal
      title={modal?.open ? modal?.title || <></> : <></>}
      onClose={() => {
        closeModal()
        if (modal?.onClose) {
          modal.onClose()
        }
      }}
      centered
      opened={modal?.open!}
      withCloseButton={modal.showBtnClose}
      closeOnClickOutside={modal?.overClickClose}
      closeOnEscape={modal?.overClickClose}
      size={modal.width || 500}
      styles={{
        header: {
          minHeight: modal?.title ? 45 : 20,
          paddingBottom: 0,
          paddingTop: 0,
        },
      }}
    >
      <div className={cn('w-full h-full max-h-[90dvh]  overflow-y-auto ', modal?.classContent)}>
        {modal?.content}
      </div>
    </Modal>
  )
}

export default MyModal
