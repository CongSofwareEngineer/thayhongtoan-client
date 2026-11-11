'use client'
import { useState } from 'react'

import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import MyInput from '@/components/MyInput'
import MyInputNumber from '@/components/MyInputNumber'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import { CheckCircleIcon } from '@/components/Icons/CheckCircle'
import { CopyIcon } from '@/components/Icons/Copy'
import { MoneyIcon } from '@/components/Icons/Money'
import { FINANCE } from '@/constants/finance'
import useLanguage from '@/hooks/useLanguage'
import MBBankService from '@/services/API/MBBank'
import SepayServices from '@/services/API/Sepay'
import { IInfoBanking } from '@/services/API/Sepay/type'
import { delayTime, formatMoney } from '@/utils/functions'
import { copyToClipboard, showNotificationError, showNotificationSuccess } from '@/utils/notification'

const QUICK_AMOUNTS = [400000, 450000, 500000, 550000, 600000]
const MAX_CHECK_ROUNDS = 20

const PaymentScreen = () => {
  const { translate } = useLanguage()
  const [amount, setAmount] = useState<number>(450000)
  const [studentName, setStudentName] = useState('')
  const [amountError, setAmountError] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [infoBanking, setInfoBanking] = useState<IInfoBanking | null>(null)

  const onChangeAmount = (value: number) => {
    setAmount(value)
    setAmountError(!value || value <= 0 ? translate('payment.errorPrice') : '')
  }

  // Build the VietQR payload for the entered amount
  const generateQR = () => {
    if (!amount || amount <= 0) {
      setAmountError(translate('payment.errorPrice'))

      return
    }

    const banking = new MBBankService(amount)

    setInfoBanking({
      idBanking: banking.idBanking,
      message: banking.message,
      qrCode: banking.qrCode,
      infoAccount: banking.infoAccount,
    })
  }

  // Poll the Sepay transaction feed until the matching transfer appears
  const checkPayment = async (rounds = MAX_CHECK_ROUNDS) => {
    setIsChecking(true)
    try {
      let remaining = rounds

      while (remaining > 0) {
        await delayTime(3000)
        remaining -= 1

        const listPayment = await SepayServices.getListPayment()
        const transactions = listPayment?.transactions

        if (Array.isArray(transactions) && transactions.length > 0) {
          const matched = transactions.find((item) => item.transaction_content?.includes(infoBanking?.message || ''))

          if (matched) {
            if (Number(matched.amount_in) >= Number(amount)) {
              showNotificationSuccess(translate('payment.success'))
            } else {
              showNotificationError(translate('payment.errorPrice'))
            }

            return
          }
        }
      }

      showNotificationError(translate('payment.waiting'))
    } catch {
      showNotificationError(translate('errors.serverError'))
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: translate('payment.title') }]}
        description={translate('payment.subtitle')}
        title={translate('payment.title')}
      />

      <Section>
        <div className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2'>
          <div className='flex flex-col gap-5 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm'>
            <h2 className='flex items-center gap-2 text-lg font-bold text-base-content'>
              <MoneyIcon className='size-5 text-primary' />
              {translate('payment.amount')}
            </h2>

            <MyInput
              label={`${translate('payment.studentName')} (${translate('common.optional')})`}
              placeholder={translate('placeholder.enterName')}
              value={studentName}
              onValueChange={setStudentName}
            />

            <MyInputNumber
              formatComma
              isRequired
              endContent='đ'
              errorMessage={amountError}
              label={translate('payment.amount')}
              min={1000}
              placeholder={translate('placeholder.enterAmount')}
              value={amount}
              onChange={onChangeAmount}
            />

            <div className='flex flex-wrap gap-2'>
              {QUICK_AMOUNTS.map((value) => (
                <button
                  key={value}
                  className='badge badge-lg cursor-pointer badge-ghost hover:badge-primary'
                  type='button'
                  onClick={() => onChangeAmount(value)}
                >
                  {formatMoney(value)}
                </button>
              ))}
            </div>

            <MyButton className='w-full font-semibold' disabled={!amount || !!amountError} size='lg' onClick={generateQR}>
              {translate('payment.generateQR')}
            </MyButton>

            <div className='rounded-box border border-info/30 bg-info/10 p-4 text-sm text-base-content/70'>
              <p>{translate('payment.instruction')}</p>
              <p className='mt-2 text-xs italic'>{translate('payment.note')}</p>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center gap-5 rounded-box border-2 border-dashed border-base-300 bg-base-200 p-6'>
            {infoBanking?.qrCode ? (
              <>
                <div className='rounded-box bg-base-100 p-4 shadow-lg'>
                  <MyImage noAnimation alt='QR' className='!relative !h-[320px] !w-[300px] object-contain' src={infoBanking.qrCode} />
                </div>

                <div className='flex w-full flex-col gap-2 rounded-box border border-base-300 bg-base-100 p-4 text-sm'>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='text-base-content/50'>{translate('payment.bankInfo')}</span>
                    <span className='font-bold text-base-content'>MB Bank</span>
                  </div>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='text-base-content/50'>STK</span>
                    <span className='flex items-center gap-2 font-bold text-base-content'>
                      {infoBanking.infoAccount?.Stk}
                      <button aria-label='copy' type='button' onClick={() => copyToClipboard(infoBanking.infoAccount?.Stk)}>
                        <CopyIcon className='size-4 text-base-content/40 hover:text-primary' />
                      </button>
                    </span>
                  </div>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='text-base-content/50'>{translate('contact.name')}</span>
                    <span className='font-bold text-base-content'>{FINANCE.Mb.HoDienHong.Name}</span>
                  </div>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='text-base-content/50'>{translate('payment.content')}</span>
                    <span className='flex items-center gap-2 font-bold text-base-content'>
                      {infoBanking.message}
                      <button aria-label='copy' type='button' onClick={() => copyToClipboard(infoBanking.message)}>
                        <CopyIcon className='size-4 text-base-content/40 hover:text-primary' />
                      </button>
                    </span>
                  </div>
                  <div className='flex items-center justify-between gap-2 border-t border-base-300 pt-2'>
                    <span className='text-base-content/50'>{translate('payment.amount')}</span>
                    <span className='text-lg font-extrabold text-primary'>{formatMoney(amount)}</span>
                  </div>
                </div>

                <MyButton className='w-full font-semibold' color='success' isLoading={isChecking} onClick={() => checkPayment()}>
                  <CheckCircleIcon className='size-5' />
                  {translate('payment.checkPayment')}
                </MyButton>
              </>
            ) : (
              <div className='flex flex-col items-center gap-3 py-16 text-center text-base-content/40'>
                <MoneyIcon className='size-12' />
                <p className='text-sm'>{translate('payment.instruction')}</p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}

export default PaymentScreen
