import { NextResponse } from 'next/server'

// Danh sách các domain được phép
const allowedOrigins = [
  'https://tcstore.vercel.app',
  'http://localhost:3016',
  'https://ts-store-nodejs-noti.vercel.app',
  'https://tc-store-admin-client.vercel.app',
]

// Áp dụng middleware cho folder /api
export const config = {
  matcher: '/api/:path*', // Chỉ áp dụng cho các route trong /api
}

export function middleware(request: Request) {
  const origin = request.headers.get('origin') // Lấy Origin từ request

  const response = NextResponse.next()

  // Kiểm tra xem origin có trong danh sách được phép hay không
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin) // Chỉ cho phép origin cụ thể
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  } else {
    return new Response('You are hacker', { status: 403 })
  }

  return response
}
