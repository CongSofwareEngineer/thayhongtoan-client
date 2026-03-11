import axios from 'axios'

import { IBody, IResListPayment } from './type'

import { METHOD_SUPPORT } from '@/constants/sepay'
import { FINANCE } from '@/constants/finance'

class SepayServices {
  static stk = FINANCE.STK

  static async post(body: IBody) {
    try {
      const data = await axios.post('/api/sepay', body)

      return {
        data: data.data,
        status: 200,
      }
    } catch (error) {
      // console.log({ errorPost: error })

      return {
        error: null,
        status: 200,
      }
    }
  }

  static async getCountTransactions() {
    return this.post({
      type: METHOD_SUPPORT.getCountPayment,
      body: {
        account_number: this.stk,
      },
    })
  }
  static async getListPayment(): Promise<IResListPayment> {
    const data = await this.post({
      type: METHOD_SUPPORT.getListPayment,
      body: {
        account_number: this.stk,
      },
    })

    return data.data
  }
}

export default SepayServices
