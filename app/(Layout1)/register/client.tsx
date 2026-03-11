'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover'
import { Listbox, ListboxItem } from '@heroui/listbox'
import { ScrollShadow } from '@heroui/scroll-shadow'

import MyButton from '@/components/MyButton'
import MyForm from '@/components/MyForm'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import MyInputNumber from '@/components/MyInputNumber'
import useLanguage from '@/hooks/useLanguage'
import useGetClass from '@/hooks/react-query/useGetClass'
import RegisterAPI from '@/services/API/Register'
import { cn } from '@/utils/tailwind'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useQuerySearch from '@/hooks/useQuerySearch'
import { TrashIcon } from '@/components/Icons/Trash'
import { SearchIcon } from '@/components/Icons/Search'
import { ArrowDownIcon } from '@/components/Icons/ArrowDown'

interface ClassSelectProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

interface StudentData {
  name: string
  age?: number
  idClass?: string
}

interface ParentData {
  name: string
  phone: string
  address: string
  note: string
}

interface RegisterFormData {
  parent: ParentData
  students: StudentData[]
}

const ClassSelect = ({ value, onChange, placeholder }: ClassSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  // Fetch a large number of classes to support client-side filtering effectively
  const { data: classes = [], isLoading } = useGetClass({})
  const { translate } = useLanguage()

  const filteredClasses = useMemo(() => {
    if (!search) return classes

    return classes.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  }, [classes, search])

  const selectedClass = useMemo(() => {
    return classes.find((c) => c._id === value)
  }, [classes, value])

  const handleSelect = (id: string) => {
    onChange(id)
    setIsOpen(false)
  }

  return (
    <Popover isOpen={isOpen} placement='bottom' triggerScaleOnOpen={false} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div
          className={cn(
            'relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 hover:bg-default-200 rounded-medium transition-colors motion-reduce:transition-none h-10 min-h-10 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 cursor-pointer',
            !value && 'text-default-500'
          )}
        >
          <span className='flex-1 text-small truncate'>
            {selectedClass ? selectedClass.name : value ? translate('register.selectedClass') : placeholder || translate('register.selectClass')}
          </span>
          <ArrowDownIcon className='text-default-500' />
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <div className='p-2'>
          <MyInput
            autoFocus
            isClearable
            placeholder={translate('register.searchClass')}
            size='sm'
            startContent={<SearchIcon className='text-default-400' />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>
        <ScrollShadow className='h-[200px] w-full p-2'>
          {isLoading ? (
            <div className='text-center text-small text-default-400 py-2'>{translate('common.loading')}</div>
          ) : filteredClasses.length === 0 ? (
            <div className='text-center text-small text-default-400 py-2'>{translate('register.notFoundClass')}</div>
          ) : (
            <Listbox
              aria-label='Select Class'
              selectedKeys={value ? [value] : []}
              selectionMode='single'
              onAction={(key) => handleSelect(key as string)}
            >
              {filteredClasses.map((c) => (
                <ListboxItem key={c._id} textValue={c.name}>
                  <div className='flex flex-col'>
                    <span className='text-small font-medium'>{c.name}</span>
                    <span className='text-tiny text-default-400'>{c.attributes?.time}</span>
                  </div>
                </ListboxItem>
              ))}
            </Listbox>
          )}
        </ScrollShadow>
      </PopoverContent>
    </Popover>
  )
}

const RegisterPageClient = () => {
  const { translate } = useLanguage()
  const router = useRouter()
  const { query } = useQuerySearch<{ idClass: string }>()

  const [errors, setErrors] = useState<any>({})
  const [formData, setFormData] = useState<RegisterFormData>({
    parent: {
      name: '',
      phone: '',
      address: '',
      note: '',
    },
    students: [
      {
        name: '',
        age: undefined,
        idClass: query?.idClass || undefined,
      },
    ],
  })

  console.log({ formData })

  const onChangeParent = (field: keyof ParentData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      parent: {
        ...prev.parent,
        [field]: value,
      },
    }))
    if (errors?.parent?.[field]) {
      setErrors((prev: any) => {
        const newErrors = { ...prev }

        if (newErrors.parent) {
          delete newErrors.parent[field]
          if (Object.keys(newErrors.parent).length === 0) delete newErrors.parent
        }

        return newErrors
      })
    }
  }

  const onChangeStudent = (index: number, field: keyof StudentData, value: any) => {
    setFormData((prev) => {
      const newStudents = [...prev.students]

      newStudents[index] = { ...newStudents[index], [field]: value }

      return { ...prev, students: newStudents }
    })

    if (errors?.students?.[index]?.[field]) {
      setErrors((prev: any) => {
        // Deep clone to safely delete
        const newErrors = JSON.parse(JSON.stringify(prev))

        if (newErrors.students && newErrors.students[index]) {
          delete newErrors.students[index][field]
        }

        return newErrors
      })
    }
  }

  const addStudent = () => {
    setFormData((prev) => ({
      ...prev,
      students: [...prev.students, { name: '', age: undefined, idClass: undefined }],
    }))
  }

  const removeStudent = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.filter((_, i) => i !== index),
    }))

    // Also remove errors for this student index if any
    setErrors((prev: any) => {
      // Cleaning up errors for removed items is complex due to index shift.
      // For simplicity, we just clear student errors or re-validate.
      // Let's just keep it simple.
      const newErrors = { ...prev }

      if (newErrors.students) delete newErrors.students

      return newErrors
    })
  }

  const validate = () => {
    const newErrors: any = {}
    let isValid = true

    if (!formData.parent.name) {
      if (!newErrors.parent) newErrors.parent = {}
      newErrors.parent.name = translate('errors.empty')
      isValid = false
    }
    if (!formData.parent.phone) {
      if (!newErrors.parent) newErrors.parent = {}
      newErrors.parent.phone = translate('errors.empty')
      isValid = false
    }

    // You can add logic to validate specific phone format if needed

    formData.students.forEach((student, index) => {
      if (!student.name) {
        if (!newErrors.students) newErrors.students = []
        if (!newErrors.students[index]) newErrors.students[index] = {}
        newErrors.students[index].name = translate('errors.empty')
        isValid = false
      }
      if (!student.age) {
        if (!newErrors.students) newErrors.students = []
        if (!newErrors.students[index]) newErrors.students[index] = {}
        newErrors.students[index].age = translate('errors.empty')
        isValid = false
      }
      if (!student.idClass) {
        if (!newErrors.students) newErrors.students = []
        if (!newErrors.students[index]) newErrors.students[index] = {}
        newErrors.students[index].idClass = translate('errors.empty')
        isValid = false
      }
    })

    setErrors(newErrors)

    return isValid
  }

  const onSubmit = async () => {
    if (!validate()) return

    try {
      await RegisterAPI.register(formData as any)
      showNotificationSuccess(translate('common.create') + ' ' + translate('register.register'))
      router.push('/login')
    } catch (error) {
      console.error(error)
      showNotificationError(translate('errors.serverError'))
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-6 w-full'>
      <h1 className='text-3xl font-bold mb-8 text-center'>{translate('register.register')}</h1>

      <MyForm className='flex flex-col gap-8 md:min-w-[600px] w-full'>
        {/* Parent Section */}
        <div className='bg-content1 rounded-large p-6 shadow-small w-full'>
          <h2 className='text-xl font-bold mb-4'>{translate('register.parentInfo')}</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <MyInput
                isRequired
                errorMessage={errors.parent?.name}
                isInvalid={!!errors.parent?.name}
                label={translate('register.parentName')}
                placeholder={translate('placeholder.enterName')}
                value={formData.parent.name}
                onChange={(e) => onChangeParent('name', e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <MyInput
                isRequired
                errorMessage={errors.parent?.phone}
                isInvalid={!!errors.parent?.phone}
                label={translate('admin.phone')}
                placeholder={translate('placeholder.enterNumberPhone')}
                value={formData.parent.phone}
                onChange={(e) => onChangeParent('phone', e.target.value)}
              />
            </div>
            <div className='md:col-span-2 flex flex-col gap-2'>
              <MyInput
                label={translate('admin.address')}
                placeholder={translate('placeholder.enterAddress')}
                value={formData.parent.address}
                onChange={(e) => onChangeParent('address', e.target.value)}
              />
            </div>
            <div className='md:col-span-2 flex flex-col gap-2'>
              <MyInputArea
                label={translate('admin.note')}
                minRows={2}
                placeholder={translate('placeholder.enterContent')}
                value={formData.parent.note}
                onChange={(e) => onChangeParent('note', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Students Section */}
        <div className='flex flex-col gap-4 w-full'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold'>{translate('register.studentInfo')}</h2>
            {/* <MyButton color='primary' size='sm' startContent={<PlusIcon className='text-lg' />} onClick={addStudent}> */}
            <MyButton color='primary' size='sm' onClick={addStudent}>
              {translate('register.addStudent')}
            </MyButton>
          </div>

          {formData.students.map((student, index) => (
            <div key={index} className='bg-content1 rounded-large p-6 shadow-small w-full relative'>
              {formData.students.length > 1 && (
                <button
                  className='absolute top-4 right-4 text-danger hover:bg-danger/10 p-2 rounded-full transition-colors'
                  type='button'
                  onClick={() => removeStudent(index)}
                >
                  <TrashIcon className='text-xl' />
                </button>
              )}

              <h3 className='font-semibold mb-3 text-default-500'>
                {translate('admin.student')} {index + 1}
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <MyInput
                  isRequired
                  errorMessage={errors.students?.[index]?.name}
                  isInvalid={!!errors.students?.[index]?.name}
                  label={translate('register.studentName')}
                  placeholder={translate('placeholder.enterName')}
                  value={student.name}
                  onChange={(e) => onChangeStudent(index, 'name', e.target.value)}
                />

                <MyInputNumber
                  isRequired
                  errorMessage={errors.students?.[index]?.age}
                  inputMode='numeric'
                  isInvalid={!!errors.students?.[index]?.age}
                  label={translate('admin.age')}
                  placeholder={translate('placeholder.enterAge')}
                  type='number'
                  value={student.age as any}
                  onChange={(value) => onChangeStudent(index, 'age', value)}
                />

                <div className='md:col-span-2'>
                  <div className='flex flex-col gap-1.5'>
                    <label className='text-small font-medium text-foreground-500 after:content-["*"] after:text-danger after:ml-0.5'>
                      {translate('admin.class')}
                    </label>
                    <ClassSelect value={student.idClass} onChange={(value) => onChangeStudent(index, 'idClass', value)} />
                    {errors.students?.[index]?.idClass && <span className='text-tiny text-danger'>{errors.students[index].idClass}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-end'>
          <MyButton className='w-full md:w-auto font-medium text-lg px-8' color='primary' onClick={onSubmit}>
            {translate('register.registerNow')}
          </MyButton>
        </div>
      </MyForm>
    </div>
  )
}

export default RegisterPageClient
