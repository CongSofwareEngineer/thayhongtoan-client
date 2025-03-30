import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useQuerySearch from '@/hooks/useQuerySearch'
import { Checkbox } from '@mantine/core'
import MyCollapse from '../MyCollapse'

type MyFilterCheckBox = {
  data?: Record<string, any>[]
  typeChecked?: string
  titleFilter?: string
  isDefault?: boolean
  isReplace?: boolean
  noBorderBottom?: boolean
}

const MyFilterCheckBox = ({
  data = [],
  typeChecked = '',
  titleFilter = '',
  isDefault = false,
  isReplace = true,
  noBorderBottom = false,
}: MyFilterCheckBox) => {
  const { queries, updateQuery } = useQuerySearch()
  const { translate } = useLanguage()
  const { isClient } = useMedia()

  const renderContent = () => {
    return (
      <div className='w-full flex gap-1 md:pb-3   md:flex-col  flex-wrap'>
        {data.map((menu, index: number) => {
          return (
            <div
              className={`md:w-full px-4 py-2  md:border-b-lime-200 ${index !== data.length - 1 && ' '}`}
              key={`menu_${typeChecked}_${index}`}
            >
              <Checkbox
                key={`menu_${typeChecked}_${index}_${queries?.[typeChecked]?.includes(menu?.value || menu.key)}`}
                checked={queries?.[typeChecked]?.includes(menu?.value || menu.key)}
                onChange={() => updateQuery(typeChecked, menu?.value || menu.key, isReplace)}
                label={<div className='whitespace-nowrap'>{menu.name || menu.label}</div>}
              />
            </div>
          )
        })}
        {data.length === 0 && <div className='pl-[10px]'>Đang phát triển</div>}
      </div>
    )
  }

  return isClient ? (
    <MyCollapse
      title={
        <div className='flex items-center flex-1'>
          <div className='flex justify-between items-center'>
            <div className='text-medium '>{titleFilter || translate('menuProduct.category')}</div>
          </div>
        </div>
      }
      noBorderBottom={noBorderBottom}
      isDefaultActive={isDefault}
    >
      {renderContent()}
    </MyCollapse>
  ) : (
    <></>
  )
}

export default MyFilterCheckBox
