import axios from 'axios'
import { NextRequest } from 'next/server'

import SepayUtils from '@/utils/sepay'

const configBase = {
  baseURL: 'https://my.sepay.vn/',
  headers: {
    Authorization: `Bearer ${process.env.SEPAY_API_KEY}`,
    'Content-Type': 'application/json',
  },
}

export async function POST(req: NextRequest) {
  try {
    const { method = 'GET', body = null, type } = await req.json()

    const urlFinal = SepayUtils.getUrlByType(type, body)

    const data = await axios.request({
      ...configBase,
      method,
      url: urlFinal,
      data: body,
    })

    return new Response(JSON.stringify(data.data), {
      status: 200,
    })
  } catch (error) {
    // console.log({ error })

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

export async function GET() {
  try {
    return new Response(
      JSON.stringify({
        error: 'Not support',
      }),
      {
        status: 200,
      }
    )
  } catch (error) {
    // console.log({ error })

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
