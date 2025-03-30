import React from 'react'

const ContainerContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      id='main-content'
      className='main-content w-full flex justify-center min-h-[calc(100dvh-56px)]'
    >
      <section
        id='id-section-content'
        className='section-content  w-full max-w-[1350px]  md:px-12 px-[20px]  md:pt-5 pt-2'
      >
        {children}
      </section>
    </main>
  )
}

export default ContainerContent
