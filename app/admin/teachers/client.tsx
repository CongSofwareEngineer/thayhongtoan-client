'use client'
import { useState } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import MyButton from '@/components/MyButton'
import MyCheckbox from '@/components/MyCheckbox'
import MyInput from '@/components/MyInput'
import MyInputNumber from '@/components/MyInputNumber'
import MySelect from '@/components/MySelect'
import MyTable, { Column } from '@/components/MyTable'
import { PencilIcon } from '@/components/Icons/Pencil'
import { PlusIcon } from '@/components/Icons/Plus'
import { SearchIcon } from '@/components/Icons/Search'
import { TrashIcon } from '@/components/Icons/Trash'
import { QUERY_KEY } from '@/constants/reactQuery'
import useConfirm from '@/hooks/useConfirm'
import useDebounce from '@/hooks/useDebounce'
import useGetTeacher from '@/hooks/react-query/useGetTeacher'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import TeacherAPI from '@/services/API/Teacher'
import { ITeacher } from '@/services/API/Teacher/type'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { cn } from '@/utils/tailwind'

const PHONE_REGEX = /^(0|\+84)(\d{9})$/

type TeacherForm = {
  name: string
  sdt: string
  email: string
  password: string
  age?: number
  sex: boolean
  isAdmin: boolean
}

const TeacherFormBody = ({ item, onDone }: { item?: ITeacher; onDone: () => void }) => {
  const { translate } = useLanguage()
  const { close } = useModalDrawer()
  const [form, setForm] = useState<TeacherForm>({
    name: item?.name || '',
    sdt: item?.sdt || '',
    email: item?.email || '',
    password: '',
    age: item?.age,
    sex: item?.sex ?? true,
    isAdmin: item?.isAdmin ?? false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof TeacherForm, string>>>({})
  const [saving, setSaving] = useState(false)

  const onChange = (key: keyof TeacherForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSave = async () => {
    const nextErrors: Partial<Record<keyof TeacherForm, string>> = {}

    if (!form.name.trim()) {
      nextErrors.name = translate('errors.empty')
    }
    if (!PHONE_REGEX.test(form.sdt.trim())) {
      nextErrors.sdt = translate('errors.errorSDT')
    }
    // Password is required only when creating a new account
    if (!item?._id && form.password.trim().length < 4) {
      nextErrors.password = translate('errors.minimumPass')
    }
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const payload: any = {
      name: form.name.trim(),
      sdt: form.sdt.trim(),
      email: form.email,
      age: form.age || 0,
      sex: form.sex,
      isAdmin: form.isAdmin,
    }

    if (form.password.trim()) {
      payload.password = form.password.trim()
    }

    setSaving(true)
    try {
      if (item?._id) {
        await TeacherAPI.update(item._id, payload)
        showNotificationSuccess(translate('admin.updatedSuccess'))
      } else {
        await TeacherAPI.create(payload)
        showNotificationSuccess(translate('admin.createdSuccess'))
      }
      onDone()
      close()
    } catch {
      showNotificationError(translate('errors.serverError'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <MyInput
          isRequired
          errorMessage={errors.name}
          label={translate('admin.name')}
          placeholder={translate('placeholder.enterName')}
          value={form.name}
          onValueChange={(value) => onChange('name', value)}
        />
        <MyInput
          isRequired
          errorMessage={errors.sdt}
          inputMode='tel'
          label={translate('admin.phone')}
          placeholder={translate('placeholder.enterNumberPhone')}
          value={form.sdt}
          onValueChange={(value) => onChange('sdt', value)}
        />
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <MyInput
          label={translate('admin.email')}
          placeholder={translate('placeholder.enterEmail')}
          type='email'
          value={form.email}
          onValueChange={(value) => onChange('email', value)}
        />
        <MyInputNumber
          label={translate('admin.age')}
          max={99}
          min={18}
          placeholder={translate('placeholder.enterContent')}
          value={form.age}
          onChange={(value) => onChange('age', value)}
        />
      </div>

      <MyInput
        errorMessage={errors.password}
        isRequired={!item?._id}
        label={translate('login.password')}
        placeholder={translate('placeholder.enterPassWord')}
        type='password'
        value={form.password}
        onValueChange={(value) => onChange('password', value)}
      />

      <MySelect
        label={translate('admin.teacher')}
        options={[
          { key: 'true', label: 'Nam' },
          { key: 'false', label: 'Nữ' },
        ]}
        value={String(form.sex)}
        onValueChange={(value) => onChange('sex', value === 'true')}
      />

      <MyCheckbox isSelected={form.isAdmin} onValueChange={(checked) => onChange('isAdmin', checked)}>
        {translate('admin.isAdmin')}
      </MyCheckbox>

      <div className='flex justify-end gap-2 pt-2'>
        <MyButton variant='ghost' onClick={close}>
          {translate('common.cancel')}
        </MyButton>
        <MyButton className='font-semibold' isLoading={saving} onClick={onSave}>
          {translate('common.save')}
        </MyButton>
      </div>
    </div>
  )
}

const TeacherManagement = () => {
  const { translate } = useLanguage()
  const { open } = useModalDrawer()
  const { confirm } = useConfirm()
  const [search, setSearch] = useState('')
  const keyword = useDebounce(search, 400)

  const { data: teachers, isLoading, hasNextPage, fetchNextPage, refetch } = useGetTeacher({ name: keyword || undefined })

  const columns: Column[] = [
    { key: 'name', label: translate('admin.name') },
    { key: 'sdt', label: translate('admin.phone') },
    { key: 'email', label: translate('admin.email') },
    { key: 'isAdmin', label: translate('admin.isAdmin'), align: 'center' },
    { key: 'actions', label: translate('admin.actions'), align: 'right' },
  ]

  const openForm = (item?: ITeacher) =>
    open({
      title: item ? translate('admin.editTeacher') : translate('admin.addTeacher'),
      size: '2xl',
      children: <TeacherFormBody item={item} onDone={refetch} />,
    })

  const handleDelete = (item: ITeacher) =>
    confirm({
      description: `${translate('common.deleteConfirmDesc')} (${item.name})`,
      onConfirm: async () => {
        try {
          await TeacherAPI.delete(`/${item._id}`)
          showNotificationSuccess(translate('admin.deletedSuccess'))
          refetch()
        } catch {
          showNotificationError(translate('errors.serverError'))
        }
      },
    })

  const renderCell = (item: ITeacher, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return <span className='font-semibold text-base-content'>{item.name}</span>
      case 'isAdmin':
        return <span className={cn('badge badge-sm', item.isAdmin ? 'badge-primary' : 'badge-ghost')}>{item.isAdmin ? '✓' : '—'}</span>
      case 'actions':
        return (
          <div className='flex items-center justify-end gap-1'>
            <button aria-label={translate('common.edit')} className='btn btn-square btn-ghost btn-sm' type='button' onClick={() => openForm(item)}>
              <PencilIcon className='size-4' />
            </button>
            <button
              aria-label={translate('common.delete')}
              className='btn btn-square btn-ghost btn-sm text-error'
              type='button'
              onClick={() => handleDelete(item)}
            >
              <TrashIcon className='size-4' />
            </button>
          </div>
        )
      default:
        return (item as any)[columnKey] || '—'
    }
  }

  const renderMobileItem = (item: ITeacher) => (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-2'>
        <span className='font-bold text-base-content'>{item.name}</span>
        {item.isAdmin && <span className='badge badge-primary badge-sm'>{translate('admin.isAdmin')}</span>}
      </div>
      <span className='text-sm text-base-content/60'>{item.sdt}</span>
      <div className='flex gap-2'>
        <MyButton size='sm' variant='outline' onClick={() => openForm(item)}>
          <PencilIcon className='size-4' />
          {translate('common.edit')}
        </MyButton>
        <MyButton color='error' size='sm' variant='outline' onClick={() => handleDelete(item)}>
          <TrashIcon className='size-4' />
        </MyButton>
      </div>
    </div>
  )

  return (
    <AdminPage
      action={
        <MyButton className='font-semibold' onClick={() => openForm()}>
          <PlusIcon className='size-5' />
          {translate('admin.addTeacher')}
        </MyButton>
      }
      description={translate('admin.teacherManagementDesc')}
      title={translate('admin.teacherManagement')}
    >
      <AdminCard>
        <MyInput
          className='md:max-w-sm'
          placeholder={translate('admin.searchName')}
          startContent={<SearchIcon className='size-5' />}
          value={search}
          onValueChange={setSearch}
        />

        <MyTable
          ariaLabel={QUERY_KEY.Teacher}
          columns={columns}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          items={teachers}
          renderCell={renderCell as any}
          renderMobileItem={renderMobileItem as any}
          onLoadMore={fetchNextPage}
        />
      </AdminCard>
    </AdminPage>
  )
}

export default TeacherManagement
