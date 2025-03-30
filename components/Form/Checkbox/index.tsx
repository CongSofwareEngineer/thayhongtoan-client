import { Checkbox, CheckboxProps } from '@mantine/core'
import React from 'react'

type ICheckboxForm = {
  formData: any
  keyName?: string
  className?: string
} & CheckboxProps

const CheckboxForm = ({ formData, keyName = '', className = '', ...props }: ICheckboxForm) => {
  return (
    <Checkbox
      key={formData.key(keyName)}
      className={className}
      {...props}
      {...formData.getInputProps(keyName)}
      {...formData.getInputProps(keyName, { type: 'checkbox' })}
    />
  )
}

export default CheckboxForm
