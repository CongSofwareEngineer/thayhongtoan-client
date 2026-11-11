'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import MyInputNumber from '@/components/MyInputNumber'
import MySelect from '@/components/MySelect'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import { CheckCircleIcon } from '@/components/Icons/CheckCircle'
import { PlusIcon } from '@/components/Icons/Plus'
import { ShieldIcon } from '@/components/Icons/Shield'
import { TrashIcon } from '@/components/Icons/Trash'
import { UserCircleIcon } from '@/components/Icons/UserCircle'
import { UsersIcon } from '@/components/Icons/Users'
import { ROUTES } from '@/constants/routes'
import useGetClassPublic from '@/hooks/react-query/useGetClassPublic'
import useLanguage from '@/hooks/useLanguage'
import useQuerySearch from '@/hooks/useQuerySearch'
import RegisterAPI from '@/services/API/Register'
import { showNotificationError } from '@/utils/notification'

type StudentForm = { name: string; age?: number; idClass?: string }
type ParentForm = { name: string; phone: string; address: string; note: string }

const PHONE_REGEX = /^(0|\+84)(\d{9})$/
const emptyStudent = (idClass?: string): StudentForm => ({ name: '', age: undefined, idClass })

const RegisterScreen = () => {
  const { translate } = useLanguage()
  const router = useRouter()
  const { query } = useQuerySearch<{ idClass: string }>()
  const { data: classes, isLoading: isLoadingClass } = useGetClassPublic({ limit: 50 })

  const [parent, setParent] = useState<ParentForm>({ name: '', phone: '', address: '', note: '' })
  const [students, setStudents] = useState<StudentForm[]>([emptyStudent()])
  const [errors, setErrors] = useState<any>({})
  const [isSending, setIsSending] = useState(false)
  const [isDone, setIsDone] = useState(false)

  // Pre-select the class the parent came from (?idClass=...)
  useEffect(() => {
    if (query?.idClass) {
      setStudents((prev) => prev.map((item, index) => (index === 0 && !item.idClass ? { ...item, idClass: query.idClass } : item)))
    }
  }, [query?.idClass])

  const classOptions = classes.map((item) => ({ key: item._id, label: item.name }))

  const onChangeParent = (key: keyof ParentForm, value: string) => {
    setParent((prev) => ({ ...prev, [key]: value }))
    setErrors((prev: any) => ({ ...prev, parent: { ...prev.parent, [key]: undefined } }))
  }

  const onChangeStudent = (index: number, key: keyof StudentForm, value: any) => {
    setStudents((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)))
    setErrors((prev: any) => {
      const students = [...(prev.students || [])]

      students[index] = { ...students[index], [key]: undefined }

      return { ...prev, students }
    })
  }

  const addStudent = () => setStudents((prev) => [...prev, emptyStudent(query?.idClass)])
  const removeStudent = (index: number) => setStudents((prev) => prev.filter((_, i) => i !== index))

  // Check parent fields and every student row before sending
  const validate = () => {
    const nextErrors: any = { parent: {}, students: [] }
    let valid = true

    if (!parent.name.trim()) {
      nextErrors.parent.name = translate('errors.empty')
      valid = false
    }
    if (!PHONE_REGEX.test(parent.phone.trim())) {
      nextErrors.parent.phone = translate('errors.errorSDT')
      valid = false
    }

    if (students.length === 0) {
      showNotificationError(translate('register.errorNoStudent'))
      valid = false
    }

    students.forEach((student, index) => {
      const studentErrors: any = {}

      if (!student.name.trim()) {
        studentErrors.name = translate('errors.empty')
        valid = false
      }
      if (!student.age) {
        studentErrors.age = translate('errors.empty')
        valid = false
      }
      if (!student.idClass) {
        studentErrors.idClass = translate('errors.empty')
        valid = false
      }
      nextErrors.students[index] = studentErrors
    })

    setErrors(nextErrors)

    return valid
  }

  const onSubmit = async () => {
    if (!validate()) {
      return
    }

    setIsSending(true)
    try {
      await RegisterAPI.register({ parent, students } as any)
      setIsDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      showNotificationError(translate('errors.serverError'))
    } finally {
      setIsSending(false)
    }
  }

  if (isDone) {
    return (
      <Section containerClassName='py-20'>
        <div className='mx-auto flex max-w-xl flex-col items-center gap-4 rounded-box border border-success/30 bg-success/5 p-10 text-center'>
          <CheckCircleIcon className='size-16 text-success' />
          <h1 className='text-2xl font-extrabold text-base-content'>{translate('register.success')}</h1>
          <p className='text-sm text-base-content/70'>{translate('register.successDesc')}</p>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <MyButton onClick={() => router.push(ROUTES.home)}>{translate('register.backHome')}</MyButton>
            <MyButton variant='outline' onClick={() => router.push(ROUTES.class)}>
              {translate('class.title')}
            </MyButton>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: translate('register.register') }]}
        description={translate('register.subtitle')}
        title={translate('register.title')}
      />

      <Section>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='flex flex-col gap-6 lg:col-span-2'>
            {/* Parent */}
            <div className='flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm'>
              <h2 className='flex items-center gap-2 text-lg font-bold text-base-content'>
                <UserCircleIcon className='size-5 text-primary' />
                {translate('register.parentInfo')}
              </h2>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <MyInput
                  isRequired
                  errorMessage={errors.parent?.name}
                  label={translate('register.parentName')}
                  placeholder={translate('placeholder.enterName')}
                  value={parent.name}
                  onValueChange={(value) => onChangeParent('name', value)}
                />
                <MyInput
                  isRequired
                  errorMessage={errors.parent?.phone}
                  inputMode='tel'
                  label={translate('register.phone')}
                  placeholder={translate('placeholder.enterNumberPhone')}
                  value={parent.phone}
                  onValueChange={(value) => onChangeParent('phone', value)}
                />
              </div>

              <MyInput
                label={`${translate('register.address')} (${translate('common.optional')})`}
                placeholder={translate('placeholder.enterAddress')}
                value={parent.address}
                onValueChange={(value) => onChangeParent('address', value)}
              />

              <MyInputArea
                label={`${translate('register.note')} (${translate('common.optional')})`}
                minRows={2}
                placeholder={translate('placeholder.enterNote')}
                value={parent.note}
                onValueChange={(value) => onChangeParent('note', value)}
              />
            </div>

            {/* Students */}
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <h2 className='flex items-center gap-2 text-lg font-bold text-base-content'>
                  <UsersIcon className='size-5 text-primary' />
                  {translate('register.studentInfo')}
                </h2>
                <MyButton size='sm' variant='outline' onClick={addStudent}>
                  <PlusIcon className='size-4' />
                  {translate('register.addStudent')}
                </MyButton>
              </div>

              {students.map((student, index) => (
                <div key={index} className='relative flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-bold uppercase tracking-wide text-base-content/50'>
                      {translate('register.student')} {index + 1}
                    </h3>
                    {students.length > 1 && (
                      <button
                        aria-label={translate('register.removeStudent')}
                        className='btn btn-circle btn-ghost btn-sm text-error'
                        type='button'
                        onClick={() => removeStudent(index)}
                      >
                        <TrashIcon className='size-4' />
                      </button>
                    )}
                  </div>

                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <MyInput
                      isRequired
                      errorMessage={errors.students?.[index]?.name}
                      label={translate('register.studentName')}
                      placeholder={translate('placeholder.enterName')}
                      value={student.name}
                      onValueChange={(value) => onChangeStudent(index, 'name', value)}
                    />
                    <MyInputNumber
                      isRequired
                      errorMessage={errors.students?.[index]?.age}
                      label={translate('register.age')}
                      max={18}
                      min={3}
                      placeholder={translate('placeholder.enterAge')}
                      value={student.age}
                      onChange={(value) => onChangeStudent(index, 'age', value)}
                    />
                  </div>

                  <MySelect
                    isRequired
                    errorMessage={errors.students?.[index]?.idClass}
                    label={translate('register.selectClass')}
                    options={classOptions}
                    placeholder={isLoadingClass ? translate('common.loading') : translate('register.selectClass')}
                    value={student.idClass || ''}
                    onValueChange={(value) => onChangeStudent(index, 'idClass', value)}
                  />
                </div>
              ))}
            </div>

            <MyButton className='w-full font-semibold sm:w-auto sm:self-end sm:px-10' isLoading={isSending} size='lg' onClick={onSubmit}>
              {translate('register.registerNow')}
            </MyButton>
          </div>

          {/* Reassurance panel */}
          <aside className='lg:sticky lg:top-24 lg:h-fit'>
            <div className='flex flex-col gap-4 rounded-box border border-primary/20 bg-primary/5 p-6'>
              <ShieldIcon className='size-10 text-primary' />
              <h3 className='text-lg font-bold text-base-content'>{translate('home.why6Title')}</h3>
              <ul className='flex flex-col gap-3 text-sm text-base-content/70'>
                <li className='flex items-start gap-2'>
                  <CheckCircleIcon className='mt-0.5 size-4 shrink-0 text-success' />
                  {translate('home.step2Desc')}
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircleIcon className='mt-0.5 size-4 shrink-0 text-success' />
                  {translate('home.step3Desc')}
                </li>
                <li className='flex items-start gap-2'>
                  <CheckCircleIcon className='mt-0.5 size-4 shrink-0 text-success' />
                  {translate('tuitionPage.policy3')}
                </li>
              </ul>
              <p className='rounded-field bg-base-100 p-3 text-xs text-base-content/60'>{translate('class.freeTrialNote')}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}

export default RegisterScreen
