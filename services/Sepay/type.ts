import { METHOD_SUPPORT } from '@/constants/sepay'

export type IBody = {
  url: string
  body?: any
  type: keyof typeof METHOD_SUPPORT
}

export type IPayment = {
  id: string
  bank_brand_name: string
  account_number: string
  transaction_date: string
  amount_out: string
  amount_in: string
  accumulated: string
  transaction_content: string
  reference_number: string
}
export type IResListPayment = {
  transactions?: Array<IPayment>
  error?: any
  messages: any
}
