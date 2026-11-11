'use client'
import { useMemo, useState } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import EmptyState from '@/components/EmptyState'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import MySelect from '@/components/MySelect'
import StarRating from '@/components/StarRating'
import StatCard from '@/components/StatCard'
import { ChatIcon } from '@/components/Icons/Chat'
import { CheckCircleIcon } from '@/components/Icons/CheckCircle'
import { ReplyIcon } from '@/components/Icons/Reply'
import { SearchIcon } from '@/components/Icons/Search'
import { StarIcon } from '@/components/Icons/Star'
import { TrashIcon } from '@/components/Icons/Trash'
import { XMarkIcon } from '@/components/Icons/XMark'
import { COMMENT_STATUS } from '@/constants/app'
import useConfirm from '@/hooks/useConfirm'
import useDebounce from '@/hooks/useDebounce'
import useGetComment from '@/hooks/react-query/useGetComment'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import CommentAPI from '@/services/API/Comment'
import { IComment } from '@/services/API/Comment/type'
import { formatDateTime } from '@/utils/functions'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { cn } from '@/utils/tailwind'

const STATUS_BADGE: Record<string, string> = {
  [COMMENT_STATUS.APPROVED]: 'badge-success',
  [COMMENT_STATUS.PENDING]: 'badge-warning',
  [COMMENT_STATUS.REJECTED]: 'badge-error',
}

const CommentRow = ({ item, onChanged }: { item: IComment; onChanged: () => void }) => {
  const { translate } = useLanguage()
  const { user } = useUser()
  const { confirm } = useConfirm()
  const [replyOpen, setReplyOpen] = useState(false)
  const [reply, setReply] = useState('')
  const [busy, setBusy] = useState(false)

  const status = item.status || COMMENT_STATUS.APPROVED

  const setStatus = async (next: COMMENT_STATUS) => {
    setBusy(true)
    try {
      await CommentAPI.updateStatus(item._id!, next)
      showNotificationSuccess(translate('admin.updatedSuccess'))
      onChanged()
    } catch {
      showNotificationError(translate('errors.serverError'))
    } finally {
      setBusy(false)
    }
  }

  const sendReply = async () => {
    if (!reply.trim()) {
      return
    }
    setBusy(true)
    try {
      await CommentAPI.reply(item._id!, { name: user?.name || translate('comment.replyFrom'), content: reply.trim() })
      showNotificationSuccess(translate('comment.sendSuccess'))
      setReply('')
      setReplyOpen(false)
      onChanged()
    } catch {
      showNotificationError(translate('errors.serverError'))
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = () =>
    confirm({
      description: `${translate('common.deleteConfirmDesc')} (${item.name})`,
      onConfirm: async () => {
        try {
          await CommentAPI.remove(item._id!)
          showNotificationSuccess(translate('admin.deletedSuccess'))
          onChanged()
        } catch {
          showNotificationError(translate('errors.serverError'))
        }
      },
    })

  return (
    <article className='flex flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-5'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex items-start gap-3'>
          <span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary'>
            {item.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className='font-bold text-base-content'>{item.name}</p>
            <div className='flex flex-wrap items-center gap-2 text-xs text-base-content/50'>
              <StarRating size='sm' value={item.rating} />
              {item.phone && <span>· {item.phone}</span>}
              {item.className && <span>· {item.className}</span>}
              {item.createdAt && <span>· {formatDateTime(item.createdAt)}</span>}
            </div>
          </div>
        </div>
        <span className={cn('badge badge-sm font-semibold', STATUS_BADGE[status])}>
          {status === COMMENT_STATUS.APPROVED
            ? translate('admin.approved')
            : status === COMMENT_STATUS.PENDING
              ? translate('admin.pending')
              : translate('admin.rejected')}
        </span>
      </div>

      <p className='whitespace-pre-line text-sm leading-relaxed text-base-content/80'>{item.content}</p>

      {item.replies && item.replies.length > 0 && (
        <div className='flex flex-col gap-2 border-l-2 border-primary/30 pl-4'>
          {item.replies.map((entry, index) => (
            <div key={entry._id || index} className='rounded-field bg-base-200 p-3'>
              <span className='flex items-center gap-2 text-sm font-bold text-primary'>
                <ReplyIcon className='size-4' />
                {entry.name}
              </span>
              <p className='text-sm text-base-content/80'>{entry.content}</p>
            </div>
          ))}
        </div>
      )}

      {replyOpen && (
        <div className='flex flex-col gap-2'>
          <MyInputArea minRows={2} placeholder={translate('comment.replyPlaceholder')} value={reply} onValueChange={setReply} />
          <div className='flex justify-end gap-2'>
            <MyButton size='sm' variant='ghost' onClick={() => setReplyOpen(false)}>
              {translate('common.cancel')}
            </MyButton>
            <MyButton isLoading={busy} size='sm' onClick={sendReply}>
              {translate('comment.sendReply')}
            </MyButton>
          </div>
        </div>
      )}

      <div className='flex flex-wrap gap-2 border-t border-base-300 pt-3'>
        {!replyOpen && (
          <MyButton size='sm' variant='outline' onClick={() => setReplyOpen(true)}>
            <ReplyIcon className='size-4' />
            {translate('admin.replyComment')}
          </MyButton>
        )}
        {status !== COMMENT_STATUS.APPROVED && (
          <MyButton color='success' disabled={busy} size='sm' variant='outline' onClick={() => setStatus(COMMENT_STATUS.APPROVED)}>
            <CheckCircleIcon className='size-4' />
            {translate('admin.approve')}
          </MyButton>
        )}
        {status !== COMMENT_STATUS.REJECTED && (
          <MyButton color='warning' disabled={busy} size='sm' variant='outline' onClick={() => setStatus(COMMENT_STATUS.REJECTED)}>
            <XMarkIcon className='size-4' />
            {translate('admin.reject')}
          </MyButton>
        )}
        <MyButton color='error' size='sm' variant='outline' onClick={handleDelete}>
          <TrashIcon className='size-4' />
          {translate('common.delete')}
        </MyButton>
      </div>
    </article>
  )
}

const CommentManagement = () => {
  const { translate } = useLanguage()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('')
  const keyword = useDebounce(search, 400)

  const { data: comments, ratingAvg, isLoading, refetch } = useGetComment({ status: (status as COMMENT_STATUS) || undefined })

  const list = useMemo(() => {
    let result = comments

    if (status) {
      result = result.filter((item) => (item.status || COMMENT_STATUS.APPROVED) === status)
    }
    if (keyword) {
      const lower = keyword.toLowerCase()

      result = result.filter((item) => item.name.toLowerCase().includes(lower) || item.content.toLowerCase().includes(lower))
    }

    return result
  }, [comments, status, keyword])

  const counts = useMemo(() => {
    const by = (value: COMMENT_STATUS) => comments.filter((item) => (item.status || COMMENT_STATUS.APPROVED) === value).length

    return { approved: by(COMMENT_STATUS.APPROVED), pending: by(COMMENT_STATUS.PENDING), total: comments.length }
  }, [comments])

  return (
    <AdminPage description={translate('admin.commentManagementDesc')} title={translate('admin.commentManagement')}>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard icon={<ChatIcon className='size-7' />} label={translate('admin.totalComment')} value={counts.total} />
        <StatCard color='success' icon={<CheckCircleIcon className='size-7' />} label={translate('admin.approved')} value={counts.approved} />
        <StatCard color='warning' icon={<StarIcon className='size-7' />} label={translate('comment.ratingAverage')} value={ratingAvg} />
      </div>

      <AdminCard>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <MyInput
            placeholder={`${translate('common.search')}...`}
            startContent={<SearchIcon className='size-5' />}
            value={search}
            onValueChange={setSearch}
          />
          <MySelect
            options={[
              { key: '', label: translate('admin.all') },
              { key: COMMENT_STATUS.APPROVED, label: translate('admin.approved') },
              { key: COMMENT_STATUS.PENDING, label: translate('admin.pending') },
              { key: COMMENT_STATUS.REJECTED, label: translate('admin.rejected') },
            ]}
            value={status}
            onValueChange={setStatus}
          />
        </div>

        {isLoading ? (
          <div className='h-40 rounded-box skeleton-loading' />
        ) : list.length === 0 ? (
          <EmptyState icon={<ChatIcon className='size-12' />} title={translate('comment.empty')} />
        ) : (
          <div className='flex flex-col gap-4'>
            {list.map((item) => (
              <CommentRow key={item._id} item={item} onChanged={refetch} />
            ))}
          </div>
        )}
      </AdminCard>
    </AdminPage>
  )
}

export default CommentManagement
