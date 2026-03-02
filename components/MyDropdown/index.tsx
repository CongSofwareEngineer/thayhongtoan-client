'use client'
import React, { ReactNode } from 'react'
import { Dropdown, DropdownProps, DropdownTrigger, DropdownMenu, DropdownMenuProps, DropdownItem, DropdownItemProps } from '@heroui/dropdown'

export type OptionDropdown = Array<{ label: ReactNode; key: string }>

type Props = {
  options: OptionDropdown
  configItem?: DropdownItemProps
  configDropdownMenu?: Omit<DropdownMenuProps, 'children'>
} & Omit<DropdownProps, 'children'> & {
    children?: ReactNode
  }
const MyDropdown = ({ options, configDropdownMenu, configItem, children, ...props }: Props) => {
  return (
    <Dropdown {...props}>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu {...configDropdownMenu} aria-label={configDropdownMenu?.['aria-label'] || 'Thay Hồng toán | Dropdown'}>
        {options.map((e) => {
          return (
            <DropdownItem data-hover {...configItem} key={e.key}>
              {e.label}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

export default MyDropdown
