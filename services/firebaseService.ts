import { collection, getFirestore } from 'firebase/firestore/lite'

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier
  }
}

import { initializeApp, getApps } from 'firebase/app'
import { deleteToken, getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging'
import FirebaseFun from '@/utils/firebase'
import { DATA_BASE, DatabaseCollectionType } from '@/constants/firebase'
import { Auth, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

export const FirebaseServices = {
  config: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_FB,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  },
  initFirebase: () => {
    return getApps().length === 0 ? initializeApp(FirebaseServices.config) : getApps()[0]
  },
  initAuth: () => {
    const auth = getAuth(FirebaseServices.initFirebase())
    auth.useDeviceLanguage()
    return auth
  },

  initRealtimeData: () => {
    const db = getDatabase(
      FirebaseServices.initFirebase(),
      'https://tc-store-7c79f-default-rtdb.asia-southeast1.firebasedatabase.app/'
    )
    return db
  },

  addSigninNumberPhone: (callback: (param?: any) => any) => {
    const auth = FirebaseServices.initAuth()
    auth.useDeviceLanguage()
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response: any) => {
        callback(response)
      },
    })
  },

  sendNumberToGetOtp: async (numberPhone: string, auth: Auth, appVerifier: RecaptchaVerifier) => {
    const data = await signInWithPhoneNumber(auth, numberPhone, appVerifier)
    return data
  },

  createMessage: () => {
    const fb = FirebaseServices.initFirebase()
    return getMessaging(fb)
  },
  isSupportedNotification: async () => {
    const isSupportFirebaseMess = await isSupported()
    return (
      isSupportFirebaseMess &&
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window
    )
  },
  serviceWorker: async () => {
    const firebaseUrl = encodeURIComponent(JSON.stringify(FirebaseServices.config))

    const registration = await navigator.serviceWorker.register(
      `/firebase-messaging-sw.js?firebaseConfig=${firebaseUrl}`,
      { scope: '/' }
    )
    return registration
  },
  updateServiceWorker: async () => {
    const registration = await FirebaseServices.serviceWorker()
    registration.update()
  },
  createToken: async (callback: (e?: any) => Promise<void>) => {
    const registration = await FirebaseServices.serviceWorker()

    return await FirebaseServices.recursiveCreateToken(callback, registration, 0)
  },
  recursiveCreateToken: async (
    callBack: (e?: any) => Promise<void>,
    registration: any,
    numberReq = 0
  ): Promise<any> => {
    if (numberReq >= 5) {
      callBack && callBack(null)
      return null
    } else {
      try {
        const permission = await navigator.permissions.query({
          name: 'notifications',
        })
        if (permission.state === 'granted') {
          const token = await getToken(FirebaseServices.createMessage(), {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VERIFIED_API_KEY,
            serviceWorkerRegistration: registration,
          })
          callBack && callBack(token)

          return token
        }
      } catch {
        numberReq++
        return await FirebaseServices.recursiveCreateToken(callBack, registration, numberReq)
      }
    }
  },

  deleteToken: async () => {
    const cloudMess = FirebaseServices.createMessage()
    const isDelete = await deleteToken(cloudMess)
    return isDelete
  },

  createFBFun: (nameData: string) => {
    const dataCreate = FirebaseServices.initFirebase()
    const collectionData: DatabaseCollectionType = collection(getFirestore(dataCreate), nameData)
    return new FirebaseFun(collectionData)
  },
  addListenMessage: async (callback: (e?: any) => any) => {
    const isSupportFirebaseMess = await FirebaseServices.isSupportedNotification()
    if (isSupportFirebaseMess) {
      onMessage(FirebaseServices.createMessage(), (payload) => {
        callback(payload)
      })
    }
  },

  requestPermission: async (callback: (e?: any) => any, callbackReject?: () => any) => {
    const isSupportFirebaseMess = await FirebaseServices.isSupportedNotification()
    if (isSupportFirebaseMess) {
      navigator.permissions.query({ name: 'notifications' }).then(async (result) => {
        if (result.state === 'prompt') {
          callback && callback()
        }
      })
    } else {
      callbackReject && callbackReject()
    }
  },
}

export const FirebaseAbout = FirebaseServices.createFBFun(DATA_BASE.About)
// export const FirebaseCart = FirebaseServices.createFBFun(DataBase.cartUser)
// export const FirebaseUser = FirebaseServices.createFBFun(DataBase.user)
// export const FirebaseImageDelete = FirebaseServices.createFBFun(
//   DataBase.imageDelete
// )
// export const FirebaseBill = FirebaseServices.createFBFun(DataBase.bill)
// export const FirebaseComment = FirebaseServices.createFBFun(DataBase.comment)
// export const FirebaseContact = FirebaseServices.createFBFun(DataBase.contact)
