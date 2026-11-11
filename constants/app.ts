export const PAGE_SIZE_LIMIT = 20

export enum LANGUAGE_SUPPORT {
  EN = 'en',
  CN = 'cn',
  JP = 'jp',
}

export enum LINK_CONTACT {
  Zalo = 'https://zalo.me/0344798392',
  HoDieCong = 'https://hdcong.vercel.app/',
  FaceBook = 'https://www.facebook.com/toantuduysoroban.thayhong/photos',
  Github = 'https://github.com/CongSofwareEngineer',
  SDT = 'tel:+84344798392',
  Mail = 'mailto:hodienhong8392@gmail.com',
  GGMap = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d245.27946055157543!2d104.47439031761917!3d10.38408607257531!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109db6752fd6d67%3A0xfdc817d347739de1!2zTmjDoCB0cuG7jSBiw6xuaCBkw6JuIFRoYW5oIER1eQ!5e0!3m2!1sen!2s!4v1750173449168!5m2!1sen!2s',
}

export enum REQUEST_TYPE {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
export enum OBSERVER_KEY {
  LogOut = 'LogOut',
  ReLogin = 'ReLogin',
  RoutePage = 'RoutePage',
  FirstLoadPage = 'FirstLoadPage',
  UpdateCookieAuth = 'UpdateCookieAuth',
}

export enum COOKIE_KEY {
  Auth = 'Auth',
  AuthRefresh = 'AuthRefresh',

  Token = 'Token',
  TokenRefresh = 'TokenRefresh',
}

export enum PATH_IMG {
  MyService = 'my-services',
  Users = 'users',
  Comment = 'comment',
  Products = 'products',
  ContactMe = 'contact-me',
  Category = 'category',
  About = 'About',
}

export const MAX_PIXEL_REDUCE = 300 as number

export const INFO_CONTACT = {
  name: 'Thầy Hồng Toán',
  phone: '0344798392',
  phoneDisplay: '0344 798 392',
  email: 'hodienhong8392@gmail.com',
  address: 'Nhà trọ Thanh Duy, TP. Hà Tiên, Kiên Giang',
  workingTime: '08:00 - 20:00',
}

export enum COMMENT_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum REGISTER_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum PAYMENT_STATUS {
  PAID = 'paid',
  PARTIAL = 'partial',
  UNPAID = 'unpaid',
}

export enum BLOG_STATUS {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export const MAX_STAR = 5

export const WEEK_DAYS = [1, 2, 3, 4, 5, 6, 0] as const

export const MONTH_LABELS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']

// Keys of the questions rendered on /faq (faq.q* / faq.a* in the language files)
export const FAQ_KEYS = ['1', '2', '3', '4', '5', '6'] as const
