import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../atoms/LanguageSwitcher";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-white dark:bg-gray-800 mt-auto">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <div className="flex flex-row md:flex-row justify-around md:space-x-8">
                    <span className="text-gray-600 dark:text-gray-300 mb-2 md:mb-0">{t("footer.favorites")}</span>
                    <LanguageSwitcher />
                    <span className="text-gray-600 dark:text-gray-300">{t("footer.contacts")}</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
