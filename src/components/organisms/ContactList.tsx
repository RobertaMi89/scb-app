import { useEffect, useState } from 'react';
import { database } from '../../services/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<{ name: string; surname: string; phone: string; email: string }[]>([]);

  useEffect(() => {
    const contactsRef = ref(database, 'contacts');

    onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formattedContacts = Object.values(data) as {
          name: string;
          surname: string;
          phone: string;
          email: string;
        }[];

        setContacts(formattedContacts);
      } else {
        setContacts([]);
      }
    });
  }, []);

  return (
    <>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            <strong>
              {contact.name} {contact.surname}
            </strong>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
