import { ImageResponse } from 'next/og'

import { SITE_CONFIG } from '@/config/site'
import { INFO_CONTACT } from '@/constants/app'

export const alt = SITE_CONFIG.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Social preview card, generated at build time so no static 1200x630 asset has to be maintained
const OpengraphImage = () =>
  new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 28,
        padding: 80,
        background: 'linear-gradient(135deg, #0f4f36 0%, #1f7a53 55%, #2f9c6a 100%)',
        color: '#ffffff',
        fontSize: 44,
      }}
    >
      <div style={{ display: 'flex', fontSize: 30, letterSpacing: 6, opacity: 0.85 }}>{INFO_CONTACT.address.toUpperCase()}</div>
      <div style={{ display: 'flex', fontSize: 86, fontWeight: 700, lineHeight: 1.1 }}>{SITE_CONFIG.shortName}</div>
      <div style={{ display: 'flex', fontSize: 40, lineHeight: 1.35, opacity: 0.95 }}>Luyện chữ đẹp · Tập viết · Toán tư duy · Soroban · Tin học</div>
      <div style={{ display: 'flex', marginTop: 12, fontSize: 34, color: '#ffe08a' }}>
        {INFO_CONTACT.phoneDisplay} · {SITE_CONFIG.url.replace('https://', '')}
      </div>
    </div>,
    size
  )

export default OpengraphImage
