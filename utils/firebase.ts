import { DatabaseDocsType, DatabaseQueryType, DatabaseType, QueryData } from '@/constants/firebase'
import {
  WhereFilterOp,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore/lite'
import { encryptData } from './crypto'
import { PAGE_SIZE_LIMIT } from '@/constants/app'

export default class FirebaseFun {
  db: DatabaseType
  path = ''
  constructor(db: DatabaseType, path = '') {
    this.db = db
    this.path = path
  }

  formatData(data: any) {
    if (!data.data()) {
      return null
    }
    const dataTemp = data.data()
    dataTemp.id = data.id
    if (dataTemp?.cost) {
      dataTemp.cost = encryptData(dataTemp?.cost)
    }
    return dataTemp
  }

  async getAllData(): Promise<any> {
    const data = await getDocs(this.db)
    return data.docs.map((doc) => {
      return this.formatData(doc)
    })
  }

  async queryDataByLimit(queryData: QueryData, limitSize: number) {
    const docDetail: DatabaseQueryType = query(
      this.db,
      where(queryData.key, queryData.match, queryData.value),
      limit(limitSize)
    )
    const data = await getDocs(docDetail)
    return data.docs.map((doc) => {
      return this.formatData(doc)
    })
  }

  async queryData(key: string, match: WhereFilterOp, value: any) {
    const docDetail: DatabaseQueryType = query(this.db, where(key, match, value))
    const data = await getDocs(docDetail)
    return data.docs.map((doc) => {
      return this.formatData(doc)
    })
  }

  async listQueryData(listQuery: QueryData[] = []): Promise<any> {
    let docDetail: DatabaseQueryType = query(this.db)
    listQuery.forEach((e) => {
      docDetail = query(docDetail, where(e.key, e.match, e.value))
    })
    const data = await getDocs(docDetail)
    return data.docs.map((doc) => {
      return this.formatData(doc)
    })
  }

  async updateData(id: string, data: any): Promise<boolean> {
    try {
      const temp: DatabaseDocsType = doc(this.db, id)
      await updateDoc(temp, data)
      return true
    } catch {
      return false
    }
  }

  async getDataByID(id: string) {
    const temp = doc(this.db, id)
    const data = await getDoc(temp)
    return this.formatData(data)
  }

  async addData(data: any) {
    try {
      await addDoc(this.db, data)
      return true
    } catch {
      return false
    }
  }

  async deleteData(id: string) {
    try {
      await deleteDoc(doc(this.db, id))
      return true
    } catch {
      return false
    }
  }

  async queryDataOption2(
    dataLast: any,
    querySQL: QueryData,
    keyOderBy: string,
    limitPage: number = PAGE_SIZE_LIMIT
  ) {
    try {
      if (dataLast) {
        const docDetail = query(this.db, where(querySQL.key, querySQL.match, querySQL.value))

        const first = query(docDetail, orderBy(keyOderBy), startAfter(dataLast), limit(limitPage))
        const documentSnapshots = await getDocs(first)
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
        return {
          data: documentSnapshots.docs.map((doc) => {
            return this.formatData(doc)
          }),
          lastVisible,
        }
      } else {
        const first = query(
          this.db,
          where(querySQL.key, querySQL.match, querySQL.value),
          orderBy(keyOderBy),
          limit(limitPage)
        )
        const documentSnapshots = await getDocs(first)
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]

        return {
          data: documentSnapshots.docs.map((doc) => {
            return this.formatData(doc)
          }),
          lastVisible,
        }
      }
    } catch {
      return {
        data: null,
        lastVisible: null,
      }
    }
  }

  async getDataOption2(dataLast: any, keyOderBy: string, limitPage: number = PAGE_SIZE_LIMIT) {
    try {
      if (dataLast) {
        // const dataDecode: QueryDocumentSnapshot = JSON.parse(decryptData(dataLast))
        const next = query(this.db, orderBy(keyOderBy), startAfter(dataLast), limit(limitPage))
        const documentSnapshots = await getDocs(next)

        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]

        return {
          data: documentSnapshots.docs.map((doc) => {
            return this.formatData(doc)
          }),
          // lastVisible: encryptData(JSON.stringify(lastVisible))
          lastVisible,
        }
      } else {
        const first = query(this.db, orderBy(keyOderBy), limit(limitPage))
        const documentSnapshots = await getDocs(first)
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]

        return {
          data: documentSnapshots.docs.map((doc) => {
            return this.formatData(doc)
          }),
          // lastVisible: encryptData(JSON.stringify(lastVisible)),
          lastVisible,
        }
      }
    } catch {
      return {
        data: null,
        lastVisible: null,
      }
    }
  }
}
