import { Rating, RatingProps } from '@mantine/core'
import React from 'react'

type IRatingForm = {
  formData?: any
  keyName?: string
  className?: string
} & RatingProps

const RatingForm = ({ formData, keyName = '', className = '', ...props }: IRatingForm) => {
  return (
    <Rating
      key={formData.key(keyName)}
      className={className}
      {...props}
      {...formData.getInputProps(keyName)}
    />
  )
}

export default RatingForm
