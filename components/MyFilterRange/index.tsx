import { DEFAULT_VALUE_RANGE } from '@/constants/app'
import useMedia from '@/hooks/useMedia'
import useQuerySearch from '@/hooks/useQuerySearch'
import { numberWithCommas } from '@/utils/functions'
import React, { useEffect, useMemo, useState } from 'react'
import MyCollapse from '../MyCollapse'
import { RangeSlider } from '@mantine/core'

type Props = {
  isDefault?: boolean
  minSlider?: number
  keyMin?: string
  maxSlider?: number
  keyMax?: string
  onChange?: (value?: [number, number]) => void
  onChangeComplete?: (value: [number, number]) => void
  stepRange?: number
  title?: string
  renderTooltip?: (value?: any) => React.ReactNode | undefined
}

const MyFilterRange = ({
  maxSlider = DEFAULT_VALUE_RANGE.Price.max,
  minSlider = DEFAULT_VALUE_RANGE.Price.min,
  onChangeComplete = () => {},
  onChange = () => {},
  stepRange = 1,
  title = '',
  keyMin = '',
  keyMax = '',
  renderTooltip = undefined,
  isDefault = false,
}: Props) => {
  const { isMobile } = useMedia()
  const { queries, updateQuery } = useQuerySearch()
  const [slider, setSlider] = useState<[number, number]>([minSlider, maxSlider])

  // Use useMemo to compute slider values only when queries change
  const sliderFromQuery: [number, number] = useMemo(() => {
    const min = Number(queries?.[keyMin]?.[0] || minSlider)
    const max = Number(queries?.[keyMax]?.[0] || maxSlider)
    return [min, max]
  }, [queries, keyMin, keyMax, minSlider, maxSlider])

  useEffect(() => {
    setSlider(sliderFromQuery)
  }, [sliderFromQuery])

  const handleChangeComplete = (value: [number, number]) => {
    if (sliderFromQuery[1] !== value[1]) {
      updateQuery(keyMax, value[1])
    }

    if (sliderFromQuery[0] !== value[0]) {
      updateQuery(keyMin, value[0])
    }
    onChangeComplete(value)
  }

  const handleChange = (value: [number, number]) => {
    setSlider(value)
    onChange(value)
  }

  const renderTooltips = (value?: any) => {
    return renderTooltip ? renderTooltip(value) : <div>{numberWithCommas(value)}</div>
  }

  return (
    <MyCollapse title={title} isDefaultActive={isDefault}>
      <div className='px-4 py-2 flex flex-col gap-1'>
        <div className='flex items-center mt-2 justify-between'>
          <div className='px-3 text-sm py-1 rounded-xl border-[1px] border-gray-400'>
            {numberWithCommas(slider[0])}
          </div>
          <div className='pb-[2px] w-[10px] bg-gray-400' />
          <div className='px-3 py-1 text-sm rounded-xl border-[1px] border-gray-400'>
            {numberWithCommas(slider[1])}
          </div>
        </div>
        <RangeSlider
          aria-hidden='true'
          aria-label={`Range-slider-${title}`}
          size={isMobile ? 'xs' : 'sm'}
          className='!relative my-2'
          label={renderTooltips}
          min={minSlider}
          max={maxSlider}
          step={stepRange}
          value={slider}
          minRange={stepRange}
          onChange={handleChange}
          onChangeEnd={handleChangeComplete}
          defaultValue={sliderFromQuery}
        />
      </div>
    </MyCollapse>
  )
}

export default MyFilterRange
