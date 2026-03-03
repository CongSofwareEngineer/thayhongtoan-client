import React, { useState } from 'react'
import { Input, InputProps } from '@heroui/input'

import { EyeSlashIcon } from '../Icons/EyeSlash'
import { EyeIcon } from '../Icons/Eye'

import { cn } from '@/utils/tailwind'

const MyInput = ({ ...props }: InputProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Input
      endContent={
        props.type === 'password' ? (
          <button className='focus:outline-none' type='button' onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <EyeSlashIcon className='text-default-400' /> : <EyeIcon className='text-default-400' />}
          </button>
        ) : null
      }
      {...props}
      // className={cn('data-[has-label=true]:mt-[30px]', props?.className)}
      classNames={{
        ...props?.classNames,
        label: cn('!text-black font-bold text-base top-6 z-[2] ', props?.classNames?.label),
        input: cn('!text-black', props?.classNames?.input),
        inputWrapper: cn(
          '!ring-0 border-[1px] border-gray-200 !bg-white !text-black !ring-transparent',
          'group-data-[focus-visible=true]:!bg-white',
          'group-data-[focus=true]:!bg-white',
          'group-data-[hover=true]:!bg-white',
          props?.classNames?.inputWrapper
        ),
      }}
      labelPlacement={props?.labelPlacement ?? 'outside'}
      type={props.type === 'password' ? (isVisible ? 'text' : 'password') : props.type}
    />
  )
}

export default MyInput
