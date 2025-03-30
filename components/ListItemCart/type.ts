import { IProduct } from '@/app/shoes/[...params]/type'
export type IProductCart = {
  selected?: boolean
  more_data?: IProduct
} & IProduct

export type IListItemCart = {
  noEdit?: boolean
  noTitle?: boolean
  loading?: boolean
  allSelected?: boolean
  dataCart: IProductCart[]
  callBackClick?: (param?: any, index?: number) => void
  callBackSelectAll?: (param?: any) => void
  callBackDelete?: (index: number) => Promise<void> | void
}

export type IItemCart = {
  data: IProductCart
  noBorder?: boolean
  noEdit?: boolean
  callBack: (param?: any) => void
  callBackDelete: (param?: any) => void
}

export type ITitleItem = {
  dataCart: IProductCart[]
  noEdit?: boolean
  allSelected: boolean
  callBack?: (param?: boolean) => void
}
