import { cn } from '@/utils/tailwind'
import { Tabs } from '@mantine/core'
import React from 'react'
export type MyTabsProps = {
  data?: Array<{
    label: React.ReactNode
    children?: React.ReactNode
    key: string
  }>
  defaultValue?: string
  onChange?: (tabs: string | null) => void
  classLabel?: string
  classPanel?: string
  classTabs?: string
}

const MyTabs = ({
  data = [],
  defaultValue = '',
  onChange = () => {},
  classLabel = '',
  classPanel = '',
  classTabs = '',
}: MyTabsProps) => {
  return (
    <Tabs
      onChange={(tabs) => onChange(tabs)}
      defaultValue={defaultValue || data[0]?.key}
      className={classTabs}
    >
      <Tabs.List className={cn('mb-2', classLabel)}>
        {data.map((e) => {
          return (
            <Tabs.Tab value={e.key} key={`${e.key}-List`}>
              {e.label}
            </Tabs.Tab>
          )
        })}
      </Tabs.List>

      {data.map((e) => {
        return (
          <Tabs.Panel className={classPanel} value={e.key} key={`${e.key}-Panel`}>
            {e.children}
          </Tabs.Panel>
        )
      })}
    </Tabs>
  )
}

export default MyTabs
