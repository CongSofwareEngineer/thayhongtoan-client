'use client'
import { useState } from 'react'

import MyButton from '../MyButton'
import MyInput from '../MyInput'
import MyInputArea from '../MyInputArea'
import StarRating from '../StarRating'
import EmptyState from '../EmptyState'
import { ChatIcon } from '../Icons/Chat'
import { CheckBadgeIcon } from '../Icons/CheckBadge'
import { QuoteIcon } from '../Icons/Quote'
import { ReplyIcon } from '../Icons/Reply'
import { UserCircleIcon } from '../Icons/UserCircle'

import { MAX_STAR } from '@/constants/app'
import useGetComment from '@/hooks/react-query/useGetComment'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import CommentAPI from '@/services/API/Comment'
import { IComment } from '@/services/API/Comment/type'
import { formatDate } from '@/utils/functions'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { cn } from '@/utils/tailwind'

type Props = {
  idClass?: string
  className?: string
  /** hide the "write a review" form, e.g. on the home page summary */
  readOnly?: boolean
  limit?: number
}

const PHONE_REGEX = /^(0|\+84)(\d{9})$/

const CommentItem = ({ data, onReplied }: { data: IComment; onReplied: () => void }) => {
  const { translate } = useLanguage()
  const { user } = useUser()
  const [replyOpen, setReplyOpen] = useState(false)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)

  // Teachers can answer a parent review inline
  const handleReply = async () => {
    if (!reply.trim()) {
      return
    }
    setSending(true)
    try {
      await CommentAPI.reply(data._id!, { name: user?.name || translate('comment.replyFrom'), content: reply.trim() })
      showNotificationSuccess(translate('comment.sendSuccess'))
      setReply('')
      setReplyOpen(false)
      onReplied()
    } catch {
      showNotificationError(translate('common.error'))
    } finally {
      setSending(false)
    }
  }

  return (
    <article className='flex flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm'>
      <div className='flex items-start gap-3'>
        <span className='flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
          <UserCircleIcon className='size-7' />
        </span>
        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='font-bold text-base-content'>{data.name}</span>
            <span className='badge badge-soft badge-success badge-sm gap-1'>
              <CheckBadgeIcon className='size-3' />
              {translate('comment.verified')}
            </span>
          </div>
          <div className='mt-1 flex flex-wrap items-center gap-2 text-xs text-base-content/50'>
            <StarRating size='sm' value={data.rating} />
            {data.className && <span>· {data.className}</span>}
            {data.createdAt && <span>· {formatDate(data.createdAt)}</span>}
          </div>
        </div>
        <QuoteIcon className='hidden size-6 shrink-0 text-primary/15 sm:block' />
      </div>

      <p className='whitespace-pre-line text-sm leading-relaxed text-base-content/80'>{data.content}</p>

      {data.replies && data.replies.length > 0 && (
        <div className='flex flex-col gap-3 border-l-2 border-primary/30 pl-4'>
          {data.replies.map((item, index) => (
            <div key={item._id || index} className='flex flex-col gap-1 rounded-field bg-base-200 p-3'>
              <span className='flex items-center gap-2 text-sm font-bold text-primary'>
                <ReplyIcon className='size-4' />
                {item.isTeacher ? translate('comment.replyFrom') : item.name}
              </span>
              <p className='whitespace-pre-line text-sm text-base-content/80'>{item.content}</p>
              {item.createdAt && <span className='text-xs text-base-content/40'>{formatDate(item.createdAt)}</span>}
            </div>
          ))}
        </div>
      )}

      {user?.isAdmin && (
        <div className='flex flex-col gap-2'>
          {replyOpen ? (
            <>
              <MyInputArea minRows={2} placeholder={translate('comment.replyPlaceholder')} value={reply} onValueChange={setReply} />
              <div className='flex justify-end gap-2'>
                <MyButton size='sm' variant='ghost' onClick={() => setReplyOpen(false)}>
                  {translate('common.cancel')}
                </MyButton>
                <MyButton isLoading={sending} size='sm' onClick={handleReply}>
                  {translate('comment.sendReply')}
                </MyButton>
              </div>
            </>
          ) : (
            <button className='self-start text-sm font-semibold text-primary hover:underline' type='button' onClick={() => setReplyOpen(true)}>
              {translate('comment.reply')}
            </button>
          )}
        </div>
      )}
    </article>
  )
}

const CommentSection = ({ idClass, className, readOnly = false, limit }: Props) => {
  const { translate } = useLanguage()
  const { approved, ratingAvg, ratingCount, isLoading, refetch } = useGetComment({ idClass })

  const [form, setForm] = useState({ name: '', phone: '', content: '' })
  const [rating, setRating] = useState(MAX_STAR)
  const [errors, setErrors] = useState<{ name?: string; phone?: string; content?: string }>({})
  const [sending, setSending] = useState(false)

  const list = limit ? approved.slice(0, limit) : approved

  // Validate then send a parent review; the backend moderates before publishing
  const handleSubmit = async () => {
    const nextErrors: typeof errors = {}

    if (!form.name.trim()) {
      nextErrors.name = translate('errors.empty')
    }
    if (!PHONE_REGEX.test(form.phone.trim())) {
      nextErrors.phone = translate('comment.errorPhone')
    }
    if (!form.content.trim()) {
      nextErrors.content = translate('comment.errorContent')
    }
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSending(true)
    try {
      await CommentAPI.submit({ ...form, rating, idClass })
      showNotificationSuccess(translate('comment.sendSuccess'))
      setForm({ name: '', phone: '', content: '' })
      setRating(MAX_STAR)
      refetch()
    } catch {
      showNotificationError(translate('common.error'))
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={cn('flex w-full flex-col gap-6', className)}>
      <div className='flex flex-col items-start justify-between gap-4 rounded-box border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center'>
        <div className='flex items-center gap-4'>
          <span className='text-4xl font-extrabold text-primary'>{ratingAvg || 0}</span>
          <div className='flex flex-col gap-1'>
            <StarRating value={ratingAvg} />
            <span className='text-sm text-base-content/60'>{translate('comment.ratingCount', { count: ratingCount })}</span>
          </div>
        </div>
        <ChatIcon className='hidden size-10 text-primary/20 sm:block' />
      </div>

      {!readOnly && (
        <div className='flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-5'>
          <h3 className='text-lg font-bold text-base-content'>{translate('comment.writeComment')}</h3>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <MyInput
              isRequired
              errorMessage={errors.name}
              label={translate('comment.yourName')}
              placeholder={translate('placeholder.enterName')}
              value={form.name}
              onValueChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
            />
            <MyInput
              isRequired
              errorMessage={errors.phone}
              inputMode='tel'
              label={translate('comment.yourPhone')}
              placeholder={translate('placeholder.enterNumberPhone')}
              value={form.phone}
              onValueChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <span className='text-sm font-semibold text-base-content'>{translate('comment.yourRating')}</span>
            <StarRating size='lg' value={rating} onChange={setRating} />
          </div>
          <MyInputArea
            isRequired
            errorMessage={errors.content}
            label={translate('comment.content')}
            placeholder={translate('placeholder.enterComment')}
            value={form.content}
            onValueChange={(value) => setForm((prev) => ({ ...prev, content: value }))}
          />
          <MyButton className='self-start font-semibold' isLoading={sending} onClick={handleSubmit}>
            {translate('comment.send')}
          </MyButton>
        </div>
      )}

      {isLoading && (
        <div className='flex justify-center py-8'>
          <span className='loading loading-spinner loading-lg text-primary' />
        </div>
      )}

      {!isLoading && list.length === 0 && <EmptyState icon={<ChatIcon className='size-12' />} title={translate('comment.empty')} />}

      <div className='flex flex-col gap-4'>
        {list.map((item) => (
          <CommentItem key={item._id} data={item} onReplied={refetch} />
        ))}
      </div>
    </div>
  )
}

export default CommentSection
