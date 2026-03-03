import { Textarea, TextAreaProps } from '@heroui/input'

import { cn } from '@/utils/tailwind'

const MyInputArea = ({ ...props }: TextAreaProps) => {
  return (
    <Textarea
      {...props}
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
      minRows={props?.minRows || 3}
    />
  )
}

export default MyInputArea
