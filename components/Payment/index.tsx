import {
  DEFAULT_FEE_SHIP,
  DEFAULT_RATE_EXP_USER,
  FILTER_BILL,
  OPTIONS_PAYMENT,
} from '@/constants/app'
import useRefreshQuery from '@/hooks/tank-query/useRefreshQuery'
import useLanguage from '@/hooks/useLanguage'
import useModalDrawer from '@/hooks/useModalDrawer'
import useOptionPayment from '@/hooks/useOptionPayment'
import useRoutePage from '@/hooks/useRoutePage'
import useUserData from '@/hooks/useUserData'
import { numberWithCommas } from '@/utils/functions'
import { useEffect, useMemo, useState } from 'react'
import ModalProcess from '../ModalProcess'
import { QUERY_KEY } from '@/constants/reactQuery'
import ModalSuccess from '../ModalSuccess'
import ClientApi from '@/services/clientApi'
import { showNotificationError } from '@/utils/notification'
import { BodyAddBill } from '@/constants/firebase'
import InfoBanking from '../InfoBanking'
import ModalDelete from '../ModalDelete'
import BtnBackUI from '../BtnBackUI'
import OptionsPayment from '../OptionsPayment'
import BillFinal from '../BillFinal'
import MyForm from '../Form/MyForm'
import InfoBill from './InfoBill'
import { IFormPayment, IPayment } from './type'
import { useForm } from '@mantine/form'
import useCheckForm from '@/hooks/useCheckForm'
import ContentFormPayment from './ContentFormPayment'
import { useModalAdmin } from '@/zustand/useModalAdmin'

const INIt_FORM: IFormPayment = {
  sdt: '',
  name: '',
  linkContact: '',
  gmail: '',
  noteBil: '',
  addressShip: {
    addressDetail: '',
    address: '',
  },
}
const Payment = ({ data, clickBack, showBack = true }: IPayment) => {
  const { translate } = useLanguage()
  const { userData, isLogin } = useUserData()
  const { refreshListQuery } = useRefreshQuery()
  const { openModalDrawer, closeModalDrawer } = useModalDrawer()
  const { closeModal: closeModalAdmin } = useModalAdmin()
  const route = useRoutePage()

  const [loading, setLoading] = useState(false)
  const { onChangeOptions, listOptions, optionSelected } = useOptionPayment(null, { banking: true })
  const { checkNumberPhone, checkNameUser } = useCheckForm()

  const formData = useForm({
    // mode: 'uncontrolled',
    initialValues: INIt_FORM,
    validate: {
      sdt: (sdt) => checkNumberPhone(sdt),
      name: (name) => checkNameUser(name),
    },
    validateInputOnChange: true,
  })

  useEffect(() => {
    const initData: IFormPayment = {
      sdt: userData?.sdt,
      name: userData?.name,
      addressShip: userData?.addressShipper[0],
      linkContact: userData?.linkContact!,
      gmail: userData?.gmail,
      noteBil: '',
    }

    formData.setValues(initData)
  }, [userData, isLogin])

  const isValidSubmit = useMemo(() => {
    if (!formData.values?.addressShip) {
      return false
    }
    return !!formData.values.addressShip?.addressDetail
  }, [formData])

  const onChangeAddressShip = (item: any) => {
    formData.setFieldValue('addressShip', item)
  }

  const getTotalPayBill = (plusFee = false) => {
    let total = 0

    data.forEach((e) => {
      if (e.selected) {
        total = Number(e.amountBuy || e.amount) * Number(e?.price || e.more_data?.price) + total
      }
    })
    console.log({ total })

    return numberWithCommas(total + (plusFee ? DEFAULT_FEE_SHIP : 0))
  }

  const getItemForShow = (e: any) => {
    if (e?.moreConfig) {
      return e?.moreConfig
    }
    return e.more_data || {}
  }

  const callbackProcessing = () => {
    openModalDrawer({
      content: (
        <ModalProcess
          title={translate('confirm.bill.createBill')}
          des={translate('confirm.bill.createBill_Des')}
        />
      ),
      configModal: {
        overClickClose: false,
      },
    })
  }

  const callbackSuccess = async () => {
    await refreshListQuery([
      QUERY_KEY.LengthCartUser,
      QUERY_KEY.MyCartUser,
      QUERY_KEY.GetAllNests,
      QUERY_KEY.GetAllProduct,
      QUERY_KEY.GetShoesShop,
    ])
    openModalDrawer({
      content: (
        <ModalSuccess
          showClose
          title={translate('productDetail.modalBuy.success')}
          des={translate('productDetail.modalBuy.successDes')}
          titleSubmit={translate('common.viewBill')}
          titleClose={translate('common.ok')}
          callback={() => {
            route.push('/my-page/bill')
            closeModalDrawer()
          }}
        />
      ),
      configModal: {
        width: '500px',
      },
    })
  }

  const handleSubmitBuy = async (idBanking?: string, mess?: string, bodyAPI?: BodyAddBill) => {
    let res: any = null

    if (idBanking) {
      bodyAPI!.infoBanking = {
        id: idBanking,
        messages: mess,
      }
    }

    if (isLogin) {
      res = await ClientApi.buy(bodyAPI!)
    } else {
      res = await ClientApi.buyNoLogin(bodyAPI!)
    }
    console.log({ res })

    if (res?.data) {
      await callbackSuccess()
      clickBack()
      closeModalAdmin()
    } else {
      showNotificationError(translate('productDetail.modalBuy.error'))
      closeModalAdmin()
    }
  }

  const handleSubmit = async (valueForm: IFormPayment) => {
    const callBack = async () => {
      setLoading(true)
      callbackProcessing()

      let totalBill = 0
      const listBill: any[] = []
      const listNewSoldProduct: any[] = []

      data.forEach((e) => {
        if (e.selected) {
          totalBill += (e.amountBuy || e.amount!) * (getItemForShow(e).price || e.price)
          const itemBill = {
            _id: getItemForShow(e)._id,
            keyName: getItemForShow(e).keyName,
            amount: e.amount,
            idCart: e._id,
            configBill: e?.configBill || {},
          }
          const itemNewSold = {
            idProduct: getItemForShow(e)._id,
            sold: Number(e.amount) + Number(getItemForShow(e).sold),
          }

          listNewSoldProduct.push(itemNewSold)
          listBill.push(itemBill)
        }
      })

      const bodyAPI: BodyAddBill = {
        addressShip: valueForm?.addressShip,
        discount: 0,
        idUser: userData?._id || undefined,
        listBill,
        name: userData?.name || 'no-name',
        totalBill: totalBill,
        sdt: valueForm?.sdt!,
        status: FILTER_BILL.Processing,
        listNewSoldProduct,
      }

      if (isLogin) {
        const expUser = totalBill * DEFAULT_RATE_EXP_USER + (userData?.exp || 0)
        bodyAPI.expUser = expUser
      }

      if (optionSelected.value === OPTIONS_PAYMENT.banking) {
        openModalDrawer({
          content: (
            <InfoBanking
              callbackError={() => {
                setLoading(false)
              }}
              callback={(id, mess) => handleSubmitBuy(id, mess, bodyAPI)}
              amount={Number(totalBill) + DEFAULT_FEE_SHIP}
            />
          ),
          useDrawer: true,
          configModal: {
            width: '700px',
            onClose: () => setLoading(false),
            overClickClose: false,
            showBtnClose: true,
          },
          configDrawer: {
            afterClose: () => setLoading(false),
            overClickOutside: false,
          },
          title: translate('banking.title'),
        })
      } else {
        handleSubmitBuy('', '', bodyAPI)
      }
    }

    openModalDrawer({
      content: (
        <ModalDelete
          autoClose={false}
          callback={callBack}
          title={translate('confirm.bill.confirm')}
          des={translate('confirm.bill.confirm_des')}
          titleConfirm={translate('common.submit')}
        />
      ),
    })
  }

  return (
    <div className='w-full mb-7 mt-1'>
      {showBack && <BtnBackUI clickBack={clickBack} />}

      <div className='flex flex-col gap-3 w-full mt-1'>
        <MyForm
          submit={handleSubmit}
          form={formData}
          className='flex lg:flex-row flex-col lg:gap-6 gap-5'
        >
          <div className='flex flex-1 h-full overflow-y-auto  flex-col lg:max-w-[calc(100%-300px)]'>
            <ContentFormPayment form={formData} onChange={onChangeAddressShip} />
            <InfoBill data={data} />
          </div>
          <div className='lg:w-[350px] flex flex-col md:gap-6 gap-5'>
            <OptionsPayment
              onChangeOptions={onChangeOptions}
              listOptions={listOptions}
              optionSelected={optionSelected}
            />
            <BillFinal
              disabledSubmit={!isValidSubmit}
              loading={loading}
              totalBill={getTotalPayBill()}
              totalBillFeeShip={getTotalPayBill(true)}
            />
          </div>
        </MyForm>
      </div>
    </div>
  )
}

export default Payment
