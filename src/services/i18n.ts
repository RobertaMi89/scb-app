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
            sort: "Sort by",
            sortByName:"Name",
            sortBySurname:"Surname",
            sortByEmail:"Email",
            search: "Search a contact"
          },
          contact:{
            name:"Name",
            surname:"Surname",
            tel:"Telephone number",
            email:"Email",
            notes:"Notes",
            favorites:"Favorites",
            notFound:"Contact not found"
          },
          addContact:{
            create:"Create a new contact",
            addImage:"Add Image",
            save:"Save"
        },
        contactDetailPage:{
            edit:"Edit",
            delete:"Delete"
        },
          footer:{
            contacts: "Contacts"
          }
        }
      },
      it: {
        translation: {
            loading:"Caricamento",
            searchBar: {
              sort: "Ordina per",
              sortByName:"Nome",
              sortBySurname:"Cognome",
              sortByEmail:"Email",
              search: "Cerca un contatto"
          },
          contact:{
            name:"Nome",
            surname:"Cognome",
            tel:"Numero di telefono",
            email:"Email",
            notes:"Note",
            favorites:"Preferiti",
            notFound:"Contatto non trovato"
          },
          addContact:{
            create:"Crea un nuovo contatto",
            addImage:"Aggiungi Immagine",
            save:"Salva"
          },
          contactDetailPage:{
            edit:"Modifica",
            delete:"Elimina"
        },
          footer:{
            contacts: "Contatti"
          }
        }
      }
    }
  });

export default i18n;