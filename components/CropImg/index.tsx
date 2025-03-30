import { MAX_PIXEL_REDUCE } from '@/constants/app'
import useBase64Img from '@/hooks/useBase64Img'
import useLanguage from '@/hooks/useLanguage'
import { getCroppedImg } from '@/utils/images'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import { Button } from '@mantine/core'
import React, { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

type ICropImg = {
  src?: string
  file?: File
  fullQuantity?: boolean
  maxSizeOutputKB?: number
  maxScale?: number
  onCropComplete: (croppedFile: File | null) => void
}

const CropImg = ({
  maxSizeOutputKB = 15,
  maxScale = MAX_PIXEL_REDUCE,
  src,
  fullQuantity = false,
  file,
  onCropComplete,
}: ICropImg) => {
  const { getBase64, getBase64Full } = useBase64Img(maxSizeOutputKB, maxScale)
  const { translate } = useLanguage()
  const { closeModal } = useModalAdmin()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [loading, setLoading] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  const imageSrc = src || (file ? URL.createObjectURL(file) : '')

  const onCropCompleteHandler = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleCrop = async () => {
    try {
      setLoading(true)
      if (!imageSrc || !croppedAreaPixels) return

      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels, file?.name || '')
      if (croppedFile) {
        if (fullQuantity) {
          await getBase64Full(croppedFile, (e: any) => {
            onCropComplete(e)
            setLoading(false)
          })
        } else {
          await getBase64(croppedFile, (e: any) => {
            onCropComplete(e)
            setLoading(false)
          })
        }
      } else {
        onCropComplete(null)
      }
    } catch {
      onCropComplete(null)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex justify-center items-center flex-col gap-1 w-full'>
      {imageSrc && (
        <div className='w-[90%] aspect-[4/3]'>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1} // Tỷ lệ 1:1 (vuông)
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteHandler}
            classes={{
              containerClassName: 'w-full h-full !relative',
            }}
          />
        </div>
      )}

      <div className='flex w-[90%] justify-end items-end gap-3'>
        <Button loading={loading} size='sm' onClick={handleCrop} className='mt-4 !min-w-[80px]  '>
          {translate('common.ok')}
        </Button>
        <Button
          variant='filled'
          disabled={loading}
          size='sm'
          onClick={() => closeModal()}
          className='mt-4   '
        >
          {translate('common.close')}
        </Button>
      </div>
    </div>
  )
}

export default CropImg
