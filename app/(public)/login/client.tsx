'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import MyInput from '@/components/MyInput'
import { AcademicIcon } from '@/components/Icons/Academic'
import { images } from '@/config/images'
import { ROUTES } from '@/constants/routes'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import TeacherAPI from '@/services/API/Teacher'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

type FormLogin = { sdt: string; password: string }

const LoginScreen = () => {
  const { translate } = useLanguage()
  const { setUser } = useUser()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<FormLogin>({ sdt: '', password: '' })
  const [errors, setErrors] = useState<Partial<FormLogin>>({})

  const onChange = (key: keyof FormLogin, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  // Validate, sign in, then land on the admin dashboard
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Partial<FormLogin> = {}

    if (!form.sdt.trim()) {
      nextErrors.sdt = translate('errors.empty')
    }
    if (!form.password.trim()) {
      nextErrors.password = translate('errors.empty')
    }
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsLoading(true)
    try {
      const res = await TeacherAPI.login(form)

      if (res?.data) {
        setUser(res.data)
        showNotificationSuccess(translate('login.loginSuccess'))
        router.push(ROUTES.admin.root)
      } else {
        showNotificationError(translate('login.loginFail'))
      }
    } catch {
      showNotificationError(translate('errors.serverError'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex w-full flex-1 items-center justify-center bg-base-200 px-5 py-16'>
      <div className='grid w-full max-w-4xl overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-xl lg:grid-cols-2'>
        <div className='hidden flex-col items-center justify-center gap-4 bg-primary p-10 text-center text-primary-content lg:flex'>
          <AcademicIcon className='size-14' />
          <h2 className='text-2xl font-extrabold'>{translate('login.title')}</h2>
          <p className='text-sm opacity-80'>{translate('login.subtitle')}</p>
        </div>

        <form className='flex flex-col gap-5 p-8 md:p-10' onSubmit={onSubmit}>
          <div className='flex flex-col items-center gap-2 lg:hidden'>
            <MyImage noAnimation alt='logo' className='!relative !h-10 !w-auto' src={images.logo} />
          </div>

          <div>
            <h1 className='text-2xl font-extrabold text-base-content'>{translate('login.login')}</h1>
            <p className='text-sm text-base-content/60'>{translate('login.subtitle')}</p>
          </div>

          <MyInput
            isRequired
            autoComplete='username'
            disabled={isLoading}
            errorMessage={errors.sdt}
            inputMode='tel'
            label={translate('login.phone')}
            name='sdt'
            placeholder={translate('placeholder.enterNumberPhone')}
            value={form.sdt}
            onValueChange={(value) => onChange('sdt', value)}
          />

          <MyInput
            isRequired
            autoComplete='current-password'
            disabled={isLoading}
            errorMessage={errors.password}
            label={translate('login.password')}
            name='password'
            placeholder={translate('placeholder.enterPassWord')}
            type='password'
            value={form.password}
            onValueChange={(value) => onChange('password', value)}
          />

          <MyButton className='w-full font-semibold' isLoading={isLoading} size='lg' type='submit'>
            {translate('login.login')}
          </MyButton>

          <MyButton className='w-full' variant='ghost' onClick={() => router.push(ROUTES.home)}>
            {translate('common.back')}
          </MyButton>
        </form>
      </div>
    </div>
  )
}

export default LoginScreen
