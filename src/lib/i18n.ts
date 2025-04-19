import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from '../locales/en.json'
import ptTranslations from '../locales/pt.json'

// Try to get stored language preference
let storedLanguage = 'en'

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  try {
    const stored = localStorage.getItem('i18nextLng')
    if (stored) {
      storedLanguage = stored
    }
  } catch (error) {
    console.warn('Failed to access localStorage for language preference')
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    pt: { translation: ptTranslations }
  },
  lng: storedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n