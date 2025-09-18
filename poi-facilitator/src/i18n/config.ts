import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import heTranslations from './locales/he.json';

// Language configuration with RTL support
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    dir: 'ltr',
  },
  he: {
    code: 'he',
    name: 'Hebrew',
    nativeName: 'עברית',
    flag: '🇮🇱',
    dir: 'rtl',
  },
} as const;

export type LanguageCode = keyof typeof languages;

// Resources configuration
const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
  fr: {
    translation: frTranslations,
  },
  de: {
    translation: deTranslations,
  },
  he: {
    translation: heTranslations,
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    // Supported languages
    supportedLngs: Object.keys(languages),
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'poi-language',
      caches: ['localStorage'],
    },
    
    // Namespace configuration
    defaultNS: 'translation',
    
    // React specific options
    react: {
      useSuspense: false,
    },
    
    // Load fallback namespace
    load: 'languageOnly',
    
    // Clean code on language change
    cleanCode: true,
  })
  .catch((error) => {
    console.error('i18next initialization failed:', error);
  });

export default i18n;

// Utility functions
export const getCurrentLanguage = (): LanguageCode => {
  const currentLang = i18n.language as LanguageCode;
  // Check if the current language is supported
  if (currentLang && languages[currentLang]) {
    return currentLang;
  }
  // Fallback to English if current language is not supported
  return 'en';
};

export const getCurrentLanguageInfo = () => {
  const currentLang = getCurrentLanguage();
  const languageInfo = languages[currentLang];
  if (!languageInfo) {
    console.warn(`Language ${currentLang} not found, falling back to English`);
    return languages.en; // Fallback to English
  }
  return languageInfo;
};

export const isRTL = (lang?: LanguageCode): boolean => {
  const language = lang || getCurrentLanguage();
  const languageInfo = languages[language];
  if (!languageInfo) {
    console.warn(`Language ${language} not found, falling back to English`);
    return false; // Default to LTR for unknown languages
  }
  return languageInfo.dir === 'rtl';
};

export const changeLanguage = (lang: LanguageCode) => {
  i18n.changeLanguage(lang);
  
  // Update document direction
  const direction = languages[lang].dir;
  document.documentElement.dir = direction;
  document.documentElement.lang = lang;
  
  // Store in localStorage
  localStorage.setItem('poi-language', lang);
};

