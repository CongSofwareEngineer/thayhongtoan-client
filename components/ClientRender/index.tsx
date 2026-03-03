'use client'
import dynamic from 'next/dynamic'
import { PropsWithChildren, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'

// import Header from '../Header'
// import MyModal from '../MyModal'
// import Footer from '../Footer'
// import LoadingFirstLoad from '../LoadingFirstLoad'
// import MyDrawer from '../MyDrawer'
// import Modal2 from '../Modal2'

const Footer = dynamic(() => import('../Footer'))
const LoadingFirstLoad = dynamic(() => import('../LoadingFirstLoad'))
const Header = dynamic(() => import('../Header'))
const PreLoadData = dynamic(() => import('../PreLoadData'))

const MyModal = dynamic(() => import('../MyModal'), {
  ssr: false,
})
const MyDrawer = dynamic(() => import('../MyDrawer'), {
  ssr: false,
})

const Modal2 = dynamic(() => import('../Modal2'), {
  ssr: false,
})

const ClientRender = ({ children }: PropsWithChildren) => {
  return (
    <Suspense>
      <PreLoadData />
      <Header />
      <main className='w-full h-full min-h-[calc(100vh-56px)] bg-[#F5F7FA] text-gray-900'>
        {children}
        <LoadingFirstLoad />
        <Modal2 />
        <MyModal />
        <MyDrawer />

        <ToastContainer position='top-right' style={{ marginTop: 10 }} />
      </main>
      <Footer />
    </Suspense>
  )
}

export default ClientRender
