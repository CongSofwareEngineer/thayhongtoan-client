'use client'
import { ReactNode } from 'react'

import { TrendUpIcon } from '../Icons/TrendUp'

import { cn } from '@/utils/tailwind'

type Props = {
  label: ReactNode
  value: ReactNode
  icon: ReactNode
  /** percentage change vs the previous period */
  trend?: number
  trendLabel?: string
  color?: 'primary' | 'success' | 'warning' | 'info' | 'error'
  className?: string
}

const COLOR_CLASS = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-info/10 text-info',
  error: 'bg-error/10 text-error',
}

const StatCard = ({ label, value, icon, trend, trendLabel, color = 'primary', className }: Props) => (
  <div className={cn('flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm', className)}>
    <span className={cn('flex size-14 shrink-0 items-center justify-center rounded-box', COLOR_CLASS[color])}>{icon}</span>
    <div className='min-w-0'>
      <p className='truncate text-sm font-medium text-base-content/60'>{label}</p>
      <p className='truncate text-2xl font-extrabold text-base-content'>{value}</p>
      {typeof trend === 'number' && (
        <p className={cn('flex items-center gap-1 text-xs font-semibold', trend >= 0 ? 'text-success' : 'text-error')}>
          <TrendUpIcon className={cn('size-3.5', trend < 0 && 'rotate-180')} />
          {trend >= 0 ? '+' : ''}
          {trend}% {trendLabel}
        </p>
      )}
    </div>
  </div>
)

export default StatCard
