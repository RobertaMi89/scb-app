import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Contact } from '../types/Contact';

interface FavoritesContextType {
    favorites: Contact[];
    toggleFavorite: (contact: Contact) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Contact[]>([]);

    const loadFavorites = () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        } else {
            setFavorites([]);
        }
    };

    const updateFavorites = (updatedFavorites: Contact[]) => {
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const toggleFavorite = (contact: Contact) => {
        const updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex(fav => fav.id === contact.id);
        if (index === -1) {
            updatedFavorites.push(contact);
        } else {

            updatedFavorites.splice(index, 1);
        }
        updateFavorites(updatedFavorites);
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
