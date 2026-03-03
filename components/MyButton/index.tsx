import { Button, ButtonProps } from '@heroui/button'
import { MouseEventHandler } from 'react'

import { cn } from '@/utils/tailwind'

type props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
} & ButtonProps

const MyButton = ({ ...props }: props) => {
  return <Button color='default' {...props} className={cn('rounded-md', props?.className, props?.disabled ? 'opacity-70 cursor-not-allowed' : '')} />
}

export default MyButton
