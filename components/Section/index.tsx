import { ReactNode } from 'react'

import { cn } from '@/utils/tailwind'

type SectionProps = {
  children: ReactNode
  className?: string
  containerClassName?: string
  id?: string
}

// Page section with the site's standard max width and gutters
export const Section = ({ children, className, containerClassName, id }: SectionProps) => (
  <section className={cn('w-full', className)} id={id}>
    <div className={cn('m-auto w-full max-w-[1550px] px-5 py-14 md:px-12 md:py-20', containerClassName)}>{children}</div>
  </section>
)

type SectionHeadingProps = {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export const SectionHeading = ({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) => (
  <div className={cn('flex flex-col gap-3', align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}>
    {eyebrow && <span className='badge badge-soft badge-primary font-semibold'>{eyebrow}</span>}
    <h2 className='text-3xl font-extrabold leading-tight text-base-content sm:text-4xl'>{title}</h2>
    {description && <p className={cn('text-base text-base-content/60', align === 'center' && 'max-w-2xl')}>{description}</p>}
  </div>
)

export default Section
