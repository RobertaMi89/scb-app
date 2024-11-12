import { useContacts } from '../../context/ContactsContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Contact } from "../../types/Contact";
import ContactAvatar from "../atoms/ContactAvatar";

const Favorites: React.FC = () => {
    const { contacts } = useContacts();
    const { t } = useTranslation();

    const favorites = contacts.filter((contact) => contact.favorite);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">{t("favorites.title")}</h2>
            {favorites.length === 0 ? (
                <p>{t("favorites.noFavorites")}</p>
            ) : (
                <ul>
                    {favorites.map((contact: Contact) => (
                        <li key={contact.id} className="flex items-center space-x-4 mb-4">
                            <Link to={`/contact/${contact.id}`}>
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="flex-shrink-0">
                                        <ContactAvatar name={`${contact.name} ${contact.surname}`} image={contact.image} className="w-12 h-12 " />
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
