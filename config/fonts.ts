import { Be_Vietnam_Pro as BeVietnamPro } from 'next/font/google'

// Friendly, highly legible Vietnamese typeface for the whole site
export const robotoSlab = BeVietnamPro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-roboto-slab',
})
