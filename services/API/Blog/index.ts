import BaseAPI from '../BaseAPI'

import { IBlog, IBlogFilter } from './type'

class BlogBase extends BaseAPI<IBlog, IBlogFilter> {
  router = '/blog'

  getAll(query: IBlogFilter = {}) {
    return this.get<IBlog[]>('/all', query)
  }

  getBySlug(slug: string) {
    return this.get<IBlog>(`/slug/${slug}`)
  }

  remove(id: string) {
    return this.delete<IBlog>(`/${id}`)
  }
}

const BlogAPI = new BlogBase()

export default BlogAPI
