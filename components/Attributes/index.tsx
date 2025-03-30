import React, { useMemo } from 'react'
import useLanguage from '@/hooks/useLanguage'
import { cloneData } from '@/utils/functions'
import { Checkbox, Select } from '@mantine/core'
import { IProduct } from '@/app/shoes/[...params]/type'

type IAttributes = {
  data: {
    attributes?: {
      sizes?: Array<{
        colors?: any[]
        [key: string]: unknown
      }>
      [key: string]: unknown
    }
  } & IProduct
  onChange?: (param?: any) => void
}
const Attributes = ({ data, onChange = () => {} }: IAttributes) => {
  const { translate } = useLanguage()
  const configBill = data?.configBill
  const optionSizes: number[] = useMemo(() => {
    const listSize = data?.attributes?.sizes!.map((e) => {
      return Number(e.size)
    }) as number[]
    return listSize
  }, [data])

  const onChangeKeyData = (value: number) => {
    const dataClone = cloneData(data)
    const dataSizes = data?.attributes?.sizes!.find((e: any) => Number(e.size) === Number(value))
    dataClone.configBill.size = value
    const colors = dataSizes?.colors!.find((e: any) => Number(e.amount) > 0)

    dataClone.configBill.color = colors?.color || 'no'
    onChange(dataClone)
  }

  const onChangeValueData = (value: string) => {
    const dataClone = cloneData(data)
    dataClone.configBill.color = value
    onChange(dataClone)
  }

  const renderListColors = () => {
    if (!configBill) {
      return <></>
    }

    const listColor = data?.attributes?.sizes!.find((e: any) => {
      return Number(configBill.size) === Number(e.size)
    })

    return (
      <div className='flex flex-col gap-1'>
        <div>{translate('textPopular.color')}:</div>
        <div className='flex flex-wrap gap-3'>
          {listColor?.colors!.map((e: any, index: number) => {
            const keyLocal: any = `admin.color.${e.color}`
            return (
              <div key={`color-${index}`} className='flex items-center'>
                <Checkbox
                  readOnly={Number(e.amount) === 0}
                  onChange={() => onChangeValueData(e.color)}
                  checked={configBill.color === e.color}
                  label={translate(keyLocal) || e.color}
                />
                {Number(e.amount) === 0 && <span className='text-red-600 text-sm'>(Hết hàng)</span>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div className='flex flex-col md:gap-3 gap-2'>
      <div className='flex flex-col gap-1'>
        <div>Size :</div>
        <div className='flex gap-2 items-center'>
          <Select
            checkIconPosition='right'
            value={data?.configBill?.size?.toString()}
            className='w-[100px] !bg-transparent'
            onChange={(e) => onChangeKeyData(Number(e))}
            data={optionSizes.map((e) => {
              return {
                label: e.toFixed(),
                value: e.toFixed(),
              }
            })}
          />
        </div>
      </div>
      {renderListColors()}
    </div>
  )
}

export default Attributes
