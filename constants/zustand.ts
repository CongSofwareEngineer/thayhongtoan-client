import MessageVN from '@/public/assets/language/vn.json'

import { DrawerProps } from '@mantine/core'
import { LANGUAGE_SUPPORT } from './app'

const localeVN = {
  locale: LANGUAGE_SUPPORT.VN,
  messages: MessageVN,
}

export enum ZUSTAND {
  Setting = 'setting',
  ModalAdmin = 'modalAdmin',
  Modal = 'modal',
  Drawer = 'drawer',
  Language = 'language',
  ChatSocket = 'chatSocket',
  UserData = 'userData',
  ConnectedChain = 'connectedChain',
  CategoryMenu = 'categoryMenu',
  Provinces = 'provinces',
  RoutePage = 'routePage',
}

export const INIT_ZUSTAND = {
  [ZUSTAND.RoutePage]: new Map(),
  [ZUSTAND.Language]: localeVN,
  [ZUSTAND.Setting]: null,
  [ZUSTAND.UserData]: null,
  [ZUSTAND.ConnectedChain]: 56,
  [ZUSTAND.CategoryMenu]: [],
  [ZUSTAND.Provinces]: [],
  [ZUSTAND.ModalAdmin]: {
    open: false,
    body: null,
  },
  [ZUSTAND.Modal]: {
    content: null,
    open: false,
  },
  [ZUSTAND.Drawer]: {
    content: null,
    opened: false,
  },
}

export type TYPE_USER_DATA = {
  _id?: string
  address?: string
  addressShipper: Array<{
    address: string
    addressDetail: string
  }>
  sdt?: string
  name?: string
  pass?: string
  isAdmin?: boolean
  [key: string]: any
}

export type TYPE_ZUSTAND = {
  [ZUSTAND.RoutePage]: Map<string, string>

  [ZUSTAND.Language]: {
    locale: string
    messages: any
  }
  [ZUSTAND.Setting]: { [key: string]: string } | null
  [ZUSTAND.UserData]: TYPE_USER_DATA | null
  [ZUSTAND.ConnectedChain]: number
  [ZUSTAND.CategoryMenu]: Array<{
    keyName: string
    icon?: string
    lang?: { [key: string]: string }
    [key: string]: any
  }>
  [ZUSTAND.Provinces]: any[]
  [ZUSTAND.ModalAdmin]: {
    open?: boolean
    body?: React.ReactNode
    className?: string
    classNameContent?: string
    width?: string
    height?: string
    callBackAfter?: (param?: any) => any
    title?: React.ReactNode
    showBtnClose?: boolean
    overClickClose?: boolean
    position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  }
  [ZUSTAND.Modal]: {
    classContent?: string | ''
    content?: React.ReactNode
    open?: boolean | false
    title?: React.ReactNode | undefined
    overClickClose?: boolean | true
    showBtnClose?: boolean | true
    width?: string | number
    height?: string | number
    onClose?: () => Promise<void> | void
    afterCose?: () => Promise<void> | void
  }

  [ZUSTAND.Drawer]: {
    content?: React.ReactNode
    noPadding?: boolean
    afterClose?: ((param?: any) => any) | null
    title?: React.ReactNode
    position?: DrawerProps['position']
    opened?: DrawerProps['opened']
    height?: string | number
    width?: string | number
    overClickOutside?: boolean
  }
}

export type TYPE_LANGUAGE = typeof MessageVN
export type PATH_LANGUAGE<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T]: PATH_LANGUAGE<T[K], `${Prefix}${Prefix extends '' ? '' : '.'}${K & string}`>
    }[keyof T]
  : Prefix
