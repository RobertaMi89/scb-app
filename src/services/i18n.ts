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
            loading:"Loading",
          searchBar: {
            filter: "Filter",
            search: "Search a contact"
          },
          contact:{
            name:"Name",
            surname:"Surname",
            tel:"Telephone number",
            email:"Email",
            notes:"Notes",
          },
          addContact:{
            create:"Create a new contact",
            addImage:"Add Image",
            save:"Save"
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
            loading:"Caricamento",
            searchBar: {
            filter: "Filtra",
            search: "Cerca un contatto"
          },
          contact:{
            name:"Nome",
            surname:"Cognome",
            tel:"Numero di telefono",
            email:"Email",
            notes:"Note",
          },
          addContact:{
            create:"Crea un nuovo contatto",
            addImage:"Aggiungi Immagine",
            save:"Salva"
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