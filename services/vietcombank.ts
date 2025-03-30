import { formatDateTime } from '@/utils/momentFunc'
import { randomBytes } from 'crypto'
import { REQUEST_TYPE } from '../constants/app'
import axios from 'axios'

type FetchProp = {
  url: string
  body?: any
  method?: REQUEST_TYPE.DELETE | REQUEST_TYPE.GET | REQUEST_TYPE.POST | REQUEST_TYPE.PUT
}

class VietcomBankService {
  idBanking: string
  message: string
  qrCode: string

  constructor(amount: number) {
    this.idBanking = this.generateSalt()
    this.message = this.generateMess(this.idBanking)
    this.qrCode = this.createQR(amount, this.message)
  }

  async fetch(param: FetchProp) {
    const { url = '', body = null, method = REQUEST_TYPE.GET } = param
    const data = await axios
      .request({
        baseURL: 'https://api.vietqr.io/v2',
        url,
        data: body,
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Apikey ${process.env.NEXT_PUBLIC_API_KEY_CASSO}`,
        },
      })
      .then(async (response) => {
        return {
          data: response?.data?.data,
          messages: 'success',
        }
      })
      .catch((error) => {
        return {
          data: null,
          messages: 'fail',
          error,
        }
      })

    return data
  }

  generateMess(salt: string): string {
    return `Ma ID ${salt}  Ngay ${formatDateTime(new Date(), 'DD MM YYYY')}`
  }

  generateSalt(): string {
    return Buffer.from(randomBytes(7).buffer).toString('hex').padStart(10, '0')
  }

  static openDeepLink(amount: number, mess: string) {
    const urlFinal = `https://dl.vietqr.io/pay?app=vcb&ba=${process.env.NEXT_PUBLIC_VCB_STK}@vcb&am=$${amount}&tn=${mess}`
    const link = document.createElement('a')
    link.href = urlFinal
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(urlFinal)
  }

  createQR(amount: number, mess: string) {
    const img = `https://img.vietqr.io/image/970436-${process.env.NEXT_PUBLIC_VCB_STK}-yWeQQO1.jpg?accountName=HO%20DIEN%20CONG&amount=${amount}&addInfo=${mess}`
    return img
  }
}
export default VietcomBankService
