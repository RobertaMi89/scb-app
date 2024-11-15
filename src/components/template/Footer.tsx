import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';
import { useView, Views } from '../../context/ViewContext';
import AddContactButton from '../molecules/AddContactButton';

function Footer({ className }: { className?: string }) {
    const { t } = useTranslation();
    const { view, setView } = useView();

    const selectView = (view: Views) => setView(view)

    return (
        <div className={className}>
            <footer className="bg-gray-100 dark:bg-gray-800 mt-auto basis-1/6 w-full  border border-t-gray-200" role="contentinfo">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <div className="flex flex-row md:flex-row justify-around w-full">
                        <Button
                            onClick={() => selectView(Views.FAVORITES)}
                            className={`text-gray-600 dark:text-gray-300 flex flex-col items-center  ${view == Views.FAVORITES ? ' text-blue-500' : ''}`}
                            aria-label={t("footer.goToFavorites")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={view == Views.FAVORITES ? "currentColor" : "none"}
                                role="img"
                                aria-labelledby={t("contact.favorites")}
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>

                            {t("contact.favorites")}
                        </Button>
                        <AddContactButton />
                        <Button
                            onClick={() => selectView(Views.CONTACTS)}
                            className={`text-gray-600 dark:text-gray-300 flex flex-col items-center ${view == Views.CONTACTS ? ' text-blue-500' : ''}`}
                            aria-label={t("footer.goToContacts")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={view == Views.CONTACTS ? "currentColor" : "none"}
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                />
                            </svg>

                            {t("footer.contacts")}
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
