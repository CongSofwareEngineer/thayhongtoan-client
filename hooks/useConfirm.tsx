import ConfirmModal from '@/components/ConfirmModal'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'

type ConfirmParams = {
  title?: string
  description?: string
  confirmLabel?: string
  isDanger?: boolean
  onConfirm: () => void | Promise<void>
}

// Shortcut for "are you sure?" dialogs so pages never build their own
const useConfirm = () => {
  const { open } = useModalDrawer()
  const { translate } = useLanguage()

  const confirm = ({ title, description, confirmLabel, isDanger = true, onConfirm }: ConfirmParams) => {
    open({
      title: title || translate('common.deleteConfirmTitle'),
      size: 'sm',
      children: <ConfirmModal confirmLabel={confirmLabel} description={description} isDanger={isDanger} onConfirm={onConfirm} />,
    })
  }

  return { confirm }
}

export default useConfirm
