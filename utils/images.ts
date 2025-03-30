import { Area } from 'react-easy-crop'

export const getCroppedImg = async (
  imageSrc: string,
  crop: Area,
  nameFile = 'cropped_image'
): Promise<File | null> => {
  const image = new Image()
  console.log({ imageSrc })

  image.src = imageSrc
  image.crossOrigin = 'anonymous'
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      console.log('step1')

      if (!ctx) {
        reject(new Error('Canvas context not found'))
        return
      }
      console.log('step2')

      canvas.width = crop.width
      canvas.height = crop.height

      ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height)
      console.log('step3', ctx)

      canvas.toBlob((blob) => {
        console.log('step4', blob)

        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        resolve(new File([blob], `${nameFile}_${Date.now()}.jpg`, { type: 'image/jpeg' }))
      }, 'image/jpeg')
    }

    image.onerror = (error) => reject(error)
  })
}
