import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContacts } from '../../context/ContactsContext';
import ContactAvatar from '../atoms/ContactAvatar';
import Loading from '../atoms/Loading';
import { useToast } from '../../context/ToastContext';

interface ContactListProps {
  show: boolean
}
const ContactList: React.FC<ContactListProps> = ({ show }) => {
  const { contacts, setContacts, loading, setLoading, filteredContacts, fetchContacts, updateContact, setDetailContactId: setDetailContact } = useContacts();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [contactsLoading, setContactsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchContacts()
    setContactsLoading(false)
    return () => setLoading(false);

  }, [setContacts, setLoading]);

  const handleToggleFavorite = (contactId: string) => {
    const contactToUpdate = contacts.find((contact) => contact.id === contactId)
    if (!contactToUpdate) {
      return showToast('Errore nel modificare il contatto', 'error')
    }
    updateContact({ ...contactToUpdate, favorite: !contactToUpdate.favorite })
  };

  const handleShowDetail = (contactId: string) => {
    setDetailContact(contactId)
  }

  if (loading && show) {
    return <Loading />;
  }

  return (
    <>
      <ul className={`w-auto divide-y mx-3 divide-gray-200 dark:divide-gray-700 dark:bg-gray-700 ${'sm:min-w-[80%]'} ${show ? "" : "hidden"}`} >
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => {
            const isFavorite = contact.favorite;

            return (
              <li key={contact.id} className="p-3 ps-0 sm:pb-4 flex items-center">
                <button onClick={() => handleShowDetail(contact.id)} aria-label={t('contact.viewDetails')} className=' text-start' style={{ width: "90%" }}>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <ContactAvatar name={contact.name} image={contact.image} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {contact.name} {contact.surname}
                      </p>
                      <p className="text-sm text-gray-900 truncate dark:text-white">{contact.email.length > 30 ? contact.email.slice(0, 29).concat("...") : contact.email}</p>
                    </div>
                  </div>
                </button>
                <div className="flex items-center w-[10%] space-x-2">
                  <button
                    id={'star-'.concat(contact.id)}
                    onClick={() => handleToggleFavorite(contact.id)}
                    className="focus:outline-none"
                    aria-label={isFavorite ? t('contact.removeFromFavorites') : t('contact.addToFavorites')}
                  >
                    {isFavorite ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fde047" className="w-8 h-8">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "#d1d5db" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                      </svg>
                    )}
                  </button>
                </div>

              </li>

            );
          })
        ) : contactsLoading ? "" : (
          <li className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400 py-4 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" aria-label={t('contact.notFound')} viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
            <span>{t('contact.notFound')}</span>
          </li>

        )}
      </ul>
    </>
  );
};

export default ContactList;
