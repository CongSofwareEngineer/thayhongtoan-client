import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useLanguage from './useLanguage'

const useCallbackToast = () => {
  const { translate } = useLanguage()
  const callback = (data: any = null, text?: string) => {
    if (data) {
      showNotificationSuccess(text || translate('success.update'))
    } else {
      showNotificationSuccess(text || translate('success.create'))
    }
  }

  const callbackReject = (data: any = null, text?: string) => {
    if (data) {
      showNotificationError(text || translate('error.update'))
    } else {
      showNotificationSuccess(text || translate('error.create'))
    }
  }

  const updateSuccess = (text?: string) => {
    showNotificationSuccess(text || translate('success.update'))
  }

  const deleteSuccess = (text?: string) => {
    showNotificationSuccess(text || translate('success.delete'))
  }

  const createSuccess = (text?: string) => {
    showNotificationSuccess(text || translate('success.create'))
  }

  const updateError = (text?: string) => {
    showNotificationError(text || translate('error.update'))
  }

  const deleteError = (text?: string) => {
    showNotificationError(text || translate('error.delete'))
  }

  const createError = (text?: string) => {
    showNotificationError(text || translate('error.create'))
  }

  return {
    callback,
    callbackReject,
    createSuccess,
    updateSuccess,
    deleteSuccess,
    updateError,
    createError,
    deleteError,
  }
}

export default useCallbackToast
