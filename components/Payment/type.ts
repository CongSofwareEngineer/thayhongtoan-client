import { IProduct } from '@/app/shoes/[...params]/type'

export type IItemInfoBill = {
  amountBuy?: number
  more_data?: IProduct
} & IProduct

export type IInfoBill = {
  data?: IItemInfoBill[]
}

export type IPayment = {
  data: IItemInfoBill[]
  clickBack: () => void
  showBack?: boolean
  noLogin?: boolean
}

export type IFormPayment = {
  sdt?: string
  name?: string
  linkContact?: string
  gmail?: string
  noteBil?: string
  addressShip?: {
    addressDetail?: string
    address?: string
  }
}
