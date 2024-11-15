import { useContacts } from '../../context/ContactsContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Contact } from "../../types/Contact";
import ContactAvatar from "../atoms/ContactAvatar";
import Loading from '../atoms/Loading';
interface FavoritestProps {
    show: boolean
}

const Favorites: React.FC<FavoritestProps> = ({ show }) => {
    const { contacts, loading } = useContacts();
    const { t } = useTranslation();
    if (loading && show) {
        return <Loading />;
    }

    const favorites = contacts.filter((contact) => contact.favorite);

    const sortedFavorites = favorites.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    return (
        <div>
            {sortedFavorites.length === 0 && show ? (
                <li className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400 dark:bg-gray-700 py-4 w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label={t('contact.notFound')}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>{t('favorites.noFavorites')}</span>
                </li>
            ) : (
                <ul
                    className={`max-w-md divide-y mx-3 divide-gray-200 dark:divide-gray-700 ${show ? '' : 'hidden'
                        }`}
                >
                    {favorites.map((contact: Contact) => (
                        <li
                            key={contact.id}
                            className="p-3 ps-0 sm:pb-4 flex justify-between items-center"
                        >
                            <Link
                                to={`/contact/${contact.id}`}
                                aria-label={t('contact.viewDetails')}
                                className="w-full"
                            >
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="flex-shrink-0">
                                        <ContactAvatar name={contact.name} image={contact.image} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {contact.name} {contact.surname}
                                        </p>
                                        <p>
                                            {contact.email.length > 30
                                                ? contact.email.slice(0, 29).concat('...')
                                                : contact.email}
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
}
export default Favorites;
