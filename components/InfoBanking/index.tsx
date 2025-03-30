import React, { useEffect, useState } from 'react'
import MyImage from '../MyImage'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Button, Image } from '@mantine/core'
import TextCopy from '../TextCopy'
import VPBankService from '@/services/VPBank'
import { useModalAdmin } from '@/zustand/useModalAdmin'
import ModalProcess from '../ModalProcess'
import { delayTime } from '@/utils/functions'
import SepayServices from '@/services/Sepay'
import { showNotificationError } from '@/utils/notification'

const InfoBanking = ({
  amount,
  callback = () => {},
  callbackError = () => {},
}: {
  amount: number
  callback?: (id?: string, mess?: string) => any
  callbackError?: () => any
}) => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const { openModal, closeModal } = useModalAdmin()

  const [qrCode, setQrCode] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loadingCheck, setLoadingCheck] = useState(false)
  const [isBanking] = useState(false)
  const [idBanking, setIdBanking] = useState('')

  useEffect(() => {
    ;(async () => {
      const infoBanking = new VPBankService(amount)

      setQrCode(infoBanking.qrCode)
      setMessage(infoBanking.message)
      setIdBanking(infoBanking.idBanking)
    })()
  }, [amount])

  const checkBanking = async () => {
    if (isMobile) {
      VPBankService.openDeepLink(amount, message)
    } else {
      setLoadingCheck(true)
      setLoadingCheck(false)
    }
  }

  const tracking = async (amountRequest = 40) => {
    if (amountRequest > 0) {
      await delayTime(3000)
      amountRequest -= 1

      const listPayment = await SepayServices.getListPayment()

      if (
        listPayment?.transactions &&
        Array.isArray(listPayment?.transactions) &&
        listPayment?.transactions?.length > 0
      ) {
        const isValidContent = listPayment?.transactions.some((e) => {
          return e.transaction_content.includes(message)
        })
        const isValidMoney = listPayment?.transactions.some((e) => {
          return Number(e.amount_in) === amount
        })
        if (isValidContent) {
          if (isValidMoney) {
            callback(idBanking, message)
          } else {
            closeModal()
            callbackError()
            showNotificationError('Chuyển khoản chưa hợp lệ.')
          }
        } else {
          await tracking(amountRequest)
        }
      } else {
        callback(idBanking, message)
      }
    } else {
      closeModal()
      callbackError()
      showNotificationError('Bạn chưa chuyển tiền.')
    }
  }

  const handleCallBack = async () => {
    openModal({
      body: <ModalProcess title={translate('banking.tracking')} />,
      showBtnClose: false,
      overClickClose: false,
    })
    tracking()
  }

  return (
    <div className='flex md:flex-row md:py-1 mt-2 overflow-y-auto flex-col md:gap-5 gap-2 md:justify-center w-full'>
      {isMobile ? (
        <div className='relative w-[90%] flex-1  m-auto  flex md:pb-0  aspect-square overflow-hidden'>
          {/* <Image preview={false} src={qrCode} alt='QR' className='!relative !w-full !h-auto' /> */}
          <MyImage src={qrCode} alt='QR' className='!relative !w-full !h-auto' />
        </div>
      ) : (
        <div className='relative w-full flex-1 flex md:pb-0  aspect-square overflow-hidden'>
          <div className='absolute w-full aspect-square flex justify-center items-center'>
            <div className='relative md:w-full   aspect-square '>
              <Image src={qrCode} alt='QR' className='!relative !w-full !h-auto ' />
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-col flex-1 gap-2  '>
        <div className='flex gap-2'>
          <div className='font-bold'>NH : VP Bank</div>

          <div className='relative justify-center w-5 rounded-lg aspect-square overflow-auto'>
            <MyImage
              src={'https://www.vpbank.com.vn/assets/images/favicons/favicon-32x32.png'}
              alt='logo VCB'
              className='!relative !w-full !h-auto '
            />
          </div>
        </div>
        <div className='flex  md:gap-2 gap-1'>
          <span className='font-bold'>{`STK : `}</span>
          <TextCopy value={'0392225405'} textView={'0392225405'} />
        </div>
        <div className='flex  flex-col  gap-1'>
          <span className='font-bold'>{translate('textPopular.content')} :</span>
          <TextCopy value={message} textView={message} />
        </div>
        <div className='rounded-lg mt-1 flex p-3 w-full bg-[#f6cf83]'>
          <span className='mr-1'>
            <AiOutlineExclamationCircle />
          </span>
          <span>Nội dung chuyển khoản phải ghi đúng để bạn khiếu nãi và kiểm tra hoá đơn.</span>
        </div>
        <div className='flex gap-3 mt-3'>
          {isMobile ? (
            <>
              <Button onClick={checkBanking} loading={loadingCheck} className='flex-1'>
                {translate('banking.openApp')}
              </Button>
              <Button
                onClick={handleCallBack}
                disabled={isBanking}
                variant='filled'
                className='flex-1'
              >
                {translate('textPopular.sended')}
              </Button>
            </>
          ) : (
            <Button onClick={handleCallBack} disabled={isBanking} className='flex-1'>
              {translate('textPopular.sended')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoBanking
