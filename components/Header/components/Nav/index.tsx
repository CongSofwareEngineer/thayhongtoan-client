import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useRoutePage from '@/hooks/useRoutePage'
import useUserData from '@/hooks/useUserData'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'

const LinkCustom = styled(styled(Link)<{ $isSelected?: boolean }>``).attrs({
  className: 'hover:underline hover:text-blue-700 uppercase whitespace-nowrap',
})`
  color: ${(props) => (props.$isSelected ? 'blue !important' : 'black')};
  font-weight: ${(props) => (props.$isSelected ? '700 !important' : 'nonce')};
`

const LinkUrl = ({ url, text }: { url: string; text: string }) => {
  const pathname = usePathname()
  const route = useRoutePage()

  return (
    <LinkCustom $isSelected={pathname === url} href={url} onClick={() => route.push(url)}>
      {text}
    </LinkCustom>
  )
}
const Nav = () => {
  const { translate } = useLanguage()
  const { isLogin } = useUserData()
  const pathname = usePathname()
  const { isMobile, isClient } = useMedia(900)
  const route = useRoutePage()

  const renderDesktop = () => {
    return (
      <div className='flex flex-1 gap-5 ml-2 '>
        <LinkCustom
          $isSelected={pathname === '/' || pathname === ''}
          href={'/'}
          onClick={() => route.push('/')}
        >
          {translate('header.home')}
        </LinkCustom>
        <LinkUrl text={translate('header.contact')} url='/contact' />
        <LinkUrl text={translate('header.about')} url='/about' />
        {/* {isClient ? (
          <>{!isLogin && <LinkUrl text={translate('header.register')} url='/register' />}</>
        ) : (
          <LinkUrl text={translate('header.register')} url='/register' />
        )} */}
      </div>
    )
  }

  return isMobile ? <></> : renderDesktop()
}

export default Nav
