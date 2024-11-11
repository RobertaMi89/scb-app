import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-white dark:bg-gray-800 mt-auto">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <div className="flex flex-row md:flex-row justify-around md:space-x-8">
                    <Link to="/favorites" className="text-gray-600 dark:text-gray-300 mb-2 md:mb-0">
                        {t("contact.favorites")}
                    </Link>
                    <Link to="/contacts" className="text-gray-600 dark:text-gray-300">
                        {t("footer.contacts")}
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
