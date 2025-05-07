import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';

import en from './src/locales/en.json';
import az from './src/locales/az.json';

const savedLanguage = Cookies.get('buyonidaLang') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
            },
            az: {
                translation: az,
            },
        },
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;