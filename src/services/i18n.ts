import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'it',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
          searchBar: {
            filter: "Filter",
            search: "Search a contact"
          },
          footer:{
            favorites:"Favorites",
            languages: "Languages",
            contacts: "Contacts"
          }
        }
      },
      it: {
        translation: {
          searchBar: {
            filter: "Filtra",
            search: "Cerca un contatto"
          },
          footer:{
            favorites:"Preferiti",
            languages: "Lingue",
            contacts: "Contatti"
          }
        }
      }
    }
  });

export default i18n;