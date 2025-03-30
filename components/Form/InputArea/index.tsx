import { Textarea, TextareaProps } from '@mantine/core'
import React from 'react'
type InputFormProps = {
  formData?: any
  keyName?: string
  className?: string
  showCount?: boolean
} & TextareaProps

const InputAreaForm = ({
  formData,
  keyName = '',
  className = '',
  showCount = false,
  ...props
}: InputFormProps) => {
  const getLengthText = () => {
    if (formData.values[keyName]) {
      return formData.values[keyName].length
    }
    return 0
  }
  return (
    <div className='flex flex-col gap-1 w-full'>
      <Textarea
        key={formData.key(keyName)}
        className={className}
        {...props}
        {...formData.getInputProps(keyName)}
      />
      {showCount && (
        <div className='flex text-xs justify-end'>{`${getLengthText()}/${props?.maxLength}`}</div>
      )}
    </div>
  )
}

export default InputAreaForm
