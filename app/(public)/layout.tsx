import { PropsWithChildren } from 'react'

const PublicLayout = ({ children }: PropsWithChildren) => {
  return <div className='flex w-full flex-1 flex-col'>{children}</div>
}

export default PublicLayout
