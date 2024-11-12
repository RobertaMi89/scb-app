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
          backToHome: "Go to homepage",
          backToHomeAlt: "Go to homepage",
          favorites:{
            viewContact: "View contact: {{name}}"
          },
          searchBar: {
            sort: "Sort by",
            sortByName:"Name",
            sortBySurname:"Surname",
            sortByEmail:"Email",
            search: "Search a contact",
            ascending: "Ascending",
            descending: "Descending"
          },
          contact:{
            name:"Name",
            surname:"Surname",
            tel:"Telephone number",
            email:"Email",
            notes:"Notes",
            favorites:"Favorites",
            removeFromFavorites: "Remove from favorites",
            addToFavorites: "Add to favorites",
            viewDetails: "View contact details",
            notFound:"Contact not found"
          },
          addContact:{
            create:"Create a new contact",
            iconAlt: "Icon to add a contact",
            save:"Save"
          },
          modal:{
            close:"Close",
            name: "Name",
            surname: "Surname",
            tel: "Telephone",
            email: "Email",
            notes: "Notes",
            save: "Save"
          },
          contactDetailPage:{
            edit:"Edit",
            delete:"Delete"
           },
           header:{
            navigation: "Site navigation"
          },
          footer:{
            contacts: "Contacts",
            goToFavorites: "Go to favorites page",
            goToContacts: "Go to contacts page",
            navigation: "Footer navigation"
          },
          language_selection: "Language selection",
          italian_flag: "Italian flag",
          british_flag: "British flag",
          avatar_alt: "Avatar",
          avatar_placeholder: "Avatar placeholder for {{name}}",
          dropdown_menu: "Menu",
          menu_item: "Menu item",
          button_disabled: "Button disabled",
          search_input_label: "Search field",
          change:{
            language: "Cambia lingua"
          },
        
        }
      },
      it: {
        translation: {
          loading:"Caricamento",
          backToHome: "Torna alla home",
          backToHomeAlt: "Torna alla home page",
          favorites:{
            viewContact: "Visualizza contatto: {{name}}"
          },
          searchBar: {
            sort: "Ordina per",
            sortByName:"Nome",
            sortBySurname:"Cognome",
            sortByEmail:"Email",
            search: "Cerca un contatto",
            ascending: "Ascendente",
            descending: "Discendente"
          },
          contact:{
            name:"Nome",
            surname:"Cognome",
            tel:"Numero di telefono",
            email:"Email",
            notes:"Note",
            favorites:"Preferiti",
            removeFromFavorites: "Rimuovi dai preferiti",
            addToFavorites: "Aggiungi ai preferiti",
            viewDetails: "Visualizza dettagli contatto",
            notFound:"Contatto non trovato"
          },
          addContact:{
            create:"Crea un nuovo contatto",
            iconAlt: "Icona per aggiungere un contatto",
            save:"Salva"
          },
          modal:{
            close: "Chiudi",
            name: "Nome",
            surname: "Cognome",
            tel: "Telefono",
            email: "Email",
            notes: "Note",
            save: "Salva"
          },
          contactDetailPage:{
            edit:"Modifica",
            delete:"Elimina"
          },
          header:{
            navigation: "Navigazione del sito"
          },
          footer:{
            contacts: "Contatti",
            goToFavorites: "Vai alla pagina dei preferiti",
            goToContacts: "Vai alla pagina dei contatti",
            navigation: "Navigazione del piè di pagina"
          },
          language_selection: "Selezione lingua",
          italian_flag: "Bandiera italiana",
          british_flag: "Bandiera britannica",
          avatar_alt: "Avatar",
          avatar_placeholder: "Segnaposto avatar per {{name}}",
          dropdown_menu: "Menu",
          menu_item: "Elemento del menu",
          button_disabled: "Pulsante disabilitato",
          search_input_label: "Campo di ricerca",
          change:{
            language: "Cambia lingua"
          },
        }
      }
    }
  });

export default i18n;