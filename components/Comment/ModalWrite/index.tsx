import ImageNext from 'next/image'
import MyLoading from '@/components/MyLoading'
import { DataAddComment } from '@/constants/mongoDB'
import { QUERY_KEY } from '@/constants/reactQuery'
import useRefreshQuery from '@/hooks/tank-query/useRefreshQuery'
import useCheckForm from '@/hooks/useCheckForm'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import useUserData from '@/hooks/useUserData'
import ClientApi from '@/services/clientApi'
import { detectImg } from '@/utils/functions'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import useCommentDetail from '@/hooks/tank-query/useCommentDetail'
import { useForm } from '@mantine/form'
import { IProduct } from '@/app/shoes/[...params]/type'
import { AiOutlineCamera, AiOutlineCloseCircle } from 'react-icons/ai'
import MyForm from '@/components/Form/MyForm'
import MyImage from '@/components/MyImage'
import RatingForm from '@/components/Form/Rating'
import InputForm from '@/components/Form/Input'
import InputAreaForm from '@/components/Form/InputArea'
import UploadImage from '@/components/UploadImage'
import ButtonForm from '@/components/Form/ButtonForm'
import { IDataWriteComment } from './type'

const ModalWrite = ({ dataItem }: { dataItem: IProduct }) => {
  const [loading, setLoading] = useState(false)
  const [dataExited, setDataExited] = useState<{ [key: string]: any } | null>(null)

  const { isLogin, userData } = useUserData()
  const { translate } = useLanguage()
  const { checkNumberPhone, checkNameUser } = useCheckForm()
  const { refreshListQuery } = useRefreshQuery()
  const { closeModalDrawer } = useModalDrawer()
  const { data: dataApi, isLoading: loadingApi } = useCommentDetail(dataItem._id)

  const formData = useForm<IDataWriteComment>({
    // mode: 'uncontrolled',
    initialValues: {
      idProduct: dataItem._id!,
      sdt: '',
      name: '',
      note: 'Sản phẩm rất tốt',
      rate: 5,
      listImg: [],
    },
    validate: {
      sdt: (sdt) => checkNumberPhone(sdt),
      name: (name) => checkNameUser(name),
    },
    validateInputOnChange: true,
  })

  useEffect(() => {
    const getData = async () => {
      const initData = {
        idProduct: dataItem._id,
        sdt: userData?.sdt || '',
        name: userData?.name || '',
        note: 'Sản phẩm rất tốt',
        rate: 5,
        listImg: [],
      }
      if (userData && dataApi) {
        initData.listImg = dataApi.listImg
        initData.note = dataApi.note
        initData.rate = dataApi.rate
        setDataExited(dataApi)
      }
      formData.setValues(initData)
    }
    getData()
  }, [userData, dataItem, dataApi])

  const getQuality = () => {
    if (formData.values?.rate >= 4) {
      return translate('comment.veryGood')
    }
    if (formData.values?.rate >= 3) {
      return translate('comment.good')
    }

    if (formData.values?.rate >= 2) {
      return translate('comment.wellwell')
    }
    return translate('comment.normal')
  }

  const getDataToUpdate = () => {
    const data: { [key: string]: any } = {}
    for (const key in dataExited) {
      if (!isEqual(formData.values?.[key as keyof IDataWriteComment], dataExited[key])) {
        if (formData.values?.[key as keyof IDataWriteComment]) {
          data[key as keyof IDataWriteComment] = formData.values?.[key as keyof IDataWriteComment]
        }
      }
    }

    data.imagesDelete = []
    if (Array.isArray(dataExited?.listImg)) {
      data.imagesDelete = dataExited?.listImg?.filter((e: any) => {
        const isExited = formData.values?.listImg.find((eApi: any) => {
          return eApi === e
        })

        return !isExited
      })
    }

    return data
  }

  const handleSubmit = async () => {
    setLoading(true)
    const body: DataAddComment = {
      idProduct: formData.values?.idProduct,
      listImg: formData.values?.listImg,
      note: formData.values?.note,
      name: formData.values?.name,
      rate: formData.values?.rate || 5,
      sdt: formData.values?.sdt,
    }
    let res

    if (dataExited) {
      res = await ClientApi.updateComment(dataExited?._id, getDataToUpdate())
    } else {
      res = await ClientApi.createComment(body)
    }
    if (res?.data) {
      await refreshListQuery([
        QUERY_KEY.GetCommentProduction,
        QUERY_KEY.GetProductByID,
        QUERY_KEY.GetCommentDetail,
      ])
      closeModalDrawer()
      showNotificationSuccess(translate('comment.feedbackSuccess'))
    } else {
      showNotificationError(translate('comment.feedbackFail'))
    }
    setLoading(false)
  }

  const handleUpload = async (file: any) => {
    const prevTemp = formData.values.listImg
    formData.setFieldValue('listImg', [...prevTemp, file])
  }

  const deleteImg = (index: number) => {
    const data = formData.values?.listImg.filter(
      (_: any, indexFilter: number) => indexFilter !== index
    )
    formData.setFieldValue('listImg', data)
  }

  const renderListImg = () => {
    return (
      formData.values?.listImg?.length > 0 && (
        <div className='flex gap-3 mt-2'>
          {formData.values?.listImg?.map((item: any, index: number) => (
            <div key={`img-${index}`} className='relative w-[70px] '>
              <ImageNext
                alt='img'
                className='!relative !h-auto !-[70px]'
                src={detectImg(item?.base64 || item)}
                fill
              />
              <AiOutlineCloseCircle
                onClick={() => deleteImg(index)}
                className='absolute text-[20px] z-10 cursor-pointer right-0 top-0'
              />
            </div>
          ))}
        </div>
      )
    )
  }

  return (
    <div className='flex flex-col gap-3 w-full justify-center items-center min-h-[300px]'>
      {loadingApi ? (
        <MyLoading />
      ) : (
        <MyForm form={formData} className='!w-full' submit={handleSubmit}>
          <div className='flex w-full flex-col overflow-y-auto'>
            <div className='flex gap-2 w-full mb-3'>
              <div className='w-[100px] aspect-square overflow-hidden'>
                <MyImage alt='avatar-product' src={detectImg(dataItem.imageMain)} />
              </div>
              <div className='flex flex-1 flex-col gap-2 h-auto justify-center'>
                <p className='text-medium font-bold'>{dataItem.name}</p>
                <div className='flex flex-col gap-1'>
                  <div>{getQuality()}</div>
                  <RatingForm formData={formData} keyName='rate' />
                </div>
              </div>
            </div>

            <InputForm
              required
              formData={formData}
              keyName={'name'}
              label={translate('header.name')}
              placeholder={translate('header.name')}
              disabled={!!isLogin}
            />

            <InputForm
              required
              formData={formData}
              keyName={'sdt'}
              label={translate('userDetail.sdt')}
              placeholder={translate('userDetail.sdt')}
              disabled={!!isLogin}
            />

            <InputAreaForm
              formData={formData}
              keyName={'note'}
              required
              label={translate('textPopular.note')}
              placeholder={translate('textPopular.note')}
              maxLength={200}
              showCount
            />
            {renderListImg()}
            <div className='w-full'>
              <UploadImage
                callback={handleUpload}
                disabled={formData.values?.listImg?.length >= 2}
                maxSizeOutputKB={200}
                maxPixelReduce={400}
              >
                <div className='flex gap-2 items-center w-full mt-3'>
                  <AiOutlineCamera
                    className='cursor-pointer'
                    style={{ fontSize: 25, color: 'blue' }}
                  />
                  <div className='text-black'>{translate('comment.uploadImg_des')}</div>
                </div>
              </UploadImage>
            </div>

            <div className='flex flex-col w-full gap-2 mt-5 '>
              <ButtonForm
                loading={loading}
                disableClose
                titleSubmit={translate(
                  dataExited ? 'common.updateFeedback' : 'common.sendFeedback'
                )}
              />
            </div>
          </div>
        </MyForm>
      )}
    </div>
  )
}

export default ModalWrite
