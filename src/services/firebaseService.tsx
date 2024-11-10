import { getDatabase, ref, set } from 'firebase/database';

export const uploadContactWithImage = async (contactId: string, name: string, surname: string, phone: string, email: string, base64Image: string) => {
    const db = getDatabase();
    const contactRef = ref(db, `contacts/${contactId}`);

    try {
        await set(contactRef, {
            name: name,
            surname: surname,
            phone: phone,
            email: email,
            image: base64Image,
        });
        console.log("Contatto con immagine caricato nel DB!");
    } catch (error) {
        console.error("Errore nel caricare il contatto: ", error);
    }
};
