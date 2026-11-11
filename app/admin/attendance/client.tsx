'use client'
import { useEffect, useMemo, useState } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import EmptyState from '@/components/EmptyState'
import MyButton from '@/components/MyButton'
import MySelect from '@/components/MySelect'
import StatCard from '@/components/StatCard'
import { CalendarIcon } from '@/components/Icons/Calendar'
import { CheckCircleIcon } from '@/components/Icons/CheckCircle'
import { ClockIcon } from '@/components/Icons/Clock'
import { XMarkIcon } from '@/components/Icons/XMark'
import { AttendanceStatus } from '@/services/API/Attendance/type'
import AttendanceAPI from '@/services/API/Attendance'
import useGetClass from '@/hooks/react-query/useGetClass'
import useGetStudent from '@/hooks/react-query/useGetStudent'
import useLanguage from '@/hooks/useLanguage'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { cn } from '@/utils/tailwind'

const STATUS_OPTIONS = [
  { value: AttendanceStatus.PRESENT, labelKey: 'admin.present', className: 'btn-success', icon: <CheckCircleIcon className='size-4' /> },
  { value: AttendanceStatus.LATE, labelKey: 'admin.late', className: 'btn-warning', icon: <ClockIcon className='size-4' /> },
  { value: AttendanceStatus.OFF, labelKey: 'admin.absent', className: 'btn-error', icon: <XMarkIcon className='size-4' /> },
] as const

const todayISO = () => new Date().toISOString().slice(0, 10)

const AttendanceManagement = () => {
  const { translate } = useLanguage()
  const { data: classes } = useGetClass({ limit: 50 })

  const [idClass, setIdClass] = useState('')
  const [day, setDay] = useState(todayISO())
  const [marks, setMarks] = useState<Record<string, AttendanceStatus>>({})
  const [saving, setSaving] = useState(false)

  const { data: students, isLoading } = useGetStudent({ idClass: idClass || undefined, limit: 100 })

  // Default everyone to present whenever the class or date changes
  useEffect(() => {
    const next: Record<string, AttendanceStatus> = {}

    students.forEach((student) => {
      if (student._id) {
        next[student._id] = AttendanceStatus.PRESENT
      }
    })
    setMarks(next)
  }, [students, idClass, day])

  const summary = useMemo(() => {
    const values = Object.values(marks)

    return {
      present: values.filter((value) => value === AttendanceStatus.PRESENT).length,
      late: values.filter((value) => value === AttendanceStatus.LATE).length,
      off: values.filter((value) => value === AttendanceStatus.OFF).length,
    }
  }, [marks])

  const onSave = async () => {
    if (!idClass) {
      showNotificationError(translate('admin.selectClassFirst'))

      return
    }

    setSaving(true)
    try {
      await AttendanceAPI.takeAttendance({
        attendances: Object.entries(marks).map(([idStudent, status]) => ({ idStudent, idClass, status, day })),
      })
      showNotificationSuccess(translate('admin.savedSuccess'))
    } catch {
      showNotificationError(translate('errors.serverError'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminPage
      action={
        <MyButton className='font-semibold' disabled={!idClass || students.length === 0} isLoading={saving} onClick={onSave}>
          <CheckCircleIcon className='size-5' />
          {translate('admin.saveAttendance')}
        </MyButton>
      }
      description={translate('admin.attendanceManagementDesc')}
      title={translate('admin.attendanceManagement')}
    >
      <AdminCard>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <MySelect
            label={translate('admin.class')}
            options={[{ key: '', label: translate('admin.selectClassFirst') }, ...classes.map((entry) => ({ key: entry._id!, label: entry.name }))]}
            value={idClass}
            onValueChange={setIdClass}
          />
          <div className='flex w-full flex-col gap-1.5'>
            <label className='text-sm font-semibold text-base-content' htmlFor='attendance-day'>
              {translate('admin.day')}
            </label>
            <label className='input w-full items-center gap-2 bg-base-100'>
              <CalendarIcon className='size-5 opacity-60' />
              <input
                className='grow bg-transparent outline-none'
                id='attendance-day'
                type='date'
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            </label>
          </div>
        </div>
      </AdminCard>

      {idClass && students.length > 0 && (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <StatCard color='success' icon={<CheckCircleIcon className='size-7' />} label={translate('admin.present')} value={summary.present} />
          <StatCard color='warning' icon={<ClockIcon className='size-7' />} label={translate('admin.late')} value={summary.late} />
          <StatCard color='error' icon={<XMarkIcon className='size-7' />} label={translate('admin.absent')} value={summary.off} />
        </div>
      )}

      <AdminCard>
        {!idClass ? (
          <EmptyState icon={<CalendarIcon className='size-12' />} title={translate('admin.selectClassFirst')} />
        ) : isLoading ? (
          <div className='h-40 rounded-box skeleton-loading' />
        ) : students.length === 0 ? (
          <EmptyState title={translate('common.noData')} />
        ) : (
          <ul className='flex flex-col divide-y divide-base-300'>
            {students.map((student) => (
              <li key={student._id} className='flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center gap-3'>
                  <span className='flex size-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary'>
                    {student.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className='font-semibold text-base-content'>{student.name}</p>
                    <p className='text-xs text-base-content/50'>
                      {student.age} {translate('admin.age').toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className='join'>
                  {STATUS_OPTIONS.map((option) => {
                    const active = marks[student._id!] === option.value

                    return (
                      <button
                        key={option.value}
                        className={cn('btn join-item btn-sm gap-1', active ? option.className : 'btn-ghost border border-base-300')}
                        type='button'
                        onClick={() => setMarks((prev) => ({ ...prev, [student._id!]: option.value }))}
                      >
                        {option.icon}
                        <span className='hidden sm:inline'>{translate(option.labelKey as any)}</span>
                      </button>
                    )
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </AdminPage>
  )
}

export default AttendanceManagement
