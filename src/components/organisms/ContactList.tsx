import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { db } from '../../services/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Contact } from "../../types/Contact";


const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>Caricamento contatti...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <ul>
        {contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <li key={index}>
              <Link to={`/contact/${contact.id}`}>
                <div className="contact-item">
                  <img
                    src={contact.image || "/default-avatar.png"}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <p>{contact.name} {contact.surname}</p>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li>Nessun contatto trovato.</li>
        )}
      </ul>
    </>
  );
};

export default ContactList;
