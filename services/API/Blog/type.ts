import { BLOG_STATUS } from '@/constants/app'

export interface IBlog {
  _id?: string
  title: string
  slug: string
  description?: string
  content?: string
  thumbnail?: string
  author?: string
  tags?: string[]
  readTime?: number
  status?: BLOG_STATUS
  createdAt?: string
}

export interface IBlogFilter {
  slug?: string
  tag?: string
  status?: BLOG_STATUS
  page?: number
  limit?: number
}
