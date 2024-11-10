import { ref, set } from 'firebase/database';
import { db } from '../../services/firebaseConfig';

interface Contact {
    name: string;
    surname: string;
    phone: string;
    email: string;
    image: string;
}

export const uploadContactWithImage = async (
    contactId: string,
    contact: Contact
) => {
    const contactRef = ref(db, `contacts/${contactId}`);

    await set(contactRef, {
        name: contact.name,
        surname: contact.surname,
        phone: contact.phone,
        email: contact.email,
        image: contact.image,
    });

    console.log("Contatto con immagine caricato nel DB!");
};

export default uploadContactWithImage;
