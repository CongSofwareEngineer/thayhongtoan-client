'use client'
import { useState } from 'react'

import AdminPage, { AdminCard } from '@/components/AdminPage'
import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import MyBlog from '@/components/MyBlog'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import MyInputNumber from '@/components/MyInputNumber'
import MySelect from '@/components/MySelect'
import MyTable, { Column } from '@/components/MyTable'
import { PencilIcon } from '@/components/Icons/Pencil'
import { PlusIcon } from '@/components/Icons/Plus'
import { SearchIcon } from '@/components/Icons/Search'
import { TrashIcon } from '@/components/Icons/Trash'
import { BLOG_STATUS } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import useConfirm from '@/hooks/useConfirm'
import useDebounce from '@/hooks/useDebounce'
import useGetBlog from '@/hooks/react-query/useGetBlog'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import BlogAPI from '@/services/API/Blog'
import { IBlog } from '@/services/API/Blog/type'
import { getBlogReadTime } from '@/utils/blogContent'
import { formatDate, slugify } from '@/utils/functions'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { cn } from '@/utils/tailwind'

type BlogForm = {
  title: string
  slug: string
  description: string
  content: string
  thumbnail: string
  tags: string
  readTime?: number
  status: BLOG_STATUS
}

const BlogFormBody = ({ item, onDone }: { item?: IBlog; onDone: () => void }) => {
  const { translate } = useLanguage()
  const { close } = useModalDrawer()
  const [form, setForm] = useState<BlogForm>({
    title: item?.title || '',
    slug: item?.slug || '',
    description: item?.description || '',
    content: item?.content || '',
    thumbnail: item?.thumbnail || '',
    tags: (item?.tags || []).join(', '),
    readTime: item?.readTime,
    status: item?.status || BLOG_STATUS.DRAFT,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof BlogForm, string>>>({})
  const [saving, setSaving] = useState(false)

  const onChange = (key: keyof BlogForm, value: any) => {
    setForm((prev) => {
      // Keep the slug in sync with the title until it is edited by hand
      if (key === 'title' && (!prev.slug || prev.slug === slugify(prev.title))) {
        return { ...prev, title: value, slug: slugify(value) }
      }

      return { ...prev, [key]: value }
    })
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSave = async () => {
    const nextErrors: Partial<Record<keyof BlogForm, string>> = {}

    if (!form.title.trim()) {
      nextErrors.title = translate('errors.empty')
    }
    if (!form.slug.trim()) {
      nextErrors.slug = translate('errors.empty')
    }
    if (!form.content.trim()) {
      nextErrors.content = translate('errors.empty')
    }
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const payload: Partial<IBlog> = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      description: form.description,
      content: form.content,
      thumbnail: form.thumbnail,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      readTime: form.readTime || getBlogReadTime(form.content),
      status: form.status,
    }

    setSaving(true)
    try {
      if (item?._id) {
        await BlogAPI.update(item._id, payload)
        showNotificationSuccess(translate('admin.updatedSuccess'))
      } else {
        await BlogAPI.create(payload)
        showNotificationSuccess(translate('admin.createdSuccess'))
      }
      onDone()
      close()
    } catch {
      showNotificationError(translate('errors.serverError'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <MyInput
        isRequired
        errorMessage={errors.title}
        label={translate('admin.title')}
        placeholder={translate('placeholder.enterTitle')}
        value={form.title}
        onValueChange={(value) => onChange('title', value)}
      />

      <MyInput
        isRequired
        errorMessage={errors.slug}
        label='Slug'
        placeholder='duong-dan-bai-viet'
        value={form.slug}
        onValueChange={(value) => onChange('slug', value)}
      />

      <MyInputArea
        label={translate('blog.subtitle')}
        minRows={2}
        placeholder={translate('placeholder.enterContent')}
        value={form.description}
        onValueChange={(value) => onChange('description', value)}
      />

      <MyInput
        label={translate('admin.thumbnail')}
        placeholder={translate('placeholder.enterLink')}
        value={form.thumbnail}
        onValueChange={(value) => onChange('thumbnail', value)}
      />

      {form.thumbnail && (
        <div className='relative h-40 w-full overflow-hidden rounded-box bg-base-200'>
          <MyImage noAnimation alt={form.title} className='!absolute !inset-0 !h-full !w-full object-cover' src={form.thumbnail} />
        </div>
      )}

      <div className='flex flex-col gap-1.5'>
        <span className='text-sm font-medium text-base-content'>
          {translate('admin.content')}
          <span className='ml-0.5 text-error'>*</span>
        </span>
        <MyBlog initialContent={item?.content} onChange={(value) => onChange('content', value)} />
        {errors.content && <span className='text-xs text-error'>{errors.content}</span>}
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <MyInput label='Tags' placeholder='Luyện chữ, Toán tư duy' value={form.tags} onValueChange={(value) => onChange('tags', value)} />
        <MyInputNumber label={translate('blog.readTime')} min={1} value={form.readTime} onChange={(value) => onChange('readTime', value)} />
        <MySelect
          label={translate('admin.status')}
          options={[
            { key: BLOG_STATUS.DRAFT, label: translate('admin.draft') },
            { key: BLOG_STATUS.PUBLISHED, label: translate('admin.published') },
          ]}
          value={form.status}
          onValueChange={(value) => onChange('status', value)}
        />
      </div>

      <div className='flex justify-end gap-2 pt-2'>
        <MyButton variant='ghost' onClick={close}>
          {translate('common.cancel')}
        </MyButton>
        <MyButton className='font-semibold' isLoading={saving} onClick={onSave}>
          {translate('common.save')}
        </MyButton>
      </div>
    </div>
  )
}

const BlogManagement = () => {
  const { translate } = useLanguage()
  const { open } = useModalDrawer()
  const { confirm } = useConfirm()
  const [search, setSearch] = useState('')
  const keyword = useDebounce(search, 400)

  const { data: posts, isLoading, refetch } = useGetBlog()

  const list = keyword ? posts.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase())) : posts

  const columns: Column[] = [
    { key: 'title', label: translate('admin.title') },
    { key: 'tags', label: 'Tags' },
    { key: 'status', label: translate('admin.status'), align: 'center' },
    { key: 'createdAt', label: translate('admin.createdAt') },
    { key: 'actions', label: translate('admin.actions'), align: 'right' },
  ]

  const openForm = (item?: IBlog) =>
    open({
      title: item ? translate('admin.editPost') : translate('admin.newPost'),
      size: '3xl',
      children: <BlogFormBody item={item} onDone={refetch} />,
    })

  const handleDelete = (item: IBlog) =>
    confirm({
      description: `${translate('common.deleteConfirmDesc')} (${item.title})`,
      onConfirm: async () => {
        try {
          await BlogAPI.remove(item._id!)
          showNotificationSuccess(translate('admin.deletedSuccess'))
          refetch()
        } catch {
          showNotificationError(translate('errors.serverError'))
        }
      },
    })

  const renderCell = (item: IBlog, columnKey: string) => {
    switch (columnKey) {
      case 'title':
        return (
          <div className='flex items-center gap-3'>
            {item.thumbnail && (
              <span className='relative hidden size-12 shrink-0 overflow-hidden rounded-field bg-base-200 sm:block'>
                <MyImage noAnimation alt={item.title} className='!absolute !inset-0 !h-full !w-full object-cover' src={item.thumbnail} />
              </span>
            )}
            <div className='min-w-0'>
              <p className='font-semibold text-base-content'>{item.title}</p>
              <p className='line-clamp-2-custom max-w-sm text-xs text-base-content/50'>{item.description}</p>
            </div>
          </div>
        )
      case 'tags':
        return (
          <span className='flex flex-wrap gap-1'>
            {item.tags?.map((tag) => (
              <span key={tag} className='badge badge-ghost badge-sm'>
                {tag}
              </span>
            ))}
          </span>
        )
      case 'status':
        return (
          <span className={cn('badge badge-sm', item.status === BLOG_STATUS.PUBLISHED ? 'badge-success' : 'badge-ghost')}>
            {item.status === BLOG_STATUS.PUBLISHED ? translate('admin.published') : translate('admin.draft')}
          </span>
        )
      case 'createdAt':
        return formatDate(item.createdAt) || '—'
      case 'actions':
        return (
          <div className='flex items-center justify-end gap-1'>
            <button aria-label={translate('common.edit')} className='btn btn-square btn-ghost btn-sm' type='button' onClick={() => openForm(item)}>
              <PencilIcon className='size-4' />
            </button>
            <button
              aria-label={translate('common.delete')}
              className='btn btn-square btn-ghost btn-sm text-error'
              type='button'
              onClick={() => handleDelete(item)}
            >
              <TrashIcon className='size-4' />
            </button>
          </div>
        )
      default:
        return '—'
    }
  }

  const renderMobileItem = (item: IBlog) => (
    <div className='flex flex-col gap-2'>
      <span className='font-bold text-base-content'>{item.title}</span>
      <span className='line-clamp-2-custom text-sm text-base-content/60'>{item.description}</span>
      <div className='flex gap-2'>
        <MyButton size='sm' variant='outline' onClick={() => openForm(item)}>
          <PencilIcon className='size-4' />
          {translate('common.edit')}
        </MyButton>
        <MyButton color='error' size='sm' variant='outline' onClick={() => handleDelete(item)}>
          <TrashIcon className='size-4' />
        </MyButton>
      </div>
    </div>
  )

  return (
    <AdminPage
      action={
        <MyButton className='font-semibold' onClick={() => openForm()}>
          <PlusIcon className='size-5' />
          {translate('admin.newPost')}
        </MyButton>
      }
      description={translate('admin.blogManagementDesc')}
      title={translate('admin.blogManagement')}
    >
      <AdminCard>
        <MyInput
          className='md:max-w-sm'
          placeholder={`${translate('common.search')}...`}
          startContent={<SearchIcon className='size-5' />}
          value={search}
          onValueChange={setSearch}
        />

        <MyTable
          ariaLabel={QUERY_KEY.Blog}
          columns={columns}
          isLoading={isLoading}
          items={list}
          renderCell={renderCell as any}
          renderMobileItem={renderMobileItem as any}
        />
      </AdminCard>
    </AdminPage>
  )
}

export default BlogManagement
