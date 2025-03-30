import { formatDateTime } from '@/utils/momentFunc'
import { randomBytes } from 'crypto'

class VPBankService {
  idBanking: string
  message: string
  qrCode: string
  stk = '0392225405'
  constructor(amount: number) {
    this.idBanking = this.generateSalt()
    this.message = this.generateMess(this.idBanking)
    this.qrCode = this.createQR(amount, this.message)
  }

  generateMess(salt: string): string {
    return `MaID ${salt} Ngay ${formatDateTime(new Date(), 'DD MM YYYY')}`
  }

  generateSalt(): string {
    return Buffer.from(randomBytes(7).buffer).toString('hex').padStart(10, '0')
  }

  static openDeepLink(amount: number, mess: string) {
    const urlFinal = `https://dl.vietqr.io/pay?app=vpb&ba=0392225405@vpb&am=${amount}&tn=${mess}`
    const link = document.createElement('a')
    link.href = urlFinal
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(urlFinal)
  }

  createQR(amount: number, mess: string) {
    const img = `https://api.vietqr.io/image/970432-0392225405-amEksIA.jpg?accountName=HO%20DIEN%20CONG&amount=${amount}&addInfo=${mess}`
    return img
  }
}

export default VPBankService
