import React, { createContext, useState, useContext, useEffect } from 'react';
import { Contact } from '../types/Contact';
import { db } from '../services/firebaseConfig';
import { ref, set, onValue } from 'firebase/database';
import { useToast } from './ToastContext';
import { t } from 'i18next';

interface ContactsProviderProps {
    children: React.ReactNode;
}

interface ContactsContextType {
    contacts: Contact[];
    filteredContacts: Contact[];
    setContacts: (contacts: Contact[]) => void;
    setFilteredContacts: (contacts: Contact[]) => void;
    createContact: (contact: Contact) => Promise<boolean>;
    updateContact: (contact: Contact) => Promise<boolean>;
    deleteContact: (id: string) => Promise<boolean>;
    fetchContacts: () => void;
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    sortBy: "name" | "surname" | "email";
    setSortBy: (criteria: "name" | "surname" | "email") => void;
    ascending: boolean;
    toggleSortOrder: () => void;
    detailContactId: string | null;
    setDetailContactId: (detailContactId: string | null) => void;
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
    const { showToast } = useToast();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<"name" | "surname" | "email">("name");
    const [ascending, setAscending] = useState<boolean>(true);
    const [detailContactId, setDetailContactId] = useState<string | null>(null);

    const createContact = async (contact: Contact): Promise<boolean> => {
        try {
            setLoading(true);
            const contactRef = ref(db, `contacts/${contact.id}`);
            await set(contactRef, contact);
            setLoading(false);
            return true
        } catch {
            setError('Errore nel salvare il nuovo contatto');
            setLoading(false);
            return false
        }
    };

    const updateContact = async (contact: Contact) => {
        try {
            setLoading(true);
            const contactRef = ref(db, `contacts/${contact.id}`);
            await set(contactRef, contact);
            setLoading(false);
            return true
        } catch {
            setError('Errore nel salvare i contatti');
            setLoading(false);
            return false
        }
    };

    const deleteContact = async (id: string) => {
        try {
            setLoading(true);
            const contactRef = ref(db, `contacts/${id}`);
            await set(contactRef, null);
            setLoading(false);
            return true
        } catch {
            setError('Errore nel rimuovere il contatto');
            setLoading(false);
            return false
        }
    };

    const fetchContacts = async () => {
        setLoading(true);
        const contactsRef = ref(db, 'contacts');
        onValue(
            contactsRef,
            (snapshot) => {
                const data = snapshot.val();

                if (data) {
                    const formattedContacts = Object.values(data) as Contact[];
                    setContacts(formattedContacts);
                } else {
                    setContacts([]);

                }
                setLoading(false);
            },
            (err) => {
                setLoading(false);
                setError('Errore nel caricamento dei contatti: ' + err.message);
                showToast(t('contact.loadError'), 'error');
            }
        );
    };

    const toggleSortOrder = () => {
        setAscending((prev) => !prev);
    };

    const sortContacts = (contacts: Contact[], criteria: "name" | "surname" | "email", ascending: boolean) => {
        return [...contacts].sort((a, b) => {
            const fieldA = a[criteria].toLowerCase();
            const fieldB = b[criteria].toLowerCase();
            if (fieldA < fieldB) return ascending ? -1 : 1;
            if (fieldA > fieldB) return ascending ? 1 : -1;
            return 0;
        });
    };

    useEffect(() => {
        const sortedContacts = sortContacts(contacts, sortBy, ascending);
        setFilteredContacts(sortedContacts);
    }, [contacts, sortBy, ascending]);

    return (
        <ContactsContext.Provider
            value={{
                contacts,
                filteredContacts,
                setContacts,
                setFilteredContacts,
                createContact,
                updateContact,
                deleteContact,
                fetchContacts,
                loading,
                error,
                setLoading,
                setError,
                sortBy,
                setSortBy,
                ascending,
                toggleSortOrder,
                detailContactId,
                setDetailContactId
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
};