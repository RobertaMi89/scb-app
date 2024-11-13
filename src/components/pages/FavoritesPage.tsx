import { useContacts } from '../../context/ContactsContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Contact } from "../../types/Contact";
import ContactAvatar from "../atoms/ContactAvatar";
import Loading from '../atoms/Loading';
import ErrorHandler from '../atoms/ErrorHandler';
import { useToast } from '../../context/ToastContext';

const Favorites: React.FC = () => {
    const { contacts, loading, error } = useContacts();
    const { t } = useTranslation();
    const { showToast } = useToast();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        showToast(t('error.fetchingData'), 'error');
        return <ErrorHandler message={t('error.generic')} />;
    }

    const favorites = contacts.filter((contact) => contact.favorite);

    const sortedFavorites = favorites.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    return (
        <div className="container mx-auto p-4">
            {sortedFavorites.length === 0 ? (
                <p>{t("favorites.noFavorites")}</p>
            ) : (
                <ul>
                    {favorites.map((contact: Contact) => (
                        <li key={contact.id} className="flex items-center space-x-4 mb-4">
                            <Link
                                to={`/contact/${contact.id}`}
                                aria-label={t("favorites.viewContact", {
                                    name: `${contact.name} ${contact.surname}`
                                })}>
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="flex-shrink-0">
                                        <ContactAvatar name={`${contact.name} ${contact.surname}`} image={contact.image} className="w-12 h-12" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {contact.name} {contact.surname}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;
