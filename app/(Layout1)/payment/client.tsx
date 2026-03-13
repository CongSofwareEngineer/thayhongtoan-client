'use client'

import React, { useState } from 'react'

import MyForm from '@/components/MyForm'
import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import { showNotificationError, showNotificationSuccess, copyToClipboard } from '@/utils/notification'
import SepayServices from '@/services/API/Sepay'
import { SparklesIcon } from '@/components/Icons/Sparkles'
import { FINANCE } from '@/constants/finance'
import { CopyIcon } from '@/components/Icons/Copy'
import MyImage from '@/components/MyImage'
import MyInputNumber from '@/components/MyInputNumber'
import { delayTime, numberWithCommas } from '@/utils/functions'
import MBBankService from '@/services/API/MBBank'
import { IInfoBanking } from '@/services/API/Sepay/type'

const PaymentClient = () => {
  const { translate } = useLanguage()
  const [formData, setFormData] = useState<{ amount: number }>({
    amount: 10000,
  })
  const [formDataError, setFormDataError] = useState<any>({})
  const [isChecking, setIsChecking] = useState(false)
  const [infoBanking, setInfoBanking] = useState<IInfoBanking | null>(null)

  console.log({ infoBanking })

  const onChangeValue = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }))

    let error = ''

    if (key === 'amount') {
      if (!value || isNaN(Number(value)) || Number(value) <= 0) {
        error = translate('payment.errorPrice')
      }
    }
    setFormDataError((prev: any) => ({ ...prev, [key]: error }))
  }

  const generateQR = () => {
    if (!formData.amount || formDataError.amount) return

    const amount = formData.amount
    const infoBanking = new MBBankService(amount)

    setInfoBanking({
      idBanking: infoBanking.idBanking,
      message: infoBanking.message,
      qrCode: infoBanking.qrCode,
      infoAccount: infoBanking.infoAccount,
    })
  }

  const checkPayment = async (amountRequest = 39) => {
    setIsChecking(true)
    try {
      if (amountRequest > 0) {
        await delayTime(3000)
        amountRequest -= 1

        const listPayment = await SepayServices.getListPayment()

        if (listPayment?.transactions && Array.isArray(listPayment?.transactions) && listPayment?.transactions?.length > 0) {
          const isValidContent = listPayment?.transactions.some((e) => {
            return e.transaction_content.includes(infoBanking?.message || '')
          })
          const isValidMoney = listPayment?.transactions.some((e) => {
            return Number(e.amount_in) === Number(formData.amount)
          })

          if (isValidContent) {
            if (isValidMoney) {
              showNotificationSuccess(translate('payment.success'))
            } else {
              showNotificationError('Bạn chuyển tiền chưa đủ.')
            }
          } else {
            await checkPayment(amountRequest)
          }
        } else {
          await checkPayment(amountRequest)
        }
      } else {
        showNotificationError('Bạn chưa chuyển tiền.')
      }
    } catch (error) {
      console.error('Check payment failed', error)
    } finally {
      setIsChecking(false)
    }
  }

  console.log({ formData })

  return (
    <div className='max-w-4xl mx-auto md:px-4 py-20'>
      <div className='bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-blue-50'>
        <div className='flex items-center gap-3 mb-8'>
          <div className='w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary'>
            <SparklesIcon />
          </div>
          <h1 className='text-3xl font-bold text-gray-900'>{translate('payment.title')}</h1>
        </div>

        <div className='grid md:grid-cols-2 gap-12'>
          <div className='w-full'>
            <MyForm className='flex flex-col gap-6' onSubmit={generateQR}>
              <MyInputNumber
                classNames={{
                  input: 'border-[0px]',
                }}
                // defaultValue={formData.amount}
                endContent={<span className='text-gray-400 font-bold'>đ</span>}
                errorMessage={formDataError.amount}
                isInvalid={!!formDataError.amount}
                label={translate('payment.amount')}
                name='amount'
                placeholder={`Ví dụ: 10.000`}
                value={formData.amount}
                onChange={(amount) => onChangeValue('amount', amount)}
              />
              {formData.amount && !formDataError.amount && (
                <p className='text-sm text-gray-500 font-medium -mt-4 ml-1'>{numberWithCommas(formData.amount)} VNĐ</p>
              )}

              <MyButton
                className='w-full text-lg font-bold'
                color='primary'
                disabled={!formData.amount || !!formDataError.amount}
                type='submit'
                onClick={generateQR}
              >
                {translate('payment.generateQR')}
              </MyButton>
            </MyForm>

            <div className='mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100'>
              <p className='text-sm text-blue-800 leading-relaxed italic'>{translate('payment.instruction')}</p>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 p-5'>
            {infoBanking?.qrCode ? (
              <>
                <div className='bg-white p-4 rounded-2xl shadow-lg mb-6'>
                  <MyImage alt='Payment QR' className='!w-[300px] !h-[320px]' src={infoBanking.qrCode} />
                </div>

                <div className='w-full mb-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-500 text-sm'>Số tài khoản:</span>
                    <div className='flex items-center gap-2'>
                      <span className='font-bold text-gray-900'>{infoBanking.infoAccount?.Stk}</span>
                      <CopyIcon className='w-4 h-4 cursor-pointer' onClick={() => copyToClipboard(infoBanking.infoAccount?.Stk)} />
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-500 text-sm'>Tên tài khoản:</span>
                    <span className='font-bold text-gray-900'>{FINANCE.Mb.HoDienHong.Name}</span>
                  </div>
                </div>

                <MyButton className='w-full font-bold' color='success' isLoading={isChecking} onClick={() => checkPayment()}>
                  {translate('payment.checkPayment')}
                </MyButton>
              </>
            ) : (
              <div className='text-center text-gray-400'>
                <p>Vui lòng nhập số tiền để tạo mã QR</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentClient
