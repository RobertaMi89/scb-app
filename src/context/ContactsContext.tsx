import React, { createContext, useState, useContext } from 'react';
import { Contact } from '../types/Contact';
import { db } from '../services/firebaseConfig';
import { ref, set } from 'firebase/database';

interface ContactsProviderProps {
    children: React.ReactNode;
}

interface ContactsContextType {
    contacts: Contact[];
    setContacts: (contacts: Contact[]) => void;
    updateContact: (contact: Contact) => void;
    deleteContact: (id: string) => void;
    toggleFavorite: (id: string) => void;
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export const useContacts = () => {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error('useContacts deve essere usato all\'interno di ContactsProvider');
    }
    return context;
};

export const ContactsProvider: React.FC<ContactsProviderProps> = ({ children }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updateContact = async (contact: Contact) => {
        try {
            setLoading(true);
            const contactRef = ref(db, `contacts/${contact.id}`);
            await set(contactRef, contact);
            setContacts((prevContacts) =>
                prevContacts.map((prevContact) =>
                    prevContact.id === contact.id ? contact : prevContact
                )
            );
            setLoading(false);
        } catch {
            setError('Errore nel salvare i contatti');
            setLoading(false);
        }
    };

    const deleteContact = async (id: string) => {
        try {
            setLoading(true);
            const contactRef = ref(db, `contacts/${id}`);
            await set(contactRef, null);
            setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
            setLoading(false);
        } catch {
            setError('Errore nel rimuovere il contatto');
            setLoading(false);
        }
    };

    const toggleFavorite = async (id: string) => {
        try {
            setLoading(true);
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
                    contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
                )
            );

            const updatedContact = contacts.find(contact => contact.id === id);
            if (updatedContact) {
                const contactRef = ref(db, `contacts/${updatedContact.id}`);
                await set(contactRef, updatedContact);
            }
            setLoading(false);
        } catch {
            setError('Errore nel modificare il preferito');
            setLoading(false);
        }
    };

    return (
        <ContactsContext.Provider
            value={{
                contacts,
                setContacts,
                updateContact,
                deleteContact,
                toggleFavorite,
                loading,
                error,
                setLoading,
                setError,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
};
