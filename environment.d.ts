interface EnvironmentVariables {
  readonly NEXT_PUBLIC_API_APP: string
  readonly NEXT_PUBLIC_ENABLE_DEBUG_API: string
  readonly NEXT_PUBLIC_ENABLE_SERVER_LOCAL: string
  readonly NEXT_PUBLIC_ENABLE_CHECK_SERVER_WORKING: string
  readonly NEXT_PUBLIC_API_APP: string
  readonly NEXT_PUBLIC_IMG_LOGO: string
  readonly NEXT_PUBLIC_TITLE: string
  readonly NEXT_PUBLIC_TITLE_DES: string
  readonly NEXT_PUBLIC_IMAGE: string
  readonly NEXT_PUBLIC_KEY_SALT: string
  readonly NEXT_PUBLIC_ENV: string
  readonly NEXT_PUBLIC_KEY_IV_ENCODE: string
  readonly NEXT_PUBLIC_API_KEY_GG_MAP: string
  readonly NEXT_PUBLIC_FIREBASE_API_KEY: string
  readonly NEXT_PUBLIC_FIREBASE_AUTHDOMAIN: string
  readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID_FB: string
  readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
  readonly NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER_ID: string
  readonly NEXT_PUBLIC_FIREBASE_APPID: string0
  readonly NEXT_PUBLIC_FIREBASE_VERIFIED_API_KEY: string
  readonly SEPAY_API_KEY: string
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
