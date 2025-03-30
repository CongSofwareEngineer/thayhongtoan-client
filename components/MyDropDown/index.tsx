import { Menu } from '@mantine/core'
import React from 'react'

export type IItemDropDown = {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: React.ReactNode
  items?: IItemDropDown[]
}
type IMyDropDown = {
  children?: React.ReactNode
  items?: IItemDropDown[]
  onClick?: () => any
  className?: string
  classItem?: string
}
const MyDropDown = ({
  children,
  items = [],
  onClick = () => {},
  classItem = '',
  className = '',
}: IMyDropDown) => {
  return (
    <Menu shadow='md'>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown className={className}>
        {items.map((e, index) => {
          return (
            <React.Fragment key={`Dropdown-item-${index}`}>
              {e.label && <Menu.Label>{e.label}</Menu.Label>}
              {e.children && (
                <Menu.Item
                  onClick={onClick}
                  className={classItem}
                  leftSection={e.leftIcon}
                  rightSection={e.rightIcon}
                >
                  {e.children}
                </Menu.Item>
              )}
            </React.Fragment>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}

export default MyDropDown
