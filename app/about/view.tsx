'use client'
import React, { useState } from 'react'

import useUserData from '@/hooks/useUserData'
import useLanguage from '@/hooks/useLanguage'
import { PATH_IMG } from '@/constants/mongoDB'
import useModalDrawer from '@/hooks/useModalDrawer'
import ModalDelete from '@/components/ModalDelete'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import MyBlog from '@/components/MyBlog'
import { INIT_DATA_MY_BLOG } from '@/constants/app'
import { FirebaseAbout } from '@/services/firebaseService'
import useFirstLoadPage from '@/hooks/useFirstLoadPage'
import { TAbout } from './type'
import { Button, Input } from '@mantine/core'

const AboutScreen = ({ data }: TAbout) => {
  useFirstLoadPage()
  const { openModalDrawer } = useModalDrawer()
  const { userData } = useUserData()
  const { translate } = useLanguage()
  const [category, setCategory] = useState(data?.category || '')
  const [loading, setLoading] = useState(false)
  const [dataAbout, setDataAbout] = useState<any>(
    data?.des ? JSON.parse(data.des) : INIT_DATA_MY_BLOG
  )

  const handleSubmit = async () => {
    const callBack = async () => {
      setLoading(true)
      let res
      if (data) {
        res = await FirebaseAbout.updateData(data.id, { category, des: JSON.stringify(dataAbout) })
        // res = await ClientApi.updateAbout(data.id, { des: JSON.stringify(dataAbout) })
      } else {
        res = await FirebaseAbout.addData({ category, des: JSON.stringify(dataAbout) })

        // res = await ClientApi.createAbout({ category, des: JSON.stringify(dataAbout) })
      }

      if (res) {
        if (data) {
          showNotificationSuccess(translate('success.update'))
        } else {
          showNotificationSuccess(translate('success.create'))
        }
      } else {
        if (data) {
          showNotificationError(translate('error.update'))
        } else {
          showNotificationError(translate('error.create'))
        }
      }
      setLoading(false)
    }

    openModalDrawer({
      content: (
        <ModalDelete
          title={translate(data ? 'common.update' : 'common.create')}
          des=''
          callback={callBack}
        />
      ),
    })
  }

  if (userData?.isAdmin) {
    return (
      <div className='flex w-full min-h-full flex-col gap-2 py-5'>
        <Button loading={loading} onClick={handleSubmit}>
          {translate('common.save')}
        </Button>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder={translate('textPopular.menuCategory')}
        />
        <MyBlog
          className='w-full h-full'
          pathFile={PATH_IMG.About}
          value={dataAbout}
          setValue={setDataAbout}
        />
      </div>
    )
  }

  return (
    <div className='flex w-full  justify-center items-center '>
      {dataAbout ? (
        <MyBlog className='!p-0' pathFile={PATH_IMG.About} value={dataAbout} disabled />
      ) : (
        <span className='text-2xl py-5 '>{translate('textPopular.notData')}</span>
      )}
    </div>
  )
}

export default AboutScreen
