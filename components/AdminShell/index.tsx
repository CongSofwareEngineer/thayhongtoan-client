'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode, useState } from 'react'

import MyButton from '../MyButton'
import { AcademicIcon } from '../Icons/Academic'
import { BookOpenIcon } from '../Icons/BookOpen'
import { CalendarIcon } from '../Icons/Calendar'
import { ChatIcon } from '../Icons/Chat'
import { ClipboardIcon } from '../Icons/Clipboard'
import { HomeIcon } from '../Icons/Home'
import { LogOutIcon } from '../Icons/LogOut'
import { MenuIcon } from '../Icons/Menu'
import { MoneyIcon } from '../Icons/Money'
import { SettingIcon } from '../Icons/Setting'
import { SquaresIcon } from '../Icons/Squares'
import { UserCircleIcon } from '../Icons/UserCircle'
import { UsersIcon } from '../Icons/Users'
import { XMarkIcon } from '../Icons/XMark'

import { ROUTES } from '@/constants/routes'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import TeacherAPI from '@/services/API/Teacher'
import { cn } from '@/utils/tailwind'

type AdminLink = { href: string; label: string; icon: ReactNode }

const AdminShell = ({ children }: { children: ReactNode }) => {
  const { translate } = useLanguage()
  const { user, setUser, isLoadedUser } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links: AdminLink[] = [
    { href: ROUTES.admin.root, label: translate('header.admin.dashboard'), icon: <SquaresIcon /> },
    { href: ROUTES.admin.classes, label: translate('header.admin.class'), icon: <AcademicIcon /> },
    { href: ROUTES.admin.students, label: translate('header.admin.student'), icon: <UsersIcon /> },
    { href: ROUTES.admin.parents, label: translate('header.admin.parent'), icon: <UserCircleIcon /> },
    { href: ROUTES.admin.attendance, label: translate('header.admin.attendance'), icon: <CalendarIcon /> },
    { href: ROUTES.admin.tuition, label: translate('header.admin.tuition'), icon: <MoneyIcon /> },
    { href: ROUTES.admin.registers, label: translate('header.admin.register'), icon: <ClipboardIcon /> },
    { href: ROUTES.admin.comments, label: translate('header.admin.comment'), icon: <ChatIcon /> },
    { href: ROUTES.admin.blog, label: translate('header.admin.blog'), icon: <BookOpenIcon /> },
    { href: ROUTES.admin.teachers, label: translate('header.admin.teacher'), icon: <UserCircleIcon /> },
    { href: ROUTES.admin.settings, label: translate('header.admin.setting'), icon: <SettingIcon /> },
  ]

  const handleLogout = () => {
    setUser(null)
    TeacherAPI.logout()
    router.push(ROUTES.home)
  }

  // Wait for the session check before deciding, so the guard does not flash
  if (!isLoadedUser) {
    return (
      <div className='flex min-h-[70vh] w-full items-center justify-center'>
        <span className='loading loading-spinner loading-lg text-primary' />
      </div>
    )
  }

  // Only teachers flagged as admin may see the dashboard
  if (!user?.isAdmin) {
    return (
      <div className='flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 px-5 text-center'>
        <SettingIcon className='size-12 text-base-content/20' />
        <h1 className='text-xl font-bold text-base-content'>{translate('admin.noPermission')}</h1>
        <MyButton onClick={() => router.push(ROUTES.login)}>{translate('admin.goLogin')}</MyButton>
      </div>
    )
  }

  const isActive = (href: string) => (href === ROUTES.admin.root ? pathname === href : pathname.startsWith(href))

  const renderLinks = (onNavigate?: () => void) => (
    <nav className='flex flex-col gap-1'>
      {links.map((item) => (
        <Link
          key={item.href}
          className={cn(
            'flex items-center gap-3 rounded-field px-3 py-2.5 text-sm font-medium transition-colors',
            isActive(item.href) ? 'bg-primary text-primary-content shadow-sm' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
          )}
          href={item.href}
          onClick={onNavigate}
        >
          <span className={cn(isActive(item.href) ? 'opacity-100' : 'opacity-60')}>{item.icon}</span>
          <span className='truncate'>{item.label}</span>
        </Link>
      ))}
    </nav>
  )

  const renderSidebarFooter = (onNavigate?: () => void) => (
    <div className='mt-auto flex flex-col gap-1 border-t border-base-300 pt-3'>
      <Link
        className='flex items-center gap-3 rounded-field px-3 py-2.5 text-sm font-medium text-base-content/70 hover:bg-base-200'
        href={ROUTES.home}
        onClick={onNavigate}
      >
        <HomeIcon className='opacity-60' />
        {translate('header.admin.backToSite')}
      </Link>
      <button
        className='flex items-center gap-3 rounded-field px-3 py-2.5 text-sm font-medium text-error hover:bg-error/10'
        type='button'
        onClick={handleLogout}
      >
        <LogOutIcon />
        {translate('common.logout')}
      </button>
    </div>
  )

  return (
    <div className='flex min-h-screen w-full bg-base-200'>
      {/* Desktop sidebar */}
      <aside className='sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-4 border-r border-base-300 bg-base-100 p-4 lg:flex'>
        <Link className='flex items-center gap-2 px-2 py-2' href={ROUTES.admin.root}>
          <span className='flex size-9 items-center justify-center rounded-field bg-primary text-primary-content'>
            <AcademicIcon className='size-5' />
          </span>
          <span className='text-sm font-extrabold text-base-content'>{translate('header.admin.title')}</span>
        </Link>
        {renderLinks()}
        {renderSidebarFooter()}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className='fixed inset-0 z-[1100] lg:hidden'>
          <button aria-label='close menu' className='absolute inset-0 w-full bg-neutral/40' type='button' onClick={() => setMobileOpen(false)} />
          <aside className='absolute inset-y-0 left-0 flex w-72 flex-col gap-4 overflow-y-auto bg-base-100 p-4 shadow-2xl'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-extrabold text-base-content'>{translate('header.admin.title')}</span>
              <button aria-label='close' className='btn btn-circle btn-ghost btn-sm' type='button' onClick={() => setMobileOpen(false)}>
                <XMarkIcon />
              </button>
            </div>
            {renderLinks(() => setMobileOpen(false))}
            {renderSidebarFooter(() => setMobileOpen(false))}
          </aside>
        </div>
      )}

      <div className='flex min-w-0 flex-1 flex-col'>
        <header className='sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-base-300 bg-base-100/90 px-4 backdrop-blur md:px-6'>
          <button
            aria-label={translate('header.menu')}
            className='btn btn-square btn-ghost btn-sm lg:hidden'
            type='button'
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon className='size-6' />
          </button>
          <span className='truncate text-sm font-bold text-base-content'>
            {links.find((item) => isActive(item.href))?.label || translate('header.admin.title')}
          </span>
          <div className='ml-auto flex items-center gap-2'>
            <span className='hidden items-center gap-2 rounded-full border border-base-300 bg-base-200 px-3 py-1.5 text-sm sm:flex'>
              <UserCircleIcon className='size-5' />
              <span className='max-w-32 truncate'>{user?.name}</span>
            </span>
          </div>
        </header>

        <div className='w-full flex-1 p-4 md:p-6'>{children}</div>
      </div>
    </div>
  )
}

export default AdminShell
