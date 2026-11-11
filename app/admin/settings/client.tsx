'use client'
import { useState } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import { ClockIcon } from '@/components/Icons/Clock'
import { FacebookIcon } from '@/components/Icons/Facebook'
import { LocationIcon } from '@/components/Icons/Location'
import { MailIcon } from '@/components/Icons/Mail'
import { PhoneIcon } from '@/components/Icons/Phone'
import { UserCircleIcon } from '@/components/Icons/UserCircle'
import { INFO_CONTACT, LINK_CONTACT } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { showNotificationSuccess } from '@/utils/notification'

type SettingForm = {
  siteName: string
  hotline: string
  email: string
  address: string
  workingTime: string
  facebook: string
  description: string
}

const SettingManagement = () => {
  const { translate } = useLanguage()
  const { user } = useUser()

  const [form, setForm] = useState<SettingForm>({
    siteName: INFO_CONTACT.name,
    hotline: INFO_CONTACT.phoneDisplay,
    email: INFO_CONTACT.email,
    address: INFO_CONTACT.address,
    workingTime: INFO_CONTACT.workingTime,
    facebook: LINK_CONTACT.FaceBook,
    description: translate('home.heroDesc'),
  })
  const [saving, setSaving] = useState(false)

  const onChange = (key: keyof SettingForm, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  // Values are kept in constants/app.ts today; this form previews them until a
  // settings endpoint exists on the backend.
  const onSave = async () => {
    setSaving(true)
    showNotificationSuccess(translate('admin.savedSuccess'))
    setSaving(false)
  }

  return (
    <AdminPage description={translate('admin.settingManagementDesc')} title={translate('admin.settingManagement')}>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <AdminCard className='lg:col-span-2'>
          <h3 className='text-base font-bold text-base-content'>{translate('contact.infoTitle')}</h3>

          <MyInput label={translate('admin.siteName')} value={form.siteName} onValueChange={(value) => onChange('siteName', value)} />

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <MyInput
              label={translate('admin.hotline')}
              startContent={<PhoneIcon className='size-4' />}
              value={form.hotline}
              onValueChange={(value) => onChange('hotline', value)}
            />
            <MyInput
              label={translate('admin.email')}
              startContent={<MailIcon className='size-4' />}
              value={form.email}
              onValueChange={(value) => onChange('email', value)}
            />
          </div>

          <MyInput
            label={translate('contact.address')}
            startContent={<LocationIcon className='size-4' />}
            value={form.address}
            onValueChange={(value) => onChange('address', value)}
          />

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <MyInput
              label={translate('contact.workingTime')}
              startContent={<ClockIcon className='size-4' />}
              value={form.workingTime}
              onValueChange={(value) => onChange('workingTime', value)}
            />
            <MyInput
              label='Facebook'
              startContent={<FacebookIcon className='size-4' />}
              value={form.facebook}
              onValueChange={(value) => onChange('facebook', value)}
            />
          </div>

          <MyInputArea
            label={translate('blog.subtitle')}
            minRows={3}
            value={form.description}
            onValueChange={(value) => onChange('description', value)}
          />

          <MyButton className='self-start font-semibold' isLoading={saving} onClick={onSave}>
            {translate('common.save')}
          </MyButton>
        </AdminCard>

        <AdminCard>
          <h3 className='text-base font-bold text-base-content'>{translate('header.admin.teacher')}</h3>
          <div className='flex items-center gap-3 rounded-box bg-base-200 p-4'>
            <span className='flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
              <UserCircleIcon className='size-7' />
            </span>
            <div className='min-w-0'>
              <p className='truncate font-bold text-base-content'>{user?.name}</p>
              <p className='truncate text-sm text-base-content/60'>{user?.sdt}</p>
              {user?.isAdmin && <span className='badge badge-primary badge-sm mt-1'>{translate('admin.isAdmin')}</span>}
            </div>
          </div>

          <p className='rounded-box border border-warning/30 bg-warning/10 p-3 text-xs text-base-content/70'>
            {translate('admin.settingManagementDesc')}
          </p>
        </AdminCard>
      </div>
    </AdminPage>
  )
}

export default SettingManagement
