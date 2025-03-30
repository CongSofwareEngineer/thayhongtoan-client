import { cn } from '@/utils/tailwind'
import { Box, Collapse } from '@mantine/core'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AiOutlineCaretRight } from 'react-icons/ai'

type CollapseType = {
  children?: React.ReactNode
  isDefaultActive?: boolean
  onChange?: (open?: boolean) => void
  className?: string
  classNameTitle?: string
  title?: React.ReactNode
  noLeftIcon?: boolean
  noBorderBottom?: boolean
  leftIcon?: React.ReactNode
}

const MyCollapse = ({
  children,
  isDefaultActive = false,
  onChange,
  className = '',
  title = null,
  noLeftIcon = false,
  noBorderBottom = false,
  leftIcon = null,
  classNameTitle = '',
}: CollapseType) => {
  const [opened, setOpened] = useState(false)

  useLayoutEffect(() => {
    if (isDefaultActive) {
      setOpened(true)
    }
  }, [isDefaultActive])

  useEffect(() => {
    onChange && onChange(opened)
  }, [opened, onChange])

  return (
    <Box className={cn('w-full', className)}>
      <div
        onClick={() => setOpened(!opened)}
        className={cn(
          'flex py-2 px-3 cursor-pointer  items-center w-full gap-2  border-b-2 border-gray-300',
          classNameTitle
        )}
      >
        {!noLeftIcon &&
          (leftIcon || (
            <AiOutlineCaretRight
              style={{
                transform: `rotate(${opened ? 90 : 0}deg)`,
              }}
              className='transition-all duration-300'
            />
          ))}
        <div className='flex flex-1 items-center '>{title}</div>
      </div>
      <Collapse in={opened}>{children}</Collapse>
      {!noBorderBottom && opened && <div className='w-full border-b-2 border-gray-300' />}
    </Box>
  )
}

export default MyCollapse
