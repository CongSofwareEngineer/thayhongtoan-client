import { zustandLanguage } from '@/zustand/useLanguage'
import { isObject } from './functions'
import dayjs, { ManipulateType } from 'dayjs'

const localMoment = () => {
  const { locale } = zustandLanguage.getState().language
  // moment.locale(locale)
  // return moment
  return dayjs().locale(locale)
}

export const formatDayjs = (date?: any) => {
  try {
    if (!date) {
      return null
    }
    return dayjs(date)
  } catch {
    return dayjs(dayjs().valueOf())
  }
}

export const convertDateToNumber = (data?: any) => {
  try {
    let timeTemp = data
    if (!timeTemp) {
      timeTemp = Date.now()
    }
    if (typeof data === 'string' && isNumericString(data)) {
      timeTemp = parseInt(data)
    }
    if (isObject(data)) {
      timeTemp = timeTemp.toString()
    }

    return dayjs(timeTemp || dayjs().valueOf()).valueOf()
  } catch {
    return dayjs().valueOf()
  }
}

export const plusDay = (value?: any, amount = 7, type: ManipulateType = 'day') => {
  try {
    return dayjs(value || dayjs().valueOf()).add(amount, type)
  } catch {
    return dayjs()
  }
}

export function isNumericString(input: string) {
  try {
    // Matches only strings containing one or more digits
    return /^\d+$/.test(input)
  } catch {
    return false
  }
}

export const formatDateTime = (data: any, format = 'DD / MM /YYYY') => {
  try {
    let timeTemp = data
    if (typeof data === 'string' && isNumericString(data)) {
      timeTemp = parseInt(data)
    }
    if (isObject(data)) {
      timeTemp = timeTemp.toString()
    }

    return dayjs(timeTemp).format(format)
  } catch {
    return dayjs(dayjs().valueOf()).format(format)
  }
}

export const expiredTimeToNumber = (data: any) => {
  try {
    let timeTemp = data

    if (typeof data === 'string') {
      if (isNumericString(data)) {
        timeTemp = parseInt(data)
      }
    }

    if (isObject(data)) {
      timeTemp = timeTemp.toString()
    }

    const daysDifference = dayjs(timeTemp).diff(dayjs(), 'days')
    return daysDifference
  } catch {
    return data
  }
}

export const diffTime = (data: any, type: ManipulateType = 'days') => {
  try {
    let timeTemp = data

    if (typeof data === 'string') {
      if (isNumericString(data)) {
        timeTemp = parseInt(data)
      }
    }

    if (isObject(data)) {
      timeTemp = timeTemp.toString()
    }

    const daysDifference = dayjs(timeTemp).diff(dayjs().valueOf(), type)
    return daysDifference
  } catch {
    return 0
  }
}

export const formatDatePicker = (data: any) => {
  try {
    let timeTemp = data
    // if (typeof data === typeof dayjs) {
    //   return timeTemp
    // }
    timeTemp = formatDateTime(data, 'DD/MM/YYYY')

    return dayjs(timeTemp, 'DD/MM/YYYY')
  } catch {
    return dayjs(Date.now(), 'DD/MM/YYYY')
  }
}
