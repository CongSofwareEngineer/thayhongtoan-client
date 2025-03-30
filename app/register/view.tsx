'use client'
import useAos from '@/hooks/useAos'
import useCheckForm from '@/hooks/useCheckForm'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useModalDrawer from '@/hooks/useModalDrawer'
import useRoutePage from '@/hooks/useRoutePage'
import useUserData from '@/hooks/useUserData'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { IFormRegister } from './type'
import { BodyUserData } from '@/constants/firebase'
import { encryptData } from '@/utils/crypto'
import ClientApi from '@/services/clientApi'
import { showNotificationError } from '@/utils/notification'
import MyImage from '@/components/MyImage'
import { images } from '@/configs/images'
import MyForm from '@/components/Form/MyForm'
import InputForm from '@/components/Form/Input'
import InputPasswordForm from '@/components/Form/InputPassword'
import CheckboxForm from '@/components/Form/Checkbox'
import ButtonForm from '@/components/Form/ButtonForm'
import { Checkbox } from '@mantine/core'
import CaptchaOtp from '@/components/CaptchaOtp'

const RegisterScreen = () => {
  useAos()
  useFirstLoadPage()

  const [loadingRegister, setLoadingRegister] = useState(false)

  const { translate } = useLanguage()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const router = useRoutePage()
  const { checkNumberPhone, checkPassword, checkNameUser } = useCheckForm()
  const { isMobile } = useMedia()
  const { login } = useUserData()

  const form = useForm<IFormRegister>({
    initialValues: {
      name: '',
      pass: '',
      passAgain: '',
      saveLogin: true,
      sdt: '',
      sex: true,
    },
    validateInputOnChange: true,
    validate: {
      name: checkNameUser,
      pass: checkPassword,
      sdt: checkNumberPhone,
      passAgain: (pass, record: IFormRegister) => {
        if (record.pass !== pass) {
          return translate('warning.passAgain')
        }
      },
    },
  })

  useEffect(() => {
    const footer = window.document.getElementsByClassName('main-content')[0]
    if (footer) {
      footer.classList.add('bg-custom-register')
    }

    return () => footer.classList.remove('bg-custom-register')
  }, [])

  const handleRegister = async (formData: IFormRegister) => {
    const bodyUser: BodyUserData = {
      addressShipper: [],
      exp: 0,
      sdt: formData.sdt,
      sex: formData.sex,
      isAdmin: false,
      name: formData.name,
      pass: encryptData(formData.pass),
      avatar: '',
      address: '',
    }
    const newData = await ClientApi.register(bodyUser)
    if (!newData?.data) {
      showNotificationError(translate('register.exitSDT'))
    } else {
      await login(formData.sdt, formData.pass, !!formData?.saveLogin)
    }

    closeModalDrawer()
    setLoadingRegister(false)
  }

  const handleSubmit = async (formData: IFormRegister) => {
    setLoadingRegister(true)
    if (formData.pass !== formData.passAgain) {
      showNotificationError(translate('warning.passAgain'))
      setLoadingRegister(false)
      return
    }

    const isExitedSDT = await ClientApi.checkSDT(formData.sdt)
    setLoadingRegister(false)
    if (isExitedSDT?.data) {
      showNotificationError(translate('register.exitSDT'))
    } else {
      openModalDrawer({
        content: (
          <CaptchaOtp numberPhone={formData.sdt} callback={() => handleRegister(formData)} />
        ),
        title: translate('verifyNumberPhone.title'),
        configModal: {
          overClickClose: false,
          showBtnClose: false,
        },
      })
    }
  }

  return (
    <div className='h-full max-w-[1000px] relative flex justify-center m-auto'>
      <div className='w-full flex justify-between h-full items-center'>
        {!isMobile && (
          <div
            data-aos='fade-right'
            className='flex-1 flex flex-col justify-center items-center max-w-[450px]'
          >
            <MyImage
              alt={'tc-store-logo-register'}
              className='cursor-pointer   !w-full !h-auto'
              onClick={() => router.push('/')}
              src={images.logoStore}
            />
          </div>
        )}

        <div data-aos='fade-left' className='flex justify-start items-start md:w-fit w-full'>
          <div className='m-auto flex flex-col md:w-[450px] w-full shadow-md p-8 rounded-[16px] justify-center align-middle bg-white'>
            <p className='mb-3 uppercase font-bold text-center text-[16px]'>
              {translate('register.title')}
            </p>
            <MyForm form={form} submit={handleSubmit}>
              <InputForm
                formData={form}
                required
                keyName='sdt'
                label={translate('productDetail.modalBuy.enterNumberPhone')}
                placeholder={translate('productDetail.modalBuy.enterNumberPhone')}
              />
              <InputForm
                formData={form}
                required
                showCount
                keyName='name'
                placeholder={translate('productDetail.modalBuy.enterName')}
                maxLength={24}
                label={translate('productDetail.modalBuy.enterName')}
              />
              <InputPasswordForm
                formData={form}
                required
                keyName='pass'
                placeholder={translate('register.enterPassWord')}
                label={translate('register.enterPassWord')}
              />
              <InputForm
                keyName='passAgain'
                formData={form}
                placeholder={translate('register.enterPassWordAgain')}
                label={translate('register.enterPassWordAgain')}
                required
              />
              <div className='flex gap-4 mb-2 mt-1 '>
                <Checkbox
                  checked={form.values?.sex}
                  label={translate('textPopular.male')}
                  onChange={() => form.setFieldValue('sex', true)}
                />
                <Checkbox
                  checked={!form.values?.sex}
                  label={translate('textPopular.female')}
                  onChange={() => form.setFieldValue('sex', false)}
                />
              </div>
              <div className='flex gap-2 justify-end my-5 relative top-[-5px]'>
                <div>{translate('register.saveRegister')}</div>
                <CheckboxForm
                  styles={{
                    label: {
                      fontSize: 14,
                    },
                  }}
                  formData={form}
                  keyName='saveLogin'
                />
              </div>
              <ButtonForm
                disableClose
                loading={loadingRegister}
                titleSubmit={translate('header.register')}
              />
            </MyForm>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
