'use client'
import { useState } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyTable, { Column } from '@/components/MyTable'
import { CheckCircleIcon } from '@/components/Icons/CheckCircle'
import { PhoneIcon } from '@/components/Icons/Phone'
import { SearchIcon } from '@/components/Icons/Search'
import { TrashIcon } from '@/components/Icons/Trash'
import { UsersIcon } from '@/components/Icons/Users'
import { LINK_CONTACT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import useConfirm from '@/hooks/useConfirm'
import useDebounce from '@/hooks/useDebounce'
import useGetRegister from '@/hooks/react-query/useGetRegister'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import RegisterAPI from '@/services/API/Register'
import { IRegister } from '@/services/API/Register/type'
import { formatDate } from '@/utils/functions'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

type RegisterRow = IRegister & { _id?: string; createdAt?: string }

const RegisterDetail = ({ item }: { item: RegisterRow }) => {
  const { translate } = useLanguage()

  return (
    <div className='flex flex-col gap-4'>
      <div className='rounded-box bg-base-200 p-4'>
        <h4 className='text-sm font-bold uppercase tracking-wide text-base-content/50'>{translate('register.parentInfo')}</h4>
        <p className='mt-1 font-bold text-base-content'>{item.parent?.name}</p>
        <p className='text-sm text-base-content/70'>{item.parent?.phone}</p>
        {item.parent?.address && <p className='text-sm text-base-content/60'>{item.parent.address}</p>}
        {item.parent?.note && <p className='mt-2 text-sm italic text-base-content/60'>{item.parent.note}</p>}
      </div>

      <div className='flex flex-col gap-2'>
        <h4 className='text-sm font-bold uppercase tracking-wide text-base-content/50'>{translate('register.studentInfo')}</h4>
        {item.students?.map((student, index) => (
          <div key={student._id || index} className='flex items-center justify-between gap-3 rounded-box border border-base-300 p-4'>
            <div>
              <p className='font-bold text-base-content'>{student.name}</p>
              <p className='text-sm text-base-content/50'>
                {student.age} {translate('admin.age').toLowerCase()}
              </p>
            </div>
            <UsersIcon className='size-5 text-primary' />
          </div>
        ))}
      </div>

      <a className='btn btn-primary font-semibold' href={`${LINK_CONTACT.SDT.replace(/\d+$/, '')}${item.parent?.phone}`}>
        <PhoneIcon className='size-5' />
        {item.parent?.phone}
      </a>
    </div>
  )
}

const RegisterManagement = () => {
  const { translate } = useLanguage()
  const { open } = useModalDrawer()
  const { confirm } = useConfirm()
  const [search, setSearch] = useState('')
  const keyword = useDebounce(search, 400)

  const { data: registers, isLoading, hasNextPage, fetchNextPage, refetch } = useGetRegister({ name: keyword || undefined })

  const columns: Column[] = [
    { key: 'parent', label: translate('admin.parentName') },
    { key: 'phone', label: translate('admin.phone') },
    { key: 'students', label: translate('admin.listStudent') },
    { key: 'createdAt', label: translate('admin.createdAt') },
    { key: 'actions', label: translate('admin.actions'), align: 'right' },
  ]

  const openDetail = (item: RegisterRow) =>
    open({
      title: translate('admin.registerManagement'),
      size: 'lg',
      children: <RegisterDetail item={item} />,
    })

  const handleDelete = (item: RegisterRow) =>
    confirm({
      description: `${translate('common.deleteConfirmDesc')} (${item.parent?.name})`,
      onConfirm: async () => {
        try {
          await RegisterAPI.delete(`/${item._id}`)
          showNotificationSuccess(translate('admin.deletedSuccess'))
          refetch()
        } catch {
          showNotificationError(translate('errors.serverError'))
        }
      },
    })

  const renderCell = (item: RegisterRow, columnKey: string) => {
    switch (columnKey) {
      case 'parent':
        return (
          <button className='font-semibold text-base-content hover:text-primary hover:underline' type='button' onClick={() => openDetail(item)}>
            {item.parent?.name || '—'}
          </button>
        )
      case 'phone':
        return item.parent?.phone || '—'
      case 'students':
        return (
          <span className='flex flex-wrap gap-1'>
            {item.students?.map((student, index) => (
              <span key={student._id || index} className='badge badge-ghost badge-sm'>
                {student.name}
              </span>
            ))}
          </span>
        )
      case 'createdAt':
        return formatDate(item.createdAt) || '—'
      case 'actions':
        return (
          <div className='flex items-center justify-end gap-1'>
            <button aria-label={translate('common.view')} className='btn btn-square btn-ghost btn-sm' type='button' onClick={() => openDetail(item)}>
              <CheckCircleIcon className='size-4' />
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
        return '—'
    }
  }

  const renderMobileItem = (item: RegisterRow) => (
    <div className='flex flex-col gap-2'>
      <span className='font-bold text-base-content'>{item.parent?.name}</span>
      <span className='text-sm text-base-content/60'>{item.parent?.phone}</span>
      <span className='flex flex-wrap gap-1'>
        {item.students?.map((student, index) => (
          <span key={student._id || index} className='badge badge-ghost badge-sm'>
            {student.name}
          </span>
        ))}
      </span>
      <div className='flex gap-2'>
        <MyButton size='sm' variant='outline' onClick={() => openDetail(item)}>
          {translate('common.detail')}
        </MyButton>
        <MyButton color='error' size='sm' variant='outline' onClick={() => handleDelete(item)}>
          <TrashIcon className='size-4' />
        </MyButton>
      </div>
    </div>
  )

  return (
    <AdminPage description={translate('admin.registerManagementDesc')} title={translate('admin.registerManagement')}>
      <AdminCard>
        <MyInput
          className='md:max-w-sm'
          placeholder={translate('admin.searchName')}
          startContent={<SearchIcon className='size-5' />}
          value={search}
          onValueChange={setSearch}
        />

        <MyTable
          ariaLabel={QUERY_KEY.Register}
          columns={columns}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          items={registers}
          renderCell={renderCell as any}
          renderMobileItem={renderMobileItem as any}
          onLoadMore={fetchNextPage}
        />
      </AdminCard>
    </AdminPage>
  )
}

export default RegisterManagement
