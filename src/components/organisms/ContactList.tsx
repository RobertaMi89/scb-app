import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { db } from '../../services/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Contact } from "../../types/Contact";
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../context/FavoritesContext';
import starOutline from "../../assets/starOutline.svg";
import starFill from "../../assets/starFill.svg";

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const { t } = useTranslation();

  useEffect(() => {
    const contactsRef = ref(db, 'contacts');

    onValue(
      contactsRef,
      (snapshot) => {
        const data = snapshot.val();
        setLoading(false);

        if (data) {
          const formattedContacts = Object.values(data) as Contact[];
          setContacts(formattedContacts);
        } else {
          setContacts([]);
        }
      },
      (err) => {
        setLoading(false);
        if (err) {
          setError('Errore nel caricamento dei contatti');
        }
      }
    );
  }, []);

  const handleToggleFavorite = (contact: Contact) => {
    toggleFavorite(contact);
  };

  if (loading) {
    return <div>Caricamento contatti...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <ul className="max-w-md divide-y mx-3 divide-gray-200 dark:divide-gray-700">
        {contacts.length > 0 ? (
          contacts.map((contact, index) => {
            const isFavorite = favorites.some((fav) => fav.id === contact.id);

            return (
              <li key={index} className="pb-3 sm:pb-4 flex justify-between items-center">
                <Link to={`/contact/${contact.id}`}>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        src={contact.image || "/default-avatar.png"}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full mt-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {contact.name} {contact.surname}
                      </p>
                      <button onClick={() => handleToggleFavorite(contact)}></button>
                    </div>
                  </div>
                </Link>
                <button onClick={() => toggleFavorite(contact)} className="focus:outline-none">
                  <img
                    src={isFavorite ? starFill : starOutline}
                    alt={t("contact.favorites")}
                    className="w-6 h-6"
                  />
                </button>
              </li>
            );
          })
        ) : (
          <li>Nessun contatto trovato.</li>
        )}
      </ul>
    </>
  );
};

export default ContactList;
