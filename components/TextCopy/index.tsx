import { copyToClipboard } from '@/utils/notification'
import { cn } from '@/utils/tailwind'
import Link from 'next/link'
import React from 'react'
import { AiOutlineCopy } from 'react-icons/ai'
type Props = {
  textView?: string
  value?: string
  isLink?: boolean
  classText?: string
  className?: string
}
const TextCopy = ({ textView = '', value = '', isLink = false, ...props }: Props) => {
  return (
    <div className={cn(`flex gap-2 items-center `, props?.className)}>
      {isLink ? (
        <Link target='_blank' href={value || textView}>
          {value || textView}
        </Link>
      ) : (
        <div className={props?.classText}>{textView || value}</div>
      )}
      <AiOutlineCopy
        className='cursor-pointer'
        onClick={() => copyToClipboard(value || textView)}
      />
    </div>
  )
}

export default TextCopy
