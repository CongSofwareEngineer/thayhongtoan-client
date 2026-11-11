export interface IContact {
  _id?: string
  name: string
  phone: string
  email?: string
  message: string
  createdAt?: string
  isRead?: boolean
}

export interface IContactFilter {
  isRead?: boolean
  page?: number
  limit?: number
}
