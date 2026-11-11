import { FINANCE } from '@/constants/finance'

class MBBankService {
  idBanking: string
  message: string
  qrCode: string
  infoAccount: typeof FINANCE.Mb.HoDienHong
  constructor(amount: number) {
    this.idBanking = this.generateSalt()
    this.message = this.generateMess(this.idBanking)
    this.qrCode = this.createQR(amount, this.message)
    this.infoAccount = FINANCE.Mb.HoDienHong
  }

  generateMess(salt: string): string {
    // return `MaID ${salt} Ngay ${formatDateTime(new Date(), 'DD MM YYYY')}`
    return `MaID ${salt} Ngay ${new Date().toLocaleDateString('vi-VN')}`
  }

  // Web Crypto keeps this client-only; importing node:crypto would pull a polyfill
  generateSalt(): string {
    const bytes = new Uint8Array(7)

    if (typeof globalThis.crypto?.getRandomValues === 'function') {
      globalThis.crypto.getRandomValues(bytes)
    } else {
      bytes.forEach((_, index) => {
        bytes[index] = Math.floor(Math.random() * 256)
      })
    }

    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
      .padStart(10, '0')
  }

  static openDeepLink(amount: number, mess: string) {
    const urlFinal = `https://dl.vietqr.io/pay?app=mb&ba=${FINANCE.Mb.HoDienHong.Stk}@mb&am=${amount}&tn=${mess}`
    const link = document.createElement('a')

    link.href = urlFinal
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(urlFinal)
  }

  createQR(amount: number, mess: string) {
    const img = `https://api.vietqr.io/image/970422-${FINANCE.Mb.HoDienHong.Stk}-5IpxP1R.jpg?accountName=${FINANCE.Mb.HoDienHong.Name}&amount=${amount}&addInfo=${mess}`

    return img
  }
}

export default MBBankService
