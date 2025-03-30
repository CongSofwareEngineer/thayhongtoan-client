import { FirebaseServices } from '@/services/firebaseService'
import {
  DatabaseReference,
  endAt,
  get,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
  remove,
  update,
} from 'firebase/database'
import { PAGE_SIZE_LIMIT } from '../constants/app'

class FBRealtimeUtils {
  private db: DatabaseReference
  nameDB: string
  private lastData?: number | null = null

  constructor(nameDB = 'Chat') {
    this.nameDB = nameDB
    const fb = FirebaseServices.initRealtimeData()
    this.db = ref(fb, nameDB)
  }

  async remove() {
    try {
      await remove(this.db)
      return true
    } catch {
      return false
    }
  }

  async update(body: any) {
    try {
      await update(this.db, body)
      return true
    } catch {
      return false
    }
  }

  async create(body: any) {
    try {
      await update(this.db, body)
      return true
    } catch {
      return false
    }
  }

  listenerOnValue(callback: (value: any[]) => any) {
    onValue(this.db, async (snapshot) => {
      const data = snapshot.val()

      const arr = []
      for (const key in data) {
        arr.push({ key: key, ...data[key] })
      }

      await callback(arr)
    })
  }

  async getDataByLimit(pagesize = PAGE_SIZE_LIMIT): Promise<{ data: any[]; loadMore: boolean }> {
    try {
      let queryRef

      if (typeof this.lastData === 'number' && this.lastData <= 0) {
        this.lastData = null
        return {
          data: [],
          loadMore: true,
        }
      }
      if (this.lastData) {
        queryRef = query(this.db, orderByChild('date'), endAt(this.lastData), limitToLast(pagesize))
      } else {
        queryRef = query(this.db, limitToLast(pagesize))
      }

      //get data
      const snapshot = await get(queryRef)
      const data: any[] = []

      snapshot.forEach((childSnapshot) => {
        data.push({ id: childSnapshot.key, ...childSnapshot.val() })
      })
      if (data.length === 0) {
        this.lastData = null
        return {
          data: [],
          loadMore: true,
        }
      }
      this.lastData = Number(data[0].date) - 1

      return {
        data,
        loadMore: true,
      }
    } catch {
      this.lastData = null
      return {
        data: [],
        loadMore: true,
      }
    }
  }
}

export default FBRealtimeUtils
