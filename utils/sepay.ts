import queryString from 'query-string'

import { METHOD_SUPPORT } from '@/constants/sepay'

class SepayUtils {
  static getUrlByType(type: METHOD_SUPPORT, data: Record<string, string>) {
    const query = queryString.stringify(data)

    switch (type) {
      case METHOD_SUPPORT.getListPayment:
        return `/userapi/transactions/list?${query}&limit=5`

      case METHOD_SUPPORT.getCountPayment:
        return `/userapi/transactions/count?${query} `

      default:
        throw new Error('no support')
    }
  }
}

export default SepayUtils
