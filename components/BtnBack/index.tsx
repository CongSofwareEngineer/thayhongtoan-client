import Link from 'next/link'
import { images } from '@/configs/images'
import Image from 'next/image'
import useRoutePage from '@/hooks/useRoutePage'
import { AiOutlineRight } from 'react-icons/ai'

type BtnBackType = {
  children?: React.ReactNode | undefined
  onClick?: ((param?: any) => void) | null
  url?: string[] | string
  title?: string[] | string
  className?: string
}

const BtnBack = ({ title, url = [], onClick = null, className = '' }: BtnBackType) => {
  // const BtnBack = ({ title, url = [] }: BtnBackType) => {
  const router = useRoutePage()

  return (
    <div
      className={`flex w-full align-middle justify-start gap-1 mb-3 md:mb-6 items-center ${className}`}
    >
      <Image
        fill
        onClick={() => (onClick ? onClick() : router.back())}
        src={images.icon.iconBack}
        alt={'TC Store Icon Back page '}
        className='!relative !w-[25px] !h-[25px] cursor-pointer'
      />
      <div className='ml-2 flex gap-1 flex-1 overflow-hidden text-ellipsis'>
        {typeof title === 'string' ? (
          <div className='md:text-[16px] text-[14px] '>{title}</div>
        ) : (
          title?.map((item, index) => {
            if (url[index]) {
              return (
                <Link
                  className='cursor-pointer flex-nowrap hover:underline md:text-[16px] text-sm  text-blue-700 flex gap-1'
                  href={url[index]}
                  key={item}
                  onClick={() => router.push(url[index])}
                >
                  <span>{item}</span>
                  <AiOutlineRight className='black' />
                </Link>
              )
            }
            return (
              <div
                className=' md:text-[16px] text-sm flex flex-1  whitespace-nowrap overflow-hidden text-ellipsis'
                key={item}
              >
                <span>{item}</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default BtnBack
