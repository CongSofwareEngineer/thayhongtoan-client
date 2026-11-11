import { REQUEST_TYPE, OBSERVER_KEY } from '@/constants/app'
import { fetchData, ClientAPITypeParam } from '@/config/fetchConfig'
import ObserverService from '@/services/observer'

class BaseAPI<T, F> {
  baseUrl: string = process.env.NEXT_PUBLIC_API_APP || ''
  router: string = ''

  static refreshPromise: Promise<any> | null = null

  async request<R = any, B = any>(
    method: REQUEST_TYPE,
    urlOriginal: string,
    body?: B,
    config?: Partial<ClientAPITypeParam>
  ): Promise<{ data: R; error?: any; messages: any }> {
    let url = urlOriginal

    if (this.router && !url.startsWith('/auth')) {
      url = this.router + url
      url = url.replace('//', '/')
      // `get('')` yields "/resource/?query"; drop the dangling slash
      url = url.replace(/\/(\?|$)/, '$1')
    }

    const response = await fetchData({
      ...config,
      url,
      body,
      method,
      baseURL: this.baseUrl,
    })

    if (!config?.noRefreshToken) {
      if ((response?.error?.response?.status === 401 || response?.messages === 'unauthorized') && urlOriginal !== '/auth/refresh') {
        if (!BaseAPI.refreshPromise) {
          BaseAPI.refreshPromise = this.post('/auth/refresh').finally(() => {
            BaseAPI.refreshPromise = null
          })
        }

        const refreshRes = await BaseAPI.refreshPromise

        if (refreshRes?.data?.status) {
          return await this.request<R, B>(method, urlOriginal, body, config)
        } else {
          ObserverService.emit(OBSERVER_KEY.LogOut, false)
        }
      }
    }

    return response
  }

  get<R = T[], B = F>(url: string, query?: B, config?: Partial<ClientAPITypeParam>) {
    if (query) {
      // Drop empty values so filters never reach the API as the literal "undefined"
      const entries = Object.entries(query as Record<string, unknown>).filter(([, value]) => value !== undefined && value !== null && value !== '')

      if (entries.length > 0) {
        const queryString = new URLSearchParams(entries.map(([key, value]) => [key, String(value)])).toString()

        url = url + `?${queryString}`
      }
    }
    if (!url.startsWith('/')) {
      url = '/' + url
    }

    return this.request<R, B>(REQUEST_TYPE.GET, url, undefined, config)
  }

  post<R = T, B = Partial<T>>(url: string, body?: B, config?: Partial<ClientAPITypeParam>) {
    return this.request<R, B>(REQUEST_TYPE.POST, url, body, config)
  }

  put<R = T, B = Partial<T>>(url: string, body?: B, config?: Partial<ClientAPITypeParam>) {
    return this.request<R, B>(REQUEST_TYPE.PUT, url, body, config)
  }

  patch<R = T, B = Partial<T>>(url: string, body?: B, config?: Partial<ClientAPITypeParam>) {
    return this.request<R, B>(REQUEST_TYPE.PATCH, url, body, config)
  }

  delete<R = T, B = any>(url: string, body?: B, config?: Partial<ClientAPITypeParam>) {
    return this.request<R, B>(REQUEST_TYPE.DELETE, url, body, config)
  }

  create(body: Partial<T>) {
    return this.post<T>('', body)
  }

  update(id: string, body: Partial<T>) {
    return this.patch<T>(`/${id}`, body)
  }
}

export default BaseAPI
