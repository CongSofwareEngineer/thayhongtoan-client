import useLanguage from '@/hooks/useLanguage'
import useUserData from '@/hooks/useUserData'
import React, { useState } from 'react'
import useModalDrawer from '@/hooks/useModalDrawer'
import useRoutePage from '@/hooks/useRoutePage'
import useCheckForm from '@/hooks/useCheckForm'
import MyForm from '@/components/Form/MyForm'
import { useForm } from '@mantine/form'
import InputForm from '@/components/Form/Input'
import CheckboxForm from '@/components/Form/Checkbox'
import InputPasswordForm from '@/components/Form/InputPassword'
import ButtonForm from '@/components/Form/ButtonForm'

const ModalLogin = () => {
  const { translate } = useLanguage()
  const { login } = useUserData()
  const route = useRoutePage()
  const { closeModalDrawer } = useModalDrawer()
  const { checkNumberPhone, checkPassword } = useCheckForm()

  const [loading, setLoading] = useState(false)

  const formData = useForm({
    mode: 'uncontrolled',
    initialValues: {
      sdt: '',
      pass: '',
      saveLogin: true,
    },
    validate: {
      sdt: (sdt) => checkNumberPhone(sdt),
      pass: (name) => checkPassword(name),
    },
    validateInputOnChange: true,
  })

  const handleRegister = () => {
    closeModalDrawer()
    route.push('/register')
  }

  const handleLogin = async (e: { sdt: string; pass: string; saveLogin: boolean }) => {
    try {
      setLoading(true)
      await login(e.sdt, e.pass, e.saveLogin)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full flex flex-col gap-2 justify-start '>
      <MyForm autoComplete='on' form={formData} submit={handleLogin}>
        <InputForm
          formData={formData}
          keyName='sdt'
          name='username'
          autoComplete='username'
          label={translate('userDetail.sdt')}
          placeholder={translate('userDetail.sdt')}
        />
        <InputPasswordForm
          required
          label={translate('userDetail.pass')}
          placeholder={translate('userDetail.pass')}
          keyName='pass'
          name='current-password'
          autoComplete='current-password'
          formData={formData}
        />
        <div className='flex md:flex-row justify-between w-full md:gap-0 gap-2 mb-3'>
          <CheckboxForm
            keyName={'saveLogin'}
            formData={formData}
            label={translate('register.saveRegister')}
          />
          <div className='flex-1  text-blue-500 flex justify-end items-end'>
            <div onClick={handleRegister} className='md:hover:underline cursor-pointer'>
              {translate('register.title')}
            </div>
          </div>
        </div>

        <div className='w-full mt-4' />
        <ButtonForm loading={loading} disableClose titleSubmit={translate('common.login')} />
      </MyForm>
    </div>
  )
}

export default ModalLogin
