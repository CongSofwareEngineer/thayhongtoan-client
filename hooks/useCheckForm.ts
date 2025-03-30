import useLanguage from './useLanguage'
import { parsePhoneNumber } from 'libphonenumber-js'

const useCheckForm = () => {
  const { translate } = useLanguage()

  const checkNumberPhone = (sdt?: string) => {
    try {
      if (!sdt) {
        return translate('warning.errorSDT')
      }
      const phoneNumber = parsePhoneNumber(sdt, 'VN')
      if (phoneNumber && phoneNumber.isValid()) {
        return null
      }
      return translate('warning.errorSDT')
    } catch {
      return translate('warning.errorSDT')
    }
  }

  const checkIsNumber = (value?: any) => {
    try {
      if (!value) {
        return translate('errors.empty')
      }
      const hasNumbers = /[0-9]/.test(value)
      if (hasNumbers) {
        return null
      }
      return translate('errors.inValueNumber')
    } catch {
      return translate('errors.inValueNumber')
    }
  }

  const checkEmail = (email?: string) => {
    if (!email) {
      return translate('errors.empty')
    }

    const validEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    if (validEmail) {
      return null
    }
    return translate('errors.gmail')
  }

  const checkPassword = (pass?: string) => {
    if (!pass) {
      return translate('errors.empty')
    }
    if (pass.length < 4) {
      return translate('errors.minimumPass')
    }

    const noSQLInjectionPattern = /(\$|\{|\}|\[|\])/g

    // Check if the input contains any NoSQL injection patterns
    if (noSQLInjectionPattern.test(pass)) {
      return translate('errors.invalidPass')
    }
    return null
  }

  const checkNameUser = (name?: string) => {
    if (!name) {
      return translate('errors.empty')
    }
    if (name.length > 24) {
      return translate('errors.maxNameUser')
    }
  }

  return {
    checkNumberPhone,
    checkEmail,
    checkPassword,
    checkNameUser,
    checkIsNumber,
  }
}

export default useCheckForm
