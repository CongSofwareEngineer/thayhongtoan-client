// middleware.ts
import { NextResponse } from 'next/server'

export async function middleware(_req: Request) {
  // const cookie = req.headers.get('cookie') || ''

  // console.log({ cookie })

  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
  //   headers: {
  //     cookie: req.headers.get('cookie') || '',
  //   },
  // })

  // if (!res.ok) {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }
  return NextResponse.next()
}
