'use client'
import { ReactNode, useId, useMemo } from 'react'

import { cn } from '@/utils/tailwind'

export type ChartPoint = { label: string; value: number; color?: string }

type ChartCardProps = {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  children: ReactNode
  className?: string
}

export const ChartCard = ({ title, description, action, children, className }: ChartCardProps) => (
  <div className={cn('flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm', className)}>
    <div className='flex items-start justify-between gap-3'>
      <div>
        <h3 className='text-base font-bold text-base-content'>{title}</h3>
        {description && <p className='text-xs text-base-content/50'>{description}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
)

const niceMax = (max: number) => {
  if (max <= 0) {
    return 10
  }
  const magnitude = 10 ** Math.floor(Math.log10(max))

  return Math.ceil(max / magnitude) * magnitude
}

type BarChartProps = {
  data: ChartPoint[]
  height?: number
  formatValue?: (value: number) => string
  className?: string
}

/** Vertical bar chart drawn with plain SVG — no charting dependency. */
export const BarChart = ({ data, height = 220, formatValue, className }: BarChartProps) => {
  const max = useMemo(() => niceMax(Math.max(...data.map((d) => d.value), 0)), [data])

  if (data.length === 0) {
    return null
  }

  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <div className='flex w-full items-end gap-2 md:gap-4' style={{ height }}>
        {data.map((point) => {
          const ratio = max ? point.value / max : 0

          return (
            <div key={point.label} className='group flex h-full flex-1 flex-col items-center justify-end gap-2'>
              <span className='text-[10px] font-semibold text-base-content/60 opacity-0 transition-opacity group-hover:opacity-100 md:text-xs'>
                {formatValue ? formatValue(point.value) : point.value}
              </span>
              <div
                className='w-full rounded-t-field bg-primary/80 transition-all duration-500 group-hover:bg-primary'
                style={{ height: `${Math.max(ratio * 100, point.value > 0 ? 3 : 0)}%`, backgroundColor: point.color }}
              />
            </div>
          )
        })}
      </div>
      <div className='flex w-full gap-2 md:gap-4'>
        {data.map((point) => (
          <span key={point.label} className='flex-1 truncate text-center text-[10px] text-base-content/50 md:text-xs'>
            {point.label}
          </span>
        ))}
      </div>
    </div>
  )
}

type LineChartProps = {
  data: ChartPoint[]
  height?: number
  formatValue?: (value: number) => string
  className?: string
}

/** Smooth area/line chart drawn with plain SVG. */
export const LineChart = ({ data, height = 220, formatValue, className }: LineChartProps) => {
  const gradientId = useId()
  const max = useMemo(() => niceMax(Math.max(...data.map((d) => d.value), 0)), [data])

  if (data.length < 2) {
    return null
  }

  const width = 100
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * width
    const y = 100 - (max ? (point.value / max) * 100 : 0)

    return { ...point, x, y }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const areaPath = `${linePath} L${width},100 L0,100 Z`

  return (
    <div className={cn('flex w-full flex-col gap-3 px-1.5', className)}>
      <div className='relative w-full' style={{ height }}>
        <svg className='h-full w-full' preserveAspectRatio='none' viewBox='0 0 100 100'>
          <defs>
            <linearGradient id={gradientId} x1='0' x2='0' y1='0' y2='1'>
              <stop offset='0%' stopColor='var(--color-primary)' stopOpacity='0.35' />
              <stop offset='100%' stopColor='var(--color-primary)' stopOpacity='0' />
            </linearGradient>
          </defs>
          {[0, 25, 50, 75, 100].map((y) => (
            <line key={y} stroke='var(--color-base-300)' strokeWidth='0.4' x1='0' x2='100' y1={y} y2={y} />
          ))}
          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path
            d={linePath}
            fill='none'
            stroke='var(--color-primary)'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.2'
            vectorEffect='non-scaling-stroke'
          />
        </svg>

        {/* Value dots + hover labels sit above the SVG so text is not stretched */}
        <div className='pointer-events-none absolute inset-0'>
          {points.map((p) => (
            <span
              key={p.label}
              className='group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2'
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className='block size-2.5 rounded-full border-2 border-base-100 bg-primary' />
              <span className='absolute bottom-4 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-field bg-neutral px-2 py-1 text-[10px] font-semibold text-neutral-content group-hover:block'>
                {formatValue ? formatValue(p.value) : p.value}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className='flex w-full'>
        {data.map((point) => (
          <span key={point.label} className='flex-1 truncate text-center text-[10px] text-base-content/50 md:text-xs'>
            {point.label}
          </span>
        ))}
      </div>
    </div>
  )
}

type DonutChartProps = {
  data: ChartPoint[]
  size?: number
  thickness?: number
  centerLabel?: ReactNode
  className?: string
}

/** Donut chart drawn with stroke-dasharray on concentric circles. */
export const DonutChart = ({ data, size = 180, thickness = 22, centerLabel, className }: DonutChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius

  let offset = 0

  return (
    <div className={cn('flex flex-col items-center gap-5 lg:flex-row lg:justify-center', className)}>
      <div className='relative shrink-0' style={{ width: size, height: size }}>
        <svg height={size} width={size}>
          <circle cx={size / 2} cy={size / 2} fill='none' r={radius} stroke='var(--color-base-200)' strokeWidth={thickness} />
          {total > 0 &&
            data.map((item) => {
              const length = (item.value / total) * circumference
              const dash = `${length} ${circumference - length}`
              const currentOffset = offset

              offset += length

              return (
                <circle
                  key={item.label}
                  cx={size / 2}
                  cy={size / 2}
                  fill='none'
                  r={radius}
                  stroke={item.color || 'var(--color-primary)'}
                  strokeDasharray={dash}
                  strokeDashoffset={-currentOffset}
                  strokeWidth={thickness}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              )
            })}
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>{centerLabel}</div>
      </div>

      <ul className='flex flex-col gap-2'>
        {data.map((item) => (
          <li key={item.label} className='flex items-center gap-2 whitespace-nowrap text-sm'>
            <span className='size-3 shrink-0 rounded-sm' style={{ backgroundColor: item.color || 'var(--color-primary)' }} />
            <span className='text-base-content/70'>{item.label}</span>
            <span className='font-bold text-base-content'>{item.value}</span>
            {total > 0 && <span className='text-xs text-base-content/40'>({Math.round((item.value / total) * 100)}%)</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

type ProgressListProps = {
  data: ChartPoint[]
  formatValue?: (value: number) => string
  className?: string
}

/** Horizontal bars, good for ranking small sets like students per class. */
export const ProgressList = ({ data, formatValue, className }: ProgressListProps) => {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {data.map((item) => (
        <li key={item.label} className='flex flex-col gap-1.5'>
          <div className='flex items-center justify-between text-sm'>
            <span className='truncate text-base-content/70'>{item.label}</span>
            <span className='font-bold text-base-content'>{formatValue ? formatValue(item.value) : item.value}</span>
          </div>
          <div className='h-2 w-full overflow-hidden rounded-full bg-base-200'>
            <div
              className='h-full rounded-full bg-primary transition-all duration-500'
              style={{ width: `${(item.value / max) * 100}%`, backgroundColor: item.color }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
