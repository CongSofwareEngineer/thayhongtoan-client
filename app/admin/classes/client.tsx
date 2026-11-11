'use client'
import { useState } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import MyInputNumber from '@/components/MyInputNumber'
import MyTable, { Column } from '@/components/MyTable'
import { PencilIcon } from '@/components/Icons/Pencil'
import { PlusIcon } from '@/components/Icons/Plus'
import { SearchIcon } from '@/components/Icons/Search'
import { TrashIcon } from '@/components/Icons/Trash'
import { QUERY_KEY } from '@/constants/reactQuery'
import useConfirm from '@/hooks/useConfirm'
import useDebounce from '@/hooks/useDebounce'
import useGetClass from '@/hooks/react-query/useGetClass'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import ClassAPI from '@/services/API/Class'
import { IClass } from '@/services/API/Class/type'
import { formatMoney } from '@/utils/functions'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

type ClassForm = {
  name: string
  price?: number
  numberStudent?: number
  time: string
  note: string
}

const toForm = (item?: IClass): ClassForm => ({
  name: item?.name || '',
  price: item?.price,
  numberStudent: item?.numberStudent,
  time: item?.attributes?.time || '',
  note: item?.note || '',
})

const ClassFormBody = ({ item, onDone }: { item?: IClass; onDone: () => void }) => {
  const { translate } = useLanguage()
  const { close } = useModalDrawer()
  const [form, setForm] = useState<ClassForm>(toForm(item))
  const [errors, setErrors] = useState<Partial<Record<keyof ClassForm, string>>>({})
  const [saving, setSaving] = useState(false)

  const onChange = (key: keyof ClassForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  // Create or update, depending on whether an existing class was passed in
  const onSave = async () => {
    const nextErrors: Partial<Record<keyof ClassForm, string>> = {}

    if (!form.name.trim()) {
      nextErrors.name = translate('errors.empty')
    }
    if (!form.price || form.price <= 0) {
      nextErrors.price = translate('errors.empty')
    }
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const payload: Partial<IClass> = {
      name: form.name.trim(),
      price: form.price,
      numberStudent: form.numberStudent || 0,
      note: form.note,
      attributes: { time: form.time },
    }

    setSaving(true)
    try {
      if (item?._id) {
        await ClassAPI.update(item._id, payload)
        showNotificationSuccess(translate('admin.updatedSuccess'))
      } else {
        await ClassAPI.create(payload)
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
      <MyInput
        isRequired
        errorMessage={errors.name}
        label={translate('admin.className')}
        placeholder={translate('placeholder.enterContent')}
        value={form.name}
        onValueChange={(value) => onChange('name', value)}
      />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <MyInputNumber
          formatComma
          isRequired
          endContent='đ'
          errorMessage={errors.price}
          label={translate('admin.price')}
          placeholder={translate('placeholder.enterAmount')}
          value={form.price}
          onChange={(value) => onChange('price', value)}
        />
        <MyInputNumber
          label={translate('admin.maxStudent')}
          min={1}
          placeholder={translate('placeholder.enterContent')}
          value={form.numberStudent}
          onChange={(value) => onChange('numberStudent', value)}
        />
      </div>

      <MyInput
        label={translate('admin.studyTime')}
        placeholder='17:30 - 19:00'
        value={form.time}
        onValueChange={(value) => onChange('time', value)}
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
          {translate('admin.saveClass')}
        </MyButton>
      </div>
    </div>
  )
}

const ClassManagement = () => {
  const { translate } = useLanguage()
  const { open } = useModalDrawer()
  const { confirm } = useConfirm()
  const [search, setSearch] = useState('')
  const keyword = useDebounce(search, 400)

  const { data: classes, isLoading, hasNextPage, fetchNextPage, refetch } = useGetClass({ name: keyword || undefined })

  const columns: Column[] = [
    { key: 'name', label: translate('admin.className') },
    { key: 'price', label: translate('admin.price') },
    { key: 'numberStudent', label: translate('admin.maxStudent'), align: 'center' },
    { key: 'time', label: translate('admin.studyTime') },
    { key: 'actions', label: translate('admin.actions'), align: 'right' },
  ]

  const openForm = (item?: IClass) =>
    open({
      title: item ? translate('admin.editClass') : translate('admin.newClass'),
      size: '2xl',
      children: <ClassFormBody item={item} onDone={refetch} />,
    })

  const handleDelete = (item: IClass) =>
    confirm({
      description: `${translate('common.deleteConfirmDesc')} (${item.name})`,
      onConfirm: async () => {
        try {
          await ClassAPI.delete(`/${item._id}`)
          showNotificationSuccess(translate('admin.deletedSuccess'))
          refetch()
        } catch {
          showNotificationError(translate('errors.serverError'))
        }
      },
    })

  const renderCell = (item: IClass, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className='flex flex-col'>
            <span className='font-semibold text-base-content'>{item.name}</span>
            {item.note && <span className='line-clamp-2-custom max-w-xs text-xs text-base-content/50'>{item.note}</span>}
          </div>
        )
      case 'price':
        return <span className='font-semibold text-primary'>{formatMoney(item.price)}</span>
      case 'numberStudent':
        return <span className='badge badge-ghost'>{item.numberStudent || 0}</span>
      case 'time':
        return item.attributes?.time || '—'
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
        return (item as any)[columnKey]
    }
  }

  const renderMobileItem = (item: IClass) => (
    <div className='flex flex-col gap-2'>
      <div className='flex items-start justify-between gap-3'>
        <span className='font-bold text-base-content'>{item.name}</span>
        <span className='font-semibold text-primary'>{formatMoney(item.price)}</span>
      </div>
      <span className='text-sm text-base-content/60'>
        {translate('admin.studyTime')}: {item.attributes?.time || '—'} · {translate('admin.maxStudent')}: {item.numberStudent || 0}
      </span>
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
          {translate('admin.addClass')}
        </MyButton>
      }
      description={translate('admin.classManagementDesc')}
      title={translate('admin.classManagement')}
    >
      <AdminCard>
        <MyInput
          className='md:max-w-sm'
          placeholder={translate('placeholder.searchClass')}
          startContent={<SearchIcon className='size-5' />}
          value={search}
          onValueChange={setSearch}
        />

        <MyTable
          ariaLabel={QUERY_KEY.Class}
          columns={columns}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          items={classes}
          renderCell={renderCell as any}
          renderMobileItem={renderMobileItem as any}
          onLoadMore={fetchNextPage}
        />
      </AdminCard>
    </AdminPage>
  )
}

export default ClassManagement
