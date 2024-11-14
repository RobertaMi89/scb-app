import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContacts } from '../../context/ContactsContext';
import userNotFound from "../../assets/userNotFound.svg"
import starOutline from '../../assets/starOutline.svg';
import starFill from '../../assets/starFill.svg';
import ContactAvatar from '../atoms/ContactAvatar';
import ErrorHandler from '../atoms/ErrorHandler';
import Loading from '../atoms/Loading';
import { useToast } from '../../context/ToastContext';

interface ContactListProps {
  show: boolean
}
const ContactList: React.FC<ContactListProps> = ({ show }) => {
  const { contacts, setContacts, loading, setLoading, setError, error, filteredContacts, fetchContacts, updateContact } = useContacts();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [contactsLoading, setContactsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchContacts()
    setContactsLoading(false)
    return () => setLoading(false);

  }, [setContacts, setLoading, setError]);

  const handleToggleFavorite = (contactId: string) => {
    const contactToUpdate = contacts.find((contact) => contact.id === contactId)
    if (!contactToUpdate) {
      return showToast('Errore nel modificare il contatto', 'error')
    }
    updateContact({ ...contactToUpdate, favorite: !contactToUpdate.favorite })
  };

  if (loading && show) {
    return <Loading />;
  }

  if (error && show) {
    return <ErrorHandler message={error} />;
  }

  return (
    <>
      <ul className={`max-w-md divide-y mx-3 divide-gray-200 dark:divide-gray-700 ${show ? "" : "hidden"}`}>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => {
            const isFavorite = contact.favorite;

            return (

              <li key={contact.id} className="pb-3 sm:pb-4 flex justify-between items-center">
                <Link to={`/contact/${contact.id}`} aria-label={t('contact.viewDetails')} className=' min-w-80 w-full'>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <ContactAvatar name={contact.name} image={contact.image} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {contact.name} {contact.surname}
                      </p>
                      <p>{contact.email.length > 30 ? contact.email.slice(0, 29).concat("...") : contact.email}</p>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center space-x-2">
                  <button id={'star-'.concat(contact.id)}
                    onClick={() => handleToggleFavorite(contact.id)}
                    className="focus:outline-none"
                    aria-label={isFavorite ? t('contact.removeFromFavorites') : t('contact.addToFavorites')}>
                    <img id={'star-'.concat(contact.id)}
                      src={isFavorite ? starFill : starOutline}
                      alt={isFavorite ? t('contact.removeFromFavorites') : t('contact.addToFavorites')}
                      className="w-8 h-8"
                    />
                  </button>
                </div>
              </li>

            );
          })
        ) : contactsLoading ? "" : (
          <li className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400 py-4">
            <img src={userNotFound} alt={t('contact.notFound')} className='w-10 h-10' />
            <span>{t('contact.notFound')}</span>
          </li>
        )}
      </ul>
    </>
  );
};

export default ContactList;
