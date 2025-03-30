import { useState, useEffect } from 'react'
import useLanguage from './useLanguage'
import { OPTIONS_PAYMENT } from '@/constants/app'
import { images } from '@/configs/images'
import { delayTime } from '@/utils/functions'

type OptionType = {
  name: string
  value: string
  icon?: string
}

type EnableType = {
  momo?: boolean
  banking?: boolean
  cod?: boolean
}
const useOptionPayment = (defaultValue?: OptionType | null, optionEnable?: EnableType) => {
  const { translate } = useLanguage()

  const [optionSelected, setOptionSelected] = useState<OptionType>(
    defaultValue || {
      name: translate('optionPayment.onDelivery'),
      value: OPTIONS_PAYMENT.delivery,
    }
  )

  useEffect(() => {
    if (defaultValue) {
      setOptionSelected(defaultValue)
    }
  }, [defaultValue])

  const listOptions = [
    {
      name: 'Momo',
      value: OPTIONS_PAYMENT.momo,
      icon: images.icon.iconMomo,
      disabled: !optionEnable?.momo,
    },
    {
      name: translate('optionPayment.onDelivery'),
      value: OPTIONS_PAYMENT.delivery,
    },
    {
      name: translate('optionPayment.banking'),
      value: OPTIONS_PAYMENT.banking,
      disabled: !optionEnable?.banking,
    },
  ]

  const handlePayment = async (data: any) => {
    console.log({ handlePayment: data, optionSelected })
    let result
    switch (optionSelected.value) {
      case OPTIONS_PAYMENT.momo:
        console.log('====================================')
        console.log('cash by momo')
        await delayTime(3000)
        console.log('====================================')
        result = true
        break

      case OPTIONS_PAYMENT.banking:
        console.log('====================================')
        console.log('cash by banking')
        await delayTime(3000)

        console.log('====================================')
        result = true
        break
    }
    return result
  }

  return {
    listOptions,
    onChangeOptions: setOptionSelected,
    optionSelected,
    handlePayment,
  }
}

export default useOptionPayment
