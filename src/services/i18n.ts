import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'it-IT',
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
            noFavorites: 'No favorite contacts.',
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
            create:"Add contact",
            iconAlt: "Icon to add a contact",
            save:"Save",
            success: "Contact added successfully!",
            error: "An error occurred while adding the contact.",
          },
          updateContact:{
            success: "Contact updated successfully!"
          },
          modal:{
            close:"Close",
            name: "Name",
            surname: "Surname",
            tel: "Telephone",
            email: "Email",
            notes: "Notes",
            save: "Save",
          },
          validation:{
            nameRequired: "Name is required",
            emailOrPhoneRequired:"Email or Phone required",
            invalidEmail: "Invalid email"
          },
          contactDetailPage:{
            edit:"Edit",
            editSuccess: "Contact successfully modified!",
            editError: "An error occurred while editing the contact.",
            delete:"Delete",
            deleteSuccess: "Contact successfully deleted!",
            deleteError: "An error occurred while deleting the contact.",
            closeModal: "Close Modal",
            confirmDeleteTitle: "Confirm deletion",
            confirmDeleteMessage: "Are you sure you want to delete this contact?",
            confirmYes: "Yes",
            confirmNo: "No",
            copy: "Copied"
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
          error: {
            defaultMessage: "An error occurred. Please try again later.",
            retryButton: "Retry",
            retryAriaLabel: "Retry the operation"
          }
        }
      },
      it: {
        translation: {
          loading:"Caricamento in corso",
          backToHome: "Torna alla home",
          backToHomeAlt: "Torna alla home page",
          favorites:{
            noFavorites: 'Nessun contatto preferito.',
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
            create:"Aggiungi contatto",
            iconAlt: "Icona per aggiungere un contatto",
            save:"Salva",
            success: "Contatto aggiunto con successo!",
            error: "Si è verificato un errore durante l'aggiunta del contatto.",
          },
          updateContact:{
            success: "Contatto aggiornato con successo!"
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
          validation:{
            nameRequired: "Nome obbligatorio",
            emailOrPhoneRequired:"Email o Telefono obbligatori",
            invalidEmail: "Email non valida"
          },
          contactDetailPage:{
            edit:"Modifica",
            editSuccess: "Contatto modificato con successo!",
            editError: "Si è verificato un errore durante la modifica del contatto.",
            delete:"Elimina",
            deleteSuccess: "Contatto eliminato con successo!",
            deleteError: "Si è verificato un errore durante l'eliminazione del contatto.",
            closeModal: "Chiudi modale",
            confirmDeleteTitle: "Conferma eliminazione",
            confirmDeleteMessage: "Sei sicuro di voler eliminare questo contatto?",
            confirmYes: "Sì",
            confirmNo: "No",
            copy: "Copiato"
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
          error: {
            defaultMessage: "Si è verificato un errore. Riprova più tardi.",
            retryButton: "Riprova",
            retryAriaLabel: "Riprova l'operazione"
          }
        }
      }
    }
  });

export default i18n;