'use client'

import type { MyBlogProps } from './Editor'

import dynamic from 'next/dynamic'

// BlockNote only runs in the browser
const MyBlog = dynamic<MyBlogProps>(() => import('./Editor'), {
  ssr: false,
  loading: () => (
    <div className='flex min-h-[400px] items-center justify-center rounded-box border border-base-300 bg-base-100'>
      <span className='loading loading-spinner loading-lg text-primary' />
    </div>
  ),
})

export default MyBlog
