export interface Language {
  code: string;
  name: string;
  localName: string;
  ogLocale: string;
}

export const languages: Record<string, Language> = {
  en: {
    code: 'en',
    name: 'English',
    localName: 'English',
    ogLocale: 'en_US'
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    localName: '中文',
    ogLocale: 'zh_CN'
  },
  fr: {
    code: 'fr',
    name: 'French',
    localName: 'Français',
    ogLocale: 'fr_FR'
  }
}

export const defaultLocale = 'en'
export const locales = Object.keys(languages) 