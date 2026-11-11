import type { Metadata } from 'next'

import LoginScreen from './client'

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập dành cho giáo viên và quản trị viên.',
  robots: { index: false, follow: false },
}

const LoginPage = () => <LoginScreen />

export default LoginPage
