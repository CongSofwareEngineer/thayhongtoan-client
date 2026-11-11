import { COMMENT_STATUS } from '@/constants/app'

export interface ICommentReply {
  _id?: string
  name: string
  content: string
  createdAt?: string
  isTeacher?: boolean
}

export interface IComment {
  _id?: string
  name: string
  phone?: string
  avatar?: string
  rating: number
  content: string
  idClass?: string
  className?: string
  status?: COMMENT_STATUS
  createdAt?: string
  replies?: ICommentReply[]
}

export interface ICommentFilter {
  idClass?: string
  status?: COMMENT_STATUS
  rating?: number
  page?: number
  limit?: number
}
