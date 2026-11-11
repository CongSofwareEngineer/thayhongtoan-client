'use client'
import Link from 'next/link'
import { useState } from 'react'

import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import { ClockIcon } from '@/components/Icons/Clock'
import { FacebookIcon } from '@/components/Icons/Facebook'
import { LocationIcon } from '@/components/Icons/Location'
import { MailIcon } from '@/components/Icons/Mail'
import { PhoneIcon } from '@/components/Icons/Phone'
import { SendIcon } from '@/components/Icons/Send'
import { INFO_CONTACT, LINK_CONTACT } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import ContactAPI from '@/services/API/Contact'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

type FormContact = { name: string; phone: string; email: string; message: string }

const PHONE_REGEX = /^(0|\+84)(\d{9})$/

const ContactScreen = () => {
  const { translate } = useLanguage()
  const [form, setForm] = useState<FormContact>({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormContact>>({})
  const [sending, setSending] = useState(false)

  const onChange = (key: keyof FormContact, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  // Validate locally, then post the message to the backend inbox
  const onSubmit = async () => {
    const nextErrors: Partial<FormContact> = {}

    if (!form.name.trim()) {
      nextErrors.name = translate('errors.empty')
    }
    if (!PHONE_REGEX.test(form.phone.trim())) {
      nextErrors.phone = translate('errors.errorSDT')
    }
    if (!form.message.trim()) {
      nextErrors.message = translate('errors.empty')
    }
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSending(true)
    try {
      await ContactAPI.send(form)
      showNotificationSuccess(translate('contact.sendSuccess'))
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch {
      showNotificationError(translate('errors.serverError'))
    } finally {
      setSending(false)
    }
  }

  const infoItems = [
    { icon: <PhoneIcon />, label: translate('contact.phone'), value: INFO_CONTACT.phoneDisplay, link: LINK_CONTACT.SDT },
    { icon: <MailIcon />, label: translate('contact.email'), value: INFO_CONTACT.email, link: LINK_CONTACT.Mail },
    { icon: <LocationIcon />, label: translate('contact.address'), value: INFO_CONTACT.address },
    { icon: <ClockIcon />, label: translate('contact.workingTime'), value: translate('contact.workingTimeValue') },
  ]

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: translate('contact.title') }]}
        description={translate('contact.subtitle')}
        title={translate('contact.title')}
      />

      <Section>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-5'>
          <div className='flex flex-col gap-4 lg:col-span-2'>
            <h2 className='text-xl font-bold text-base-content'>{translate('contact.infoTitle')}</h2>
            {infoItems.map((item) => (
              <div key={item.label} className='flex items-start gap-3 rounded-box border border-base-300 bg-base-100 p-4'>
                <span className='flex size-10 shrink-0 items-center justify-center rounded-field bg-primary/10 text-primary'>{item.icon}</span>
                <div className='min-w-0'>
                  <p className='text-xs uppercase tracking-wide text-base-content/50'>{item.label}</p>
                  {item.link ? (
                    <Link className='break-words font-semibold text-base-content hover:text-primary hover:underline' href={item.link}>
                      {item.value}
                    </Link>
                  ) : (
                    <p className='break-words font-semibold text-base-content'>{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <Link
              className='flex items-center justify-center gap-2 rounded-box bg-[#1877F2] p-4 font-semibold text-white transition-opacity hover:opacity-90'
              href={LINK_CONTACT.FaceBook}
              target='_blank'
            >
              <FacebookIcon className='size-5' />
              Facebook
            </Link>
          </div>

          <div className='flex flex-col gap-5 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm lg:col-span-3'>
            <h2 className='text-xl font-bold text-base-content'>{translate('contact.formTitle')}</h2>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <MyInput
                isRequired
                errorMessage={errors.name}
                label={translate('contact.name')}
                placeholder={translate('placeholder.enterName')}
                value={form.name}
                onValueChange={(value) => onChange('name', value)}
              />
              <MyInput
                isRequired
                errorMessage={errors.phone}
                inputMode='tel'
                label={translate('contact.phone')}
                placeholder={translate('placeholder.enterNumberPhone')}
                value={form.phone}
                onValueChange={(value) => onChange('phone', value)}
              />
            </div>

            <MyInput
              label={`${translate('contact.email')} (${translate('common.optional')})`}
              placeholder={translate('placeholder.enterEmail')}
              type='email'
              value={form.email}
              onValueChange={(value) => onChange('email', value)}
            />

            <MyInputArea
              isRequired
              errorMessage={errors.message}
              label={translate('contact.message')}
              minRows={5}
              placeholder={translate('placeholder.enterContent')}
              value={form.message}
              onValueChange={(value) => onChange('message', value)}
            />

            <MyButton className='font-semibold' isLoading={sending} size='lg' onClick={onSubmit}>
              <SendIcon className='size-5' />
              {translate('contact.send')}
            </MyButton>
          </div>
        </div>

        <div className='mt-10 overflow-hidden rounded-box border border-base-300'>
          <iframe className='h-[360px] w-full' loading='lazy' src={LINK_CONTACT.GGMap} title={translate('contact.mapTitle')} />
        </div>
      </Section>
    </>
  )
}

export default ContactScreen
