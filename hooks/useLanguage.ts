import { PATH_LANGUAGE, TYPE_LANGUAGE } from '@/constants/zustand'
import { useCategoryMenu } from '@/zustand/useCategoryMenu'
import { useLanguage as useLanguageZustand } from '@/zustand/useLanguage'

const useLanguage = () => {
  const { language } = useLanguageZustand() as any
  const { categoryMenu } = useCategoryMenu()

  const translate = (key?: PATH_LANGUAGE<TYPE_LANGUAGE>) => {
    try {
      const arrKey = key!.split('.')
      let text: any = ''
      arrKey.forEach((e) => {
        if (!text) {
          text = language?.messages[e]
        } else {
          text = text[e]
        }
      })
      return text
    } catch {
      return ''
    }
  }

  const getLabelCategory = (key: string) => {
    try {
      const data = categoryMenu.find((e) => e.keyName === key)
      return data?.lang?.[language.locale] || key
    } catch {
      return key
    }
  }

  return {
    getLabelCategory,
    translate,
    lang: language?.locale || 'vn',
  }
}

export default useLanguage
