export enum REQUEST_TYPE {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export const COLOR_CONFIG = {
  'gray-1': '#333333',
  'gray-3': '#828282',
  'gray-4': '#BDBDBD',
  'gray-5': '#E0E0E0',
  background: '#F4F4FB',
  blue: '#00A3FF',
  green: '#00C398',
  red: '#E93324',
  hover: '#bdbdbd12',
  yellow: '#F2C94C',
  'yellow-30': '#f2c94c30',
  mask: '#00000078',
  '#bbf7d0': '#bbf7d0',
  green1: '#66FF33',
} as const

export enum COOKIE_KEY {
  'User' = 'User',
  'MyCart' = 'MyCart',
  'Auth' = 'Auth',
  'AuthRefresh' = 'AuthRefresh',
}

export enum COOKIE_EXPIRED {
  'ExpiredAuth' = Number(new Date().setHours(new Date().getHours() + 2).toFixed()) - 20000,
  'ExpiredAuthRefresh' = Number(new Date().setDate(new Date().getDate() + 15).toFixed()) - 20000,
}

export enum LOCAL_STORAGE_KEY {
  'User' = 'User',
  'MyCart' = 'MyCart',
  'IsFirstPermissionNoti' = 'IsFirstPermissionNoti',
  'ListSDTBuy' = 'ListSDTBuy',
  'TokenFirebase' = 'TokenFirebase',
  'IDChatMessages' = 'IDChatMessages',
}

export enum FilterAPI {
  TypeProduct = 'typeProduct',
  LargerPrice = 'largerPrice',
  SmallerPrice = 'smallerPrice',
  Food = 'food',
  Water = 'water',
  Fashion = 'fashion',
  Electronic = 'electronic',
  Category = 'category',
  SubCategory = 'subCategories',
  Sex = 'sex',
  Shoes = 'shoes',
}

export const PAGE_SIZE_LIMIT = 12

export const OPTIONS_PAYMENT = {
  momo: 'momo',
  banking: 'banking',
  delivery: 'delivery',
}

export enum OBSERVER_KEY {
  'LogOut' = 'LogOut',
  'ReLogin' = 'ReLogin',
  'RoutePage' = 'RoutePage',
  'FirstLoadPage' = 'FirstLoadPage',
  'UpdateCookieAuth' = 'UpdateCookieAuth',
}

export enum LANGUAGE_SUPPORT {
  'VN' = 'vn',
  'EN' = 'en',
}

export enum FILTER_BILL {
  'All' = 'all',
  'Processing' = 'processing',
  'Delivering' = 'delivering',
  'DeliveryFail' = 'deliveryFail',
  'DeliverySuccess' = 'deliverySuccess',
  'Canceled' = 'canceled',
}

export const COLOR = {
  blue1: '#0056ff',
  green1: '#22c55e',
  red: 'red',
}

export const MAX_PIXEL_REDUCE = 300 as number

export const LIST_PAGE_REQUIRE_LOGIN = ['/my-cart', '/my-page', '/admin']
export const LIST_PAGE_NO_FOOTER = ['/my-cart', '/contact', '/register']

export enum PATH_IMG {
  MyService = 'my-services',
  Users = 'users',
  Comment = 'comment',
  Products = 'products',
  ContactMe = 'contact-me',
  Category = 'category',
}

export enum MODE_SELECT {
  multiple = 'multiple',
  tags = 'tags',
}

export const DEFAULT_VALUE_RANGE = {
  Shoes: {
    minSize: 29,
    maxSize: 45,
  },
  Price: {
    min: 100000,
    max: 5000000,
  },
}

export const DEFAULT_RATE_EXP_USER = 0.01

export enum LINK_CONTACT {
  Zalo = 'https://zalo.me/0344798392',
  HoDieCong = 'https://hdcong.vercel.app/',
  FaceBook = 'https://www.facebook.com/toantuduysoroban.thayhong/photos',
  Github = 'https://github.com/CongSofwareEngineer',
  SDT = 'tel:+84344798392',
  Mail = 'mailto:hodiencong2000.@gmail.com',
  GGMap = 'https://www.google.com/maps/place/83%2F41+Ph%E1%BA%A1m+V%C4%83n+B%E1%BA%A1ch,+Ph%C6%B0%E1%BB%9Dng+15,+T%C3%A2n+B%C3%ACnh,+H%E1%BB%93+Ch%C3%AD+Minh,+Vietnam/@10.8169953,106.6286017,17z/data=!3m1!4b1!4m6!3m5!1s0x317529d60f102fe1:0x48a05f8f5cd877f6!8m2!3d10.8169953!4d106.6334726!16s%2Fg%2F11l5hwgmt7?entry=ttu',
}

export const INIT_DATA_MY_BLOG = {
  'b351b4ab-a9af-47a1-8be5-3029325fc9ab': {
    id: 'b351b4ab-a9af-47a1-8be5-3029325fc9ab',
    type: 'Paragraph',
    value: [
      {
        id: '9fed4bba-3182-4b61-8d50-b3ddc2e02279',
        type: 'paragraph',
        children: [
          {
            text: 'New',
          },
        ],
      },
    ],
    meta: {
      align: 'left',
      depth: 0,
      order: 0,
    },
  },
}

export const DEFAULT_FEE_SHIP = 30000
