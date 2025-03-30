import { METHOD_SUPPORT } from '@/constants/sepay'
import axios from 'axios'

const confgBase = {
  baseURL: 'https://my.sepay.vn/',
  headers: {
    Authorization: `Bearer ${process.env.SEPAY_API_KEY}`,
    'Content-Type': 'application/json',
  },
}

export async function POST(req: Request) {
  try {
    const { method = 'GET', body = null, url, type } = await req.json()
    console.log({ method, body, url, type })

    if (url && !METHOD_SUPPORT[type as keyof typeof METHOD_SUPPORT]) {
      return new Response(
        JSON.stringify({
          error: 'no support',
        }),
        {
          status: 500,
        }
      )
    }

    const data = await axios.request({
      ...confgBase,
      method,
      url,
      data: body,
    })

    return new Response(JSON.stringify(data.data), {
      status: 200,
    })
  } catch (error) {
    console.log({ error })

    return new Response(
      JSON.stringify({
        error,
      }),
      {
        status: 500,
      }
    )
  }
}
