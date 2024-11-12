import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../services/firebaseConfig';
import { ref, onValue, update } from 'firebase/database';
import { Contact } from '../../types/Contact';
import { useTranslation } from 'react-i18next';
import { useContacts } from '../../context/ContactsContext';
import starOutline from '../../assets/starOutline.svg';
import starFill from '../../assets/starFill.svg';
import ContactAvatar from '../atoms/ContactAvatar';

const ContactList: React.FC = () => {
  const { setContacts, loading, setLoading, setError, error, toggleFavorite, filteredContacts } = useContacts();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      const contactsRef = ref(db, 'contacts');
      onValue(
        contactsRef,
        (snapshot) => {
          setLoading(false);
          const data = snapshot.val();

          if (data) {
            const formattedContacts = Object.values(data) as Contact[];
            setContacts(formattedContacts);
          } else {
            setContacts([]);
          }
        },
        (err) => {
          setLoading(false);
          setError('Errore nel caricamento dei contatti: ' + err.message);
        }
      );
    };
    fetchContacts()
  }, [setContacts, setLoading, setError]);

  const handleToggleFavorite = (contactId: string) => {
    toggleFavorite(contactId);
    const contactRef = ref(db, 'contacts/' + contactId);
    update(contactRef, { favorite: true });
  };

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <ul className="max-w-md divide-y mx-3 divide-gray-200 dark:divide-gray-700">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => {
            const isFavorite = contact.favorite;

            return (
              <li key={contact.id} className="pb-3 sm:pb-4 flex justify-between items-center">
                <Link to={`/contact/${contact.id}`}>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <ContactAvatar name={contact.name} image={contact.image} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {contact.name} {contact.surname}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleToggleFavorite(contact.id)} className="focus:outline-none">
                    <img
                      src={isFavorite ? starFill : starOutline}
                      alt={t('contact.favorites')}
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <li>{t('contact.notFound')}</li>
        )}
      </ul>
    </>
  );
};

export default ContactList;
