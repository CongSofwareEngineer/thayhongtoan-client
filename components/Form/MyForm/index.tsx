import React, { FormHTMLAttributes } from 'react'
export type MyFormProps = {
  form: any
  children?: React.ReactNode
  submit?: (values: any) => any
  className?: string
} & FormHTMLAttributes<HTMLFormElement>
const MyForm = ({ form, children, submit = () => {}, className = '', ...props }: MyFormProps) => {
  return form ? (
    <form method='POST' {...props} onSubmit={form.onSubmit(submit)} className={className}>
      {children}
    </form>
  ) : (
    <></>
  )
}

export default MyForm
