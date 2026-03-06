'use client'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import MyButton from '@/components/MyButton'
import MyDropdown from '@/components/MyDropdown'
import useGetClass from '@/hooks/react-query/useGetClass'
import useLanguage from '@/hooks/useLanguage'
import { IClass } from '@/services/API/Class/type'
import { ITeacher } from '@/services/API/Teacher/type'
import { numberWithCommas } from '@/utils/functions'
import { cn } from '@/utils/tailwind'
import { FilterIcon } from '@/components/Icons/Filter'
import { ArrowDownIcon } from '@/components/Icons/ArrowDown'
import { LightBulbIcon } from '@/components/Icons/LightBulb'
import { SparklesIcon } from '@/components/Icons/Sparkles'
import { PenNibIcon } from '@/components/Icons/PenNib'
import { BrainIcon } from '@/components/Icons/Brain'
import useQuerySearch from '@/hooks/useQuerySearch'

type CategoryKey = 'all' | 'logic' | 'skill' | 'writing' | 'thinking'

const getCategory = (name: string): Exclude<CategoryKey, 'all'> => {
  const n = name.toLowerCase()

  if (n.includes('logic')) return 'logic'
  if (n.includes('tư duy') || n.includes('tu duy') || n.includes('soroban')) return 'thinking'
  if (n.includes('chữ') || n.includes('chu') || n.includes('luyện chữ') || n.includes('luyen chu')) return 'writing'

  return 'skill'
}

const getCategoryLabel = (key: Exclude<CategoryKey, 'all'>) => {
  switch (key) {
    case 'logic':
      return 'Toán logic'
    case 'thinking':
      return 'Toán tư duy'
    case 'writing':
      return 'Luyện chữ'
    case 'skill':
    default:
      return 'Kỹ năng khác'
  }
}

const getAgeText = (name: string) => {
  const normalized = name.toLowerCase()
  const matchAge = normalized.match(/(\d{1,2})\s*[-–]\s*(\d{1,2})\s*tuổi/)

  if (matchAge?.[1] && matchAge?.[2]) {
    return `${matchAge[1]}-${matchAge[2]} tuổi`
  }

  const matchGrade = normalized.match(/lớp\s*(\d{1,2})\s*[-–]\s*(\d{1,2})/)

  if (matchGrade?.[1] && matchGrade?.[2]) {
    const g1 = Number(matchGrade[1])
    const g2 = Number(matchGrade[2])

    if (!Number.isNaN(g1) && !Number.isNaN(g2)) {
      const minAge = Math.max(4, g1 + 5)
      const maxAge = Math.max(minAge, g2 + 6)

      return `${minAge}-${maxAge} tuổi`
    }
  }

  const cat = getCategory(name)

  if (cat === 'writing') return '6-8 tuổi'
  if (cat === 'thinking') return '8-10 tuổi'
  if (cat === 'logic') return '9-12 tuổi'

  return '5-8 tuổi'
}

const categoryMeta: Record<Exclude<CategoryKey, 'all'>, { Icon: any; headerClass: string }> = {
  logic: {
    Icon: LightBulbIcon,
    headerClass: 'from-default/25 to-default/5',
  },
  skill: {
    Icon: SparklesIcon,
    headerClass: 'from-primary/20 to-primary/5',
  },
  writing: {
    Icon: PenNibIcon,
    headerClass: 'from-primary/15 to-primary/5',
  },
  thinking: {
    Icon: BrainIcon,
    headerClass: 'from-default/20 to-default/5',
  },
}

const ClassScreen = () => {
  const { translate } = useLanguage()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const { query } = useQuerySearch()

  const { data: classes = [], isLoading, fetchNextPage, hasNextPage } = useGetClass(query)

  const items = useMemo(() => {
    const filtered =
      selectedCategory === 'all'
        ? classes
        : classes.filter((c) => {
            const cat = getCategory(c.name)

            return cat === selectedCategory
          })

    return [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0))
  }, [classes, selectedCategory])

  const renderCard = (item: IClass) => {
    const id = item._id || `${item.name}-${item.price}`
    const teacherName = (item.idTeacher as ITeacher)?.name || 'Thầy Hồng'
    const timeText = item.attributes?.time || 'N/A'
    const categoryKey = getCategory(item.name)
    const { Icon, headerClass } = categoryMeta[categoryKey]
    const showDetail = openId === id

    return (
      <div key={id} className='overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm'>
        <div className={cn('relative h-28 bg-gradient-to-b', headerClass)}>
          <div className='absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/5' />

          <div className='absolute left-4 top-4 rounded-md bg-white/80 px-2 py-1 text-xs font-semibold text-gray-800 backdrop-blur'>
            {getCategoryLabel(categoryKey)}
          </div>
          <div className='absolute right-4 top-4 rounded-md bg-primary px-2 py-1 text-xs font-semibold text-black'>
            Còn {item.numberStudent || 0} chỗ
          </div>

          <div className='absolute inset-0 flex items-center justify-center'>
            <Icon className='size-12 text-default/40' />
          </div>
        </div>

        <div className='flex flex-col gap-3 p-5'>
          <div>
            <div className='text-lg font-bold text-gray-900'>{item.name}</div>
            <div className='mt-1 text-sm text-gray-500'>{item.note || 'Lộ trình rõ ràng, học theo tiến độ phù hợp.'}</div>
          </div>

          <div className='space-y-2 text-sm text-gray-700'>
            <div className='flex items-center gap-2'>
              <span className='inline-flex size-5 items-center justify-center rounded-md bg-black/5 text-gray-500'>
                <svg className='size-4' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                  <path
                    d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <span className='text-gray-500'>Độ tuổi:</span>
              <span>{getAgeText(item.name)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='inline-flex size-5 items-center justify-center rounded-md bg-black/5 text-gray-500'>
                <svg className='size-4' fill='none' stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24'>
                  <path
                    d='M8.25 6.75h7.5m-7.5 3h7.5m-9 6h10.5M6.75 3.75h10.5A2.25 2.25 0 0 1 19.5 6v12A2.25 2.25 0 0 1 17.25 20.25H6.75A2.25 2.25 0 0 1 4.5 18V6A2.25 2.25 0 0 1 6.75 3.75Z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <span className='text-gray-500'>Lịch:</span>
              <span className='truncate'>{timeText}</span>
            </div>
          </div>

          <div className='text-default font-extrabold'>{numberWithCommas(item.price, true)} đ/tháng</div>

          {showDetail && (
            <div className='rounded-xl border border-black/5 bg-gray-50/80 p-4 text-sm text-gray-600'>
              <div className='flex items-center justify-between gap-3'>
                <div className='font-semibold text-gray-900'>Thông tin lớp</div>
                <div className='text-xs text-gray-500'>{teacherName}</div>
              </div>
              <div className='mt-2 space-y-1'>
                {item.note && <div>{item.note}</div>}
                <div className='text-gray-500'>Thời gian: {timeText}</div>
              </div>
            </div>
          )}

          <div className='mt-1 flex gap-3'>
            <MyButton
              className='flex-1 border-black/10 bg-transparent text-gray-700 hover:bg-black/5'
              color='default'
              radius='sm'
              size='sm'
              variant='bordered'
              onClick={() => setOpenId((prev) => (prev === id ? null : id))}
            >
              Xem chi tiết
            </MyButton>
            <MyButton
              className='flex-1'
              color='default'
              radius='sm'
              size='sm'
              variant='solid'
              onClick={() => router.push(`/register?idClass=${item._id}`)}
            >
              Đăng ký
            </MyButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className='w-full bg-white text-gray-900'>
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-white' />
          <div className='absolute -left-40 top-24 h-80 w-80 rounded-full bg-default/10 blur-3xl' />
          <div className='absolute -right-44 top-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl' />
        </div>

        <div className='relative mx-auto w-full max-w-7xl px-5 py-14 md:px-12 md:py-20'>
          <div className='text-center'>
            <h1 className='text-4xl font-extrabold sm:text-5xl text-gray-900'>Các lớp học</h1>
            <p className='mt-3 text-sm text-gray-600 sm:text-base'>Khám phá các lớp học phù hợp với con bạn, từ luyện chữ đến toán tư duy</p>
          </div>

          <div className='mt-10 flex items-center gap-3'>
            <div className='text-gray-400'>
              <FilterIcon />
            </div>

            <MyDropdown
              configDropdownMenu={{
                className: 'bg-white text-gray-900 border border-black/5',
                onAction: (key) => setSelectedCategory(key as CategoryKey),
              }}
              options={[
                { key: 'all', label: 'Tất cả' },
                { key: 'logic', label: 'Toán logic' },
                { key: 'thinking', label: 'Toán tư duy' },
                { key: 'writing', label: 'Luyện chữ' },
                { key: 'skill', label: 'Kỹ năng khác' },
              ]}
            >
              <MyButton
                className='min-w-44 justify-between border-black/10 bg-white text-gray-700'
                color='default'
                endContent={<ArrowDownIcon className='size-4 text-gray-500' />}
                radius='sm'
                size='sm'
                variant='bordered'
              >
                {selectedCategory === 'all' ? 'Tất cả' : getCategoryLabel(selectedCategory)}
              </MyButton>
            </MyDropdown>
          </div>

          <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {items.map(renderCard)}

            {isLoading &&
              items.length === 0 &&
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className='animate-pulse overflow-hidden rounded-2xl border border-black/5 bg-gray-50'>
                  <div className='h-28 bg-gray-100' />
                  <div className='p-5 space-y-3'>
                    <div className='h-4 w-2/3 rounded bg-gray-100' />
                    <div className='h-3 w-full rounded bg-gray-100' />
                    <div className='h-3 w-1/2 rounded bg-gray-100' />
                    <div className='h-9 w-full rounded bg-gray-100' />
                  </div>
                </div>
              ))}
          </div>

          {!isLoading && items.length === 0 && <div className='text-center text-gray-400 py-10'>{translate('common.noData')}</div>}

          {hasNextPage && (
            <div className='flex justify-center mt-8'>
              <MyButton className='min-w-40' color='primary' isLoading={isLoading} radius='sm' variant='solid' onClick={fetchNextPage}>
                {translate('common.loadMore')}
              </MyButton>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ClassScreen
