'use client'
import { useState } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import EmptyState from '@/components/EmptyState'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import MyTable, { Column } from '@/components/MyTable'
import { PencilIcon } from '@/components/Icons/Pencil'
import { PlusIcon } from '@/components/Icons/Plus'
import { SearchIcon } from '@/components/Icons/Search'
import { TrashIcon } from '@/components/Icons/Trash'
import { UsersIcon } from '@/components/Icons/Users'
import { QUERY_KEY } from '@/constants/reactQuery'
import useConfirm from '@/hooks/useConfirm'
import useDebounce from '@/hooks/useDebounce'
import useGetParent from '@/hooks/react-query/useGetParent'
import useGetStudent from '@/hooks/react-query/useGetStudent'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import ParentAPI from '@/services/API/Parent'
import { IParent } from '@/services/API/Parent/type'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

const PHONE_REGEX = /^(0|\+84)(\d{9})$/

type ParentForm = { name: string; phone: string; address: string; note: string }

const ParentFormBody = ({ item, onDone }: { item?: IParent; onDone: () => void }) => {
  const { translate } = useLanguage()
  const { close } = useModalDrawer()
  const [form, setForm] = useState<ParentForm>({
    name: item?.name || '',
    phone: item?.phone || '',
    address: item?.address || '',
    note: item?.note || '',
  })
  const [errors, setErrors] = useState<Partial<ParentForm>>({})
  const [saving, setSaving] = useState(false)

  const onChange = (key: keyof ParentForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSave = async () => {
    const nextErrors: Partial<ParentForm> = {}

    if (!form.name.trim()) {
      nextErrors.name = translate('errors.empty')
    }
    if (!PHONE_REGEX.test(form.phone.trim())) {
      nextErrors.phone = translate('errors.errorSDT')
    }
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSaving(true)
    try {
      if (item?._id) {
        await ParentAPI.update(item._id, form)
        showNotificationSuccess(translate('admin.updatedSuccess'))
      } else {
        await ParentAPI.create(form)
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
          label={translate('admin.parentName')}
          placeholder={translate('placeholder.enterName')}
          value={form.name}
          onValueChange={(value) => onChange('name', value)}
        />
        <MyInput
          isRequired
          errorMessage={errors.phone}
          inputMode='tel'
          label={translate('admin.phone')}
          placeholder={translate('placeholder.enterNumberPhone')}
          value={form.phone}
          onValueChange={(value) => onChange('phone', value)}
        />
      </div>

      <MyInput
        label={translate('admin.address')}
        placeholder={translate('placeholder.enterAddress')}
        value={form.address}
        onValueChange={(value) => onChange('address', value)}
      />

      <MyInputArea
        label={translate('admin.note')}
        minRows={3}
        placeholder={translate('placeholder.enterNote')}
        value={form.note}
        onValueChange={(value) => onChange('note', value)}
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

const ChildrenList = ({ parent }: { parent: IParent }) => {
  const { translate } = useLanguage()
  const { data: students, isLoading } = useGetStudent({ idParent: parent._id } as any)

  if (isLoading) {
    return <div className='h-24 rounded-box skeleton-loading' />
  }

  if (students.length === 0) {
    return <EmptyState icon={<UsersIcon className='size-10' />} title={translate('common.noData')} />
  }

  return (
    <ul className='flex flex-col gap-3'>
      {students.map((student) => (
        <li key={student._id} className='flex items-center justify-between gap-3 rounded-box border border-base-300 p-4'>
          <div>
            <p className='font-bold text-base-content'>{student.name}</p>
            <p className='text-sm text-base-content/50'>
              {typeof student.idClass === 'string' ? '' : (student.idClass as any)?.name} · {student.age} {translate('admin.age').toLowerCase()}
            </p>
          </div>
          <UsersIcon className='size-5 text-primary' />
        </li>
      ))}
    </ul>
  )
}

const ParentManagement = () => {
  const { translate } = useLanguage()
  const { open } = useModalDrawer()
  const { confirm } = useConfirm()
  const [search, setSearch] = useState('')
  const keyword = useDebounce(search, 400)

  const { data: parents, isLoading, hasNextPage, fetchNextPage, refetch } = useGetParent({ name: keyword || undefined })

  const columns: Column[] = [
    { key: 'name', label: translate('admin.parentName') },
    { key: 'phone', label: translate('admin.phone') },
    { key: 'address', label: translate('admin.address') },
    { key: 'note', label: translate('admin.note') },
    { key: 'actions', label: translate('admin.actions'), align: 'right' },
  ]

  const openForm = (item?: IParent) =>
    open({
      title: item ? translate('admin.editParent') : translate('admin.addParent'),
      size: '2xl',
      children: <ParentFormBody item={item} onDone={refetch} />,
    })

  const openChildren = (item: IParent) =>
    open({
      title: `${translate('admin.listChildren')} - ${item.name}`,
      size: 'lg',
      children: <ChildrenList parent={item} />,
    })

  const handleDelete = (item: IParent) =>
    confirm({
      description: `${translate('common.deleteConfirmDesc')} (${item.name})`,
      onConfirm: async () => {
        try {
          await ParentAPI.delete(`/${item._id}`)
          showNotificationSuccess(translate('admin.deletedSuccess'))
          refetch()
        } catch {
          showNotificationError(translate('errors.serverError'))
        }
      },
    })

  const renderCell = (item: IParent, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <button className='font-semibold text-base-content hover:text-primary hover:underline' type='button' onClick={() => openChildren(item)}>
            {item.name}
          </button>
        )
      case 'address':
        return <span className='line-clamp-2-custom max-w-xs text-sm text-base-content/70'>{item.address || '—'}</span>
      case 'note':
        return <span className='line-clamp-2-custom max-w-xs text-sm text-base-content/50'>{item.note || '—'}</span>
      case 'actions':
        return (
          <div className='flex items-center justify-end gap-1'>
            <button
              aria-label={translate('admin.listChildren')}
              className='btn btn-square btn-ghost btn-sm'
              type='button'
              onClick={() => openChildren(item)}
            >
              <UsersIcon className='size-4' />
            </button>
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

  const renderMobileItem = (item: IParent) => (
    <div className='flex flex-col gap-2'>
      <span className='font-bold text-base-content'>{item.name}</span>
      <span className='text-sm text-base-content/60'>{item.phone}</span>
      {item.address && <span className='text-sm text-base-content/50'>{item.address}</span>}
      <div className='flex flex-wrap gap-2'>
        <MyButton size='sm' variant='outline' onClick={() => openChildren(item)}>
          <UsersIcon className='size-4' />
          {translate('admin.listChildren')}
        </MyButton>
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
          {translate('admin.addParent')}
        </MyButton>
      }
      description={translate('admin.parentManagementDesc')}
      title={translate('admin.parentManagement')}
    >
      <AdminCard>
        <MyInput
          className='md:max-w-sm'
          placeholder={translate('placeholder.searchParent')}
          startContent={<SearchIcon className='size-5' />}
          value={search}
          onValueChange={setSearch}
        />

        <MyTable
          ariaLabel={QUERY_KEY.Parent}
          columns={columns}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          items={parents}
          renderCell={renderCell as any}
          renderMobileItem={renderMobileItem as any}
          onLoadMore={fetchNextPage}
        />
      </AdminCard>
    </AdminPage>
  )
}

export default ParentManagement
