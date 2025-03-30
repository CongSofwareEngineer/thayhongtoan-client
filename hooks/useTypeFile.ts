import { useMemo } from 'react'
import { isIOS, isMacOs } from 'react-device-detect'
type Props = {
  typeAndroid?: string
  typeApple?: string
}
const useTypeFile = (props?: Props) => {
  const typeFile = useMemo(() => {
    if (isIOS && isMacOs) {
      return props?.typeApple || 'image/*'
    }
    return props?.typeAndroid || '.png,.jpg,.jpeg,.gif,.webp,.svg+xml,.bmp'
  }, [props])

  return {
    typeFile,
  }
}

export default useTypeFile
