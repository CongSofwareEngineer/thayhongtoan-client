import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import React from 'react'

import MyButton from '../MyButton'
import MyInput from '../MyInput'

import useLanguage from '@/hooks/useLanguage'

interface ModalRegisterProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  isLoading?: boolean
}

const ModalRegister = ({ isOpen, onClose, onSubmit, isLoading }: ModalRegisterProps) => {
  const { translate } = useLanguage()
  const [formData, setFormData] = React.useState({
    parentName: '',
    parentPhone: '',
    studentName: '',
    studentAge: '',
    classId: '',
  })

  // Mock form handling for UI demo
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{translate('register.register') || 'Đăng ký học'}</ModalHeader>
            <ModalBody>
              <MyInput
                label={translate('register.name') || 'Họ tên phụ huynh'}
                placeholder={translate('placeholder.enterName')}
                value={formData.parentName}
                onChange={(e) => handleChange('parentName', e.target.value)}
              />
              <MyInput
                label={translate('register.phone') || 'Số điện thoại'}
                placeholder={translate('placeholder.enterNumberPhone')}
                value={formData.parentPhone}
                onChange={(e) => handleChange('parentPhone', e.target.value)}
              />
              <MyInput
                label={translate('admin.student') || 'Tên học sinh'}
                placeholder={translate('placeholder.enterName')}
                value={formData.studentName}
                onChange={(e) => handleChange('studentName', e.target.value)}
              />
              <MyInput
                label={translate('register.age') || 'Tuổi học sinh'}
                placeholder={translate('placeholder.enterAge')}
                value={formData.studentAge}
                onChange={(e) => handleChange('studentAge', e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <MyButton color='danger' variant='light' onClick={onClose}>
                {translate('common.close')}
              </MyButton>
              <MyButton color='primary' isLoading={isLoading} onClick={handleSubmit}>
                {translate('common.register')}
              </MyButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalRegister
