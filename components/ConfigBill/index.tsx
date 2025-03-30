import useLanguage from '@/hooks/useLanguage'
import React from 'react'

const ConfigBill = ({ item }: { item?: any }) => {
  const { translate } = useLanguage()
  return Object.entries(item?.configBill || {}).length > 1 ? (
    <div className='flex  flex-row  md:gap-3 gap-2'>
      {Object.entries(item?.configBill).map(([key, value], index: number) => {
        const keyLocal: any = `textPopular.${key}`
        const valueLocal: any = `admin.${key}.${value}`
        return (
          <div key={key} className='flex gap-1 text-xs'>
            <div>{translate(keyLocal) || key}</div>
            <span>:</span>
            <div>{translate(valueLocal) || value}</div>
            {index + 1 < Object.entries(item?.configBill || {}).length && <span>,</span>}
          </div>
        )
      })}
    </div>
  ) : (
    <></>
  )
}

export default ConfigBill
