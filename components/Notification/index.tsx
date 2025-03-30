import { LOCAL_STORAGE_KEY } from '@/constants/app'
import { TYPE_NOTIFICATION } from '@/constants/firebase'
import useLanguage from '@/hooks/useLanguage'
import useRoutePage from '@/hooks/useRoutePage'
import useUserData from '@/hooks/useUserData'
import ClientApi from '@/services/clientApi'
import { FirebaseServices } from '@/services/firebaseService'
import { saveDataLocal } from '@/utils/functions'
import { Button } from '@mantine/core'
import { NextPage } from 'next'
import React, { useEffect } from 'react'

const NotificationClient: NextPage = () => {
  const { isLogin, refreshLogin, userData } = useUserData()
  const { translate } = useLanguage()
  const router = useRoutePage()

  useEffect(() => {
    const handleAddEvent = () => {
      const handleOpenNoti = (dataMess: any) => {
        const key = `open${Date.now()}`
        const handleConfirm = (type: string) => {
          switch (type) {
            case TYPE_NOTIFICATION.myBill:
              router.push('/my-page/bill')
              break

            case TYPE_NOTIFICATION.myCart:
              router.push('/my-cart')
              break

            default:
              router.push('/shoes')
              break
          }
          // notification.destroy(key)
        }
        // const btn = (
        //   <div className='flex w-full justify-end gap-2'>
        //     <Button
        //       type='default'
        //       onClick={() => handleConfirm(dataMess.data.type)}
        //       className='min-w-[50px]'
        //     >
        //       {translate('common.view')}
        //     </Button>
        //     <Button onClick={() => notification.destroy(key)} size='middle' type='primary'>
        //       {translate('common.close')}
        //     </Button>
        //   </div>
        // )

        // notification.open({
        //   message: (
        //     <div className='text-black font-bold '>
        //       {dataMess?.data?.title || dataMess?.notification?.title}
        //     </div>
        //   ),
        //   description: (
        //     <div className='max-h-[100px] overflow-scroll'>
        //       <div
        //         dangerouslySetInnerHTML={{
        //           __html: dataMess?.data?.body || dataMess?.notification?.body,
        //         }}
        //       />
        //     </div>
        //   ),
        //   btn,
        //   key,
        //   duration: 10,
        // })
      }
      FirebaseServices.addListenMessage((dataMess) => {
        console.log({ dataMess })

        handleOpenNoti(dataMess)
      })
    }

    handleAddEvent()
    FirebaseServices.initFirebase()
  }, [router, translate])

  useEffect(() => {
    const updateToken = async (token: string) => {
      if (Array.isArray(userData?.tokenNoti)) {
        const isExited = userData?.tokenNoti?.some((item: string) => item === token)

        if (!isExited || userData?.tokenNoti?.length === 0) {
          const res = await ClientApi.updateTokenNoti(userData?._id!, {
            tokenNoti: [...(userData?.tokenNoti || []), token],
          })

          if (res?.data) {
            refreshLogin()
          }
        }
      }
    }
    const getData = async () => {
      const isSupport = await FirebaseServices.isSupportedNotification()

      if (isSupport) {
        await FirebaseServices.updateServiceWorker()
        Notification.requestPermission()
          .then(async (permission: any) => {
            console.log({ permission })

            // If the user accepts, let's create a notification
            if (permission === 'granted') {
              FirebaseServices.createToken(async (token) => {
                updateToken(token)
                saveDataLocal(LOCAL_STORAGE_KEY.TokenFirebase, token)
              })
            }
          })
          .catch(() => {})
      }
    }
    if (isLogin) {
      getData()
    }
  }, [isLogin])

  return <></>
}

export default NotificationClient
