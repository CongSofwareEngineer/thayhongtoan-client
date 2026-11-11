'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import MyButton from '@/components/MyButton'
import MyDropdown from '@/components/MyDropdown'
import { AcademicIcon } from '@/components/Icons/Academic'
import { BookOpenIcon } from '@/components/Icons/BookOpen'
import { CalendarIcon } from '@/components/Icons/Calendar'
import { ChatIcon } from '@/components/Icons/Chat'
import { ContactIcon } from '@/components/Icons/Contact'
import { HomeIcon } from '@/components/Icons/Home'
import { InfoIcon } from '@/components/Icons/Info'
import { LogOutIcon } from '@/components/Icons/LogOut'
import { MenuIcon } from '@/components/Icons/Menu'
import { MoneyIcon } from '@/components/Icons/Money'
import { PhotoIcon } from '@/components/Icons/Photo'
import { SearchIcon } from '@/components/Icons/Search'
import { SquaresIcon } from '@/components/Icons/Squares'
import { UserCircleIcon } from '@/components/Icons/UserCircle'
import { ROUTES } from '@/constants/routes'
import useDrawer from '@/hooks/useDrawer'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import TeacherAPI from '@/services/API/Teacher'
import { cn } from '@/utils/tailwind'

type NavItem = { href: string; label: string; icon: ReactNode }

const Nav = () => {
  const { translate } = useLanguage()
  const { openDrawer, closeDrawer } = useDrawer()
  const { user, setUser } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  // Primary nav always visible on desktop
  const mainLinks: NavItem[] = [
    { href: ROUTES.home, label: translate('header.home'), icon: <HomeIcon /> },
    { href: ROUTES.about, label: translate('header.about'), icon: <InfoIcon /> },
    { href: ROUTES.class, label: translate('header.class'), icon: <AcademicIcon /> },
    { href: ROUTES.schedule, label: translate('header.schedule'), icon: <CalendarIcon /> },
    { href: ROUTES.tuition, label: translate('header.tuition'), icon: <MoneyIcon /> },
    { href: ROUTES.blog, label: translate('header.blog'), icon: <BookOpenIcon /> },
    { href: ROUTES.contact, label: translate('header.contact'), icon: <ContactIcon /> },
  ]

  // Secondary nav tucked into a "More" dropdown on desktop
  const moreLinks: NavItem[] = [
    { href: ROUTES.gallery, label: translate('header.gallery'), icon: <PhotoIcon /> },
    { href: ROUTES.faq, label: translate('header.faq'), icon: <ChatIcon /> },
    { href: ROUTES.tracking, label: translate('header.tracking'), icon: <SearchIcon /> },
  ]

  const handleLogout = () => {
    setUser(null)
    TeacherAPI.logout()
    router.push(ROUTES.home)
  }

  const isActive = (href: string) => (href === ROUTES.home ? pathname === href : pathname.startsWith(href))

  const renderLink = ({ href, label, icon }: NavItem, withIcon = false) => (
    <Link
      key={href}
      className={cn(
        'flex items-center gap-2 rounded-field px-3 py-2 text-sm font-medium transition-colors',
        isActive(href) ? 'bg-primary/10 font-bold text-primary' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
      )}
      href={href}
      onClick={() => closeDrawer()}
    >
      {withIcon && <span className='opacity-70'>{icon}</span>}
      <span>{label}</span>
    </Link>
  )

  const renderMobileMenu = () => (
    <nav className='flex flex-col gap-1'>
      {[...mainLinks, ...moreLinks].map((item) => renderLink(item, true))}

      <div className='mt-3 border-t border-base-300 pt-3'>
        {user ? (
          <>
            {renderLink({ href: ROUTES.admin.root, label: translate('header.admin.title'), icon: <SquaresIcon /> }, true)}
            <button
              className='flex w-full items-center gap-2 rounded-field px-3 py-2 text-sm font-medium text-error hover:bg-error/10'
              type='button'
              onClick={() => {
                closeDrawer()
                handleLogout()
              }}
            >
              <LogOutIcon />
              {translate('common.logout')}
            </button>
          </>
        ) : (
          renderLink({ href: ROUTES.login, label: translate('common.login'), icon: <UserCircleIcon /> }, true)
        )}
      </div>

      <MyButton
        className='mt-4 w-full font-semibold'
        onClick={() => {
          closeDrawer()
          router.push(ROUTES.register)
        }}
      >
        {translate('header.registerTrial')}
      </MyButton>
    </nav>
  )

  return (
    <>
      {/* Desktop */}
      <nav className='hidden flex-1 items-center justify-center gap-1 lg:flex'>
        {mainLinks.map((item) => renderLink(item))}
        <MyDropdown
          options={moreLinks.map((item) => ({ key: item.href, label: item.label, icon: item.icon }))}
          placement='center'
          onAction={(key) => router.push(key)}
        >
          <span className='flex cursor-pointer items-center gap-1 rounded-field px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content'>
            {translate('common.seeMore')}
          </span>
        </MyDropdown>
      </nav>

      <div className='hidden shrink-0 items-center gap-2 lg:flex'>
        {user ? (
          <MyDropdown
            options={[
              { key: 'admin', label: translate('header.admin.title'), icon: <SquaresIcon /> },
              { key: 'logout', label: translate('common.logout'), icon: <LogOutIcon />, danger: true },
            ]}
            onAction={(key) => (key === 'logout' ? handleLogout() : router.push(ROUTES.admin.root))}
          >
            <span className='flex max-w-48 cursor-pointer items-center gap-2 rounded-full border border-base-300 bg-base-200 px-3 py-1.5 text-sm hover:bg-base-300'>
              <UserCircleIcon className='size-5 shrink-0' />
              <span className='truncate'>{user?.name}</span>
            </span>
          </MyDropdown>
        ) : (
          <MyButton size='sm' variant='ghost' onClick={() => router.push(ROUTES.login)}>
            {translate('common.login')}
          </MyButton>
        )}
        <MyButton className='font-semibold' size='sm' onClick={() => router.push(ROUTES.register)}>
          {translate('header.registerTrial')}
        </MyButton>
      </div>

      {/* Mobile */}
      <div className='flex flex-1 items-center justify-end gap-2 lg:hidden'>
        <MyButton className='font-semibold' size='sm' onClick={() => router.push(ROUTES.register)}>
          {translate('common.register')}
        </MyButton>
        <button
          aria-label={translate('header.menu')}
          className='btn btn-square btn-ghost btn-sm'
          type='button'
          onClick={() =>
            openDrawer({
              title: translate('header.menu'),
              placement: 'right',
              children: renderMobileMenu(),
            })
          }
        >
          <MenuIcon className='size-6' />
        </button>
      </div>
    </>
  )
}

export default Nav
