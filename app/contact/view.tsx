'use client'

import { DataAddContact } from '@/constants/mongoDB'
import useAos from '@/hooks/useAos'
import useCheckForm from '@/hooks/useCheckForm'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useModalDrawer from '@/hooks/useModalDrawer'
import useRoutePage from '@/hooks/useRoutePage'
import useUserData from '@/hooks/useUserData'
import ClientApi from '@/services/clientApi'
import { showNotificationSuccess } from '@/utils/notification'
import { useForm } from '@mantine/form'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { showNotificationError } from '../../utils/notification'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import MyForm from '@/components/Form/MyForm'
import InputForm from '@/components/Form/Input'
import InputAreaForm from '@/components/Form/InputArea'
import ButtonForm from '@/components/Form/ButtonForm'

const ModalProcess = dynamic(() => import('@/components/ModalProcess'), {
  ssr: true,
})
const ContactScreen = () => {
  useAos()
  useFirstLoadPage()
  const { isMobile } = useMedia()
  const router = useRoutePage()
  const { translate } = useLanguage()
  const { checkNumberPhone, checkEmail, checkNameUser } = useCheckForm()
  const { userData } = useUserData()
  const { closeModalDrawer, openModalDrawer } = useModalDrawer()

  const [loading, setLoading] = useState(false)
  const form = useForm<DataAddContact>({
    validateInputOnChange: true,
    initialValues: {
      sdt: userData?.sdt || '',
      emailUser: userData?.email || '',
      nameUser: userData?.name || '',
      des: '',
    },
    validate: {
      sdt: checkNumberPhone,
      emailUser: checkEmail,
      nameUser: checkNameUser,
    },
  })

  useEffect(() => {
    const footer = window.document.getElementsByClassName('main-content')[0]
    if (footer) {
      footer.classList.add('bg-custom-register')
    }

    return () => footer.classList.remove('bg-custom-register')
  }, [])

  const handleSubmit = async (formData: DataAddContact) => {
    setLoading(true)
    const dataAPI: DataAddContact = {
      des: formData?.des,
      sdt: formData?.sdt,
      emailUser: formData?.emailUser,
      nameUser: formData?.nameUser,
    }
    openModalDrawer({
      content: <ModalProcess />,
      configModal: {
        overClickClose: false,
      },
    })
    const res = await ClientApi.createContact(dataAPI)
    console.log('====================================')
    console.log({ res })
    console.log('====================================')
    closeModalDrawer()
    if (res?.data) {
      showNotificationSuccess(translate('contactMe.contactSuccess'))
    } else {
      showNotificationError(translate('contactMe.contactFail'))
    }
    setLoading(false)
  }

  return (
    <div className=' flex flex-col justify-center items-center h-full w-full gap-2'>
      <div className='w-full flex  justify-between h-full items-center'>
        {!isMobile && (
          <div
            data-aos='fade-right'
            className='flex-1 flex flex-col justify-center items-center max-w-[450px]'
          >
            <MyImage
              alt={'tc-store-logo-register'}
              className='  cursor-pointer !max-w-0['
              onClick={() => router.push('/')}
              src={images.logoStore}
            />
          </div>
        )}

        <div data-aos='fade-left' className='flex flex-1 justify-start items-start md:w-fit w-full'>
          <div className='m-auto flex flex-col   md:w-[80%] w-full shadow-md p-8 rounded-[16px] justify-center align-middle bg-white'>
            <p className='mb- uppercase font-bold text-center text-[16px]'>
              {translate('header.contact')}
            </p>
            <MyForm form={form} submit={handleSubmit}>
              <InputForm
                required
                placeholder={translate('productDetail.modalBuy.enterNumberPhone')}
                formData={form}
                keyName='sdt'
                label={translate('productDetail.modalBuy.enterNumberPhone')}
              />
              <InputForm
                required
                placeholder={translate('productDetail.modalBuy.enterName')}
                formData={form}
                keyName='nameUser'
                label={translate('productDetail.modalBuy.enterName')}
                showCount
                maxLength={14}
              />
              <InputForm
                required
                placeholder={'Email'}
                formData={form}
                keyName='emailUser'
                label={'Email'}
              />
              <InputAreaForm
                required
                placeholder={translate('textPopular.note')}
                formData={form}
                keyName='desá'
                label={translate('textPopular.note')}
                showCount
                rows={5}
                maxLength={300}
              />
              <ButtonForm
                classBtnSubmit='mt-6'
                loading={loading}
                disableClose
                titleSubmit={translate('common.Send')}
              />
            </MyForm>

            {/* {formData && (
              <MyForm
                onValuesChange={(_, value) => setFormData({ ...formData, ...value })}
                formData={formData}
                onFinish={handleSubmit}
              >
                <div className='flex flex-col w-full'>
                  <InputForm
                    name='sdt'
                    required
                    disable={!!userData?.sdt}
                    validator={checkNumberPhone}
                    label={translate('productDetail.modalBuy.enterNumberPhone')}
                  />

                  <InputForm
                    name='name'
                    required
                    label={translate('productDetail.modalBuy.enterName')}
                  />

                  <InputForm name='email' label={'Email/ Gmail'} />
                  <InputForm
                    typeBtn='area'
                    rows={5}
                    name='note'
                    label={translate('textPopular.note')}
                    maxLength={300}
                  />
                  <div className='mt-2' />

                  <ButtonForm
                    loading={loading}
                     disableClose
                    titleSubmit={translate('common.Send')}
                  />
                </div>
              </MyForm>
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactScreen
