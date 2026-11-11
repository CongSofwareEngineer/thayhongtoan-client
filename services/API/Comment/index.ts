import BaseAPI from '../BaseAPI'

import { IComment, ICommentFilter } from './type'

import { COMMENT_STATUS } from '@/constants/app'

class CommentBase extends BaseAPI<IComment, ICommentFilter> {
  router = '/comment'

  getAll(query: ICommentFilter = {}) {
    return this.get<IComment[]>('/all', query)
  }

  // Parent-submitted review, no auth required
  submit(body: Partial<IComment>) {
    return this.post<IComment>('', body)
  }

  // Teacher reply attached to an existing comment
  reply(id: string, body: { name: string; content: string }) {
    return this.post<IComment>(`/${id}/reply`, body)
  }

  updateStatus(id: string, status: COMMENT_STATUS) {
    return this.patch<IComment>(`/${id}`, { status })
  }

  remove(id: string) {
    return this.delete<IComment>(`/${id}`)
  }
}

const CommentAPI = new CommentBase()

export default CommentAPI
