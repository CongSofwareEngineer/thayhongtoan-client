import { OBSERVER_KEY } from '@/constants/app'
import ObserverService from '@/services/observer'
import { useRouter } from 'next/navigation'
import { useRoutePage as useRoutePageZustand } from '@/zustand/useRoutePage'
import { useEffect } from 'react'

const useRoutePage = () => {
  const router = useRouter()
  const { routePage, addPathName } = useRoutePageZustand()

  useEffect(() => {
    if (routePage.size === 0) {
      addPathName(window.location.pathname)
    }
  }, [routePage, addPathName])

  const checkPageExited = (url: string) => {
    if (!routePage.get(url)) {
      addPathName(url)
      ObserverService.emit(OBSERVER_KEY.RoutePage)
    }
  }

  const push = (url: string = '') => {
    const urlFinal = url
    const urlPathName = url.replace(/\?.*$/, '')
    checkPageExited(urlPathName)
    router.push(urlFinal)
  }

  return {
    ...router,
    push,
  }
}

export default useRoutePage
