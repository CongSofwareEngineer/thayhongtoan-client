import { showNotificationError } from '@/utils/notification'
import { getBase642, getBase64 as getBase64Base } from '../utils/functions'
import useLanguage from './useLanguage'
import { MAX_PIXEL_REDUCE } from '@/constants/app'

const useBase64Img = (maxSizeOutputKB = 15, maxScale = MAX_PIXEL_REDUCE) => {
  const { translate } = useLanguage()

  const reduceImageSize = (imageFile: File, maxSizeInKB = 5, quality = 0.7, callback: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.onload = (event) => {
      const imgElement = document.createElement('img')
      imgElement.src = event.target?.result + ''
      imgElement.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        // Adjust canvas size to reduce the dimensions of the image
        const MAX_WIDTH: any = maxScale // Adjust width as needed
        const scaleSize = MAX_WIDTH / imgElement.width
        canvas.width = MAX_WIDTH
        canvas.height = imgElement.height * scaleSize
        context?.drawImage(imgElement, 0, 0, canvas.width, canvas.height)

        const compressImage = (currentQuality: any) => {
          console.log({ maxSizeInKB })

          canvas.toBlob(
            (blob: any) => {
              if (blob.size / 1024 < maxSizeInKB) {
                // If the compressed image is under the desired size, return it
                callback(blob)
              } else if (currentQuality > 0.1) {
                // If the image is still too large, compress further by reducing quality
                compressImage(currentQuality - 0.1)
              } else {
                // If we've reduced quality too much, return the lowest quality version
                callback(blob)
              }
            },
            'image/jpeg',
            currentQuality
          )
        }

        // Start compressing with initial quality
        compressImage(quality)
      }
    }
  }

  const getBase64 = async (
    fileUpload: any,
    callBack?: any
  ): Promise<{
    base64: string
    name: string
  } | null> => {
    try {
      return new Promise((resolve) => {
        if (fileUpload.size > 30 * 1048576) {
          const text = translate('warning.maxSizeFile').replace('{size}', `30 MB`)
          showNotificationError(text)
          return
        }

        reduceImageSize(fileUpload, maxSizeOutputKB, 1, (file: any) => {
          getBase642(file, async (base64: any) => {
            if (callBack) {
              callBack({
                base64: base64,
                name: fileUpload.name,
              })
            }

            resolve({
              base64: base64,
              name: fileUpload.name,
            })
          })
        })
      })
    } catch {
      showNotificationError(translate('errors.file'))
      return null
    }
  }

  const getBase64Full = async (fileUpload: any, callBack: any) => {
    try {
      if (fileUpload.size > 30 * 1048576) {
        const text = translate('warning.maxSizeFile').replace('{size}', `30 MB`)
        showNotificationError(text)
        return
      }

      getBase64Base(fileUpload, callBack)
    } catch {
      showNotificationError(translate('errors.file'))
      return null
    }
  }

  return {
    getBase64,
    getBase64Full,
  }
}

export default useBase64Img
