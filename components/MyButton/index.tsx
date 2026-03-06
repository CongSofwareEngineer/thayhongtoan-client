import { Button, ButtonProps } from '@heroui/button'
import { MouseEventHandler } from 'react'

import { cn } from '@/utils/tailwind'

type props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
} & ButtonProps

const getClassDefault = (type: string = 'default') => {
  switch (type) {
    case 'primary':
      return 'bg-[#F59E0B] hover:bg-[#D97706] text-white '
    case 'secondary':
      return ''
    case 'success':
      return ''
    case 'warning':
      return ''
    case 'error':
      return ''
    default:
      return 'bg-[#22C55E] hover:bg-[#7ec192]'
  }
}

const MyButton = ({ ...props }: props) => {
  return (
    <Button
      color='default'
      {...props}
      className={cn('rounded-md', getClassDefault(props?.color), props?.className, props?.disabled ? 'opacity-70 cursor-not-allowed' : '')}
    />
  )
}

export default MyButton
