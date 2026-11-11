import BaseAPI from '../BaseAPI'

import { IContact, IContactFilter } from './type'

class ContactBase extends BaseAPI<IContact, IContactFilter> {
  router = '/contact'

  getAll(query: IContactFilter = {}) {
    return this.get<IContact[]>('/all', query)
  }

  send(body: Partial<IContact>) {
    return this.post<IContact>('', body)
  }
}

const ContactAPI = new ContactBase()

export default ContactAPI
