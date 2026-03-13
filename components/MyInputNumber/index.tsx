import React from 'react'
import { NumberInput, NumberInputProps } from '@heroui/number-input'

import { cn } from '@/utils/tailwind'

type Props = Omit<NumberInputProps, 'onChange'> & {
  onChange?: (value: number) => void
}
const MyInputNumber = ({ ...props }: Props) => {
  const onChangeValue = (value: number) => {
    let newValue = value?.toString().replace(/,/g, '.') // Thay tất cả dấu phẩy thành dấu chấm

    // Tìm vị trí dấu chấm đầu tiên
    const firstDotIndex = newValue?.indexOf('.')

    if (firstDotIndex !== -1 && newValue) {
      // Nếu có dấu chấm, chỉ giữ lại dấu chấm đầu tiên và xóa các dấu chấm sau
      newValue = newValue.substring(0, firstDotIndex + 1) + newValue.substring(firstDotIndex + 1).replace(/\./g, '')
    }

    if (newValue?.startsWith('.') === true) {
      newValue = '0' + newValue
    }

    console.log({ newValue, newValueNumber: Number(newValue || '0') })

    if (newValue) {
      props?.onChange?.(Number(newValue || '0'))
    }
  }

  return (
    <NumberInput
      hideStepper={typeof props?.hideStepper === 'boolean' ? props?.hideStepper : true}
      labelPlacement={props?.labelPlacement ?? 'outside'}
      // step={props?.step || 0}
      {...props}
      classNames={{
        ...props?.classNames,
        base: cn('group flex flex-col data-[has-helper=true]:mb-2', props?.classNames?.base),
        label: cn('!text-black font-bold text-base top-[-12px] z-[2]', props?.classNames?.label),
        input: cn(
          '!text-black',
          '!ring-0 focus-visible:outline-none border-[1px] border-gray-200 !bg-white !text-black !ring-transparent',
          'group-data-[focus-visible=true]:!bg-white  ',
          'group-data-[focus=true]:!bg-white',
          'group-data-[hover=true]:!bg-white',
          props?.classNames?.input
        ),
        // inputWrapper: cn(
        //   '!ring-0 !focus-visible:outline-none border-[1px] border-gray-200 !bg-white !text-black !ring-transparent',
        //   'group-data-[focus-visible=true]:!bg-white group-data-[focus-visible=true]:!outline-none',
        //   'group-data-[focus=true]:!bg-white',
        //   'group-data-[hover=true]:!bg-white',
        //   props?.classNames?.inputWrapper
        // ),
      }}
      onChange={(e: any) => {
        const value: any = e?.target?.value

        onChangeValue(value)
      }}
    />
  )
}

export default MyInputNumber
