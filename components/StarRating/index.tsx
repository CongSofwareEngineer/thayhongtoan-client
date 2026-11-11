import { StarIcon } from '../Icons/Star'

import { MAX_STAR } from '@/constants/app'
import { cn } from '@/utils/tailwind'

type Props = {
  value: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** when set, the stars become clickable for input */
  onChange?: (value: number) => void
}

const SIZE_CLASS = { sm: 'size-4', md: 'size-5', lg: 'size-7' }

// Read-only rating display, or an input when onChange is provided
const StarRating = ({ value, size = 'md', className, onChange }: Props) => {
  const stars = Array.from({ length: MAX_STAR }, (_, i) => i + 1)

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {stars.map((star) => {
        const filled = star <= Math.round(value)
        const icon = (
          <StarIcon
            className={cn(SIZE_CLASS[size], filled ? 'text-warning' : 'text-base-content/20')}
            style={filled ? { fill: 'currentColor' } : undefined}
          />
        )

        return onChange ? (
          <button
            key={star}
            aria-label={`${star} star`}
            className='cursor-pointer transition-transform hover:scale-110'
            type='button'
            onClick={() => onChange(star)}
          >
            {icon}
          </button>
        ) : (
          <span key={star}>{icon}</span>
        )
      })}
    </div>
  )
}

export default StarRating
