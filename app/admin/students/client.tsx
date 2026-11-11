'use client'
import { useState } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyInputNumber from '@/components/MyInputNumber'
import MySelect from '@/components/MySelect'
import MyTable, { Column } from '@/components/MyTable'
import { PencilIcon } from '@/components/Icons/Pencil'
import { PlusIcon } from '@/components/Icons/Plus'
import { SearchIcon } from '@/components/Icons/Search'
import { TrashIcon } from '@/components/Icons/Trash'
import { UserIcon } from '@/components/Icons/User'
import { QUERY_KEY } from '@/constants/reactQuery'
import useConfirm from '@/hooks/useConfirm'
import useDebounce from '@/hooks/useDebounce'
import useGetClass from '@/hooks/react-query/useGetClass'
import useGetParent from '@/hooks/react-query/useGetParent'
import useGetStudent from '@/hooks/react-query/useGetStudent'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import StudentAPI from '@/services/API/Student'
import { IStudent, StudentStatus } from '@/services/API/Student/type'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { cn } from '@/utils/tailwind'

type StudentForm = {
  name: string
  age?: number
  idClass: string
  idParent: string
  status: StudentStatus
}

const idOf = (value: any) => (typeof value === 'string' ? value : value?._id || '')
const nameOf = (value: any) => (typeof value === 'string' ? '' : value?.name || '')

const StudentFormBody = ({ item, onDone }: { item?: IStudent; onDone: () => void }) => {
  const { translate } = useLanguage()
  const { close } = useModalDrawer()
  const { data: classes } = useGetClass({ limit: 50 })
  const { data: parents } = useGetParent({ limit: 100 })

  const [form, setForm] = useState<StudentForm>({
    name: item?.name || '',
    age: item?.age,
    idClass: idOf(item?.idClass),
    idParent: idOf(item?.idParent),
    status: item?.status || StudentStatus.ACTIVE,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof StudentForm, string>>>({})
  const [saving, setSaving] = useState(false)

  const onChange = (key: keyof StudentForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSave = async () => {
    const nextErrors: Partial<Record<keyof StudentForm, string>> = {}

    if (!form.name.trim()) {
      nextErrors.name = translate('errors.empty')
    }
    if (!form.age) {
      nextErrors.age = translate('errors.empty')
    }
    if (!form.idClass) {
      nextErrors.idClass = translate('errors.empty')
    }
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSaving(true)
    try {
      const payload: any = { name: form.name.trim(), age: form.age, idClass: form.idClass, status: form.status }

      if (form.idParent) {
        payload.idParent = form.idParent
      }

      if (item?._id) {
        await StudentAPI.update(item._id, payload)
        showNotificationSuccess(translate('admin.updatedSuccess'))
      } else {
        await StudentAPI.create(payload)
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
        <MyInputNumber
          isRequired
          errorMessage={errors.age}
          label={translate('admin.age')}
          max={18}
          min={3}
          placeholder={translate('placeholder.enterAge')}
          value={form.age}
          onChange={(value) => onChange('age', value)}
        />
      </div>

      <MySelect
        isRequired
        errorMessage={errors.idClass}
        label={translate('admin.class')}
        options={classes.map((entry) => ({ key: entry._id!, label: entry.name }))}
        placeholder={translate('placeholder.selectOption')}
        value={form.idClass}
        onValueChange={(value) => onChange('idClass', value)}
      />

      <MySelect
        label={`${translate('admin.parentName')} (${translate('common.optional')})`}
        options={parents.map((entry) => ({ key: entry._id!, label: `${entry.name} - ${entry.phone}` }))}
        placeholder={translate('placeholder.selectOption')}
        value={form.idParent}
        onValueChange={(value) => onChange('idParent', value)}
      />

      <MySelect
        label={translate('admin.status')}
        options={[
          { key: StudentStatus.ACTIVE, label: translate('admin.active') },
          { key: StudentStatus.INACTIVE, label: translate('admin.inactive') },
        ]}
        value={form.status}
        onValueChange={(value) => onChange('status', value)}
      />

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

const StudentManagement = () => {
  const { translate } = useLanguage()
  const { open } = useModalDrawer()
  const { confirm } = useConfirm()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('')
  const keyword = useDebounce(search, 400)

  const { data: classes } = useGetClass({ limit: 50 })
  const [idClass, setIdClass] = useState<string>('')

  const {
    data: students,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetStudent({
    name: keyword || undefined,
    idClass: idClass || undefined,
    status: (status as StudentStatus) || undefined,
  })

  const columns: Column[] = [
    { key: 'name', label: translate('admin.student') },
    { key: 'age', label: translate('admin.age'), align: 'center' },
    { key: 'class', label: translate('admin.class') },
    { key: 'parent', label: translate('admin.parentName') },
    { key: 'status', label: translate('admin.status'), align: 'center' },
    { key: 'actions', label: translate('admin.actions'), align: 'right' },
  ]

  const openForm = (item?: IStudent) =>
    open({
      title: item ? translate('admin.editStudent') : translate('admin.newStudent'),
      size: '2xl',
      children: <StudentFormBody item={item} onDone={refetch} />,
    })

  const handleDelete = (item: IStudent) =>
    confirm({
      description: `${translate('common.deleteConfirmDesc')} (${item.name})`,
      onConfirm: async () => {
        try {
          await StudentAPI.delete(`/${item._id}`)
          showNotificationSuccess(translate('admin.deletedSuccess'))
          refetch()
        } catch {
          showNotificationError(translate('errors.serverError'))
        }
      },
    })

  const renderStatus = (item: IStudent) => (
    <span className={cn('badge badge-sm font-semibold', item.status === StudentStatus.ACTIVE ? 'badge-success' : 'badge-ghost')}>
      {item.status === StudentStatus.ACTIVE ? translate('admin.active') : translate('admin.inactive')}
    </span>
  )

  const renderCell = (item: IStudent, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <span className='flex items-center gap-2 font-semibold text-base-content'>
            <UserIcon className='size-4 text-base-content/40' />
            {item.name}
          </span>
        )
      case 'class':
        return nameOf(item.idClass) || '—'
      case 'parent':
        return item.idParent?.name ? `${item.idParent.name} · ${item.idParent.phone}` : '—'
      case 'status':
        return renderStatus(item)
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
        return (item as any)[columnKey] ?? '—'
    }
  }

  const renderMobileItem = (item: IStudent) => (
    <div className='flex flex-col gap-2'>
      <div className='flex items-start justify-between gap-2'>
        <span className='font-bold text-base-content'>{item.name}</span>
        {renderStatus(item)}
      </div>
      <span className='text-sm text-base-content/60'>
        {translate('admin.age')}: {item.age} · {nameOf(item.idClass) || '—'}
      </span>
      {item.idParent?.name && (
        <span className='text-sm text-base-content/60'>
          {translate('admin.parentName')}: {item.idParent.name} · {item.idParent.phone}
        </span>
      )}
      <div className='flex gap-2'>
        <MyButton size='sm' variant='outline' onClick={() => openForm(item)}>
          <PencilIcon className='size-4' />
          {translate('common.edit')}
        </MyButton>
        <MyButton color='error' size='sm' variant='outline' onClick={() => handleDelete(item)}>
          <TrashIcon className='size-4' />
          {translate('common.delete')}
        </MyButton>
      </div>
    </div>
  )

  return (
    <AdminPage
      action={
        <MyButton className='font-semibold' onClick={() => openForm()}>
          <PlusIcon className='size-5' />
          {translate('admin.addStudent')}
        </MyButton>
      }
      description={translate('admin.studentManagementDesc')}
      title={translate('admin.studentManagement')}
    >
      <AdminCard>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <MyInput
            placeholder={translate('placeholder.searchStudent')}
            startContent={<SearchIcon className='size-5' />}
            value={search}
            onValueChange={setSearch}
          />
          <MySelect
            options={[{ key: '', label: translate('admin.all') }, ...classes.map((entry) => ({ key: entry._id!, label: entry.name }))]}
            value={idClass}
            onValueChange={setIdClass}
          />
          <MySelect
            options={[
              { key: '', label: translate('admin.all') },
              { key: StudentStatus.ACTIVE, label: translate('admin.active') },
              { key: StudentStatus.INACTIVE, label: translate('admin.inactive') },
            ]}
            value={status}
            onValueChange={setStatus}
          />
        </div>

        <MyTable
          ariaLabel={QUERY_KEY.Student}
          columns={columns}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          items={students}
          renderCell={renderCell as any}
          renderMobileItem={renderMobileItem as any}
          onLoadMore={fetchNextPage}
        />
      </AdminCard>
    </AdminPage>
  )
}

export default StudentManagement
