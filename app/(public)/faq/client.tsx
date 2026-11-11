'use client'
import { useRouter } from 'next/navigation'

import MyButton from '@/components/MyButton'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import { ChatIcon } from '@/components/Icons/Chat'
import { FAQ_KEYS, INFO_CONTACT } from '@/constants/app'
import { ROUTES } from '@/constants/routes'
import useLanguage from '@/hooks/useLanguage'

const FaqScreen = () => {
  const { translate } = useLanguage()
  const router = useRouter()

  return (
    <>
      <PageHeader breadcrumb={[{ label: translate('faq.title') }]} description={translate('faq.subtitle')} title={translate('faq.title')} />

      <Section>
        <div className='mx-auto flex w-full max-w-3xl flex-col gap-3'>
          {FAQ_KEYS.map((key) => (
            <div key={key} className='collapse collapse-plus rounded-box border border-base-300 bg-base-100'>
              <input defaultChecked={key === '1'} name='faq-page' type='radio' />
              <div className='collapse-title text-base font-semibold text-base-content'>{translate(`faq.q${key}` as any)}</div>
              <div className='collapse-content text-sm leading-relaxed text-base-content/70'>
                <p>{translate(`faq.a${key}` as any)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='mx-auto mt-12 flex w-full max-w-3xl flex-col items-center gap-4 rounded-box border border-base-300 bg-base-200 p-8 text-center'>
          <ChatIcon className='size-10 text-primary' />
          <h3 className='text-xl font-bold text-base-content'>{translate('faq.stillQuestion')}</h3>
          <p className='text-sm text-base-content/60'>{INFO_CONTACT.phoneDisplay}</p>
          <MyButton className='font-semibold' onClick={() => router.push(ROUTES.contact)}>
            {translate('faq.contactUs')}
          </MyButton>
        </div>
      </Section>
    </>
  )
}

export default FaqScreen
