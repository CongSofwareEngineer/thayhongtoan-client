import useLanguage from '@/hooks/useLanguage'
import useQuerySearch from '@/hooks/useQuerySearch'
import { useMemo } from 'react'
import { AiOutlineAlignLeft } from 'react-icons/ai'

type MyFilterType = {
  titleHeader?: string
  children?: React.ReactNode | null
  className?: string
  classNameHeader?: string
  classNameContent?: string
  disableShowClear?: boolean
  callbackCleanAll?: () => void
}

const MyFilter = ({
  titleHeader = '',
  children = null,
  className = '',
  classNameHeader = '',
  disableShowClear = false,
  classNameContent = '',
  callbackCleanAll = () => {},
}: MyFilterType) => {
  const { translate } = useLanguage()
  const { clearAll, queries } = useQuerySearch()

  const getNumberQuery = useMemo(() => {
    try {
      let numberQuery = 0
      if (queries) {
        Object.values(queries).forEach((e) => {
          numberQuery += e.length
        })
      }

      return numberQuery
    } catch {
      return 0
    }
  }, [queries])

  const handleCleanAll = () => {
    callbackCleanAll()
    clearAll()
  }

  return (
    <div
      className={`bg-white border-zinc-500 border-[1px] w-full  flex flex-col md:rounded-xl rounded-lg overflow-hidden ${className}`}
    >
      <div
        className={`border-b-[1px] border-zinc-500 w-full flex justify-between items-center  md:py-3 py-2 px-3 bg-green-200  ${classNameHeader}`}
      >
        <div className='flex items-center gap-2'>
          <AiOutlineAlignLeft style={{ fontSize: 20 }} />
          <div className='text-medium '>{titleHeader || translate('menuProduct.category')}</div>
        </div>
        {!disableShowClear && (
          <div
            onClick={handleCleanAll}
            className='hover:underline hover:font-medium cursor-pointer'
          >
            {`${translate('common.clearAll')} (${getNumberQuery})`}
          </div>
        )}
      </div>
      {children}
      <div className={`w-full  ${classNameContent}`}></div>
    </div>
  )
}

export default MyFilter
