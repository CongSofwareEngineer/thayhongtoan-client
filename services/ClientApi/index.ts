import { REQUEST_TYPE } from '@/constants/app'
import { ClientAPITypeParam, fetchData } from '@/configs/fetchConfig'
import { BodyAddBill } from '@/constants/firebase'
import { encryptData } from '@/utils/crypto'
import { PATH_IMG } from '@/constants/mongoDB'
import { IClientApi } from './type'

const ClientApi = {
  pingServer: async () => {
    return fetchData({ url: `/auth/ping` })
  },

  sendNotiNewChatMessages: async (idChat: string) => {
    try {
      const urlExp = `https://ts-store-nodejs-noti.vercel.app/new-messages/${idChat}`
      return fetch(urlExp)
    } catch (error) {
      console.log({ error })
    }
  },

  getVouchersByIdUser: async (id: string) => {
    return fetchData({ url: `/user/vouchers/${id}` })
  },
  getVouchersDaily: async () => {
    return fetchData({ url: `/voucher/all?date=${Date.now()}` })
  },
  // -> about
  getAbout: async () => {
    const res = await fetchData({ url: `/about/category/shoes` })
    if (res.data) {
      return {
        _id: res.data._id,
        des: res.data.des,
        category: res.data.category,
      }
    }
    return null
  },
  createAbout: async (body: any) => {
    return fetchData({
      url: `/about/create`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  updateAbout: async (id: string, body: any) => {
    return fetchData({
      url: `/about/update/${id}`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },

  // -> token notification
  updateTokenNoti: async (id: string, body: { [key: string]: any }) => {
    return fetchData({
      url: `/user/update-token/${id}`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  getMoreCollections: async (count = 10) => {
    return fetchData({ url: `/product/more-collections?count=${count}` })
  },
  uploadImg: async (file: any, path: PATH_IMG) => {
    return fetchData({
      url: `/upload-image/upload`,
      method: REQUEST_TYPE.POST,
      body: {
        file,
        path,
      },
    })
  },

  // -> user
  checkSDT: async (sdt: any) => {
    return fetchData({ url: `user/check-sdt/${sdt}` })
  },
  login: async (sdt: string, pass: string) => {
    const dataBody = encryptData(
      JSON.stringify({
        sdt,
        pass,
      })
    )
    const body = {
      data: dataBody,
    }
    return fetchData({
      url: `user/login`,
      method: REQUEST_TYPE.POST,
      body,
      isAuth: false,
    })
  },
  register: async (body: any) => {
    return fetchData({
      url: `user/register`,
      method: REQUEST_TYPE.POST,
      body,
      isAuth: false,
    })
  },

  // -> user
  updateAvatar: async (id: string | undefined, file: any) => {
    const publicId = file.public_id
    delete file.public_id
    return fetchData({
      url: `user/update-avatar/${id}`,
      body: {
        file: file,
        publicId,
      },
      method: REQUEST_TYPE.POST,
    })
  },
  updateUser: async (id: string | undefined, body: any) => {
    return fetchData({
      url: `user/update/${id}`,
      body,
      method: REQUEST_TYPE.POST,
    })
  },

  getCategory: async () => {
    const url = `category/all?isShow=true&timeStamp=${new Date().getTime()}`

    return fetchData({
      url,
      isAuth: false,
    })
  },

  // -> bill
  buyNoLogin: async (bodyAPI: BodyAddBill) => {
    const dataEncode = encryptData(bodyAPI)
    return fetchData({
      url: `bill/no-login/create?data=${dataEncode}`,
      isAuth: false,
    })
  },
  buy: async (bodyAPI: BodyAddBill) => {
    const config: ClientAPITypeParam = {
      url: 'bill/create',
      body: bodyAPI,
      method: REQUEST_TYPE.POST,
    }
    return fetchData(config)
  },
  deleteBill: async (idBill: string) => {
    const config: ClientAPITypeParam = {
      url: `bill/delete/${idBill}`,
      method: REQUEST_TYPE.DELETE,
    }
    return fetchData(config)
  },
  getBills: async (queryUrl: string) => {
    return fetchData({
      url: `bill/detail/${queryUrl}`,
    })
  },

  // -> cart
  getMyCart: async (queryUrl: string): Promise<IClientApi['myCart'][]> => {
    const data = await fetchData({
      url: `cart/detail/${queryUrl}`,
    })
    return data?.data || []
  },
  createMyCart: async (body: any) => {
    return fetchData({
      url: 'cart/create',
      body,
      method: REQUEST_TYPE.POST,
    })
  },
  updateMyCart: async (id: string, body: any) => {
    return fetchData({
      url: `cart/update-cart/${id}`,
      body,
      method: REQUEST_TYPE.POST,
    })
  },
  getCartDetail: async (idUser: string, idProduct: string) => {
    return fetchData({
      url: `/cart/details/${idUser}/${idProduct}`,
    })
  },
  deleteCart: async (id: string) => {
    return fetchData({
      url: `/cart/delete/${id}`,
      method: REQUEST_TYPE.DELETE,
    })
  },
  getLengthCart: async (queryUrl: string): Promise<IClientApi['lengthCart']> => {
    const data = await fetchData({
      url: `/cart/length-cart/${queryUrl}`,
    })
    return (
      data?.data || {
        lengthCart: 0,
      }
    )
  },

  // -> product
  getProductByKeyName: async (keyName: string): Promise<IClientApi['product']> => {
    const data = await fetchData({
      url: `product/detail-keyName/${keyName}`,
      isAuth: false,
    })
    return data?.data || []
  },
  getListProducts: async (queryUrl: string): Promise<IClientApi['product'][]> => {
    const data = await fetchData({
      url: `product/all${queryUrl}`,
    })
    return (data?.data || []) as IClientApi['product'][]
  },
  getProductById: async (id: string): Promise<IClientApi['product']> => {
    const data = await fetchData({
      url: `/product/detail/${id}`,
    })
    return data?.data as IClientApi['product']
  },

  // -> comment
  getCommentById: async (queryUrl: string): Promise<IClientApi['comment'][]> => {
    const data = await fetchData({
      url: `/comment/detail/${queryUrl}`,
    })
    return data.data || []
  },
  getCommentByIdAndSDT: async (idProduct: string, sdt: string): Promise<IClientApi['comment']> => {
    const data = await fetchData({
      url: `/comment/detail/${idProduct}/${sdt}`,
    })
    return data.data
  },
  createComment: async (body: any) => {
    return fetchData({
      url: 'comment/create',
      method: REQUEST_TYPE.POST,
      body: body,
    })
  },
  updateComment: async (id: string, body: any) => {
    return fetchData({
      url: `comment/update/${id}`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },
  likeComment: async (id: string, body: any) => {
    return fetchData({
      url: `comment/like/${id}`,
      method: REQUEST_TYPE.POST,
      body,
    })
  },

  deleteComment: async (body: any) => {
    return fetchData({
      url: 'comment/delete',
      method: REQUEST_TYPE.POST,
      body,
    })
  },

  // -> contact
  createContact: async (body: any) => {
    return fetchData({
      url: 'contact-me/create',
      method: REQUEST_TYPE.POST,
      body,
    })
  },
}
export default ClientApi
