import { PasswordInput, PasswordInputProps } from '@mantine/core'
import React from 'react'

type IInputPasswordForm = {
  formData: any
  keyName?: string
  className?: string
} & PasswordInputProps

const InputPasswordForm = ({
  formData,
  keyName = '',
  className = '',
  ...props
}: IInputPasswordForm) => {
  return (
    <PasswordInput
      key={formData.key(keyName)}
      className={className}
      {...props}
      {...formData.getInputProps(keyName)}
    />
  )
}

export default InputPasswordForm
