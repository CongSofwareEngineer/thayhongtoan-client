'use client'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'

import Footer from '../Footer'
import Header from '../Header'
import PreLoadData from '../PreLoadData'

import { ROUTES } from '@/constants/routes'

// Overlay roots render nothing until opened, so they are safe to skip on the server.
// Header/Footer/PreLoadData stay static: loading them through next/dynamic made the
// SSR chunk fail to parse and dropped every page to client-only rendering.
const FloatingContact = dynamic(() => import('../FloatingContact'), { ssr: false })
const MyModal = dynamic(() => import('../MyModal'), { ssr: false })
const MyDrawer = dynamic(() => import('../MyDrawer'), { ssr: false })
const Modal2 = dynamic(() => import('../Modal2'), { ssr: false })

// Pages whose own primary action sits at the bottom of the screen; the floating
// bubbles would cover it, and the contact details are already on the page.
const NO_FLOATING_CONTACT: string[] = [ROUTES.register, ROUTES.payment, ROUTES.contact, ROUTES.login]

const ClientRender = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  // Admin runs inside its own shell with a sidebar, so it skips the public chrome
  const isAdmin = pathname?.startsWith(ROUTES.admin.root)
  const showFloatingContact = !isAdmin && !NO_FLOATING_CONTACT.includes(pathname || '')

  return (
    <Suspense>
      <PreLoadData />
      <div className='flex min-h-screen flex-col bg-base-100'>
        {!isAdmin && <Header />}
        <main className='flex w-full flex-1 flex-col'>{children}</main>
        {!isAdmin && <Footer />}
      </div>

      {showFloatingContact && <FloatingContact />}
      <Modal2 />
      <MyModal />
      <MyDrawer />
      <ToastContainer newestOnTop autoClose={3000} position='top-right' theme='light' />
    </Suspense>
  )
}

export default ClientRender
