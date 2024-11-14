import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';
import { useView, Views } from '../../context/ViewContext';



function Footer() {
    const { t } = useTranslation();
    const { view, setView } = useView();

    const selectView = (view: Views) => setView(view)

    return (
        <footer className="bg-white dark:bg-gray-800 mt-auto" role="contentinfo">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <div className="flex flex-row md:flex-row justify-around md:space-x-8">
                    <Button
                        onClick={() => selectView(Views.FAVORITES)}
                        className={`text-gray-600 dark:text-gray-300 mb-2 md:mb-0 ${view == Views.FAVORITES ? 'font-bold text-blue-500' : ''}`}
                        aria-label={t("footer.goToFavorites")}
                    >
                        {t("contact.favorites")}
                    </Button>
                    <Button
                        onClick={() => selectView(Views.CONTACTS)}
                        className={`text-gray-600 dark:text-gray-300 ${view == Views.CONTACTS ? 'font-bold text-blue-500' : ''}`}
                        aria-label={t("footer.goToContacts")}
                    >
                        {t("footer.contacts")}
                    </Button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
