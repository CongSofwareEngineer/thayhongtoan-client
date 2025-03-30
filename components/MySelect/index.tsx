import { Select } from '@mantine/core'
import React from 'react'

const MySelect = () => {
  return (
    <Select
      checkIconPosition='right'
      label='Your favorite library'
      placeholder='Pick value'
      data={[]}
    />
  )
}

export default MySelect
