import { parsePhoneNumber } from 'libphonenumber-js'

export const getPhoneFormat = (phone: string) => {
  const phoneNumber = parsePhoneNumber(phone, 'VN')
  return phoneNumber.number
}
