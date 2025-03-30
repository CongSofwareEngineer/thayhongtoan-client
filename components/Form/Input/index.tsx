import { cn } from '@/utils/tailwind'
import { TextInput, TextInputProps } from '@mantine/core'
import React from 'react'
type InputFormProps = {
  formData?: any
  keyName?: string
  className?: string
  showCount?: boolean
} & TextInputProps
const InputForm = ({
  formData,
  keyName = '',
  showCount = false,
  className = '',
  ...props
}: InputFormProps) => {
  const getLengthText = () => {
    if (formData.values[keyName]) {
      return formData.values[keyName].length
    }
    return 0
  }

  return (
    <div className={cn('flex flex-col gap-1 w-full relative', showCount ? 'relative' : '')}>
      <TextInput
        key={formData.key(keyName)}
        className={className}
        {...props}
        {...formData.getInputProps(keyName)}
      />
      {showCount && (
        <div className='flex absolute bottom-0 right-0 text-xs justify-end'>{`${getLengthText()}/${props?.maxLength}`}</div>
      )}
    </div>
  )
}

export default InputForm
