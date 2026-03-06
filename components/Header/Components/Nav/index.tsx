import Link from 'next/link'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown'
import { usePathname, useRouter } from 'next/navigation'

import useDrawer from '@/hooks/useDrawer'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useUser from '@/hooks/useUser'
import MyDropdown from '@/components/MyDropdown'
import TeacherAPI from '@/services/API/Teacher'
import MyButton from '@/components/MyButton'
import { cn } from '@/utils/tailwind'
import { IconRegister } from '@/components/Icons/IconRegister'
import { HomeIcon } from '@/components/Icons/Home'
import { CheckBadgeIcon } from '@/components/Icons/CheckBadge'
import { PaymentIcon } from '@/components/Icons/Payment'
import { UserCircleIcon } from '@/components/Icons/UserCircle'
import { MenuIcon } from '@/components/Icons/Menu'
import { ClassIcon } from '@/components/Icons/Class'
import { ContactIcon } from '@/components/Icons/Contact'
import { InfoIcon } from '@/components/Icons/Info'
import { CopyIcon } from '@/components/Icons/Copy'

const Nav = () => {
  const { isMobile } = useMedia()
  const { translate } = useLanguage()
  const { openDrawer } = useDrawer()
  const { user, setUser } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const adminLinks = [
    { key: 'attendance', label: 'header.admin.attendance', href: '/admin/attendance', icon: <CheckBadgeIcon /> },
    { key: 'class', label: 'header.admin.class', href: '/class', icon: <HomeIcon /> },
    { key: 'payment', label: 'header.admin.payment', href: '/admin/payment', icon: <PaymentIcon /> },
    { key: 'register', label: 'header.admin.register', href: '/admin/register', icon: <IconRegister /> },
    { key: 'student', label: 'header.admin.student', href: '/admin/student', icon: <UserCircleIcon /> },
    { key: 'teacher', label: 'header.admin.teacher', href: '/admin/teacher', icon: <UserCircleIcon /> },
  ]

  const handleLogout = () => {
    setUser(null)
    TeacherAPI.logout()
  }

  const renderContact = () => {
    // return (
    //   <div className='flex gap-3 items-center'>
    //     <Link className='flex gap-1 items-center' href={LINK_CONTACT.Zalo} target='_blank'>
    //       <MyImage fill alt='icon zalo' className='!w-6  !h-6 !relative' src={images.icons.iconZalo} />
    //       {!isMobile && <span>0344798392</span>}
    //     </Link>
    //     <Link className='flex gap-1 items-center' href={LINK_CONTACT.SDT} target='_blank'>
    //       <FaSquarePhoneFlip className='text-blue-700' style={{ fontSize: 20 }} />
    //       {!isMobile && <span>0344798392</span>}
    //     </Link>
    //     <Link className='flex gap-1 items-center' href={LINK_CONTACT.FaceBook} target='_blank'>
    //       <FaFacebook className='text-blue-700' style={{ fontSize: 20 }} />
    //       {!isMobile && <span>Thầy Hồng Toán</span>}
    //     </Link>
    //   </div>
    // )
    return (
      <MyButton className='font-semibold' color='primary' radius='sm' size='sm' variant='solid' onClick={() => router.push('/login')}>
        {translate('login.login')}
      </MyButton>
    )
  }

  const renderUser = () => {
    return (
      // <div className='flex gap-3 items-center'>
      //   <div>{user?.name}</div>
      // </div>
      <MyDropdown
        options={[
          // { label: 'header.admin.profile', key: 'profile' },
          { label: <div onClick={handleLogout}>{translate('common.logout')}</div>, key: 'logout' },
        ]}
      >
        <div className='flex gap-2 items-center cursor-pointer rounded-full border border-black/5 bg-black/5 px-3 py-1 text-gray-800 hover:bg-black/10 transition-colors'>
          <div className='max-w-40 truncate'>{user?.name}</div>
          <MenuIcon className='text-gray-500' />
        </div>
      </MyDropdown>
    )
  }

  const renderNavLink = (href: string, label: string, icon?: React.ReactNode) => {
    const isActive = pathname === href

    return (
      <Link
        className={cn(
          'flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors',
          isActive ? 'bg-default/10 text-default font-bold' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
        )}
        href={href}
      >
        {isMobile && icon}
        <span>{label}</span>
      </Link>
    )
  }

  const renderMenu = () => {
    return (
      <div className='flex md:flex-row flex-col gap-3 md:items-center'>
        {renderNavLink('/', translate('header.home'), <HomeIcon />)}
        {renderNavLink('/class', translate('header.admin.class'), <ClassIcon />)}
        {renderNavLink('/contact', translate('header.contact'), <ContactIcon />)}
        {renderNavLink('/info', translate('header.info'), <InfoIcon />)}
        {renderNavLink('/laundry', 'Giặt ủi', <InfoIcon />)}
        {user && (
          <>
            {isMobile ? (
              <div className='flex flex-col gap-2 mt-2 pt-2 border-t border-black/5'>
                <p className='text-tiny font-bold text-gray-400 uppercase'>{translate('header.admin.title')}</p>
                {adminLinks.map((link) => (
                  <Link
                    key={link.key}
                    className='flex items-center gap-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-black/5 hover:text-gray-900'
                    href={link.href}
                  >
                    <span className='text-gray-500'>{link.icon}</span>
                    <span>{translate(link.label as any)}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <Dropdown>
                <DropdownTrigger>
                  <div className='flex items-center gap-2 cursor-pointer rounded-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-black/5 hover:text-gray-900 transition-colors'>
                    <CopyIcon className='text-gray-500' />
                    <span className='text-gray-800'>Quản trị</span>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label='Admin Actions' className='bg-white text-gray-900 border border-black/5'>
                  {adminLinks.map((link) => (
                    <DropdownItem key={link.key} startContent={<span className='text-gray-500'>{link.icon}</span>}>
                      <Link className='text-gray-800' href={link.href}>
                        {translate(link.label as any)}
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          </>
        )}
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className='flex gap-2 flex-1 items-center justify-end'>
        {renderContact()}
        <MenuIcon
          className='text-2xl cursor-pointer text-gray-600 hover:text-gray-900'
          onClick={() => {
            openDrawer({
              children: renderMenu(),
              placement: 'right',
            })
          }}
        />
      </div>
    )
  }

  return (
    <div className='flex flex-1 gap-3 items-center justify-between'>
      {renderMenu()}
      {user ? renderUser() : renderContact()}
    </div>
  )
}

export default Nav
